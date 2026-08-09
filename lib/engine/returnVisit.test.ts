import { describe, it, expect } from "vitest";
import { createInitialState } from "../state/GameState";
import type { GameState } from "../types";
import { pickReturnVisitPatient } from "./returnVisit";

function game(): GameState {
  return createInitialState();
}

describe("pickReturnVisitPatient 成就动态回访（SPEC v1.5.0 成就去患者化）", () => {
  it("无已治愈患者 → 返回 undefined（调用方静默跳过）", () => {
    expect(pickReturnVisitPatient(game())).toBeUndefined();
  });

  it("治愈结局的患者可被选中", () => {
    const g = game();
    g.patientRecords["xiao_bei"] = "cure";
    expect(pickReturnVisitPatient(g, () => 0)).toBe("xiao_bei");
  });

  it("接纳/觉醒结局同样可被选中", () => {
    const g = game();
    g.patientRecords["xiao_bei"] = "acceptance";
    expect(pickReturnVisitPatient(g, () => 0)).toBe("xiao_bei");
    g.patientRecords["xiao_bei"] = "awakening";
    expect(pickReturnVisitPatient(g, () => 0)).toBe("xiao_bei");
  });

  it("依赖/恶化/悲剧结局不选中", () => {
    for (const ending of ["dependent", "worsen", "tragic", "transfer", "hidden"] as const) {
      const g = game();
      g.patientRecords["xiao_bei"] = ending;
      expect(pickReturnVisitPatient(g)).toBeUndefined();
    }
  });

  it("多个已治愈患者：random 决定选中顺序", () => {
    const g = game();
    g.patientRecords["xiao_bei"] = "cure";
    g.patientRecords["chen_mo"] = "cure";
    expect(pickReturnVisitPatient(g, () => 0)).toBe("xiao_bei");
    expect(pickReturnVisitPatient(g, () => 0.9999)).toBe("chen_mo");
  });

  it("已有待办回访（未 seen）的患者不再被选中", () => {
    const g = game();
    g.patientRecords["xiao_bei"] = "cure";
    g.patientRecords["chen_mo"] = "cure";
    g.returnVisits["xiao_bei"] = {
      ending: "cure",
      dueDay: 1,
      arrived: false,
      seen: false,
    };
    expect(pickReturnVisitPatient(g, () => 0)).toBe("chen_mo");
  });

  it("已 seen 的回访患者可再次被选中", () => {
    const g = game();
    g.patientRecords["xiao_bei"] = "cure";
    g.returnVisits["xiao_bei"] = {
      ending: "cure",
      dueDay: 1,
      arrived: true,
      seen: true,
    };
    expect(pickReturnVisitPatient(g, () => 0)).toBe("xiao_bei");
  });

  it("剧本池外的患者 id（异常数据）不选中", () => {
    const g = game();
    g.patientRecords["ghost_id"] = "cure";
    expect(pickReturnVisitPatient(g)).toBeUndefined();
  });
});
