# yu_zi 鱼子 · 独居 · 宠物离世 · 剧本交付报告

> 患者 id：`yu_zi`（短档任务卡患者 5，id 按任务卡固定）
> 产出：`docs/stories/yu_zi-v3.md` → `lib/data/patients/yu_zi.ts` + `lib/data/yu_zi.walk.test.ts`
> 状态：**DONE**（走线四线全绿）

---

## 一、人物档案摘要

- **姓名** 鱼子，30 岁，自由插画师，北漂第七年，独居租在老小区六楼。
- **来诊渠道** 三个月没接稿、没怎么出门，房东觉得不对劲通知了社区，社区转介。
- **一句话核心** 猫走了三个月，碗还在——她不是放不下猫，是猫一走，她发现自己这些年根本没有「家」。
- **三层真相**
  - 表层：放不下猫——碗不收、爬架不撤、接活没劲，开场就承认「没缓过来」。
  - 中间层：猫陪她六年，是每天开门唯一会「等」她的活物；猫病到走那几天她请假守着，猫走了她反而不知道该干什么。
  - 深层：从县城考来，父母在老家有自己的生活，她报喜不报忧；核心信念「我不是那种会被惦记的人」，根源在从小自己长大、没人等她回家。
- **角色三角** 施压者=这座城市的房租与「要成功」的约定（房东催租/编辑催稿）；情感忽视者=联系稀疏、并不需要她的父母（互相报喜不报忧）；被守护者=曾经那只每天等她的猫（也代表她自己）。
- **症状意义** 为猫守丧，不是放不下猫，是在哀悼「原来我一直是一个人」。碗还摆着，是她在给自己留一扇「还有活物等我」的门。
- **关键转折** 楼下邻居敲门问「你家猫还好吗」，她张了张嘴说不出口，眼泪先下来了——原来还有人记得猫、记得她。
- **查重** 已读 `剧本登记表.md`：核心困境（城市独居孤独 + 宠物离世 → 「没人等我/没有家」）不落已占坑位（he_jinglan 为老年丧夫「愧疚赎罪」，he_xiaobei/liu_guoqiang 等不相关），无雷同。

## 二、节拍规划表

| 节拍 | 主题 | trust 起止 | truth 起止 | 阻抗 | 关键事件 | 碎片 | 过场 |
|---|---|---|---|---|---|---|---|
| 节拍 1 | 初访·表层「碗还摆着」 | 15→28 | 0→21 | c01「你们觉得我矫情」 | c07「碗还摆着，舍不得收」 | — | yz1_out |
| 节拍 2 | 中间层「猫陪她六年」 | 28→40 | 21→43 | c01「自由职业在家歇着轻松」 | c06「猫病到走，她请假守着」 | m1@30（开门那声喵） | yz2_out |
| 节拍 3 | 深层「报喜不报忧」 | 40→50 | 43→65 | c01「怕人问想不想家」 | c04「它是第一个等她回家的人」 | — | yz3_out |
| 节拍 4 | 转向+结局「有人记得你」 | 50→58 | 65→∞ | — | 邻居敲门转折（p01） | — | fork |

**数值口径**（trust 单调递增，empathy/probe 同涨；轻 +1~+2、实质 +2~+3、纯过场 +0；logic 说教 -5~-10）
- 节拍 1：+13 → 28；节拍 2：+12 → 40；节拍 3：+10 → 50；节拍 4：fork(special)+1 + 安全网 7×+1 = +8 → 58
- truth 只由 probe 涨（轻 +2、实质 +3）；碎片阈值 @truth30；恶化入口 trust≤40；隐藏结局 trust50
- 主线选择轮数：10+10+10+11 = **41 轮**（≥ minCureRounds 40）

**入口设计**
- 恶化入口：节拍 3 yz3_c09_c（logic，require trustAtMost 40）→ w01→w02→w03→恶化结局
- 隐藏结局：节拍 4 yz4_fork_c（confront，require trust 50）→ h01→h04→隐藏结局（联系父母，h05 兜底走接纳）
- 接纳路径：节拍 4 yz4_fork_b（empathy）→ a01→a05→接纳结局

## 三、交付清单

| 项 | 值 |
|---|---|
| 节点总数 | **109** |
| doctor 节点数 | **46** |
| 生成文件 | `lib/data/patients/yu_zi.ts`（聚合索引已含，2 处引用）|
| walk 测试 | `lib/data/yu_zi.walk.test.ts` |

## 四、四线断言输出

`npx vitest run lib/data/yu_zi.walk.test.ts` → **4 passed (4)**

```
共情线 → cure，trust 达锚点末位 58，轮数 ≥ 40     PASS
均衡线 → cure，碎片触发 ≥ 1                        PASS
失误线 → worsen，trust ≤ 40（恶化入口可见）         PASS
探问线 → cure，truth 冲顶 ≥ 40                     PASS
```

实际数值（walkScenario 四策略实跑）：
```
empathy: ending=cure   trust=58 truth=0  defense=64 mood=93 rounds=41 memories=[]
balanced: ending=cure   trust=56 truth=33 defense=65 mood=66 rounds=41 memories=[yu_zi_m1]
probe:    ending=cure   trust=57 truth=84 defense=65 mood=37 rounds=41 memories=[yu_zi_m1]
mistake:  ending=worsen trust=0  truth=26 defense=100 mood=50 rounds=30 memories=[]
```

## 五、vitest 摘要

- 转换器：`node scripts/md-to-patient.mjs docs/stories/yu_zi-v3.md --walk` → `✓ 生成 yu_zi.ts（109 节点 / 46 医生节点）`、结构校验通过、`tsc --noEmit 通过`
- 走线验收：`npx vitest run lib/data/yu_zi.walk.test.ts` → 1 文件 / 4 测试全过
- 全量 `npm test`：**4 处失败均为并行批次所致，与 yu_zi 无关**：
  1. `an_ning.walk.test.ts` 失误线 —— an_ning（患者 2）由并行 agent 产出中，其 walk 数值未绿（进行中）
  2. `gu_xiaoman.walk.test.ts` 共情线 —— gu_xiaoman（患者 1）由并行 agent 产出中，其 walk 数值未绿（进行中）
  3. `GameState.test.ts:623 / :691` replenishArrivals 池序断言 —— 因本批次新增患者使「简单池首位」变化（现为 an_ning/gu_xiaoman，字母序前于 he_jinglan），属主流程登记时需同步更新的存量断言；yu_zi 字母序在 he_jinglan 之后，不挤占首位
  - 按任务约束未改动任何已存在文件（含 GameState.test.ts 与并行 agent 的文件）

## 六、修正过程

- 设计阶段：对照 `chen-mo-v3.md` 结构，预先按节拍分配 empathy 线每节点 trust 增量并加总校验（13/12/10/8 → 58），一次成型。
- 转换器：**一次通过**（109 节点 / 46 医生节点，结构校验 + tsc 无报错），无拒收。
- 走线：**一次全绿**（4/4），无需微调 effect。四线关键点均已满足：empathy trust=58 & rounds=41、balanced truth=33 触发 m1、probe truth=84、mistake trust=0 走恶化。

## 七、注意事项

- 剧本文件 `docs/stories/yu_zi-v3.md` 末「状态」章节已勾选（仿 chen-mo-v3.md）。
- 登记表与聚合入口由主流程统一维护；`index.generated.ts` 由 `pretest`/`prebuild` 的 scan-patients.mjs 自动重生成（已含 yu_zi）。
- 全量测试的 4 处失败需主流程在登记并行批次时处理（更新 GameState 池序断言、等 an_ning/gu_xiaoman 完成）。
