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
import {
  waitTier,
  waitingDaysLabel,
  waitingPhrase,
  type WaitTier,
} from "./waitingInfo";

/** 卡片字体（全卡统一） */
const FONT = "'LXGW WenKai','ZCOOL XiaoWei','Segoe UI',sans-serif";

/** 等待天数分级配色（等待天数 pill 底色/边框 + pill 文字 + 状态语颜色） */
const TIER_STYLE: Record<
  WaitTier,
  { pillFill: number; pillBorder: number; pillText: string; phraseColor: string }
> = {
  calm: {
    pillFill: 0xf6e3b8,
    pillBorder: 0xc9a86a,
    pillText: "#7a5f2a",
    phraseColor: "#6a5c48",
  },
  decaying: {
    pillFill: 0xf6c890,
    pillBorder: 0xd98a3a,
    pillText: "#7a4a1a",
    phraseColor: "#a06a2a",
  },
  critical: {
    pillFill: 0xf0b8ae,
    pillBorder: 0xd05a4a,
    pillText: "#8a2a20",
    phraseColor: "#b04838",
  },
};

/** 大厅场景：背景由 CSS 层全屏提供，画布透明；
 *  这里只画设施（可点击/装修拖动）与候诊患者卡（可点击开诊）。
 *  不再绘制医生/患者小人（用户决策：彻底移除小人，回归治愈系插画背景）。 */
