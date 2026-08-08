import type { Skill, ClinicUpgrade } from "../types";

export const allSkills: Skill[] = [
  // 精神分析流派
  {
    id: "freud_dream",
    name: "解梦术",
    description: "弗洛伊德学派。可通过梦境解析快速揭示患者潜意识，对话中 truth +15。",
    school: "psychoanalysis",
    cost: 80,
    unlocked: false,
  },
  {
    id: "free_association",
    name: "自由联想",
    description: "引导患者自由联想，降低防御效果翻倍。",
    school: "psychoanalysis",
    cost: 120,
    requires: "freud_dream",
    unlocked: false,
  },
  // CBT 流派
  {
    id: "cbt_basic",
    name: "认知重构",
    description: "CBT 基础。识别患者非理性信念，逻辑选项效果增强。",
    school: "cbt",
    cost: 80,
    unlocked: false,
  },
  {
    id: "exposure_therapy",
    name: "暴露疗法",
    description: "系统脱敏，对恐惧类患者 mood 恢复 +20。",
    school: "cbt",
    cost: 120,
    requires: "cbt_basic",
    unlocked: false,
  },
  // 催眠流派
  {
    id: "hypnosis_basic",
    name: "催眠术·初级",
    description: "解锁催眠对话选项，可强行推进对话，但风险较高。",
    school: "hypnosis",
    cost: 150,
    unlocked: false,
  },
  {
    id: "hypnosis_deep",
    name: "深度催眠",
    description: "深度催眠可一次性大幅揭示真相，但消耗医生理智 -10。",
    school: "hypnosis",
    cost: 200,
    requires: "hypnosis_basic",
    unlocked: false,
  },
  // 药物学流派
  {
    id: "pharma_basic",
    name: "临床药理学",
    description: "处方药效果增强，副作用降低。开药金钱收益 +50%。",
    school: "pharmacology",
    cost: 80,
    unlocked: false,
  },
  {
    id: "new_drug",
    name: "新药研发",
    description: "可开发定制药物，对顽固性症状有奇效。解锁特殊药品选项。",
    school: "pharmacology",
    cost: 200,
    requires: "pharma_basic",
    unlocked: false,
  },
  // 通用技能
  {
    id: "crisis_intervention",
    name: "危机干预",
    description: "面对高风险患者（自杀/犯罪）时，解锁关键的特殊选项。",
    school: "cbt",
    cost: 180,
    requires: "cbt_basic",
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
