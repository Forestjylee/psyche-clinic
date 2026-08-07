# 《森林心理诊所》界面场景化重构 · 技术规格（SPEC）

| 项 | 值 |
| --- | --- |
| 版本 | v1.3（2026-08-08） |
| 状态 | M1/M2 主体完成；v1.3 决策：场景不绘制小人 |
| 关联 | docs/kairosoft/PRD.md（产品需求）、docs/kairosoft/PLAN.md（实施计划） |
| 目标版本 | v1.0.0 |

---

## 1. 技术选型

| 项 | 选择 | 版本 | 理由 |
| --- | --- | --- | --- |
| 2D 渲染引擎 | Phaser 3 | ^3.87 | 原生 2D sprite/animation/scene，包体小，开罗俯视范式匹配 |
| 渲染形态 | Phaser WebGL/Canvas | - | 背景图像 + 程序绘制 Graphics + 文本 |
| 状态 | zustand（复用） | 5.x | 单数据源不变 |
| UI | React（复用） | 18 | 覆盖层组件复用现有代码 |
| 桥接 | 自定义 EventEmitter | - | React ↔ Phaser 事件总线 |

**不引入**：Three.js（3D 过重）、pixi（场景管理弱）。外部美术仅引入 AI 生成的场景背景图（`public/images/`），交互元素仍程序绘制。**视觉方向**：治愈系手绘纸木质，非开罗像素面板。

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
│   背景图像层（AI 插画铺底） + 程序绘制模块：SmallCharacter/Furniture │
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
  draw/Furniture.ts              # 设施/家具程序绘制
  assets/bg.ts                   # 场景背景图清单（AI 生成，引用 public/images/）
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

## 4. 美术资产与绘制规范（AI 治愈插画背景 + 程序绘制交互）

### 4.0 背景图像资产（AI 生成）

- **来源**：用户用 AI 绘图工具按风格 prompt 生成，放置 `public/images/`
- **清单**：`clinic-hall.jpg`（大厅，现 clinic-bg.jpg 待换）、`consult-room.jpg`（诊室）、`desk-corner.jpg`（功能面板浮层共用）、`garden.jpg`（休息日，可选）
- **规格**：横版 16:9（≥1280 宽），治愈系手绘插画（水彩/厚涂、低饱和暖色、木质暖棕+灰蓝墙+金色细线、柔和暖光）、无人物、画面下方留开阔地面活动区
- **用法**：Phaser 场景 `preload` 加载后铺满 960×540 画布（fill），设施/候诊名牌/装饰按深度叠加；画布外区域由 body 同图 cover 延伸（视觉全屏无黑边）
- **标定**：生成图与交互坐标对齐，用 vision 识别前台/门/候诊区位置，换算成逻辑坐标写入 `hallLayout.ts`

### 4.1 色板与纸木质 token

沿用现有 CSS 变量与患者 palette，**新增纸木质 token**（`app/styles/base.css` :root）：

- 全局色：`--bg-panel`、`--bg-card`、`--accent`、`--accent-2`、`--gold`、`--good`、`--warn`、`--bad`、`--text`、`--text-dim`、`--border`、`--border-soft`
- **纸木质新增**：
  - `--paper` 纸感底色（米白，带细微纸纹噪点可复用现有 `#app::before` 噪点方案）
  - `--paper-border` 手绘感细描边（略深的暖米线，`border-radius` 偏大，模拟纸张圆角）
  - `--wood` 木纹边框/底（浅木色，面板边缘 1px 木色渐变描边）
  - `--ink` 墨色文字（比 `--text` 更深更稳，保证高对比可读）
  - 阴影 `--shadow-paper`（比现 `--shadow-card` 更柔和、更扁平，模拟纸片投影）
- **可读性约束**：主字号 ≥14px、面板标题 ≥20px、图标 ≥20px；前景文字对比度 ≥ 4.5:1（WCAG AA），`--ink` 与纸底实测通过。
- ~~医生/患者小人色板~~：**已废弃**（v1.3 决策：场景不绘制小人）；对话静态立绘仍用现有 DOM `ChibiCharacter`（CSS 版，取 `patient.palette`）

### 4.2 ~~SmallCharacter（程序小人）~~ → 候诊名牌卡片（v1.3）

**已废弃**：程序绘制小人在 v1.3 起不再使用（用户决策：治愈系插画背景 + 名牌卡片承载开诊交互，不画小人）。

**候诊名牌**（HallScene 内联 `drawBadge`）：暖色纸卡（`--paper` 底 + `--paper-border` 描边）+ 姓名（`patient.palette.primary` 色 + 白描边保证可读）+ 情绪点 + 「点击开诊」小字；容器存 `patientId` data，点击 emit `patientClicked` → React `startSession`；进场淡入上浮动画。

对话静态立绘仍复用现有 DOM `ChibiCharacter`（CSS 版），由 React 覆盖层渲染，保证表情细节不降级。

### 4.3 地板与房间（HallScene）

