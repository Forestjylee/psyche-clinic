# 《森林心理诊所》开罗式全量界面重构 · 技术规格（SPEC）

| 项 | 值 |
| --- | --- |
| 版本 | v1.0（2026-08-07） |
| 状态 | 规划完成，随 M1 启动动工 |
| 关联 | docs/kairosoft/PRD.md（产品需求）、docs/kairosoft/PLAN.md（实施计划） |
| 目标版本 | v1.0.0 |

---

## 1. 技术选型

| 项 | 选择 | 版本 | 理由 |
| --- | --- | --- | --- |
| 2D 渲染引擎 | Phaser 3 | ^3.87 | 原生 2D sprite/animation/scene，包体小，开罗俯视范式匹配 |
| 渲染形态 | Phaser WebGL/Canvas | - | 程序绘制 Graphics + 文本 |
| 状态 | zustand（复用） | 5.x | 单数据源不变 |
| UI | React（复用） | 18 | 覆盖层组件复用现有代码 |
| 桥接 | 自定义 EventEmitter | - | React ↔ Phaser 事件总线 |

**不引入**：Three.js（3D 过重）、pixi（场景管理弱）、外部美术资产（全程序绘制）。

---

## 2. 架构分层

```
┌─────────────────────────────────────────────────────────┐
│  React 层（DOM）                                         │
│   GameCanvas(挂载点) · 顶栏 HUD · 底部菜单栏               │
│   各面板(技能/消息/成就/升级/发现) · 弹窗(portal)          │
│   对话覆盖层(气泡/选项/状态条/回顾窗)                      │
├─────────────────────────────────────────────────────────┤
│  EventBridge（lib/bridge/EventBridge.ts）                │
│   React → Phaser：moveTo / openDialogue / startDecorate…  │
│   Phaser → React：patientClicked / facilityClicked /      │
│                    playerArrived / sceneReady / stageChange│
├─────────────────────────────────────────────────────────┤
│  Phaser 层（components/game/phaser/）                     │
│   Game.ts(实例) · HallScene(大厅) · ClinicScene(诊室)     │
│   程序绘制模块：SmallCharacter / Furniture / Decor / Floor │
├─────────────────────────────────────────────────────────┤
│  数据层（zustand store + engine + data，零改动）           │
│  store.getState() 供 Phaser 只读 · store 动作供 UI 调用    │
└─────────────────────────────────────────────────────────┘
```

### 2.1 分层铁律

1. **单一数据源**：zustand store 唯一状态源。Phaser 场景只读 `store.getState()`，不双写。
2. **Phaser 不直接改 store**：玩家在场景里的交互（点患者/点设施）→ 通过 EventBridge 通知 React → React 调用 store action。避免状态漂移与 React 外修改。
3. **UI 触发 Phaser**：React 组件通过 EventBridge 发指令（如 `moveTo(patientId)`），Phaser 执行动画，动画完成 emit 回来。
4. **每帧不轮询**：Phaser 的 update() 不读 store 全量，只处理场景动画（tween 由 Phaser 管理）。store 变更经 React 订阅 → EventBridge 推送场景刷新。

### 2.2 Phaser 生命周期

- `GameCanvas` 组件（"use client"）在 `useEffect` 创建 Phaser.Game，`cleanup` 调 `game.destroy(true)`。
- 场景挂载/销毁遵循 Phaser scene 生命周期；进入对话切到诊室用 `scene.switch`（保留大厅场景，返回不重建）。
- 只创建**一个** Phaser.Game 实例（单 canvas），大厅/诊室是其中两个 scene，避免多实例冲突。

---

## 3. 目录结构（新增/改造）

```
components/game/phaser/          # Phaser 层
  GameCanvas.tsx                 # React 挂载组件（创建/销毁 Game）
  game.ts                        # Phaser.Game 配置与场景注册
  hall/HallScene.ts              # 大厅场景
  hall/hallLayout.ts             # 大厅布局数据（网格/设施位/装饰位）
  clinic/ClinicScene.ts          # 诊室场景
  draw/SmallCharacter.ts         # 程序绘制小人（医生/患者共用）
  draw/Furniture.ts              # 设施/家具程序绘制
  draw/Decor.ts                  # 装饰（植物/地毯/挂画等）
  draw/floor.ts                  # 地板绘制（木色/暖色 tile）
lib/bridge/
  EventBridge.ts                 # 事件总线（单例）
  types.ts                       # 桥接事件类型
components/game/                 # 改造
  HUD.tsx                        # → 开罗式顶栏
  BottomBar.tsx                  # 新增：开罗式底部菜单栏
  DialogueScene.tsx              # → 诊室覆盖层（气泡/选项/状态条/回顾窗）
  ClinicHall.tsx                 # → 大厅场景的 React 壳（加载 GameCanvas）
```

