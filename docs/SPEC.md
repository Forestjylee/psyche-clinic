# 暖心小诊室 · 技术规格文档（Spec）

| 字段 | 内容 |
| --- | --- |
| 文档版本 | v0.5.0 |
| 维护人 | Psyche Clinic Team |
| 最后更新 | 2026-08-07 |
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
│   │   ├── patients.ts           # 患者剧本聚合入口（scan-patients.mjs 生成索引自动收集 patients/，新剧本入目录即进池）
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
  slot: number;                           // 今日已接待名额（0..MAX_SLOTS）
  todayServed: string[];                  // 今日已接诊的患者 id（当天不重复，休息日清空）
  waitingDays: Record<string, number>;    // patientId -> 候诊等待天数（病情加重/放弃）
  abandoned: string[];                    // 已放弃治疗离开的患者 id
  discharged: string[];                   // 已离场患者 id（治愈/接纳/恶化/悲剧：不再复诊）
  followUpCount: Record<string, number>;  // patientId -> 已复诊次数（依赖/隐藏/觉醒/转介复诊）
  messages: GameMessage[];                // 消息盒子（来信/提醒/通知）
  arrivedPatients: string[];              // 已到达候诊的手写患者 id（引导患者首日已在场，逐日随机到达补充）
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
  dialogues: Record<string, DialogueNode>;  // 初诊对话图
  startNode: string;
  requireReputation?: number;
  baseReward: number;
  difficulty: "简单" | "普通" | "困难";
  completed?: boolean;
  achievedEnding?: EndingType;
  followUpDialogues?: Record<string, DialogueNode>;  // 复诊对话图（独立短剧情）
  followUpStart?: string;                            // 复诊入口节点
  maxFollowUps?: number;                             // 最多复诊次数（默认 2）
  followUpFragments?: MemoryFragment[];              // 复诊记忆碎片（初诊碎片不重复）
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
  reward?: {
    reputation?: number; sanity?: number; exp?: number; money?: number;
    unlock?: {
      letter?: string;        // 成就纪念信 id（achievementLetters.ts）
      decor?: string;         // 诊室通用纪念物 id（decor.ts，source.kind==="achievement"，无患者绑定）
      returnVisit?: "auto";   // 达成时从已治愈患者中动态选一位安排额外回访（无候选则静默跳过）
    };
  };
  hidden?: boolean;
}

interface AchievementProgress {
  progress: number;
  unlocked: boolean;
  unlockedDay: number;
  unlockedAt?: number;
}
```

### 3.4 患者生命周期与复诊（核心玩法）

患者从预约到结案经历三层生命周期：

```
候诊（初诊候选）→ 已诊疗（有结局）→ 离场 / 复诊中
```

**① 候诊**：声望达标、从未接诊、未结案的患者出现在预约列表。等待天数 `waitingDays[id]` 每日 +1：满 `DECAY_START_DAY` 显示"病情加重"，满 `WARN_DAY` 弹窗提醒，满 `ABANDON_DAY` 放弃治疗（进 `abandoned`，扣声望，从列表移除）。

**② 已诊疗**：`finishSession` 写入 `patientRecords[id] = ending`。按结局决定复诊倾向：

| 结局 | 复诊倾向 | 处置 |
| --- | --- | --- |
| `cure` / `acceptance` | 约 5% | 直接离场（进 `discharged`） |
| `dependent` | 约 60% | 进入复诊池 |
| `worsen` / `tragic` | 0% | 永久离场（进 `discharged`） |
| `hidden` / `awakening` / `transfer` | 约 25% | 进入复诊池 |

**③ 复诊池与离场**：
- `discharged` 患者从预约列表消失，追踪档案保留结案记录；
- 复诊池患者每日结算时按结局概率 roll：命中→当日复诊（`todayFollowUps`）；未命中→`followUpIdleDays[id]`+1，满 `FOLLOW_UP_GRACE_DAYS`（6 天）触发「放弃复诊」：扣声望、离场（与候诊放弃治疗同语义，ADR-002 复诊也施压）；
- 复诊会话使用 `followUpDialogues` 独立短剧情（3-5 节点），`followUpCount[id]` 累计，达到 `maxFollowUps`（默认 2）结案离场；
- 复诊产出**复诊结局**（ADR-003）：治愈/接纳→立即离场；依赖→继续复诊池；恶化/悲剧→离场；
- 复诊报酬**递减**（ADR-004）：初诊的 70%，第 2 次约 40%；
- 复诊配置**新记忆碎片** `followUpFragments`（ADR-006，初诊碎片不重复），复诊结束产出简短回信；
- 生成剧本套**通用复诊模板**（ADR-007），从复诊素材库抽「回访开场 + 状态文本 + 结局」。

**每日结算顺序**（`advanceDayState`）：

1. 清空 `slot` 与 `todayServed`；
2. 候诊患者 `waitingDays[id] += 1`，触发加重/放弃判定；
3. 复诊池患者按结局概率 roll：命中→`todayFollowUps`；未命中→`followUpIdleDays`+1、满宽限放弃复诊扣声望离场；
4. 候诊人数不足 `queueTarget(day)` 时从手写患者池按难度分桶随机补充到达（简单一直开放；普通需声望 ≥25 或 day≥3；困难需声望 ≥60 或 day≥6），新到达写入消息盒子通知；引导患者（小北）第一天已在场。

### 3.5 金钱经济系统（诊所经营）

金钱定位为**诊所经营资源**（ADR-008），形成「接诊赚钱 → 升级/采购/广告 → 提升经营效率 → 赚更多」循环。

**收入**：初诊报酬（简单 150 / 普通 300 / 困难 600）；复诊报酬递减（70% / 40%）；`receptionist` 前台每日 +50。

**消耗**：

| 渠道 | 说明 | 数值 |
| --- | --- | --- |
| 多级设施升级 | 现有 5 项设施各 3 级，效果递增 | 2 级 ≈1.8× 1 级价、3 级 ≈2.5× 1 级价（沙发 300→540→750） |
| 消耗品 | 一次性药品/道具，会话中解锁选项或提升治愈率 | 50-200 金 |
| 广告拉新 | 提升每日新患者上限 +1 | 300 金/次，持续 3 天 |

**节奏**（ADR-010）：玩家单天约赚 500-1500 金；中期以高级设施与广告为主要消耗口，避免溢出。

### 3.6 发现客户（主动获客，v0.4.0）

**定位**：金钱经济循环的**主动消耗口**。玩家花钱通过广告/广播等渠道触达潜在客户，主动决定是否发送邀约；客户有概率接受，接受后于今日/明日/后日（概率分布）加入预约清单，形成「花钱获客 → 接诊赚钱」的可控循环。替代原「预约客户」按钮语义（被动等客）。

**交互流程**：
1. 首页「预约客户」按钮改名为「发现客户」，点击进入发现页（scene: `discover`）。
2. 发现页展示获客渠道列表，每渠道标注花费 / 说明 / 预计产出。玩家确认后扣除金钱，从手写未接待患者池随机选候选（**不进入预约清单**，不生成新患者）。
3. 候选客户逐一展示，玩家对每位决定「发送邀约」或「暂不考虑」。
4. 邀约判定：接受概率 = 渠道基础接受率 + 声望加成（每 10 点声望 +2%，上限 +20%，clamp）。接受 → 按到达时间分布写入待到达队列；拒绝 → 消息盒子通知（不扣声望）。
5. 每「休息一日」日终结算时，到达日到期的候选客户标记到达（加入 `arrivedPatients`），并写入消息盒子通知。

**数据模型**：

```typescript
interface PendingArrival {
  patientId: string;          // 手写患者 id，到达时标记进入候诊名单
  arriveDay: number;          // 计划到达日（>= day）
}

