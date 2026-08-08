import type {
  GameState,
  DoctorStats,
  TimePhase,
  Letter,
  EndingType,
} from "../types";
import { saveGameState, loadGameState, clearGameState } from "./Storage";
import { SKILL_ID_MIGRATIONS } from "../data/skills";

// ============================================================
// 时间系统常量
// ============================================================
/** 一天最多接待的患者数（动态容量上限，一天最多 5 位，保证体验深度） */
export const MAX_SLOTS = 5;
/** 等待满 N 天开始「病情加重」 */
export const DECAY_START_DAY = 2;
/** 等待满 N 天弹窗提醒 */
export const WARN_DAY = 4;
/** 等待满 N 天放弃治疗离开（多给一天缓冲，软化经营压力） */
export const ABANDON_DAY = 7;
/** 放弃治疗损失的声望（从 5 降到 2，软化惩罚） */
export const REPUTATION_LOSS_PER_ABANDON = 2;

// ============================================================
// 复诊系统：结局决定复诊倾向 + 每日 roll
// ============================================================
/** 每个剧本最多复诊次数（达到后结案离场） */
export const DEFAULT_MAX_FOLLOW_UPS = 2;
/** 复诊池患者连续未复诊的天数宽限，超过则放弃复诊并离场（防无限挂起） */
export const FOLLOW_UP_GRACE_DAYS = 6;

// ============================================================
// 治愈回访：治愈/接纳/觉醒结局患者 N 天后回访探望
// ============================================================
/** 治愈后经过 N 天，患者回访诊所探望（温暖闭环，非治疗） */
export const RETURN_VISIT_DELAY = 3;

/**
 * 日终推进后结算回访到达：dueDay 到期的回访标记 arrived。
 * 纯函数（原地修改 g.returnVisits），返回本次到达的患者列表，由调用方生成回访信。
 */
export function resolveDueReturns(
  g: GameState
): { patientId: string; ending: EndingType }[] {
  const arrived: { patientId: string; ending: EndingType }[] = [];
  for (const [pid, rv] of Object.entries(g.returnVisits)) {
    if (!rv.arrived && rv.dueDay <= g.day) {
      rv.arrived = true;
      arrived.push({ patientId: pid, ending: rv.ending });
    }
  }
  return arrived;
}

/**
 * 各结局的复诊倾向（0-1 概率，roll < 概率则今日复诊）：
 * - 治愈/接纳：约 5%，基本直接离场
 * - 依赖：约 60%，最易复诊
 * - 恶化/悲剧：0%，永久离场
 * - 隐藏/觉醒/转介：约 25%
 */
export const FOLLOW_UP_CHANCE: Record<EndingType, number> = {
  cure: 0.05,
  acceptance: 0.05,
  dependent: 0.6,
  worsen: 0,
  tragic: 0,
  hidden: 0.25,
  transfer: 0.25,
  awakening: 0.25,
};

export interface FollowUpRollResult {
  /** 今日命中复诊、进入预约列表的患者 id */
  followUpsToday: string[];
  /** 更新后的离场患者 id 列表（复诊次数达上限 / 概率为 0 直接离场） */
  discharged: string[];
  /** 今日放弃复诊（连续未复诊达宽限）的患者 id，由调用方处理扣声望与离场 */
  abandonedFollowUps: string[];
  /** 更新后的复诊次数表 */
  followUpCount: Record<string, number>;
  /** 更新后的连续未复诊天数表 */
  followUpIdleDays: Record<string, number>;
}

/**
 * 每日对复诊池患者 roll：命中→今日复诊（idle 归零）；未命中→idle+1，
 * 连续达到 graceDays 放弃复诊（计入 abandonedFollowUps，由调用方扣声望并离场）；
 * 复诊次数达 maxFollowUps 或概率为 0 的结局直接离场。
 * 纯函数，不修改入参。
 */
