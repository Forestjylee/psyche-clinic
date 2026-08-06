"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type {
  GameState,
  PatientScenario,
  PatientState,
  EndingType,
  ChoiceEffect,
  Achievement,
  DialogueChoice,
} from "../types";
import {
  createInitialState,
  loadGame,
  saveGame,
  clearSave,
  applyExp,
  expToNextLevel,
  clamp,
} from "../state/GameState";
import { AchievementEngine } from "../engine/AchievementEngine";
import { DialogueEngine } from "../engine/DialogueEngine";
import { allSkills, allClinicUpgrades } from "../data/skills";
import { getSound } from "../audio/SoundManager";

export type Scene =
  | "title"
  | "clinic"
  | "dialogue"
  | "skills"
  | "clinic_upgrades"
  | "letters"
  | "generator"
  | "achievements";

export interface ToastItem {
  id: number;
  msg: string;
}
export interface FloatingItem {
  id: number;
  text: string;
  kind: string;
}
export interface EndingData {
  ending: EndingType;
  title: string;
  text: string;
  reward?: ChoiceEffect;
  patientName?: string;
}

interface GameContextValue {
  game: GameState;
  scene: Scene;
  hydrated: boolean;
  hasSave: boolean;
  muted: boolean;
  toasts: ToastItem[];
  floatingTexts: FloatingItem[];
  achievementToast: Achievement | null;
  endingData: EndingData | null;
  achievementEngine: AchievementEngine | null;
  // 场景切换
  newGame: () => void;
  continueGame: () => void;
  backToTitle: () => void;
  enterClinic: () => void;
  setScene: (s: Scene) => void;
  startSession: (p: PatientScenario) => void;
  currentPatient: PatientScenario | null;
  // 操作
  restOneDay: () => void;
  learnSkill: (id: string) => void;
  buyUpgrade: (id: string) => void;
  generateScenario: (opts: Record<string, unknown>, random: boolean) => void;
  deleteScenario: (id: string) => void;
  saveNow: () => void;
  // 会话结算（DialogueScene 调用）
  finishSession: (
    ending: EndingType,
    title: string,
    text: string,
    reward: ChoiceEffect | undefined,
    patientId: string,
    lastState: PatientState
  ) => void;
  // 通知
  toast: (msg: string) => void;
  pushFloating: (text: string, kind: string) => void;
  dismissAchievement: () => void;
  dismissEnding: () => void;
  toggleMute: () => void;
  playSound: (name: Parameters<ReturnType<typeof getSound>["play"]>[0]) => void;
  expToNext: (lv: number) => number;
}

const GameContext = createContext<GameContextValue | null>(null);

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}

