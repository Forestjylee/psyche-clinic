# 心灵诊疗室 · 技术规格文档（Spec）

| 字段 | 内容 |
| --- | --- |
| 文档版本 | v0.2.0 |
| 维护人 | Psyche Clinic Team |
| 最后更新 | 2026-08-06 |
| 配套文档 | [PRD.md](./PRD.md) · [PLAN.md](./PLAN.md) · [DEPLOYMENT.md](./DEPLOYMENT.md) |
| 文档目的 | 规定技术栈、目录结构、数据模型、引擎契约与部署架构，作为研发实施的硬约束 |

> 版本管理规则：架构性变更（新增/移除模块、改变数据流）必须升级版本号并在文末追加变更记录。

---

## 1. 技术栈

| 层 | 选型 | 版本 | 理由 |
| --- | --- | --- | --- |
| 框架 | Next.js (Pages Router 风格的 App Router 单页) | ^14.2.33 | 静态导出友好，Cloudflare Pages 原生支持 |
| UI 库 | React | 18.3.1 | 生态成熟，Hooks 模式清晰 |
| 语言 | TypeScript | 5.5.3 | 类型安全，重构无惧 |
| 样式 | 纯 CSS（globals.css）+ CSS 变量 | - | 零运行时开销，主题切换易 |
| 音频 | Web Audio API（自封装 SoundManager） | - | 无依赖，BGM 滤波随理智动态变化 |
| 持久化 | localStorage（抽象 StorageDriver） | - | 为后续 Cloudflare KV/D1 平滑迁移 |
| 部署 | Cloudflare Pages + Pages Functions | - | 全球 CDN，Functions 提供 API |
| 数据库（规划） | Cloudflare D1（SQLite）+ KV（缓存） | - | 边缘 SQL，免费额度足够 |
| 构建 | Next.js 内置 | - | `next build` 产出静态资源 |
| 版本控制 | Git + GitHub | - | 长期迭代基线 |

**不引入的依赖**（保持轻量）：
- ❌ 状态管理库（Redux/Zustand）：React Context + useReducer 已够用
- ❌ UI 组件库（AntD/MUI）：自定义 CSS 更贴合深夜诊室基调
- ❌ 动画库（Framer Motion）：纯 CSS keyframes 已实现公测品质特效
- ❌ 路由库：单页应用，scene 状态机内部切换

---

## 2. 目录结构

```
psyche-clinic-next/
├── app/                          # Next.js App Router 入口
│   ├── layout.tsx                # 根布局，注入全局字体与 metadata
│   ├── page.tsx                  # 单一入口，dynamic 加载 GameShell（ssr:false）
│   └── globals.css               # 全局样式（深夜诊室主题 + 成就特效）
│
├── components/
│   └── game/                     # 游戏表现层组件（17 个）
│       ├── GameShell.tsx         # 客户端壳：注入 GameProvider
│       ├── GameApp.tsx           # 场景路由器（按 scene 渲染子组件）
│       ├── TitleScreen.tsx       # 标题屏（理念传达第一入口）
│       ├── ClinicHall.tsx        # 诊所大厅（经营主界面）
│       ├── DialogueScene.tsx     # 诊疗对话场景（核心循环）
│       ├── EndingOverlay.tsx     # 结局结算 + 温暖回响
│       ├── AchievementUnlockToast.tsx  # 成就解锁全屏特效
│       ├── AchievementsPage.tsx  # 成就图鉴
│       ├── SkillsTree.tsx        # 技能树
│       ├── ClinicUpgrades.tsx    # 诊所升级
│       ├── Letters.tsx           # 信件系统
│       ├── Generator.tsx         # 剧本生成器
│       ├── HUD.tsx               # 顶部资源 HUD
│       ├── Overlays.tsx          # 通用遮罩（确认框等）
│       ├── PsychTermSpan.tsx     # 心理学词条悬停浮窗
│       ├── SceneEffects.tsx      # 场景特效（粒子/雾）
│       ├── TypewriterText.tsx    # 打字机文本
│       └── constants.ts          # 表现层常量与文案生成（warmthEcho 等）
│
├── lib/                          # 业务逻辑层（与 UI 解耦）
│   ├── types.ts                  # 全局类型定义（核心数据契约）
│   ├── audio/
│   │   └── SoundManager.ts       # Web Audio 封装（BGM/SFX/滤波）
│   ├── data/                     # 静态内容数据（可被策划单独维护）
│   │   ├── patients.ts           # 手写患者剧本
│   │   ├── truths.ts             # 真相库（生成器素材）
│   │   ├── generator.ts          # 剧本生成器逻辑
│   │   ├── achievements.ts       # 成就定义（38 个）
│   │   ├── skills.ts             # 技能与诊所升级
│   │   └── psychTerms.ts         # 心理学词条库
│   ├── engine/                   # 纯逻辑引擎（无副作用，可单测）
│   │   ├── DialogueEngine.ts     # 对话推进/数值结算/连击判定
│   │   └── AchievementEngine.ts  # 成就进度计算/解锁判定
│   ├── hooks/
│   │   └── useGame.tsx           # 全局状态 Provider（Context + Reducer）
│   ├── state/                    # 持久化与状态构造
│   │   ├── GameState.ts          # 初始状态/读档/存档/升级公式
│   │   └── Storage.ts            # StorageDriver 抽象（本地/KV/D1 可切换）
│   └── utils/
│       └── psychHighlight.ts     # 词条高亮工具
│
├── public/                       # 静态资源
│   └── images/                   # 背景图等
│
├── docs/                         # 项目文档（本目录）
│   ├── PRD.md
│   ├── SPEC.md
│   ├── PLAN.md
│   └── DEPLOYMENT.md
│
├── functions/                    # Cloudflare Pages Functions（v1.1 规划）
│   └── api/                      # /api/* 边缘函数
│       └── _middleware.ts        # 鉴权/限流
│
├── next.config.mjs
├── tsconfig.json
├── package.json
├── .gitignore
└── README.md
```

