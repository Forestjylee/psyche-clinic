# 复诊系统（患者生命周期重构）Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把患者生命周期从「一次接诊即结束」重构为「候诊 → 已诊疗 → 离场/复诊」三层模型，结局决定复诊倾向 + 独立复诊剧情。

**Architecture:** 复诊判定是纯逻辑，集中在 `lib/state/GameState.ts`（概率表 + `rollFollowUps()` 纯函数）；`useGame.tsx` 只在 `finishSession`/`restOneDay`/`serveablePatients` 三处接线；UI 层（大厅、追踪）只读状态渲染。结局判定在 `DialogueEngine` 加入复诊入口。全部逻辑 TDD：先写测试（RED）→ 最小实现（GREEN）→ 重构。

**Tech Stack:** TypeScript 5.5 / Next.js 14 / vitest（纯函数测试）/ 浏览器验证（Playwright MCP）。

## Global Constraints

- **TDD 铁律**：无失败测试不写生产代码。每个纯函数先写测试、跑红、再实现跑绿。
- **存档兼容**：`loadGame()` 必须为旧存档补齐新字段默认值（`discharged: []`、`followUpCount: {}`、`todayFollowUps: []`、`followUpIdleDays: {}`），旧存档可继续玩。
- **术语**：离场（结案，不再复诊）/ 复诊池（待复诊）/ 复诊中。禁用「已沉沦」等旧说法。
- **概率表**（SPEC §3.4）：cure/acceptance 5%、dependent 60%、worsen/tragic 0%、hidden/transfer/awakening 25%。
- **默认值**：`DEFAULT_MAX_FOLLOW_UPS = 2`、`FOLLOW_UP_GRACE_DAYS = 6`。
- **复诊施压（ADR-002）**：复诊池患者连续未复诊天数满 `FOLLOW_UP_GRACE_DAYS` 触发「放弃复诊」——扣声望（复用 `REPUTATION_LOSS_PER_ABANDON`）并离场；与候诊 `waitingDays` 独立记录。
- **复诊报酬递减（ADR-004）**：复诊报酬为初诊的 70%，第 2 次复诊约 40%。
- **复诊碎片（ADR-006）**：复诊配置 `followUpFragments`（初诊碎片不重复触发）。
- 不改 `EndingType` 联合类型、不改 `DialogueNode` 结构（仅新增字段）。
- 每次任务绿后 `npm run typecheck && npm test`，再 commit。

---

### Task 1: 数据层字段 + 存档兼容

**Files:**
- Modify: `lib/types.ts`（PatientScenario、GameState 接口）
- Modify: `lib/state/GameState.ts`（`createInitialState`、`loadGame`）
- Test: `lib/state/GameState.test.ts`

**Interfaces:**
- Produces: `GameState` 新增 `discharged: string[]`、`followUpCount: Record<string, number>`、`todayFollowUps: string[]`、`followUpIdleDays: Record<string, number>`；`PatientScenario` 新增 `followUpDialogues?`、`followUpStart?`、`maxFollowUps?`（已部分完成，本任务核对收尾）

- [ ] **Step 1: 写失败测试（存档兼容）**

```typescript
import { describe, it, expect } from "vitest";
import { loadGame, createInitialState } from "./GameState";

describe("loadGame 存档兼容", () => {
  it("旧存档缺少复诊字段时补齐默认值", () => {
    // 模拟旧存档：无 discharged/followUpCount/todayFollowUps/followUpIdleDays
    const legacy = { doctor: { reputation: 10, sanity: 100, money: 500, exp: 0, level: 1 }, skills: [], clinicUpgrades: [], patientRecords: {}, day: 1, slot: 0, todayServed: [], waitingDays: {}, abandoned: [], messages: [], generatedScenarios: [] };
    // loadGame 从 localStorage 读取；此处仅验证 loadGame 内部迁移逻辑可被独立触发
    // 方案：把迁移逻辑抽成 `migrateGameState(data)` 纯函数供测试
  });
});
```

