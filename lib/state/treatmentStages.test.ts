import { describe, it, expect, beforeEach, vi } from "vitest";
import { useGameStore } from "../store";
import {
  createInitialState,
  migrateGameState,
  resolveDueTreatmentVisits,
} from "./GameState";
import { DialogueEngine } from "../engine/DialogueEngine";
import type { ActiveSession, GameState, TreatmentStage } from "../types";
import { allPatients } from "../data/patients";

/**
 * 治疗分期复诊（节拍断拍，SPEC v1.6.x）：节拍结束患者离开，1~3 天后复诊到访，
 * 从下一节拍恢复。本文件覆盖：纯函数结算 / store.completeBeat / restOneDay 到访 /
 * finishSession 清理 / 引擎 beatEnd 回调 / 旧档迁移。
 */

const linXiao = allPatients.find((p) => p.id === "lin_xiao")!;

// toast()/floating 依赖 window.setTimeout；node 环境 stub 最小 window（SoundManager 自带 window 保护）
beforeEach(() => {
  vi.stubGlobal("window", { setTimeout, clearTimeout });
});

function resetStore() {
  useGameStore.setState({
    game: createInitialState(),
    scene: "clinic",
    currentPatient: null,
    toasts: [],
    floatingTexts: [],
  });
}

function stage(over: Partial<TreatmentStage> = {}): TreatmentStage {
  return {
    stage: 1,
    resumeNode: "l2_start",
    patientState: { ...linXiao.initialState },
    triggeredMemories: [],
    dueDay: 3,
    arrived: false,
    ...over,
  };
}

function newGame(): GameState {
  const g = createInitialState();
  return g;
}

describe("resolveDueTreatmentVisits 治疗复诊到期结算（纯函数）", () => {
  it("dueDay 到期的患者标记 arrived 并返回 id", () => {
    const g = newGame();
    g.treatmentStages["lin_xiao"] = stage({ dueDay: 3 });
    g.day = 3;
    expect(resolveDueTreatmentVisits(g)).toEqual(["lin_xiao"]);
    expect(g.treatmentStages["lin_xiao"].arrived).toBe(true);
  });

  it("未到期（dueDay > day）不标记", () => {
    const g = newGame();
    g.treatmentStages["lin_xiao"] = stage({ dueDay: 5 });
    g.day = 3;
    expect(resolveDueTreatmentVisits(g)).toEqual([]);
    expect(g.treatmentStages["lin_xiao"].arrived).toBe(false);
  });

  it("已 arrived 的患者不再重复返回", () => {
    const g = newGame();
    g.treatmentStages["lin_xiao"] = stage({ dueDay: 3, arrived: true });
    g.day = 4;
    expect(resolveDueTreatmentVisits(g)).toEqual([]);
  });

  it("多个患者独立结算", () => {
    const g = newGame();
    g.treatmentStages["lin_xiao"] = stage({ dueDay: 2 });
    g.treatmentStages["zhao_lei"] = stage({ dueDay: 9 });
    g.day = 2;
    expect(resolveDueTreatmentVisits(g)).toEqual(["lin_xiao"]);
    expect(g.treatmentStages["lin_xiao"].arrived).toBe(true);
    expect(g.treatmentStages["zhao_lei"].arrived).toBe(false);
  });
});

describe("store.completeBeat 节拍结束写治疗分期", () => {
  beforeEach(resetStore);

  it("写入 treatmentStages：stage=1 / resumeNode / 随机 1~3 天 / 未到访", () => {
    const g = useGameStore.getState().game;
    g.day = 5;
    useGameStore.setState({ game: g });
    const beforeSlot = useGameStore.getState().game.slot;
    useGameStore
      .getState()
      .completeBeat("lin_xiao", "l2_start", { ...linXiao.initialState }, []);
    const t = useGameStore.getState().game.treatmentStages["lin_xiao"];
    expect(t).toBeDefined();
    expect(t!.stage).toBe(1);
    expect(t!.resumeNode).toBe("l2_start");
    expect(t!.dueDay).toBeGreaterThanOrEqual(6);
    expect(t!.dueDay).toBeLessThanOrEqual(8);
    expect(t!.arrived).toBe(false);
    // 复诊消耗当日名额（玩家已确认）
    expect(useGameStore.getState().game.slot).toBe(beforeSlot + 1);
    // 回大厅：结束本次会谈
    expect(useGameStore.getState().scene).toBe("clinic");
    expect(useGameStore.getState().currentPatient).toBeNull();
  });

  it("再次 completeBeat 累加 stage（复诊再断拍 → 第 2 次会谈结束）", () => {
    const g = useGameStore.getState().game;
    g.day = 5;
    g.treatmentStages["lin_xiao"] = stage({ dueDay: 6 });
    useGameStore.setState({ game: g });
    useGameStore
      .getState()
      .completeBeat("lin_xiao", "l3_start", { ...linXiao.initialState }, [
        "mem_1",
      ]);
    const t = useGameStore.getState().game.treatmentStages["lin_xiao"];
    expect(t!.stage).toBe(2);
    expect(t!.resumeNode).toBe("l3_start");
    expect(t!.triggeredMemories).toEqual(["mem_1"]);
  });

  it("清断点：activeSession 指向该患者时置空（复诊由 treatmentStages 承接）", () => {
    const g = useGameStore.getState().game;
    g.day = 5;
    g.activeSession = {
      patientId: "lin_xiao",
      nodeId: "l1_out",
      patientState: { ...linXiao.initialState },
      history: [],
      triggeredMemories: [],
    } as ActiveSession;
    useGameStore.setState({ game: g });
    useGameStore
      .getState()
      .completeBeat("lin_xiao", "l2_start", { ...linXiao.initialState }, []);
    expect(useGameStore.getState().game.activeSession).toBeNull();
  });
});

