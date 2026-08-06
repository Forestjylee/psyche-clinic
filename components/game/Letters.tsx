"use client";

import { useGame } from "@/lib/hooks/useGame";

export function Letters() {
  const { game, setScene, playSound } = useGame();
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
      <h2>患 者 来 信</h2>
      <p className="subtitle">每一次诊疗的回响。有的温暖，有的沉重。</p>
      <div className="letters-list">
        {game.letters.length === 0 ? (
          <div className="empty-state">
            还没有收到任何来信。
            <br />
            完成一次诊疗后，患者可能会给你写信。
          </div>
        ) : (
          game.letters.map((l) => (
            <div className={`letter-card ${l.tone}`} key={l.id}>
              <div className="letter-header">
                <span className="letter-from">来自：{l.from}</span>
                <span className="letter-date">第 {l.date} 天</span>
              </div>
              <div className="letter-title">{l.title}</div>
              <div className="letter-content">{l.content}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
