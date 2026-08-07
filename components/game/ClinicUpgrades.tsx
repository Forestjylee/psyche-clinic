"use client";

import { useGame } from "@/lib/hooks/useGame";
import { allClinicUpgrades } from "@/lib/data/skills";

export function ClinicUpgrades() {
  const { game, buyUpgrade, setScene, playSound } = useGame();
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
      <h2>诊 所 升 级</h2>
      <p className="subtitle">升级诊所设施，改善接诊体验。当前金钱：${game.doctor.money}</p>
      <div className="skill-grid">
        {allClinicUpgrades.map((u) => {
          const unlocked = game.clinicUpgrades.includes(u.id);
          const canBuy = !unlocked && game.doctor.money >= u.cost;
          return (
            <div
              className={`skill-card ${unlocked ? "unlocked" : canBuy ? "can-learn" : "locked"}`}
              key={u.id}
            >
              <div className="skill-name">
                {u.name}
                <span style={{ color: "var(--gold)", fontSize: 12 }}>${u.cost}</span>
              </div>
              <div className="skill-desc">{u.description}</div>
              {unlocked ? (
                <button className="skill-action learned" disabled>
                  已购置
                </button>
              ) : canBuy ? (
                <button className="skill-action learn" onClick={() => buyUpgrade(u.id)}>
                  购置 (${u.cost})
                </button>
              ) : (
                <button className="skill-action cant" disabled>
                  金钱不足
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