export function rollFollowUps(
  patientRecords: Record<string, EndingType>,
  discharged: string[],
  abandoned: string[],
  followUpCount: Record<string, number>,
  followUpIdleDays: Record<string, number>,
  opts: { maxFollowUps: number; graceDays: number },
  random: () => number
): FollowUpRollResult {
  const nextDischarged = [...discharged];
  const nextIdle = { ...followUpIdleDays };
  const followUpsToday: string[] = [];
  const abandonedFollowUps: string[] = [];
  for (const [pid, ending] of Object.entries(patientRecords)) {
    if (discharged.includes(pid) || abandoned.includes(pid)) continue;
    const count = followUpCount[pid] ?? 0;
    if (count >= opts.maxFollowUps) {
      nextDischarged.push(pid);
      continue;
    }
    const chance = FOLLOW_UP_CHANCE[ending];
    if (random() < chance) {
      nextIdle[pid] = 0;
      followUpsToday.push(pid);
    } else if (chance === 0) {
      nextDischarged.push(pid);
    } else {
      const idle = (nextIdle[pid] ?? 0) + 1;
      nextIdle[pid] = idle;
      if (idle >= opts.graceDays) abandonedFollowUps.push(pid);
    }
  }
  return {
    followUpsToday,
    discharged: nextDischarged,
    abandonedFollowUps,
    followUpCount: { ...followUpCount },
    followUpIdleDays: nextIdle,
  };
}

export function createInitialState(): GameState {
  return {
    clinicName: "森林诊所",
    doctor: {
      reputation: 10,
      sanity: 100,
      money: 500,
      exp: 0,
      level: 1,
    },
    skills: [],
    clinicUpgrades: [],
    patientRecords: {},
    day: 1,
    slot: 0,
    todayServed: [],
    waitingDays: {},
    abandoned: [],
    discharged: [],
    followUpCount: {},
    todayFollowUps: [],
    followUpIdleDays: {},
    messages: [],
    generatedScenarios: [],
    usedSeeds: [],
    returnVisits: {},
    discoveryCandidates: [],
    pendingArrivals: [],
    facilityPositions: {},
    facilityDecors: {},
    unlockedDecors: [],
    placedDecors: [],
    decorPositions: {},
    sessionSinceRest: 0,
    gardenDay: 0,
    stats: {
      discoverCount: 0,
      channelsUsed: [],
      inviteCount: 0,
      acceptCount: 0,
      rejectCount: 0,
      revisitCount: 0,
      aftercareCount: 0,
      aftercareEndings: [],
      noLossDays: 0,
      sanityStreak: 0,
    },
    unlockedFragments: {},
    activeSession: null,
  };
}

/**
 * 旧存档迁移：补齐复诊系统新增字段的默认值（离场列表 / 复诊次数 / 今日复诊 / 复诊空闲天数）。
 * 纯函数，供 loadGame 与测试直接使用。
 */
export function migrateGameState(data: GameState): GameState {
  if (!data.clinicName) data.clinicName = "森林诊所";
  if (!Array.isArray(data.discharged)) data.discharged = [];
  if (!data.followUpCount) data.followUpCount = {};
  if (!Array.isArray(data.todayFollowUps)) data.todayFollowUps = [];
  if (!data.followUpIdleDays) data.followUpIdleDays = {};
  if (!data.returnVisits) data.returnVisits = {};
  if (!Array.isArray(data.usedSeeds)) data.usedSeeds = [];
  // 发现客户：候选与待到达队列（旧存档补默认空）
  if (!Array.isArray(data.discoveryCandidates)) data.discoveryCandidates = [];
  if (!Array.isArray(data.pendingArrivals)) data.pendingArrivals = [];
  // 装修模式：设施位置（旧存档补默认空）
  if (!data.facilityPositions) data.facilityPositions = {};
  // 装修（P5-1）：设施外观变体 / 解锁装饰 / 摆放装饰 / 装饰位置（旧存档补默认空）
  if (!data.facilityDecors) data.facilityDecors = {};
  if (!Array.isArray(data.unlockedDecors)) data.unlockedDecors = [];
  if (!Array.isArray(data.placedDecors)) data.placedDecors = [];
  if (!data.decorPositions) data.decorPositions = {};
  // 理智（P5-3）：连续接诊计数 / 花园使用日（旧存档补默认 0）
  if (data.sessionSinceRest === undefined) data.sessionSinceRest = 0;
  if (data.gardenDay === undefined) data.gardenDay = 0;
  // 会话断点快照（旧存档补默认 null）
  if (!data.activeSession) data.activeSession = null;
  // 档案图鉴：已解锁记忆碎片（旧存档补默认空，P3-1）
  if (!data.unlockedFragments) data.unlockedFragments = {};
  // 成就统计（旧存档补默认）
  if (!data.stats) {
    data.stats = {
      discoverCount: 0,
      channelsUsed: [],
      inviteCount: 0,
      acceptCount: 0,
      rejectCount: 0,
      revisitCount: 0,
      aftercareCount: 0,
      aftercareEndings: [],
      noLossDays: 0,
      sanityStreak: 0,
    };
  }
  // 技能（P6-1）：旧技能 id → 新能力 id 映射迁移，防技能引用悬空（PRD §7 不丢档）
  if (!Array.isArray(data.skills)) data.skills = [];
  else data.skills = data.skills.map((s) => SKILL_ID_MIGRATIONS[s] ?? s);
  return data;
}

