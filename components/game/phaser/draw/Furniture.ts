import Phaser from "phaser";

/**
 * 设施定义：升级项 -> 场景可绘制家具。
 * 位置仅视觉（SPEC §8），defaultPos 为购置后首次摆放的默认位；
 * 玩家可在装修模式拖动落格，存于 game.facilityPositions[upgradeId]。
 */
export interface FacilityDef {
  /** 对应 allClinicUpgrades 的 id */
  id: string;
  name: string;
  /** 绘制尺寸（逻辑 px，命中区域用） */
  w: number;
  h: number;
  /** 默认摆放位（未自定义时使用） */
  defaultPos: { x: number; y: number };
}

export const FACILITY_DEFS: FacilityDef[] = [
  {
    id: "comfort_sofa",
    name: "进口真皮沙发",
    defaultPos: { x: 200, y: 300 },
    w: 72,
    h: 36,
  },
  {
    id: "soundproof",
    name: "加厚隔音墙",
    defaultPos: { x: 620, y: 150 },
    w: 120,
    h: 28,
  },
  {
    id: "bookshelf",
    name: "心理学藏书架",
    defaultPos: { x: 90, y: 220 },
    w: 56,
    h: 72,
  },
  {
    id: "rest_room",
    name: "医生休息室",
    defaultPos: { x: 790, y: 470 },
    w: 84,
    h: 48,
  },
  {
    id: "receptionist",
    name: "前台助理",
    defaultPos: { x: 470, y: 170 },
    w: 40,
    h: 56,
  },
];

export function facilityDefById(id: string): FacilityDef | undefined {
  return FACILITY_DEFS.find((d) => d.id === id);
}

function toHex(color: string): number {
  return parseInt(color.replace("#", ""), 16);
}

const WOOD = 0x7a5433;
const WOOD_DARK = 0x5d3e24;
const LEAF = 0x6a8f5a;

/**
 * 按设施类型绘制一个家具 Container（含独立 Graphics，可拖动/命中）。
 * container 存 data：{ facilityId, defW, defH }。
 */
export function drawFacility(
  scene: Phaser.Scene,
  def: FacilityDef,
  x: number,
  y: number
): Phaser.GameObjects.Container {
  const g = scene.add.graphics();
  const container = scene.add.container(x, y, [g]);
  drawBody(scene, g, def);
  // 名称小标签（暖色描边，开罗风）
  const t = scene.add
    .text(0, def.h / 2 + 14, def.name, {
      fontFamily: "'LXGW WenKai','ZCOOL XiaoWei','Segoe UI',sans-serif",
      fontSize: "11px",
      color: "#f0e4ca",
      stroke: "#000000",
      strokeThickness: 3,
    })
    .setOrigin(0.5);
  container.add(t);
  container.setSize(def.w, def.h);
  container.setDepth(5);
  container.setData("facilityId", def.id);
  container.setData("defW", def.w);
  container.setData("defH", def.h);
  return container;
}

/** 根据设施类型画图形（原点居中，围绕 (0,0)） */
function drawBody(
  scene: Phaser.Scene,
  g: Phaser.GameObjects.Graphics,
  def: FacilityDef
): void {
  switch (def.id) {
    case "comfort_sofa":
      drawSofa(g);
      break;
    case "soundproof":
      drawSoundproof(g);
      break;
    case "bookshelf":
      drawBookshelf(scene, g);
      break;
    case "rest_room":
      drawRestRoom(g);
      break;
    case "receptionist":
      drawReceptionist(scene, g);
      break;
    default:
      drawCrate(g);
  }
}

/** 沙发：坐垫 + 靠背 + 扶手 */
function drawSofa(g: Phaser.GameObjects.Graphics): void {
  const w = 72;
  const h = 30;
  const main = 0x7a9a6a;
  const deep = 0x5b7a52;
  const arm = 0x8a6f4a;
  // 靠背
  g.fillStyle(deep, 1);
  g.fillRoundedRect(-w / 2, -h / 2, w, 16, 6);
  // 坐垫
  g.fillStyle(main, 1);
  g.fillRoundedRect(-w / 2, -h / 2 + 12, w, 18, 6);
  // 缝线
  g.lineStyle(1, deep, 0.8);
  g.strokeRoundedRect(-w / 2, -h / 2 + 12, w, 18, 6);
  // 扶手
  g.fillStyle(arm, 1);
  g.fillRoundedRect(-w / 2, -h / 2, 10, h, 4);
  g.fillRoundedRect(w / 2 - 10, -h / 2, 10, h, 4);
  // 坐垫接缝
  g.lineStyle(1, deep, 0.5);
  g.beginPath();
  g.moveTo(-6, -4);
  g.lineTo(6, -4);
  g.strokePath();
}

/** 隔音墙：横向隔音板（浅色细纹） */
function drawSoundproof(g: Phaser.GameObjects.Graphics): void {
  const w = 120;
  const h = 26;
  const board = 0xcaa97a;
  const line = 0xa8845a;
  g.fillStyle(WOOD_DARK, 1);
  g.fillRoundedRect(-w / 2, -h / 2, w, h, 4);
  for (let i = 0; i < 5; i++) {
    g.fillStyle(i % 2 === 0 ? board : 0xb89468, 1);
    g.fillRoundedRect(-w / 2 + 4 + i * 23, -h / 2 + 3, 20, h - 6, 2);
  }
  g.lineStyle(1, line, 0.8);
  g.strokeRoundedRect(-w / 2, -h / 2, w, h, 4);
}

