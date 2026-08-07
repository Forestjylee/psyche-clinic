import Phaser from "phaser";
import { bridge, EVENTS } from "@/lib/bridge/EventBridge";
import type {
  MoveToEvent,
  SyncFacilitiesEvent,
  DecorateModeEvent,
} from "@/lib/bridge/types";
import { drawFacility, facilityDefById } from "../draw/Furniture";
import { useGameStore } from "@/lib/store";
import type { PatientScenario } from "@/lib/types";
import { allPatients } from "@/lib/data/patients";
import { HALL_LAYOUT } from "./hallLayout";

/** 候诊名牌位（3 张，横排于候诊区；名牌可点击开诊） */
const WAITING_SEATS = [120, 210, 300].map((x) => ({ x, y: 205 }));

/** 大厅场景：背景由 CSS 层全屏提供，画布透明；
 *  这里只画设施（可点击/装修拖动）与候诊患者名牌（可点击开诊）。
 *  不再绘制医生/患者小人（用户决策：彻底移除小人，回归治愈系插画背景）。 */
export class HallScene extends Phaser.Scene {
  private facilities: Phaser.GameObjects.Container[] = [];
  private waitBadges: Phaser.GameObjects.Container[] = [];
  private decorateMode = false;
  /** 正在拖动的设施（装修模式） */
  private dragging: Phaser.GameObjects.Container | null = null;
  /** 拖动前原始位置（用于未落格时还原） */
  private dragFrom = { x: 0, y: 0 };

  constructor() {
    super("Hall");
  }

