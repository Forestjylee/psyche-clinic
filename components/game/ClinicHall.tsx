"use client";

import { useGame } from "@/lib/hooks/useGame";
import { allPatients } from "@/lib/data/patients";
import { allSkills, allClinicUpgrades } from "@/lib/data/skills";
import { allAchievements } from "@/lib/data/achievements";
import { endingColor, endingLabel } from "./constants";

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
  } = useGame();

  const allAvailable = [...allPatients, ...game.generatedScenarios];
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
    const locked = p.requireReputation ? game.doctor.reputation < p.requireReputation : false;
    if (locked) {
      playSound("locked");
      return;
    }
    startSession(p);
  };

  return (
    <div className="scene clinic">
      <div className="clinic-header">
        <div className="clinic-header-left">
          <h1>诊 疗 大 厅</h1>
          <p>候诊室里有人等你。不必急着「治好」谁——先坐下来，听他说。</p>
        </div>
        <div className="clinic-header-right">
          <StatChip val={Object.keys(game.patientRecords).length} label="已接诊" />
          <StatChip val={game.skills.length} label="技能" />
          <StatChip val={game.clinicUpgrades.length} label="设施" />
        </div>
      </div>
      <div className="clinic-body">
        <div className="patient-section">
          <div className="section-title">
            候 诊 室 <span className="count">{totalPatients} 位患者</span>
          </div>
          <div className="patient-list">
            {allAvailable.map((p) => {
              const completed = game.patientRecords[p.id];
              const locked = p.requireReputation
                ? game.doctor.reputation < p.requireReputation
                : false;
              const isGenerated = p.id.startsWith("gen_");
              return (
                <div
                  key={p.id}
                  className={`patient-card ${locked ? "locked" : ""} ${completed ? "completed" : ""}`}
                  style={
                    {
                      "--card-accent": p.palette.primary,
                      "--card-accent-glow": `${p.palette.primary}40`,
                    } as React.CSSProperties
                  }
                  onClick={() => onCardClick(p)}
                >
                  <div
                    className="patient-avatar"
                    style={{
                      background: `linear-gradient(135deg, ${p.palette.primary}, ${p.palette.fog})`,
                      color: "white",
                    }}
                  >
                    {p.name[0]}
                  </div>
                  <div className="patient-info">
                    <div className="patient-name">
                      <span className="patient-name-text">{p.name}</span>
                      <span className={`patient-difficulty ${p.difficulty}`}>{p.difficulty}</span>
                      {isGenerated ? (
                        <span
                          className="patient-difficulty"
                          style={{ color: "var(--accent-2)", borderColor: "var(--accent-2)" }}
                        >
                          生成
                        </span>
                      ) : null}
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
                    {completed ? (
                      <div className="patient-completed-tag">已完成 · 可重新接诊</div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="clinic-side">
          <div className="side-card">
            <h3>医 生 成 长</h3>
            <SideBtn
              label="技能树"
              right={`LV.${game.doctor.level} · ${game.doctor.exp}/${expToNext(game.doctor.level)}`}
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
              label="患者来信"
              right={`${game.letters.length} 封`}
              onClick={() => {
                playSound("page");
                setScene("letters");
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
              label="剧本工坊"
              right="无限剧本"
              rightClass="gen-side-tag"
              onClick={() => {
                playSound("page");
                setScene("generator");
              }}
            />
            <SideBtn
              label="休息一日"
              right={`理智 +${getRestRecovery()}`}
              rightClass="rest-side-tag"
              onClick={restOneDay}
            />
          </div>
          <div className="side-card">
            <h3>诊 所 状 态</h3>
            <div className="side-stats">
              <StatLine label="已接诊患者" value={`${Object.keys(game.patientRecords).length} / ${totalPatients}`} />
              <StatLine label="已解锁技能" value={`${game.skills.length} / ${allSkills.length}`} />
              <StatLine label="诊所升级" value={`${game.clinicUpgrades.length} / ${allClinicUpgrades.length}`} />
              <StatLine label="游戏天数" value={`第 ${game.day} 天`} />
            </div>
          </div>
          <div className="side-card">
            <h3>操 作</h3>
            <SideBtn label="保存游戏" onClick={saveNow} />
            <SideBtn label="返回标题" onClick={backToTitle} />
          </div>
        </div>
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

function SideBtn({
  label,
  right,
  rightClass,
  onClick,
}: {
  label: string;
  right?: string;
  rightClass?: string;
  onClick?: () => void;
}) {
  return (
    <button className="side-btn" onClick={onClick}>
      <span>{label}</span>
      {right ? <span className={rightClass} style={{ color: "var(--text-dim)" }}>{right}</span> : null}
    </button>
  );
}

function StatLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat-line">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
