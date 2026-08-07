"use client";

import React, { useEffect } from "react";
import { useGameStore } from "@/lib/store";
import type { GameStore } from "@/lib/store";
import type { DialogueChoice, PatientState } from "@/lib/types";

// 兼容层：保持既有 useGame() API，内部委托给 zustand store。
// 组件无需任何改动；要细粒度订阅性能时可改用 useGameStore((s) => s.x)。
export type Scene = GameStore["scene"];
export type ToastItem = GameStore["toasts"][number];
export type FloatingItem = GameStore["floatingTexts"][number];
export type EndingData = GameStore["endingData"];
export type GameContextValue = GameStore;

export function useGame(): GameContextValue {
  return useGameStore();
}

/** 客户端壳：仅负责一次性初始化 store（成就引擎/持久化探测） */
export function GameProvider({ children }: { children: React.ReactNode }) {
  const init = useGameStore((s) => s.init);
  useEffect(() => {
    init();
  }, [init]);
  return <>{children}</>;
}

// 供 DialogueScene 使用的类型：会话内回调
export interface SessionHooks {
  onChoiceMade?: (choice: DialogueChoice) => void;
  onComboTrigger?: (count: number) => void;
  onStateUpdate?: (state: PatientState) => void;
}
