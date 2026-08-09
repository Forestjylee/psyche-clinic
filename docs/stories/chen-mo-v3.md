# 陈默 · v3 · 短剧本 · 4 节拍 · 40+ 轮

> 短档示例剧本：作为「v3 机器可解析格式」的活样板。
> 数值：trust 15→28→40→50→58；truth 0→40；碎片 1 枚 @30；恶化入口 trust≤40；隐藏结局 @50；cure 主线 40 轮。
> 生成：`node scripts/md-to-patient.mjs docs/stories/chen-mo-v3.md --walk`

---

## 〇、人物档案

**姓名** 陈默，35 岁，后端程序员。连续加班三年，今年体检甲亢指标异常，内分泌医生让他转心理门诊。

**表象** 轻度甲亢、失眠、手指微颤。说话条理清晰，习惯性道歉，把「没事」「还好」挂在嘴边。看似努力、可靠、无懈可击。

**真相** 父亲是严苛的数学教师，从小学一年级起，考不到第一名就在客厅罚站。他靠「拼命证明自己有用」活到今天，一闲下来心里就响起「你正在变成废物」的警报——他不敢停下来，因为停下来就要面对那个从未被夸奖过的小孩。

---

## 一、剧本元信息（ts-meta）

```ts-meta
// id: chen_mo
// tier: 短
// anchor: 15,28,40,50,58
// truthEnd: 40
// minCureRounds: 40
// fragments: 1
// worsenAtMost: 40
{
  id: "chen_mo",
  name: "陈默",
  title: "程序员 · 连续加班三年 · 被同事送诊",
  intro: "公司体检查出甲亢指标异常，医生让他来心理门诊看看。他答应了，理由是『就当给公司一个交代。』",
  surface: "轻度甲亢、失眠、手指微颤。说话条理清晰，习惯性道歉，把『没事』『还好』挂在嘴边。看似努力、可靠、无懈可击。",
  truth: "父亲是严苛的数学教师。从小学一年级起，考不到第一名就在客厅罚站。他靠『拼命证明自己有用』活到今天，一闲下来心里就响起『你正在变成废物』的警报——他不敢停下来，因为停下来就要面对那个从未被夸奖过的小孩。",
  palette: { primary: "#6b8e6b", secondary: "#a3b8a3", fog: "#8d7a6b", bright: "#c9d8c0" },
  baseReward: 650,
  difficulty: "简单",
  startNode: "cm1_start",
  initialState: { trust: 15, defense: 65, mood: 35, truth: 0, round: 0 },
  memoryFragments: [
    {
      id: "chen_m1",
      trigger: { truth: 30 },
      title: "客厅里的时钟",
      text: "客厅挂钟的秒针走得特别响。我站在墙角，看父亲把试卷一遍遍拍在茶几上。那一年我七岁。从那以后，我好像再也没有真正『停下来』过。",
      emotion: "scared",
    },
  ],
}
```

---

## 二、节拍骨架（ts-dialog 节点）

### 节拍 1 · 初访·表层（trust 15→28，truth 0→22，阻抗：拒绝被当成「有问题的人」）

```ts-dialog
// id: cm1_start
{
  id: "cm1_start",
  speaker: "narration",
  text: "初秋的下午，候诊区很安静。陈默比预约时间早到了二十分钟，坐得端端正正，像在等一场面试。轮到他时，他先站起，又坐下，最后推门进来，冲你笑了笑。",
  autoNext: "cm1_p01",
}
```

```ts-dialog
// id: cm1_p01
{
  id: "cm1_p01",
  speaker: "patient",
  text: "医生您好。我……其实真没什么大事。就是体检报告有个箭头，他们让我来看看。您别担心，我睡眠还行，就是最近睡得晚一点。",
  emotion: "neutral",
  autoNext: "cm1_c01",
}
```

```ts-dialog
// id: cm1_c01
{
  id: "cm1_c01",
  speaker: "doctor",
  text: "你提前二十分钟就到了，却说自己「没什么大事」。我猜，让一个一直说「没事」的人停下来看看自己，本身就是件大事。",
  choices: [
    { id: "cm1_c01_a", text: "「你已经来了，就先在这儿坐一会儿，不急着证明什么。」", kind: "empathy", effect: { trust: 2, defense: -1 }, next: "cm1_p02" },
    { id: "cm1_c01_b", text: "「『他们都让我来』——他们是谁？他们看见你什么了？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "cm1_p02" },
    { id: "cm1_c01_c", text: "「甲亢而已，控制好作息和饮食就能改善，别自己吓自己。」", kind: "logic", effect: { trust: -8, defense: 8, mood: -4 }, next: "cm1_r01" },
  ],
}
```

```ts-dialog
// id: cm1_p02
{
  id: "cm1_p02",
  speaker: "patient",
  text: "（他愣了一下，坐直了些）……您这么说，我反而不知道该怎么接了。体检的医生说，我这种状态有点像是长期透支。但我真的，就是习惯晚睡。",
  emotion: "anxious",
  autoNext: "cm1_c02",
}
```

```ts-dialog
// id: cm1_c02
{
  id: "cm1_c02",
  speaker: "doctor",
  text: "他反复用「就是」「真的」来压低自己——好像承认不舒服，会显得自己脆弱。",
  choices: [
    { id: "cm1_c02_a", text: "「晚睡是『习惯』，还是你不敢让自己停下来？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "cm1_p03" },
    { id: "cm1_c02_b", text: "（安静地坐着，等他把话说完。）", kind: "silence", effect: { trust: 1 }, next: "cm1_p03" },
  ],
}
```

```ts-dialog
// id: cm1_p03
{
  id: "cm1_p03",
  speaker: "patient",
  text: "……不敢停下来。这话我好像在哪听过。我太太也这么说我。可我一停下来，心里就空落落的，浑身难受。",
  emotion: "anxious",
  autoNext: "cm1_c03",
}
```

```ts-dialog
// id: cm1_c03
{
  id: "cm1_c03",
  speaker: "doctor",
  text: "你太太也这么说——看来不是只有你一个人看见你的累。",
  choices: [
    { id: "cm1_c03_a", text: "「她看见你累的时候，是什么反应？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "cm1_p04" },
    { id: "cm1_c03_b", text: "「被你太太这样惦记着，你心里是什么感觉？」", kind: "empathy", effect: { trust: 1 }, next: "cm1_p04" },
    { id: "cm1_c03_c", text: "「家人担心是好事，但你得先把自己的身体照顾好。」", kind: "logic", effect: { trust: -5, defense: 4 }, next: "cm1_p04" },
  ],
}
```

