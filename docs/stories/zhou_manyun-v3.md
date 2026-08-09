# 周曼云 · v3 · 中剧本 · 5 节拍 · 70+ 轮

> 中档剧本：大龄单身被父母期待绑架，把婚姻当成"毕业证书"。
> 数值：trust 15→30→45→57→65→70；truth 0→70；碎片 2 枚 @25/50；恶化入口 trust≤55；隐藏结局 @65；cure 主线 70+ 轮。
> 生成：`node scripts/md-to-patient.mjs docs/stories/zhou_manyun-v3.md --walk`

---

## 节拍规划表

| 节拍 | 主题 | trust | truth | 阻抗 | 关键事件 | 碎片 |
|---|---|---|---|---|---|---|
| 1 | 初访·表层（相亲倦怠/化妆逃避/奖状） | 15→30 (+17) | 0→26 | c04 logic | c08 confront req20 | — |
| 2 | 中间层·掉队（妈妈眼泪/同学聚会） | 30→45 (+19) | 26→56 | c04 logic | c08 confront req25 | m1 @truth25（听话换夸奖） |
| 3 | 深层·毕业证书（把人生过成考试） | 45→57 (+11) | 56→86 | c04 logic | c08 confront req40 | m2 @truth50（被当库存） |
| 4 | 根源信念·凑合（关键转折+监工） | 57→65 (+6) | 86→… | c04 logic | c09 恶化入口 req≤55 | — |
| 5 | 转向+结局 | 65→70 (+2) | …→100 | — | fork special / empathy / confront req65 | — |

**数值口径**：trust 单调递增，empathy 与 probe 同涨 trust；轻推进 +1~+2、实质 +2~+3、纯过场 +0；logic/prescribe 失误 -10~-12。truth 只由 probe 涨（+2 轻 / +3 实质）。defense 净下降，阻抗短时 +8~+12 回落。cure 主线共情线 trust 精确累加 55（15→70）。

---

## 〇、人物档案

**姓名** 周曼云，35 岁，银行客户经理，独居，有房有车。朋友见她相亲越相越颓、开始自我怀疑，拉她来聊聊。

**一句话核心** 她不是怕孤独终老，是怕爸妈那句"你让我们在亲戚面前抬不起头"——婚姻是她的毕业证书，不领到就一直是差生。

**三层真相**
- 表层（开场就说）：每个周末被安排相亲；见面前化妆到一半会突然不想去；被问"还没对象？"就尴尬转移话题。
- 中间层（节拍 2 揭）：妈妈隔三差五哭诉"你不结婚我闭不上眼"；同学聚会一个个抱娃，她觉得自己"掉队了"。
- 深层（节拍 3-4 揭）：从小"听话=被爱"，成绩好换夸奖、懂事换安心；她把人生过成了考试——结婚是最后一道大题，答不上来就否定整张卷子。核心信念："如果我不结婚，我还值得被爱吗？"

**角色三角**
- 施压者：爸妈的期待与"别人都结婚了"的目光。
- 情感忽视者：只关心她"结没结婚"、不关心她"过得好不好"的家人。
- 被守护者：那个一直想被夸的小孩。

**症状意义** 把婚姻当任务，是为了不用面对"如果我不结婚，我还值得被爱吗"这个问题。开场埋（化妆到一半不想去、被问"还没对象"就躲），中段被问（"你妈那滴眼泪牵着谁"），高潮意义反转——她发现相亲男那句"凑合过吧"触发的不是委屈而是愤怒，因为她一直被当"库存"在清。

**关键转折** 一次相亲，对方说"你也这岁数了，凑合过吧"——她第一次觉得愤怒，意识到自己一直被当"库存"在清。

---

## 一、剧本元信息（ts-meta）

```ts-meta
// id: zhou_manyun
// tier: 中
// anchor: 15,30,45,57,65,70
// truthEnd: 70
// minCureRounds: 70
// fragments: 2
// worsenAtMost: 55
{
  id: "zhou_manyun",
  name: "周曼云",
  title: "35 岁银行客户经理 · 被闺蜜送来聊聊",
  intro: "闺蜜拉她来，说她最近相亲越相越颓、开始自我怀疑。她本人坐下第一句是：『我真没什么事，就是相亲相得有点烦。』手里拎着一杯凉了的咖啡，妆容精致，但人很疲惫。",
  surface: "每个周末被安排相亲；见面前化妆到一半会突然不想去；被问『还没对象？』就尴尬转移话题。说话得体、利落，习惯把『没事』『我挺好』挂在嘴边，可一提到结婚就慌。",
  truth: "从小『听话=被爱』，成绩好换夸奖、懂事换安心。她把人生过成了考试——奖状是第一门，升职是第二门，结婚是最后一道大题，答不上来就否定整张卷子。她怕的不是孤独终老，是爸妈那句『你让我们抬不起头』：婚姻是她的毕业证书，不领到就一直是差生。核心信念：『如果我不结婚，我还值得被爱吗？』",
  palette: { primary: "#c98a5e", secondary: "#e3bd92", fog: "#8a6a58", bright: "#f4e0c0" },
  baseReward: 750,
  difficulty: "普通",
  startNode: "zmy1_start",
  initialState: { trust: 15, defense: 68, mood: 32, truth: 0, round: 0 },
  memoryFragments: [
    {
      id: "zhou_m1",
      trigger: { truth: 25 },
      title: "那张成绩单",
      text: "我七岁那年，拿了张数学竞赛一等奖的奖状回家。我妈在厨房，那天难得没唠叨，笑着摸我的头，说『我们曼云真争气』。那一刻我心想，只要我一直这么争气，妈妈就会一直这么笑。后来有一次我考砸了，她没骂我，就是一整顿饭没怎么说话。那个安静，比打我一顿还难受。从那以后，我做什么都想再做好一点，生怕那顿安静，又端上桌来。",
      emotion: "sad",
    },
    {
      id: "zhou_m2",
      trigger: { truth: 50 },
      title: "相亲那顿饭",
      text: "他坐在我对面，问完我的收入，又问我的房是不是全款。他眼神从上到下打量我，像在给一件货估价。末了他补了一句：『你这岁数，能挑的也不多了。』我脸上还挂着笑，手在桌子底下死死掐着自己。那一刻我忽然明白，我不是来相亲的，我是来被人挑选的。我那么努力地生活，怎么一坐到这里，就变成了一件等人接手的库存。",
      emotion: "broken",
    },
  ],
}
```

---

## 二、节拍骨架（ts-dialog 节点）

### 节拍 1 · 初访·表层（trust 15→30，truth 0→15，阻抗 c04）

```ts-dialog
// id: zmy1_start
{
  id: "zmy1_start",
  speaker: "narration",
  text: "周曼云是踩着预约时间到的，手里拎着一杯已经凉了的咖啡。她穿着职业套装，妆容精致，坐下来的第一件事是把手机屏幕朝下扣在桌上。她说是朋友非要她来，她实在推不掉——「我没什么事，就是相亲相得有点烦。」",
  autoNext: "zmy1_p01",
}
```

```ts-dialog
// id: zmy1_p01
{
  id: "zmy1_p01",
  speaker: "patient",
  text: "医生您好。我真没什么大事……就是朋友说我最近状态不对，非拉着我来看看。其实我好得很，有房有车，工作也顺，就是……周末总被安排相亲，有点累。",
  emotion: "neutral",
  autoNext: "zmy1_c01",
}
```

```ts-dialog
// id: zmy1_c01
{
  id: "zmy1_c01",
  speaker: "doctor",
  text: "她把「好得很」和「有点累」放在同一句话里，像在替自己辩护。",
  choices: [
    { id: "zmy1_c01_a", text: "「你说你『好得很』，可你坐在这儿了。能歇一歇的人，才敢承认自己累。」", kind: "empathy", effect: { trust: 2, defense: -1 }, next: "zmy1_p02" },
    { id: "zmy1_c01_b", text: "「相亲相得『有点累』——是身体累，还是心累？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy1_p02" },
  ],
}
```

```ts-dialog
// id: zmy1_p02
{
  id: "zmy1_p02",
  speaker: "patient",
  text: "……心累吧。我都不爱化妆了。以前我化妆挺积极的，现在画到一半，看着镜子里那张脸，突然就不想去了。",
  emotion: "anxious",
  autoNext: "zmy1_c02",
}
```

```ts-dialog
// id: zmy1_c02
{
  id: "zmy1_c02",
  speaker: "doctor",
  text: "「看着镜子突然不想去」——这是个很具体的画面。",
  choices: [
    { id: "zmy1_c02_a", text: "「画到一半不想去，那一瞬间，你脑子里闪的是什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy1_p03" },
    { id: "zmy1_c02_b", text: "「你连化妆的力气都不想给了——那阵子，你自己有没有心疼过自己？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "zmy1_p03" },
  ],
}
```

```ts-dialog
// id: zmy1_p03
{
  id: "zmy1_p03",
  speaker: "patient",
  text: "……我没想过心疼自己。我就觉得，我这么大了，还让爸妈操心，挺不孝的。每次他们安排相亲，我要是说不想去，我妈就……",
  emotion: "neutral",
  autoNext: "zmy1_c03",
}
```

```ts-dialog
// id: zmy1_c03
{
  id: "zmy1_c03",
  speaker: "doctor",
  text: "「我妈就……」——你话说到一半，停住了。",
  choices: [
    { id: "zmy1_c03_a", text: "「你妈就怎么样？你说到一半，不敢往下说了。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy1_p04" },
    { id: "zmy1_c03_b", text: "「『不孝』这两个字，是谁先往你头上安的？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "zmy1_p04" },
  ],
}
```

```ts-dialog
// id: zmy1_p04
{
  id: "zmy1_p04",
  speaker: "patient",
  text: "……我妈就哭。她也不骂我，就是抹眼泪，说「你不结婚，妈闭不上眼」。她一哭，我就没辙了。那天那场相亲，我就是这么去的。",
  emotion: "sad",
  autoNext: "zmy1_c04",
}
```

```ts-dialog
// id: zmy1_c04
{
  id: "zmy1_c04",
  speaker: "doctor",
  text: "「她哭，你就去」——你在替她活，还是在替自己活？",
  choices: [
    { id: "zmy1_c04_a", text: "「她哭，你就去。那你呢？你想去吗？」", kind: "probe", effect: { trust: 2, truth: 2 }, next: "zmy1_p05" },
    { id: "zmy1_c04_b", text: "「你被你妈那滴眼泪，牵着走了这么多年。你自己站在哪边，你自己知道吗？」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "zmy1_p05" },
    { id: "zmy1_c04_c", text: "「爸妈年纪大了，就盼着你有个家。你就当孝顺，别让他们操心了。」", kind: "logic", effect: { trust: -10, defense: 8, mood: -3 }, next: "zmy1_r01" },
  ],
}
```

```ts-dialog
// id: zmy1_r01
{
  id: "zmy1_r01",
  speaker: "patient",
  text: "（她猛地抬头）……您也这么说？您也觉得我该凑合？我要是真能凑合，我就不会……算了。您跟那些人一样，都觉得我矫情。",
  emotion: "angry",
  autoNext: "zmy1_p05",
}
```

```ts-dialog
// id: zmy1_p05
{
  id: "zmy1_p05",
  speaker: "patient",
  text: "……对不起，我又急了。我最近特别容易急。我也不想冲您。就是……那句「孝顺」，我听了二十多年了，一听见就浑身难受。",
  emotion: "anxious",
  autoNext: "zmy1_c05",
}
```

```ts-dialog
// id: zmy1_c05
{
  id: "zmy1_c05",
  speaker: "doctor",
  text: "「一听见『孝顺』就难受」——这句话卡了她很多年。",
  choices: [
    { id: "zmy1_c05_a", text: "「『孝顺』这两个字，从谁嘴里说出来的？你爸，你妈，还是你自己？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy1_p06" },
    { id: "zmy1_c05_b", text: "「你一听『孝顺』就难受——这感觉，比相亲还让你喘不过气，对吗？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "zmy1_p06" },
  ],
}
```