const MAX_GENERATED = 8;

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [game, setGame] = useState<GameState>(createInitialState);
  const [scene, setSceneState] = useState<Scene>("title");
  const [hydrated, setHydrated] = useState(false);
  const [hasSave, setHasSave] = useState(false);
  const [muted, setMuted] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [floatingTexts, setFloatingTexts] = useState<FloatingItem[]>([]);
  const [achievementToast, setAchievementToast] = useState<Achievement | null>(null);
  const [endingData, setEndingData] = useState<EndingData | null>(null);
  const [currentPatient, setCurrentPatient] = useState<PatientScenario | null>(null);

  const gameRef = useRef<GameState>(game);
  const achRef = useRef<AchievementEngine | null>(null);
  const toastId = useRef(0);
  const floatId = useRef(0);

  // 提交：持久化 + 触发重渲染
  const commit = useCallback(() => {
    saveGame(gameRef.current);
    setGame({ ...gameRef.current });
  }, []);

  const playSound = useCallback(
    (name: Parameters<ReturnType<typeof getSound>["play"]>[0]) => {
      const s = getSound();
      s.init();
      s.play(name);
    },
    []
  );

  const toast = useCallback((msg: string) => {
    const id = ++toastId.current;
    setToasts((t) => [...t, { id, msg }]);
    window.setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 2400);
  }, []);

  const pushFloating = useCallback((text: string, kind: string) => {
    const id = ++floatId.current;
    setFloatingTexts((f) => [...f, { id, text, kind }]);
    window.setTimeout(() => {
      setFloatingTexts((f) => f.filter((x) => x.id !== id));
    }, 1500);
  }, []);

  const showAchievement = useCallback(
    (a: Achievement) => {
      playSound("achievement");
      setAchievementToast(a);
      // 传说级给更长的欣赏时间
      const dur = a.rarity === "legendary" ? 5600 : a.rarity === "epic" ? 5000 : 4400;
      window.setTimeout(() => setAchievementToast(null), dur);
    },
    [playSound]
  );

  // 初始化成就引擎（仅一次）
  useEffect(() => {
    const eng = new AchievementEngine(gameRef.current, (a) => {
      showAchievement(a);
      commit();
    });
    eng.setDynamicTargets({ allClinicUpgradesCount: allClinicUpgrades.length });
    achRef.current = eng;
    setHydrated(true);
    setHasSave(loadGame() !== null);
    // 读取静音偏好
    try {
      const m = window.localStorage.getItem("ps.muted") === "1";
      setMuted(m);
      getSound().setMuted(m);
    } catch {
      /* noop */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setScene = useCallback((s: Scene) => {
    setSceneState(s);
  }, []);

  const newGame = useCallback(() => {
    clearSave();
    gameRef.current = createInitialState();
    setGame({ ...gameRef.current });
    achRef.current?.onGameStateSynced(gameRef.current);
    setSceneState("clinic");
    saveGame(gameRef.current);
    playSound("page");
  }, [playSound]);

  const continueGame = useCallback(() => {
    const s = loadGame();
    if (s) {
      gameRef.current = s;
      setGame({ ...gameRef.current });
      achRef.current?.onGameStateSynced(gameRef.current);
      setSceneState("clinic");
      playSound("page");
    }
  }, [playSound]);

  const backToTitle = useCallback(() => {
    saveGame(gameRef.current);
    setHasSave(true);
    setSceneState("title");
    playSound("page");
  }, [playSound]);

  const enterClinic = useCallback(() => {
    saveGame(gameRef.current);
    setHasSave(true);
    setSceneState("clinic");
  }, []);

  const startSession = useCallback(
    (p: PatientScenario) => {
      setCurrentPatient(p);
      achRef.current?.onSessionStart();
      setSceneState("dialogue");
      playSound("veil");
    },
    [playSound]
  );

  const restOneDay = useCallback(() => {
    const g = gameRef.current;
    g.day += 1;
    let base = 15;
    if (g.clinicUpgrades.includes("rest_room")) base += 10;
    g.doctor.sanity = clamp(g.doctor.sanity + base, 0, 100);
    if (g.clinicUpgrades.includes("receptionist")) g.doctor.money += 50;
    commit();
    playSound("rest");
    toast(`休息一日，理智恢复 +${base}`);
  }, [commit, playSound, toast]);

  const learnSkill = useCallback(
    (id: string) => {
      const g = gameRef.current;
      const skill = allSkills.find((s) => s.id === id);
      if (!skill) return;
      if (g.doctor.exp >= skill.cost) {
        g.doctor.exp -= skill.cost;
        g.skills.push(skill.id);
        commit();
        playSound("click");
        toast(`习得技能：${skill.name}`);
      }
    },
    [commit, playSound, toast]
  );

  const buyUpgrade = useCallback(
    (id: string) => {
      const g = gameRef.current;
      const up = allClinicUpgrades.find((u) => u.id === id);
      if (!up) return;
      if (g.doctor.money >= up.cost) {
        g.doctor.money -= up.cost;
        g.clinicUpgrades.push(up.id);
        commit();
        playSound("click");
        toast(`已购置：${up.name}`);
      }
    },
    [commit, playSound, toast]
  );

  const generateScenario = useCallback(
    (opts: Record<string, unknown>, random: boolean) => {
      const g = gameRef.current;
      if (g.generatedScenarios.length >= MAX_GENERATED) {
        toast(`已达上限 ${MAX_GENERATED} 个，请先移除部分剧本`);
        playSound("locked");
        return;
      }
      // 动态导入避免循环
      import("../data/generator").then(({ generateScenario: gen }) => {
        const scenario = gen(random ? {} : opts, g.doctor.reputation);
        g.generatedScenarios.unshift(scenario);
        commit();
        playSound("page");
        toast(`已生成新剧本：${scenario.name}（${scenario.difficulty}）`);
      });
    },
    [commit, playSound, toast]
  );

  const deleteScenario = useCallback(
    (id: string) => {
      gameRef.current.generatedScenarios = gameRef.current.generatedScenarios.filter(
        (x) => x.id !== id
      );
      commit();
      toast("已移除该剧本");
    },
    [commit, toast]
  );

  const saveNow = useCallback(() => {
    saveGame(gameRef.current);
    setHasSave(true);
    toast("游戏已保存");
    playSound("click");
  }, [playSound, toast]);

  const finishSession = useCallback(
    (
      ending: EndingType,
      title: string,
      text: string,
      reward: ChoiceEffect | undefined,
      patientId: string,
      lastState: PatientState
    ) => {
      const g = gameRef.current;
      // 应用奖励
      let leveledUp = false;
      if (reward) {
        if (reward.doctorReputation)
          g.doctor.reputation = clamp(g.doctor.reputation + reward.doctorReputation, 0, 100);
        if (reward.doctorSanity)
          g.doctor.sanity = clamp(g.doctor.sanity + reward.doctorSanity, 0, 100);
        if (reward.doctorMoney) g.doctor.money += reward.doctorMoney;
        if (reward.doctorExp) {
          const r = applyExp(g.doctor, reward.doctorExp);
          g.doctor = r.stats;
          leveledUp = r.leveledUp;
        }
      }
      // 记录结局
      g.patientRecords[patientId] = ending;
      if (currentPatient) {
        const letter = DialogueEngine.generateLetter(currentPatient, ending, g.day);
        if (!g.letters.find((l) => l.id === letter.id)) g.letters.unshift(letter);
      }
      g.day += 1;
      // 成就
      achRef.current?.onSessionEnd(ending, patientId, lastState);
      achRef.current?.onGameStateSynced(g);
      commit();
      // 音效
      if (leveledUp) playSound("levelUp");
      if (ending === "cure" || ending === "awakening" || ending === "acceptance")
        playSound("endingGood");
      else if (ending === "tragic" || ending === "worsen") playSound("endingBad");
      else playSound("endingNeutral");
      setEndingData({ ending, title, text, reward, patientName: currentPatient?.name });
    },
    [commit, currentPatient, playSound]
  );

  const dismissAchievement = useCallback(() => setAchievementToast(null), []);
  const dismissEnding = useCallback(() => {
    setEndingData(null);
    setCurrentPatient(null);
    setSceneState("clinic");
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      const nm = !m;
      getSound().setMuted(nm);
      try {
        window.localStorage.setItem("ps.muted", nm ? "1" : "0");
      } catch {
        /* noop */
      }
      return nm;
    });
  }, []);

  const value: GameContextValue = {
    game,
    scene,
    hydrated,
    hasSave,
    muted,
    toasts,
    floatingTexts,
    achievementToast,
    endingData,
    achievementEngine: achRef.current,
    currentPatient,
    newGame,
    continueGame,
    backToTitle,
    enterClinic,
    setScene,
    startSession,
    restOneDay,
    learnSkill,
    buyUpgrade,
    generateScenario,
    deleteScenario,
    saveNow,
    finishSession,
    toast,
    pushFloating,
    dismissAchievement,
    dismissEnding,
    toggleMute,
    playSound,
    expToNext: expToNextLevel,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

// 供 DialogueScene 使用的类型：会话内回调
export interface SessionHooks {
  onChoiceMade?: (choice: DialogueChoice) => void;
  onComboTrigger?: (count: number) => void;
  onStateUpdate?: (state: PatientState) => void;
}
