"use client";

import { GameProvider } from "@/lib/hooks/useGame";
import { GameApp } from "./GameApp";

/** 客户端壳：注入 GameProvider，承载整个游戏 */
export default function GameShell() {
  return (
    <GameProvider>
      <GameApp />
    </GameProvider>
  );
}
