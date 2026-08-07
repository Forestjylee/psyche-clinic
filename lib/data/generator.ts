import type {
  PatientScenario,
  PatientState,
  PatientPalette,
  PatientEmotion,
  DialogueNode,
  EndingType,
  ChoiceEffect,
} from "../types";

// ========== 生成器组件库 ==========

/** 姓氏池 */
const SURNAMES = [
  "李", "王", "张", "刘", "陈", "杨", "赵", "黄", "周", "吴",
  "徐", "孙", "胡", "朱", "高", "林", "何", "郭", "马", "罗",
  "梁", "宋", "郑", "谢", "韩", "唐", "冯", "于", "董", "萧",
];

/** 女名池 */
const FEMALE_NAMES = [
  "雨晴", "思琪", "婉清", "晓棠", "若曦", "静怡", "诗涵", "雅琴",
  "梦瑶", "佳颖", "心怡", "婉如", "语嫣", "芷晴", "映寒", "念慈",
];

/** 男名池 */
const MALE_NAMES = [
  "子轩", "浩然", "俊杰", "宇航", "梓豪", "思源", "明哲", "文博",
  "志远", "景行", "怀瑾", "清越", "知衡", "砚秋", "叙白", "望舒",
];

/** 职业原型 */
export interface ProfessionProfile {
  profession: string;
  ageDesc: string;
  avatarChar: string;
  /** intro 模板，接收姓名 */
  intro: (name: string, symptom: string) => string;
  /** 患者头衔 */
  title: (name: string) => string;
}

export const professions: ProfessionProfile[] = [
  {
    profession: "中学教师",
    ageDesc: "32岁",
    avatarChar: "师",
    intro: (n, s) =>
      `教务处转介来的。这位${n}老师最近在课堂上失控过两次，学生家长有意见。据说症状是${s}。`,
    title: (n) => `${n} · 中学语文教师`,
  },
  {
    profession: "急诊科医生",
    ageDesc: "38岁",
    avatarChar: "医",
    intro: (n, s) =>
      `本院同事私下转介。${n}医生上个月在抢救室僵住了整整两分钟，事后只说"没事"。近期表现出明显的${s}。`,
    title: (n) => `${n} · 急诊科主治医师`,
  },
  {
    profession: "互联网产品经理",
    ageDesc: "29岁",
    avatarChar: "程",
    intro: (n, s) =>
      `自助预约。${n}说自己已经三个月没睡过整觉，做产品评审时手抖得拿不住笔。主诉：${s}。`,
    title: (n) => `${n} · 互联网产品经理`,
  },
  {
    profession: "全职主妇",
    ageDesc: "34岁",
    avatarChar: "主",
    intro: (n, s) =>
      `丈夫替她预约，但本人独自前来。${n}说自己"就是有点累"，但眼神躲闪。表现为${s}。`,
    title: (n) => `${n} · 全职主妇`,
  },
  {
    profession: "退休民警",
    ageDesc: "58岁",
    avatarChar: "警",
    intro: (n, s) =>
      `老战友陪同前来。${n}退休后性情大变，老伴说他整夜不睡，反复翻看旧案卷宗。症状：${s}。`,
    title: (n) => `${n} · 退休刑警`,
  },
  {
    profession: "话剧演员",
    ageDesc: "27岁",
    avatarChar: "艺",
    intro: (n, s) =>
      `经纪人陪同。${n}最近在排新戏时多次忘词、情绪崩溃，被怀疑是${s}。本人非常抗拒"看病"的说法。`,
    title: (n) => `${n} · 话剧演员`,
  },
  {
    profession: "高三学生",
    ageDesc: "18岁",
    avatarChar: "生",
    intro: (n, s) =>
      `母亲陪同但被请出诊室。${n}成绩从年级前五十滑到三百名外，开始出现${s}。班主任建议休学。`,
    title: (n) => `${n} · 高三学生`,
  },
  {
    profession: "餐饮店老板",
    ageDesc: "45岁",
    avatarChar: "商",
    intro: (n, s) =>
      `自己走进来的。${n}的连锁店刚开了第三家，但他瘦了二十斤。他说"不是累，是心里有事"，表现为${s}。`,
    title: (n) => `${n} · 餐饮连锁老板`,
  },
];

/** 症状原型 */
export interface SymptomProfile {
  id: string;
  name: string; // 用于 intro 拼接
  surface: string; // 表象描述
  emotion: PatientEmotion; // 开场情绪
  initialState: Omit<PatientState, "round" | "truth">;
  palette: PatientPalette;
}

