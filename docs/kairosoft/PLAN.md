# 《森林心理诊所》界面场景化重构 · 实施计划（PLAN）

| 项 | 值 |
| --- | --- |
| 版本 | v1.3（2026-08-08） |
| 状态 | M1/M2 主体完成，M3 叙事层待启 |
| 关联 | docs/kairosoft/PRD.md、docs/kairosoft/SPEC.md |

> 每期独立可玩、独立提交。数据层（`lib/data`、`lib/engine`、`lib/state`）重构期间零改动，仅允许 `GameState` 纯新增字段（如 `facilityPositions`）并走 migrate。

---

## 当前实现状态（2026-08-08 · v1.3 状态修正）

> **美术方向定稿：治愈系手绘纸木质**（非开罗像素）。场景交互元素仅画「设施」与「候诊名牌卡片」，**不再绘制任何小人**（医生/患者均移除，用户决策）。开诊交互改由名牌卡片点击触发。返回按钮统一 `.nav-back`「◂ 返回诊所」置于面板顶部；子功能窗口统一 `.scene.panel-view` 纸片浮层。

**已落地（本阶段）**
- M1 完成：Phaser 集成、EventBridge、背景图铺底、顶栏纸木质化、大厅场景（设施 + 候诊名牌）
- 小人相关任务**随决策取消**：M1-5 程序小人、M1-6 医生点选导航、M2-4 患者候诊小人、M2-7 网格导航、M3-2 医生走动；对应文件/逻辑（`SmallCharacter`、`moveDoctor`、医生出生区）已从 HallScene 移除
- M2 主体完成：设施绘制/点击/升级面板/装修模式、候诊名牌点击开诊、底部菜单栏精简换肤
- 全子功能面板统一：`nav-back` 返回按钮 + `panel-view` 纸片浮层（成就页已并入）
- 遗留 bug 修复：场景销毁后 `syncFacilities` 触发已销毁场景崩溃（`isAlive()` 守卫）

---

## M1 · 技术地基

> 交付物：Phaser 集成跑通、大厅场景背景图铺底、设施 + 候诊名牌卡片、顶栏纸木质化、EventBridge 建立。验收：大厅场景设施可点击、候诊名牌可点击开诊，vitest 通过。

| # | 任务 | 文件 | 说明 |
| --- | --- | --- | --- |
| M1-1 | 安装 Phaser | package.json | `npm i phaser@^3.87`；确认 Next/SSR 兼容（client-only import） |
| M1-2 | EventBridge | lib/bridge/EventBridge.ts、lib/bridge/types.ts | 单例事件总线，事件表见 SPEC §5；含 on/off/emit，带 payload 类型 |
| M1-3 | Phaser Game 配置与挂载组件 | components/game/phaser/game.ts、GameCanvas.tsx | 单 Game 实例；`useEffect` 创建/`destroy(true)` 销毁；场景注册（先只注册 HallScene）；960×540 Scale.FIT + body 背景图 cover 延伸（视觉全屏） |
| M1-4 | 背景图资产接入 | components/game/phaser/assets/bg.ts、public/images/ | AI 生成大厅背景图（clinic-hall.jpg），Phaser preload 铺底 960×540，替代程序绘制地板/分区/装饰 |
| M1-5 | ~~程序绘制：小人~~ | ~~SmallCharacter.ts~~ | **已取消**（v1.3 决策：不绘制任何小人） |
| M1-6 | 大厅场景 | components/game/phaser/hall/HallScene.ts、hallLayout.ts | 背景 CSS 铺底 + 设施绘制/点击 + 候诊名牌卡片（点击开诊）；**无医生导航/移动**（`moveTo` 监听保留为占位忽略，`doctorArrived` 不再 emit） |
| M1-7 | 顶栏纸木质化 | components/game/HUD.tsx、app/styles/ | 纸木质顶栏样式（纸感底+手绘描边+tabular-nums+数值弹跳，数值信息量保留），保留现有功能与退出 portal |
| M1-8 | M1 验收 | - | 浏览器验证：大厅场景+医生走动+顶栏；`npm test`、`npm run typecheck` 通过；提交 |

---

## M2 · 经营层场景化

