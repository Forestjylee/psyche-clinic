"use client";

import { useState } from "react";
import { useGame } from "@/lib/hooks/useGame";
import type { GameMessage, PatientEmotion, PatientScenario } from "@/lib/types";
import { endingColor, endingEmotion, endingLabel } from "./constants";
import { ChibiCharacter } from "./ChibiCharacter";
import { recapLines } from "./EndingOverlay";
import {
  archivePatients,
  archiveStatusText,
  deriveArchiveStatus,
  fragmentCount,
  type ArchiveStatus,
  unlockedFragmentsFor,
} from "./archive";

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

  const patients = archivePatients(game);
  const total = patients.length;
  const cur = total > 0 ? Math.min(page, total - 1) : 0;
  const p = total > 0 ? patients[cur] : null;

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
  const hasMore = p ? fragmentCount(p) > fragments.length : false;
  const missingFragments = p ? Math.max(0, fragmentCount(p) - fragments.length) : 0;
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

      {!p ? (
        <div className="empty-state">
          还没有见过任何患者，去接诊一位吧。
        </div>
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

            {/* —— 记忆碎片（已解锁；未解锁占位留 P3-3）—— */}
            <section className="archive-block">
              <div className="archive-block-title">记忆碎片</div>
              {fragments.length === 0 ? (
                <p className="archive-note">还没有解锁的记忆碎片。</p>
              ) : (
                <div className="archive-fragment-list">
                  {fragments.map((f) => (
                    <div className="archive-fragment" key={f.id}>
                      <div className="archive-fragment-title">◇ {f.title}</div>
                      <p className="archive-fragment-text">{f.text}</p>
                    </div>
                  ))}
                </div>
              )}
              {hasMore ? (
                <p className="archive-note dim">
                  还有 {missingFragments} 段未记起的片段……
                </p>
              ) : null}
            </section>

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
