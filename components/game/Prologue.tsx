"use client";

import { useState } from "react";
import { useGame } from "@/lib/hooks/useGame";

/** 序章四幕：点击逐段推进，末幕「走进诊所」接新手引导 */
const ACTS = [
  {
    label: "幕一 · 困在城市里",
    text: "你曾被困在城市里太久——早高峰的地铁、改不完的方案、永远在线的群消息。直到某个深夜，你盯着屏幕里那个疲惫的自己，忽然不想再这样活下去了。",
  },
  {
    label: "幕二 · 转身",
    text: "你辞了职，用半年时间考下心理咨询师证。没人看好你，连你自己也说不清，这算逃离，还是某种靠近。",
  },
  {
    label: "幕三 · 森林边上",
    text: "你来到一个陌生的城市，在森林边盘下这间闲置的小诊所。推开门，木头和旧书的气味扑面而来——你闻到一种叫自由的东西。",
  },
  {
    label: "幕四 · 第一束光",
    text: "挂钟还没修好，门牌已经挂上你的名字。第一位患者，正走在来的路上。",
  },
] as const;

export function Prologue() {
  const { dismissPrologue, playSound } = useGame();
  const [idx, setIdx] = useState(0);

  const act = ACTS[idx];
  const last = idx >= ACTS.length - 1;

  const advance = () => {
    if (last) {
      dismissPrologue();
      return;
    }
    playSound("page");
    setIdx((i) => i + 1);
  };

  return (
    <div className="prologue" role="dialog" aria-modal="true" aria-label="序章" onClick={advance}>
      <div className="prologue-content" key={idx}>
        <div className="prologue-act">{act.label}</div>
        <p className="prologue-text">{act.text}</p>
        {last ? (
          <button
            className="prologue-enter"
            onClick={(e) => {
              e.stopPropagation();
              dismissPrologue();
            }}
          >
            走进诊所
          </button>
        ) : (
          <div className="prologue-hint">点击继续 ▸</div>
        )}
      </div>
      <div className="prologue-dots">
        {ACTS.map((_, i) => (
          <span key={i} className={`prologue-dot ${i === idx ? "active" : ""}`} />
        ))}
      </div>
    </div>
  );
}
