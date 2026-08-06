import type { GameState, DoctorStats } from "../types";
import { saveGameState, loadGameState, clearGameState } from "./Storage";

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
    letters: [],
    generatedScenarios: [],
  };
}

export function loadGame(): GameState | null {
  const data = loadGameState<GameState>();
  if (!data) return null;
  // 简单校验
  if (!data.doctor || typeof data.doctor.reputation !== "number") return null;
  // 兼容旧存档
  if (!data.generatedScenarios) data.generatedScenarios = [];
  return data;
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
