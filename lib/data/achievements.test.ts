import { describe, it, expect } from "vitest";
import { allAchievements } from "./achievements";
import { ACHIEVEMENT_LETTERS } from "./achievementLetters";
import { DECOR_DEFS } from "./decor";
import { allPatients } from "./patients";

describe("ACHIEVEMENT_LETTERS 成就纪念信数据完整性（P5-5）", () => {
  it("id 全局唯一", () => {
    const ids = ACHIEVEMENT_LETTERS.map((l) => l.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
  it("每封信都有标题与正文，tone 合法", () => {
    for (const l of ACHIEVEMENT_LETTERS) {
      expect(l.title.length).toBeGreaterThan(0);
      expect(l.body.length).toBeGreaterThan(0);
      expect(["thanks", "neutral", "sad", "dark"].includes(l.tone)).toBe(true);
    }
  });
});

describe("成就 unlock 情感化奖励引用完整性（P5-5）", () => {
  const withUnlock = allAchievements.filter((a) => a.reward?.unlock);
  const letterIds = new Set(ACHIEVEMENT_LETTERS.map((l) => l.id));
  const decorById = new Map(DECOR_DEFS.map((d) => [d.id, d]));

  it("恰有 13 个成就配置了 unlock（brief 表格 6/3/2/2，文案「14」为算术笔误）", () => {
    expect(withUnlock).toHaveLength(13);
  });
  it("unlock.letter 引用的信件 id 均存在", () => {
    for (const a of withUnlock) {
      const letter = a.reward?.unlock?.letter;
      if (letter) expect(letterIds.has(letter), `${a.id} letter=${letter}`).toBe(true);
    }
  });
  it("unlock.decor 引用的纪念物存在且为 flower 形态（source.kind==='achievement'）", () => {
    for (const a of withUnlock) {
      const decor = a.reward?.unlock?.decor;
      if (!decor) continue;
      const def = decorById.get(decor);
      expect(def, `${a.id} decor=${decor} 不存在`).toBeDefined();
      expect(def!.kind, `${a.id} decor=${decor} 非 flower`).toBe("flower");
      expect(def!.source.kind, `${a.id} decor=${decor} 非 achievement 纪念物`).toBe(
        "achievement"
      );
      expect(def!.defaultPos, `${a.id} decor=${decor} 需有 defaultPos`).toBeDefined();
    }
  });
  it("unlock.fragment 引用的患者与碎片 id 均存在（memoryFragments / followUpFragments）", () => {
    for (const a of withUnlock) {
      const frag = a.reward?.unlock?.fragment;
      if (!frag) continue;
      const patient = allPatients.find((p) => p.id === frag.patientId);
      expect(patient, `${a.id} 患者 ${frag.patientId} 不存在`).toBeDefined();
      const all = (patient!.memoryFragments ?? []).concat(
        patient!.followUpFragments ?? []
      );
      expect(
        all.some((f) => f.id === frag.fragmentId),
        `${a.id} 碎片 ${frag.fragmentId} 不存在`
      ).toBe(true);
    }
  });
  it("unlock.returnVisit 引用的患者为手写患者（allPatients）", () => {
    const patientIds = new Set(allPatients.map((p) => p.id));
    for (const a of withUnlock) {
      const pid = a.reward?.unlock?.returnVisit;
      if (pid) expect(patientIds.has(pid), `${a.id} returnVisit=${pid}`).toBe(true);
    }
  });
  it("四类 unlock 各 6/3/2/2，合计 13", () => {
    const letters = withUnlock.filter((a) => a.reward?.unlock?.letter);
    const decors = withUnlock.filter((a) => a.reward?.unlock?.decor);
    const fragments = withUnlock.filter((a) => a.reward?.unlock?.fragment);
    const visits = withUnlock.filter((a) => a.reward?.unlock?.returnVisit);
    expect(letters).toHaveLength(6);
    expect(decors).toHaveLength(3);
    expect(fragments).toHaveLength(2);
    expect(visits).toHaveLength(2);
  });
});
