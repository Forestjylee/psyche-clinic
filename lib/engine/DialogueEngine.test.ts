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
