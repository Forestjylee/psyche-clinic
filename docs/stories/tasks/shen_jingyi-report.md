# 沈静宜 · shen_jingyi · v3 长剧本 · 交付报告

## 交付状态

- **患者 id**：`shen_jingyi`
- **档位**：长（6 节拍 · 100+ 轮 · 主线 113 轮）
- **患者**：沈静宜，42 岁事业单位中层干部，婚内背叛 · 体面维持
- **剧本源**：`docs/stories/shen_jingyi-v3.md`
- **生成文件**：`lib/data/patients/shen_jingyi.ts`（导出名 `patient`）+ `lib/data/shen_jingyi.walk.test.ts`（聚合入口 glob 自动收集，无需手动改）
- **转换器**：`node scripts/md-to-patient.mjs docs/stories/shen_jingyi-v3.md --walk` → ✓ 生成 + 结构校验通过 + tsc --noEmit 通过

---

## 人物档案摘要

| 项 | 内容 |
|---|---|
| 一句话核心 | 她发现丈夫出轨十年，却选择继续演完美妻子——不是原谅，是她这辈子只会用「体面」堵住所有真实感受。 |
| 表层 | 外人看夫妻和睦，照常做晚饭、熨衬衫、出席应酬；只有深夜整理衣柜，会对丈夫那件灰色羊绒外套发呆。 |
| 中间层 | 半年前偷看手机发现「玲玲」和酒店记录；试探过，丈夫装傻，她也「配合」装没发现；闺蜜周倩三年前就知道。 |
| 深层 | 七岁那年母亲在灶台边教她「女人要忍，忍过去就好了」「家散了，你就什么都没了」；她按这句话活了三十五年。 |
| 角色三角 | 施压者=丈夫+「要体面」规训；情感忽视者=母亲（教她忍没教她疼）+装傻丈夫；被守护者=女儿小满。 |
| 症状意义 | 维持体面不是迟钝，是唯一自保——家散了，她「熬对了」的人生就白费了。 |
| 关键转折 | 小满问「妈，你快乐吗」，她愣住，答不上来（节拍 5 高潮）。 |
| 结局偏向 | 放下体面，为自己活。 |

---

## 节拍规划表（已落地）

| 节拍 | 主题 | trust 起→止 | truth 起→止 | 阻抗 | 关键事件 |
|---|---|---|---|---|---|
| 1 | 初访·「我挺好」 | 15→30 | 0→~15 | c04 logic | c06 衣柜 |
| 2 | 闺蜜说破·「玲玲」 | 30→50 | ~15→~30 | c05 logic | c07 手机 |
| 3 | 第一次复访·「我不可能离婚」 | 50→65 | ~30→~50 | c05 logic | c07 我妈 |
| 4 | 七岁根·「女人要忍」 | 65→75 | ~50→~65 | c05 logic | c09 你妈教你的 |
| 5 | 高潮·「妈，你快乐吗」 | 75→80 | ~65→~90 | — | c09 恶化入口 |
| 6 | 安全网·「放下体面」 | 80→88 | ~90→100 | — | c01 路径选择 |

- **trust 锚点**：15→30→50→65→75→80→88（共情线精确逐节拍 +15/+20/+15/+10/+5/+8 = +73）
- **truth**：0→100（探问线冲顶 100）
- **碎片**：3 枚，sj_m1@truth30（手机「玲玲」）· sj_m2@truth40（熨到天亮的外套）· sj_m3@truth80（七岁那颗糖）
- **恶化入口**：节拍 5 危机分叉「说教·为家忍忍」logic 选项，`require: { trustAtMost: 70 }`，仅低 trust 失误玩家可见
- **隐藏结局**：节拍 6 c01 confront 选项，`require: { trust: 80 }`

---

## 规模统计

- **节点总数**：249（医生 118 · 患者 113 · 旁白 18）
- **主线轮数**：113（≥ minCureRounds 100）
- **结局**：4 条（cure 治愈 / acceptance 接纳 / hidden 隐藏@80 / worsen 恶化@≤70）
- **选项分布**：共 244 条 —— empathy 116 · probe 89 · silence 26 · logic 6 · special 3 · confront 4

---

## 四线走线断言（walk 测试全绿，4/4 passed）

| 线 | 策略 | ending | trust | rounds | truth | 碎片 | 断言 |
|---|---|---|---|---|---|---|---|
| 共情线 | PICKS.empathy | cure | 88 | 113 | 0 | 0 | trust 88 = 锚点末位 ✓ / rounds 113 ≥ 100 ✓ |
| 均衡线 | PICKS.balanced | cure | 100 | 113 | 100 | 3 | 碎片 3 ≥ 3 ✓ |
| 失误线 | PICKS.mistake | worsen | 5 | 78 | 0 | 0 | worsen ✓ / trust 5 ≤ 70 ✓ |
| 探问线 | PICKS.probe | cure | 100 | 113 | 100 | 3 | cure ✓ / truth 100 ≥ 100 ✓ |

`npx vitest run lib/data/shen_jingyi.walk.test.ts` → **Tests 4 passed (4)**，Test Files 1 passed (1)。

---

## 修正过程

1. **患者口述时间词 ×2**：转换器拒收，定位并改写「第二天」→ 去掉（衣柜挂外套、恨过那一晚两处），患者口述零叙事时间词达标。
2. **endingReward 键名**：`reputation/money/exp/sanity` → `doctorReputation/doctorMoney/doctorExp/doctorSanity`（ChoiceEffect 类型）。
3. **结局缺 `text` 字段**：结局节点需同时有 `text`（narration 正文）与 `endingText`（结局摘要），四处补齐。
4. **共情线 trust 超调 +10（98 而非 88）**：追踪后按锚点预算精确削减——节拍2 −1、节拍3 +1、节拍4 −3、节拍5 −1、节拍6 −6，恢复 15/20/15/10/5/8 逐节拍曲线，终值精确 88。
5. **补两处 require 门槛**：恶化入口 logic `trustAtMost:70`、隐藏结局 confront `trust:80`（初版漏写，补上保证门槛生效）。
6. **并行协作者临时文件干扰**：齐夜航剧本 agent 的 `lib/data/_tmp_diag.test.ts`（TS 类型错误）曾短暂阻塞项目级 tsc，已通过 SendMessage 协调；对方清理后转换器 tsc 通过。

---

## 注意事项

- 剧本源与生成文件均未触碰任何已存在文件；`lib/engine/`、`lib/types.ts`、`scripts/md-to-patient.mjs`、`lib/data/patients.ts` 未改。
- 患者 id `shen_jingyi` 全局唯一，节点前缀 `sj` 全局唯一。
- 剧本无治疗术语（CBT/催眠/药理），患者口述零叙事时间词。
- 登记表 `docs/stories/剧本登记表.md` 由主流程统一登记，agent 未改。
- 已清理本任务临时文件（`_trace_sj.test.ts`、`_sj_print.test.ts`、`_trace_sj_out.txt`、`_sj_finals.txt`）。
