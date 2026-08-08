"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { useGame } from "@/lib/hooks/useGame";
import { allSkills } from "@/lib/data/skills";
import type { Skill, SkillSchool } from "@/lib/types";

const schoolNames: Record<SkillSchool, string> = {
  gentle: "更温柔",
  sharp: "更敏锐",
  firm: "更坚定",
};

const schoolDescriptions: Record<SkillSchool, string> = {
  gentle: "你接住 ta 的情绪，让 ta 愿意慢下来、说出来。",
  sharp: "你看得清 ta 在回避什么，也敢陪 ta 走进最害怕的地方。",
  firm: "在 ta 迷茫时给出方向，稳稳托住。",
};

/* —— 线描图标（SVG 手绘，统一 stroke 风格）—— */
const ico = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

// 风格图标（陪伴风格单选胶囊）
const schoolIcons: Record<SkillSchool, ReactNode> = {
  gentle: (
    <svg viewBox="0 0 24 24" {...ico}>
      <path d="M7.5 10a4.5 4.5 0 0 1 4.5-4.5c2 0 3.7 1.4 4.2 3.3a3.8 3.8 0 0 1 .3 5.2H8.2A3.5 3.5 0 0 1 7.5 10Z" />
      <path d="M12 3.5 12.7 5l1.5.7-1.5.7L12 7.9l-.7-1.5-1.5-.7 1.5-.7Z" />
    </svg>
  ),
  sharp: (
    <svg viewBox="0 0 24 24" {...ico}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 4.5v2.2M12 17.3v2.2M4.5 12h2.2M17.3 12h2.2M6.5 6.5l1.6 1.6M15.9 15.9l1.6 1.6M17.5 6.5l-1.6 1.6M8.1 15.9l-1.6 1.6" />
    </svg>
  ),
  firm: (
    <svg viewBox="0 0 24 24" {...ico}>
      <path d="M13 5a7 7 0 1 1-7 7 7 7 0 0 1 7-7Z" />
      <path d="M13 9a3 3 0 1 0 3 3 3 3 0 0 0-3-3Z" />
    </svg>
  ),
};

// 技能专属图标（技能树节点）
const skillIcons: Record<string, ReactNode> = {
  make_ta_safe: (
    <svg viewBox="0 0 24 24" {...ico}>
      <path d="M7.5 10a4.5 4.5 0 0 1 4.5-4.5c2 0 3.7 1.4 4.2 3.3a3.8 3.8 0 0 1 .3 5.2H8.2A3.5 3.5 0 0 1 7.5 10Z" />
      <path d="M12 3.5 12.7 5l1.5.7-1.5.7L12 7.9l-.7-1.5-1.5-.7 1.5-.7Z" />
    </svg>
  ),
  hold_silence: (
    <svg viewBox="0 0 24 24" {...ico}>
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="12" cy="18" r="2" />
      <path d="M7.4 7.4l3.2 9.2M16.6 7.4l-3.2 9.2" />
    </svg>
  ),
  see_through_defense: (
    <svg viewBox="0 0 24 24" {...ico}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 4.5v2.2M12 17.3v2.2M4.5 12h2.2M17.3 12h2.2M6.5 6.5l1.6 1.6M15.9 15.9l1.6 1.6M17.5 6.5l-1.6 1.6M8.1 15.9l-1.6 1.6" />
    </svg>
  ),
  face_fear: (
    <svg viewBox="0 0 24 24" {...ico}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4 17 7M7 17l-1.6 1.6" />
    </svg>
  ),
  guide_firmly: (
    <svg viewBox="0 0 24 24" {...ico}>
      <path d="M13 5a7 7 0 1 1-7 7 7 7 0 0 1 7-7Z" />
      <path d="M13 9a3 3 0 1 0 3 3 3 3 0 0 0-3-3Z" />
    </svg>
  ),
  toward_truth: (
    <svg viewBox="0 0 24 24" {...ico}>
      <path d="M3.5 12c2-4 5-6 8.5-6s6.5 2 8.5 6c-2 4-5 6-8.5 6s-6.5-2-8.5-6Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  ),
  hold_steady: (
    <svg viewBox="0 0 24 24" {...ico}>
      <rect x="7" y="3" width="10" height="18" rx="5" />
      <path d="M7 9.5h10" />
    </svg>
  ),
  another_way: (
    <svg viewBox="0 0 24 24" {...ico}>
      <path d="M9.5 3h5M10.5 3v5l-4.2 9.2a2 2 0 0 0 1.8 2.8h7.8a2 2 0 0 0 1.8-2.8L13.5 8V3" />
      <path d="M8.6 15h6.8M12 11.5v3" />
    </svg>
  ),
  hold_through_crisis: (
    <svg viewBox="0 0 24 24" {...ico}>
      <path d="M12 3l6.5 2.8v5.2c0 4.3-2.8 7.4-6.5 9-3.7-1.6-6.5-4.7-6.5-9V5.8Z" />
      <path d="M9.5 12h5M12 9.5v5" />
    </svg>
  ),
};

// —— 树状布局常量（文明科技树式：前置在左、后续在右，连线串联）——
const NODE_W = 120; // 节点卡片宽度
const ICON_R = 32; // 圆形图标半径（连线中心高度）
const COL_GAP = 170; // 列间距（连线水平跨度）
const NODE_H = 150; // 节点卡片高度
const ROW_H = 190; // 行距
const PAD = 44; // 画布边距

interface TreeNode {
  skill: Skill;
  x: number;
  y: number;
}

interface TreeLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  done: boolean;
}

