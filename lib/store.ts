"use client";

import { create } from "zustand";
import type {
  GameState,
  PatientScenario,
  PatientState,
  EndingType,
  ChoiceEffect,
  Achievement,
  PatientPalette,
} from "./types";
import {
  createInitialState,
  loadGame,
  saveGame,
  clearSave,
  applyExp,
  expToNextLevel,
  clamp,
  advanceDayState,
  queueTarget,
  MAX_SLOTS,
  REPUTATION_LOSS_PER_ABANDON,
} from "./state/GameState";
import { allPatients } from "./data/patients";
import { AchievementEngine } from "./engine/AchievementEngine";
import { DialogueEngine } from "./engine/DialogueEngine";
import { allSkills, allClinicUpgrades } from "./data/skills";
import { getSound } from "./audio/SoundManager";

export type Scene =
  | "title"
  | "clinic"
  | "dialogue"
  | "skills"
  | "clinic_upgrades"
  | "letters"
  | "tracking"
  | "generator"
  | "achievements";

export interface ToastItem {
  id: number;
  msg: string;
  kind?: "info" | "ok" | "warn";
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
  /** 患者配色，供结局页渲染 chibi 立绘 */
  patientPalette?: PatientPalette;
}

const MAX_GENERATED = 8;

// 递增 ID 计数器（store 单例，模块级即可）
let toastId = 0;
let floatId = 0;

export type SoundName = Parameters<ReturnType<typeof getSound>["play"]>[0];

/** 按 id 查找患者剧本（手写 + 生成） */
function scenarioById(g: GameState, id: string): PatientScenario | undefined {
  return [...allPatients, ...g.generatedScenarios].find((p) => p.id === id);
}

/** 当前可接诊的患者（未完成、未离开、且声望已解锁） */
function serveablePatients(g: GameState): PatientScenario[] {
  return [...allPatients, ...g.generatedScenarios].filter(
    (p) =>
      !g.patientRecords[p.id] &&
      !g.abandoned.includes(p.id) &&
      (p.requireReputation ? g.doctor.reputation >= p.requireReputation : true)
  );
}

export interface GameStore {
  // —— 状态 ——
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
  currentPatient: PatientScenario | null;
  // —— 初始化（App 挂载时调用一次）——
  init: () => void;
  // —— 场景切换 ——
  newGame: (clinicName?: string) => void;
  continueGame: () => void;
  backToTitle: () => void;
  enterClinic: () => void;
  setScene: (s: Scene) => void;
  startSession: (p: PatientScenario) => void;
  // —— 操作 ——
  restOneDay: () => void;
  learnSkill: (id: string) => void;
  buyUpgrade: (id: string) => void;
  generateScenario: (opts: Record<string, unknown>, random: boolean) => void;
  deleteScenario: (id: string) => void;
  saveNow: () => void;
  // —— 会话结算（DialogueScene 调用）——
  finishSession: (
    ending: EndingType,
    title: string,
    text: string,
    reward: ChoiceEffect | undefined,
    patientId: string,
    lastState: PatientState
  ) => void;
  // —— 通知 ——
  toast: (msg: string, kind?: "info" | "ok" | "warn") => void;
  pushFloating: (text: string, kind: string) => void;
  markAllMessagesRead: () => void;
  dismissAchievement: () => void;
  dismissEnding: () => void;
  toggleMute: () => void;
  playSound: (name: SoundName) => void;
  expToNext: (lv: number) => number;
}

