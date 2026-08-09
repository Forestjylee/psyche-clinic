# 《森林心理诊所》实施计划（PLAN）

| 字段 | 内容 |
| --- | --- |
| 文档版本 | v2.1.2 |
| 维护人 | Psyche Clinic Team |
| 最后更新 | 2026-08-08 |
| 配套文档 | [PRD.md](./PRD.md) v1.1.2 · [SPEC.md](./SPEC.md) v1.2.2 · [DEPLOYMENT.md](./DEPLOYMENT.md) |
| 文档目的 | 规划界面实施优先级（P1-P5）、任务分解与验收标准，作为开发推进的执行清单 |

> 本文档承接新主 PRD v1.0.0（用户旅程视角）。玩法/数据层已相当完整，剩余工作集中在**表现层**：对话场景化、档案图鉴、序章交互化、首页经营面板等。每个优先级独立可玩、独立提交。

---

## 1. 实施优先级总览

| 序 | 工作项 | PRD 对应 | 类型 | 状态 |
| --- | --- | --- | --- | --- |
| P1 | 首页经营面板 | §5.4 / 场景3 | 中改 | 📋 待启 |
| P2 | 对话场景化 | §5.2 / 场景2 | 大改 | 📋 待启 |
| P3 | 患者档案图鉴 | §5.3 / 场景4 | 全新 | 📋 待启 |
| P4 | 序章交互化 + 边做边学 | §5.2 / 场景0·1 | 中改 | 📋 待启 |
| P5 | 其余调整 | 场景3/6/7 | 中小改 | 📋 待启 |
| P6 | 技能树语义重构 + 话术去术语化（评审 P0） | §1.2 / 场景5 | 数据层大改 | 🗑 已下线（v2.5.0 整体删除技能树，语义重构随之下线） |

> **排序原则**：PRD 界面重心 = 叙事层 > 档案图鉴 > 经营层，但 P1 首页经营面板**先行**——它是玩家每天打开就面对的第一屏，所有叙事内容都从这页进入，改动明确、收益直接。

---

## 2. P1 首页经营面板（中改）

> 对应 PRD §5.4（有情绪的患者卡）与场景3（日常一天）。现状：场景化大厅 + 预约清单浮层（`ClinicHall`）+ 升级面板浮层 + 底部菜单栏已存在，需按新定位调整呈现。
>
> **决策变更（2026-08-09，见 SPEC §15 v1.4.0）**：首页回归全 React——移除 Phaser 大厅画布与「预约清单」弹层，预约全列表直放首页（React 清晰卡片），保留诊所状态精简卡；装修模式降级（拖动落格失效）；对话候选选项区/气泡锚点调整防遮挡。

### P1 任务分解

| # | 任务 | 文件 | 说明 |
| --- | --- | --- | --- |
| P1-1 | 候诊名牌 → 有情绪的患者卡 | `phaser/hall/HallScene.ts`、`hallLayout.ts` | 名牌从"姓名+情绪点"升级为**患者卡**：头像 + 姓名 + 等待天数 + **动态状态语**（"她今天来得比平时早""他盯着窗外看了很久"）；状态语数据从 `waitingDays`/患者状态推导，兜底文案池 |
| P1-2 | 顶栏资源核对与打磨 | `HUD.tsx`、`app/styles/` | 顶栏常驻 等级/金钱/声望/理智/日期**已实现**（本项为核对性任务）；确认纸木质换肤、tabular-nums、hover tooltip 到位，缺则补齐 |
| P1-3 | 大厅导航整合 | `BottomBar.tsx`、`ClinicHallScene.tsx`、`GameApp.tsx` | 底部菜单栏（技能/升级/消息/追踪/发现/成就/休息）与大厅浮层导航一致化；从大厅可无缝进入接诊/升级/消息/档案 |
| P1-4 | 档案入口 | `BottomBar.tsx`、`GameApp.tsx` | 新增「档案」入口（患者档案图鉴 P3 完成前为占位/禁用） |
| P1-5 | P1 验收 | - | 浏览器验证：大厅患者卡显示等待天数+状态语；顶栏数值正确；导航无死链；`npm test`、`npm run typecheck` 通过；提交 |
| P1-6 | 首页回归全 React（SPEC §15 v1.4.0） | `ClinicHallScene.tsx`、`ClinicHall.tsx`、`ClinicUpgrades.tsx`、`phaser.css`、`clinicLayout.ts`、`dialogue.css` | 移除大厅画布与「预约清单」弹层，预约全列表直放首页；去重（个人成长 6 入口/发现客户交底部栏）；保留诊所状态精简卡+花园入口；装修模式降级（删装饰按钮，外观/摆放保留）；对话候选选项区 max-height 46%→34%、气泡锚点 y 250→190 |

