"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useGame } from "@/lib/hooks/useGame";
import { useGameStore } from "@/lib/store";
import { DialogueEngine } from "@/lib/engine/DialogueEngine";
import type {
  DialogueNode,
  DialogueChoice,
  PatientEmotion,
  PatientState,
  MemoryFragment,
  ActiveSession,
} from "@/lib/types";
import { allSkills } from "@/lib/data/skills";
import { TypewriterText } from "./TypewriterText";
import { TermText } from "./PsychTermSpan";
import { emotionColors, emotionLabels } from "./constants";
import { ChibiCharacter } from "./ChibiCharacter";
import { DialogueQuickview, TAUGHT_EMPATHY_KEY, TAUGHT_LOCKED_KEY } from "./Onboarding";
import { CLINIC_LAYOUT } from "./phaser/clinic/clinicLayout";
import { toEmotionalFloating } from "./floatingEmotion";

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
    unlockFragment,
  } = useGame();

  const engineRef = useRef<DialogueEngine | null>(null);
  const [node, setNode] = useState<DialogueNode | null>(null);
  const [pState, setPState] = useState<PatientState | null>(null);
  const [emotion, setEmotion] = useState<PatientEmotion>("neutral");
  const [flashback, setFlashback] = useState<MemoryFragment | null>(null);
  // 保留但不滚动渲染：P2-6 回顾窗需要完整会话记录
  const [history, setHistory] = useState<Line[]>([]);
  // 右上角回顾窗开关（P2-6，非阻塞，可边看边推进剧情）
  const [historyOpen, setHistoryOpen] = useState(false);
  const historyRef = useRef<HTMLDivElement>(null);
  // P4-4 边做边学：共情/锁定教学浮层状态 + 「帮助」速览开关（只走渲染层，不改引擎）
  const [empathyHintId, setEmpathyHintId] = useState<string | null>(null);
  const [lockedHintOn, setLockedHintOn] = useState<string | null>(null);
  const lockedHintNodeRef = useRef<string | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);
  // P5-3 低理智疲惫句：会话首次进入且理智≤35 时顶部淡入一句（每会话一次，纯提示非阻塞）
  const [tiredOn, setTiredOn] = useState(false);
  const tiredRef = useRef(false);
  // 教学气泡定位（scene 相对坐标）：C1 修复——气泡移出 .dialogue-options 滚动容器，
  // 作为 .dialogue-scene 直接子级、按目标选项 getBoundingClientRect 换算坐标，避免被 overflow 裁剪
  const sceneRef = useRef<HTMLDivElement>(null);
  const [bubblePos, setBubblePos] = useState<{
    empathy?: { left: number; top: number };
    locked?: { left: number; top: number };
  }>({});

  useEffect(() => {
    if (!currentPatient) return;
    // P2-8 断点恢复：同一患者存在 activeSession 时重放历史 + 注入恢复参数
    const activeSession = game.activeSession;
    const resuming =
      activeSession != null && activeSession.patientId === currentPatient.id;
    if (resuming && activeSession) {
      setHistory(
        activeSession.history.map((l, i) => ({
          id: `restore-${i}`,
          speaker: l.speaker,
          text: l.text,
        }))
      );
    } else {
      setHistory([]);
    }
    const eng = new DialogueEngine(
      currentPatient,
      game,
      {
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
        // 机制语 → 情绪反馈（呈现层映射，不改引擎文案）
        onFloatingText: (text, kind) => pushFloating(toEmotionalFloating(text, kind), kind),
        onMemoryTrigger: (frag) => {
          // 记忆碎片不自动关闭，等待玩家阅读后点击关闭
          setFlashback(frag);
          playSound("memory");
          unlockFragment(currentPatient.id, frag.id); // P3-1 新增：碎片解锁落库
        },
        onEnding: (ending, title, text, reward) => {
          const s = eng.getState();
          finishSession(ending, title, text, reward, currentPatient.id, s);
        },
      },
      resuming && activeSession
        ? {
            nodeId: activeSession.nodeId,
            state: activeSession.patientState,
            triggeredMemories: activeSession.triggeredMemories,
          }
        : undefined
    );
    engineRef.current = eng;
    eng.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPatient]);

  // P5-3 低理智疲惫句：每会话首次进入且理智≤35 时置 on（淡入淡出走 CSS，不走历史、不影响对话流）
  useEffect(() => {
    if (currentPatient && game.doctor.sanity <= 35 && !tiredRef.current) {
      tiredRef.current = true;
      setTiredOn(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPatient]);

  /** 组装当前会话断点快照（P2-8）：引擎状态 + 断点节点 + 历史 + 已触发碎片 */
  const snapshotSession = (): ActiveSession | null => {
    const eng = engineRef.current;
    if (!eng || !currentPatient) return null;
    // 断点定位经 getResumeInfo()：补轮节点（_pad_*）不落剧本表，映射回其导向的真实结局节点，
    // 恢复后引擎按 state.round 自动重建补轮（最终评审 I-1）。普通节点即自身 id。
    const info = eng.getResumeInfo();
    const nodeId = info.nodeId;
    // 快照排除「恢复后会重建的行」：断点节点当前句（恢复后 start() 首次 enterNode 重新追加，
    // 方案 B 防重复）+ 补轮前缀行（恢复后 buildPadNode 重建补轮独白/二选一会重新追加）。
    const historyBeforeNode = history.filter(
      (l) =>
        !info.excludePrefixes.some((p) => l.id.startsWith(p)) &&
        !l.id.startsWith(`${nodeId}-`)
    );
    return {
      patientId: currentPatient.id,
      nodeId,
      patientState: eng.getState(),
      history: historyBeforeNode.map(({ speaker, text }) => ({ speaker, text })),
      triggeredMemories: eng.getTriggeredMemories(),
    };
  };

  // 对话进行中持续把最新快照草稿写入 game.activeSession（不落盘），
  // 「暂停」与 HUD「退出」（backToTitle 自带 saveGame）都据此保存断点
  useEffect(() => {
    if (!currentPatient || !engineRef.current) return;
    // P2-9 修复：结局节点不写回断点草稿。
    // 结算（finishSession）已把 activeSession 置 null 并落盘；若此处再写回，
    // 内存中的 activeSession 会残留为已完成患者，预约清单误显「继续上次」角标
    // （周明远/陈洛结案后实测复现）。跳过结局节点即可让断点在结算后保持清空。
    if (node?.isEnding) return;
    // 只同步「属于本会话」的断点草稿：activeSession 指向其他已暂停患者时跳过，
    // 避免新开的会话立即覆盖其断点——只有显式「暂停」或 activeSession 为空时的新会话才接管。
    const active = useGameStore.getState().game.activeSession;
    if (active && active.patientId !== currentPatient.id) return;
    const s = snapshotSession();
    if (s) useGameStore.getState().syncSessionDraft(s);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node, history, pState, currentPatient]);

  // 打开回顾窗时滚到底部（最新一句可见）；已打开时新句追加不打扰玩家的翻看位置
  useEffect(() => {
    if (historyOpen && historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [historyOpen]);

  const dismissFlashback = () => setFlashback(null);

  /** P4-4：选项是否锁定（前置要求不足或技能缺失），教学浮层与渲染共用同一判定 */
  const isChoiceLocked = (c: DialogueChoice): boolean => {
    const s = engineRef.current?.getState();
    let meets = true;
    if (c.require && s) {
      if (c.require.trust !== undefined && s.trust < c.require.trust) meets = false;
      else if (c.require.defense !== undefined && s.defense > c.require.defense) meets = false;
      else if (c.require.mood !== undefined && s.mood < c.require.mood) meets = false;
      else if (c.require.truth !== undefined && s.truth < c.require.truth) meets = false;
    }
    const hasSkill = !c.requireSkill || game.skills.includes(c.requireSkill);
    return !meets || !hasSkill;
  };

  // 共情教学：node 换了重算——未教过且本节点含「未锁定」共情选项时，提示第一个共情选项。
  // 点击落标记在 onChoose（点共情→学成；点别的→仅清提示，下个共情节点再弹）。
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!node) return;
    let taught = false;
    try {
      taught = !!localStorage.getItem(TAUGHT_EMPATHY_KEY);
    } catch {
      /* 隐私模式/SSR 兜底：当作未教过，正常引导 */
    }
    if (taught) {
      setEmpathyHintId(null);
      return;
    }
    const target = node.choices?.find((c) => c.kind === "empathy" && !isChoiceLocked(c));
    setEmpathyHintId(target ? target.id : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node]);

  // 锁定教学：node 换了重算——首次从「显示过锁定提示」的节点推进走即落标记（教一次即可）
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!node) return;
    let taught = false;
    try {
      taught = !!localStorage.getItem(TAUGHT_LOCKED_KEY);
    } catch {
      /* noop */
    }
    if (taught) {
      lockedHintNodeRef.current = null;
      setLockedHintOn(null);
      return;
    }
    const shownOn = lockedHintNodeRef.current;
    if (shownOn != null && shownOn !== node.id) {
      // 从显示过锁定提示的节点推进 → 视为首次关闭，落标记
      lockedHintNodeRef.current = null;
      try {
        localStorage.setItem(TAUGHT_LOCKED_KEY, "1");
      } catch {
        /* noop */
      }
      setLockedHintOn(null);
      return;
    }
    const lockedChoice = node.choices?.find((c) => isChoiceLocked(c));
    if (lockedChoice) {
      lockedHintNodeRef.current = node.id;
      setLockedHintOn(lockedChoice.id);
    } else {
      setLockedHintOn(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node]);

  /** 锁定提示「知道了」：首次关闭即落标记，之后不再教 */
  const dismissLockedHint = () => {
    playSound("click");
    try {
      localStorage.setItem(TAUGHT_LOCKED_KEY, "1");
    } catch {
      /* noop */
    }
    lockedHintNodeRef.current = null;
    setLockedHintOn(null);
  };

  // 教学气泡定位：以 .dialogue-scene 为锚，按目标选项 getBoundingClientRect 换算 scene 相对坐标。
  // 共情气泡在选项左侧、锁定气泡在选项右侧；clamp 防越出视口；resize 时重算。
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const compute = () => {
      const sceneRect = scene.getBoundingClientRect();
      const GAP = 20;
      const BUBBLE_W = 186;
      const clampX = (left: number) =>
        Math.max(8, Math.min(left, sceneRect.width - BUBBLE_W - 8));
      const measure = (choiceId: string) => {
        const el = scene.querySelector<HTMLElement>(
          `[data-choice-id="${CSS.escape(choiceId)}"]`
        );
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          left: r.left - sceneRect.left,
          right: r.right - sceneRect.left,
          top: r.top - sceneRect.top + r.height / 2,
        };
      };
      const pos: {
        empathy?: { left: number; top: number };
        locked?: { left: number; top: number };
      } = {};
      if (empathyHintId) {
        const m = measure(empathyHintId);
        if (m) pos.empathy = { left: clampX(m.left - BUBBLE_W - GAP), top: m.top };
      }
      if (lockedHintOn) {
        const m = measure(lockedHintOn);
        if (m) pos.locked = { left: clampX(m.right + GAP), top: m.top };
      }
      setBubblePos(pos);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node, empathyHintId, lockedHintOn]);

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
    // P4-4 边做边学：共情教学——点了共情选项即落标记（学成永不再弹）；
    // 点了非共情选项仅清提示不落标记（下个共情节点再弹一次）
    if (empathyHintId) {
      if (c.kind === "empathy") {
        try {
          localStorage.setItem(TAUGHT_EMPATHY_KEY, "1");
        } catch {
          /* noop */
        }
      }
      setEmpathyHintId(null);
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

  // —— 灯光呼吸层（P2-4）：共情/平静走暖橙，触及痛点走冷灰蓝；
  // 真相 ≥60 视为「真相揭开」状态，持续打出一束光（flashback 浮层 z90 会盖住瞬时光束，故不用其作信号） ——
  const warmEmotions: PatientEmotion[] = ["calm", "happy", "neutral"];
  const lightTone = warmEmotions.includes(emotion) ? "light-warm" : "light-dim";
  const revealTruth = !!pState && pState.truth >= 60;

  // 当前句定位：narration 走顶部旁白，patient/doctor 走各自气泡锚点
  const sp = node.speaker;
  const isNarration = sp === "narration";
  const bubbleAnchor =
    sp === "patient" ? CLINIC_LAYOUT.bubbleAnchor.patient : CLINIC_LAYOUT.bubbleAnchor.doctor;
  const bubbleName = sp === "patient" ? currentPatient.name : "你";

  return (
    <div className="scene dialogue-scene" ref={sceneRef}>
      {/* 底层诊室房间 + 医生坐像（Phaser FIT 铺满） */}
      <ClinicRoomCanvas />

      {/* 灯光呼吸层：半透明渐变叠在画布上（z1，气泡 z2 之上保持可读），随 emotion 切换色调 */}
      <div className="dialogue-light" aria-hidden="true">
        <div className={`light-plane light-warm ${lightTone === "light-warm" ? "on" : ""}`} />
        <div className={`light-plane light-dim ${lightTone === "light-dim" ? "on" : ""}`} />
        <div className={`light-beam ${revealTruth ? "on" : ""}`} />
      </div>

      {/* FIT 对齐覆盖层：与 Phaser 画布显示区域精确同框（960×540 等比居中） */}
      <div className="clinic-stage">
        {/* P5-3 低理智疲惫句：顶部中央小字，淡入淡出、pointer-events:none、不入历史 */}
        {tiredOn ? (
          <div className="dialogue-tired" role="note">
            今天……你也有些累了。这场对话结束，早点休息吧。
          </div>
        ) : null}

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

      {/* 右上角「回顾」+「暂停」按钮（P2-6 回顾窗 / P2-8 断点快照） */}
      <div className="dialogue-corner">
        <button
          className="dialogue-history-toggle"
          onClick={() => {
            playSound("click");
            setHistoryOpen((v) => !v);
          }}
          aria-label={historyOpen ? "关闭本场对话回顾" : "打开本场对话回顾"}
          aria-expanded={historyOpen}
        >
          <span aria-hidden="true">📖</span> 回顾
        </button>
        <button
          className="dialogue-pause-btn"
          onClick={() => {
            playSound("click");
            const s = snapshotSession();
            if (s) {
              // 先同步最新草稿再暂停（避免草稿 effect 尚未跑到的边缘情况）
              useGameStore.getState().syncSessionDraft(s);
              useGameStore.getState().pauseSession();
            }
          }}
          aria-label="暂停并保存会话进度"
          title="保存进度，稍后继续"
        >
          <span aria-hidden="true">⏸</span> 暂停
        </button>
        <button
          className="dialogue-help-btn"
          onClick={() => {
            playSound("click");
            setHelpOpen(true);
          }}
          aria-label="打开对话玩法速览"
          title="对话玩法速览回看"
        >
          <span aria-hidden="true">❓</span> 帮助
        </button>
      </div>

      {/* 本场对话回顾窗：history 逐行渲染，患者/医生左右镜像 + 配色区分 */}
      {historyOpen ? (
        <div className="dialogue-history" role="dialog" aria-label="本场对话回顾">
          <div className="dialogue-history-head">
            <span className="dialogue-history-title">本场对话</span>
            <button
              className="dialogue-history-close"
              onClick={() => setHistoryOpen(false)}
              aria-label="关闭回顾窗"
            >
              ✕
            </button>
          </div>
          <div className="dialogue-history-body" ref={historyRef}>
            {history.length === 0 ? (
              <div className="dialogue-history-empty">本场对话还没有记录</div>
            ) : (
              history.map((line) => (
                <div key={line.id} className={`history-line ${line.speaker}`}>
                  <span className="history-line-name">
                    {line.speaker === "patient" ? currentPatient.name : "你"}
                  </span>
                  <span className="history-line-text">
                    <TermText text={line.text} />
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      ) : null}

      {/* 对话玩法速览回看（P4-4 帮助入口）：模态面板，关闭后会话零改动、对话原样继续 */}
      {helpOpen ? (
        <DialogueQuickview
          onClose={() => {
            playSound("click");
            setHelpOpen(false);
          }}
        />
      ) : null}

      {/* 底部：候选对话 / 继续 */}
      <div className="dialogue-options">
        {node.isEnding ? null : node.choices && node.choices.length > 0 ? (
          node.choices.map((c) => {
            const locked = isChoiceLocked(c);
            const hasSkill = !c.requireSkill || game.skills.includes(c.requireSkill);
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
                data-choice-id={c.id}
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

      {/* 教学浮层（P4-4）：.dialogue-scene 直接子级、按选项 rect 定位（C1：不放进选项滚动容器，
          否则被 overflow-y:auto 裁剪）；纯提示非阻塞——共情 pointer-events:none，锁定仅「知道了」可点 */}
      {empathyHintId && bubblePos.empathy ? (
        <div
          className="teach-bubble teach-empathy"
          role="note"
          style={{ left: bubblePos.empathy.left, top: bubblePos.empathy.top }}
        >
          这是共情——一句温和的话，让对方放松，愿意多说一点。
        </div>
      ) : null}
      {lockedHintOn && bubblePos.locked ? (
        <div
          className="teach-bubble teach-locked"
          role="note"
          style={{ left: bubblePos.locked.left, top: bubblePos.locked.top }}
        >
          <span className="teach-locked-text">
            这个选项还锁着——要么满足前置条件，要么学会对应的话术。
          </span>
          <button className="teach-gotit" onClick={dismissLockedHint}>
            知道了
          </button>
        </div>
      ) : null}

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
