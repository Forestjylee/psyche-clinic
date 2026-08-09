/** 诊室逻辑坐标布局（960×540，Phaser 绘制与 React 覆盖层共享的唯一坐标源） */
export const CLINIC_LAYOUT = {
  width: 960,
  height: 540,
  /** 医生坐像中心（左） */
  doctorPos: { x: 210, y: 400 },
  /** 患者立绘中心（右）——React ChibiCharacter 定位用（P2-3） */
  patientPos: { x: 750, y: 400 },
  /** 气泡锚点中心（P2-3 DOM 气泡定位用，逻辑坐标）。
   *  v1.4.0：y 250→190 上移到场景上部，避让底部候选选项区（max-height 34%），防遮挡 */
  bubbleAnchor: {
    doctor: { x: 300, y: 190 },
    /* 患者气泡加宽后右缘更靠立绘，锚点左移到 580 使加宽后的气泡完整落在舞台内（移动端 300px 宽）
      而不向右溢出；tail 仍在右侧指向立绘方向 */
    patient: { x: 580, y: 190 },
  },
} as const;
