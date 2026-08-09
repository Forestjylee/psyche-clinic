import type { FacilityPosition } from "../types";

/**
 * 装饰数据表（P5-1 装修=记忆的陈列馆）。
 * 三类装饰：
 *  - variant  设施升级解锁的外观变体（换垫/换板/加顶饰等），画在对应设施上；
 *  - flower   治愈/接纳结局的患者送的花，独立摆放；
 *  - picture  记忆碎片解锁的挂画，独立摆放。
 * 仅手写患者（glob 池）有稳定故事，做花/画纪念物。
 */

export type DecorSource =
  | { kind: "upgrade"; upgradeId: string } // 购置设施解锁该设施外观变体
  | { kind: "patient"; patientId: string } // 患者治愈/接纳结局后送的花
  | { kind: "fragment"; patientId: string; fragmentId: string } // 记忆碎片解锁的挂画
  | { kind: "achievement" }; // 成就解锁的旅程纪念物（无患者，暖阳固定配色）

export interface DecorDef {
  id: string;
  /** 展示名（"亚麻暖橙垫" / "小北的花" / "小北·记忆画"） */
  name: string;
  /** 关联故事（"这盆花是小北治好后送来的…"），UI 展示 */
  story: string;
  source: DecorSource;
  /** variant：= 该设施 upgradeId（决定画在哪）；flower/picture：= 摆放槽位 id（同 id） */
  kind: "variant" | "flower" | "picture";
  slot: string;
  size: { w: number; h: number };
  /** flower/picture 的默认摆放位（variant 无此位，用设施自身位置） */
  defaultPos?: { x: number; y: number };
}

