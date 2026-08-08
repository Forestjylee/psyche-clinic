import Phaser from "phaser";
import { bridge, EVENTS } from "@/lib/bridge/EventBridge";
import { CLINIC_LAYOUT } from "./clinicLayout";

/** 诊室配色（治愈系纸木质感，与大厅 TIER_STYLE / 纸木底一致） */
const C = {
  wall: 0xfff3df, // 暖米色墙
  floor: 0xcf9f6d, // 木地板
  floorLine: 0xb58652, // 板缝
  trim: 0xe8cfa4, // 踢脚线
  ink: 0x7a5f2a, // 暖棕描边
  inkDeep: 0x4a3526, // 深墨（鞋）
  frameWood: 0x8a6a3f, // 窗框/画框木色
  glass: 0xe8f2f5, // 玻璃
  sun: 0xfff2c8, // 透光暖阳
  carpet: 0xf0c48f, // 地毯
  carpetBorder: 0xc9a86a,
  cushion: 0xf2cf9c, // 坐垫
  coat: 0xf2efe9, // 白袍
  hair: 0x8a5a3b, // 医生发色
  skin: 0xf0d8b8, // 暖肤色
  inkFace: 0x2b2118, // 面部墨线
  blush: 0xe86a78, // 腮红
} as const;

/** 诊室场景：对话场景化专用，自画房间铺满 960×540（透明画布需自画背景）。
 *  只画房间 + 医生坐像；患者立绘由 React ChibiCharacter 在 P2-3 按
 *  CLINIC_LAYOUT.patientPos 叠加。本任务不加交互、不订阅事件。 */
export class ClinicScene extends Phaser.Scene {
  constructor() {
    super("Clinic");
  }

  create(): void {
    this.drawRoom();
    this.drawPainting();
    this.drawWindow();
    this.drawCarpet();
    // 患者椅（P2-3 患者立绘在 React 覆盖层叠加，这里只画椅子）
    this.drawChair(CLINIC_LAYOUT.patientPos.x, true);
    // 医生椅 + 坐像（先椅后像，坐像压椅）
    this.drawChair(CLINIC_LAYOUT.doctorPos.x, false);
    this.drawDoctor(CLINIC_LAYOUT.doctorPos.x, CLINIC_LAYOUT.doctorPos.y);

    bridge.emit(EVENTS.sceneReady, { scene: "clinic" });
  }

  // ================= 房间 =================

  /** 墙（全屏米色）+ 地板（下半，分界线略斜）+ 板缝 + 踢脚线 */
  private drawRoom(): void {
    const wall = this.add.graphics();
    wall.fillStyle(C.wall, 1);
    wall.fillRect(0, 0, 960, 540);

    // 地板（分界线从左上斜向右下，手绘感）
    const floor = this.add.graphics();
    floor.fillStyle(C.floor, 1);
    floor.beginPath();
    floor.moveTo(0, 344);
    floor.lineTo(960, 326);
    floor.lineTo(960, 540);
    floor.lineTo(0, 540);
    floor.closePath();
    floor.fillPath();
    // 板缝（斜向，呼应分界线）
    floor.lineStyle(1, C.floorLine, 0.5);
    for (const y of [364, 398, 434, 472, 512]) {
      floor.lineBetween(0, y, 960, y - 18);
    }

    // 踢脚线（压住墙/地接缝）
    const trim = this.add.graphics();
    trim.fillStyle(C.trim, 1);
    trim.fillRect(0, 330, 960, 18);
    trim.lineStyle(2, C.ink, 0.35);
    trim.lineBetween(0, 330, 960, 330);
  }

  /** 右上窗：木框 + 玻璃 + 井字框 + 暖阳 + 窗台 */
  private drawWindow(): void {
    const g = this.add.graphics();
    const wx = 700;
    const wy = 56;
    const ww = 196;
    const wh = 150;
    // 窗洞透光
    g.fillStyle(C.sun, 1);
    g.fillRoundedRect(wx, wy, ww, wh, 8);
    // 玻璃
    g.fillStyle(C.glass, 0.92);
    g.fillRoundedRect(wx + 10, wy + 10, ww - 20, wh - 20, 4);
    // 阳光
    g.fillStyle(0xfff7d8, 0.5);
    g.fillCircle(wx + ww - 44, wy + 42, 28);
    // 井字窗框
    g.lineStyle(5, C.frameWood, 1);
    g.strokeRoundedRect(wx, wy, ww, wh, 8);
    g.lineStyle(4, C.frameWood, 1);
    g.lineBetween(wx + ww / 2, wy + 8, wx + ww / 2, wy + wh - 8);
    g.lineBetween(wx + 8, wy + wh / 2, wx + ww - 8, wy + wh / 2);
    // 窗台
    g.fillStyle(C.frameWood, 1);
    g.fillRoundedRect(wx - 8, wy + wh, ww + 16, 12, 5);
    g.lineStyle(2, C.ink, 0.5);
    g.strokeRoundedRect(wx - 8, wy + wh, ww + 16, 12, 5);
  }