```ts-dialog
// id: cm1_p04
{
  id: "cm1_p04",
  speaker: "patient",
  text: "她……她总半夜起来，看我是不是又没睡。我挺过意不去的。我拼命工作，本来是想让她和儿子过得好一点，结果反而让她天天操心。",
  emotion: "sad",
  autoNext: "cm1_c04",
}
```

```ts-dialog
// id: cm1_c04
{
  id: "cm1_c04",
  speaker: "doctor",
  text: "他的眼眶有点红，但马上又用「我挺过意不去的」把情绪压了下去。",
  choices: [
    { id: "cm1_c04_a", text: "「你拼命工作是想让家人过得好——可他们想要的，好像只是你好好睡一觉。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "cm1_p05" },
    { id: "cm1_c04_b", text: "「『过意不去』这个词，你是对太太说，还是对自己说的？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "cm1_p05" },
  ],
}
```

```ts-dialog
// id: cm1_p05
{
  id: "cm1_p05",
  speaker: "patient",
  text: "……对他们说，也对我自己说吧。我总觉得，我要是不把工作做好，就是个没用的人。这话听着挺傻，但我从小就这么想的。",
  emotion: "neutral",
  autoNext: "cm1_c05",
}
```

```ts-dialog
// id: cm1_c05
{
  id: "cm1_c05",
  speaker: "doctor",
  text: "他第一次主动说出「从小就这么想的」——这是可以往里走的路。",
  choices: [
    { id: "cm1_c05_a", text: "「『从小』是多小？那时候发生了什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "cm1_p06" },
    { id: "cm1_c05_b", text: "（不打断，让他自己慢慢接上那段记忆。）", kind: "silence", effect: { trust: 1 }, next: "cm1_p06" },
  ],
}
```

```ts-dialog
// id: cm1_p06
{
  id: "cm1_p06",
  speaker: "patient",
  text: "……小时候的事，都记不太清了。就记得我学习一直不错，我爸很严格，家里管得严。现在想想，那些严格好像也没错，不然我也考不上好大学。",
  emotion: "neutral",
  autoNext: "cm1_c06",
}
```

```ts-dialog
// id: cm1_c06
{
  id: "cm1_c06",
  speaker: "doctor",
  text: "他在替父亲说话——「那些严格好像也没错」。",
  choices: [
    { id: "cm1_c06_a", text: "「管得严，会让你觉得『我有价值』，还是『我没价值』？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "cm1_p07" },
    { id: "cm1_c06_b", text: "「你考上好大学，你爸高兴吗？」", kind: "empathy", effect: { trust: 1 }, next: "cm1_p07" },
  ],
}
```

```ts-dialog
// id: cm1_p07
{
  id: "cm1_p07",
  speaker: "patient",
  text: "（他沉默了十几秒）……他应该高兴吧。他那个人，脸上是不太会表现出来的。反正我考好了，他就不会……不会说什么难听的话。",
  emotion: "neutral",
  autoNext: "cm1_c07",
}
```

```ts-dialog
// id: cm1_c07
{
  id: "cm1_c07",
  speaker: "doctor",
  text: "「不会说什么难听的话」——这句话背后，是听过太多难听的话。",
  choices: [
    { id: "cm1_c07_a", text: "「考好了就『不说什么』——那考不好的时候呢？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "cm1_p08" },
    { id: "cm1_c07_b", text: "「听你这么说，你好像一直在用成绩换一句『安心』。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "cm1_p08" },
  ],
}
```

```ts-dialog
// id: cm1_p08
{
  id: "cm1_p08",
  speaker: "patient",
  text: "（他的声音低下去）……考不好的时候，我能在客厅站一晚上。不过后来就再也没考不好过。从那以后，我都考第一。",
  emotion: "sad",
  autoNext: "cm1_c08",
}
```

```ts-dialog
// id: cm1_c08
{
  id: "cm1_c08",
  speaker: "doctor",
  text: "「从那以后我都考第一」——他把站一晚上，变成了往后十几年的勋章。",
  choices: [
    { id: "cm1_c08_a", text: "「站一晚上，那时候你几岁？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "cm1_p09" },
    { id: "cm1_c08_b", text: "「这么多年，你一直没让这件事再有第二次发生。」", kind: "empathy", effect: { trust: 1 }, next: "cm1_p09" },
  ],
}
```

```ts-dialog
// id: cm1_p09
{
  id: "cm1_p09",
  speaker: "patient",
  text: "七岁吧。那会儿我刚上一年级。后来我就明白了，只要我够好，就不会被那样对待。这个道理，我用了三十年，到现在还在用。",
  emotion: "anxious",
  autoNext: "cm1_c09",
}
```

```ts-dialog
// id: cm1_c09
{
  id: "cm1_c09",
  speaker: "doctor",
  text: "他把一个七岁孩子的恐惧，总结成了「这个道理」，还夸它有用。",
  choices: [
    { id: "cm1_c09_a", text: "「这个『道理』确实让你考了第一——那它有没有让你睡过一个好觉？」", kind: "empathy", effect: { trust: 1 }, next: "cm1_p10" },
    { id: "cm1_c09_b", text: "「『只要我够好，就不会被那样对待』——你信这句话多久了？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "cm1_p10" },
  ],
}
```

```ts-dialog
// id: cm1_p10
{
  id: "cm1_p10",
  speaker: "patient",
  text: "……信到我女儿都四岁了。有时候半夜醒过来，我看着她，会想：她以后也要这么活着吗？然后我马上又想，别想那么多，先把工作做好。",
  emotion: "sad",
  autoNext: "cm1_c10",
}
```

```ts-dialog
// id: cm1_c10
{
  id: "cm1_c10",
  speaker: "doctor",
  text: "「别想那么多」——他给心里那个孩子递了一块布，把刚露出头的害怕又盖了回去。",
  choices: [
    { id: "cm1_c10_a", text: "「你怕女儿也这么活着——这份怕，是你今晚最诚实的一句话。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "cm1_out" },
    { id: "cm1_c10_b", text: "「那句『先把工作做好』，是你自己的话，还是谁的声音？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "cm1_out" },
  ],
}
```

```ts-dialog
// id: cm1_out
{
  id: "cm1_out",
  speaker: "narration",
  text: "第一次会谈结束，陈默离开前，在门口停了一下。「……下次还是这个点吗？」他问得认真，像在确认一个项目排期。",
  autoNext: "cm2_start",
}
```

```ts-dialog
// id: cm1_r01
{
  id: "cm1_r01",
  speaker: "patient",
  text: "（他的脸色一下子冷下来）您这话说得……像在说我有毛病。我没毛病，我就是累一点。体检报告上的箭头，是个指标，不是个判决。",
  emotion: "angry",
  autoNext: "cm1_p02",
}
```

