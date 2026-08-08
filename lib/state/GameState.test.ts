import { describe, it, expect } from "vitest";
import {
  createInitialState,
  migrateGameState,
  rollFollowUps,
  advanceDayState,
  FOLLOW_UP_CHANCE,
  REPUTATION_LOSS_PER_ABANDON,
} from "./GameState";
import type { GameState, EndingType } from "../types";

const opts = { maxFollowUps: 2, graceDays: 5 };

describe("createInitialState 复诊字段默认值", () => {
  it("初始状态包含空的离场/复诊字段", () => {
    const g = createInitialState();
    expect(g.discharged).toEqual([]);
    expect(g.followUpCount).toEqual({});
    expect(g.todayFollowUps).toEqual([]);
    expect(g.followUpIdleDays).toEqual({});
  });
  it("初始诊所名默认为森林诊所", () => {
    const g = createInitialState();
    expect(g.clinicName).toBe("森林诊所");
  });
});

describe("unlockedFragments 档案图鉴字段默认值（P3-1）", () => {
  it("初始状态 unlockedFragments 为空对象", () => {
    const g = createInitialState();
    expect(g.unlockedFragments).toEqual({});
  });
  it("旧存档缺少 unlockedFragments 时 migrate 补齐为 {}", () => {
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
    expect(migrated.unlockedFragments).toEqual({});
  });
  it("已有 unlockedFragments 的新存档不被覆盖", () => {
    const fresh = createInitialState();
    fresh.unlockedFragments = { p1: ["f1", "f2"] };
    const migrated = migrateGameState(fresh);
    expect(migrated.unlockedFragments).toEqual({ p1: ["f1", "f2"] });
  });
});

describe("activeSession 会话断点默认值（P2-8）", () => {
  it("初始状态 activeSession 为 null", () => {
    const g = createInitialState();
    expect(g.activeSession).toBeNull();
  });
  it("旧存档缺少 activeSession 时 migrate 补齐为 null", () => {
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
    expect(migrated.activeSession).toBeNull();
  });
  it("已有 activeSession 的新存档不被覆盖", () => {
    const fresh = createInitialState();
    fresh.activeSession = {
      patientId: "p1",
      nodeId: "mid",
      patientState: { trust: 40, defense: 5, mood: 60, truth: 30, round: 6 },
      history: [{ speaker: "doctor", text: "你好" }],
      triggeredMemories: ["m1"],
    };
    const migrated = migrateGameState(fresh);
    expect(migrated.activeSession).toEqual(fresh.activeSession);
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
    expect(migrated.clinicName).toBe("森林诊所");
  });

  it("已有诊所名的存档不被覆盖", () => {
    const fresh = createInitialState();
    fresh.clinicName = "湖心诊所";
    const migrated = migrateGameState(fresh);
    expect(migrated.clinicName).toBe("湖心诊所");
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

describe("FOLLOW_UP_CHANCE 复诊概率表", () => {
  it("依赖结局倾向最高，恶化/悲剧永不复诊", () => {
    expect(FOLLOW_UP_CHANCE.dependent).toBeGreaterThan(0.5);
    expect(FOLLOW_UP_CHANCE.worsen).toBe(0);
    expect(FOLLOW_UP_CHANCE.tragic).toBe(0);
  });
  it("治愈/接纳概率极低（约 5%）", () => {
    expect(FOLLOW_UP_CHANCE.cure).toBeLessThan(0.1);
    expect(FOLLOW_UP_CHANCE.acceptance).toBeLessThan(0.1);
  });
  it("隐藏/觉醒/转介约 25%", () => {
    expect(FOLLOW_UP_CHANCE.hidden).toBeGreaterThan(0.2);
    expect(FOLLOW_UP_CHANCE.awakening).toBeGreaterThan(0.2);
    expect(FOLLOW_UP_CHANCE.transfer).toBeGreaterThan(0.2);
  });
});

describe("rollFollowUps 复诊 roll", () => {
  it("依赖结局 roll 命中进入今日复诊，idle 归零", () => {
    const r = rollFollowUps({ p1: "dependent" }, [], [], {}, {}, opts, () => 0.5);
    expect(r.followUpsToday).toEqual(["p1"]);
    expect(r.followUpIdleDays.p1).toBe(0);
  });
  it("依赖结局 roll 未命中则 idle+1，未达宽限不离场", () => {
    const r = rollFollowUps({ p1: "dependent" }, [], [], {}, {}, opts, () => 0.7);
    expect(r.followUpsToday).toEqual([]);
    expect(r.followUpIdleDays.p1).toBe(1);
    expect(r.discharged).toEqual([]);
  });
  it("恶化/悲剧结局直接离场（概率 0）", () => {
    const r = rollFollowUps({ p1: "worsen", p2: "tragic" }, [], [], {}, {}, opts, () => 0.1);
    expect(r.discharged).toContain("p1");
    expect(r.discharged).toContain("p2");
    expect(r.followUpsToday).toEqual([]);
  });
  it("复诊次数达上限即离场", () => {
    const r = rollFollowUps({ p1: "dependent" }, [], [], { p1: 2 }, {}, opts, () => 0.1);
    expect(r.discharged).toContain("p1");
  });
  it("已离场/已放弃患者跳过", () => {
    const r = rollFollowUps({ p1: "dependent" }, ["p1"], ["p2"], {}, {}, opts, () => 0.1);
    expect(r.followUpsToday).toEqual([]);
    expect(r.discharged).toEqual(["p1"]);
  });
  it("连续未复诊达宽限天数进入放弃复诊列表", () => {
    const r = rollFollowUps({ p1: "dependent" }, [], [], {}, { p1: 4 }, opts, () => 0.9);
    expect(r.abandonedFollowUps).toContain("p1");
    expect(r.followUpsToday).toEqual([]);
  });
  it("命中复诊后 idle 重置", () => {
    const r = rollFollowUps({ p1: "dependent" }, [], [], {}, { p1: 3 }, opts, () => 0.5);
    expect(r.followUpsToday).toContain("p1");
    expect(r.followUpIdleDays.p1).toBe(0);
  });
});

describe("advanceDayState 复诊集成", () => {
  it("每日结算后 todayFollowUps 填充命中患者，slot/todayServed 重置", () => {
    const g = createInitialState();
    g.slot = 3;
    g.todayServed = ["x"];
    g.patientRecords = { p1: "dependent" };
    advanceDayState(g, [], () => 0.5);
    expect(g.slot).toBe(0);
    expect(g.todayServed).toEqual([]);
    expect(g.todayFollowUps).toContain("p1");
  });
  it("候诊等待天数回归：可接诊未接诊患者 waitingDays 推进", () => {
    const g = createInitialState();
    advanceDayState(g, [{ id: "p1", name: "甲" }], () => 0.5);
    expect(g.waitingDays.p1).toBe(1);
  });
  it("复诊池患者达宽限天数放弃复诊：离场并扣声望", () => {
    const g = createInitialState();
    g.patientRecords = { p1: "dependent" };
    g.followUpIdleDays = { p1: 5 }; // 5 + 1 = 6 达宽限
    const events = advanceDayState(g, [], () => 0.9);
    expect(g.discharged).toContain("p1");
    expect(g.doctor.reputation).toBe(10 - REPUTATION_LOSS_PER_ABANDON);
    expect(events).toContainEqual({ type: "abandonFollowUp", patientId: "p1" });
  });
});
