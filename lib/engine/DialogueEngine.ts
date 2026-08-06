import type {
  PatientScenario,
  PatientState,
  DialogueNode,
  DialogueChoice,
  ChoiceEffect,
  EndingType,
  GameState,
  GameMessage,
  MemoryFragment,
} from "../types";
import { clamp } from "../state/GameState";

/** 会话事件回调 */
export interface SessionCallbacks {
  onStateChange: (state: PatientState, emotion?: string) => void;
  onNodeEnter: (node: DialogueNode) => void;
  onFloatingText: (text: string, kind: string) => void;
  onEnding: (ending: EndingType, title: string, text: string, reward?: ChoiceEffect) => void;
  onChoiceMade?: (choice: DialogueChoice) => void;
  onComboTrigger?: (comboCount: number) => void;
  /** 真相揭示到阈值时触发记忆碎片闪回 */
  onMemoryTrigger?: (fragment: MemoryFragment) => void;
}

export class DialogueEngine {
  private scenario: PatientScenario;
  private state: PatientState;
  private currentNode: DialogueNode;
  private game: GameState;
  private callbacks: SessionCallbacks;
  /** 连击系统：记录上一回合选项类型 */
  private lastChoiceKind: string | null = null;
  private comboCount = 0;
  /** 已触发的记忆碎片（每个仅触发一次） */
  private triggeredMemories = new Set<string>();
  /** 本难度要求的最低对话轮数（每完成一次选择计一轮） */
  private readonly minRounds: number;

  constructor(
    scenario: PatientScenario,
    game: GameState,
    callbacks: SessionCallbacks
  ) {
    this.scenario = scenario;
    this.game = game;
    this.callbacks = callbacks;
    this.state = {
      ...scenario.initialState,
      // 诊所升级加成：舒适的沙发增加初始信任
      trust:
        scenario.initialState.trust +
        this.getInitialTrustBonus(),
    };
    this.minRounds =
      scenario.difficulty === "困难" ? 15 : scenario.difficulty === "普通" ? 10 : 5;
    this.currentNode = scenario.dialogues[scenario.startNode];
  }

  private getInitialTrustBonus(): number {
    // 简单的诊所升级加成查询（避免循环依赖，内联判定）
    if (this.game.clinicUpgrades.includes("comfort_sofa")) return 10;
    return 0;
  }

  start(): void {
    this.enterNode(this.currentNode);
  }

  getState(): PatientState {
    return { ...this.state };
  }

  private enterNode(node: DialogueNode): void {
    this.currentNode = node;
    this.checkMemoryTrigger();
    this.callbacks.onNodeEnter(node);
    this.callbacks.onStateChange(this.state, node.emotion);

    if (node.isEnding) {
      // 最低轮次保护：对话过于简短时，插入过渡独白，保证每位客户至少对话
      // 简单 5 轮 / 普通 10 轮 / 困难 15 轮
      if (this.state.round < this.minRounds) {
        this.enterNode(this.buildPadNode(this.state.round, node));
      } else {
        this.handleEnding(node);
      }
      return;
    }

    // 若无选项，则等待玩家点击继续 -> autoNext
    // UI 层会读取 node.choices 判断渲染选项还是"继续"按钮
  }

  /** 检查记忆碎片触发条件（真相/信任达到阈值即闪回一次） */
  private checkMemoryTrigger(): void {
    if (!this.scenario.memoryFragments) return;
    for (const frag of this.scenario.memoryFragments) {
      if (this.triggeredMemories.has(frag.id)) continue;
      const ok =
        (frag.trigger.truth !== undefined && this.state.truth >= frag.trigger.truth) ||
        (frag.trigger.trust !== undefined && this.state.trust >= frag.trigger.trust);
      if (ok) {
        this.triggeredMemories.add(frag.id);
        this.callbacks.onMemoryTrigger?.(frag);
      }
    }
  }

  /** 玩家点击对话继续（无选项节点） */
  continue(): void {
    // 最低轮次保护产生的过渡节点：先进入内嵌的二选一医生节点
    const pad = this.currentNode as DialogueNode & { _padChoice?: DialogueNode };
    if (pad._padChoice) {
      this.enterNode(pad._padChoice);
      return;
    }
    if (this.currentNode.autoNext) {
      const next = this.scenario.dialogues[this.currentNode.autoNext];
      if (next) this.enterNode(next);
    }
  }

