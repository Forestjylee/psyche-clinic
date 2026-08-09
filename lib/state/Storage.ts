// ============================================================
// Storage 抽象层：为未来 Cloudflare 部署做迁移准备
//
// 设计原则：
// 1. 所有持久化通过 StorageDriver 接口，不直接用 localStorage
// 2. 当前默认 LocalStorageDriver（本地），后续只需新增：
//    - Cloudflare KV / R2 Driver
//    - Cloudflare D1 Driver（SQLite-compatible）
// 3. 所有数据实体有独立 key 前缀，便于拆分/迁移
// 4. 存档为「多槽位 + 本地账号」：每槽独立 key，槽索引存元信息；
//    旧单档（ps.save.v1）自动迁移为槽位 1，不丢档
// ============================================================

/** 通用存储驱动接口 */
export interface StorageDriver {
  get<T>(key: string): T | null;
  set<T>(key: string, value: T): boolean;
  remove(key: string): boolean;
  has(key: string): boolean;
  /** 批量读，缺失返回 null */
  getMany<T>(keys: string[]): Record<string, T | null>;
}

// ---------- 数据命名空间（避免不同实体 key 冲突）----------
export const NS = {
  GAME_SAVE: "ps.save.v1",      // 游戏存档（旧单档，迁移用）
  ACHIEVEMENTS: "ps.ach.v1",    // 成就解锁记录
  USER_PROFILE: "ps.user.v1",   // 用户资料（昵称 + 自动生成的用户 ID，区分不同用户存档）
  USER_NAMES: "ps.usernames.v1", // 已注册昵称登记表（昵称 → 用户 id，永久保留，已用昵称不可再注册）
  SETTINGS: "ps.setting.v1",    // 游戏设置
  SAVE_INDEX: "ps.saveIdx.v1",  // 多槽位存档索引（槽位 id → 元信息）
  // 预留：将来后端 API
  // _remote_sync_token: "ps.sync.v1",
} as const;

// ============================================================
// LocalStorageDriver · 默认实现
// ============================================================
export class LocalStorageDriver implements StorageDriver {
  private get safe(): Storage | null {
    if (typeof window === "undefined") return null;
    try {
      return window.localStorage;
    } catch {
      return null;
    }
  }