export const symptoms: SymptomProfile[] = [
  {
    id: "depression",
    name: "重度抑郁",
    surface: "情绪低落、兴趣丧失、反复自责。",
    emotion: "sad",
    initialState: { trust: 15, defense: 55, mood: 25 },
    palette: { primary: "#5a7fa8", secondary: "#8aa8c8", fog: "#1a2230", bright: "#a8c8e8" },
  },
  {
    id: "anxiety",
    name: "广泛性焦虑",
    surface: "持续担忧、心悸、坐立不安。",
    emotion: "anxious",
    initialState: { trust: 20, defense: 45, mood: 35 },
    palette: { primary: "#c8a040", secondary: "#d4b870", fog: "#2a2014", bright: "#f0d890" },
  },
  {
    id: "ocd",
    name: "强迫症状",
    surface: "反复检查、仪式化行为、自我苛责。",
    emotion: "anxious",
    initialState: { trust: 12, defense: 65, mood: 30 },
    palette: { primary: "#9080c0", secondary: "#b8a8d8", fog: "#1f1a2e", bright: "#d0c0f0" },
  },
  {
    id: "insomnia",
    name: "顽固性失眠",
    surface: "入睡困难、早醒、日间功能受损。",
    emotion: "neutral",
    initialState: { trust: 25, defense: 35, mood: 30 },
    palette: { primary: "#6a8a9a", secondary: "#9ab0c0", fog: "#141c22", bright: "#a8d0e0" },
  },
  {
    id: "ptsd",
    name: "创伤后应激",
    surface: "闪回、警觉增高、回避相关刺激。",
    emotion: "scared",
    initialState: { trust: 8, defense: 75, mood: 20 },
    palette: { primary: "#a85a5a", secondary: "#c88888", fog: "#2a1414", bright: "#e8a8a8" },
  },
  {
    id: "dissociation",
    name: "解离症状",
    surface: "现实感丧失、记忆断片、身份混乱。",
    emotion: "neutral",
    initialState: { trust: 10, defense: 70, mood: 28 },
    palette: { primary: "#7a9a8a", secondary: "#a8c8b8", fog: "#14201a", bright: "#a8e8c8" },
  },
];

// ========== 真相模板 ==========

export interface TruthTemplate {
  id: string;
  name: string;
  /** 真相描述 */
  truth: (ctx: GenContext) => string;
  /** 构建完整对话图 */
  buildDialogues: (ctx: GenContext) => Record<string, DialogueNode>;
}

export interface GenContext {
  name: string;
  gender: "male" | "female";
  symptom: SymptomProfile;
  profession: ProfessionProfile;
  difficulty: "简单" | "普通" | "困难";
}

// 真相模板库来自 truths.ts（手写深度模板）
import { truthBatch1 } from "./truths";
import { buildSeedDialogues, defaultFragments, type ScenarioSeed } from "./sceneBuilder";

// 剧本种子库（sceneBuilder 生成；第 3/4 步持续扩充）
import { bizarreSeeds } from "./seeds/bizarre";
import { seriousSeedsA } from "./seeds/serious_a";
import { seriousSeedsB } from "./seeds/serious_b";

export const truthTemplates: TruthTemplate[] = truthBatch1;

// ========== sceneBuilder 种子模板 ==========

/** 由剧本种子（sceneBuilder）生成的模板，与手写模板共用生成池 */
export const seedTemplates: TruthTemplate[] = [];

/** 已注册种子：id → 种子，用于覆盖初始数值/色调 */
const seedById = new Map<string, ScenarioSeed>();

/** 注册一批剧本种子到生成池（模块加载时调用） */
export function registerSeeds(seeds: ScenarioSeed[]): void {
  for (const s of seeds) {
    seedById.set(s.id, s);
    seedTemplates.push({
      id: s.id,
      name: s.name,
      truth: s.truth,
      buildDialogues: (ctx) => buildSeedDialogues(s, ctx),
    });
  }
}

/** 完整的真相模板池（手写 + 种子） */
export function getAllTemplates(): TruthTemplate[] {
  return [...truthTemplates, ...seedTemplates];
}

// 注册剧本种子到生成池（第 3/4 步持续扩充）
registerSeeds(bizarreSeeds);
registerSeeds(seriousSeedsA);
registerSeeds(seriousSeedsB);