```ts-dialog
// id: zmy1_p06
{
  id: "zmy1_p06",
  speaker: "patient",
  text: "……我爸妈其实对我挺好的。我小时候要什么给什么。就是我考不好的时候，他们不怎么说话。我一考好，他们就笑。我知道他们爱我，我就是……",
  emotion: "neutral",
  autoNext: "zmy1_c06",
}
```

```ts-dialog
// id: zmy1_c06
{
  id: "zmy1_c06",
  speaker: "doctor",
  text: "「考好就笑，考不好就不说话」——她把这份记忆，摆到了桌上。",
  choices: [
    { id: "zmy1_c06_a", text: "「你爸妈的『好』，好像得先考个好成绩，才够得着。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "zmy1_p07" },
    { id: "zmy1_c06_b", text: "「『考好就笑，考不好不说话』——这句话，你记了多久？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy1_p07" },
  ],
}
```

```ts-dialog
// id: zmy1_p07
{
  id: "zmy1_p07",
  speaker: "patient",
  text: "……记到现在吧。我从小就知道，我只要够乖、够努力，爸妈就高兴。我上学那会儿，年年拿奖状，我妈拿出去跟邻居显摆。她那会儿笑得多开心啊。",
  emotion: "neutral",
  autoNext: "zmy1_c07",
}
```

```ts-dialog
// id: zmy1_c07
{
  id: "zmy1_c07",
  speaker: "doctor",
  text: "她把「妈妈的笑」和「自己的努力」拴在了一起。",
  choices: [
    { id: "zmy1_c07_a", text: "「你记得妈妈笑的样子——你把『让她笑』，当成了自己的任务。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "zmy1_p08" },
    { id: "zmy1_c07_b", text: "「『年年拿奖状』——那阵子，你要是没拿奖状，会怎样？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy1_p08" },
  ],
}
```

```ts-dialog
// id: zmy1_p08
{
  id: "zmy1_p08",
  speaker: "patient",
  text: "……没拿奖状，就是普通地过一天。不骂我，也不夸我。可就是那种「普通」，让我觉得比考砸了还难受。好像我那天的存在，没用了。",
  emotion: "sad",
  autoNext: "zmy1_c08",
}
```

```ts-dialog
// id: zmy1_c08
{
  id: "zmy1_c08",
  speaker: "doctor",
  text: "「没用了」——她那么小，就把自己的价值，拴在了一张奖状上。",
  choices: [
    { id: "zmy1_c08_a", text: "「『没用了』——你那么小，就把自己的价值，拴在了一张奖状上。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "zmy1_p09" },
    { id: "zmy1_c08_b", text: "「『没用了』这三个字，你是什么时候开始信了的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy1_p09" },
    { id: "zmy1_c08_c", text: "「你把人生过成了一场考试——奖状是第一门，结婚是最后一门。你怕的，是不是最后一门交白卷？」", kind: "confront", require: { trust: 20 }, effect: { trust: 1, truth: 3, mood: -2 }, next: "zmy1_p09", hint: "需要信任≥20" },
  ],
}
```

```ts-dialog
// id: zmy1_p09
{
  id: "zmy1_p09",
  speaker: "patient",
  text: "（她沉默了一会儿）……我不知道。我只知道，我现在三十五了，房车都有，业绩年年前排，可我回家过年，我爸妈看我的眼神，还是像在看我交的那张卷子。",
  emotion: "anxious",
  autoNext: "zmy1_c09",
}
```

```ts-dialog
// id: zmy1_c09
{
  id: "zmy1_c09",
  speaker: "doctor",
  text: "「看我交的那张卷子」——她已经开始用考试的比喻了。",
  choices: [
    { id: "zmy1_c09_a", text: "「你爸妈看你的眼神——那张卷子上，现在缺的是哪一题？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy1_p10" },
    { id: "zmy1_c09_b", text: "「你那么努力，还是没让他们安心。这份『怎么都不够』，压得你喘不过气吧。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "zmy1_p10" },
  ],
}
```

```ts-dialog
// id: zmy1_p10
{
  id: "zmy1_p10",
  speaker: "patient",
  text: "……缺的是结婚。我妈说，你现在什么都好，就差这一样。就差这一样。她说这话的时候，我都不知道我该哭还是该笑。我忙了半辈子，到头来在她那儿，就差这一样。",
  emotion: "sad",
  autoNext: "zmy1_c10",
}
```

```ts-dialog
// id: zmy1_c10
{
  id: "zmy1_c10",
  speaker: "doctor",
  text: "「就差这一样」——这句话里，压着多少她的委屈。",
  choices: [
    { id: "zmy1_c10_a", text: "「『就差这一样』——你妈这句话，像不像在说，你前面那些，都不算数？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy1_p11" },
    { id: "zmy1_c10_b", text: "「你听出那句『就差这一样』里的委屈了吗？那是你替自己抱不平的声音。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "zmy1_p11" },
  ],
}
```

```ts-dialog
// id: zmy1_p11
{
  id: "zmy1_p11",
  speaker: "patient",
  text: "……委屈。我从来没这么想过。我一直觉得，是我没做到位，是我让爸妈操心。可您一说「委屈」，我眼眶就热了。",
  emotion: "sad",
  autoNext: "zmy1_c11",
}
```

```ts-dialog
// id: zmy1_c11
{
  id: "zmy1_c11",
  speaker: "doctor",
  text: "那股委屈，终于被她说出口了。",
  choices: [
    { id: "zmy1_c11_a", text: "「你让眼眶热一热。这股委屈，你压了多少年了？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy1_p12" },
    { id: "zmy1_c11_b", text: "（安静地坐着，让她自己接住这份委屈。）", kind: "silence", effect: { trust: 1, mood: 2 }, next: "zmy1_p12" },
  ],
}
```

```ts-dialog
// id: zmy1_p12
{
  id: "zmy1_p12",
  speaker: "patient",
  text: "……记不清多少年了。反正挺久了。我平时不这样，我上班挺利索的，客户都夸我。就一到这种事上，我就……特别没出息。",
  emotion: "anxious",
  autoNext: "zmy1_c12",
}
```

```ts-dialog
// id: zmy1_c12
{
  id: "zmy1_c12",
  speaker: "doctor",
  text: "「一到这种事上就没出息」——她把自己最好的那面，留给了工作。",
  choices: [
    { id: "zmy1_c12_a", text: "「『这种事』——你把它归成一类了。这一类事，都是什么事？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy1_p13" },
    { id: "zmy1_c12_b", text: "「你不是没出息。是你那些『出息』，在这件事上，全都不管用了。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "zmy1_p13" },
  ],
}
```

```ts-dialog
// id: zmy1_p13
{
  id: "zmy1_p13",
  speaker: "patient",
  text: "……就是结婚这事儿吧。我一碰它就慌。我明明什么都行，一到相亲桌上，我就觉得我哪都不行。",
  emotion: "neutral",
  autoNext: "zmy1_c13",
}
```

```ts-dialog
// id: zmy1_c13
{
  id: "zmy1_c13",
  speaker: "doctor",
  text: "「在客户面前是经理，一进相亲桌就觉得自己不行」——这中间的落差，值得她看看。",
  choices: [
    { id: "zmy1_c13_a", text: "「你在客户面前是经理，一进相亲桌就觉得自己不行——这中间的落差，是不是有什么被你看漏了？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "zmy1_p14" },
    { id: "zmy1_c13_b", text: "（点点头，让她顺着这个落差，再往里走一步。）", kind: "silence", effect: { trust: 0, mood: 2 }, next: "zmy1_p14" },
  ],
}
```

```ts-dialog
// id: zmy1_p14
{
  id: "zmy1_p14",
  speaker: "patient",
  text: "……被看漏的……我今天先到这儿吧。医生，我脑子有点乱。您说的那些，我得回去想想。下次……下次我再跟您说。",
  emotion: "neutral",
  autoNext: "zmy1_c14",
}
```

```ts-dialog
// id: zmy1_c14
{
  id: "zmy1_c14",
  speaker: "doctor",
  text: "第一次会谈，她看见了一点东西——那不是矫情，是她的委屈。",
  choices: [
    { id: "zmy1_c14_a", text: "「好。今天你先看见了一点东西——那不是矫情，是你的委屈。下次我们接着看。」", kind: "empathy", effect: { trust: 0, mood: 3 }, next: "zmy1_out" },
    { id: "zmy1_c14_b", text: "「下次，我们聊聊那张卷子——你说你『就差这一样』，我想听听，这一样要是永远补不上，你怕什么。」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "zmy1_out" },
  ],
}
```

```ts-dialog
// id: zmy1_out
{
  id: "zmy1_out",
  speaker: "narration",
  text: "周曼云起身时，把椅子轻轻推回原位，又对着手机屏幕照了照自己，像是确认妆容有没有花。走到门口她停了一下，没回头：「……我今天话有点多。对不起。」",
  beatEnd: { resumeNode: "zmy2_start" },
  autoNext: "zmy2_start",
}
```

### 节拍 2 · 中间层·掉队（trust 30→45，truth 15→25，[m1 碎片@25]，关键事件 c08 req25）

```ts-dialog
// id: zmy2_start
{
  id: "zmy2_start",
  speaker: "narration",
  text: "一周后，周曼云比上次准时。她坐下来，第一句话是「我这周推掉了一场相亲」。她说的时候有点得意，又马上补一句「我妈还不知道」。她把包放在腿上，手指无意识地转着手机。",
  autoNext: "zmy2_p01",
}
```

```ts-dialog
// id: zmy2_p01
{
  id: "zmy2_p01",
  speaker: "patient",
  text: "我这周推了一场相亲，心里痛快了两天，我妈还不知道。其实我知道她早晚要知道。可我就是想，先痛快两天再说。",
  emotion: "neutral",
  autoNext: "zmy2_c01",
}
```

```ts-dialog
// id: zmy2_c01
{
  id: "zmy2_c01",
  speaker: "doctor",
  text: "「先痛快两天再说」——她第一次，为自己做了一件想做的事。",
  choices: [
    { id: "zmy2_c01_a", text: "「推掉那场相亲，你『痛快』——这份痛快，是在反抗谁？」", kind: "probe", effect: { trust: 2, truth: 2 }, next: "zmy2_p02" },
    { id: "zmy2_c01_b", text: "「你能为自己推掉一场，已经很不容易了。这份『痛快』，记住它。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "zmy2_p02" },
  ],
}
```

```ts-dialog
// id: zmy2_p02
{
  id: "zmy2_p02",
  speaker: "patient",
  text: "……反抗我妈吧，也反抗那个「就差这一样」。可我心里也打鼓，我这周不去，下回我妈又给安排，我能推几回？",
  emotion: "anxious",
  autoNext: "zmy2_c02",
}
```

```ts-dialog
// id: zmy2_c02
{
  id: "zmy2_c02",
  speaker: "doctor",
  text: "「我能推几回」——她其实在问一个更大的问题。",
  choices: [
    { id: "zmy2_c02_a", text: "「『我能推几回』——你问的其实不是相亲，是你到底有没有资格不听话。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy2_p03" },
    { id: "zmy2_c02_b", text: "（不接话，让她自己听见这个问题。）", kind: "silence", effect: { trust: 1, mood: 2 }, next: "zmy2_p03" },
  ],
}
```

```ts-dialog
// id: zmy2_p03
{
  id: "zmy2_p03",
  speaker: "patient",
  text: "……上回同学聚会，我那几个姐妹，一个抱着二胎，一个刚晒完婚戒。她们聊孩子上学，我插不上嘴，就低头喝饮料。回来的路上，我一个人在车里坐了很久。",
  emotion: "sad",
  autoNext: "zmy2_c03",
}
```