- [ ] **Step 2: 跑测试确认红**

Run: `npx vitest run lib/state/GameState.test.ts`
Expected: FAIL（`migrateGameState` 不存在 / 断言失败）

- [ ] **Step 3: 最小实现**

```typescript
// GameState.ts —— 抽出可测的迁移纯函数
export function migrateGameState(data: GameState): GameState {
  if (!Array.isArray(data.discharged)) data.discharged = [];
  if (!data.followUpCount) data.followUpCount = {};
  if (!Array.isArray(data.todayFollowUps)) data.todayFollowUps = [];
  if (!data.followUpIdleDays) data.followUpIdleDays = {};
  return data;
}
```
`loadGame()` 末尾调用 `return migrateGameState(data)`；`createInitialState()` 的返回值补全四个新字段（`discharged: []`、`followUpCount: {}`、`todayFollowUps: []`、`followUpIdleDays: {}`）。

- [ ] **Step 4: 跑测试确认绿**

Run: `npx vitest run lib/state/GameState.test.ts`
Expected: PASS

- [ ] **Step 5: typecheck + commit**

```bash
npm run typecheck && npm test
git add lib/types.ts lib/state/GameState.ts lib/state/GameState.test.ts
git commit -m "feat: 复诊系统数据层字段与存档兼容（TDD）"
```

---

### Task 2: 复诊概率纯逻辑 `rollFollowUps`

**Files:**
- Modify: `lib/state/GameState.ts`
- Test: `lib/state/GameState.test.ts`

**Interfaces:**
- Produces: `FOLLOW_UP_CHANCE: Record<EndingType, number>`；`DEFAULT_MAX_FOLLOW_UPS = 2`；`FOLLOW_UP_GRACE_DAYS = 5`；`rollFollowUps(patientRecords, discharged, abandoned, followUpCount, followUpIdleDays, opts: {maxFollowUps, graceDays}, random): FollowUpRollResult`，`FollowUpRollResult = { followUpsToday: string[]; discharged: string[]; followUpCount: Record<string, number>; followUpIdleDays: Record<string, number> }`
- 语义：对每个已诊疗患者——已 discharged/abandoned 跳过；`count >= maxFollowUps` 离场；`random() < chance` 命中复诊（idle 归 0，进 `followUpsToday`）；否则 `chance === 0` 立即离场（恶化/悲剧），其余 `idle+1`、达到 `graceDays` 离场。

- [ ] **Step 1: 写失败测试**

```typescript
describe("rollFollowUps 复诊 roll", () => {
  const opts = { maxFollowUps: 2, graceDays: 5 };
  it("依赖结局 roll 命中进入今日复诊，idle 归零", () => {
    const r = rollFollowUps({ p1: "dependent" }, [], [], {}, {}, opts, () => 0.5);
    expect(r.followUpsToday).toEqual(["p1"]);
    expect(r.followUpIdleDays.p1).toBe(0);
  });
  it("依赖结局 roll 未命中则 idle+1，未达宽限不离场", () => {
    const r = rollFollowUps({ p1: "dependent" }, [], [], {}, {}, opts, () => 0.7);
    expect(r.followUpsToday).toEqual([]);
    expect(r.followUpIdleDays.p1).toBe(1);
    expect(r.discharged).toEqual([]);
  });
  it("恶化/悲剧结局直接离场（概率 0）", () => {
    const r = rollFollowUps({ p1: "worsen", p2: "tragic" }, [], [], {}, {}, opts, () => 0.1);
    expect(r.discharged).toContain("p1");
    expect(r.discharged).toContain("p2");
    expect(r.followUpsToday).toEqual([]);
  });
  it("复诊次数达上限即离场", () => {
    const r = rollFollowUps({ p1: "dependent" }, [], [], { p1: 2 }, {}, opts, () => 0.1);
    expect(r.discharged).toContain("p1");
  });
  it("已离场/已放弃患者跳过", () => {
    const r = rollFollowUps({ p1: "dependent" }, ["p1"], ["p2"], {}, {}, opts, () => 0.1);
    expect(r.followUpsToday).toEqual([]);
    expect(r.discharged).toEqual(["p1"]);
  });
  it("连续未复诊达宽限天数自动离场", () => {
    const r = rollFollowUps({ p1: "dependent" }, [], [], {}, { p1: 4 }, opts, () => 0.9);
    expect(r.discharged).toContain("p1");
  });
  it("命中复诊后 idle 重置", () => {
    const r = rollFollowUps({ p1: "dependent" }, [], [], {}, { p1: 3 }, opts, () => 0.5);
    expect(r.followUpsToday).toContain("p1");
    expect(r.followUpIdleDays.p1).toBe(0);
  });
});
```