/** 藏书架：木架 + 彩色书脊 */
function drawBookshelf(
  scene: Phaser.Scene,
  g: Phaser.GameObjects.Graphics
): void {
  const w = 56;
  const h = 72;
  const shelf = 0x8a5a3b;
  const back = 0x6a4026;
  const bookColors = [0xd96a5a, 0x5a8fc0, 0x6a9a5a, 0xc0a050, 0x8a6ac0, 0x4a8a7a];
  g.fillStyle(back, 1);
  g.fillRoundedRect(-w / 2, -h / 2, w, h, 4);
  // 三层书架
  for (let row = 0; row < 3; row++) {
    const yTop = -h / 2 + 8 + row * 22;
    g.fillStyle(shelf, 1);
    g.fillRect(-w / 2 + 3, yTop, w - 6, 4);
    // 书脊
    let bx = -w / 2 + 6;
    while (bx < w / 2 - 8) {
      const bw = 6 + Math.floor(Math.random() * 5);
      g.fillStyle(bookColors[Math.floor(Math.random() * bookColors.length)], 1);
      g.fillRect(bx, yTop + 4, bw, 20 - row * 2);
      bx += bw + 2;
    }
  }
  // 顶饰
  g.fillStyle(shelf, 1);
  g.fillRect(-w / 2, -h / 2, w, 4);
  // 防抖：场景内随机数不受控制也行（视觉），但保持纯视觉
  void scene;
}

/** 休息室：床（床垫+枕头）+ 夜灯 */
function drawRestRoom(g: Phaser.GameObjects.Graphics): void {
  const w = 84;
  const h = 44;
  const bed = 0x8a7a5a;
  const sheet = 0xe8dcc0;
  const pillow = 0xf0ead8;
  // 床架
  g.fillStyle(WOOD_DARK, 1);
  g.fillRoundedRect(-w / 2, -h / 2 + 4, w, h - 8, 6);
  // 床垫
  g.fillStyle(bed, 1);
  g.fillRoundedRect(-w / 2 + 4, -h / 2 + 8, w - 8, 18, 4);
  // 被子
  g.fillStyle(sheet, 1);
  g.fillRoundedRect(-w / 2 + 4, -h / 2 + 8, w - 8, 12, 4);
  // 枕头
  g.fillStyle(pillow, 1);
  g.fillRoundedRect(w / 2 - 16, -h / 2 + 6, 12, 22, 4);
  // 床头小夜灯
  g.fillStyle(0xd9b380, 1);
  g.fillRoundedRect(-w / 2 + 2, -h / 2 + 6, 8, 8, 2);
  g.fillStyle(0xf2e6c0, 1);
  g.fillCircle(-w / 2 + 6, -h / 2 + 4, 4);
}

/** 前台助理：小桌 + 电话 + 名牌 */
function drawReceptionist(
  _scene: Phaser.Scene,
  g: Phaser.GameObjects.Graphics
): void {
  const desk = 0x9a6f46;
  const top = 0xc08854;
  // 前台桌（俯视）
  g.fillStyle(WOOD_DARK, 1);
  g.fillRoundedRect(-18, -6, 36, 22, 4);
  g.fillStyle(desk, 1);
  g.fillRoundedRect(-18, -10, 36, 8, 3);
  // 电话
  g.fillStyle(0x3a4a5a, 1);
  g.fillRoundedRect(-8, -18, 16, 10, 2);
  g.fillStyle(0x7a8a9a, 1);
  g.fillRoundedRect(-5, -16, 6, 3, 1);
  // 名牌
  g.fillStyle(0x5a4a35, 1);
  g.fillRoundedRect(-12, -30, 24, 13, 3);
  g.lineStyle(1, 0xd9b380, 0.7);
  g.strokeRoundedRect(-12, -30, 24, 13, 3);
  void top;
}

/** 兜底：木箱 */
function drawCrate(g: Phaser.GameObjects.Graphics): void {
  g.fillStyle(WOOD, 1);
  g.fillRoundedRect(-16, -16, 32, 32, 4);
  g.lineStyle(2, WOOD_DARK, 1);
  g.strokeRoundedRect(-16, -16, 32, 32, 4);
}

/** 高亮矩形（装修模式选中设施时显示落格光标） */
export function drawGridCursor(
  scene: Phaser.Scene,
  x: number,
  y: number,
  w: number,
  h: number,
  color = 0xf2c14e
): Phaser.GameObjects.Graphics {
  const g = scene.add.graphics();
  g.lineStyle(2, color, 0.9);
  g.strokeRoundedRect(x - w / 2, y - h / 2, w, h, 6);
  g.fillStyle(color, 0.12);
  g.fillRoundedRect(x - w / 2, y - h / 2, w, h, 6);
  g.setDepth(4);
  return g;
}