  create(): void {
    // 背景由 CSS 层（#app[data-scene]）全屏提供，画布透明，这里只画交互元素
    this.redrawFacilities();
    this.redrawWaitingBadges();

    // 装修模式拖动（按住设施拖动，松手落格）
    this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
      if (this.decorateMode && this.dragging) {
        this.dragging.setPosition(pointer.x, pointer.y);
      }
    });
    this.input.on("pointerup", () => {
      if (this.dragging) {
        this.dropDragged();
        this.dragging = null;
      }
    });

    bridge.on(EVENTS.moveTo, this.handleMoveTo);
    bridge.on(EVENTS.syncFacilities, this.handleSyncFacilities);
    bridge.on(EVENTS.decorateMode, this.handleDecorateMode);
    bridge.on(EVENTS.refreshPatients, this.handleRefreshPatients);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      bridge.off(EVENTS.moveTo, this.handleMoveTo);
      bridge.off(EVENTS.syncFacilities, this.handleSyncFacilities);
      bridge.off(EVENTS.decorateMode, this.handleDecorateMode);
      bridge.off(EVENTS.refreshPatients, this.handleRefreshPatients);
    });

    bridge.emit(EVENTS.sceneReady, { scene: "hall" });
  }

  // ================= 事件处理 =================

  /** 场景存活守卫：GameCanvas 卸载销毁 Game 后，残留的 bridge listener 不应再操作已销毁的场景 */
  private isAlive(): boolean {
    return this.sys.isActive() && this.scene.isActive();
  }

  /** 医生已移除，moveTo 指令不再有小人可移动；保留监听以忽略残留事件（防抖） */
  private handleMoveTo = (_e: MoveToEvent): void => {
    // 无医生小人，忽略
  };

  private handleSyncFacilities = (_e: SyncFacilitiesEvent): void => {
    if (!this.isAlive()) return;
    this.redrawFacilities();
  };

  private handleDecorateMode = (e: DecorateModeEvent): void => {
    if (!this.isAlive()) return;
    this.decorateMode = e.on;
    this.facilities.forEach((c) => c.setAlpha(e.on ? 0.55 : 1));
    if (!e.on) {
      this.dragging = null;
    }
  };

  private handleRefreshPatients = (): void => {
    if (!this.isAlive()) return;
    this.redrawWaitingBadges();
  };

  // ================= 候诊患者名牌（取代小人） =================

  /** 从 store 只读计算候诊患者（未完成/未放弃/声望解锁/今日未接诊） */
  private waitingList(): PatientScenario[] {
    const g = useGameStore.getState().game;
    return [...allPatients, ...g.generatedScenarios]
      .filter(
        (p) =>
          !g.patientRecords[p.id] &&
          !g.abandoned.includes(p.id) &&
          !g.todayServed.includes(p.id) &&
          (p.requireReputation
            ? g.doctor.reputation >= p.requireReputation
            : true)
      )
      .slice(0, WAITING_SEATS.length);
  }

  /** 候诊区绘制「名牌」：暖色纸卡 + 姓名 + 情绪点，点击开诊（保留 point-and-click 交互，不画小人） */
  private redrawWaitingBadges(): void {
    this.waitBadges.forEach((c) => c.destroy());
    this.waitBadges = [];
    const list = this.waitingList();
    list.forEach((p, i) => {
      const seat = WAITING_SEATS[i];
      const c = this.drawBadge(p, seat.x, seat.y);
      c.setData("patientId", p.id);
      c.setInteractive(
        new Phaser.Geom.Rectangle(-46, -26, 92, 52),
        Phaser.Geom.Rectangle.Contains
      );
      c.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
        pointer.event.stopPropagation();
        bridge.emit(EVENTS.patientClicked, { id: p.id });
      });
      // 进场动画：淡入上浮
      c.setAlpha(0);
      this.tweens.add({
        targets: c,
        y: seat.y,
        alpha: 1,
        duration: 450,
        ease: "Sine.easeOut",
        delay: 120 * i,
        onComplete: () => {
          bridge.emit(EVENTS.patientMoveDone, { id: p.id });
        },
      });
      this.waitBadges.push(c);
    });
  }

  /** 画一张暖色名牌：纸卡 + 姓名 + 情绪点（治愈手绘风，深描边保证可读） */
  private drawBadge(
    p: PatientScenario,
    x: number,
    y: number
  ): Phaser.GameObjects.Container {
    const g = this.add.graphics();
    // 纸卡底（米色圆角 + 描边）
    g.fillStyle(0xfffaf0, 0.96);
    g.fillRoundedRect(-44, -24, 88, 42, 10);
    g.lineStyle(2, 0xc9a86a, 1);
    g.strokeRoundedRect(-44, -24, 88, 42, 10);
    // 情绪点（左上小圆点，暖色）
    g.fillStyle(0xf0a050, 1);
    g.fillCircle(-34, -13, 4);
    const container = this.add.container(x, y, [g]);

    const primary = p.palette.primary.replace("#", "");
    const name = this.add
      .text(0, -8, p.name, {
        fontFamily: "'LXGW WenKai','ZCOOL XiaoWei','Segoe UI',sans-serif",
        fontSize: "16px",
        color: `#${primary}`,
        stroke: "#ffffff",
        strokeThickness: 3,
      })
      .setOrigin(0.5);
    const hint = this.add
      .text(0, 12, "点击开诊", {
        fontFamily: "'LXGW WenKai','ZCOOL XiaoWei','Segoe UI',sans-serif",
        fontSize: "10px",
        color: "#8a7a61",
      })
      .setOrigin(0.5);
    container.add([name, hint]);
    container.setDepth(6);
    return container;
  }

  // ================= 设施 =================

  /** 从 store 读取已购置设施并按自定义/默认位置绘制 */
  private redrawFacilities(): void {
    this.facilities.forEach((c) => c.destroy());
    this.facilities = [];
    const g = useGameStore.getState().game;
    for (const upId of g.clinicUpgrades) {
      const def = facilityDefById(upId);
      if (!def) continue;
      const pos =
        g.facilityPositions[upId] ?? {
          x: def.defaultPos.x,
          y: def.defaultPos.y,
        };
      const c = drawFacility(this, def, pos.x, pos.y);
      this.facilities.push(c);
      this.attachFacilityClick(c, def.id);
    }
  }

  private attachFacilityClick(
    c: Phaser.GameObjects.Container,
    id: string
  ): void {
    c.setInteractive(
      new Phaser.Geom.Rectangle(
        -c.getData("defW") / 2,
        -c.getData("defH") / 2,
        c.getData("defW"),
        c.getData("defH")
      ),
      Phaser.Geom.Rectangle.Contains
    );
    c.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      // 装修模式：按下即开始拖动（落格由 pointerup 统一处理）
      if (this.decorateMode) {
        pointer.event.stopPropagation();
        this.dragging = c;
        this.dragFrom = { x: c.x, y: c.y };
        c.setDepth(30);
        return;
      }
      // 正常模式：点击设施 → 通知 React 打开升级面板
      pointer.event.stopPropagation();
      bridge.emit(EVENTS.facilityClicked, { id });
    });
  }

  private dropDragged(): void {
    const c = this.dragging;
    if (!c) return;
    c.setDepth(5);
    const w = c.getData("defW") as number;
    const h = c.getData("defH") as number;
    // 落格：吸附到网格中心（逻辑分辨率 960×540，tile 48px 对齐场景内 40..920）
    const snap = 24;
    let nx = Math.round(c.x / snap) * snap;
    let ny = Math.round(c.y / snap) * snap;
    nx = Phaser.Math.Clamp(nx, 24, 936);
    ny = Phaser.Math.Clamp(ny, 24, 516);
    // 简单碰撞：避开医生出生区与房间门区（视觉优先，不做完整 A*）
    if (this.collidesFacility(nx, ny, w, h, c)) {
      // 冲突则回到拖动前位置
      nx = this.dragFrom.x;
      ny = this.dragFrom.y;
    }
    c.setPosition(nx, ny);
    // 通知 React：持久化位置（走 store action，Phaser 不直接改）
    const id = c.getData("facilityId") as string;
    bridge.emit(EVENTS.facilityDropped, { id, x: nx, y: ny });
  }

  /** 简单碰撞：与房间门/花盆/出生点重叠则视为冲突 */
  private collidesFacility(
    nx: number,
    ny: number,
    w: number,
    h: number,
    self: Phaser.GameObjects.Container
  ): boolean {
    const rectA = new Phaser.Geom.Rectangle(nx - w / 2, ny - h / 2, w, h);
    // 与其它已购置设施重叠
    for (const other of this.facilities) {
      if (other === self) continue;
      const ow = other.getData("defW") as number;
      const oh = other.getData("defH") as number;
      const rectB = new Phaser.Geom.Rectangle(
        other.x - ow / 2,
        other.y - oh / 2,
        ow,
        oh
      );
      if (Phaser.Geom.Rectangle.Overlaps(rectA, rectB)) return true;
    }
    // 诊室门 / 休息室门附近
    const doors: [number, number, number, number][] = [
      [750, 210, 40, 80],
      [750, 380, 40, 80],
    ];
    for (const [dx, dy, dw, dh] of doors) {
      const rectB = new Phaser.Geom.Rectangle(dx, dy, dw, dh);
      if (Phaser.Geom.Rectangle.Overlaps(rectA, rectB)) return true;
    }
    // 医生出生区已随小人移除，但保留该区域为禁区（可摆放设施避开前台走廊）
    const start = HALL_LAYOUT.doctorStart;
    const rectB = new Phaser.Geom.Rectangle(
      start.x - 24,
      start.y - 24,
      48,
      48
    );
    return Phaser.Geom.Rectangle.Overlaps(rectA, rectB);
  }
}