---

## 4. 程序绘制规范（温暖手绘风）

### 4.1 色板

沿用现有 CSS 变量与患者 palette：

- 全局色：`--bg-panel`、`--bg-card`、`--accent`、`--accent-2`、`--gold`、`--good`、`--warn`、`--bad`、`--text`、`--text-dim`、`--border`、`--border-soft`
- 医生小人：固定色板（白大褂 + 暖棕发）——在 SPEC 常量定义 `DOCTOR_PALETTE`
- 患者小人：取 `patient.palette`（primary 头发/衣服、secondary 身体、fog 环境色）

### 4.2 SmallCharacter（程序小人）

用 Phaser Graphics 绘制简化 Chibi，接口：

```ts
interface CharacterOptions {
  palette: { primary: string; secondary: string };  // 头发/衣服色
  faceColor: string;   // 肤色（默认暖肤色）
  scale?: number;      // 放大倍数
}
function drawCharacter(scene, x, y, opts): Phaser.GameObjects.Container
```

绘制元素（相对坐标，scale 归一化 1.0 ≈ 高 48px）：
- 身体：圆角矩形/椭圆（secondary），下方两小脚（走路交替）
- 头：圆（肤色），上方半圆头发（primary）
- 表情：两点眼 + 弧形嘴（用 Graphics 线条），随情绪变化（微笑/平静/难过）
- 走动画：Phaser tween 左右脚交替 + 上下轻微浮动 + 面向方向（scaleX 翻转）

静态立绘（对话中的大号）复用现有 DOM `ChibiCharacter`（CSS 版），由 React 覆盖层渲染，保证表情细节不降级。

### 4.3 地板与房间（HallScene）

俯视网格地板：Graphics 按 tile 尺寸画木色/暖色方块，轻微深浅交错。房间分区：
- 候诊区（椅子若干 + 茶几 + 植物）
- 前台（接待台 + 助理小人）
- 诊室入口（门，点它进入诊室场景）
- 休息室（沙发 + 门）
- 花园（落地窗 + 绿植，装饰性）

设施（诊所升级项）占固定候选位，装修模式可拖动到任意空地（见 §8）。

### 4.4 诊室（ClinicScene）

程序绘制：地毯（暖色椭圆）、两张沙发/椅子（医生与患者相对）、矮桌、窗（透光）、挂画。人物站位：医生（左）、患者（右），面向彼此。

---

## 5. EventBridge 事件表

| 方向 | 事件 | 载荷 | 说明 |
| --- | --- | --- | --- |
| React→Phaser | `moveTo` | `{ x, y }` | 医生小人移动到坐标 |
| React→Phaser | `patientEnter` | `{ id, seat }` | 患者进入候诊/诊室 |
| React→Phaser | `openClinicScene` | `{ patientId }` | 切诊室场景 |
| React→Phaser | `backToHall` | - | 返回大厅 |
| React→Phaser | `decorateMode` | `{ on }` | 进入/退出装修模式 |
| React→Phaser | `syncFacilities` | `FacilityState[]` | 设施数据变更后刷新场景 |
| Phaser→React | `sceneReady` | `{ scene }` | 场景就绪 |
| Phaser→React | `patientClicked` | `{ id }` | 玩家点了患者 |
| Phaser→React | `facilityClicked` | `{ id }` | 玩家点了设施 |
| Phaser→React | `doctorArrived` | `{ x, y }` | 导航完成 |
| Phaser→React | `doorClicked` | `{ to }` | 点了门（诊室/休息室） |
| Phaser→React | `patientMoveDone` | `{ id }` | 患者动画完成 |

---

## 6. 顶栏 HUD（开罗化）

改造 `components/game/HUD.tsx`，保持 React DOM，视觉开罗化：

- 常驻段：等级(带 exp 条) · 金钱 · 声望 · 理智 · 日期(第 N 天 · 时段) · 时段图标(☀/🌙)
- 右侧按钮：静音 · 保存 · 退出（退出确认弹窗沿用 createPortal 修复）
- 开罗风：顶部高亮条 + 数字 `font-variant-numeric: tabular-nums` + 数值变化时轻微弹跳动画（CSS 类，`prefers-reduced-motion` 降级）
- 与底部菜单栏并存：顶栏只放常驻数值与全局操作，功能入口全部下沉到底部栏

---

## 7. 底部菜单栏（新增）

