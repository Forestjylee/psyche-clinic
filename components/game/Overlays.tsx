"use client";

import { useGame } from "@/lib/hooks/useGame";

export function Overlays() {
  const { toasts, floatingTexts } = useGame();
  return (
    <>
      {/* Toast */}
      <div className="toast-layer">
        {toasts.map((t) => (
          <div key={t.id} className="toast">
            {t.msg}
          </div>
        ))}
      </div>
      {/* 浮动文字（数值变化反馈） */}
      {floatingTexts.map((f) => (
        <FloatingText key={f.id} text={f.text} kind={f.kind} />
      ))}
    </>
  );
}

function FloatingText({ text, kind }: { text: string; kind: string }) {
  // 随机位置在屏幕中部附近
  const x = typeof window !== "undefined" ? window.innerWidth * 0.5 + (Math.random() - 0.5) * 120 : 600;
  const y = typeof window !== "undefined" ? window.innerHeight * 0.5 + (Math.random() - 0.5) * 80 : 300;
  return (
    <div
      className={`floating-text ${kind}`}
      style={{ left: `${x}px`, top: `${y}px` }}
    >
      {text}
    </div>
  );
}
