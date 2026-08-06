"use client";

import { useEffect, useState } from "react";
import { useGame } from "@/lib/hooks/useGame";

/** 场景转场遮罩 + 低理智心跳暗角 */
export function SceneEffects() {
  const { scene, game } = useGame();
  const [veil, setVeil] = useState(false);

  // 监听场景变化触发转场（由各场景自行控制，这里仅提供低理智暗角）
  useEffect(() => {
    void scene;
  }, [scene]);

  const lowSanity = scene !== "title" && game.doctor.sanity <= 35;

  return (
    <>
      <div className={`sanity-vignette ${lowSanity ? "active" : ""}`} />
    </>
  );
}

/** 触发一次转场遮罩动画，回调在遮罩最暗时执行 */
export function useVeil() {
  const [veilOn, setVeilOn] = useState(false);
  const trigger = (then: () => void) => {
    setVeilOn(true);
    window.setTimeout(() => {
      then();
      window.setTimeout(() => setVeilOn(false), 30);
    }, 320);
  };
  return { veilOn, trigger };
}
