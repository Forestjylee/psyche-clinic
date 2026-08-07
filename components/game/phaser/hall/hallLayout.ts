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
} as const;