### 2.1 模块划分原则
1. **表现层（components/）与逻辑层（lib/）严格分离**：组件不写业务规则，引擎不引用 React。
2. **数据（lib/data/）与引擎（lib/engine/）分离**：策划改数据不影响逻辑，引擎是纯函数。
3. **持久化抽象（lib/state/Storage.ts）**：所有读写经 `StorageDriver` 接口，迁移到 KV/D1 时业务层零改动。
4. **单入口动态加载**：`app/page.tsx` 以 `ssr:false` 加载 `GameShell`，避免水合不一致（重度依赖 localStorage/Web Audio）。

---

## 3. 核心数据模型

定义于 `lib/types.ts`，是全项目的契约基线。

### 3.1 医生与全局状态

```typescript
interface DoctorStats {
  reputation: number;  // 声望：影响可接诊层级
  sanity: number;      // 理智：过低触发幻觉/倒闭
  money: number;       // 金钱：升级诊所/技能
  exp: number;         // 经验：升级技能树
  level: number;       // 等级
}

interface GameState {
  doctor: DoctorStats;
  skills: string[];                       // 已解锁技能 id
  clinicUpgrades: string[];               // 诊所升级 id
  patientRecords: Record<string, EndingType>;  // 患者 id -> 结局
  day: number;                            // 游戏内日期
  letters: Letter[];                      // 信件
  generatedScenarios: PatientScenario[];  // 生成器产出（≤5）
}
```

### 3.2 患者与对话

```typescript
interface PatientState {       // 单次会诊动态状态
  trust: number;    // 信任：决定是否说真话
  defense: number;  // 防御：触及痛点时触发
  mood: number;     // 心情：直击病灶会降
  truth: number;    // 真相揭示进度（隐藏）
  round: number;    // 当前轮次
}

interface DialogueChoice {
  id: string;
  text: string;
  kind: ChoiceKind;        // empathy/probe/confront/logic/prescribe/hypnosis/silence/special
  effect?: ChoiceEffect;   // 数值效果
  next?: string;           // 跳转节点
  require?: ChoiceRequirement;
  requireSkill?: string;
  hint?: string;
}

interface DialogueNode {
  id: string;
  speaker: "patient" | "doctor" | "narration";
  text: string;
  emotion?: PatientEmotion;
  choices?: DialogueChoice[];
  autoNext?: string;
  isEnding?: boolean;
  endingType?: EndingType;
  endingTitle?: string;
  endingText?: string;
  endingReward?: ChoiceEffect;
}

interface PatientScenario {
  id: string;
  name: string;
  title: string;
  intro: string;
  surface: string;          // 表象
  truth: string;            // 真相（隐藏）
  palette: PatientPalette;
  initialState: PatientState;
  dialogues: Record<string, DialogueNode>;  // 对话图
  startNode: string;
  requireReputation?: number;
  baseReward: number;
  difficulty: "简单" | "普通" | "困难";
  completed?: boolean;
  achievedEnding?: EndingType;
}
```

### 3.3 结局与成就

```typescript
type EndingType =
  | "cure" | "acceptance" | "dependent" | "worsen"
  | "tragic" | "hidden" | "transfer" | "awakening";

type AchievementRarity = "common" | "rare" | "epic" | "legendary";
type AchievementCategory = "therapy" | "ending" | "growth" | "clinic" | "secret" | "ethics";

interface Achievement {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  rarity: AchievementRarity;
  target: number;
  icon: string;
  reward?: { reputation?: number; sanity?: number; exp?: number; money?: number; };
  hidden?: boolean;
}

interface AchievementProgress {
  progress: number;
  unlocked: boolean;
  unlockedDay: number;
  unlockedAt?: number;
}
```

