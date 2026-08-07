import Phaser from "phaser";
import { HallScene } from "./hall/HallScene";

/** 创建唯一 Phaser.Game 实例（单 canvas，大厅/诊室都是其 scene） */
export function createGame(parent: HTMLElement): Phaser.Game {
  return new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    width: 960,
    height: 540,
    backgroundColor: "#241a12",
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [HallScene],
    render: { antialias: true },
  });
}