  get<T>(key: string): T | null {
    const s = this.safe;
    if (!s) return null;
    try {
      const raw = s.getItem(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  }

  set<T>(key: string, value: T): boolean {
    const s = this.safe;
    if (!s) return false;
    try {
      s.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  remove(key: string): boolean {
    const s = this.safe;
    if (!s) return false;
    try {
      s.removeItem(key);
      return true;
    } catch {
      return false;
    }
  }

  has(key: string): boolean {
    const s = this.safe;
    return s ? s.getItem(key) !== null : false;
  }

  getMany<T>(keys: string[]): Record<string, T | null> {
    const out: Record<string, T | null> = {};
    for (const k of keys) out[k] = this.get<T>(k);
    return out;
  }
}

// ============================================================
// 全局 Driver 单例（后续可调用 setGlobalDriver 切换为远端）
// ============================================================
let _driver: StorageDriver = new LocalStorageDriver();
export function getStorage(): StorageDriver {
  return _driver;
}
/**
 * 迁移时注入：例如 Cloudflare Pages Functions 侧，
 * 替换为 KV/D1 Driver，所有调用点无需改动。
 */
export function setGlobalDriver(d: StorageDriver): void {
  _driver = d;
}

// ============================================================
// 多槽位存档（v1.8）：槽索引 + 每槽独立 key
// ============================================================

/** 槽位 key：ps.slot.<id>（与旧单档 ps.save.v1 前缀错开，避免冲突） */
function slotKey(id: string): string {
  return `ps.slot.${id}`;
}

/** 存档槽元信息（列表展示用；source 区分本地/云端，云端预留） */
export interface SaveSlotMeta {
  /** 槽位 id */
  id: string;
  /** 诊所名 */
  clinicName: string;
  /** 游戏天数 */
  day: number;
  /** 医生等级 */
  level: number;
  /** 金钱 */
  money: number;
  /** 最近保存时间戳 */
  updatedAt: number;
  /** 存档来源：local = 本地；cloud 预留（后端接入后使用） */
  source: "local" | "cloud";
  /** 归属用户 id（本地账号自动生成） */
  userId: string;
  /** 归属用户昵称 */
  userName: string;
}

export interface SaveSlotState<T> {
  meta: SaveSlotMeta;
  state: T;
}

/** 读槽索引（缺失返回空对象） */
export function readSaveIndex(): Record<string, SaveSlotMeta> {
  return _driver.get<Record<string, SaveSlotMeta>>(NS.SAVE_INDEX) ?? {};
}

/** 写槽索引 */
export function writeSaveIndex(index: Record<string, SaveSlotMeta>): boolean {
  return _driver.set<Record<string, SaveSlotMeta>>(NS.SAVE_INDEX, index);
}

/** 列出所有槽位元信息（按更新时间倒序） */
export function listSlots(): SaveSlotMeta[] {
  return Object.values(readSaveIndex()).sort((a, b) => b.updatedAt - a.updatedAt);
}

/** 读指定槽的完整存档数据 */
export function loadSlot<T>(id: string): SaveSlotState<T> | null {
  return _driver.get<SaveSlotState<T>>(slotKey(id));
}

/**
 * 保存到指定槽：写状态 + 更新索引元信息。
 * meta 里的 userId/userName 取当前账号；source 固定 "local"（云端接入后再扩展）。
 */
export function saveSlot<T>(
  id: string,
  state: T,
  meta: Omit<SaveSlotMeta, "id" | "updatedAt" | "source" | "userId" | "userName">,
  profile?: { id: string; name: string }
): boolean {
  const index = readSaveIndex();
  const existing = index[id];
  const now = Date.now();
  const full: SaveSlotMeta = {
    id,
    clinicName: meta.clinicName,
    day: meta.day,
    level: meta.level,
    money: meta.money,
    updatedAt: now,
    source: "local",
    userId: existing?.userId ?? profile?.id ?? "",
    userName: existing?.userName ?? profile?.name ?? "",
  };
  const ok = _driver.set<SaveSlotState<T>>(slotKey(id), { meta: full, state });
  if (!ok) return false;
  index[id] = full;
  return writeSaveIndex(index);
}

/** 删除指定槽（连同索引） */
export function deleteSlot(id: string): boolean {
  const index = readSaveIndex();
  const removed = _driver.remove(slotKey(id));
  if (id in index) delete index[id];
  writeSaveIndex(index);
  return removed;
}

/** 生成下一个可用槽位 id（数字递增） */
export function nextSlotId(): string {
  const ids = Object.keys(readSaveIndex()).map(Number).filter((n) => !Number.isNaN(n));
  const max = ids.length ? Math.max(...ids) : 0;
  return String(max + 1);
}

/**
 * 旧单档迁移：检测到旧单档（ps.save.v1）且槽索引为空时，迁移为槽位 1。
 * 返回迁移后的槽位 id；无旧档或已迁移返回 null。
 */
export function migrateLegacySave<T>(): string | null {
  const raw = _driver.get<SaveSlotState<T> | T>(NS.GAME_SAVE);
  if (raw == null) return null;
  const index = readSaveIndex();
  if (Object.keys(index).length > 0) return null; // 已有新档，不再迁移
  const state = raw as T;
  // 兼容两种旧格式：SaveSlotState 带 meta / 裸 GameState 直接取字段兜底
  const meta =
    (raw as SaveSlotState<T>).meta && (raw as SaveSlotState<T>).state
      ? (raw as SaveSlotState<T>).meta
      : undefined;
  const s = state as Record<string, unknown>;
  const now = Date.now();
  const m: SaveSlotMeta = {
    id: "1",
    clinicName: (s.clinicName as string) ?? meta?.clinicName ?? "森林诊所",
    day: typeof s.day === "number" ? (s.day as number) : (meta?.day ?? 1),
    level: typeof s.level === "number" ? (s.level as number) : (meta?.level ?? 1),
    money: typeof s.money === "number" ? (s.money as number) : (meta?.money ?? 500),
    updatedAt: meta?.updatedAt ?? now,
    source: "local",
    userId: meta?.userId ?? "",
    userName: meta?.userName ?? "",
  };
  const ok = _driver.set<SaveSlotState<T>>(slotKey("1"), { meta: m, state });
  if (!ok) return null;
  const index2 = readSaveIndex();
  index2["1"] = m;
  writeSaveIndex(index2);
  // 迁移后清掉旧单档，避免重复迁移
  _driver.remove(NS.GAME_SAVE);
  return "1";
}

// ============================================================
// 本地账号（昵称 + 自动生成用户 ID）· 区分不同用户存档
// ============================================================

export interface UserProfile {
  /** 自动生成的用户 ID（本地唯一；将来接云端账号时与云端绑定） */
  id: string;
  /** 昵称 */
  name: string;
  /** 注册时间戳 */
  createdAt: number;
}

/** 读取当前本地账号（未注册返回 null） */
export function loadUser(): UserProfile | null {
  return _driver.get<UserProfile>(NS.USER_PROFILE);
}

/** 已注册返回 true */
export function hasUser(): boolean {
  return _driver.has(NS.USER_PROFILE);
}

/** 已注册昵称登记表：昵称 → 用户 id。已用昵称永久保留，任何人不可再注册。 */
export function readUserNameIndex(): Record<string, string> {
  return _driver.get<Record<string, string>>(NS.USER_NAMES) ?? {};
}

/** 注册结果：ok（成功）/ duplicate（昵称已被其他用户永久占用）/ invalid（空昵称） */
export type RegisterOutcome =
  | { status: "ok"; profile: UserProfile }
  | { status: "duplicate" }
  | { status: "invalid" };

/**
 * 注册/登录：昵称全局唯一（已用昵称永久保留，不可再注册）。
 * 已有账号则复用原 ID、更新昵称（旧昵称留在登记表里，永久不可再用）；
 * 新账号生成 u_<time36>_<rand36> 用户 ID。返回结果对象，冲突不落盘。
 */
export function registerUser(name: string): RegisterOutcome {
  const trimmed = name.trim();
  if (!trimmed) return { status: "invalid" };
  const existing = loadUser();
  const index = readUserNameIndex();
  // 昵称已被其他用户占用（本地任何账号注册过即永久保留）→ 冲突
  if (index[trimmed] && index[trimmed] !== existing?.id) {
    return { status: "duplicate" };
  }
  const profile: UserProfile = existing
    ? { ...existing, name: trimmed }
    : {
        id: `u_${Date.now().toString(36)}_${Math.floor(Math.random() * 1e6).toString(36)}`,
        name: trimmed,
        createdAt: Date.now(),
      };
  index[trimmed] = profile.id; // 永久登记（换昵称时旧昵称不移除）
  _driver.set<Record<string, string>>(NS.USER_NAMES, index);
  _driver.set<UserProfile>(NS.USER_PROFILE, profile);
  return { status: "ok", profile };
}

/** 存量账号补登：当前账号昵称若尚未进登记表则登记（老数据升级，不冲突不报错） */
export function ensureNicknameRegistered(user: UserProfile): void {
  const index = readUserNameIndex();
  if (!index[user.name]) {
    index[user.name] = user.id;
    _driver.set<Record<string, string>>(NS.USER_NAMES, index);
  }
}

/** 登出/清除本地账号（存档元信息里的归属标记保留；昵称登记表保留，昵称永久唯一） */
export function clearUser(): boolean {
  return _driver.remove(NS.USER_PROFILE);
}

// ============================================================
// 便捷函数：实体级访问（业务层应尽量用这些，而不是直接用 get/set）
// ============================================================
export function saveGameState<T>(state: T): boolean {
  return _driver.set<T>(NS.GAME_SAVE, state);
}
export function loadGameState<T>(): T | null {
  return _driver.get<T>(NS.GAME_SAVE);
}
export function clearGameState(): boolean {
  return _driver.remove(NS.GAME_SAVE);
}
export function saveAchievements<T>(data: T): boolean {
  return _driver.set<T>(NS.ACHIEVEMENTS, data);
}
export function loadAchievements<T>(): T | null {
  return _driver.get<T>(NS.ACHIEVEMENTS);
}
export function clearAchievements(): boolean {
  return _driver.remove(NS.ACHIEVEMENTS);
}
