"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { useGame } from "@/lib/hooks/useGame";
import { slotPhaseLabel, isNightSlot, MAX_SLOTS } from "@/lib/state/GameState";

export function HUD() {
  const { game, scene, expToNext, toggleMute, muted, saveNow, backToTitle, playSound } = useGame();
  const [confirmExit, setConfirmExit] = useState(false);
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
        <div className="hud-emblem" aria-hidden="true">
          <svg viewBox="0 0 48 48" className="hud-emblem-svg">
            <defs>
              <linearGradient id="hudEmblemBg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f6a55c" />
                <stop offset="100%" stopColor="#e86b4a" />
              </linearGradient>
            </defs>
            <circle cx="24" cy="24" r="22" fill="url(#hudEmblemBg)" />
            <circle cx="24" cy="24" r="20.5" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
            <path
              d="M24 34.5 C 13 27.5, 10.5 19.5, 15 15 c 3.5-3.5 6.5-1 9 2.5 C 26.5 14, 29.5 11.5, 33 15 c 4.5 4.5 2 12.5 -9 19.5 Z"
              fill="#fff8ec"
            />
            <path d="M24 20.5 v 7.5 M20.3 24.25 H27.7" stroke="#e86b4a" strokeWidth="2.6" strokeLinecap="round" />
          </svg>
        </div>
        <div className="hud-title">{game.clinicName}</div>
      </div>
      <div className="hud-stats">
        <div className="hud-stat">
          <div className="hud-stat-icon lvl">{d.level}</div>
          <div className="hud-stat-body">
            <span className="hud-stat-label">等级</span>
            <div className="hud-stat-row">
              <span
                className="hud-stat-value pop"
                key={`${d.exp}-${expToNext(d.level)}`}
                style={{ color: "var(--accent-2)" }}
              >
                {d.exp}/{expToNext(d.level)}
              </span>
            </div>
          </div>
          <div className="hud-stat-tip">
            <span className="hud-tip-title">等级 · Lv.{d.level}</span>
            <span className="hud-tip-line">用途：决定可习得技能的门槛，技能树用经验换取。</span>
            <span className="hud-tip-line">获得：接诊每位患者积累经验，完成成就另有经验奖励。</span>
          </div>
        </div>
        <div className="hud-stat">
          <div className="hud-stat-icon gold">金</div>
          <div className="hud-stat-body">
            <span className="hud-stat-label">金钱</span>
            <div className="hud-stat-row">
              <span
                className="hud-stat-value pop"
                key={d.money}
                style={{ color: "var(--gold)" }}
              >
                {d.money}
              </span>
            </div>
          </div>
          <div className="hud-stat-tip">
            <span className="hud-tip-title">金钱 · ${d.money}</span>
            <span className="hud-tip-line">用途：参与善意连接、购置诊所设施、购买部分技能。</span>
            <span className="hud-tip-line">获得：接诊收费是主要收入，前台助理每日额外进账，完成成就另有奖金。</span>
          </div>
        </div>
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
              <span className="hud-stat-value pop" key={d.reputation}>
                {d.reputation}
              </span>
            </div>
          </div>
          <div className="hud-stat-tip">
            <span className="hud-tip-title">声望 · {d.reputation}</span>
            <span className="hud-tip-line">用途：决定可接待的高门槛患者，以及高级连接方式的解锁条件。</span>
            <span className="hud-tip-line">获得：达成治愈等好结局、完成成就、购置「心理学藏书架」都会提升；流失客户会降低。</span>
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
              <span className="hud-stat-value pop" key={d.sanity}>
                {d.sanity}
              </span>
            </div>
          </div>
          <div className="hud-stat-tip">
            <span className="hud-tip-title">理智 · {d.sanity}</span>
            <span className="hud-tip-line">用途：医生自身的状态，理智过低会影响接诊与结局走向。</span>
            <span className="hud-tip-line">获得：休息一日恢复，诊所「医生休息室」提升恢复量，部分成就奖励理智。</span>
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
        <button
          className="hud-action-btn"
          onClick={() => {
            playSound("click");
            saveNow();
          }}
          title="保存游戏进度"
        >
          💾 保存
        </button>
        <button
          className="hud-action-btn ghost"
          onClick={() => {
            playSound("click");
            setConfirmExit(true);
          }}
          title="退出游戏，返回标题"
        >
          退出
        </button>
      </div>
      {confirmExit
        ? createPortal(
            <div
              className="confirm-mask"
              onClick={() => {
                playSound("click");
                setConfirmExit(false);
              }}
            >
              <div className="confirm-card" onClick={(e) => e.stopPropagation()}>
                <div className="confirm-title">返回标题屏？</div>
                <p className="confirm-text">
                  进度会自动保存，回来可以继续经营你的诊所。
                </p>
                <div className="confirm-actions">
                  <button
                    className="confirm-cancel"
                    onClick={() => {
                      playSound("click");
                      setConfirmExit(false);
                    }}
                  >
                    继续经营
                  </button>
                  <button
                    className="confirm-ok"
                    onClick={() => {
                      playSound("page");
                      setConfirmExit(false);
                      backToTitle();
                    }}
                  >
                    返回标题
                  </button>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}
