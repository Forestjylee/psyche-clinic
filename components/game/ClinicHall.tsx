"use client";

import { useState } from "react";
import { useGame } from "@/lib/hooks/useGame";
import { allPatients } from "@/lib/data/patients";
import { allSkills, allClinicUpgrades } from "@/lib/data/skills";
import { allAchievements } from "@/lib/data/achievements";
import { endingColor, endingLabel, endingEmotion } from "./constants";
import { ChibiCharacter } from "./ChibiCharacter";
import {
  isNightSlot,
  DECAY_START_DAY,
  WARN_DAY,
  ABANDON_DAY,
} from "@/lib/state/GameState";

export function ClinicHall() {
  const {
    game,
    startSession,
    setScene,
    restOneDay,
    saveNow,
    backToTitle,
    playSound,
    expToNext,
    achievementEngine,
    openReturnVisit,
  } = useGame();

  const [confirmExit, setConfirmExit] = useState(false);

  // 候诊列表：已放弃治疗的患者不再出现
  const allAvailable = [...allPatients, ...game.generatedScenarios].filter(
    (p) => !game.abandoned.includes(p.id)
  );
  // 可对话：未完成且声望已解锁，或治愈回访已到访（探望非治疗）
  const canTalk = (p: (typeof allAvailable)[number]) => {
    if (!game.patientRecords[p.id]) {
      if (p.requireReputation && game.doctor.reputation < p.requireReputation)
        return false;
      return true;
    }
    return !!game.returnVisits[p.id]?.arrived && !game.returnVisits[p.id]?.seen;
  };
  // 首页清单：今日已接诊的客户隐藏（次日恢复）；可对话的客户优先排顶部
  const sortedAvailable = allAvailable
    .filter((p) => !game.todayServed.includes(p.id))
    .sort((a, b) => Number(canTalk(b)) - Number(canTalk(a)));
  const totalPatients = allAvailable.length;
  const achCount = achievementEngine
    ? Object.values(achievementEngine.getProgressMap()).filter((p) => p.unlocked).length
    : 0;

  const getRestRecovery = () => {
    let base = 15;
    if (game.clinicUpgrades.includes("rest_room")) base += 10;
    return base;
  };

  const onCardClick = (p: (typeof allAvailable)[number]) => {
    // 治愈回访：玩家已到访，点击进入探望对话（非治疗）
    const rv = game.returnVisits[p.id];
    if (rv?.arrived && !rv.seen) {
      playSound("click");
      openReturnVisit(p.id);
      return;
    }
    const locked = p.requireReputation ? game.doctor.reputation < p.requireReputation : false;
    const servedToday = game.todayServed.includes(p.id);
    if (locked || servedToday) {
      playSound("locked");
      return;
    }
    startSession(p);
  };

  const night = isNightSlot(game.slot);
  const abandonedCount = game.abandoned.length;
  const unreadCount = game.messages.filter((m) => !m.read).length;
  const trackedCount = allAvailable.filter(
    (p) => !game.patientRecords[p.id]
  ).length;

  return (
    <div className={`scene clinic ${night ? "clinic-night" : ""}`}>
      <div className="clinic-header">
        <div className="clinic-header-left">
          <h1>今 日 预 约</h1>
          <p>心理咨询预约清单 · 每一位来访者都带着心事而来，先坐下来，听他说。</p>
        </div>
        <div className="clinic-header-right">
          <StatChip val={Object.keys(game.patientRecords).length} label="已接待" />
          <StatChip val={game.skills.length} label="技能" />
          <StatChip val={game.clinicUpgrades.length} label="设施" />
          <button
            className="clinic-header-btn"
            onClick={() => {
              playSound("click");
              saveNow();
            }}
            title="保存游戏进度"
          >
            💾 保存
          </button>
          <button
            className="clinic-header-btn ghost"
            onClick={() => {
              playSound("click");
              setConfirmExit(true);
            }}
            title="退出游戏，返回标题"
          >
            退出
          </button>
        </div>
      </div>
      <div className="clinic-body">
        <div className="patient-section">
          <div className="section-title">
            今 日 预 约 <span className="count">{sortedAvailable.length} 位客户</span>
            <button
              className="patient-add-btn"
              onClick={() => {
                playSound("page");
                setScene("discover");
              }}
              title="花钱通过渠道触达潜在客户，主动邀约"
            >
              ＋ 发现客户
            </button>
          </div>
          <div className="patient-list">
            {sortedAvailable.length === 0 ? (
              <div className="empty-state">
                今日名额已用完。
                <br />
                点击「休息一日」进入下一天。
              </div>
            ) : null}
            {sortedAvailable.map((p) => {
              const completed = game.patientRecords[p.id];
              const rv = game.returnVisits[p.id];
              const returning = !!rv?.arrived && !rv.seen;
              const locked = p.requireReputation
                ? game.doctor.reputation < p.requireReputation
                : false;
              const servedToday = game.todayServed.includes(p.id);
              const waitDays = game.waitingDays[p.id] ?? 0;
              const alive = !completed && !locked;
              const decaying = alive && waitDays >= DECAY_START_DAY;
              const critical = alive && waitDays >= WARN_DAY;
              return (
                <div
                  key={p.id}
                  className={`patient-card ${locked ? "locked" : ""} ${completed ? "completed" : ""} ${servedToday ? "served-today" : ""} ${decaying ? "decaying" : ""} ${critical ? "critical" : ""} ${returning ? "returning" : ""}`}
                  style={
                    {
                      "--card-accent": p.palette.primary,
                      "--card-accent-glow": `${p.palette.primary}40`,
                    } as React.CSSProperties
                  }
                  onClick={() => onCardClick(p)}
                >
                  <div className="patient-avatar">
                    <ChibiCharacter
                      palette={p.palette}
                      size="md"
                      emotion={completed ? endingEmotion[completed] : "neutral"}
                    />
                  </div>
                  <div className="patient-info">
                    <div className="patient-name">
                      <span className="patient-name-text">{p.name}</span>
                      <span className={`patient-difficulty ${p.difficulty}`}>
                        {p.difficulty === "简单" ? "😊" : p.difficulty === "困难" ? "⚠" : "✦"}{" "}
                        {p.difficulty}
                      </span>
                      {completed ? (
                        <span
                          className="patient-difficulty"
                          style={{ color: endingColor(completed), borderColor: endingColor(completed) }}
                        >
                          {endingLabel(completed)}
                        </span>
                      ) : null}
                    </div>
                    <div className="patient-title">{p.title}</div>
                    <div className="patient-intro">{p.intro}</div>
                    {locked ? (
                      <div className="patient-locked-tag">
                        需要声望 {p.requireReputation}（当前 {game.doctor.reputation}）
                      </div>
                    ) : null}
                    {returning ? (
                      <div className="patient-return-tag">✿ 他来看你了 · 点击探望</div>
                    ) : servedToday ? (
                      <div className="patient-served-tag">今日已接诊 · 明日可复诊</div>
                    ) : completed ? (
                      <div className="patient-completed-tag">已完成 · 可重新接诊</div>
                    ) : null}
                    {alive && waitDays > 0 ? (
                      <div
                        className={`patient-wait-tag ${critical ? "critical" : ""} ${decaying ? "decaying" : ""}`}
                      >
                        {critical
                          ? `⚠ 病情严重 · 已等待 ${waitDays} 天`
                          : decaying
                          ? `病情加重 · 已等待 ${waitDays} 天`
                          : `已等待 ${waitDays} 天`}
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="clinic-side">
          <div className="side-card">
            <h3>个 人 成 长</h3>
            <SideBtn
              label="技能树"
              right={`LV.${game.doctor.level} · ${game.doctor.exp}/${expToNext(game.doctor.level)}`}
              progress={(game.doctor.exp / expToNext(game.doctor.level)) * 100}
              guide="skills"
              onClick={() => {
                playSound("page");
                setScene("skills");
              }}
            />
            <SideBtn
              label="诊所升级"
              right={`${game.doctor.money} 金`}
              rightClass="side-btn-cost"
              onClick={() => {
                playSound("page");
                setScene("clinic_upgrades");
              }}
            />
            <SideBtn
              label="消息盒子"
              right={
                unreadCount > 0
                  ? `${unreadCount} 条未读`
                  : `${game.messages.length} 条`
              }
              rightClass={unreadCount > 0 ? "msg-unread-badge" : undefined}
              onClick={() => {
                playSound("page");
                setScene("letters");
              }}
            />
            <SideBtn
              label="客户追踪"
              right={`${trackedCount} 人`}
              onClick={() => {
                playSound("page");
                setScene("tracking");
              }}
            />
            <SideBtn
              label="成就图鉴"
              right={`${achCount} / ${allAchievements.length}`}
              rightClass="ach-side-count"
              onClick={() => {
                playSound("page");
                setScene("achievements");
              }}
            />
            <SideBtn
              label="休息一日"
              right={`理智 +${getRestRecovery()}`}
              rightClass={`rest-side-tag ${game.doctor.sanity < 50 ? "low" : ""}`}
              guide="rest"
              className={game.doctor.sanity < 50 ? "rest-low" : undefined}
              onClick={restOneDay}
            />
          </div>
          <div className="side-card">
            <h3>诊 所 状 态</h3>
            <div className="side-stats">
              <StatLine
                label="已接待客户"
                value={`${Object.keys(game.patientRecords).length} / ${totalPatients}`}
                progress={(Object.keys(game.patientRecords).length / Math.max(totalPatients, 1)) * 100}
              />
              <StatLine
                label="已解锁技能"
                value={`${game.skills.length} / ${allSkills.length}`}
                progress={(game.skills.length / Math.max(allSkills.length, 1)) * 100}
              />
              <StatLine
                label="诊所升级"
                value={`${game.clinicUpgrades.length} / ${allClinicUpgrades.length}`}
                progress={(game.clinicUpgrades.length / Math.max(allClinicUpgrades.length, 1)) * 100}
              />
              <StatLine label="游戏天数" value={<span className="stat-day-badge">第 {game.day} 天</span>} />
              {abandonedCount > 0 ? (
                <StatLine label="流失客户" value={`${abandonedCount} 人`} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {confirmExit ? (
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
        </div>
      ) : null}
    </div>
  );
}

function StatChip({ val, label }: { val: number | string; label: string }) {
  return (
    <div className="clinic-stat-chip">
      <div className="chip-val">{val}</div>
      <div className="chip-label">{label}</div>
    </div>
  );
}

function SideBtn({
  label,
  right,
  rightClass,
  guide,
  progress,
  className,
  onClick,
}: {
  label: string;
  right?: string;
  rightClass?: string;
  guide?: string;
  progress?: number;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      className={`side-btn ${className ?? ""}`}
      data-guide={guide}
      onClick={onClick}
    >
      <span className="side-btn-main">
        <span className="side-btn-label">{label}</span>
        {progress !== undefined ? (
          <span className="side-btn-progress">
            <span className="side-btn-progress-fill" style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }} />
          </span>
        ) : null}
      </span>
      {right ? <span className={rightClass} style={{ color: "var(--text-dim)" }}>{right}</span> : null}
    </button>
  );
}

function StatLine({
  label,
  value,
  progress,
}: {
  label: string;
  value: React.ReactNode;
  progress?: number;
}) {
  return (
    <div className="stat-line">
      <span className="stat-line-label">{label}</span>
      {progress !== undefined ? (
        <span className="stat-line-bar">
          <span
            className="stat-line-bar-fill"
            style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
          />
        </span>
      ) : null}
      <span className="stat-line-value">{value}</span>
    </div>
  );
}