### 节拍 2 · 中间层触发（trust 28→40，truth 22→34，[m1 碎片@30]）

```ts-dialog
// id: cm2_start
{
  id: "cm2_start",
  speaker: "narration",
  text: "一周后，陈默准时来了，手里还拎着没喝完的半杯咖啡。他说这周把需求排期压了压，能早点回家。你注意到，他说「早点回家」时，嘴角翘了一下。",
  autoNext: "cm2_p01",
}
```

```ts-dialog
// id: cm2_p01
{
  id: "cm2_p01",
  speaker: "patient",
  text: "这周还行，睡得多一点了。我太太说我脸色好看了点。不过周五加了个班，我回家的时候她已经睡了，我挺愧疚的。",
  emotion: "neutral",
  autoNext: "cm2_c01",
}
```

```ts-dialog
// id: cm2_c01
{
  id: "cm2_c01",
  speaker: "doctor",
  text: "他在「好了一点」和「愧疚」之间来回。",
  choices: [
    { id: "cm2_c01_a", text: "「你说的『多一点』，是身体上的多，还是心里终于允许自己多睡了一会儿？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "cm2_p02" },
    { id: "cm2_c01_b", text: "「太太说你脸色好了，你听见这句话时，心里是什么感觉？」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "cm2_p02" },
  ],
}
```

```ts-dialog
// id: cm2_p02
{
  id: "cm2_p02",
  speaker: "patient",
  text: "……高兴，又有点不踏实。好像我一旦不忙了，就要出事一样。你们这叫啥来着，是不是叫……不敢享福？",
  emotion: "anxious",
  autoNext: "cm2_c02",
}
```

```ts-dialog
// id: cm2_c02
{
  id: "cm2_c02",
  speaker: "doctor",
  text: "他自己已经开始找词形容这种感觉了。",
  choices: [
    { id: "cm2_c02_a", text: "「『不敢享福』——你这辈子，享过福吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "cm2_p03" },
    { id: "cm2_c02_b", text: "（点点头，示意他说下去，不急着纠正。）", kind: "silence", effect: { trust: 1 }, next: "cm2_p03" },
  ],
}
```

```ts-dialog
// id: cm2_p03
{
  id: "cm2_p03",
  speaker: "patient",
  text: "……上学那会儿没想过，就想考第一。上班以后也不敢歇，怕一歇就被比下去。我这辈子好像一直在赶路，从来不敢停下来看看路边的风景。",
  emotion: "sad",
  autoNext: "cm2_c03",
}
```

```ts-dialog
// id: cm2_c03
{
  id: "cm2_c03",
  speaker: "doctor",
  text: "「一直在赶路」——他开始看见自己的整个人生了。",
  choices: [
    { id: "cm2_c03_a", text: "「你太太和女儿，算不算你路上的风景？」", kind: "empathy", effect: { trust: 1 }, next: "cm2_p04" },
    { id: "cm2_c03_b", text: "「『怕被比下去』——比下去会怎么样？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "cm2_p04" },
  ],
}
```

```ts-dialog
// id: cm2_p04
{
  id: "cm2_p04",
  speaker: "patient",
  text: "算，当然算。我女儿会在我加班回来的时候，跑过来抱我一下，说「爸爸辛苦了」。她那么小，就知道说这个。我就想，我得再努力一点，让她以后不用像她爸这么拼。",
  emotion: "sad",
  autoNext: "cm2_c04",
}
```

```ts-dialog
// id: cm2_c04
{
  id: "cm2_c04",
  speaker: "doctor",
  text: "「让她不用像她爸这么拼」——可他自己，现在正这么拼着。",
  choices: [
    { id: "cm2_c04_a", text: "「女儿抱你的时候，你有没有想过：她可能不需要你『再努力一点』，她只需要你早点回来？」", kind: "empathy", effect: { trust: 2, mood: 4 }, next: "cm2_p05" },
    { id: "cm2_c04_b", text: "「『不用像她爸这么拼』——你爸让你拼，你也想让女儿不用拼。这两种拼，一样吗？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "cm2_p05" },
  ],
}
```

```ts-dialog
// id: cm2_p05
{
  id: "cm2_p05",
  speaker: "patient",
  text: "……不一样。我爸是不拼就不行，我是想让我女儿不用拼。可我仔细一想，我在公司拼的样子，跟我小时候我爸逼我的样子，好像也没差多少。",
  emotion: "anxious",
  autoNext: "cm2_c05",
}
```

```ts-dialog
// id: cm2_c05
{
  id: "cm2_c05",
  speaker: "doctor",
  text: "他第一次把自己和父亲摆到了同一个位置。",
  choices: [
    { id: "cm2_c05_a", text: "「『没差多少』——可你爸逼的是你，你现在逼的是你自己。对不对？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "cm2_p06" },
    { id: "cm2_c05_b", text: "（陪他一起看着这个发现，不急着往下推。）", kind: "silence", effect: { trust: 1 }, next: "cm2_p06" },
  ],
}
```

```ts-dialog
// id: cm2_p06
{
  id: "cm2_p06",
  speaker: "patient",
  text: "（他的眼眶又红了，这次没压）……对。没人逼我了，是我自己在逼自己。我好像心里一直站着一个很凶的人，我稍微歇口气，他就跳出来说我没用。",
  emotion: "scared",
  autoNext: "cm2_c06",
}
```

```ts-dialog
// id: cm2_c06
{
  id: "cm2_c06",
  speaker: "doctor",
  text: "他心里那个「很凶的人」，终于开口说话了。",
  choices: [
    { id: "cm2_c06_a", text: "「那个很凶的人，是从哪一年开始住进你心里的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "cm2_p07" },
    { id: "cm2_c06_b", text: "「他凶你的时候，说些什么？」", kind: "empathy", effect: { trust: 1 }, next: "cm2_p07" },
  ],
}
```

```ts-dialog
// id: cm2_p07
{
  id: "cm2_p07",
  speaker: "patient",
  text: "……七岁。我第一次考了第二名，回家挨了罚。从那天起，那个声音就住进来了。它总说：你不够好，你再不快点，你就废了。",
  emotion: "scared",
  autoNext: "cm2_c07",
}
```

```ts-dialog
// id: cm2_c07
{
  id: "cm2_c07",
  speaker: "doctor",
  text: "「七岁」——他终于把那个罚站的夜晚，摆到了桌上。",
  choices: [
    { id: "cm2_c07_a", text: "「七岁的你考了第二名，回家挨罚——那个小孩，现在还在你心里站着吗？」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "cm2_p08" },
    { id: "cm2_c07_b", text: "「它说你『废了』——你怎么让它闭嘴的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "cm2_p08" },
  ],
}
```

