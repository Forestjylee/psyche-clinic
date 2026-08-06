"use client";

import React, { useEffect, useRef, useState } from "react";
import { tokenizeWithTerms } from "@/lib/utils/psychHighlight";
import { PsychTermSpan } from "./PsychTermSpan";
import { useGame } from "@/lib/hooks/useGame";

/**
 * 打字机文本：逐 token 显示，命中心理学词汇作为整体一次性渲染（不被截断）。
 * 点击文本可跳过至完整显示。
 */
export function TypewriterText({ text }: { text: string }) {
  const tokens = useRef(tokenizeWithTerms(text));
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const timer = useRef<number | null>(null);
  const { playSound } = useGame();
  const tickAccum = useRef(0);

  useEffect(() => {
    tokens.current = tokenizeWithTerms(text);
    setCount(0);
    setDone(false);
    if (timer.current) window.clearInterval(timer.current);
    timer.current = window.setInterval(() => {
      setCount((c) => {
        if (c >= tokens.current.length) {
          if (timer.current) window.clearInterval(timer.current);
          timer.current = null;
          setDone(true);
          return c;
        }
        // 轻微打字音效（隔几个字符响一次，避免噪音）
        tickAccum.current += 1;
        if (tickAccum.current % 4 === 0) playSound("hover");
        return c + 1;
      });
    }, 24);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const skip = () => {
    if (timer.current) {
      window.clearInterval(timer.current);
      timer.current = null;
    }
    setCount(tokens.current.length);
    setDone(true);
  };

  const visible = tokens.current.slice(0, count);

  return (
    <div className={`dialogue-text ${done ? "" : "typing"}`} onClick={skip}>
      {visible.map((t, i) =>
        t.type === "term" ? (
          <PsychTermSpan key={i} termId={t.termId!}>
            {t.value}
          </PsychTermSpan>
        ) : (
          <React.Fragment key={i}>{t.value}</React.Fragment>
        )
      )}
    </div>
  );
}
