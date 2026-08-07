import Phaser from "phaser";

/** 程序绘制小人的配色（沿用现有 palette 语义：primary=发色，secondary=衣色） */
export interface CharacterPalette {
  primary: string;
  secondary: string;
}

/** 医生固定配色：暖棕发 + 白大褂 */
export const DOCTOR_PALETTE: CharacterPalette = {
  primary: "#8a5a3b",
  secondary: "#f2efe9",
};

const SKIN = 0xf0d8b8; // 暖肤色
const INK = 0x2b2118; // 深墨（眼/嘴）
const SHOE = 0x4a3526; // 鞋

function toHex(color: string): number {
  return parseInt(color.replace("#", ""), 16);
}

/**
 * 绘制一个简化 Chibi 小人（Container：身体/头/发/脚/表情）。
 * 归一化 scale=1 ≈ 高 46px；静止立绘请继续用 DOM ChibiCharacter（表情更细腻）。
 */
export function createCharacter(
  scene: Phaser.Scene,
  x: number,
  y: number,
  palette: CharacterPalette,
  opts?: { scale?: number; label?: string }
): Phaser.GameObjects.Container {
  const s = opts?.scale ?? 1;
  const g = scene.add.graphics();
  const body = toHex(palette.secondary);
  const hair = toHex(palette.primary);

  // 脚
  g.fillStyle(SHOE, 1);
  g.fillCircle(-5 * s, 16 * s, 4 * s);
  g.fillCircle(5 * s, 16 * s, 4 * s);
  // 身体（白大褂/衣服）
  g.fillStyle(body, 1);
  g.fillRoundedRect(-9 * s, -8 * s, 18 * s, 22 * s, 7 * s);
  // 头
  g.fillStyle(SKIN, 1);
  g.fillCircle(0, -20 * s, 10 * s);
  // 头发（覆盖头顶 + 两侧发鬓）
  g.fillStyle(hair, 1);
  g.fillCircle(0, -22.5 * s, 10 * s);
  g.fillRect(-10 * s, -22.5 * s, 20 * s, 5 * s);
  g.fillRoundedRect(-9 * s, -19 * s, 3 * s, 7 * s, 1.5 * s);
  g.fillRoundedRect(6 * s, -19 * s, 3 * s, 7 * s, 1.5 * s);
  // 眼
  g.fillStyle(INK, 1);
  g.fillCircle(-3.5 * s, -19.5 * s, 1.4 * s);
  g.fillCircle(3.5 * s, -19.5 * s, 1.4 * s);
  // 微笑嘴
  g.lineStyle(1.3 * s, INK, 1);
  g.beginPath();
  g.arc(0, -16 * s, 3.2 * s, 0.12 * Math.PI, 0.88 * Math.PI);
  g.strokePath();

  const container = scene.add.container(x, y, [g]);
  if (opts?.label) {
    const t = scene.add
      .text(0, 26 * s, opts.label, {
        fontFamily: "'LXGW WenKai','ZCOOL XiaoWei','Segoe UI',sans-serif",
        fontSize: `${11 * s}px`,
        color: "#f5ead8",
        stroke: "#000000",
        strokeThickness: 3,
      })
      .setOrigin(0.5);
    container.add(t);
  }
  container.setSize(26 * s, 46 * s);
  container.setDepth(10);
  // 翻转控制：翻转 Graphics 本体（眼/嘴镜像），label 文字保持正向
  container.setData("gfx", g);
  return container;
}
