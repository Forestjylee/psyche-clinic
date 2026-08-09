# 江宇 · v3 · 短剧本 · 4 节拍 · 40+ 轮

> 短档示例剧本：一个把「成功」当成本名的创业者——公司注销了，他也跟着注销了。
> 数值：trust 15→28→40→50→58；truth 0→40；碎片 1 枚 @30；恶化入口 trust≤40；隐藏结局 @50；cure 主线 40 轮。
> 生成：`node scripts/md-to-patient.mjs docs/stories/jiang-yu-v3.md --walk`

---

## 〇、人物档案

**姓名** 江宇，28 岁，连续创业者。第二家公司（AI 教育）半年前倒闭，负债 80 万。他每天穿西装出门，在咖啡馆坐到下班时间才回家，不敢告诉妻子和父母。妻子发现他在偷借钱还债，硬拉他来诊。

**表象** 失眠、暴瘦、每天假装上班在咖啡馆坐三个月。他说「我只是需要一点时间调整」，把「没事」挂在嘴边。看似镇定、条理清晰，但手一直在抖。

**真相** 高三那年，父亲的小工厂倒闭了。父亲在客厅坐了一个月，不说话，不出门，胡子拉碴。母亲天天以泪洗面，亲戚背后议论「老江完了」。那个夏天他考上了重点大学，出发那天父亲说了一句「你要是能有出息，爸这辈子就不算白活」。从那天起，他把「有出息」和「不让爸再垮掉」焊死——失败不只是他的事，是会让父亲重新坐回客厅的那个夏天。他不是不敢失败，是不敢让父亲再经历一次。

---

## 一、剧本元信息（ts-meta）

```ts-meta
// id: jiang_yu
// tier: 短
// anchor: 15,28,40,50,58
// truthEnd: 40
// minCureRounds: 40
// fragments: 1
// worsenAtMost: 40
{
  id: "jiang_yu",
  name: "江宇",
  title: "连续创业者 · 公司倒闭半年 · 被妻子拉来诊",
  intro: "妻子发现他在偷借钱还债，硬拉他来心理门诊。他穿着熨烫笔挺的西装赴约，袖口却磨出了毛边。他说『就是需要一点时间调整。』",
  surface: "失眠、暴瘦、每天假装上班在咖啡馆坐三个月。他说『我只是需要一点时间调整』，把『没事』挂在嘴边。看似镇定、条理清晰，但手一直在抖。",
  truth: "高三那年父亲的小工厂倒闭，父亲在客厅坐了一个月不说话。他考上重点大学那天，父亲说『你要是能有出息，爸这辈子就不算白活』。从那天起他把『有出息』和『不让爸再垮掉』焊死——失败不只是他的事，是会让父亲重新坐回客厅的那个夏天。",
  palette: { primary: "#4a5568", secondary: "#a0aec0", fog: "#718096", bright: "#f6ad55" },
  baseReward: 650,
  difficulty: "简单",
  startNode: "jy1_start",
  initialState: { trust: 15, defense: 65, mood: 35, truth: 0, round: 0 },
  memoryFragments: [
    {
      id: "jy_m1",
      trigger: { truth: 30 },
      title: "客厅里的空厂房",
      text: "高三暑假，我爸的小工厂倒了。他坐在客厅里，一个月没出门，胡子拉碴，一句话不说。我每天路过客厅，他都像一具空壳。亲戚在背后说『老江完了』。出发那天他开口说了一句：『你要是能有出息，爸这辈子就不算白活。』从那天起，我把『有出息』和『不让爸再垮掉』焊在了一起。",
      emotion: "scared",
    },
  ],
}
```

---

## 二、节拍骨架（ts-dialog 节点）

### 节拍 1 · 初访·表层（trust 15→28，truth 0→22，阻抗：拒绝被当成「失败者」）

```ts-dialog
// id: jy1_start
{
  id: "jy1_start",
  speaker: "narration",
  text: "深秋的下午，候诊区没什么人。江宇比预约时间早到了十分钟，穿着一身熨烫笔挺的深色西装，坐得端端正正，像个来谈融资的人。轮到他时，他站起，理了理袖口——你注意到，那副笔挺的袖口边缘，已经磨出了一圈毛边。",
  autoNext: "jy1_p01",
}
```

```ts-dialog
// id: jy1_p01
{
  id: "jy1_p01",
  speaker: "patient",
  text: "医生您好。我……其实真没什么大事，就是最近睡不太好，瘦了点。我太太非让我来，说我不对劲。我真没事，可能就是需要一点时间调整。您别担心。",
  emotion: "neutral",
  autoNext: "jy1_c01",
}
```

```ts-dialog
// id: jy1_c01
{
  id: "jy1_c01",
  speaker: "doctor",
  text: "他提前十分钟到，西装笔挺，却连说三个「没事」——手还在抖。",
  choices: [
    { id: "jy1_c01_a", text: "「你袖口都磨出毛边了，却说自己『没事』。在这儿不用急着证明什么，先坐一会儿。」", kind: "empathy", effect: { trust: 2, defense: -1 }, next: "jy1_p02" },
    { id: "jy1_c01_b", text: "「『非让你来』——你太太看见你什么了？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "jy1_p02" },
    { id: "jy1_c01_c", text: "「失眠暴瘦，先去查个内分泌和甲功，别在心理门诊耗时间。」", kind: "logic", effect: { trust: -8, defense: 8, mood: -4 }, next: "jy1_r01" },
  ],
}
```

```ts-dialog
// id: jy1_p02
{
  id: "jy1_p02",
  speaker: "patient",
  text: "（他愣了一下，攥了攥手）……您这么说，我反而不知道怎么接了。我太太说，我这个人，把『没事』挂在嘴边当成了一道墙。她说我一张嘴就是『没事』『挺好的』，她都听腻了。",
  emotion: "anxious",
  autoNext: "jy1_c02",
}
```

```ts-dialog
// id: jy1_c02
{
  id: "jy1_c02",
  speaker: "doctor",
  text: "他反复用「就是」「真的」来压低自己——好像承认不舒服，会显得自己脆弱。",
  choices: [
    { id: "jy1_c02_a", text: "「『就是忙』『真的没事』——这两句话，你说了多少遍了？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "jy1_p03" },
    { id: "jy1_c02_b", text: "（安静地坐着，等他把话说完。）", kind: "silence", effect: { trust: 1 }, next: "jy1_p03" },
  ],
}
```

```ts-dialog
// id: jy1_p03
{
  id: "jy1_p03",
  speaker: "patient",
  text: "……说太多了。可我除了说没事，还能说什么？我太太问我怎么了，我能跟她说什么？说我赔了？说我每天出门其实是去咖啡馆坐着？这些话，我说不出口。",
  emotion: "anxious",
  autoNext: "jy1_c03",
}
```

