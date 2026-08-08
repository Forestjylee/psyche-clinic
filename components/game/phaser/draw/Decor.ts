import Phaser from "phaser";

/**
 * 装修装饰绘制（P5-1）：花（治愈患者送）与画（记忆碎片挂画）。
 * 程序化纸木风小物件，container 存 data：{ decorId, decorW, decorH }，
 * 与设施一致可命中/拖动。位置仅视觉，存 game.decorPositions。
 */

function toHex(color: string): number {
  return parseInt(color.replace("#", ""), 16);
}

/**
 * 小花盆：盆 + 茎 + 叶 + 花瓣，花瓣色取患者 palette.primary。
 * 原点居中，pot 中心偏下。
 */
export function drawFlower(
  scene: Phaser.Scene,
  petalColor: string,
  x: number,
  y: number,
  decorId: string,
  w = 30,
  h = 34
): Phaser.GameObjects.Container {
  const g = scene.add.graphics();
  const pot = 0xa05a3a;
  const potRim = 0xc97a4a;
  const stem = 0x3a7a3a;
  const leaf = 0x5a9a4a;
  const petal = toHex(petalColor || "#e0a868");
  const cy = 8; // 盆中心（容器原点居中，盆画在底部）

  // 盆
  g.fillStyle(potRim, 1);
  g.fillRoundedRect(-9, cy - 6, 18, 5, 2);
  g.fillStyle(pot, 1);
  g.fillRoundedRect(-8, cy - 3, 16, 9, 3);
  // 茎
  g.lineStyle(3, stem, 1);
  g.beginPath();
  g.moveTo(0, cy - 4);
  g.lineTo(0, cy - 22);
  g.strokePath();
  // 叶
  g.fillStyle(leaf, 1);
  g.fillEllipse(-4, cy - 13, 9, 5);
  g.fillEllipse(4, cy - 17, 7, 4);
  // 花瓣（5 瓣绕花心）
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
    g.fillStyle(petal, 1);
    g.fillCircle(Math.cos(a) * 6, cy - 23 + Math.sin(a) * 6, 4);
  }
  g.fillStyle(0xf7d77a, 1);
  g.fillCircle(0, cy - 23, 3);

  const container = scene.add.container(x, y, [g]);
  container.setSize(w, h);
  container.setDepth(5);
  container.setData("decorId", decorId);
  container.setData("decorW", w);
  container.setData("decorH", h);
  return container;
}

/**
 * 小相框：木框 + 纸底 + 画意小色块 + 标题小字（碎片标题截短）。
 * 框色取患者 palette.primary，画意取 bright。
 */
export function drawPicture(
  scene: Phaser.Scene,
  frameColor: string,
  brightColor: string,
  x: number,
  y: number,
  decorId: string,
  title = "",
  w = 46,
  h = 40
): Phaser.GameObjects.Container {
  const g = scene.add.graphics();
  const frame = toHex(frameColor || "#8a5a3b");
  const bright = toHex(brightColor || "#f0d090");
  const paper = 0xfffaf0;
  const ink = 0x6a5c48;

  // 外框
  g.fillStyle(frame, 1);
  g.fillRoundedRect(-w / 2, -h / 2, w, h, 4);
  // 内纸
  g.fillStyle(paper, 1);
  g.fillRoundedRect(-w / 2 + 4, -h / 2 + 4, w - 8, h - 8, 2);
  // 画意（患者亮色小色块，抽象）
  g.fillStyle(bright, 0.9);
  g.fillCircle(0, 0, 7);
  g.fillStyle(0xe8dcc0, 1);
  g.fillCircle(0, 2, 5);
  // 标题小字（碎片标题截 4 字，纸木风）
  const label = scene.add
    .text(0, h / 2 + 10, title.slice(0, 4), {
      fontFamily: "'LXGW WenKai','ZCOOL XiaoWei','Segoe UI',sans-serif",
      fontSize: "9px",
      color: "#f0e4ca",
      stroke: "#000000",
      strokeThickness: 3,
    })
    .setOrigin(0.5);
  void ink;

  const container = scene.add.container(x, y, [g, label]);
  container.setSize(w, h);
  container.setDepth(5);
  container.setData("decorId", decorId);
  container.setData("decorW", w);
  container.setData("decorH", h);
  return container;
}
