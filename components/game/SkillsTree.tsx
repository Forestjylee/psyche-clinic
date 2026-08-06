"use client";

import { useGame } from "@/lib/hooks/useGame";
import { allSkills } from "@/lib/data/skills";
import type { SkillSchool } from "@/lib/types";

const schoolNames: Record<SkillSchool, string> = {
  psychoanalysis: "精神分析学派",
  cbt: "认知行为学派",
  hypnosis: "催眠学派",
  pharmacology: "药物学派",
};

export function SkillsTree() {
  const { game, learnSkill, setScene, playSound, expToNext } = useGame();
  const schools: SkillSchool[] = ["psychoanalysis", "cbt", "hypnosis", "pharmacology"];

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
      {schools.map((school) => {
        const skills = allSkills.filter((s) => s.school === school);
        return (
          <div className="skill-school" key={school}>
            <div className="skill-school-title">{schoolNames[school]}</div>
            <div className="skill-grid">
              {skills.map((s) => {
                const unlocked = game.skills.includes(s.id);
                const reqMet = !s.requires || game.skills.includes(s.requires);
                const canLearn = !unlocked && reqMet && game.doctor.exp >= s.cost;
                const cls = unlocked ? "unlocked" : canLearn ? "can-learn" : "locked";
                return (
                  <div className={`skill-card ${cls}`} key={s.id}>
                    <div className="skill-name">
                      {s.name}
                      <span style={{ color: "var(--text-muted)", fontSize: 12 }}>{s.cost}EXP</span>
                    </div>
                    <div className="skill-desc">{s.description}</div>
                    {unlocked ? (
                      <button className="skill-action learned" disabled>
                        已习得
                      </button>
                    ) : canLearn ? (
                      <button
                        className="skill-action learn"
                        onClick={() => learnSkill(s.id)}
                      >
                        习得 ({s.cost} EXP)
                      </button>
                    ) : !reqMet ? (
                      <button className="skill-action cant" disabled>
                        需前置技能
                      </button>
                    ) : (
                      <button className="skill-action cant" disabled>
                        经验不足
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
