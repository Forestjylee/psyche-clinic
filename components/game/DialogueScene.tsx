"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useGame } from "@/lib/hooks/useGame";
import { DialogueEngine } from "@/lib/engine/DialogueEngine";
import type { DialogueNode, PatientEmotion, PatientState, MemoryFragment } from "@/lib/types";
import { allSkills } from "@/lib/data/skills";
import { TypewriterText } from "./TypewriterText";
import { TermText } from "./PsychTermSpan";
import { emotionColors, emotionLabels } from "./constants";
import { ChibiCharacter } from "./ChibiCharacter";
import { CLINIC_LAYOUT } from "./phaser/clinic/clinicLayout";

/** 诊室 Phaser 画布（ClinicScene 底层房间 + 医生；ssr:false 动态挂载）。
 *  Promise.all 同时取 GameCanvas 与 ClinicScene，闭包注入 scenes，
 *  避免在客户端组件静态引入 Phaser（服务端渲染会崩溃）。 */
const ClinicRoomCanvas = dynamic(
  () =>
    Promise.all([
      import("./phaser/GameCanvas"),
      import("./phaser/clinic/ClinicScene"),
    ]).then(([canvas, clinic]) => {
      const GameCanvasComp = canvas.GameCanvas;
      const ClinicSceneComp = clinic.ClinicScene;
      const ClinicRoom = () => <GameCanvasComp scenes={[ClinicSceneComp]} />;
      return ClinicRoom;
    }),
  {
    ssr: false,
    loading: () => (
      <div className="phaser-canvas phaser-loading">诊室准备中…</div>
    ),
  }
);

/** 一句话记录（旁白独立走顶部，不入历史；P2-6 回顾窗用） */
type Line = { id: string; speaker: "patient" | "doctor"; text: string };

/** 逻辑坐标 → 覆盖层百分比（960×540 → 100%） */
const logiPct = (v: number, total: number) => `${(v / total) * 100}%`;

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
  const [flashback, setFlashback] = useState<MemoryFragment | null>(null);
  // 保留但不滚动渲染：P2-6 回顾窗需要完整会话记录
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
        // 旁白走顶部展示，不入历史
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
    // 玩家选择的发言进入历史（P2-6 回顾窗用），然后推进剧情
    setHistory((h) => [
      ...h,
      { id: `player-${h.length}`, speaker: "doctor", text: c.text },
    ]);
    engineRef.current?.choose(c);
  };

  const emoColor = emotionColors[emotion];
  const palette = currentPatient.palette;

  // 当前句定位：narration 走顶部旁白，patient/doctor 走各自气泡锚点
  const sp = node.speaker;
  const isNarration = sp === "narration";
  const bubbleAnchor =
    sp === "patient" ? CLINIC_LAYOUT.bubbleAnchor.patient : CLINIC_LAYOUT.bubbleAnchor.doctor;
  const bubbleName = sp === "patient" ? currentPatient.name : "你";

  return (
    <div className="scene dialogue-scene">
      {/* 底层诊室房间 + 医生坐像（Phaser FIT 铺满） */}
      <ClinicRoomCanvas />

      {/* FIT 对齐覆盖层：与 Phaser 画布显示区域精确同框（960×540 等比居中） */}
      <div className="clinic-stage">
        {/* 患者立绘 + 姓名/情绪 tag（emotion 驱动，只走 React） */}
        <div
          className="patient-figure"
          style={{
            left: logiPct(CLINIC_LAYOUT.patientPos.x, CLINIC_LAYOUT.width),
            top: logiPct(CLINIC_LAYOUT.patientPos.y, CLINIC_LAYOUT.height),
          }}
        >
          <ChibiCharacter
            palette={palette}
            emotion={emotion}
            size="lg"
            className="patient-chibi"
          />
          <div className="patient-chip">
            <span className="patient-chip-name">{currentPatient.name}</span>
            <span className="patient-chip-emo" style={{ color: emoColor }}>
              {emotionLabels[emotion]}
            </span>
          </div>
        </div>

        {/* 当前句：narration 顶部旁白 / patient·doctor 面对面气泡（换句重挂载打字） */}
        {isNarration ? (
          <div className="dialogue-narration" key={node.id}>
            <TypewriterText text={node.text} />
          </div>
        ) : (
          <div
            key={node.id}
            className={`speak-bubble ${sp}`}
            style={{
              left: logiPct(bubbleAnchor.x, CLINIC_LAYOUT.width),
              top: logiPct(bubbleAnchor.y, CLINIC_LAYOUT.height),
            }}
          >
            <span className="bubble-name">{bubbleName}</span>
            <TypewriterText text={node.text} />
          </div>
        )}
      </div>

      {/* 角落四维（紧凑小尺寸；P2-5 再做淡化打磨） */}
      {pState ? (
        <div className="corner-stats">
          <StatusRow label="信任" value={pState.trust} color="var(--good)" />
          <StatusRow label="防御" value={pState.defense} color="var(--bad)" />
          <StatusRow label="心情" value={pState.mood} color="var(--accent)" />
          <StatusRow label="真相" value={pState.truth} color="var(--truth)" />
        </div>
      ) : null}

      {/* 底部：候选对话 / 继续 */}
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
