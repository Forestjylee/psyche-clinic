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
  /** 是否已完成 */
  completed?: boolean;
  /** 已达成结局 */
  achievedEnding?: EndingType;
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

/** 游戏全局状态 */
export interface GameState {
  doctor: DoctorStats;
  /** 已解锁技能 id */
  skills: string[];
  /** 诊所升级 id */
  clinicUpgrades: string[];
  /** 已完成患者 id -> 结局 */
  patientRecords: Record<string, EndingType>;
  /** 当前日期（游戏内） */
  day: number;
  /** 收到的信件 */
  letters: Letter[];
  /** 生成器产出的患者剧本（最多保留 N 个） */
  generatedScenarios: PatientScenario[];
}

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
  | "ethics";   // 伦理抉择（特殊判断）

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
