"use client";

import { useState } from "react";
import { useGame } from "@/lib/hooks/useGame";
import type { GameMessage, PatientEmotion, PatientScenario } from "@/lib/types";
import { endingColor, endingEmotion, endingLabel } from "./constants";
import { ChibiCharacter } from "./ChibiCharacter";
import { recapLines } from "./EndingOverlay";
import {
  allFragmentsCollected,
  archivePatients,
  archiveStatusText,
  deriveArchiveStatus,
  filterArchivePatients,
  fragmentCount,
  type ArchiveFilter,
  type ArchiveStatus,
  unlockedFragmentsFor,
} from "./archive";

const FILTERS: { key: ArchiveFilter; label: string }[] = [
  { key: "all", label: "全部" },
  { key: "closed", label: "已治愈" },
  { key: "incomplete", label: "碎片未集齐" },
];

/** 头像表情：已结案用结局表情，已离场（放弃/离场）用焦虑，其余平静 */
function archiveEmotion(p: PatientScenario, status: ArchiveStatus): PatientEmotion {
  if (status.kind === "closed" && status.ending) return endingEmotion[status.ending];
  if (status.kind === "abandoned" || status.kind === "discharged") return "anxious";
  return "neutral";
}

export function PatientArchive() {
  const { game, setScene, playSound } = useGame();
  // 相册式翻页：进入场景时 main 会因 key={scene} 重挂载，页码自然重置
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState<ArchiveFilter>("all");

  const patients = archivePatients(game);
  const filtered = filterArchivePatients(patients, game, filter);
  const total = filtered.length;
  const cur = total > 0 ? Math.min(page, total - 1) : 0;
  const p = total > 0 ? filtered[cur] : null;

  const goPrev = () => {
    if (cur <= 0) return;
    playSound("page");
    setPage(cur - 1);
  };
  const goNext = () => {
    if (cur >= total - 1) return;
    playSound("page");
    setPage(cur + 1);
  };

  // —— 每页数据组装（纯函数层，见 archive.ts）——
  const status = p ? deriveArchiveStatus(game, p.id) : null;
  const fragments = p ? unlockedFragmentsFor(game, p) : [];
  const missingFragments = p ? Math.max(0, fragmentCount(p) - fragments.length) : 0;
  // 泄底封口出口：仅碎片全部集齐时才允许在集齐区块渲染 p.truth
  const truthRevealed = p ? allFragmentsCollected(game, p) : false;
  const letters: GameMessage[] = p
    ? game.messages.filter((m) => m.patientName === p.name)
    : [];
  const ending = status && status.kind === "closed" ? status.ending : undefined;
  const recap = p && ending ? recapLines(ending, p.surface) : null;

  return (
    <div className="scene panel-view archive-view">
      <button
        className="nav-back"
        onClick={() => {
          playSound("page");
          setScene("clinic");
        }}
      >
        ◂ 返回诊所
      </button>
      <h2>患 者 档 案</h2>
      <p className="subtitle">见过的每一位患者，都留在这本记忆册里。</p>

      {/* 筛选按钮组：切换筛选时重置页码；空态下也保留，方便切回 */}
      <div className="archive-filter" role="group" aria-label="按状态筛选档案">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={`archive-filter-btn ${filter === f.key ? "active" : ""}`}
            onClick={() => {
              playSound("click");
              setFilter(f.key);
              setPage(0);
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {!p ? (
        patients.length === 0 ? (
          <div className="empty-state">
            还没有见过任何患者，去接诊一位吧。
          </div>
        ) : (
          <div className="empty-state">没有符合这个筛选的患者。</div>
        )
      ) : (
        <>
          <div className="archive-nav" aria-label="相册翻页">
            <button
              className="archive-nav-btn"
              onClick={goPrev}
              disabled={cur <= 0}
              title="上一页"
            >
              ◂ 上一页
            </button>
            <span className="archive-nav-count">
              第 {cur + 1} / {total} 页
            </span>
            <button
              className="archive-nav-btn"
              onClick={goNext}
              disabled={cur >= total - 1}
              title="下一页"
            >
              下一页 ▸
            </button>
          </div>

          <div className="archive-page paper-surface">
            {/* —— 头像 + 姓名 / 难度 / 头衔 / 状态 —— */}
            <div className="archive-head">
              <div className="archive-avatar">
                <ChibiCharacter
                  palette={p.palette}
                  emotion={archiveEmotion(p, status!)}
                  size="lg"
                />
              </div>
              <div className="archive-head-info">
                <div className="archive-name">
                  {p.name}
                  <span className={`patient-difficulty ${p.difficulty}`}>
                    {p.difficulty}
                  </span>
                </div>
                <div className="archive-title">{p.title}</div>
                <div
                  className={`archive-status ${status!.kind}`}
                  style={
                    status!.kind === "closed" && status!.ending
                      ? { color: endingColor(status!.ending) }
                      : undefined
                  }
                >
                  {archiveStatusText(status!)}
                </div>
              </div>
            </div>

            {/* —— 简介（intro + surface，安全；严禁 truth）—— */}
            <section className="archive-block">
              <div className="archive-block-title">关于 ta</div>
              <p className="archive-intro">{p.intro}</p>
              <p className="archive-surface">表象：{p.surface}</p>
            </section>

            {/* —— 记忆碎片（已解锁卡片 + 未解锁剪影占位）—— */}
            <section className="archive-block">
              <div className="archive-block-title">记忆碎片</div>
              {fragments.length > 0 ? (
                <div className="archive-fragment-list">
                  {fragments.map((f) => (
                    <div className="archive-fragment" key={f.id}>
                      <div className="archive-fragment-title">◇ {f.title}</div>
                      <p className="archive-fragment-text">{f.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="archive-note">还没有解锁的记忆碎片。</p>
              )}
              {missingFragments > 0 ? (
                <div className="archive-fragment-placeholders">
                  {Array.from({ length: missingFragments }, (_, i) => (
                    <div className="archive-fragment-placeholder" key={i}>
                      <span
                        className="archive-fragment-silhouette"
                        aria-hidden="true"
                      >
                        ◇
                      </span>
                      <p className="archive-fragment-placeholder-text">
                        还有一个片段没被记起
                      </p>
                    </div>
                  ))}
                  <p className="archive-note dim">
                    还差 {missingFragments} 段，集齐后 ta 的完整记忆会浮现。
                  </p>
                </div>
              ) : null}
            </section>

            {/* —— 真相浮现（碎片全部集齐才揭示；PRD 场景4 泄底封口出口，档案唯一允许展示 truth 的位置）—— */}
            {truthRevealed ? (
              <section className="archive-block archive-truth">
                <div className="archive-block-title">真相浮现</div>
                <p className="archive-truth-text">{p.truth}</p>
              </section>
            ) : null}

            {/* —— 结局记录（表象→现状复盘，不展开完整真相）—— */}
            {recap ? (
              <section className="archive-block">
                <div className="archive-block-title">结局记录</div>
                <div className="archive-ending">
                  <span
                    className="archive-ending-label"
                    style={{
                      color: endingColor(ending!),
                      borderColor: endingColor(ending!),
                    }}
                  >
                    {endingLabel(ending!)}
                  </span>
                  <div className="archive-ending-recap">
                    <div className="archive-ending-recap-title">✎ {recap.title}</div>
                    <p className="archive-ending-recap-line">{recap.lines[0]}</p>
                    <p className="archive-ending-recap-line">{recap.lines[1]}</p>
                  </div>
                </div>
              </section>
            ) : null}

            {/* —— 信件记录（无信不显示该区块）—— */}
            {letters.length > 0 ? (
              <section className="archive-block">
                <div className="archive-block-title">来信</div>
                <div className="archive-letter-list">
                  {letters.map((m) => (
                    <div className="archive-letter" key={m.id}>
                      <div className="archive-letter-head">
                        <span className="archive-letter-title">{m.title}</span>
                        <span className="archive-letter-day">第 {m.day} 天</span>
                      </div>
                      <p className="archive-letter-body">{m.body}</p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}
