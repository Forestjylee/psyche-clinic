import { describe, it, expect } from "vitest";
import { createInitialState } from "../../lib/state/GameState";
import type { GameState, PatientScenario } from "../../lib/types";
import { allPatients } from "../../lib/data/patients";
import {
  allFragmentsCollected,
  seenPatientIds,
  archivePatients,
  deriveArchiveStatus,
  archiveStatusText,
  fragmentById,
  fragmentCount,
  filterArchivePatients,
  unlockedFragmentsFor,
} from "./archive";

/** 最小合成患者剧本（纯函数参数用，不写入任何 game 状态） */
function genScenario(id: string): PatientScenario {
  return {
    id,
    name: `测试-${id}`,
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

/** 在初始状态上铺一组「见过」数据（全部用池内真实手写患者） */
function seenGame(): GameState {
  const g = createInitialState();
  g.patientRecords["lin_xiao"] = "cure";
  g.abandoned.push("he_jinglan");
  g.discharged.push("zhao_lei");
  g.followUpCount["xiao_bei"] = 1;
  g.returnVisits["jiang_yu"] = {
    ending: "acceptance",
    dueDay: 5,
    arrived: true,
    seen: false,
  };
  g.unlockedFragments["lin_xiao"] = ["lin_m1"];
  g.todayServed.push("su_nian");
  g.waitingDays["lu_yunxin"] = 3;
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
        "he_jinglan",
        "zhao_lei",
        "xiao_bei",
        "jiang_yu",
        "su_nian",
        "lu_yunxin",
      ])
    );
    // 未出现于任何状态的患者不进集合
    expect(seen.has("never_seen")).toBe(false);
  });
});

describe("archivePatients 档案列表（见过驱动 + 索引顺序）", () => {
  it("档案患者按全量索引顺序（引导置顶 + 字母序），仅见过的患者出现", () => {
    const g = seenGame();
    const list = archivePatients(g);
    const ids = list.map((p) => p.id);
    // seen 集合 7 位患者，均按 allPatients 顺序（xiao_bei 引导置顶，其余 id 字母序）
    expect(ids).toEqual([
      "xiao_bei",
      "he_jinglan",
      "jiang_yu",
      "lin_xiao",
      "lu_yunxin",
      "su_nian",
      "zhao_lei",
    ]);
  });
  it("game 状态含无对应剧本的异常 id 时安全跳过", () => {
    const g = seenGame();
    g.todayServed.push("ghost_id"); // 数据异常：id 不在手写患者池
    expect(seenPatientIds(g).has("ghost_id")).toBe(true);
    expect(archivePatients(g).some((p) => p.id === "ghost_id")).toBe(false);
  });
  it("从未出现在任何状态的患者不出现在档案", () => {
    const g = createInitialState();
    // 全量手写患者都在 allPatients 中，但未见于任何 game 状态（arrivedPatients 不算「见过」）
    expect(archivePatients(g).length).toBe(0);
  });
  it("手写患者接诊后自动出现在档案（glob 池），接诊前不出现", () => {
    const g = createInitialState();
    // zhao_lei 已在池中，但尚未接诊（未进入任一 seen 状态）→ 不出现
    expect(archivePatients(g).length).toBe(0);
    // 接诊后（进入 seen 状态 → 自动入库）
    g.patientRecords["zhao_lei"] = "cure";
    g.waitingDays["zhao_lei"] = 0;
    const ids = archivePatients(g).map((p) => p.id);
    // 索引顺序：xiao_bei 未见不出现，zhao_lei 为唯一见过的患者
    expect(ids).toEqual(["zhao_lei"]);
  });
  it("同一位患者结案后仍只出现一次（不因状态叠加重复入库）", () => {
    const g = createInitialState();
    g.waitingDays["zhao_lei"] = 1; // 候诊中被接诊
    expect(archivePatients(g).map((p) => p.id)).toEqual(["zhao_lei"]);
    // 结案进入 patientRecords（叠加第二个 seen 状态），仍只出现一次
    g.patientRecords["zhao_lei"] = "cure";
    expect(archivePatients(g).map((p) => p.id)).toEqual(["zhao_lei"]);
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
    expect(deriveArchiveStatus(g, "he_jinglan").kind).toBe("abandoned");
  });
  it("discharged → 已离场", () => {
    const g = seenGame();
    expect(deriveArchiveStatus(g, "zhao_lei").kind).toBe("discharged");
  });
  it("followUpCount > 0 且未结案/离场 → 复诊中", () => {
    const g = seenGame();
    expect(deriveArchiveStatus(g, "xiao_bei").kind).toBe("followup");
  });
  it("其余 → 候诊/治疗中，带等待天数", () => {
    const g = seenGame();
    const st = deriveArchiveStatus(g, "lu_yunxin");
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
    const p = allPatients.find((x) => x.id === "lin_xiao")!;
    g.unlockedFragments["lin_xiao"] = ["lin_m1", "ghost_frag"];
    const frags = unlockedFragmentsFor(g, p);
    expect(frags.map((f) => f.id)).toEqual(["lin_m1"]);
    // 顺序由 unlockedFragments 数组决定
    g.unlockedFragments["lin_xiao"] = ["ghost_frag", "lin_m1"];
    expect(unlockedFragmentsFor(g, p).map((f) => f.id)).toEqual(["lin_m1"]);
  });
});