- [ ] **Step 2: 跑测试确认红**

Run: `npx vitest run lib/state/GameState.test.ts`
Expected: FAIL（`rollFollowUps` / `FOLLOW_UP_CHANCE` 不存在）

- [ ] **Step 3: 最小实现**（GameState.ts，见 Global Constraints 概率表与语义）

- [ ] **Step 4: 跑测试确认绿**

Run: `npx vitest run lib/state/GameState.test.ts`
Expected: PASS

- [ ] **Step 5: typecheck + commit**

```bash
npm run typecheck && npm test
git add lib/state/GameState.ts lib/state/GameState.test.ts
git commit -m "feat: 复诊概率纯逻辑 rollFollowUps（TDD）"
```

---

### Task 3: `advanceDayState` 集成复诊 roll

**Files:**
- Modify: `lib/state/GameState.ts`
- Test: `lib/state/GameState.test.ts`

**Interfaces:**
- Consumes: `rollFollowUps`（Task 2）、`FOLLOW_UP_CHANCE`
- Modifies: `advanceDayState(g, serveable, random?)` 签名加可选 `random`（默认 `Math.random`，测试注入）
- Produces: `advanceDayState` 内部在重置 slot/todayServed 后：① 既有候诊 waitingDays 推进（回归不变）；② 调 `rollFollowUps` 并把结果写入 `g.todayFollowUps`/`g.discharged`/`g.followUpCount`/`g.followUpIdleDays`。

- [ ] **Step 1: 写失败测试**

```typescript
describe("advanceDayState 复诊集成", () => {
  it("每日结算后 todayFollowUps 填充命中患者，slot/todayServed 重置", () => {
    const g = createInitialState();
    g.slot = 3; g.todayServed = ["x"];
    g.patientRecords = { p1: "dependent" };
    advanceDayState(g, [], () => 0.5);
    expect(g.slot).toBe(0);
    expect(g.todayServed).toEqual([]);
    expect(g.todayFollowUps).toContain("p1");
  });
  it("候诊等待天数回归：可接诊未接诊患者 waitingDays 推进", () => {
    const g = createInitialState();
    advanceDayState(g, [{ id: "p1", name: "甲" }], () => 0.5);
    expect(g.waitingDays.p1).toBe(1);
  });
});
```

- [ ] **Step 2: 跑测试确认红**

Run: `npx vitest run lib/state/GameState.test.ts`
Expected: FAIL（`todayFollowUps` 未填充）

- [ ] **Step 3: 最小实现**（advanceDayState 内接线 rollFollowUps）

- [ ] **Step 4: 跑测试确认绿**

Run: `npx vitest run lib/state/GameState.test.ts`
Expected: PASS（含 Task 1/2 全绿）

- [ ] **Step 5: typecheck + commit**

```bash
npm run typecheck && npm test
git add lib/state/GameState.ts lib/state/GameState.test.ts
git commit -m "feat: advanceDayState 集成复诊 roll（TDD）"
```

---

### Task 4: useGame 接线（finishSession / serveablePatients / restOneDay）

**Files:**
- Modify: `lib/hooks/useGame.tsx`
- Test: 抽 `finishSession` 复诊判定为可测纯函数（本任务内）

