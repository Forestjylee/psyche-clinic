"use client";

import { useGame } from "@/lib/hooks/useGame";
import { scenarioById } from "@/lib/store";

/**
 * P5-3 归零温情场景：理智归零 → 结局页关闭后进入梦境。
 * 梦里见到自己帮助过的人（治愈/接纳/觉醒结局患者），醒后理智部分恢复。
 * 非 Game Over、非倒闭——「原来我也需要被照顾」。
 */
export function RestDreamOverlay() {
  const { restDreamVisible, dismissRestDream, game } = useGame();

  if (!restDreamVisible) return null;

  // 帮助过的人：治愈/接纳/觉醒结局的患者，取前 3 位作名签
  const helped = Object.entries(game.patientRecords)
    .filter(([, e]) => e === "cure" || e === "acceptance" || e === "awakening")
    .map(([id]) => scenarioById(game, id)?.name)
    .filter((n): n is string => Boolean(n))
    .slice(0, 3);

  return (
    <div className="rest-dream-mask" role="dialog" aria-modal="true" aria-label="一场很短很短的梦">
      <div className="rest-dream-card">
        <div className="rest-dream-title">一场很短很短的梦</div>
        <p className="rest-dream-text">你在诊室的沙发上睡着了。</p>
        {helped.length > 0 ? (
          <>
            <div className="rest-dream-people">
              {helped.map((name) => (
                <span className="rest-dream-person" key={name}>
                  {name}
                </span>
              ))}
            </div>
            <p className="rest-dream-text">
              梦里，你看见了——
              {helped.join("、")}。他们还是老样子，只是眉头都松开了。有人朝你轻轻挥了挥手。
            </p>
          </>
        ) : (
          <p className="rest-dream-text">
            梦里没有病人，只有一张空椅子，和窗外透进来的、很柔和的阳光。一个声音轻轻说：歇会儿吧。
          </p>
        )}
        <button className="rest-dream-btn" onClick={dismissRestDream}>
          慢慢醒过来
        </button>
      </div>
    </div>
  );
}