俯视网格地板：Graphics 按 tile 尺寸画木色/暖色方块，轻微深浅交错。房间分区：
- 候诊区（椅子若干 + 茶几 + 植物）
- 前台（接待台）
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
| React→Phaser | `moveTo` | `{ x, y }` | ~~医生移动到坐标~~（v1.3 医生小人已移除，监听保留为占位忽略） |
| React→Phaser | `patientEnter` | `{ id, seat }` | 患者进入候诊/诊室 |
| React→Phaser | `openClinicScene` | `{ patientId }` | 切诊室场景 |
| React→Phaser | `backToHall` | - | 返回大厅 |
| React→Phaser | `decorateMode` | `{ on }` | 进入/退出装修模式 |
| React→Phaser | `syncFacilities` | `FacilityState[]` | 设施数据变更后刷新场景 |
| Phaser→React | `sceneReady` | `{ scene }` | 场景就绪 |
| Phaser→React | `patientClicked` | `{ id }` | 玩家点了患者 |
| Phaser→React | `facilityClicked` | `{ id }` | 玩家点了设施 |
| Phaser→React | `doctorArrived` | `{ x, y }` | ~~导航完成~~（不再 emit，事件定义保留） |
| Phaser→React | `doorClicked` | `{ to }` | 点了门（诊室/休息室） |
| Phaser→React | `patientMoveDone` | `{ id }` | 患者动画完成 |

---

## 6. 顶栏 HUD（纸木质悬浮）

改造 `components/game/HUD.tsx`，保持 React DOM，视觉纸木质：

- 常驻段：等级(带 exp 条) · 金钱 · 声望 · 理智 · 日期(第 N 天 · 时段) · 时段图标(☀/🌙)——**数值信息量保留**，只换材质
- 右侧按钮：静音 · 保存 · 退出（退出确认弹窗沿用 createPortal 修复）
- 纸木质：半透纸感底板 + 手绘细描边 + 木纹边；数字 `font-variant-numeric: tabular-nums` + 数值变化时轻微弹跳动画（CSS 类，`prefers-reduced-motion` 降级）
- 可读性：数值与图标**字号偏大**、`--ink` 深墨色，与纸底高对比
- 与底部菜单栏并存：顶栏只放常驻数值与全局操作，功能入口全部下沉到底部栏

---

## 7. 底部菜单栏（精简纸木质）

`components/game/BottomBar.tsx`，固定底部居中菜单（精简换肤），每项 = 图标 + 短标签：

| 项 | 图标 | 打开面板 | 备注 |
| --- | --- | --- | --- |
| 技能 | ⚕ | 技能树 | 带 Lv 徽标 |
| 升级 | 🏗 | 诊所升级 | 带「装修」入口 |
| 消息 | ✉ | 消息盒子 | 未读红点 |
| 追踪 | 📋 | 客户追踪 | - |
| 发现 | 🔍 | 发现客户 | - |
| 成就 | 🏅 | 成就图鉴 | 带解锁数 |
| 休息 | 😴 | （直接休息） | 带理智恢复提示 |

布局：`position:fixed; bottom; left:50%; translateX(-50%)`，**半透纸感底** + `backdrop-filter`；图标**手绘化、偏大**（≥20px），标签字号偏大清晰；缩小栏体高度、减少视觉噪音，让背景插画透出。注意：`backdrop-filter` 会创建 containing block，底部栏内的 fixed 弹层需 portal——沿用 HUD 退出弹窗教训。

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
- **对象数量控制**：候诊名牌数量受限（候诊区 3 席）；装饰静态化（不逐帧动画）
- **不每帧同步**：见 §2.1 铁律 4
- **尺寸**：canvas 逻辑分辨率 960×540（16:9），Scale.FIT 适配视口；场景背景图在 Phaser 内铺满画布，画布外区域由 body 背景图 cover 延伸（视觉全屏无黑边）；React 覆盖层用 vw/vh 对齐场景关键区（对齐坐标常量共享）
- **小屏**：底部菜单项压缩为纯图标，顶栏数字缩写（如 12.3k）
- **reduced-motion**：所有 CSS 动画沿用现有降级；Phaser tween 走「移动」而非「闪烁」

---

## 11. 分期实现要点

| 期 | 技术要点 |
| --- | --- |
| M1 | 装 Phaser；GameCanvas 挂载/销毁；HallScene 背景图铺底 + 设施 + 候诊名牌卡片（无医生导航）；EventBridge 建好；顶栏纸木质 CSS |
| M2 | 设施可视位+点击弹升级面板；装修模式拖动+落格+存档字段；候诊名牌卡片（取代患者小人）；底部菜单栏精简换肤；背景图坐标标定（vision）；功能面板浮层化 |
| M3 | ClinicScene 诊室；对话覆盖层（气泡/选项/状态条/回顾窗）；开诊→切诊室→对话→结算→回大厅全链路；结局/信件/记忆碎片纸木质 |
| M4 | 各面板（技能/消息/追踪/成就/发现客户）统一纸木质；移除旧 DOM ClinicHall/DialogueScene；全量无残留 |
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
- [ ] 纸木质 token 落地：面板/卡片纸感描边统一；图标/字号偏大清晰；文字对比度 ≥4.5:1；背景插画在面板后透出