export function loadGame(): GameState | null {
  const data = loadGameState<GameState>();
  if (!data) return null;
  // 简单校验
  if (!data.doctor || typeof data.doctor.reputation !== "number") return null;
  // 兼容旧存档（时间系统字段）
  if (typeof data.slot !== "number") data.slot = 0;
  if (!Array.isArray(data.todayServed)) data.todayServed = [];
  if (!data.waitingDays) data.waitingDays = {};
  if (!Array.isArray(data.abandoned)) data.abandoned = [];
  if (!data.generatedScenarios) data.generatedScenarios = [];
  // 消息盒子：旧版 letters 迁移为 letter 类型消息
  if (!Array.isArray(data.messages)) {
    const legacy = data as GameState & { letters?: Letter[] };
    data.messages = (legacy.letters ?? []).map((l) => ({
      id: l.id,
      kind: "letter" as const,
      title: l.title,
      body: l.content,
      day: l.date,
      read: false,
      patientName: l.from,
      tone: l.tone,
    }));
    delete legacy.letters;
  }
  // 修复旧存档：经验溢出但未升级（会话期间经验只累计、未统一结算）
  if (data.doctor.exp >= expToNextLevel(data.doctor.level)) {
    const synced = applyExp(data.doctor, 0);
    data.doctor = synced.stats;
  }
  return migrateGameState(data);
}

export function saveGame(state: GameState): boolean {
  return saveGameState(state);
}

export function clearSave(): boolean {
  return clearGameState();
}

/** 医生升级所需经验 */
export function expToNextLevel(level: number): number {
  return 100 + (level - 1) * 50;
}

/** 应用经验并自动升级 */
export function applyExp(stats: DoctorStats, amount: number): {
  stats: DoctorStats;
  leveledUp: boolean;
} {
  let exp = stats.exp + amount;
  let level = stats.level;
  let leveledUp = false;
  while (exp >= expToNextLevel(level)) {
    exp -= expToNextLevel(level);
    level += 1;
    leveledUp = true;
  }
  return { stats: { ...stats, exp, level }, leveledUp };
}

export function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value));
}

// ============================================================
// 首诊机制保障（P4-5）：玩家第一次接诊必须是「成功、温暖、有意义」的
// 纯函数，只依赖 patientRecords 参数，不 import lib/data（保持数据层序）
// ============================================================

/** 首诊是否已完成：任何患者完成过一次接诊即首诊完成（暂停断点 activeSession 不计入） */
export function firstSessionDone(
  g: Pick<GameState, "patientRecords">
): boolean {
  return Object.keys(g.patientRecords).length > 0;
}

/**
 * 首诊结局 clamp：首诊未完成时，恶化/悲剧结局改判为「接纳」（PRD 场景1），
 * 保证第一次体验是成功、温暖的；首诊完成后原样返回，不影响后续诊疗自由度。
 */
export function clampFirstSessionEnding(
  g: Pick<GameState, "patientRecords">,
  ending: EndingType
): EndingType {
  if (!firstSessionDone(g) && (ending === "worsen" || ending === "tragic")) {
    return "acceptance";
  }
  return ending;
}