// ========== 生成器主函数 ==========

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateName(gender: "male" | "female"): string {
  const surname = randomItem(SURNAMES);
  const given = gender === "female" ? randomItem(FEMALE_NAMES) : randomItem(MALE_NAMES);
  return surname + given;
}

function difficultyByReputation(rep: number): "简单" | "普通" | "困难" {
  if (rep < 30) return randomItem(["简单", "简单", "普通"]);
  if (rep < 60) return randomItem(["简单", "普通", "普通", "困难"]);
  return randomItem(["普通", "困难", "困难"]);
}

function baseRewardByDifficulty(d: "简单" | "普通" | "困难"): number {
  return { 简单: 150, 普通: 300, 困难: 600 }[d];
}

function requireRepByDifficulty(d: "简单" | "普通" | "困难"): number {
  return { 简单: 0, 普通: 20, 困难: 40 }[d];
}

export interface GenerateOptions {
  /** 指定症状 id，不指定则随机 */
  symptomId?: string;
  /** 指定真相模板 id，不指定则随机 */
  truthId?: string;
  /** 指定职业索引 */
  professionIndex?: number;
  /** 指定难度 */
  difficulty?: "简单" | "普通" | "困难";
  /** 指定性别 */
  gender?: "male" | "female";
  /** 排除已用过的种子 id（随机选择时跳过；池耗尽自动重洗全池） */
  excludeSeeds?: string[];
}

let generatedCounter = 0;

export function generateScenario(
  options: GenerateOptions = {},
  doctorReputation = 0
): PatientScenario {
  const gender = options.gender ?? (Math.random() > 0.5 ? "female" : "male");
  const name = generateName(gender);

  const symptom = options.symptomId
    ? symptoms.find((s) => s.id === options.symptomId)!
    : randomItem(symptoms);

  const profession =
    options.professionIndex !== undefined
      ? professions[options.professionIndex % professions.length]
      : randomItem(professions);

  const allTemplates = getAllTemplates();
  // 去重：随机选择时排除已用种子；池耗尽时回退全池（重洗一轮）
  const pool = options.excludeSeeds?.length
    ? allTemplates.filter((t) => !options.excludeSeeds!.includes(t.id))
    : allTemplates;
  const truth = options.truthId
    ? allTemplates.find((t) => t.id === options.truthId)!
    : randomItem(pool.length ? pool : allTemplates);

  const difficulty =
    options.difficulty ?? difficultyByReputation(doctorReputation);

  const ctx: GenContext = { name, gender, symptom, profession, difficulty };

  // 种子可覆盖初始数值与色调，否则继承症状档案
  const seed = seedById.get(truth.id);
  const baseInit = seed?.initial ? { ...symptom.initialState, ...seed.initial } : symptom.initialState;

  // 根据难度调整初始数值
  const diffMod = { 简单: { t: 5, d: -5, m: 5 }, 普通: { t: 0, d: 0, m: 0 }, 困难: { t: -5, d: 10, m: -5 } }[difficulty];
  const initialState: PatientState = {
    trust: Math.max(5, baseInit.trust + diffMod.t),
    defense: Math.max(20, baseInit.defense + diffMod.d),
    mood: Math.max(15, baseInit.mood + diffMod.m),
    truth: 0,
    round: 0,
  };

  generatedCounter += 1;
  const id = `gen_${Date.now()}_${generatedCounter}`;
  const dialogues = truth.buildDialogues(ctx);

  return {
    id,
    name,
    title: profession.title(name),
    intro: profession.intro(name, symptom.name),
    surface: symptom.surface,
    truth: truth.truth(ctx),
    palette: seed?.palette ?? symptom.palette,
    initialState,
    dialogues,
    startNode: Object.keys(dialogues)[0],
    memoryFragments: seed ? defaultFragments(seed.id) : undefined,
    seedId: truth.id,
    baseReward: baseRewardByDifficulty(difficulty),
    requireReputation: requireRepByDifficulty(difficulty),
    difficulty,
  };
}

/** 获取所有可用组件（供 UI 展示） */
export function getGeneratorComponents() {
  return {
    symptoms: symptoms.map((s) => ({ id: s.id, name: s.name, surface: s.surface })),
    truths: truthTemplates.map((t) => ({ id: t.id, name: t.name })),
    professions: professions.map((p) => ({ profession: p.profession, ageDesc: p.ageDesc })),
  };
}
