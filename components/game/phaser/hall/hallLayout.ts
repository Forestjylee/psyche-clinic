/** 大厅布局数据（逻辑分辨率 960×540，Scale.FIT 适配视口） */
export const HALL_LAYOUT = {
  width: 960,
  height: 540,
  doctorStart: { x: 480, y: 470 },
  zones: {
    waiting: { label: "候诊区", x: 150, y: 210 },
    frontDesk: { label: "前台", x: 480, y: 130 },
    clinicDoor: { label: "诊室", x: 820, y: 250 },
    restDoor: { label: "休息室", x: 820, y: 430 },
    garden: { label: "花园", x: 130, y: 440 },
  },
  /** 候诊患者卡尺寸（含头像/姓名/等待天数/状态语） */
  patientCard: { width: 176, height: 108 },
  /** 候诊位（3 张横排，卡片中心坐标；卡片间不互相遮挡、不超屏） */
  waitingSeats: [
    { x: 120, y: 210 },
    { x: 304, y: 210 },
    { x: 488, y: 210 },
  ],
} as const;
