"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { createPortal } from "react-dom";
import { ClinicHall } from "./ClinicHall";

/** Phaser 大厅场景壳：场景画布 + 预约清单浮层入口（M1 过渡：功能不丢） */
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
    </div>
  );
}
