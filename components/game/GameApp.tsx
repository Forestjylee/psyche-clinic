"use client";

import { useEffect, useRef } from "react";
import { useGame } from "@/lib/hooks/useGame";
import { getSound } from "@/lib/audio/SoundManager";
import { HUD } from "./HUD";
import { BottomBar } from "./BottomBar";
import { Overlays } from "./Overlays";
import { EndingOverlay } from "./EndingOverlay";
import { AchievementUnlockToast } from "./AchievementUnlockToast";
import { TitleScreen } from "./TitleScreen";
import { ClinicHallScene } from "./ClinicHallScene";
import { DialogueScene } from "./DialogueScene";
import { ClinicUpgrades } from "./ClinicUpgrades";
import { MessageBox } from "./MessageBox";
import { Tracking } from "./Tracking";
import { DiscoveryScene } from "./DiscoveryScene";
import { AchievementsPage } from "./AchievementsPage";
import { PatientArchive } from "./PatientArchive";
import { Onboarding } from "./Onboarding";
import { Prologue } from "./Prologue";
import { VisitOverlay } from "./VisitOverlay";
import { RestDreamOverlay } from "./RestDreamOverlay";

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
      <BottomBar />
      <main id="app" key={scene} className="scene-root" data-scene={scene}>
        {scene === "title" ? <TitleScreen /> : null}
        {scene === "clinic" ? <ClinicHallScene /> : null}
        {scene === "dialogue" ? <DialogueScene /> : null}
        {scene === "clinic_upgrades" ? <ClinicUpgrades /> : null}
        {scene === "letters" ? <MessageBox /> : null}
        {scene === "tracking" ? <Tracking /> : null}
        {scene === "discover" ? <DiscoveryScene /> : null}
        {scene === "achievements" ? <AchievementsPage /> : null}
        {scene === "archive" ? <PatientArchive /> : null}
      </main>
      <div className={`sanity-vignette ${scene !== "title" && game.doctor.sanity <= 35 ? "active" : ""}`} />
      {scene === "clinic" && prologueVisible && !game.prologuePassed ? <Prologue /> : null}
      {scene === "clinic" && !prologueVisible ? <Onboarding /> : null}
      {currentReturnPatient ? <VisitOverlay /> : null}
      <Overlays />
      <EndingOverlay />
      <RestDreamOverlay />
      <AchievementUnlockToast />
    </>
  );
}
