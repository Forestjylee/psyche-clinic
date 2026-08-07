"use client";

import { useGame } from "@/lib/hooks/useGame";
import { allClinicUpgrades } from "@/lib/data/skills";
import { bridge, EVENTS } from "@/lib/bridge/EventBridge";

/** 升级面板：可作独立 scene（scene="clinic_upgrades"），也可作大厅设施点击的浮层 */
export function ClinicUpgrades({
  onClose,
  decoratable,
  onDecorate,
  decorating,
}: {
  onClose?: () => void;
  decoratable?: boolean;
  onDecorate?: () => void;
  /** 是否处于装修模式（决定按钮文案） */
  decorating?: boolean;
}) {
  const { game, buyUpgrade, setScene, playSound } = useGame();
  return (
    <div className="scene panel-view">
      <button
        className="nav-back"
        onClick={() => {
          playSound("page");
          if (onClose) onClose();
          else setScene("clinic");
        }}
      >
        ◂ 返回诊所
      </button>
      <div className="panel-head">
        <h2>诊 所 升 级</h2>
        {decoratable ? (
          <button
            className={`decorate-btn ${decorating ? "active" : ""}`}
            onClick={() => {
              playSound("click");
              onDecorate?.();
            }}
          >
            {decorating ? "✓ 完成装修" : "🛠 装修模式"}
          </button>
        ) : null}
      </div>
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
                <button
                  className="skill-action learn"
                  onClick={() => {
                    buyUpgrade(u.id);
                    // 通知 Phaser 重绘设施（新购置的出现在大厅）
                    bridge.emit(EVENTS.syncFacilities, { facilities: [] });
                  }}
                >
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
