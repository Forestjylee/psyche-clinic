"use client";

import { useCallback, useEffect, useState } from "react";
import { useGame } from "@/lib/hooks/useGame";

/** 首次游玩标记 key */
export const ONBOARDED_KEY = "ps.onboarded";

interface GuideStep {
  /** spotlight 目标（full 步骤无 target） */
  target?: string;
  title: string;
  text: string;
  place?: "bottom" | "left";
  /** 全屏说明面板（无聚光灯），用于讲解对话玩法 */
  full?: boolean;
  stats?: { label: string; color: string; value: number; desc: string }[];
  extra?: string;
}

/** 引导步骤定义：selector 定位高亮目标，文案气泡；最后一步为对话玩法全屏速览 */
const STEPS: GuideStep[] = [
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
  {
    full: true,
    title: "对话玩法",
    text: "坐进诊室后，你会看到来访者的四个状态。你的每一句话，都会推动它们变化：",
    stats: [
      { label: "信任", color: "var(--good)", value: 55, desc: "他是否愿意向你敞开心扉" },
      { label: "防御", color: "var(--bad)", value: 30, desc: "防备有多深，过高时他会拒绝回应" },
      { label: "心情", color: "var(--accent)", value: 60, desc: "此刻的情绪状态，低落时更脆弱" },
      { label: "真相", color: "var(--truth)", value: 25, desc: "揭开真正心结的进度" },
    ],
    extra:
      "有些选项会因前置要求或技能而锁定。对话中患者还会闪现记忆碎片——真正的心事，往往就藏在那里。",
  },
];

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
  const isFull = !!step.full;

  // 每步重新定位高亮框（全屏步骤无需定位）
  useEffect(() => {
    if (!show || !step || isFull) return;
    const el = document.querySelector<HTMLElement>(step.target!);
    if (!el) return;
    const r = el.getBoundingClientRect();
    setBox({ x: r.x, y: r.y, w: r.width, h: r.height });
  }, [show, stepIdx, step, isFull]);

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

  if (!show) return null;

  // 全屏面板：对话玩法速览
  if (isFull) {
    return (
      <div className="onboarding-full" role="dialog" aria-modal="true" aria-label={step.title}>
        <div className="onboarding-full-panel">
          <div className="onboarding-full-title">{step.title}</div>
          <p className="onboarding-full-text">{step.text}</p>
          <div className="onboarding-full-stats">
            {step.stats!.map((s) => (
              <div className="onboarding-stat" key={s.label}>
                <div className="onboarding-stat-head">
                  <span className="onboarding-stat-label" style={{ color: s.color }}>
                    {s.label}
                  </span>
                  <span className="onboarding-stat-desc">{s.desc}</span>
                </div>
                <div className="onboarding-stat-bar">
                  <span
                    className="onboarding-stat-fill"
                    style={{ width: `${s.value}%`, background: s.color, color: s.color }}
                  />
                </div>
              </div>
            ))}
          </div>
          {step.extra ? <p className="onboarding-full-extra">{step.extra}</p> : null}
          <div className="onboarding-tooltip-actions">
            <button className="onboarding-skip" onClick={() => { playSound("click"); finish(); }}>
              跳过引导
            </button>
            <button className="onboarding-next" onClick={next}>
              开始接诊
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 聚光灯步骤
  if (!box) return null;

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
