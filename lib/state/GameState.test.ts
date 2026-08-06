import { describe, it, expect } from "vitest";
import { createInitialState, migrateGameState } from "./GameState";
import type { GameState } from "../types";

describe("createInitialState 复诊字段默认值", () => {
  it("初始状态包含空的离场/复诊字段", () => {
    const g = createInitialState();
    expect(g.discharged).toEqual([]);
    expect(g.followUpCount).toEqual({});
    expect(g.todayFollowUps).toEqual([]);
    expect(g.followUpIdleDays).toEqual({});
  });
});

describe("migrateGameState 旧存档兼容", () => {
  it("旧存档缺少复诊字段时补齐默认值", () => {
    const legacy = {
      doctor: { reputation: 10, sanity: 100, money: 500, exp: 0, level: 1 },
      skills: [],
      clinicUpgrades: [],
      patientRecords: {},
      day: 1,
      slot: 0,
      todayServed: [],
      waitingDays: {},
      abandoned: [],
      messages: [],
      generatedScenarios: [],
    } as unknown as GameState;
    const migrated = migrateGameState(legacy);
    expect(migrated.discharged).toEqual([]);
    expect(migrated.followUpCount).toEqual({});
    expect(migrated.todayFollowUps).toEqual([]);
    expect(migrated.followUpIdleDays).toEqual({});
  });

  it("已有复诊字段的新存档不被覆盖", () => {
    const fresh = createInitialState();
    fresh.discharged = ["p1"];
    fresh.followUpCount = { p1: 1 };
    fresh.todayFollowUps = ["p1"];
    fresh.followUpIdleDays = { p2: 3 };
    const migrated = migrateGameState(fresh);
    expect(migrated.discharged).toEqual(["p1"]);
    expect(migrated.followUpCount).toEqual({ p1: 1 });
    expect(migrated.todayFollowUps).toEqual(["p1"]);
    expect(migrated.followUpIdleDays).toEqual({ p2: 3 });
  });
});
