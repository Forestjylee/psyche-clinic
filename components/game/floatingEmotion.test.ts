import { describe, expect, it } from "vitest";
import { toEmotionalFloating } from "./floatingEmotion";

describe("toEmotionalFloating 机制语 → 情绪反馈映射", () => {
  it("combo 机制句映射为暖情绪语（不上屏破防暴击）", () => {
    expect(toEmotionalFloating("话术连击·破防暴击！", "combo")).toBe(
      "你正好接住了她的沉默，她被你触动了。"
    );
  });

  it("bad 机制句映射为软情绪语（不上屏防御上升）", () => {
    expect(toEmotionalFloating("时机不对·患者防御上升", "bad")).toBe(
      "话说急了些，她缩了回去。"
    );
  });

  it("维度数值浮动（good/bad/truth 带 flavorText）原样保留", () => {
    expect(toEmotionalFloating("信任 +2 · 对方稍稍放松了些", "good")).toBe(
      "信任 +2 · 对方稍稍放松了些"
    );
    expect(toEmotionalFloating("防御 +15 · 对方的防备更紧了些", "bad")).toBe(
      "防御 +15 · 对方的防备更紧了些"
    );
    expect(toEmotionalFloating("心情 -2 · 对方的心事更沉了", "bad")).toBe(
      "心情 -2 · 对方的心事更沉了"
    );
    expect(toEmotionalFloating("真相 +10 · 记忆的碎片浮现", "truth")).toBe(
      "真相 +10 · 记忆的碎片浮现"
    );
  });

  it("warn 保留原意（锁定提示）", () => {
    expect(toEmotionalFloating("条件不满足", "warn")).toBe("条件不满足");
    expect(toEmotionalFloating("需要对应技能", "warn")).toBe("需要对应技能");
  });

  it("空文本/未知 kind 安全返回原文", () => {
    expect(toEmotionalFloating("", "combo")).toBe("");
    expect(toEmotionalFloating("任意文案", "unknown")).toBe("任意文案");
  });
});
