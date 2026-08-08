import { describe, it, expect, vi } from "vitest";
import { DialogueEngine } from "./DialogueEngine";
import type { PatientScenario } from "../types";
import { createInitialState } from "../state/GameState";

/** 最小可玩场景：start → mid(选项) → end(结局)；round 通过 restore/选项足够高以绕开补轮节点 */
function makeScenario(): PatientScenario {
  return {
    id: "test-patient",
    name: "测试患者",
    title: "测试",
    intro: "",
    surface: "",
    truth: "",
    palette: { primary: "#000", secondary: "#000", fog: "#000", bright: "#000" },
    initialState: { trust: 10, defense: 10, mood: 50, truth: 0, round: 0 },
    dialogues: {
      start: { id: "start", speaker: "patient", text: "你好", autoNext: "mid" },
      mid: {
        id: "mid",
        speaker: "doctor",
        text: "请说说",
        choices: [
          {
            id: "c1",
            text: "继续",
            kind: "empathy",
            effect: { trust: 5, truth: 25 },
            next: "end",
          },
        ],
      },
      end: {
        id: "end",
        speaker: "patient",
        text: "谢谢",
        isEnding: true,
        endingType: "cure",
        endingTitle: "治愈",
        endingText: "好了",
      },
    },
    startNode: "start",
    baseReward: 100,
    difficulty: "简单",
    memoryFragments: [{ id: "m1", trigger: { truth: 20 }, title: "记忆", text: "画面" }],
  };
}

function makeCallbacks() {
  return {
    onStateChange: vi.fn(),
    onNodeEnter: vi.fn(),
    onFloatingText: vi.fn(),
    onEnding: vi.fn(),
    onMemoryTrigger: vi.fn(),
  };
}

const SNAP = { trust: 40, defense: 5, mood: 60, truth: 30, round: 6 };

describe("DialogueEngine 断点恢复（P2-8）", () => {
  it("无 restore 时行为不变：start 落在 startNode，state 为 initial+信任加成", () => {
    const game = createInitialState();
    const cb = makeCallbacks();
    const eng = new DialogueEngine(makeScenario(), game, cb);
    eng.start();
    expect(cb.onNodeEnter).toHaveBeenCalledWith(
      expect.objectContaining({ id: "start" })
    );
    expect(eng.getState()).toEqual({ trust: 10, defense: 10, mood: 50, truth: 0, round: 0 });
    expect(eng.getTriggeredMemories()).toEqual([]);
  });

  it("恢复后 start 落在 restore.nodeId，state 为快照（不重复加信任加成）", () => {
    const game = createInitialState();
    const cb = makeCallbacks();
    const eng = new DialogueEngine(makeScenario(), game, cb, {
      nodeId: "mid",
      state: SNAP,
      triggeredMemories: ["m1"],
    });
    eng.start();
    expect(cb.onNodeEnter).toHaveBeenCalledWith(
      expect.objectContaining({ id: "mid" })
    );
    expect(eng.getState()).toEqual(SNAP);
  });

  it("恢复后 start() 仅 enterNode 一次（支撑恢复场景回顾窗不重复追加断点句）", () => {
    const game = createInitialState();
    const cb = makeCallbacks();
    const eng = new DialogueEngine(makeScenario(), game, cb, {
      nodeId: "mid",
      state: SNAP,
      triggeredMemories: [],
    });
    eng.start();
    expect(cb.onNodeEnter).toHaveBeenCalledTimes(1);
    expect(cb.onNodeEnter).toHaveBeenCalledWith(
      expect.objectContaining({ id: "mid" })
    );
  });

  it("restore.nodeId 失效时回退到 startNode", () => {
    const game = createInitialState();
    const cb = makeCallbacks();
    const eng = new DialogueEngine(makeScenario(), game, cb, {
      nodeId: "ghost-node",
      state: SNAP,
      triggeredMemories: [],
    });
    eng.start();
    expect(cb.onNodeEnter).toHaveBeenCalledWith(
      expect.objectContaining({ id: "start" })
    );
  });

  it("恢复后已触发的记忆碎片不重复闪回，getter 返回完整列表", () => {
    const game = createInitialState();
    const cb = makeCallbacks();
    const eng = new DialogueEngine(makeScenario(), game, cb, {
      nodeId: "mid",
      state: SNAP, // truth 30 ≥ 20，但 m1 已在 triggeredMemories
      triggeredMemories: ["m1"],
    });
    eng.start();
    expect(cb.onMemoryTrigger).not.toHaveBeenCalled();
    expect(eng.getTriggeredMemories()).toEqual(["m1"]);
  });

  it("新鲜会话：碎片达标触发一次，getter 累积已触发 id", () => {
    const game = createInitialState();
    const cb = makeCallbacks();
    const eng = new DialogueEngine(makeScenario(), game, cb);
    eng.start();
    eng.continue(); // start -> mid
    const mid = makeScenario().dialogues.mid;
    eng.choose(mid.choices![0]); // truth 25 ≥ 20 → 触发 m1
    expect(cb.onMemoryTrigger).toHaveBeenCalledWith(
      expect.objectContaining({ id: "m1" })
    );
    expect(eng.getTriggeredMemories()).toContain("m1");
  });
});

