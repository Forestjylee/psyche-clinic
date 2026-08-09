# 齐夜航 · v3 · 长剧本 · 6 节拍 · 100+ 轮

> 长档剧本：急诊科主治医师 · 医者自伤 · 全能幻想破灭。
> 数值：trust 15→30→50→65→75→80→88；truth 0→100；碎片 3 枚 @30/40/80；恶化入口 trust≤70；隐藏结局 @80；cure 主线 100+ 轮。
> 生成：`node scripts/md-to-patient.mjs docs/stories/qi_yehang-v3.md --walk`

---

## 一、人物档案

**姓名** 齐夜航，38 岁，三甲医院急诊科主治医师，值班十年。科室主任（老同学）发现他近月查房手抖、深夜在值班室反复翻同一本病历，硬压着他来看「医生也该看看病」。

**一句话核心** 一个相信「医生的手不能抖」的急诊医生——一次抢救失败后反复回放心悸，不是怕担责，是救不回那个人 = 证明他不够格。

**三层真相**
- 表层（开场就说）：一听到急救呼叫就心悸；反复复盘那台抢救的每个步骤；开始过度检查病人、开不必要的单子求心安；手抖。
- 中间层（节拍 2 揭）：那个 24 岁车祸年轻人，在他手里没救回来。家属没怪他，甚至说「谢谢你们尽力了」——他反而更崩溃，他宁可被责怪。他反复算时间，觉得是自己除颤晚了十几秒。
- 深层（节拍 3-4 揭）：父亲是外省名医，从小教他「医生的手不能抖」「病人交给你就是信任你」。他考入医学院、进急诊、值班十年，一路完美，从没被允许「失败过」。核心信念：「救不活他 = 我不够格 = 我不配当医生」。

**角色三角**
- 施压者：父亲（名医的标准）+「医者不能失败」的规训。
- 情感忽视者：母亲（只问成绩不问感受）。
- 被守护者：那个 24 岁的年轻人（也代表所有他救不了的人）。

**症状意义** 反复回放那台抢救不是自责，是他不敢接受「我尽力了也可能救不回来」——接受它，就承认自己不是神、会手抖、会失败，会辜负父亲的期待。

**关键转折** 父亲来医院看他，第一次当着他的面说「我年轻时也救不活过一个」——那个永远完美的父亲，居然也有失败。他的整个世界在此松了一道缝。

**写作注意** 长档完整铺开从「过度自责」到「承认无力」再到「把失败还给命运、把自己还给自己」的历程；节拍 4 的「七岁根」落在父亲教他「手不能抖」的童年。结局偏向「好医生也是会被现实击穿的人」。职业场景（急救/抢救）真实但不血腥——用声音（监护仪、除颤声）与细节（手套上的血、地板上的脚印）代替画面。

---

## 二、节拍规划表

| 节拍 | 主题 | trust | truth | 阻抗 | 关键事件 | 碎片 |
|---|---|---|---|---|---|---|
| 1 | 初访·「我没事」（表层：手抖/心悸/过度检查） | 15→26 (+11) | 0→15 | c04 logic | c13 信任落点 | — |
| 2 | 那台抢救·「我本来可以」（中间层：24 岁患者） | 26→37 (+11) | 15→30 | c04 logic | c10 confront req30 | m1 @truth30（监护仪那条直线） |
| 3 | 第一次复访·「医生的手不能抖」（深层开始：父亲的标准） | 37→52 (+15) | 30→50 | c03 logic | c08 confront req45 | m2 @truth40（父亲递来的听诊器） |
| 4 | 七岁根·「手不能抖」（根源信念形成） | 52→66 (+14) | 50→65 | c04 logic | c08 confront req50 | — |
| 5 | 高潮·「我救不了他」（承认无力 + 父亲来院） | 66→77 (+11) | 65→90 | c06 logic | c09 恶化入口 req≤70 | m3 @truth80（七岁·握住手） |
| 6 | 转向+结局·「好医生也会被现实击穿」 | 77→88 (+11) | 90→100 | — | fork special / hidden req80 | — |

**数值口径**：trust 单调递增，empathy 与 probe 同涨 trust；轻推进 +1、实质 +2、纯过场 +0；logic/prescribe 失误 -8~-12。truth 只由 probe 涨（+2 轻 / +3 实质）。defense 净下降 70→22，阻抗短时 +8~+12 回落。共情线 trust 精确累加 73（15→88），探问线 truth 冲顶 100。

**共情线 trust 账本**（各节拍 doctor 节点首条 empathy/silence/special 的 trust 增量之和）：
- 节拍1 十五节点：+1+1+1+0+1+1+0+1+0+1+1+1+1+0+1 = +11
- 节拍2 十七节点：+0+1+1+0+1+1+1+0+1+0+1+1+0+1+1+1+0 = +11
- 节拍3 十七节点：+1+1+0+1+1+1+1+1+1+1+1+1+1+1+1+1+0 = +15
- 节拍4 十八节点：+1+1+1+1+0+1+1+1+1+0+1+1+1+1+1+0+1+0 = +14
- 节拍5 十五节点：+1+1+1+1+0+0+0+1+1+1+1+1+1+0+1 = +11
- 节拍6 cure 线（fork+17）：+0+1+1+1+1+0+1+1+1+1+0+1+1+0+0+1+0+0 = +11
- 合计 = +73；初值 15 → 终值 88。

**主线轮数**：15+17+17+18+15+18 = 100 次选择 ≥ 100。

---

## 三、剧本元信息（ts-meta）

```ts-meta
// id: qi_yehang
// tier: 长
// anchor: 15,30,50,65,75,80,88
// truthEnd: 100
// minCureRounds: 100
// fragments: 3
// worsenAtMost: 70
{
  id: "qi_yehang",
  name: "齐夜航",
  title: "38 岁急诊科主治医师 · 科室主任陪同来诊",
  intro: "老同学、科室主任把他押来的。说他近月查房手抖，深夜在值班室反复翻同一本病历，翻到天亮。他坐下来第一句是：『我没事，就是最近手有点不听使唤。』",
  surface: "一听到急救呼叫就心悸；反复复盘一台已经过去的抢救的每个步骤；开始给病人开一堆不必要的检查单求心安。说话克制、条理分明，习惯用『流程没问题』『我按规范做的』把自己摘干净。只在提到那台抢救时，声音会忽然低下去。",
  truth: "一个月前，一个 24 岁的车祸年轻人，在他手里没救回来。家属没怪他，甚至说『谢谢你们尽力了』——他反而崩溃，他宁可被责怪。父亲是外省名医，从小教他『医生的手不能抖』『病人交给你就是信任你』。他一路完美，从没被允许失败过。他不敢接受的不是那台抢救，是『我尽力了也可能救不回来』——接受它，就承认自己不是神。",
  palette: { primary: "#4c6b8a", secondary: "#8fa3b4", fog: "#2f4353", bright: "#d8c9a3" },
  baseReward: 850,
  difficulty: "困难",
  startNode: "qyh1_start",
  initialState: { trust: 15, defense: 70, mood: 30, truth: 0, round: 0 },
  memoryFragments: [
    {
      id: "qi_m1",
      trigger: { truth: 30 },
      title: "监护仪那条直线",
      text: "监护仪上那条线，平了。我喊『继续按压』，声音稳得连我自己都信。手套上是热的血，地板上有我自己的脚印。天快亮的时候，家属在门外哭。我洗手，洗了很久，血明明已经洗掉了，我还是觉得手上有东西。",
      emotion: "scared",
    },
    {
      id: "qi_m2",
      trigger: { truth: 40 },
      title: "父亲递来的听诊器",
      text: "我考上医学院那年，父亲把我叫到书房，递给我一副听诊器。他说：『病人把命交给你，是信任你。你的手不能抖。』那副听诊器我用了十年，橡皮管都磨亮了。我从来没在他面前抖过手。就那一次，进手术室第一次握刀，我抖了一整台手术。他站在旁边，什么都没说。",
      emotion: "sad",
    },
    {
      id: "qi_m3",
      trigger: { truth: 80 },
      title: "七岁·握住我的手",
      text: "七岁那年，父亲让我端着满满一碗水，从屋这头走到那头，不许洒一滴。我走到一半，手开始抖。他走过来，不是骂我，是握住我的手，一路带我走完。他说：『手会抖，是因为你怕。可你怕的不是洒水，是你怕我会失望。』我那时候不懂。现在懂了。我这一辈子，都怕他失望。",
      emotion: "broken",
    },
  ],
}
```

---

## 四、节拍骨架（ts-dialog 节点）

### 节拍 1 · 初访·「我没事」（trust 15→30，truth 0→15，阻抗 c04）

```ts-dialog
// id: qyh1_start
{
  id: "qyh1_start",
  speaker: "narration",
  text: "门被推开。一个穿白大褂的男人走进来，白大褂洗得发白，领口系得很正。他坐下时，把一只手压在另一只手下——像是在藏什么。科室主任站在门口冲你点点头：「老齐交给你了。」门关上，他抬头，笑了笑：「医生，我没事。就是最近手有点不听使唤。」",
  autoNext: "qyh1_p01",
}
```

```ts-dialog
// id: qyh1_p01
{
  id: "qyh1_p01",
  speaker: "patient",
  text: "（他笑了一下，把压着的手放回膝盖上）真没事。就是值班久了吧，手腕有点僵。老张非让我来，说什么『医生也该看看病』。耽误您时间了，我坐会儿就走。",
  emotion: "neutral",
  autoNext: "qyh1_c01",
}
```

```ts-dialog
// id: qyh1_c01
{
  id: "qyh1_c01",
  speaker: "doctor",
  text: "「坐会儿就走」——他说得熟练，像是排练过。你注意到他进门时，是用肩膀顶的门，右手一直插在兜里。",
  choices: [
    { id: "qyh1_c01_a", text: "「不着急走。你能坐在这儿，就不是『真没事』。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh1_p02" },
    { id: "qyh1_c01_b", text: "「你说手『有点僵』。僵到什么程度？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh1_p02" },
  ],
}
```

```ts-dialog
// id: qyh1_p02
{
  id: "qyh1_p02",
  speaker: "patient",
  text: "（他把右手伸出来，手心向上）您看，不抖。就是拿东西的时候，偶尔……拿不准。前天查房，我连病历夹都没拿稳，老张在旁边看得清清楚楚。他那人嘴笨，就只会硬押人来看病。",
  emotion: "anxious",
  autoNext: "qyh1_c02",
}
```

```ts-dialog
// id: qyh1_c02
{
  id: "qyh1_c02",
  speaker: "doctor",
  text: "「拿不准」——一个给病人做处置的医生，用这三个字形容自己的手。",
  choices: [
    { id: "qyh1_c02_a", text: "「查房拿不住病历夹——你当时什么感觉？」", kind: "empathy", effect: { trust: 1 }, next: "qyh1_p03" },
    { id: "qyh1_c02_b", text: "「『偶尔』——是什么时候开始偶尔的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh1_p03" },
  ],
}
```

```ts-dialog
// id: qyh1_p03
{
  id: "qyh1_p03",
  speaker: "patient",
  text: "（他顿了一下）……一个多月了。一开始是夜里，值班室一安静下来，我听见自己的心跳，然后手就开始抖。白天还好，一忙起来就忘了。可最近，白天也有点压不住了。",
  emotion: "anxious",
  autoNext: "qyh1_c03",
}
```

```ts-dialog
// id: qyh1_c03
{
  id: "qyh1_c03",
  speaker: "doctor",
  text: "「听见自己的心跳，手就开始抖」——他描述得很像在讲一个病人，不像讲自己。",
  choices: [
    { id: "qyh1_c03_a", text: "「夜里一安静下来，你会想起什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh1_p04" },
    { id: "qyh1_c03_b", text: "「手抖的时候，你心里慌吗？」", kind: "empathy", effect: { trust: 1 }, next: "qyh1_p04" },
  ],
}
```

```ts-dialog
// id: qyh1_p04
{
  id: "qyh1_p04",
  speaker: "patient",
  text: "（他移开目光）……没什么好想的。就是值班，接班，查房，处置，该干嘛干嘛。慌什么，我干了十年急诊，什么场面没见过。倒是你们，老觉得我们当医生的绷得太紧。",
  emotion: "neutral",
  autoNext: "qyh1_c04",
}
```

```ts-dialog
// id: qyh1_c04
{
  id: "qyh1_c04",
  speaker: "doctor",
  text: "「什么场面没见过」——这是他说给自己听的一句撑场面的话。",
  choices: [
    { id: "qyh1_c04_a", text: "「十年急诊，什么场面都见过——可『见过』和『扛住』，是两回事。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "qyh1_p05a" },
    { id: "qyh1_c04_b", text: "「『没什么好想的』——这话是说给我听，还是说给你自己听？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh1_p05b" },
    { id: "qyh1_c04_c", text: "「你们当医生的，就是要见得多、扛得住，扛不住就是心理素质差。」", kind: "logic", effect: { trust: -10, defense: 8, mood: -3 }, next: "qyh1_r01" },
  ],
}
```

```ts-dialog
// id: qyh1_r01
{
  id: "qyh1_r01",
  speaker: "patient",
  text: "（他的肩一下绷起来）……对，您说得对，就是心理素质的事。我自己的病人我都能处置，轮到我自己，反倒矫情了。老张也是，小题大做。（他停了一下）……可您不知道，矫情完了，夜里手还是抖。矫情没用。",
  emotion: "angry",
  autoNext: "qyh1_p05a",
}
```

```ts-dialog
// id: qyh1_p05a
{
  id: "qyh1_p05a",
  speaker: "patient",
  text: "（他深吸一口气，声音缓下来）……对不起，我嗓门大了。最近容易急。您说『见过』和『扛住』是两回事……我以前不信。现在有点信了。我见过的东西多了，可最近，有一件，我好像没扛住。",
  emotion: "sad",
  autoNext: "qyh1_c05",
}
```

```ts-dialog
// id: qyh1_p05b
{
  id: "qyh1_p05b",
  speaker: "patient",
  text: "（他沉默了一会儿）……说给谁听，我自己也分不清。就是不说这句话，我夜里站不住。以前值班，天塌了我都能站着。现在，我一静下来就想……想别的事。",
  emotion: "anxious",
  autoNext: "qyh1_c05",
}
```

```ts-dialog
// id: qyh1_c05
{
  id: "qyh1_c05",
  speaker: "doctor",
  text: "他第一次承认「有一件没扛住」——门开了一条缝。",
  choices: [
    { id: "qyh1_c05_a", text: "「你愿意的话，跟我讲讲那件没扛住的事。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh1_p06" },
    { id: "qyh1_c05_b", text: "「『一静下来就想别的事』——想的是什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh1_p06" },
  ],
}
```

```ts-dialog
// id: qyh1_p06
{
  id: "qyh1_p06",
  speaker: "patient",
  text: "（他别开脸）……还不是那回事。就是……我这阵子，给病人开检查，开得特别多。以前我讲究对症下药，能不开就不开。现在，我恨不得把能查的都给人查一遍。老张说我是乱开单子。我知道不该开，可我不开，心里没底。",
  emotion: "anxious",
  autoNext: "qyh1_c06",
}
```

```ts-dialog
// id: qyh1_c06
{
  id: "qyh1_c06",
  speaker: "doctor",
  text: "「不开心里没底」——一个靠判断力吃饭的医生，开始用检查单给自己壮胆。",
  choices: [
    { id: "qyh1_c06_a", text: "「『没底』——你怕查漏了什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh1_p07" },
    { id: "qyh1_c06_b", text: "「你以前对症下药，现在心里没底——这阵子，是不是发生过什么，让你不敢信自己的判断了？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh1_p07" },
  ],
}
```

```ts-dialog
// id: qyh1_p07
{
  id: "qyh1_p07",
  speaker: "patient",
  text: "（他手指在膝盖上敲了两下）……是。就是前阵子，有一台抢救。……算了，今天不说这个。医生，您先告诉我，我这手抖，是病吗？我还能不能继续值班？",
  emotion: "scared",
  autoNext: "qyh1_c07",
}
```

```ts-dialog
// id: qyh1_c07
{
  id: "qyh1_c07",
  speaker: "doctor",
  text: "他绕开了那台抢救，又问回「还能不能值班」——他真正怕的，是失去医生这个身份。",
  choices: [
    { id: "qyh1_c07_a", text: "「手抖不抖，不是你现在最要紧的事。你最怕的，好像是『不能值班』——那三个字，对你意味着什么？」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "qyh1_p08" },
    { id: "qyh1_c07_b", text: "「你问能不能值班——那台抢救，是不是和『值班』有关系？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh1_p08" },
  ],
}
```

