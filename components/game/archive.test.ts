import { describe, it, expect } from "vitest";
import { createInitialState } from "../../lib/state/GameState";
import type { GameState, PatientScenario } from "../../lib/types";
import {
  allFragmentsCollected,
  seenPatientIds,
  archivePatients,
  deriveArchiveStatus,
  archiveStatusText,
  fragmentById,
  fragmentCount,
  unlockedFragmentsFor,
} from "./archive";

/** 最小生成患者剧本（模拟 generator 产物） */
function genScenario(id: string): PatientScenario {
  return {
    id,
    name: `生成-${id}`,
    title: "测试剧本",
    intro: "一段简介。",
    surface: "测试表象。",
    truth: "测试真相（不应出现在档案 DOM）。",
    palette: {
      primary: "#aaaaaa",
      secondary: "#bbbbbb",
      fog: "#111111",
      bright: "#cccccc",
    },
    initialState: { trust: 10, defense: 50, mood: 30, truth: 0, round: 0 },
    dialogues: {},
    startNode: "x",
    baseReward: 100,
    difficulty: "简单",
    memoryFragments: [
      {
        id: `${id}_m1`,
        trigger: { truth: 30 },
        title: "片段一",
        text: "记忆一正文。",
        emotion: "sad",
      },
    ],
  };
}

/** 在初始状态上铺一组「见过」数据 */
function seenGame(): GameState {
  const g = createInitialState();
  g.patientRecords["lin_xiao"] = "cure";
  g.abandoned.push("gen_abandon");
  g.discharged.push("zhou_mingyuan");
  g.followUpCount["chen_lo"] = 1;
  g.returnVisits["gen_return"] = {
    ending: "acceptance",
    dueDay: 5,
    arrived: true,
    seen: false,
  };
  g.unlockedFragments["lin_xiao"] = ["lin_m1"];
  g.todayServed.push("gen_today");
  g.waitingDays["gen_waiting"] = 3;
  return g;
}

describe("seenPatientIds 「见过」集合（并集）", () => {
  it("初始状态 → 空集合", () => {
    const g = createInitialState();
    expect(seenPatientIds(g).size).toBe(0);
  });
  it("并集覆盖 patientRecords/discharged/abandoned/followUpCount/returnVisits/unlockedFragments/todayServed/waitingDays", () => {
    const seen = seenPatientIds(seenGame());
    expect(seen).toEqual(
      new Set([
        "lin_xiao",
        "gen_abandon",
        "zhou_mingyuan",
        "chen_lo",
        "gen_return",
        "gen_today",
        "gen_waiting",
      ])
    );
    // 未出现于任何状态的患者不进集合
    expect(seen.has("never_seen")).toBe(false);
  });
});

describe("archivePatients 档案列表（见过驱动 + 顺序）", () => {
  it("手写患者在前、生成患者在后，未见过的患者不出现", () => {
    const g = seenGame();
    g.generatedScenarios = [genScenario("gen_today")];
    const list = archivePatients(g);
    const ids = list.map((p) => p.id);
    // chen_lo（followUpCount）、lin_xiao（patientRecords）、zhou_mingyuan（discharged）为手写患者
    // gen_today（todayServed）为生成患者
    expect(ids).toEqual(["chen_lo", "lin_xiao", "zhou_mingyuan", "gen_today"]);
  });
  it("seen 集合中含无对应剧本的异常 id 时安全跳过", () => {
    const g = seenGame();
    g.generatedScenarios = [];
    const seen = seenPatientIds(g);
    seen.add("ghost_id"); // 数据异常：无剧本
    const list = archivePatients(g);
    expect(list.some((p) => p.id === "ghost_id")).toBe(false);
  });
  it("从未出现在任何状态的患者不出现在档案", () => {
    const g = createInitialState();
    // 全量患者（patientC/A/B）都在 allPatients 中，但未见于任何 game 状态
    expect(archivePatients(g).length).toBe(0);
  });
});