```ts-dialog
// id: zmy2_c03
{
  id: "zmy2_c03",
  speaker: "doctor",
  text: "「一个人在车里坐了很久」——那是个很长的沉默。",
  choices: [
    { id: "zmy2_c03_a", text: "「在车里坐了很久——那阵子，你心里在想什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy2_p04" },
    { id: "zmy2_c03_b", text: "「你在那场聚会里，好像不是她们的一员了——这份『掉队』的感觉，比相亲还让你难受？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "zmy2_p04" },
  ],
}
```

```ts-dialog
// id: zmy2_p04
{
  id: "zmy2_p04",
  speaker: "patient",
  text: "……想的是，我怎么就到这一步了。我上学是学霸，上班是骨干，怎么就……怎么就落她们后头了。医生，我知道这话说出来很俗，可我真的觉得，我掉队了。",
  emotion: "sad",
  autoNext: "zmy2_c04",
}
```

```ts-dialog
// id: zmy2_c04
{
  id: "zmy2_c04",
  speaker: "doctor",
  text: "「落她们后头」——她把人生过成了排队。",
  choices: [
    { id: "zmy2_c04_a", text: "「『落她们后头』——你把人生过成了排队。可人生真是排队吗？」", kind: "probe", effect: { trust: 2, truth: 2 }, next: "zmy2_p05" },
    { id: "zmy2_c04_b", text: "「你考第一、当骨干，没让自己掉过队。怎么一谈到结婚，你就判自己输了？」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "zmy2_p05" },
    { id: "zmy2_c04_c", text: "「同学们都成家了，你就当是为父母，也为自己，加把劲。别总想着躲。」", kind: "logic", effect: { trust: -10, defense: 8, mood: -3 }, next: "zmy2_r01" },
  ],
}
```

```ts-dialog
// id: zmy2_r01
{
  id: "zmy2_r01",
  speaker: "patient",
  text: "（她声音一下子高起来）……我躲？我要是躲，我能一场场去相亲？我去了，我每场都去了！您觉得我不够努力是吗？那您告诉我，我该怎么「加把劲」？！",
  emotion: "angry",
  autoNext: "zmy2_p05",
}
```

```ts-dialog
// id: zmy2_p05
{
  id: "zmy2_p05",
  speaker: "patient",
  text: "……对不起。我又急了。我最近一碰这个就炸。您别往心里去。就是「加把劲」这三个字，我听了就难受，好像我再努努力，就能把婚姻这事儿「解决」了一样。可它不是作业啊。",
  emotion: "anxious",
  autoNext: "zmy2_c05",
}
```

```ts-dialog
// id: zmy2_c05
{
  id: "zmy2_c05",
  speaker: "doctor",
  text: "「它不是作业」——可它在她心里，一直被当成作业。",
  choices: [
    { id: "zmy2_c05_a", text: "「『它不是作业』——那你心里，一直把它当成什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy2_p06" },
    { id: "zmy2_c05_b", text: "「你听不得『加把劲』——因为你知道，你早就使尽力气了，不是没使劲。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "zmy2_p06" },
  ],
}
```

```ts-dialog
// id: zmy2_p06
{
  id: "zmy2_p06",
  speaker: "patient",
  text: "……我把我爸妈的眼泪，当成了我的作业。我从小到大，最怕的就是我爸妈叹气。他们一叹气，我就觉得自己没做好。我这辈子，好像都在赶着把他们的「叹息」变成「笑脸」。",
  emotion: "neutral",
  autoNext: "zmy2_c06",
}
```

```ts-dialog
// id: zmy2_c06
{
  id: "zmy2_c06",
  speaker: "doctor",
  text: "「把他们的叹息变成笑脸」——这是她给自己定的一生功课。",
  choices: [
    { id: "zmy2_c06_a", text: "「你把『让爸妈不叹气』，当成了自己一辈子的作业——那你呢？你什么时候交过自己的作业？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "zmy2_p07" },
    { id: "zmy2_c06_b", text: "「『他们的叹息』——你从几岁起，开始怕这个的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy2_p07" },
  ],
}
```

```ts-dialog
// id: zmy2_p07
{
  id: "zmy2_p07",
  speaker: "patient",
  text: "……很小吧。我印象里，我爸妈很少吵架，也很少夸人。我一考好，家里的气氛就松一点；一考差，饭桌上就没人说话。我那会儿就想，我得让这个家一直松快点。",
  emotion: "neutral",
  autoNext: "zmy2_c07",
}
```

```ts-dialog
// id: zmy2_c07
{
  id: "zmy2_c07",
  speaker: "doctor",
  text: "「让这个家一直松快点」——她那么小，就学会了当家里的「好天气」。",
  choices: [
    { id: "zmy2_c07_a", text: "「你在用成绩，替这个家守着那点松快——你那么小，就学会当家里的『好天气』了。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "zmy2_p08" },
    { id: "zmy2_c07_b", text: "「『饭桌上没人说话』——那种安静，你到现在还记得？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy2_p08" },
  ],
}
```

```ts-dialog
// id: zmy2_p08
{
  id: "zmy2_p08",
  speaker: "patient",
  text: "……记得。一安静，我就坐立不安，觉得是我惹的。后来我就养成了一个习惯，只要气氛不对，我就找话说，或者赶紧把碗筷收了，假装有事忙。",
  emotion: "sad",
  autoNext: "zmy2_c08",
}
```

```ts-dialog
// id: zmy2_c08
{
  id: "zmy2_c08",
  speaker: "doctor",
  text: "「假装有事忙」——她从小就在收拾家里的气氛。",
  choices: [
    { id: "zmy2_c08_a", text: "「你那么小就学会『收拾气氛』了——可你自己的气氛，谁来替你收拾？」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "zmy2_p09" },
    { id: "zmy2_c08_b", text: "「现在爸妈一说『就差这一样』，你是不是又回到饭桌上那种安静里了？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy2_p09" },
    { id: "zmy2_c08_c", text: "「你怕的从来不是不结婚——你怕的，是『不结婚』这三个字，让你爸妈重新安静下来。」", kind: "confront", require: { trust: 25 }, effect: { trust: 1, truth: 3, mood: -2 }, next: "zmy2_p09", hint: "需要信任≥25" },
  ],
}
```

```ts-dialog
// id: zmy2_p09
{
  id: "zmy2_p09",
  speaker: "patient",
  text: "（她愣住，半晌没说话）……是。您说对了。我怕那个安静。我怕我妈那个「你不结婚我闭不上眼」，说完之后，饭桌上一片沉默。那种沉默比哭还吓人。",
  emotion: "sad",
  autoNext: "zmy2_c09",
}
```

```ts-dialog
// id: zmy2_c09
{
  id: "zmy2_c09",
  speaker: "doctor",
  text: "「那种沉默比哭还吓人」——她最怕的，原来从来不是哭。",
  choices: [
    { id: "zmy2_c09_a", text: "「那种沉默里，你听见的是什么？是他们的失望，还是你不够好的声音？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy2_p10" },
    { id: "zmy2_c09_b", text: "（陪她停在那段沉默里，不急着把她拉出来。）", kind: "silence", effect: { trust: 1, mood: 2 }, next: "zmy2_p10" },
  ],
}
```

```ts-dialog
// id: zmy2_p10
{
  id: "zmy2_p10",
  speaker: "patient",
  text: "……是我自己不够好的声音。我一听见沉默，就自动翻译成「曼云，你不行」。这个翻译，我用了二十多年，都不带卡壳的。",
  emotion: "anxious",
  autoNext: "zmy2_c10",
}
```

```ts-dialog
// id: zmy2_c10
{
  id: "zmy2_c10",
  speaker: "doctor",
  text: "「曼云，你不行」——她给那个声音，起了名字。",
  choices: [
    { id: "zmy2_c10_a", text: "「『你不行』——这个声音，是他们的，还是早就变成你自己的了？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy2_p11" },
    { id: "zmy2_c10_b", text: "「你能把翻译过程说出来——这已经是不一样了。从前，你连听都不敢听。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "zmy2_p11" },
  ],
}
```

```ts-dialog
// id: zmy2_p11
{
  id: "zmy2_p11",
  speaker: "patient",
  text: "……我其实知道，我爸妈不是想逼我。他们是怕我老了没人管。我妈说，她闭不上眼，是怕我一个人。我懂。可我一懂，我就更没法不去了。",
  emotion: "neutral",
  autoNext: "zmy2_c11",
}
```

```ts-dialog
// id: zmy2_c11
{
  id: "zmy2_c11",
  speaker: "doctor",
  text: "「她怕你一个人」——那她呢？",
  choices: [
    { id: "zmy2_c11_a", text: "「你『懂』她怕你一个人——那你呢？你一个人，怕吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy2_p12" },
    { id: "zmy2_c11_b", text: "「你那么懂他们，谁来懂懂你？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "zmy2_p12" },
  ],
}
```

```ts-dialog
// id: zmy2_p12
{
  id: "zmy2_p12",
  speaker: "patient",
  text: "……我不知道我是不是怕一个人。我独居好几年了，我挺习惯的。我周末睡到自然醒，自己煮咖啡，挺自在的。就是我妈那句「你一个人，妈不放心」，一出来，我这自在就全塌了。",
  emotion: "neutral",
  autoNext: "zmy2_c12",
}
```

```ts-dialog
// id: zmy2_c12
{
  id: "zmy2_c12",
  speaker: "doctor",
  text: "「一出来，自在就全塌了」——那句话的分量，比她自己还重。",
  choices: [
    { id: "zmy2_c12_a", text: "「你妈那句『不放心』，能把你一整天的自在都塌掉——你是在乎那句『不放心』，还是在乎『你不让我放心』这句判决？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy2_p13" },
    { id: "zmy2_c12_b", text: "「你一个人，明明过得挺好。是你妈不放心，不是你不安稳。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "zmy2_p13" },
  ],
}
```

```ts-dialog
// id: zmy2_p13
{
  id: "zmy2_p13",
  speaker: "patient",
  text: "……判决。您说得对，是判决。她那句「不放心」，落在我耳朵里，就是「你一个人，就是过不好」。我明明过得好，可她一句话，我就全盘否定了自己。",
  emotion: "sad",
  autoNext: "zmy2_c13",
}
```

```ts-dialog
// id: zmy2_c13
{
  id: "zmy2_c13",
  speaker: "doctor",
  text: "「你一个人，就是过不好」——她把这句话，当成了判决书。",
  choices: [
    { id: "zmy2_c13_a", text: "「她把『一个人』和『过不好』，焊在了一起。你也信了——所以你才拼命想找个人，来证明你过得好？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy2_p14" },
    { id: "zmy2_c13_b", text: "「你用自己的好日子，去对抗她的不放心——这份对抗，你扛了好几年了吧。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "zmy2_p14" },
  ],
}
```

```ts-dialog
// id: zmy2_p14
{
  id: "zmy2_p14",
  speaker: "patient",
  text: "……对。我拼命工作，拼命买房买车，就是想说，你看，我一个人也过得挺好。可没用。她一句「你就是没人陪」，我那些房子车子，全都不作数了。",
  emotion: "sad",
  autoNext: "zmy2_c14",
}
```

```ts-dialog
// id: zmy2_c14
{
  id: "zmy2_c14",
  speaker: "doctor",
  text: "「你挣的那些东西，在她那儿不作数」——那在谁那儿作数？",
  choices: [
    { id: "zmy2_c14_a", text: "「你挣的那些东西，在她那儿不作数——那在你心里，作数吗？你自己认可自己吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy2_p15" },
    { id: "zmy2_c14_b", text: "「你挣了那么多『证明』，却没挣到一句『你自己认可你』。今天，我想把这句话，先还给你。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "zmy2_p15" },
  ],
}
```

```ts-dialog
// id: zmy2_p15
{
  id: "zmy2_p15",
  speaker: "patient",
  text: "……医生，我今天有点累。可我又觉得，心里松了一点。好像有些话，我一直以为是我不该想的，其实……其实我也配想。",
  emotion: "calm",
  autoNext: "zmy2_c15",
}
```

