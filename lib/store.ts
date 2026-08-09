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
  PendingArrival,
  ActiveSession,
  GameMessage,
  PrologueChoice,
} from "./types";
import {
  createInitialState,
  loadGame,
  saveGame,
  clearSave,
  saveGameToSlot,
  loadGameFromSlot,
  deleteSaveSlot,
  listSaveSlots,
  nextSaveSlotId,
  migrateLegacySaveToSlot,
  applyExp,
  expToNextLevel,
  clamp,
  advanceDayState,
  todayCapacity,
  queueTarget,
  replenishArrivals,
  REPUTATION_LOSS_PER_ABANDON,
  RETURN_VISIT_DELAY,
  resolveDueReturns,
  resolveDueTreatmentVisits,
  firstSessionDone,
  clampFirstSessionEnding,
} from "./state/GameState";
import {
  loadUser,
  registerUser,
  hasUser,
  ensureNicknameRegistered,
  clearUser as clearStoredUser,
} from "./state/Storage";
import type { SaveSlotMeta, UserProfile, RegisterOutcome } from "./state/Storage";
import { allPatients, GUIDED_PATIENT_ID } from "./data/patients";
import { AchievementEngine } from "./engine/AchievementEngine";
import { DialogueEngine } from "./engine/DialogueEngine";
import { pickReturnVisitPatient } from "./engine/returnVisit";
import { allClinicUpgrades } from "./data/clinicUpgrades";
import {
  decorById,
  flowerForPatient,
  pictureForFragment,
} from "./data/decor";
import { getAchievementLetter } from "./data/achievementLetters";
import { bridge, EVENTS } from "./bridge/EventBridge";
import {
  discoveryChannels,
  inviteAcceptRate,
  arrivalDayOffset,
} from "./data/discovery";
import { getSound } from "./audio/SoundManager";

export type Scene =
  | "title"
  | "clinic"
  | "dialogue"
  | "clinic_upgrades"
  | "letters"
  | "tracking"
  | "achievements"
  | "discover"
  | "archive";

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
  /** 患者表象描述（叙事式真相复盘用；为空则复盘块整块隐藏） */
  patientSurface?: string;
  /** 患者 id（记忆碎片集齐等后续功能预留） */
  patientId?: string;
}

// 递增 ID 计数器（store 单例，模块级即可）
let toastId = 0;
let floatId = 0;

export type SoundName = Parameters<ReturnType<typeof getSound>["play"]>[0];

/** 按 id 查找患者剧本（手写池） */
export function scenarioById(
  _g: GameState,
  id: string
): PatientScenario | undefined {
  return allPatients.find((p) => p.id === id);
}

/** 当前可接诊的患者（未完成、未离开、且声望已解锁） */
function serveablePatients(g: GameState): PatientScenario[] {
  return allPatients.filter(
    (p) =>
      !g.patientRecords[p.id] &&
      !g.abandoned.includes(p.id) &&
      (p.requireReputation ? g.doctor.reputation >= p.requireReputation : true)
  );
}

/** P5-3：本次会话是否为危机接诊（患者等待≥4天），startSession 记录、finishSession 结算用 */
let lastSessionCritical = false;