```ts-dialog
// id: qyh1_p08
{
  id: "qyh1_p08",
  speaker: "patient",
  text: "（他愣住，半天）……不能值班，我就不是医生了。我从小……就觉得我这辈子得当医生。除了当医生，我不知道我是谁。您说，一个连自己是谁都说不清的人，是不是挺可笑的。",
  emotion: "neutral",
  autoNext: "qyh1_c08",
}
```

```ts-dialog
// id: qyh1_c08
{
  id: "qyh1_c08",
  speaker: "doctor",
  text: "「除了当医生，我不知道我是谁」——他把全部的自我，焊在了那件白大褂上。",
  choices: [
    { id: "qyh1_c08_a", text: "「不可笑。能说出这句话，你已经在认真想『自己是谁』了。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh1_p09" },
    { id: "qyh1_c08_b", text: "「你说『从小就觉得得当医生』——这个『从小』，从多小开始？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh1_p09" },
  ],
}
```

```ts-dialog
// id: qyh1_p09
{
  id: "qyh1_p09",
  speaker: "patient",
  text: "……记事起吧。我父亲是医生，外省的，一把刀。我小时候最常听见的一句话就是——（他顿住，改口）算了，都是小时候的事了。医生，您别老往我心里头挖，我就是手抖，您给句准话。",
  emotion: "anxious",
  autoNext: "qyh1_c09",
}
```

```ts-dialog
// id: qyh1_c09
{
  id: "qyh1_c09",
  speaker: "doctor",
  text: "「别往心里头挖」——他宁可谈手抖，也不肯碰那句话。",
  choices: [
    { id: "qyh1_c09_a", text: "「好，我们不挖。你想从哪儿聊，就从哪儿聊。」", kind: "empathy", effect: { trust: 0 }, next: "qyh1_p10" },
    { id: "qyh1_c09_b", text: "「你父亲说的那句话，你半句都不肯学给我——那句话，是不是比手抖还让你怕？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh1_p10" },
  ],
}
```

```ts-dialog
// id: qyh1_p10
{
  id: "qyh1_p10",
  speaker: "patient",
  text: "（他没接话，低头看自己的手，忽然说）……我昨天夜里，把那个病人的病历翻出来了。翻了整整一夜。我明知道翻不出新东西来，可我就是停不下来。我老婆说我疯了，让我烧了它。我没烧。",
  emotion: "scared",
  autoNext: "qyh1_c10",
}
```

```ts-dialog
// id: qyh1_c10
{
  id: "qyh1_c10",
  speaker: "doctor",
  text: "「明知道翻不出新东西，还是停不下来」——那本病历里没有答案，他却非要找到不可。",
  choices: [
    { id: "qyh1_c10_a", text: "「你翻那本病历，是想找到什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh1_p11" },
    { id: "qyh1_c10_b", text: "「你老婆让你烧了它——你没烧。你留着它，是在等什么？」", kind: "empathy", effect: { trust: 1 }, next: "qyh1_p11" },
  ],
}
```

```ts-dialog
// id: qyh1_p11
{
  id: "qyh1_p11",
  speaker: "patient",
  text: "……我在等一句『不是你错』。可我自己都找不出来。病历上每一步都对，流程没问题，处置没问题，可人还是没了。我盯着那些记录，一个字一个字看，想找出哪个环节我慢了。找不到。我反而更慌。",
  emotion: "broken",
  autoNext: "qyh1_c11",
}
```

```ts-dialog
// id: qyh1_c11
{
  id: "qyh1_c11",
  speaker: "doctor",
  text: "「找不到错，反而更慌」——这句话是今天最重要的一句。",
  choices: [
    { id: "qyh1_c11_a", text: "「步骤都对，人还是没了——你慌的，是不是就是『没有错』这三个字？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh1_p12" },
    { id: "qyh1_c11_b", text: "「如果从头到尾都没有错，那『人没了』这件事，该算在谁头上？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh1_p12" },
  ],
}
```

```ts-dialog
// id: qyh1_p12
{
  id: "qyh1_p12",
  speaker: "patient",
  text: "（他沉默了很久，声音很低）……该算在我头上。我要是再快一点，再稳一点，再准确一点，他可能就……医生，我知道这话不科学，可我就是绕不开。我总想，是不是我哪里不够好。",
  emotion: "broken",
  autoNext: "qyh1_c12",
}
```

```ts-dialog
// id: qyh1_c12
{
  id: "qyh1_c12",
  speaker: "doctor",
  text: "「是不是我哪里不够好」——一个把每步都做对的医生，还在问自己够不够好。",
  choices: [
    { id: "qyh1_c12_a", text: "「你做得已经够好了。可『够好』这两个字，好像从没人跟你说过，你自己也不肯信。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh1_p13" },
    { id: "qyh1_c12_b", text: "「『不够好』三个字，是你自己想的，还是有人从小就教你的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh1_p13" },
  ],
}
```

```ts-dialog
// id: qyh1_p13
{
  id: "qyh1_p13",
  speaker: "patient",
  text: "（他没回答，抬头看你，眼睛有点红）……医生，我没跟人说过这么多。老张是押我来的，我本来打算应付一下就走。可您……您没嫌我矫情。我有点不知道怎么办了。",
  emotion: "neutral",
  autoNext: "qyh1_c13",
}
```

```ts-dialog
// id: qyh1_c13
{
  id: "qyh1_c13",
  speaker: "doctor",
  text: "第一次会谈，他把「那台抢救」带到了桌上，又轻轻盖上了。他需要先知道自己可以在这儿待着。",
  choices: [
    { id: "qyh1_c13_a", text: "「你不必急着怎么办。能坐在这儿，把心里话说出来，已经是在往前走了。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh1_p14" },
    { id: "qyh1_c13_b", text: "「下周还想来吗？那台抢救，我们下次再慢慢看。」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "qyh1_p14" },
  ],
}
```

```ts-dialog
// id: qyh1_p14
{
  id: "qyh1_p14",
  speaker: "patient",
  text: "（他站起来，又坐回去）……来。我值班十年，从来都是我给人看病。头一回有人给我看病，我反倒不知道该不该信。可您让我说这些，我没那么堵了。",
  emotion: "neutral",
  autoNext: "qyh1_c14",
}
```

```ts-dialog
// id: qyh1_c14
{
  id: "qyh1_c14",
  speaker: "doctor",
  text: "「没那么堵了」——他第一次允许自己的感受流动了一点。",
  choices: [
    { id: "qyh1_c14_a", text: "「你可以试着信我，也可以慢慢来。这儿不会催你。」", kind: "empathy", effect: { trust: 0 }, next: "qyh1_p15" },
    { id: "qyh1_c14_b", text: "「你说『该不该信』——你信一个人，通常需要什么？」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "qyh1_p15" },
  ],
}
```

```ts-dialog
// id: qyh1_p15
{
  id: "qyh1_p15",
  speaker: "patient",
  text: "……通常不信。医生这行当，见惯了生死，最怕的就是心软。可您刚才那句『够好』，我心里动了一下。我回家，把病历再翻一遍，看看能不能让自己信一句『你尽力了』。",
  emotion: "calm",
  autoNext: "qyh1_c15",
}
```

```ts-dialog
// id: qyh1_c15
{
  id: "qyh1_c15",
  speaker: "doctor",
  text: "「看看能不能让自己信一句『你尽力了』」——他已经在给自己松绑了。",
  choices: [
    { id: "qyh1_c15_a", text: "「好。回去可以试着问自己那一句，不用急着有答案。」", kind: "empathy", effect: { trust: 1 }, next: "qyh1_p16" },
    { id: "qyh1_c15_b", text: "「『尽力了』三个字，你好像从来没对自己说过。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh1_p16" },
  ],
}
```

```ts-dialog
// id: qyh1_p16
{
  id: "qyh1_p16",
  speaker: "patient",
  text: "……没有。我从来只问『够不够好』，不问『累不累』。医生，今天就到这儿吧。谢谢您听我说了这么多。我改天还来。",
  emotion: "calm",
  autoNext: "qyh1_out",
}
```

```ts-dialog
// id: qyh1_out
{
  id: "qyh1_out",
  speaker: "narration",
  text: "他起身，把那本压在兜里的手松开，走到门口，又停住，没回头：「医生，我今天回去，试着不翻那本病历。」他走了。你看着他的背影，白大褂在走廊灯光里，洗得发白，像穿了十年的一层壳。",
  beatEnd: { resumeNode: "qyh2_start" },
  autoNext: "qyh2_start",
}
```

---

### 节拍 2 · 那台抢救·「我本来可以」（trust 30→50，truth 15→30〔m1 触发〕，阻抗 c04）

```ts-dialog
// id: qyh2_start
{
  id: "qyh2_start",
  speaker: "narration",
  text: "几天后他准时到。这次是自己来的，没让老张押。他进来时白大褂换了件干净的，但眼睛下面是青的。他说这一周还是睡不好，一躺下，耳边就是监护仪的报警声。",
  autoNext: "qyh2_p01",
}
```

```ts-dialog
// id: qyh2_p01
{
  id: "qyh2_p01",
  speaker: "patient",
  text: "（他坐下，十指交握）……医生，我把那台抢救的事，从头到尾跟您讲一遍吧。不讲，我扛不住了。是个小伙子，二十四岁，车祸送来的，多发伤。我接手的时候，人还有意识，还抓着我的袖子说『医生，我疼』。",
  emotion: "sad",
  autoNext: "qyh2_c01",
}
```

```ts-dialog
// id: qyh2_c01
{
  id: "qyh2_c01",
  speaker: "doctor",
  text: "他主动开口了。一个「还抓着我袖子喊疼」的人，把那段记忆递到了你面前。",
  choices: [
    { id: "qyh2_c01_a", text: "「你慢慢讲。他抓着你说『我疼』的时候，你在做什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh2_p02" },
    { id: "qyh2_c01_b", text: "「你记得他抓你袖子的感觉——那是他的手，最后一次碰你。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "qyh2_p02" },
  ],
}
```

```ts-dialog
// id: qyh2_p02
{
  id: "qyh2_p02",
  speaker: "patient",
  text: "……我在交代护士备血、联系手术室。我拍了拍他手背说『别怕，我们在』。他松了手。后来抢救的时候，我一直想，我拍他那一下，是不是拍得太随便了。我该多说一句的。",
  emotion: "sad",
  autoNext: "qyh2_c02",
}
```

```ts-dialog
// id: qyh2_c02
{
  id: "qyh2_c02",
  speaker: "doctor",
  text: "「我该多说一句的」——他在为一句没来得及说的安慰责怪自己。",
  choices: [
    { id: "qyh2_c02_a", text: "「『我该多说一句』——你后来说过很多句，他都听不见了。这个念头，你背了多久？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh2_p03" },
    { id: "qyh2_c02_b", text: "「『别怕，我们在』——你当时说的时候，心里是稳的吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh2_p03" },
  ],
}
```

```ts-dialog
// id: qyh2_p03
{
  id: "qyh2_p03",
  speaker: "patient",
  text: "（他摇头）……不敢不稳。我是主治，我要是露了怯，底下护士更慌。我说『别怕』，其实是说给我自己听的。那晚血压一直掉，我一步步做，按部就班。做到后来，我发现我的声音是平的，平得我自己都听不出来情绪。",
  emotion: "neutral",
  autoNext: "qyh2_c03",
}
```

```ts-dialog
// id: qyh2_c03
{
  id: "qyh2_c03",
  speaker: "doctor",
  text: "「声音平得听不出情绪」——那是他给自己的应急程序：把慌张锁在声音底下。",
  choices: [
    { id: "qyh2_c03_a", text: "「声音平，不代表心平。你锁在底下的那份慌张，后来去哪儿了？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh2_p04" },
    { id: "qyh2_c03_b", text: "「你做了十年主治，把慌张锁起来——这个动作，是谁教你的？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh2_p04" },
  ],
}
```

```ts-dialog
// id: qyh2_p04
{
  id: "qyh2_p04",
  speaker: "patient",
  text: "（他移开眼）……不用谁教，当医生的都这样。底下的人看你，病人看你，家属看你。你要是慌了，整台抢救就垮了。……其实道理我都懂，可那晚之后，我这套就不灵了。锁不住了。",
  emotion: "anxious",
  autoNext: "qyh2_c04",
}
```

```ts-dialog
// id: qyh2_c04
{
  id: "qyh2_c04",
  speaker: "doctor",
  text: "「锁不住了」——他辛苦建的那堵墙，开始裂了。这里有个坎：他会怪自己「连锁都锁不住」。",
  choices: [
    { id: "qyh2_c04_a", text: "「『锁不住』不是退步。是那些被你锁住的东西，太重了，不想再待在里面了。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "qyh2_p05" },
    { id: "qyh2_c04_b", text: "「锁不住了之后，你第一晚是怎么过的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh2_p05" },
    { id: "qyh2_c04_c", text: "「你是医生，见惯生死的人，不该被一台抢救打垮。打起精神，扛过去。」", kind: "logic", effect: { trust: -10, defense: 8, mood: -3 }, next: "qyh2_r01" },
  ],
}
```

```ts-dialog
// id: qyh2_r01
{
  id: "qyh2_r01",
  speaker: "patient",
  text: "（他的脸一下绷紧）……您也这么说。『见惯生死的人』。我最怕的就是这句。您以为我见的那些生生死死，是练出来的胆量？不是，是每次都在心里挖一个坑，把没救回来的人埋进去，然后假装没挖过。这次，坑满了。",
  emotion: "angry",
  autoNext: "qyh2_p05",
}
```

```ts-dialog
// id: qyh2_p05
{
  id: "qyh2_p05",
  speaker: "patient",
  text: "……对不起，我又急了。最近一听见那句『见惯生死』就上头。您别往心里去。那晚之后，我回家，把值班手机一关，坐在客厅里，坐到天亮。手一直在抖，抖到我自己都拿不住杯子。",
  emotion: "sad",
  autoNext: "qyh2_c05",
}
```

```ts-dialog
// id: qyh2_c05
{
  id: "qyh2_c05",
  speaker: "doctor",
  text: "「坐在客厅里，坐到天亮」——他守夜守了一整晚，守的是那台抢救的回放。",
  choices: [
    { id: "qyh2_c05_a", text: "「坐到天亮，脑子里的画面，还是那台抢救吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh2_p06" },
    { id: "qyh2_c05_b", text: "「那晚你一个人坐着，有人知道你坐在那儿吗？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh2_p06" },
  ],
}
```

```ts-dialog
// id: qyh2_p06
{
  id: "qyh2_p06",
  speaker: "patient",
  text: "……不知道。我老婆睡在里屋，我开着电视，声音调得很小，怕吵醒她，又怕太静。我一遍遍回放那台抢救：血压、心率、我下的每个医嘱。我给自己计时，发现……我发现我除颤，可能晚了十几秒。",
  emotion: "scared",
  autoNext: "qyh2_c06",
}
```

```ts-dialog
// id: qyh2_c06
{
  id: "qyh2_c06",
  speaker: "doctor",
  text: "「晚了十几秒」——他终于把心里那根刺拔了出来。这是他自己给自己定的罪。",
  choices: [
    { id: "qyh2_c06_a", text: "「你反复计时，算出来的『十几秒』——你信它吗？你记的那台抢救，真的精确到十几秒吗？」", kind: "probe", effect: { trust: 2, truth: 2 }, next: "qyh2_p07" },
    { id: "qyh2_c06_b", text: "「你把『晚了十几秒』钉在自己身上——可你记的，是你那晚真实的时间，还是你后来一遍遍回放出来的时间？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh2_p07" },
  ],
}
```

```ts-dialog
// id: qyh2_p07
{
  id: "qyh2_p07",
  speaker: "patient",
  text: "……我分不清了。病历上写得清清楚楚，流程没问题。可我脑子里，那台抢救被我自己改写了无数遍，每改一遍，我就慢一秒。我知道这不科学，可我就是出不来。",
  emotion: "broken",
  autoNext: "qyh2_c07",
}
```

```ts-dialog
// id: qyh2_c07
{
  id: "qyh2_c07",
  speaker: "doctor",
  text: "「每改一遍就慢一秒」——他不是在复盘，是在给自己编一个「能解释」的故事。",
  choices: [
    { id: "qyh2_c07_a", text: "「你不是在复盘那台抢救。你是在找一个『我能做点什么』的答案——因为『什么都没用』，是你最怕的答案。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh2_p08" },
    { id: "qyh2_c07_b", text: "「如果那台抢救从头到尾都没有错，你会怎么想？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh2_p08" },
  ],
}
```

