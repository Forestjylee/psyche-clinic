"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { useGame } from "@/lib/hooks/useGame";

/** 反馈草稿持久化 key（本地，无后端依赖；后续可对接云端反馈服务） */
export const FEEDBACK_STORE_KEY = "ps.feedback.v1";

export interface FeedbackEntry {
  id: number;
  type: "bug" | "suggestion" | "other";
  text: string;
  day: number;
  createdAt: number;
}

export type FeedbackType = FeedbackEntry["type"];

const TYPE_META: { value: FeedbackType; label: string; hint: string }[] = [
  { value: "bug", label: "问题 / Bug", hint: "哪里不对、报错了、体验卡住了" },
  { value: "suggestion", label: "建议", hint: "想加的功能、想改的玩法" },
  { value: "other", label: "其他", hint: "想说的话" },
];

function loadFeedback(): FeedbackEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(FEEDBACK_STORE_KEY);
    return raw ? (JSON.parse(raw) as FeedbackEntry[]) : [];
  } catch {
    return [];
  }
}

function appendFeedback(entry: FeedbackEntry): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(
      FEEDBACK_STORE_KEY,
      JSON.stringify([...loadFeedback(), entry])
    );
    return true;
  } catch {
    return false;
  }
}

interface Props {
  onClose: () => void;
}

/** HUD 问题反馈弹窗：类型 + 描述，提交存本地草稿并提示已记录 */
export function FeedbackDialog({ onClose }: Props) {
  const { game, playSound } = useGame();
  const [type, setType] = useState<FeedbackType>("bug");
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submit = () => {
    playSound("click");
    const trimmed = text.trim();
    if (!trimmed) return;
    const ok = appendFeedback({
      id: Date.now(),
      type,
      text: trimmed,
      day: game.day,
      createdAt: Date.now(),
    });
    setSubmitted(ok);
  };

  return createPortal(
    <div className="disclaimer-backdrop" onClick={onClose}>
      <div
        className="feedback-panel"
        role="dialog"
        aria-modal="true"
        aria-label="问题反馈"
        onClick={(e) => e.stopPropagation()}
      >
        <h4 className="feedback-title">问题反馈</h4>
        <p className="feedback-desc">
          你的反馈会帮助诊所变得更好。提交后保存在本地，开发者查看后跟进。
        </p>

        {submitted ? (
          <div className="feedback-done">
            <div className="feedback-done-icon">✓</div>
            <p>已记录你的反馈，谢谢认真倾听的你。</p>
            <button
              className="disclaimer-close"
              onClick={() => {
                playSound("click");
                onClose();
              }}
            >
              知道了
            </button>
          </div>
        ) : (
          <>
            <div className="feedback-types" role="radiogroup" aria-label="反馈类型">
              {TYPE_META.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  role="radio"
                  aria-checked={type === t.value}
                  className={`feedback-type ${type === t.value ? "on" : ""}`}
                  onClick={() => {
                    playSound("click");
                    setType(t.value);
                  }}
                >
                  <span className="feedback-type-label">{t.label}</span>
                  <span className="feedback-type-hint">{t.hint}</span>
                </button>
              ))}
            </div>
            <textarea
              className="feedback-textarea"
              value={text}
              maxLength={600}
              rows={4}
              placeholder="说说你遇到的情况，或想告诉我的话……"
              onChange={(e) => setText(e.target.value)}
              aria-label="反馈内容"
            />
            <div className="feedback-actions">
              <button
                className="disclaimer-close"
                onClick={() => {
                  playSound("click");
                  onClose();
                }}
              >
                取消
              </button>
              <button
                className="feedback-submit"
                disabled={!text.trim()}
                onClick={submit}
              >
                提交反馈
              </button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