### P1 验收标准

1. 大厅候诊患者卡呈现姓名+等待天数+动态状态语，且随 `waitingDays` 变化。
2. 顶栏四资源正确显示、tooltip 可用、动画不碍眼（reduced-motion 降级）。
3. 底部菜单各入口可进入对应面板并可返回大厅，无遮挡/无死链。

---

## 3. P2 对话场景化（大改）

> 对应 PRD §5.2 与场景2。现状：`DialogueScene` 是**聊天流 UI**（左立绘+右侧消息流+底部选项），需重做为诊室面对面形态。对话引擎（`DialogueEngine`）**零改动**，只换表现层。

### P2 任务分解

| # | 任务 | 文件 | 说明 |
| --- | --- | --- | --- |
| P2-1 | 诊室场景 | `phaser/clinic/ClinicScene.ts`（新增） | 相对而坐：医生左、患者右；地毯/沙发/窗/挂画程序绘制；`GameCanvas` 场景注册 |
| P2-2 | 开诊链路 | `ClinicHallScene.tsx` | 点患者卡 → 切诊室场景（无医生走动，名牌直接开诊）→ 对话在场景内进行 |
| P2-3 | 逐句气泡 | `DialogueScene.tsx` 重构 | 说话者身旁 DOM 气泡，`TypewriterText` 逐句；患者立绘（`ChibiCharacter`）随 `emotion` 变化 |
| P2-4 | 情绪/场景呼吸反馈 | `DialogueScene.tsx`、`SceneEffects.tsx` | BGM 与画面光线/色调随对话情绪微变（共情灯光暖/触及痛点天色沉/真相揭开一束光）；患者表情+姿态为主反馈通道 |
| P2-5 | 四维淡显 | `DialogueScene.tsx`、`app/styles/` | 四维条默认淡显（小尺寸低对比），hover/长按强化；浮动文字改"数值+情绪反馈"混合 |
| P2-6 | 回顾窗 | `DialogueScene.tsx` | 右上角按钮打开本场对话历史（`history` 已有，移到可翻看小窗） |
| P2-7 | 结局/记忆碎片 | `EndingOverlay.tsx`、记忆碎片浮层 | 沿用现有，套纸木质卡片；叙事式真相复盘落地（PRD 场景2） |
| P2-8 | 会话断点快照 | `GameState.ts`、`Storage.ts`、`DialogueScene.tsx`、`GameApp.tsx` | 对话可中断恢复：持久化 `activeSession{patientId, nodeId, patientState, history}`；对话入口提供「暂停/稍后继续」；`migrateGameState` 兼容旧档（PRD 场景2 断点续接落库） |
| P2-9 | P2 验收 | - | 浏览器验证全对话链路场景化、断点续接、响应式/遮挡；`npm test`、`npm run typecheck` 通过；提交 |

### P2 验收标准

1. 对话在诊室场景面对面进行，逐句气泡可读、不重叠；窄视口/小屏无遮挡（气泡/四维/回顾窗层叠正确）。
2. 患者表情/场景氛围随情绪变化，四维淡显+hover 强化，无"考试感"。
3. 中途退出重进自动从断点继续，进度不丢。
4. 对话引擎零改动，既有 vitest 全部通过。

---

## 4. P3 患者档案图鉴（全新）

> 对应 PRD §5.3 与场景4。现状：不存在。全新系统，是"持续更新+无终局"下玩家回看故事的情感锚点。

### P3 任务分解