```ts-dialog
// id: qyh2_p08
{
  id: "qyh2_p08",
  speaker: "patient",
  text: "（他沉默了很久）……那我就会想，是我这个人在那晚不够稳。是我这个人，不够格。医生，您明白吗，我宁可说是哪一步慢了，也不肯说……也不肯说，有些病人，你就是救不回来。",
  emotion: "broken",
  autoNext: "qyh2_c08",
}
```

```ts-dialog
// id: qyh2_c08
{
  id: "qyh2_c08",
  speaker: "doctor",
  text: "「宁可说是哪一步慢了，也不肯说有些病人救不回来」——他宁愿让自己有错，也不肯承认有他左右不了的事。",
  choices: [
    { id: "qyh2_c08_a", text: "「承认『救不回来』，对现在的你来说，等于承认什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh2_p09" },
    { id: "qyh2_c08_b", text: "「你宁可怪自己，也不肯怪命运——因为你怕一松手，就再也没有『够好』的可能了。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "qyh2_p09" },
    { id: "qyh2_c08_c", text: "「救人本来就是搏概率，你救十个活九个，已经比大多数医生强了。」", kind: "confront", require: { trust: 30 }, effect: { trust: 1, truth: 3, mood: -2 }, next: "qyh2_p09", hint: "需要信任≥30" },
  ],
}
```

```ts-dialog
// id: qyh2_p09
{
  id: "qyh2_p09",
  speaker: "patient",
  text: "……承认我……不是万能的。承认我不是那个『手永远不抖』的人。（他声音发抖）我小时候一直以为，只要我够好，够稳，够努力，就什么都能救回来。那台抢救告诉我，不是。我救不回来。我是不是，就不配当医生了？",
  emotion: "broken",
  autoNext: "qyh2_c09",
}
```

```ts-dialog
// id: qyh2_c09
{
  id: "qyh2_c09",
  speaker: "doctor",
  text: "「救不回来，就不配当医生」——他把「救活」当成了当医生的资格证。",
  choices: [
    { id: "qyh2_c09_a", text: "「没有哪个医生能救回每一个病人。『尽力』和『万无一失』，从来不是一回事。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh2_p10" },
    { id: "qyh2_c09_b", text: "「『不配当医生』——这句话，是你自己想的，还是有人从小就给你定的标准？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh2_p10" },
  ],
}
```

```ts-dialog
// id: qyh2_p10
{
  id: "qyh2_p10",
  speaker: "patient",
  text: "（他低头，很久）……那家属后来来医院，我站在门口不敢进去。我以为他们会骂我，会说是我害的。结果那个阿姨，就是那小伙子的妈妈，她看着我，说了一句……她说『谢谢你们，尽力了』。她走了以后，我在洗手间哭了一场。哭完我站在镜子前，自己都看不起自己。",
  emotion: "sad",
  autoNext: "qyh2_c10",
}
```

```ts-dialog
// id: qyh2_c10
{
  id: "qyh2_c10",
  speaker: "doctor",
  text: "「谢谢你们尽力了」——一句本该让他解脱的话，反而把他按进了更深的自责里。",
  choices: [
    { id: "qyh2_c10_a", text: "「她没怪你，你反而垮了——因为她说『尽力了』，就等于说『你救不回来不是你的错』，而这正是你最不肯承认的。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh2_p11" },
    { id: "qyh2_c10_b", text: "「她说『尽力了』，你却在洗手间哭——你哭的，不是她的话，是你不肯原谅自己。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "qyh2_p11" },
  ],
}
```

```ts-dialog
// id: qyh2_p11
{
  id: "qyh2_p11",
  speaker: "patient",
  text: "……对。我宁可他们骂我。骂我，我还有个「错」可以改；他们说尽力了，我就连错都没有了，只剩下……只剩下一句「你救不回来」。这句话，我背不动。",
  emotion: "scared",
  autoNext: "qyh2_c11",
}
```

```ts-dialog
// id: qyh2_c11
{
  id: "qyh2_c11",
  speaker: "doctor",
  text: "「你救不回来」——他反复念这四个字，像念一道判词。",
  choices: [
    { id: "qyh2_c11_a", text: "「这句判词，是谁念给你听的？是那个阿姨，还是你自己，还是更早的谁？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh2_p12" },
    { id: "qyh2_c11_b", text: "「『你救不回来』——如果这话是别人说的，你会反驳；可要是你爸说的呢？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh2_p12" },
  ],
}
```

```ts-dialog
// id: qyh2_p12
{
  id: "qyh2_p12",
  speaker: "patient",
  text: "（他猛地抬头，又低下去）……我爸。我爸要是知道我没救回来一个人，他不会骂我。他只会说一句『嗯』，然后走开。他越不说话，我越觉得自己不行。他年轻的时候，一把刀，从来没有人从他手里救不回来的。",
  emotion: "sad",
  autoNext: "qyh2_c12",
}
```

```ts-dialog
// id: qyh2_c12
{
  id: "qyh2_c12",
  speaker: "doctor",
  text: "「他越不说话，我越觉得自己不行」——父亲用沉默，立了一把比骂还高的尺子。",
  choices: [
    { id: "qyh2_c12_a", text: "「你拿自己跟他比，比了多久了？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh2_p13" },
    { id: "qyh2_c12_b", text: "「你爸从来没失败过——这是你想的，还是你问过他？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh2_p13" },
  ],
}
```

```ts-dialog
// id: qyh2_p13
{
  id: "qyh2_p13",
  speaker: "patient",
  text: "……从来没失败过，这是我们全家的共识。我妈说的，说我爸这辈子从没让一个病人死在手术台上。我信了很多年。可我现在有点怀疑了——哪有人一辈子不出错的？他是不是也有过……（他说不下去）",
  emotion: "anxious",
  autoNext: "qyh2_c13",
}
```

```ts-dialog
// id: qyh2_c13
{
  id: "qyh2_c13",
  speaker: "doctor",
  text: "「他是不是也有过」——他第一次允许自己怀疑父亲的完美。",
  choices: [
    { id: "qyh2_c13_a", text: "「你开始怀疑『完美』这件事了。这个怀疑，会让你和他都轻松一点。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "qyh2_p14" },
    { id: "qyh2_c13_b", text: "「如果有一天，你发现你爸也救不活过——你会怎么看他？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh2_p14" },
  ],
}
```

```ts-dialog
// id: qyh2_p14
{
  id: "qyh2_p14",
  speaker: "patient",
  text: "（他愣了很久）……我从来没想过这个问题。医生，今天你说的这些话，我没法接。我得回去想想。我好像……站在一个口子上，一边是『我不够好』，一边是『有些事，本来就不是够不够好的事』。我不敢往那边走。",
  emotion: "neutral",
  autoNext: "qyh2_c14",
}
```

```ts-dialog
// id: qyh2_c14
{
  id: "qyh2_c14",
  speaker: "doctor",
  text: "「我不敢往那边走」——他看见了那条路，但脚还没敢迈。",
  choices: [
    { id: "qyh2_c14_a", text: "「你不必现在就迈过去。今天先站在这儿，看见它，就已经是往前走了一步。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh2_p15" },
    { id: "qyh2_c14_b", text: "「你说『不敢往那边走』——你在怕的那边，有什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh2_p15" },
  ],
}
```

```ts-dialog
// id: qyh2_p15
{
  id: "qyh2_p15",
  speaker: "patient",
  text: "……那边有什么，我要是知道，我就敢走了。我只知道，我要是承认「有些事我救不回来」，我这十年的完美，就塌了。我拿什么证明我够格？拿什么对得起我爸那把刀？",
  emotion: "broken",
  autoNext: "qyh2_c15",
}
```

```ts-dialog
// id: qyh2_c15
{
  id: "qyh2_c15",
  speaker: "doctor",
  text: "「拿什么证明我够格」——他把自己的价值，抵押给了「救得回所有人」这个神话。",
  choices: [
    { id: "qyh2_c15_a", text: "「你证明『够格』的方式，是从没失败过。可你有没有想过，你爸当年，也许也是在用同一句话，撑着他自己？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh2_p16" },
    { id: "qyh2_c15_b", text: "「如果『够格』不用靠救回所有人来证明，那你觉得，医生是什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh2_p16" },
  ],
}
```

```ts-dialog
// id: qyh2_p16
{
  id: "qyh2_p16",
  speaker: "patient",
  text: "（他低下头，声音很轻）……医生，我今天讲了很多，都是我这一个月没跟人讲过的话。那个小伙子，他叫……他叫周航。我一直没敢叫他的名字，好像叫了，他就真的回不来了。",
  emotion: "sad",
  autoNext: "qyh2_c16",
}
```

```ts-dialog
// id: qyh2_c16
{
  id: "qyh2_c16",
  speaker: "doctor",
  text: "他第一次叫出了那个年轻人的名字——把「那台抢救」还原成了「一个人」。",
  choices: [
    { id: "qyh2_c16_a", text: "「周航。你记住他了。记住他的名字，比反复回放那台抢救，更接近想念他。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh2_p17" },
    { id: "qyh2_c16_b", text: "「叫出他的名字，你感觉怎么样？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh2_p17" },
  ],
}
```

```ts-dialog
// id: qyh2_p17
{
  id: "qyh2_p17",
  speaker: "patient",
  text: "（他吸了吸鼻子）……有点酸，但好像，也没那么堵了。医生，我先回去了。我答应您，今晚试着不翻病历。我想……叫他的名字，代替翻病历。",
  emotion: "calm",
  autoNext: "qyh2_c17",
}
```

```ts-dialog
// id: qyh2_c17
{
  id: "qyh2_c17",
  speaker: "doctor",
  text: "「叫他的名字，代替翻病历」——你终于知道，该用什么去换掉那本病历了。",
  choices: [
    { id: "qyh2_c17_a", text: "「周航这两个字，你可以留着。他会慢慢从『我救不回来的人』，变回一个名字。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "qyh2_p18" },
    { id: "qyh2_c17_b", text: "「你说『代替翻病历』——那如果他的名字，又让你想起那台抢救，你会怎么办？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh2_p18" },
  ],
}
```

```ts-dialog
// id: qyh2_p18
{
  id: "qyh2_p18",
  speaker: "patient",
  text: "（他想了想）……那就再叫一遍。我女儿小时候怕打针，我就教她念自己的名字，念着念着就不怕了。我想，周航的名字，我多叫几遍，也就不怕了。",
  emotion: "calm",
  autoNext: "qyh2_out",
}
```

```ts-dialog
// id: qyh2_out
{
  id: "qyh2_out",
  speaker: "narration",
  text: "他起身，走到门口，回头看了你一眼：「医生，你说『记住他，比回放更接近想念他』——我回去试试。」他走后，你注意到沙发上，他坐过的地方，有一小块被捏皱的衣角。他把那颗心，也捏了一路。",
  beatEnd: { resumeNode: "qyh3_start" },
  autoNext: "qyh3_start",
}
```

---

### 节拍 3 · 第一次复访·「医生的手不能抖」（trust 50→65，truth 30→50〔m2 触发〕，阻抗 c03）

```ts-dialog
// id: qyh3_start
{
  id: "qyh3_start",
  speaker: "narration",
  text: "一周后他复访。进来时手里攥着个布包，包角磨得发白。他说这周试着没翻病历，改翻别的东西了。他把布包放在膝上，没打开。",
  autoNext: "qyh3_p01",
}
```

```ts-dialog
// id: qyh3_p01
{
  id: "qyh3_p01",
  speaker: "patient",
  text: "（他拍了拍布包）……这周我回了趟家，从我父亲书房的抽屉里，把他那副旧听诊器找出来了。他早不用了，退休后一直收着。我拿出来的时候，手抖了一下。我在想，我到底要不要把这东西带进手术室。",
  emotion: "anxious",
  autoNext: "qyh3_c01",
}
```

```ts-dialog
// id: qyh3_c01
{
  id: "qyh3_c01",
  speaker: "doctor",
  text: "他把父亲的听诊器翻出来了——他正在跟「父亲的标准」做一次正面的照面。",
  choices: [
    { id: "qyh3_c01_a", text: "「你把它翻出来，是想留住他，还是想考考自己够不够格？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh3_p02" },
    { id: "qyh3_c01_b", text: "「你手抖了一下——你怕的，是『带不进去』，还是『带进去也救不回来』？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh3_p02" },
  ],
}
```

```ts-dialog
// id: qyh3_p02
{
  id: "qyh3_p02",
  speaker: "patient",
  text: "……都有。我爸把这副听诊器给我那年，我考上医学院。他说：『病人把命交给你，是信任你。你的手不能抖。』这话我记了二十年。我从来没在我爸面前抖过手。就一次，进手术室第一次握刀，我抖了一整台。",
  emotion: "sad",
  autoNext: "qyh3_c02",
}
```

```ts-dialog
// id: qyh3_c02
{
  id: "qyh3_c02",
  speaker: "doctor",
  text: "「就一次，抖了一整台」——他把那次抖动，记成了自己的污点，藏了二十年。",
  choices: [
    { id: "qyh3_c02_a", text: "「第一次握刀，手抖——那不是污点。那是你还记得『手里是条人命』。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh3_p03" },
    { id: "qyh3_c02_b", text: "「你抖了一整台，你爸站在旁边。他那晚，跟你说什么了吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh3_p03" },
  ],
}
```

```ts-dialog
// id: qyh3_p03
{
  id: "qyh3_p03",
  speaker: "patient",
  text: "（他摇头）……什么都没说。手术完，他就走了。我站在手术室门口，等他一句话，等到半夜。他没说。等天亮查房，他当着全组的面，说我「基本功不扎实」。从那以后，我再没在他面前抖过手。我练到，握刀的手，像焊死的一样。",
  emotion: "neutral",
  autoNext: "qyh3_c03",
}
```

```ts-dialog
// id: qyh3_c03
{
  id: "qyh3_c03",
  speaker: "doctor",
  text: "「练到像焊死的一样」——他用二十年，把自己焊进了「手不能抖」四个字里。",
  choices: [
    { id: "qyh3_c03_a", text: "「你把『手不能抖』练成了骨头。现在手抖了，你怕的不是抖本身，是怕『焊死的壳』裂了。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "qyh3_p04" },
    { id: "qyh3_c03_b", text: "「他说你『基本功不扎实』——那句话，你到现在还背着？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh3_p04" },
    { id: "qyh3_c03_c", text: "「你们学医的，本来就要手稳。你爸严格，是为你病人好。」", kind: "logic", effect: { trust: -10, defense: 8, mood: -3 }, next: "qyh3_r01" },
  ],
}
```

```ts-dialog
// id: qyh3_r01
{
  id: "qyh3_r01",
  speaker: "patient",
  text: "（他猛地抬头，眼里有火）……对，他严格，为我病人好。这话我听了二十年。可您知道吗，他不是严格，他是……他是从来不许我出错。我错一次，他就用沉默罚我一整年。病人是病人，我是我，他把我当成他手下的实习生，永远在考我。",
  emotion: "angry",
  autoNext: "qyh3_p04",
}
```

```ts-dialog
// id: qyh3_p04
{
  id: "qyh3_p04",
  speaker: "patient",
  text: "……对不起，我又急了。最近一提我爸就上头。我自己都不知道，我对他哪来这么大怨气。他供我上学，教我技术，把听诊器都传给我了。我应该感激他。可我……我有时候觉得，我不是他儿子，是他手里一把刀，磨得越利，他越放心。",
  emotion: "sad",
  autoNext: "qyh3_c04",
}
```

```ts-dialog
// id: qyh3_c04
{
  id: "qyh3_c04",
  speaker: "doctor",
  text: "「我不是他儿子，是他手里一把刀」——他第一次说出这句压在心底二十年的话。",
  choices: [
    { id: "qyh3_c04_a", text: "「你当了他二十年的『好刀』。那你自己呢？你有没有当过一个，会被他抱一抱的儿子？」", kind: "probe", effect: { trust: 2, truth: 2 }, next: "qyh3_p05" },
    { id: "qyh3_c04_b", text: "「你说『我应该感激他』——这份感激里，你偷偷藏了多少委屈？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh3_p05" },
  ],
}
```

```ts-dialog
// id: qyh3_p05
{
  id: "qyh3_p05",
  speaker: "patient",
  text: "（他沉默了很久）……委屈。可我不敢委屈。我妈说了，我爸那么忙，那么累，一个人扛一个家，我要是还委屈，就是不懂事。我从小就知道，我不能让他烦心。我要考第一，要当医生，要成材。我得让他省心。",
  emotion: "sad",
  autoNext: "qyh3_c05",
}
```

