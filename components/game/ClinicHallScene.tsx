"use client";

import { ClinicHall } from "./ClinicHall";

/** 首页壳（全 React，SPEC §15 v1.4.0）：
 *  预约清单本体直放首页，无 Phaser 大厅画布、无「预约清单」弹层、无升级浮层。
 *  升级面板由底部栏进入独立 scene（scene="clinic_upgrades"）。 */
export function ClinicHallScene() {
  return (
    <div className="clinic-scene-root">
      <ClinicHall />
    </div>
  );
}
