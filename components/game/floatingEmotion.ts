/**
 * P2-5 浮动文字「机制语 → 情绪反馈」映射（呈现层纯函数）。
 *
 * 约束（PLAN §9）：不改引擎文案源。本模块只在浮动文字上屏前把引擎发出的
 * 机制句（combo / bad 的机制句）替换为情绪化人话；维度数值浮动
 * （「信任 +2 · 对方稍稍放松了些」等，带 flavorText，形如 `维度名 空格 ±数字`）
 * 原样保留，warn 保留原意。
 */

/** 机制句 → 情绪反馈 映射表：键为引擎原文案（lib/engine/DialogueEngine.ts），
 *  值为不上屏机制术语、只留情绪自然反馈的软文案。
 *  维度数值浮动与 warn 不会命中此表（键为精确原文案，形态与维度句不同）。 */
const MECHANISM_TO_EMOTION: Record<string, string> = {
  // combo：「话术连击·破防暴击！」→ 共情破防接质问被接住的暖反馈
  "话术连击·破防暴击！": "你正好接住了她的沉默，她被你触动了。",
  // bad 机制句：「时机不对·患者防御上升」→ 讲道理讲急了、防御收紧的软反馈
  "时机不对·患者防御上升": "话说急了些，她缩了回去。",
};

/**
 * 对浮动文字做机制语 → 情绪反馈映射。
 * @param text 引擎发出的浮动文案
 * @param kind 浮动类型（good/bad/warn/combo/truth）
 * @returns 仅机制句被替换为情绪语；维度数值浮动（good/bad/truth 带 flavorText）与 warn 原样返回。
 */
export function toEmotionalFloating(text: string, kind: string): string {
  // 只作用于机制句：combo 恒为机制句；bad 需区分机制句与维度负反馈（精确匹配天然区分）
  if (kind === "combo" || kind === "bad") {
    const mapped = MECHANISM_TO_EMOTION[text];
    if (mapped !== undefined) return mapped;
  }
  return text;
}
