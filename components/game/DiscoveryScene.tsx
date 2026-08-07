"use client";

import { useGame } from "@/lib/hooks/useGame";
import { discoveryChannels } from "@/lib/data/discovery";
import { ChibiCharacter } from "./ChibiCharacter";

/**
 * 发现客户：花钱通过渠道触达潜在客户，主动决定是否邀约。
 * 对应 SPEC.md 3.6「发现客户（主动获客）」。
 */
export function DiscoveryScene() {
  const { game, setScene, discover, invite, discardCandidate, playSound } = useGame();
  const rep = game.doctor.reputation;

  return (
    <div className="scene panel-view discover-view">
      <button
        className="nav-back"
        onClick={() => {
          playSound("page");
          setScene("clinic");
        }}
      >
        ◂ 返回诊所
      </button>
      <h2>发 现 客 户</h2>
      <p className="subtitle">
        花钱通过广告、广播等方式触达潜在客户，主动发送邀约。客户有概率接受，接受后择日到诊。
      </p>

      <div className="discover-section">
        <div className="discover-section-title">获客渠道</div>
        <div className="discover-channels">
          {discoveryChannels.map((ch) => {
            const locked = ch.requireReputation ? rep < ch.requireReputation : false;
            const afford = game.doctor.money >= ch.cost;
            return (
              <div key={ch.id} className={`discover-channel ${locked ? "locked" : ""}`}>
                <div className="discover-channel-info">
                  <div className="discover-channel-name">{ch.name}</div>
                  <div className="discover-channel-desc">{ch.desc}</div>
                </div>
                <div className="discover-channel-meta">
                  <span className="discover-channel-cost">
                    {locked ? `需声望 ${ch.requireReputation}` : `$${ch.cost}`}
                  </span>
                  <span className="discover-channel-out">
                    产出 {ch.minCount === ch.maxCount ? ch.minCount : `${ch.minCount}-${ch.maxCount}`} 位
                  </span>
                </div>
                <button
                  className="discover-channel-btn"
                  disabled={locked || !afford}
                  onClick={() => {
                    playSound("click");
                    void discover(ch.id);
                  }}
                >
                  {locked ? "声望不足" : afford ? "开始发现" : "金钱不足"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="discover-section">
        <div className="discover-section-title">
          潜在客户
          {game.discoveryCandidates.length > 0
            ? `（${game.discoveryCandidates.length} 位待处理）`
            : ""}
        </div>
        {game.discoveryCandidates.length === 0 ? (
          <div className="empty-state">还没有候选客户，选择上方渠道发现客户吧。</div>
        ) : (
          <div className="discover-candidates">
            {game.discoveryCandidates.map((c) => (
              <div key={c.id} className="discover-candidate">
                <div className="discover-candidate-avatar">
                  <ChibiCharacter palette={c.scenario.palette} size="sm" emotion="neutral" />
                </div>
                <div className="discover-candidate-info">
                  <div className="discover-candidate-name">{c.scenario.name}</div>
                  <div className="discover-candidate-intro">{c.scenario.intro}</div>
                </div>
                <div className="discover-candidate-actions">
                  <button className="discover-invite-btn" onClick={() => invite(c.id)}>
                    发送邀约
                  </button>
                  <button className="discover-discard-btn" onClick={() => discardCandidate(c.id)}>
                    暂不考虑
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="discover-note">
        邀约接受后有概率今日 / 明日 / 后日到诊（今日名额已满则顺延）。未邀约的候选会在休息后过期。
      </p>
    </div>
  );
}
