"use client";

import { useEffect, useState } from "react";
import { useGame } from "@/lib/hooks/useGame";
import {
  endingColor,
  endingLabel,
  endingEmotion,
  warmthEcho,
  HELP_CARD_MARK,
  HELP_CARD_TEXT,
  HELP_CARD_LINE,
  HELP_LINE_NAME,
  SKIP_SENSITIVE_KEY,
  SENSITIVE_ENDINGS,
} from "./constants";
import { ChibiCharacter } from "./ChibiCharacter";
import type { ChoiceEffect } from "@/lib/types";

const DEFAULT_PALETTE = { primary: "#8a9a5b", secondary: "#6b7a4f", fog: "#efe7d8", bright: "#a8c06a" };

export function EndingOverlay() {
  const { endingData, dismissEnding } = useGame();
  const [mode, setMode] = useState<"auto" | "choose" | "full">("auto");
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    // 打开结局页时按记忆的偏好决定展示方式
    let saved = false;
    try {
      saved = localStorage.getItem(SKIP_SENSITIVE_KEY) === "1";
    } catch {
      saved = false;
    }
    if (saved) setMode("auto");
    else setMode("choose");
  }, [endingData?.ending]);

  if (!endingData) return null;
  const { ending, title, text, reward, patientName } = endingData;
  const palette = endingData.patientPalette ?? DEFAULT_PALETTE;
  const isSensitive = SENSITIVE_ENDINGS.has(ending);
  const showChooser = isSensitive && mode === "choose";
  const showSkipped = isSensitive && (mode === "auto" || skipped);

  const rememberAndSkip = () => {
    try {
      localStorage.setItem(SKIP_SENSITIVE_KEY, "1");
    } catch {
      /* ignore */
    }
    setSkipped(true);
  };

  return (
    <div className="ending-overlay">
      <div className="ending-card">
        <div className={`ending-type-label ${ending}`}>
          {endingLabel(ending)} ENDING
        </div>
        <div className={`ending-chibi ${isSensitive ? "sensitive" : ""}`}>
          <ChibiCharacter palette={palette} emotion={endingEmotion[ending]} size="lg" />
        </div>
        <div className="ending-title" style={{ color: endingColor(ending) }}>
          {title}
        </div>

        {showChooser ? (
          <div className="ending-skip">
            <p className="ending-skip-placeholder">
              这一段结局讲述了较为沉重的剧情，可能让你或身边的人感到不适。
            </p>
            <div className="ending-skip-actions">
              <button className="ending-skip-btn primary" onClick={rememberAndSkip}>
                跳过这段演出
              </button>
              <button className="ending-skip-btn ghost" onClick={() => setMode("full")}>
                继续观看
              </button>
            </div>
            <div className="ending-skip-mem">
              选择「跳过」后，我会记住你的偏好，之后自动跳过这类结局的演出。
            </div>
          </div>
        ) : (
          <>
            <div className="ending-text">
              {showSkipped ? (
                <span className="ending-skip-short">
                  {patientName ? `${patientName} ` : ""}这段故事告一段落。如果现实中有谁正在经历类似的困扰，请记得向专业人士求助。
                </span>
              ) : (
                text
              )}
            </div>
            <div className="ending-warmth">
              <div className="ending-warmth-mark">✦ 温暖回响</div>
              <div className="ending-warmth-text">
                {warmthEcho(ending, patientName)}
              </div>
            </div>
          </>
        )}

        {reward && !showSkipped ? <Rewards r={reward} /> : null}

        <div className="ending-help">
          <div className="ending-help-line">{HELP_CARD_MARK}</div>
          <p>{HELP_CARD_TEXT}</p>
          <div className="ending-help-hotline">
            <span>{HELP_LINE_NAME}</span>
            <b>{HELP_CARD_LINE}</b>
          </div>
        </div>

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