> 交付物：大厅全貌（设施可视化+升级面板+装修模式）、候诊名牌卡片、底部菜单栏。验收：经营层在场景中可玩。

| # | 任务 | 说明 |
| --- | --- | --- |
| M2-1 | 设施程序绘制 | draw/Furniture.ts：前台/休息室/藏书架等 6 项按 upgradeId 绘制 |
| M2-2 | 设施点击与升级面板 | 点击设施 → EventBridge → React 弹升级面板（改造 ClinicUpgrades）；升级后 `syncFacilities` 刷新场景 |
| M2-3 | 装修模式 | `game.facilityPositions` 字段（GameState 纯新增+migrate）；拖动落格；进入/退出；存档 |
| M2-4 | 候诊名牌卡片 | 候诊患者画暖色名牌（姓名+情绪点）放候诊区；进场淡入上浮动画；**不画小人**（v1.3 决策替代原「患者候诊小人」） |
| M2-5 | 名牌点击开诊 | 点名牌 → `patientClicked` → React 找到剧本 → 目前先走现有对话流程（M3 前保持 DOM 对话） |
| M2-6 | 底部菜单栏精简换肤 | BottomBar.tsx：技能/升级/消息/追踪/发现/成就/休息，接入现有 scene；半透纸感底、图标手绘化偏大、缩小栏体 |
| M2-7 | ~~网格化导航~~ | **已取消**（v1.3 决策：无角色移动） |
| M2-8 | 背景坐标标定 | 对生成的大厅背景图用 vision 标定前台/门/候诊区/花园位置，换算逻辑坐标，更新 hallLayout.ts 布局常量与障碍物 |
| M2-9 | 功能面板浮层化 | 技能/消息/追踪/发现/成就从独立 scene 改半透明纸感浮层叠在大厅背景上（纸木质悬浮） |
| M2-10 | M2 验收 | 经营层场景可玩；测试/typecheck 通过；提交 |

---

## M3 · 叙事层场景化

> 交付物：诊室场景、面对面对话（逐句气泡+回顾窗）、结局场景化。验收：对话/结局开罗化，玩法等价。

| # | 任务 | 说明 |
| --- | --- | --- |
| M3-1 | 诊室场景 | ClinicScene.ts：地毯/沙发/窗/挂画；医生左患者右相对站位 |
| M3-2 | 开诊链路 | 点名牌 → 直接切诊室场景（**无医生走动**，v1.3 决策） → 对话在场景内进行 |
| M3-3 | 对话覆盖层 | DialogueScene 改造：逐句气泡（说话者头顶）+ 底部选项 + 右上角状态条 + 回顾窗；DialogueEngine 零改动 |
| M3-4 | 记忆碎片/结局 | 记忆碎片浮层沿用；结局结算+温暖回响开罗化 |
| M3-5 | 返回大厅 | 结算完 → 回大厅，患者状态更新动画 |
| M3-6 | M3 验收 | 全对话链路场景化；测试/typecheck 通过；提交 |

---

## M4 · 全界面统一

> 交付物：各面板统一纸木质视觉，移除旧 DOM 界面。验收：全量界面统一无残留。

| # | 任务 | 说明 |
| --- | --- | --- |
| M4-1 | 技能树/消息/追踪/成就/发现面板纸木质化 | 统一纸感卡片、手绘图标、布局；图标/字号偏大高对比 |
| M4-2 | 标题屏/引导/序章纸木质化 | 视觉统一 |
| M4-3 | 移除旧 DOM 界面 | 删除 ClinicHall/DialogueScene 旧呈现，保留数据与引擎 |
| M4-4 | M4 验收 | 无残留旧 UI；测试通过；提交 |

---

## M5 · 打磨验收

| # | 任务 | 说明 |
| --- | --- | --- |
| M5-1 | 动画打磨 | 开罗式数字跳动/进入退出/收获反馈 |
| M5-2 | 响应式 | 小屏菜单/顶栏缩放适配 |
| M5-3 | 性能 | sprite 池化/装饰静态化/每帧不同步验证 |
| M5-4 | 全量验收 | PRD §7 六项全过；SPEC §12 清单全过 |
| M5-5 | 版本提交 | v1.0.0 里程碑提交 |