describe("DialogueEngine 补轮节点断点（最终评审 I-1）", () => {
  /** 一次选择即到结局（round=1 < minRounds=5）→ enterNode(end) 触发最低轮次保护 → 落在补轮节点 */
  function reachPad(eng: DialogueEngine) {
    eng.start();
    eng.continue(); // start -> mid
    const mid = makeScenario().dialogues.mid;
    eng.choose(mid.choices![0]); // mid -> end，round 0→1，end.isEnding 且 1<5 → buildPadNode
  }

  it("补轮节点 getResumeInfo 映射回真实结局节点（_pad_* 不落剧本表）", () => {
    const game = createInitialState();
    const eng = new DialogueEngine(makeScenario(), game, makeCallbacks());
    reachPad(eng);
    // 当前节点确为动态补轮节点
    expect(eng.getCurrentNode().id).toBe("_pad_1");
    const info = eng.getResumeInfo();
    expect(info.nodeId).toBe("end");
    expect(info.excludePrefixes).toEqual(["_pad_"]);
  });

  it("以 getResumeInfo().nodeId 恢复：重建补轮续走，不回头重播、不重复叠加", () => {
    const game = createInitialState();
    const cb = makeCallbacks();
    const eng = new DialogueEngine(makeScenario(), game, cb, {
      // 快照层经 getResumeInfo 落盘的断点 id（补轮 _pad_1 映射为 end）
      nodeId: "end",
      // 补轮前快照：做过 1 次选择（mid 的 c1），round=1，m1 已触发
      state: { trust: 15, defense: 10, mood: 50, truth: 25, round: 1 },
      triggeredMemories: ["m1"],
    });
    eng.start();
    // 恢复后 enterNode(end) → round(1)<minRounds(5) → 自动重建补轮，落在 _pad_1 而非 start
    expect(cb.onNodeEnter).toHaveBeenCalledWith(
      expect.objectContaining({ id: "end" })
    );
    expect(eng.getCurrentNode().id).toBe("_pad_1");
    expect(eng.getState().round).toBe(1);
    // 续走补轮二选一：continue → _pad_c_1 → 选择 → 再进 end → 仍不足轮次 → 重建 _pad_2
    eng.continue();
    expect(eng.getCurrentNode().id).toBe("_pad_c_1");
    const choice = eng.getCurrentNode().choices![0];
    eng.choose(choice);
    expect(eng.getCurrentNode().id).toBe("_pad_2");
    expect(eng.getState().round).toBe(2);
    // 全程未回退到 start 重播（一旦回头，round 会再次从已叠效果 + 重走 c1 双份叠加）
    const startCalls = cb.onNodeEnter.mock.calls.filter(
      (c) => (c[0] as { id?: string }).id === "start"
    );
    expect(startCalls).toHaveLength(0);
  });
});
