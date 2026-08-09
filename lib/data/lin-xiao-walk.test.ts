import { describe, it, expect } from "vitest";
import { patientA } from "./patients";
import { walkScenario, PICKS } from "../engine/walk";

describe("林晓剧本走线验证（v3 · 100 轮会谈节拍制）", () => {
  // 共情最优线：只选共情/沉默/特殊 → cure，trust 88 锚点达标，恰好 100 轮
  it("共情最优线 → cure，trust 88，100 轮", () => {
    const r = walkScenario(patientA, PICKS.empathy);
    expect(r.ending).toBe("cure");
    expect(r.trust).toBe(88);
    expect(r.rounds).toBe(100);
  });

  // 均衡线：共情/探问混合 → cure；m1+m2 为均衡玩家应触发，m3@80 属探问专精（剧本设计）
  it("均衡线 → cure，trust 88，碎片 m1+m2 触发（m3 属探问专精）", () => {
    const r = walkScenario(patientA, PICKS.balanced);
    expect(r.ending).toBe("cure");
    expect(r.trust).toBe(88);
    expect(r.memories).toContain("lin_m1");
    expect(r.memories).toContain("lin_m2");
  });

  // 探问专精线：优先 probe，分叉走安全网 → cure，truth 冲顶
  it("探问专精线 → cure，truth 100，全碎片", () => {
    const r = walkScenario(patientA, PICKS.probe);
    expect(r.ending).toBe("cure");
    expect(r.truth).toBe(100);
    expect(r.memories).toContain("lin_m1");
    expect(r.memories).toContain("lin_m2");
    expect(r.memories).toContain("lin_m3");
  });

  // 系统性失误线：只选说教项 → trust 跌破 70，恶化入口可见，worsen
  it("系统性失误线 → 恶化入口可见，worsen 结局", () => {
    const r = walkScenario(patientA, PICKS.mistake);
    expect(r.ending).toBe("worsen");
    expect(r.trust).toBeLessThanOrEqual(70);
  });
});
