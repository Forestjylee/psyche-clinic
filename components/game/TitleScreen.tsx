"use client";

import { useEffect, useState } from "react";
import { useGame } from "@/lib/hooks/useGame";
import type { SaveSlotMeta } from "@/lib/state/Storage";
import {
  DISCLAIMER_TITLE,
  DISCLAIMER_PARAGRAPHS,
  HELP_LINE,
  HELP_LINE_NAME,
  SKIP_SENSITIVE_KEY,
} from "./constants";

type SlotsMode = "continue" | "new";

/** 相对/简短时间：近 24h 显示相对，更早显示日期 + 时分 */
function formatUpdatedAt(ts: number): string {
  const diff = Date.now() - ts;
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  if (diff < minute) return "刚刚保存";
  if (diff < hour) return `${Math.floor(diff / minute)} 分钟前`;
  if (diff < day) return `${Math.floor(diff / hour)} 小时前`;
  const d = new Date(ts);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getMonth() + 1}月${d.getDate()}日 ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function TitleScreen() {
  const { hasSave, saveSlots, currentUser, newGame, continueGame, deleteSlot, register, playSound } =
    useGame();
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showNaming, setShowNaming] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [slotsMode, setSlotsMode] = useState<SlotsMode | null>(null);
  const [clinicName, setClinicName] = useState("森林诊所");
  const [registerName, setRegisterName] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
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

  const openContinue = () => {
    playSound("click");
    setSlotsMode("continue");
  };

  const openNewGame = () => {
    playSound("click");
    setClinicName("森林诊所");
    setShowNaming(true);
  };

  /** 命名确认：进槽位选择（新建 / 覆盖已有槽） */
  const confirmNaming = () => {
    playSound("click");
    setShowNaming(false);
    setSlotsMode("new");
  };

  const submitRegister = () => {
    if (!registerName.trim()) return;
    const res = register(registerName.trim());
    if (res.status === "ok") {
      setRegisterError("");
      setRegisterName("");
      setShowRegister(false);
    } else if (res.status === "duplicate") {
      setRegisterError("该昵称已被使用，永久保留，换一个吧");
      playSound("locked");
    }
  };

  const handlePickSlot = (slot: SaveSlotMeta) => {
    if (slot.source !== "local") return;
    setConfirmDeleteId(null);
    if (slotsMode === "new") {
      newGame(clinicName, slot.id); // 覆盖指定槽
    } else {
      continueGame(slot.id);
    }
  };

  const handleDeleteSlot = (slotId: string) => {
    if (confirmDeleteId === slotId) {
      deleteSlot(slotId);
      setConfirmDeleteId(null);
    } else {
      setConfirmDeleteId(slotId);
    }
  };

  const hasSlots = saveSlots.length > 0;

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
        <button className="title-btn primary" onClick={openNewGame}>
          开始新游戏
        </button>
        {hasSlots || hasSave ? (
          <button className="title-btn secondary" onClick={openContinue}>
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
      <div className="title-account">
        <span className="title-account-label">
          {currentUser ? `当前账号：${currentUser.name}` : "还未设置昵称"}
        </span>
        <button
          type="button"
          className="title-account-btn"
          onClick={() => {
            playSound("click");
            setRegisterName(currentUser?.name ?? "");
            setRegisterError("");
            setShowRegister(true);
          }}
        >
          {currentUser ? "切换昵称" : "注册"}
        </button>
      </div>
      {showNaming ? (
        <div className="disclaimer-backdrop" onClick={() => setShowNaming(false)}>
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
                if (e.key === "Enter") confirmNaming();
              }}
              aria-label="诊所名称"
            />
            <div className="naming-actions">
              <button className="disclaimer-close" onClick={() => setShowNaming(false)}>
                取消
              </button>
              <button className="title-btn primary naming-confirm" onClick={confirmNaming}>
                下一步
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {showRegister ? (
        <div className="disclaimer-backdrop" onClick={() => setShowRegister(false)}>
          <div
            className="naming-panel"
            role="dialog"
            aria-modal="true"
            aria-label="设置昵称"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="naming-title">{currentUser ? "切换昵称" : "注册账号"}</h4>
            <p className="naming-desc">
              起一个昵称，你的存档会归到这个账号名下，方便区分不同玩家的进度；云端上线后可凭此同步。
            </p>
            <input
              className="naming-input"
              value={registerName}
              maxLength={12}
              autoFocus
              placeholder="你的昵称"
              onChange={(e) => setRegisterName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") submitRegister();
              }}
              aria-label="昵称"
            />
            {registerError ? <p className="register-error">{registerError}</p> : null}
            <div className="naming-actions">
              <button className="disclaimer-close" onClick={() => setShowRegister(false)}>
                取消
              </button>
              <button
                className="title-btn primary naming-confirm"
                disabled={!registerName.trim()}
                onClick={submitRegister}
              >
                确定
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {slotsMode ? (
        <div className="disclaimer-backdrop" onClick={() => setSlotsMode(null)}>
          <div
            className="slots-panel"
            role="dialog"
            aria-modal="true"
            aria-label={slotsMode === "continue" ? "选择存档继续游戏" : "选择存档槽位"}
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="naming-title">
              {slotsMode === "continue" ? "选择存档继续游戏" : "选择存档槽位"}
            </h4>
            {slotsMode === "new" ? (
              <p className="naming-desc">
                新存档会归到「{clinicName}」名下。可以新建槽位，也可以覆盖旧的存档。
              </p>
            ) : (
              <p className="naming-desc">点击一个存档继续。云端存档上线后即可使用。</p>
            )}
            <div className="slots-list">
              {saveSlots.length === 0 ? (
                <div className="slots-empty">还没有存档，先「开始新游戏」吧。</div>
              ) : (
                saveSlots.map((slot) => {
                  const cloud = slot.source !== "local";
                  const deleting = confirmDeleteId === slot.id;
                  return (
                    <div
                      key={slot.id}
                      className={`slot-card${cloud ? " cloud" : ""}${deleting ? " deleting" : ""}`}
                      onClick={() => handlePickSlot(slot)}
                    >
                      <div className="slot-info">
                        <div className="slot-name">
                          {slot.clinicName}
                          {cloud ? <span className="slot-tag">云端 · 即将上线</span> : null}
                        </div>
                        <div className="slot-meta">
                          第 <b>{slot.day}</b> 天 · Lv.<b>{slot.level}</b> · ¥
                          <b>{slot.money}</b>
                        </div>
                        <div className="slot-owner">
                          <span className="slot-owner-name">
                            {slot.userName ? slot.userName : "未绑定账号"}
                          </span>
                          {slot.userName ? (
                            <span className="slot-tag local">本地</span>
                          ) : null}
                        </div>
                      </div>
                      <div className="slot-right">
                        <span className="slot-time">{formatUpdatedAt(slot.updatedAt)}</span>
                        {!cloud ? (
                          <button
                            type="button"
                            className={`slot-del${deleting ? " armed" : ""}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteSlot(slot.id);
                            }}
                            aria-label={deleting ? "确认删除此存档" : "删除此存档"}
                          >
                            {deleting ? "确认删除？" : "删除"}
                          </button>
                        ) : null}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            {slotsMode === "new" ? (
              <div className="slots-actions">
                <button
                  className="title-btn primary slots-new"
                  onClick={() => {
                    playSound("click");
                    newGame(clinicName);
                  }}
                >
                  新建存档槽位
                </button>
              </div>
            ) : null}
            <button className="disclaimer-close slots-close" onClick={() => setSlotsMode(null)}>
              返回
            </button>
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
        <div className="disclaimer-backdrop" onClick={() => setShowDisclaimer(false)}>
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
            <button className="disclaimer-close" onClick={() => setShowDisclaimer(false)}>
              知道了
            </button>
          </div>
        </div>
      ) : null}
      <div className="title-quote">「有时候，一个人需要的不是诊断，而是被认真听见。」</div>
      <div className="title-hint">
        这不是一场考试，没有标准答案。你愿意倾听，本身就是在治愈。
        <br />
        进度会自动保存到本地存档，下次打开可继续。
      </div>
    </div>
  );
}
