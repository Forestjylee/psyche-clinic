import Phaser from "phaser";
import { HallScene } from "./hall/HallScene";

/** 创建唯一 Phaser.Game 实例（单 canvas，可注册多场景：大厅/诊室……）
 *  画布透明：场景背景由 CSS 层（#app[data-scene]）全屏 cover 提供（诊室除外——
 *  ClinicScene 自画房间铺满画布），交互元素叠画在透明画布上（开罗式悬浮交互）。
 *  @param scenes 场景列表，默认 [HallScene]（保持大厅现状）。 */
export function createGame(
  parent: HTMLElement,
  /** 场景列表（类或实例均可），默认 [HallScene]（保持大厅现状）。 */
  scenes: Phaser.Types.Scenes.SceneType[] = [HallScene]
): Phaser.Game {
  return new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    width: 960,
    height: 540,
    backgroundColor: "#00000000", // 全透明，露出 CSS 背景层
    transparent: true,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: scenes,
    render: { antialias: true },
  });
}