// ============================================================
// 时间系统：时段换算
// ============================================================
const PHASE_LABEL: Record<TimePhase, string> = {
  morning: "清晨",
  afternoon: "下午",
  evening: "傍晚",
  night: "夜晚",
};

/** 根据当日已用名额换算时段（一天最多 5 位：清晨 / 下午 / 傍晚 / 夜晚×2，之后打烊） */
export function phaseOfSlot(slot: number): TimePhase {
  if (slot < 1) return "morning";
  if (slot < 2) return "afternoon";
  if (slot < 3) return "evening";
  return "night";
}

export function isNightSlot(slot: number): boolean {
  return phaseOfSlot(slot) === "night";
}

export function slotPhaseLabel(slot: number): string {
  return PHASE_LABEL[phaseOfSlot(slot)];
}

// ============================================================
// 时间系统：日终推进（病情恶化 / 放弃治疗）
// ============================================================
export type DayEvent =
  | { type: "warn"; name: string; days: number }
  | { type: "abandon"; name: string }
  | { type: "abandonFollowUp"; patientId: string };

export interface ServeablePatient {
  id: string;
  name: string;
}

/**
 * 日终推进：重置今日名额，并对「可接诊但未被接诊」的患者累计等待天数，
 * 触发病情加重提醒与放弃治疗（扣声望）；随后对复诊池患者执行复诊 roll，
 * 命中者进入今日预约列表，达上限/宽限/概率为 0 者离场。
 * 已锁定（声望不足）、已完成、已放弃、已离场的患者不参与恶化。
 */
export function advanceDayState(
  g: GameState,
  serveable: ServeablePatient[],
  random: () => number = Math.random
): DayEvent[] {
  const events: DayEvent[] = [];
  g.slot = 0;
  g.todayServed = [];
  for (const p of serveable) {
    if (
      g.patientRecords[p.id] ||
      g.abandoned.includes(p.id) ||
      g.discharged.includes(p.id)
    )
      continue;
    const w = (g.waitingDays[p.id] ?? 0) + 1;
    g.waitingDays[p.id] = w;
    if (w >= ABANDON_DAY) {
      g.abandoned.push(p.id);
      g.doctor.reputation = clamp(
        g.doctor.reputation - REPUTATION_LOSS_PER_ABANDON,
        0,
        100
      );
      events.push({ type: "abandon", name: p.name });
    } else if (w === WARN_DAY) {
      events.push({ type: "warn", name: p.name, days: w });
    }
  }
  // 复诊 roll：命中患者进入今日预约；达上限/概率为 0 者离场；
  // 达宽限者放弃复诊（扣声望并离场，产 abandonFollowUp 事件）
  const roll = rollFollowUps(
    g.patientRecords,
    g.discharged,
    g.abandoned,
    g.followUpCount,
    g.followUpIdleDays,
    { maxFollowUps: DEFAULT_MAX_FOLLOW_UPS, graceDays: FOLLOW_UP_GRACE_DAYS },
    random
  );
  g.todayFollowUps = roll.followUpsToday;
  g.discharged = roll.discharged;
  g.followUpCount = roll.followUpCount;
  g.followUpIdleDays = roll.followUpIdleDays;
  for (const pid of roll.abandonedFollowUps) {
    g.discharged.push(pid);
    g.doctor.reputation = clamp(
      g.doctor.reputation - REPUTATION_LOSS_PER_ABANDON,
      0,
      100
    );
    events.push({ type: "abandonFollowUp", patientId: pid });
  }
  return events;
}

/** 今日可接诊名额：第 1 天 2 位起，随声望（≥25/≥60）与「候诊扩容」设施递增，上限 MAX_SLOTS */
export function todayCapacity(g: GameState): number {
  let cap = 2;
  if (g.doctor.reputation >= 25) cap += 1;
  if (g.doctor.reputation >= 60) cap += 1;
  if (g.clinicUpgrades.includes("reception_expand")) cap += 1;
  return Math.min(MAX_SLOTS, cap);
}

/** 候诊人数目标：与当日可接名额一致（深入优先） */
export function queueTarget(g: GameState): number {
  return todayCapacity(g);
}