export class HallScene extends Phaser.Scene {
  private facilities: Phaser.GameObjects.Container[] = [];
  private waitCards: Phaser.GameObjects.Container[] = [];
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
    this.redrawWaitingCards();

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
    this.redrawWaitingCards();
  };

  // ================= 候诊患者卡（取代小人） =================

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
      .slice(0, HALL_LAYOUT.waitingSeats.length);
  }

  /** 候诊区绘制「患者卡」（取代旧名牌），点击开诊（保留 point-and-click 交互，不画小人） */
  private redrawWaitingCards(): void {
    this.waitCards.forEach((c) => c.destroy());
    this.waitCards = [];
    const { width: cardW, height: cardH } = HALL_LAYOUT.patientCard;
    const list = this.waitingList();
    list.forEach((p, i) => {
      const seat = HALL_LAYOUT.waitingSeats[i];
      const c = this.drawPatientCard(p, seat.x, seat.y);
      c.setData("patientId", p.id);
      c.setInteractive(
        new Phaser.Geom.Rectangle(-cardW / 2, -cardH / 2, cardW, cardH),
        Phaser.Geom.Rectangle.Contains
      );
      c.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
        pointer.event.stopPropagation();
        bridge.emit(EVENTS.patientClicked, { id: p.id });
      });
      // 进场动画：淡入上浮
      c.setAlpha(0);
      c.setY(seat.y + 14);
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
      this.waitCards.push(c);
    });
  }

  /** 只读取患者等待天数（接诊当日记 0，未接诊每天 +1） */
  private waitingDaysOf(id: string): number {
    return useGameStore.getState().game.waitingDays[id] ?? 0;
  }

  /** 画一张候诊「患者卡」：头像 + 姓名 + 等待天数 + 动态状态语（治愈手绘风，深描边保证可读） */
  private drawPatientCard(
    p: PatientScenario,
    x: number,
    y: number
  ): Phaser.GameObjects.Container {
    const { width: cardW, height: cardH } = HALL_LAYOUT.patientCard;
    const w2 = cardW / 2;
    const h2 = cardH / 2;
    const days = this.waitingDaysOf(p.id);
    const tier = waitTier(days);
    const style = TIER_STYLE[tier];
    const primary = p.palette.primary.replace("#", "");

    // 纸卡底（米色圆角 + 深描边）
    const g = this.add.graphics();
    g.fillStyle(0xfffaf0, 0.96);
    g.fillRoundedRect(-w2, -h2, cardW, cardH, 14);
    g.lineStyle(2, 0xc9a86a, 1);
    g.strokeRoundedRect(-w2, -h2, cardW, cardH, 14);

    const container = this.add.container(x, y, [g]);

    // 头像（程序化小脸，颜色取 palette，表情随等待分级变化）
    container.add(this.drawAvatar(p, tier));

    // 姓名
    const name = this.add
      .text(6, -36, p.name, {
        fontFamily: FONT,
        fontSize: "15px",
        color: `#${primary}`,
        stroke: "#ffffff",
        strokeThickness: 3,
      })
      .setOrigin(0, 0.5);

    // 等待天数（分级色 pill：calm 暖纸 / decaying 橙 / critical 红）
    const daysText = this.add
      .text(6, -12, waitingDaysLabel(days), {
        fontFamily: FONT,
        fontSize: "10px",
        color: style.pillText,
      })
      .setOrigin(0, 0.5);
    const pill = this.add.graphics();
    pill.fillStyle(style.pillFill, 1);
    pill.lineStyle(1, style.pillBorder, 1);
    const pw = daysText.width + 16;
    const ph = 17;
    pill.fillRoundedRect(6, -12 - ph / 2, pw, ph, 9);
    pill.strokeRoundedRect(6, -12 - ph / 2, pw, ph, 9);

    // 动态状态语（观察性、中性句式，随等待天数分级换档）
    const status = this.add
      .text(6, 8, waitingPhrase(p, days), {
        fontFamily: FONT,
        fontSize: "10px",
        color: style.phraseColor,
        stroke: "#ffffff",
        strokeThickness: 2,
      })
      .setOrigin(0, 0);

    // 开诊提示（点击链路：pointerdown → bridge.emit(EVENTS.patientClicked)）
    const hint = this.add
      .text(w2 - 8, h2 - 12, "点击开诊", {
        fontFamily: FONT,
        fontSize: "9px",
        color: "#8a7a61",
      })
      .setOrigin(1, 0);

    container.add([pill, daysText, name, status, hint]);
    container.setDepth(6);
    return container;
  }

  /** 程序化绘制患者小头像：圆形大头 + 眼/嘴/腮红，颜色取 palette（画风对齐 ChibiCharacter） */
  private drawAvatar(
    p: PatientScenario,
    tier: WaitTier
  ): Phaser.GameObjects.Graphics {
    const g = this.add.graphics();
    const cx = -46;
    const cy = -6;
    const r = 23;
    const face = parseInt(p.palette.primary.replace("#", ""), 16);
    const ink = 0x1e140a; // 眼/嘴深描边色（同 ChibiCharacter 面部）
    // 头部：palette 主色圆 + 白色内描边高光 + 底部暗弧立体感
    g.fillStyle(face, 1);
    g.fillCircle(cx, cy, r);
    g.lineStyle(2, 0xffffff, 0.5);
    g.strokeCircle(cx, cy, r - 2);
    g.fillStyle(0xffffff, 0.3);
    g.fillCircle(cx - r * 0.36, cy - r * 0.4, r * 0.28);
    g.lineStyle(3, 0x000000, 0.16);
    g.beginPath();
    g.arc(cx, cy, r - 3, Math.PI * 0.15, Math.PI * 0.85, false);
    g.strokePath();
    // 眼睛：calm 圆眼，decaying 略小，critical 闭眼（困倦）
    if (tier === "critical") {
      g.lineStyle(1.6, ink, 1);
      g.lineBetween(cx - 8, cy + 1, cx - 4, cy + 1);
      g.lineBetween(cx + 4, cy + 1, cx + 8, cy + 1);
    } else {
      g.fillStyle(ink, 1);
      const er = tier === "decaying" ? 1.8 : 2.2;
      g.fillCircle(cx - 6, cy + 1, er);
      g.fillCircle(cx + 6, cy + 1, er);
    }
    // 腮红（同 ChibiCharacter cheeks）
    g.fillStyle(0xe86a78, 0.35);
    g.fillCircle(cx - 12, cy + 8, 3);
    g.fillCircle(cx + 12, cy + 8, 3);
    // 嘴：calm 微笑，decaying 平线，critical 愁容
    g.lineStyle(1.6, ink, 1);
    if (tier === "calm") {
      g.beginPath();
      g.arc(cx, cy + 9, 4, 0, Math.PI, false);
      g.strokePath();
    } else if (tier === "decaying") {
      g.lineBetween(cx - 3, cy + 9, cx + 3, cy + 9);
    } else {
      g.beginPath();
      g.arc(cx, cy + 9, 4, Math.PI, Math.PI * 2, false);
      g.strokePath();
    }
    return g;
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