  /** 玩家选择某选项 */
  choose(choice: DialogueChoice): void {
    // 1. 检查条件
    if (!this.meetsRequirement(choice)) {
      this.callbacks.onFloatingText("条件不满足", "warn");
      return;
    }
    if (choice.requireSkill && !this.game.skills.includes(choice.requireSkill)) {
      this.callbacks.onFloatingText("需要对应技能", "warn");
      return;
    }

    this.callbacks.onChoiceMade?.(choice);

    // 2. 连击判定
    this.evaluateCombo(choice);

    // 3. 应用效果
    if (choice.effect) {
      this.applyEffect(choice.effect);
    }

    // 4. 推进到下一节点
    if (choice.next) {
      const next = this.scenario.dialogues[choice.next];
      if (next) {
        this.state.round += 1;
        this.enterNode(next);
      }
    }
  }

  private meetsRequirement(choice: DialogueChoice): boolean {
    const r = choice.require;
    if (!r) return true;
    if (r.trust !== undefined && this.state.trust < r.trust) return false;
    if (r.defense !== undefined && this.state.defense > r.defense) return false;
    if (r.mood !== undefined && this.state.mood < r.mood) return false;
    if (r.truth !== undefined && this.state.truth < r.truth) return false;
    return true;
  }

  private evaluateCombo(choice: DialogueChoice): void {
    // 话术连击：共情破防后接质问为暴击
    if (
      this.lastChoiceKind === "empathy" &&
      choice.kind === "confront"
    ) {
      this.comboCount += 1;
      this.callbacks.onFloatingText("话术连击·破防暴击！", "combo");
      this.callbacks.onComboTrigger?.(this.comboCount);
      // 连击额外效果：直击效果增强
      if (choice.effect) {
        choice.effect = {
          ...choice.effect,
          truth: (choice.effect.truth ?? 0) + 15,
          mood: (choice.effect.mood ?? 0) - 5,
        };
      }
    } else if (
      this.lastChoiceKind === "logic" &&
      choice.kind === "confront"
    ) {
      // 患者大哭时讲道理 -> 失败
      this.comboCount = 0;
      this.callbacks.onFloatingText("时机不对·患者防御上升", "bad");
      if (choice.effect) {
        choice.effect = {
          ...choice.effect,
          defense: (choice.effect.defense ?? 0) + 15,
          trust: (choice.effect.trust ?? 0) - 5,
        };
      }
    } else {
      this.comboCount = Math.max(0, this.comboCount - 1);
    }
    this.lastChoiceKind = choice.kind;
  }

  private applyEffect(effect: ChoiceEffect): void {
    const before = { ...this.state };
    if (effect.trust) {
      this.state.trust = clamp(this.state.trust + effect.trust);
      if (effect.trust !== 0)
        this.callbacks.onFloatingText(
          `信任 ${effect.trust > 0 ? "+" : ""}${effect.trust}`,
          effect.trust > 0 ? "good" : "bad"
        );
    }
    if (effect.defense) {
      this.state.defense = clamp(this.state.defense + effect.defense);
      this.callbacks.onFloatingText(
        `防御 ${effect.defense > 0 ? "+" : ""}${effect.defense}`,
        effect.defense > 0 ? "bad" : "good"
      );
    }
    if (effect.mood) {
      this.state.mood = clamp(this.state.mood + effect.mood);
      this.callbacks.onFloatingText(
        `心情 ${effect.mood > 0 ? "+" : ""}${effect.mood}`,
        effect.mood > 0 ? "good" : "bad"
      );
    }
    if (effect.truth) {
      this.state.truth = clamp(this.state.truth + effect.truth);
      if (effect.truth > 0)
        this.callbacks.onFloatingText(`真相揭示 +${effect.truth}`, "truth");
    }
    // 医生影响存到 game，由 UI 层在结算时统一应用
    if (effect.doctorSanity)
      this.game.doctor.sanity = clamp(this.game.doctor.sanity + effect.doctorSanity, 0, 100);
    if (effect.doctorReputation)
      this.game.doctor.reputation = clamp(
        this.game.doctor.reputation + effect.doctorReputation,
        0,
        100
      );
    if (effect.doctorMoney) this.game.doctor.money += effect.doctorMoney;
    if (effect.doctorExp) this.game.doctor.exp += effect.doctorExp;

    void before;
  }

  /** 当前会话要求的最低轮数（供 UI 展示进度） */
  getMinRounds(): number {
    return this.minRounds;
  }

