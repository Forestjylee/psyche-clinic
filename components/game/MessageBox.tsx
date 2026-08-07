"use client";

import { useEffect, useMemo, useState } from "react";
import { useGame } from "@/lib/hooks/useGame";
import { allPatients } from "@/lib/data/patients";
import type { PatientPalette, PatientEmotion, MessageKind, GameMessage } from "@/lib/types";
import { ChibiCharacter } from "./ChibiCharacter";
import { LetterModal } from "./LetterModal";

const toneEmotion: Record<"thanks" | "neutral" | "sad" | "dark", PatientEmotion> = {
  thanks: "happy",
  neutral: "calm",
  sad: "sad",
  dark: "anxious",
};

const KIND_LABEL: Record<MessageKind | "all", string> = {
  all: "全部",
  letter: "来信",
  warning: "提醒",
  notice: "通知",
};

export function MessageBox() {
  const { game, setScene, playSound, markAllMessagesRead } = useGame();
  const [filter, setFilter] = useState<MessageKind | "all">("all");
  const [selected, setSelected] = useState<GameMessage | null>(null);

  // 打开消息盒子即全部标记已读
  useEffect(() => {
    markAllMessagesRead();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const palettes = useMemo(() => {
    const m = new Map<string, PatientPalette>();
    for (const p of [...allPatients, ...game.generatedScenarios]) {
      if (!m.has(p.name)) m.set(p.name, p.palette);
    }
    return m;
  }, [game.generatedScenarios]);

  const counts = useMemo(() => {
    const c = { all: game.messages.length, letter: 0, warning: 0, notice: 0 };
    for (const m of game.messages) c[m.kind] += 1;
    return c;
  }, [game.messages]);

  const list =
    filter === "all"
      ? game.messages
      : game.messages.filter((m) => m.kind === filter);

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
      <h2>消 息 盒 子</h2>
      <p className="subtitle">患者来信、病情提醒与诊室通知，都收在这里。</p>
      <div className="msg-tabs">
        {(["all", "letter", "warning", "notice"] as const).map((k) => (
          <button
            key={k}
            className={`msg-tab ${filter === k ? "active" : ""}`}
            onClick={() => {
              playSound("click");
              setFilter(k);
            }}
          >
            {KIND_LABEL[k]}
            <span className="msg-tab-count">{counts[k]}</span>
          </button>
        ))}
      </div>
      <div className="letters-list msg-list">
        {list.length === 0 ? (
          <div className="empty-state">
            这里还没有
            {filter === "letter" ? "来信。" : filter === "warning" ? "提醒。" : "消息。"}
            <br />
            完成诊疗后患者可能来信，病情变化也会提醒你。
          </div>
        ) : (
          list.map((m) => {
            const pal = m.patientName ? palettes.get(m.patientName) : undefined;
            const isLetter = m.kind === "letter";
            return (
              <div
                className={`letter-card msg-card ${m.kind} ${m.tone ?? ""} ${m.read ? "" : "unread"} ${isLetter ? "clickable" : ""}`}
                key={m.id}
                onClick={
                  isLetter
                    ? () => {
                        playSound("click");
                        setSelected(m);
                      }
                    : undefined
                }
              >
                <div className="letter-header">
                  <div className="letter-from-block">
                    {m.kind === "letter" && pal ? (
                      <div className="letter-avatar">
                        <ChibiCharacter
                          palette={pal}
                          emotion={toneEmotion[m.tone ?? "neutral"]}
                          size="sm"
                        />
                      </div>
                    ) : (
                      <span className={`msg-kind-icon ${m.kind}`}>
                        {m.kind === "warning" ? "⚠" : "✉"}
                      </span>
                    )}
                    <span className="letter-from">
                      {m.kind === "letter" ? `来自：${m.patientName}` : m.title}
                    </span>
                  </div>
                  <span className="letter-date">第 {m.day} 天</span>
                </div>
                {m.kind === "letter" ? <div className="letter-title">{m.title}</div> : null}
                <div className={`letter-content ${isLetter ? "clamp" : ""}`}>{m.body}</div>
                {isLetter ? <div className="letter-open-hint">点击展开信笺</div> : null}
              </div>
            );
          })
        )}
      </div>
      {selected ? <LetterModal message={selected} onClose={() => setSelected(null)} /> : null}
    </div>
  );
}