```ts-dialog
// id: cm2_p08
{
  id: "cm2_p08",
  speaker: "patient",
  text: "……让它闭嘴的办法，就是一直赢。我三十年了，一刻都不敢输。可你看我现在，赢了工作，输了睡觉。它还是不肯闭嘴。",
  emotion: "sad",
  autoNext: "cm2_c08",
}
```

```ts-dialog
// id: cm2_c08
{
  id: "cm2_c08",
  speaker: "doctor",
  text: "「赢了工作，输了睡觉」——他自己把账算清了。",
  choices: [
    { id: "cm2_c08_a", text: "「你赢了三十年，它还不闭嘴——是不是因为，你从来没敢回头看看那个七岁的小孩？」", kind: "empathy", effect: { trust: 1, defense: 3 }, next: "cm2_p09" },
    { id: "cm2_c08_b", text: "「『一刻都不敢输』——不敢输的背后，是怕输给谁？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "cm2_p09" },
    { id: "cm2_c08_c", text: "「你已经很成功了，别老拿小时候的事折磨自己。」", kind: "confront", effect: { trust: -3, defense: 6 }, next: "cm2_p09" },
  ],
}
```

```ts-dialog
// id: cm2_p09
{
  id: "cm2_p09",
  speaker: "patient",
  text: "……你说得对，我确实从来没敢回头。我一回头，就会看见那间客厅，看见那个站在墙角的小男孩。我有点……不敢看。",
  emotion: "scared",
  autoNext: "cm2_c09",
}
```

```ts-dialog
// id: cm2_c09
{
  id: "cm2_c09",
  speaker: "doctor",
  text: "他没有躲开那个画面，只是不敢看。这是个很大的进步。",
  choices: [
    { id: "cm2_c09_a", text: "「不敢看就慢慢看。今天你能说出来，已经比三十年前勇敢多了。」", kind: "empathy", effect: { trust: 2, mood: 4 }, next: "cm2_p10" },
    { id: "cm2_c09_b", text: "「如果现在有个办法，能让那个七岁的孩子不用再站墙角——你想试试吗？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "cm2_p10" },
  ],
}
```

```ts-dialog
// id: cm2_p10
{
  id: "cm2_p10",
  speaker: "patient",
  text: "……想。我女儿四岁了，我总怕她也活成我这样。要是能让她爸先学会停下来，说不定，她这辈子就不用站墙角了。",
  emotion: "neutral",
  autoNext: "cm2_c10",
}
```

```ts-dialog
// id: cm2_c10
{
  id: "cm2_c10",
  speaker: "doctor",
  text: "会谈结束前的最后一个问题。",
  choices: [
    { id: "cm2_c10_a", text: "「你女儿真幸运——她的爸爸开始学着停下来了。」", kind: "empathy", effect: { mood: 3 }, next: "cm2_out" },
    { id: "cm2_c10_b", text: "「『让她爸先学会停下来』——这句话，是你今晚给自己最大的礼物。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "cm2_out" },
  ],
}
```

```ts-dialog
// id: cm2_out
{
  id: "cm2_out",
  speaker: "narration",
  text: "第二次会谈结束时，陈默没有立刻起身。他盯着窗外的树看了一会儿。「那棵树的叶子，黄了。」他说，「我以前都没发现，楼底下有棵树。」",
  autoNext: "cm3_start",
}
```

### 节拍 3 · 深层信念（trust 40→50，truth 34→46，恶化入口 @trust≤40）

```ts-dialog
// id: cm3_start
{
  id: "cm3_start",
  speaker: "narration",
  text: "又一周，陈默照常赴约。这周他给自己排了双休，周六陪女儿去公园放了风筝。他说这话时，眼角有细纹，但看着比之前松快了。",
  autoNext: "cm3_p01",
}
```

```ts-dialog
// id: cm3_p01
{
  id: "cm3_p01",
  speaker: "patient",
  text: "双休真舒服。我女儿放风筝的时候，喊得比谁都大声。我以前总觉得，休息是偷懒，现在我发现……好像也不是。",
  emotion: "calm",
  autoNext: "cm3_c01",
}
```

```ts-dialog
// id: cm3_c01
{
  id: "cm3_c01",
  speaker: "doctor",
  text: "「休息不是偷懒」——他正在改写那条用三十年养成的规矩。",
  choices: [
    { id: "cm3_c01_a", text: "「你以前觉得休息是偷懒——这个『觉得』，更像谁的声音？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "cm3_p02" },
    { id: "cm3_c01_b", text: "「『好像也不是』——你能对自己松这个口，很不容易。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "cm3_p02" },
  ],
}
```

```ts-dialog
// id: cm3_p02
{
  id: "cm3_p02",
  speaker: "patient",
  text: "……像我爸的声音。他总说，人一懒就废了。我从小到大，听到这句话的次数，比听到我自己的名字还多。",
  emotion: "neutral",
  autoNext: "cm3_c02",
}
```

```ts-dialog
// id: cm3_c02
{
  id: "cm3_c02",
  speaker: "doctor",
  text: "那条规矩的真正主人，出现了。",
  choices: [
    { id: "cm3_c02_a", text: "「『人一懒就废了』——你信这句话吗？还是只是听话？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "cm3_p03" },
    { id: "cm3_c02_b", text: "（陪他停下来，感受那句听了无数次的话的分量。）", kind: "silence", effect: { trust: 1 }, next: "cm3_p03" },
  ],
}
```

```ts-dialog
// id: cm3_p03
{
  id: "cm3_p03",
  speaker: "patient",
  text: "我信了三十年，它已经长进我骨头里了。我现在就算知道它是错的，一闲下来，骨头里还是会响警报。",
  emotion: "anxious",
  autoNext: "cm3_c03",
}
```

```ts-dialog
// id: cm3_c03
{
  id: "cm3_c03",
  speaker: "doctor",
  text: "他把它叫「长进骨头里的警报」——他很会形容自己的痛苦。",
  choices: [
    { id: "cm3_c03_a", text: "「三十年的警报，你让它歇几天，它当然要响几声。这不叫退步，叫适应期。」", kind: "empathy", effect: { trust: 1 }, next: "cm3_p04" },
    { id: "cm3_c03_b", text: "「它响的时候，你心里那个七岁的孩子，会做什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "cm3_p04" },
  ],
}
```

