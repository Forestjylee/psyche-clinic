/**
 * 患者档案图鉴（P3）纯函数层。
 * 与呈现层（PatientArchive.tsx）解耦：数据组装/状态推导/碎片查询均为可单测的纯函数，
 * 只读 game 状态，不 import 改写 lib/data、lib/engine、lib/state。
 * 泄底封口：本模块不导出、不触碰 p.truth；结局记录仅由调用方用 surface 拼接表面文案。
 */
import type {
  EndingType,
  GameState,
  MemoryFragment,
  PatientScenario,
} from "../../lib/types";
import { allPatients } from "../../lib/data/patients";
import { endingLabel } from "./constants";

/** 「见过」集合：玩家见过的所有患者 id（brief 定义的并集；未出现于任何游戏状态的不进档案） */
export function seenPatientIds(game: GameState): Set<string> {
  const seen = new Set<string>();
  for (const id of Object.keys(game.patientRecords)) seen.add(id);
  for (const id of game.discharged) seen.add(id);
  for (const id of game.abandoned) seen.add(id);
  for (const id of Object.keys(game.followUpCount)) seen.add(id);
  for (const id of Object.keys(game.returnVisits)) seen.add(id);
  for (const id of Object.keys(game.unlockedFragments)) seen.add(id);
  for (const id of game.todayServed) seen.add(id);
  for (const id of Object.keys(game.waitingDays)) seen.add(id);
  return seen;
}

/** 患者全量 id → 剧本 索引（手写 allPatients 在前、generatedScenarios 在后，保持出现顺序） */
export function scenarioIndex(game: GameState): Map<string, PatientScenario> {
  const m = new Map<string, PatientScenario>();
  for (const p of allPatients) m.set(p.id, p);
  for (const p of game.generatedScenarios) m.set(p.id, p);
  return m;
}

/** 档案患者列表：见过的患者，按索引顺序（手写在前、生成在后）；找不到剧本的异常 id 自然跳过 */
export function archivePatients(game: GameState): PatientScenario[] {
  const seen = seenPatientIds(game);
  const out: PatientScenario[] = [];
  for (const p of scenarioIndex(game).values()) {
    if (seen.has(p.id)) out.push(p);
  }
  return out;
}

/** 记忆碎片按 id 查（初诊 memoryFragments + 复诊 followUpFragments），找不到返回 undefined */
export function fragmentById(
  p: PatientScenario,
  id: string
): MemoryFragment | undefined {
  return [...(p.memoryFragments ?? []), ...(p.followUpFragments ?? [])].find(
    (f) => f.id === id
  );
}

/** 该患者可解锁的碎片总数（初诊 + 复诊），用于「未集齐」提示 */
export function fragmentCount(p: PatientScenario): number {
  return (p.memoryFragments?.length ?? 0) + (p.followUpFragments?.length ?? 0);
}

/** 已解锁碎片（按 game.unlockedFragments[p.id] 顺序），id 找不到的条目跳过 */
export function unlockedFragmentsFor(
  game: GameState,
  p: PatientScenario
): MemoryFragment[] {
  const ids = game.unlockedFragments[p.id] ?? [];
  return ids
    .map((id) => fragmentById(p, id))
    .filter((f): f is MemoryFragment => !!f);
}

/**
 * 碎片系统存在且全部解锁：true 时才揭示完整真相（PRD 场景4 泄底封口出口）。
 * 泄底封口：仅此判定为 true 时，调用方才允许在档案集齐区块渲染 p.truth。
 */
export function allFragmentsCollected(
  game: GameState,
  p: PatientScenario
): boolean {
  return (
    fragmentCount(p) > 0 &&
    unlockedFragmentsFor(game, p).length >= fragmentCount(p)
  );
}

export type ArchiveStatusKind =
  | "closed" // 已结案：patientRecords[id] 存在
  | "abandoned" // 已离场 · 放弃治疗
  | "discharged" // 已离场（结案离场/回访后离场）
  | "followup" // 复诊中
  | "active"; // 候诊 / 治疗中

export interface ArchiveStatus {
  kind: ArchiveStatusKind;
  /** kind === "closed" 时的结局类型 */
  ending?: EndingType;
  /** kind === "active" 时的已等待天数 */
  waitDays?: number;
}

/**
 * 状态推导优先级（brief 原文）：
 * 1. patientRecords[id] 存在 → 已结案
 * 2. abandoned 含 id → 已离场 · 放弃治疗
 * 3. discharged 含 id → 已离场
 * 4. followUpCount[id] > 0 且未结案 → 复诊中
 * 5. 其余（todayServed/waitingDays）→ 候诊 / 治疗中
 */
export function deriveArchiveStatus(game: GameState, id: string): ArchiveStatus {
  const rec = game.patientRecords[id];
  if (rec) return { kind: "closed", ending: rec };
  if (game.abandoned.includes(id)) return { kind: "abandoned" };
  if (game.discharged.includes(id)) return { kind: "discharged" };
  if ((game.followUpCount[id] ?? 0) > 0) return { kind: "followup" };
  return { kind: "active", waitDays: game.waitingDays[id] ?? 0 };
}

/** 档案页状态文案（仅表面级，不涉及真相） */
export function archiveStatusText(status: ArchiveStatus): string {
  switch (status.kind) {
    case "closed":
      return status.ending ? `已结案 · ${endingLabel(status.ending)}` : "已结案";
    case "abandoned":
      return "已离场 · 放弃治疗";
    case "discharged":
      return "已离场";
    case "followup":
      return "复诊中";
    case "active":
      return status.waitDays && status.waitDays > 0
        ? `候诊中 · 已等待 ${status.waitDays} 天`
        : "候诊 / 治疗中";
  }
}

/** 档案筛选：全部 / 已结案(已治愈) / 碎片未集齐 */
export type ArchiveFilter = "all" | "closed" | "incomplete";

/**
 * 档案筛选纯函数：
 * - "all"：原样返回入参。
 * - "closed"：只保留 patientRecords[id] 存在的患者（PRD 场景4 基本状态「已治愈」对应结案）。
 * - "incomplete"：只保留有碎片系统（fragmentCount > 0）且未全部集齐的患者。
 * 保持入参顺序（手写在前、生成在后）。
 */
export function filterArchivePatients(
  patients: PatientScenario[],
  game: GameState,
  filter: ArchiveFilter
): PatientScenario[] {
  switch (filter) {
    case "all":
      return patients;
    case "closed":
      return patients.filter(
        (p) => deriveArchiveStatus(game, p.id).kind === "closed"
      );
    case "incomplete":
      return patients.filter(
        (p) => fragmentCount(p) > 0 && !allFragmentsCollected(game, p)
      );
  }
}
