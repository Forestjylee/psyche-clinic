"use client";

import { useEffect, useRef, useState } from "react";
import { useGame } from "@/lib/hooks/useGame";
import { DialogueEngine } from "@/lib/engine/DialogueEngine";
import type { DialogueNode, PatientEmotion, PatientState, MemoryFragment } from "@/lib/types";
import { allSkills } from "@/lib/data/skills";
import { TypewriterText } from "./TypewriterText";
import { TermText } from "./PsychTermSpan";
import { emotionColors, emotionLabels } from "./constants";
import { ChibiCharacter } from "./ChibiCharacter";

/** 聊天区一条消息（旁白独立走顶部，不入历史） */
type Line = { id: string; speaker: "patient" | "doctor"; text: string };

export function DialogueScene() {
  const {
    game,
    currentPatient,
    achievementEngine,
    finishSession,
    pushFloating,
    playSound,
  } = useGame();

  const engineRef = useRef<DialogueEngine | null>(null);
  const chatRef = useRef<HTMLDivElement | null>(null);
  const [node, setNode] = useState<DialogueNode | null>(null);
  const [pState, setPState] = useState<PatientState | null>(null);
  const [emotion, setEmotion] = useState<PatientEmotion>("neutral");
  const [flashback, setFlashback] = useState<MemoryFragment | null>(null);
  const [history, setHistory] = useState<Line[]>([]);

  useEffect(() => {
    if (!currentPatient) return;
    setHistory([]);
    const eng = new DialogueEngine(currentPatient, game, {
      onStateChange: (state, emo) => {
        setPState({ ...state });
        if (emo) setEmotion(emo as PatientEmotion);
        achievementEngine?.onStateUpdate(state);
      },
      onNodeEnter: (n) => {
        setNode(n);
        // 旁白走顶部展示，不入左右聊天流
        const sp = n.speaker;
        if (sp === "patient" || sp === "doctor") {
          setHistory((h) => [
            ...h,
            { id: `${n.id}-${h.length}`, speaker: sp, text: n.text },
          ]);
        }
      },
      onChoiceMade: (choice) => {
        const s = eng.getState();
        achievementEngine?.onChoiceMade(choice.kind, s);
      },
      onComboTrigger: () => {
        achievementEngine?.onComboTrigger();
        playSound("combo");
      },
      onFloatingText: (text, kind) => pushFloating(text, kind),
      onMemoryTrigger: (frag) => {
        // 记忆碎片不自动关闭，等待玩家阅读后点击关闭
        setFlashback(frag);
        playSound("memory");
      },
      onEnding: (ending, title, text, reward) => {
        const s = eng.getState();
        finishSession(ending, title, text, reward, currentPatient.id, s);
      },
    });
    engineRef.current = eng;
    eng.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPatient]);

  // 聊天区自动滚动到底
  useEffect(() => {
    const el = chatRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history]);

  const dismissFlashback = () => setFlashback(null);

  if (!currentPatient || !node) return null;

  const meetsRequirement = (require?: {
    trust?: number;
    defense?: number;
    mood?: number;
    truth?: number;
  }) => {
    if (!require) return true;
    const s = engineRef.current?.getState();
    if (!s) return true;
    if (require.trust !== undefined && s.trust < require.trust) return false;
    if (require.defense !== undefined && s.defense > require.defense) return false;
    if (require.mood !== undefined && s.mood < require.mood) return false;
    if (require.truth !== undefined && s.truth < require.truth) return false;
    return true;
  };

  const onChoose = (choiceId: string) => {
    const c = node.choices?.find((x) => x.id === choiceId);
    if (!c) return;
    const meets = meetsRequirement(c.require);
    const hasSkill = !c.requireSkill || game.skills.includes(c.requireSkill);
    if (!meets || !hasSkill) {
      playSound("locked");
      return;
    }
    playSound("click");
    // 玩家选择的发言进入右侧气泡，然后推进剧情
    setHistory((h) => [
      ...h,
      { id: `player-${h.length}`, speaker: "doctor", text: c.text },
    ]);
    engineRef.current?.choose(c);
  };

  const emoColor = emotionColors[emotion];
  const palette = currentPatient.palette;

  return (
    <div className="scene dialogue-scene">
      <div className="dialogue-narration">
        {node.speaker === "narration" ? (
          <TypewriterText key={node.id} text={node.text} />
        ) : (
          <span className="dialogue-narration-deco">✦</span>
        )}
      </div>

      <div className="dialogue-main">
        {/* 左栏：患者立绘 + 状态 */}
        <div className="patient-stage">
          <div
            className="patient-stage-bg"
            style={
              {
                "--stage-color": palette.fog,
                background: `linear-gradient(180deg, ${palette.fog}1c 0%, var(--bg-panel) 55%, var(--bg-panel-2) 100%)`,
              } as React.CSSProperties
            }
          />
          <div className="patient-figure">
            <ChibiCharacter
              palette={palette}
              emotion={emotion}
              size="xl"
              className="patient-chibi"
            />
            <div className="patient-name-label">{currentPatient.name}</div>
            <div className="patient-emotion-tag" style={{ color: emoColor }}>
              {emotionLabels[emotion]}
            </div>
          </div>
          {pState ? (
            <div className="patient-status">
              <StatusRow label="信任" value={pState.trust} color="var(--good)" />
              <StatusRow label="防御" value={pState.defense} color="var(--bad)" />
              <StatusRow label="心情" value={pState.mood} color="var(--accent)" />
              <StatusRow label="真相" value={pState.truth} color="var(--truth)" />
            </div>
          ) : null}
        </div>

        {/* 聊天区：患者消息靠左，玩家消息靠右 */}
        <div className="chat-area" ref={chatRef}>
          {history.length === 0 ? (
            <div className="chat-empty">……</div>
          ) : (
            history.map((line, i) => {
              const isLast = i === history.length - 1;
              const isPatient = line.speaker === "patient";
              return (
                <div
                  key={line.id}
                  className={`chat-line ${isPatient ? "chat-patient" : "chat-doctor"}`}
                >
                  {isPatient && (
                    <div
                      className="chat-avatar patient"
                      style={{ background: `linear-gradient(150deg, ${palette.primary}, ${palette.secondary})` }}
                    >
                      {currentPatient.name.slice(0, 1)}
                    </div>
                  )}
                  <div className={`chat-bubble ${isPatient ? "patient" : "doctor"}`}>
                    {isLast ? (
                      <TypewriterText key={line.id} text={line.text} />
                    ) : (
                      <div className="dialogue-text">{line.text}</div>
                    )}
                  </div>
                  {!isPatient && <div className="chat-avatar doctor">你</div>}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 底部：候选对话 */}
      <div className="dialogue-options">
        {node.isEnding ? null : node.choices && node.choices.length > 0 ? (
          node.choices.map((c) => {
            const meets = meetsRequirement(c.require);
            const hasSkill = !c.requireSkill || game.skills.includes(c.requireSkill);
            const locked = !meets || !hasSkill;
            const skillName = c.requireSkill
              ? allSkills.find((s) => s.id === c.requireSkill)?.name
              : null;
            const hint = c.hint
              ? c.hint
              : skillName && !hasSkill
              ? `需要技能：${skillName}`
              : "";
            return (
              <button
                key={c.id}
                className={`choice ${locked ? "choice-locked" : ""}`}
                disabled={locked}
                onClick={() => onChoose(c.id)}
                onMouseEnter={() => !locked && playSound("hover")}
              >
                <span className="choice-text">
                  <TermText text={c.text} />
                  {hint ? <div className="choice-hint">{hint}</div> : null}
                </span>
              </button>
            );
          })
        ) : (
          <button
            className="continue-btn"
            onClick={() => {
              playSound("click");
              engineRef.current?.continue();
            }}
          >
            继 续 ▸
          </button>
        )}
      </div>

      {flashback ? (
        <div className="memory-flash" role="dialog" aria-label="记忆碎片">
          <div className="memory-flash-card">
            <div className="memory-flash-title">{flashback.title}</div>
            <div className="memory-flash-text">{flashback.text}</div>
            <button className="memory-flash-close" onClick={dismissFlashback}>
              我知道了
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function StatusRow({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="status-row">
      <span className="status-label">{label}</span>
      <div className="status-bar">
        <div className="status-bar-fill" style={{ width: `${value}%`, background: color }} />
      </div>
      <span className="status-value">{Math.round(value)}</span>
    </div>
  );
}