```ts-dialog
// id: jy1_c03
{
  id: "jy1_c03",
  speaker: "doctor",
  text: "「还能说什么」——他把自己逼进了一个只能说「没事」的角落。",
  choices: [
    { id: "jy1_c03_a", text: "「你除了说『没事』，还能说什么——这话你问过自己吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "jy1_p04" },
    { id: "jy1_c03_b", text: "「你太太听腻了『没事』，她其实想听你说什么？」", kind: "empathy", effect: { trust: 1 }, next: "jy1_p04" },
    { id: "jy1_c03_c", text: "「家人担心是好事，但你得先把自己的身体照顾好。」", kind: "logic", effect: { trust: -5, defense: 4 }, next: "jy1_p04" },
  ],
}
```

```ts-dialog
// id: jy1_p04
{
  id: "jy1_p04",
  speaker: "patient",
  text: "她想听我说……真话吧。可真话不好听。我这半年瘦了二十斤，我太太半夜醒过来，看我是不是又没睡。我挺过意不去的。我拼命撑着，本来是想让她过得好一点，结果反而让她天天操心。",
  emotion: "sad",
  autoNext: "jy1_c04",
}
```

```ts-dialog
// id: jy1_c04
{
  id: "jy1_c04",
  speaker: "doctor",
  text: "他的眼眶有点红，但马上又用「我挺过意不去的」把情绪压了下去。",
  choices: [
    { id: "jy1_c04_a", text: "「你拼命把『没事』说给她听，是想保护她，还是怕她看见什么？」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "jy1_p05" },
    { id: "jy1_c04_b", text: "「『真话不好听』——你不敢让她听见的真话，是什么？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "jy1_p05" },
  ],
}
```

```ts-dialog
// id: jy1_p05
{
  id: "jy1_p05",
  speaker: "patient",
  text: "……（他低头看了看自己的西装）您注意到我这身衣服了？我每天穿成这样出门。其实……其实我已经没有公司了。公司半年前就注销了。",
  emotion: "neutral",
  autoNext: "jy1_c05",
}
```

```ts-dialog
// id: jy1_c05
{
  id: "jy1_c05",
  speaker: "doctor",
  text: "「公司注销了，却每天穿西装出门」——这是可以往里走的路。",
  choices: [
    { id: "jy1_c05_a", text: "「『每天穿成这样出门』——你出门去哪儿？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "jy1_p06" },
    { id: "jy1_c05_b", text: "（不打断，让他自己说下去。）", kind: "silence", effect: { trust: 1 }, next: "jy1_p06" },
  ],
}
```

```ts-dialog
// id: jy1_p06
{
  id: "jy1_p06",
  speaker: "patient",
  text: "去咖啡馆。我家楼下那家。我每天九点出门，跟上班一样，坐在那儿，打开电脑，其实什么也干不进去。坐到下班点，我再回家。已经三个月了。",
  emotion: "neutral",
  autoNext: "jy1_c06",
}
```

```ts-dialog
// id: jy1_c06
{
  id: "jy1_c06",
  speaker: "doctor",
  text: "「每天九点出门，坐到下班点回家」——他在演一遍上班。",
  choices: [
    { id: "jy1_c06_a", text: "「三个月，每天如此——你在咖啡馆里，是在做什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "jy1_p07" },
    { id: "jy1_c06_b", text: "「你每天演一遍『上班』，是为了不让她知道。」", kind: "empathy", effect: { trust: 1 }, next: "jy1_p07" },
  ],
}
```

```ts-dialog
// id: jy1_p07
{
  id: "jy1_p07",
  speaker: "patient",
  text: "（他的手抖了一下）……也不全是为了她。是为了我自己。我要是不穿这身西装，不坐在那个位子上，我就……我就不知道自己是谁了。这话听着挺可笑的吧。",
  emotion: "anxious",
  autoNext: "jy1_c07",
}
```

```ts-dialog
// id: jy1_c07
{
  id: "jy1_c07",
  speaker: "doctor",
  text: "「不知道自己是谁」——他第一次把那层壳的名字说出来了。",
  choices: [
    { id: "jy1_c07_a", text: "「『不知道自己是谁』——你公司注销了，你也跟着注销了？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "jy1_p08" },
    { id: "jy1_c07_b", text: "「西装是你的壳，咖啡馆是你办公室的替身。你是在维持『那个江宇』还活着。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "jy1_p08" },
  ],
}
```

```ts-dialog
// id: jy1_p08
{
  id: "jy1_p08",
  speaker: "patient",
  text: "（他沉默了十几秒，声音哑了）……您说得对。我不是在假装上班。我是在假装那个『成功的江宇』还活着。可他已经死了，公司没了，我就是个……失败的空壳。",
  emotion: "sad",
  autoNext: "jy1_c08",
}
```

```ts-dialog
// id: jy1_c08
{
  id: "jy1_c08",
  speaker: "doctor",
  text: "「成功的江宇」——他给自己起了两个名字，一个活着，一个死了。",
  choices: [
    { id: "jy1_c08_a", text: "「『成功的江宇』——他是什么时候开始活着的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "jy1_p09" },
    { id: "jy1_c08_b", text: "「你用『死』来形容自己，这词很重。那个『成功的江宇』，到底是什么样的？」", kind: "empathy", effect: { trust: 1 }, next: "jy1_p09" },
  ],
}
```

```ts-dialog
// id: jy1_p09
{
  id: "jy1_p09",
  speaker: "patient",
  text: "……他从大学起就活着。二十二岁拿天使投资，全校都报道我。第一家公司做成了，被收购。所有人都说，江宇是那个一定会成功的人。我信了。",
  emotion: "neutral",
  autoNext: "jy1_c09",
}
```

```ts-dialog
// id: jy1_c09
{
  id: "jy1_c09",
  speaker: "doctor",
  text: "「那个一定会成功的人」——他第一次主动说出了那个标签。",
  choices: [
    { id: "jy1_c09_a", text: "「『那个一定会成功的人』——这话你听了几年？」", kind: "empathy", effect: { trust: 1 }, next: "jy1_p10" },
    { id: "jy1_c09_b", text: "「『一定会成功』——这是别人给你贴的标签，还是你给自己定的命？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "jy1_p10" },
  ],
}
```

```ts-dialog
// id: jy1_p10
{
  id: "jy1_p10",
  speaker: "patient",
  text: "……听了六年。听久了，我自己也信了。我把它当成了我的本名。江宇=成功。所以公司一没，我连自己叫什么都不知道了。",
  emotion: "sad",
  autoNext: "jy1_c10",
}
```

```ts-dialog
// id: jy1_c10
{
  id: "jy1_c10",
  speaker: "doctor",
  text: "「江宇=成功」——他把一条等式，活成了自己的名字。",
  choices: [
    { id: "jy1_c10_a", text: "「你把『成功』当成本名，公司注销了，你也跟着注销了——这份怕，是你今晚最诚实的一句话。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "jy1_out" },
    { id: "jy1_c10_b", text: "「『江宇=成功』——这条等式，是谁教你的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "jy1_out" },
  ],
}
```

