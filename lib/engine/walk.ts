/**
 * 通用走线驱动器（四线验收用）：
 * 用真实 DialogueEngine 驱动一个患者剧本走到底，按偏好策略在 doctor 节点自动选选项。
 * 被两类调用方复用：
 *   - 走线验收测试（lib/data/*-walk.test.ts，含转换器 --walk 生成的那批）
 *   - 剧本数值自洽的通用断言
 * 本模块是纯运行时代码，不依赖 vitest。
 */
import { DialogueEngine } from "./DialogueEngine";
import { createInitialState } from "../state/GameState";
import type { PatientScenario, DialogueChoice, EndingType } from "../types";

const noop = () => undefined;

/** 走线结果 */
export interface WalkResult {
  ending: EndingType;
  trust: number;
  truth: number;
  defense: number;
  mood: number;
  rounds: number;
  memories: string[];
}

/** 选项选择策略：给定可用选项、当前状态与已走轮数，返回要选的选项 */
export type WalkPick = (
  choices: DialogueChoice[],
  state: { trust: number; truth: number },
  round: number
) => DialogueChoice;

/** 走一条完整会话线 */
export function walkScenario(scenario: PatientScenario, pick: WalkPick): WalkResult {
  const game = createInitialState();
  const memories: string[] = [];
  let ending: EndingType = "cure";
  const callbacks = {
    onStateChange: noop,
    onNodeEnter: noop,
    onFloatingText: noop,
    onMemoryTrigger: (f: { id: string }) => memories.push(f.id),
    onEnding: (e: EndingType) => (ending = e),
  };
  let eng = new DialogueEngine(scenario, game, callbacks);
  eng.start();
  const seen = new Set<string>();
  let guard = 0;
  while (guard++ < 500) {
    const node = eng.getCurrentNode();
    if (node.isEnding) break;
    // 节拍边界（beatEnd，治疗分期复诊）：患者离开诊室，跨节拍从下一节拍起始节点继续
    // （走线验收把「复诊到访」抽象为直接跳到 resumeNode，保留四维状态与已触发碎片）
    if (node.beatEnd) {
      eng = new DialogueEngine(scenario, game, callbacks, {
        nodeId: node.beatEnd.resumeNode,
        state: eng.getState(),
        triggeredMemories: eng.getTriggeredMemories(),
      });
      eng.start();
      continue;
    }
    if (node.choices && node.choices.length > 0) {
      // 过滤不可选选项（与引擎 meetsRequirement 同款判定，供策略只看到可选项）
      const choices = node.choices.filter((c) => {
        const r = c.require;
        if (!r) return true;
        const st = eng.getState();
        if (r.trust !== undefined && st.trust < r.trust) return false;
        if (r.trustAtMost !== undefined && st.trust > r.trustAtMost) return false;
        if (r.defense !== undefined && st.defense > r.defense) return false;
        if (r.mood !== undefined && st.mood < r.mood) return false;
        if (r.truth !== undefined && st.truth < r.truth) return false;
        return true;
      });
      if (choices.length === 0) break; // 无可用选项（不该发生，防御）
      const st = eng.getState();
      const ch = pick(choices, { trust: st.trust, truth: st.truth }, st.round);
      // 防循环：同一节点同一选项不重复
      const key = node.id + "|" + ch.id;
      if (seen.has(key)) break;
      seen.add(key);
      eng.choose(ch);
    } else {
      eng.continue();
    }
  }
  const s = eng.getState();
  return {
    ending,
    trust: s.trust,
    truth: s.truth,
    defense: s.defense,
    mood: s.mood,
    rounds: s.round,
    memories,
  };
}

/** 内置策略集（四线） */
export const PICKS = {
  /** 共情最优线：只选共情/沉默/特殊，不碰 probe 与失误项 → 预期 cure */
  empathy(choices: DialogueChoice[]) {
    return choices.find((c) => c.kind === "empathy" || c.kind === "silence" || c.kind === "special") ?? choices[0];
  },
  /**
   * 均衡线：前期（信任 <50）共情偏重（每 3 轮 1 次探问），后期（信任 ≥50，真相阶段）探问偏重
   * （每 3 轮 2 次探问）→ 预期 cure + 触发该档应有碎片
   */
  balanced(choices: DialogueChoice[], st: { trust: number }, round: number) {
    const good = choices.filter(
      (c) => c.kind === "empathy" || c.kind === "probe" || c.kind === "silence" || c.kind === "special"
    );
    const pool = good.length > 0 ? good : choices;
    const emp = pool.find((c) => c.kind === "empathy" || c.kind === "silence");
    const probe = pool.find((c) => c.kind === "probe");
    const special = pool.find((c) => c.kind === "special");
    const wantProbe = st.trust >= 50 ? round % 3 !== 0 : round % 3 === 0;
    if (wantProbe && probe) return probe;
    // 关键分叉处 special（安全网/cure 主线）优先于共情，保证均衡线走 cure
    if (special) return special;
    if (emp) return emp;
    if (probe) return probe;
    return pool[0];
  },
  /** 探问专精线：优先 probe，无 probe 时走特殊/安全网再共情 → 预期 cure + truth 冲顶 */
  probe(choices: DialogueChoice[]) {
    const probe = choices.find((c) => c.kind === "probe");
    if (probe) return probe;
    const special = choices.find((c) => c.kind === "special");
    if (special) return special;
    return choices.find((c) => c.kind === "empathy" || c.kind === "silence") ?? choices[0];
  },
  /** 系统性失误线：只选说教类失误项 → 预期 trust 跌破门槛，恶化入口可见，worsen */
  mistake(choices: DialogueChoice[]) {
    return choices.find((c) => c.kind === "logic" || c.kind === "prescribe") ?? choices[0];
  },
};