describe("deriveArchiveStatus 状态推导优先级", () => {
  it("patientRecords 优先于 abandoned/discharged", () => {
    const g = seenGame();
    const st = deriveArchiveStatus(g, "lin_xiao");
    expect(st.kind).toBe("closed");
    expect(st.ending).toBe("cure");
  });
  it("abandoned → 已离场 · 放弃治疗", () => {
    const g = seenGame();
    expect(deriveArchiveStatus(g, "gen_abandon").kind).toBe("abandoned");
  });
  it("discharged → 已离场", () => {
    const g = seenGame();
    expect(deriveArchiveStatus(g, "zhou_mingyuan").kind).toBe("discharged");
  });
  it("followUpCount > 0 且未结案/离场 → 复诊中", () => {
    const g = seenGame();
    expect(deriveArchiveStatus(g, "chen_lo").kind).toBe("followup");
  });
  it("其余 → 候诊/治疗中，带等待天数", () => {
    const g = seenGame();
    const st = deriveArchiveStatus(g, "gen_waiting");
    expect(st.kind).toBe("active");
    expect(st.waitDays).toBe(3);
  });
});

describe("archiveStatusText 状态文案（表面级，不含真相）", () => {
  it("各状态文案", () => {
    expect(archiveStatusText({ kind: "closed", ending: "cure" })).toBe(
      "已结案 · 治愈"
    );
    expect(archiveStatusText({ kind: "abandoned" })).toBe("已离场 · 放弃治疗");
    expect(archiveStatusText({ kind: "discharged" })).toBe("已离场");
    expect(archiveStatusText({ kind: "followup" })).toBe("复诊中");
    expect(archiveStatusText({ kind: "active", waitDays: 3 })).toBe(
      "候诊中 · 已等待 3 天"
    );
    expect(archiveStatusText({ kind: "active", waitDays: 0 })).toBe(
      "候诊 / 治疗中"
    );
  });
});

describe("碎片查询（memoryFragments + followUpFragments）", () => {
  it("fragmentCount 计入初诊与复诊碎片", () => {
    const g = genScenario("p1");
    g.followUpFragments = [
      { id: "p1_f1", trigger: { truth: 10 }, title: "复诊片段", text: "复诊记忆。", emotion: "calm" },
    ];
    expect(fragmentCount(g)).toBe(2);
  });
  it("fragmentById 按 id 查到初诊/复诊碎片，找不到返回 undefined", () => {
    const g = genScenario("p1");
    expect(fragmentById(g, "p1_m1")?.title).toBe("片段一");
    expect(fragmentById(g, "no_such")).toBeUndefined();
  });
  it("unlockedFragmentsFor 按解锁顺序返回，id 找不到的条目跳过", () => {
    const g = seenGame();
    g.generatedScenarios = [genScenario("gen_today")];
    const p = g.generatedScenarios[0];
    g.unlockedFragments["gen_today"] = ["gen_today_m1", "ghost_frag"];
    const frags = unlockedFragmentsFor(g, p);
    expect(frags.map((f) => f.id)).toEqual(["gen_today_m1"]);
    // 顺序由 unlockedFragments 数组决定
    g.unlockedFragments["gen_today"] = ["ghost_frag", "gen_today_m1"];
    expect(unlockedFragmentsFor(g, p).map((f) => f.id)).toEqual(["gen_today_m1"]);
  });
});

describe("allFragmentsCollected 集齐判定（PRD 泄底封口出口）", () => {
  it("无碎片系统（fragmentCount 为 0）→ false", () => {
    const g = createInitialState();
    const p = genScenario("p1");
    g.generatedScenarios = [p];
    p.memoryFragments = [];
    expect(allFragmentsCollected(g, p)).toBe(false);
  });
  it("有碎片但未集齐 → false", () => {
    const g = createInitialState();
    const p = genScenario("p1");
    g.generatedScenarios = [p];
    g.unlockedFragments["p1"] = [];
    expect(allFragmentsCollected(g, p)).toBe(false);
  });
  it("碎片全部集齐 → true", () => {
    const g = createInitialState();
    const p = genScenario("p1");
    g.generatedScenarios = [p];
    g.unlockedFragments["p1"] = ["p1_m1"];
    expect(allFragmentsCollected(g, p)).toBe(true);
  });
  it("初诊+复诊多碎片：缺一段 false，补齐 true", () => {
    const g = createInitialState();
    const p = genScenario("p1");
    g.generatedScenarios = [p];
    p.followUpFragments = [
      {
        id: "p1_f1",
        trigger: { truth: 10 },
        title: "复诊片段",
        text: "复诊记忆。",
        emotion: "calm",
      },
    ];
    g.unlockedFragments["p1"] = ["p1_m1"];
    expect(allFragmentsCollected(g, p)).toBe(false);
    g.unlockedFragments["p1"] = ["p1_m1", "p1_f1"];
    expect(allFragmentsCollected(g, p)).toBe(true);
  });
});
