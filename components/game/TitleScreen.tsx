"use client";

import { useGame } from "@/lib/hooks/useGame";

export function TitleScreen() {
  const { hasSave, newGame, continueGame, playSound } = useGame();
  return (
    <div className="title-screen">
      <div className="title-bg-art" />
      <div className="title-main">心灵诊疗室</div>
      <div className="title-sub">PSYCHE CLINIC</div>
      <div className="title-tagline">
        你不必是心理学家，也能成为某个人暗夜里的那束光。
      </div>
      <div className="title-divider" />
      <div className="title-actions">
        <button
          className="title-btn primary"
          onClick={() => {
            playSound("click");
            newGame();
          }}
        >
          开始新游戏
        </button>
        {hasSave ? (
          <button
            className="title-btn secondary"
            onClick={() => {
              playSound("click");
              continueGame();
            }}
          >
            继续游戏
          </button>
        ) : null}
      </div>
      <div className="title-quote">「有时候，一个人需要的不是诊断，而是被认真听见。」</div>
      <div className="title-hint">
        这不是一场考试，没有标准答案。你愿意倾听，本身就是在治愈。
        <br />
        进度会自动保存到本地，下次打开可继续。
      </div>
    </div>
  );
}