describe("filterArchivePatients 档案筛选（全部/已治愈/碎片未集齐）", () => {
  it('"all" 原样返回入参（保持顺序，同引用）', () => {
    const g = createInitialState();
    const p1 = genScenario("all_1");
    const p2 = genScenario("all_2");
    const input = [p1, p2];
    expect(filterArchivePatients(input, g, "all")).toBe(input);
    expect(filterArchivePatients(input, g, "all")).toEqual([p1, p2]);
  });
  it('"closed" 只保留 patientRecords 中的已治愈患者', () => {
    const g = createInitialState();
    const cured = genScenario("cured_p");
    const active = genScenario("active_p");
    g.patientRecords["cured_p"] = "cure";
    const out = filterArchivePatients([cured, active], g, "closed");
    expect(out.map((p) => p.id)).toEqual(["cured_p"]);
  });
  it('"closed" 排除 abandoned/discharged/followup/active', () => {
    const g = createInitialState();
    const cured = genScenario("cured_p");
    g.patientRecords["cured_p"] = "cure";
    const aban = genScenario("ab_p");
    g.abandoned.push("ab_p");
    const dis = genScenario("dis_p");
    g.discharged.push("dis_p");
    const fu = genScenario("fu_p");
    g.followUpCount["fu_p"] = 1;
    const act = genScenario("act_p");
    g.waitingDays["act_p"] = 2;
    const out = filterArchivePatients([aban, cured, dis, fu, act], g, "closed");
    expect(out.map((p) => p.id)).toEqual(["cured_p"]);
  });
  it('"incomplete" 只保留有碎片系统且未集齐的患者', () => {
    const g = createInitialState();
    const incomplete = genScenario("incom_p"); // 有 1 个碎片但未解锁
    const complete = genScenario("comp_p");
    g.unlockedFragments["comp_p"] = ["comp_p_m1"]; // 已集齐
    const noFrag = genScenario("nofrag_p");
    noFrag.memoryFragments = []; // 无碎片系统
    const out = filterArchivePatients([incomplete, complete, noFrag], g, "incomplete");
    expect(out.map((p) => p.id)).toEqual(["incom_p"]);
  });
  it('"incomplete" 多碎片部分集齐仍算未集齐，全部集齐后排除', () => {
    const g = createInitialState();
    const p = genScenario("multi_p");
    p.followUpFragments = [
      { id: "multi_p_f1", trigger: { truth: 10 }, title: "复诊片段", text: "复诊记忆。", emotion: "calm" },
    ];
    g.unlockedFragments["multi_p"] = ["multi_p_m1"]; // 2 个里只解锁 1 个
    expect(filterArchivePatients([p], g, "incomplete").map((x) => x.id)).toEqual(["multi_p"]);
    g.unlockedFragments["multi_p"] = ["multi_p_m1", "multi_p_f1"];
    expect(filterArchivePatients([p], g, "incomplete")).toEqual([]);
  });
});

describe("allFragmentsCollected 集齐判定（PRD 泄底封口出口）", () => {
  it("无碎片系统（fragmentCount 为 0）→ false", () => {
    const g = createInitialState();
    const p = genScenario("p1");
    p.memoryFragments = [];
    expect(allFragmentsCollected(g, p)).toBe(false);
  });
  it("有碎片但未集齐 → false", () => {
    const g = createInitialState();
    const p = genScenario("p1");
    g.unlockedFragments["p1"] = [];
    expect(allFragmentsCollected(g, p)).toBe(false);
  });
  it("碎片全部集齐 → true", () => {
    const g = createInitialState();
    const p = genScenario("p1");
    g.unlockedFragments["p1"] = ["p1_m1"];
    expect(allFragmentsCollected(g, p)).toBe(true);
  });
  it("初诊+复诊多碎片：缺一段 false，补齐 true", () => {
    const g = createInitialState();
    const p = genScenario("p1");
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
