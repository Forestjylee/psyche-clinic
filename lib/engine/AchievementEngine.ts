import type {
  GameState,
  PatientState,
  Achievement,
  AchievementProgress,
  AchievementProgressMap,
  EndingType,
} from "../types";
import { allAchievements, getAchievement, createProgress } from "../data/achievements";
import {
  saveAchievements,
  loadAchievements,
  clearAchievements,
} from "../state/Storage";

/** 解锁成就的回调（UI 层负责显示特效） */
export type OnUnlock = (
  achievement: Achievement,
  reward?: Achievement["reward"]
) => void;

/** 追踪会话中的瞬时指标（不计入存档，仅供一次接诊用） */
export interface SessionMetrics {
  maxDefense: number;
  truthReached: number;
  comboCount: number;
  usedPrescribeFirst: boolean; // 首诊（第一次选择）是否是处方药
}

// ============================================================
// 成就引擎
// ============================================================
export class AchievementEngine {
  private progress: AchievementProgressMap;
  private onUnlock: OnUnlock | null;
  private game: GameState;
  /** 会话级指标（每次接诊 startSession 重置） */
  private sessionMetrics: SessionMetrics = {
    maxDefense: 0,
    truthReached: 0,
    comboCount: 0,
    usedPrescribeFirst: false,
  };
  private firstChoiceMade = false;
  private noWorsenStreak = 0; // 当前未恶化连续数（仅内存，跨局）

  constructor(game: GameState, onUnlock?: OnUnlock) {
    this.progress = this.loadOrCreate();
    this.onUnlock = onUnlock ?? null;
    this.game = game;
    // 恢复 clinic_upgrade_all 的实际目标数（运行时依赖 allClinicUpgrades）
    this.fixRuntimeTargets();
  }

  private fixRuntimeTargets() {
    // clinic_upgrade_all 的 target 在运行时设定
    const a = getAchievement("clinic_upgrade_all");
    if (a && a.target === 999) a.target = 6; // 保守默认，真正值由 UI 层传
  }

  /** 设定动态目标（需根据实际技能/升级数） */
  public setDynamicTargets(ops: { allClinicUpgradesCount: number }): void {
    const a = getAchievement("clinic_upgrade_all");
    if (a) a.target = ops.allClinicUpgradesCount;
  }

  private loadOrCreate(): AchievementProgressMap {
    const data = loadAchievements<AchievementProgressMap>();
    if (!data) return this.initAll();
    // 补齐新增的成就（向后兼容）
    for (const ach of allAchievements) {
      if (!data[ach.id]) data[ach.id] = createProgress();
    }
    return data;
  }

  private initAll(): AchievementProgressMap {
    const map: AchievementProgressMap = {};
    for (const a of allAchievements) map[a.id] = createProgress();
    return map;
  }

  /** 获取当前进度表（只读） */
  public getProgressMap(): Readonly<AchievementProgressMap> {
    return this.progress;
  }

  public getProgress(id: string): AchievementProgress | undefined {
    return this.progress[id];
  }

  public save(): boolean {
    return saveAchievements(this.progress);
  }

  public clearAll(): boolean {
    this.progress = this.initAll();
    return clearAchievements();
  }

  /** ================ 增量更新接口 ================ */

  /** +N 累计型：通用方法，按 id 给进度 +n */
  private add(id: string, n = 1): void {
    const ach = getAchievement(id);
    if (!ach) return;
    const p = this.progress[id];
    if (p.unlocked) return;
    p.progress = Math.min(ach.target, p.progress + n);
    this.checkUnlock(ach, p);
  }

  /** 直接设值（用于 max 型指标如 level/reputation/money） */
  private set(id: string, value: number): void {
    const ach = getAchievement(id);
    if (!ach) return;
    const p = this.progress[id];
    if (p.unlocked) return;
    if (value > p.progress) {
      p.progress = Math.min(ach.target, value);
      this.checkUnlock(ach, p);
    }
  }

  private checkUnlock(ach: Achievement, p: AchievementProgress): void {
    if (!p.unlocked && p.progress >= ach.target) {
      p.unlocked = true;
      p.unlockedDay = this.game.day;
      p.unlockedAt = Date.now();
      // 应用奖励
      if (ach.reward) {
        const r = ach.reward;
        if (r.reputation)
          this.game.doctor.reputation = clamp(
            this.game.doctor.reputation + r.reputation,
            0,
            100
          );
        if (r.sanity)
          this.game.doctor.sanity = clamp(
            this.game.doctor.sanity + r.sanity,
            0,
            100
          );
        if (r.exp) {
          // 经验增量（UI 层会调用 applyExp）
          this.game.doctor.exp += r.exp;
        }
        if (r.money) this.game.doctor.money += r.money;
      }
      this.onUnlock?.(ach, ach.reward);
      this.save();
    }
  }

  /** ================ 业务事件钩子 ================ */

