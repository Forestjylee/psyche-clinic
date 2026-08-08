// ========== 核心类型定义 ==========

/** 医生属性 */
export interface DoctorStats {
  /** 声望：影响可接诊的患者层级 */
  reputation: number;
  /** 理智值：过低会出现幻觉选项，甚至倒闭 */
  sanity: number;
  /** 金钱：用于升级诊所、技能 */
  money: number;
  /** 经验：用于升级技能树 */
  exp: number;
  /** 等级 */
  level: number;
}

/** 患者单次会诊中的动态状态 */
export interface PatientState {
  /** 信任值：决定是否愿意说真话 */
  trust: number;
  /** 防御机制：触及痛点时触发，类似护甲 */
  defense: number;
  /** 心情值：直击病灶会大幅降低 */
  mood: number;
  /** 真相揭示进度（隐藏） */
  truth: number;
  /** 当前会话轮次 */
  round: number;
}

/** 对话选项的效果 */
export interface ChoiceEffect {
  trust?: number;
  defense?: number;
  mood?: number;
  truth?: number;
  /** 对医生的影响 */
  doctorSanity?: number;
  doctorReputation?: number;
  doctorMoney?: number;
  doctorExp?: number;
}

/** 对话选项 */
export interface DialogueChoice {
  id: string;
  /** 选项文本 */
  text: string;
  /** 选项类型，影响视觉与连击 */
  kind: ChoiceKind;
  /** 数值效果 */
  effect?: ChoiceEffect;
  /** 跳转到的节点 id */
  next?: string;
  /** 显示该选项所需的条件（如信任值门槛） */
  require?: ChoiceRequirement;
  /** 该选项所需的技能 id */
  requireSkill?: string;
  /** 选项提示文字（如“需要信任≥40”） */
  hint?: string;
}

export type ChoiceKind =
  | "empathy" // 共情：温和，+信任 -防御
  | "probe" // 试探：温和推进
  | "confront" // 直击：犀利，高信任时直击病灶
  | "logic" // 讲道理
  | "prescribe" // 处方药
  | "hypnosis" // 催眠术（需技能）
  | "silence" // 沉默倾听
  | "special"; // 特殊/技能解锁

export interface ChoiceRequirement {
  trust?: number;
  defense?: number;
  mood?: number;
  truth?: number;
}

/** 对话节点 */
export interface DialogueNode {
  id: string;
  /** 说话者 */
  speaker: "patient" | "doctor" | "narration";
  /** 文本 */
  text: string;
  /** 患者表情（用于立绘变化） */
  emotion?: PatientEmotion;
  /** 选项列表（doctor 节点才有） */
  choices?: DialogueChoice[];
  /** 无选项时自动跳转 */
  autoNext?: string;
  /** 是否为结局节点 */
  isEnding?: boolean;
  /** 结局类型 */
  endingType?: EndingType;
  /** 结局标题 */
  endingTitle?: string;
  /** 结局描述 */
  endingText?: string;
  /** 结局奖励 */
  endingReward?: ChoiceEffect;
}

export type PatientEmotion =
  | "neutral"
  | "anxious"
  | "angry"
  | "sad"
  | "scared"
  | "calm"
  | "happy"
  | "broken";

export type EndingType =
  | "cure" // 治愈：患者真正走出困境
  | "acceptance" // 接纳：未完全治愈但与症状和解
  | "dependent" // 依赖：离不开医生/药物
  | "worsen" // 恶化：情况变糟
  | "tragic" // 悲剧：患者死亡或重大不可逆后果
  | "hidden" // 隐藏：特殊伦理结局
  | "transfer" // 转介：超出能力范围，转交专业机构
  | "awakening"; // 觉醒：痛苦中诞生新认知