| # | 任务 | 文件 | 说明 |
| --- | --- | --- | --- |
| P3-1 | 数据层 | `lib/types.ts`、`lib/state/GameState.ts`、`lib/engine/DialogueEngine.ts` | 新增 `unlockedFragments: Record<patientId, string[]>`（碎片解锁状态，在 `onMemoryTrigger` 落库，纯新增+migrate）；结局/信件复用 `patientRecords`/`messages` 推导 |
| P3-2 | 档案页 | `components/game/PatientArchive.tsx`（新增）、`GameApp.tsx` | 相册式翻页：每个患者一页（头像+状态+碎片时间线+结局+信件） |
| P3-3 | 碎片占位 | `PatientArchive.tsx`、`app/styles/` | 未解锁碎片显示剪影占位（"还有一个片段没被记起"） |
| P3-4 | 筛选 | `PatientArchive.tsx` | 按状态/结局筛选（只看已治愈/还有碎片没集齐） |
| P3-5 | 持续更新兼容 | `PatientArchive.tsx` | 新患者入库自动出现新页面 |
| P3-6 | P3 验收 | - | 浏览器验证翻页/筛选/占位；`npm test`、`npm run typecheck` 通过；提交 |

### P3 验收标准

1. 档案收录所有见过的患者（含已离场/已治愈），翻页浏览。
2. 未解锁碎片有占位；筛选器可用；新患者自动入库。
3. 数据层纯新增，旧存档可读。

---

## 5. P4 序章交互化 + 边做边学（中改）

> 对应 PRD 场景0/1。现状：序章四幕纯文字已实现；引导聚光灯+对话玩法速览已实现。

### P4 任务分解

| # | 任务 | 文件 | 说明 |
| --- | --- | --- | --- |
| P4-1 | 序章开场交互 | `Prologue.tsx` | 新增"离开城市的原因"选择（3-4 项），决定专属独白 + 开局信 + 回忆碎片；**影响叙事不影响数值** |
| P4-2 | 序章动作式交互 | `Prologue.tsx` | 中段加动作式交互（挂门牌/整理诊室/泡茶），代入感 |
| P4-3 | 序章可跳过 | `Prologue.tsx`、`GameApp.tsx` | 右上角「跳过」；已通过存档标记不再重复 |
| P4-4 | 边做边学 | `Onboarding.tsx`、`DialogueScene.tsx` | 引导绑进第一次真实接诊：第一次共情选项弹教"这是共情"、第一次锁定选项教"为什么锁着"；浮层提示+一次重试；**「对话玩法速览」从首启强制改为「帮助」入口可回看**（不再先上课再玩，文案匹配四维淡显） |
| P4-5 | 第一位患者机制保障 | `lib/data/patients.ts`、`GameState.ts`、`queueTarget` | 确认/新增"与玩家背景镜像的温情剧本"（疲惫上班族/刚离职年轻人），对话不长；**机制保障**：day-1 队列锁定引导患者（首日名额 2 位，引导患者占其中 1 位，见 P5-6）、首诊结局向治愈/接纳 **clamp**、首诊不可选恶化分支 |
| P4-6 | 标题屏敏感演出偏好 | `TitleScreen.tsx`、`EndingOverlay.tsx` | 标题屏接入「敏感结局演出自动以简短方式呈现」偏好，与现有 `SKIP_SENSITIVE_KEY` 打通（同一存储键，开/关双向同步，写 `"1"`/移除键或写 `"0"`）；**语义对齐** `SENSITIVE_ENDINGS={tragic,worsen}`——开关控制的是"演出是否自动跳过、只留一句简短文案"，**不是**"悲剧结局不出现"（PRD 场景0） |
| P4-7 | P4 验收 | - | 浏览器验证序章交互/跳过/边做边学/标题屏偏好；`npm test`、`npm run typecheck` 通过；提交 |

### P4 验收标准

1. 序章更长+交互式，开场选择影响开局信/独白（不改变数值）；可跳过。
2. 新手第一次接诊中边做边学，无前置教学也能独立接诊。
3. 第一位患者对话简单、**机制上必定温暖结局**（首诊结局 clamp 生效，无恶化/悲剧分支）。
4. 标题屏「敏感结局演出自动以简短方式呈现」偏好可开/关，与结局跳过行为一致（按钮文案与 P4-6 语义一致，不写成"跳过悲剧演出"）。

---

## 6. P5 其余调整（中小改）