```ts-dialog
// id: qyh3_c05
{
  id: "qyh3_c05",
  speaker: "doctor",
  text: "「我不能让他省心之外有任何事」——他从记事起，就把「让父母放心」当成了自己的活法。",
  choices: [
    { id: "qyh3_c05_a", text: "「你从小『不能委屈』、『不能烦心』、『不能出错』——你被允许过『可以不完美』吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh3_p06" },
    { id: "qyh3_c05_b", text: "「『让他省心』——这句话，你背了多少年，才能背得这么顺？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh3_p06" },
  ],
}
```

```ts-dialog
// id: qyh3_p06
{
  id: "qyh3_p06",
  speaker: "patient",
  text: "……从来没有。我七岁那年就懂了。我七岁，我爸让我端着满满一碗水，从屋这头走到那头，不许洒一滴。我走到一半手抖了，他走过来，不是骂我，是握住我的手，带我走完。他告诉我：『手会抖，是因为你怕。』——那是我爸，这辈子跟我说过的最软的一句话。",
  emotion: "broken",
  autoNext: "qyh3_c06",
}
```

```ts-dialog
// id: qyh3_c06
{
  id: "qyh3_c06",
  speaker: "doctor",
  text: "七岁那碗水，浮出来了。那是他最深的一个记忆——父亲难得一次温柔，却用在「手不能抖」这件事上。",
  choices: [
    { id: "qyh3_c06_a", text: "「你爸难得说句软话，说的却是『你怕』。你怕的，是洒水，还是怕他失望？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "qyh3_p07" },
    { id: "qyh3_c06_b", text: "「他握住你的手，带你走完那一路——那一刻，你是什么感觉？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh3_p07" },
    { id: "qyh3_c06_c", text: "「你爸用这一句话，就把你教成了一把稳刀——这算是他难得的好。」", kind: "confront", require: { trust: 45 }, effect: { trust: 1, truth: 3, mood: -2 }, next: "qyh3_p07", hint: "需要信任≥45" },
  ],
}
```

```ts-dialog
// id: qyh3_p07
{
  id: "qyh3_p07",
  speaker: "patient",
  text: "（他眼泪一下子下来，又压住）……怕他失望。我这一辈子，都怕他失望。我端着那碗水的时候，我七岁，我看他站在屋那头，等着我走过去。我走到他面前，水没洒，他把碗接过去，什么都没说，就去书房了。我在原地站了很久。我想他夸我一句。他一句都没夸。",
  emotion: "broken",
  autoNext: "qyh3_c07",
}
```

```ts-dialog
// id: qyh3_c07
{
  id: "qyh3_c07",
  speaker: "doctor",
  text: "「端了一路，等一句夸，一句都没等到」——七岁的他，在那间屋里，站了很久。",
  choices: [
    { id: "qyh3_c07_a", text: "「你端着那碗水站到现在的，不只是手，是你七岁那年就懂了的『要让他满意』。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh3_p08" },
    { id: "qyh3_c07_b", text: "「如果他那天夸了你，你现在会觉得，自己可以失败吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh3_p08" },
  ],
}
```

```ts-dialog
// id: qyh3_p08
{
  id: "qyh3_p08",
  speaker: "patient",
  text: "……我不知道。医生，我从来没想过这个。我光顾着恨自己手抖，从来没想过……我到底是在救病人，还是在救那个『怕他失望』的七岁小孩。这两个，我一直当成一回事。",
  emotion: "anxious",
  autoNext: "qyh3_c08",
}
```

```ts-dialog
// id: qyh3_c08
{
  id: "qyh3_c08",
  speaker: "doctor",
  text: "「我把救病人，当成了救那个小孩」——他第一次把「救人」和「证明自己」分开了。",
  choices: [
    { id: "qyh3_c08_a", text: "「这两个不是一回事。周航，不是用来证明你够格的道具。他是一条命。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh3_p09" },
    { id: "qyh3_c08_b", text: "「如果救病人不是为了证明自己，那救不回来的时候，你还剩什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh3_p09" },
  ],
}
```

```ts-dialog
// id: qyh3_p09
{
  id: "qyh3_p09",
  speaker: "patient",
  text: "（他愣了愣）……我从来没想过这个。我要是救不回来周航，我还剩什么？……剩一个，尽力了的医生？可『尽力了』三个字，我从小到大，都不被允许说出口。",
  emotion: "scared",
  autoNext: "qyh3_c09",
}
```

```ts-dialog
// id: qyh3_c09
{
  id: "qyh3_c09",
  speaker: "doctor",
  text: "「『尽力了』三个字，不被允许说出口」——他第一次把这句话摆到台面上。",
  choices: [
    { id: "qyh3_c09_a", text: "「『尽力了』不是借口。它是医生给病人，也给自己，一个诚实的交代。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh3_p10" },
    { id: "qyh3_c09_b", text: "「这句话，是谁不允许你说的？你爸？你自己？还是整个『医生不能失败』的规矩？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh3_p10" },
  ],
}
```

```ts-dialog
// id: qyh3_p10
{
  id: "qyh3_p10",
  speaker: "patient",
  text: "……都有。我爸，我，还有值班室墙上挂的那句『生命所系，性命相托』。我们医生，肩上永远扛着这句话。可没人告诉我们，扛不住的时候，可以放下来喘口气。",
  emotion: "sad",
  autoNext: "qyh3_c10",
}
```

```ts-dialog
// id: qyh3_c10
{
  id: "qyh3_c10",
  speaker: "doctor",
  text: "「没人告诉我们，扛不住可以喘口气」——他其实不是在替自己说，是在替所有医生说话。",
  choices: [
    { id: "qyh3_c10_a", text: "「你不是第一把扛不动的人，也不会是最后一把。扛不动，不丢人。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh3_p11" },
    { id: "qyh3_c10_b", text: "「『性命相托』四个字，你每天值班都看。你有没有哪一刻，觉得这四个字太沉，压得你想逃？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh3_p11" },
  ],
}
```

```ts-dialog
// id: qyh3_p11
{
  id: "qyh3_p11",
  speaker: "patient",
  text: "（他沉默，声音低下去）……有。就这几天，我有一次半夜站在值班室窗前，看着楼下的急救通道，心里想：要是明天不值班就好了。想完我就骂自己：你还是人吗，病人等你去救，你居然想逃。",
  emotion: "scared",
  autoNext: "qyh3_c11",
}
```

```ts-dialog
// id: qyh3_c11
{
  id: "qyh3_c11",
  speaker: "doctor",
  text: "「想逃」——他第一次承认，自己也有想逃的时刻。",
  choices: [
    { id: "qyh3_c11_a", text: "「想逃，是你身体在替你喊累。你听见它喊了，没有把它按回去——这已经是进步。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh3_p12" },
    { id: "qyh3_c11_b", text: "「你骂自己『还是人吗』——这句话，是谁的声音？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh3_p12" },
  ],
}
```

```ts-dialog
// id: qyh3_p12
{
  id: "qyh3_p12",
  speaker: "patient",
  text: "……我自己的，也可能是我爸的。反正从小，我心里就住着一个声音，我做得不够好，它就骂我。我以为是它在逼我变好。现在想想，它逼得我连『想逃』都不敢承认。",
  emotion: "neutral",
  autoNext: "qyh3_c12",
}
```

```ts-dialog
// id: qyh3_c12
{
  id: "qyh3_c12",
  speaker: "doctor",
  text: "「心里住着一个声音，做得不够好就骂我」——他听见了那个声音，也开始辨认它了。",
  choices: [
    { id: "qyh3_c12_a", text: "「那个声音，是你爸的，也是你这些年替它不断加码的。你听见它，不等于要听它的。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh3_p13" },
    { id: "qyh3_c12_b", text: "「『想逃』两个字，你承认了它。下次它再出来，你打算怎么办？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh3_p13" },
  ],
}
```

```ts-dialog
// id: qyh3_p13
{
  id: "qyh3_p13",
  speaker: "patient",
  text: "……我不知道。我这辈子，没学过怎么跟它相处。我只学过怎么让它闭嘴——考第一，当主治，救活每一个人。可现在，它闭不了嘴了。它一直在喊，喊得我手抖。",
  emotion: "anxious",
  autoNext: "qyh3_c13",
}
```

```ts-dialog
// id: qyh3_c13
{
  id: "qyh3_c13",
  speaker: "doctor",
  text: "「它闭不了嘴了」——那个声音，第一次在他面前摊了牌。",
  choices: [
    { id: "qyh3_c13_a", text: "「它喊了二十年，你从没让它说话。现在它喊累了，想让你听听它。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh3_p14" },
    { id: "qyh3_c13_b", text: "「它喊的内容，你听清了吗？除了『不够好』，还有别的吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh3_p14" },
  ],
}
```

```ts-dialog
// id: qyh3_p14
{
  id: "qyh3_p14",
  speaker: "patient",
  text: "……除了『不够好』，它还会喊一句『别让人失望』。我到现在都记得，七岁那碗水，我端到一半，它在我心里喊：别洒，洒了爸会失望。我端到了屋那头。可我心里那碗水，洒了一辈子。",
  emotion: "broken",
  autoNext: "qyh3_c14",
}
```

```ts-dialog
// id: qyh3_c14
{
  id: "qyh3_c14",
  speaker: "doctor",
  text: "「心里那碗水，洒了一辈子」——七岁那碗水，他端到了屋那头，却从没放下过。",
  choices: [
    { id: "qyh3_c14_a", text: "「你端了三十年。今天，可以试着把它放下来——就在这儿，放在我面前。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh3_p15" },
    { id: "qyh3_c14_b", text: "「那碗水，其实从来没有人要求你一直端着。是你自己，不敢放下。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh3_p15" },
  ],
}
```

```ts-dialog
// id: qyh3_p15
{
  id: "qyh3_p15",
  speaker: "patient",
  text: "（他低头看着自己的手，很久）……医生，我今天说的，比我这辈子跟家里人说的都多。我老婆只知道我手抖，不知道我为什么抖。您……您是第一个，愿意听我端那碗水的人。",
  emotion: "calm",
  autoNext: "qyh3_c15",
}
```

```ts-dialog
// id: qyh3_c15
{
  id: "qyh3_c15",
  speaker: "doctor",
  text: "「您是第一个愿意听我端那碗水的人」——他第一次，被人接住了。",
  choices: [
    { id: "qyh3_c15_a", text: "「我不是第一个。是你第一次，让自己说出来。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh3_p16" },
    { id: "qyh3_c15_b", text: "「你说出来的时候，手还抖吗？」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "qyh3_p16" },
  ],
}
```

```ts-dialog
// id: qyh3_p16
{
  id: "qyh3_p16",
  speaker: "patient",
  text: "（他摊开手，看着自己的手）……好像，不抖了。说出来，就不抖了。怪了，我以为说出来会更抖。医生，我心里那碗水，是不是……可以放下一点点了？",
  emotion: "calm",
  autoNext: "qyh3_c16",
}
```

```ts-dialog
// id: qyh3_c16
{
  id: "qyh3_c16",
  speaker: "doctor",
  text: "「说出来就不抖了」——他亲身体验了一回：承认害怕，手反而稳了。",
  choices: [
    { id: "qyh3_c16_a", text: "「可以放下一点点了。你已经在端的时候，学会松开手指了。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh3_p17" },
    { id: "qyh3_c16_b", text: "「『说出来就不抖』——这个发现，你打算带回去，跟谁说？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh3_p17" },
  ],
}
```

```ts-dialog
// id: qyh3_p17
{
  id: "qyh3_p17",
  speaker: "patient",
  text: "……我想跟我爸说。可我不知道他会不会听。他这辈子，只会教我技术，不会跟我说话。医生，您说我是不是太贪心了，我都三十八了，还想听他夸我一句。",
  emotion: "neutral",
  autoNext: "qyh3_c17",
}
```

```ts-dialog
// id: qyh3_c17
{
  id: "qyh3_c17",
  speaker: "doctor",
  text: "「三十八了，还想听他夸我一句」——那不是贪心，是他等了三十年的那句话。",
  choices: [
    { id: "qyh3_c17_a", text: "「想被自己敬重的父亲夸一句，多大都不丢人。你等的不是一句夸，是『你很好，可以休息了』。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "qyh3_out" },
    { id: "qyh3_c17_b", text: "「如果这句夸，永远等不到——你会不会允许自己，先夸自己一句？」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "qyh3_out" },
  ],
}
```

```ts-dialog
// id: qyh3_out
{
  id: "qyh3_out",
  speaker: "narration",
  text: "他临走前，把那副听诊器从布包里拿出来，看了看，又收回去。他说：「医生，这副听诊器，我先不拿进手术室。等我哪天能跟它坦然相处了，再带。」他走了。走廊里的灯，把他影子拉得很长，像一个人扛着一整段童年。",
  beatEnd: { resumeNode: "qyh4_start" },
  autoNext: "qyh4_start",
}
```

---

### 节拍 4 · 七岁根·「手不能抖」（trust 65→75，truth 50→65，阻抗 c04）

> **节奏变化**：本节拍信任增长放缓（净 +10）、真相稳步推进——揭开七岁根源时，信任不暴涨而是稳住，玩家靠「陪伴」而非「追问」赢得这一层。

```ts-dialog
// id: qyh4_start
{
  id: "qyh4_start",
  speaker: "narration",
  text: "这一次，他来得比预约早。助理说他坐在候诊区，把一张照片看了一遍又一遍。进门时，他把照片翻过来扣在膝上，像是怕你看见，又像是想让你看见。",
  autoNext: "qyh4_p01",
}
```

```ts-dialog
// id: qyh4_p01
{
  id: "qyh4_p01",
  speaker: "patient",
  text: "（他把照片翻过来，是一张泛黄的旧照：一个中年男人在手术台前，戴着口罩，只露出一双眼睛）……这是我爸，四十多年前拍的。我这周一直在看这张照片。您看他的手，隔着照片都能看出稳。我这一辈子，都在追这双手。",
  emotion: "sad",
  autoNext: "qyh4_c01",
}
```

```ts-dialog
// id: qyh4_c01
{
  id: "qyh4_c01",
  speaker: "doctor",
  text: "他把父亲的照片带来了——「追这双手」，他说的是手艺，也是那句从没到手的肯定。",
  choices: [
    { id: "qyh4_c01_a", text: "「你在追的，是这双手，还是这双手背后的『被认可』？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh4_p02" },
    { id: "qyh4_c01_b", text: "「隔着照片都能看出稳——你小时候，是不是特别想长大成他这样？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh4_p02" },
  ],
}
```

```ts-dialog
// id: qyh4_p02
{
  id: "qyh4_p02",
  speaker: "patient",
  text: "（他点头）……特别想。我小时候，只要我爸回家，我就躲门后看他脱白大褂、洗手。我学他洗手，学他端茶杯，学他走路。我以为，学得一模一样，就是他了。现在我才明白，我学的全是壳，里头的我，还是那个端着水怕洒的小孩。",
  emotion: "sad",
  autoNext: "qyh4_c02",
}
```

```ts-dialog
// id: qyh4_c02
{
  id: "qyh4_c02",
  speaker: "doctor",
  text: "「学得一模一样，就是他了」——一个孩子，把「成为父亲」当成了唯一的路。",
  choices: [
    { id: "qyh4_c02_a", text: "「你学了他的壳，却没学到他允许自己失败的那一面——因为他那一面，从没在你面前露过。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh4_p03" },
    { id: "qyh4_c02_b", text: "「你躲门后看他——那些年，你其实一直在等他回头看你一眼。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh4_p03" },
  ],
}
```

```ts-dialog
// id: qyh4_p03
{
  id: "qyh4_p03",
  speaker: "patient",
  text: "（他沉默了一会儿）……他没回头。他回来就是洗手、吃饭、进书房。我妈说，他那是累。我信。可我心里有个角落一直在想：他要是回一次头，哪怕只说一句『饭还热着』，我可能就不会……不会把自己逼成这样。",
  emotion: "neutral",
  autoNext: "qyh4_c03",
}
```

```ts-dialog
// id: qyh4_c03
{
  id: "qyh4_c03",
  speaker: "doctor",
  text: "「他要是回一次头」——他第一次承认，自己等过父亲回头。",
  choices: [
    { id: "qyh4_c03_a", text: "「你等过。他一次都没回。你把这笔账，算成了『我不够好』，其实那不是你的账。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh4_p04" },
    { id: "qyh4_c03_b", text: "「『可能就不会把自己逼成这样』——你早就知道，是那扇没回的头，逼的你。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh4_p04" },
    { id: "qyh4_c03_c", text: "「你爸忙了一辈子，是为了养家。你不能要求他又当名医又当慈父。」", kind: "logic", effect: { trust: -10, defense: 8, mood: -3 }, next: "qyh4_r01" },
  ],
}
```