describe("store.restOneDay 治疗复诊到访推进", () => {
  beforeEach(resetStore);

  it("dueDay 到期：arrived=true + 写复诊到访 notice", async () => {
    const g = useGameStore.getState().game;
    g.day = 5;
    g.treatmentStages["lin_xiao"] = stage({ dueDay: 6 });
    useGameStore.setState({ game: g });
    await useGameStore.getState().restOneDay();
    const after = useGameStore.getState().game;
    expect(after.day).toBe(6);
    expect(after.treatmentStages["lin_xiao"].arrived).toBe(true);
    expect(after.messages.some((m) => m.id === "treat-visit-6-lin_xiao")).toBe(
      true
    );
  });

  it("未到期患者不到访、不写消息", async () => {
    const g = useGameStore.getState().game;
    g.day = 5;
    g.treatmentStages["lin_xiao"] = stage({ dueDay: 8 });
    useGameStore.setState({ game: g });
    await useGameStore.getState().restOneDay();
    const after = useGameStore.getState().game;
    expect(after.treatmentStages["lin_xiao"].arrived).toBe(false);
    expect(
      after.messages.some((m) => m.id === "treat-visit-6-lin_xiao")
    ).toBe(false);
  });

  it("治疗中（等待复诊）患者不推进等待天数（advanceDayState 过滤）", async () => {
    const g = useGameStore.getState().game;
    g.day = 5;
    // 构造：zhao_lei 已到达候诊、正在治疗（等待复诊）；另一患者正常候诊
    g.treatmentStages["zhao_lei"] = stage({ dueDay: 9 });
    g.arrivedPatients = ["xiao_bei", "zhao_lei", "lin_xiao"];
    g.waitingDays = { xiao_bei: 1, zhao_lei: 2, lin_xiao: 0 };
    useGameStore.setState({ game: g });
    await useGameStore.getState().restOneDay();
    const after = useGameStore.getState().game;
    // 治疗中患者 waitingDays 不推进（等待复诊不催诊）
    expect(after.waitingDays["zhao_lei"]).toBe(2);
    // 普通候诊患者正常推进
    expect(after.waitingDays["xiao_bei"]).toBe(2);
  });
});

describe("store.finishSession 治疗完成清理", () => {
  beforeEach(resetStore);

  it("结局结算后删除 treatmentStages（治疗完成，不再等待复诊）", () => {
    const g = useGameStore.getState().game;
    g.day = 5;
    g.treatmentStages["lin_xiao"] = stage({ dueDay: 6 });
    useGameStore.setState({ game: g, currentPatient: linXiao });
    useGameStore
      .getState()
      .finishSession(
        "cure",
        "标题",
        "文本",
        undefined,
        "lin_xiao",
        { ...linXiao.initialState }
      );
    const after = useGameStore.getState().game;
    expect(after.treatmentStages["lin_xiao"]).toBeUndefined();
    expect(after.patientRecords["lin_xiao"]).toBe("cure");
  });
});

describe("migrateGameState 旧档补齐 treatmentStages", () => {
  it("旧档无 treatmentStages 字段 → 迁移后为空对象", () => {
    const g = createInitialState() as unknown as Record<string, unknown>;
    delete g.treatmentStages;
    const migrated = migrateGameState(g as unknown as GameState);
    expect(migrated.treatmentStages).toEqual({});
  });
});

describe("DialogueEngine 节拍边界 beatEnd 回调", () => {
  function makeEngine(onBeatEnd?: (node: string) => void, nodeId = "l1_out") {
    const eng = new DialogueEngine(
      linXiao,
      newGame(),
      {
        onStateChange: () => {},
        onNodeEnter: () => {},
        onFloatingText: () => {},
        onEnding: () => {},
        onBeatEnd,
      },
      { nodeId, state: { ...linXiao.initialState }, triggeredMemories: [] }
    );
    return eng;
  }

  it("在 beatEnd 节点 continue() 触发 onBeatEnd(resumeNode)，且不触发 onEnding", () => {
    const onBeatEnd = vi.fn();
    const onEnding = vi.fn();
    const eng = new DialogueEngine(
      linXiao,
      newGame(),
      {
        onStateChange: () => {},
        onNodeEnter: () => {},
        onFloatingText: () => {},
        onEnding,
        onBeatEnd,
      },
      { nodeId: "l1_out", state: { ...linXiao.initialState }, triggeredMemories: [] }
    );
    eng.start();
    eng.continue();
    expect(onBeatEnd).toHaveBeenCalledWith("l2_start");
    expect(onEnding).not.toHaveBeenCalled();
  });

  it("普通 autoNext 节点 continue() 不触发 onBeatEnd", () => {
    const onBeatEnd = vi.fn();
    const eng = makeEngine(onBeatEnd, "l2_start");
    eng.continue();
    expect(onBeatEnd).not.toHaveBeenCalled();
  });

  it("从 resumeNode 恢复（restore）后从下一节拍启动", () => {
    const entered: string[] = [];
    const eng = new DialogueEngine(
      linXiao,
      newGame(),
      {
        onStateChange: () => {},
        onNodeEnter: (n) => entered.push(n.id),
        onFloatingText: () => {},
        onEnding: () => {},
      },
      { nodeId: "l2_start", state: { ...linXiao.initialState }, triggeredMemories: [] }
    );
    eng.start();
    expect(entered[0]).toBe("l2_start");
  });
});
