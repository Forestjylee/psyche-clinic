"use client";

import dynamic from "next/dynamic";

// 游戏重度依赖浏览器 API（localStorage / Web Audio），以纯客户端方式加载避免水合不一致
const GameShell = dynamic(() => import("@/components/game/GameShell"), {
  ssr: false,
  loading: () => (
    <div className="title-screen">
      <div className="title-main">心灵诊疗室</div>
      <div className="title-sub">PSYCHE CLINIC</div>
      <div className="title-divider" />
      <div className="title-quote">载入中…</div>
    </div>
  ),
});

export default function Page() {
  return <GameShell />;
}
