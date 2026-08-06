"use client";

import { useGame } from "@/lib/hooks/useGame";
import { endingColor, endingLabel, warmthEcho } from "./constants";
import type { ChoiceEffect } from "@/lib/types";

export function EndingOverlay() {
  const { endingData, dismissEnding } = useGame();
  if (!endingData) return null;
  const { ending, title, text, reward, patientName } = endingData;
  return (
    <div className="ending-overlay">
      <div className="ending-card">
        <div className={`ending-type-label ${ending}`}>
          {endingLabel(ending)} ENDING
        </div>
        <div className="ending-title" style={{ color: endingColor(ending) }}>
          {title}
        </div>
        <div className="ending-text">{text}</div>
        <div className="ending-warmth">
          <div className="ending-warmth-mark">✦ 温暖回响</div>
          <div className="ending-warmth-text">
            {warmthEcho(ending, patientName)}
          </div>
        </div>
        {reward ? <Rewards r={reward} /> : null}
        <button className="ending-btn" onClick={dismissEnding}>
          回到诊所
        </button>
      </div>
    </div>
  );
}

function Rewards({ r }: { r: ChoiceEffect }) {
  const items: { label: string; value: number; prefix: string }[] = [];
  if (r.doctorReputation) items.push({ label: "声望", value: r.doctorReputation, prefix: "+" });
  if (r.doctorSanity)
    items.push({ label: "理智", value: r.doctorSanity, prefix: r.doctorSanity > 0 ? "+" : "" });
  if (r.doctorMoney) items.push({ label: "金钱", value: r.doctorMoney, prefix: "+" });
  if (r.doctorExp) items.push({ label: "经验", value: r.doctorExp, prefix: "+" });
  return (
    <div className="ending-rewards">
      {items.map((it, i) => {
        const pos = it.value >= 0;
        return (
          <div className="reward-item" key={i}>
            <span className="reward-label">{it.label}</span>
            <span className={`reward-value ${pos ? "pos" : "neg"}`}>
              {it.prefix}
              {it.value}
            </span>
          </div>
        );
      })}
    </div>
  );
}