```ts-dialog
// id: zmy2_c15
{
  id: "zmy2_c15",
  speaker: "doctor",
  text: "「我也配想」——这是她这几次会谈，最松动的一句话。",
  choices: [
    { id: "zmy2_c15_a", text: "「你配。你配被自己认可，不靠房子车子，也不靠一场婚姻。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "zmy2_out" },
    { id: "zmy2_c15_b", text: "「下次，我们聊聊那句『我也配想』——配想什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy2_out" },
  ],
}
```

```ts-dialog
// id: zmy2_out
{
  id: "zmy2_out",
  speaker: "narration",
  text: "周曼云走的时候，在门口停了一下，回头说：「我昨天路过一家花店，站了很久。我以前挺爱养花的，搬家以后就没养了。我那天想，要不要再买一盆。」",
  beatEnd: { resumeNode: "zmy3_start" },
  autoNext: "zmy3_start",
}
```

### 节拍 3 · 深层·毕业证书（trust 45→57，truth 25→40，[m2 碎片@50]，关键事件 c08 req40）

```ts-dialog
// id: zmy3_start
{
  id: "zmy3_start",
  speaker: "narration",
  text: "又一周，周曼云带了一小盆多肉，放在桌上，说是在那家花店买的。「我给它起了个名，叫曼云二号。」她说，「一号是我，它是二号，我要是养不活它，就当提前练手。」她说这话时，声音是轻松的，可手指一直在拨弄花盆边缘。",
  autoNext: "zmy3_p01",
}
```

```ts-dialog
// id: zmy3_p01
{
  id: "zmy3_p01",
  speaker: "patient",
  text: "我把那盆多肉买了。医生，你说好笑不好笑，我买一盆花，都要给自己找一堆理由。什么练手啊，什么一个人也得有点活物啊。我都不敢说，我就是喜欢。",
  emotion: "neutral",
  autoNext: "zmy3_c01",
}
```

```ts-dialog
// id: zmy3_c01
{
  id: "zmy3_c01",
  speaker: "doctor",
  text: "「我都不敢说，我就是喜欢」——她连喜欢，都要先打折扣。",
  choices: [
    { id: "zmy3_c01_a", text: "「『不敢说我就是喜欢』——你对自己的『喜欢』，什么时候开始要打折扣了？」", kind: "probe", effect: { trust: 2, truth: 2 }, next: "zmy3_p02" },
    { id: "zmy3_c01_b", text: "「你买一盆花，都要先给自己写好说明书——你对你自己的喜欢，也这么苛刻吗？」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "zmy3_p02" },
  ],
}
```

```ts-dialog
// id: zmy3_p02
{
  id: "zmy3_p02",
  speaker: "patient",
  text: "……苛刻。我做什么都想先找个「用处」。养花得有用，工作是正经，结婚是任务。我好像从来没为什么事，单纯因为它让我开心，就去做过。",
  emotion: "neutral",
  autoNext: "zmy3_c02",
}
```

```ts-dialog
// id: zmy3_c02
{
  id: "zmy3_c02",
  speaker: "doctor",
  text: "「单纯因为开心」——这是她人生里最陌生的一类事。",
  choices: [
    { id: "zmy3_c02_a", text: "「你把自己的人生，都过成了『有用的事』。那些没用的开心，你留了多少？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy3_p03" },
    { id: "zmy3_c02_b", text: "（让她看看那盆花，不打断。）", kind: "silence", effect: { trust: 0, mood: 2 }, next: "zmy3_p03" },
  ],
}
```

```ts-dialog
// id: zmy3_p03
{
  id: "zmy3_p03",
  speaker: "patient",
  text: "……没留。我连退休以后干嘛，都想好了——帮儿女带娃。可我还没结婚呢，我就把「带娃」排进我的人生表里了。医生，你说我是不是，把我自己的一生，都提前安排成别人的了？",
  emotion: "sad",
  autoNext: "zmy3_c03",
}
```

```ts-dialog
// id: zmy3_c03
{
  id: "zmy3_c03",
  speaker: "doctor",
  text: "「把我自己的一生，都安排成别人的了」——这句话，她自己说出来了。",
  choices: [
    { id: "zmy3_c03_a", text: "「『把自己的一生安排成别人的』——这句话，你是现在才看清的，还是早就知道了？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy3_p04" },
    { id: "zmy3_c03_b", text: "「你把『带娃』都排进日程了，可你自己想要的日子，在哪一栏？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "zmy3_p04" },
  ],
}
```

```ts-dialog
// id: zmy3_p04
{
  id: "zmy3_p04",
  speaker: "patient",
  text: "……我从来没给自己排过一栏。我上学听爸妈的，上班听领导的，相亲听我妈的。我活到三十五，好像一直在答卷子，从没给自己出过一道题。",
  emotion: "neutral",
  autoNext: "zmy3_c04",
}
```

```ts-dialog
// id: zmy3_c04
{
  id: "zmy3_c04",
  speaker: "doctor",
  text: "「从没给自己出过一道题」——她的人生，全是别人出的卷。",
  choices: [
    { id: "zmy3_c04_a", text: "「卷子上的题，都是谁出的？『嫁人』这道大题，又是谁押着必考的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy3_p05" },
    { id: "zmy3_c04_b", text: "「你答了三十五年的卷子——可你连试卷是不是发错了，都没敢问过。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "zmy3_p05" },
    { id: "zmy3_c04_c", text: "「人这一辈子，结婚生子是正常流程。你把它当任务，说明你还没想明白。」", kind: "logic", effect: { trust: -10, defense: 8, mood: -3 }, next: "zmy3_r01" },
  ],
}
```

```ts-dialog
// id: zmy3_r01
{
  id: "zmy3_r01",
  speaker: "patient",
  text: "（她冷笑了一声）……正常流程。医生，您这词用得真好。我妈要是听见您这么说，得把您当知音。我就是被这个「正常流程」卡了十年，十年！您知道吗，我一听这四个字，就想掀桌子。",
  emotion: "angry",
  autoNext: "zmy3_p05",
}
```

```ts-dialog
// id: zmy3_p05
{
  id: "zmy3_p05",
  speaker: "patient",
  text: "……对不起，我又失态了。可我真的受够了「正常」这两个字。我按时长大，按时上学，按时上班，就差没按时结婚。我按时了三十五年，怎么就在这最后一格，成了「不正常」？",
  emotion: "anxious",
  autoNext: "zmy3_c05",
}
```

```ts-dialog
// id: zmy3_c05
{
  id: "zmy3_c05",
  speaker: "doctor",
  text: "「按时了三十五年」——她把「正常」，活成了一条时刻表。",
  choices: [
    { id: "zmy3_c05_a", text: "「『按时』——你把人生过成了时刻表。误了『结婚』这一班，天就塌了吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy3_p06" },
    { id: "zmy3_c05_b", text: "「你按时了三十五年，累不累？这张时刻表，是谁给你排的？」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "zmy3_p06" },
  ],
}
```

```ts-dialog
// id: zmy3_p06
{
  id: "zmy3_p06",
  speaker: "patient",
  text: "……累。可我不敢摘下来。我一摘下来，我就得面对那个问题：如果我不结婚，我还值得被爱吗？我好像从小到大，都是靠「有用」「听话」换被爱的。我要是不做那些，谁还爱我？",
  emotion: "scared",
  autoNext: "zmy3_c06",
}
```

```ts-dialog
// id: zmy3_c06
{
  id: "zmy3_c06",
  speaker: "doctor",
  text: "核心的问题，被她自己问出来了——「如果我不结婚，我还值得被爱吗？」",
  choices: [
    { id: "zmy3_c06_a", text: "「『不做那些，谁还爱我』——你一直在用『做得好』，跟世界换爱。可这份爱，你从没白拿过吗？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "zmy3_p07" },
    { id: "zmy3_c06_b", text: "「『被爱』——你那么怕失去它。可你现在这样，得到过它吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy3_p07" },
  ],
}
```

```ts-dialog
// id: zmy3_p07
{
  id: "zmy3_p07",
  speaker: "patient",
  text: "……我不知道。我爸妈爱我，我知道。可爱的是「听话的曼云」「考第一的曼云」「当经理的曼云」。要是有一天我不听话了，不考第一了，不是经理了……他们看我的眼神，会变吗？我连想都不敢想。",
  emotion: "sad",
  autoNext: "zmy3_c07",
}
```

```ts-dialog
// id: zmy3_c07
{
  id: "zmy3_c07",
  speaker: "doctor",
  text: "「可爱的是『听话的曼云』」——她把爱，列出了条件清单。",
  choices: [
    { id: "zmy3_c07_a", text: "「你不敢想——因为你怕答案。可这个不敢想，正是你把自己架上去的根源。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "zmy3_p08" },
    { id: "zmy3_c07_b", text: "「你把『被爱』的条件，一条条列给自己听——这些条件，是你爸妈说的，还是你自己加的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy3_p08" },
  ],
}
```

```ts-dialog
// id: zmy3_p08
{
  id: "zmy3_p08",
  speaker: "patient",
  text: "……我自己加的。他们没明说。可他们用脸色、用叹气、用那句「就差这一样」，一点一点，教会了我。我就像个……生怕自己考砸的学生，连正确答案都得猜他们想要哪个。",
  emotion: "neutral",
  autoNext: "zmy3_c08",
}
```

```ts-dialog
// id: zmy3_c08
{
  id: "zmy3_c08",
  speaker: "doctor",
  text: "「连正确答案都得猜他们想要哪个」——她已经忘了自己想选什么了。",
  choices: [
    { id: "zmy3_c08_a", text: "「『猜他们想要哪个答案』——你已经不记得自己原本想选哪个了，对吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy3_p09" },
    { id: "zmy3_c08_b", text: "（陪她在这个发现里待一会儿。）", kind: "silence", effect: { trust: 1, mood: 2 }, next: "zmy3_p09" },
    { id: "zmy3_c08_c", text: "「你不是在过人生，你是在交卷。交卷交习惯了，你连自己是谁，都快忘了——对不对？」", kind: "confront", require: { trust: 40 }, effect: { trust: 1, truth: 3, mood: -2 }, next: "zmy3_p09", hint: "需要信任≥40" },
  ],
}
```

```ts-dialog
// id: zmy3_p09
{
  id: "zmy3_p09",
  speaker: "patient",
  text: "（她低下头，声音很轻）……对。我有时候半夜醒过来，看着天花板，会问自己：曼云，你到底想要什么？然后我就……想不出来。我连自己的愿望都列不出来。我只列得出别人要的。",
  emotion: "sad",
  autoNext: "zmy3_c09",
}
```

```ts-dialog
// id: zmy3_c09
{
  id: "zmy3_c09",
  speaker: "doctor",
  text: "「列得出别人的愿望，列不出自己的」——这是她把自己弄丢的开始。",
  choices: [
    { id: "zmy3_c09_a", text: "「你列得出别人的愿望，列不出自己的——那你自己，是不是一直没被认真问过？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy3_p10" },
    { id: "zmy3_c09_b", text: "「你问自己『想要什么』问到想不出来——那一刻，你不是不想要，是从来没人允许你要。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "zmy3_p10" },
  ],
}
```

```ts-dialog
// id: zmy3_p10
{
  id: "zmy3_p10",
  speaker: "patient",
  text: "……没人允许。我小时候想要个电子琴，我妈说学那个没用，耽误学习。后来我也就真没再提。我那会儿就知道，提了也没用，我还是好好考试吧。",
  emotion: "neutral",
  autoNext: "zmy3_c10",
}
```