**Interfaces:**
- Consumes: `rollFollowUps`、`DEFAULT_MAX_FOLLOW_UPS`（Task 2）
- Produces: `serveablePatients` 逻辑改为——候诊 = 未 discharged 未 abandoned；复诊池患者（有 patientRecords）仅在 `todayFollowUps` 命中时进入可接诊列表；`finishSession` 复诊分支——若 `patientId` 已在 `patientRecords`（复诊）：`followUpCount[id]++`，若结局 cure/acceptance 或 `count >= maxFollowUps` 则 push 进 `discharged`；`startSession` 允许复诊患者。

- [ ] **Step 1: 写失败测试（复诊结算判定抽纯函数 `settleFollowUp`）**

```typescript
// useGame 里抽出的纯函数，放 GameState.ts 便于测试
describe("settleFollowUp 复诊结算", () => {
  it("复诊结局治愈即离场", () => {
    const r = settleFollowUp("cure", 1, 2);
    expect(r.discharge).toBe(true);
  });
  it("未达上限未治愈继续复诊池", () => {
    const r = settleFollowUp("dependent", 1, 2);
    expect(r.discharge).toBe(false);
  });
  it("达复诊上限离场", () => {
    const r = settleFollowUp("hidden", 2, 2);
    expect(r.discharge).toBe(true);
  });
});
```

- [ ] **Step 2: 跑测试确认红** → `settleFollowUp` 不存在，FAIL
- [ ] **Step 3: 最小实现 `settleFollowUp` + useGame 接线**

```typescript
export function settleFollowUp(ending: EndingType, count: number, maxFollowUps: number): { discharge: boolean } {
  const discharge = ending === "cure" || ending === "acceptance" || count >= maxFollowUps;
  return { discharge };
}
```
`finishSession` 中：初诊（patientId 不在 patientRecords）时仅记录结局；复诊时 `g.followUpCount[patientId] = (g.followUpCount[patientId] ?? 0) + 1`，再按 `settleFollowUp` 决定是否 `g.discharged.push(patientId)`。`serveablePatients` 排除 `discharged`；复诊患者进入候选依赖 `todayFollowUps`。`restOneDay` 的 `advanceDayState` 调用传入 `g`。

- [ ] **Step 4: 跑测试确认绿** → PASS
- [ ] **Step 5: typecheck + commit**

```bash
npm run typecheck && npm test
git add lib/state/GameState.ts lib/hooks/useGame.tsx lib/state/GameState.test.ts
git commit -m "feat: useGame 接线复诊结算（TDD）"
```

---

### Task 5: 大厅 UI 初诊/复诊/离场区分

**Files:**
- Modify: `components/game/ClinicHall.tsx`
- Modify: `app/globals.css`（复诊卡样式）

**Interfaces:**
- Consumes: `game.discharged`、`game.todayFollowUps`、`game.followUpCount`、`game.patientRecords`
- 验证方式：浏览器（Playwright MCP），无单测

- [ ] **Step 1: 改渲染逻辑**——`allAvailable` 排除 `discharged`；患者卡片按状态标三类：复诊（在 `todayFollowUps` 且有 `patientRecords`）显示「复诊 · 第 N 次」徽标 + 上次结局色；初诊（无 patientRecords）显示等待天数；离场患者不再出现。
- [ ] **Step 2: 加 CSS**——`.patient-followup-tag` 复用 `.patient-difficulty` 视觉，配新样式。
- [ ] **Step 3: 浏览器验证**——构造含复诊/初诊的状态，截图确认三类卡片显示正确。
- [ ] **Step 4: commit**

```bash
npm run typecheck
git add components/game/ClinicHall.tsx app/globals.css
git commit -m "feat: 大厅预约列表区分初诊/复诊/离场"
```

---

### Task 6: 追踪档案状态显示

**Files:**
- Modify: `components/game/Tracking.tsx`（定位实际文件后）
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `discharged`/`followUpCount`/`abandoned`/`patientRecords`
- 状态标签：已治愈离场 / 复诊中（第 N 次）/ 放弃治疗 / 候诊中

