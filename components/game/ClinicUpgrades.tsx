"use client";

import { useGame } from "@/lib/hooks/useGame";
import { allClinicUpgrades } from "@/lib/data/clinicUpgrades";
import { decorById, variantForUpgrade } from "@/lib/data/decor";

/** 升级面板（独立 scene="clinic_upgrades"，SPEC §15 v1.4.0）：
 *  首页画布移除后装修拖动落格失效，本面板保留购置 / 设施外观切换 / 花画摆放收起（收藏管理）。 */
export function ClinicUpgrades({
  onClose,
}: {
  onClose?: () => void;
}) {
  const { game, buyUpgrade, setScene, playSound, setFacilityDecor, toggleDecor } =
    useGame();

  // 已购置且带外观变体的设施（P5-1 设施外观切换）
  const ownedVariants = allClinicUpgrades
    .filter((u) => game.clinicUpgrades.includes(u.id))
    .map((u) => ({ upgrade: u, variant: variantForUpgrade(u.id)! }))
    .filter((x) => x.variant);
  // 已解锁的花/画装饰（记忆陈列）
  const unlockedList = (game.unlockedDecors ?? [])
    .map((id) => decorById(id)!)
    .filter((d) => d && (d.kind === "flower" || d.kind === "picture"));
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

      {/* P5-1 装饰：记忆的陈列馆 */}
      <div className="decor-section">
        <div className="decor-section-title">装 饰 · 记 忆 的 陈 列 馆</div>
        <p className="decor-section-sub">
          升级换外观、治愈送花、碎片挂画——每一次装饰，都对应一段经历。
        </p>

        {/* 设施外观变体 */}
        <div className="decor-block">
          <div className="decor-block-title">设施外观</div>
          {ownedVariants.length === 0 ? (
            <div className="decor-empty">购置设施后，可在这里为它换上新外观。</div>
          ) : (
            ownedVariants.map(({ upgrade, variant }) => {
              const active = game.facilityDecors?.[upgrade.id] ?? "";
              return (
                <div className="decor-row" key={upgrade.id}>
                  <span className="decor-row-name">{upgrade.name}</span>
                  <span className="decor-row-switch">
                    <button
                      className={`decor-pill ${active === "" ? "active" : ""}`}
                      onClick={() => {
                        playSound("click");
                        setFacilityDecor(upgrade.id, "");
                      }}
                    >
                      默认
                    </button>
                    <button
                      className={`decor-pill ${active === variant.id ? "active" : ""}`}
                      onClick={() => {
                        playSound("click");
                        setFacilityDecor(upgrade.id, variant.id);
                      }}
                    >
                      {variant.name}
                    </button>
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* 记忆陈列：花/画 */}
        <div className="decor-block">
          <div className="decor-block-title">记忆陈列</div>
          {unlockedList.length === 0 ? (
            <div className="decor-empty">
              治愈患者、集齐记忆碎片，会在这里留下痕迹。
            </div>
          ) : (
            unlockedList.map((d) => {
              const placed = game.placedDecors?.includes(d.id) ?? false;
              return (
                <div className="decor-row" key={d.id}>
                  <div className="decor-row-main">
                    <span className="decor-row-name">{d.name}</span>
                    <span className="decor-row-story">{d.story}</span>
                  </div>
                  <button
                    className={`decor-toggle ${placed ? "on" : ""}`}
                    onClick={() => {
                      playSound("click");
                      toggleDecor(d.id);
                    }}
                  >
                    {placed ? "已摆放 · 收起" : "摆放"}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
