/** EventBridge：React ↔ Phaser 事件总线（单例）
 *  - React → Phaser：emit 指令（moveTo / openClinicScene / decorateMode …）
 *  - Phaser → React：emit 交互（patientClicked / sceneReady / doctorArrived …）
 * 铁律：Phaser 不直接改 zustand，交互一律经桥通知 React 层调 store action。
 */

export const EVENTS = {
  // React → Phaser 指令
  moveTo: "moveTo",
  patientEnter: "patientEnter",
  openClinicScene: "openClinicScene",
  backToHall: "backToHall",
  decorateMode: "decorateMode",
  syncFacilities: "syncFacilities",
  refreshPatients: "refreshPatients",
  // Phaser → React 交互
  sceneReady: "sceneReady",
  patientClicked: "patientClicked",
  facilityClicked: "facilityClicked",
  facilityDropped: "facilityDropped",
  doctorArrived: "doctorArrived",
  doorClicked: "doorClicked",
  patientMoveDone: "patientMoveDone",
} as const;

type Handler<T> = (payload: T) => void;

class Bridge {
  private map = new Map<string, Set<Handler<unknown>>>();

  /** 订阅事件，返回取消订阅函数 */
  on<T>(event: string, fn: Handler<T>): () => void {
    if (!this.map.has(event)) this.map.set(event, new Set());
    this.map.get(event)!.add(fn as Handler<unknown>);
    return () => this.off(event, fn);
  }

  off<T>(event: string, fn: Handler<T>): void {
    this.map.get(event)?.delete(fn as Handler<unknown>);
  }

  emit<T>(event: string, payload: T): void {
    this.map.get(event)?.forEach((fn) => fn(payload));
  }
}

export const bridge = new Bridge();