export interface GameStore {
  // —— 状态 ——
  game: GameState;
  scene: Scene;
  hydrated: boolean;
  hasSave: boolean;
  /** 当前激活的存档槽位 id（新游戏分配、继续游戏选定；null = 未在档） */
  activeSlotId: string | null;
  /** 所有存档槽位元信息（TitleScreen 存档列表用） */
  saveSlots: SaveSlotMeta[];
  /** 当前本地账号（未注册为 null） */
  currentUser: UserProfile | null;
  muted: boolean;
  toasts: ToastItem[];
  floatingTexts: FloatingItem[];
  achievementToast: Achievement | null;
  endingData: EndingData | null;
  achievementEngine: AchievementEngine | null;
  currentPatient: PatientScenario | null;
  /** 当前正在回访探望的患者（非治疗） */
  currentReturnPatient: PatientScenario | null;
  /** 新游戏进入大厅时展示序章浮层 */
  prologueVisible: boolean;
  /** P5-3 归零梦境：结算归零置 pending，结局页关闭时转 visible（瞬时状态，不落盘） */
  restDreamPending: boolean;
  /** P5-3 归零梦境：当前是否展示梦境 overlay（瞬时状态，不落盘） */
  restDreamVisible: boolean;
  // —— 初始化（App 挂载时调用一次）——
  init: () => void;
  // —— 账号（本地轻量：昵称 + 自动生成用户 ID，区分不同用户存档）——
  register: (name: string) => RegisterOutcome;
  clearUser: () => void;
  // —— 存档槽位 ——
  /** 开始新游戏：分配新槽（slotId 缺省）或覆盖指定槽；成功后进入 clinic */
  newGame: (clinicName?: string, slotId?: string) => void;
  /** 继续游戏：从指定槽读取存档进入 */
  continueGame: (slotId: string) => void;
  /** 删除指定槽位 */
  deleteSlot: (slotId: string) => void;
  // —— 场景切换 ——
  backToTitle: () => void;
  enterClinic: () => void;
  setScene: (s: Scene) => void;
  startSession: (p: PatientScenario) => void;
  // —— 操作 ——
  restOneDay: () => void;
  /** P5-3 花园待一会：每日一次理智 +5（温柔恢复渠道） */
  spendTimeInGarden: () => void;
  /** P5-3 归零梦境收尾：梦里见到帮助过的人，醒后理智部分恢复 */
  dismissRestDream: () => void;
  buyUpgrade: (id: string) => void;
  /** 装修模式：保存设施摆放位置（仅视觉） */
  setFacilityPosition: (id: string, x: number, y: number) => void;
  /** 装修（P5-1）：设置设施外观变体（"" = 恢复默认），同步 Phaser 重绘 */
  setFacilityDecor: (upgradeId: string, variantId: string) => void;
  /** 装修（P5-1）：摆放/收起一个花或画装饰 */
  toggleDecor: (decorId: string) => void;
  /** 装修（P5-1）：保存花/画摆放位置（拖动落格） */
  setDecorPosition: (decorId: string, x: number, y: number) => void;
  // —— 发现客户 ——
  discover: (channelId: string) => void;
  invite: (candidateId: string) => void;
  discardCandidate: (candidateId: string) => void;
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
  /** 治疗分期复诊（节拍断拍）：节拍边界结束，患者离开诊室，1~3 天后复诊到访。
   *  记录下一节拍恢复点（resumeNode + 患者状态 + 已触发碎片），消耗当日名额，回大厅。 */
  completeBeat: (
    patientId: string,
    resumeNode: string,
    lastState: PatientState,
    triggeredMemories: string[]
  ) => void;
  // —— 会话断点（P2-8）——
  /** 对话进行中持续更新草稿到 game.activeSession（仅草稿，随 saveGame 落盘） */
  syncSessionDraft: (session: ActiveSession) => void;
  /** 暂停并保存断点：写入 game + saveGame + 回大厅 */
  pauseSession: () => void;
  // —— 患者档案图鉴（P3）——
  /** 记忆碎片解锁落库：把 fragmentId 记入 game.unlockedFragments[patientId]（已存在则跳过） */
  unlockFragment: (patientId: string, fragmentId: string) => void;
  // —— 通知 ——
  toast: (msg: string, kind?: "info" | "ok" | "warn") => void;
  pushFloating: (text: string, kind: string) => void;
  markAllMessagesRead: () => void;
  dismissAchievement: () => void;
  dismissEnding: () => void;
  toggleMute: () => void;
  playSound: (name: SoundName) => void;
  expToNext: (lv: number) => number;
  /** 序章开场选择：记录「离开城市的原因」到 game.prologueChoice（P4-1，仅叙事） */
  choosePrologue: (choice: PrologueChoice) => void;
  /** 关闭序章；传入 letter 时按既有去重模式把开局信落进消息盒子 */
  dismissPrologue: (letter?: GameMessage) => void;
  // —— 治愈回访 ——
  openReturnVisit: (patientId: string) => void;
  finishReturnVisit: () => void;
}