```ts-dialog
// id: jy1_out
{
  id: "jy1_out",
  speaker: "narration",
  text: "第一次会谈结束，江宇离开前，在门口停了一下，理了理西装的领子。「……下次还是这个点吗？」他问得认真，像在确认一个会议排期。",
  beatEnd: { resumeNode: "jy2_start" },
  autoNext: "jy2_start",
}
```

```ts-dialog
// id: jy1_r01
{
  id: "jy1_r01",
  speaker: "patient",
  text: "（他的脸色一下子冷下来）我没病。我就是忙。体检上个月刚做过，指标都正常。您别跟我太太似的，把我当病人。我没那么脆弱。",
  emotion: "angry",
  autoNext: "jy1_p02",
}
```

### 节拍 2 · 中间层触发（trust 28→40，truth 22→34，[m1 碎片@30]）

```ts-dialog
// id: jy2_start
{
  id: "jy2_start",
  speaker: "narration",
  text: "一周后，江宇准时来了。这回没穿西装，换了件挺括的衬衫。他说这周跟太太摊牌了一半，承认公司「暂时有点困难」。你注意到，他说「暂时」时，嘴角抿了一下。",
  autoNext: "jy2_p01",
}
```

```ts-dialog
// id: jy2_p01
{
  id: "jy2_p01",
  speaker: "patient",
  text: "这周还行，跟我太太说了点实话。她没我想的那么崩溃，就是红着眼眶问了我一句「你怎么不早说」。我……我没敢全说。",
  emotion: "neutral",
  autoNext: "jy2_c01",
}
```

```ts-dialog
// id: jy2_c01
{
  id: "jy2_c01",
  speaker: "doctor",
  text: "他在「说了点实话」和「没敢全说」之间来回。",
  choices: [
    { id: "jy2_c01_a", text: "「『没敢全说』——你没说的那部分，是什么？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "jy2_p02" },
    { id: "jy2_c01_b", text: "「她问你『怎么不早说』，你心里是什么感觉？」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "jy2_p02" },
  ],
}
```

```ts-dialog
// id: jy2_p02
{
  id: "jy2_p02",
  speaker: "patient",
  text: "……又松了口气，又怕。好像我一旦把实话全倒出来，那个『成功的江宇』就彻底没了。你们这叫啥来着，是不是叫……不敢认账？",
  emotion: "anxious",
  autoNext: "jy2_c02",
}
```

```ts-dialog
// id: jy2_c02
{
  id: "jy2_c02",
  speaker: "doctor",
  text: "他自己已经开始找词形容这种感觉了。",
  choices: [
    { id: "jy2_c02_a", text: "「『不敢认账』——你欠的是谁的账？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "jy2_p03" },
    { id: "jy2_c02_b", text: "（点点头，示意他说下去，不急着纠正。）", kind: "silence", effect: { trust: 1 }, next: "jy2_p03" },
  ],
}
```

```ts-dialog
// id: jy2_p03
{
  id: "jy2_p03",
  speaker: "patient",
  text: "……欠所有人的账。我第二家公司是做AI教育的，赌上了所有——房子抵押了，亲友的钱借遍了。结果产品上线前，政策变了，市场没了，公司三个月内清盘。八十万的债，就这么砸下来了。",
  emotion: "sad",
  autoNext: "jy2_c03",
}
```

```ts-dialog
// id: jy2_c03
{
  id: "jy2_c03",
  speaker: "doctor",
  text: "「赌上了所有，公司三个月清盘」——他开始把那笔账摆到桌上了。",
  choices: [
    { id: "jy2_c03_a", text: "「你赌上了所有，结果政策一变，全没了——这三个月你是怎么过来的？」", kind: "empathy", effect: { trust: 1 }, next: "jy2_p04" },
    { id: "jy2_c03_b", text: "「『赌上了所有』——你当时为什么敢赌这么大？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "jy2_p04" },
  ],
}
```

```ts-dialog
// id: jy2_p04
{
  id: "jy2_p04",
  speaker: "patient",
  text: "……当时觉得，我一定能成啊。我可是『那个一定会成功的人』。第一家公司都做成了，第二家怎么会不行？我把所有人都拉进来了，亲友的钱，房子的款，我全压上。",
  emotion: "anxious",
  autoNext: "jy2_c04",
}
```

```ts-dialog
// id: jy2_c04
{
  id: "jy2_c04",
  speaker: "doctor",
  text: "「我怎么会不行」——他把别人的期待，当成了自己的底气。",
  choices: [
    { id: "jy2_c04_a", text: "「你把所有人都拉进来，是因为你信自己——还是因为你不敢让自己『不信』？」", kind: "empathy", effect: { trust: 2, mood: 4 }, next: "jy2_p05" },
    { id: "jy2_c04_b", text: "「『我怎么会不行』——这句话，是你自己的，还是别人给你种下的？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "jy2_p05" },
  ],
}
```

```ts-dialog
// id: jy2_p05
{
  id: "jy2_p05",
  speaker: "patient",
  text: "……（他的声音低下去）是别人种的。从大学起，所有人见到我都说，江宇你肯定能成。我听信了，我觉得我有义务成。我要是不成，就对不起所有信我的人。",
  emotion: "sad",
  autoNext: "jy2_c05",
}
```

```ts-dialog
// id: jy2_c05
{
  id: "jy2_c05",
  speaker: "doctor",
  text: "「我有义务成」——他把别人的信任，背成了自己的债。",
  choices: [
    { id: "jy2_c05_a", text: "「『我有义务成』——这义务是谁给你定的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "jy2_p06" },
    { id: "jy2_c05_b", text: "（陪他停下来，感受这句话的分量。）", kind: "silence", effect: { trust: 1 }, next: "jy2_p06" },
  ],
}
```

```ts-dialog
// id: jy2_p06
{
  id: "jy2_p06",
  speaker: "patient",
  text: "……是所有人。亲戚、同学、投资人，还有我爸妈。他们看我的眼神，就像看一个一定会中彩票的人。我怎么敢告诉他们，我把彩票撕了？",
  emotion: "scared",
  autoNext: "jy2_c06",
}
```

```ts-dialog
// id: jy2_c06
{
  id: "jy2_c06",
  speaker: "doctor",
  text: "「我怎么敢告诉他们」——他借遍了亲友，又不敢告诉他们。",
  choices: [
    { id: "jy2_c06_a", text: "「『我怎么敢告诉他们』——你怕他们听见什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "jy2_p07" },
    { id: "jy2_c06_b", text: "「你借遍了亲友，又不敢告诉他们——你一个人扛着，是什么滋味？」", kind: "empathy", effect: { trust: 1 }, next: "jy2_p07" },
  ],
}
```

