import { describe, it, expect } from "vitest";
import {
  waitTier,
  waitingDaysLabel,
  waitingPhrase,
  FALLBACK_PHRASE,
} from "./waitingInfo";
import { DECAY_START_DAY, WARN_DAY } from "../../../../lib/state/GameState";
import type { PatientScenario } from "../../../../lib/types";

function makePatient(over: Partial<PatientScenario> = {}): PatientScenario {
  return {
    id: "p_test",
    name: "测试患者",
    title: "测试",
    intro: "测试简介",
    surface: "表象",
    truth: "真相",
    palette: {
      primary: "#7c9eff",
      secondary: "#5a6fa0",
      fog: "#aabbcc",
      bright: "#cfe6ff",
    },
    initialState: { trust: 0, defense: 0, mood: 0, truth: 0, round: 0 },
    dialogues: {},
    startNode: "n1",
    baseReward: 100,
    difficulty: "普通",
    ...over,
  };
}

describe("waitTier 分级", () => {
  it("短候归 calm，到达 DECAY_START_DAY 归 decaying，到达 WARN_DAY 归 critical", () => {
    expect(waitTier(0)).toBe("calm");
    expect(waitTier(1)).toBe("calm");
    expect(waitTier(DECAY_START_DAY)).toBe("decaying");
    expect(waitTier(WARN_DAY - 1)).toBe("decaying");
    expect(waitTier(WARN_DAY)).toBe("critical");
    expect(waitTier(10)).toBe("critical");
  });
});

describe("waitingDaysLabel 等待天数标签", () => {
  it("N=0 显示今日刚来", () => {
    expect(waitingDaysLabel(0)).toBe("今日刚来");
  });
  it("N>0 显示已等待 N 天", () => {
    expect(waitingDaysLabel(3)).toBe("已等待 3 天");
  });
});

describe("waitingPhrase 动态状态语", () => {
  it("同级池内取句且稳定（同一患者同日重复调用结果一致）", () => {
    const p = makePatient();
    const a = waitingPhrase(p, 0);
    const b = waitingPhrase(p, 0);
    expect(a).toBe(b);
    expect(a.length).toBeGreaterThan(0);
  });
  it("随等待天数加重而换档（calm 与 critical 状态语必然不同）", () => {
    const p = makePatient({ id: "p_fixed" });
    expect(waitingPhrase(p, 0)).not.toBe(waitingPhrase(p, WARN_DAY));
  });
  it("数据缺失时走兜底文案", () => {
    const broken = { ...makePatient(), id: "", name: "" };
    expect(waitingPhrase(broken as PatientScenario, 0)).toBe(FALLBACK_PHRASE);
  });
});
