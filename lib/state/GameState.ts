import type { GameState, DoctorStats, TimePhase, Letter } from "../types";
import { saveGameState, loadGameState, clearGameState } from "./Storage";

// ============================================================
// 时间系统常量
// ============================================================
/** 一天最多接待的患者数 */
export const MAX_SLOTS = 8;
/** 等待满 N 天开始「病情加重」 */
export const DECAY_START_DAY = 2;
/** 等待满 N 天弹窗提醒 */
export const WARN_DAY = 4;
/** 等待满 N 天放弃治疗离开 */
export const ABANDON_DAY = 6;
/** 放弃治疗损失的声望 */
export const REPUTATION_LOSS_PER_ABANDON = 5;

export function createInitialState(): GameState {
  return {
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
  };
}

/**
 * 旧存档迁移：补齐复诊系统新增字段的默认值（离场列表 / 复诊次数 / 今日复诊 / 复诊空闲天数）。
 * 纯函数，供 loadGame 与测试直接使用。
 */
export function migrateGameState(data: GameState): GameState {
  if (!Array.isArray(data.discharged)) data.discharged = [];
  if (!data.followUpCount) data.followUpCount = {};
  if (!Array.isArray(data.todayFollowUps)) data.todayFollowUps = [];
  if (!data.followUpIdleDays) data.followUpIdleDays = {};
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
// 时间系统：时段换算
// ============================================================
const PHASE_LABEL: Record<TimePhase, string> = {
  morning: "清晨",
  afternoon: "下午",
  evening: "傍晚",
  night: "夜晚",
};

/** 根据当日已用名额换算时段 */
export function phaseOfSlot(slot: number): TimePhase {
  if (slot < 2) return "morning";
  if (slot < 5) return "afternoon";
  if (slot < 7) return "evening";
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
  | { type: "abandon"; name: string };

export interface ServeablePatient {
  id: string;
  name: string;
}

/**
 * 日终推进：重置今日名额，并对「可接诊但未被接诊」的患者累计等待天数，
 * 触发病情加重提醒与放弃治疗（扣声望）。
 * 已锁定（声望不足）、已完成、已放弃的患者不参与恶化。
 */
export function advanceDayState(
  g: GameState,
  serveable: ServeablePatient[]
): DayEvent[] {
  const events: DayEvent[] = [];
  g.slot = 0;
  g.todayServed = [];
  for (const p of serveable) {
    if (g.patientRecords[p.id] || g.abandoned.includes(p.id)) continue;
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
  return events;
}

/** 候诊人数目标：随时间与名声增长，封顶 MAX_SLOTS */
export function queueTarget(day: number): number {
  return Math.min(MAX_SLOTS, 3 + Math.floor((day - 1) / 2));
}
