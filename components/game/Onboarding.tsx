"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useGame } from "@/lib/hooks/useGame";

/** 首次游玩标记 key */
export const ONBOARDED_KEY = "ps.onboarded";

/** 引导步骤定义：selector 定位高亮目标，文案气泡 */
const STEPS = [
  {
    target: ".patient-list .patient-card",
    title: "今日预约",
    text: "这里是今天的预约清单。每一位来访者都带着心事而来——点一位患者，坐下来，听他说。",
    place: "bottom",
  },
  {
    target: ".clinic-side .side-btn[data-guide='skills']",
    title: "个人成长",
    text: "接诊会获得经验。打开「技能树」可以学习话术，提升接诊效果。",
    place: "left",
  },
  {
    target: ".clinic-side .side-btn[data-guide='rest']",
    title: "休息一日",
    text: "一天接诊结束后，点击「休息一日」推进到明天，理智会恢复，也可能有新客户上门。",
    place: "left",
  },
] as const;

export function Onboarding() {
  const { game, playSound } = useGame();
  const [stepIdx, setStepIdx] = useState(0);
  const [show, setShow] = useState(false);
  const [box, setBox] = useState<{ x: number; y: number; w: number; h: number } | null>(null);

  // 首次进入大厅时展示（未标记过）
  useEffect(() => {
    if (typeof window === "undefined") return;
    let ok = false;
    try {
      ok = !localStorage.getItem(ONBOARDED_KEY);
    } catch {
      ok = true;
    }
    if (ok) {
      // 等布局稳定后计算高亮框
      const t = window.setTimeout(() => setShow(true), 400);
      return () => window.clearTimeout(t);
    }
  }, []);

  const step = STEPS[stepIdx];

  // 每步重新定位高亮框
  useEffect(() => {
    if (!show || !step) return;
    const el = document.querySelector<HTMLElement>(step.target);
    if (!el) return;
    const r = el.getBoundingClientRect();
    setBox({ x: r.x, y: r.y, w: r.width, h: r.height });
  }, [show, stepIdx, step]);

  const finish = useCallback(() => {
    try {
      localStorage.setItem(ONBOARDED_KEY, "1");
    } catch {
      /* noop */
    }
    setShow(false);
  }, []);

  const next = useCallback(() => {
    playSound("click");
    if (stepIdx >= STEPS.length - 1) finish();
    else setStepIdx((i) => i + 1);
  }, [stepIdx, finish, playSound]);

  if (!show || !box) return null;

  // 聚光灯：用四个暗化遮罩拼出"挖洞"效果
  const spot = {
    left: box.x,
    top: box.y,
    width: box.w,
    height: box.h,
  };

  return (
    <div className="onboarding" role="dialog" aria-modal="true" aria-label="新手引导">
      <div className="onboarding-hole-shadow" style={spot} />
      <div className="onboarding-hole" style={spot} />
      <div className="onboarding-tooltip">
        <div className="onboarding-tooltip-title">{step.title}</div>
        <p className="onboarding-tooltip-text">{step.text}</p>
        <div className="onboarding-tooltip-actions">
          <button className="onboarding-skip" onClick={() => { playSound("click"); finish(); }}>
            跳过引导
          </button>
          <button className="onboarding-next" onClick={next}>
            {stepIdx >= STEPS.length - 1 ? "开始接诊" : "下一步"}
          </button>
        </div>
      </div>
    </div>
  );
}
