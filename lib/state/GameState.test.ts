import { describe, it, expect } from "vitest";
import {
  createInitialState,
  migrateGameState,
  rollFollowUps,
  advanceDayState,
  FOLLOW_UP_CHANCE,
  REPUTATION_LOSS_PER_ABANDON,
  firstSessionDone,
  clampFirstSessionEnding,
  todayCapacity,
  phaseOfSlot,
  queueTarget,
  MAX_SLOTS,
} from "./GameState";
import type { GameState, EndingType, PrologueChoice } from "../types";
import { allPatients, GUIDED_PATIENT_ID } from "../data/patients";
import { allClinicUpgrades } from "../data/skills";
import { DECOR_DEFS } from "../data/decor";

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

describe("prologueChoice 序章开场选择（P4-1）", () => {
  it("初始状态 prologueChoice 为 undefined（可选字段，旧档兼容）", () => {
    const g = createInitialState();
    expect(g.prologueChoice).toBeUndefined();
  });
  it("接受合法选择值落档，且不影响任何数值字段", () => {
    const g = createInitialState();
    g.prologueChoice = "breath";
    expect(g.prologueChoice).toBe("breath");
    // 数值初始值不变：金钱/声望/理智/技能等仅叙事选择不触碰
    expect(g.doctor.money).toBe(500);
    expect(g.doctor.reputation).toBe(10);
    expect(g.doctor.sanity).toBe(100);
    expect(g.doctor.level).toBe(1);
    expect(g.day).toBe(1);
  });
  it("migrate 不覆盖已选择值，未选择的旧档读 undefined 正常", () => {
    const g = createInitialState();
    g.prologueChoice = "heartbreak";
    expect(migrateGameState(g).prologueChoice).toBe("heartbreak");
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
    expect(migrateGameState(legacy).prologueChoice).toBeUndefined();
  });
  it("PrologueChoice 类型仅含四个合法值", () => {
    const all: PrologueChoice[] = ["burnout", "witness", "breath", "heartbreak"];
    expect(all).toHaveLength(4);
  });
});

