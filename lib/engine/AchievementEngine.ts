import type {
  GameState,
  PatientState,
  Achievement,
  AchievementProgress,
  AchievementProgressMap,
  EndingType,
} from "../types";
import { allAchievements, getAchievement, createProgress } from "../data/achievements";
import { allPatients } from "../data/patients";
import { MAX_SLOTS } from "../state/GameState";
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
  private criticalSession = false; // 本次接诊是否危机（患者等待≥4天）

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
    // 清理已删除的旧成就（如剧本生成器系列），避免幽灵计数影响图鉴解锁数
    for (const id of Object.keys(data)) {
      if (!getAchievement(id)) delete data[id];
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
    this.set("clinic_money_10k", game.doctor.money);
    this.set("clinic_money_50k", game.doctor.money);
    this.set("clinic_upgrade_3", game.clinicUpgrades.length);
    this.set("clinic_upgrade_all", game.clinicUpgrades.length);
    this.set("secret_day_1", game.day);
    this.set(
      "secret_bookworm",
      game.messages.filter((m) => m.kind === "letter").length
    );
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
    // —— v0.5.0 扩充：获客 / 回访 / 复诊 / 结局 / 成长 / 经营 / 隐藏 ——
    // 获客
    this.set("discover_first", game.stats.discoverCount);
    this.set("discover_5", game.stats.discoverCount);
    this.set("discover_15", game.stats.discoverCount);
    this.set("discover_all_channels", game.stats.channelsUsed.length);
    this.set("invite_first", game.stats.inviteCount);
    this.set("invite_accept_first", game.stats.acceptCount);
    this.set("invite_accept_5", game.stats.acceptCount);
    this.set("invite_reject_5", game.stats.rejectCount);
    // 回访
    this.set("aftercare_first", game.stats.aftercareCount);
    this.set("aftercare_3", game.stats.aftercareCount);
    this.set("aftercare_5", game.stats.aftercareCount);
    this.set("aftercare_8", game.stats.aftercareCount);
    {
      const visited = new Set(game.stats.aftercareEndings);
      if (visited.has("cure") && visited.has("awakening") && visited.has("acceptance"))
        this.add("aftercare_all_types", 1);
    }
    // 复诊
    this.set("therapy_revisit_first", game.stats.revisitCount);
    this.set("therapy_revisit_5", game.stats.revisitCount);
    // 接诊总量 / 不同患者
    this.set("therapy_100_patients", Object.keys(game.patientRecords).length);
    this.set("therapy_10_different", Object.keys(game.patientRecords).length);
    // 经营扩展
    this.set("clinic_money_100k", game.doctor.money);
    this.set("clinic_day_7", game.day);
    this.set("clinic_day_15", game.day);
    this.set("clinic_day_50", game.day);
    this.set("clinic_sanity_keep", game.stats.sanityStreak);
    this.set("clinic_upgrade_5", game.clinicUpgrades.length);
    // 结局扩展
    this.set("ending_cure_20", counts.cure);
    this.set("ending_awakening_3", counts.awakening);
    this.set("ending_acceptance_3", counts.acceptance);
    this.set("ending_dependent_3", counts.dependent);
    this.set("ending_worsen_3", counts.worsen);
    this.set("ending_tragic_2", counts.tragic);
    this.set("ending_transfer_3", counts.transfer);
    // 成长扩展
    this.set("growth_level_30", game.doctor.level);
    this.set("growth_rep_95", game.doctor.reputation);
    // 隐藏扩展
    this.set("secret_letters_30", game.messages.filter((m) => m.kind === "letter").length);
    this.set("secret_no_loss_15", game.stats.noLossDays);
    if (game.doctor.sanity <= 0) this.add("secret_sanity_zero", 1);
    // 全部内置患者治愈/接纳/觉醒
    {
      const good: readonly string[] = ["cure", "awakening", "acceptance"];
      const allHealed = allPatients.every((p) => {
        const r = game.patientRecords[p.id];
        return !!r && good.includes(r);
      });
      if (allHealed && Object.keys(game.patientRecords).length > 0)
        this.add("secret_all_heal", 1);
    }
    this.save();
  }

  /** 接诊开始：重置会话级指标 */
  public onSessionStart(patientId: string): void {
    this.sessionMetrics = {
      maxDefense: 0,
      truthReached: 0,
      comboCount: 0,
      usedPrescribeFirst: false,
    };
    this.firstChoiceMade = false;
    // 复诊统计：该患者已记录过结局，本次为复诊
    if (this.game.patientRecords[patientId]) {
      this.game.stats.revisitCount += 1;
    }
    // 危机接诊标记：患者已等待 ≥ 4 天（病情严重）
    this.criticalSession = (this.game.waitingDays[patientId] ?? 0) >= 4;
  }

  /** 每次患者状态更新时调用 */
  public onStateUpdate(state: PatientState): void {
    if (state.defense > this.sessionMetrics.maxDefense)
      this.sessionMetrics.maxDefense = state.defense;
    if (state.truth > this.sessionMetrics.truthReached)
      this.sessionMetrics.truthReached = state.truth;
    // 低理智成就
    if (this.game.doctor.sanity <= 20) {
      this.add("ethics_dark_line", 1);
      this.add("ethics_dark_line_8", 1);
    }
    if (this.game.doctor.sanity <= 0) this.add("secret_sanity_zero", 1);
  }

  /** 玩家做出对话选择时调用 */
  public onChoiceMade(kind: string, state: PatientState): void {
    if (!this.firstChoiceMade) {
      this.firstChoiceMade = true;
      if (kind === "prescribe") {
        this.sessionMetrics.usedPrescribeFirst = true;
      } else {
        this.add("ethics_no_quick_fix", 1);
        this.add("ethics_no_quick_fix_15", 1);
      }
    }
    // 当前会话是否超过 90 真相
    if (state.truth >= 90) this.add("therapy_truth_first", 1);
  }

  /** 邀约客户到诊（休息日结算时调用） */
  public onInviteesArrived(count: number): void {
    if (count >= 3) this.add("discover_arrive_3", 1);
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
    _patientId: string,
    lastState: PatientState
  ): void {
    // 全防御未超 80 + 非恶化：优雅结案
    if (this.sessionMetrics.maxDefense < 80) {
      this.add("therapy_perfect_round", 1);
    }
    // 单日接满名额 / 危机接诊治愈 / 真相 ≥95
    if (this.game.slot >= MAX_SLOTS) this.add("clinic_full_day", 1);
    if (endingType === "cure" && this.criticalSession)
      this.add("ethics_help_desperate", 1);
    if (lastState.truth >= 95) this.add("therapy_deep_truth", 1);

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
      if (lastState.truth >= 60) {
        this.add("ethics_boundary_keeper", 1);
        this.add("ethics_boundary_3", 1);
      }
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