| # | 任务 | PRD 对应 | 说明 |
| --- | --- | --- | --- |
| P5-1 | 装修装饰解锁 | 场景5 | 设施升级解锁外观/装饰选项（换窗帘、摆花、挂碎片画），装饰关联患者故事；位置半自由保留 |
| P5-2 | 慈善获客语义 | 场景6 | `DiscoveryScene` 从"广告拉客"改为"善意连接"（慈善活动/口口相传/家属求助）；**保留金钱消耗、语义改为低额「慈善活动费」**（金额下调，避免打穿金钱经济）；**同步修订 SPEC §3.5 消耗表与 §3.6 渠道配置**（广告/传单/广播→慈善活动命名与降额，避免硬约束文档与 PRD 冲突） |
| P5-3 | 理智完整机制 | 场景6 | 补全理智闭环：**消耗规则**（接诊沉重病例/坏结局/连续不休息）+ **恢复渠道**（休息/回访/读信/花园待一会）+ **归零温情休息场景**（梦里见帮助过的人，醒后部分恢复）+ **成就联动**（`sanityStreak`）；同步清理 `sanity` 注释的"倒闭"旧语义 |
| P5-4 | 成就文案语义 | 场景7 | 成就描述转向"旅程里程碑"语义（不写高频数值肝度目标，改为"你治愈了一位哭泣的年轻人"这类旅程纪念）；**同步修订 SPEC §12.3 待标注的高频数值成就**（日进斗金/悬壶济世/学贯中西/广撒渔网/四面开花） |
| P5-5 | 成就奖励机制 | 场景7 | 成就奖励情感化（解锁信件/装饰/记忆碎片/特殊回访），与文案语义拆分两步实施 |
| P5-6 | 名额提升机制 | 场景3 | 一天容量递增：第 1 天 2 位起，随声望/设施解锁名额递增到 4-5（调整 `MAX_SLOTS`/`queueTarget`），第 1 天队列锁定引导患者；**下游承接**：扩展 `phaseOfSlot` 时段映射（第 4-5 名额切入 `night` 相位，激活现有 `isNightSlot`/HUD/ClinicHall 夜间分支；slot 0-1 morning / 2 afternoon / 3 evening / 4-5 night）、打烊判断、§3.5 金钱节奏重估（4-5 名额时单天 800-2200）、PRD 场景3「一天 10-20 分钟」时长措辞（名额上限时约 20-30 分钟） |

---

## 7. P6 技能树语义重构 + 话术去术语化（评审 P0）

> 专家评审 P0：现有 `lib/data/skills.ts` 为「解梦术 / 认知重构(CBT) / 催眠术·初级 / 临床药理学」，`truths.ts` 全剧本大量「需要技能：认知重构」解锁提示，违反核心理念「不堆砌术语」。按 PRD §1.2 与场景5 重构为玩家可感知的倾听者能力。

| # | 任务 | 文件 | 说明 |
| --- | --- | --- | --- |
| P6-1 | 技能命名重构 | `lib/data/skills.ts`、`lib/types.ts` | 技能节点从专业流派改为能力语义（"听懂话外之音""看见防御下的脆弱""接住沉默""让 ta 感到安全""在崩溃边缘陪住 ta"）；技能 id 重构，`requireSkill` 引用同步；**新 id 命名与 P6-3 迁移映射表同步定义**（命名时即登记旧 id→新 id 映射，防漏映射丢档） |
| P6-2 | 剧本去术语化 | `lib/data/truths.ts`、`lib/data/patients.ts`、`lib/data/psychTerms.ts` | 全剧本对话与解锁提示去掉 CBT/催眠/药理等专业词，改为情绪/能力语义；专业术语保留为「悬停浮窗」科普内容（PRD §1.2），仅从玩法门槛中移除 |
| P6-3 | 旧档技能迁移 | `GameState.ts`、`Storage.ts` | `migrateGameState` 对旧存档 `skills: string[]` 做 id 映射迁移（cbt_basic/freud_dream/hypnosis_basic 等→新能力 id），防技能引用悬空；含对应 vitest，保证 PRD §7 不丢档 |
| P6-4 | P6 验收 | - | 浏览器验证技能树全部为能力语义；**旧档读档技能保留**；`npm test`、`npm run typecheck` 通过；提交 |

### P6 验收标准

1. 技能树所有节点为玩家可感知的能力，无「精神分析/CBT/催眠/药理」字样。
2. 剧本对话无专业术语作解锁门槛；术语仅存在于悬停科普浮窗。
3. 既有 vitest 全部通过。

---

## 8. 长期规划（已在 PRD §1.3 界定的边界外）