```ts-dialog
// id: zmy3_c10
{
  id: "zmy3_c10",
  speaker: "doctor",
  text: "「那架电子琴」——一个被「没用」两个字压下去的愿望。",
  choices: [
    { id: "zmy3_c10_a", text: "「那架电子琴，你现在想不想补给自己？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy3_p11" },
    { id: "zmy3_c10_b", text: "「你那么小就学会了『不提了』——你把多少想要的，都咽回肚子里了。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "zmy3_p11" },
  ],
}
```

```ts-dialog
// id: zmy3_p11
{
  id: "zmy3_p11",
  speaker: "patient",
  text: "……数不清了。我咽习惯了。相亲我不喜欢，我咽下去；周末被排满，我咽下去；人家说「这岁数了」，我也咽下去。我好像一个……什么都咽得下去的人。",
  emotion: "neutral",
  autoNext: "zmy3_c11",
}
```

```ts-dialog
// id: zmy3_c11
{
  id: "zmy3_c11",
  speaker: "doctor",
  text: "「什么都咽得下去」——可有些东西，咽下去不会消化。",
  choices: [
    { id: "zmy3_c11_a", text: "「『什么都咽得下去』——那你有没有吐出来过？哪怕一次？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy3_p12" },
    { id: "zmy3_c11_b", text: "「你咽了那么多，胃还好吗？我是说，你的心。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "zmy3_p12" },
  ],
}
```

```ts-dialog
// id: zmy3_p12
{
  id: "zmy3_p12",
  speaker: "patient",
  text: "……我胃其实不好。大夫说我压力大。您看，连我的身体都在替我喊冤了。我嘴上说「没事没事」，我胃在那儿一直拧巴。",
  emotion: "anxious",
  autoNext: "zmy3_c12",
}
```

```ts-dialog
// id: zmy3_c12
{
  id: "zmy3_c12",
  speaker: "doctor",
  text: "「连身体都在替你喊冤」——它替她咽下的那口气，快要装不下了。",
  choices: [
    { id: "zmy3_c12_a", text: "「你的胃在替你喊冤——那你说说，它替你咽下去的那口气，是哪一回的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy3_p13" },
    { id: "zmy3_c12_b", text: "「你连身体都不肯信自己不舒服——你对自己，真的太狠了。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "zmy3_p13" },
  ],
}
```

```ts-dialog
// id: zmy3_p13
{
  id: "zmy3_p13",
  speaker: "patient",
  text: "……哪一回的。我想想。好像是从「这岁数了」那回开始的。那回相亲，对方条件挺好，我爸妈满意得不行。吃完饭，他说了句「你也这岁数了，咱们凑合过吧」。我当时，心里「腾」地一下就……",
  emotion: "anxious",
  autoNext: "zmy3_c13",
}
```

```ts-dialog
// id: zmy3_c13
{
  id: "zmy3_c13",
  speaker: "doctor",
  text: "「腾地一下」——那口气，她咽到现在。",
  choices: [
    { id: "zmy3_c13_a", text: "「『腾地一下』——那一瞬间，你心里是什么感觉？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy3_p14" },
    { id: "zmy3_c13_b", text: "（不打断，让她把那口气，原原本本说出来。）", kind: "silence", effect: { trust: 1, mood: 2 }, next: "zmy3_p14" },
  ],
}
```

```ts-dialog
// id: zmy3_p14
{
  id: "zmy3_p14",
  speaker: "patient",
  text: "……我当时觉得屈辱。可我又不敢发作。我爸妈那么满意，我要是搅黄了，他们又得叹气。我就笑着说「我再想想」。那天回家，我把我自己关在屋里，哭了一晚上。我不是哭那个男的，我是哭我自己——我怎么就，让自己到了让人挑的地步。",
  emotion: "broken",
  autoNext: "zmy3_c14",
}
```

```ts-dialog
// id: zmy3_c14
{
  id: "zmy3_c14",
  speaker: "doctor",
  text: "「让人挑的地步」——那句屈辱，她还压在胃里。",
  choices: [
    { id: "zmy3_c14_a", text: "「『让人挑的地步』——你把这句『屈辱』，咽下去了。可它没消化，它在你胃里扎着呢。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy3_p15" },
    { id: "zmy3_c14_b", text: "「你哭的不是他，是你自己——那场哭，是你替自己第一次出声。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "zmy3_p15" },
  ],
}
```

```ts-dialog
// id: zmy3_p15
{
  id: "zmy3_p15",
  speaker: "patient",
  text: "……医生，我今天说了好多话。我从来没跟人说过这些。我总觉得，说出来会被笑话——你都这岁数了，还挑三拣四。可您没笑话我。您好像……真的在听。",
  emotion: "calm",
  autoNext: "zmy3_c15",
}
```

```ts-dialog
// id: zmy3_c15
{
  id: "zmy3_c15",
  speaker: "doctor",
  text: "「说出来会被笑话」——她守了这个秘密很多年。",
  choices: [
    { id: "zmy3_c15_a", text: "「我没笑话你，因为那不是『挑三拣四』，是你终于敢说『我不想要这个』了。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "zmy3_out" },
    { id: "zmy3_c15_b", text: "「『凑合过吧』那句话，我们下次接着聊——我想看看，它到底伤你有多深。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy3_out" },
  ],
}
```

```ts-dialog
// id: zmy3_out
{
  id: "zmy3_out",
  speaker: "narration",
  text: "周曼云走的时候，把多肉抱在怀里，像抱着一个刚领回来的孩子。她没回头，但声音里有一丝从未有过的软：「它要是不好养，我就再买一盆。我就不信，我养不好一件自己喜欢的东西。」",
  beatEnd: { resumeNode: "zmy4_start" },
  autoNext: "zmy4_start",
}
```

### 节拍 4 · 根源信念·凑合（trust 57→65，truth 40→55，阻抗 c04，恶化入口 c09 req≤55）

```ts-dialog
// id: zmy4_start
{
  id: "zmy4_start",
  speaker: "narration",
  text: "周曼云这次迟到了几分钟，进来时妆有点花。她说她昨晚又去了一场相亲，是那个「条件挺好」的男人约的第二次。她坐下，把手机屏幕朝下扣在桌上，半天没说话。",
  autoNext: "zmy4_p01",
}
```

```ts-dialog
// id: zmy4_p01
{
  id: "zmy4_p01",
  speaker: "patient",
  text: "我昨晚去见他第二面了。我本来想好好聊，结果他说……他说他爸妈喜欢我，说我条件不错，让他「差不多就定了吧」。他说，「咱俩都这岁数了，别再挑了，凑合过吧」。医生，我昨晚在厕所里，蹲了二十分钟，才把眼泪擦干。",
  emotion: "sad",
  autoNext: "zmy4_c01",
}
```

```ts-dialog
// id: zmy4_c01
{
  id: "zmy4_c01",
  speaker: "doctor",
  text: "「凑合过吧」——那句话，又一次找上了她。",
  choices: [
    { id: "zmy4_c01_a", text: "「『凑合过吧』——这句话，你又听见了一次。这回，你心里那口气，是咽下去了，还是上来了？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy4_p02" },
    { id: "zmy4_c01_b", text: "「你在厕所蹲了二十分钟——你不是蹲着擦泪，你是在找一个没人的地方，让自己缓过来。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "zmy4_p02" },
  ],
}
```

```ts-dialog
// id: zmy4_p02
{
  id: "zmy4_p02",
  speaker: "patient",
  text: "……上来了。我这次没咽下去。我当时就说，我不去了，我先走了。我把他一个人撂在餐厅里。出门的时候我手都在抖。我不是怕，我是……我是气。医生，我活了三十五年，第一次在相亲桌上，说了「不」。",
  emotion: "anxious",
  autoNext: "zmy4_c02",
}
```

```ts-dialog
// id: zmy4_c02
{
  id: "zmy4_c02",
  speaker: "doctor",
  text: "「第一次说了『不』」——这是个值得记住的时刻。",
  choices: [
    { id: "zmy4_c02_a", text: "「你第一次说了『不』——说完的那一刻，除了抖，还有什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy4_p03" },
    { id: "zmy4_c02_b", text: "（让她记住这个「第一次」。）", kind: "silence", effect: { trust: 1, mood: 2 }, next: "zmy4_p03" },
  ],
}
```

```ts-dialog
// id: zmy4_p03
{
  id: "zmy4_p03",
  speaker: "patient",
  text: "……还有怕。我怕我爸妈知道，怕我妈又哭。可我也，说不出来的一种……爽。好像我憋了十年的一口气，终于出来了一点。医生，我这算不算，太不懂事了？",
  emotion: "anxious",
  autoNext: "zmy4_c03",
}
```

```ts-dialog
// id: zmy4_c03
{
  id: "zmy4_c03",
  speaker: "doctor",
  text: "「算不算太不懂事」——她把「不拒绝」，当成懂事的标配。",
  choices: [
    { id: "zmy4_c03_a", text: "「你说『不懂事』——你是不是一直以为，懂事 = 不拒绝？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy4_p04" },
    { id: "zmy4_c03_b", text: "「你说『爽』的时候，眼睛里是有光的。那不是不懂事，那是你终于替自己活了一回。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "zmy4_p04" },
  ],
}
```

```ts-dialog
// id: zmy4_p04
{
  id: "zmy4_p04",
  speaker: "patient",
  text: "……可我一到家，我妈电话就来了。她说那个男的跟她说了，说我「态度不好」。我妈在电话里又哭了，说「你这孩子，到底要闹哪样，都这岁数了」。我握着电话，一句话都说不出来。",
  emotion: "sad",
  autoNext: "zmy4_c04",
}
```

```ts-dialog
// id: zmy4_c04
{
  id: "zmy4_c04",
  speaker: "doctor",
  text: "「到底要闹哪样」——她刚替自己说了「不」，转头就被说成「闹」。",
  choices: [
    { id: "zmy4_c04_a", text: "「你妈那句『到底要闹哪样』——她把你的『不』，说成了『闹』。你听见这句话，心里是什么感觉？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy4_p05" },
    { id: "zmy4_c04_b", text: "「你刚替自己说了『不』，转头就被说成『闹』。这份委屈，你今晚跟谁说过？」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "zmy4_p05" },
    { id: "zmy4_c04_c", text: "「你妈也是为你好，别让她伤心。相亲而已，不合适就下回再相，别把关系弄僵。」", kind: "logic", effect: { trust: -10, defense: 8, mood: -3 }, next: "zmy4_r01" },
  ],
}
```

```ts-dialog
// id: zmy4_r01
{
  id: "zmy4_r01",
  speaker: "patient",
  text: "（她眼眶红了，声音发抖）……又是这句「为你好」！医生，您知道吗，我这一辈子，就毁在这句「为你好」上了。她哭，是为我好；我妥协，是为她好。可谁为我好过？！",
  emotion: "broken",
  autoNext: "zmy4_p05",
}
```

```ts-dialog
// id: zmy4_p05
{
  id: "zmy4_p05",
  speaker: "patient",
  text: "……对不起。我不是冲您。我就是……我就是受够了。我懂事了一辈子，懂事到把自己都弄丢了。您说，我这一辈子，图什么？",
  emotion: "broken",
  autoNext: "zmy4_c05",
}
```

```ts-dialog
// id: zmy4_c05
{
  id: "zmy4_c05",
  speaker: "doctor",
  text: "「我这一辈子图什么」——这是她第一次，为自己问这个问题。",
  choices: [
    { id: "zmy4_c05_a", text: "「你图什么——你小时候觉得，图爸妈一个笑脸。现在呢？你还图那个吗？」", kind: "probe", effect: { trust: 1, truth: 3 }, next: "zmy4_p06" },
    { id: "zmy4_c05_b", text: "（先接住她的泪，不急着问。）", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "zmy4_p06" },
  ],
}
```

```ts-dialog
// id: zmy4_p06
{
  id: "zmy4_p06",
  speaker: "patient",
  text: "……我不知道我图什么了。我考第一，是为爸妈；升职加薪，是为证明自己有用；连我买房，都是想让他们放心。我好像从来没为自己，图过什么。",
  emotion: "sad",
  autoNext: "zmy4_c06",
}
```

