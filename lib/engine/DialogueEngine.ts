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

/** 维度情绪反馈词库：数值之后附加一句"人话"，弱化考试感 */
const FLAVOR: Record<string, { up: string; down: string }> = {
  trust: { up: "对方稍稍放松了些", down: "对方多了几分疏离" },
  defense: { up: "对方的防备更紧了些", down: "对方的防备松动了一丝" },
  mood: { up: "对方的情绪明朗了一些", down: "对方的心事更沉了" },
  truth: { up: "记忆的碎片浮现", down: "话题绕了回去" },
};

function flavorText(dim: string, delta: number): string {
  const f = FLAVOR[dim];
  if (!f) return "";
  const t = delta > 0 ? f.up : f.down;
  return ` · ${t}`;
}

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
      scenario.difficulty === "困难" ? 8 : scenario.difficulty === "普通" ? 6 : 5;
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
          `信任 ${effect.trust > 0 ? "+" : ""}${effect.trust}${flavorText("trust", effect.trust)}`,
          effect.trust > 0 ? "good" : "bad"
        );
    }
    if (effect.defense) {
      this.state.defense = clamp(this.state.defense + effect.defense);
      this.callbacks.onFloatingText(
        `防御 ${effect.defense > 0 ? "+" : ""}${effect.defense}${flavorText("defense", effect.defense)}`,
        effect.defense > 0 ? "bad" : "good"
      );
    }
    if (effect.mood) {
      this.state.mood = clamp(this.state.mood + effect.mood);
      this.callbacks.onFloatingText(
        `心情 ${effect.mood > 0 ? "+" : ""}${effect.mood}${flavorText("mood", effect.mood)}`,
        effect.mood > 0 ? "good" : "bad"
      );
    }
    if (effect.truth) {
      this.state.truth = clamp(this.state.truth + effect.truth);
      if (effect.truth > 0)
        this.callbacks.onFloatingText(
          `真相 +${effect.truth}${flavorText("truth", effect.truth)}`,
          "truth"
        );
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
    // 过渡独白库：按对话阶段推进（倾诉→觉察→整合），避免重复倾听感
    const phaseLines: string[][] = [
      // 倾诉期：患者继续表达
      [
        "……有些话在我心里压了很久，一直找不到人说。",
        "每次关上门，房间里就只剩我和那些翻来覆去的念头。",
        "说出来是不是就好一点？其实我也不知道，但至少……不闷在心里了。",
        "朋友都说我看起来好好的，可我笑完之后更累了。",
        "白天在人前撑得越用力，晚上一个人就越容易塌下来。",
      ],
      // 觉察期：患者开始看到自己的模式
      [
        "你刚才那么一问，我忽然有点明白自己为什么总那样做了。",
        "我一直以为那是别人要我做的，现在想想，好像也有我自己的一份。",
        "原来我不是做不到，是打从心里不敢去试。",
        "有些事我一直绕着走，今天绕不过去了。",
        "我习惯先把最坏的情况想好，这样真发生了，就不会太疼。",
        "说出口才发现，我好像一直对自己太苛刻了。",
      ],
      // 整合期：情绪稳定，开始向解决靠近
      [
        "听你这么说，我好像没那么慌了。",
        "谢谢你没有笑话我。我以为这些事说出来会被人当成矫情。",
        "胸口那块石头，好像真的轻了一点。",
        "我想先从小事开始试试，哪怕只做一点点。",
        "跟你说话的时候，时间好像过得特别快。",
        "如果早点有人这样听我说，也许我不会绕这么多弯。",
      ],
    ];
    // 按轮次推进阶段，避免一直停留在同一类台词
    const phaseIdx = Math.min(Math.floor(round / 3), phaseLines.length - 1);
    const lines = phaseLines[phaseIdx];
    const line = lines[round % lines.length];
    const choiceId = `_pad_c_${round}`;
    const padChoice: DialogueNode = {
      id: choiceId,
      speaker: "doctor",
      text: "（陪着他，让话自然流出来。）",
      choices: [
        {
          id: `${choiceId}_a`,
          text: "安静地听完，不打断。",
          kind: "empathy",
          effect: { trust: 4, mood: 3 },
          next: realEnding.id,
        },
        {
          id: `${choiceId}_b`,
          text: "顺着他的话追问一句细节。",
          kind: "probe",
          effect: { trust: 3, truth: 5, mood: -1 },
          next: realEnding.id,
        },
        {
          id: `${choiceId}_c`,
          text: "急着打断，抛出一句结论性建议。",
          kind: "logic",
          effect: { trust: -3, defense: 6, mood: -2 },
          next: realEnding.id,
        },
      ],
    };
    return {
      id: `_pad_${round}`,
      speaker: "patient",
      text: line,
      emotion: phaseIdx >= 2 ? "calm" : "anxious",
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