- [ ] **Step 1: 定位 Tracking 组件实际路径并读代码**
- [ ] **Step 2: 每患者状态行渲染对应标签**
- [ ] **Step 3: 浏览器验证截图**
- [ ] **Step 4: commit**

```bash
npm run typecheck
git add components/game/Tracking.tsx app/globals.css
git commit -m "feat: 追踪档案显示患者离场/复诊状态"
```

---

### Task 7: DialogueEngine 复诊入口

**Files:**
- Modify: `lib/engine/DialogueEngine.ts`
- Test: `lib/engine/DialogueEngine.test.ts`（新建）

**Interfaces:**
- Consumes: `PatientScenario.followUpDialogues`/`followUpStart`
- Produces: DialogueEngine 构造/初始化支持复诊模式——提供 `startFollowUp()` 或构造入参 `mode: "initial" | "followUp"`，对话图切换为 `followUpDialogues`、起始节点 `followUpStart`；无 `followUpDialogues` 的剧本复诊时回退初诊图。

- [ ] **Step 1: 写失败测试**

```typescript
describe("DialogueEngine 复诊入口", () => {
  const scenario = {
    ...patientC, // 复用了某个剧本
    followUpDialogues: { fu_start: { id: "fu_start", speaker: "patient", text: "复诊开场", autoNext: "fu_q" }, fu_q: { id: "fu_q", speaker: "doctor", text: "最近怎么样？", isEnding: true, endingType: "cure" } },
    followUpStart: "fu_start",
  };
  it("复诊模式起始节点为 followUpStart", () => {
    const eng = new DialogueEngine(scenario);
    eng.startFollowUp();
    expect(eng.currentNodeId).toBe("fu_start");
  });
  it("复诊模式结束后返回结局", () => {
    // 走到 fu_q 后 next 返回 cure
  });
});
```

- [ ] **Step 2: 跑测试确认红** → `startFollowUp` 不存在，FAIL
- [ ] **Step 3: 最小实现**（DialogueEngine 加 `followUp` 状态与 `startFollowUp()`，切换图与起始节点）
- [ ] **Step 4: 跑测试确认绿** → PASS
- [ ] **Step 5: typecheck + commit**

```bash
npm run typecheck && npm test
git add lib/engine/DialogueEngine.ts lib/engine/DialogueEngine.test.ts
git commit -m "feat: DialogueEngine 复诊入口（TDD）"
```

---

### Task 8: 复诊剧情（3 个手写剧本）

**Files:**
- Modify: `lib/data/patients.ts`
- Test: `lib/data/patients.test.ts`（新建，数据完整性）

**Interfaces:**
- Produces: patientA（林晓）/ patientB（周明远）/ patientC（陈洛）各补 `followUpDialogues`（3-5 节点独立短剧情）、`followUpStart`、`maxFollowUps`

- [ ] **Step 1: 写失败测试（数据完整性）**

```typescript
describe("手写剧本复诊剧情完整性", () => {
  it.each(allPatients)("$name 复诊剧情节点可达", (p) => {
    expect(p.followUpDialogues).toBeDefined();
    expect(p.followUpStart).toBeDefined();
    expect(p.followUpDialogues![p.followUpStart!]).toBeDefined();
    expect(p.maxFollowUps).toBeGreaterThanOrEqual(1);
  });
});
```

- [ ] **Step 2: 跑测试确认红** → 当前剧本无复诊字段，FAIL
- [ ] **Step 3: 编写 3 套复诊剧情**（每套 3-5 节点：复诊开场 → 状态回访 → 结局，结局类型与初诊结局承接）
- [ ] **Step 4: 跑测试确认绿** → PASS
- [ ] **Step 5: typecheck + commit**

```bash
npm run typecheck && npm test
git add lib/data/patients.ts lib/data/patients.test.ts
git commit -m "feat: 3 个手写剧本补独立复诊剧情（TDD）"
```

---

### Task 9: 结局动态判定（真相度 + 抉择）

