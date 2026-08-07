import Phaser from "phaser";
import { bridge, EVENTS } from "@/lib/bridge/EventBridge";
import type { MoveToEvent } from "@/lib/bridge/types";
import { drawWoodFloor } from "../draw/floor";
import { createCharacter, DOCTOR_PALETTE } from "../draw/SmallCharacter";
import { HALL_LAYOUT } from "./hallLayout";

/** 大厅场景：木地板 + 分区装饰 + 医生小人点选导航 */
export class HallScene extends Phaser.Scene {
  private doctor!: Phaser.GameObjects.Container;
  private tween: Phaser.Tweens.Tween | null = null;

  constructor() {
    super("Hall");
  }

  create(): void {
    const w = this.scale.width;
    const h = this.scale.height;
    drawWoodFloor(this, w, h);
    this.drawZones();
    this.drawDecor();

    this.doctor = createCharacter(
      this,
      HALL_LAYOUT.doctorStart.x,
      HALL_LAYOUT.doctorStart.y,
      DOCTOR_PALETTE,
      { label: "你" }
    );

    // 点地面 → 医生走过去
    this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      this.moveDoctor(pointer.x, pointer.y);
    });

    bridge.on(EVENTS.moveTo, this.handleMoveTo);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      bridge.off(EVENTS.moveTo, this.handleMoveTo);
    });

    bridge.emit(EVENTS.sceneReady, { scene: "hall" });
  }

  private handleMoveTo = (e: MoveToEvent): void => {
    this.moveDoctor(e.x, e.y);
  };

  private moveDoctor(x: number, y: number): void {
    if (this.tween) this.tween.destroy();
    const gfx = this.doctor.getData("gfx") as Phaser.GameObjects.Graphics;
    gfx.setScale(x < this.doctor.x ? -1 : 1, 1);
    const dist = Phaser.Math.Distance.Between(
      this.doctor.x,
      this.doctor.y,
      x,
      y
    );
    const dur = Phaser.Math.Clamp(dist * 2.5, 400, 1500);
    this.tween = this.tweens.add({
      targets: this.doctor,
      x,
      y,
      duration: dur,
      ease: "Sine.easeInOut",
      onComplete: () => {
        bridge.emit(EVENTS.doctorArrived, { x, y });
      },
    });
  }

  private drawZones(): void {
    const g = this.add.graphics();
    g.lineStyle(2, 0x000000, 0.18);
    g.strokeRoundedRect(40, 90, 420, 360, 12); // 候诊+前台大区
    g.strokeRoundedRect(720, 150, 200, 330, 12); // 房间区（诊室/休息室）
    g.strokeRoundedRect(40, 460, 880, 40, 8); // 底部通道
    g.setDepth(1);

    for (const zone of Object.values(HALL_LAYOUT.zones)) {
      this.add
        .text(zone.x, zone.y, zone.label, {
          fontFamily: "'LXGW WenKai','ZCOOL XiaoWei','Segoe UI',sans-serif",
          fontSize: "13px",
          color: "#d9c7a8",
          stroke: "#000000",
          strokeThickness: 2,
        })
        .setOrigin(0.5)
        .setDepth(2);
    }
  }

  private drawDecor(): void {
    const g = this.add.graphics();
    // 前台接待台
    g.fillStyle(0x7a5433, 1);
    g.fillRoundedRect(440, 90, 80, 30, 6);
    g.fillStyle(0x9a6f46, 1);
    g.fillRoundedRect(440, 84, 80, 8, 3);
    // 候诊椅 × 3
    for (let i = 0; i < 3; i++) {
      g.fillStyle(0x5b8a6a, 1);
      g.fillRoundedRect(120 + i * 90, 180, 60, 24, 6);
      g.fillStyle(0x4a7357, 1);
      g.fillRoundedRect(120 + i * 90, 204, 60, 6, 3);
    }
    // 门（诊室 / 休息室）
    g.fillStyle(0x4a3526, 1);
    g.fillRect(750, 210, 40, 80); // 诊室门
    g.fillRect(750, 380, 40, 80); // 休息室门
    g.fillStyle(0xd9b380, 1);
    g.fillCircle(782, 250, 4);
    g.fillCircle(782, 420, 4);
    // 花盆（花园）
    g.fillStyle(0x8a5a3b, 1);
    g.fillRoundedRect(80, 400, 40, 34, 4);
    g.fillStyle(0x6a8f5a, 1);
    g.fillCircle(100, 388, 16);
    g.setDepth(2);
  }
}