```ts-dialog
// id: cm3_p04
{
  id: "cm3_p04",
  speaker: "patient",
  text: "（他的肩膀突然塌下来）……他会立刻找事做。会去叠被子，会去把没关的灯关了，会去改一个其实不急着改的 bug。好像在说：你看，我有在努力，你别凶我。",
  emotion: "sad",
  autoNext: "cm3_c04",
}
```

```ts-dialog
// id: cm3_c04
{
  id: "cm3_c04",
  speaker: "doctor",
  text: "他看清了自己身体里的那个小孩——「你别凶我」。",
  choices: [
    { id: "cm3_c04_a", text: "「那个叠被子的小孩，你忍心让他一直这样讨好吗？」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "cm3_p05" },
    { id: "cm3_c04_b", text: "「他讨好的是谁？是你，还是三十年前那个站在客厅的人？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "cm3_p05" },
    { id: "cm3_c04_c", text: "「你都已经这么大了，怎么还让一个小孩牵着走。」", kind: "confront", effect: { trust: -3, defense: 5 }, next: "cm3_p05" },
  ],
}
```

```ts-dialog
// id: cm3_p05
{
  id: "cm3_p05",
  speaker: "patient",
  text: "……我想让那个小孩停下来，可他只听那个声音的。他怕那个声音。我也怕。我怕我一停，我三十年的「第一」就全都白费了，我就真的变成他说的那种废人了。",
  emotion: "scared",
  autoNext: "cm3_c05",
}
```

```ts-dialog
// id: cm3_c05
{
  id: "cm3_c05",
  speaker: "doctor",
  text: "核心信念露出来了：「不拼命 = 废人」。",
  choices: [
    { id: "cm3_c05_a", text: "「三十年的『第一』，有没有一次，是真的为了你自己拿的？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "cm3_p06" },
    { id: "cm3_c05_b", text: "「你说『我就真的变成废人了』——假如你停下来，最坏会发生什么？」", kind: "empathy", effect: { trust: 2, mood: 4 }, next: "cm3_p06" },
  ],
}
```

```ts-dialog
// id: cm3_p06
{
  id: "cm3_p06",
  speaker: "patient",
  text: "最坏……最坏也就是我丢掉这份工作，然后我太太出去上班，我们一家人过得紧巴一点。可就算想清楚了这个，我还是不敢。因为那个声音会在我耳边说一整天。",
  emotion: "anxious",
  autoNext: "cm3_c06",
}
```

```ts-dialog
// id: cm3_c06
{
  id: "cm3_c06",
  speaker: "doctor",
  text: "他第一次亲手把「最坏」写到纸上，发现并没有想象中可怕——可那个声音还压着他。",
  choices: [
    { id: "cm3_c06_a", text: "「那个声音在你耳边说一整天——它说的话，是你爸的原话吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "cm3_p07" },
    { id: "cm3_c06_b", text: "「你能把最坏的情况算清楚，这已经不是那个七岁的孩子能做的了。」", kind: "silence", effect: { trust: 1 }, next: "cm3_p07" },
  ],
}
```

```ts-dialog
// id: cm3_p07
{
  id: "cm3_p07",
  speaker: "patient",
  text: "（他愣了一下）……是。一模一样的词。我爸是当面骂，现在这个声音是住在我脑子里骂。我三十年了，天天挨骂，就没想过，我可以不听。",
  emotion: "anxious",
  autoNext: "cm3_c07",
}
```

```ts-dialog
// id: cm3_c07
{
  id: "cm3_c07",
  speaker: "doctor",
  text: "「我可以不听」——这句话，他用了三十年才说出口。",
  choices: [
    { id: "cm3_c07_a", text: "「你不听，那个声音会怎样？会打你吗？会把你变成废人吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "cm3_p08" },
    { id: "cm3_c07_b", text: "「当你能说出『我可以不听』，那个声音就已经不是你的主人了。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "cm3_p08" },
  ],
}
```

```ts-dialog
// id: cm3_p08
{
  id: "cm3_p08",
  speaker: "patient",
  text: "（他反复念着这几个字）……它不会打我。它只会吓唬我。我要是真的不听它，说不定，它慢慢就……就哑了？",
  emotion: "calm",
  autoNext: "cm3_c08",
}
```

```ts-dialog
// id: cm3_c08
{
  id: "cm3_c08",
  speaker: "doctor",
  text: "他开始敢和那个声音「对抗」了。",
  choices: [
    { id: "cm3_c08_a", text: "「要不要一起试试：今天回去，它再响的时候，你就对它说一句『谢谢你提醒，但我今天想歇着』。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "cm3_p09" },
    { id: "cm3_c08_b", text: "「你觉得它哑了之后，你心里那个七岁的孩子，会松一口气吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "cm3_p09" },
  ],
}
```

```ts-dialog
// id: cm3_p09
{
  id: "cm3_p09",
  speaker: "patient",
  text: "……会。它要是哑了，我女儿就不用继承它了。我现在做这些，一半是为我自己，一半是为她。",
  emotion: "neutral",
  autoNext: "cm3_c09",
}
```

```ts-dialog
// id: cm3_c09
{
  id: "cm3_c09",
  speaker: "doctor",
  text: "最后一次会谈的收束。这一次，他想为女儿，也为自己停下来。",
  choices: [
    { id: "cm3_c09_a", text: "「为女儿，也为你自己——这两件事，其实是同一件事。」", kind: "empathy", effect: { trust: 1 }, next: "cm3_p10" },
    { id: "cm3_c09_b", text: "「那个声音哑了之后，你想做的第一件事是什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "cm3_p10" },
    { id: "cm3_c09_c", text: "「你要是真听不进去，那我也没办法。你自己看着办吧。」", kind: "logic", require: { trustAtMost: 40 }, effect: { trust: -10, defense: 10 }, next: "cm3_w01", hint: "仅信任≤40 时可见" },
  ],
}
```

```ts-dialog
// id: cm3_p10
{
  id: "cm3_p10",
  speaker: "patient",
  text: "（他想了想，第一次笑得有点放松）……我想睡到自然醒，然后赖一会儿床，听我女儿在外面喊爸爸。就这么点事。",
  emotion: "happy",
  autoNext: "cm3_c10",
}
```

```ts-dialog
// id: cm3_c10
{
  id: "cm3_c10",
  speaker: "doctor",
  text: "「睡到自然醒，听女儿喊爸爸」——这是他三十年来，第一次允许自己许下这么小的愿望。",
  choices: [
    { id: "cm3_c10_a", text: "「这个愿望很小，但它是你用自己的声音说的。把它带走。」", kind: "empathy", effect: { mood: 4 }, next: "cm3_out" },
    { id: "cm3_c10_b", text: "「你觉得，那个七岁的孩子听到这个愿望，会高兴吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "cm3_out" },
  ],
}
```