```ts-dialog
// id: qyh4_r01
{
  id: "qyh4_r01",
  speaker: "patient",
  text: "（他猛地抬头）……对，他忙，他养家，他是好父亲。可您知道吗，他忙到连我上大学的行李，都是我跟我妈两个人扛的。他送我到车站，拍了拍我肩，说『好好学』。就三个字。我抱着行李在车站站了很久，等他再多说一句。他头也不回地走了。",
  emotion: "angry",
  autoNext: "qyh4_p04",
}
```

```ts-dialog
// id: qyh4_p04
{
  id: "qyh4_p04",
  speaker: "patient",
  text: "（他深吸一口气）……您别介意，我又激动了。我就是……这阵子把他想得太多了。医生，您说我这是不是不孝？他都那把年纪了，我还在这儿翻旧账。",
  emotion: "anxious",
  autoNext: "qyh4_c04",
}
```

```ts-dialog
// id: qyh4_c04
{
  id: "qyh4_c04",
  speaker: "doctor",
  text: "「翻旧账」——他把自己的疼，又归成了「不孝」。",
  choices: [
    { id: "qyh4_c04_a", text: "「你不是不孝。你是三十年没敢翻的账，终于有人陪你翻了。翻出来，不是为怪谁，是为让自己透气。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh4_p05" },
    { id: "qyh4_c04_b", text: "「你翻的『旧账』里，有没有一段，是你妈也在的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh4_p05" },
  ],
}
```

```ts-dialog
// id: qyh4_p05
{
  id: "qyh4_p05",
  speaker: "patient",
  text: "（他点头）……我妈。我妈是另一种。她倒是不忙，可她也不看我的感受。她只看成绩单。我考第一，她就笑；考第二，她就叹气，说『你爸那么好的医生，你可别给他丢脸』。从小到大，她问我最多的一句话是『考了多少名』，从没问过一句『累不累』。",
  emotion: "sad",
  autoNext: "qyh4_c05",
}
```

```ts-dialog
// id: qyh4_c05
{
  id: "qyh4_c05",
  speaker: "doctor",
  text: "母亲那条线也露出来了：不问累不累，只问名次——她怕你给你爸丢脸，也怕她自己被比下去。",
  choices: [
    { id: "qyh4_c05_a", text: "「你妈眼里那个『你爸的期待』，压了你多少年？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh4_p06" },
    { id: "qyh4_c05_b", text: "「她没问过你累不累——你听了三十年，也自己扛了三十年。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "qyh4_p06" },
  ],
}
```

```ts-dialog
// id: qyh4_p06
{
  id: "qyh4_p06",
  speaker: "patient",
  text: "……压到现在。我考医学院那年，我爸妈那晚都没睡。我爸在书房，我妈在客厅，谁都没跟我多说一句话。天亮了，我妈给我塞了钱，说『好好念，别丢你爸的脸』。我攥着那沓钱，在巷口站了很久。那沓钱，是我这辈子拿过最重的东西。",
  emotion: "sad",
  autoNext: "qyh4_c06",
}
```

```ts-dialog
// id: qyh4_c06
{
  id: "qyh4_c06",
  speaker: "doctor",
  text: "「那沓钱，是我拿过最重的东西」——他爸那代人的爱，重到没地方放。",
  choices: [
    { id: "qyh4_c06_a", text: "「他们给你的不是钱，是一句没说出口的『你要出息』。你把这句，背成了『我必须万无一失』。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh4_p07" },
    { id: "qyh4_c06_b", text: "「你背了那句『别丢脸』三十多年。今天，把它放下来一点，行不行？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh4_p07" },
  ],
}
```

```ts-dialog
// id: qyh4_p07
{
  id: "qyh4_p07",
  speaker: "patient",
  text: "（他沉默了很久）……行。可我一放下来，我就不知道我是谁了。我这辈子，活的就是那句『别丢脸』。您说，我要是把这句话还回去，我还是那个……那个在手术台上做主的人吗？",
  emotion: "scared",
  autoNext: "qyh4_c07",
}
```

```ts-dialog
// id: qyh4_c07
{
  id: "qyh4_c07",
  speaker: "doctor",
  text: "「把这句话还回去，我还是谁」——他把自我，整个焊在了那句规训上。",
  choices: [
    { id: "qyh4_c07_a", text: "「『还回去』不代表你没了。那句话是别人给你的尺子，不是你的骨头。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh4_p08" },
    { id: "qyh4_c07_b", text: "「你怕的不是『没身份』，是怕松了这句，连你爸最后那点认可都没了。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh4_p08" },
  ],
}
```

```ts-dialog
// id: qyh4_p08
{
  id: "qyh4_p08",
  speaker: "patient",
  text: "（他愣住，眼泪一下子下来）……对。我怕这个。我怕我放下『手不能抖』，我爸就会想：这孩子，终究不行。我怕他失望。我怕了三十八年。……医生，我有时候觉得，我这一辈子，都是在替别人活。",
  emotion: "broken",
  autoNext: "qyh4_c08",
}
```

```ts-dialog
// id: qyh4_c08
{
  id: "qyh4_c08",
  speaker: "doctor",
  text: "「替别人活」——这是最深的一句。他把自己的人生，当成了父亲标准下的答卷。",
  choices: [
    { id: "qyh4_c08_a", text: "「你替你爸活了一份『完美』，替你妈活了一份『出息』。你自己的那一份，有人替你活过吗？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "qyh4_p09" },
    { id: "qyh4_c08_b", text: "「你替别人活了三十八年。今天，能不能替你七岁那个端水的孩子，活一个钟头？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh4_p09" },
    { id: "qyh4_c08_c", text: "「人活一世，总要为父母争口气。你这不是替别人活，是懂事。」", kind: "confront", require: { trust: 50 }, effect: { trust: 1, truth: 3, mood: -2 }, next: "qyh4_p09", hint: "需要信任≥50" },
  ],
}
```

```ts-dialog
// id: qyh4_p09
{
  id: "qyh4_p09",
  speaker: "patient",
  text: "（他摇头）……没人替我活过。我连‘替自己活’长什么样，都没见过。我只见过‘够好’长什么样：手术成功、病人痊愈、我爸点头。可现在，我连‘够好’都做不到最后一个了。我救不回周航。",
  emotion: "broken",
  autoNext: "qyh4_c09",
}
```

```ts-dialog
// id: qyh4_c09
{
  id: "qyh4_c09",
  speaker: "doctor",
  text: "「我连『够好』都做不到了」——他把周航，当成了衡量自己全部价值的最后一关。",
  choices: [
    { id: "qyh4_c09_a", text: "「你把周航放到了『够不够好』的天平上。可他从来不是用来称你的砝码。他是一条命，你尽力了。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh4_p10" },
    { id: "qyh4_c09_b", text: "「你不是做不到『够好』。你是从来没被允许，承认自己『尽力了』就够了。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh4_p10" },
  ],
}
```

```ts-dialog
// id: qyh4_p10
{
  id: "qyh4_p10",
  speaker: "patient",
  text: "（他低着头，很久）……医生，我今晚回去，想干一件事：给我爸打个电话，问他一句……问他一句『爸，你年轻时，有没有救不活过一个人』。我打了几次，都没拨出去。我怕他答『没有』。他要是说没有，我这辈子就真的，没处去了。",
  emotion: "scared",
  autoNext: "qyh4_c10",
}
```

```ts-dialog
// id: qyh4_c10
{
  id: "qyh4_c10",
  speaker: "doctor",
  text: "他站在那个电话前，站了很久。那一句问不出口的话，是他整场最想要的一个答案。",
  choices: [
    { id: "qyh4_c10_a", text: "「你怕他答『没有』。可你有没有想过，他也许答的是『有过』——只是从没人问过他。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh4_p11" },
    { id: "qyh4_c10_b", text: "「这一句，你问不出口，是因为你还没准备好听见任何一个答案。那就先不问。先准备好自己。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "qyh4_p11" },
  ],
}
```

```ts-dialog
// id: qyh4_p11
{
  id: "qyh4_p11",
  speaker: "patient",
  text: "……准备自己。怎么准备？我这辈子都在准备考试，准备手术，准备应付我爸。我从来没准备过……准备过一个『就算他说有过，我也能接住』的自己。",
  emotion: "neutral",
  autoNext: "qyh4_c11",
}
```

```ts-dialog
// id: qyh4_c11
{
  id: "qyh4_c11",
  speaker: "doctor",
  text: "「准备一个能接住的自己」——他第一次，把目标从『不让他失望』换成了『接住自己』。",
  choices: [
    { id: "qyh4_c11_a", text: "「那个『接得住』的自己，其实一直都在——你接住了周航的家属，接住了值班室里每一晚。只是你从不接自己。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh4_p12" },
    { id: "qyh4_c11_b", text: "「你说你从不接自己——那从今天起，先接住一件事：你问出口的那句『爸你救不活过吗』，无论答案是什么，你都可以继续当医生。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh4_p12" },
  ],
}
```

```ts-dialog
// id: qyh4_p12
{
  id: "qyh4_p12",
  speaker: "patient",
  text: "（他重复了一遍，声音发抖）……无论答案是什么，我都可以继续当医生。……这句话，我从来不敢说。我怕一说，就是在给我自己开脱。可您说出来，我忽然觉得，它不是开脱，它是……它是把我从绳子上解下来。",
  emotion: "calm",
  autoNext: "qyh4_c12",
}
```

```ts-dialog
// id: qyh4_c12
{
  id: "qyh4_c12",
  speaker: "doctor",
  text: "「把我从绳子上解下来」——那是他心里的那根绳：『救不活 = 不够格 = 不配』。",
  choices: [
    { id: "qyh4_c12_a", text: "「那根绳，是别人系上去的。今天你伸手，把它松了一扣。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh4_p13" },
    { id: "qyh4_c12_b", text: "「解开那根绳，不等于你放弃救人。是你不再用『救不活』来鞭自己。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh4_p13" },
  ],
}
```

```ts-dialog
// id: qyh4_p13
{
  id: "qyh4_p13",
  speaker: "patient",
  text: "（他握了握拳，又松开）……医生，我今晚，想真的把那通电话打出去。不是问我爸那个问题。我想问他一句别的：『爸，你吃饭了吗。』我好像，很多年没这么问过他了。",
  emotion: "calm",
  autoNext: "qyh4_c13",
}
```

```ts-dialog
// id: qyh4_c13
{
  id: "qyh4_c13",
  speaker: "doctor",
  text: "「爸，你吃饭了吗」——一句最普通的话，是他三十年来，头一次愿意跟父亲之间，放下那把尺子。",
  choices: [
    { id: "qyh4_c13_a", text: "「好。就问他吃饭了吗。先把尺子放下来，再决定要不要问那个问题。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh4_p14" },
    { id: "qyh4_c13_b", text: "「问出这句话的时候，你已经不是那把『磨利的刀』了。你是他儿子。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh4_p14" },
  ],
}
```

```ts-dialog
// id: qyh4_p14
{
  id: "qyh4_p14",
  speaker: "patient",
  text: "（他笑了笑，那笑很轻，像很久没用了）……嗯。我今晚就打。医生，我这一周，心里那碗水，好像真的洒出去了一些。洒了也好，反正端着那么满，我也没喝过一口。",
  emotion: "calm",
  autoNext: "qyh4_c14",
}
```

```ts-dialog
// id: qyh4_c14
{
  id: "qyh4_c14",
  speaker: "doctor",
  text: "「洒了也好，反正没喝过一口」——他开始拿那碗水，开了自己一个玩笑。那是三十年来头一回。",
  choices: [
    { id: "qyh4_c14_a", text: "「你都会跟那碗水开玩笑了。这是个好兆头。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh4_p15" },
    { id: "qyh4_c14_b", text: "「那碗水洒了，你还有手。你那双手，除了端水，还能做很多事。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh4_p15" },
  ],
}
```

```ts-dialog
// id: qyh4_p15
{
  id: "qyh4_p15",
  speaker: "patient",
  text: "（他低头看自己的手，又抬头看你）……还能救人。手抖也救。医生，我最近在试着，手抖着，也把针扎下去。第一次抖着扎进去的时候，我愣了半天——原来我抖着，也能救人。",
  emotion: "calm",
  autoNext: "qyh4_c15",
}
```

```ts-dialog
// id: qyh4_c15
{
  id: "qyh4_c15",
  speaker: "doctor",
  text: "「手抖着，也能救人」——他亲手推翻了自己最大的那个神话。",
  choices: [
    { id: "qyh4_c15_a", text: "「『手不能抖』不是当医生的前提。是『心里装着病人』才是。你装了半辈子了。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh4_p16" },
    { id: "qyh4_c15_b", text: "「你抖着扎进去的那一针，是在告诉你：你可以带着怕，继续做你的医生。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh4_p16" },
  ],
}
```

```ts-dialog
// id: qyh4_p16
{
  id: "qyh4_p16",
  speaker: "patient",
  text: "（他沉默了一会儿）……医生，我想改天，带我爸来这儿一趟。不是让他看病，是……是我想在您这儿，跟他说点我从小不敢说的话。您，您能不能陪着我？",
  emotion: "anxious",
  autoNext: "qyh4_c16",
}
```

```ts-dialog
// id: qyh4_c16
{
  id: "qyh4_c16",
  speaker: "doctor",
  text: "他第一次主动要一个人陪着，去面对父亲。",
  choices: [
    { id: "qyh4_c16_a", text: "「能。你愿意带他来，我就在这儿。你想说什么，我陪你说。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "qyh4_p17" },
    { id: "qyh4_c16_b", text: "「你要跟他说的话，可以先跟我说一遍吗？——不是替他答，是帮你自己，先把它说出来。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh4_p17" },
  ],
}
```

```ts-dialog
// id: qyh4_p17
{
  id: "qyh4_p17",
  speaker: "patient",
  text: "（他深吸一口气）……行。我想跟他说：爸，我不是你的刀。我是你儿子。我也许做不到你那样，可我……我是你儿子，这就够了。……我练了好多遍，一说出来，眼泪就下来了。",
  emotion: "broken",
  autoNext: "qyh4_c17",
}
```

```ts-dialog
// id: qyh4_c17
{
  id: "qyh4_c17",
  speaker: "doctor",
  text: "「我是你儿子，这就够了」——他等了三十八年，才等到自己敢说这句话。",
  choices: [
    { id: "qyh4_c17_a", text: "「『我是你儿子，这就够了』——这句话，值得你先对自己说一遍。你够格，从来不是因为够好。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh4_p18" },
    { id: "qyh4_c17_b", text: "「眼泪下来，是因为这话是真的。真话，才让人哭。」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "qyh4_p18" },
  ],
}
```

```ts-dialog
// id: qyh4_p18
{
  id: "qyh4_p18",
  speaker: "patient",
  text: "（他说完那句话，沉默了一会儿，手不再绞着）……医生，我今天把这句话说出来了，胸口居然松了一截。我以前觉得，说这些话是撒娇，是不懂事。原来说出来，是给自己松绑。",
  emotion: "calm",
  autoNext: "qyh4_c18",
}
```

```ts-dialog
// id: qyh4_c18
{
  id: "qyh4_c18",
  speaker: "doctor",
  text: "「给自己松绑」——你自己伸手，解开了那根系了三十八年的绳。",
  choices: [
    { id: "qyh4_c18_a", text: "「你不是不懂事。你是太懂事了，懂事到忘了自己也需要人接住。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "qyh4_out" },
    { id: "qyh4_c18_b", text: "「『松绑』这个动作，你以前有没有对别人做过？」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "qyh4_out" },
  ],
}
```

```ts-dialog
// id: qyh4_out
{
  id: "qyh4_out",
  speaker: "narration",
  text: "他站起身，把父亲那张旧照片小心地收进口袋。走到门口，他回头，声音很稳：「医生，下周我带他来。不管他怎么说，我都要把这句话说完。」他走了。你看了一眼窗外，天快黑了。那个扛着一整段童年的人，第一次，想把它放下来。",
  beatEnd: { resumeNode: "qyh5_start" },
  autoNext: "qyh5_start",
}
```

---

### 节拍 5 · 高潮·「我救不了他」（trust 75→80，truth 65→90〔m3 触发〕，恶化入口 c09）

> **节奏变化**：本节拍 trust 几乎不再涨（净 +5，75→80）——他的问题不是不信任你，而是「不信任自己」。情感与真相（truth 65→90，m3 七岁·握住手）是本位。80 同时是节拍 6 隐藏结局的验收线。