> 以下为玩法/运营层长期方向，不属于本次界面实施范围，记录备查：

| 方向 | 说明 |
| --- | --- |
| AIGC 内容生产线 | 定期用大模型离线生成新故事，人工审校入库（PRD §6），与患者库同构零改动 |
| 云端存档 | Cloudflare D1/KV（SPEC §6.2 规划），跨设备续玩 |
| 用户系统 | 匿名 ID + 可选注册（SPEC §6.3 规划） |
| 多语言 / PWA | 扩大理念传播（PRD §7） |

---

## 9. 长期维护原则

1. **理念优先**：所有新功能必须服务「让普通人体验倾听价值」的核心理念，违背则不做。
2. **数据层零改动**：`lib/data`、`lib/engine`、`lib/state` 在界面重构期间不因界面需求修改（纯新增除外）。**例外**：P6 技能树语义重构（评审 P0）是唯一被授权直接改写 `lib/data/skills.ts`/`truths.ts` 数据结构的项，其余一律遵守本原则。
3. **引擎可测**：业务规则集中在 `lib/engine/`，保持纯函数。
4. **迁移平滑**：持久化经 `StorageDriver` 抽象，未来切 KV/D1 业务层零改动。
5. **文档同步**：每次发版必须同步更新 PRD/Spec/Plan 的变更记录与版本号。
6. **版本号语义**：`MAJOR.MINOR.PATCH`——理念/架构变更升 MAJOR，功能新增升 MINOR，修复升 PATCH。

---

## 10. 完成记录

| 日期 | 里程碑 | 完成项 |
| --- | --- | --- |
| 2026-08 | M0 | 项目骨架、类型系统、首个剧本（林晓） |
| 2026-08 | M1 | 接诊→结局→成就完整流程跑通 |
| 2026-08-06 | M2 | 温暖文案全覆盖；成就全屏特效（粒子/光晕/金环）；BGM 随理智滤波；reduced-motion 降级 |
| 2026-08-07 | M3 | 核心玩法重构落地：三层生命周期+复诊系统、随机事件、生成器素材扩充、手写剧本扩充至 5+ |
| 2026-08-08 | 界面重构 M1/M2 | 场景化大厅（Phaser+EventBridge）、候诊名牌、设施升级/装修模式、底部菜单栏、顶栏纸木质化、序章四幕、新手引导、治愈回访 |
| 2026-08-08 | 文档治理 | 主 PRD 全量重构 v1.0.0；kairosoft 专项文档作废删除；主 SPEC v1.2.0；本文档 v2.0.0 |
| 2026-08-09 | 首页回归全 React | 移除大厅画布与「预约清单」弹层，预约全列表直放首页（React 清晰卡片）；去重（个人成长 6 入口/发现客户交底部栏）；诊所状态精简卡+花园入口；装修模式降级；对话候选选项区/气泡锚点防遮挡调整（SPEC v1.4.0 / PLAN v2.2.0） |
| 2026-08-09 | 患者池动态化+生成系统下线 | 剧本池 glob 自动收集（新剧本入目录即进池）；难度按轮次重标（lin_xiao 长档→困难、短档→简单）；患者逐日随机到达（难度分桶递进、引导患者首日）；成就去患者化（碎片→通用纪念物、回访→动态已治愈患者）；生成器下线、发现客户改手写池候选；旧剧本 chen_lo/zhou_mingyuan 下线（SPEC v1.5.0 / PLAN v2.3.0） |
| 2026-08-09 | 治疗分期复诊（节拍断拍） | 节拍与节拍之间隔一段时间：节拍结束患者离开，1~3 天后复诊到访再开启下一节拍。`beatEnd` 节拍边界标记（引擎优先于 autoNext、不结案）+ `onBeatEnd` 回调；GameState `treatmentStages`（每患者节拍进度快照）+ `store.completeBeat`（写记录/耗名额/清断点）+ `restOneDay` 到期到访 + `finishSession` 清理；DialogueScene 复诊恢复、ClinicHall/Tracking 复诊卡；确定性测试 `lib/state/treatmentStages.test.ts` 15 例（SPEC v1.6.0 / PLAN v2.4.0） |
| 2026-08-09 | 技能树系统下线 | 删除技能树（allSkills/SkillsTree/learnSkill/skills 场景与字段/requireSkill/成长成就 growth_skill_6、growth_skill_8）；Skill/SkillSchool 类型移除；旧档 skills 迁移逻辑删除；DialogueScene/DialogueEngine 技能门槛死代码清理；诊所升级 allClinicUpgrades 独立保留。剧本零 requireSkill 引用（grep 验证），删除无行为变更（SPEC v1.7.0 / PLAN v2.5.0） |
| 2026-08-09 | 多槽位存档+本地账号+反馈入口 | HUD 反馈按钮+内置弹窗存本地草稿；Storage 多槽位存档（槽索引+每槽独立 key，旧单档自动迁移槽 1）；本地账号（昵称+自动用户 id，存档打归属标记）；store 槽感知（新游戏新槽/覆盖、继续选槽、删除同步 hasSave、所有保存落盘当前槽）；TitleScreen 注册/切换昵称+存档列表弹窗（云端置灰、可删除）；`window.setTimeout`→`setTimeout`。测试 Storage 14 例 + store.slot 7 例（SPEC v1.8.0 / PLAN v2.6.0） |
| 2026-08-09 | 昵称全局唯一（永久保留） | Storage 新增昵称登记表 `ps.usernames.v1`（昵称→用户 id，永久保留，注册过的昵称不可再注册，换昵称旧名仍占用）；`registerUser` 返回 RegisterOutcome（ok/duplicate/invalid）；`ensureNicknameRegistered` 存量账号补登；store register 透传结果 + init 补登；TitleScreen 冲突提示。测试 Storage 15 例 + store.slot 8 例（SPEC v1.8.1 / PLAN v2.6.1） |

