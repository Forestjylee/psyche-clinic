"use client";

import { useGame } from "@/lib/hooks/useGame";
import { allSkills } from "@/lib/data/skills";
import type { Skill, SkillSchool } from "@/lib/types";

const schoolNames: Record<SkillSchool, string> = {
  psychoanalysis: "精神分析学派",
  cbt: "认知行为学派",
  hypnosis: "催眠学派",
  pharmacology: "药物学派",
};

const schoolIcons: Record<SkillSchool, string> = {
  psychoanalysis: "梦",
  cbt: "理",
  hypnosis: "眠",
  pharmacology: "药",
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
  const schools: SkillSchool[] = ["psychoanalysis", "cbt", "hypnosis", "pharmacology"];
  const unlockedIds = new Set(game.skills);

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
        通过接诊积累经验，习得不同流派的诊疗技艺。当前 EXP：{game.doctor.exp} /{" "}
        {expToNext(game.doctor.level)}
      </p>
      <div className="tech-tree">
        {schools.map((school) => {
          const skills = allSkills.filter((s) => s.school === school);
          const { nodes, lines, width, height } = buildTree(skills, unlockedIds);
          return (
            <div className="tech-school" key={school}>
              <div className="tech-school-title">
                <span className="tech-school-ico">{schoolIcons[school]}</span>
                {schoolNames[school]}
              </div>
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
                        {unlocked ? "✓" : schoolIcons[school]}
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
