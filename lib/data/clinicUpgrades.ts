import type { ClinicUpgrade } from "../types";

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
