import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import {
  setGlobalDriver,
  getStorage,
  LocalStorageDriver,
  type StorageDriver,
  NS,
  listSlots,
  loadSlot,
  saveSlot,
  deleteSlot,
  nextSlotId,
  migrateLegacySave,
  registerUser,
  ensureNicknameRegistered,
  loadUser,
  hasUser,
  clearUser,
  saveGameState,
  loadGameState,
  type UserProfile,
} from "./Storage";

/** 内存 driver：node 测试环境无 localStorage，注入后验证槽位/账号逻辑与 driver 切换 */
class MemoryDriver implements StorageDriver {
  private store = new Map<string, string>();
  get<T>(key: string): T | null {
    const raw = this.store.get(key);
    return raw ? (JSON.parse(raw) as T) : null;
  }
  set<T>(key: string, value: T): boolean {
    this.store.set(key, JSON.stringify(value));
    return true;
  }
  remove(key: string): boolean {
    return this.store.delete(key);
  }
  has(key: string): boolean {
    return this.store.has(key);
  }
  getMany<T>(keys: string[]): Record<string, T | null> {
    const out: Record<string, T | null> = {};
    for (const k of keys) out[k] = this.get<T>(k);
    return out;
  }
}

function makeState(over: Partial<{ clinicName: string; day: number; level: number; money: number }> = {}) {
  return { clinicName: "森林诊所", day: 1, level: 1, money: 500, ...over };
}

