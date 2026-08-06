"use client";

import { useGame } from "@/lib/hooks/useGame";
import { slotPhaseLabel, isNightSlot, MAX_SLOTS } from "@/lib/state/GameState";

export function HUD() {
  const { game, scene, expToNext, toggleMute, muted } = useGame();
  if (scene === "title") return null;
  const d = game.doctor;
  const sanColor = d.sanity > 60 ? "var(--good)" : d.sanity > 30 ? "var(--warn)" : "var(--bad)";
  const repColor = d.reputation > 60 ? "var(--accent)" : d.reputation > 30 ? "var(--accent-2)" : "var(--text-muted)";
  const phase = slotPhaseLabel(game.slot);
  const night = isNightSlot(game.slot);
  const slotsFull = game.slot >= MAX_SLOTS;

  return (
    <div className="hud">
      <div className="hud-brand">
        <div className="hud-emblem">心</div>
        <div className="hud-title">暖心小诊室</div>
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
        <div className={`hud-day ${night ? "night" : ""} ${slotsFull ? "full" : ""}`}>
          <span className="hud-phase-icon">{night ? "🌙" : "☀"}</span>
          第 {game.day} 天 · {phase}
          <span className="hud-slot-count">
            {game.slot}/{MAX_SLOTS}
          </span>
        </div>
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