```ts-dialog
// id: qyh5_start
{
  id: "qyh5_start",
  speaker: "narration",
  text: "他又比预约早到了。站在门口，手插在兜里，人瘦了一圈。你没叫他，他站了一会儿，自己走进来，坐下，很久没开口。兜里那双手，十指绞在一起。",
  autoNext: "qyh5_p01",
}
```

```ts-dialog
// id: qyh5_p01
{
  id: "qyh5_p01",
  speaker: "patient",
  text: "……医生，我没带我爸来。他……他先来了。他昨晚到了我这儿，说是出差路过，来看我一眼。他看见我手抖了。他什么都没说，就在客厅坐了一晚上。我一句话都不敢跟他说。",
  emotion: "scared",
  autoNext: "qyh5_c01",
}
```

```ts-dialog
// id: qyh5_c01
{
  id: "qyh5_c01",
  speaker: "doctor",
  text: "「他先来了」——你等了三十八年的父亲，自己走进了你的客厅。",
  choices: [
    { id: "qyh5_c01_a", text: "「他看见你手抖，一句话没说——你心里那一刻，是怕，还是也在等他说点什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh5_p02" },
    { id: "qyh5_c01_b", text: "「他坐了一晚上，你也坐了一晚上。你们俩，谁都没敢先开口。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh5_p02" },
  ],
}
```

```ts-dialog
// id: qyh5_p02
{
  id: "qyh5_p02",
  speaker: "patient",
  text: "……都有。我怕他开口说『你的手怎么回事』，我又怕他一直不说话。我躲进厨房给他倒水，倒水的时候，手抖得水都洒了。我端着那杯水站在厨房门口，站了很久，不敢出去。我忽然觉得，那杯水，跟我七岁那碗水，一模一样。",
  emotion: "broken",
  autoNext: "qyh5_c02",
}
```

```ts-dialog
// id: qyh5_c02
{
  id: "qyh5_c02",
  speaker: "doctor",
  text: "「跟七岁那碗水，一模一样」——三十年，他把自己困在了同一幕里。",
  choices: [
    { id: "qyh5_c02_a", text: "「三十年了，你还在端那碗水。可这次，端水的人已经不是那个七岁的孩子了。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh5_p03" },
    { id: "qyh5_c02_b", text: "「你端着那杯水不敢出去——你在怕的，是让父亲看见你『不够好』，还是怕他心疼你？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh5_p03" },
  ],
}
```

```ts-dialog
// id: qyh5_p03
{
  id: "qyh5_p03",
  speaker: "patient",
  text: "（他愣住）……怕他心疼我。他从没心疼过我，我不会应付。他要是心疼我，我可能会……可能会当场哭出来。我在他面前，从来没哭过。",
  emotion: "broken",
  autoNext: "qyh5_c03",
}
```

```ts-dialog
// id: qyh5_c03
{
  id: "qyh5_c03",
  speaker: "doctor",
  text: "「我在他面前，从来没哭过」——他把『在他面前不哭』，守成了三十八年的规矩。",
  choices: [
    { id: "qyh5_c03_a", text: "「那条『不哭』的规矩，是他立的，还是你替他立的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh5_p04" },
    { id: "qyh5_c03_b", text: "「在他面前哭，会怎么样？你有没有想过，也许他等你哭，等了很久了。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh5_p04" },
  ],
}
```

```ts-dialog
// id: qyh5_p04
{
  id: "qyh5_p04",
  speaker: "patient",
  text: "（他沉默了很久）……我端着那杯水，最后还是出去了。我把水放在他面前。他抬头看我，第一次，认认真真地看了我一眼。然后他开口了。他问的不是我的手。他问的是……他问：『那个没救回来的孩子，多大了？』",
  emotion: "scared",
  autoNext: "qyh5_c04",
}
```

```ts-dialog
// id: qyh5_c04
{
  id: "qyh5_c04",
  speaker: "doctor",
  text: "「他没问你的手，他问了那个孩子」——你等了一晚上的那句对话，以这种方式开了头。",
  choices: [
    { id: "qyh5_c04_a", text: "「你爸第一句问的是那个孩子——你听了这句话，心里什么感觉？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh5_p05" },
    { id: "qyh5_c04_b", text: "「他记住的，不是你抖不抖，是你救过的人。这跟你以为的那个父亲，不一样了。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh5_p05" },
  ],
}
```

```ts-dialog
// id: qyh5_p05
{
  id: "qyh5_p05",
  speaker: "patient",
  text: "……我说，二十四。他点了点头。我以为他会说『那你尽力了』或者『你不够好』。他什么都没说。他就坐在那儿，看着我。我忽然发现，我爸老了。他的头发白了，手背上全是皱纹。那把『一把刀』，老了。",
  emotion: "sad",
  autoNext: "qyh5_c05",
}
```

```ts-dialog
// id: qyh5_c05
{
  id: "qyh5_c05",
  speaker: "doctor",
  text: "「那把一把刀，老了」——他第一次看见父亲的衰老，也第一次看见父亲是一个人。",
  choices: [
    { id: "qyh5_c05_a", text: "「你爸老了，你才发现他也是个人——不是那把刀，是个人。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh5_p06" },
    { id: "qyh5_c05_b", text: "「看着父亲老了，你心里除了难过，是不是也有一点点松——他也扛不动了，你也就不用一个人扛了？」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "qyh5_p06" },
  ],
}
```

```ts-dialog
// id: qyh5_p06
{
  id: "qyh5_p06",
  speaker: "patient",
  text: "（他声音发抖）……然后他开口了。他说：『我年轻时，也救不活过一个。』……医生，您知道吗，他说这句话的时候，没有叹气，没有解释，就那么平平地说了一句。我愣在那儿，血都凉了。我爸，那个『从来没人从他手里救不回来』的我爸，他救不活过。",
  emotion: "broken",
  autoNext: "qyh5_c06",
}
```

```ts-dialog
// id: qyh5_c06
{
  id: "qyh5_c06",
  speaker: "doctor",
  text: "那个永远完美的父亲，第一次在你儿子面前，承认了自己也有失败。这是你整场最重要的一个瞬间。",
  choices: [
    { id: "qyh5_c06_a", text: "「你爸那句话，把你三十八年来立的那堵墙，凿开了一个洞。血凉了，墙也裂了。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "qyh5_p07" },
    { id: "qyh5_c06_b", text: "「他救不活过——可他依然是名医。这两件事，从来没矛盾过。」", kind: "probe", effect: { trust: 1, truth: 3 }, next: "qyh5_p07" },
    { id: "qyh5_c06_c", text: "「他救不活过，是因为他水平不行。你可不能学他，你得更稳。」", kind: "logic", effect: { trust: -10, defense: 8, mood: -3 }, next: "qyh5_r01" },
  ],
}
```

```ts-dialog
// id: qyh5_r01
{
  id: "qyh5_r01",
  speaker: "patient",
  text: "（他猛地抬头，眼眶通红）……您说什么？水平不行？我爸是外省一把刀，你说他水平不行？……不，他不是水平不行。他是个人。是人就有救不回来的时候。您懂不懂，他那一句，比我这三十八年任何一句夸都重。您却说他水平不行。",
  emotion: "angry",
  autoNext: "qyh5_p07",
}
```

```ts-dialog
// id: qyh5_p07
{
  id: "qyh5_p07",
  speaker: "patient",
  text: "（他捂住脸，哭了出来，压着声音）……我问他，那您当时，怎么办。他说：『该吃饭吃饭，该值班值班。救不回来的，记在心里，接着救下一个。』他说完，看了我一眼：『你不是那把刀。你是我儿子。够了。』……他这辈子，就这一次，对我说了这么多话。",
  emotion: "broken",
  autoNext: "qyh5_c07",
}
```

```ts-dialog
// id: qyh5_c07
{
  id: "qyh5_c07",
  speaker: "doctor",
  text: "「你不是那把刀。你是我儿子。够了。」——你等了三十八年的那句话，你爸替你补上了。",
  choices: [
    { id: "qyh5_c07_a", text: "「他把那句话给你了。你守了三十八年的『够不够格』，他替你揭了榜：够，从来都够。」", kind: "probe", effect: { trust: 1, truth: 3 }, next: "qyh5_p08" },
    { id: "qyh5_c07_b", text: "「他先说的是『救不回来怎么办』，后说的是『你够了』。他这辈子的两句真话，今晚都给你了。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "qyh5_p08" },
  ],
}
```

```ts-dialog
// id: qyh5_p08
{
  id: "qyh5_p08",
  speaker: "patient",
  text: "（他擦掉眼泪，又笑了，很苦）……我哭完，我爸没走。他坐了一夜，我坐了一夜。天亮的时候，他起来，说了句：『我回去了，你好好休息。』他走到门口，回头看了我一眼，又说了一句——他说：『你手抖，不丢人。』",
  emotion: "broken",
  autoNext: "qyh5_c08",
}
```

```ts-dialog
// id: qyh5_c08
{
  id: "qyh5_c08",
  speaker: "doctor",
  text: "「你手抖，不丢人」——父亲这辈子，终于用那句话，接住了儿子七岁那碗水。",
  choices: [
    { id: "qyh5_c08_a", text: "「他接住你了。你七岁那碗水，今天终于有人帮你接住了。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh5_p09" },
    { id: "qyh5_c08_b", text: "「他这句话，你等了三十八年。现在它在了，你想拿它怎么办？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh5_p09" },
  ],
}
```

```ts-dialog
// id: qyh5_p09
{
  id: "qyh5_p09",
  speaker: "patient",
  text: "（他摇头）……医生，我接不住。我爸那么好的一句话，我接不住。他说完就走了，我站在门口，手还是抖的。我忽然明白，我等了三十八年的不是这句话，是……是我敢不敢信『我尽力了也救不回来』。他给了我一扇门，我不敢进。",
  emotion: "scared",
  autoNext: "qyh5_c09",
}
```

```ts-dialog
// id: qyh5_c09
{
  id: "qyh5_c09",
  speaker: "doctor",
  text: "「他给了我一扇门，我不敢进」——你站到了那扇门前。往后退，你还有一条回去的路。",
  choices: [
    { id: "qyh5_c09_a", text: "「你不是不敢进。你是从没学过『不用做到最好，也可以被爱』。这门里没有考试，只有你爸说的那句『够了』。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "qyh5_p10" },
    { id: "qyh5_c09_b", text: "「你怕的不是进去。是进去之后，你还能不能『手不抖地』站在手术台前——可你早就知道了，你抖着，也能救人。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh5_p10" },
    { id: "qyh5_c09_c", text: "「你是医生，值班排着你。别想这些了，回去上班，忙起来就好了。」", kind: "logic", require: { trustAtMost: 70 }, effect: { trust: -15, mood: -8, defense: 10 }, next: "qyh5w_p01", hint: "仅信任≤70 时可见" },
  ],
}
```

```ts-dialog
// id: qyh5w_p01
{
  id: "qyh5w_p01",
  speaker: "patient",
  text: "（他愣了一下，把手里那张还没出口的话咽了回去）……您说得对。忙起来就好了。我就是想太多了。当医生的，哪个没救不回来过人。您忙吧，我回去上班。",
  emotion: "neutral",
  autoNext: "qyh5w_c01",
}
```

```ts-dialog
// id: qyh5w_c01
{
  id: "qyh5w_c01",
  speaker: "doctor",
  text: "他把那句「我不敢进」收了回去，换回了那件洗得发白的白大褂。你本可以拦住他。",
  choices: [
    { id: "qyh5w_c01_a", text: "「也是，急诊离不开你。回去忙吧，忙起来就好了。」", kind: "logic", effect: { trust: -10, mood: -5 }, next: "qyh5w_p02" },
    { id: "qyh5w_c01_b", text: "「你爸那句话，你还想接吗？」", kind: "empathy", effect: { trust: -5, mood: -3 }, next: "qyh5w_p02" },
  ],
}
```

```ts-dialog
// id: qyh5w_p02
{
  id: "qyh5w_p02",
  speaker: "patient",
  text: "（他笑了笑，那笑没到眼底）……接不接的，算了。都这把年纪了，还接什么。医生，我先走了。改天，我可能不来了——值班忙。有事我给您打电话。",
  emotion: "neutral",
  autoNext: "qyh5w_c02",
}
```

```ts-dialog
// id: qyh5w_c02
{
  id: "qyh5w_c02",
  speaker: "doctor",
  text: "他站起来，像是又回到了那个「流程没问题」的主治医师。你看着他，知道那扇门，他自己合上了。",
  choices: [
    { id: "qyh5w_c02_a", text: "「值班再忙，也给自己留个口子。有事，随时来。」", kind: "empathy", effect: { trust: -5, mood: -3 }, next: "qyh5w_out" },
    { id: "qyh5w_c02_b", text: "「好，忙起来就好了。回去吧。」", kind: "logic", effect: { trust: -10, mood: -5 }, next: "qyh5w_out" },
  ],
}
```

```ts-dialog
// id: qyh5w_out
{
  id: "qyh5w_out",
  speaker: "narration",
  text: "他走了。走到门口，他顿了顿，像是在等你说句什么。你没说。他推开门，走进走廊里，白大褂的下摆被风掀了一下——像那把焊死了的刀，又插回了鞘里。",
  autoNext: "qyh_end_worsen",
}
```

```ts-dialog
// id: qyh5_p10
{
  id: "qyh5_p10",
  speaker: "patient",
  text: "（他哭了很久，最后说）……医生，我这辈子，活的就是那句『手不能抖』。我把它活成了我全部的骨头。现在我爸告诉我，我抖着，也能当医生。我信他。可我不敢信我。我是不是……很没用？",
  emotion: "broken",
  autoNext: "qyh5_c10",
}
```

```ts-dialog
// id: qyh5_c10
{
  id: "qyh5_c10",
  speaker: "doctor",
  text: "「我信他，可我不敢信我」——你爸的那句话，还在半路上，需要你亲手去接。",
  choices: [
    { id: "qyh5_c10_a", text: "「你不是没用。你是三十八年都活在『够不够格』的考场上，从没学过交卷之后怎么办。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh5_p11" },
    { id: "qyh5_c10_b", text: "「『不敢信我』——你要不要试试，把『我信他』和『我信我』这两句，放在一起念一遍？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh5_p11" },
  ],
}
```

```ts-dialog
// id: qyh5_p11
{
  id: "qyh5_p11",
  speaker: "patient",
  text: "（他吸了吸鼻子）……我信他，我信我。……念完，好像没那么难。医生，我好像，第一次有点信了——我不是那把刀，我是个人。人会抖，人会救不回来，人也会……在救不回来之后，接着活下去。",
  emotion: "calm",
  autoNext: "qyh5_c11",
}
```

```ts-dialog
// id: qyh5_c11
{
  id: "qyh5_c11",
  speaker: "doctor",
  text: "「救不回来之后，接着活下去」——这是你三十八年来，给自己开的第一道闸。",
  choices: [
    { id: "qyh5_c11_a", text: "「你会接着活下去的。救不回来的记在心里，接着救下一个——你爸是这么活的，你也可以。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh5_p12" },
    { id: "qyh5_c11_b", text: "「你说『接着活下去』——那是周航活着的时候，你答应过自己要做的那种医生吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh5_p12" },
  ],
}
```

```ts-dialog
// id: qyh5_p12
{
  id: "qyh5_p12",
  speaker: "patient",
  text: "（他沉默了很久）……医生，我想去给周航，上柱香。我一直没敢去。我怕我一去，就得承认他真没了。现在我想去了。我想跟他说，你走那天，我尽力了。我不是万能的，可你那条命，我当真过。",
  emotion: "sad",
  autoNext: "qyh5_c12",
}
```

```ts-dialog
// id: qyh5_c12
{
  id: "qyh5_c12",
  speaker: "doctor",
  text: "「我不是万能的，可你那条命，我当真过」——你能对周航说出这句话，那台抢救，才算真正落幕。",
  choices: [
    { id: "qyh5_c12_a", text: "「去吧。跟他说『我尽力了』——这句你从没说出口的话，他等得起。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh5_p13" },
    { id: "qyh5_c12_b", text: "「『我当真过』——你终于把他当成了一个人，而不是一道没答对的题。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh5_p13" },
  ],
}
```

```ts-dialog
// id: qyh5_p13
{
  id: "qyh5_p13",
  speaker: "patient",
  text: "（他点头）……嗯。医生，我改天，还想去值班。不是逞强，是我发现，我手抖着，也能接病人。我想去，因为我是医生。不是因为要证明给谁看。",
  emotion: "calm",
  autoNext: "qyh5_c13",
}
```

