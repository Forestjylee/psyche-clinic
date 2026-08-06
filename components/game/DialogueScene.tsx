"use client";

import { useEffect, useRef, useState } from "react";
import { useGame } from "@/lib/hooks/useGame";
import { DialogueEngine } from "@/lib/engine/DialogueEngine";
import type { DialogueNode, PatientEmotion, PatientState } from "@/lib/types";
import { allSkills } from "@/lib/data/skills";
import { TypewriterText } from "./TypewriterText";
import { TermText } from "./PsychTermSpan";
import { emotionColors, emotionLabels, choiceIcons } from "./constants";

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
  const [node, setNode] = useState<DialogueNode | null>(null);
  const [pState, setPState] = useState<PatientState | null>(null);
  const [emotion, setEmotion] = useState<PatientEmotion>("neutral");

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
      onEnding: (ending, title, text, reward) => {
        const s = eng.getState();
        finishSession(ending, title, text, reward, currentPatient.id, s);
      },
    });
    engineRef.current = eng;
    eng.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPatient]);

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
  const mood = pState?.mood ?? 50;
  const blur = Math.max(0, (50 - mood) / 12);

  return (
    <div className="scene dialogue-scene">
      <div className="patient-stage">
        <div
          className="patient-stage-bg"
          style={
            {
              "--stage-color": palette.fog,
              background: `radial-gradient(ellipse at center, ${emoColor}22 0%, ${palette.fog} 50%, var(--bg-deep) 85%)`,
            } as React.CSSProperties
          }
        />
        <div
          className="patient-figure"
          style={{ filter: `blur(${blur}px) brightness(${0.6 + mood / 250})` }}
        >
          <div
            className={`patient-silhouette emo-${emotion}`}
            style={
              {
                "--fig-color": emoColor,
                background: `linear-gradient(180deg, ${emoColor} 0%, transparent 100%)`,
              } as React.CSSProperties
            }
          />
          <div className="patient-name-label">{currentPatient.name}</div>
          <div className="patient-emotion-tag" style={{ color: emoColor }}>
            {emotionLabels[emotion]}
          </div>
        </div>
        <div className="patient-status">
          {pState ? (
            <>
              <StatusRow label="信任" value={pState.trust} color="#6ad4a0" />
              <StatusRow label="防御" value={pState.defense} color="#ff7a8a" />
              <StatusRow label="心情" value={pState.mood} color="#7c9eff" />
              <StatusRow label="真相" value={pState.truth} color="#c8a4ff" />
            </>
          ) : null}
        </div>
      </div>
      <div className="dialogue-panel">
        <div className={`dialogue-speaker ${isNarration ? "narration" : ""}`}>{speakerName}</div>
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