`components/game/BottomBar.tsx`，固定底部居中图标菜单（开罗式），每项 = 图标 + 短标签：

| 项 | 图标 | 打开面板 | 备注 |
| --- | --- | --- | --- |
| 技能 | ⚕ | 技能树 | 带 Lv 徽标 |
| 升级 | 🏗 | 诊所升级 | 带「装修」入口 |
| 消息 | ✉ | 消息盒子 | 未读红点 |
| 追踪 | 📋 | 客户追踪 | - |
| 发现 | 🔍 | 发现客户 | - |
| 成就 | 🏅 | 成就图鉴 | 带解锁数 |
| 休息 | 😴 | （直接休息） | 带理智恢复提示 |

布局：`position:fixed; bottom; left:50%; translateX(-50%)`，暖色半透明底 + `backdrop-filter`（注意：`backdrop-filter` 会创建 containing block，底部栏内的 fixed 弹层需 portal——沿用 HUD 退出弹窗教训）。

---

## 8. 装修模式（M2 实现）

- 进入：升级面板点「装修」→ EventBridge `decorateMode({on:true})`
- 场景内：设施变半透明 + 显示网格光标；拖动设施 → 松手落在最近空地格
- 数据：新增 `game.facilityPositions: Record<upgradeId, {x,y}>`（GameState 纯新增字段，migrate 给默认值），保存到存档
- 位置仅视觉：不参与任何数值计算
- 退出：点「完成」→ `decorateMode({on:false})` + 保存

---

## 9. 对话场景化（M3 实现）

诊室场景 + React 覆盖层：

- **气泡**：说话者头顶/旁边 DOM 气泡，逐句显示，`TypewriterText` 复用打字机效果
- **选项**：底部选项按钮（复用现有 `choice` 样式与锁定逻辑）
- **状态条**：患者四维（信任/防御/心情/真相）常驻右上角，复用 `StatusRow` 逻辑
- **回顾窗**：右上角按钮打开小窗，按时间序列出本场对话历史（`history` 状态已有，移到对话场景状态）
- **记忆碎片**：全屏浮层（沿用现有）
- **结束/结局**：结算卡 + 温暖回响（沿用现有 EndingOverlay 视觉，套开罗卡片样式）

对话引擎（DialogueEngine）零改动，只换 UI 呈现层。

---

## 10. 性能与响应式

- **单 canvas**：一个 Phaser.Game 实例，场景 switch 复用
- **sprite 数量控制**：患者小人池化（同一时刻候诊人数有限）；装饰静态化（不逐帧动画）
- **不每帧同步**：见 §2.1 铁律 4
- **尺寸**：canvas 逻辑分辨率 960×540（4:3 开罗比），Scale.FIT 适配视口；React 覆盖层用 vw/vh 对齐场景关键区（对齐坐标常量共享）
- **小屏**：底部菜单项压缩为纯图标，顶栏数字缩写（如 12.3k）
- **reduced-motion**：所有 CSS 动画沿用现有降级；Phaser tween 走「移动」而非「闪烁」

---

## 11. 分期实现要点

| 期 | 技术要点 |
| --- | --- |
| M1 | 装 Phaser；GameCanvas 挂载/销毁；HallScene 程序绘制地板/分区/装饰；医生小人绘制+点选导航（直线 tween）；EventBridge 建好；顶栏开罗化 CSS |
| M2 | 设施可视位+点击弹升级面板；装修模式拖动+落格+存档字段；患者候诊小人（站立/坐姿）进入/离开；底部菜单栏；休息/发现等入口接入 |
| M3 | ClinicScene 诊室；对话覆盖层（气泡/选项/状态条/回顾窗）；开诊→切诊室→对话→结算→回大厅全链路；结局/信件/记忆碎片开罗化 |
| M4 | 各面板（技能/消息/追踪/成就/发现客户）视觉开罗化；移除旧 DOM ClinicHall/DialogueScene；全量无残留 |
| M5 | 动画打磨（开罗数字跳动/进入退出/收获反馈）；响应式；性能 profile；全量验收（PRD §7） |

---

## 12. 验收清单（全量）

- [ ] 存档 v1.0 兼容（旧档可读）
- [ ] vitest 全部通过，数据层零改动
- [ ] M1–M5 每期独立可玩可提交
- [ ] 对话/选项/记忆碎片可读性不降级
- [ ] 顶栏 + 底部栏共存无遮挡、无 containing-block 弹窗 bug
- [ ] 装修模式位置保存/载入正确
- [ ] 玩法等价：获客/升级/回访/结局/成就行为一致