export const useGameStore = create<GameStore>((set, get) => {
  /** 刷新存档槽位列表（TitleScreen / 删除后同步） */
  const refreshSaveSlots = () => set({ saveSlots: listSaveSlots() });

  /** 提交：持久化到当前槽 + 触发重渲染（原地修改后用浅拷贝制造新引用） */
  const commit = () => {
    const slotId = get().activeSlotId;
    const g = get().game;
    if (slotId) {
      saveGameToSlot(slotId, g, get().currentUser ?? undefined);
    } else {
      saveGame(g); // 未进槽（如 init 阶段成就回调）回退旧单档，不丢
    }
    set({ game: { ...g } });
  };

  const playSound = (name: SoundName) => {
    const s = getSound();
    s.init();
    s.play(name);
  };

  const toast = (msg: string, kind: "info" | "ok" | "warn" = "info") => {
    const id = ++toastId;
    set((st) => ({ toasts: [...st.toasts, { id, msg, kind }] }));
    setTimeout(() => {
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

  /** P5-5 情感化奖励发放（成就解锁时由 onUnlock 回调调用） */
  const applyAchievementUnlock = (a: Achievement) => {
    const unlock = a.reward?.unlock;
    if (!unlock) return;
    const g = get().game;
    // 1) 纪念信：查表 → 去重 → unshift 进消息盒
    if (unlock.letter) {
      const L = getAchievementLetter(unlock.letter);
      if (L && !g.messages.find((m) => m.id === L.id)) {
        g.messages.unshift({
          id: L.id,
          kind: "letter",
          title: L.title,
          body: L.body,
          day: g.day,
          read: false,
          patientName: L.patientName,
          tone: L.tone,
        });
        toast(`收到一封来信：「${L.title}」`, "ok");
      }
    }
    // 2) 纪念物：幂等解锁并摆放（对齐 P5-1 挂画钩子模式）
    if (unlock.decor) {
      const d = decorById(unlock.decor);
      if (d && d.kind === "flower") {
        if (!g.unlockedDecors) g.unlockedDecors = [];
        if (!g.placedDecors) g.placedDecors = [];
        if (!g.decorPositions) g.decorPositions = {};
        if (!g.unlockedDecors.includes(d.id)) {
          g.unlockedDecors.push(d.id);
          if (!g.placedDecors.includes(d.id)) g.placedDecors.push(d.id);
          if (!g.decorPositions[d.id] && d.defaultPos) {
            g.decorPositions[d.id] = { ...d.defaultPos };
          }
          toast(`诊室里多了一件纪念：「${d.name}」。`, "ok");
        }
      }
    }
    // 3) 记忆碎片：走 unlockFragment 通路（内含 P5-1 挂画钩子 + toast + commit）
    if (unlock.fragment) {
      get().unlockFragment(unlock.fragment.patientId, unlock.fragment.fragmentId);
    }
    // 4) 特殊回访：从已治愈/接纳/觉醒且无待办回访的患者中动态选一位（unlock.returnVisit==="auto"），
    //    安排一次额外探望；无候选静默跳过。患者 id 直选仅兼容旧数据。
    if (unlock.returnVisit) {
      const pid =
        unlock.returnVisit === "auto"
          ? pickReturnVisitPatient(g)
          : unlock.returnVisit;
      if (pid) {
        const rec = g.patientRecords[pid];
        if (rec === "cure" || rec === "acceptance" || rec === "awakening") {
          const existing = g.returnVisits[pid];
          if (!existing || existing.seen) {
            g.returnVisits[pid] = {
              ending: rec,
              dueDay: g.day + 1,
              arrived: false,
              seen: false,
            };
            const p = scenarioById(g, pid);
            toast(`收到消息：${p?.name ?? "一位故人"}想再来看看你。`, "ok");
          }
        }
      }
    }
  };

  /** 补充预约清单：已到达候诊的手写患者数低于目标时，按难度分桶随机补足新到达患者，并写入通知消息 */
  const replenishQueue = () => {
    const g = get().game;
    const arrivals = replenishArrivals(g);
    for (const id of arrivals) {
      g.arrivedPatients.push(id);
    }
    for (const id of arrivals) {
      const p = allPatients.find((x) => x.id === id);
      g.messages.unshift({
        id: `arrive-${g.day}-${id}`,
        kind: "notice",
        title: "新客户到访",
        body: `${p?.name ?? id} 今天来到了诊所，已加入今日预约清单。`,
        day: g.day,
        read: false,
        patientName: p?.name ?? id,
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
    activeSlotId: null,
    saveSlots: [],
    currentUser: null,
    muted: false,
    toasts: [],
    floatingTexts: [],
    achievementToast: null,
    endingData: null,
    achievementEngine: null,
    currentPatient: null,
    currentReturnPatient: null,
    prologueVisible: false,
    restDreamPending: false,
    restDreamVisible: false,

    register: (name: string) => {
      const trimmed = name.trim();
      if (!trimmed) return { status: "invalid" };
      const res = registerUser(trimmed);
      if (res.status === "ok") {
        set({ currentUser: res.profile });
        playSound("page");
      }
      return res;
    },

    clearUser: () => {
      clearStoredUser();
      set({ currentUser: null });
    },

    init: () => {
      const eng = new AchievementEngine(get().game, (a) => {
        applyAchievementUnlock(a);
        showAchievement(a);
        commit();
      });
      eng.setDynamicTargets({ allClinicUpgradesCount: allClinicUpgrades.length });
      // 本地账号 + 槽位初始化
      const user = loadUser();
      // 存量账号昵称补登进登记表（昵称永久唯一；老数据无登记表时防丢）
      if (user) ensureNicknameRegistered(user);
      const slots = listSaveSlots();
      // 旧单档迁移：无槽索引但有旧单档时迁移为槽 1
      let migratedId: string | null = null;
      if (slots.length === 0) {
        migratedId = migrateLegacySaveToSlot();
      }
      const finalSlots = listSaveSlots();
      set({
        achievementEngine: eng,
        hydrated: true,
        currentUser: user,
        saveSlots: finalSlots,
        hasSave: finalSlots.length > 0 || migratedId !== null,
        activeSlotId: finalSlots.length > 0 ? finalSlots[0].id : null,
      });
      // 读取静音偏好
      try {
        const m = window.localStorage.getItem("ps.muted") === "1";
        set({ muted: m });
        getSound().setMuted(m);
      } catch {
        /* noop */
      }
    },

    newGame: (clinicName?: string, slotId?: string) => {
      const g = createInitialState();
      if (clinicName && clinicName.trim()) {
        g.clinicName = clinicName.trim();
      }
      // 指定槽则覆盖（玩家从存档列表选「覆盖」）；否则分配新槽
      const id = slotId ?? nextSaveSlotId();
      get().achievementEngine?.onGameStateSynced(g);
      saveGameToSlot(id, g, get().currentUser ?? undefined);
      set({ game: g, scene: "clinic", prologueVisible: true, activeSlotId: id, hasSave: true });
      refreshSaveSlots();
      playSound("page");
    },

    continueGame: (slotId: string) => {
      const s = loadGameFromSlot(slotId);
      if (s) {
        get().achievementEngine?.onGameStateSynced(s);
        set({ game: s, scene: "clinic", prologueVisible: false, activeSlotId: slotId, hasSave: true });
        playSound("page");
      }
    },

    deleteSlot: (slotId: string) => {
      deleteSaveSlot(slotId);
      const remaining = listSaveSlots();
      const wasActive = get().activeSlotId === slotId;
      // 删除当前槽 → 回到标题且清空活动槽；同时按剩余槽数刷新 hasSave（删光后「继续游戏」隐藏）
      set({
        saveSlots: remaining,
        hasSave: remaining.length > 0,
        ...(wasActive ? { activeSlotId: null, game: createInitialState() } : {}),
      });
      playSound("click");
    },

    backToTitle: () => {
      const slotId = get().activeSlotId;
      if (slotId) {
        saveGameToSlot(slotId, get().game, get().currentUser ?? undefined);
        refreshSaveSlots();
      } else {
        saveGame(get().game);
      }
      set({ hasSave: true, scene: "title" });
      playSound("page");
    },

    enterClinic: () => {
      const slotId = get().activeSlotId;
      if (slotId) {
        saveGameToSlot(slotId, get().game, get().currentUser ?? undefined);
        refreshSaveSlots();
      } else {
        saveGame(get().game);
      }
      set({ hasSave: true, scene: "clinic" });
    },

    setScene: (s: Scene) => set({ scene: s }),

    startSession: (p: PatientScenario) => {
      const g = get().game;
      if (g.slot >= todayCapacity(g)) {
        toast(`今日已接待 ${g.slot} 位客户，名额已满，请先「休息一日」`, "warn");
        playSound("locked");
        return;
      }
      // 首诊机制保障（P4-5）：首诊完成前仅引导患者可接诊，其他患者锁定。
      // ClinicHall 已做卡片锁定，此处兜底拦截其他路径误入（引导患者自己永远可点）；
      // 断点患者豁免（评审修复）：可「继续上次」恢复，不影响首诊锁定（断点只能来自已开始的会话）。
      if (
        p.id !== GUIDED_PATIENT_ID &&
        !firstSessionDone(g) &&
        g.activeSession?.patientId !== p.id
      ) {
        toast("先见见今天的第一位来访者", "warn");
        playSound("locked");
        return;
      }
      if (!g.todayServed.includes(p.id)) g.todayServed.push(p.id);
      // 逐日随机到达：任何会话开始的患者视为已到达（含断点恢复/复诊/旧档迁入患者）
      if (!g.arrivedPatients.includes(p.id)) g.arrivedPatients.push(p.id);
      // P5-3 危机接诊标记：患者等待≥4天视为沉重病例（与成就口径一致），结算时消耗理智
      lastSessionCritical = (g.waitingDays[p.id] ?? 0) >= 4;
      // 病情恶化可逆：患者来就诊，等待天数归零，暂缓放弃
      g.waitingDays[p.id] = 0;
      get().achievementEngine?.onSessionStart(p.id);
      set({ currentPatient: p, scene: "dialogue" });
      playSound("veil");
    },

    restOneDay: async () => {
      const g = get().game;
      // 日终：重置名额 + 患者等待天数推进（恶化/放弃）——仅推进已到达候诊、且未在治疗期（等待复诊）的手写患者
      const events = advanceDayState(
        g,
        serveablePatients(g).filter(
          (p) => g.arrivedPatients.includes(p.id) && !g.treatmentStages[p.id]
        )
      );
      g.day += 1;
      // 治愈回访到达：写入回访信（温暖闭环，非治疗）
      for (const r of resolveDueReturns(g)) {
        const p = scenarioById(g, r.patientId);
        const name = p?.name ?? r.patientId;
        g.messages.unshift({
          id: `return-${g.day}-${r.patientId}`,
          kind: "letter",
          title: `${name} 的回访`,
          body: `${name} 专程来诊所看看你，说想当面道个谢。${name} 已经走出了一段最难的日子。`,
          day: g.day,
          read: false,
          patientName: name,
          tone: "thanks",
        });
      }
      // 治疗分期复诊（节拍断拍）：到期的治疗中患者复诊到访，进入大厅可继续下一节拍
      for (const pid of resolveDueTreatmentVisits(g)) {
        const p = scenarioById(g, pid);
        const name = p?.name ?? pid;
        g.messages.unshift({
          id: `treat-visit-${g.day}-${pid}`,
          kind: "notice",
          title: `${name} 复诊到访`,
          body: `${name} 今天来诊所复诊，想继续上次没谈完的话题。已加入今日预约清单。`,
          day: g.day,
          read: false,
          patientName: name,
        });
      }
      // 发现客户：到期的已邀约客户标记到达（arrivedPatients）；未邀约候选过期清除
      const arrivedIds: string[] = [];
      const keepArrivals: PendingArrival[] = [];
      for (const a of g.pendingArrivals) {
        if (a.arriveDay <= g.day) {
          if (!g.arrivedPatients.includes(a.patientId)) {
            g.arrivedPatients.push(a.patientId);
            arrivedIds.push(a.patientId);
          }
        } else {
          keepArrivals.push(a);
        }
      }
      g.pendingArrivals = keepArrivals;
      const candidatesBefore = g.discoveryCandidates.length;
      g.discoveryCandidates = g.discoveryCandidates.filter(
        (c) => c.expireDay > g.day
      );
      for (const id of arrivedIds) {
        const p = allPatients.find((x) => x.id === id);
        g.messages.unshift({
          id: `arrive-${g.day}-${id}`,
          kind: "notice",
          title: "新客户到访",
          body: `${p?.name ?? id} 接受了你的邀约，今日到诊，已加入预约清单。`,
          day: g.day,
          read: false,
          patientName: p?.name ?? id,
        });
      }
      if (g.discoveryCandidates.length < candidatesBefore) {
        g.messages.unshift({
          id: `expire-${g.day}`,
          kind: "notice",
          title: "邀约过期",
          body: "部分潜在客户等你太久，已另寻其他咨询师。",
          day: g.day,
          read: false,
        });
      }
      let base = 15;
      if (g.clinicUpgrades.includes("rest_room")) base += 10;
      g.doctor.sanity = clamp(g.doctor.sanity + base, 0, 100);
      // P5-3 连续接诊计数归零（休息是自我关怀，重置「连续不休息」累计）
      g.sessionSinceRest = 0;
      if (g.clinicUpgrades.includes("receptionist")) g.doctor.money += 50;
      // 成就累计：零流失天数（当日无流失）/ 连续休息理智≥60 天数 / 邀约到诊 / 直接型指标同步
      if (!events.some((e) => e.type === "abandon" || e.type === "abandonFollowUp"))
        g.stats.noLossDays += 1;
      g.stats.sanityStreak =
        g.doctor.sanity >= 60 ? g.stats.sanityStreak + 1 : 0;
      get().achievementEngine?.onInviteesArrived(arrivedIds.length);
      get().achievementEngine?.onGameStateSynced(g);
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
      // 候诊区补充新到达患者（难度分桶随机补足）
      replenishQueue();
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

    setFacilityPosition: (id: string, x: number, y: number) => {
      const g = get().game;
      if (!g.facilityPositions) g.facilityPositions = {};
      g.facilityPositions[id] = { x, y };
      commit();
    },

    setFacilityDecor: (upgradeId: string, variantId: string) => {
      const g = get().game;
      if (!g.facilityDecors) g.facilityDecors = {};
      g.facilityDecors[upgradeId] = variantId;
      commit();
      // 通知 Phaser 重绘该设施（换外观变体）
      bridge.emit(EVENTS.syncFacilities, { facilities: [] });
      playSound("click");
      const v = variantId ? decorById(variantId) : undefined;
      toast(v ? `已切换：${v.name}` : "已恢复默认外观", "ok");
    },

    toggleDecor: (decorId: string) => {
      const g = get().game;
      if (!g.placedDecors) g.placedDecors = [];
      if (!g.decorPositions) g.decorPositions = {};
      const idx = g.placedDecors.indexOf(decorId);
      const def = decorById(decorId);
      if (idx >= 0) {
        g.placedDecors.splice(idx, 1);
        toast(`已收起：${def?.name ?? decorId}`);
      } else {
        g.placedDecors.push(decorId);
        if (!g.decorPositions[decorId] && def?.defaultPos) {
          g.decorPositions[decorId] = { ...def.defaultPos };
        }
        toast(`已摆放：${def?.name ?? decorId}`, "ok");
      }
      commit();
      playSound("click");
    },

    setDecorPosition: (decorId: string, x: number, y: number) => {
      const g = get().game;
      if (!g.decorPositions) g.decorPositions = {};
      g.decorPositions[decorId] = { x, y };
      commit();
    },

    discover: (channelId: string) => {
      const g = get().game;
      const ch = discoveryChannels.find((c) => c.id === channelId);
      if (!ch) return;
      if (ch.requireReputation && g.doctor.reputation < ch.requireReputation) {
        toast(`声望不足：需要 ${ch.requireReputation}`, "warn");
        playSound("locked");
        return;
      }
      if (g.doctor.money < ch.cost) {
        toast(`金钱不足：需要 $${ch.cost}`, "warn");
        playSound("locked");
        return;
      }
      g.doctor.money -= ch.cost;
      // 成就累计：投放次数 / 用过的渠道
      g.stats.discoverCount += 1;
      if (!g.stats.channelsUsed.includes(channelId))
        g.stats.channelsUsed.push(channelId);
      // 候选从手写患者池随机选：可接诊 + 未到达 + 未被其他候选预占（SPEC v1.5.0，不再生成患者）
      const count =
        ch.minCount + Math.floor(Math.random() * (ch.maxCount - ch.minCount + 1));
      const pool = allPatients.filter(
        (p) =>
          !g.arrivedPatients.includes(p.id) &&
          !g.patientRecords[p.id] &&
          !g.abandoned.includes(p.id) &&
          !g.discoveryCandidates.some((c) => c.patientId === p.id)
      );
      const names: string[] = [];
      for (let i = 0; i < count && pool.length > 0; i++) {
        const idx = Math.floor(Math.random() * pool.length);
        const pick = pool.splice(idx, 1)[0];
        g.discoveryCandidates.unshift({
          id: `disc-${Date.now()}-${i}`,
          patientId: pick.id,
          channelId,
          expireDay: g.day + 1,
        });
        names.push(pick.name);
      }
      if (names.length === 0) {
        commit();
        playSound("locked");
        toast("暂时没有新的可发现客户，患者都已到诊或结案", "warn");
        return;
      }
      g.messages.unshift({
        id: `disc-${g.day}-${channelId}-${Date.now()}`,
        kind: "notice",
        title: "发现新客户",
        body: `通过「${ch.name}」发现 ${names.length} 位潜在客户：${names.join("、")}。请决定是否发送邀约。`,
        day: g.day,
        read: false,
        patientName: names[0],
      });
      commit();
      playSound("page");
      toast(`花费 $${ch.cost}，发现 ${names.length} 位潜在客户`, "ok");
    },

    invite: (candidateId: string) => {
      const g = get().game;
      const idx = g.discoveryCandidates.findIndex((c) => c.id === candidateId);
      if (idx < 0) return;
      const cand = g.discoveryCandidates[idx];
      g.discoveryCandidates.splice(idx, 1);
      const patient = allPatients.find((p) => p.id === cand.patientId);
      const name = patient?.name ?? cand.patientId;
      const rate = inviteAcceptRate(cand.channelId, g.doctor.reputation);
      const accepted = Math.random() < rate;
      // 成就累计：发出邀约次数
      g.stats.inviteCount += 1;
      if (accepted) {
        g.stats.acceptCount += 1;
        let offset = arrivalDayOffset();
        // 今日名额已满则顺延至明日
        if (offset === 0 && g.slot >= todayCapacity(g)) offset = 1;
        g.pendingArrivals.push({
          patientId: cand.patientId,
          arriveDay: g.day + offset,
        });
        g.messages.unshift({
          id: `invite-ok-${g.day}-${cand.patientId}`,
          kind: "notice",
          title: "邀约成功",
          body: `${name} 接受了你的邀约，${offset === 0 ? "今日" : offset === 1 ? "明日" : "后日"}到诊。`,
          day: g.day,
          read: false,
          patientName: name,
        });
        commit();
        playSound("page");
        toast(`${name} 接受了邀约`, "ok");
      } else {
        g.stats.rejectCount += 1;
        g.messages.unshift({
          id: `invite-no-${g.day}-${cand.patientId}`,
          kind: "notice",
          title: "邀约被婉拒",
          body: `${name} 婉拒了你的邀约，表示暂时不需要。`,
          day: g.day,
          read: false,
          patientName: name,
        });
        commit();
        playSound("locked");
        toast(`${name} 婉拒了邀约`);
      }
    },

    discardCandidate: (candidateId: string) => {
      const g = get().game;
      const idx = g.discoveryCandidates.findIndex((c) => c.id === candidateId);
      if (idx < 0) return;
      const cand = g.discoveryCandidates[idx];
      g.discoveryCandidates.splice(idx, 1);
      const name =
        allPatients.find((p) => p.id === cand.patientId)?.name ?? cand.patientId;
      g.messages.unshift({
        id: `discard-${g.day}-${cand.patientId}`,
        kind: "notice",
        title: "暂不考虑",
        body: `${name} 的邀约未发送，对方已另寻帮助。`,
        day: g.day,
        read: false,
        patientName: name,
      });
      commit();
      playSound("click");
      toast("已暂不考虑该候选");
    },

    saveNow: () => {
      const slotId = get().activeSlotId;
      if (slotId) {
        saveGameToSlot(slotId, get().game, get().currentUser ?? undefined);
        refreshSaveSlots();
      } else {
        saveGame(get().game);
      }
      set({ hasSave: true });
      toast("游戏已保存");
      playSound("click");
    },

    syncSessionDraft: (session: ActiveSession) => {
      // 草稿只写入 game.activeSession，不触发 commit/set：
      // 暂停、中途退出（backToTitle 已有 saveGame）、结算清断点时随 saveGame 统一落盘
      get().game.activeSession = session;
    },

    pauseSession: () => {
      const g = get().game;
      if (!g.activeSession) {
        toast("还没有可保存的会话进度", "warn");
        return;
      }
      const slotId = get().activeSlotId;
      if (slotId) {
        saveGameToSlot(slotId, g, get().currentUser ?? undefined);
        refreshSaveSlots();
      } else {
        saveGame(g);
      }
      set({ hasSave: true, currentPatient: null, scene: "clinic" });
      playSound("page");
      toast("已保存会话进度，可在预约清单继续", "ok");
    },

    unlockFragment: (patientId: string, fragmentId: string) => {
      const g = get().game;
      // 惰性初始化该患者碎片列表；已解锁过则不去重追加（P3-1 验收 2）
      if (!g.unlockedFragments[patientId]) g.unlockedFragments[patientId] = [];
      if (!g.unlockedFragments[patientId].includes(fragmentId)) {
        g.unlockedFragments[patientId].push(fragmentId);
      }
      // P5-1 装饰钩子：记忆碎片解锁 → 挂画自动解锁并摆放
      const pic = pictureForFragment(patientId, fragmentId);
      if (pic) {
        if (!g.unlockedDecors) g.unlockedDecors = [];
        if (!g.placedDecors) g.placedDecors = [];
        if (!g.decorPositions) g.decorPositions = {};
        if (!g.unlockedDecors.includes(pic.id)) {
          g.unlockedDecors.push(pic.id);
          if (!g.placedDecors.includes(pic.id)) g.placedDecors.push(pic.id);
          if (!g.decorPositions[pic.id] && pic.defaultPos) {
            g.decorPositions[pic.id] = { ...pic.defaultPos };
          }
          const p = scenarioById(g, patientId);
          toast(`墙上多了一幅「${p?.name ?? "患者"}」的记忆画。`, "ok");
        }
      }
      commit();
    },

    completeBeat: (
      patientId: string,
      resumeNode: string,
      lastState: PatientState,
      triggeredMemories: string[]
    ) => {
      const g = get().game;
      const prev = g.treatmentStages[patientId];
      // 复诊间隔 1~3 天随机（节拍与节拍之间隔一段时间，玩家已确认）
      const delay = 1 + Math.floor(Math.random() * 3);
      g.treatmentStages[patientId] = {
        stage: (prev?.stage ?? 0) + 1,
        resumeNode,
        patientState: lastState,
        triggeredMemories,
        dueDay: g.day + delay,
        arrived: false,
      };
      // 消耗当日名额：节拍复诊同一次正常接诊（玩家已确认）
      g.slot += 1;
      // 清断点：节拍结束回大厅，本患者不再显示「继续上次」（复诊到访前由 treatmentStages 隐藏）
      if (g.activeSession?.patientId === patientId) g.activeSession = null;
      get().achievementEngine?.onGameStateSynced(g);
      commit();
      const p = scenarioById(g, patientId);
      set({ currentPatient: null, scene: "clinic" });
      toast(`${p?.name ?? "患者"} 本次会谈结束，${delay} 天后再来复诊。`, "ok");
      playSound("page");
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
      // 首诊机制保障（P4-5）：玩家第一次接诊结局 clamp 到治愈/接纳（PRD 场景1）。
      // 放在最顶部（activeSession 清断点之前）→ 后续 patientRecords/generateLetter/endingData/音效
      // 全部用 clamp 后的值，呈现一致。引导剧本本身无坏结局，此处是双保险兜底。
      const clamped = clampFirstSessionEnding(g, ending);
      if (clamped !== ending) {
        ending = clamped;
        title = "接纳结局 · 被认真听见";
        text = "这场对话没有解开全部心结，但你们一起看见了此刻的他。他走的时候说，下次还来。有些伤口不必急着愈合——被认真听见，就已经是很大的一步。";
      }
      // 结案清断点：仅清「本会话」的断点（activeSession 若指向其他已暂停患者则保留——暂停 A 后开诊 B 并结案，A 的进度不丢）
      if (g.activeSession?.patientId === patientId) g.activeSession = null;
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
      // P5-3 理智消耗：沉重病例 / 坏结局 / 连续不休息（自我关怀资源，非倒闭惩罚）
      g.sessionSinceRest = (g.sessionSinceRest ?? 0) + 1;
      if (lastSessionCritical)
        g.doctor.sanity = clamp(g.doctor.sanity - 10, 0, 100);
      if (ending === "tragic" || ending === "worsen")
        g.doctor.sanity = clamp(g.doctor.sanity - 15, 0, 100);
      if (g.sessionSinceRest >= 3) {
        g.doctor.sanity = clamp(g.doctor.sanity - 5, 0, 100);
        if (g.sessionSinceRest === 3) toast("你已经连续接诊很久了，休息一下吧", "warn");
      }
      // 记录结局
      g.patientRecords[patientId] = ending;
      // 治疗分期复诊：走到结局结算，清理节拍进度（治疗完成，不再等待复诊）
      delete g.treatmentStages[patientId];
      // 治愈/接纳/觉醒结局：登记 N 天后回访探望（温暖闭环）
      if (ending === "cure" || ending === "acceptance" || ending === "awakening") {
        g.returnVisits[patientId] = {
          ending,
          dueDay: g.day + RETURN_VISIT_DELAY,
          arrived: false,
          seen: false,
        };
      }
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
      // P5-1 装饰钩子：治愈/接纳结局 → 患者送花（自动解锁并摆放），不改既有结算
      if (ending === "cure" || ending === "acceptance") {
        const flower = flowerForPatient(patientId);
        if (flower) {
          if (!g.unlockedDecors) g.unlockedDecors = [];
          if (!g.placedDecors) g.placedDecors = [];
          if (!g.decorPositions) g.decorPositions = {};
          if (!g.unlockedDecors.includes(flower.id)) {
            g.unlockedDecors.push(flower.id);
            if (!g.placedDecors.includes(flower.id)) g.placedDecors.push(flower.id);
            if (!g.decorPositions[flower.id] && flower.defaultPos) {
              g.decorPositions[flower.id] = { ...flower.defaultPos };
            }
            const p = scenarioById(g, patientId);
            toast(`${p?.name ?? "患者"} 送来了一盆花。谢谢你认真听他说。`, "ok");
          }
        }
      }
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
          patientSurface: get().currentPatient?.surface,
          patientId: get().currentPatient?.id,
        },
      });
      // P5-3 归零温情场景：结算后理智归零 → 结局页关闭时进入梦境（restDreamPending 只留这一处写）
      if (get().game.doctor.sanity <= 0) set({ restDreamPending: true });
      // 每接诊 2 位，候诊区补充一位新到达患者
      if (g.slot % 2 === 0) replenishQueue();
    },

    markAllMessagesRead: () => {
      const g = get().game;
      if (!g.messages.some((m) => !m.read)) return;
      // P5-3 读信恢复：本次新读的每封来信（kind === "letter"）+2 理智（静默，不 toast）
      const unreadLetters = g.messages.filter((m) => !m.read && m.kind === "letter").length;
      g.messages = g.messages.map((m) => ({ ...m, read: true }));
      if (unreadLetters > 0)
        g.doctor.sanity = clamp(g.doctor.sanity + unreadLetters * 2, 0, 100);
      commit();
    },

    dismissAchievement: () => set({ achievementToast: null }),
    dismissEnding: () => {
      const pending = get().restDreamPending;
      set({
        endingData: null,
        currentPatient: null,
        scene: "clinic",
        restDreamPending: false,
        restDreamVisible: pending,
      });
    },
    /** P5-3 归零梦境收尾：梦里见到帮助过的人，醒后理智部分恢复（自我关怀，非惩罚） */
    dismissRestDream: () => {
      const g = get().game;
      g.doctor.sanity = clamp(g.doctor.sanity + 35, 0, 100);
      commit();
      set({ restDreamVisible: false });
      playSound("rest");
      toast("你在梦里见到了被你帮助过的人。醒后，心里缓过来一些。理智 +35", "ok");
    },

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

    choosePrologue: (choice) => {
      const g = get().game;
      g.prologueChoice = choice;
      commit();
    },

    dismissPrologue: (letter) => {
      const g = get().game;
      if (letter && !g.messages.find((l) => l.id === letter.id))
        g.messages.unshift(letter);
      // P4-3：完成序章与跳过序章都标记为已通过（§9 纯新增，防重复进入）
      g.prologuePassed = true;
      commit();
      set({ prologueVisible: false });
      playSound("page");
    },

    openReturnVisit: (patientId: string) => {
      const p = scenarioById(get().game, patientId);
      if (!p) return;
      set({ currentReturnPatient: p });
      playSound("veil");
    },

    finishReturnVisit: () => {
      const g = get().game;
      const p = get().currentReturnPatient;
      if (p) {
        const rv = g.returnVisits[p.id];
        if (rv) {
          rv.seen = true;
          delete g.returnVisits[p.id];
          if (!g.discharged.includes(p.id)) g.discharged.push(p.id);
          // 成就累计：回访探望次数 / 探望过的结局类型
          g.stats.aftercareCount += 1;
          if (!g.stats.aftercareEndings.includes(rv.ending))
            g.stats.aftercareEndings.push(rv.ending);
          // P5-3 回访恢复：好好告别后理智 +10
          g.doctor.sanity = clamp(g.doctor.sanity + 10, 0, 100);
          toast(`${p?.name ?? "ta"} 好好告别了。你也觉得，心里松了一些。理智 +10`, "ok");
        }
      }
      commit();
      playSound("page");
      set({ currentReturnPatient: null });
    },

    /** P5-3 花园待一会：每日一次理智 +5（温柔恢复渠道） */
    spendTimeInGarden: () => {
      const g = get().game;
      if (g.gardenDay === g.day) {
        toast("今天已经在花园待过了，明天再来吧", "warn");
        playSound("locked");
        return;
      }
      g.gardenDay = g.day;
      g.doctor.sanity = clamp(g.doctor.sanity + 5, 0, 100);
      commit();
      playSound("rest");
      toast("在花园里坐了一会儿，心里松了些。理智 +5", "ok");
    },
  };
});