```ts-dialog
// id: zmy4_c06
{
  id: "zmy4_c06",
  speaker: "doctor",
  text: "「从来没为自己图过什么」——她把这辈子的账，算给听自己了。",
  choices: [
    { id: "zmy4_c06_a", text: "「你把自己活成了别人眼里的『争气』——可你自己的气，在哪儿喘呢？」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "zmy4_p07" },
    { id: "zmy4_c06_b", text: "「你这一辈子，有没有哪怕一件小事，是你单纯为自己做的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy4_p07" },
  ],
}
```

```ts-dialog
// id: zmy4_p07
{
  id: "zmy4_p07",
  speaker: "patient",
  text: "……买那盆多肉算吗？我那天买它，纯粹是因为它好看，我看了高兴。医生，我活到三十五，那盆多肉，好像是我这辈子，第一件纯粹为自己高兴买的东西。",
  emotion: "calm",
  autoNext: "zmy4_c07",
}
```

```ts-dialog
// id: zmy4_c07
{
  id: "zmy4_c07",
  speaker: "doctor",
  text: "「那盆多肉」——一个很小的口子，却开在她自己的方向上。",
  choices: [
    { id: "zmy4_c07_a", text: "「那盆多肉，是开了一个口子——你终于允许自己，有一件『只是喜欢』的东西了。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "zmy4_p08" },
    { id: "zmy4_c07_b", text: "「如果那盆多肉，代表『为自己活』——那你愿意，给它挪个地方，让它长大一点吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy4_p08" },
  ],
}
```

```ts-dialog
// id: zmy4_p08
{
  id: "zmy4_p08",
  speaker: "patient",
  text: "……愿意。我昨天看着它，忽然想，我连一盆花，都肯花心思照顾。我凭什么，不肯花心思照顾自己？医生，我这句话，是不是说得很迟？",
  emotion: "calm",
  autoNext: "zmy4_c08",
}
```

```ts-dialog
// id: zmy4_c08
{
  id: "zmy4_c08",
  speaker: "doctor",
  text: "「不肯花心思照顾自己」——这句话，她自己说的，分量不一样。",
  choices: [
    { id: "zmy4_c08_a", text: "「『不肯照顾自己』——你什么时候开始，把自己排到最后一位的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy4_p09" },
    { id: "zmy4_c08_b", text: "（让她把这句话，稳稳地放在心里。）", kind: "silence", effect: { trust: 0, mood: 2 }, next: "zmy4_p09" },
  ],
}
```

```ts-dialog
// id: zmy4_p09
{
  id: "zmy4_p09",
  speaker: "patient",
  text: "……从小吧。我从小就学会，先把爸妈的满意照顾好，再轮到我。可轮到我这儿，天都黑了，我累得什么都不想要了。",
  emotion: "neutral",
  autoNext: "zmy4_c09",
}
```

```ts-dialog
// id: zmy4_c09
{
  id: "zmy4_c09",
  speaker: "doctor",
  text: "「轮到我这儿，天都黑了」——她把自己，排了三十五年。",
  choices: [
    { id: "zmy4_c09_a", text: "「『轮到我这儿天都黑了』——你有没有想过，你的人生，可以不用排队？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy4_p10" },
    { id: "zmy4_c09_b", text: "「你把自己排到最后，排了三十五年。今天，我想请你，往前挪一位。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "zmy4_p10" },
    { id: "zmy4_c09_c", text: "「说白了，你就是被惯坏了，挑三拣四。都这岁数了还闹，你爸妈的脸往哪儿搁？你要是听不进去，那我也没办法。」", kind: "logic", require: { trustAtMost: 55 }, effect: { trust: -10, defense: 8, mood: -4 }, next: "zmy4_w01", hint: "仅信任≤55 时可见" },
  ],
}
```

```ts-dialog
// id: zmy4_p10
{
  id: "zmy4_p10",
  speaker: "patient",
  text: "……往前挪一位。可我一往前挪，我妈就说我自私。她说，你只想着你自己。医生，我听了这句话，难受得不行——我活了三十五年，就挪这一位，怎么就成了自私了？",
  emotion: "sad",
  autoNext: "zmy4_c10",
}
```

```ts-dialog
// id: zmy4_c10
{
  id: "zmy4_c10",
  speaker: "doctor",
  text: "「挪一位就成自私了」——她连挪一点点，都要背上骂名。",
  choices: [
    { id: "zmy4_c10_a", text: "「『你只想着你自己』——你妈这句话，是不是在说，你从小到大，从没被允许想过自己？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy4_p11" },
    { id: "zmy4_c10_b", text: "「你挪的那一位，不是自私，是你迟到了三十五年的『我自己』。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "zmy4_p11" },
  ],
}
```

```ts-dialog
// id: zmy4_p11
{
  id: "zmy4_p11",
  speaker: "patient",
  text: "……我没被允许过。我一想自己，就有负罪感。好像我多做一件让自己高兴的事，就是在亏欠谁。我连周末睡个懒觉，都要先想，我妈知道了会不会说我懒。",
  emotion: "neutral",
  autoNext: "zmy4_c11",
}
```

```ts-dialog
// id: zmy4_c11
{
  id: "zmy4_c11",
  speaker: "doctor",
  text: "「连睡懒觉都有负罪感」——她给自己请了个监工。",
  choices: [
    { id: "zmy4_c11_a", text: "「『睡懒觉都有负罪感』——你心里的监工，是谁请来的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy4_p12" },
    { id: "zmy4_c11_b", text: "「你连休息都要报备——你把自己管得，太严了。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "zmy4_p12" },
  ],
}
```

```ts-dialog
// id: zmy4_p12
{
  id: "zmy4_p12",
  speaker: "patient",
  text: "……是我爸妈请来的，也是我自己请的。我从小把它供着，它管了我三十五年。现在我想把它请出去了，可它一开口，我还是会怕。",
  emotion: "anxious",
  autoNext: "zmy4_c12",
}
```

```ts-dialog
// id: zmy4_c12
{
  id: "zmy4_c12",
  speaker: "doctor",
  text: "「想把它请出去，可它一开口还是怕」——她卡在怕和不甘之间。",
  choices: [
    { id: "zmy4_c12_a", text: "「你怕的不是那个监工，是你怕请走它之后，面对那个空下来的自己。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy4_p13" },
    { id: "zmy4_c12_b", text: "（让她听听，自己这句话里，那份松动的渴望。）", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "zmy4_p13" },
  ],
}
```

```ts-dialog
// id: zmy4_p13
{
  id: "zmy4_p13",
  speaker: "patient",
  text: "……空下来的自己。我从来没跟那个自己待过。我一直用忙、用相亲、用业绩，把它堵住。我怕我一闲下来，就要面对「曼云，你到底想要什么」。",
  emotion: "sad",
  autoNext: "zmy4_c13",
}
```

```ts-dialog
// id: zmy4_c13
{
  id: "zmy4_c13",
  speaker: "doctor",
  text: "「怕面对那个问题」——而那个问题，今天已经有人敢问了。",
  choices: [
    { id: "zmy4_c13_a", text: "「你怕的不是答案，是你从没被允许，认真问过这个问题。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "zmy4_p14" },
    { id: "zmy4_c13_b", text: "「如果现在，你允许自己认真问一次——你想听到什么样的答案？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy4_p14" },
  ],
}
```

```ts-dialog
// id: zmy4_p14
{
  id: "zmy4_p14",
  speaker: "patient",
  text: "……我想听到，曼云，你自己高兴就行。我好像一辈子，都在等谁说这句话。可我从没等到。也许……也许该由我自己，对自己说。",
  emotion: "calm",
  autoNext: "zmy4_c14",
}
```

```ts-dialog
// id: zmy4_c14
{
  id: "zmy4_c14",
  speaker: "doctor",
  text: "「该由我自己，对自己说」——她终于把这句话，攥在了自己手里。",
  choices: [
    { id: "zmy4_c14_a", text: "「这句话，今天你自己说给自己听了。它不需要任何人的允许。」", kind: "empathy", effect: { trust: 0, mood: 3 }, next: "zmy4_out" },
    { id: "zmy4_c14_b", text: "「『你自己高兴就行』——下次见面，我们看看，把这句话带进日子里，是什么样。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy4_out" },
  ],
}
```

```ts-dialog
// id: zmy4_out
{
  id: "zmy4_out",
  speaker: "narration",
  text: "周曼云走的时候，把那盆多肉放在窗台上晒了晒，又抱回来。她说：「我昨晚把它从客厅挪到床头了。医生说植物得晒太阳，可我想让它陪着我睡。」她笑了笑，「我是不是，开始把它当回事了？」",
  beatEnd: { resumeNode: "zmy5_start" },
  autoNext: "zmy5_start",
}
```

### 节拍 5 · 转向+结局（trust 65→70，truth 55→70，fork special / empathy / confront req65）

```ts-dialog
// id: zmy5_start
{
  id: "zmy5_start",
  speaker: "narration",
  text: "最后一次会谈。周曼云来的时候，怀里抱着一盆开花的月季，多肉在旁边。她说：「我把多肉养开花了。医生，你看，我好像也能养活自己喜欢的东西了。」她把花放在桌上，指尖轻轻碰了碰花瓣。",
  autoNext: "zmy5_p01",
}
```

```ts-dialog
// id: zmy5_p01
{
  id: "zmy5_p01",
  speaker: "patient",
  text: "这周我做了件大事。我妈又给我安排了一场相亲，我推了。她气得不行，在电话里哭。我没挂电话，我跟她说：「妈，我过得好不好，你关心过吗？你只关心我有没有嫁出去。」说完我自己都愣住——我居然，说出来了。",
  emotion: "calm",
  autoNext: "zmy5_fork",
}
```

```ts-dialog
// id: zmy5_fork
{
  id: "zmy5_fork",
  speaker: "doctor",
  text: "她第一次，把那句憋了半辈子的话，说给了最在乎的人听。走到这里，她需要选一条路，往下走。",
  choices: [
    { id: "zmy5_fork_a", text: "「我们来搭一张『为自己活』的清单：你想做却一直没做的事、你愿意为自己说的话、你在撑不住时能找的人。让这张清单，先替你兜一阵。」", kind: "special", effect: { trust: 1, mood: 2 }, next: "zmy5_s01" },
    { id: "zmy5_fork_b", text: "「你能把那句话说出口，已经是往前走了。学会带着这份『为自己活』慢慢走，也是一种答案。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "zmy5_a01" },
    { id: "zmy5_fork_c", text: "「你敢不敢，约你爸妈来一趟，把『我过得好不好，比结没结婚重要』，当着他们的面，说一次？」", kind: "confront", require: { trust: 65 }, effect: { trust: 1, truth: 3, mood: -3 }, next: "zmy5_h01", hint: "需要信任≥65" },
  ],
}
```

#### 安全网路径（cure 主线）

```ts-dialog
// id: zmy5_s01
{
  id: "zmy5_s01",
  speaker: "patient",
  text: "（她看着那张空白的清单）……为自己活的事。医生，我第一个想到的，竟然是「学电子琴」。我小时候想要那架电子琴，我妈说没用。我一直没忘。这算不算，那架琴等了我二十多年？",
  emotion: "neutral",
  autoNext: "zmy5_d01",
}
```

```ts-dialog
// id: zmy5_d01
{
  id: "zmy5_d01",
  speaker: "doctor",
  text: "「那架琴等了你二十多年」——它没忘，她也没忘。",
  choices: [
    { id: "zmy5_d01_a", text: "「那就去把它买回来。它等的不是二十多年，是等你说一句『我现在要了』。」", kind: "empathy", effect: { trust: 0, mood: 3 }, next: "zmy5_s02" },
    { id: "zmy5_d01_b", text: "「那架琴，是你第一个『没用的喜欢』。它代表什么，你心里清楚吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy5_s02" },
  ],
}
```

