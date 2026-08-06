import { allPsychTerms } from "@/lib/data/psychTerms";

export interface TermToken {
  type: "text" | "term";
  /** text 类型：单个字符；term 类型：完整词汇文本 */
  value: string;
  termId?: string;
}

/**
 * 将纯文本切分为 token 序列：
 * - 普通文字 → 每个字符一个 token（便于打字机逐字渲染）
 * - 命中的心理学词汇 → 整个词汇作为一个 token（不被拆开）
 * 长词优先，消除重叠。
 */
export function tokenizeWithTerms(plain: string): TermToken[] {
  if (!plain) return [];
  const hits: Array<{ start: number; end: number; term: string; termId: string }> = [];
  for (const pt of allPsychTerms) {
    const all = [pt.term, ...(pt.aliases ?? [])];
    for (const s of all) {
      if (!s) continue;
      let idx = plain.indexOf(s);
      while (idx !== -1) {
        hits.push({ start: idx, end: idx + s.length, term: s, termId: pt.id });
        idx = plain.indexOf(s, idx + s.length);
      }
    }
  }
  hits.sort((a, b) => a.start - b.start || (b.end - b.start) - (a.end - a.start));
  const kept: typeof hits = [];
  for (const h of hits) {
    const last = kept[kept.length - 1];
    if (!last || h.start >= last.end) kept.push(h);
  }
  const tokens: TermToken[] = [];
  let cur = 0;
  for (const h of kept) {
    if (h.start > cur) {
      for (const ch of Array.from(plain.slice(cur, h.start))) {
        tokens.push({ type: "text", value: ch });
      }
    }
    tokens.push({ type: "term", value: h.term, termId: h.termId });
    cur = h.end;
  }
  if (cur < plain.length) {
    for (const ch of Array.from(plain.slice(cur))) {
      tokens.push({ type: "text", value: ch });
    }
  }
  return tokens;
}