```ts-dialog
// id: cm3_out
{
  id: "cm3_out",
  speaker: "narration",
  text: "第三次会谈结束。陈默第一次没在门口多站，他转身时，你看见他后背的衬衫不再绷得那么紧了。",
  autoNext: "cm4_start",
}
```

```ts-dialog
// id: cm3_w01
{
  id: "cm3_w01",
  speaker: "patient",
  text: "（他沉默了很久，声音很冷）您说得对，是我自己没救。我就该这样，反正从小到大，也没人真觉得我能好。",
  emotion: "broken",
  autoNext: "cm3_w02",
}
```

```ts-dialog
// id: cm3_w02
{
  id: "cm3_w02",
  speaker: "doctor",
  text: "他说错了话，把陈默推进了「反正没人觉得我能好」的深坑。",
  choices: [
    { id: "cm3_w02_a", text: "「我不是这个意思，我只是……你得自己想开才行。」", kind: "logic", effect: { trust: -6, defense: 6 }, next: "cm3_w03" },
    { id: "cm3_w02_b", text: "（他显然已经不想听了。你道歉，然后试着补救。）", kind: "empathy", effect: { trust: -3, mood: -4 }, next: "cm3_w03" },
  ],
}
```

```ts-dialog
// id: cm3_w03
{
  id: "cm3_w03",
  speaker: "patient",
  text: "……不用补救了。我本来就没指望谁。就这样吧，谢谢您今天的时间。",
  emotion: "broken",
  autoNext: "cm_end_worsen",
}
```

### 节拍 4 · 转向 + 结局（trust 50→58，cure 主线分叉 + 安全网）

```ts-dialog
// id: cm4_start
{
  id: "cm4_start",
  speaker: "narration",
  text: "两周后是最后一次会谈。陈默带来了一样东西——一张写满字的便利贴，贴在他办公桌第二层抽屉内侧。「这周它响的时候，我把它说的话写下来了。」他说，「写着写着，我发现它翻来覆去就那几句。」",
  autoNext: "cm4_p01",
}
```

```ts-dialog
// id: cm4_p01
{
  id: "cm4_p01",
  speaker: "patient",
  text: "它说的每一句我都认识。小时候是爸爸的声音，现在是我自己的声音。我甚至能把它写下来，然后在旁边画个叉。这感觉挺怪的，但我心里舒服多了。",
  emotion: "calm",
  autoNext: "cm4_fork",
}
```

```ts-dialog
// id: cm4_fork
{
  id: "cm4_fork",
  speaker: "doctor",
  text: "他拿到了那本「声音日记」——这不是对抗，是他开始辨认那些话，而不是被它们牵着走。走到这里，有一条分岔需要他选择。",
  choices: [
    { id: "cm4_fork_a", text: "「我们来做最后一张清单：允许休息的事、紧急联系人、你太太和我都知道的求救信号。让安全网先替你兜一阵。」", kind: "special", effect: { trust: 1, mood: 2 }, next: "cm4_s01" },
    { id: "cm4_fork_b", text: "「你不用现在想通所有事。学会带着那个声音生活，也是一种答案。」", kind: "empathy", effect: { trust: 1 }, next: "cm4_a01" },
    { id: "cm4_fork_c", text: "「你父亲罚你站的时候，没有人站出来说『他够了』。今天，我想替三十年前那个小孩，说一次：他够了。」", kind: "confront", require: { trust: 50 }, effect: { trust: 1, truth: 3 }, next: "cm4_h01", hint: "需要信任≥50" },
  ],
}
```

#### 安全网路径（cure 主线）

```ts-dialog
// id: cm4_s01
{
  id: "cm4_s01",
  speaker: "patient",
  text: "（他看着那张空白的清单，沉默了一会儿）……求救信号。我长这么大，还没跟任何人求救过。我总觉得，求救是给没用的人准备的。",
  emotion: "neutral",
  autoNext: "cm4_s02",
}
```

```ts-dialog
// id: cm4_s02
{
  id: "cm4_s02",
  speaker: "doctor",
  text: "他把「求救」当成了失败。",
  choices: [
    { id: "cm4_s02_a", text: "「求救不是认输。你让太太半夜醒来看你有没有睡，那也是一种求救——是她学会了接住你。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "cm4_s03" },
    { id: "cm4_s02_b", text: "「『求救是给没用的人准备的』——这句话，是那个声音说的，还是你信了三十年的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "cm4_s03" },
  ],
}
```

```ts-dialog
// id: cm4_s03
{
  id: "cm4_s03",
  speaker: "patient",
  text: "（他低头看着清单）……行，我写。我写「胸口发闷、连续三天睡不着」就发短信，这个行不行？还有，我答应您，会跟我太太说真话。",
  emotion: "calm",
  autoNext: "cm4_s04",
}
```

```ts-dialog
// id: cm4_s04
{
  id: "cm4_s04",
  speaker: "doctor",
  text: "他亲手写下了第一条求救信号——这是他给那个声音上的第一道锁。",
  choices: [
    { id: "cm4_s04_a", text: "「你写得很清楚。这条短信发出去，不是你输了，是你终于让对的人帮你了。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "cm4_s05" },
    { id: "cm4_s04_b", text: "「说真话——对你太太最难说的那句真话是什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "cm4_s05" },
  ],
}
```

```ts-dialog
// id: cm4_s05
{
  id: "cm4_s05",
  speaker: "patient",
  text: "最难说的……是「我需要你」。我这些年都是说「我可以」，没说过「我需要」。",
  emotion: "sad",
  autoNext: "cm4_s06",
}
```

```ts-dialog
// id: cm4_s06
{
  id: "cm4_s06",
  speaker: "doctor",
  text: "「我可以」和「我需要」之间，隔着三十年不敢开口的墙。",
  choices: [
    { id: "cm4_s06_a", text: "「下次半夜醒的时候，试着对你太太说一句『我需要你』。就一句。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "cm4_s07" },
    { id: "cm4_s06_b", text: "「你爸当年是不是也从没对你说过『我需要你』？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "cm4_s07" },
  ],
}
```

```ts-dialog
// id: cm4_s07
{
  id: "cm4_s07",
  speaker: "patient",
  text: "（他闭了闭眼）……没说过。他只会用成绩表跟我说话。我那时候以为，被需要才算有用。现在我知道了，不是的。",
  emotion: "neutral",
  autoNext: "cm4_s08",
}
```