/** 患者剧本 */
export interface PatientScenario {
  id: string;
  /** 患者姓名 */
  name: string;
  /** 头衔/标签 */
  title: string;
  /** 简介 */
  intro: string;
  /** 表象描述 */
  surface: string;
  /** 真相描述（隐藏，诊疗中揭示） */
  truth: string;
  /** 立绘色调 */
  palette: PatientPalette;
  /** 初始状态 */
  initialState: PatientState;
  /** 对话图（节点 id -> 节点） */
  dialogues: Record<string, DialogueNode>;
  /** 起始节点 */
  startNode: string;
  /** 所需声望 */
  requireReputation?: number;
  /** 接诊报酬（基础） */
  baseReward: number;
  /** 难度标签 */
  difficulty: "简单" | "普通" | "困难";
  /** 记忆碎片：真相揭示到阈值时触发的一次性闪回 */
  memoryFragments?: MemoryFragment[];
  /** 剧本种子 id（生成池去重用；手写患者无此字段） */
  seedId?: string;
  /** 是否已完成 */
  completed?: boolean;
  /** 已达成结局 */
  achievedEnding?: EndingType;
  /** 复诊对话图（独立短剧情，初始无则不支持复诊） */
  followUpDialogues?: Record<string, DialogueNode>;
  /** 复诊起始节点 */
  followUpStart?: string;
  /** 最多复诊次数（达到后结案离场，默认 2） */
  maxFollowUps?: number;
  /** 复诊记忆碎片：复诊剧情中触发的新碎片（初诊碎片不重复） */
  followUpFragments?: MemoryFragment[];
  /** 治愈回访对话（探望非治疗，看完结案离场；无则用通用文案兜底） */
  returnDialogue?: { title: string; lines: ReturnLine[] };
}

/** 回访对话中的一句 */
export interface ReturnLine {
  speaker: "patient" | "doctor";
  text: string;
  /** 说话时的患者表情（仅患者句用） */
  emotion?: PatientEmotion;
}

/** 记忆碎片：诊疗中真相揭示到阈值时触发的一次性闪回 */
export interface MemoryFragment {
  id: string;
  /** 触发条件（truth / trust 任一达到即触发） */
  trigger: { truth?: number; trust?: number };
  /** 闪回标题 */
  title: string;
  /** 闪回正文（患者视角的第一人称记忆画面） */
  text: string;
  /** 闪回时的患者情绪覆盖 */
  emotion?: PatientEmotion;
}

export interface PatientPalette {
  /** 主色 */
  primary: string;
  /** 辅色 */
  secondary: string;
  /** 阴影/迷雾色 */
  fog: string;
  /** 治愈后亮色 */
  bright: string;
}

/** 技能 */
export interface Skill {
  id: string;
  name: string;
  description: string;
  /** 所属流派 */
  school: SkillSchool;
  /** 消耗经验 */
  cost: number;
  /** 前置技能 */
  requires?: string;
  /** 已解锁 */
  unlocked?: boolean;
}

export type SkillSchool =
  | "psychoanalysis" // 精神分析
  | "cbt" // 认知行为
  | "hypnosis" // 催眠
  | "pharmacology"; // 药物学

/** 诊所升级项 */
export interface ClinicUpgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  /** 效果：患者初始信任加成等 */
  effect: {
    initialTrustBonus?: number;
    sanityRecoveryBonus?: number;
    reputationBonus?: number;
  };
  unlocked?: boolean;
}

/** 设施在场景中的摆放位置（逻辑坐标，仅视觉不影响数值） */
export interface FacilityPosition {
  x: number;
  y: number;
}

/** 会话断点快照：对话可中断恢复（PRD 场景2）。单例，同一时间只有一个进行中会话 */
export interface ActiveSession {
  /** 进行中会话的患者 id */
  patientId: string;
  /** 断点节点 id（engine 恢复后 start() 从此继续） */
  nodeId: string;
  /** 断点时的患者四维状态（engine 直接恢复） */
  patientState: PatientState;
  /** 已发生的对话记录（回放进回顾窗；id 由呈现层恢复时补） */
  history: { speaker: "patient" | "doctor"; text: string }[];
  /** 已触发的记忆碎片 id（恢复后不重复闪回） */
  triggeredMemories: string[];
}

/** 序章「离开城市的原因」选择（P4-1：影响叙事不影响数值） */
export type PrologueChoice = "burnout" | "witness" | "breath" | "heartbreak";

