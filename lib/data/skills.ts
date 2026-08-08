import type { Skill, ClinicUpgrade } from "../types";

export const allSkills: Skill[] = [
  // 更温柔 · 接住与安抚
  {
    id: "make_ta_safe",
    name: "让 ta 感到安全",
    description: "你先让 ta 觉得这里是安全的——ta 才愿意把心底最深处的事说出来（对话中 truth +15）。",
    school: "gentle",
    cost: 80,
    unlocked: false,
  },
  {
    id: "hold_silence",
    name: "接住沉默",
    description: "ta 说不下去时你不催促，安静地陪着——ta 的防备会悄悄放下（降低防御效果翻倍）。",
    school: "gentle",
    cost: 120,
    requires: "make_ta_safe",
    unlocked: false,
  },
  // 更敏锐 · 看清与直面
  {
    id: "see_through_defense",
    name: "看见防御下的脆弱",
    description: "你看得出 ta 的冷静与强势下藏着什么——逻辑类话术效果增强。",
    school: "sharp",
    cost: 80,
    unlocked: false,
  },
  {
    id: "face_fear",
    name: "陪 ta 直面恐惧",
    description: "ta 害怕时，你陪在身边一步步走过去——恐惧类患者的情绪恢复 +20。",
    school: "sharp",
    cost: 120,
    requires: "see_through_defense",
    unlocked: false,
  },
  {
    id: "hold_through_crisis",
    name: "在崩溃边缘陪住 ta",
    description: "当 ta 最失控的时候，你能稳住局面——高风险的患者身上，解锁关键的选择。",
    school: "sharp",
    cost: 180,
    requires: "see_through_defense",
    unlocked: false,
  },
  // 更坚定 · 方向与托底
  {
    id: "hold_steady",
    name: "稳稳托住",
    description: "除了听，你也把 ta 的日常托稳——这份照顾让诊所收到更多感谢（治疗收入 +50%）。",
    school: "firm",
    cost: 80,
    unlocked: false,
  },
  {
    id: "another_way",
    name: "多一条路",
    description: "当常规的方法都用尽时，你还能为 ta 找到最后一种可能（解锁特殊的处理方式）。",
    school: "firm",
    cost: 200,
    requires: "hold_steady",
    unlocked: false,
  },
  {
    id: "guide_firmly",
    name: "坚定地引导",
    description: "ta 卡在原地时，你用坚定的语气带 ta 迈出那一步（可推进对话，但风险较高）。",
    school: "firm",
    cost: 150,
    unlocked: false,
  },
  {
    id: "toward_truth",
    name: "走向真相",
    description: "你不回避最深的伤口，陪 ta 一次看清——代价是这也会消耗你（理智 -10）。",
    school: "firm",
    cost: 200,
    requires: "guide_firmly",
    unlocked: false,
  },
];

export const allClinicUpgrades: ClinicUpgrade[] = [
  {
    id: "comfort_sofa",
    name: "进口真皮沙发",
    description: "更舒适的沙发让患者放松，初始信任 +10。",
    cost: 300,
    effect: { initialTrustBonus: 10 },
  },
  {
    id: "soundproof",
    name: "加厚隔音墙",
    description: "避免隐私外泄，降低恶性事件被曝光的概率。",
    cost: 500,
    effect: { reputationBonus: 0 },
  },
  {
    id: "bookshelf",
    name: "心理学藏书架",
    description: "彰显专业素养，结算时声望 +2。",
    cost: 400,
    effect: { reputationBonus: 2 },
  },
  {
    id: "rest_room",
    name: "医生休息室",
    description: "每日理智恢复 +10，缓解长期接诊压力。",
    cost: 600,
    effect: { sanityRecoveryBonus: 10 },
  },
  {
    id: "receptionist",
    name: "前台助理",
    description: "过滤麻烦患者，提升诊所运营效率，每日额外收入 +50。",
    cost: 800,
    effect: { reputationBonus: 0 },
  },
  {
    id: "reception_expand",
    name: "候诊扩容",
    description: "多添几把椅子，每天能多接待一位来访者（每日名额 +1）。",
    cost: 1200,
    effect: { capacityBonus: 1 },
  },
];

/** 旧技能 id → 新能力 id（P6-3 旧档迁移用，防漏映射丢档） */
export const SKILL_ID_MIGRATIONS: Record<string, string> = {
  freud_dream: "make_ta_safe",
  free_association: "hold_silence",
  cbt_basic: "see_through_defense",
  exposure_therapy: "face_fear",
  crisis_intervention: "hold_through_crisis",
  pharma_basic: "hold_steady",
  new_drug: "another_way",
  hypnosis_basic: "guide_firmly",
  hypnosis_deep: "toward_truth",
};
