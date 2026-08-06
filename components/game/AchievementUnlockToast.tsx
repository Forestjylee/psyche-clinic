"use client";

import { useEffect, useMemo, useState } from "react";
import { useGame } from "@/lib/hooks/useGame";
import { rarityColors } from "@/lib/data/achievements";
import type { Achievement, AchievementRarity } from "@/lib/types";

/**
 * 成就解锁全屏特效
 * 设计目标（公测高品质）：
 * - 全屏暗化聚焦，把玩家注意力锁死在「这一刻你做到了什么」
 * - 卡片从中心缩放迸发，配粒子爆裂
 * - 稀有度光晕脉动：普通→稀有→史诗→传说 逐级加码
 * - 传说级额外金光粒子环 + 慢镜头
 * - 级联入场：暗场 → 光晕 → 卡片 → 图标弹跳 → 文字 → 奖励
 * - 尊重 prefers-reduced-motion：关闭粒子与脉动，仅保留淡入
 */
export function AchievementUnlockToast() {
  const { achievementToast, dismissAchievement } = useGame();
  const [phase, setPhase] = useState<"idle" | "enter" | "hold">("idle");

  useEffect(() => {
    if (achievementToast) {
      setPhase("enter");
      const t = window.setTimeout(() => setPhase("hold"), 60);
      return () => window.clearTimeout(t);
    }
    setPhase("idle");
  }, [achievementToast]);

  if (!achievementToast || phase === "idle") return null;

  return (
    <div
      className={`ach-fx ach-fx-${phase}`}
      role="dialog"
      aria-label={`成就解锁：${achievementToast.name}`}
      onClick={dismissAchievement}
    >
      <div className="ach-fx-backdrop" />
      <Burst rarity={achievementToast.rarity} />
      <Card a={achievementToast} phase={phase} />
    </div>
  );
}

function Card({ a, phase }: { a: Achievement; phase: "enter" | "hold" }) {
  const rc = rarityColors[a.rarity];
  const isLegend = a.rarity === "legendary";
  return (
    <div
      className={`ach-fx-card rarity-${a.rarity} ${isLegend ? "legendary" : ""}`}
      style={
        {
          "--rarity-color": rc.color,
          "--rarity-glow": rc.glow,
        } as React.CSSProperties
      }
    >
      <div className="ach-fx-aurora" />
      <div className="ach-fx-shine" />
      {isLegend ? <div className="ach-fx-gold-ring" /> : null}
      <div className="ach-fx-row">
        <div className="ach-fx-icon">{a.icon}</div>
        <div className="ach-fx-body">
          <div className="ach-fx-label">成就解锁 · {rc.label}</div>
          <div className="ach-fx-name">{a.name}</div>
          <div className="ach-fx-desc">{a.description}</div>
          {a.reward ? <Reward r={a.reward} /> : null}
        </div>
      </div>
      <div className="ach-fx-tap-hint">轻触任意处继续</div>
      {phase === "hold" ? <div className="ach-fx-hold-fade" /> : null}
    </div>
  );
}

function Reward({ r }: { r: NonNullable<Achievement["reward"]> }) {
  const parts: string[] = [];
  if (r.reputation) parts.push(`<span class="r-pos">声望 +${r.reputation}</span>`);
  if (r.sanity)
    parts.push(
      r.sanity >= 0
        ? `<span class="r-pos">理智 +${r.sanity}</span>`
        : `<span class="r-neg">理智 ${r.sanity}</span>`
    );
  if (r.money) parts.push(`<span class="r-money">金钱 +${r.money}</span>`);
  if (r.exp) parts.push(`<span class="r-exp">经验 +${r.exp}</span>`);
  return (
    <div
      className="ach-fx-reward"
      dangerouslySetInnerHTML={{ __html: parts.join(" · ") }}
    />
  );
}

/** 粒子爆裂：按稀有度决定数量与色彩 */
function Burst({ rarity }: { rarity: AchievementRarity }) {
  const count = { common: 14, rare: 22, epic: 32, legendary: 44 }[rarity];
  const color = rarityColors[rarity].color;
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4;
        const dist = 120 + Math.random() * 220;
        const size = 3 + Math.random() * 5;
        const delay = Math.random() * 120;
        const dur = 900 + Math.random() * 700;
        return { angle, dist, size, delay, dur, i };
      }),
    [count]
  );
  return (
    <div className="ach-fx-burst" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.i}
          className="ach-fx-particle"
          style={{
            width: p.size,
            height: p.size,
            background: color,
            // 终点偏移通过 CSS 变量传递，由 keyframes 使用
            ["--px" as string]: `${Math.cos(p.angle) * p.dist}px`,
            ["--py" as string]: `${Math.sin(p.angle) * p.dist}px`,
            animationDelay: `${p.delay}ms`,
            animationDuration: `${p.dur}ms`,
          }}
        />
      ))}
    </div>
  );
}
