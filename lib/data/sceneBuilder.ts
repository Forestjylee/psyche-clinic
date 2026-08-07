import type {
  DialogueNode,
  DialogueChoice,
  MemoryFragment,
  PatientState,
  PatientEmotion,
  ChoiceEffect,
} from "../types";
import type { GenContext } from "./generator";

// ============================================================
// 对话骨架生成器（sceneBuilder）
// 一份「剧本种子」素材 → 完整深度对话树。
// 骨架刻意加深对话轮次，制造「层层挖掘真相」的沉浸感：
//
//   start（开场诉说）
//     → connect（浅层回应：生活的表面困扰）
//     → deepen（核心事件前奏：情绪开始上涌）
//     → core（核心事件/创伤被说出）
//     → truth_approach（真相边缘：记忆碎片浮现）
//     → truth（真相揭示）→ 多结局
//
// 每条主线包含 6 个患者对话节点，加上分支过渡与结局，单剧本约 14-18 个节点、
// 17 个选项，与现有手写模板规模一致但轮次更深。
// 深度由素材质量决定，结构由骨架统一保证。
// ============================================================

/** 种子风格标签 */
export type SeedTone = "serious" | "bizarre" | "dark-humor";

/** 文案函数：接收生成上下文，返回一句话 */
type CtxStr = (ctx: GenContext) => string;

export interface EndingMaterial {
  /** 说话者（默认 narration） */
  speaker?: "patient" | "narration";
  text: CtxStr;
  title: string;
  reward: ChoiceEffect;
}

/**
 * 剧本种子素材：一个剧本的专属内容。
 * 必填字段承载剧本的「个性核心」；可选字段不写时用兜底模板生成，
 * 保证每个剧本依然有完整、有层次、够轮次的对话。
 */
export interface ScenarioSeed {
  id: string;
  name: string;
  tone: SeedTone;
  /** 真相描述（简介/结算页） */
  truth: CtxStr;
  // ===== 必填·患者独白 =====
  /** start 开场诉说（患者最表面的困扰） */
  opening: CtxStr;
  /** core 核心事件/创伤被说出 */
  coreReveal: CtxStr;
  /** truth 真相揭示 */
  truthReveal: CtxStr;
  // ===== 必填·玩家话术（真相阶段） =====
  /** truth·治愈（require 高信任） */
  lineCure: CtxStr;
  /** truth·依赖 */
  lineDependent: CtxStr;
  /** truth·指责（恶化/悲剧） */
  lineBlame: CtxStr;
  // ===== 必填·结局 =====
  endings: {
    cure: EndingMaterial;
    dependent: EndingMaterial;
    hidden?: EndingMaterial;
    tragic?: EndingMaterial;
    acceptance?: EndingMaterial;
  };
  // ===== 可选·患者独白（有兜底） =====
  /** connect 浅层回应（默认按症状生成） */
  connectReveal?: CtxStr;
  /** deepen 核心事件前奏（默认按症状生成） */
  deepenReveal?: CtxStr;
  /** deepen 阶段逻辑追问后的防御回缩 */
  deepenReject?: CtxStr;
  /** core 阶段被探询触动后的敞口 */
  openUp?: CtxStr;
  /** truth_approach 真相边缘的挣扎 */
  truthResist?: CtxStr;
  /** truth_approach 真相边缘的独白（默认复用 openUp） */
  truthApproach?: CtxStr;
  /** start 逻辑追问被拒答 */
  logicReject?: CtxStr;
  /** start 处方后的犹豫 */
  medReject?: CtxStr;
  // ===== 可选·玩家话术（有兜底） =====
  /** start·共情 */
  lineEmpathy?: CtxStr;
  /** start·逻辑 */
  lineLogic?: CtxStr;
  /** start·处方 */
  linePrescribe?: CtxStr;
  /** connect·共情 */
  lineConnect?: CtxStr;
  /** deepen·共情 */
  lineDeepen?: CtxStr;
  /** connect/deepen/core·探询 */
  lineProbe?: CtxStr;
  /** connect/core·沉默 */
  lineSilence?: CtxStr;
  /** truth·直击强制（require 最高，隐藏结局） */
  lineHidden?: CtxStr;
  /** truth·接纳（接纳结局，可选） */
  lineAccept?: CtxStr;
  // ===== 可选·素材 =====
  /** 记忆碎片（默认按 truth 40/60 生成两条通用碎片） */
  memoryFragments?: MemoryFragment[];
  /** 初始状态基线（默认继承症状档案） */
  initial?: Partial<Omit<PatientState, "round" | "truth">>;
  /** 色调（默认继承症状档案） */
  palette?: { primary: string; secondary: string; fog: string; bright: string };
  /** 开场情绪（默认继承症状档案） */
  emotion?: PatientEmotion;
}

