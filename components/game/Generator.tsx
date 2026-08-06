"use client";

import { useState } from "react";
import { useGame } from "@/lib/hooks/useGame";
import { getGeneratorComponents } from "@/lib/data/generator";
import { endingColor, endingLabel } from "./constants";

const MAX_GENERATED = 8;

export function Generator() {
  const { game, generateScenario, deleteScenario, startSession, setScene, playSound, toast } =
    useGame();
  const comps = getGeneratorComponents();
  const [symptom, setSymptom] = useState("");
  const [truth, setTruth] = useState("");
  const [profession, setProfession] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [gender, setGender] = useState("");

  const doGenerate = (random: boolean) => {
    const opts = random
      ? {}
      : {
          symptomId: symptom || undefined,
          truthId: truth || undefined,
          professionIndex: profession ? Number(profession) : undefined,
          difficulty: (difficulty || undefined) as "简单" | "普通" | "困难" | undefined,
          gender: (gender || undefined) as "male" | "female" | undefined,
        };
    generateScenario(opts, random);
  };

  return (
    <div className="scene panel-view generator-view">
      <button
        className="nav-back"
        onClick={() => {
          playSound("page");
          setScene("clinic");
        }}
      >
        ◂ 返回诊所
      </button>
      <h2>剧 本 工 坊</h2>
      <p className="subtitle">
        从症状、职业、真相模板中组合，生成独一无二的患者剧本。每次生成的姓名、数值、对话细节都会不同。
      </p>

      <div className="gen-controls">
        <div className="gen-control-group">
          <label>症 状 主 题</label>
          <select value={symptom} onChange={(e) => setSymptom(e.target.value)}>
            <option value="">随机</option>
            {comps.symptoms.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div className="gen-control-group">
          <label>真 相 类 型</label>
          <select value={truth} onChange={(e) => setTruth(e.target.value)}>
            <option value="">随机</option>
            {comps.truths.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <div className="gen-control-group">
          <label>职 业</label>
          <select value={profession} onChange={(e) => setProfession(e.target.value)}>
            <option value="">随机</option>
            {comps.professions.map((p, i) => (
              <option key={i} value={i}>
                {p.profession}（{p.ageDesc}）
              </option>
            ))}
          </select>
        </div>
        <div className="gen-control-group">
          <label>难 度</label>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="">按声望自动</option>
            <option value="简单">简单</option>
            <option value="普通">普通</option>
            <option value="困难">困难</option>
          </select>
        </div>
        <div className="gen-control-group">
          <label>性 别</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">随机</option>
            <option value="female">女</option>
            <option value="male">男</option>
          </select>
        </div>
        <div className="gen-control-actions">
          <button
            className="gen-btn primary"
            onClick={() => doGenerate(false)}
          >
            按参数生成
          </button>
          <button className="gen-btn secondary" onClick={() => doGenerate(true)}>
            完全随机
          </button>
        </div>
      </div>

      <div className="gen-section-title">
        已生成剧本（{game.generatedScenarios.length} / {MAX_GENERATED}）
      </div>
      <div className="gen-list">
        {game.generatedScenarios.length === 0 ? (
          <div className="empty-state">
            尚未生成任何剧本。
            <br />
            上方选择参数后点击「生成新剧本」，或直接「随机生成」。
          </div>
        ) : (
          game.generatedScenarios.map((p) => {
            const completed = game.patientRecords[p.id];
            const locked = p.requireReputation
              ? game.doctor.reputation < p.requireReputation
              : false;
            return (
              <div className="gen-card" key={p.id}>
                <div className="gen-card-head">
                  <span className="gen-card-name">{p.name}</span>
                  <span className={`patient-difficulty ${p.difficulty}`}>{p.difficulty}</span>
                  {completed ? (
                    <span
                      className="patient-difficulty"
                      style={{ color: endingColor(completed), borderColor: endingColor(completed) }}
                    >
                      {endingLabel(completed)}
                    </span>
                  ) : null}
                </div>
                <div className="gen-card-title">{p.title}</div>
                <div className="gen-card-intro">{p.intro}</div>
                <div className="gen-card-actions">
                  <button
                    className="gen-act play"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (locked) {
                        toast("声望不足，无法接诊");
                        playSound("locked");
                        return;
                      }
                      startSession(p);
                    }}
                  >
                    接 诊
                  </button>
                  <button
                    className="gen-act del"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteScenario(p.id);
                    }}
                  >
                    移 除
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
