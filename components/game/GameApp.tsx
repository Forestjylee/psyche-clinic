"use client";

import { useEffect, useRef } from "react";
import { useGame } from "@/lib/hooks/useGame";
import { getSound } from "@/lib/audio/SoundManager";
import { HUD } from "./HUD";
import { Overlays } from "./Overlays";
import { EndingOverlay } from "./EndingOverlay";
import { AchievementUnlockToast } from "./AchievementUnlockToast";
import { TitleScreen } from "./TitleScreen";
import { ClinicHallScene } from "./ClinicHallScene";
import { DialogueScene } from "./DialogueScene";
import { SkillsTree } from "./SkillsTree";
import { ClinicUpgrades } from "./ClinicUpgrades";
import { MessageBox } from "./MessageBox";
import { Tracking } from "./Tracking";
import { Generator } from "./Generator";
import { DiscoveryScene } from "./DiscoveryScene";
import { AchievementsPage } from "./AchievementsPage";
import { Onboarding } from "./Onboarding";
import { Prologue } from "./Prologue";
import { VisitOverlay } from "./VisitOverlay";

export function GameApp() {
  const { scene, game, prologueVisible, currentReturnPatient } = useGame();
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
        {scene === "clinic" ? <ClinicHallScene /> : null}
        {scene === "dialogue" ? <DialogueScene /> : null}
        {scene === "skills" ? <SkillsTree /> : null}
        {scene === "clinic_upgrades" ? <ClinicUpgrades /> : null}
        {scene === "letters" ? <MessageBox /> : null}
        {scene === "tracking" ? <Tracking /> : null}
        {scene === "generator" ? <Generator /> : null}
        {scene === "discover" ? <DiscoveryScene /> : null}
        {scene === "achievements" ? <AchievementsPage /> : null}
      </main>
      <div className={`sanity-vignette ${scene !== "title" && game.doctor.sanity <= 35 ? "active" : ""}`} />
      {scene === "clinic" && prologueVisible ? <Prologue /> : null}
      {scene === "clinic" && !prologueVisible ? <Onboarding /> : null}
      {currentReturnPatient ? <VisitOverlay /> : null}
      <Overlays />
      <EndingOverlay />
      <AchievementUnlockToast />
    </>
  );
}
