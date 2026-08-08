"use client";

import { useGame } from "@/lib/hooks/useGame";
import { discoveryChannels } from "@/lib/data/discovery";
import { ChibiCharacter } from "./ChibiCharacter";

/**
 * 善意连接：付出一点善意的成本，让需要的人找上门，主动决定是否联系。
 * 对应 SPEC.md 3.6「善意连接（主动获客）」。
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
      <h2>善 意 连 接</h2>
      <p className="subtitle">
        声誉，会让需要你的人找上门来。付出一点善意，也许就有人愿意来聊聊。邀约是否被接受，看缘分。
      </p>

      <div className="discover-section">
        <div className="discover-section-title">连接方式</div>
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
                  {locked ? "声望不足" : afford ? "付出善意" : "金钱不足"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="discover-section">
        <div className="discover-section-title">
          需要你的人
          {game.discoveryCandidates.length > 0
            ? `（${game.discoveryCandidates.length} 位待处理）`
            : ""}
        </div>
        {game.discoveryCandidates.length === 0 ? (
          <div className="empty-state">还没有人找上门。愿意的话，先在上方做一件善事。</div>
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
                    联系 ta
                  </button>
                  <button className="discover-discard-btn" onClick={() => discardCandidate(c.id)}>
                    再等等
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="discover-note">
        被你联系的人，有的会应约而来。未联系的候选，会在休息后离开。
      </p>
    </div>
  );
}
