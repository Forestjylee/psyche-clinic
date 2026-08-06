"use client";

import type { CSSProperties } from "react";
import type { PatientEmotion, PatientPalette } from "@/lib/types";

interface ChibiCharacterProps {
  palette: PatientPalette;
  emotion?: PatientEmotion;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

/**
 * Chibi 角色：纯 CSS 手绘的大头圆身小人。
 * 颜色取自患者 palette，表情随情绪变化（眼/嘴/腮红）。
 * 纯装饰性元素，对屏幕阅读器隐藏。
 */
export function ChibiCharacter({
  palette,
  emotion = "neutral",
  size = "md",
  className = "",
}: ChibiCharacterProps) {
  return (
    <div
      className={`chibi size-${size} emo-${emotion} ${className}`}
      style={
        {
          "--fig-color": palette.primary,
          "--fig-body": palette.secondary,
        } as CSSProperties
      }
      aria-hidden
    >
      <div className="chibi-head">
        <div className="chibi-face">
          <span className="chibi-brow left" />
          <span className="chibi-brow right" />
          <span className="chibi-eye left" />
          <span className="chibi-eye right" />
          <span className="chibi-cheek left" />
          <span className="chibi-cheek right" />
          <span className="chibi-mouth" />
          <span className="chibi-tear left" />
          <span className="chibi-tear right" />
          <span className="chibi-sweat" />
        </div>
      </div>
      <div className="chibi-body" />
    </div>
  );
}