```ts-dialog
// id: qyh5_c13
{
  id: "qyh5_c13",
  speaker: "doctor",
  text: "「想值班，是因为我是医生，不是证明给谁看」——你第一次，为自己的选择，而不是为别人的标准。",
  choices: [
    { id: "qyh5_c13_a", text: "「这句话，是你爸那句『够了』，在你心里生了根。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh5_p14" },
    { id: "qyh5_c13_b", text: "「你值班十年，头一回是为了自己去的。这感觉，跟以前不一样在哪？」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "qyh5_p14" },
  ],
}
```

```ts-dialog
// id: qyh5_p14
{
  id: "qyh5_p14",
  speaker: "patient",
  text: "……以前值班，我上抢救台之前，都会在心里念一句『手不能抖，不能出错』。这周我试了，我改念别的了。我念的是——『尽力就行』。念完，我手居然没那么抖了。",
  emotion: "calm",
  autoNext: "qyh5_c14",
}
```

```ts-dialog
// id: qyh5_c14
{
  id: "qyh5_c14",
  speaker: "doctor",
  text: "「念『尽力就行』，手反而不抖了」——你不是输给了手，是输给了那句念了三十八年的咒语。",
  choices: [
    { id: "qyh5_c14_a", text: "「那句咒语，你已经念了三十八年。现在你换了一句话，手就稳了——可见抖的从来不是手，是那句咒语的分量。」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "qyh5_p15" },
    { id: "qyh5_c14_b", text: "「你能给自己换一句咒语了。这个能力，是你这一个月里，长出来的最硬的东西。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "qyh5_p15" },
  ],
}
```

```ts-dialog
// id: qyh5_p15
{
  id: "qyh5_p15",
  speaker: "patient",
  text: "（他轻轻笑了一下）……医生，我好像，没那么怕了。不是不怕了，是没那么怕了。以前我怕手抖，怕救不回来，怕我爸失望。现在我知道，手抖了能救人，救不回来也尽力了，我爸……我爸会接住我。",
  emotion: "calm",
  autoNext: "qyh5_c15",
}
```

```ts-dialog
// id: qyh5_c15
{
  id: "qyh5_c15",
  speaker: "doctor",
  text: "「我爸会接住我」——你用了三十八年，才敢信这句话。",
  choices: [
    { id: "qyh5_c15_a", text: "「会有人接住你。你爸会，我也会。你以后，不用一个人端那碗水了。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "qyh5_p16" },
    { id: "qyh5_c15_b", text: "「你从『怕他失望』，走到了『他会接住我』。这一路，你走完了。」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "qyh5_p16" },
  ],
}
```

```ts-dialog
// id: qyh5_p16
{
  id: "qyh5_p16",
  speaker: "patient",
  text: "（他站起来，走到门口，又回头）……医生，改天，我带我老婆一起来，行吗？我想让她也听听，我这阵子都经历了什么。她只知道我手抖，不知道我端了三十八年水。我欠她一句解释。",
  emotion: "calm",
  autoNext: "qyh5_out",
}
```

```ts-dialog
// id: qyh5_out
{
  id: "qyh5_out",
  speaker: "narration",
  text: "那天他走的时候，在门口站了很久。你看见他抬起手，像是要看自己的手，又慢慢放了下来。他没回头，说：「医生，我今晚，去给周航上柱香。」他走了。你发现他坐过的沙发上，有一串握拳松开后的印子——那是他把三十八年的紧，松开了。",
  beatEnd: { resumeNode: "qyh6_start" },
  autoNext: "qyh6_start",
}
```

---

### 节拍 6 · 转向+结局·「好医生也是会被现实击穿的人」（trust 80→88，truth 90→100）

```ts-dialog
// id: qyh6_start
{
  id: "qyh6_start",
  speaker: "narration",
  text: "几天后他来了，带着他老婆。他老婆坐在旁边，眼睛红红的，像是刚哭过。他说他老婆听完他这阵子的事，说了句『你怎么不早说』。他坐下，看着你，很平静地说了一句话。",
  autoNext: "qyh6_p01",
}
```

```ts-dialog
// id: qyh6_p01
{
  id: "qyh6_p01",
  speaker: "patient",
  text: "（他看了一眼身边的老婆，又看回你）……医生，我想好了。我以前总觉得，好医生就是手不抖、心不软、什么都能救回来。现在我明白了——好医生，也是会被现实击穿的人。我决定，接着当医生，可我不再逼自己当神了。",
  emotion: "calm",
  autoNext: "qyh6_fork",
}
```

```ts-dialog
// id: qyh6_fork
{
  id: "qyh6_fork",
  speaker: "doctor",
  text: "你等到了这句话。他不再是「怕辜负的那把刀」，而是一个决定带着裂缝继续行医的人。走到这里，他需要选一条路往下走。",
  choices: [
    { id: "qyh6_fork_a", text: "「好。那我们从这儿出发：搭一张『接住自己』的网——值班扛不住时能找的人、能说的话、能停下的信号。让你不再一个人端那碗水。」", kind: "special", effect: { trust: 0, mood: 2 }, next: "qyh6s_p01" },
    { id: "qyh6_fork_b", text: "「你不逼自己当神，而是带着『会怕、会抖、会救不回来』继续当医生——这本身就是一种答案。不用再多了。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh6a_p01" },
    { id: "qyh6_fork_c", text: "「你现在的状态还不稳，我得联系你们科室和医务科，给你安排系统评估和强制休假——你同意，我这就去办。」", kind: "confront", require: { trust: 80 }, effect: { trust: 1, truth: 2, mood: -2 }, next: "qyh6h_p01", hint: "需要信任≥80" },
  ],
}
```

#### 安全网路径（cure 主线，~19 轮）

```ts-dialog
// id: qyh6s_p01
{
  id: "qyh6s_p01",
  speaker: "patient",
  text: "（他低头想了想）……「接住自己」的网？我以前值班，扛不住也是自己扛，怕别人说我矫情。我老婆以前都不知道。现在她知道了。她说她以前问我手怎么抖，我说累的，她就信了——她信得我心里发虚。",
  emotion: "neutral",
  autoNext: "qyh6s_c01",
}
```

```ts-dialog
// id: qyh6s_c01
{
  id: "qyh6s_c01",
  speaker: "doctor",
  text: "「她信我心里发虚」——你第一次发现，隐瞒也是一种辜负。",
  choices: [
    { id: "qyh6s_c01_a", text: "「你老婆信你，你却发虚——现在她知道了，你那句『发虚』，可以换成『踏实』了。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh6s_p02" },
    { id: "qyh6s_c01_b", text: "「你这张网里，第一根线想放谁？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh6s_p02" },
  ],
}
```

```ts-dialog
// id: qyh6s_p02
{
  id: "qyh6s_p02",
  speaker: "patient",
  text: "……第一根线，放我老婆。我以前觉得，跟她说这些是给她添堵。现在我想通了，她是我家人，我扛不住的时候，她有权知道，也有权接我一把。她今天陪我来了，就是来接我的。",
  emotion: "calm",
  autoNext: "qyh6s_c02",
}
```

```ts-dialog
// id: qyh6s_c02
{
  id: "qyh6s_c02",
  speaker: "doctor",
  text: "「她有权接我一把」——你允许自己被人接住了。这是三十八年来，你给自己的头一回。",
  choices: [
    { id: "qyh6s_c02_a", text: "「这第一根线，你系得很对。接着往下搭——值班扛不住的时候，你还能找谁？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh6s_p03" },
    { id: "qyh6s_c02_b", text: "「你老婆『有权接我一把』——这句话，以前要是让你说，你会觉得是什么？」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "qyh6s_p03" },
  ],
}
```

```ts-dialog
// id: qyh6s_p03
{
  id: "qyh6s_p03",
  speaker: "patient",
  text: "（他想了想）……第二根线，放老张。我们科室主任，嘴笨，可他是第一个看出我出事的人。他押我来看病那天，我怕他觉得我矫情。现在我懂了，他那不是押我，是拉我一把。我欠他一句谢。",
  emotion: "neutral",
  autoNext: "qyh6s_c03",
}
```

```ts-dialog
// id: qyh6s_c03
{
  id: "qyh6s_c03",
  speaker: "doctor",
  text: "「他那不是押我，是拉我一把」——你开始重新读那些你以为的「冷眼」了。",
  choices: [
    { id: "qyh6s_c03_a", text: "「老张拉你那一把，你接住了。这张网的第三根线，你想放谁？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh6s_p04" },
    { id: "qyh6s_c03_b", text: "「你重新读懂了老张，也在重新读自己——以前那些『别人在笑话我』的念头，是不是也值得重新读一遍？」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "qyh6s_p04" },
  ],
}
```

```ts-dialog
// id: qyh6s_p04
{
  id: "qyh6s_p04",
  speaker: "patient",
  text: "……第三根线，放周航。不是让我一直记着他压着我，是让我记着，他是我救过的一条命。我上香那天，站在那儿，跟他说了句『我尽力了』。说完我就哭了。哭完，我忽然轻了。",
  emotion: "sad",
  autoNext: "qyh6s_c04",
}
```

```ts-dialog
// id: qyh6s_c04
{
  id: "qyh6s_c04",
  speaker: "doctor",
  text: "「放周航」——你把最重的那个人，也编进了你的网里，而不是让他继续压着你。",
  choices: [
    { id: "qyh6s_c04_a", text: "「周航不在你心里当债了，他开始当一盏灯。这是你能给他最好的告别。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh6s_p05" },
    { id: "qyh6s_c04_b", text: "「你跟周航说了『我尽力了』——你终于把这句话，给了自己也给了他。」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "qyh6s_p05" },
  ],
}
```

```ts-dialog
// id: qyh6s_p05
{
  id: "qyh6s_p05",
  speaker: "patient",
  text: "（他顿了顿）……第四根线，我想放一句话。以前我上抢救台，念的是『手不能抖』。现在我念『尽力就行』。可我还想再念一句——『你救不回来，也配当医生』。这句，我想念给那个还在怕的自己听。",
  emotion: "calm",
  autoNext: "qyh6s_c05",
}
```

```ts-dialog
// id: qyh6s_c05
{
  id: "qyh6s_c05",
  speaker: "doctor",
  text: "「你救不回来，也配当医生」——你把那句最狠的判词，反过来写成了护身符。",
  choices: [
    { id: "qyh6s_c05_a", text: "「这句护身符，你念出来的时候，手抖不抖？」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "qyh6s_p06" },
    { id: "qyh6s_c05_b", text: "「你把判词反过来念——这个动作，本身就是你长出来的新骨头。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "qyh6s_p06" },
  ],
}
```

```ts-dialog
// id: qyh6s_p06
{
  id: "qyh6s_p06",
  speaker: "patient",
  text: "（他看了看自己的手）……不抖。念这句的时候，手稳稳的。医生，我是不是可以，回值班表里去了？我不是逞强，我是想去。我想让周航知道，他走那天那个医生，没有垮，他还在救人。",
  emotion: "calm",
  autoNext: "qyh6s_c06",
}
```

```ts-dialog
// id: qyh6s_c06
{
  id: "qyh6s_c06",
  speaker: "doctor",
  text: "「他没有垮，他还在救人」——周航的最后一程，由你替他走完了。",
  choices: [
    { id: "qyh6s_c06_a", text: "「你可以回值班表。手抖着去，心里念着『尽力就行』，带着你老婆你老张这张网。你不是一个人了。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh6s_p07" },
    { id: "qyh6s_c06_b", text: "「你回去之后，第一台抢救，你会怎么上？」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "qyh6s_p07" },
  ],
}
```

```ts-dialog
// id: qyh6s_p07
{
  id: "qyh6s_p07",
  speaker: "patient",
  text: "……我会先看一眼病人的脸，记住他是谁，再动手。以前我只记诊断，不记脸。我想记住他们。哪怕救不回来，我也要记住我救过谁。",
  emotion: "calm",
  autoNext: "qyh6s_c07",
}
```

```ts-dialog
// id: qyh6s_c07
{
  id: "qyh6s_c07",
  speaker: "doctor",
  text: "「先记脸，再动手」——你从「救回所有病人」的执念里，走回了「记住每个病人」的医生。",
  choices: [
    { id: "qyh6s_c07_a", text: "「记住每一个病人——这比『万无一失』离医生更近，也离人更近。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh6s_p08" },
    { id: "qyh6s_c07_b", text: "「记脸，也记住他们叫周航还是叫别的——你终于把病人当成了有名有姓的人。」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "qyh6s_p08" },
  ],
}
```

```ts-dialog
// id: qyh6s_p08
{
  id: "qyh6s_p08",
  speaker: "patient",
  text: "（他老婆轻轻握了一下他的手，他回握了一下）……医生，我改天就开始值班。我先把过度检查停了，把以前开的那些「求心安」的单子，一张张跟病人说明白。我要做个，心里有底的医生，不做那个用单子壮胆的医生。",
  emotion: "happy",
  autoNext: "qyh6s_c08",
}
```

```ts-dialog
// id: qyh6s_c08
{
  id: "qyh6s_c08",
  speaker: "doctor",
  text: "「做个心里有底的医生」——你的底气，终于不从检查单上来了。",
  choices: [
    { id: "qyh6s_c08_a", text: "「你心里那碗水，端了三十八年。现在你把它放下，用两只手去握手术刀了。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh6s_p09" },
    { id: "qyh6s_c08_b", text: "「『心里有底』的底，是什么？你想想再告诉我。」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "qyh6s_p09" },
  ],
}
```

```ts-dialog
// id: qyh6s_p09
{
  id: "qyh6s_p09",
  speaker: "patient",
  text: "（他想了想）……底，是我信我自己。不是信我不会救不回来，是信我救不回来之后，还能站起来，接着救。这个底，是我爸那句话给的，也是这阵子，我自己一点一点踩出来的。",
  emotion: "calm",
  autoNext: "qyh6s_c09",
}
```

```ts-dialog
// id: qyh6s_c09
{
  id: "qyh6s_c09",
  speaker: "doctor",
  text: "「这个底，是你自己踩出来的」——没有人能替你走这一步。你走完了。",
  choices: [
    { id: "qyh6s_c09_a", text: "「你踩出了自己的底。这句话，配得上你端了三十八年水的那双手。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh6s_p10" },
    { id: "qyh6s_c09_b", text: "「你踩出来的这个底，接下来要托住什么？」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "qyh6s_p10" },
  ],
}
```

```ts-dialog
// id: qyh6s_p10
{
  id: "qyh6s_p10",
  speaker: "patient",
  text: "……托住我自己。还有我老婆，我女儿。我女儿今年十岁，我从来没在她面前露过怂。她现在只知道她爸是医生，救人的。我想让她知道，她爸也会怕，也会哭，也会救不回来人——可她爸还是个好医生。",
  emotion: "neutral",
  autoNext: "qyh6s_c10",
}
```

```ts-dialog
// id: qyh6s_c10
{
  id: "qyh6s_c10",
  speaker: "doctor",
  text: "「你女儿——」你把这句话停在了半空，等他自己说完。",
  choices: [
    { id: "qyh6s_c10_a", text: "「你想让她知道，你也是个人。这是你给她的，比『无所不能』更贵重的礼物。」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "qyh6s_p11" },
    { id: "qyh6s_c10_b", text: "「你会怕、会哭、也会救不回来——可你还是个好医生。这句话，你是说给你女儿听，也是说给你自己听的。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "qyh6s_p11" },
  ],
}
```

```ts-dialog
// id: qyh6s_p11
{
  id: "qyh6s_p11",
  speaker: "patient",
  text: "（他笑了一下，那笑里有泪）……医生，我女儿前几天问我，爸爸你为什么有时候手会抖。我蹲下来，跟她说：『爸爸也会怕。可爸爸会接着救人。』她摸了摸我的手，说：『爸爸，那我也接着陪你。』——她这句话，比什么都管用。",
  emotion: "happy",
  autoNext: "qyh6s_c11",
}
```

```ts-dialog
// id: qyh6s_c11
{
  id: "qyh6s_c11",
  speaker: "doctor",
  text: "「爸爸，那我也接着陪你」——你十岁的女儿，替你接住了那碗水。",
  choices: [
    { id: "qyh6s_c11_a", text: "「你女儿接住你了。你妈没接住的，你爸没接住的，她接住了。这碗水，有人跟你一起端了。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh6s_p12" },
    { id: "qyh6s_c11_b", text: "「你愿意在女儿面前露出『会怕』——你不再是那把焊死的刀了。」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "qyh6s_p12" },
  ],
}
```

```ts-dialog
// id: qyh6s_p12
{
  id: "qyh6s_p12",
  speaker: "patient",
  text: "（他擦了擦眼角，坐直了）……医生，这张网，我搭好了。我老婆一根，老张一根，周航一盏灯，一句『你救不回来也配当医生』，还有我女儿那句话。我以后值班，心里念的就是这些。",
  emotion: "calm",
  autoNext: "qyh6s_c12",
}
```