describe("prologuePassed 序章已通过标记（P4-3）", () => {
  it("初始状态 prologuePassed 为 undefined（可选字段，新档显示序章）", () => {
    const g = createInitialState();
    expect(g.prologuePassed).toBeUndefined();
  });
  it("migrate 后保留已落档值，旧档无此字段迁移后仍 undefined", () => {
    const g = createInitialState();
    g.prologuePassed = true;
    expect(migrateGameState(g).prologuePassed).toBe(true);
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
    expect(migrateGameState(legacy).prologuePassed).toBeUndefined();
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

describe("firstSessionDone 首诊完成判定（P4-5）", () => {
  it("patientRecords 为空 → false", () => {
    const g = createInitialState();
    expect(firstSessionDone(g)).toBe(false);
  });
  it("有一条患者记录 → true", () => {
    const g = createInitialState();
    g.patientRecords = { xiao_bei: "cure" };
    expect(firstSessionDone(g)).toBe(true);
  });
});

describe("clampFirstSessionEnding 首诊结局 clamp（P4-5）", () => {
  it("首诊未完成 + worsen → acceptance", () => {
    const g = createInitialState();
    expect(clampFirstSessionEnding(g, "worsen")).toBe("acceptance");
  });
  it("首诊未完成 + tragic → acceptance", () => {
    const g = createInitialState();
    expect(clampFirstSessionEnding(g, "tragic")).toBe("acceptance");
  });
  it("首诊未完成 + cure → cure（原样，不误伤正常结局）", () => {
    const g = createInitialState();
    expect(clampFirstSessionEnding(g, "cure")).toBe("cure");
  });
  it("首诊已完成 + worsen → worsen（原样，不影响后续诊疗自由度）", () => {
    const g = createInitialState();
    g.patientRecords = { xiao_bei: "cure" };
    expect(clampFirstSessionEnding(g, "worsen")).toBe("worsen");
  });
});

describe("P5-1 装饰字段默认值（装修=记忆的陈列馆）", () => {
  it("初始状态 4 个装饰字段为默认空值", () => {
    const g = createInitialState();
    expect(g.facilityDecors).toEqual({});
    expect(g.unlockedDecors).toEqual([]);
    expect(g.placedDecors).toEqual([]);
    expect(g.decorPositions).toEqual({});
  });
  it("旧存档缺少装饰字段时 migrate 补齐默认值", () => {
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
    expect(migrated.facilityDecors).toEqual({});
    expect(migrated.unlockedDecors).toEqual([]);
    expect(migrated.placedDecors).toEqual([]);
    expect(migrated.decorPositions).toEqual({});
  });
  it("已有装饰字段的新存档不被覆盖", () => {
    const fresh = createInitialState();
    fresh.facilityDecors = { comfort_sofa: "variant_sofa" };
    fresh.unlockedDecors = ["flower_xiao_bei"];
    fresh.placedDecors = ["flower_xiao_bei"];
    fresh.decorPositions = { flower_xiao_bei: { x: 640, y: 210 } };
    const migrated = migrateGameState(fresh);
    expect(migrated.facilityDecors).toEqual({ comfort_sofa: "variant_sofa" });
    expect(migrated.unlockedDecors).toEqual(["flower_xiao_bei"]);
    expect(migrated.placedDecors).toEqual(["flower_xiao_bei"]);
    expect(migrated.decorPositions).toEqual({
      flower_xiao_bei: { x: 640, y: 210 },
    });
  });
});

describe("DECOR_DEFS 装饰数据完整性（P5-1）", () => {
  it("id 全局唯一", () => {
    const ids = DECOR_DEFS.map((d) => d.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
  it("每个 variant 的 slot 对应存在的升级项（allClinicUpgrades）", () => {
    const upgradeIds = new Set(allClinicUpgrades.map((u) => u.id));
    for (const d of DECOR_DEFS) {
      if (d.kind !== "variant") continue;
      expect(upgradeIds.has(d.slot), `${d.id} slot=${d.slot}`).toBe(true);
      const src = d.source;
      if (src.kind === "upgrade") {
        expect(src.upgradeId, `${d.id} source.upgradeId`).toBe(d.slot);
      }
    }
  });
  it("每个 flower 的 patientId 对应存在的患者（allPatients）", () => {
    const patientIds = new Set(allPatients.map((p) => p.id));
    for (const d of DECOR_DEFS) {
      if (d.kind !== "flower") continue;
      const src = d.source;
      if (src.kind !== "patient") continue;
      expect(patientIds.has(src.patientId), `${d.id}`).toBe(true);
      expect(d.defaultPos, `${d.id} flower 需有 defaultPos`).toBeDefined();
    }
  });
  it("每个 picture 的 fragmentId 存在于对应患者的 memoryFragments", () => {
    for (const d of DECOR_DEFS) {
      if (d.kind !== "picture") continue;
      const src = d.source;
      if (src.kind !== "fragment") continue;
      const patient = allPatients.find((p) => p.id === src.patientId);
      expect(patient, `${d.id} 患者不存在`).toBeDefined();
      expect(
        (patient!.memoryFragments ?? []).some((f) => f.id === src.fragmentId),
        `${d.id} 碎片 ${src.fragmentId} 不存在`
      ).toBe(true);
      expect(d.defaultPos, `${d.id} picture 需有 defaultPos`).toBeDefined();
    }
  });
  it("所有花/画 defaultPos 在场景边界内且互不重叠（粗略）", () => {
    const placed = DECOR_DEFS.filter(
      (d) => d.kind === "flower" || d.kind === "picture"
    );
    for (const d of placed) {
      const p = d.defaultPos!;
      expect(p.x).toBeGreaterThanOrEqual(24);
      expect(p.x).toBeLessThanOrEqual(936);
      expect(p.y).toBeGreaterThanOrEqual(24);
      expect(p.y).toBeLessThanOrEqual(516);
    }
    for (let i = 0; i < placed.length; i++) {
      for (let j = i + 1; j < placed.length; j++) {
        const a = placed[i].defaultPos!;
        const b = placed[j].defaultPos!;
        const overlapX = Math.abs(a.x - b.x) < (placed[i].size.w + placed[j].size.w) / 2;
        const overlapY = Math.abs(a.y - b.y) < (placed[i].size.h + placed[j].size.h) / 2;
        expect(overlapX && overlapY, `${placed[i].id} 与 ${placed[j].id} 重叠`).toBe(false);
      }
    }
  });
});

describe("P5-3 理智字段默认值（理智完整机制）", () => {
  it("初始状态 sessionSinceRest / gardenDay 默认 0", () => {
    const g = createInitialState();
    expect(g.sessionSinceRest).toBe(0);
    expect(g.gardenDay).toBe(0);
  });
  it("旧存档缺少理智字段时 migrate 补齐为 0", () => {
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
    expect(migrated.sessionSinceRest).toBe(0);
    expect(migrated.gardenDay).toBe(0);
  });
  it("已有值的新存档不被覆盖", () => {
    const fresh = createInitialState();
    fresh.sessionSinceRest = 4;
    fresh.gardenDay = 12;
    const migrated = migrateGameState(fresh);
    expect(migrated.sessionSinceRest).toBe(4);
    expect(migrated.gardenDay).toBe(12);
  });
});

describe("todayCapacity 今日可接诊名额（P5-6 动态容量）", () => {
  it("基础档位：第 1 天声望 10 无设施 → 2 位", () => {
    const g = createInitialState();
    expect(g.doctor.reputation).toBe(10);
    expect(g.clinicUpgrades).toEqual([]);
    expect(todayCapacity(g)).toBe(2);
  });
  it("声望 ≥25 → +1（3 位）", () => {
    const g = createInitialState();
    g.doctor.reputation = 25;
    expect(todayCapacity(g)).toBe(3);
  });
  it("声望 ≥60 → 再 +1（4 位）", () => {
    const g = createInitialState();
    g.doctor.reputation = 60;
    expect(todayCapacity(g)).toBe(4);
  });
  it("购置「候诊扩容」→ +1（基础 2 + 声望档位 4 → 5 位）", () => {
    const g = createInitialState();
    g.doctor.reputation = 60;
    g.clinicUpgrades.push("reception_expand");
    expect(todayCapacity(g)).toBe(5);
  });
  it("声望满 + 候诊扩容也永不超 MAX_SLOTS（封顶 5）", () => {
    const g = createInitialState();
    g.doctor.reputation = 100;
    g.clinicUpgrades.push("reception_expand");
    expect(todayCapacity(g)).toBe(5);
    expect(todayCapacity(g)).toBeLessThanOrEqual(MAX_SLOTS);
  });
});

describe("phaseOfSlot 时段映射扩展（P5-6）", () => {
  it("slot 0-2 保持 morning/afternoon/evening", () => {
    expect(phaseOfSlot(0)).toBe("morning");
    expect(phaseOfSlot(1)).toBe("afternoon");
    expect(phaseOfSlot(2)).toBe("evening");
  });
  it("slot 3 与 4 → night（第 4-5 场切入夜晚，激活夜间分支）", () => {
    expect(phaseOfSlot(3)).toBe("night");
    expect(phaseOfSlot(4)).toBe("night");
  });
  it("slot 5（当天接满后）同样为 night", () => {
    expect(phaseOfSlot(5)).toBe("night");
  });
});

describe("queueTarget 候诊目标（P5-6）", () => {
  it("queueTarget(g) 与今日可接名额一致（基础 2 / 声望 25 变 3）", () => {
    const g = createInitialState();
    expect(queueTarget(g)).toBe(2);
    g.doctor.reputation = 25;
    expect(queueTarget(g)).toBe(3);
  });
  it("候诊扩容后 queueTarget 同步到 5", () => {
    const g = createInitialState();
    g.doctor.reputation = 100;
    g.clinicUpgrades.push("reception_expand");
    expect(queueTarget(g)).toBe(todayCapacity(g));
    expect(queueTarget(g)).toBe(5);
  });
});

describe("引导患者剧本无坏结局（P4-5 首诊不可选恶化分支）", () => {
  it("GUIDED_PATIENT_ID 存在于 allPatients 首位，requireReputation 为 0", () => {
    const guided = allPatients.find((p) => p.id === GUIDED_PATIENT_ID);
    expect(guided).toBeDefined();
    expect(allPatients[0].id).toBe(GUIDED_PATIENT_ID);
    expect(guided!.requireReputation).toBe(0);
    expect(guided!.difficulty).toBe("简单");
  });
  it("对话图所有结局节点类型 ⊆ {cure, acceptance}，且 cure / acceptance 两种结局都存在", () => {
    const guided = allPatients.find((p) => p.id === GUIDED_PATIENT_ID)!;
    const endingTypes = Object.values(guided.dialogues)
      .filter((n) => n.isEnding)
      .map((n) => n.endingType);
    expect(endingTypes.length).toBeGreaterThan(0);
    for (const t of endingTypes) {
      expect(t === "cure" || t === "acceptance").toBe(true);
    }
    expect(endingTypes).toContain("cure");
    expect(endingTypes).toContain("acceptance");
  });
  it("对话图所有选项 next 均指向存在的节点（无死链）", () => {
    const guided = allPatients.find((p) => p.id === GUIDED_PATIENT_ID)!;
    const nodeIds = new Set(Object.keys(guided.dialogues));
    for (const n of Object.values(guided.dialogues)) {
      if (n.autoNext) expect(nodeIds.has(n.autoNext)).toBe(true);
      for (const c of n.choices ?? []) {
        expect(nodeIds.has(c.next ?? "")).toBe(true);
      }
    }
  });
});

describe("P6-1 技能 id 迁移（旧档兼容）", () => {
  it("旧存档旧技能 id 全部映射为新能力 id", () => {
    const legacy = { ...createInitialState(), skills: ["cbt_basic", "freud_dream", "hypnosis_basic", "pharma_basic", "new_drug"] };
    expect(migrateGameState(legacy).skills).toEqual([
      "see_through_defense", "make_ta_safe", "guide_firmly", "hold_steady", "another_way",
    ]);
  });
  it("已迁移的新存档保持原样（幂等）", () => {
    const fresh = { ...createInitialState(), skills: ["see_through_defense", "hold_silence"] };
    expect(migrateGameState(fresh).skills).toEqual(["see_through_defense", "hold_silence"]);
  });
  it("混合存档（部分旧部分新）只迁移旧 id", () => {
    const mix = { ...createInitialState(), skills: ["cbt_basic", "hold_silence", "exposure_therapy"] };
    expect(migrateGameState(mix).skills).toEqual(["see_through_defense", "hold_silence", "face_fear"]);
  });
  it("未知 id 保留原样（不丢档）", () => {
    const g = { ...createInitialState(), skills: ["future_skill", "cbt_basic"] };
    expect(migrateGameState(g).skills).toEqual(["future_skill", "see_through_defense"]);
  });
  it("旧存档缺失 skills 字段时补齐为空数组", () => {
    const legacy = { ...createInitialState() } as Partial<GameState>;
    delete legacy.skills;
    expect(migrateGameState(legacy as GameState).skills).toEqual([]);
  });
});
