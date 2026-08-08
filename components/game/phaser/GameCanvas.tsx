"use client";

import { useEffect, useRef } from "react";
import Phaser from "phaser";
import { createGame } from "./game";
import { HallScene } from "./hall/HallScene";

/** Phaser 画布挂载组件：useEffect 创建 / cleanup destroy(true) 防泄漏
 *  @param scenes 场景注册列表，默认 [HallScene]（现有调用方 ClinicHallScene 用默认）。 */
export function GameCanvas({
  className = "",
  scenes = [HallScene],
}: {
  className?: string;
  scenes?: Phaser.Types.Scenes.SceneType[];
}) {
  const holderRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!holderRef.current || gameRef.current) return;
    const game = createGame(holderRef.current, scenes);
    gameRef.current = game;
    return () => {
      game.destroy(true);
      gameRef.current = null;
    };
    // 只在挂载时创建一次；场景列表变更本任务不做热切换（后续接线时按需改为响应式）
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={holderRef} className={`phaser-canvas ${className}`} />;
}
