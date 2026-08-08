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
import type { ChoiceEffect, EndingType } from "@/lib/types";

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
  const { ending, title, text, reward, patientName, patientSurface } = endingData;
  const palette = endingData.patientPalette ?? DEFAULT_PALETTE;
  const isSensitive = SENSITIVE_ENDINGS.has(ending);
  const showChooser = isSensitive && mode === "choose";
  const showSkipped = isSensitive && (mode === "auto" || skipped);
  const recap = patientSurface ? recapLines(ending, patientSurface) : null;

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
            {recap ? (
              <div className="ending-recap">
                <div className="ending-recap-title">✎ {recap.title}</div>
                <p className="ending-recap-line">{recap.lines[0]}</p>
                <p className="ending-recap-line">{recap.lines[1]}</p>
              </div>
            ) : null}
            <div className="ending-warmth">
              <div className="ending-warmth-mark">✦ 温暖回响</div>
              <div className="ending-warmth-text">
                {warmthEcho(ending, patientName)}
              </div>
            </div>
          </>
        )}

        {reward && !showSkipped ? <Rewards r={reward} /> : null}

        <button className="ending-btn" onClick={dismissEnding}>
          回到诊所
        </button>

        <div className="ending-help">
          <div className="ending-help-line">{HELP_CARD_MARK}</div>
          <p>{HELP_CARD_TEXT}</p>
          <div className="ending-help-hotline">
            <span>{HELP_LINE_NAME}</span>
            <b>{HELP_CARD_LINE}</b>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 叙事式真相复盘文案模板（纯呈现层）：
 * 上句引「表象」（surface）——她来时，是{surface}。
 * 下句按结局类型写「现状/钩子」，留钩子不揭真相；绝不输出 truth 字段文本。
 * surface 为空时由调用方整块隐藏，不进入此处。
 */
function recapLines(
  ending: EndingType,
  surface: string
): { title: string; lines: [string, string] } {
  const hook: Record<EndingType, string> = {
    cure: "这一程，TA身上那层所有人都以为的「没问题」被轻轻放下了。真正的答案，还藏在TA的记忆深处——也许下一次，TA愿意讲给你听。",
    acceptance: "这一程，TA学会了带着那层「没问题」继续向前。可有些话TA仍没说出口，真正的答案，还锁在记忆深处。",
    awakening: "这一程，TA在镜子里看清了自己的一部分。可镜子背面还有一行TA没读完的字——那些字，仍留在TA的记忆深处。",
    transfer: "这一程，你陪TA走到了你能陪的尽头。TA的故事还差最后一页，而那页纸，藏在TA自己的记忆里，尚未被翻开。",
    dependent: "这一程，TA紧紧握住了你的手。可有些裂缝，握得越紧越难愈合——TA真正的答案，还锁在记忆深处。",
    worsen: "这一程，裂缝比想象中更深。你没能为TA补上，却看清了它最初的形状——它最早，并不是裂在这里的。",
    tragic: "这一程，有些页你没能翻过去。可你最后看见的TA，从来不是TA来时那一个。TA的故事，停在了无人读完的地方。",
    hidden: "这一程，你替TA守住了谁都不知道的秘密。而秘密最深处的那只抽屉，仍锁在TA的记忆里——钥匙，只在TA自己手中。",
  };
  // 修复：surface 自带句号（如「严重失眠、轻度抑郁。」）时去掉，避免双句号
  const surfaceClean = surface.replace(/[。．.]+$/, "");
  return { title: "你看见的 TA", lines: [`TA来时，是${surfaceClean}。`, hook[ending]] };
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
