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