```ts-dialog
// id: zmy5_s02
{
  id: "zmy5_s02",
  speaker: "patient",
  text: "……清楚。它代表我自己。我把它压在最底下压了二十多年，现在想把它翻出来，掸掸灰。",
  emotion: "calm",
  autoNext: "zmy5_d02",
}
```

```ts-dialog
// id: zmy5_d02
{
  id: "zmy5_d02",
  speaker: "doctor",
  text: "「掸掸灰」——她把那个被压了二十多年的自己，轻轻托了起来。",
  choices: [
    { id: "zmy5_d02_a", text: "「掸灰，然后接上电，让它响。你不用弹得多好——你只需要，为你自己响一次。」", kind: "empathy", effect: { trust: 0, mood: 3 }, next: "zmy5_s03" },
    { id: "zmy5_d02_b", text: "「你把它压在最底下，是怕它响起来，别人嫌吵吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy5_s03" },
  ],
}
```

```ts-dialog
// id: zmy5_s03
{
  id: "zmy5_s03",
  speaker: "patient",
  text: "……怕我妈嫌吵，怕她说「净搞这些没用的」。可我昨天路过琴行，我在门口站了很久，看着里面一个小孩在学琴。他弹得乱七八糟，可他妈在旁边笑。我忽然好羡慕那个小孩。",
  emotion: "sad",
  autoNext: "zmy5_d03",
}
```

```ts-dialog
// id: zmy5_d03
{
  id: "zmy5_d03",
  speaker: "doctor",
  text: "「他妈在旁边笑」——她羡慕的，是一份允许。",
  choices: [
    { id: "zmy5_d03_a", text: "「你羡慕那个小孩，因为有人允许他『乱弹』。你也可以——没人规定，三十五年后学琴，得先考级。」", kind: "empathy", effect: { trust: 0, mood: 3 }, next: "zmy5_s04" },
    { id: "zmy5_d03_b", text: "「你羡慕的，是不是『有个人在旁边笑着看』，而不是那架琴？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy5_s04" },
  ],
}
```

```ts-dialog
// id: zmy5_s04
{
  id: "zmy5_s04",
  speaker: "patient",
  text: "……都有吧。我也想有人笑我，不是笑我「这岁数了还折腾」，是笑我「你终于开始折腾了」。医生，我以前觉得，折腾是贬义词。",
  emotion: "neutral",
  autoNext: "zmy5_d04",
}
```

```ts-dialog
// id: zmy5_d04
{
  id: "zmy5_d04",
  speaker: "doctor",
  text: "「折腾是贬义词」——她被这个词，管了半辈子。",
  choices: [
    { id: "zmy5_d04_a", text: "「折腾，是你在试探自己的边界。你被『不要折腾』压了半辈子，现在，你该折腾了。」", kind: "empathy", effect: { trust: 0, mood: 3 }, next: "zmy5_s05" },
    { id: "zmy5_d04_b", text: "「『终于开始折腾』——这句话，你想听谁说？你妈，还是你自己？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy5_s05" },
  ],
}
```

```ts-dialog
// id: zmy5_s05
{
  id: "zmy5_s05",
  speaker: "patient",
  text: "……我想听我自己说。其实我妈昨天后来没再哭了，她问我：「你是不是工作太累，才不想结？」我没接话，但我心里知道，我不是累，我是终于想明白了——我不是不想结婚，我是不想为了交卷而结婚。",
  emotion: "calm",
  autoNext: "zmy5_d05",
}
```

```ts-dialog
// id: zmy5_d05
{
  id: "zmy5_d05",
  speaker: "doctor",
  text: "「不想为了交卷而结婚」——她这场谈话，最重要的一句。",
  choices: [
    { id: "zmy5_d05_a", text: "「你分清了『结婚』和『交卷』。从今天起，你可以想结就结，不想结就不结——它不再是一场考试了。」", kind: "empathy", effect: { trust: 0, mood: 3 }, next: "zmy5_s06" },
    { id: "zmy5_d05_b", text: "「这句话，你敢在下次你妈再催的时候，说给她听吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy5_s06" },
  ],
}
```

```ts-dialog
// id: zmy5_s06
{
  id: "zmy5_s06",
  speaker: "patient",
  text: "……我敢。其实我还想跟她说，我过得好不好，不应该由「有没有人娶我」来定。我的价值，不是一张结婚证能定格的。医生，我以前从不敢说这种话，我怕说完，我就真成一个「没人要」的人了。",
  emotion: "calm",
  autoNext: "zmy5_d06",
}
```

```ts-dialog
// id: zmy5_d06
{
  id: "zmy5_d06",
  speaker: "doctor",
  text: "「我的价值不是一张证书能定格的」——她替自己，说出了一句新的判决。",
  choices: [
    { id: "zmy5_d06_a", text: "「没有人要，跟你值不值得，是两回事。你被『没人要』三个字，吓了半辈子。今天，你把它的锁，卸了。」", kind: "empathy", effect: { trust: 0, mood: 3 }, next: "zmy5_s07" },
    { id: "zmy5_d06_b", text: "「『没人要』——你怕了它这么多年。它要是真这么厉害，你这些年一个人，是怎么过得这么好的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy5_s07" },
  ],
}
```

```ts-dialog
// id: zmy5_s07
{
  id: "zmy5_s07",
  speaker: "patient",
  text: "……对。我一个人过得好好的。我做饭好吃，我工作能干，我还会养花了。我明明把自己照顾得很好，怎么一到「没结婚」这三个字，我就觉得自己什么都不是？",
  emotion: "neutral",
  autoNext: "zmy5_d07",
}
```

```ts-dialog
// id: zmy5_d07
{
  id: "zmy5_d07",
  speaker: "doctor",
  text: "「你把自己照顾得很好——这是事实。『没结婚』让你觉得自己什么都不是——这是你听来的。」",
  choices: [
    { id: "zmy5_d07_a", text: "「把这两件事分开：你怎么活的，是你自己写出来的；你听来的那句判决，是别人灌进来的。」", kind: "empathy", effect: { trust: 0, mood: 3 }, next: "zmy5_s08" },
    { id: "zmy5_d07_b", text: "「你第一次，把你自己的日子，和你听来的话，摆在两边比了。哪边更重？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy5_s08" },
  ],
}
```

```ts-dialog
// id: zmy5_s08
{
  id: "zmy5_s08",
  speaker: "patient",
  text: "……我自己这边重。我那天在厕所蹲着哭，我忽然想：我要是真随便找个人凑合了，我这一辈子，才是真的交白卷了。我不想交那张白卷。医生，我想好好活我自己那场。",
  emotion: "calm",
  autoNext: "zmy5_d08",
}
```

```ts-dialog
// id: zmy5_d08
{
  id: "zmy5_d08",
  speaker: "doctor",
  text: "「想好好活我自己那场」——那场考试，从今天起，她是出题人。",
  choices: [
    { id: "zmy5_d08_a", text: "「卷子在你手里了。你可以选不考，也可以选为自己考。不管哪个，都是你定的。」", kind: "empathy", effect: { trust: 0, mood: 3 }, next: "zmy5_s09" },
    { id: "zmy5_d08_b", text: "「你刚才说『交白卷』——你怕的，从来不是白卷，是没人给你打分。可现在，你不需要别人打了。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy5_s09" },
  ],
}
```

```ts-dialog
// id: zmy5_s09
{
  id: "zmy5_s09",
  speaker: "patient",
  text: "……对，我不需要别人打了。我自己就是判卷的。我活了三十五年，头一回，觉得自己手里握着笔。这感觉，说不出来的踏实。",
  emotion: "calm",
  autoNext: "zmy5_d09",
}
```

```ts-dialog
// id: zmy5_d09
{
  id: "zmy5_d09",
  speaker: "doctor",
  text: "「手里握着笔」——这就是「为自己活一次」的样子。",
  choices: [
    { id: "zmy5_d09_a", text: "「你握着这支笔，想先写什么？不用写大，写一件明天就能做的事。」", kind: "empathy", effect: { trust: 0, mood: 3 }, next: "zmy5_s10" },
    { id: "zmy5_d09_b", text: "「你握着笔的时候，心里那句『我还值得被爱吗』——它还在吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy5_s10" },
  ],
}
```

```ts-dialog
// id: zmy5_s10
{
  id: "zmy5_s10",
  speaker: "patient",
  text: "……它还在。可它现在，不是喊，是问了。我好像能回答它了——我值得。我不靠结婚证证明，也不靠奖状证明。我就是值得。医生，说这句话的时候，我一点也不心虚。",
  emotion: "happy",
  autoNext: "zmy5_d10",
}
```

```ts-dialog
// id: zmy5_d10
{
  id: "zmy5_d10",
  speaker: "doctor",
  text: "「我值得」——这句不是别人施舍的，是她自己挣来的。",
  choices: [
    { id: "zmy5_d10_a", text: "「把这句话，放进你那张清单第一行。它比任何证书，都硬。」", kind: "empathy", effect: { trust: 0, mood: 3 }, next: "zmy5_s11" },
    { id: "zmy5_d10_b", text: "「你第一次，能回答那个问题了——『如果我不结婚，我还值得被爱吗』。你的答案是什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy5_s11" },
  ],
}
```

```ts-dialog
// id: zmy5_s11
{
  id: "zmy5_s11",
  speaker: "patient",
  text: "……值得。我值得。就算我一辈子不结婚，我也值得被爱，也值得被我自己爱。医生，这句话，我等了半辈子才敢说。",
  emotion: "happy",
  autoNext: "zmy5_d11",
}
```

```ts-dialog
// id: zmy5_d11
{
  id: "zmy5_d11",
  speaker: "doctor",
  text: "「等了半辈子才敢说」——今天，她说出来了。",
  choices: [
    { id: "zmy5_d11_a", text: "「你那张清单带回去：电子琴、那句对妈妈说的话、还有这句话。它们比一场相亲，重得多。」", kind: "empathy", effect: { trust: 0, mood: 3 }, next: "zmy5_s12" },
    { id: "zmy5_d11_b", text: "「下次再有人跟你说『这岁数了』，你会怎么回？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy5_s12" },
  ],
}
```

```ts-dialog
// id: zmy5_s12
{
  id: "zmy5_s12",
  speaker: "patient",
  text: "……我会说，我这岁数，刚好。我有房有车有工作，我还会养花，我现在还会为自己说话了。我这岁数，不是「该结婚了」的岁数，是「我正活得明白」的岁数。",
  emotion: "happy",
  autoNext: "zmy5_d12",
}
```

```ts-dialog
// id: zmy5_d12
{
  id: "zmy5_d12",
  speaker: "doctor",
  text: "「我这岁数，刚好」——她终于，用她自己的话，替自己站台了。",
  choices: [
    { id: "zmy5_d12_a", text: "「那张清单，和这句『刚好』，都带回家。你妈再哭，你也不再是那个被她一滴眼泪牵着走的人了。」", kind: "empathy", effect: { trust: 0, mood: 3 }, next: "zmy5_s13" },
    { id: "zmy5_d12_b", text: "「你妈那滴眼泪，还会来吗？你还怕它吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy5_s13" },
  ],
}
```

```ts-dialog
// id: zmy5_s13
{
  id: "zmy5_s13",
  speaker: "patient",
  text: "……还会来。可我不怕了。我怕的是「我不值得」，不是她哭。她哭，是她的事；我过得好不好，是我的事。我分得清了。医生，谢谢您。这些日子，我终于觉得，我活过来了。",
  emotion: "happy",
  autoNext: "zmy5_d13",
}
```

```ts-dialog
// id: zmy5_d13
{
  id: "zmy5_d13",
  speaker: "doctor",
  text: "「我活过来了」——不是靠一场婚姻，是靠她自己想通了。",
  choices: [
    { id: "zmy5_d13_a", text: "「把这份『活过来』带回去。你妈那边，你慢慢来；你自己这边，你已经走了一大步了。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "zmy5_s14" },
    { id: "zmy5_d13_b", text: "「最后一次，我想让你自己说——周曼云，你这一生，想怎么过？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy5_s14" },
  ],
}
```

