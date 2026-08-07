import Phaser from "phaser";

/** 大厅木地板：暖色 tile 交错 + 木缝线（全程序绘制） */
export function drawWoodFloor(
  scene: Phaser.Scene,
  width: number,
  height: number,
  tile = 48
): Phaser.GameObjects.Graphics {
  const g = scene.add.graphics();
  const light = 0x6d4c31;
  const dark = 0x63432a;
  for (let y = 0; y < height; y += tile) {
    for (let x = 0; x < width; x += tile) {
      g.fillStyle(((x / tile) + (y / tile)) % 2 === 0 ? light : dark, 1);
      g.fillRect(x, y, tile, tile);
    }
  }
  // 木缝线
  g.fillStyle(0x000000, 0.1);
  for (let x = 0; x <= width; x += tile) g.fillRect(x, 0, 1.5, height);
  for (let y = 0; y <= height; y += tile) g.fillRect(0, y, width, 1.5);
  g.setDepth(-10);
  return g;
}