```ts-dialog
// id: jy2_p07
{
  id: "jy2_p07",
  speaker: "patient",
  text: "……苦。我每天手机一响就心慌，怕是债主。亲戚拜年问我公司怎么样，我还笑着说「挺好挺好」。我笑着的时候，心里在吐血。",
  emotion: "sad",
  autoNext: "jy2_c07",
}
```

```ts-dialog
// id: jy2_c07
{
  id: "jy2_c07",
  speaker: "doctor",
  text: "他第一次说出「心里在吐血」——笑着的时候。",
  choices: [
    { id: "jy2_c07_a", text: "「你笑着说『挺好』的时候，是在守护他们，还是在骗他们？」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "jy2_p08" },
    { id: "jy2_c07_b", text: "「『心里在吐血』——你骗了所有人，最难骗的是谁？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "jy2_p08" },
  ],
}
```

```ts-dialog
// id: jy2_p08
{
  id: "jy2_p08",
  speaker: "patient",
  text: "（他闭了闭眼）……最难骗的是我爸。他这辈子最骄傲的事，就是我。我每次回家，他都逢人就夸，我儿子如何如何。我看着他那张脸，我怎么开口说「爸，我败了」？",
  emotion: "scared",
  autoNext: "jy2_c08",
}
```

```ts-dialog
// id: jy2_c08
{
  id: "jy2_c08",
  speaker: "doctor",
  text: "「他这辈子最骄傲的就是我」——这句话压在他背上，比八十万还重。",
  choices: [
    { id: "jy2_c08_a", text: "「你不敢让父亲失望——这份怕，比八十万的债还重。」", kind: "empathy", effect: { trust: 1, defense: 3 }, next: "jy2_p09" },
    { id: "jy2_c08_b", text: "「『他这辈子最骄傲的就是我』——你什么时候开始背这句话的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "jy2_p09" },
    { id: "jy2_c08_c", text: "「你欠的是钱又不是命。八十万还不上就慢慢还，别把自己逼死。」", kind: "confront", effect: { trust: -3, defense: 6 }, next: "jy2_p09" },
  ],
}
```

```ts-dialog
// id: jy2_p09
{
  id: "jy2_p09",
  speaker: "patient",
  text: "……您说得轻。八十万我倒不是还不清，我可以再干几年慢慢还。可我爸心里的那个江宇，一旦碎了，我补不回来。我怕的不是钱，是让他看见他儿子是个失败者。",
  emotion: "anxious",
  autoNext: "jy2_c09",
}
```

```ts-dialog
// id: jy2_c09
{
  id: "jy2_c09",
  speaker: "doctor",
  text: "「我怕的不是钱，是父亲心里的那个江宇」——他终于把真正的怕说出来了。",
  choices: [
    { id: "jy2_c09_a", text: "「你怕的不是钱，是父亲心里的那个江宇——这份怕，你背了多久了？」", kind: "empathy", effect: { trust: 2, mood: 4 }, next: "jy2_p10" },
    { id: "jy2_c09_b", text: "「『父亲心里的那个江宇』——你爸是从什么时候开始，把你当成他的骄傲的？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "jy2_p10" },
  ],
}
```

```ts-dialog
// id: jy2_p10
{
  id: "jy2_p10",
  speaker: "patient",
  text: "……从我很小的时候。他自己的生意不顺，就把所有指望都搁我身上了。他说过我一句，我这辈子都忘不了。但我……我现在还说不出口。",
  emotion: "neutral",
  autoNext: "jy2_c10",
}
```

```ts-dialog
// id: jy2_c10
{
  id: "jy2_c10",
  speaker: "doctor",
  text: "会谈结束前的最后一个问题。",
  choices: [
    { id: "jy2_c10_a", text: "「那句你说不出口的话，今天先放在这儿。你能承认它存在，已经很不容易。」", kind: "empathy", effect: { mood: 3 }, next: "jy2_out" },
    { id: "jy2_c10_b", text: "「『他说过我一句』——那句话，是什么时候说的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "jy2_out" },
  ],
}
```

```ts-dialog
// id: jy2_out
{
  id: "jy2_out",
  speaker: "narration",
  text: "第二次会谈结束时，江宇没有立刻起身。他盯着窗外看了很久。「我每天去的那家咖啡馆，」他忽然说，「墙上有个洞，我都盯了三个月了，今天才看清它是个钉子眼。」",
  beatEnd: { resumeNode: "jy3_start" },
  autoNext: "jy3_start",
}
```

### 节拍 3 · 深层信念（trust 40→50，truth 34→46，恶化入口 @trust≤40）

```ts-dialog
// id: jy3_start
{
  id: "jy3_start",
  speaker: "narration",
  text: "又一周，江宇照常赴约。这周他没去咖啡馆，跟太太坦白了债务。他说这话时，肩膀塌了一些，但眼神比之前稳。",
  autoNext: "jy3_p01",
}
```

```ts-dialog
// id: jy3_p01
{
  id: "jy3_p01",
  speaker: "patient",
  text: "坦白完，反倒松了口气。我太太没走，她说「债一起还，人别垮」。我以前总觉得，坦白就是认输，现在发现……好像也不是。",
  emotion: "calm",
  autoNext: "jy3_c01",
}
```

```ts-dialog
// id: jy3_c01
{
  id: "jy3_c01",
  speaker: "doctor",
  text: "「坦白就是认输」——他正在改写那条焊了十年的规矩。",
  choices: [
    { id: "jy3_c01_a", text: "「『坦白就是认输』——这个『认输』，更像谁的声音？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "jy3_p02" },
    { id: "jy3_c01_b", text: "「『好像也不是』——你能对自己松这个口，很不容易。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "jy3_p02" },
  ],
}
```

```ts-dialog
// id: jy3_p02
{
  id: "jy3_p02",
  speaker: "patient",
  text: "……像我爸的声音。他这个人，一辈子没认过输。他总说，人一认输就完了。我从小到大，听到这句话的次数，比听到我名字还多。",
  emotion: "neutral",
  autoNext: "jy3_c02",
}
```

```ts-dialog
// id: jy3_c02
{
  id: "jy3_c02",
  speaker: "doctor",
  text: "那条规矩的真正主人，出现了。",
  choices: [
    { id: "jy3_c02_a", text: "「『人一认输就完了』——你信这句话吗？还是只是听话？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "jy3_p03" },
    { id: "jy3_c02_b", text: "（陪他停下来，感受那句听了无数次的话的分量。）", kind: "silence", effect: { trust: 1 }, next: "jy3_p03" },
  ],
}
```

```ts-dialog
// id: jy3_p03
{
  id: "jy3_p03",
  speaker: "patient",
  text: "我信了二十多年，它长进我骨头里了。我现在就算知道它不对，一遇到事，骨头里还是会响警报。说我不行，说我败了，说我完了。",
  emotion: "anxious",
  autoNext: "jy3_c03",
}
```