export const useGameStore = create<GameStore>((set, get) => {
  /** 提交：持久化 + 触发重渲染（原地修改后用浅拷贝制造新引用） */
  const commit = () => {
    saveGame(get().game);
    set({ game: { ...get().game } });
  };

  const playSound = (name: SoundName) => {
    const s = getSound();
    s.init();
    s.play(name);
  };

  const toast = (msg: string, kind: "info" | "ok" | "warn" = "info") => {
    const id = ++toastId;
    set((st) => ({ toasts: [...st.toasts, { id, msg, kind }] }));
    window.setTimeout(() => {
      set((st) => ({ toasts: st.toasts.filter((x) => x.id !== id) }));
    }, kind === "warn" ? 4200 : 2400);
  };

  const pushFloating = (text: string, kind: string) => {
    const id = ++floatId;
    set((st) => ({ floatingTexts: [...st.floatingTexts, { id, text, kind }] }));
    window.setTimeout(() => {
      set((st) => ({ floatingTexts: st.floatingTexts.filter((x) => x.id !== id) }));
    }, 2100);
  };

  const showAchievement = (a: Achievement) => {
    playSound("achievement");
    set({ achievementToast: a });
    // 传说级给更长的欣赏时间
    const dur = a.rarity === "legendary" ? 5600 : a.rarity === "epic" ? 5000 : 4400;
    window.setTimeout(() => set({ achievementToast: null }), dur);
  };

  /** 补充预约清单：低于目标人数时自动生成新客户加入，并写入通知消息 */
  const replenishQueue = async () => {
    const g = get().game;
    const added: string[] = [];
    while (
      serveablePatients(g).length < queueTarget(g.day) &&
      g.generatedScenarios.length < MAX_GENERATED
    ) {
      const { generateScenario: gen } = await import("./data/generator");
      const s = gen({}, g.doctor.reputation);
      g.generatedScenarios.unshift(s);
      added.push(s.name);
    }
    for (const name of added) {
      g.messages.unshift({
        id: `notice-${g.day}-${name}`,
        kind: "notice",
        title: "新客户预约",
        body: `${name} 预约了心理咨询，已加入今日预约清单。`,
        day: g.day,
        read: false,
        patientName: name,
      });
    }
    commit();
  };

  return {
    // —— 初始状态 ——
    game: createInitialState(),
    scene: "title",
    hydrated: false,
    hasSave: false,
    muted: false,
    toasts: [],
    floatingTexts: [],
    achievementToast: null,
    endingData: null,
    achievementEngine: null,
    currentPatient: null,

    init: () => {
      const eng = new AchievementEngine(get().game, (a) => {
        showAchievement(a);
        commit();
      });
      eng.setDynamicTargets({ allClinicUpgradesCount: allClinicUpgrades.length });
      set({ achievementEngine: eng, hydrated: true, hasSave: loadGame() !== null });
      // 读取静音偏好
      try {
        const m = window.localStorage.getItem("ps.muted") === "1";
        set({ muted: m });
        getSound().setMuted(m);
      } catch {
        /* noop */
      }
    },

    newGame: (clinicName?: string) => {
      clearSave();
      const g = createInitialState();
      if (clinicName && clinicName.trim()) {
        g.clinicName = clinicName.trim();
      }
      get().achievementEngine?.onGameStateSynced(g);
      set({ game: g, scene: "clinic" });
      saveGame(g);
      playSound("page");
    },

    continueGame: () => {
      const s = loadGame();
      if (s) {
        get().achievementEngine?.onGameStateSynced(s);
        set({ game: s, scene: "clinic" });
        playSound("page");
      }
    },

    backToTitle: () => {
      saveGame(get().game);
      set({ hasSave: true, scene: "title" });
      playSound("page");
    },

    enterClinic: () => {
      saveGame(get().game);
      set({ hasSave: true, scene: "clinic" });
    },

    setScene: (s: Scene) => set({ scene: s }),

    startSession: (p: PatientScenario) => {
      const g = get().game;
      if (g.slot >= MAX_SLOTS) {
        toast(`今日已接待 ${g.slot} 位客户，名额已满，请先「休息一日」`, "warn");
        playSound("locked");
        return;
      }
      if (!g.todayServed.includes(p.id)) g.todayServed.push(p.id);
      get().achievementEngine?.onSessionStart();
      set({ currentPatient: p, scene: "dialogue" });
      playSound("veil");
    },

    restOneDay: async () => {
      const g = get().game;
      // 日终：重置名额 + 患者等待天数推进（恶化/放弃）
      const events = advanceDayState(g, serveablePatients(g));
      g.day += 1;
      let base = 15;
      if (g.clinicUpgrades.includes("rest_room")) base += 10;
      g.doctor.sanity = clamp(g.doctor.sanity + base, 0, 100);
      if (g.clinicUpgrades.includes("receptionist")) g.doctor.money += 50;
      commit();
      playSound("rest");
      toast(`休息一日，进入第 ${g.day} 天，理智恢复 +${base}`, "ok");
      // 恶化提醒 / 放弃治疗弹窗 + 写入消息盒子
      for (const e of events) {
        if (e.type === "warn") {
          toast(`⚠ ${e.name} 的病情加重了，再不接诊可能会放弃治疗`, "warn");
          g.messages.unshift({
            id: `warn-${g.day}-${e.name}`,
            kind: "warning",
            title: "病情加重提醒",
            body: `${e.name} 已经等待 ${e.days} 天，病情在持续加重。再不出诊，他/她可能会放弃治疗。`,
            day: g.day,
            read: false,
            patientName: e.name,
          });
        } else if (e.type === "abandon") {
          toast(`❌ ${e.name} 放弃治疗离开了诊所（声望 -${REPUTATION_LOSS_PER_ABANDON}）`, "warn");
          g.messages.unshift({
            id: `abandon-${g.day}-${e.name}`,
            kind: "warning",
            title: "客户流失",
            body: `${e.name} 放弃治疗离开了诊所，声望 -${REPUTATION_LOSS_PER_ABANDON}。追踪档案已结案。`,
            day: g.day,
            read: false,
            patientName: e.name,
          });
        } else if (e.type === "abandonFollowUp") {
          const p = scenarioById(g, e.patientId);
          const name = p?.name ?? e.patientId;
          toast(`❌ ${name} 放弃了复诊（声望 -${REPUTATION_LOSS_PER_ABANDON}）`, "warn");
          g.messages.unshift({
            id: `abandon-followup-${g.day}-${e.patientId}`,
            kind: "warning",
            title: "复诊中断",
            body: `${name} 连续多次错过复诊，放弃了后续治疗。声望 -${REPUTATION_LOSS_PER_ABANDON}。追踪档案已结案。`,
            day: g.day,
            read: false,
            patientName: name,
          });
        }
      }
      // 候诊区补充新患者
      await replenishQueue();
    },

    learnSkill: (id: string) => {
      const g = get().game;
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

    buyUpgrade: (id: string) => {
      const g = get().game;
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

    generateScenario: (opts: Record<string, unknown>, random: boolean) => {
      const g = get().game;
      if (g.generatedScenarios.length >= MAX_GENERATED) {
        toast(`已达上限 ${MAX_GENERATED} 个，请先移除部分剧本`);
        playSound("locked");
        return;
      }
      // 动态导入避免循环
      import("./data/generator").then(({ generateScenario: gen }) => {
        const scenario = gen(random ? {} : opts, g.doctor.reputation);
        g.generatedScenarios.unshift(scenario);
        commit();
        playSound("page");
        toast(`已生成新剧本：${scenario.name}（${scenario.difficulty}）`);
      });
    },

    deleteScenario: (id: string) => {
      const g = get().game;
      g.generatedScenarios = g.generatedScenarios.filter((x) => x.id !== id);
      commit();
      toast("已移除该剧本");
    },

    saveNow: () => {
      saveGame(get().game);
      set({ hasSave: true });
      toast("游戏已保存");
      playSound("click");
    },

    finishSession: (
      ending: EndingType,
      title: string,
      text: string,
      reward: ChoiceEffect | undefined,
      patientId: string,
      lastState: PatientState
    ) => {
      const g = get().game;
      // 应用奖励
      let leveledUp = false;
      if (reward) {
        if (reward.doctorReputation)
          g.doctor.reputation = clamp(g.doctor.reputation + reward.doctorReputation, 0, 100);
        if (reward.doctorSanity)
          g.doctor.sanity = clamp(g.doctor.sanity + reward.doctorSanity, 0, 100);
        if (reward.doctorMoney) g.doctor.money += reward.doctorMoney;
      }
      // 升级结算：会话期间 DialogueEngine 已把经验累加到 doctor.exp，
      // 无论结局奖励是否带 exp，都必须统一结算（修复经验满不自动升级）
      {
        const r = applyExp(g.doctor, reward?.doctorExp ?? 0);
        g.doctor = r.stats;
        leveledUp = r.leveledUp;
      }
      // 记录结局
      g.patientRecords[patientId] = ending;
      if (get().currentPatient) {
        const letter = DialogueEngine.generateLetter(
          get().currentPatient!,
          ending,
          g.day
        );
        if (!g.messages.find((l) => l.id === letter.id)) g.messages.unshift(letter);
      }
      // 时间系统：接诊一位，消耗一个当日名额；天只随「休息」推进
      g.slot += 1;
      // 成就
      get().achievementEngine?.onSessionEnd(ending, patientId, lastState);
      get().achievementEngine?.onGameStateSynced(g);
      commit();
      // 音效
      if (leveledUp) playSound("levelUp");
      if (ending === "cure" || ending === "awakening" || ending === "acceptance")
        playSound("endingGood");
      else if (ending === "tragic" || ending === "worsen") playSound("endingBad");
      else playSound("endingNeutral");
      set({
        endingData: {
          ending,
          title,
          text,
          reward,
          patientName: get().currentPatient?.name,
          patientPalette: get().currentPatient?.palette,
        },
      });
      // 每接诊 2 位，候诊区补充一位新患者
      if (g.slot % 2 === 0) void replenishQueue();
    },

    markAllMessagesRead: () => {
      const g = get().game;
      if (g.messages.some((m) => !m.read)) {
        g.messages = g.messages.map((m) => ({ ...m, read: true }));
        commit();
      }
    },

    dismissAchievement: () => set({ achievementToast: null }),
    dismissEnding: () => set({ endingData: null, currentPatient: null, scene: "clinic" }),

    toggleMute: () => {
      const nm = !get().muted;
      getSound().setMuted(nm);
      try {
        window.localStorage.setItem("ps.muted", nm ? "1" : "0");
      } catch {
        /* noop */
      }
      set({ muted: nm });
    },

    playSound,
    toast,
    pushFloating,
    expToNext: expToNextLevel,
  };
});
