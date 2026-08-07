"use client";

import { useState } from "react";
import { useGame } from "@/lib/hooks/useGame";
import type { ReturnLine } from "@/lib/types";
import { ChibiCharacter } from "./ChibiCharacter";

/** 无专属回访文案的兜底（生成患者等） */
function defaultReturnDialogue(name: string): { title: string; lines: ReturnLine[] } {
  return {
    title: `${name} 的回访`,
    lines: [
      { speaker: "patient", text: "医生，我回来了。就是想来看看你。", emotion: "happy" },
      { speaker: "patient", text: "最近的日子，比以前好过了一些。想当面谢谢你。", emotion: "calm" },
      { speaker: "doctor", text: "能听到你这么说，我很高兴。" },
      { speaker: "patient", text: "我会好好过下去的。谢谢你当时愿意听我说。", emotion: "happy" },
    ],
  };
}

/** 治愈回访浮层：探望非治疗，看完点「好好告别」结案离场 */
export function VisitOverlay() {
  const { currentReturnPatient, finishReturnVisit, playSound } = useGame();
  const [idx, setIdx] = useState(0);

  if (!currentReturnPatient) return null;

  const p = currentReturnPatient;
  const dialogue = p.returnDialogue ?? defaultReturnDialogue(p.name);
  const lines = dialogue.lines;
  const line = lines[Math.min(idx, lines.length - 1)];
  const last = idx >= lines.length - 1;

  const advance = () => {
    playSound("click");
    if (last) {
      finishReturnVisit();
    } else {
      setIdx((i) => i + 1);
    }
  };

  return (
    <div className="visit-mask" role="dialog" aria-modal="true" aria-label="患者回访">
      <div className="visit-card">
        <div className="visit-head">
          <div className="visit-patient">
            <ChibiCharacter palette={p.palette} emotion={line.emotion ?? "happy"} size="lg" />
            <div className="visit-name">{p.name}</div>
          </div>
          <div className="visit-title">{dialogue.title}</div>
        </div>
        <div className={`visit-line ${line.speaker === "doctor" ? "doctor" : ""}`}>
          {line.speaker === "doctor" ? <span className="visit-who">你</span> : null}
          <p>{line.text}</p>
        </div>
        <div className="visit-actions">
          <button className="onboarding-skip" onClick={() => { playSound("click"); finishReturnVisit(); }}>
            结束探望
          </button>
          <button className="onboarding-next" onClick={advance}>
            {last ? "好好告别" : "继续 ▸"}
          </button>
        </div>
      </div>
    </div>
  );
}