```ts-dialog
// id: jy3_c03
{
  id: "jy3_c03",
  speaker: "doctor",
  text: "他把它叫「长进骨头里的警报」——他很会形容自己的痛苦。",
  choices: [
    { id: "jy3_c03_a", text: "「它响的时候，你心里最先看见的是谁？」", kind: "empathy", effect: { trust: 1 }, next: "jy3_p04" },
    { id: "jy3_c03_b", text: "「它喊你『完了』——你心里看见的画面，是什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "jy3_p04" },
  ],
}
```

```ts-dialog
// id: jy3_p04
{
  id: "jy3_p04",
  speaker: "patient",
  text: "（他的肩膀突然塌下来）……是我爸。是他坐在客厅里的那个样子。我高三那年，他的小工厂倒了。他在客厅坐了一个月，不说话，不出门，胡子拉碴。我妈天天哭，亲戚背后说「老江完了」。",
  emotion: "sad",
  autoNext: "jy3_c04",
}
```

```ts-dialog
// id: jy3_c04
{
  id: "jy3_c04",
  speaker: "doctor",
  text: "「高三那年，父亲坐在客厅一个月」——那个夏天终于浮上来了。",
  choices: [
    { id: "jy3_c04_a", text: "「高三那年，你看见父亲坐在客厅里——那个画面，你看了多久？」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "jy3_p05" },
    { id: "jy3_c04_b", text: "「『老江完了』——你听见亲戚这话的时候，心里在想什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "jy3_p05" },
    { id: "jy3_c04_c", text: "「你爸的事是你爸的，你自己的日子还得自己过，别老往一块儿搅。」", kind: "confront", effect: { trust: -3, defense: 5 }, next: "jy3_p05" },
  ],
}
```

```ts-dialog
// id: jy3_p05
{
  id: "jy3_p05",
  speaker: "patient",
  text: "……我看了整整一个月。那个夏天，我天天从客厅路过，他就像一具空壳。后来我考上了重点大学，出发那天，他忽然开口跟我说了一句话。就一句。",
  emotion: "scared",
  autoNext: "jy3_c05",
}
```

```ts-dialog
// id: jy3_c05
{
  id: "jy3_c05",
  speaker: "doctor",
  text: "「他开口说了一句话」——十年的锁，就锁在这句话上。",
  choices: [
    { id: "jy3_c05_a", text: "「『他说了一句话』——他说了什么？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "jy3_p06" },
    { id: "jy3_c05_b", text: "「那个夏天你考上大学，出发那天——你心里是什么感觉？」", kind: "empathy", effect: { trust: 2, mood: 4 }, next: "jy3_p06" },
  ],
}
```

```ts-dialog
// id: jy3_p06
{
  id: "jy3_p06",
  speaker: "patient",
  text: "（他的声音抖起来）……他说：「你要是能有出息，爸这辈子就不算白活。」就这一句。我从那天起，把「有出息」和「不让爸再垮掉」焊死在了一起。",
  emotion: "scared",
  autoNext: "jy3_c06",
}
```

```ts-dialog
// id: jy3_c06
{
  id: "jy3_c06",
  speaker: "doctor",
  text: "「你不算白活」——核心信念露出来了。",
  choices: [
    { id: "jy3_c06_a", text: "「『你不算白活』——这句话，你听了多少年？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "jy3_p07" },
    { id: "jy3_c06_b", text: "（让他停在这一句上，不急着往下推。）", kind: "silence", effect: { trust: 1 }, next: "jy3_p07" },
  ],
}
```

```ts-dialog
// id: jy3_p07
{
  id: "jy3_p07",
  speaker: "patient",
  text: "……听了十年。它已经不是我爸的话了，它是我自己的心跳。我一闲下来，它就响。我一失败，它就喊——你爸白活了。",
  emotion: "anxious",
  autoNext: "jy3_c07",
}
```

```ts-dialog
// id: jy3_c07
{
  id: "jy3_c07",
  speaker: "doctor",
  text: "「我一失败，我爸就白活了」——他把父亲的命，绑在了自己的成绩上。",
  choices: [
    { id: "jy3_c07_a", text: "「『我一失败，我爸就白活了』——失败的不只是你，是会让父亲重新坐回那个夏天？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "jy3_p08" },
    { id: "jy3_c07_b", text: "「你不是不敢失败，是不敢让父亲再经历一次。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "jy3_p08" },
  ],
}
```

```ts-dialog
// id: jy3_p08
{
  id: "jy3_p08",
  speaker: "patient",
  text: "（他的眼眶红了，没压）……对。我不是怕那八十万。我是怕我爸知道我败了，他会重新坐回那个客厅。他好不容易才站起来的，我不能把他再按回去。",
  emotion: "scared",
  autoNext: "jy3_c08",
}
```

```ts-dialog
// id: jy3_c08
{
  id: "jy3_c08",
  speaker: "doctor",
  text: "「你不能把他按回去」——他连崩溃的权利，都让给了父亲。",
  choices: [
    { id: "jy3_c08_a", text: "「你把父亲的站起来，背在了自己背上——这份重，你背了十年。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "jy3_p09" },
    { id: "jy3_c08_b", text: "「『你不能把他按回去』——所以你连坐下来崩溃的权利都不敢有？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "jy3_p09" },
  ],
}
```

```ts-dialog
// id: jy3_p09
{
  id: "jy3_p09",
  speaker: "patient",
  text: "……（他反复念着）对，我连崩溃都不敢。我爸那个月，好歹还坐下来了。我连坐下来的勇气都没有，因为我爸跟我说过「你不算白活」。这句话把我失败的权利都拿走了。",
  emotion: "anxious",
  autoNext: "jy3_c09",
}
```

```ts-dialog
// id: jy3_c09
{
  id: "jy3_c09",
  speaker: "doctor",
  text: "「那句『你不算白活』，把我失败的权利都拿走了」——他终于看见那把锁了。",
  choices: [
    { id: "jy3_c09_a", text: "「那句『你不算白活』，把你的失败权利都拿走了——今天你能看见这件事，已经很勇敢。」", kind: "empathy", effect: { trust: 1 }, next: "jy3_p10" },
    { id: "jy3_c09_b", text: "「『你连失败的权利都没有』——这句话，是你爸说的，还是你信了十年后自己说的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "jy3_p10" },
    { id: "jy3_c09_c", text: "「你也别老拿你爸说事，你都二十八了，自己的日子自己负责。」", kind: "logic", require: { trustAtMost: 40 }, effect: { trust: -10, defense: 10 }, next: "jy3_w01", hint: "仅信任≤40 时可见" },
  ],
}
```

```ts-dialog
// id: jy3_p10
{
  id: "jy3_p10",
  speaker: "patient",
  text: "（他想了想，第一次松了松领口）……您说得对，是我自己信的。我爸那句话，可能是想鼓励我。是我自己把它听成了「不许失败」。我把他的话，活成了一道锁。",
  emotion: "calm",
  autoNext: "jy3_c10",
}
```

