# xue_fen 薛芬 · 短档剧本 · 交付报告

> 任务：短档任务卡 · 患者 3 · `xue_fen` 薛芬 · 更年期 · 自我陌生
> 状态：DONE（四线全绿）

---

## 1. 人物档案摘要

| 项 | 内容 |
|---|---|
| 姓名 / 年龄 / 职业 | 薛芬，48 岁，小学语文教师、班主任，教龄二十多年 |
| 来诊渠道 | 课堂上对皮孩子发大火、事后哭一下午，教研组长劝她来聊聊 |
| 一句话核心 | 潮热、失眠、莫名的火——她以为自己在变坏，其实是身体在替她发出从没被允许发出的声音 |
| 表层 | 夜里潮热睡不踏实，白天对老公孩子发完火又自责，「我不该这样」挂在嘴边 |
| 中间层 | 身体变化让她陌生；同事一句「你这是更年期吧」让她崩溃；她开始怀疑自己「不合格」 |
| 深层 | 从小被教「好女人要温顺」、家里不许大声说话；「憋回去」一句背了四十年，如今身体把攒了四十年的情绪倒了出来 |
| 角色三角 | 施压者=心里「好女人要温顺」的规训；情感忽视者=小时候没人接住她的情绪、如今也无人看见她的变化；被守护者=「不能给家里添乱的自己」 |
| 症状意义 | 烦躁不是病，是压抑四十年后身体第一次允许自己生气；开场埋 → 中段被问 → 高潮意义反转 |
| 关键转折 | 她当着全班承认「老师今天心情不好」，学生安静下来围上来——她发现承认情绪并不会失去什么 |
| 结局立意 | 更年期不是女人的错；允许自己生气，也是爱自己 |

**防雷同**：已对照 `docs/stories/剧本登记表.md`。核心困境「更年期·自我陌生·压抑四十年后的情绪释放」与表内 12 个剧本均不雷同（he_jinglan 同为语文教师但核心是丧亲愧疚，已避开身份与信念撞车）。

## 2. 节拍规划表

| 节拍 | 主题 | trust 起止 | truth 起止 | 关键事件 | 阻抗/失误点 | 碎片/分叉 |
|---|---|---|---|---|---|---|
| 1 | 初访·「我不该这样」 | 15→28 | 0→13 | 课堂上吼学生、事后哭一下午；同事「更年期吧」让她崩溃 | 阻抗 r01/r02/r03；logic 失误 3 处 | — |
| 2 | 中间层触发·身体陌生 | 28→40 | 13→25 | 她第一次说出「演温顺的人」；被吼的孩子反手接住她的累 | 阻抗 r04 并入主线；logic 失误 2 处 | — |
| 3 | 深层信念·好女人要温顺 | 40→50 | 25→35 | 膝盖破皮不许哭的童年记忆；「这不是病，是委屈在出头」 | 恶化入口 @trust≤40 | [m1 碎片 @truth30] |
| 4 | 转向+结局·允许自己生气 | 50→58 | 35→40 | 当着全班承认「老师今天心情不好」，学生围上来 | 分叉：cure / acceptance / hidden@50 / worsen | 4 结局 |

数值口径：trust 单调递增（共情线节拍增量 +13/+12/+10/+8 → 58）；truth 只由 probe 涨（轻 +2 / 实质 +3）；defense 净下降、阻抗短时回升；logic 失误显著负 trust（-5~-10）；恶化入口 require trustAtMost 40；hidden 门槛 trust 50。

## 3. 剧本规模

- 源文件：`docs/stories/xue_fen-v3.md`
- 节点总数：**113**
- doctor 节点数：**48**
- 轮数：共情线主线 **43 轮**（节拍 1-3 各 11 + 节拍 4 10），≥ minCureRounds 40
- 碎片：1 枚（`xf_m1` @truth30，闪回「饭桌上的那一声」）
- 结局：cure / acceptance / worsen / hidden 四条

## 4. 转换器 + 走线验收

```bash
node scripts/md-to-patient.mjs docs/stories/xue_fen-v3.md --walk
✓ 生成 xue_fen.ts（lib/data/patients/xue_fen.ts）
  ts-meta 场景 id: xue_fen  节点: 113 个（医生节点 48 个）
  结构校验通过：id 唯一 / startNode 存在 / 引用无悬空 / 结局字段齐备 / 患者口述零叙事时间词
✓ 生成 xue_fen.walk.test.ts
  tsc --noEmit 通过
```

```bash
npx vitest run lib/data/xue_fen.walk.test.ts
Test Files  1 passed (1)
     Tests  4 passed (4)
```

### 四线断言输出（实际走线数值）

| 线 | 断言 | 实测 | 结果 |
|---|---|---|---|
| 共情线 | cure / trust=58 / rounds≥40 | cure / trust=58 / rounds=43 | PASS |
| 均衡线 | cure / 碎片≥1 | cure / truth=41 / memories=[xf_m1] | PASS |
| 失误线 | worsen / trust≤40 | worsen / trust=6 / rounds=32 | PASS |
| 探问线 | cure / truth≥40 | cure / truth=89 | PASS |

## 5. vitest 摘要

- `xue_fen.walk.test.ts`：1 file / 4 tests / 全部通过
- 断言读取 ts-meta 验证参数（anchor 58 / minCureRounds 40 / fragments 1 / worsenAtMost 40 / truthEnd 40）

## 6. 修正过程

1. 初稿患者口述中出现叙事性时间词「第二天」（xf2_p07 台词），转换器拒收前人工扫描发现，改为「当天下午」。
2. 其余一次性通过：转换器结构校验、tsc 类型检查、四线走线全部一次通过，无需 effect 微调。

## 7. 交付说明

- 已生成：`lib/data/patients/xue_fen.ts`、`lib/data/xue_fen.walk.test.ts`
- 聚合入口 `lib/data/patients/index.generated.ts` 由 scan 脚本自动收集（pre 钩子），无需手改。
- 未改动任何已存在文件（含 `lib/engine/`、`lib/types.ts`、`scripts/md-to-patient.mjs`、任务卡、登记表）。登记表登记由主流程统一维护。
- 未写「依赖」结局；患者口述零叙事性时间词；无 CBT/催眠/药理等治疗术语。