describe("Storage 槽位系统", () => {
  beforeEach(() => {
    setGlobalDriver(new MemoryDriver());
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("saveSlot / loadSlot 往返：写状态 + 索引元信息", () => {
    const ok = saveSlot("1", makeState({ clinicName: "安心诊所", day: 3, level: 2, money: 900 }), {
      clinicName: "安心诊所",
      day: 3,
      level: 2,
      money: 900,
    });
    expect(ok).toBe(true);
    const loaded = loadSlot<ReturnType<typeof makeState>>("1");
    expect(loaded).not.toBeNull();
    expect(loaded!.state.clinicName).toBe("安心诊所");
    expect(loaded!.meta).toMatchObject({ id: "1", day: 3, level: 2, money: 900, source: "local" });
    expect(loaded!.meta.updatedAt).toBeGreaterThan(0);
  });

  it("重复 saveSlot 更新元信息但保留既有 userId/userName 归属", () => {
    saveSlot("1", makeState(), { clinicName: "森林诊所", day: 1, level: 1, money: 500 }, {
      id: "u_abc",
      name: "小俊",
    });
    saveSlot("1", makeState({ day: 5 }), { clinicName: "森林诊所", day: 5, level: 1, money: 500 });
    const loaded = loadSlot<ReturnType<typeof makeState>>("1");
    expect(loaded!.meta.day).toBe(5);
    expect(loaded!.meta.userId).toBe("u_abc");
    expect(loaded!.meta.userName).toBe("小俊");
  });

  it("listSlots 按 updatedAt 倒序", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-08-09T10:00:00"));
    saveSlot("1", makeState(), { clinicName: "A", day: 1, level: 1, money: 500 });
    vi.setSystemTime(new Date("2026-08-09T11:00:00"));
    saveSlot("2", makeState(), { clinicName: "B", day: 2, level: 1, money: 500 });
    vi.setSystemTime(new Date("2026-08-09T09:00:00"));
    saveSlot("3", makeState(), { clinicName: "C", day: 3, level: 1, money: 500 });
    expect(listSlots().map((s) => s.id)).toEqual(["2", "1", "3"]);
  });

  it("deleteSlot 移除槽与索引", () => {
    saveSlot("1", makeState(), { clinicName: "森林诊所", day: 1, level: 1, money: 500 });
    expect(loadSlot("1")).not.toBeNull();
    expect(deleteSlot("1")).toBe(true);
    expect(loadSlot("1")).toBeNull();
    expect(listSlots()).toHaveLength(0);
  });

  it("nextSlotId 数字递增；删除槽后回落到未占用数字（安全，已删槽无数据）", () => {
    saveSlot("1", makeState(), { clinicName: "A", day: 1, level: 1, money: 500 });
    saveSlot("2", makeState(), { clinicName: "B", day: 1, level: 1, money: 500 });
    expect(nextSlotId()).toBe("3");
    deleteSlot("2");
    // 槽 2 已删（无数据），新游戏可安全复用该数字
    expect(nextSlotId()).toBe("2");
    expect(loadSlot("2")).toBeNull();
  });

  it("migrateLegacySave：旧裸档迁移为槽位 1，清旧档防重复", () => {
    const old = makeState({ clinicName: "老档诊所", day: 7, level: 3, money: 2000 });
    saveGameState(old);
    expect(loadGameState()).not.toBeNull();

    const migrated = migrateLegacySave<ReturnType<typeof makeState>>();
    expect(migrated).toBe("1");
    const loaded = loadSlot<ReturnType<typeof makeState>>("1");
    expect(loaded!.state.clinicName).toBe("老档诊所");
    expect(loaded!.meta).toMatchObject({ id: "1", day: 7, level: 3, money: 2000, source: "local" });
    // 旧单档已清掉，二次迁移返回 null（不丢档不重复）
    expect(loadGameState()).toBeNull();
    expect(migrateLegacySave()).toBeNull();
    // 槽位仍完整保留
    expect(loadSlot<ReturnType<typeof makeState>>("1")).not.toBeNull();
  });

  it("migrateLegacySave：已有新槽时不再迁移", () => {
    saveSlot("2", makeState(), { clinicName: "新档", day: 1, level: 1, money: 500 });
    saveGameState(makeState({ clinicName: "旧档" }));
    expect(migrateLegacySave()).toBeNull();
    // 旧档保持原样（不误删）
    expect(loadGameState()).not.toBeNull();
  });

  it("无旧档时 migrateLegacySave 返回 null", () => {
    expect(migrateLegacySave()).toBeNull();
  });
});

describe("本地账号", () => {
  beforeEach(() => {
    setGlobalDriver(new MemoryDriver());
  });

  it("registerUser：未注册生成 u_ 前缀 id，注册后 loadUser/hasUser 可用", () => {
    expect(hasUser()).toBe(false);
    const res = registerUser("小俊");
    expect(res.status).toBe("ok");
    const p = (res as { profile: UserProfile }).profile;
    expect(p.id).toMatch(/^u_/);
    expect(p.name).toBe("小俊");
    expect(hasUser()).toBe(true);
    expect(loadUser()).toMatchObject({ id: p.id, name: "小俊" });
  });

  it("registerUser：再次注册复用原 id 只更新昵称", () => {
    const first = (registerUser("小俊") as { profile: UserProfile }).profile;
    const res = registerUser("阿禾");
    expect(res.status).toBe("ok");
    const second = (res as { profile: UserProfile }).profile;
    expect(second.id).toBe(first.id);
    expect(second.name).toBe("阿禾");
    expect(loadUser()!.name).toBe("阿禾");
  });

  it("registerUser：昵称永久唯一——清账号后同昵称不可再注册", () => {
    registerUser("俊仪");
    clearUser(); // 账号清除，但昵称登记表保留
    expect(hasUser()).toBe(false);
    expect(registerUser("俊仪").status).toBe("duplicate");
    expect(hasUser()).toBe(false); // 冲突不落盘
  });

  it("registerUser：换昵称后旧昵称仍被永久占用", () => {
    registerUser("小俊");
    registerUser("阿禾"); // 当前账号改名阿禾
    clearUser();
    // 旧昵称「小俊」与新昵称「阿禾」都不可再注册
    expect(registerUser("小俊").status).toBe("duplicate");
    expect(registerUser("阿禾").status).toBe("duplicate");
    expect(registerUser("新来者").status).toBe("ok");
  });

  it("registerUser：空昵称返回 invalid", () => {
    expect(registerUser("   ").status).toBe("invalid");
  });

  it("ensureNicknameRegistered：存量账号补登昵称（老数据升级）", () => {
    // 老数据：只有 profile、无登记表 → 补登后该昵称被占用
    getStorage().set(NS.USER_PROFILE, { id: "u_old", name: "老账号", createdAt: Date.now() });
    const user = loadUser();
    expect(user).not.toBeNull();
    ensureNicknameRegistered(user!);
    clearUser();
    expect(registerUser("老账号").status).toBe("duplicate");
  });

  it("clearUser 清除账号（存档归属标记保留在槽里）", () => {
    registerUser("小俊");
    expect(clearUser()).toBe(true);
    expect(hasUser()).toBe(false);
    expect(loadUser()).toBeNull();
  });
});

describe("Storage driver 切换", () => {
  beforeEach(() => {
    setGlobalDriver(new LocalStorageDriver()); // 恢复默认，避免其他 describe 的注入污染
  });
  afterEach(() => {
    setGlobalDriver(new LocalStorageDriver()); // 恢复默认，避免污染其他测试
  });

  it("node 环境默认 LocalStorageDriver 不可用（get/set 优雅降级为 null/false）", () => {
    expect(loadGameState()).toBeNull();
    expect(saveGameState(makeState())).toBe(false);
    expect(loadGameState()).toBeNull();
  });

  it("setGlobalDriver 切换后数据路由到新 driver（互不共享）", () => {
    setGlobalDriver(new MemoryDriver());
    expect(saveGameState(makeState())).toBe(true);
    expect(loadGameState()).not.toBeNull();
    // 切回默认后读不到内存 driver 的数据
    setGlobalDriver(new LocalStorageDriver());
    expect(loadGameState()).toBeNull();
  });
});

describe("命名空间约定", () => {
  it("槽位 key 与旧单档 key 前缀错开", () => {
    expect(NS.GAME_SAVE).toBe("ps.save.v1");
    expect(NS.SAVE_INDEX).toBe("ps.saveIdx.v1");
    // 槽位 key 以 ps.slot. 开头，与 ps.save. 错开
    expect("ps.slot.1").not.toBe(NS.GAME_SAVE);
  });
});
