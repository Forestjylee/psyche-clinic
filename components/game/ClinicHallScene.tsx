"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ClinicHall } from "./ClinicHall";
import { ClinicUpgrades } from "./ClinicUpgrades";
import { bridge, EVENTS } from "@/lib/bridge/EventBridge";
import type {
  FacilityDroppedEvent,
  PatientClickedEvent,
} from "@/lib/bridge/types";
import { useGameStore } from "@/lib/store";
import { allPatients } from "@/lib/data/patients";

/** Phaser 大厅场景壳：场景画布 + 预约清单浮层 + 设施升级面板浮层 */
const GameCanvas = dynamic(
  () => import("./phaser/GameCanvas").then((m) => m.GameCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="phaser-canvas phaser-loading">诊所准备中…</div>
    ),
  }
);

export function ClinicHallScene() {
  const [listOpen, setListOpen] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [decorating, setDecorating] = useState(false);
  // 订阅 game 引用：数据变更（接诊/休息/生成等）→ 通知 Phaser 刷新候诊小人
  const gameRef = useGameStore((s) => s.game);

  // 首启引导 → 自动打开预约清单（spotlight 目标在清单弹层内）
  useEffect(() => {
    const off = bridge.on(EVENTS.openAppointmentList, () => {
      setListOpen(true);
    });
    return off;
  }, []);

  // 玩家点击场景设施 → 打开升级面板
  useEffect(() => {
    const off = bridge.on(EVENTS.facilityClicked, () => {
      setUpgradeOpen(true);
    });
    return off;
  }, []);

  // 装修模式落格 → 持久化位置
  useEffect(() => {
    const off = bridge.on(EVENTS.facilityDropped, (e: FacilityDroppedEvent) => {
      useGameStore.getState().setFacilityPosition(e.id, e.x, e.y);
    });
    return off;
  }, []);

  // 玩家点击候诊患者 → 找到剧本并开诊（M3 前保持现有 DOM 对话流程）
  useEffect(() => {
    const off = bridge.on(EVENTS.patientClicked, (e: PatientClickedEvent) => {
      const g = useGameStore.getState().game;
      const p = [...allPatients, ...g.generatedScenarios].find(
        (s) => s.id === e.id
      );
      if (p) useGameStore.getState().startSession(p);
    });
    return off;
  }, []);

  // 数据变更 → 通知 Phaser 重绘候诊小人（去重：引用未变则跳过）
  const lastGameRef = useRef(gameRef);
  useEffect(() => {
    if (lastGameRef.current === gameRef) return;
    lastGameRef.current = gameRef;
    bridge.emit(EVENTS.refreshPatients, { ids: [] });
  }, [gameRef]);

  const toggleDecorate = (on: boolean) => {
    setDecorating(on);
    bridge.emit(EVENTS.decorateMode, { on });
  };

  return (
    <div className="clinic-scene-root">
      <GameCanvas />
      <button
        className="clinic-list-toggle"
        onClick={() => setListOpen(true)}
        title="预约清单"
      >
        📋 预约清单
      </button>
      {listOpen
        ? createPortal(
            <div
              className="clinic-list-mask"
              onClick={() => setListOpen(false)}
            >
              <ClinicHall />
              <button
                className="clinic-list-close"
                onClick={() => setListOpen(false)}
              >
                ← 返回诊所
              </button>
            </div>,
            document.body
          )
        : null}
      {upgradeOpen
        ? createPortal(
            <div
              className="clinic-list-mask"
              onClick={() => {
                if (decorating) toggleDecorate(false);
                setUpgradeOpen(false);
              }}
            >
              <ClinicUpgrades
                onClose={() => {
                  if (decorating) toggleDecorate(false);
                  setUpgradeOpen(false);
                }}
                decoratable
                decorating={decorating}
                onDecorate={() => toggleDecorate(!decorating)}
              />
              {decorating ? (
                <button
                  className="clinic-list-close"
                  onClick={() => {
                    toggleDecorate(false);
                    setUpgradeOpen(false);
                  }}
                >
                  ✓ 完成装修
                </button>
              ) : null}
            </div>,
            document.body
          )
        : null}
    </div>
  );
}
