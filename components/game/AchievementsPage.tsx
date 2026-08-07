"use client";

import { useEffect, useState } from "react";
import { useGame } from "@/lib/hooks/useGame";
import {
  allAchievements,
  rarityColors,
  achievementCategoryLabels,
  RARITY_ORDER,
} from "@/lib/data/achievements";
import type { Achievement, AchievementCategory } from "@/lib/types";

const order: AchievementCategory[] = [
  "therapy",
  "ending",
  "growth",
  "clinic",
  "ethics",
  "secret",
  "discover",
  "aftercare",
];

type Filter = "all" | "unlocked" | "locked";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "全部" },
  { key: "unlocked", label: "已解锁" },
  { key: "locked", label: "未解锁" },
];

export function AchievementsPage() {
  const { achievementEngine, game, setScene, playSound } = useGame();
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    achievementEngine?.onGameStateSynced(game);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pm = achievementEngine?.getProgressMap() ?? {};
  const totalUnlocked = Object.values(pm).filter((p) => p.unlocked).length;
  const progressRate = Math.round((totalUnlocked / allAchievements.length) * 100);
  const R = 50;
  const C = 2 * Math.PI * R;

  return (
    <div className="scene panel-view">
      <button
        className="nav-back"
        onClick={() => {
          playSound("page");
          setScene("clinic");
        }}
      >
        ◂ 返回诊所
      </button>
      <div className="ach-banner">
        <div className="ach-banner-inner">
          <div>
            <div className="ach-banner-title">成就图鉴</div>
            <div className="ach-banner-sub">记录你在{game.clinicName}的每一步成长</div>
          </div>
          <div className="ach-banner-ring">
            <svg viewBox="0 0 120 120" width="140" height="140">
              <circle cx="60" cy="60" r={R} stroke="var(--bg-card)" strokeWidth="10" fill="none" />
              <circle
                cx="60"
                cy="60"
                r={R}
                stroke="var(--accent)"
                strokeWidth="10"
                fill="none"
                strokeDasharray={C}
                strokeDashoffset={C * (1 - progressRate / 100)}
                transform="rotate(-90 60 60)"
                strokeLinecap="round"
              />
            </svg>
            <div className="ach-banner-text">
              {totalUnlocked}
              <span>/{allAchievements.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="ach-toolbar">
        <div className="ach-filter">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`ach-filter-btn ${filter === f.key ? "active" : ""}`}
              onClick={() => {
                playSound("click");
                setFilter(f.key);
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {order.map((cat) => {
        // 分类内按稀有度降序（传说 → 普通）
        const items = allAchievements
          .filter((a) => a.category === cat)
          .sort((x, y) => RARITY_ORDER[x.rarity] - RARITY_ORDER[y.rarity]);
        if (items.length === 0) return null;
        // 状态筛选：已解锁 / 未解锁 / 全部
        const visible =
          filter === "all"
            ? items
            : items.filter((a) =>
                filter === "unlocked" ? !!pm[a.id]?.unlocked : !pm[a.id]?.unlocked
              );
        if (visible.length === 0) return null;
        const catUnlocked = items.filter((a) => pm[a.id]?.unlocked).length;
        return (
          <div className="ach-section" key={cat}>
            <div className="section-title-row">
              <h2>{achievementCategoryLabels[cat]}</h2>
              <span className="cat-count">
                {catUnlocked} / {items.length}
              </span>
            </div>
            <div className="ach-grid">
              {visible.map((a) => {
                const p = pm[a.id] ?? { progress: 0, unlocked: false };
                const hidden = a.hidden && !p.unlocked;
                const rc = rarityColors[a.rarity];
                const rate = Math.min(100, Math.round((p.progress / Math.max(1, a.target)) * 100));
                return (
                  <div
                    className={`ach-card ${p.unlocked ? "unlocked" : "locked"} rarity-${a.rarity}`}
                    key={a.id}
                    style={
                      p.unlocked
                        ? {
                            borderColor: rc.color,
                            boxShadow: `0 0 0 1px ${rc.color}33, 0 8px 24px ${rc.glow}`,
                          }
                        : undefined
                    }
                  >
                    <div className="ach-head">
                      <div
                        className="ach-icon"
                        style={{
                          background: `linear-gradient(135deg, ${rc.color}33, ${rc.color}11)`,
                          color: rc.color,
                        }}
                      >
                        {hidden ? "❓" : a.icon}
                      </div>
                      <div className="ach-meta">
                        <div className="ach-name">
                          {hidden ? "隐藏成就" : a.name}
                          <span className="ach-rarity-label" style={{ color: rc.color }}>
                            {rc.label}
                          </span>
                        </div>
                        <div className="ach-desc">
                          {hidden ? "达成特定条件后解锁查看。" : a.description}
                        </div>
                        {a.reward ? <Reward r={a.reward} /> : null}
                        {p.unlocked && p.unlockedAt ? (
                          <div className="ach-date">
                            解锁于 {new Date(p.unlockedAt).toLocaleString()}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="ach-bar">
                      <div
                        className="ach-bar-fill"
                        style={{
                          width: `${rate}%`,
                          background: `linear-gradient(90deg, ${rc.color}, ${rc.glow})`,
                        }}
                      />
                    </div>
                    <div className="ach-num">
                      {Math.min(p.progress, a.target)} / {a.target}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
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
      className="ach-reward"
      dangerouslySetInnerHTML={{ __html: parts.join(" · ") }}
    />
  );
}
