/** React ↔ Phaser 桥接事件载荷类型（SPEC §5 事件表） */

export interface MoveToEvent {
  x: number;
  y: number;
}

export interface PatientEnterEvent {
  id: string;
  seat: number;
}

export interface OpenClinicEvent {
  patientId: string;
}

export interface SyncFacilitiesEvent {
  facilities: unknown[];
}

export interface SceneReadyEvent {
  scene: "hall" | "clinic";
}

export interface PatientClickedEvent {
  id: string;
}

export interface FacilityClickedEvent {
  id: string;
}

/** 装修模式落格：设施 id + 新位置（逻辑坐标） */
export interface FacilityDroppedEvent {
  id: string;
  x: number;
  y: number;
}

/** 装修模式落格：花/画装饰 id + 新位置（逻辑坐标） */
export interface DecorDroppedEvent {
  id: string;
  x: number;
  y: number;
}

/** 候诊患者变更：通知 Phaser 刷新候诊小人 */
export interface RefreshPatientsEvent {
  ids: string[];
}

export interface DoctorArrivedEvent {
  x: number;
  y: number;
}

export interface DoorClickedEvent {
  to: string;
}

export interface PatientMoveDoneEvent {
  id: string;
}

export interface DecorateModeEvent {
  on: boolean;
}

/** 首启引导自动打开预约清单（空载荷：三个 spotlight 目标均在清单弹层内） */
export interface OpenAppointmentListEvent {}