---

## 4. 引擎契约

### 4.1 DialogueEngine（`lib/engine/DialogueEngine.ts`）
纯函数，输入 `(scenario, currentNodeId, patientState, choice)` 输出 `(nextNodeId, newPatientState, events)`。

职责：
- 应用 `ChoiceEffect` 到 `PatientState`，clamp 到合理区间。
- 判定连击：`empathy → confront` 在 trust ≥ 阈值时触发「破防暴击」。
- 判定防御触发：defense 超阈值时改写下一节点（如 `a_p2_def`）。
- 判定真相揭示：trust/truth 达标时解锁隐藏分支。
- 判定结局：到达 `isEnding` 节点返回 `EndingType`。

**约束**：不直接读写 React state，不调用 Storage。

### 4.2 AchievementEngine（`lib/engine/AchievementEngine.ts`）
纯函数，输入 `(gameState, sessionResult, progressMap)` 输出 `(updatedProgressMap, newlyUnlocked[])`。

职责：
- 按分类计算进度增量（接诊次数、结局累计、等级、声望、金钱、伦理事件）。
- 达到 `target` 标记解锁，写入 `unlockedDay`/`unlockedAt`。
- 隐藏成就未解锁前返回「？？？」。
- 返回新解锁列表（含奖励），由 UI 层触发特效。

---

## 5. 状态管理与数据流

```
┌─────────────┐    dispatch     ┌──────────────┐
│  UI 事件    │ ──────────────▶ │  useGame     │  (Context + useReducer)
│ (点击/选择) │                 │  Provider    │
└─────────────┘                 └──────┬───────┘
                                       │ state + actions
                                       ▼
                                ┌──────────────┐
                                │  Reducer     │
                                │  (纯函数)     │
                                └──────┬───────┘
                                       │ newState
                          ┌────────────┴────────────┐
                          ▼                          ▼
                   ┌──────────────┐         ┌──────────────┐
                   │  React 渲染  │         │  Storage.set │  (防抖自动存档)
                   └──────────────┘         └──────────────┘
```

- `useGame()` 暴露：`game`、`scene`、`setScene`、`startSession`、`applyChoice`、`restOneDay`、`saveNow`、`achievementToast`、`dismissAchievement` 等。
- Reducer 是纯函数；副作用（存档、音效）在 effect 中执行。
- 成就解锁后 `achievementToast` 被设置，`AchievementUnlockToast` 监听并播放特效，`dismissAchievement` 清空。

---

## 6. 持久化与迁移路径

### 6.1 当前（v0.2）
- `LocalStorageDriver` 实现 `StorageDriver` 接口。
- 命名空间：`ps.save.v1` / `ps.ach.v1` / `ps.user.v1` / `ps.setting.v1`。
- 自动存档：状态变更后防抖 800ms 写入。

### 6.2 v1.1 云同步（规划）
新增两个 Driver，业务层零改动：

```typescript
// Cloudflare KV Driver（缓存层，边缘读取）
class KVDriver implements StorageDriver { /* env.KV binding */ }

// Cloudflare D1 Driver（权威存储，SQL）
class D1Driver implements StorageDriver { /* env.DB binding */ }
```

数据流：
1. 客户端 `setGlobalDriver(new RemoteDriver(endpoint, token))`。
2. `RemoteDriver` 内部走 `/api/save`、`/api/achievements` 等 Pages Functions。
3. Functions 写 D1，热数据回写 KV。
4. 客户端读优先 KV（边缘命中），未命中回源 D1。

### 6.3 D1 Schema（规划）

```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,           -- 匿名 ID（UUID）
  created_at INTEGER NOT NULL,
  last_seen_at INTEGER NOT NULL
);

CREATE TABLE saves (
  user_id TEXT PRIMARY KEY REFERENCES users(id),
  game_state TEXT NOT NULL,      -- JSON
  updated_at INTEGER NOT NULL
);

CREATE TABLE achievements (
  user_id TEXT NOT NULL REFERENCES users(id),
  achievement_id TEXT NOT NULL,
  progress INTEGER NOT NULL DEFAULT 0,
  unlocked INTEGER NOT NULL DEFAULT 0,
  unlocked_day INTEGER NOT NULL DEFAULT 0,
  unlocked_at INTEGER,
  PRIMARY KEY (user_id, achievement_id)
);

CREATE INDEX idx_achievements_user ON achievements(user_id);
```

---

## 7. 成就解锁特效规格（公测品质）

实现于 `components/game/AchievementUnlockToast.tsx` + `app/globals.css`。