```ts-dialog
// id: qyh6s_c12
{
  id: "qyh6s_c12",
  speaker: "doctor",
  text: "「心里念的是这些」——你从念咒语，变成了念一张网。",
  choices: [
    { id: "qyh6s_c12_a", text: "「这张网，你带回去。扛不住的时候，它不是提醒你『不够好』，是提醒你『有人接着你』。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh6s_p13" },
    { id: "qyh6s_c12_b", text: "「念这些的时候，你的手，还抖吗？」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "qyh6s_p13" },
  ],
}
```

```ts-dialog
// id: qyh6s_p13
{
  id: "qyh6s_p13",
  speaker: "patient",
  text: "（他摊开手，看着它）……不抖了。不是手不抖了，是我抖着，心里也稳了。医生，我以前以为，当医生的最高境界，是手永远稳。现在我知道，最高境界是——手抖着，心里也装着病人，还接着救。",
  emotion: "calm",
  autoNext: "qyh6s_c13",
}
```

```ts-dialog
// id: qyh6s_c13
{
  id: "qyh6s_c13",
  speaker: "doctor",
  text: "「手抖着，心里装着病人，还接着救」——你把「医生」两个字，从神坛上请回了人间。",
  choices: [
    { id: "qyh6s_c13_a", text: "「这句话，你可以刻在你值班室的墙上——比『性命相托』更贴你的心。」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "qyh6s_p14" },
    { id: "qyh6s_c13_b", text: "「你把人间的医生，还给了人间。这是你给周航、给病人、也给自己最好的交代。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "qyh6s_p14" },
  ],
}
```

```ts-dialog
// id: qyh6s_p14
{
  id: "qyh6s_p14",
  speaker: "patient",
  text: "（他站起来，他老婆也站起来，他伸出手来握了握你的手）……医生，谢谢你。谢谢你没嫌我矫情，没让我『别多想』，没把我当病人——你把我当个人。这阵子，我头一回觉得，当医生救人的时候，我也是个人，不是神。",
  emotion: "happy",
  autoNext: "qyh6s_c14",
}
```

```ts-dialog
// id: qyh6s_c14
{
  id: "qyh6s_c14",
  speaker: "doctor",
  text: "「救人的人，也是人」——这句话，是你这一程，替自己挣回来的。",
  choices: [
    { id: "qyh6s_c14_a", text: "「你救过很多人，也会继续救很多人。以后你救人的时候，心里那个『怕』，不用藏起来了。」", kind: "empathy", effect: { trust: 0, mood: 3 }, next: "qyh6s_p15" },
    { id: "qyh6s_c14_b", text: "「从『手不能抖』到『心里有底』——你这一路，走得比我见过的多数人都难，也走得稳。」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "qyh6s_p15" },
  ],
}
```

```ts-dialog
// id: qyh6s_p15
{
  id: "qyh6s_p15",
  speaker: "patient",
  text: "（他和老婆一起走到门口，他忽然回头）……医生，我想问你一句。你说，好医生也是会被现实击穿的人——那被击穿之后，还能接着当医生吗？",
  emotion: "neutral",
  autoNext: "qyh6s_c15",
}
```

```ts-dialog
// id: qyh6s_c15
{
  id: "qyh6s_c15",
  speaker: "doctor",
  text: "他站在门口，问了你一个他已经用这一个月回答过的问题。",
  choices: [
    { id: "qyh6s_c15_a", text: "「能。被现实击穿的人，才会真正懂病人。你以后会是个更好的医生——不是更稳的，是更懂的。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh6s_p16" },
    { id: "qyh6s_c15_b", text: "「你已经回答了。你站在门口，手抖着，心里有底，准备回去值班——这就是答案。」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "qyh6s_p16" },
  ],
}
```

```ts-dialog
// id: qyh6s_p16
{
  id: "qyh6s_p16",
  speaker: "patient",
  text: "（他笑了，这一次笑得很稳）……能。我知道了。医生，改天起，我回值班表。我先从急诊夜班开始。老张说我疯了，我说我没疯，我是想通了。我是个人，我会怕，会抖，会救不回来——可我会接着救。",
  emotion: "happy",
  autoNext: "qyh6s_c16",
}
```

```ts-dialog
// id: qyh6s_c16
{
  id: "qyh6s_c16",
  speaker: "doctor",
  text: "「我是个人，我会怕，会抖，会救不回来——可我会接着救」——你把一生的执念，说成了一句轻描淡写的话。",
  choices: [
    { id: "qyh6s_c16_a", text: "「这句话，你收好了。它是你这三十八年里，说过最重的一句，也是最轻的一句。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "qyh6s_p17" },
    { id: "qyh6s_c16_b", text: "「你把这句话说出来了——它就不再是你的枷锁了。」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "qyh6s_p17" },
  ],
}
```

```ts-dialog
// id: qyh6s_p17
{
  id: "qyh6s_p17",
  speaker: "patient",
  text: "（他握紧他老婆的手，又松开，最后看你）……医生，改天见。我不说「我不会再怕了」，那话假。我说——「我带着怕，接着当医生」。这算不算，一个合格的医生，给另一个医生的交代？",
  emotion: "calm",
  autoNext: "qyh6s_c17",
}
```

```ts-dialog
// id: qyh6s_c17
{
  id: "qyh6s_c17",
  speaker: "doctor",
  text: "「带着怕，接着当医生」——这是两个医生之间，最诚实的一次交接。",
  choices: [
    { id: "qyh6s_c17_a", text: "「算。这句话，比『手不能抖』更像医生的誓言。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "qyh6s_out" },
    { id: "qyh6s_c17_b", text: "「你回值班表那天，我在这儿等你回来说一句『今天没垮』。」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "qyh6s_out" },
  ],
}
```

```ts-dialog
// id: qyh6s_out
{
  id: "qyh6s_out",
  speaker: "narration",
  text: "他走了。他老婆挽着他的胳膊，两个人走在走廊里。你看见他的背影，白大褂还是那件洗得发白的，可这一次，它没有收紧。走出几步，他回头，冲你摆了摆手——那只曾经抖了一整台手术的手，握得很稳。",
  autoNext: "qyh_end_cure",
}
```

#### 接纳路径（acceptance）

```ts-dialog
// id: qyh6a_p01
{
  id: "qyh6a_p01",
  speaker: "patient",
  text: "（他沉默了一会儿）……带着怕，接着当医生。医生，我不确定我能不能做到『接着当』。我试了试，心里还是堵。以前我怕的不是手抖，是怕救了也白救。这口气，我没完全咽下去。",
  emotion: "neutral",
  autoNext: "qyh6a_c01",
}
```

```ts-dialog
// id: qyh6a_c01
{
  id: "qyh6a_c01",
  speaker: "doctor",
  text: "「没完全咽下去」——你不需要立刻咽下去。咽不下去，也是一种诚实。",
  choices: [
    { id: "qyh6a_c01_a", text: "「你不用非得『接着当』。先『带着怕，活着』，也行。当不当医生，改天再想。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh6a_p02" },
    { id: "qyh6a_c01_b", text: "「『救了也白救』——这句话，你是现在这么觉得，还是从小就有人这么教过你？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh6a_p02" },
  ],
}
```

```ts-dialog
// id: qyh6a_p02
{
  id: "qyh6a_p02",
  speaker: "patient",
  text: "……没人教过我这句话。是我自己，这一个月长出来的。我救不回周航，就觉得以前救的那些人也白救了。可我知道这不公平——我以前救过的那些人，是实实在在被救回来的。我不该拿周航，把他们都抹掉。",
  emotion: "calm",
  autoNext: "qyh6a_c02",
}
```

```ts-dialog
// id: qyh6a_c02
{
  id: "qyh6a_c02",
  speaker: "doctor",
  text: "「不该拿周航，把他们都抹掉」——你开始分清：那台抢救的失败，不等于你这辈子的失败。",
  choices: [
    { id: "qyh6a_c02_a", text: "「你说得对。周航是一条命，你以前救的那些人，也是命。都不白救。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh6a_p03" },
    { id: "qyh6a_c02_b", text: "「你把它说出来了——这句『不白救』，是你自己给自己翻的案。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "qyh6a_p03" },
  ],
}
```

```ts-dialog
// id: qyh6a_p03
{
  id: "qyh6a_p03",
  speaker: "patient",
  text: "（他点头）……医生，我改天，先试着回去值一个夜班。不答应自己「一定会好」，就答应自己「去看一眼值班室的灯」。看一眼，我就回来。这也算，往前走了一步吧。",
  emotion: "calm",
  autoNext: "qyh6a_out",
}
```

```ts-dialog
// id: qyh6a_out
{
  id: "qyh6a_out",
  speaker: "narration",
  text: "他没把话说满，只答应自己「去看一眼值班室的灯」。他走的时候，手还插在兜里，可他回过头，冲你说了一句：「医生，我没垮。就是还没全好。」你看着他的背影，知道他正站在「好」和「没垮」之间，一步一步地，往人间走。",
  autoNext: "qyh_end_accept",
}
```

#### 隐藏路径（hidden · 强制介入）

```ts-dialog
// id: qyh6h_p01
{
  id: "qyh6h_p01",
  speaker: "patient",
  text: "（他猛地抬头，眼神一下乱了）……系统评估？强制休假？医生，我是急诊的主治，我一休假，夜班谁顶？我这周刚想通，正要回去值班，你让我现在撤下来？",
  emotion: "angry",
  autoNext: "qyh6h_c01",
}
```

```ts-dialog
// id: qyh6h_c01
{
  id: "qyh6h_c01",
  speaker: "doctor",
  text: "他激烈地抗拒了——因为他把「值班」当成了他唯一的锚点。",
  choices: [
    { id: "qyh6h_c01_a", text: "「你不是不能值班。是你现在这个状态上手术台，拿病人的命当赌注。你救不了人的时候，你自己知道。」", kind: "confront", effect: { trust: 0, mood: -2 }, next: "qyh6h_p02" },
    { id: "qyh6h_c01_b", text: "「你怕的是撤下来，就再也回不去了。可你撤下来，是为了好好地回去。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh6h_p02" },
  ],
}
```

```ts-dialog
// id: qyh6h_p02
{
  id: "qyh6h_p02",
  speaker: "patient",
  text: "（他愣住，很久）……您说得对。我嘴上说「想通了回去值班」，可我昨晚，还开了一堆「求心安」的单子。我知道不该开，可我没停。我这个状态，确实……确实不该站上手术台。",
  emotion: "broken",
  autoNext: "qyh6h_c02",
}
```

```ts-dialog
// id: qyh6h_c02
{
  id: "qyh6h_c02",
  speaker: "doctor",
  text: "「我知道不该开，可我没停」——你比谁都清楚自己的状态，只是没人替你把那句话说破。",
  choices: [
    { id: "qyh6h_c02_a", text: "「我说破，是因为我看重你，也看重你手底下那些病人。休假不是惩罚，是把你这个好医生，先还给自己。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "qyh6h_p03" },
    { id: "qyh6h_c02_b", text: "「你这一个月没敢停，是怕一停就再也站不起来。可你不停，才是真的站不稳。」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "qyh6h_p03" },
  ],
}
```

```ts-dialog
// id: qyh6h_p03
{
  id: "qyh6h_p03",
  speaker: "patient",
  text: "（他沉默了很久，最后说）……好。我听您的。休假就休假。我答应您，这阵子，我不碰手术台，按时来您这儿。……医生，这是我当医生十年来，头一回听别人的话，把自己从手术台上撤下来。",
  emotion: "calm",
  autoNext: "qyh6h_out",
}
```

```ts-dialog
// id: qyh6h_out
{
  id: "qyh6h_out",
  speaker: "narration",
  text: "你替齐夜航打通了科室和医务科的电话。他把休假申请交上去那天，站在办公室门口，很久没走。老张拍拍他肩，说：「老齐，歇好了回来，我请你喝酒。」他点点头，走进走廊尽头的阳光里——第一次，不是走进手术室。",
  autoNext: "qyh_end_hidden",
}
```

---

## 五、结局

```ts-dialog
// id: qyh_end_cure
{
  id: "qyh_end_cure",
  speaker: "narration",
  text: "〔结局 · 治愈〕",
  isEnding: true,
  endingType: "cure",
  endingTitle: "手抖着，接着救人",
  endingText: "一个月后，齐夜航来信。他说他回了急诊，第一个夜班就碰上抢救。他手抖了一下，然后念了句『尽力就行』，把那台抢救做完，病人救回来了。他说他不是不抖了，是抖着也能稳住。他把那句『你救不回来，也配当医生』，写在了值班室贴的便签上。他又开始跟病人解释检查单，一张一张，说得清清楚楚。他说他女儿现在会在他值班前，把手放在他手上，说『爸爸，我也接着陪你』。他最后写道：我以前以为，好医生是手永远不抖的人。现在我明白了——好医生，也是会被现实击穿的人。可击穿之后，他会带着裂缝，接着救人。",
  endingReward: { doctorReputation: 8, doctorMoney: 300, doctorExp: 50, doctorSanity: 5 },
}
```

```ts-dialog
// id: qyh_end_accept
{
  id: "qyh_end_accept",
  speaker: "narration",
  text: "〔结局 · 接纳〕",
  isEnding: true,
  endingType: "acceptance",
  endingTitle: "带着怕，回人间",
  endingText: "齐夜航没有再急于回手术台，但他每周都来坐坐。他说他先回急诊值了几个白班，从问诊、开单、交代病情这些不用上手术台的事做起。他还开着几张『求心安』的单子，但已经能一边开，一边跟自己说『我知道这是我在怕，我在学着信自己』。他说周航的名字，他现在敢叫了——每天交班的时候，在心里念一遍，当一盏灯。他老婆说，他现在半夜醒了，不会再去翻病历，而是会去客厅坐一会儿，等她出来给他倒杯水。他没全好，可他在往人间走。他说：医生，我没垮。就是还没全好。",
  endingReward: { doctorReputation: 4, doctorMoney: 180, doctorExp: 35, doctorSanity: 6 },
}
```

```ts-dialog
// id: qyh_end_hidden
{
  id: "qyh_end_hidden",
  speaker: "narration",
  text: "〔结局 · 隐藏·强制休假〕",
  isEnding: true,
  endingType: "hidden",
  endingTitle: "先把医生，还给自己",
  endingText: "你替齐夜航安排了系统评估和强制休假，并同步了科室与医务科。他起初激烈抗拒，后来在一个失眠的夜里，给自己开出了那几张『求心安』的单子，才承认你是对的。他休了一个月假，去周航的墓前坐了一下午，回来跟老张说，他准备先回白班，从不上手术台的事做起。他说他以前以为，停下来的医生就不是医生了。现在他知道——把自己先还给自己的人，才配再握手术刀。他没怪你。他说：医生，你那时候拉住我，是拉对了。",
  endingReward: { doctorReputation: -10, doctorMoney: 100, doctorExp: 80, doctorSanity: -15 },
}
```

```ts-dialog
// id: qyh_end_worsen
{
  id: "qyh_end_worsen",
  speaker: "narration",
  text: "〔结局 · 恶化〕",
  isEnding: true,
  endingType: "worsen",
  endingTitle: "焊死的刀",
  endingText: "齐夜航没有再来。他听了那句『忙起来就好了』，回到值班表里，把自己重新焊回手术台。他不再喊心悸，不再翻病历，可老张说他开始躲——一有重症送进来，他就把会诊推给别人，说自己手头还有病人。他开的『求心安』单子越来越多，多到被医务科约谈。他老婆后来捎来一句话：他半夜还是坐在客厅，手抖着，一遍遍数那些检查单，嘴里念着『不能抖，不能抖，不能抖』。那把磨了三十八年的刀，还在焊死地撑着——只是它撑住的，已经不是任何一条人命了。",
  endingReward: { doctorReputation: -8, doctorMoney: 50, doctorExp: 10, doctorSanity: -20 },
}
```

---

## 六、状态

- [x] 人物档案完整（一句话核心/三层真相/角色三角/症状意义/关键转折）
- [x] 节拍规划表（长档 6 节拍，trust 15→26→37→52→66→77→88，truth 0→100）
- [x] v3 结构校验通过 + tsc 通过
- [x] 走线四线全绿（共情 cure trust=88 / 均衡 cure 3 碎片 / 失误 worsen trust≤70 / 探问 cure truth=100）
- [x] 聚合入口（index.generated.ts 自动收录 qi_yehang）
- [ ] 剧本登记表（由主流程统一登记）
