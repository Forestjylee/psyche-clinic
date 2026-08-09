import { describe, it, expect, beforeEach } from "vitest";
import { setGlobalDriver, type StorageDriver, listSlots, loadSlot } from "./state/Storage";
import { useGameStore } from "./store";
import { createInitialState } from "./state/GameState";

/** 内存 driver：node 环境无 localStorage，注入后验证 store 槽位逻辑 */
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

type GameT = ReturnType<typeof createInitialState>;

describe("store 槽位逻辑（账号 / 新游戏 / 继续 / 删除 / 保存）", () => {
  beforeEach(() => {
    setGlobalDriver(new MemoryDriver());
    useGameStore.setState({
      game: createInitialState(),
      scene: "title",
      activeSlotId: null,
      saveSlots: [],
      currentUser: null,
      hasSave: false,
      prologueVisible: false,
    });
  });

  it("register 写入本地账号", () => {
    const res = useGameStore.getState().register("小俊");
    expect(res.status).toBe("ok");
    expect(useGameStore.getState().currentUser?.name).toBe("小俊");
  });

  it("register 拒绝空昵称（invalid）", () => {
    expect(useGameStore.getState().register("   ").status).toBe("invalid");
    expect(useGameStore.getState().currentUser).toBeNull();
  });

  it("register 拒绝重复昵称（duplicate），且当前账号不变", () => {
    useGameStore.getState().register("俊仪");
    useGameStore.getState().clearUser(); // 账号清除，昵称登记保留
    const res = useGameStore.getState().register("俊仪");
    expect(res.status).toBe("duplicate");
    expect(useGameStore.getState().currentUser).toBeNull();
    // 换昵称可正常注册
    expect(useGameStore.getState().register("新来者").status).toBe("ok");
    expect(useGameStore.getState().currentUser?.name).toBe("新来者");
  });

  it("newGame 分配新槽、进入 clinic、槽位打上账号归属", () => {
    useGameStore.getState().register("小俊");
    useGameStore.getState().newGame("安心诊所");
    const s = useGameStore.getState();
    expect(s.activeSlotId).not.toBeNull();
    expect(s.hasSave).toBe(true);
    expect(s.scene).toBe("clinic");
    expect(s.game.clinicName).toBe("安心诊所");
    expect(listSlots()).toHaveLength(1);
    expect(listSlots()[0]).toMatchObject({ clinicName: "安心诊所", userName: "小俊", source: "local" });
  });

  it("newGame 指定槽覆盖已有存档，不新增槽", () => {
    useGameStore.getState().newGame("老档");
    const firstId = useGameStore.getState().activeSlotId!;
    useGameStore.getState().newGame("新档", firstId);
    const s = useGameStore.getState();
    expect(s.activeSlotId).toBe(firstId);
    expect(s.game.clinicName).toBe("新档");
    expect(listSlots()).toHaveLength(1);
    expect(listSlots()[0].clinicName).toBe("新档");
  });

  it("continueGame 从指定槽读取并进入 clinic", () => {
    useGameStore.getState().newGame("诊所A");
    const id = useGameStore.getState().activeSlotId!;
    useGameStore.getState().setScene("title");
    useGameStore.getState().continueGame(id);
    const s = useGameStore.getState();
    expect(s.scene).toBe("clinic");
    expect(s.activeSlotId).toBe(id);
    expect(s.game.clinicName).toBe("诊所A");
  });

  it("saveNow 覆盖当前槽（进度落盘）", () => {
    useGameStore.getState().newGame("诊所B");
    const id = useGameStore.getState().activeSlotId!;
    useGameStore.getState().game.day += 2; // 模拟推进
    const expectDay = useGameStore.getState().game.day;
    useGameStore.getState().saveNow();
    const saved = loadSlot<GameT>(id)!;
    expect(saved.state.day).toBe(expectDay);
    expect(saved.meta.day).toBe(expectDay);
  });

  it("deleteSlot 移除槽；删除当前槽后清空 activeSlotId 且回标题态", () => {
    useGameStore.getState().newGame("待删");
    const id = useGameStore.getState().activeSlotId!;
    useGameStore.getState().deleteSlot(id);
    const s = useGameStore.getState();
    expect(s.activeSlotId).toBeNull();
    expect(s.hasSave).toBe(false);
    expect(listSlots()).toHaveLength(0);
  });
});
