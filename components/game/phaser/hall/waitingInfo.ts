import type { PatientScenario } from "../../../../lib/types";
import {
  DECAY_START_DAY,
  WARN_DAY,
} from "../../../../lib/state/GameState";

/** 候诊状态分级（对齐 React 侧 decaying/critical 分段语义） */
export type WaitTier = "calm" | "decaying" | "critical";

/** 按等待天数分档：短候平静 → 长候焦虑/沉重 */
export function waitTier(days: number): WaitTier {
  if (days >= WARN_DAY) return "critical";
  if (days >= DECAY_START_DAY) return "decaying";
  return "calm";
}

/** 等待天数标签：N=0 显示"今日刚来"，N>0 显示"已等待 N 天" */
export function waitingDaysLabel(days: number): string {
  return days > 0 ? `已等待 ${days} 天` : "今日刚来";
}

/**
 * 各分级观察性状态语池（中性句式，不用"他/她"人称；随等待加重而"着急/沉重"）。
 * 每句 ≤7 字，保证在卡片单行放下（逻辑 10px 字宽）。
 */
const PHRASE_POOL: Record<WaitTier, readonly string[]> = {
  calm: ["比平时来得早", "安静地坐长椅上", "翻看手中的信件", "望着窗外发呆"],
  decaying: ["有些坐立不安", "不时望向诊室", "说话声越来越轻", "紧张地搓着衣角"],
  critical: ["反复起身张望", "脸色苍白憔悴", "整夜没睡好", "望着门口等答案"],
};

/** 兜底状态语：患者数据缺字段/推导失败时的最后兜底 */
export const FALLBACK_PHRASE = "安静地等着";

/** 简单字符串哈希：以 p.id 稳定取句，避免每次重绘随机跳词 */
function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/**
 * 从患者状态推导一句观察性状态语（纯函数，便于测试与复用）。
 * 按 waitingDays 分档取池（calm → decaying → critical），
 * 以 p.id 哈希在同级池内稳定选句；数据缺失时走 FALLBACK_PHRASE。
 */
export function waitingPhrase(p: PatientScenario, waitDays: number): string {
  const pool = PHRASE_POOL[waitTier(waitDays)];
  const seed = p.id || p.name;
  if (!seed || pool.length === 0) return FALLBACK_PHRASE;
  return pool[hashStr(seed) % pool.length];
}
