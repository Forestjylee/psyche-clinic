# 周曼云 · 中档剧本验收报告

> 患者 id：`zhou_manyun` · 姓名：周曼云 · 档位：中 · 主题：催婚 · 婚姻通关
> 剧本源：`docs/stories/zhou_manyun-v3.md` · 生成文件：`lib/data/patients/zhou_manyun.ts` + `lib/data/zhou_manyun.walk.test.ts`

## 一、人物档案摘要

- **身份**：35 岁银行客户经理，独居，有房有车。朋友见她相亲越相越颓、开始自我怀疑，拉她来聊聊。
- **一句话核心**：她不是怕孤独终老，是怕爸妈那句「你让我们在亲戚面前抬不起头」——婚姻是她的毕业证书，不领到就一直是差生。
- **三层真相**：
  - 表层：每个周末被安排相亲；化妆到一半突然不想去；被问「还没对象」就转移话题。
  - 中间层：妈妈哭诉「你不结婚我闭不上眼」；同学聚会抱娃，她觉得自己「掉队了」。
  - 深层：从小「听话=被爱」，成绩好换夸奖、懂事换安心；把人生过成考试，结婚是最后一道大题，核心信念「如果我不结婚，我还值得被爱吗？」。
- **角色三角**：施压者=爸妈的期待与「别人都结婚了」的目光；情感忽视者=只关心「结没结婚」不关心「过得好不好」的家人；被守护者=那个一直想被夸的小孩。
- **症状意义**：把婚姻当任务，是为了不用面对「如果我不结婚，我还值得被爱吗」。
- **关键转折**：相亲男一句「你也这岁数了，凑合过吧」→ 她第一次愤怒，意识到自己一直被当「库存」在清。

## 二、节拍规划表

| 节拍 | 主题 | trust | truth | 阻抗 | 关键事件 | 碎片 |
|---|---|---|---|---|---|---|
| 1 | 初访·表层（相亲倦怠/化妆逃避/奖状） | 15→30 | 0→26 | zmy1_c04 | zmy1_c08 req20 | — |
| 2 | 中间层·掉队（妈妈眼泪/同学聚会） | 30→45 | 26→56 | zmy2_c04 | zmy2_c08 req25 | m1 @truth25（那张成绩单） |
| 3 | 深层·毕业证书（人生过成考试） | 45→57 | 56→86 | zmy3_c04 | zmy3_c08 req40 | m2 @truth50（相亲那顿饭） |
| 4 | 根源信念·凑合（关键转折+监工） | 57→65 | 86→… | zmy4_c04 | zmy4_c09 恶化入口 req≤55 | — |
| 5 | 转向+结局（fork special/empathy/confront req65） | 65→70 | …→100 | — | fork | — |

## 三、结构与数值

- **节点总数**：177（ts-meta 场景 1 + ts-dialog 节点 176）
- **医生节点数**：78
- **结局**：4 条 —— cure（为自己活一次）/ acceptance（慢慢来也是一种答案）/ hidden（面对面，trust≥65）/ worsen（交上去的白卷）
- **meta 验证参数**：`// tier: 中` `// anchor: 15,30,45,57,65,70` `// truthEnd: 70` `// minCureRounds: 70` `// fragments: 2` `// worsenAtMost: 55`
- **记忆碎片**：m1「那张成绩单」@truth25（七岁奖状换妈妈笑，考砸后一整顿饭安静）；m2「相亲那顿饭」@truth50（被当库存估价，broken）

## 四、四线断言输出（走线实测）

```text
empathy  ending=cure trust=70 truth=0 mood=100 rounds=72 memories=0
balanced ending=cure trust=81 truth=74 mood=100 rounds=72 memories=2
probe    ending=cure trust=90 truth=100 mood=36 rounds=72 memories=2
mistake  ending=worsen trust=13 truth=67 mood=50 rounds=54 memories=2
```

- 共情线：cure，trust 精确 = 70（锚点末位），rounds 72 ≥ 70 ✓
- 均衡线：cure，碎片触发 2 ≥ 2 ✓
- 探问线：cure，truth 100 ≥ 70 ✓
- 失误线：worsen，trust 13 ≤ 55（恶化入口可见）✓

## 五、vitest 摘要

```text
Test Files  1 passed (1)
     Tests  4 passed (4)
   Duration  579ms
```

## 六、修正过程

- **一次通过，无需修正**。转换器结构校验（id 唯一 / startNode 存在 / 引用无悬空 / 结局字段齐备 / 患者口述零叙事时间词）与 tsc 均在首次运行即通过；vitest 四线首次运行即全绿。
- 设计阶段规避的禁词：原稿「下周」→「下回」；「上周日」→「那天那场」；「这一个月」→「这些日子」（均避开 TIME_WORDS）。

## 六·附、全量 npm test 的 1 个无关失败（非本剧本导致）

- 跑 `npm test` 时 `lib/state/GameState.test.ts` 有 1 个失败：`已被发现客户预占的患者不被随机到达（random=0 跳过 chen_mo）`，断言 `picks[0] === "he_jinglan"`（简单池首位），实测首位为 `an_ning`。
- 归因：该断言硬编码简单池（difficulty 简单）字母序首位。并行 agent 陆续新增的简单档患者 `an_ning`（字母序在 `he_jinglan` 之前）进入聚合池后顶掉了首位。**与 `zhou_manyun` 无关**——本剧本为中档（difficulty 普通），不在简单池内，未参与该池排序。
- 该失败属并行创作导致的既有脆弱断言失效，修正应在池稳定的主流程统一进行；本任务按约束不修改 `GameState.test.ts` 等已存在文件。

## 七、交付清单

- [x] 人物档案完整（一句话核心/三层真相/角色三角/症状意义/关键转折）
- [x] 节拍规划表写在剧本开头，数值口径符合信任合并线
- [x] v3 剧本结构校验通过，tsc 通过
- [x] 走线四线全绿（断言见上）
- [x] 聚合入口 glob 自动收录（index.generated.ts，无需手动改）
- [x] 剧本末尾「状态」章节勾选
- [x] 剧本登记表由主流程统一登记（agent 不改登记表，符合任务卡约定）