```ts-dialog
// id: jy3_c10
{
  id: "jy3_c10",
  speaker: "doctor",
  text: "「我把他的话，活成了一道锁」——他第一次把锁的钥匙，握回了自己手里。",
  choices: [
    { id: "jy3_c10_a", text: "「你把父亲的话，活成了一道锁——今天你终于看见这把锁的钥匙，其实一直在你手里。」", kind: "empathy", effect: { mood: 4 }, next: "jy3_out" },
    { id: "jy3_c10_b", text: "「如果那句话不是『你不算白活』，你猜你爸真正想跟你说的是什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "jy3_out" },
  ],
}
```

```ts-dialog
// id: jy3_out
{
  id: "jy3_out",
  speaker: "narration",
  text: "第三次会谈结束。江宇起身时，第一次没理西装领子。他走到门口，回头看了一眼那把椅子。「这椅子，」他说，「比咖啡馆那个好坐。我下次……能不穿西装来吗？」",
  beatEnd: { resumeNode: "jy4_start" },
  autoNext: "jy4_start",
}
```

```ts-dialog
// id: jy3_w01
{
  id: "jy3_w01",
  speaker: "patient",
  text: "（他沉默了很久，声音很冷）您说得对，是我自己没出息。我就该这样，反正从小到大，我爸把所有指望都搁我身上，我也没接住。",
  emotion: "broken",
  autoNext: "jy3_w02",
}
```

```ts-dialog
// id: jy3_w02
{
  id: "jy3_w02",
  speaker: "doctor",
  text: "他说错了话，把江宇推进了「我自己没出息」的深坑。",
  choices: [
    { id: "jy3_w02_a", text: "「你得自己想开才行，光在这儿说也没用。」", kind: "logic", effect: { trust: -6, defense: 6 }, next: "jy3_w03" },
    { id: "jy3_w02_b", text: "（他显然已经不想听了。你道歉，然后试着补救。）", kind: "empathy", effect: { trust: -3, mood: -4 }, next: "jy3_w03" },
  ],
}
```

```ts-dialog
// id: jy3_w03
{
  id: "jy3_w03",
  speaker: "patient",
  text: "……不用补救了。我本来就没指望谁。就这样吧，谢谢您今天的时间。",
  emotion: "broken",
  autoNext: "jy_end_worsen",
}
```

### 节拍 4 · 转向 + 结局（trust 50→58，cure 主线分叉 + 安全网）

```ts-dialog
// id: jy4_start
{
  id: "jy4_start",
  speaker: "narration",
  text: "两周后是最后一次会谈。江宇带来了一样东西——一张旧照片，边角磨得发白。「这是我爸当年工厂倒闭后，坐在空厂房里拍的。」他说，「旁边那堆，是没卖出去的货。」",
  autoNext: "jy4_p01",
}
```

```ts-dialog
// id: jy4_p01
{
  id: "jy4_p01",
  speaker: "patient",
  text: "我盯着这张照片看了两周。我忽然明白了一件事——我爸那个月，不是「垮了」。他跟我一样，他也以为「失败=完了」。我在重复他的剧本，只不过我连坐下来崩溃的勇气都没有。",
  emotion: "calm",
  autoNext: "jy4_fork",
}
```

```ts-dialog
// id: jy4_fork
{
  id: "jy4_fork",
  speaker: "doctor",
  text: "他把那张旧照片摆到桌上——这不是认输，是他终于敢直视那个夏天。走到这里，有一条分岔需要他选择。",
  choices: [
    { id: "jy4_fork_a", text: "「我们来做最后一张清单：能说真话的人、求救信号、你太太和我都知道的暗号。让安全网先替你兜一阵。」", kind: "special", effect: { trust: 1, mood: 2 }, next: "jy4_s01" },
    { id: "jy4_fork_b", text: "「你不用现在想通所有事。学会带着『失败的江宇』生活，也是一种答案。」", kind: "empathy", effect: { trust: 1 }, next: "jy4_a01" },
    { id: "jy4_fork_c", text: "「你父亲那个月坐在空厂房里，没有人站出来说『他够了』。今天，我想替十年前的你，说一次：他够了，你也够了。」", kind: "confront", require: { trust: 50 }, effect: { trust: 1, truth: 3 }, next: "jy4_h01", hint: "需要信任≥50" },
  ],
}
```

#### 安全网路径（cure 主线）

```ts-dialog
// id: jy4_s01
{
  id: "jy4_s01",
  speaker: "patient",
  text: "（他看着那张空白的清单，沉默了一会儿）……求救信号。我长这么大，还没跟任何人求救过。我总觉得，求救是给没用的人准备的。",
  emotion: "neutral",
  autoNext: "jy4_s02",
}
```

```ts-dialog
// id: jy4_s02
{
  id: "jy4_s02",
  speaker: "doctor",
  text: "他把「求救」当成了失败。",
  choices: [
    { id: "jy4_s02_a", text: "「求救不是认输。你太太说『债一起还』，那也是一种求救——是她学会了接住你。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "jy4_s03" },
    { id: "jy4_s02_b", text: "「『求救是给没用的人准备的』——这句话，是你爸的，还是你信了十年的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "jy4_s03" },
  ],
}
```

```ts-dialog
// id: jy4_s03
{
  id: "jy4_s03",
  speaker: "patient",
  text: "（他低头看着清单）……行，我写。我写「连续三天睡不着、想砸东西」就发短信，这个行不行？还有，我答应您，回去跟我爸打个电话。",
  emotion: "calm",
  autoNext: "jy4_s04",
}
```

```ts-dialog
// id: jy4_s04
{
  id: "jy4_s04",
  speaker: "doctor",
  text: "他亲手写下了第一条求救信号——这是他给那道锁上的第一道门。",
  choices: [
    { id: "jy4_s04_a", text: "「你写得很清楚。这条短信发出去，不是你输了，是你终于让对的人帮你了。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "jy4_s05" },
    { id: "jy4_s04_b", text: "「『跟我爸打电话』——最难开口的那句，你想说什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "jy4_s05" },
  ],
}
```

```ts-dialog
// id: jy4_s05
{
  id: "jy4_s05",
  speaker: "patient",
  text: "最难说的……是「爸，我败了」。我这些年都是说「挺好」「没事」，没说过「我败了」。",
  emotion: "sad",
  autoNext: "jy4_s06",
}
```

```ts-dialog
// id: jy4_s06
{
  id: "jy4_s06",
  speaker: "doctor",
  text: "「我败了」三个字，他憋了半年。",
  choices: [
    { id: "jy4_s06_a", text: "「『我败了』这三个字，你憋了半年。今天能写下来，就已经说出口了一半。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "jy4_s07" },
    { id: "jy4_s06_b", text: "「你怕说『我败了』之后，他会说什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "jy4_s07" },
  ],
}
```

```ts-dialog
// id: jy4_s07
{
  id: "jy4_s07",
  speaker: "patient",
  text: "（他闭了闭眼）……我怕他沉默。像那个夏天一样，坐在客厅里，一句话不说。那种沉默，比骂我一顿还重。",
  emotion: "neutral",
  autoNext: "jy4_s08",
}
```

