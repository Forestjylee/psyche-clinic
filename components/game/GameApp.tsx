"use client";

import { useEffect, useRef } from "react";
import { useGame } from "@/lib/hooks/useGame";
import { getSound } from "@/lib/audio/SoundManager";
import { HUD } from "./HUD";
import { Overlays } from "./Overlays";
import { EndingOverlay } from "./EndingOverlay";
import { AchievementUnlockToast } from "./AchievementUnlockToast";
import { TitleScreen } from "./TitleScreen";
import { ClinicHall } from "./ClinicHall";
import { DialogueScene } from "./DialogueScene";
import { SkillsTree } from "./SkillsTree";
import { ClinicUpgrades } from "./ClinicUpgrades";
import { Letters } from "./Letters";
import { Generator } from "./Generator";
import { AchievementsPage } from "./AchievementsPage";

export function GameApp() {
  const { scene, game } = useGame();
  const bgmStarted = useRef(false);

  // 首次用户交互后启动 BGM（浏览器策略要求）
  useEffect(() => {
    const start = () => {
      if (bgmStarted.current) return;
      const s = getSound();
      s.init();
      s.startBgm();
      bgmStarted.current = true;
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
    };
    window.addEventListener("pointerdown", start);
    window.addEventListener("keydown", start);
    return () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
    };
  }, []);

  // 理智影响 BGM 氛围
  useEffect(() => {
    getSound().setTension(game.doctor.sanity);
  }, [game.doctor.sanity]);

  return (
    <>
      <HUD />
      <main id="app" key={scene} className="scene-root">
        {scene === "title" ? <TitleScreen /> : null}
        {scene === "clinic" ? <ClinicHall /> : null}
        {scene === "dialogue" ? <DialogueScene /> : null}
        {scene === "skills" ? <SkillsTree /> : null}
        {scene === "clinic_upgrades" ? <ClinicUpgrades /> : null}
        {scene === "letters" ? <Letters /> : null}
        {scene === "generator" ? <Generator /> : null}
        {scene === "achievements" ? <AchievementsPage /> : null}
      </main>
      <div className={`sanity-vignette ${scene !== "title" && game.doctor.sanity <= 35 ? "active" : ""}`} />
      <Overlays />
      <EndingOverlay />
      <AchievementUnlockToast />
    </>
  );
}