  /** 左上挂画：木框 + 暖色小景（天空/太阳/山丘） */
  private drawPainting(): void {
    const g = this.add.graphics();
    const px = 88;
    const py = 64;
    const pw = 132;
    const ph = 104;
    g.fillStyle(C.frameWood, 1);
    g.fillRoundedRect(px, py, pw, ph, 8);
    g.lineStyle(2, C.ink, 0.5);
    g.strokeRoundedRect(px, py, pw, ph, 8);
    // 画布
    g.fillStyle(0xf8ecd4, 1);
    g.fillRoundedRect(px + 8, py + 8, pw - 16, ph - 16, 4);
    // 太阳
    g.fillStyle(0xffd98a, 1);
    g.fillCircle(px + pw - 40, py + 34, 14);
    g.fillStyle(0xd9a86a, 1);
    g.fillCircle(px + pw - 40, py + 34, 10);
    // 山丘
    g.fillStyle(0xb9a06a, 1);
    g.fillEllipse(px + pw / 2, py + ph - 22, pw - 30, 42);
  }

  /** 医患之间的暖色圆角地毯 */
  private drawCarpet(): void {
    const g = this.add.graphics();
    const cx = 480;
    const cy = 452;
    const cw = 340;
    const ch = 108;
    g.fillStyle(C.carpet, 1);
    g.fillRoundedRect(cx - cw / 2, cy - ch / 2, cw, ch, 28);
    g.lineStyle(3, C.carpetBorder, 1);
    g.strokeRoundedRect(cx - cw / 2, cy - ch / 2, cw, ch, 28);
    // 内圈装饰线
    g.lineStyle(2, C.carpetBorder, 0.5);
    g.strokeRoundedRect(
      cx - cw / 2 + 16,
      cy - ch / 2 + 16,
      cw - 32,
      ch - 32,
      18
    );
  }

  /** 椅子：靠背 + 坐垫 + 腿；患者侧更宽软和（体现被照顾） */
  private drawChair(cx: number, softer: boolean): void {
    const g = this.add.graphics();
    const w = softer ? 112 : 94;
    const seatY = 458;
    const backH = softer ? 120 : 108;
    // 靠背
    g.fillStyle(C.frameWood, 1);
    g.fillRoundedRect(cx - w / 2, seatY - backH, w, backH, 14);
    g.lineStyle(2, C.ink, 0.5);
    g.strokeRoundedRect(cx - w / 2, seatY - backH, w, backH, 14);
    // 坐垫
    g.fillStyle(C.cushion, 1);
    g.fillRoundedRect(cx - w / 2 - 4, seatY - 16, w + 8, 18, 9);
    g.lineStyle(2, C.ink, 0.5);
    g.strokeRoundedRect(cx - w / 2 - 4, seatY - 16, w + 8, 18, 9);
    // 腿
    g.fillStyle(C.frameWood, 1);
    g.fillRoundedRect(cx - w / 2 + 6, seatY + 2, 12, 26, 5);
    g.fillRoundedRect(cx + w / 2 - 18, seatY + 2, 12, 26, 5);
  }

  // ================= 医生坐像 =================

  /** 医生坐像（程序绘制，画法对齐 HallScene.drawAvatar：圆头+深墨眼嘴+腮红；
   *  静态无动画，P2-3 前保持）。cy=CLINIC_LAYOUT.doctorPos.y。 */
  private drawDoctor(cx: number, cy: number): void {
    const g = this.add.graphics();
    // 鞋/小腿（垂在椅前）
    g.fillStyle(C.inkDeep, 1);
    g.fillRoundedRect(cx - 26, cy + 28, 20, 30, 6);
    g.fillRoundedRect(cx + 6, cy + 28, 20, 30, 6);
    // 大腿（坐姿裙摆）
    g.fillStyle(C.coat, 1);
    g.fillRoundedRect(cx - 34, cy + 4, 68, 32, 12);
    // 躯干（白袍）
    g.fillStyle(C.coat, 1);
    g.fillRoundedRect(cx - 30, cy - 36, 60, 58, 16);
    g.lineStyle(2, C.ink, 0.6);
    g.strokeRoundedRect(cx - 30, cy - 36, 60, 58, 16);
    // V 领（毛衣内衬色）
    g.fillStyle(0xe4dcd0, 1);
    g.fillTriangle(cx, cy - 12, cx - 14, cy + 12, cx + 14, cy + 12);
    // 手臂（垂放）
    g.fillStyle(C.coat, 1);
    g.fillRoundedRect(cx - 40, cy - 24, 16, 40, 8);
    g.fillRoundedRect(cx + 24, cy - 24, 16, 40, 8);
    // 头（全脸肤色，先画确保五官底色）
    g.fillStyle(C.skin, 1);
    g.fillCircle(cx, cy - 52, 22);
    // 发（帽盖/月牙：半圆盖顶，脸全露；发线最底 cy-48，五官在 cy-44 以下）
    g.fillStyle(C.hair, 1);
    g.beginPath();
    g.arc(cx, cy - 52, 22, Math.PI, Math.PI * 2, false);
    g.fillPath();
    // 额前短刘海（压线但不遮眼）+ 两侧发鬓
    g.fillRoundedRect(cx - 15, cy - 55, 30, 7, 4);
    g.fillRoundedRect(cx - 24, cy - 52, 7, 12, 3);
    g.fillRoundedRect(cx + 17, cy - 52, 7, 12, 3);
    // 眼
    g.fillStyle(C.inkFace, 1);
    g.fillCircle(cx - 8, cy - 44, 2);
    g.fillCircle(cx + 8, cy - 44, 2);
    // 腮红
    g.fillStyle(C.blush, 0.35);
    g.fillCircle(cx - 16, cy - 37, 3.4);
    g.fillCircle(cx + 16, cy - 37, 3.4);
    // 微笑嘴
    g.lineStyle(2, C.inkFace, 1);
    g.beginPath();
    g.arc(cx, cy - 35, 5, 0.15 * Math.PI, 0.85 * Math.PI);
    g.strokePath();
  }
}