```ts-dialog
// id: jy4_s08
{
  id: "jy4_s08",
  speaker: "doctor",
  text: "「沉默比骂还重」——他替父亲沉默了十年。",
  choices: [
    { id: "jy4_s08_a", text: "「『沉默比骂还重』——你爸那个月的沉默，他是在怪你，还是他自己也以为『完了』？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "jy4_s09" },
    { id: "jy4_s08_b", text: "「你替父亲沉默了十年。今天，你愿不愿意替他说一句他当年说不出口的？」", kind: "empathy", effect: { trust: 0, mood: 4 }, next: "jy4_s09" },
  ],
}
```

```ts-dialog
// id: jy4_s09
{
  id: "jy4_s09",
  speaker: "patient",
  text: "（他看着那张旧照片）……他不是在怪我。他也是以为自己完了。他那个月坐在厂房里，跟我坐在咖啡馆里，是一样的。我们俩，都在假装自己不是个失败者。",
  emotion: "calm",
  autoNext: "jy4_s10",
}
```

```ts-dialog
// id: jy4_s10
{
  id: "jy4_s10",
  speaker: "doctor",
  text: "他看见了自己和父亲，坐在同一个位置上。",
  choices: [
    { id: "jy4_s10_a", text: "「你终于看清了——你不是在重复父亲，你们都在替彼此扛着『不许失败』这道锁。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "jy4_s11" },
    { id: "jy4_s10_b", text: "「『你们都在假装』——那你现在，还觉得自己一个人失败吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "jy4_s11" },
  ],
}
```

```ts-dialog
// id: jy4_s11
{
  id: "jy4_s11",
  speaker: "patient",
  text: "（他笑着摇摇头，眼眶却红着）……不是了。我爸当年也没真的完，他后来站起来了，把我供完了大学。他不是个失败者，我也不是。我只是……摔了一跤。",
  emotion: "calm",
  autoNext: "jy4_s12",
}
```

```ts-dialog
// id: jy4_s12
{
  id: "jy4_s12",
  speaker: "doctor",
  text: "「摔了一跤」——这词比「完了」轻多了。",
  choices: [
    { id: "jy4_s12_a", text: "「『摔了一跤』——你能换这个词，就已经站起来了。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "jy4_s13" },
    { id: "jy4_s12_b", text: "「你父亲当年站起来，靠的是什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "jy4_s13" },
  ],
}
```

```ts-dialog
// id: jy4_s13
{
  id: "jy4_s13",
  speaker: "patient",
  text: "（他把西装外套脱了下来，搭在椅背上）……您看，我脱了。我不穿西装，也还是江宇。失败的江宇，也是江宇。我这半年，连这个都不敢认。",
  emotion: "sad",
  autoNext: "jy4_s14",
}
```

```ts-dialog
// id: jy4_s14
{
  id: "jy4_s14",
  speaker: "doctor",
  text: "他脱下了西装——不是认输，是允许「失败的江宇」也是江宇。",
  choices: [
    { id: "jy4_s14_a", text: "「你脱下西装，不是认输，是允许『失败的江宇』也是江宇。这是你今晚给自己最大的礼物。」", kind: "empathy", effect: { mood: 4 }, next: "jy4_s15" },
    { id: "jy4_s14_b", text: "「『失败的江宇也是江宇』——这句话，你父亲当年需要有人跟他说吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "jy4_s15" },
  ],
}
```

```ts-dialog
// id: jy4_s15
{
  id: "jy4_s15",
  speaker: "patient",
  text: "（他笑了，眼眶却红着）……需要。可那会儿没人跟他说。我替他憋了十年，今天我替他说一句——爸，你当年没完，我也没完。我们只是摔了一跤。",
  emotion: "calm",
  autoNext: "jy4_s16",
}
```

```ts-dialog
// id: jy4_s16
{
  id: "jy4_s16",
  speaker: "doctor",
  text: "他替父亲说出了那句话，也替自己说出了。",
  choices: [
    { id: "jy4_s16_a", text: "「你替父亲说出了那句话，也替自己说出了。这身西装脱下来，回家的路就清楚了。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "jy4_s17" },
    { id: "jy4_s16_b", text: "「回家的路上，你最想做的第一件事是什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "jy4_s17" },
  ],
}
```

```ts-dialog
// id: jy4_s17
{
  id: "jy4_s17",
  speaker: "patient",
  text: "……抱抱我太太，然后给我爸打个电话。不聊公司，不聊钱，就问问他，那个夏天他心里在想什么。我从来没问过他，这通电话，我欠了他十年。",
  emotion: "happy",
  autoNext: "jy4_s18",
}
```

```ts-dialog
// id: jy4_s18
{
  id: "jy4_s18",
  speaker: "doctor",
  text: "「欠了他十年的一通电话」——他终于敢拨出去了。",
  choices: [
    { id: "jy4_s18_a", text: "「这通电话，不是认输，是两个都摔过跤的人，终于敢说话了。那张清单你留着，那个声音再来敲门，你知道怎么开门，也知道怎么请它走。」", kind: "empathy", effect: { mood: 4 }, next: "jy_end_cure" },
    { id: "jy4_s18_b", text: "「你脱下西装的那一刻，『江宇=成功』这条等式就断了。从今天起，江宇就是江宇。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "jy_end_cure" },
  ],
}
```

#### 接纳路径（acceptance）

```ts-dialog
// id: jy4_a01
{
  id: "jy4_a01",
  speaker: "patient",
  text: "（他点点头）……带着它生活。您说的对，我可能没办法一下子把『不许失败』这道锁砸开。它跟了我十年，我允许它再锁一阵。",
  emotion: "neutral",
  autoNext: "jy4_a02",
}
```

```ts-dialog
// id: jy4_a02
{
  id: "jy4_a02",
  speaker: "doctor",
  text: "他没有选择「砸开」，而是选择了「共处」——这也是一种向前。",
  choices: [
    { id: "jy4_a02_a", text: "「允许它锁一阵，但把钥匙从它手里拿回来——让它锁着，你来开门。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "jy4_a03" },
    { id: "jy4_a02_b", text: "「它再锁你的时候，你会怎么回应它？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "jy4_a03" },
  ],
}
```

```ts-dialog
// id: jy4_a03
{
  id: "jy4_a03",
  speaker: "patient",
  text: "……我会跟它说：你喊了十年了，我知道你怕。但我今天想歇着。说多了，它好像真的会小声一点。",
  emotion: "calm",
  autoNext: "jy4_a04",
}
```

```ts-dialog
// id: jy4_a04
{
  id: "jy4_a04",
  speaker: "doctor",
  text: "他在「歇着」和「不许失败」之间，第一次站到了歇着这一边。",
  choices: [
    { id: "jy4_a04_a", text: "「那个声音会小声一点——不是因为你赢了它，是你不再怕它了。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "jy4_a05" },
    { id: "jy4_a04_b", text: "「如果有一天它真的安静了，你打算拿省下来的力气做什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "jy4_a05" },
  ],
}
```