### 7.1 级联时序
| 阶段 | 时长 | 元素 |
| --- | --- | --- |
| 暗场 | 0-200ms | `ach-fx-backdrop` 透明度 0→0.85 |
| 光晕 | 60-300ms | `ach-fx-aurora` 模糊渐变脉动 |
| 卡片迸发 | 60-360ms | `ach-fx-card` scale 0.6→1 + 旋转回正 |
| 粒子爆裂 | 200-1100ms | `ach-fx-particle` 按角度飞散 |
| 文字级联 | 360-700ms | label→name→desc→reward 依次淡入 |
| 传说金环 | 360-2000ms | 仅 legendary：`ach-fx-gold-ring` 脉动 |

### 7.2 稀有度差异化
| 稀有度 | 粒子数 | 主色 | 光晕 | 特殊 |
| --- | --- | --- | --- | --- |
| common | 14 | #9aa3c4 | 弱 | 无 |
| rare | 22 | #6bb5ff | 中 | 无 |
| epic | 32 | #c890ff | 强 | 无 |
| legendary | 44 | #e7c36a | 极强 | 金环 + 慢镜头 |

### 7.3 无障碍降级
```css
@media (prefers-reduced-motion: reduce) {
  .ach-fx-particle, .ach-fx-aurora, .ach-fx-gold-ring { display: none; }
  .ach-fx-card { animation: ach-fx-fade-in 200ms ease-out forwards; }
}
```

### 7.4 展示时长
- common/rare: 4400ms
- epic: 5000ms
- legendary: 5600ms
- 任意时刻点击可 `dismissAchievement` 提前关闭。

---

## 8. 音频规格

`lib/audio/SoundManager.ts` 基于 Web Audio API：
- BGM：单轨道循环，经 `BiquadFilter`（lowpass）。
- `setTension(sanity)`：sanity 越低，filter frequency 越低（10000Hz → 600Hz），营造压抑。
- SFX：成就解锁、连击、防御触发、结局到达各有短音效。
- 浏览器策略：首次 `pointerdown`/`keydown` 后 `init()` + `startBgm()`。
- 静音设置存 `ps.setting.v1`。

---

## 9. 构建与部署架构

### 9.1 当前（v0.2 静态导出）
- `next.config.mjs` 启用 `output: "export"`（公测前开启）。
- `next build` 产出 `out/`，纯静态资源。
- 上传至 Cloudflare Pages，全球 CDN 分发。

### 9.2 v1.1 全栈架构
```
┌─────────────────────────────────────────────────────┐
│                  Cloudflare Pages                    │
│  ┌───────────────┐    ┌────────────────────────┐   │
│  │  静态前端     │    │  Pages Functions       │   │
│  │  (out/)       │    │  /api/*  边缘运行      │   │
│  └───────────────┘    └─────────┬──────────────┘   │
│                                  │                   │
└──────────────────────────────────┼───────────────────┘
                                   │
                      ┌────────────┴────────────┐
                      ▼                          ▼
               ┌──────────────┐         ┌──────────────┐
               │ Cloudflare   │         │ Cloudflare   │
               │   D1 (SQL)   │         │   KV (缓存)  │
               │  权威存储    │         │  边缘热数据  │
               └──────────────┘         └──────────────┘
```

详细部署步骤见 [DEPLOYMENT.md](./DEPLOYMENT.md)。

---

## 10. 代码规范

| 维度 | 约定 |
| --- | --- |
| 语言 | TypeScript strict 模式，禁 `any`（除非第三方类型缺失） |
| 组件 | 函数组件 + Hooks，禁 class component |
| 命名 | 文件 PascalCase（组件）/ camelCase（工具）；类型 PascalCase |
| 导入 | 路径别名 `@/*` 指向项目根 |
| 样式 | 全局 CSS + BEM 风格 class，CSS 变量做主题 |
| 注释 | 引擎与数据文件需文件头注释说明职责 |
| 提交 | Conventional Commits（feat/fix/docs/refactor/chore） |
| 分支 | `main`（稳定）/ `dev`（集成）/ `feat/*` `fix/*`（功能分支） |

---

## 11. 测试策略（规划）

| 层 | 方式 | 工具 |
| --- | --- | --- |
| 引擎 | 单元测试（纯函数） | Vitest |
| 组件 | 组件测试 | Vitest + Testing Library |
| E2E | 关键流程（接诊→结局→成就） | Playwright |
| 视觉 | 成就特效截图回归 | Playwright + 快照 |

优先级：引擎单测 > E2E 关键流程 > 组件测试 > 视觉回归。

---

## 12. 变更记录

| 版本 | 日期 | 变更摘要 |
| --- | --- | --- |
| v0.1.0 | 2026-08 | 初版 Spec，定义技术栈、目录、数据模型 |
| v0.2.0 | 2026-08-06 | 新增成就特效规格、温暖回响、Storage 抽象迁移路径、D1 Schema、Cloudflare 全栈架构图 |