```ts-dialog
// id: zmy5_s14
{
  id: "zmy5_s14",
  speaker: "patient",
  text: "……我自己过。不为交卷，不为别人。我想学琴就去学，想养花就养，想结婚就结，不想结我也不亏欠谁。我这一生，我自己写。医生，我真的，想为自己活一次了。",
  emotion: "happy",
  autoNext: "zmy_end_cure",
}
```

#### 接纳路径（acceptance）

```ts-dialog
// id: zmy5_a01
{
  id: "zmy5_a01",
  speaker: "patient",
  text: "（她想了想）……带着这句话慢慢走。医生，我可能做不到一下子全变。我下回相亲，说不定还是会去，我妈一哭，我说不定还是会心软。可我心里，已经不一样了。",
  emotion: "neutral",
  autoNext: "zmy5_a02",
}
```

```ts-dialog
// id: zmy5_a02
{
  id: "zmy5_a02",
  speaker: "doctor",
  text: "「心里已经不一样了」——这就够了。改变不是掀桌子，是每天挪一点。",
  choices: [
    { id: "zmy5_a02_a", text: "「你不用现在就学会拒绝。你只需要，在你妈哭的时候，心里多一句『我过得好不好，不是这一张证能定的』。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "zmy5_a03" },
    { id: "zmy5_a02_b", text: "「你心里那句『不一样』——它最想跟你说的话，是什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy5_a03" },
  ],
}
```

```ts-dialog
// id: zmy5_a03
{
  id: "zmy5_a03",
  speaker: "patient",
  text: "……它想跟我说，曼云，你可以慢慢来。你不欠谁的。你结不结婚，都不耽误你是个好人，不耽误你值得被爱。",
  emotion: "calm",
  autoNext: "zmy5_a04",
}
```

```ts-dialog
// id: zmy5_a04
{
  id: "zmy5_a04",
  speaker: "doctor",
  text: "「你可以慢慢来」——这句话，她欠自己很久了。",
  choices: [
    { id: "zmy5_a04_a", text: "「带着它，慢慢走。你不需要答案，你已经在路上了。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "zmy5_a05" },
    { id: "zmy5_a04_b", text: "「你妈那滴眼泪，你还会被它牵着走吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy5_a05" },
  ],
}
```

```ts-dialog
// id: zmy5_a05
{
  id: "zmy5_a05",
  speaker: "patient",
  text: "……会少一点。以前是它一哭我就投降，现在我能站住，听完，再说「妈，我过得好」。医生，我这算不算，变了？",
  emotion: "calm",
  autoNext: "zmy5_a06",
}
```

```ts-dialog
// id: zmy5_a06
{
  id: "zmy5_a06",
  speaker: "doctor",
  text: "「从不敢说到能站住说」——这就是变。不必惊天动地。",
  choices: [
    { id: "zmy5_a06_a", text: "「把这份『能站住』，带回去。你和你妈之间，你们慢慢磨，你不再只是被磨的那个了。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "zmy5_a07" },
    { id: "zmy5_a06_b", text: "「你心里那个怕『没人要』的小孩，现在还会怕吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "zmy5_a07" },
  ],
}
```

```ts-dialog
// id: zmy5_a07
{
  id: "zmy5_a07",
  speaker: "patient",
  text: "……还会，可我会抱抱她。我会跟她说，你不是没人要，你是终于开始要自己了。医生，谢谢你，让我学会跟她说这句话。",
  emotion: "happy",
  autoNext: "zmy_end_accept",
}
```

#### 隐藏路径（hidden · 直面爸妈）

```ts-dialog
// id: zmy5_h01
{
  id: "zmy5_h01",
  speaker: "patient",
  text: "（她的手抖了一下）……约我爸妈来？医生，我怕。我怕我妈一听「我过得好不好」，就哭着问我「那你到底想怎样」。可我又……我又真想让他们听见。",
  emotion: "scared",
  autoNext: "zmy5_h02",
}
```

```ts-dialog
// id: zmy5_h02
{
  id: "zmy5_h02",
  speaker: "doctor",
  text: "「想让他们听见，又怕他们听见」——这份矛盾，正是她一直没说的原因。",
  choices: [
    { id: "zmy5_h02_a", text: "「我陪你一起想，这场话怎么谈。不是让他们认错，是让他们看见你——你不是一台该交卷的机器，你是他们的女儿。」", kind: "special", effect: { trust: 0, mood: -2 }, next: "zmy5_h03" },
    { id: "zmy5_h02_b", text: "「你可以先不约。等你准备好了，那句话说给谁，都先从说给自己开始。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "zmy5_h05" },
  ],
}
```

```ts-dialog
// id: zmy5_h03
{
  id: "zmy5_h03",
  speaker: "patient",
  text: "（她沉默了很久）……好。我约。我想跟我妈说：妈，我过得很好，我买了房，养了花，工作顺心。我过得好不好，跟结没结婚，是两回事。你问我过得好不好，我会告诉你；你只问我结没结婚，我就……只能躲着你。",
  emotion: "broken",
  autoNext: "zmy5_h04",
}
```

```ts-dialog
// id: zmy5_h04
{
  id: "zmy5_h04",
  speaker: "doctor",
  text: "「我过得好不好，跟结没结婚，是两回事」——这是她替自己，也替爸妈，找到的那句话。",
  choices: [
    { id: "zmy5_h04_a", text: "「我陪你一起，把这句话带到你爸妈面前。不是审判，是和解的第一次开口。你身后有我。」", kind: "special", effect: { trust: 0, mood: -2 }, next: "zmy_end_hidden" },
    { id: "zmy5_h04_b", text: "「你先把这句话，说给自己听一遍。它太重要了，值得先让你自己接住。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "zmy5_h05" },
  ],
}
```

```ts-dialog
// id: zmy5_h05
{
  id: "zmy5_h05",
  speaker: "patient",
  text: "……好。我今晚回去，先对着镜子说一遍。说给镜子里的曼云听。医生，我好像，从来没有好好跟她说过话。",
  emotion: "calm",
  autoNext: "zmy_end_accept",
}
```

#### 恶化路径（worsen）

```ts-dialog
// id: zmy4_w01
{
  id: "zmy4_w01",
  speaker: "patient",
  text: "（她脸色白下来，声音很轻）……我挑三拣四。对，我挑三拣四。我爸妈说得对，我就是被惯坏了。我这样的人，还谈什么「过得好不好」，我先把自己嫁出去，别让他们丢人。",
  emotion: "broken",
  autoNext: "zmy4_w02",
}
```

```ts-dialog
// id: zmy4_w02
{
  id: "zmy4_w02",
  speaker: "doctor",
  text: "她刚鼓起的「为自己活」的那点力气，被这句「挑三拣四」打散了。",
  choices: [
    { id: "zmy4_w02_a", text: "「你别钻牛角尖，听你妈的话，好好相一场，定下来就好了。」", kind: "logic", effect: { trust: -6, defense: 6, mood: -3 }, next: "zmy4_w03" },
    { id: "zmy4_w02_b", text: "「……对不起，我说错话了。你不是挑三拣四。」", kind: "empathy", effect: { trust: -3, mood: -4 }, next: "zmy4_w03" },
  ],
}
```

```ts-dialog
// id: zmy4_w03
{
  id: "zmy4_w03",
  speaker: "patient",
  text: "……不用说了。我本来还想养花、学琴，现在想想，都是笑话。我就是个让爸妈操心的女儿。我这种人，就别奢望什么「为自己活」了。谢谢您今天的时间。",
  emotion: "broken",
  autoNext: "zmy_end_worsen",
}
```

---

## 三、结局

```ts-dialog
// id: zmy_end_cure
{
  id: "zmy_end_cure",
  speaker: "narration",
  text: "〔结局 · 治愈〕",
  isEnding: true,
  endingType: "cure",
  endingTitle: "为自己活一次",
  endingText: "三个月后，周曼云来信。她真的买了一把电子琴，报了个周末班，琴行老师说她是全班学得最慢的，可她每节课都去。她把我妈约出来吃了顿饭，跟她说「妈，我过得好不好，你以后先问我这个」。她说她妈那顿饭没哭，就愣愣地看了她很久，最后说了句「你胖了点，气色好了」。她说：我那一瞬间想，这就是我想听的话。不是我该嫁谁，是我气色好了。医生，那盆多肉开花了，月季也是。我好像，真的开始为自己活了一次。",
  endingReward: { doctorReputation: 8, doctorMoney: 300, doctorExp: 50, doctorSanity: 5 },
}
```

```ts-dialog
// id: zmy_end_accept
{
  id: "zmy_end_accept",
  speaker: "narration",
  text: "〔结局 · 接纳〕",
  isEnding: true,
  endingType: "acceptance",
  endingTitle: "慢慢来，也是一种答案",
  endingText: "周曼云没有立刻改变什么。她还是会在周末去相亲，还是会在我妈哭的时候心软。但她开始每周末去琴行学琴，在卧室养了一阳台花。她说，她妈现在催她，她会回一句「妈，我过得好，比嫁得出去重要」。她妈愣了几次，后来慢慢也学会了问「你最近忙不忙」。她说：我没赢过我妈那滴眼泪，可它不再能一哭就让我投降了。这样，就算慢慢来了吧。",
  endingReward: { doctorReputation: 4, doctorMoney: 180, doctorExp: 35, doctorSanity: 6 },
}
```

```ts-dialog
// id: zmy_end_hidden
{
  id: "zmy_end_hidden",
  speaker: "narration",
  text: "〔结局 · 隐藏·面对面〕",
  isEnding: true,
  endingType: "hidden",
  endingTitle: "你过得好不好，比结没结婚重要",
  endingText: "你陪周曼云，在她爸妈家坐了一下午。她妈说到「你不结婚我闭不上眼」时，曼云没有躲，也没有哭。她说：妈，你闭不上眼，是怕我过不好。可我过得好不好，不该由一张结婚证来定。她妈沉默了很久，最后说了一句让曼云愣住的话：「妈不是逼你，妈是怕你一个人。」曼云说：「我一个人，也把自己照顾得很好。」那天晚上，她妈第一次，问她「你工作累不累」。曼云说，这是她三十五年里，听过最踏实的一句关心。",
  endingReward: { doctorReputation: -10, doctorMoney: 100, doctorExp: 80, doctorSanity: -15 },
}
```

```ts-dialog
// id: zmy_end_worsen
{
  id: "zmy_end_worsen",
  speaker: "narration",
  text: "〔结局 · 恶化〕",
  isEnding: true,
  endingType: "worsen",
  endingTitle: "交上去的白卷",
  endingText: "周曼云没有再来。她闺蜜后来转来消息：她接受了那场「条件挺好」的相亲，定了婚期。可她开始天天失眠，婚前一个月，把自己关在屋里，谁也不想见。她说她怕，怕婚礼那天，她不是新娘，是终于把卷子交上去的考生。那盆多肉，她忘了浇水，枯死了。她说，也许她这辈子，就注定是那个，答不上来的人。",
  endingReward: { doctorReputation: -8, doctorMoney: 50, doctorExp: 10, doctorSanity: -20 },
}
```

---

## 六、状态

- [x] 人物档案完整（一句话核心/三层真相/角色三角/症状意义/关键转折）
- [x] 节拍规划表（中档 5 节拍，trust 15→30→45→57→65→70，truth 0→70）
- [x] v3 结构校验通过 + tsc 通过
- [x] 走线四线全绿（共情 cure trust=70 rounds≥70 / 均衡 cure 2碎片 / 失误 worsen / 探问 cure truth≥70）
- [x] 聚合入口（index.generated.ts 自动收录 zhou_manyun）
- [x] 剧本登记表（由主流程统一登记）