/** 游戏全局状态 */
export interface GameState {
  /** 诊所名称（玩家自定义，默认"森林诊所"） */
  clinicName: string;
  /** 序章开场选择（可选：未选择=undefined，旧档兼容） */
  prologueChoice?: PrologueChoice;
  /** 序章已通过标记（P4-3：完成或跳过序章后落档 true，防重复进入；可选字段，旧档兼容） */
  prologuePassed?: boolean;
  doctor: DoctorStats;
  /** 已解锁技能 id */
  skills: string[];
  /** 诊所升级 id */
  clinicUpgrades: string[];
  /** 已完成患者 id -> 结局 */
  patientRecords: Record<string, EndingType>;
  /** 当前日期（游戏内） */
  day: number;
  /** 今日已接待名额（0..MAX_SLOTS，默认 8 个/天） */
  slot: number;
  /** 今日已接诊的患者 id（当天不能重复接诊，休息日清空） */
  todayServed: string[];
  /** patientId -> 已在候诊区等待的天数（用于病情恶化） */
  waitingDays: Record<string, number>;
  /** 已放弃治疗离开的患者 id */
  abandoned: string[];
  /** 已离场（结案，不再复诊）的患者 id：治愈/接纳/恶化/悲剧等 */
  discharged: string[];
  /** patientId -> 已复诊次数（复诊池患者） */
  followUpCount: Record<string, number>;
  /** 今日命中复诊、出现在预约列表的患者 id */
  todayFollowUps: string[];
  /** patientId -> 连续未复诊天数（达宽限天数自动离场） */
  followUpIdleDays: Record<string, number>;
  /** 消息盒子：统一存放来信 / 病情提醒 / 通知（旧版 letters 会在读档时迁移） */
  messages: GameMessage[];
  /** 生成器产出的患者剧本（最多保留 N 个） */
  generatedScenarios: PatientScenario[];
  /** 已用过的剧本种子 id（生成时排除，池耗尽后重置重洗） */
  usedSeeds: string[];
  /** 治愈回访计划：patientId -> 回访状态（治愈/接纳/觉醒结局 N 天后探望） */
  returnVisits: Record<
    string,
    { ending: EndingType; dueDay: number; arrived: boolean; seen: boolean }
  >;
  /** 已发现、待决定是否邀约的候选客户 */
  discoveryCandidates: DiscoveryCandidate[];
  /** 已接受邀约、等待到达的客户（到期进入预约清单） */
  pendingArrivals: PendingArrival[];
  /** 装修模式：设施摆放位置 upgradeId -> 场景坐标（仅视觉，不影响数值） */
  facilityPositions: Record<string, FacilityPosition>;
  /** 累计统计（成就系统只读，运行时各动作累加） */
  stats: GameStats;
  /** patientId -> 已解锁记忆碎片 id（P3 档案图鉴：碎片驱动完整真相，PRD 场景4） */
  unlockedFragments: Record<string, string[]>;
  /** 会话断点快照（P2-8）：对话进行中持续草稿，暂停/中途退出随 saveGame 落盘，结案清除 */
  activeSession?: ActiveSession | null;
}

/** 成就统计字段：各动作（发现/邀约/复诊/回访/休息）运行时累加，成就引擎读取 */
export interface GameStats {
  /** 渠道投放次数 */
  discoverCount: number;
  /** 用过的渠道 id（去重） */
  channelsUsed: string[];
  /** 发出邀约次数 */
  inviteCount: number;
  /** 邀约成功次数 */
  acceptCount: number;
  /** 邀约被拒次数 */
  rejectCount: number;
  /** 复诊接诊次数 */
  revisitCount: number;
  /** 完成回访探望次数 */
  aftercareCount: number;
  /** 探望过的回访结局类型 */
  aftercareEndings: string[];
  /** 累计零流失天数（当日无 abandon 事件 +1） */
  noLossDays: number;
  /** 连续休息后理智≥60 的天数 */
  sanityStreak: number;
}

// ============================================================
// 发现客户（主动获客）
// ============================================================

/** 获客渠道配置（lib/data/discovery.ts 数据表） */
export interface DiscoveryChannel {
  id: string;
  name: string;
  cost: number;
  desc: string;
  /** 产出候选客户数量范围（含） */
  minCount: number;
  maxCount: number;
  /** 邀约基础接受率 0-1（每 10 点声望 +2%，上限 +20%） */
  acceptRate: number;
  /** 声望门槛（如老客户转介） */
  requireReputation?: number;
}

