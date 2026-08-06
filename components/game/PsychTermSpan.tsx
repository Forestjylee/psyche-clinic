"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { allPsychTerms } from "@/lib/data/psychTerms";
import { tokenizeWithTerms } from "@/lib/utils/psychHighlight";
import { catName, escapeHtml } from "./constants";

interface TipState {
  termId: string;
  rect: DOMRect;
}

/** 单个高亮词汇 span，悬停/聚焦时通过 portal 显示浮窗 */
export function PsychTermSpan({
  termId,
  children,
}: {
  termId: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [tip, setTip] = useState<TipState | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const hideTimer = useRef<number | null>(null);

  const pt = allPsychTerms.find((x) => x.id === termId);

  const open = () => {
    if (hideTimer.current) {
      window.clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
    setShowDetail(false);
    if (ref.current) setTip({ termId, rect: ref.current.getBoundingClientRect() });
  };
  const scheduleClose = () => {
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setTip(null), 140);
  };
  const cancelClose = () => {
    if (hideTimer.current) {
      window.clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
    };
  }, []);

  if (!pt) return <>{children}</>;

  return (
    <>
      <span
        ref={ref}
        className="psych-term"
        tabIndex={0}
        onMouseEnter={open}
        onMouseLeave={scheduleClose}
        onFocus={open}
        onBlur={() => setTip(null)}
      >
        {children}
      </span>
      {tip &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="psych-term-tip"
            style={tipPosition(tip.rect)}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <div className="tip-head">
              <div className="tip-title">
                {pt.severity ? (
                  <span className={`sev-dot s${pt.severity}`} title={`严重度 ${pt.severity}/5`} />
                ) : null}
                <strong>{pt.term}</strong>
                <span className={`cat-tag cat-${pt.category}`}>{catName(pt.category)}</span>
              </div>
            </div>
            <div className="tip-brief">{pt.brief}</div>
            {pt.detail ? (
              <>
                {showDetail && <div className="tip-detail">{pt.detail}</div>}
                <button
                  className="tip-more-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDetail((v) => !v);
                  }}
                >
                  {showDetail ? "收起详情 ▴" : "展开详情 ▾"}
                </button>
              </>
            ) : null}
            {pt.source ? <div className="src">{pt.source}</div> : null}
          </div>,
          document.body
        )}
    </>
  );
}

function tipPosition(rect: DOMRect): React.CSSProperties {
  const tipW = 340;
  const estH = 160;
  let left = rect.left;
  if (left + tipW > window.innerWidth - 8) left = window.innerWidth - tipW - 8;
  if (left < 8) left = 8;
  let top = rect.bottom + 6;
  if (top + estH > window.innerHeight - 8) top = Math.max(8, rect.top - estH - 6);
  return { left, top, width: tipW, maxWidth: "calc(100vw - 16px)" };
}

// keep escapeHtml referenced for potential future raw rendering
void escapeHtml;

/**
 * 即时渲染文本（无打字机效果），命中心理学词汇时高亮并可悬停查看浮窗。
 * 用于选项按钮、结局描述等需要完整显示的文本。
 */
export function TermText({ text }: { text: string }) {
  const tokens = tokenizeWithTerms(text);
  return (
    <>
      {tokens.map((t, i) =>
        t.type === "term" ? (
          <PsychTermSpan key={i} termId={t.termId!}>
            {t.value}
          </PsychTermSpan>
        ) : (
          <React.Fragment key={i}>{t.value}</React.Fragment>
        )
      )}
    </>
  );
}
