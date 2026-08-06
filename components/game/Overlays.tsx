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
      {floatingTexts.map((f, i) => (
        <FloatingText
          key={f.id}
          text={f.text}
          kind={f.kind}
          index={i}
          total={floatingTexts.length}
        />
      ))}
    </>
  );
}

function FloatingText({
  text,
  kind,
  index,
  total,
}: {
  text: string;
  kind: string;
  index: number;
  total: number;
}) {
  // 锚定在对话舞台（左侧患者立绘）附近。
  // 多个浮动文字按索引纵向堆叠并整体居中，避免随机散开造成叠字；
  // 位置由 index 决定（确定性），re-render 不跳动。
  const baseX = typeof window !== "undefined" ? window.innerWidth * 0.24 : 300;
  const baseY = typeof window !== "undefined" ? window.innerHeight * 0.36 : 300;
  const rowGap = 46;
  const y = baseY + (index - (total - 1) / 2) * rowGap;
  const x = baseX + (index % 2 === 0 ? -24 : 24);
  return (
    <div
      className={`floating-text ${kind}`}
      style={{ left: `${x}px`, top: `${y}px` }}
    >
      {text}
    </div>
  );
}
