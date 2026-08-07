"use client";

import { useEffect, useRef } from "react";
import Phaser from "phaser";
import { createGame } from "./game";

/** Phaser 画布挂载组件：useEffect 创建 / cleanup destroy(true) 防泄漏 */
export function GameCanvas({ className = "" }: { className?: string }) {
  const holderRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!holderRef.current || gameRef.current) return;
    const game = createGame(holderRef.current);
    gameRef.current = game;
    return () => {
      game.destroy(true);
      gameRef.current = null;
    };
  }, []);

  return <div ref={holderRef} className={`phaser-canvas ${className}`} />;
}
