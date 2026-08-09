"use client";

import { useGame } from "@/lib/hooks/useGame";
import { allPatients } from "@/lib/data/patients";
import { endingLabel, endingColor, endingEmotion } from "./constants";
import { ChibiCharacter } from "./ChibiCharacter";
import { DECAY_START_DAY, WARN_DAY } from "@/lib/state/GameState";

export function Tracking() {
  const { game, setScene, startSession, playSound } = useGame();
  const all = allPatients;

  const tracked = all.filter(
    (p) =>
      !game.patientRecords[p.id] &&
      !game.abandoned.includes(p.id) &&
      game.arrivedPatients.includes(p.id)
  );
  const closed = all.filter(
    (p) => game.patientRecords[p.id] || game.abandoned.includes(p.id)
  );

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
      <h2>客 户 追 踪</h2>
      <p className="subtitle">
        只要心理问题没有解决，客户的档案就会一直跟在这里，直到结案。
      </p>

      <div className="tracking-section-title">
        ✦ 追踪中 · {tracked.length} 人
      </div>
      <div className="tracking-list">
        {tracked.length === 0 ? (
          <div className="empty-state">
            目前没有在追踪中的客户。
            <br />
            完成首诊后，未结案的客户会一直出现在这里。
          </div>
        ) : (
          tracked.map((p) => {
            const locked = p.requireReputation
              ? game.doctor.reputation < p.requireReputation
              : false;
            const treatment = game.treatmentStages[p.id];
            const treating = !!treatment;
            const waitDays = game.waitingDays[p.id] ?? 0;
            const severity =
              waitDays >= WARN_DAY
                ? "critical"
                : waitDays >= DECAY_START_DAY
                ? "decaying"
                : "stable";
            return (
              <div key={p.id} className={`tracking-card ${locked ? "locked" : ""}`}>
                <div className="tracking-avatar">
                  <ChibiCharacter palette={p.palette} size="sm" emotion="neutral" />
                </div>
                <div className="tracking-info">
                  <div className="tracking-name">
                    {p.name}
                    <span className={`patient-difficulty ${p.difficulty}`}>
                      {p.difficulty}
                    </span>
                  </div>
                  <div className="tracking-title">{p.title}</div>
                  <div className="tracking-status">
                    {treating ? (
                      <span className="patient-wait-tag">
                        {treatment!.arrived
                          ? "✚ 复诊到访 · 可继续会谈"
                          : `治疗中 · 已完成 ${treatment!.stage} 次会谈，待复诊`}
                      </span>
                    ) : (
                      <span
                        className={`patient-wait-tag ${
                          severity === "critical"
                            ? "critical"
                            : severity === "decaying"
                            ? "decaying"
                            : ""
                        }`}
                      >
                        {severity === "critical"
                          ? `⚠ 病情严重 · 已等待 ${waitDays} 天`
                          : severity === "decaying"
                          ? `病情加重 · 已等待 ${waitDays} 天`
                          : waitDays > 0
                          ? `已等待 ${waitDays} 天`
                          : "等待接诊"}
                      </span>
                    )}
                    {locked ? (
                      <span className="patient-locked-tag">
                        需声望 {p.requireReputation}
                      </span>
                    ) : null}
                  </div>
                </div>
                <button
                  className="tracking-act"
                  disabled={locked || (treating && !treatment!.arrived)}
                  onClick={() => {
                    if (!locked && !(treating && !treatment!.arrived))
                      startSession(p);
                  }}
                >
                  {treating && !treatment!.arrived ? "待复诊" : "去接诊"}
                </button>
              </div>
            );
          })
        )}
      </div>

      <div className="tracking-section-title">✦ 已结案 · {closed.length} 人</div>
      <div className="tracking-list">
        {closed.length === 0 ? (
          <div className="empty-state">还没有结案的客户。</div>
        ) : (
          closed.map((p) => {
            const done = game.patientRecords[p.id];
            const abandoned = game.abandoned.includes(p.id);
            return (
              <div key={p.id} className="tracking-card closed">
                <div className="tracking-avatar">
                  <ChibiCharacter
                    palette={p.palette}
                    size="sm"
                    emotion={done ? endingEmotion[done] : "anxious"}
                  />
                </div>
                <div className="tracking-info">
                  <div className="tracking-name">
                    {p.name}
                    <span className={`patient-difficulty ${p.difficulty}`}>
                      {p.difficulty}
                    </span>
                  </div>
                  <div className="tracking-title">{p.title}</div>
                  <div className="tracking-status">
                    {abandoned ? (
                      <span className="patient-wait-tag critical">
                        已放弃治疗
                      </span>
                    ) : done ? (
                      <span
                        className="patient-wait-tag"
                        style={{
                          color: endingColor(done),
                          borderColor: endingColor(done),
                        }}
                      >
                        {endingLabel(done)}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
