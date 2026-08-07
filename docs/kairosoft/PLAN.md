# 《森林心理诊所》开罗式全量界面重构 · 实施计划（PLAN）

| 项 | 值 |
| --- | --- |
| 版本 | v1.0（2026-08-07） |
| 状态 | 规划完成，M1 进行中 |
| 关联 | docs/kairosoft/PRD.md、docs/kairosoft/SPEC.md |

> 每期独立可玩、独立提交。数据层（`lib/data`、`lib/engine`、`lib/state`）重构期间零改动，仅允许 `GameState` 纯新增字段（如 `facilityPositions`）并走 migrate。

---

## M1 · 技术地基

> 交付物：Phaser 集成跑通、大厅场景程序绘制、医生小人点选导航走动、顶栏开罗化、EventBridge 建立。验收：大厅场景 + 医生可走动，vitest 通过。

| # | 任务 | 文件 | 说明 |
| --- | --- | --- | --- |
| M1-1 | 安装 Phaser | package.json | `npm i phaser@^3.87`；确认 Next/SSR 兼容（client-only import） |
| M1-2 | EventBridge | lib/bridge/EventBridge.ts、lib/bridge/types.ts | 单例事件总线，事件表见 SPEC §5；含 on/off/emit，带 payload 类型 |
| M1-3 | Phaser Game 配置与挂载组件 | components/game/phaser/game.ts、GameCanvas.tsx | 单 Game 实例；`useEffect` 创建/`destroy(true)` 销毁；场景注册（先只注册 HallScene）；960×540 Scale.FIT |
| M1-4 | 程序绘制：地板 | components/game/phaser/draw/floor.ts | 木色/暖色交错 tile；房间分区留白（候诊/前台/诊室门/休息室门/花园） |
| M1-5 | 程序绘制：小人 | components/game/phaser/draw/SmallCharacter.ts | 简化 Chibi：身体/头/发/表情/脚；palette 参数化；朝向翻转 |
| M1-6 | 大厅场景 | components/game/phaser/hall/HallScene.ts、hallLayout.ts | 地板+分区装饰+医生出生点；点击地面 `moveTo` → 医生 tween 走过去（直线，M2 再网格化）；动画完成 emit `doctorArrived` |
| M1-7 | 顶栏开罗化 | components/game/HUD.tsx、app/styles/ | 开罗式顶栏样式（高亮条+tabular-nums+数值弹跳），保留现有功能与退出 portal |
| M1-8 | M1 验收 | - | 浏览器验证：大厅场景+医生走动+顶栏；`npm test`、`npm run typecheck` 通过；提交 |

---

## M2 · 经营层场景化

> 交付物：大厅全貌（设施可视化+升级面板+装修模式）、患者候诊小人、底部菜单栏。验收：经营层在场景中可玩。

| # | 任务 | 说明 |
| --- | --- | --- |
| M2-1 | 设施程序绘制 | draw/Furniture.ts：前台/休息室/藏书架等 6 项按 upgradeId 绘制 |
| M2-2 | 设施点击与升级面板 | 点击设施 → EventBridge → React 弹升级面板（改造 ClinicUpgrades）；升级后 `syncFacilities` 刷新场景 |
| M2-3 | 装修模式 | `game.facilityPositions` 字段（GameState 纯新增+migrate）；拖动落格；进入/退出；存档 |
| M2-4 | 患者候诊小人 | 候诊患者按 palette 生成小人在候诊区（坐/站）；`patientEnter`/离开动画 |
| M2-5 | 患者点击开诊 | 点患者 → `patientClicked` → React 确认 → 目前先走现有对话流程（M3 前保持 DOM 对话） |
| M2-6 | 底部菜单栏 | BottomBar.tsx：技能/升级/消息/追踪/发现/成就/休息，接入现有 scene |
| M2-7 | 网格化导航 | 障碍避开（A* 或网格步进），分区可达性 |
| M2-8 | M2 验收 | 经营层场景可玩；测试/typecheck 通过；提交 |

---

## M3 · 叙事层场景化

> 交付物：诊室场景、面对面对话（逐句气泡+回顾窗）、结局场景化。验收：对话/结局开罗化，玩法等价。

| # | 任务 | 说明 |
| --- | --- | --- |
| M3-1 | 诊室场景 | ClinicScene.ts：地毯/沙发/窗/挂画；医生左患者右相对站位 |
| M3-2 | 开诊链路 | 点患者 → 医生走过去 → `openClinicScene` 切诊室 → 医生与患者落座 |
| M3-3 | 对话覆盖层 | DialogueScene 改造：逐句气泡（说话者头顶）+ 底部选项 + 右上角状态条 + 回顾窗；DialogueEngine 零改动 |
| M3-4 | 记忆碎片/结局 | 记忆碎片浮层沿用；结局结算+温暖回响开罗化 |
| M3-5 | 返回大厅 | 结算完 → 回大厅，患者状态更新动画 |
| M3-6 | M3 验收 | 全对话链路场景化；测试/typecheck 通过；提交 |

---

## M4 · 全界面统一

> 交付物：各面板视觉开罗化，移除旧 DOM 界面。验收：全量界面统一无残留。

| # | 任务 | 说明 |
| --- | --- | --- |
| M4-1 | 技能树/消息/追踪/成就/发现面板开罗化 | 统一卡片样式、图标、布局 |
| M4-2 | 标题屏/引导/序章开罗化 | 视觉统一 |
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