```ts-dialog
// id: jy4_a05
{
  id: "jy4_a05",
  speaker: "patient",
  text: "（他想了想）……回去问我爸，那个夏天他心里在想什么。再带我太太吃顿好的，她这半年跟着我，瘦得比我还狠。我这些日子，连她都没好好看过。",
  emotion: "neutral",
  autoNext: "jy_end_accept",
}
```

#### 隐藏路径（hidden · 强制介入）

```ts-dialog
// id: jy4_h01
{
  id: "jy4_h01",
  speaker: "patient",
  text: "（他愣住了，半晌没说话。然后他的眼睛红了）……从来没有人说过他够了。我自己，也从来没对自己说过。您替他……替我说了。",
  emotion: "broken",
  autoNext: "jy4_h02",
}
```

```ts-dialog
// id: jy4_h02
{
  id: "jy4_h02",
  speaker: "doctor",
  text: "十年的空厂房，终于有人替他站了出来。但接下来，有个更重的决定需要你面对。",
  choices: [
    { id: "jy4_h02_a", text: "「我打算联系你父亲。那个夏天的事，不该只有你一个人记得。」", kind: "special", effect: { mood: -3 }, next: "jy4_h03" },
    { id: "jy4_h02_b", text: "「我们先把这件事放在这儿，等你准备好再说。」", kind: "empathy", effect: { trust: 1 }, next: "jy4_h05" },
  ],
}
```

```ts-dialog
// id: jy4_h03
{
  id: "jy4_h03",
  speaker: "patient",
  text: "（他的声音发抖）联系我爸？您……您要跟我爸谈那个夏天？医生，我怕。我这一辈子，都在躲那张照片里的厂房。",
  emotion: "scared",
  autoNext: "jy4_h04",
}
```

```ts-dialog
// id: jy4_h04
{
  id: "jy4_h04",
  speaker: "doctor",
  text: "他害怕，但这一次，他愿意让你扶着他走向那间厂房。",
  choices: [
    { id: "jy4_h04_a", text: "「你怕，是因为你高三那年一个人站在那间客厅。现在你二十八岁，身后有我，有你太太。」", kind: "special", effect: { truth: 3, mood: -2 }, next: "jy_end_hidden" },
    { id: "jy4_h04_b", text: "「我们先不急着谈。把这句话放在心里，等你觉得能开口的那天，我们再说。」", kind: "empathy", effect: { trust: 1 }, next: "jy4_h05" },
  ],
}
```

```ts-dialog
// id: jy4_h05
{
  id: "jy4_h05",
  speaker: "patient",
  text: "（他垂下眼睛）……好。等我觉得能说的时候，我再跟您说。谢谢您没有逼我。",
  emotion: "neutral",
  autoNext: "jy_end_accept",
}
```

---

## 三、结局

```ts-dialog
// id: jy_end_cure
{
  id: "jy_end_cure",
  speaker: "narration",
  text: "〔结局 · 治愈〕",
  isEnding: true,
  endingType: "cure",
  endingTitle: "脱下西装",
  endingText: "三个月后，江宇来信。他跟父亲通了电话，老人听到「爸，我败了」时沉默了很久，最后说了一句「你回家吧」。他说他挂了电话，在车里哭了半个小时。他不再去那家咖啡馆了，找了一份给人做技术顾问的活，债在一点点还。信的最后他写：西装我收起来了，等哪天我真的再开公司，再穿——那时候它就只是件衣服，不是壳了。",
  endingReward: { doctorReputation: 8, doctorMoney: 300, doctorExp: 50, doctorSanity: 5 },
}
```

```ts-dialog
// id: jy_end_accept
{
  id: "jy_end_accept",
  speaker: "narration",
  text: "〔结局 · 接纳〕",
  isEnding: true,
  endingType: "acceptance",
  endingTitle: "与它共处",
  endingText: "江宇没有再约新的会谈，但他每隔两个月会来一趟，坐一会儿，跟你聊几句。他说那个「不许失败」的声音还在，偶尔还是会冲他喊「你完了」。他现在会回一句：知道了，我今天想歇着。他说，西装偶尔还是会穿，但脱下来的时候，不再觉得自己也跟着没了。",
  endingReward: { doctorReputation: 4, doctorMoney: 180, doctorExp: 35, doctorSanity: 6 },
}
```

```ts-dialog
// id: jy_end_hidden
{
  id: "jy_end_hidden",
  speaker: "narration",
  text: "〔结局 · 隐藏·那间厂房〕",
  isEnding: true,
  endingType: "hidden",
  endingTitle: "那间厂房",
  endingText: "你约谈了江宇的父亲。老人坐在你对面，听到「他高三那年，你坐在客厅一个月，后来跟他说『你不算白活』」时，他很久没有说话。最后他说：「我不知道他记着。我那句话，是怕他跟我一样。」后来，江宇给你打过一次电话，说他爸破天荒地问了他一句「最近怎么样」。他说他挂了电话，一个人在路边站了很久。那个夏天的厂房，终于不止他一个人记得了。",
  endingReward: { doctorReputation: -10, doctorMoney: 100, doctorExp: 80, doctorSanity: -15 },
}
```

```ts-dialog
// id: jy_end_worsen
{
  id: "jy_end_worsen",
  speaker: "narration",
  text: "〔结局 · 恶化〕",
  isEnding: true,
  endingType: "worsen",
  endingTitle: "那件没人脱下的西装",
  endingText: "江宇没有再来。他太太后来转来一条消息：他又开始每天穿西装出门了，去那家咖啡馆，坐到下班点。她说，有一天她去咖啡馆找他，发现他对着电脑屏幕发呆，屏幕上一个字都没有。她说，他现在连「没事」都懒得说了。那张旧照片，被他塞回了抽屉最底层。",
  endingReward: { doctorReputation: -8, doctorMoney: 50, doctorExp: 10, doctorSanity: -20 },
}
```

---

## 四、状态

- [x] v3 机器可解析格式（ts-meta + ts-dialog 全部就位）
- [x] trust 锚点 15→28→40→50→58；truth 0→40；碎片 1 枚 @30
- [x] 恶化入口 @trust≤40（jy3_c09_c）；隐藏结局 @trust50（jy4_fork_c）
- [x] cure 主线 40 轮（4 节拍各 10 轮）
- [x] 转换器生成 + 走线验收（`node scripts/md-to-patient.mjs docs/stories/jiang-yu-v3.md --walk`）
  - 生成 jiang_yu.ts（105 节点 / 45 医生节点），结构校验 + tsc 通过
  - 走线 4 线全过：共情 cure+trust 58+40 轮 / 均衡 cure+碎片 1 / 失误 worsen+trust≤40 / 探问 cure+truth 40