// —— 骨架固定数值（多轮版：单次效果更小，靠累积触发高门槛） ——

const EFF = {
  startEmpathy: { trust: 8, defense: -5, mood: 3 },
  startLogic: { trust: 4, defense: -2 },
  startPrescribe: { mood: 6, doctorMoney: 50 },
  connectEmpathy: { trust: 9, defense: -7, mood: 4 },
  connectProbe: { trust: 5, defense: -8, truth: 10 },
  connectSilence: { trust: 7, defense: -5, mood: 3 },
  deepenEmpathy: { trust: 10, defense: -9, mood: 4 },
  deepenProbe: { trust: 7, defense: -12, truth: 15 },
  deepenLogic: { trust: 4, mood: -3 },
  coreEmpathy: { trust: 12, defense: -10, mood: 5, truth: 15 },
  coreProbe: { trust: 8, defense: -15, truth: 20 },
  coreSilence: { trust: 8, defense: -6, mood: 3 },
  cure: { trust: 25, mood: 30, truth: 35, doctorReputation: 6, doctorExp: 40, doctorSanity: -5 },
  hidden: { trust: -8, defense: 25, mood: -15, truth: 45, doctorReputation: -8, doctorExp: 50, doctorSanity: -12 },
  dependent: { trust: 8, mood: -5, doctorMoney: 80 },
  blame: { trust: -25, defense: 30, mood: -25, doctorSanity: -5 },
  accept: { trust: 15, defense: -12, mood: 20, truth: 25, doctorReputation: 4, doctorExp: 30, doctorSanity: 3 },
};

// —— 兜底文案模板 ——

const fallback = {
  connectReveal(ctx: GenContext): string {
    return `${ctx.name}张了张嘴，又咽了回去。「我本来以为自己只是累了。最近${ctx.symptom.name.replace(/^(重度|轻度|急性|慢性)/, "")}这个毛病，让我连日子都过不动了。」`;
  },
  deepenReveal(ctx: GenContext): string {
    return `${ctx.name}的声音低下去。「其实……不是因为工作。是有一件事，我一直没跟任何人说过。每次想到它，我就觉得胸口有什么东西堵着。」`;
  },
  deepenReject(ctx: GenContext): string {
    return `${ctx.name}垂下眼睛。「医生，您别问了。这事……不太光彩，我说不出口。」`;
  },
  openUp(ctx: GenContext): string {
    return `${ctx.name}浑身一颤，眼圈红了。「您……怎么知道的？我没打算说的……可您这么一问，我好像也没法再瞒了。」`;
  },
  truthResist(ctx: GenContext): string {
    return `${ctx.name}抱住了自己的头。「别、别让我想起来……我想忘了它，我真的想忘了它……」`;
  },
  logicReject(ctx: GenContext): string {
    return `${ctx.name}勉强笑了笑。「我知道您在分析我。可我要是分析得明白，就不用来您这儿了。」`;
  },
  medReject(ctx: GenContext): string {
    return `${ctx.name}捏着药方单，声音闷闷的。「药……我吃过了，没什么用。夜里还是睡不着，还是想那些事。」`;
  },
  lineEmpathy(ctx: GenContext): string {
    return `「听起来很不容易。坐在这儿慢慢说，我在听。」`;
  },
  lineLogic(ctx: GenContext): string {
    return `「这种情况持续多久了？能先说说最近的作息吗？」`;
  },
  linePrescribe(ctx: GenContext): string {
    return `「我先给你开点安神的药，配合调整作息试试。」`;
  },
  lineConnect(ctx: GenContext): string {
    return `「不只是累吧。你看起来有心事。」`;
  },
  lineDeepen(ctx: GenContext): string {
    return `「你刚才停了一下。那个让你不舒服的地方，能不能多说一点？」`;
  },
  lineProbe(ctx: GenContext): string {
    return `「你话里的停顿，好像藏着什么。要不要试着说出来？」`;
  },
  lineSilence(ctx: GenContext): string {
    return `（你只是安静地坐着，等他继续说下去。）`;
  },
};

// —— 组装 ——

