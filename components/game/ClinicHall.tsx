"use client";

import { useGame } from "@/lib/hooks/useGame";
import { allPatients, GUIDED_PATIENT_ID } from "@/lib/data/patients";
import { endingColor, endingLabel, endingEmotion } from "./constants";
import { ChibiCharacter } from "./ChibiCharacter";
import {
  isNightSlot,
  DECAY_START_DAY,
  WARN_DAY,
  ABANDON_DAY,
  firstSessionDone,
} from "@/lib/state/GameState";

/** 今日预约（首页本体，SPEC §15 v1.4.0）：
 *  预约全列表直放首页；「个人成长」入口去重交给底部栏，仅保留诊所状态精简卡 + 花园入口。 */
export function ClinicHall() {
  const { game, startSession, playSound, openReturnVisit } = useGame();

  // 候诊列表：已到达候诊的手写患者；已放弃治疗的不再出现
  const allAvailable = allPatients.filter(
    (p) => !game.abandoned.includes(p.id) && game.arrivedPatients.includes(p.id)
  );
  // 首诊机制保障（P4-5）：任何患者完成一次接诊即首诊完成；完成前除引导患者外全部锁定
  const firstUnlocked = firstSessionDone(game);
  // 有断点的患者（activeSession）：即使今日已接诊也保留在清单，供「继续上次」
  const resumableId = game.activeSession?.patientId ?? null;
  // 引导患者锁定：首诊未完成时，非引导患者不可接诊（day-1 队列锁定）；
  // 断点患者豁免（评审修复）：可正常「继续上次」，不影响首诊锁定（断点只能来自已开始的会话）
  const guidedLocked = (p: (typeof allAvailable)[number]) =>
    p.id !== GUIDED_PATIENT_ID && !firstUnlocked && resumableId !== p.id;
  // 可对话：未完成且声望已解锁、且未被首诊锁定，或治愈回访已到访（探望非治疗）
  const canTalk = (p: (typeof allAvailable)[number]) => {
    if (!game.patientRecords[p.id]) {
      if (guidedLocked(p)) return false;
      if (p.requireReputation && game.doctor.reputation < p.requireReputation)
        return false;
      return true;
    }
    return !!game.returnVisits[p.id]?.arrived && !game.returnVisits[p.id]?.seen;
  };
  // 已完成：治愈过（patientRecords 有记录）
  const isCompleted = (p: (typeof allAvailable)[number]) => !!game.patientRecords[p.id];
  // 回访探望：治愈患者回访已到访、未探望（探望非治疗，保留在主清单置顶）
  const isReturning = (p: (typeof allAvailable)[number]) =>
    !!game.returnVisits[p.id]?.arrived && !game.returnVisits[p.id]?.seen;
  const isResuming = (p: (typeof allAvailable)[number]) => resumableId === p.id;
  // 今日已接诊的客户隐藏（次日恢复，断点患者除外）
  const notServed = (p: (typeof allAvailable)[number]) =>
    isResuming(p) || !game.todayServed.includes(p.id);

  // 主清单「今日预约」：断点患者 + 未完成 + 回访探望；可对话的客户优先排顶部
  // （断点患者恒在主清单「继续上次」，即使其 patientRecords 已有记录）
  const todayList = allAvailable
    .filter((p) => (isResuming(p) || !isCompleted(p) || isReturning(p)) && notServed(p))
    .sort((a, b) => {
      const byTalk = Number(canTalk(b)) - Number(canTalk(a));
      if (byTalk !== 0) return byTalk;
      // 引导患者（第一位来访者）恒置顶
      return Number(b.id === GUIDED_PATIENT_ID) - Number(a.id === GUIDED_PATIENT_ID);
    });
  // 已完成清单「可重新接诊」：治愈过、非回访探望、非断点，且今日未接诊（次日恢复）
  const completedList = allAvailable.filter(
    (p) => isCompleted(p) && !isReturning(p) && !isResuming(p) && notServed(p)
  );
  const onCardClick = (p: (typeof allAvailable)[number]) => {
    // 治愈回访：玩家已到访，点击进入探望对话（非治疗）
    const rv = game.returnVisits[p.id];
    if (rv?.arrived && !rv.seen) {
      playSound("click");
      openReturnVisit(p.id);
      return;
    }
    const locked = guidedLocked(p) || (p.requireReputation ? game.doctor.reputation < p.requireReputation : false);
    const servedToday = game.todayServed.includes(p.id);
    const resuming = resumableId === p.id;
    if (locked) {
      playSound("locked");
      return;
    }
    // 今日已接诊：仅断点患者可点击「继续上次」恢复会话
    if (servedToday && !resuming) {
      playSound("locked");
      return;
    }
    startSession(p);
  };

  // 共用卡片渲染（「今日预约」与「已完成 · 可重新接诊」同款卡片）
  const renderPatientCard = (p: (typeof allAvailable)[number]) => {
    const completed = game.patientRecords[p.id];
    const rv = game.returnVisits[p.id];
    const returning = !!rv?.arrived && !rv.seen;
    const resuming = resumableId === p.id;
    const firstSessionLocked = guidedLocked(p);
    const locked =
      firstSessionLocked ||
      (p.requireReputation ? game.doctor.reputation < p.requireReputation : false);
    const servedToday = game.todayServed.includes(p.id);
    const waitDays = game.waitingDays[p.id] ?? 0;
    const alive = !completed && !locked;
    const decaying = alive && waitDays >= DECAY_START_DAY;
    const critical = alive && waitDays >= WARN_DAY;
    return (
      <div
        key={p.id}
        className={`patient-card ${locked ? "locked" : ""} ${completed ? "completed" : ""} ${servedToday ? "served-today" : ""} ${resuming ? "resuming" : ""} ${decaying ? "decaying" : ""} ${critical ? "critical" : ""} ${returning ? "returning" : ""}`}
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
          {p.id === GUIDED_PATIENT_ID && !completed ? (
            <div className="patient-guide-tag">第一位来访者</div>
          ) : null}
          <div className="patient-intro">{p.intro}</div>
          {locked ? (
            <div className="patient-locked-tag">
              {firstSessionLocked
                ? "先见见今天的第一位来访者"
                : `需要声望 ${p.requireReputation}（当前 ${game.doctor.reputation}）`}
            </div>
          ) : null}
          {resuming ? (
            <div className="patient-resume-tag">⏸ 上次对话未完成 · 点击继续</div>
          ) : returning ? (
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
  };

  const night = isNightSlot(game.slot);

  return (
    <div className={`scene clinic ${night ? "clinic-night" : ""}`}>
      <div className="clinic-header">
        <div className="clinic-header-left">
          <h1>今 日 预 约</h1>
          <p>每一位来访者都带着心事而来，先坐下来，听他说。</p>
        </div>
        <div className="clinic-header-right">
          <StatChip val={Object.keys(game.patientRecords).length} label="已接待" />
          <StatChip val={game.skills.length} label="技能" />
          <StatChip val={game.clinicUpgrades.length} label="设施" />
        </div>
      </div>
      <div className="clinic-body">
        <div className="patient-section today-section">
          <div className="section-title">
            今 日 预 约 <span className="count">{todayList.length} 位客户</span>
          </div>
          <div className="patient-list">
            {todayList.length === 0 ? (
              <div className="empty-state">
                今日名额已用完。
                <br />
                点击「休息一日」进入下一天。
              </div>
            ) : null}
            {todayList.map(renderPatientCard)}
          </div>
        </div>
        {completedList.length > 0 ? (
          <div className="patient-section completed-section">
            <div className="section-title">
              已 完 成 · 可 重 新 接 诊{" "}
              <span className="count">{completedList.length} 位客户</span>
            </div>
            <div className="patient-list">
              {completedList.map(renderPatientCard)}
            </div>
          </div>
        ) : null}
      </div>
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
