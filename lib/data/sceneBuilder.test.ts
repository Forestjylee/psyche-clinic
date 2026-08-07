import { describe, it, expect } from "vitest";
import { seedTemplates, getAllTemplates, truthTemplates, symptoms, professions } from "./generator";
import type { GenContext } from "./generator";

function makeCtx(): GenContext {
  return {
    name: "林小雨",
    gender: "female",
    symptom: symptoms[0],
    profession: professions[0],
    difficulty: "普通",
  };
}

describe("sceneBuilder 对话骨架", () => {
  it("种子模板已注册进生成池", () => {
    expect(seedTemplates.length).toBeGreaterThanOrEqual(10);
    expect(getAllTemplates().length).toBeGreaterThan(truthTemplates.length);
  });

  it("每个种子模板都生成完整可达的对话树", () => {
    const ctx = makeCtx();
    for (const t of seedTemplates) {
      const nodes = t.buildDialogues(ctx);
      const start = nodes[`${t.id}_start`];
      expect(start, `${t.id} 缺少 start 节点`).toBeDefined();

      // 所有 next / autoNext 引用有效（无死链）
      for (const n of Object.values(nodes)) {
        if (n.autoNext) {
          expect(nodes[n.autoNext], `${t.id} 节点 ${n.id} autoNext 死链`).toBeDefined();
        }
        for (const c of n.choices ?? []) {
          if (c.next) {
            expect(nodes[c.next], `${t.id} 选项 ${c.id} 死链`).toBeDefined();
          }
        }
      }

      // 至少 3 个结局节点
      const endings = Object.values(nodes).filter((n) => n.isEnding);
      expect(endings.length, `${t.id} 结局数`).toBeGreaterThanOrEqual(3);

      // 轮次深度：主线 ≥6 个患者独白节点（start/connect/deepen/core/truth_approach/truth）
      const patientNodes = Object.values(nodes).filter((n) => n.speaker === "patient");
      expect(patientNodes.length, `${t.id} 患者独白节点数`).toBeGreaterThanOrEqual(6);

      // 真相节点带 3 个以上选项（cure/dependent/blame 保底结局分叉）
      const truthNode = nodes[`${t.id}_truth`];
      expect(truthNode, `${t.id} 缺少 truth 节点`).toBeDefined();
      expect(truthNode.choices!.length, `${t.id} truth 选项数`).toBeGreaterThanOrEqual(3);
    }
  });
});