/** 用素材组装完整对话树 */
export function buildSeedDialogues(seed: ScenarioSeed, ctx: GenContext): Record<string, DialogueNode> {
  const id = seed.id;
  const nodes: Record<string, DialogueNode> = {};
  const P = (key: string, node: DialogueNode) => {
    nodes[key] = node;
  };

  // —— 开场：患者诉说表面困扰 ——
  P(`${id}_start`, {
    id: `${id}_start`,
    speaker: "patient",
    text: seed.opening(ctx),
    emotion: seed.emotion,
    choices: [
      {
        id: `${id}_c1`,
        text: (seed.lineEmpathy ?? fallback.lineEmpathy)(ctx),
        kind: "empathy",
        effect: EFF.startEmpathy,
        next: `${id}_connect`,
      },
      {
        id: `${id}_c2`,
        text: (seed.lineLogic ?? fallback.lineLogic)(ctx),
        kind: "logic",
        effect: EFF.startLogic,
        next: `${id}_connect_logic`,
      },
      {
        id: `${id}_c3`,
        text: (seed.linePrescribe ?? fallback.linePrescribe)(ctx),
        kind: "prescribe",
        effect: EFF.startPrescribe,
        next: `${id}_connect_med`,
      },
    ],
  });

  // —— 开场分支过渡 ——
  P(`${id}_connect_logic`, {
    id: `${id}_connect_logic`,
    speaker: "patient",
    text: (seed.logicReject ?? fallback.logicReject)(ctx),
    emotion: "scared",
    autoNext: `${id}_connect`,
  });
  P(`${id}_connect_med`, {
    id: `${id}_connect_med`,
    speaker: "patient",
    text: (seed.medReject ?? fallback.medReject)(ctx),
    emotion: "anxious",
    autoNext: `${id}_connect`,
  });

  // —— 第一层：浅层回应（生活与表面情绪） ——
  P(`${id}_connect`, {
    id: `${id}_connect`,
    speaker: "patient",
    text: (seed.connectReveal ?? fallback.connectReveal)(ctx),
    emotion: "sad",
    choices: [
      {
        id: `${id}_c4`,
        text: (seed.lineConnect ?? fallback.lineConnect)(ctx),
        kind: "empathy",
        effect: EFF.connectEmpathy,
        next: `${id}_deepen`,
      },
      {
        id: `${id}_c5`,
        text: (seed.lineProbe ?? fallback.lineProbe)(ctx),
        kind: "probe",
        require: { trust: 20 },
        effect: EFF.connectProbe,
        next: `${id}_deepen_open`,
        hint: "需要信任≥20",
      },
      {
        id: `${id}_c6`,
        text: (seed.lineSilence ?? fallback.lineSilence)(ctx),
        kind: "silence",
        effect: EFF.connectSilence,
        next: `${id}_deepen`,
      },
    ],
  });

  // —— 第二层：核心事件前奏，情绪上涌 ——
  P(`${id}_deepen`, {
    id: `${id}_deepen`,
    speaker: "patient",
    text: (seed.deepenReveal ?? fallback.deepenReveal)(ctx),
    emotion: "scared",
    choices: [
      {
        id: `${id}_c7`,
        text: (seed.lineDeepen ?? fallback.lineDeepen)(ctx),
        kind: "empathy",
        effect: EFF.deepenEmpathy,
        next: `${id}_core`,
      },
      {
        id: `${id}_c8`,
        text: (seed.lineProbe ?? fallback.lineProbe)(ctx),
        kind: "probe",
        require: { trust: 30 },
        effect: EFF.deepenProbe,
        next: `${id}_deepen_open`,
        hint: "需要信任≥30",
      },
      {
        id: `${id}_c9`,
        text: (seed.lineLogic ?? fallback.lineLogic)(ctx),
        kind: "logic",
        effect: EFF.deepenLogic,
        next: `${id}_deepen_logic`,
      },
    ],
  });
  P(`${id}_deepen_open`, {
    id: `${id}_deepen_open`,
    speaker: "patient",
    text: (seed.openUp ?? fallback.openUp)(ctx),
    emotion: "scared",
    autoNext: `${id}_core`,
  });
  P(`${id}_deepen_logic`, {
    id: `${id}_deepen_logic`,
    speaker: "patient",
    text: (seed.deepenReject ?? fallback.deepenReject)(ctx),
    emotion: "angry",
    autoNext: `${id}_core`,
  });

  // —— 核心：核心事件/创伤被说出 ——
  P(`${id}_core`, {
    id: `${id}_core`,
    speaker: "patient",
    text: seed.coreReveal(ctx),
    emotion: "sad",
    choices: [
      {
        id: `${id}_c10`,
        text: (seed.lineDeepen ?? fallback.lineDeepen)(ctx),
        kind: "empathy",
        effect: EFF.coreEmpathy,
        next: `${id}_truth_approach`,
      },
      {
        id: `${id}_c11`,
        text: (seed.lineProbe ?? fallback.lineProbe)(ctx),
        kind: "probe",
        require: { trust: 40 },
        effect: EFF.coreProbe,
        next: `${id}_truth_resist`,
        hint: "需要信任≥40",
      },
      {
        id: `${id}_c12`,
        text: (seed.lineSilence ?? fallback.lineSilence)(ctx),
        kind: "silence",
        effect: EFF.coreSilence,
        next: `${id}_truth_approach`,
      },
    ],
  });

  // —— 真相边缘：挣扎 / 记忆碎片浮现 ——
  P(`${id}_truth_resist`, {
    id: `${id}_truth_resist`,
    speaker: "patient",
    text: (seed.truthResist ?? fallback.truthResist)(ctx),
    emotion: "scared",
    autoNext: `${id}_truth_approach`,
  });
  P(`${id}_truth_approach`, {
    id: `${id}_truth_approach`,
    speaker: "patient",
    text: (seed.truthApproach ?? seed.openUp ?? fallback.openUp)(ctx),
    emotion: "sad",
    autoNext: `${id}_truth`,
  });

  // —— 真相揭示 ——
  const truthChoices: DialogueChoice[] = [
    {
      id: `${id}_c13`,
      text: seed.lineCure(ctx),
      kind: "special" as const,
      require: { trust: 45 },
      effect: EFF.cure,
      next: `${id}_end_cure`,
      hint: "需要信任≥45",
    },
  ];
  if (seed.lineAccept && seed.endings.acceptance) {
    truthChoices.push({
      id: `${id}_c14`,
      text: seed.lineAccept(ctx),
      kind: "empathy" as const,
      require: { trust: 40 },
      effect: EFF.accept,
      next: `${id}_end_acceptance`,
      hint: "需要信任≥40",
    });
  }
  if (seed.lineHidden && seed.endings.hidden) {
    truthChoices.push({
      id: `${id}_c15`,
      text: seed.lineHidden(ctx),
      kind: "confront" as const,
      require: { trust: 55 },
      effect: EFF.hidden,
      next: `${id}_end_hidden`,
      hint: "需要信任≥55",
    });
  }
  truthChoices.push(
    {
      id: `${id}_c16`,
      text: seed.lineDependent(ctx),
      kind: "logic" as const,
      effect: EFF.dependent,
      next: `${id}_end_dependent`,
    },
    {
      id: `${id}_c17`,
      text: seed.lineBlame(ctx),
      kind: "confront" as const,
      effect: EFF.blame,
      next: seed.endings.tragic ? `${id}_end_tragic` : `${id}_end_dependent`,
    }
  );
  P(`${id}_truth`, {
    id: `${id}_truth`,
    speaker: "patient",
    text: seed.truthReveal(ctx),
    emotion: "sad",
    choices: truthChoices,
  });

  // —— 结局 ——
  const mkEnding = (key: string, mat: EndingMaterial, endingType: string) => {
    P(key, {
      id: key,
      speaker: mat.speaker ?? "narration",
      text: mat.text(ctx),
      ...(mat.speaker === "patient" ? { emotion: "calm" as PatientEmotion } : {}),
      isEnding: true,
      endingType: endingType as never,
      endingTitle: mat.title,
      endingText: mat.title,
      endingReward: mat.reward,
    });
  };
  mkEnding(`${id}_end_cure`, seed.endings.cure, "cure");
  mkEnding(`${id}_end_dependent`, seed.endings.dependent, "dependent");
  if (seed.endings.hidden) mkEnding(`${id}_end_hidden`, seed.endings.hidden, "hidden");
  if (seed.endings.tragic) mkEnding(`${id}_end_tragic`, seed.endings.tragic, "tragic");
  if (seed.endings.acceptance) mkEnding(`${id}_end_acceptance`, seed.endings.acceptance, "acceptance");

  return nodes;
}

/** 生成种子专属记忆碎片（seed 未提供时兜底两条通用碎片） */
export function defaultFragments(seedId: string): MemoryFragment[] {
  return [
    {
      id: `${seedId}_mem1`,
      trigger: { truth: 40 },
      title: "碎片 · 那个晚上",
      text: "记忆里总有那个晚上。灯很暗，我站在那里，喉咙像被什么东西堵住了，一句话也说不出来。",
      emotion: "scared",
    },
    {
      id: `${seedId}_mem2`,
      trigger: { trust: 55 },
      title: "碎片 · 无人的角落",
      text: "我总是一个人躲在角落。没人看见的时候，我才敢把那件压在心底的事拿出来看一看，然后马上藏回去。",
      emotion: "sad",
    },
  ];
}