**Files:**
- Modify: `lib/engine/DialogueEngine.ts`
- Test: `lib/engine/DialogueEngine.test.ts`

**Interfaces:**
- Produces: 结局不再仅由 `isEnding` 节点写死——新增纯函数 `resolveEnding(truth: number, keyChoices: Record<string, string>, nodeEnding?: EndingType): EndingType`：到达结局节点时若带 `nodeEnding` 则用之；否则按真相阈值 + 关键抉择映射表兜底判定（truth ≥ 85 → cure/awakening、60~84 → acceptance、关键抉择含「转介」→ transfer 等，映射表按剧本配置）。

- [ ] **Step 1: 写失败测试（resolveEnding 阈值与抉择映射）**
- [ ] **Step 2: 跑测试确认红**
- [ ] **Step 3: 最小实现 resolveEnding + DialogueEngine 调用接入**
- [ ] **Step 4: 跑测试确认绿**
- [ ] **Step 5: typecheck + commit**

```bash
npm run typecheck && npm test
git add lib/engine/DialogueEngine.ts lib/engine/DialogueEngine.test.ts
git commit -m "feat: 结局动态判定（真相度+抉择，TDD）"
```

---

---

## 计划增补（grilling 追问后决策）

### Task 3 增补：复诊施压（ADR-002）

- [ ] **Step 1: 追加失败测试**——`rollFollowUps` 达宽限者返回 `abandonedFollowUps: string[]`；`advanceDayState` 对放弃复诊者扣 `REPUTATION_LOSS_PER_ABANDON` 声望并产出 DayEvent（`{ type: "abandonFollowUp"; name: string }`）。
- [ ] **Step 2: 跑测试确认红**（`abandonedFollowUps` 不存在 / 声望未扣）
- [ ] **Step 3: 实现**——`rollFollowUps` 返回值新增 `abandonedFollowUps`（达宽限者 push，不再直接进 discharged）；`advanceDayState` 遍历 `abandonedFollowUps` 扣声望并产出事件；`FOLLOW_UP_GRACE_DAYS` 改为 6。
- [ ] **Step 4: 跑测试确认绿** + typecheck + commit

### Task 4 增补：复诊报酬递减（ADR-004）

- [ ] **Step 1: 追加失败测试**——`followUpReward(baseReward, count)`：第 1 次复诊 = `base * 0.7`，第 ≥2 次 = `base * 0.4`。
- [ ] **Step 2: 跑测试确认红**（`followUpReward` 不存在）
- [ ] **Step 3: 实现**——GameState 导出 `followUpReward`；`finishSession` 复诊时按 `followUpCount` 结算报酬。
- [ ] **Step 4: 跑测试确认绿** + typecheck + commit

### Task 8 增补：复诊记忆碎片（ADR-006）

- [ ] **Step 1: 追加失败测试**——每个手写剧本 `followUpFragments` 存在、trigger 阈值合理、`followUpDialogues` 节点可达。
- [ ] **Step 2: 跑测试确认红**（当前无 `followUpFragments`）
- [ ] **Step 3: 实现**——3 剧本各配 1-2 个复诊碎片；DialogueEngine 复诊时触发 `followUpFragments`。
- [ ] **Step 4: 跑测试确认绿** + typecheck + commit

---

## Self-Review

- **Spec 覆盖**：SPEC §3.4 三层生命周期 → Task 2/3/4；复诊剧情 → Task 7/8；结局动态判定 → Task 9；存档兼容 → Task 1；大厅/追踪 → Task 5/6。PRD 功能清单复诊系统项全覆盖。
- **Placeholder 扫描**：Task 9 步骤代码略（映射表按剧本数据定），实现时以测试驱动补齐，不阻塞。
- **类型一致性**：`rollFollowUps` 返回结构与 `advanceDayState` 写入字段一致；`settleFollowUp` 签名在 Task 4 定义 Task 4 内使用；`followUpStart`/`followUpDialogues`/`maxFollowUps` 全程同名。
