"use client";

import { useMemo } from "react";
import type { GameMessage } from "@/lib/types";
import { allPatients } from "@/lib/data/patients";
import { ChibiCharacter } from "./ChibiCharacter";

const toneEmotion: Record<"thanks" | "neutral" | "sad" | "dark", "happy" | "calm" | "sad" | "anxious"> = {
  thanks: "happy",
  neutral: "calm",
  sad: "sad",
  dark: "anxious",
};

const TONE_SEAL: Record<"thanks" | "neutral" | "sad" | "dark", string> = {
  thanks: "平安",
  neutral: "顺遂",
  sad: "静好",
  dark: "守候",
};

/**
 * 信纸质感弹窗：点击消息盒子里的来信后弹出，独立展示完整信件内容。
 * 米黄纸纹 + 横线排版 + 封蜡印章，营造手写信的氛围。
 */
export function LetterModal({
  message,
  onClose,
}: {
  message: GameMessage;
  onClose: () => void;
}) {
  const pal = useMemo(() => {
    if (!message.patientName) return undefined;
    return [...allPatients].find((p) => p.name === message.patientName)?.palette;
  }, [message.patientName]);

  const tone = message.tone ?? "neutral";

  return (
    <div className="letter-modal-mask" onClick={onClose}>
      {/* 打开信封动画：信封 flap 翻开 → 淡出，信纸随之展开 */}
      <div className="letter-envelope" aria-hidden="true">
        <div className="envelope-body" />
        <div className="envelope-flap">
          <span className="envelope-seal">{TONE_SEAL[tone]}</span>
        </div>
      </div>
      <div
        className="letter-modal"
        role="dialog"
        aria-modal="true"
        aria-label={message.title}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="letter-modal-close" onClick={onClose} aria-label="关闭信笺">
          ✕
        </button>
        <div className="letter-modal-seal">
          <span>{TONE_SEAL[tone]}</span>
        </div>
        <div className="letter-modal-head">
          {pal ? (
            <div className="letter-modal-avatar">
              <ChibiCharacter palette={pal} emotion={toneEmotion[tone]} size="sm" />
            </div>
          ) : null}
          <div className="letter-modal-from">致 森林诊所的医生</div>
          <div className="letter-modal-sign">
            {message.patientName ? `—— ${message.patientName}` : ""}
          </div>
        </div>
        <h3 className="letter-modal-title">{message.title}</h3>
        <p className="letter-modal-body">{message.body}</p>
        <div className="letter-modal-footer">
          <span className="letter-modal-date">第 {message.day} 天</span>
          <button className="letter-modal-done" onClick={onClose}>
            合上信笺
          </button>
        </div>
      </div>
    </div>
  );
}