/** 发现但未决定是否邀约的候选客户 */
export interface DiscoveryCandidate {
  id: string;
  /** 预生成的剧本（接受邀约后随到达日进入预约清单） */
  scenario: PatientScenario;
  /** 来源渠道 id */
  channelId: string;
  /** 过期日：休息日过后仍未邀约则自动清除 */
  expireDay: number;
}

/** 已接受邀约、等待到达的客户 */
export interface PendingArrival {
  scenario: PatientScenario;
  /** 计划到达日 */
  arriveDay: number;
}

/** 一天内的时段 */
export type TimePhase = "morning" | "afternoon" | "evening" | "night";

/** 消息盒子条目类型 */
export type MessageKind = "letter" | "warning" | "notice";

/** 消息盒子中的一条消息（来信 / 病情提醒 / 通知 统一结构） */
export interface GameMessage {
  id: string;
  kind: MessageKind;
  title: string;
  body: string;
  /** 产生的游戏内日期 */
  day: number;
  /** 是否已读 */
  read: boolean;
  /** 关联的患者姓名（来信/病情提醒用） */
  patientName?: string;
  /** 来信的情感色调（仅 letter 有，用于 chibi 表情与配色） */
  tone?: "thanks" | "neutral" | "sad" | "dark";
}

/** 旧版信件结构（读档迁移用，新存档不再写入） */
export interface Letter {
  id: string;
  from: string;
  date: number;
  title: string;
  content: string;
  tone: "thanks" | "neutral" | "sad" | "dark";
}

// ============================================================
// 心理学专业词汇库（用于悬停浮窗解释）
// ============================================================
export interface PsychTerm {
  id: string;
  /** 词汇（主词） */
  term: string;
  /** 同义词（命中任意一个都触发） */
  aliases?: string[];
  /** 分类：症状 / 治疗法 / 理论 / 药物 / 伦理 */
  category: "symptom" | "therapy" | "theory" | "drug" | "ethics";
  /** 一句话简明解释（浮窗默认显示） */
  brief: string;
  /** 完整解释（点击"展开"时显示，可选） */
  detail?: string;
  /** 权威来源（如"DSM-5"、"ICD-11"） */
  source?: string;
  /** 严重度 1-5（仅症状类用，显示为小色点） */
  severity?: 1 | 2 | 3 | 4 | 5;
}

// ============================================================
// 成就系统
// ============================================================
export type AchievementCategory =
  | "therapy"   // 诊疗相关（接诊/治愈次数等）
  | "ending"    // 结局收集（每种结局累计）
  | "growth"    // 医生成长（等级/声望/技能）
  | "clinic"    // 诊所经营（金钱/设施）
  | "secret"    // 隐藏成就（灰色锁定，解锁后才显示名称）
  | "ethics"    // 伦理抉择（特殊判断）
  | "discover"  // 主动获客（渠道投放/邀约）
  | "aftercare"; // 治愈回访（探望闭环）

export type AchievementRarity = "common" | "rare" | "epic" | "legendary";

/** 单个成就定义 */
export interface Achievement {
  id: string;
  name: string;
  /** 解锁条件描述（隐藏成就显示为"？？？"） */
  description: string;
  category: AchievementCategory;
  rarity: AchievementRarity;
  /** 目标值（0/1 型成就填 1；累计型如"接诊10人"填 10） */
  target: number;
  /** 成就图标字符（游戏化，代替图片） */
  icon: string;
  /** 解锁奖励：声望 / 理智 / 经验 / 金钱 */
  reward?: {
    reputation?: number;
    sanity?: number;
    exp?: number;
    money?: number;
  };
  /** 是否为隐藏成就（未解锁时灰名灰描述） */
  hidden?: boolean;
}

/** 单条成就解锁进度（存盘用） */
export interface AchievementProgress {
  /** 当前进度值，达到 achievement.target 即解锁 */
  progress: number;
  /** 是否已解锁 */
  unlocked: boolean;
  /** 解锁时的游戏内日期（0 表示未解锁） */
  unlockedDay: number;
  /** 首次解锁的时间戳（毫秒，用于云排序；本地可为 Date.now()） */
  unlockedAt?: number;
}

/** 成就全部进度表（存盘结构） */
export type AchievementProgressMap = Record<string, AchievementProgress>;

