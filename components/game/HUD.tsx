"use client";

import { useGame } from "@/lib/hooks/useGame";

export function HUD() {
  const { game, scene, expToNext, toggleMute, muted } = useGame();
  if (scene === "title") return null;
  const d = game.doctor;
  const sanColor = d.sanity > 60 ? "#5fd49a" : d.sanity > 30 ? "#ffc060" : "#ff6b7d";
  const repColor = d.reputation > 60 ? "#6b8eff" : d.reputation > 30 ? "#b4a0ff" : "#9aa3c4";

  return (
    <div className="hud">
      <div className="hud-brand">
        <div className="hud-emblem">心</div>
        <div className="hud-title">心灵诊疗室</div>
      </div>
      <div className="hud-stats">
        <div className="hud-stat">
          <div className="hud-stat-icon rep">声</div>
          <div className="hud-stat-body">
            <span className="hud-stat-label">声望</span>
            <div className="hud-stat-row">
              <div className="hud-stat-bar">
                <div
                  className="hud-stat-bar-fill"
                  style={{ width: `${d.reputation}%`, background: repColor, color: repColor }}
                />
              </div>
              <span className="hud-stat-value">{d.reputation}</span>
            </div>
          </div>
        </div>
        <div className="hud-stat">
          <div className="hud-stat-icon san">神</div>
          <div className="hud-stat-body">
            <span className="hud-stat-label">理智</span>
            <div className="hud-stat-row">
              <div className="hud-stat-bar">
                <div
                  className="hud-stat-bar-fill"
                  style={{ width: `${d.sanity}%`, background: sanColor, color: sanColor }}
                />
              </div>
              <span className="hud-stat-value">{d.sanity}</span>
            </div>
          </div>
        </div>
        <div className="hud-stat">
          <div className="hud-stat-icon gold">金</div>
          <div className="hud-stat-body">
            <span className="hud-stat-label">金钱</span>
            <div className="hud-stat-row">
              <span className="hud-stat-value" style={{ color: "var(--gold)" }}>
                {d.money}
              </span>
            </div>
          </div>
        </div>
        <div className="hud-stat">
          <div className="hud-stat-icon lvl">{d.level}</div>
          <div className="hud-stat-body">
            <span className="hud-stat-label">等级</span>
            <div className="hud-stat-row">
              <span className="hud-stat-value" style={{ color: "var(--accent-2)" }}>
                {d.exp}/{expToNext(d.level)}
              </span>
            </div>
          </div>
        </div>
        <div className="hud-day">第 {game.day} 天</div>
        <button
          className="hud-mute-btn"
          onClick={toggleMute}
          title={muted ? "开启声音" : "静音"}
        >
          {muted ? "🔇" : "🔊"}
        </button>
      </div>
    </div>
  );
}