function buildTree(
  skills: Skill[],
  unlockedIds: Set<string>
): { nodes: TreeNode[]; lines: TreeLine[]; width: number; height: number } {
  const byId = new Map(skills.map((s) => [s.id, s]));
  const depthOf = (s: Skill): number => {
    let d = 0;
    let cur: Skill | undefined = s;
    const seen = new Set<string>();
    while (cur && cur.requires && !seen.has(cur.id)) {
      seen.add(cur.id);
      cur = byId.get(cur.requires);
      if (cur) d++;
    }
    return d;
  };

  // 按依赖深度分列（第 0 列为根部技能）
  const cols: Skill[][] = [];
  for (const s of skills) {
    const d = depthOf(s);
    (cols[d] ??= []).push(s);
  }
  const maxDepth = cols.length - 1;

  const nodes: TreeNode[] = [];
  cols.forEach((col, depth) => {
    col.forEach((skill, i) => {
      nodes.push({ skill, x: PAD + depth * COL_GAP, y: PAD + i * ROW_H });
    });
  });

  const lines: TreeLine[] = [];
  for (const s of skills) {
    if (!s.requires) continue;
    const from = nodes.find((n) => n.skill.id === s.requires);
    const to = nodes.find((n) => n.skill.id === s.id);
    if (from && to) {
      lines.push({
        x1: from.x + NODE_W,
        y1: from.y + ICON_R,
        x2: to.x,
        y2: to.y + ICON_R,
        done: unlockedIds.has(s.requires) && unlockedIds.has(s.id),
      });
    }
  }

  const maxRows = Math.max(...cols.map((c) => c.length), 1);
  const width = PAD * 2 + maxDepth * COL_GAP + NODE_W;
  const height = PAD * 2 + (maxRows - 1) * ROW_H + NODE_H;
  return { nodes, lines, width, height };
}

export function SkillsTree() {
  const { game, learnSkill, setScene, playSound, expToNext } = useGame();
  const schools: SkillSchool[] = ["gentle", "sharp", "firm"];
  const unlockedIds = new Set(game.skills);
  const [school, setSchool] = useState<SkillSchool>("gentle");

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
      <h2>技 能 树</h2>
      <p className="subtitle">
        通过接诊积累经验，学会不同的倾听与陪伴方式。当前 EXP：{game.doctor.exp} /{" "}
        {expToNext(game.doctor.level)}
      </p>

      {/* 陪伴风格单选：先选风格，再展示对应技能树 */}
      <div className="tech-school-picker">
        {schools.map((s) => {
          const skills = allSkills.filter((x) => x.school === s);
          const unlocked = skills.filter((x) => unlockedIds.has(x.id)).length;
          return (
            <button
              key={s}
              className={`tech-school-option ${school === s ? "active" : ""}`}
              onClick={() => {
                playSound("page");
                setSchool(s);
              }}
            >
              <span className="tech-school-option-ico">{schoolIcons[s]}</span>
              <span className="tech-school-option-name">{schoolNames[s]}</span>
              <span className="tech-school-option-count">
                {unlocked}/{skills.length}
              </span>
            </button>
          );
        })}
      </div>

      <div className="tech-tree">
        <div className="tech-school" key={school}>
          <div className="tech-school-title">
            <span className="tech-school-ico">{schoolIcons[school]}</span>
            <span>
              {schoolNames[school]}
              <em className="tech-school-desc">{schoolDescriptions[school]}</em>
            </span>
          </div>
          {(() => {
            const skills = allSkills.filter((s) => s.school === school);
            const { nodes, lines, width, height } = buildTree(skills, unlockedIds);
            return (
              <div className="tech-canvas" style={{ width, height }}>
                <svg className="tech-lines" width={width} height={height}>
                  {lines.map((l, i) => (
                    <path
                      key={i}
                      d={`M ${l.x1} ${l.y1} C ${l.x1 + (l.x2 - l.x1) / 2} ${l.y1}, ${
                        l.x1 + (l.x2 - l.x1) / 2
                      } ${l.y2}, ${l.x2} ${l.y2}`}
                      className={`tech-line ${l.done ? "done" : ""}`}
                    />
                  ))}
                </svg>
                {nodes.map(({ skill, x, y }) => {
                  const unlocked = unlockedIds.has(skill.id);
                  const reqMet = !skill.requires || unlockedIds.has(skill.requires);
                  const canLearn = !unlocked && reqMet && game.doctor.exp >= skill.cost;
                  const cls = unlocked ? "unlocked" : canLearn ? "can-learn" : "locked";
                  const onClick = () => {
                    if (unlocked) {
                      playSound("click");
                      return;
                    }
                    if (canLearn) {
                      playSound("levelUp");
                      learnSkill(skill.id);
                      return;
                    }
                    playSound("locked");
                  };
                  return (
                    <div
                      key={skill.id}
                      className={`tech-node ${cls}`}
                      style={{ left: x, top: y }}
                      onClick={onClick}
                    >
                      <div className="tech-node-ico">
                        {skillIcons[skill.id] ?? schoolIcons[skill.school]}
                        {unlocked ? (
                          <span className="tech-node-check" aria-hidden="true">
                            ✓
                          </span>
                        ) : null}
                      </div>
                      <div className="tech-node-name">{skill.name}</div>
                      <div className="tech-node-cost">{skill.cost} EXP</div>
                      {!unlocked ? (
                        <div className="tech-node-action">
                          {canLearn ? "点击习得" : reqMet ? "经验不足" : "需前置技能"}
                        </div>
                      ) : null}
                      <div className="tech-tip">{skill.description}</div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