export const DECOR_DEFS: DecorDef[] = [
  // ========== 设施外观变体（5 个） ==========
  {
    id: "variant_sofa",
    name: "亚麻暖橙垫",
    story: "换上一张暖橙色的亚麻垫，老沙发看起来像会欢迎任何人坐下来。患者进门时，眉头松了些。",
    source: { kind: "upgrade", upgradeId: "comfort_sofa" },
    kind: "variant",
    slot: "comfort_sofa",
    size: { w: 72, h: 36 },
  },
  {
    id: "variant_soundproof",
    name: "暖木纹",
    story: "暖木纹隔音板让诊室安静得能听见窗外风过树梢，说不出口的话，也终于敢开口了。",
    source: { kind: "upgrade", upgradeId: "soundproof" },
    kind: "variant",
    slot: "soundproof",
    size: { w: 120, h: 28 },
  },
  {
    id: "variant_bookshelf",
    name: "绿植顶饰",
    story: "书架顶上加了一丛绿植，像是给满架的书都留了一扇透气的窗。",
    source: { kind: "upgrade", upgradeId: "bookshelf" },
    kind: "variant",
    slot: "bookshelf",
    size: { w: 56, h: 72 },
  },
  {
    id: "variant_restroom",
    name: "格纹被",
    story: "格子棉被铺得整整齐齐，像有人认真对待自己的一天。",
    source: { kind: "upgrade", upgradeId: "rest_room" },
    kind: "variant",
    slot: "rest_room",
    size: { w: 84, h: 48 },
  },
  {
    id: "variant_reception",
    name: "花饰前台",
    story: "前台摆上鲜花，来的人还没开口，先看见了一点亮色。",
    source: { kind: "upgrade", upgradeId: "receptionist" },
    kind: "variant",
    slot: "receptionist",
    size: { w: 40, h: 56 },
  },
  // ========== 治愈患者送的花（2 个） ==========
  {
    id: "flower_xiao_bei",
    name: "小北的花",
    story: "这盆花是小北治好后送来的。他说，现在终于敢停下来，浇浇花了。",
    source: { kind: "patient", patientId: "xiao_bei" },
    kind: "flower",
    slot: "flower_xiao_bei",
    size: { w: 30, h: 34 },
    defaultPos: { x: 640, y: 210 },
  },
  {
    id: "flower_lin_xiao",
    name: "林晓的花",
    story: "林晓送来这盆花那天，说弟弟也画了一幅画，就放在她床头。花开了，像她终于允许自己笑出来。",
    source: { kind: "patient", patientId: "lin_xiao" },
    kind: "flower",
    slot: "flower_lin_xiao",
    size: { w: 30, h: 34 },
    defaultPos: { x: 420, y: 290 },
  },
  // ========== 成就解锁的旅程纪念物（5 个，无患者，暖阳固定配色） ==========
  {
    id: "trophy_first_heal",
    name: "向阳花",
    story: "第一场治愈那天，你给窗台添了一小盆向日葵。现在它开了。",
    source: { kind: "achievement" },
    kind: "flower",
    slot: "trophy_first_heal",
    size: { w: 30, h: 34 },
    defaultPos: { x: 480, y: 220 },
  },
  {
    id: "trophy_different",
    name: "多肉拼盘",
    story: "接见过十种不同的心事之后，你给窗台添了一盆多肉。它们不声张，却都活着。",
    source: { kind: "achievement" },
    kind: "flower",
    slot: "trophy_different",
    size: { w: 30, h: 34 },
    defaultPos: { x: 300, y: 120 },
  },
  {
    id: "trophy_seeds",
    name: "启程的种子",
    story: "诊所开张那天有人送的一包种子。你一直没拆，等着哪天，心里有了发芽的心情。",
    source: { kind: "achievement" },
    kind: "flower",
    slot: "trophy_seeds",
    size: { w: 30, h: 34 },
    defaultPos: { x: 60, y: 180 },
  },
  {
    id: "trophy_clarity",
    name: "澄明灯",
    story: "把真相说到九十五分以上的那一天，你给诊室添了一盏小灯。它不耀眼，正好照亮那些说不出口的话。",
    source: { kind: "achievement" },
    kind: "flower",
    slot: "trophy_clarity",
    size: { w: 30, h: 34 },
    defaultPos: { x: 200, y: 340 },
  },
  {
    id: "trophy_warmth",
    name: "守望的花",
    story: "探望过一位位回来的故人之后，你摆下一盆守望的花——有人回来，它就开一朵。",
    source: { kind: "achievement" },
    kind: "flower",
    slot: "trophy_warmth",
    size: { w: 30, h: 34 },
    defaultPos: { x: 320, y: 420 },
  },
  // ========== 记忆碎片挂画（2 个，每个患者第一块碎片） ==========
  {
    id: "picture_xiao_bei_m1",
    name: "饭桌上的比较·记忆画",
    story: "这是小北的过去一角，挂在墙上，提醒你为什么坐在这里。",
    source: { kind: "fragment", patientId: "xiao_bei", fragmentId: "xiao_m1" },
    kind: "picture",
    slot: "picture_xiao_bei_m1",
    size: { w: 46, h: 38 },
    defaultPos: { x: 820, y: 160 },
  },
  {
    id: "picture_lin_xiao_m1",
    name: "奖状被撕的那个下午·记忆画",
    story: "这是林晓的过去一角，挂在墙上，提醒你为什么坐在这里。",
    source: { kind: "fragment", patientId: "lin_xiao", fragmentId: "lin_m1" },
    kind: "picture",
    slot: "picture_lin_xiao_m1",
    size: { w: 46, h: 38 },
    defaultPos: { x: 860, y: 120 },
  },
];

/** 按 id 查装饰定义 */
export function decorById(id: string): DecorDef | undefined {
  return DECOR_DEFS.find((d) => d.id === id);
}

/** 设施升级对应的外观变体（无则 undefined） */
export function variantForUpgrade(upgradeId: string): DecorDef | undefined {
  return DECOR_DEFS.find(
    (d) => d.kind === "variant" && d.slot === upgradeId
  );
}

/** 患者治愈/接纳结局对应的花（无则 undefined） */
export function flowerForPatient(patientId: string): DecorDef | undefined {
  return DECOR_DEFS.find(
    (d) => d.kind === "flower" && d.source.kind === "patient" && d.source.patientId === patientId
  );
}

/** 记忆碎片对应的挂画（无则 undefined） */
export function pictureForFragment(
  patientId: string,
  fragmentId: string
): DecorDef | undefined {
  return DECOR_DEFS.find(
    (d) =>
      d.kind === "picture" &&
      d.source.kind === "fragment" &&
      d.source.patientId === patientId &&
      d.source.fragmentId === fragmentId
  );
}

/** 花/画装饰的默认摆放位（兜底走 defaultPos） */
export function defaultDecorPos(decorId: string): FacilityPosition | undefined {
  const d = decorById(decorId);
  return d?.defaultPos;
}
