"use client";

import { useGame } from "@/lib/hooks/useGame";

export function Overlays() {
  const { toasts, floatingTexts } = useGame();
  return (
    <>
      {/* Toast */}
      <div className="toast-layer">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.kind ?? "info"}`}>
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
  // 锚定在对话舞台（左侧患者立绘）附近，随机小幅散开避免叠字
  const x =
    typeof window !== "undefined"
      ? window.innerWidth * 0.24 + (Math.random() - 0.5) * 150
      : 300;
  const y =
    typeof window !== "undefined"
      ? window.innerHeight * 0.36 + (Math.random() - 0.5) * 100
      : 300;
  return (
    <div
      className={`floating-text ${kind}`}
      style={{ left: `${x}px`, top: `${y}px` }}
    >
      {text}
    </div>
  );
}