```ts-dialog
// id: cm4_s08
{
  id: "cm4_s08",
  speaker: "doctor",
  text: "「被需要才算有用」——他正在用新的话，替换那条旧规矩。",
  choices: [
    { id: "cm4_s08_a", text: "「那现在，你还觉得只有『有用』才配被爱吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "cm4_s09" },
    { id: "cm4_s08_b", text: "「你女儿抱你的时候，她可从来没检查过你有没有用。」", kind: "empathy", effect: { trust: 0, mood: 4 }, next: "cm4_s09" },
  ],
}
```

```ts-dialog
// id: cm4_s09
{
  id: "cm4_s09",
  speaker: "patient",
  text: "（他笑着摇摇头）……她抱我的时候，我能感觉到，她就是爱我这个人，不是爱我拿回来的工资。我好像，一直欠自己这么一份爱。",
  emotion: "calm",
  autoNext: "cm4_s10",
}
```

```ts-dialog
// id: cm4_s10
{
  id: "cm4_s10",
  speaker: "doctor",
  text: "他看见了自己一直欠缺的东西——不是成绩，不是第一，是无条件的被爱。",
  choices: [
    { id: "cm4_s10_a", text: "「这份爱，你女儿先给了你。现在，轮到你自己给自己了。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "cm4_s11" },
    { id: "cm4_s10_b", text: "「你能说出『欠自己一份爱』——那个七岁的孩子，听见了。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "cm4_s11" },
  ],
}
```

```ts-dialog
// id: cm4_s11
{
  id: "cm4_s11",
  speaker: "patient",
  text: "（他看着窗外那棵树）……其实那间客厅，没我小时候想的那么黑。灯亮着呢，是我一直闭着眼睛。现在睁开看，它也就是一间普通的屋子。",
  emotion: "calm",
  autoNext: "cm4_s12",
}
```

```ts-dialog
// id: cm4_s12
{
  id: "cm4_s12",
  speaker: "doctor",
  text: "三十年来，他第一次觉得那间客厅只是「一间普通的屋子」——恐惧被看见了，就小了。",
  choices: [
    { id: "cm4_s12_a", text: "「你终于睁开了眼睛。那间屋子还在，但站着的不再是挨罚的小孩，是带着小孩回家的你。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "cm4_s13" },
    { id: "cm4_s12_b", text: "「如果现在让七岁的你回到那间屋子，你最想带他做什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "cm4_s13" },
  ],
}
```

```ts-dialog
// id: cm4_s13
{
  id: "cm4_s13",
  speaker: "patient",
  text: "（他沉默了一会儿，声音轻下来）……我会带他去睡觉。跟他说，你考了第二也没事，明天还能考第一，但今晚先睡。他太累了，站了一晚上，没人让他坐下。",
  emotion: "sad",
  autoNext: "cm4_s14",
}
```

```ts-dialog
// id: cm4_s14
{
  id: "cm4_s14",
  speaker: "doctor",
  text: "他给自己内心那个孩子，补上了迟到三十年的那句「先睡」。",
  choices: [
    { id: "cm4_s14_a", text: "「这句话，七岁的他等到了。今天回家的路上，记得也对现在的自己说一遍。」", kind: "empathy", effect: { mood: 4 }, next: "cm4_s15" },
    { id: "cm4_s14_b", text: "「你心里那个很凶的声音，听到你对他说『先睡』，它还能站得住吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "cm4_s15" },
  ],
}
```

```ts-dialog
// id: cm4_s15
{
  id: "cm4_s15",
  speaker: "patient",
  text: "（他笑了，眼眶却红着）……它应该会愣住吧。这么多年，还没人跟它说过话，更没人让它坐下。医生，谢谢您。这句话，我好像三十年没跟人好好说过了。",
  emotion: "calm",
  autoNext: "cm4_s16",
}
```

```ts-dialog
// id: cm4_s16
{
  id: "cm4_s16",
  speaker: "doctor",
  text: "「谢谢您」——他终于把压在胸口的那句话，放了出来。",
  choices: [
    { id: "cm4_s16_a", text: "「你最该谢的是自己——是你敢走进这间屋子，敢回头看那盏灯。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "cm4_s17" },
    { id: "cm4_s16_b", text: "「回到家里，你最想做的第一件事是什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "cm4_s17" },
  ],
}
```

```ts-dialog
// id: cm4_s17
{
  id: "cm4_s17",
  speaker: "patient",
  text: "……抱抱我女儿，然后早点睡。我太太说我最近打呼噜了，睡得特别沉。她笑我，说我四十岁的人了，睡觉像小孩。",
  emotion: "happy",
  autoNext: "cm4_s18",
}
```

```ts-dialog
// id: cm4_s18
{
  id: "cm4_s18",
  speaker: "doctor",
  text: "「睡觉像小孩」——这是他能得到的，最好的一句夸奖。",
  choices: [
    { id: "cm4_s18_a", text: "「那就继续睡得像个小孩。那张清单你留着，那个声音再来敲门，你知道怎么开门，也知道怎么请它走。」", kind: "empathy", effect: { mood: 4 }, next: "cm_end_cure" },
    { id: "cm4_s18_b", text: "「三十年的第一，你早就拿够了。从今天起，学学拿『睡得沉』这一项。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "cm_end_cure" },
  ],
}
```

#### 接纳路径（acceptance）

```ts-dialog
// id: cm4_a01
{
  id: "cm4_a01",
  speaker: "patient",
  text: "（他点点头）……带着它生活。您说的对，我可能没办法一下子把那个声音赶走。它跟了我三十年，我允许它再住一阵。",
  emotion: "neutral",
  autoNext: "cm4_a02",
}
```

```ts-dialog
// id: cm4_a02
{
  id: "cm4_a02",
  speaker: "doctor",
  text: "他没有选择「战胜」，而是选择了「共处」——这也是一种向前。",
  choices: [
    { id: "cm4_a02_a", text: "「允许它住一阵，但把钥匙从它手里拿回来——让它住，你来当家。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "cm4_a03" },
    { id: "cm4_a02_b", text: "「它再响的时候，你会怎么回应它？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "cm4_a03" },
  ],
}
```

```ts-dialog
// id: cm4_a03
{
  id: "cm4_a03",
  speaker: "patient",
  text: "……我会跟它说：你说了三十年了，我知道你为我好。但我今天想休息。说多了，它好像真的会小声一点。",
  emotion: "calm",
  autoNext: "cm4_a04",
}
```

```ts-dialog
// id: cm4_a04
{
  id: "cm4_a04",
  speaker: "doctor",
  text: "他在「休息」和「好」之间，第一次站到了休息这一边。",
  choices: [
    { id: "cm4_a04_a", text: "「那个声音会小声一点——不是因为你赢了它，是因为你不再怕它了。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "cm4_a05" },
    { id: "cm4_a04_b", text: "「如果有一天它真的完全安静了，你打算拿省下来的力气做什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "cm4_a05" },
  ],
}
```