  /**
   * 最低轮次保护：生成一段过渡独白节点（患者讲一句 → 医生二选一），
   * 二选一后继续导向真实结局节点；若轮次仍不足会在 enterNode 里再次补齐。
   */
  private buildPadNode(round: number, realEnding: DialogueNode): DialogueNode {
    const lines = [
      "……谢谢你肯听我讲这么多。有些话，连我自己都没想到会说出来。",
      "我好像……很久没有这样把心里的话说完整过了。",
      "其实道理我都懂，只是从来没人陪我坐下来，一件件捋清楚。",
      "每次说完这些，我都觉得胸口那块石头轻了一点。",
      "你问的那些问题，我以前从没认真想过。让我再想想……",
      "原来有些结，不是要解开，只是需要被看见。",
      "跟你说话的时候，时间好像过得特别快。",
      "我要是早点来听你说这些，也许就不会绕那么多弯了。",
    ];
    const line = lines[round % lines.length];
    const choiceId = `_pad_c_${round}`;
    const padChoice: DialogueNode = {
      id: choiceId,
      speaker: "doctor",
      text: "（让他把话说完，不急着下结论。）",
      choices: [
        {
          id: `${choiceId}_a`,
          text: "安静地听完，不打断。",
          kind: "empathy",
          effect: { trust: 3, mood: 2 },
          next: realEnding.id,
        },
        {
          id: `${choiceId}_b`,
          text: "温和地回应：这些心事，值得被认真对待。",
          kind: "logic",
          effect: { trust: 2, defense: -2 },
          next: realEnding.id,
        },
      ],
    };
    return {
      id: `_pad_${round}`,
      speaker: "patient",
      text: line,
      emotion: "calm",
      autoNext: choiceId,
      // 内嵌过渡医生节点，continue() 优先解析
      _padChoice: padChoice,
    } as unknown as DialogueNode;
  }

  private handleEnding(node: DialogueNode): void {
    const endingType = node.endingType ?? "cure";
    this.callbacks.onEnding(
      endingType,
      node.endingTitle ?? "结局",
      node.endingText ?? "",
      node.endingReward
    );
  }

  getCurrentNode(): DialogueNode {
    return this.currentNode;
  }

  /** 生成结局信件（写入消息盒子） */
  static generateLetter(
    scenario: PatientScenario,
    ending: EndingType,
    day: number
  ): GameMessage {
    const toneMap: Record<EndingType, GameMessage["tone"]> = {
      cure: "thanks",
      acceptance: "thanks",
      dependent: "neutral",
      worsen: "dark",
      tragic: "dark",
      hidden: "sad",
      transfer: "neutral",
      awakening: "thanks",
    };
    const contentMap: Record<EndingType, string> = {
      cure: `医生，谢谢您。我终于能好好睡一觉了。这些日子以来，是您让我相信，被看见本身就是一种治愈。我会带着这份力气，继续走下去。`,
      acceptance: `医生，我学会了带着这份重量往前走。它没有消失，但它不再独占我。窗外的春天今年我第一次看见了，谢谢您。`,
      dependent: `医生，您今天怎么不在？我等了您一整天。只有您懂我，只有您能听我说。您不能不要我，对吧？我明天还会来的。`,
      worsen: `您说您能帮我。可我现在更糟了。窗外的雨下了很久，久到我分不清是白天还是黑夜。也许，从一开始就没有人能帮我。`,
      tragic: `医生，对不起。也许这一切本就没有答案。我太累了，想休息了。请不要自责——您已经尽力了。只是有些伤口，从开始的那一刻就注定无法愈合。`,
      hidden: `医生，有些真相也许永远不该被说出口。但您替我扛下了。我不知道该感激还是愧疚。希望您能守住这个秘密，像我守住它那么久。`,
      transfer: `医生，听说您把我转介到了专门的机构。说实话，一开始我有点难过。但后来我明白了——那不是放弃，是您知道自己接不住我，所以才把我交给更专业的人。谢谢您的诚实。`,
      awakening: `医生，痛苦还在。但您的几句话让我看清了一些以前不敢看的东西。原来我一直以为的'我'，只是别人想让我成为的样子。从今天起，我想试着认识真正的自己。`,
    };
    return {
      id: `${scenario.id}-${day}`,
      kind: "letter",
      title: `来自 ${scenario.name} 的信`,
      body: contentMap[ending],
      day,
      read: false,
      patientName: scenario.name,
      tone: toneMap[ending],
    };
  }
}