// GameState 新增字段
pendingArrivals: PendingArrival[];
```

**获客渠道配置**（`lib/data/discovery.ts`，数据表可扩展）：

| id | 名称 | 花费 | 说明 | 预计产出 | 基础接受率 |
| --- | --- | --- | --- | --- | --- |
| `flyer` | 传单 | 80 | 街头发放，触达大众 | 1 位 | 45% |
| `radio` | 广播 | 200 | 本地电台，覆盖面广 | 2 位 | 55% |
| `newspaper` | 报纸广告 | 380 | 专栏投放，触达中产 | 2 位 | 65% |
| `referral` | 老客户转介 | 0（需声望 ≥ 40） | 治愈患者口碑介绍，质量高 | 1 位 | 80% |

**到达时间分布**：今日 50% / 明日 30% / 后日 20%。

**约束**：
- 已接诊名额满（`slot = MAX_SLOTS`）时，邀约结果到达日若 roll 到「今日」则顺延至次日；
- 未邀约的候选仅停留当日，休息日后自动清除（过期不候，消息盒子提示）；
- 候选从手写未接待患者池选择（未到达 / 未接诊 / 未放弃 / 不在候选队列），不重复已出现患者；
- 转介渠道的客户可加「声望门槛」与更高基础属性（高质量客户）。

**数据流**：发现页 UI → `store.discover(channelId)`（扣金钱、从手写池选候选）→ `store.invite(candidateId)`（判定接受、写 `pendingArrivals` / 通知拒绝）→ `restOneDay`（结算到达：标记 arrivedPatients + 消息通知）。

**扩展空间**：渠道为数据表，新增渠道仅追加 `discovery.ts` 数据；接受率/到达分布常量集中于此；后续可扩展「客户质量」（高付出渠道产出高难度/高报酬客户）。

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
- **复诊入口**：会话可指定 `followUp` 模式，对话图改用 `scenario.followUpDialogues`，起始节点为 `scenario.followUpStart`；复诊结束后按 `followUpCount` 判定是否达到 `maxFollowUps`。
- **动态结局判定**（规划）：结局不再仅由 `isEnding` 节点写死，由「真相进度 + 关键抉择」综合判定，保证复诊/生成剧本结局多样。

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

## 12. 成就图鉴扩充（v0.5.0）

### 12.1 目标

成就库由 **38 个扩充至 80 个**。删除 2 个不再适用的「剧本生成器」成就（入口已被发现客户取代），新增 44 个，覆盖发现客户 / 邀约 / 治愈回访 / 复诊等新系统。

### 12.2 删除的成就

| id | 名称 | 删除原因 |
| --- | --- | --- |
| `therapy_generator_first` | 剧本工坊创始人 | 首页入口已由「发现客户」取代 |
| `secret_all_generated` | 让生成器也成为朋友 | 同上 |

### 12.3 新增 44 个成就清单

分类分布：获客 9 / 回访 5 / 诊疗扩展 5 / 经营扩展 7 / 结局扩展 7 / 成长 3 / 伦理 4 / 隐藏 4。

**获客（新分类 `discover`，标签「获客」）**

| id | 名称 | 稀有度 | 目标 | 统计源 |
| --- | --- | --- | --- | --- |
| discover_first | 广而告之 | common | 1 | `stats.discoverCount` |
| discover_5 | 名声初起 | rare | 5 | `stats.discoverCount` |
| discover_15 | 广撒渔网 | epic | 15 | `stats.discoverCount` |
| discover_all_channels | 四面开花 | epic | 4 | `stats.channelsUsed` 去重长度 |
| invite_first | 初次邀约 | common | 1 | `stats.inviteCount` |
| invite_accept_first | 一拍即合 | rare | 1 | `stats.acceptCount` |
| invite_accept_5 | 众望所归 | epic | 5 | `stats.acceptCount` |
| invite_reject_5 | 锲而不舍 | rare | 5 | `stats.rejectCount` |
| discover_arrive_3 | 高朋满座 | rare | 1 | 单日 `restOneDay` 到达数 ≥3（事件钩子） |

**治愈回访（新分类 `aftercare`，标签「回访」）**

| id | 名称 | 稀有度 | 目标 | 统计源 |
| --- | --- | --- | --- | --- |
| aftercare_first | 旧雨重逢 | rare | 1 | `stats.aftercareCount` |
| aftercare_3 | 温情常在 | rare | 3 | `stats.aftercareCount` |
| aftercare_5 | 念念不忘 | epic | 5 | `stats.aftercareCount` |
| aftercare_8 | 心心相印 | epic | 8 | `stats.aftercareCount` |
| aftercare_all_types | 故人重逢 | epic | 1 | `stats.aftercareEndings` 去重后含 cure/awakening/acceptance 3 种 |

**诊疗扩展（`therapy`）**

| id | 名称 | 稀有度 | 目标 | 统计源 |
| --- | --- | --- | --- | --- |
| therapy_revisit_first | 再度来访 | rare | 1 | `stats.revisitCount` |
| therapy_revisit_5 | 常来常往 | epic | 5 | `stats.revisitCount` |
| therapy_100_patients | 悬壶济世 | legendary | 100 | `patientRecords` 键数 |
| therapy_10_different | 见众生 | epic | 10 | `patientRecords` 键数 |
| therapy_deep_truth | 一针见血 | rare | 3 | 结局时 `lastState.truth ≥ 95` 累计 |

**经营扩展（`clinic`）**

| id | 名称 | 稀有度 | 目标 | 统计源 |
| --- | --- | --- | --- | --- |
| clinic_money_100k | 日进斗金 | legendary | 100000 | `doctor.money` |
| clinic_day_7 | 七日之约 | common | 7 | `day` |
| clinic_day_15 | 半月坚守 | rare | 15 | `day` |
| clinic_day_50 | 五十度秋 | legendary | 50 | `day` |
| clinic_sanity_keep | 神完气足 | rare | 5 | `stats.sanityStreak`（连续休息后理智≥60） |
| clinic_upgrade_5 | 锦上添花 | epic | 5 | `clinicUpgrades.length` |
| clinic_full_day | 门庭若市 | rare | 1 | `slot` 达到 `MAX_SLOTS`（事件钩子） |

**结局扩展（`ending`）**

| id | 名称 | 稀有度 | 目标 | 统计源 |
| --- | --- | --- | --- | --- |
| ending_cure_20 | 妙手回春 | legendary | 20 | 结局类型计数 |
| ending_awakening_3 | 觉醒三昧 | rare | 3 | 结局类型计数 |
| ending_acceptance_3 | 与痛共舞 | rare | 3 | 结局类型计数 |
| ending_dependent_3 | 温柔枷锁 | rare | 3 | 结局类型计数 |
| ending_worsen_3 | 力挽狂澜 | rare | 3 | 结局类型计数 |
| ending_tragic_2 | 悲歌二重 | epic | 2 | 结局类型计数 |
| ending_transfer_3 | 知止善任 | epic | 3 | 结局类型计数 |

**成长扩展（`growth`）**

| id | 名称 | 稀有度 | 目标 | 统计源 |
| --- | --- | --- | --- | --- |
| growth_level_30 | 医者仁心 | legendary | 30 | `doctor.level` |
| growth_rep_95 | 万家生佛 | legendary | 95 | `doctor.reputation` |
| growth_skill_8 | 学贯中西 | legendary | 8 | `skills.length` |

**伦理扩展（`ethics`）**

| id | 名称 | 稀有度 | 目标 | 统计源 |
| --- | --- | --- | --- | --- |
| ethics_no_quick_fix_15 | 去芜存菁 | epic | 15 | 首诊不用处方药累计 |
| ethics_boundary_3 | 守正不阿 | epic | 3 | 边界坚守（非依赖结局且真相≥60）累计 |
| ethics_dark_line_8 | 夜行者 | epic | 8 | 理智跌破 20 累计 |
| ethics_help_desperate | 雪中送炭 | rare | 3 | 危机接诊（等待≥4天）并治愈累计 |

**隐藏扩展（`secret`）**

| id | 名称 | 稀有度 | 目标 | 统计源 |
| --- | --- | --- | --- | --- |
| secret_letters_30 | 锦书难托 | epic | 30 | 收到的 `letter` 消息数 |
| secret_all_heal | 桃李满园 | legendary | 1 | 全部内置患者已治愈/接纳/觉醒 |
| secret_no_loss_15 | 功德圆满 | epic | 15 | `stats.noLossDays` |
| secret_sanity_zero | 神游天外 | rare | 1 | 理智归零 |

### 12.4 GameState 新增 `stats` 统计字段

```ts
interface GameStats {
  discoverCount: number;      // 渠道投放次数
  channelsUsed: string[];     // 用过的渠道 id（去重）
  inviteCount: number;        // 发出邀约次数
  acceptCount: number;        // 邀约成功次数
  rejectCount: number;        // 邀约被拒次数
  revisitCount: number;       // 复诊接诊次数
  aftercareCount: number;     // 完成回访探望次数
  aftercareEndings: string[]; // 探望过的回访结局类型
  noLossDays: number;         // 累计零流失天数
  sanityStreak: number;       // 连续休息后理智≥60 的天数
}
```

`createInitialState` 初始化全 0/空；`migrateGameState` 对旧存档补齐默认值。

### 12.5 引擎与 Store 挂钩点

| 位置 | 变更 |
| --- | --- |
| `discover` action | `stats.discoverCount+1`；`channelsUsed` 去重 push |
| `invite` action | `stats.inviteCount+1`；成功 `acceptCount+1`，婉拒 `rejectCount+1` |
| `startSession` | 传 `patientId` 给 `onSessionStart`；若 `patientRecords[pid]` 已存在则 `revisitCount+1`；记录危机接诊标记（`waitingDays≥4`） |
| `restOneDay` | 当日无 abandon 事件 → `noLossDays+1`；理智恢复后更新 `sanityStreak`；末尾调用 `onGameStateSynced` 刷新天数/金钱成就 |
| `finishSession` | `onSessionEnd` 内：`slot≥MAX_SLOTS` → `clinic_full_day`；危机接诊且治愈 → `ethics_help_desperate`；真相≥95 → `therapy_deep_truth` |
| `finishReturnVisit` | `aftercareCount+1`；`aftercareEndings.push(rv.ending)` |
| `onGameStateSynced` | 用 `set` 刷新可推导成就（获客/回访/复诊/天数/金钱/结局/成长/隐藏） |

新分类 `discover`/`aftercare` 需扩展 `Achievement["category"]` 联合类型与 `achievementCategoryLabels`。

### 12.6 图鉴排序与筛选（v0.5.0）

- **默认排序**：每个分类内按稀有度降序展示（legendary → epic → rare → common），`achievements.ts` 导出 `RARITY_ORDER: Record<AchievementRarity, number>`（传说 0 … 普通 3），`AchievementsPage` 分组时按 `RARITY_ORDER[a.rarity]` 排序。
- **一键筛选**：图鉴顶部（返回按钮下方）加筛选按钮组「全部 / 已解锁 / 未解锁」，`useState<"all" | "unlocked" | "locked">` 记忆当前筛选：
  - 全部：显示所有卡片（默认）
  - 已解锁：仅 `pm[a.id].unlocked` 的卡片
  - 未解锁：仅未解锁卡片
  - 筛选作用于卡片渲染层，分类标题与计数仍展示全部数据，不影响总数圆环。
- 未解锁且 `hidden` 的成就仍以「？？？」灰卡展示，仅被「已解锁」筛选隐藏。

---

## 13. 变更记录

| 版本 | 日期 | 变更摘要 |
| --- | --- | --- |
| v0.1.0 | 2026-08 | 初版 Spec，定义技术栈、目录、数据模型 |
| v0.2.0 | 2026-08-06 | 新增成就特效规格、温暖回响、Storage 抽象迁移路径、D1 Schema、Cloudflare 全栈架构图 |
| v0.3.0 | 2026-08-06 | 核心玩法重构：患者三层生命周期（候诊/已诊疗/离场）与复诊系统、GameState 新增 discharged/followUpCount、PatientScenario 新增 followUp 复诊剧情、随机事件与 500+ 素材库规划 |
| v0.3.1 | 2026-08-06 | 首页 UX 优化（难度标签图标/摘要两行悬停展开/进度条/天数徽章/退出确认/休息高亮/预约入口/奖励动画）；ClinicHall 侧栏按钮新增 `data-guide` 定位；手写剧本补正负选项对照；浮动文字改为确定性纵向堆叠防重叠（详见 [clinic-hall-ux-design](./superpowers/specs/2026-08-06-clinic-hall-ux-design.md)） |
| v0.4.0 | 2026-08-07 | 新增「发现客户」主动获客系统（3.6）：首页「预约客户」改为「发现客户」，付费渠道获取候选客户、主动邀约、接受概率、到达日分布，GameState 新增 `pendingArrivals`；对话界面重构为聊天气泡布局（患者左/玩家右/旁白顶部）；首页预约清单可对话优先排序 + 今日已接诊隐藏；记忆碎片改为手动关闭；对话选项中性化 |
| v0.5.0 | 2026-08-07 | 成就图鉴扩充 38→80：删除生成器成就 2 个，新增获客/回访/复诊/结局/成长/伦理/隐藏 44 个（见 §12）；GameState 新增 `stats` 累计统计字段；`onSessionStart` 接收 `patientId`；`restOneDay` 末尾同步成就引擎；`Achievement.category` 扩展 `discover`/`aftercare`；图鉴卡片按稀有度降序排列 + 全部/已解锁/未解锁一键筛选（§12.6） |
| v1.0.0 | 2026-08-07 | 界面场景化重构立项（§14）：grill-me 九项决策锁定（全量场景化/温暖手绘保留/Phaser+React 分工/大厅+诊室/点选导航/装修半自由/程序绘制/五期 M1-M5/逐句气泡+回顾）；独立文档体系 docs/kairosoft/{PRD,SPEC,PLAN}.md 完成；M1 技术地基动工 |
| v1.1.0 | 2026-08-08 | 界面方向定稿为「治愈系手绘纸木质」（非开罗像素，用户决策，见 docs/kairosoft/PRD.md v1.2/v1.3）：纸木质 token 落地、HUD/底栏/面板换肤；**v1.3 彻底移除场景小人**（候诊改名牌卡片，返回按钮/面板窗口统一）；M1/M2 主体完成，`syncFacilities` 崩溃修复 |
| v1.4.0 | 2026-08-09 | **首页回归全 React（§15）**：移除 Phaser 大厅画布与「预约清单」弹层，预约全列表直放首页；去重（个人成长 6 入口/发现客户交底部栏）；保留诊所状态精简卡；装修模式降级（拖动落格失效，外观/摆放仍在升级面板管理）；对话候选选项区 max-height 46%→34%、气泡锚点上移至 y=190（防遮挡） |
| v1.5.0 | 2026-08-09 | **患者池动态化 + 逐日随机到达 + 成就去患者化 + 生成系统下线**：① patients.ts 患者池自动收集：`scripts/scan-patients.mjs`（predev/pretest/prebuild 钩子）扫描 `lib/data/patients/` 生成显式模块映射 `index.generated.ts`，新剧本入目录即进池（不写死患者数）；不用 `import.meta.glob`——它是 Vite 特性，Next.js(webpack) 浏览器端会抛 `{}.glob is not a function`；② 难度按档位/轮次重标（短→简单 / 中→普通 / 长→困难，lin_xiao 长档→困难）；③ GameState 新增 `arrivedPatients`，患者逐日随机到达（难度分桶递进：简单常开 / 普通声望≥25或day≥3 / 困难声望≥60或day≥6，引导患者小北首日已在场）；④ 成就去患者化：碎片奖励改通用纪念物、回访奖励改动态已治愈患者；⑤ 生成器（generator/sceneBuilder/truths/seeds/Generator）下线，发现客户改从手写池选候选；⑥ 旧剧本下线 chen_lo / zhou_mingyuan（chen_mo 保留） |
| v1.5.1 | 2026-08-09 | **候诊大厅清单拆分（§15.1）**：已完成且可重新接诊的患者（`patientRecords` 有结局、非回访探望、今日未接诊）从「今日预约」移出，单独成「已完成 · 可重新接诊」区块（受控高度滚动、为空隐藏）；回访探望与断点患者仍保留在主清单。改 `components/game/ClinicHall.tsx`（`isCompleted / isReturning / isResuming` 分类 + 共用卡片渲染函数）与 `app/styles/clinic.css`（`.today-section` 占满 / `.completed-section` max-height 34%） |
| v1.6.0 | 2026-08-09 | **治疗分期复诊（§16，节拍断拍）**：节拍与节拍之间隔一段时间——节拍结束患者离开诊所，1~3 天后复诊到访再开启下一节拍。`DialogueNode` 新增 `beatEnd?: { resumeNode }` 节拍边界标记（narration 离开节点），`DialogueEngine.continue()` 优先触发 `onBeatEnd(resumeNode)`（不结案）；GameState 新增 `treatmentStages`（每患者一条：已完节拍数 / 恢复节点 / 四维状态快照 / 记忆碎片 / dueDay / arrived），`store.completeBeat` 写记录 + 消耗当日名额 + 清断点，`restOneDay` 到期复诊到访（写 notice，治疗中患者不推进 waitingDays），`finishSession` 结局结算清理；`DialogueScene` 复诊到访从 resumeNode 恢复引擎；`ClinicHall`/`Tracking` 复诊卡与待复诊状态。测试 `lib/state/treatmentStages.test.ts`（15 例：纯函数结算 / completeBeat / 到访 / 清理 / 迁移 / 引擎回调） |
| v1.7.0 | 2026-08-09 | **技能树系统下线**：删除技能树（`allSkills`/`SkillsTree`/`learnSkill`/`skills` 场景与字段/`requireSkill`/成长成就 `growth_skill_6`、`growth_skill_8`）；`Skill`/`SkillSchool` 类型移除；旧档 `skills` 字段迁移逻辑移除（技能树删除后无意义）；`DialogueScene`/`DialogueEngine` 的技能门槛死代码清理；诊所升级 `allClinicUpgrades` 独立保留不受影响。剧本不依赖 `requireSkill`（grep 验证零引用），删除无行为变更 |
| v1.8.0 | 2026-08-09 | **多槽位存档 + 本地账号 + HUD 反馈入口**：① **HUD 反馈入口**：HUD 新增「反馈」按钮，内置弹窗提交（bug/建议/其他三类型，600 字上限），存本地草稿 `ps.feedback.v1`（`components/game/FeedbackDialog.tsx`）；② **多槽位存档（Storage §6.1 重写）**：槽索引 `ps.saveIdx.v1`（`Record<slotId, SaveSlotMeta>`）+ 每槽独立 key `ps.slot.<id>`，元信息含诊所名/天数/等级/金钱/更新时间/来源(`source: "local"\|"cloud"`，云端预留置灰)/归属用户；`saveSlot`/`loadSlot`/`deleteSlot`/`listSlots`(按 updatedAt 倒序)/`nextSlotId`；旧单档 `ps.save.v1` 首次迁移为槽位 1 并清旧档（`migrateLegacySave`）；③ **本地账号**：`ps.user.v1` 存 `UserProfile`（自动生成 `u_<time36>_<rand36>` id + 昵称，复用旧 id），存档元信息打 userId/userName 归属标记，为云端后台区分用户预留；④ **store 槽感知**：`activeSlotId`/`saveSlots`/`currentUser`，`newGame(clinicName?, slotId?)`（缺省分配新槽，指定覆盖）、`continueGame(slotId)`、`deleteSlot`（删光后 `hasSave` 同步为 false）、`commit`/`saveNow`/`pauseSession`/`backToTitle`/`enterClinic` 全部落盘当前槽；⑤ **TitleScreen 改造**：注册/切换昵称入口 + 存档列表弹窗（诊所名/天数/等级/金钱/时间/归属/来源，云端置灰，可删除两态确认，新游戏可选新建槽或覆盖已有槽）；⑥ `window.setTimeout`→全局 `setTimeout`（SSR 安全）。测试 `lib/state/Storage.test.ts`（14 例）+ `lib/store.slot.test.ts`（7 例） |
| v1.8.1 | 2026-08-09 | **昵称全局唯一（永久保留）**：Storage 新增昵称登记表 `ps.usernames.v1`（昵称→用户 id，**永久保留**——本地任何账号注册过的昵称都不再允许注册，换昵称后旧昵称仍被占用），为云端后台按昵称区分用户铺路；`registerUser` 改为返回 `RegisterOutcome`（`ok`/`duplicate`/`invalid`），重名返回 `duplicate` 且不落盘；新增 `ensureNicknameRegistered`（存量账号昵称补登登记表，老数据升级不冲突）；store `register` 透传结果对象 + `init` 时对已有账号补登；TitleScreen 注册/切换昵称显示冲突提示「该昵称已被使用，永久保留，换一个吧」。测试 Storage +1（永久唯一/换昵称旧名占用/补登）+ store.slot +1（duplicate 且当前账号不变） |
| v1.9.0 | 2026-08-09 | **移动端适配（iPhone 优先，玩家多 iOS）**：① **对话场景字号 clamp 保底**——`.clinic-stage`（16:9 FIT 舞台）在 iPhone 竖屏（393×852）下宽 393px、cqw=3.93px，玩家说话 1.9cqw≈7.5px、旁白≈6.7px 不可读；所有 cqw 字号套 `clamp(px下限, cqw, px上限)`：玩家/患者说话 `clamp(15px,1.9cqw,20px)`、旁白 `clamp(14px,1.7cqw,18px)`、气泡名/患者名牌 `clamp(12px,…)`、疲惫句 `clamp(12px,1.6cqw,15px)`；气泡宽度 `32cqw`（393px 下仅 126px 碎行）改 `clamp(260px,32cqw,360px)`；桌面 cqw 主导不变（大宽屏封顶更协调）；② **HUD 自适应折叠**——手机竖屏（≤540px）HUD 单行精简：`hud` 高 56px，品牌隐藏（960px 断点）、等级(Lv+经验条)/声望收进「⌄ 更多」折叠面板（`HUD.tsx` 加 `hudMore` state + `.hud-stat.collapsible` 默认收起、`.hud.expanded` 展开、展开态恢复 `.hud-stat-bar` 进度条），保存/反馈/退出按钮图标化（`.hud-btn-text` 隐藏留图标），时段胶囊瘦身，`hud-stats` 允许 `flex-wrap`；展开按钮 `.hud-more-btn` 仅 ≤540px 显示；③ **结算面板自适应高度**——`.ending-card` 移除 `max-height:calc(100vh-80px)`+卡内 `overflow-y:auto`（内框 `::before` 只圈住首屏、内容滚动后溢出线框），改 `margin:auto` 高度随内容自适应（线框完整圈住全部内容），超高时 `.ending-overlay` 加 `overflow-y:auto` 整层滚动。Playwright 实测 iPhone 16 Pro（393×852）：HUD 收起无横向溢出、展开等级/经验条可见、对话字号 15px、气泡宽 260px；桌面 1440×900 回归（说话 20px/名牌 15px、HUD 完整无变化） |
| v1.9.1 | 2026-08-09 | **患者气泡横向延伸 + 手机首页压缩（iPhone 实测二轮）**：① **患者气泡横向延伸**——患者长句多、换行高易垂直到达底部候选选项区；发现根因：`.speak-bubble` 是 `absolute`+`left` 锚定（锚 `bubbleAnchor.patient` x=660），absolute 元素宽度默认 shrink-to-fit 被约束为「舞台宽−left」（iPhone 393px 舞台右侧患者仅剩 **156px**，`max-width` 形同虚设）；修复加 `width:max-content` + `max-width: clamp(300px,40cqw,440px)`（患者专属），让气泡真正按上限横向铺开；患者锚点 x 660→580 使加宽后的气泡完整落在舞台内（iPhone 实测 156px→**300px**，同句气泡高度 323px→**192px**，与选项区重叠归零，长句 12 行→5 行）；doctor 气泡不受影响（样式未动）；② **手机首页压缩**——手机竖屏（≤540px）首页 header 收成单行紧凑栏：padding `24px 40px 14px`→`8px 16px 6px`、h1 28→17px、副标题隐藏、stat chips 瘦身；`flex-direction:row` 用 `.scene.clinic .clinic-header`（特异性 0,2,0）提级覆盖 `cinema.css` 的 `@media (max-width:900px)` column 布局；`clinic-body` 边距 40→16px、`section-title` 13px 收窄；实测 header 96→56px，预约清单多出约 40px 纵向空间。Playwright 实测 iPhone 16 Pro（393×852）对话无遮挡 + 首页紧凑，桌面 1440×900 回归（header 28px/副标题/气泡 440px 完整） |

---

## 14. 界面场景化重构 · 治愈系手绘纸木质（v1.0.0 · M1/M2 主体完成）

> 本小节为立项摘要。产品需求见 [docs/kairosoft/PRD.md](./kairosoft/PRD.md)，技术规格见 [docs/kairosoft/SPEC.md](./kairosoft/SPEC.md)，实施计划见 [docs/kairosoft/PLAN.md](./kairosoft/PLAN.md)。
>
> **决策已锁定**：全量场景化（经营层+叙事层都进场景）｜治愈系手绘纸木质（非开罗像素）｜Phaser 场景 + React UI 覆盖层｜大厅+诊室双场景｜**v1.3 场景不绘制小人**（候诊改名牌卡片直接开诊）｜装修模式半自由摆放（位置仅视觉）｜AI 治愈插画背景 + 程序绘制交互叠加｜五期 M1-M5｜对话面对面逐句气泡+右上角回顾窗。

### 14.1 目标与背景

将游戏界面从当前「网页卡片式」彻底重构为治愈系手绘纸木质模拟经营风格——参考《Cozy Grove》《Spiritfarer》的温暖叙事语言，界面如手账/木牌般亲切。核心体验变化：

- 经营层从「列表 + 卡片」变为「可游走的 2D 场景」：插画背景 + 设施可视化 + 候诊名牌（不画小人）
- 顶栏资源、操作入口、弹窗统一为纸木质视觉语言
- 原有玩法（对话诊疗 / 复诊 / 发现客户 / 回访 / 成就）**零变化**，只重做表现层

**技术选型结论：Phaser.js（不选 Three.js）。** 场景是 2D 治愈插画 + 程序绘制交互叠加，Phaser 原生支持 2D sprite、动画、tilemap、场景管理，包体小、上手快；Three.js 是 3D WebGL 引擎，做 2D 场景是杀鸡用牛刀，除非未来明确要 2.5D 等距 3D 表现，否则不引入。

### 14.2 场景化特征 → 本游戏映射

| 场景化特征 | 本游戏现状 | 方案 |
| --- | --- | --- |
| 顶栏资源条（金币/幸福度/天数） | 已有 HUD（等级/金钱/声望/理智） | 保留结构与 tooltip，纸木质换肤（资源图标 + 数值排布） |
| 中央经营场景（设施/游走） | 无，预约清单列表 | Phaser 场景：等候区/诊室/休息室/花园，候诊患者以名牌卡片呈现（v1.3 不画小人） |
| 点击对象交互 | 点击列表卡片 | 点击场景中的患者名牌/设施 → 弹出操作面板 |
| 底部菜单栏（设施/研究/职员） | 侧栏「个人成长/诊所状态」列表 | 开罗式底部图标菜单：技能/升级/消息/追踪/成就/休息 |
| 时间推进（日/月结算） | 「休息一日」按钮 | 开罗式时间条 + 日末结算浮层（保留 restOneDay 逻辑） |
| 弹出窗口（木板/纸片质感） | 已有面板/信纸弹窗 | 统一开罗式弹窗质感，复用现有 modal 组件结构 |
| 经营评定/目标 | 无 | 可选：开罗式里程碑评定（不影响核心玩法，后置） |
| 画风 | 暖色手绘风（CSS Chibi） | **保持暖色手绘 + 纸木质**，非像素；场景交互元素仅设施/候诊名牌程序绘制，**不画小人**（v1.3 用户决策） |

### 14.3 技术架构

```text
┌─────────────────────────────────────────────┐
│  React DOM 覆盖层（现有组件）                 │
│  HUD / 菜单弹窗 / 对话窗口 / 成就 / 信纸      │
├─────────────────────────────────────────────┤
│  Phaser 3 场景画布（新增）                   │
│  诊所经营场景：房间 / 设施 / 候诊名牌 / 动画    │
├─────────────────────────────────────────────┤
│  zustand store（复用，单一数据源）            │
│  游戏状态 / 对话引擎 / 成就引擎 / 存储层       │
└─────────────────────────────────────────────┘
```

- **单一数据源**：zustand store 保持唯一状态来源；Phaser 场景只读 store、通过事件/回调通知 React，不双写状态，避免状态漂移
- **Phaser 生命周期**：React 组件内挂载/销毁 Phaser Game 实例（`components/game/phaser/` 目录放场景代码）；场景切换（进入对话/离开诊所）时暂停或销毁画布
- **复用资产**：数据表（patients/skills/upgrades/discovery/achievements）、DialogueEngine、AchievementEngine、Storage 全部不动
- **样式**：现有 `app/styles/` 模块化结构保留，新增 `phaser` 覆盖层样式（z-index 分层、canvas 尺寸/缩放）


### 14.4 分阶段实施计划（五期，详见 docs/kairosoft/PLAN.md）

每期独立可玩、独立提交，风险隔离：

| 期 | 名称 | 交付物 |
| --- | --- | --- |
| M1 | 技术地基 | Phaser 集成、场景壳、EventBridge、设施+候诊名牌、顶栏纸木质化 |
| M2 | 经营层场景化 | 大厅全貌、设施可视化+升级面板+装修模式、候诊名牌（取代患者小人）、底部菜单栏精简换肤 |
| M3 | 叙事层场景化 | 诊室场景、面对面对话（逐句气泡+回顾窗）、结局场景化 |
| M4 | 全界面统一 | 各面板开罗化、移除旧 DOM 界面 |
| M5 | 打磨验收 | 动画、响应式、性能、全量验收 |

### 14.5 风险与约束

- **渲染 vs DOM 覆盖层**：z-index 分层与 canvas 尺寸管理需严格约定，避免弹窗被画布遮挡或反向
- **文本可读性**：对话是本作核心玩法，开罗化不得牺牲对话/选项/记忆碎片的可读性（C 阶段重点约束）
- **响应式/移动端**：Phaser canvas 缩放策略，小屏下 HUD 与菜单布局
- **性能**：sprite 数量控制、按需加载、避免每帧全量同步 store
- **测试**：现有 20 个 vitest 用例保持通过；数据层在重构期间零改动

### 14.6 验收标准

1. 经营层场景候诊名牌可点击开诊，设施可点击/装修
2. 全界面视觉统一为纸木质风格（顶栏/场景/菜单/弹窗）
3. 原有玩法（对话/复诊/发现客户/回访/成就）零回归
4. 分阶段每阶段可玩、可提交

---

## 15. 首页回归全 React · 对话布局调整（v1.4.0）

> 用户决策（2026-08-09）：首页不再以 Phaser 场景为主视觉，回归全 React 布局——预约全列表 + 诊所状态精简卡，彻底移除大厅画布（接受装修拖动落格失效）。候选候选项在选项多时曾物理覆盖对话气泡，一并调整布局。

### 15.1 首页布局（全 React）

- 首页（`scene="clinic"`）直接渲染预约清单本体（原 ClinicHall 内容），移除「📋 预约清单」弹层与入口按钮（`clinic-list-toggle` / `clinic-list-mask` 样式删除）
- 移除 Phaser 大厅画布（`GameCanvas`/`HallScene` 不再挂载于首页）：候诊卡、设施、花/画、装修拖动全部移除
- **去重**：「个人成长」侧栏 6 个入口（技能/升级/消息/追踪/成就/休息）交给底部栏（`BottomBar` 已有全部入口）；头部「＋发现客户」按钮移除（底部栏「发现」承担）
- **保留**：今日预约列表（React 清晰卡片）、头部概览 StatChip（已接待/技能/设施）、「诊所状态」精简卡（进度条 + 天数 + 流失）、「花园待一会」理智恢复入口（移入状态卡区）
- **v1.5.1 清单拆分**：预约清单分为两个独立区块——「今日预约」（未完成患者 + 治愈回访探望患者 + 断点患者，可对话优先置顶）与「已完成 · 可重新接诊」（`patientRecords[id]` 有结局、无回访探望、今日未接诊的已治愈患者）。已完成区为受控高度内部滚动（`max-height: 34%`，顶部虚线分隔），无符合条件患者时整块隐藏。分类判定见 `ClinicHall.tsx` 的 `isCompleted / isReturning / isResuming`：回访探望保留在主清单置顶，断点患者恒在主清单「继续上次」。

### 15.2 装修模式降级

- 拖动落格（`decorateMode` / `facilityDropped` / `decorDropped`）失效——画布移除后无处落格
- 升级面板（`scene="clinic_upgrades"`）保留：设施购置、设施外观变体切换（`setFacilityDecor`）、花/画「摆放/收起」（`toggleDecor`，作为记忆收藏管理）；移除「🛠 装修模式」按钮
- 数据层零改动：`setFacilityPosition`/`setDecorPosition`/`decorPositions` 保留（兼容旧存档与后续恢复）

### 15.3 对话布局调整（防候选遮挡气泡）

- 候选选项区 `.dialogue-options` `max-height` 46% → **34%**（选项区顶部从 ~53% 降到 ~65% 场景高）
- 气泡锚点 `CLINIC_LAYOUT.bubbleAnchor.*.y` 250 → **190**（上移到场景 35%，与选项区顶部留 ~16% 间隙）
- 保留 `bottom:14px` / `overflow-y:auto`（选项多时滚动）

### 15.4 范围

- 数据层 / 对话引擎 / 成就引擎 / 存储层零改动
- `GameCanvas.tsx` 保留（对话场景 `ClinicRoomCanvas` 仍依赖）；`phaser/hall/*`、`draw/Furniture.ts`、`draw/Decor.ts` 首页不再引用（留待后续清理）

---

## 16. 治疗分期复诊 · 节拍断拍（v1.6.0）

> 用户决策（2026-08-09）：节拍与节拍之间隔一段时间——一个节拍结束后患者离开诊所，等 1~3 天后复诊到访，再开启下一节拍。复诊消耗当日名额。

### 16.1 节拍边界标记（剧本层）

- 节拍制剧本（短 4 节拍 / 中 5 节拍 / 长 6 节拍）的每个节拍结束处是「narration 患者离开」节点，语义上患者离开诊室。
- 此类节点加机器标记 `beatEnd: { resumeNode }`，`resumeNode` 指向下一节拍起始节点（`X2_start` / `X3_start` …）。
- **边界数 = 档位节拍数 − 1**（短 3 处 / 中 4 处 / 长 5 处）；末节拍结束走正常结局（`isEnding`），无 beatEnd。
- `autoNext` 保留作兜底：引擎优先判 `beatEnd`，其次 `autoNext`。
- 无节拍的引导剧本（小北）不标记。

### 16.2 引擎契约

- `DialogueNode` 新增可选 `beatEnd?: { resumeNode: string }`。
- `DialogueEngine.continue()` 在 `_padChoice` 之后、`autoNext` 之前检查 `currentNode.beatEnd`：命中则调 `callbacks.onBeatEnd(resumeNode)` 并返回（**不结案、不触发 onEnding**）。
- `SessionCallbacks.onBeatEnd?: (resumeNode) => void`。

### 16.3 状态流（GameState / store）

- GameState 新增 `treatmentStages: Record<patientId, TreatmentStage>`：`stage`（已完节拍数）/ `resumeNode`（下一节拍起始节点）/ `patientState`（四维快照，跨节拍延续）/ `triggeredMemories` / `dueDay`（复诊到访日）/ `arrived`。`createInitialState` 空对象、`migrateGameState` 旧档补齐。
- `store.completeBeat(patientId, resumeNode, lastState, triggeredMemories)`（`DialogueScene` 的 `onBeatEnd` 回调调用）：
  - 写/更新 `treatmentStages[patientId]`（`stage+1`、`dueDay = day + 1~3 随机`、`arrived=false`）
  - **消耗当日名额**：`g.slot += 1`
  - 清断点：`activeSession` 指向该患者时置空（复诊由 treatmentStages 承接，避免大厅误显「继续上次」）
  - 回大厅（`scene="clinic"`、`currentPatient=null`）+ toast 提示复诊天数
- `restOneDay`：
  - `advanceDayState` 的推进患者过滤治疗中（等待复诊）患者——**不推进 waitingDays / 不催诊 / 不放弃**
  - 日终 `resolveDueTreatmentVisits(g)`：`dueDay <= day` 的标记 `arrived=true` 并写「xx 复诊到访」notice，患者进入大厅可继续
- `finishSession`：结局结算时 `delete treatmentStages[patientId]`（治疗完成，不再等待复诊）。

### 16.4 呈现层

- `DialogueScene`：进入时若 `treatmentStages[currentPatient.id].arrived`（非断点恢复）则从 `resumeNode` 恢复引擎；`onBeatEnd` 回调触发 `completeBeat`。节拍边界节点是 narration（无选项），天然复用「继 续 ▸」按钮交互。
- `ClinicHall`：等待复诊（未到访）患者从大厅隐藏（不打扰）；到访后显示复诊卡「✚ 复诊 · 上次谈到第 N 次会谈，点击继续」。
- `Tracking`：治疗中未到访显示「治疗中 · 已完成 N 次会谈，待复诊」且按钮禁用；到访后「✚ 复诊到访 · 可继续会谈」。

### 16.5 恢复优先级

复诊到访继续 vs 断点恢复：`activeSession` 断点优先（玩家主动离开会话），其次治疗复诊到访。`completeBeat` 已清掉节拍结束产生的断点，两者不冲突。