```ts-dialog
// id: cm4_a05
{
  id: "cm4_a05",
  speaker: "patient",
  text: "（他想了想）……陪我女儿多放几回风筝，带我妈去看一次海。她老人家，还没看过海。我这些年在城里，连她生日都没赶上几回。",
  emotion: "neutral",
  autoNext: "cm_end_accept",
}
```

#### 隐藏路径（hidden · 强制介入）

```ts-dialog
// id: cm4_h01
{
  id: "cm4_h01",
  speaker: "patient",
  text: "（他愣住了，半晌没说话。然后他的眼睛红了）……从来没有人说过他够了。我自己，也从来没对自己说过。您替他……替我说了。",
  emotion: "broken",
  autoNext: "cm4_h02",
}
```

```ts-dialog
// id: cm4_h02
{
  id: "cm4_h02",
  speaker: "doctor",
  text: "三十年的墙角，终于有人替他站了出来。但接下来，有个更重的决定需要你面对。",
  choices: [
    { id: "cm4_h02_a", text: "「我打算联系你太太，还有你父亲。有些话，不该只有你一个人记得。」", kind: "special", effect: { mood: -3 }, next: "cm4_h03" },
    { id: "cm4_h02_b", text: "「我们先把这件事放在这儿，等你准备好再说。」", kind: "empathy", effect: { trust: 1 }, next: "cm4_h05" },
  ],
}
```

```ts-dialog
// id: cm4_h03
{
  id: "cm4_h03",
  speaker: "patient",
  text: "（他的声音发抖）联系我爸？您……您要跟我爸谈那间客厅的事？医生，我怕。我这一辈子，都在躲那间客厅。",
  emotion: "scared",
  autoNext: "cm4_h04",
}
```

```ts-dialog
// id: cm4_h04
{
  id: "cm4_h04",
  speaker: "doctor",
  text: "他害怕，但这一次，他愿意让你扶着他走向那间客厅。",
  choices: [
    { id: "cm4_h04_a", text: "「你怕，是因为你七岁时一个人站在那儿。现在你三十七岁，身后有我，有你太太。」", kind: "special", effect: { truth: 3, mood: -2 }, next: "cm_end_hidden" },
    { id: "cm4_h04_b", text: "「我们先不急着谈。把这句话放在心里，等你觉得能开口的那天，我们再说。」", kind: "empathy", effect: { trust: 1 }, next: "cm4_h05" },
  ],
}
```

```ts-dialog
// id: cm4_h05
{
  id: "cm4_h05",
  speaker: "patient",
  text: "（他垂下眼睛）……好。等我觉得能说的时候，我再跟您说。谢谢您没有逼我。",
  emotion: "neutral",
  autoNext: "cm_end_accept",
}
```

---

## 三、结局

```ts-dialog
// id: cm_end_cure
{
  id: "cm_end_cure",
  speaker: "narration",
  text: "〔结局 · 治愈〕",
  isEnding: true,
  endingType: "cure",
  endingTitle: "允许休息",
  endingText: "三个月后，陈默来信。他辞掉了那份排期永远排不完的工作，换了家准时下班的公司。他说他现在周末陪女儿放风筝，偶尔还是会失眠，但半夜醒来，会对着熟睡的太太轻轻说一句「我需要你」。他说：那棵树黄了又绿，我今年，终于看清它的颜色了。",
  endingReward: { doctorReputation: 8, doctorMoney: 300, doctorExp: 50, doctorSanity: 5 },
}
```

```ts-dialog
// id: cm_end_accept
{
  id: "cm_end_accept",
  speaker: "narration",
  text: "〔结局 · 接纳〕",
  isEnding: true,
  endingType: "acceptance",
  endingTitle: "与它共处",
  endingText: "陈默没有再约新的会谈，但他每隔两个月会来一趟，坐一会儿，跟你聊几句。他说那个声音还在，偶尔还是会冲他喊「你废了」。他现在会回一句：知道了，我今天想歇着。他说，这不是赢，但他终于觉得，那是他自己的日子了。",
  endingReward: { doctorReputation: 4, doctorMoney: 180, doctorExp: 35, doctorSanity: 6 },
}
```

```ts-dialog
// id: cm_end_hidden
{
  id: "cm_end_hidden",
  speaker: "narration",
  text: "〔结局 · 隐藏·那间客厅〕",
  isEnding: true,
  endingType: "hidden",
  endingTitle: "那间客厅",
  endingText: "你约谈了陈默的父亲。老人坐在你对面，听到「他七岁那年，考了第二名，在客厅站了一晚上」时，他很久没有说话。最后他说：「我不知道他还记着。」后来，陈默给我打过一次电话，说他爸破天荒地问了他一句「累不累」。他说他挂了电话，一个人在车里哭了很久。这段关系没有和解，但终于有人，替那间客厅里的孩子开口了。",
  endingReward: { doctorReputation: -10, doctorMoney: 100, doctorExp: 80, doctorSanity: -15 },
}
```

```ts-dialog
// id: cm_end_worsen
{
  id: "cm_end_worsen",
  speaker: "narration",
  text: "〔结局 · 恶化〕",
  isEnding: true,
  endingType: "worsen",
  endingTitle: "那盏没人替他关的灯",
  endingText: "陈默没有再来。他太太后来转来一条消息：他连着加班两周，在工位上晕倒，被送进了医院。检查结果是甲亢加重、严重睡眠不足。她说，他醒来的第一句话是「对不起，我又添麻烦了」。那盏客厅里的灯，最终还是没人替那个七岁的孩子关上。",
  endingReward: { doctorReputation: -8, doctorMoney: 50, doctorExp: 10, doctorSanity: -20 },
}
```

---

## 六、状态

- [x] v3 机器可解析格式（ts-meta + ts-dialog 全部就位）
- [x] trust 锚点 15→28→40→50→58；truth 0→40；碎片 1 枚 @30
- [x] 恶化入口 @trust≤40（cm3_c09_c）；隐藏结局 @trust50（cm4_fork_c）
- [x] cure 主线 40 轮（4 节拍各 10 轮）
- [x] 转换器生成 + 走线验收（`node scripts/md-to-patient.mjs docs/stories/chen-mo-v3.md --walk`）
  - 生成 chen_mo.ts（105 节点 / 45 医生节点），结构校验 + tsc 通过
  - 走线 4 线全过：共情 cure+trust 58+40 轮 / 均衡 cure+碎片 1 / 失误 worsen+trust≤40 / 探问 cure+truth 40
