import type { EndingType, GameState } from "../types";
import { allPatients } from "../data/patients";

/**
 * 成就动态回访：从已治愈/接纳/觉醒结局、有剧本（手写患者）、且无待办回访的患者中随机选一位。
 * 纯函数层（对齐 archive.ts 惯例），不 import lib/store、lib/state，可单测；random 可注入。
 * 无候选返回 undefined（调用方静默跳过）。
 */
const VISIT_ENDINGS: ReadonlySet<string> = new Set([
  "cure",
  "acceptance",
  "awakening",
]);

export function pickReturnVisitPatient(
  g: GameState,
  random: () => number = Math.random
): string | undefined {
  const known = new Set(allPatients.map((p) => p.id));
  const candidates = (Object.entries(g.patientRecords) as [string, EndingType][])
    .filter(([pid, ending]) => VISIT_ENDINGS.has(ending) && known.has(pid))
    .filter(([pid]) => {
      const existing = g.returnVisits[pid];
      return !existing || existing.seen;
    })
    .map(([pid]) => pid);
  if (candidates.length === 0) return undefined;
  const r = Math.max(0, Math.min(0.9999, random()));
  return candidates[Math.floor(r * candidates.length)];
}
