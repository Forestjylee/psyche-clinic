"use client";

import { useEffect, useState } from "react";
import { useGame } from "@/lib/hooks/useGame";
import {
  DISCLAIMER_TITLE,
  DISCLAIMER_PARAGRAPHS,
  HELP_LINE,
  HELP_LINE_NAME,
  SKIP_SENSITIVE_KEY,
} from "./constants";

export function TitleScreen() {
  const { hasSave, newGame, continueGame, playSound } = useGame();
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showNaming, setShowNaming] = useState(false);
  const [clinicName, setClinicName] = useState("森林诊所");
  const [skipSensitive, setSkipSensitive] = useState(false);

  useEffect(() => {
    // 挂载时读记忆偏好（与结局页「跳过这段演出」按钮共用同一 key，天然双向同步）
    try {
      setSkipSensitive(localStorage.getItem(SKIP_SENSITIVE_KEY) === "1");
    } catch {
      setSkipSensitive(false);
    }
  }, []);

  const toggleSkipSensitive = () => {
    const next = !skipSensitive;
    setSkipSensitive(next);
    try {
      if (next) localStorage.setItem(SKIP_SENSITIVE_KEY, "1");
      else localStorage.removeItem(SKIP_SENSITIVE_KEY);
    } catch {
      /* ignore */
    }
    playSound("click");
  };

  return (
    <div className="title-screen">
      <div className="title-bg-art" />
      <div className="title-main">森林心理诊所</div>
      <div className="title-sub">COZY CLINIC</div>
      <div className="title-tagline">
        你不必是心理学家，也能成为某个人暗夜里的那束光。
      </div>
      <div className="title-divider" />
      <div className="title-actions">
        <button
          className="title-btn primary"
          onClick={() => {
            playSound("click");
            setClinicName("森林诊所");
            setShowNaming(true);
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
      <button
        type="button"
        className={`title-pref${skipSensitive ? " on" : ""}`}
        role="switch"
        aria-checked={skipSensitive}
        aria-label="敏感结局演出自动以简短方式呈现"
        onClick={toggleSkipSensitive}
      >
        <span className="title-pref-toggle" aria-hidden="true" />
        <span className="title-pref-text">
          <span className="title-pref-label">敏感结局演出自动以简短方式呈现</span>
          <span className="title-pref-sub">
            开启后，涉及较重剧情的结局会自动跳过演出、只留一句简短收尾。你随时可以在这里关掉。
          </span>
        </span>
      </button>
      {showNaming ? (
        <div
          className="disclaimer-backdrop"
          onClick={() => setShowNaming(false)}
        >
          <div
            className="naming-panel"
            role="dialog"
            aria-modal="true"
            aria-label="给诊所命名"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="naming-title">给诊所取个名字</h4>
            <p className="naming-desc">它是你的，也是每一位推开门的患者的。叫什么都好，随你心意。</p>
            <input
              className="naming-input"
              value={clinicName}
              maxLength={10}
              autoFocus
              onChange={(e) => setClinicName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  playSound("click");
                  newGame(clinicName);
                }
              }}
              aria-label="诊所名称"
            />
            <div className="naming-actions">
              <button
                className="disclaimer-close"
                onClick={() => setShowNaming(false)}
              >
                取消
              </button>
              <button
                className="title-btn primary naming-confirm"
                onClick={() => {
                  playSound("click");
                  newGame(clinicName);
                }}
              >
                开始营业
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <button
        className="disclaimer-btn"
        onClick={() => {
          playSound("click");
          setShowDisclaimer(true);
        }}
      >
        免责声明
      </button>
      {showDisclaimer ? (
        <div
          className="disclaimer-backdrop"
          onClick={() => setShowDisclaimer(false)}
        >
          <div
            className="disclaimer-panel"
            role="dialog"
            aria-modal="true"
            aria-label={DISCLAIMER_TITLE}
            onClick={(e) => e.stopPropagation()}
          >
            <h4>{DISCLAIMER_TITLE}</h4>
            {DISCLAIMER_PARAGRAPHS.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <div className="disclaimer-hotline">
              {HELP_LINE_NAME}
              <span className="num">{HELP_LINE}</span>
            </div>
            <button
              className="disclaimer-close"
              onClick={() => setShowDisclaimer(false)}
            >
              知道了
            </button>
          </div>
        </div>
      ) : null}
      <div className="title-quote">「有时候，一个人需要的不是诊断，而是被认真听见。」</div>
      <div className="title-hint">
        这不是一场考试，没有标准答案。你愿意倾听，本身就是在治愈。
        <br />
        进度会自动保存到本地，下次打开可继续。
      </div>
    </div>
  );
}
