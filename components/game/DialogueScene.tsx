"use client";

import { useEffect, useRef, useState } from "react";
import { useGame } from "@/lib/hooks/useGame";
import { DialogueEngine } from "@/lib/engine/DialogueEngine";
import type { DialogueNode, PatientEmotion, PatientState, MemoryFragment } from "@/lib/types";
import { allSkills } from "@/lib/data/skills";
import { TypewriterText } from "./TypewriterText";
import { TermText } from "./PsychTermSpan";
import { emotionColors, emotionLabels, choiceIcons } from "./constants";
import { ChibiCharacter } from "./ChibiCharacter";

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
  const flashTimer = useRef<number | null>(null);
  const [node, setNode] = useState<DialogueNode | null>(null);
  const [pState, setPState] = useState<PatientState | null>(null);
  const [emotion, setEmotion] = useState<PatientEmotion>("neutral");
  const [flashback, setFlashback] = useState<MemoryFragment | null>(null);

  useEffect(() => {
    if (!currentPatient) return;
    const eng = new DialogueEngine(currentPatient, game, {
      onStateChange: (state, emo) => {
        setPState({ ...state });
        if (emo) setEmotion(emo as PatientEmotion);
        achievementEngine?.onStateUpdate(state);
      },
      onNodeEnter: (n) => setNode(n),
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
        setFlashback(frag);
        playSound("memory");
        if (flashTimer.current) window.clearTimeout(flashTimer.current);
        flashTimer.current = window.setTimeout(() => setFlashback(null), 3400);
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

  // 卸载时清理闪回计时器
  useEffect(() => {
    return () => {
      if (flashTimer.current) window.clearTimeout(flashTimer.current);
    };
  }, []);

  const dismissFlashback = () => {
    if (flashTimer.current) window.clearTimeout(flashTimer.current);
    setFlashback(null);
  };

  if (!currentPatient || !node) return null;

  const speakerName =
    node.speaker === "patient"
      ? currentPatient.name
      : node.speaker === "doctor"
      ? "你"
      : "—— 旁白 ——";
  const isNarration = node.speaker === "narration";

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
    engineRef.current?.choose(c);
  };

  const emoColor = emotionColors[emotion];
  const palette = currentPatient.palette;

  return (
    <div className="scene dialogue-scene">
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
      </div>
      <div className="dialogue-panel">
        <div className="patient-status">
          {pState ? (
            <>
              <StatusRow label="信任" value={pState.trust} color="var(--good)" />
              <StatusRow label="防御" value={pState.defense} color="var(--bad)" />
              <StatusRow label="心情" value={pState.mood} color="var(--accent)" />
              <StatusRow label="真相" value={pState.truth} color="var(--truth)" />
            </>
          ) : null}
        </div>
        <div className="dialogue-speaker-row">
          <div className={`dialogue-speaker ${isNarration ? "narration" : ""}`}>{speakerName}</div>
        </div>
        <TypewriterText key={node.id} text={node.text} />
        <div className="choices">
          {node.isEnding ? null : node.choices && node.choices.length > 0 ? (
            node.choices.map((c) => {
              const meets = meetsRequirement(c.require);
              const hasSkill = !c.requireSkill || game.skills.includes(c.requireSkill);
              const locked = !meets || !hasSkill;
              const icon = choiceIcons[c.kind] ?? "?";
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
                  <span className={`choice-icon ${c.kind}`}>{icon}</span>
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
      </div>
      {flashback ? (
        <div
          className="memory-flash"
          onClick={dismissFlashback}
          role="dialog"
          aria-label="记忆碎片"
        >
          <div className="memory-flash-card">
            <div className="memory-flash-title">{flashback.title}</div>
            <div className="memory-flash-text">{flashback.text}</div>
            <div className="memory-flash-hint">—— 记忆碎片 · 点击继续 ——</div>
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