---

## 11. 变更记录

| 版本 | 日期 | 变更摘要 |
| --- | --- | --- |
| v2.1.0 | 2026-08-08 | **评审修订**：落实专家评审 + 用户四项拍板。P2 新增 P2-8 会话断点快照（断点续接落库）+ 响应式/遮挡验收；P3-1 新增 `unlockedFragments` 碎片落库；P4-4 对话玩法速览改「帮助」入口可回看；P4-5 第一位患者机制保障（day-1 队列锁定 + 首诊结局 clamp）；P5-2 慈善获客语义改低额慈善活动费、P5-3 理智扩为完整闭环、P5-4/P5-5 成就拆分两步、P5-6 名额提升机制；**新增 P6 技能树语义重构 + 话术去术语化（评审 P0）**；P1-2 改核对性任务 |
| v2.2.0 | 2026-08-09 | **首页回归全 React（SPEC §15 v1.4.0）**：P1 新增 P1-6——移除 Phaser 大厅画布与「预约清单」弹层，预约全列表直放首页；去重（个人成长 6 入口/发现客户交底部栏）；保留诊所状态精简卡+花园入口；装修模式降级（拖动落格失效，外观/摆放保留在升级面板）；对话候选选项区 max-height 46%→34%、气泡锚点 y 250→190 防遮挡 |
| v2.3.0 | 2026-08-09 | **患者池动态化 + 逐日随机到达 + 成就去患者化 + 生成系统下线（SPEC §13 v1.5.0）**：patients.ts 患者池由 `scripts/scan-patients.mjs`（predev/pretest/prebuild 钩子）扫描 `lib/data/patients/` 生成聚合索引自动收集（新剧本入目录即进池，不写死患者数）；难度按档位/轮次重标（短→简单 / 中→普通 / 长→困难，lin_xiao→困难）；GameState 新增 `arrivedPatients` 患者逐日随机到达（难度分桶递进、引导患者首日）；成就碎片奖励改通用纪念物、回访奖励改动态已治愈患者；生成器（generator/sceneBuilder/truths/seeds/Generator）下线、发现客户改从手写池选候选；旧剧本下线 chen_lo/zhou_mingyuan（chen_mo 保留） |
| v2.4.0 | 2026-08-09 | **治疗分期复诊·节拍断拍（SPEC §16 v1.6.0）**：节拍结束患者离开，1~3 天后复诊到访再开下一节拍。DialogueNode `beatEnd?: {resumeNode}` 边界标记 + `DialogueEngine.continue()` 优先触发 `onBeatEnd`（不结案）；GameState `treatmentStages`（stage/resumeNode/patientState/triggeredMemories/dueDay/arrived）+ `completeBeat`（写记录/耗名额/清断点）+ `restOneDay` 到期到访（治疗中不推进 waitingDays）+ `finishSession` 清理；DialogueScene 复诊恢复（activeSession 断点 > treatmentStages 复诊）、ClinicHall/Tracking 复诊卡；lin_xiao 长档 5 处边界标记；测试 `lib/state/treatmentStages.test.ts` 15 例。其余剧本 beatEnd 标记与转换器支持按节拍制约定补齐 |
| v2.5.0 | 2026-08-09 | **技能树系统下线（SPEC §13 v1.7.0）**：删除技能树（allSkills/SkillsTree/learnSkill/skills 场景与字段/requireSkill/成长成就 growth_skill_6、growth_skill_8）；Skill/SkillSchool 类型移除；旧档 skills 迁移逻辑删除；DialogueScene/DialogueEngine 技能门槛死代码清理；诊所升级 allClinicUpgrades 独立保留。剧本零 requireSkill 引用（grep 验证），删除无行为变更 |
| v2.6.0 | 2026-08-09 | **多槽位存档 + 本地账号 + HUD 反馈入口（SPEC §13 v1.8.0）**：HUD 新增「反馈」按钮（内置弹窗，bug/建议/其他，存本地草稿）；Storage 槽位系统（槽索引 `ps.saveIdx.v1` + 每槽独立 key `ps.slot.<id>`，元信息含天数/等级/金钱/时间/来源 local\|cloud/归属；saveSlot/loadSlot/deleteSlot/listSlots/nextSlotId；旧单档 `ps.save.v1` 自动迁移槽位 1）；本地账号 `ps.user.v1`（自动生成用户 id + 昵称，存档打归属标记，云端区分用户预留）；store 槽感知（activeSlotId/saveSlots/currentUser；newGame 缺省新槽/指定覆盖、continueGame(slotId)、deleteSlot 删光同步 hasSave、commit/saveNow/pauseSession/backToTitle/enterClinic 落盘当前槽）；TitleScreen 注册/切换昵称入口 + 存档列表弹窗（诊所名/天数/等级/金钱/时间/归属/来源，云端置灰，可删除）；`window.setTimeout`→`setTimeout`（SSR 安全）。测试 Storage 14 例 + store.slot 7 例 |
| v2.6.1 | 2026-08-09 | **昵称全局唯一·永久保留（SPEC §13 v1.8.1）**：Storage 新增昵称登记表 `ps.usernames.v1`（昵称→用户 id，永久保留，本地任何账号注册过的昵称均不可再注册，换昵称后旧昵称仍被占用，为云端后台按昵称区分用户铺路）；`registerUser` 返回 `RegisterOutcome`（ok/duplicate/invalid，重名不落盘）；`ensureNicknameRegistered` 存量账号昵称补登（老数据升级）；store `register` 透传结果对象 + init 补登；TitleScreen 注册/切换昵称冲突提示「该昵称已被使用，永久保留，换一个吧」。测试 Storage 15 例 + store.slot 8 例 |
| v2.1.2 | 2026-08-08 | **评审修订（第三轮）**：头部配套文档版本号同步；P5-6 明确第 4-5 名额切入 `night` 相位（激活现有夜间分支，用户确认）；P4-6 语义写透（=敏感结局演出自动简短呈现，非悲剧不出现，与 `SENSITIVE_ENDINGS` 对齐）；P6-1 注明新 id 与 P6-3 迁移映射表同步定义 |
| v2.1.1 | 2026-08-08 | **评审修订（第二轮）**：P5-2 增补同步 SPEC §3.5/§3.6 慈善语义；P5-6 增补时段映射/金钱节奏/单日时长下游承接；P6 新增 P6-3 旧档技能 id 迁移 + §9 维护原则例外声明；P4 新增 P4-6 标题屏「跳过悲剧演出」偏好接入；P4-5 措辞对齐 P5-6 首日 2 名额；P5-4 反向引用 SPEC §12.3 |
| v2.0.0 | 2026-08-08 | **全量重写**：承接新主 PRD v1.0.0，界面实施优先级 P1-P5（首页经营面板/对话场景化/档案图鉴/序章交互化+边做边学/其余调整）；kairosoft 专项 PLAN 作废删除；完成记录补充界面重构 M1/M2 |
