"use client";

import { useCallback, useEffect, useState } from "react";
import { useGame } from "@/lib/hooks/useGame";

/** 首次游玩标记 key */
export const ONBOARDED_KEY = "ps.onboarded";

/** P4-4 边做边学：共情教学 / 锁定教学「已教过」标记 key（只走 localStorage，不落 GameState） */
export const TAUGHT_EMPATHY_KEY = "ps.taughtEmpathy";
export const TAUGHT_LOCKED_KEY = "ps.taughtLocked";

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

/** 引导步骤定义：selector 定位高亮目标，文案气泡。
 *  P4-4：首启不再强制上「对话玩法」全屏速览——该内容抽成 DialogueQuickview，
 *  由对话场景右上角「帮助」入口可回看。 */
const STEPS: GuideStep[] = [
  {
    target: ".patient-list .patient-card",
    title: "今日预约",
    text: "这里是今天的预约清单。每一位来访者都带着心事而来——点一位患者，坐下来，听他说。",
    place: "bottom",
  },
  {
    target: ".bb-item[title='技能树']",
    title: "技能树",
    text: "接诊会获得经验。点底栏「技能」学习话术，提升接诊效果。",
    place: "bottom",
  },
  {
    target: ".bb-item[title='休息一日']",
    title: "休息一日",
    text: "一天接诊结束后，点底栏「休息」推进到明天，理智会恢复，也可能有新客户上门。",
    place: "bottom",
  },
];

/** 对话玩法速览 · 四维数据（P4-4：沿用原 full 面板内容，视觉改四维淡显） */
export const QUICKVIEW_STATS: { label: string; color: string; value: number; desc: string }[] = [
  { label: "信任", color: "var(--good)", value: 55, desc: "他是否愿意向你敞开心扉" },
  { label: "防御", color: "var(--bad)", value: 30, desc: "防备有多深，过高时他会拒绝回应" },
  { label: "心情", color: "var(--accent)", value: 60, desc: "此刻的情绪状态，低落时更脆弱" },
  { label: "真相", color: "var(--truth)", value: 25, desc: "揭开真正心结的进度" },
];

/** 对话玩法速览（P4-4：从首启强制改为「帮助」入口可回看的可复用组件）。
 *  纯渲染层：打开/关闭不产生任何会话状态改动，onClose 由调用方处理。 */
export function DialogueQuickview({ onClose }: { onClose: () => void }) {
  return (
    <div className="onboarding-full" role="dialog" aria-modal="true" aria-label="对话玩法速览">
      <div className="onboarding-full-panel">
        <div className="onboarding-full-title">对话玩法</div>
        <p className="onboarding-full-text">
          坐进诊室后，你会看到来访者的四个状态。你的每一句话，都会推动它们变化：
        </p>
        <div className="onboarding-full-stats">
          {QUICKVIEW_STATS.map((s) => (
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
        <p className="onboarding-full-extra">
          有些选项会因前置要求或技能而锁定。对话中患者还会闪现记忆碎片——真正的心事，往往就藏在那里。
        </p>
        <div className="quickview-actions">
          <button className="onboarding-next" onClick={onClose}>
            知道了
          </button>
        </div>
      </div>
    </div>
  );
}

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
      // 预约清单本体常驻首页（v1.4.0），无需自动打开弹层；等布局稳定后计算高亮框
      const t = window.setTimeout(() => setShow(true), 400);
      return () => window.clearTimeout(t);
    }
  }, []);

  const step = STEPS[stepIdx];

  // 每步重新定位高亮框
  useEffect(() => {
    if (!show || !step) return;
    const el = document.querySelector<HTMLElement>(step.target!);
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

  if (!show) return null;

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
