# 许晨曦 · xu_chenxi · 中档剧本创作报告

> 剧本：`docs/stories/xu_chenxi-v3.md`
> 产出：`lib/data/patients/xu_chenxi.ts` + `lib/data/xu_chenxi.walk.test.ts`
> 日期：2026-08-09 · 状态：DONE

---

## 一、人物档案摘要

- **姓名/年龄/职业/来诊渠道**：许晨曦，28 岁，产假中的新媒体运营，孩子 6 个月。产后复查转介——做筛查时对着问题单哭出来，医生建议她来聊聊。
- **一句话核心**：孩子一哭她就慌——不是孩子难带，是她从小被「你什么都不行」追着，现在要靠把妈妈当好，来证明自己终于行了。
- **三层真相**：
  - 表层（开场就说）：整夜睡不着反复查育儿视频；孩子夜哭她跟着掉眼泪；奶量不够自责一整天。
  - 中间层（节拍 2 揭）：婆婆一句「现在的年轻人不会带孩子」她能记一整晚；先生「你已经很好了」她不信。
  - 深层（节拍 3-4 揭）：妈妈从小挑剔她——考第二要问「为什么不是第一」，现在隔着电话还要指点带娃；她用「把事情做到完美」换一句从没听到的「你做得不错」。
- **角色三角**：施压者=挑剔的妈妈与婆婆的标准；情感忽视者=从没夸过她的妈妈（隔电话只指点不接住）；被守护者=孩子（她怕自己不够好，孩子被「怪罪」到她头上）。
- **症状意义**：焦虑不是矫情，是她把「当妈」当成最后一次补考——考不过，就还是那个「什么都不行」的小孩。开场埋（「我得把孩子带好，才算真的行了」）→ 中段被问（「拿孩子补考你自己的童年吗」）→ 高潮意义反转（她不是考生，是那个抱着孩子的人）。
- **关键转折**：孩子半夜醒来，看见她哭，竟伸手摸了摸她的脸——她第一次明白，孩子不是来审判她的，是自己给自己设了考场。
- **结局取向**：不写「产后抑郁」标签化罪名，写「新手妈妈的孤独与标准」；结局偏向「做 60 分的妈妈也够好」。

## 二、节拍规划表

| 节拍 | 主题 | trust | truth | 阻抗 | 关键事件 | 碎片 |
|---|---|---|---|---|---|---|
| 1 | 初访·表层（失眠/刷视频/夜哭跟着哭/奶量自责） | 15→30 (+15) | 0→15 | c04 logic | c07 confront req20 | — |
| 2 | 中间层·婆婆与先生（那句记一整晚/「你已经很好了」她不信） | 30→45 (+15) | 15→25 | c04 logic | c08 confront req25 | m1 @truth25（考第二被问为什么不是第一） |
| 3 | 深层·妈妈的声音（隔电话指点/从没听过「做得不错」） | 45→57 (+12) | 25→40 | c04 logic | c08 confront req40 | m2 @truth50（隔着电话的指点） |
| 4 | 根源信念·最后一场补考（把当妈当补考/自己给自己批卷） | 57→65 (+8) | 40→55 | c03 logic | c09 恶化入口 req≤55 | — |
| 5 | 转向+结局（孩子半夜摸她的脸/做 60 分妈妈也够好） | 65→70 (+5) | 55→70 | — | fork confront req45 / hidden req65 | — |

**数值口径**：trust 单调递增，empathy 与 probe 同涨 trust；轻推进 +1、实质 +2、纯过场 +0；logic/prescribe 失误 -8~-12；阻抗节点 defense 短时 +8~+10 再回落；truth 只由 probe 涨（轻 +2、实质 +3）。cure 主线共情线 trust 精确累加 55（15→70），真值全程吻合。

## 三、规模与结构

- 剧本节点总数：**171**（ts-meta 1 + ts-dialog 170）
- 医生节点数：**75**（含 start/out/worsen 分叉中的 doctor 节点；cure 主线共情线恰好 70 轮）
- 结局：4（cure / acceptance / worsen / hidden，hidden 门槛 trust 65，通过 xc5_fork confront 选项进入）
- 碎片：2（m1 @truth25、m2 @truth50）
- 恶化入口：xc4_c09 logic 项 `require: { trustAtMost: 55 }`
- 节点前缀：`xc`（全局唯一），结构 startNode `xc1_start` 起，各节拍过场 `xc1_out`→`xc2_start` 归位，五条路径（s/a/h/w）与四结局引用无悬空

## 四、走线四线断言输出

| 线 | 结局 | trust | truth | defense | mood | rounds | memories | 判定 |
|---|---|---|---|---|---|---|---|---|
| 共情线 | cure | **70** | 0 | 67 | 100 | 70 | 0 | ✅ trust=70（精确）、rounds=70 |
| 均衡线 | cure | 82 | 68 | 68 | 100 | 70 | **2** | ✅ memories≥2 |
| 探问线 | cure | 84 | **100** | 68 | 32 | 70 | 2 | ✅ truth≥70 |
| 失误线 | worsen | **1** | 0 | 100 | 93 | 51 | 0 | ✅ trust≤55 |

**验收断言**（`lib/data/xu_chenxi.walk.test.ts`，四例全过）：

```text
✓ 共情线 → cure，trust 达锚点末位 70，轮数 ≥ 70
✓ 均衡线 → cure，碎片触发 ≥ 2
✓ 失误线 → worsen，trust ≤ 55（恶化入口可见）
✓ 探问线 → cure，truth 冲顶 ≥ 70
```

## 五、vitest 摘要

```text
npx vitest run lib/data/xu_chenxi.walk.test.ts
  Test Files  1 passed (1)
       Tests  4 passed (4)
```

转换器输出：`✓ 生成 xu_chenxi.ts`（171 节点 / 75 医生节点）+ `✓ 生成 xu_chenxi.walk.test.ts` + `✓ tsc --noEmit 通过`。结构校验一次通过：id 唯一 / startNode 存在 / 引用无悬空 / 结局字段齐备 / 患者口述零叙事时间词。

## 六、修正过程

- 剧本初稿一次通过转换器结构校验（无报错）。
- 走线测试一次四线全绿（无逐轮修正）。
- 设计阶段预先用临时 trace 测试确认了 mu-qing 的 walk 机制（empathy→cure、PICKS 四策略、碎片触发、rounds 计数口径），据此精确排布了共情线 trust 逐节点 +55 的预算与探问线 truth +70 的曲线，因此实际迭代为零轮。

## 七、注意事项 / 遗留

- `lib/data/patients/index.generated.ts` 聚合索引与 `docs/stories/剧本登记表.md` 由主流程统一维护，本次**未改动**（按任务要求）。
- 接入聚合入口需主流程跑一次 `npm run dev`/`npm test`/`npm run build` 的 pre 钩子（`scripts/scan-patients.mjs`）自动生成索引；本次未运行 `npm test` 以免越权改动 index.generated.ts。
- 未修改任何已存在文件（`lib/engine/`、`lib/types.ts`、`scripts/md-to-patient.mjs`、`lib/data/patients.ts`、任务卡、登记表均未动）；临时 trace 测试已删除。
