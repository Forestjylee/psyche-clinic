import Phaser from "phaser";
import { HallScene } from "./hall/HallScene";

/** 创建唯一 Phaser.Game 实例（单 canvas，大厅/诊室都是其 scene）
 *  画布透明：场景背景由 CSS 层（#app[data-scene]）全屏 cover 提供，
 *  医生/患者/设施等交互元素叠画在透明画布上（开罗式悬浮交互）。 */
export function createGame(parent: HTMLElement): Phaser.Game {
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
    scene: [HallScene],
    render: { antialias: true },
  });
}
