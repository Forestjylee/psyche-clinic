# he_xiaobei 贺小北 · 口音自卑 · 短档剧本验收报告

> 交付：`docs/stories/he_xiaobei-v3.md` + `lib/data/patients/he_xiaobei.ts` + `lib/data/he_xiaobei.walk.test.ts`
> 状态：DONE · 四线全绿 · 一次通过（无被拒收/无数值返工）

---

## 一、人物档案摘要

| 项 | 内容 |
|---|---|
| 姓名 / 年龄 / 职业 | 贺小北，24 岁，机械厂技术员（画图纸、管操作，话不多），从云贵小镇考进城 |
| 来诊渠道 | 师傅（班组里照顾他的老工人）发现他在会上被起哄学口音后一周没吃好饭，硬劝他来 |
| 一句话核心 | 不是普通话说不标准，是他一张嘴就听见「你不属于这里」 |
| 表层 | 开会不敢发言；点外卖都要在脑子里把菜名念三遍；发语音前反复删 |
| 中间层 | 刚入职被同事学着念名字/学口音笑过；领导说他「技术没问题，就是说话太闷」；回宿舍对镜子练了一晚上发音 |
| 深层 | 爸妈供得苦，姐姐把念书机会让给他；他背着「全家的希望」，相信自己的土配不上这份来之不易 |
| 角色三角 | 施压者=起哄的同事 +「得混出人样」的期待；情感忽视者=供他读书却从不夸他的爸妈；被守护者=把机会让给他的姐姐 |
| 症状意义 | 沉默不是性格是选择——宁可不说，也不让爸妈和姐姐「脸上没光」 |
| 关键转折 | 一个客户用他的家乡话跟他聊图纸，他愣住后眼眶发热——原来有人听懂他，而且他没有因此变差 |
| 写作注意落地 | 口音不是缺陷是来处；cure 结局「敢用母语说话也是本事」 |

查重：登记表 12 个剧本均无「口音自卑/出身暴露」困境，不雷同（xiao_bei 为「自我价值·比较」，另人另主题）。

---

## 二、节拍规划表

| 节拍 | 主题 | trust 起→止 | truth 起→止 | 阻抗 | 关键事件 | 碎片 | 过场 |
|---|---|---|---|---|---|---|---|
| 1 | 初访·「我讲不准」 | 15→28 | 0→9 | c05 | c07 说出姐姐让机会 | — | hxb1_out |
| 2 | 中间层·「他们笑过我的名字」 | 28→40 | 9→18 | c05 | c06 靠灶火写作业 | hxb_m1@30 | hxb2_out |
| 3 | 深层·「全家的希望」 | 40→50 | 18→33 | c04 | c09 满院子喊的自己 | — | hxb3_out |
| 4 | 转向+结局 | 50→58 | 33→43 | — | fork 客户家乡话 | — | hxb_end_* |

- 共情线 trust 增量精确配平：节拍1 `2,1,2,1,1,1,2,1,1,1,0`=+13；节拍2 `2,1,1,1,1,2,1,1,1,1,0`=+12；节拍3 `1×10+0`=+10；节拍4 fork+2 + 安全网 `1,1,1,1,0,1,0,1,0`=+8。合计 +43 → 58。
- truth 只由 probe 涨（统一 +3）；均衡线每节拍 3-4 次 probe，节拍3 中段过 30 触发碎片。
- 失误线：每节拍 1-2 个 logic（-8~-10），节拍3 p10 恶化入口（trust≤40）可见，worsen 链最终 trust≈2。
- 4 条结局：cure（安全网主线）/ acceptance（接纳）/ worsen（恶化链）/ hidden（fork confront 门槛 trust50）。

---

## 三、结构与硬性参数

- 节点总数：**111**（医生节点 **48**）
- 硬性参数（ts-meta 注释）：`// tier: 短` / `anchor: 15,28,40,50,58` / `truthEnd: 40` / `minCureRounds: 40` / `fragments: 1` / `worsenAtMost: 40`
- 轮数：cure 主线 43 轮（节拍1-3 各 11 + 节拍4 安全网 10），每节拍 10-12 轮区间内
- 节点前缀 `hxb`（hxb1_/hxb2_/hxb3_/hxb4_/hxb_end_*）全局唯一
- 患者 id `he_xiaobei`（与引导患者 xiao_bei 不同人）
- 禁止项：无治疗术语、患者口述零叙事时间词（「下周」等已规避改「过些天」）、无「依赖」结局

---

## 四、四线断言输出（vitest verbose）

```
✓ lib/data/he_xiaobei.walk.test.ts > 贺小北 剧本走线验证（短剧本） > 共情线 → cure，trust 达锚点末位 58，轮数 ≥ 40
✓ lib/data/he_xiaobei.walk.test.ts > 贺小北 剧本走线验证（短剧本） > 均衡线 → cure，碎片触发 ≥ 1
✓ lib/data/he_xiaobei.walk.test.ts > 贺小北 剧本走线验证（短剧本） > 失误线 → worsen，trust ≤ 40（恶化入口可见）
✓ lib/data/he_xiaobei.walk.test.ts > 贺小北 剧本走线验证（短剧本） > 探问线 → cure，truth 冲顶 ≥ 40
Test Files  1 passed (1)
     Tests  4 passed (4)
```

转换器输出：`✓ 生成 he_xiaobei.ts（111 节点，医生节点 48 个）· 结构校验通过 · tsc --noEmit 通过`

---

## 五、vitest 全量摘要

`npm test`：**22 passed / 2 failed（204 / 206）**。两处失败与本剧本无关，均为并行 agent 产出所致：
- `gu_xiaoman.walk.test.ts`：顾小满（患者1）剧本自身共情线 trust 68≠58，数值未调好，属该患者 agent 返工范围。
- `GameState.test.ts` replenishArrivals：新增患者（gu_xiaoman/liu_guoqiang/meng_na/xue_fen 等并行产出）进池后改变 random 抽取序列，`expected he_jinglan got gu_xiaoman`，属并行协调问题，由主流程统一调整（本任务禁止改动已存在文件，未触碰）。
- `he_xiaobei.walk.test.ts` 全绿，未受患者池变化影响。

---

## 六、修正过程

- 一次通过，无被拒收、无走线返工。
- 数值设计阶段已预先精确配平：共情线每节拍 trust 增量按锚点 +13/+12/+10/+8 分配到各节点首个 empathy/special 选项；恶化入口（hxb3_p10_c，require trustAtMost:40）与 hidden 入口（hxb4_fork_c，require trust:50）门槛与四线数学对齐，故首跑即全绿。

---

## 七、注意事项

- 聚合入口 `lib/data/patients/index.generated.ts` 由 pre 钩子自动重扫生成，已包含 he_xiaobei（勿手改）。
- 登记表登记由主流程统一维护，本任务未改动。
- 全量测试两处失败需主流程协调：gu_xiaoman 数值返工 + GameState 随机池断言随池扩容重校准。
