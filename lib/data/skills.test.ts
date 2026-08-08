import { describe, it, expect } from "vitest";
import { allSkills, SKILL_ID_MIGRATIONS } from "./skills";

describe("skills 技能数据完整性（P6-1）", () => {
  it("allSkills 共 9 个且 id 全局唯一", () => {
    expect(allSkills).toHaveLength(9);
    const ids = allSkills.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("每个技能的 requires 引用的 id 均存在于 allSkills（无孤儿引用）", () => {
    const ids = new Set(allSkills.map((s) => s.id));
    for (const s of allSkills) {
      if (s.requires) {
        expect(ids.has(s.requires), `${s.id} requires=${s.requires} 不存在`).toBe(true);
      }
    }
  });

  it("SKILL_ID_MIGRATIONS 键集合等于 9 个旧 id 全集（防漏映射丢档）", () => {
    const OLD_IDS = [
      "freud_dream",
      "free_association",
      "cbt_basic",
      "exposure_therapy",
      "crisis_intervention",
      "pharma_basic",
      "new_drug",
      "hypnosis_basic",
      "hypnosis_deep",
    ];
    expect(Object.keys(SKILL_ID_MIGRATIONS).sort()).toEqual([...OLD_IDS].sort());
  });

  it("映射值集合等于 allSkills 新 id 全集（无悬空值），且旧 id 与新 id 无交集", () => {
    const newIds = allSkills.map((s) => s.id);
    const newIdSet = new Set(newIds);
    expect(newIds).toHaveLength(9);
    expect(Object.values(SKILL_ID_MIGRATIONS).sort()).toEqual([...newIds].sort());
    const oldKeys = Object.keys(SKILL_ID_MIGRATIONS);
    for (const oldId of oldKeys) {
      expect(newIdSet.has(oldId), `旧 id ${oldId} 与新 id 集合重合`).toBe(false);
    }
  });
});