  /** 新游戏启动 / 任何存档加载完成都要调用 */
  public onGameStateSynced(game: GameState): void {
    this.game = game;
    // 直接型指标初始化（每次同步状态都刷新一下，避免遗漏）
    this.set("growth_level_5", game.doctor.level);
    this.set("growth_level_10", game.doctor.level);
    this.set("growth_level_20", game.doctor.level);
    this.set("growth_rep_50", game.doctor.reputation);
    this.set("growth_rep_80", game.doctor.reputation);
    this.set("growth_skill_6", game.skills.length);
    this.set("clinic_money_10k", game.doctor.money);
    this.set("clinic_money_50k", game.doctor.money);
    this.set("clinic_upgrade_3", game.clinicUpgrades.length);
    this.set("clinic_upgrade_all", game.clinicUpgrades.length);
    this.set("secret_day_1", game.day);
    this.set("secret_bookworm", game.letters.length);
    // 首次保存（已玩过即已达成；宽松判定：day>=1 即第一次保存过）
    if (game.day >= 1) this.add("secret_first_save", 1);
    // 结局类型收集
    const endings = new Set<EndingType>(Object.values(game.patientRecords));
    this.set("ending_all_types", endings.size);
    // 接诊累计数
    this.set("therapy_first_patient", Object.keys(game.patientRecords).length);
    this.set("therapy_5_patients", Object.keys(game.patientRecords).length);
    this.set("therapy_15_patients", Object.keys(game.patientRecords).length);
    this.set("therapy_30_patients", Object.keys(game.patientRecords).length);
    this.set("therapy_50_patients", Object.keys(game.patientRecords).length);
    // 结局类型累计
    const counts = countEndingTypes(game.patientRecords);
    this.set("ending_cure_1", counts.cure);
    this.set("ending_cure_10", counts.cure);
    this.set("ending_awakening_1", counts.awakening);
    this.set("ending_acceptance_1", counts.acceptance);
    this.set("ending_transfer_1", counts.transfer);
    this.set("ending_dependent_1", counts.dependent);
    this.set("ending_worsen_1", counts.worsen);
    this.set("ending_tragic_1", counts.tragic);
    this.set("ending_hidden_1", counts.hidden);
    this.save();
  }

  /** 接诊开始：重置会话级指标 */
  public onSessionStart(): void {
    this.sessionMetrics = {
      maxDefense: 0,
      truthReached: 0,
      comboCount: 0,
      usedPrescribeFirst: false,
    };
    this.firstChoiceMade = false;
  }

  /** 每次患者状态更新时调用 */
  public onStateUpdate(state: PatientState): void {
    if (state.defense > this.sessionMetrics.maxDefense)
      this.sessionMetrics.maxDefense = state.defense;
    if (state.truth > this.sessionMetrics.truthReached)
      this.sessionMetrics.truthReached = state.truth;
    // 低理智成就
    if (this.game.doctor.sanity <= 20) this.add("ethics_dark_line", 1);
  }

  /** 玩家做出对话选择时调用 */
  public onChoiceMade(kind: string, state: PatientState): void {
    if (!this.firstChoiceMade) {
      this.firstChoiceMade = true;
      if (kind === "prescribe") {
        this.sessionMetrics.usedPrescribeFirst = true;
      } else {
        this.add("ethics_no_quick_fix", 1);
      }
    }
    // 当前会话是否超过 90 真相
    if (state.truth >= 90) this.add("therapy_truth_first", 1);
  }

  /** 连击数更新 */
  public onComboTrigger(): void {
    this.sessionMetrics.comboCount += 1;
    this.add("therapy_combo_first", 1);
    this.add("therapy_combo_5", 1);
  }

  /** 接诊结束（达成结局）时调用 */
  public onSessionEnd(
    endingType: EndingType,
    patientId: string,
    lastState: PatientState
  ): void {
    // 全防御未超 80 + 非恶化：优雅结案
    if (this.sessionMetrics.maxDefense < 80) {
      this.add("therapy_perfect_round", 1);
    }
    // 剧本生成器接诊
    if (patientId.startsWith("gen_")) this.add("therapy_generator_first", 1);
    if (patientId.startsWith("gen_")) this.add("secret_all_generated", 1);

    // 恶化 vs 连续不恶化
    if (endingType === "worsen") {
      this.noWorsenStreak = 0;
    } else {
      this.noWorsenStreak += 1;
      if (this.noWorsenStreak >= 10) {
        this.add("secret_no_worsen_streak", 1);
      }
    }
    // 伦理：达成结局非依赖，但患者有依赖表达 -> 这里保守判定：若结局是 transfer/cure/awakening/acceptance 即视为边界守住
    if (
      endingType === "transfer" ||
      endingType === "cure" ||
      endingType === "awakening" ||
      endingType === "acceptance"
    ) {
      // 仅在真相揭示 ≥ 60 时判定边界坚守
      if (lastState.truth >= 60) this.add("ethics_boundary_keeper", 1);
    }
    this.save();
  }
}

// ============================================================
// 辅助
// ============================================================
function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}
function countEndingTypes(records: Record<string, EndingType>): Record<EndingType, number> {
  const c: Record<EndingType, number> = {
    cure: 0, acceptance: 0, dependent: 0, worsen: 0,
    tragic: 0, hidden: 0, transfer: 0, awakening: 0,
  };
  for (const v of Object.values(records)) c[v] = (c[v] ?? 0) + 1;
  return c;
}
