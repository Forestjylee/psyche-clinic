// ============================================================
// Storage 抽象层：为未来 Cloudflare 部署做迁移准备
//
// 设计原则：
// 1. 所有持久化通过 StorageDriver 接口，不直接用 localStorage
// 2. 当前默认 LocalStorageDriver（本地），后续只需新增：
//    - Cloudflare KV / R2 Driver
//    - Cloudflare D1 Driver（SQLite-compatible）
// 3. 所有数据实体有独立 key 前缀，便于拆分/迁移
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
  GAME_SAVE: "ps.save.v1",      // 游戏存档
  ACHIEVEMENTS: "ps.ach.v1",    // 成就解锁记录
  USER_PROFILE: "ps.user.v1",   // 用户资料（将来 Cloudflare Users API 对接）
  SETTINGS: "ps.setting.v1",    // 游戏设置
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
