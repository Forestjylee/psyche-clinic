# 刘国强 · v3 · 短剧本 · 4 节拍 · 40+ 轮

> 短档任务卡第 7 人：**父亲重病 · 第一次怕死**。
> 数值：trust 15→28→40→50→58；truth 0→40；碎片 1 枚 @30；恶化入口 trust≤40；隐藏结局 @50；cure 主线 40 轮。
> 生成：`node scripts/md-to-patient.mjs docs/stories/liu_guoqiang-v3.md --walk`

---

## 〇、人物档案

**姓名** 刘国强，40 岁，车间班组长（带一条生产线）。父亲 68 岁，刚查出癌症，住院等手术。厂里体检转介来——陪床半个月瘦了十几斤，徒弟堵在车间门口，说再不来说说他先垮了。

**一句话核心**：他一直以为父亲是永远立在那的大山，直到父亲确诊，他才第一次发现山也会塌、也需要他拿主意。

**三层真相**：
- **表层**：陪床烦躁、总躲出去抽烟；不愿谈病情，医生说「家属得做决定」他就慌；回避，能拖就拖。开场就说「我就是累，看看就走」。
- **中间层**（第 2-3 节拍揭）：父亲是家里永远拿主意的人——修自行车、盖房子、供他上学、操办母亲后事，全是父亲一个人扛；现在换成他要在手术单上签字，他发现自己从来没学过「当大人」。
- **深层**（根源）：母亲走得早，父亲一个人把他拉扯大，从不喊累、从不示弱；他继承的信念是「男人不能怕」。所以怕父亲离开 = 承认自己其实一直是个没长大的孩子。

**角色三角**：
- **施压者**：「男人要顶住」的规训 + 手术单上必须他签字的责任。
- **情感忽视者**：从不示弱的父亲——他从没在父亲那里学过「怎么面对失去」，父亲也从不让他看见脆弱。
- **被守护者**：父亲（也是那个不敢长大的自己）。

**症状意义**：回避病情是他还不想面对「我也会失去依靠」；躲出去抽烟是他给自己找的「透气口」；焦躁是他第一次要自己做决定的手足无措。开场埋（躲烟、躲签字），中段被问（「你躲出去最想躲开什么」），高潮意义反转（「接住害怕，也是一种扛」）。

**关键转折**：病床上意识清醒的父亲叫他的小名，说了句「你别怕」——他当着医生的面差点哭出来。原来父亲也怕，只是以前都替他扛了。

**写作注意**：结局偏向「接住父亲的脆弱，也允许自己害怕」；「男人不能怕」是这份剧本要松开的结。不写治疗术语，不写患者口述叙事性时间词。

---

## 一、节拍规划表

| 节拍 | 主题 | trust 起止 | truth 起止 | 阻抗节点 | 关键事件 | 碎片 | 过场 |
|---|---|---|---|---|---|---|---|
| 1 · 初访·我就是累 | 表层：否认 + 躲烟 + 躲签字 | 15→28 | 0→22 | lg1_c01 logic「血压高而已」 | 「签字」首次露出（lg1_p05） | — | lg1_out |
| 2 · 中间层·我爸什么都扛 | 父亲=永远拿主意的人 | 28→40 | 22→34 | lg2_c03 logic「学你爸硬气」 | 父亲抓着手问「能治吧」（lg2_p10） | m1 雨夜的车 @truth30 | lg2_out |
| 3 · 深层·男人不能怕 | 核心信念 + 恶化入口 | 40→50 | 34→40+ | lg3_c03 logic「眼泪往肚里咽」 | 承认「怕」=承认没长大（lg3_p06） | — | lg3_out |
| 4 · 转向+结局 | 接住父亲的脆弱，允许自己怕 | 50→58 | 40→40+ | — | 父亲叫小名「你别怕」入（lg4_p01）+ fork 四路 | — | — |

**数值口径**：trust 单调递增，empathy 与 probe 同涨；轻推进 +1、实质 +2、纯过场 +0；logic 失误 -5~-10。truth 只由 probe 涨（轻 +2、实质 +3）。每节拍 10 个实质/轻推进医生节点（cure 主线 40 轮），约 1/3 实质、2/3 轻推进。过场（narration）负责时间跳跃与数值归位，不计轮。

**结局分叉**（节拍 4 fork，lg4_fork）：
- a special → 安全网 cure 主线（40 轮必经）
- b empathy → 接纳 acceptance（把「我也怕」先收着，用「他喊，我就应」接住）
- c confront `require trust 50` → 隐藏 hidden（陪他走进病房，父子第一次互相接住）
- 恶化入口 lg3_c09_c `require trustAtMost 40` → worsen（把刚打开的门又关上）

---

## 二、剧本元信息（ts-meta）

```ts-meta
// id: liu_guoqiang
// tier: 短
// anchor: 15,28,40,50,58
// truthEnd: 40
// minCureRounds: 40
// fragments: 1
// worsenAtMost: 40
{
  id: "liu_guoqiang",
  name: "刘国强",
  title: "车间班组长 · 父亲重病 · 第一次怕死",
  intro: "厂里体检转介——陪床半个月瘦了十几斤，徒弟堵在车间门口，说再不来说说他先垮了。他来了，理由是『我就是累，看看就走。』",
  surface: "40 岁，车间班组长，带一条生产线。父亲 68 岁刚查出癌症，住院等手术。身形高大但眼下乌青，坐不住，反复搓手。开口先否认『我就是累』，一提『签字』就明显焦躁，会想躲出去抽烟。",
  truth: "母亲走得早，父亲一个人把他拉扯大，从不喊累、从不示弱。他继承的信念是『男人不能怕』。现在换成他要在手术单上签字，他才发现——父亲这座大山也会塌，也需要他拿主意；而承认自己怕，等于承认自己一直是那个没长大的孩子。",
  palette: { primary: "#7a6b5a", secondary: "#b0a090", fog: "#5a5550", bright: "#d8c8b0" },
  baseReward: 650,
  difficulty: "简单",
  startNode: "lg1_start",
  initialState: { trust: 15, defense: 65, mood: 35, truth: 0, round: 0 },
  memoryFragments: [
    {
      id: "liu_g1",
      trigger: { truth: 30 },
      title: "雨夜的车",
      text: "雨下得很大。我爸把外套脱下来罩在我头上，自己光着膀子蹬车，送我去镇上看病。我问他冷不冷，他说，大男人，这点雨算什么。雨打在他背上，我趴在他腰后，觉得那是我这辈子最稳的靠山。",
      emotion: "scared",
    },
  ],
}
```

---

## 三、节拍骨架（ts-dialog 节点）

### 节拍 1 · 初访·「我就是累」（trust 15→28，truth 0→22，阻抗：被当「有问题的人」）

```ts-dialog
// id: lg1_start
{
  id: "lg1_start",
  speaker: "narration",
  text: "深秋的下午，候诊室的椅子被阳光晒得发烫。刘国强坐在角落，腿伸得老长，人却缩着。他右手一直转着打火机，转一会儿，又烦躁地放回兜里。门开了，他站起来，冲你点了点头，像在车间点收一批货。",
  autoNext: "lg1_p01",
}
```

```ts-dialog
// id: lg1_p01
{
  id: "lg1_p01",
  speaker: "patient",
  text: "医生，我就是……厂里体检，说我血压高，让我来看看。其实真没什么，我就是最近睡得少。我爹住院了，我在陪床。您放心，我这身子骨硬。",
  emotion: "neutral",
  autoNext: "lg1_c01",
}
```

```ts-dialog
// id: lg1_c01
{
  id: "lg1_c01",
  speaker: "doctor",
  text: "他一开口就把话说死——「身子骨硬」。可那只转打火机的手，一直没停。",
  choices: [
    { id: "lg1_c01_a", text: "「你能坐在这里，说明你已经扛不住了。硬撑不是这间屋子的规矩。」", kind: "empathy", effect: { trust: 2, defense: -1 }, next: "lg1_p02" },
    { id: "lg1_c01_b", text: "「陪床半个月了？厂里怎么发现你的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "lg1_p02" },
    { id: "lg1_c01_c", text: "「血压高而已，睡够了就下来了，别自己吓自己。」", kind: "logic", effect: { trust: -8, defense: 8, mood: -4 }, next: "lg1_r01" },
  ],
}
```

```ts-dialog
// id: lg1_r01
{
  id: "lg1_r01",
  speaker: "patient",
  text: "（他脸色一沉）我没自己吓自己。我就是累。你们当医生的，怎么动不动就说人有病。我要是真有什么，我早垮了，还能站这儿？",
  emotion: "angry",
  autoNext: "lg1_p02",
}
```

```ts-dialog
// id: lg1_p02
{
  id: "lg1_p02",
  speaker: "patient",
  text: "……刚才您问厂里怎么发现的。其实是我那几个徒弟。我连着请了半个月假，他们在车间门口堵住我，说我瘦得跟个竹竿似的。我照了照镜子……是瘦了。可我有什么办法，我爹那边不能没人。",
  emotion: "anxious",
  autoNext: "lg1_c02",
}
```

```ts-dialog
// id: lg1_c02
{
  id: "lg1_c02",
  speaker: "doctor",
  text: "他把「我不能没人」说得很硬气，可「竹竿」两个字，他是笑着说的。",
  choices: [
    { id: "lg1_c02_a", text: "「瘦了十几斤，还守着病房——你爹身边有人，你身边呢？」", kind: "empathy", effect: { trust: 1 }, next: "lg1_p03" },
    { id: "lg1_c02_b", text: "「你说『不能没人』——是你怕没人照顾你爹，还是怕别的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "lg1_p03" },
  ],
}
```

```ts-dialog
// id: lg1_p03
{
  id: "lg1_p03",
  speaker: "patient",
  text: "……别的？能有什么别的。我爹生我养我，现在他病了，我不去守，谁去守？这还用问吗？反正我这辈子，没打算让他老人家受半点委屈。",
  emotion: "neutral",
  autoNext: "lg1_c03",
}
```

```ts-dialog
// id: lg1_c03
{
  id: "lg1_c03",
  speaker: "doctor",
  text: "「没打算让他受半点委屈」——他把自己摆到了一个没有退路的位置上。",
  choices: [
    { id: "lg1_c03_a", text: "「你说『没打算』的时候，好像从来没想过，自己也会有撑不住的一天。」", kind: "empathy", effect: { trust: 1 }, next: "lg1_p04" },
    { id: "lg1_c03_b", text: "「你有没有想过，你爹要是知道了，会舍得让你这么熬吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "lg1_p04" },
    { id: "lg1_c03_c", text: "「孝顺是好事，但你要是先垮了，谁去守你爹？」", kind: "logic", effect: { trust: -5, defense: 4 }, next: "lg1_p04" },
  ],
}
```

```ts-dialog
// id: lg1_p04
{
  id: "lg1_p04",
  speaker: "patient",
  text: "（他别过脸去）……我想过。我那天在走廊里抽烟，抽着抽着就想：我要是也倒下了，我爹怎么办。我赶紧把烟掐了。我爹还没老，我不能先老了。",
  emotion: "sad",
  autoNext: "lg1_c04",
}
```

```ts-dialog
// id: lg1_c04
{
  id: "lg1_c04",
  speaker: "doctor",
  text: "「我爹还没老」——他说这话时，声音有点抖。",
  choices: [
    { id: "lg1_c04_a", text: "「你不是怕自己垮，你是怕自己垮了，就没人替你把那根梁顶着了。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "lg1_p05" },
    { id: "lg1_c04_b", text: "「『我爹还没老』——可他已经躺在病床上了。你是不想承认这件事吗？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "lg1_p05" },
  ],
}
```

```ts-dialog
// id: lg1_p05
{
  id: "lg1_p05",
  speaker: "patient",
  text: "……我不想承认。医生，我不是不孝顺。我是不敢。医生说，手术单上得家属签字。我爸住院到现在，一说到签字，我就……我就想抽烟。",
  emotion: "anxious",
  autoNext: "lg1_c05",
}
```

```ts-dialog
// id: lg1_c05
{
  id: "lg1_c05",
  speaker: "doctor",
  text: "真相的门露了一条缝——「签字」。他怕的不是那支笔，是笔底下那份责任。",
  choices: [
    { id: "lg1_c05_a", text: "「签字这件事压着你了。它让你怕的，是终于轮到你做主了。」", kind: "empathy", effect: { trust: 1 }, next: "lg1_p06" },
    { id: "lg1_c05_b", text: "「从前家里的事，都是谁签的字？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "lg1_p06" },
  ],
}
```

```ts-dialog
// id: lg1_p06
{
  id: "lg1_p06",
  speaker: "patient",
  text: "（他愣了一下）……我爸。修自行车，他签；我上学，他签；我妈走那会儿，后事也是他操办的。我们家的事，从来都是他拿主意。我活到四十岁，还没替家里做过一个像样的决定。",
  emotion: "neutral",
  autoNext: "lg1_c06",
}
```

```ts-dialog
// id: lg1_c06
{
  id: "lg1_c06",
  speaker: "doctor",
  text: "「活到四十岁，没替家里做过一个像样的决定」——这是他今晚最诚实的一句话。",
  choices: [
    { id: "lg1_c06_a", text: "「你爸把家里所有的事都扛下来了，也包括『让你不用拿主意』这件事。」", kind: "empathy", effect: { trust: 1 }, next: "lg1_p07" },
    { id: "lg1_c06_b", text: "「你没做过决定，是不想做，还是你爸从来没让你做过？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "lg1_p07" },
  ],
}
```

```ts-dialog
// id: lg1_p07
{
  id: "lg1_p07",
  speaker: "patient",
  text: "……他没让我做过。小时候我跟他去修车铺，我想帮忙，他总说『你一边待着去，别添乱』。他把我护得很好，护到我四十岁，连个雨都没怎么淋过似的。现在想想，他那是……替我挡了多少事啊。",
  emotion: "neutral",
  autoNext: "lg1_c07",
}
```

```ts-dialog
// id: lg1_c07
{
  id: "lg1_c07",
  speaker: "doctor",
  text: "「他替我挡了多少事」——他开始看见父亲的付出了。",
  choices: [
    { id: "lg1_c07_a", text: "「你爸替你挡了四十年。现在轮到你了，你才第一次发现，『挡』这件事有多重。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "lg1_p08" },
    { id: "lg1_c07_b", text: "「你爸护着你的时候，有没有哪一次，你其实想说『我也想帮你』？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "lg1_p08" },
  ],
}
```

```ts-dialog
// id: lg1_p08
{
  id: "lg1_p08",
  speaker: "patient",
  text: "（他吸了吸鼻子）……有。我上初中那会儿，家里翻修房子，我爸一个人又是搬砖又是和泥。我放学回家，说想帮把手，他说『你把你书读好，就是帮爸最大的忙』。我就真的……就真的把书读好了。可我那天，其实是想跟他一块儿干活的。",
  emotion: "sad",
  autoNext: "lg1_c08",
}
```

```ts-dialog
// id: lg1_c08
{
  id: "lg1_c08",
  speaker: "doctor",
  text: "「我想跟他一块儿干活」——那个少年，从来没说出口。",
  choices: [
    { id: "lg1_c08_a", text: "「你爸没接住你那只想帮忙的手。那不是你的错，是他太想把一切都扛住了。」", kind: "empathy", effect: { trust: 1 }, next: "lg1_p09" },
    { id: "lg1_c08_b", text: "「如果那天你爸让你搭了把手，你会是什么感觉？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "lg1_p09" },
  ],
}
```

```ts-dialog
// id: lg1_p09
{
  id: "lg1_p09",
  speaker: "patient",
  text: "……会高兴吧。会觉得自己终于也是家里的一份子了。可这几十年来，我一直觉得，家里的事轮不到我管，我也管不好。所以我爸一躺下，我整个人就……就不知道该怎么办了。",
  emotion: "anxious",
  autoNext: "lg1_c09",
}
```

```ts-dialog
// id: lg1_c09
{
  id: "lg1_c09",
  speaker: "doctor",
  text: "「不知道该怎么办」——他第一次承认，自己没学过「当大人」。",
  choices: [
    { id: "lg1_c09_a", text: "「你没学过，不是你的错。是你爸太强了，强到没给你留位置。」", kind: "empathy", effect: { trust: 1 }, next: "lg1_p10" },
    { id: "lg1_c09_b", text: "「『当大人』这件事，你觉得自己缺的是哪一块？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "lg1_p10" },
  ],
}
```

```ts-dialog
// id: lg1_p10
{
  id: "lg1_p10",
  speaker: "patient",
  text: "……缺个胆子吧。我从小到大，都是听我爸的。他让我往东我往东，让我往西我往西。我从来没自己定过一件事。现在突然让我定，我定的可是……可是我爸的手术啊。",
  emotion: "neutral",
  autoNext: "lg1_c10",
}
```

```ts-dialog
// id: lg1_c10
{
  id: "lg1_c10",
  speaker: "doctor",
  text: "他第一次把「我定的可是我爸的手术」说出了口——那是他最重的一句话。",
  choices: [
    { id: "lg1_c10_a", text: "「那个『不知道怎么办』的你，今晚在这里说了真话。明天走进病房，你已经比昨天多了一点点方向。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "lg1_out" },
    { id: "lg1_c10_b", text: "「你怕签字，是怕签错了害了你爸，还是怕自己担不起『决定』两个字？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "lg1_out" },
  ],
}
```

```ts-dialog
// id: lg1_out
{
  id: "lg1_out",
  speaker: "narration",
  text: "第一次会谈结束。刘国强起身时，手机响了，是医院护士台的电话。他接起来，声音立刻变了，又稳又低：「行，我马上回去。」挂了电话，他冲你点了下头，三步并两步走了。背影还是那么硬，可你看见他握着手机的手，一直在抖。",
  beatEnd: { resumeNode: "lg2_start" },
  autoNext: "lg2_start",
}
```

### 节拍 2 · 中间层·「我爸什么都扛」（trust 28→40，truth 22→34，[m1 雨夜的车@30]）

```ts-dialog
// id: lg2_start
{
  id: "lg2_start",
  speaker: "narration",
  text: "一周后，刘国强来了，鼻尖还带着外头的凉气。他进门先搓了搓手，没坐下，先问：「医生，今天能聊久点吗？」你点头。他像是松了口气，坐到沙发上，把烟盒掏出来，又想起什么，塞回兜里。",
  autoNext: "lg2_p01",
}
```

```ts-dialog
// id: lg2_p01
{
  id: "lg2_p01",
  speaker: "patient",
  text: "我爹手术排上了，就这几天。这几天我一直在想您上回说的话。我没敢跟任何人说，我其实……怕。我那几个徒弟还以为我铁打的，我都不敢在他们面前露一点。",
  emotion: "neutral",
  autoNext: "lg2_c01",
}
```

```ts-dialog
// id: lg2_c01
{
  id: "lg2_c01",
  speaker: "doctor",
  text: "他第一次承认「怕」——还是那个在车间里说一不二的班组长。",
  choices: [
    { id: "lg2_c01_a", text: "「你敢当着我说出『怕』字，已经比你在徒弟面前撑着的那个你，往前迈了一大步。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "lg2_p02" },
    { id: "lg2_c01_b", text: "「你怕的，到底是手术本身，还是『万一我决定了，结果不好』？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "lg2_p02" },
  ],
}
```

```ts-dialog
// id: lg2_p02
{
  id: "lg2_p02",
  speaker: "patient",
  text: "……我怕定了之后，万一不好，我怎么跟我爹交代。我怕他说，我怎么养了你这么个没用的儿子。他这辈子没求过任何人，到头来，他的命攥在我手里，我攥不住。",
  emotion: "anxious",
  autoNext: "lg2_c02",
}
```

```ts-dialog
// id: lg2_c02
{
  id: "lg2_c02",
  speaker: "doctor",
  text: "「他的命攥在我手里，我攥不住」——他把自己的手，摊开给你看了。",
  choices: [
    { id: "lg2_c02_a", text: "「你爹这辈子没求过任何人，是因为他一直想让你活得轻松。他不是不信你，是太想替你扛。」", kind: "empathy", effect: { trust: 1 }, next: "lg2_p03" },
    { id: "lg2_c02_b", text: "「『攥不住』——你怕签字，还是怕签完之后，要一个人面对结果？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "lg2_p03" },
  ],
}
```

```ts-dialog
// id: lg2_p03
{
  id: "lg2_p03",
  speaker: "patient",
  text: "……都有。我们家，从来都是我爸一个人扛结果。修自行车，他修，修坏了他说『没事，再修』。盖房子，他盖，刮大风他说『没事，爸扛得住』。他什么事都自己扛，扛完还跟我说没事。我好像……从他身上学到的，就是『自己扛，别给人添麻烦』。",
  emotion: "neutral",
  autoNext: "lg2_c03",
}
```

```ts-dialog
// id: lg2_c03
{
  id: "lg2_c03",
  speaker: "doctor",
  text: "「自己扛，别给人添麻烦」——这八个字，是他从父亲身上继承的第一笔遗产。",
  choices: [
    { id: "lg2_c03_a", text: "「你把这句话背了四十年。可它现在让你连手术单都不敢签——因为它教你的不是求助，是硬扛。」", kind: "empathy", effect: { trust: 1 }, next: "lg2_p04" },
    { id: "lg2_c03_b", text: "「你爹有没有哪一次，不是自己扛的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "lg2_p04" },
    { id: "lg2_c03_c", text: "「你爹扛了一辈子，你也该学他硬气一点。别整这些没用的。」", kind: "logic", effect: { trust: -6, defense: 6 }, next: "lg2_p04" },
  ],
}
```

```ts-dialog
// id: lg2_p04
{
  id: "lg2_p04",
  speaker: "patient",
  text: "（他怔了怔）……我妈走那年，我上高中。我妈在医院躺了四十多天，我爸没让我请一天假，他说『你读书要紧，家里有你爸』。他一个人守了四十多天，我妈走的时候，他瘦了一大圈，愣是没在我面前掉一滴泪。我那时候就觉得，男人，就该是这样。",
  emotion: "sad",
  autoNext: "lg2_c04",
}
```

```ts-dialog
// id: lg2_c04
{
  id: "lg2_c04",
  speaker: "doctor",
  text: "「男人就该是这样」——那是他第一次给「男人」下了定义。",
  choices: [
    { id: "lg2_c04_a", text: "「你爸没在你面前掉泪，不是他没有眼泪，是他不想让你看见。他替你把眼泪也扛了。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "lg2_p05" },
    { id: "lg2_c04_b", text: "「『男人就该是这样』——这句话是谁教你的？是你爸亲口说的，还是你看着他学的？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "lg2_p05" },
  ],
}
```

```ts-dialog
// id: lg2_p05
{
  id: "lg2_p05",
  speaker: "patient",
  text: "……他没亲口说过。我妈走那阵子，他每天照常给我做饭，接送我上下学。有天下雨，我看见他蹲在门口抽烟，抽完一根，把烟头踩灭，站起来，抹了把脸，进厨房给我炒菜去了。我就是从那天起，觉得自己这辈子都不能在他面前哭。",
  emotion: "anxious",
  autoNext: "lg2_c05",
}
```

```ts-dialog
// id: lg2_c05
{
  id: "lg2_c05",
  speaker: "doctor",
  text: "「不能在他面前哭」——一个孩子，从一场雨里给自己立下了一辈子的规矩。",
  choices: [
    { id: "lg2_c05_a", text: "「你怕的不是哭，是怕一哭，你爸那个『扛得住』的样子就塌了。」", kind: "empathy", effect: { trust: 1 }, next: "lg2_p06" },
    { id: "lg2_c05_b", text: "「你有没有想过，你爸蹲在门口抽烟的时候，其实也特别想有人跟他说句话？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "lg2_p06" },
  ],
}
```

```ts-dialog
// id: lg2_p06
{
  id: "lg2_p06",
  speaker: "patient",
  text: "（他沉默了挺久）……想过。我后来偷偷问过他，我说爸，妈走了你难过吗。他说，有什么难过的，人都有这一遭。然后就没了。我当时还觉得，我爸真是条汉子。现在我爹病了，我才明白，他那时候不是不难过，是难过也得自己咽。",
  emotion: "sad",
  autoNext: "lg2_c06",
}
```

```ts-dialog
// id: lg2_c06
{
  id: "lg2_c06",
  speaker: "doctor",
  text: "「难过也得自己咽」——他正在看穿父亲，也在看穿自己。",
  choices: [
    { id: "lg2_c06_a", text: "「你爸咽了一辈子，你现在也在咽。可咽久了，人会生病的——你这一身的烦躁、失眠，就是你咽不动了的信号。」", kind: "empathy", effect: { trust: 1 }, next: "lg2_p07" },
    { id: "lg2_c06_b", text: "「你爹现在躺在病床上，你还想让他一个人咽吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "lg2_p07" },
  ],
}
```

```ts-dialog
// id: lg2_p07
{
  id: "lg2_p07",
  speaker: "patient",
  text: "……我不想。我这两天在医院，一直忍着不跟我爹说我也怕。我怕一说，他就更不踏实了。可我心里憋得慌，憋得我整宿整宿睡不着，白天又不敢让徒弟看见我打哈欠。我就躲出去抽烟，一支接一支。",
  emotion: "anxious",
  autoNext: "lg2_c07",
}
```

```ts-dialog
// id: lg2_c07
{
  id: "lg2_c07",
  speaker: "doctor",
  text: "「躲出去抽烟」——那是他给自己找的「透气口」。",
  choices: [
    { id: "lg2_c07_a", text: "「躲出去抽烟，是因为那几分钟里，你可以不用当那个『铁打的班组长』。」", kind: "empathy", effect: { trust: 1 }, next: "lg2_p08" },
    { id: "lg2_c07_b", text: "「你躲出去的时候，最想躲开的是什么？是病房，还是病房里那个要做决定的你？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "lg2_p08" },
  ],
}
```

```ts-dialog
// id: lg2_p08
{
  id: "lg2_p08",
  speaker: "patient",
  text: "（他捏了捏眉心）……都想躲。我一进病房，看我爹躺着，我就想，我得想点主意。可我一想主意，脑子里就一片空白。我爹要是知道我这么没出息，估计得从病床上坐起来骂我。",
  emotion: "neutral",
  autoNext: "lg2_c08",
}
```

```ts-dialog
// id: lg2_c08
{
  id: "lg2_c08",
  speaker: "doctor",
  text: "他在用「我爹会骂我」来替自己兜底——仿佛骂两句，就不用面对那份决定了。",
  choices: [
    { id: "lg2_c08_a", text: "「你怕的不是你爹骂你，是你爹真的看穿你『没准备好』——可『没准备好』，不是罪。」", kind: "empathy", effect: { trust: 1 }, next: "lg2_p09" },
    { id: "lg2_c08_b", text: "「你爹以前骂过你吗？他是那种会为『没主意』骂人的父亲吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "lg2_p09" },
  ],
}
```

```ts-dialog
// id: lg2_p09
{
  id: "lg2_p09",
  speaker: "patient",
  text: "……他骂过我。我小时候不好好写作业，他拿笤帚疙瘩打我屁股，骂我没出息。可后来我上了班，第一次拿工资回家，他当着全家的面，把工资数了两遍，什么也没说。我妈走了以后，他就更不骂我了。他好像……有点怕我长大。",
  emotion: "sad",
  autoNext: "lg2_c09",
}
```

```ts-dialog
// id: lg2_c09
{
  id: "lg2_c09",
  speaker: "doctor",
  text: "「他好像有点怕我长大」——父亲也有怕的时候。",
  choices: [
    { id: "lg2_c09_a", text: "「你爸怕你长大，是因为你一旦长大，他就护不住你了，他也就……不知道该拿什么跟你说话了。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "lg2_p10" },
    { id: "lg2_c09_b", text: "「你爸怕你长大，那他自己怕过什么吗？你有没有见过他怕的样子？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "lg2_p10" },
  ],
}
```

```ts-dialog
// id: lg2_p10
{
  id: "lg2_p10",
  speaker: "patient",
  text: "……没见过。在我印象里，我爸这辈子没怕过任何事。修车、盖房、供我读书、给我妈办后事，他一件一件都拿下来了。我一直以为他是铁打的。直到他查出这个病，在病床上抓着我的手，问我『孩子，爸这个病，能治吧』——那一刻，我才第一次觉得，我爸也是个会怕的人。",
  emotion: "neutral",
  autoNext: "lg2_c10",
}
```

```ts-dialog
// id: lg2_c10
{
  id: "lg2_c10",
  speaker: "doctor",
  text: "他撞见了父亲的第一份害怕。这是今晚最重的发现。",
  choices: [
    { id: "lg2_c10_a", text: "「你爸问你能不能治，不是他怕死，是他怕自己一走，就没人再护着你了。他是在用他的方式，跟你求救。」", kind: "empathy", effect: { trust: 0, mood: 3 }, next: "lg2_out" },
    { id: "lg2_c10_b", text: "「他抓着你的手问『能治吧』——那一刻，你是什么感觉？」", kind: "probe", effect: { truth: 2 }, next: "lg2_out" },
  ],
}
```

```ts-dialog
// id: lg2_out
{
  id: "lg2_out",
  speaker: "narration",
  text: "第二次会谈，刘国强走的时候，在门口停了停。他说：「医生，我明天要去跟我爸谈手术的事。我得跟他商量。」这是他第一次说「商量」——从前，他只会听安排。",
  beatEnd: { resumeNode: "lg3_start" },
  autoNext: "lg3_start",
}
```

### 节拍 3 · 深层·「男人不能怕」（trust 40→50，truth 34→40+，恶化入口 @trust≤40）

```ts-dialog
// id: lg3_start
{
  id: "lg3_start",
  speaker: "narration",
  text: "这次刘国强迟到了十分钟。进门时，他眼睛有点红，像是没睡好。他坐下，没等开口，先说了句：「医生，我昨晚上做了个梦，梦着我小时候了。」",
  autoNext: "lg3_p01",
}
```

```ts-dialog
// id: lg3_p01
{
  id: "lg3_p01",
  speaker: "patient",
  text: "梦里是我七八岁那会儿，下着大雨，我发烧，我爸用自行车驮着我去镇上看病。他把外套脱了，罩在我头上，自己光着膀子蹬车。我问他冷不冷，他说，大男人，这点雨算什么。我醒过来，枕头都是湿的。",
  emotion: "neutral",
  autoNext: "lg3_c01",
}
```

```ts-dialog
// id: lg3_c01
{
  id: "lg3_c01",
  speaker: "doctor",
  text: "那个雨夜，是「男人不能怕」这四个字，第一次刻进他心里的时候。",
  choices: [
    { id: "lg3_c01_a", text: "「你爸那件外套，罩在你头上四十年了。你从来没想过，他自己淋着雨，也会冷。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "lg3_p02" },
    { id: "lg3_c01_b", text: "「梦里那句『大男人，这点雨算什么』——你后来有多少次，是照着这句话活的？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "lg3_p02" },
  ],
}
```

```ts-dialog
// id: lg3_p02
{
  id: "lg3_p02",
  speaker: "patient",
  text: "……多了去了。被师傅骂，我挺着；加班到凌晨，我挺着；车间出事，我第一个冲上去，也顶着。我总觉得，我爸能做到的，我也得做到。我是他儿子，我不能给他丢人，更不能让他看出来我怕。",
  emotion: "anxious",
  autoNext: "lg3_c02",
}
```

```ts-dialog
// id: lg3_c02
{
  id: "lg3_c02",
  speaker: "doctor",
  text: "「不能让他看出来我怕」——他把父亲那句「大男人」，活成了一条捆在自己身上的绳。",
  choices: [
    { id: "lg3_c02_a", text: "「你把『不能怕』背在身上背了三十年。可它现在不只是在帮你，还在压你——连签字的手都在抖。」", kind: "empathy", effect: { trust: 1 }, next: "lg3_p03" },
    { id: "lg3_c02_b", text: "「如果有一天，你爸看出来你怕了，你觉得会发生什么？他会瞧不起你吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "lg3_p03" },
  ],
}
```

```ts-dialog
// id: lg3_p03
{
  id: "lg3_p03",
  speaker: "patient",
  text: "（他沉默了很久）……我不知道。我没敢想过。他要是知道我这么怂，我……我可能会觉得自己特别对不起他。我连这点事都扛不住，还配当他儿子吗。",
  emotion: "sad",
  autoNext: "lg3_c03",
}
```

```ts-dialog
// id: lg3_c03
{
  id: "lg3_c03",
  speaker: "doctor",
  text: "「还配当他儿子吗」——他把「成为男人」和「让父亲失望」焊在了一起。",
  choices: [
    { id: "lg3_c03_a", text: "「你爸养你四十年，不是为了让你『配得上当他儿子』。他要是真在乎这个，当年就不会让你帮着他修自行车了。」", kind: "empathy", effect: { trust: 1 }, next: "lg3_p04" },
    { id: "lg3_c03_b", text: "「你说的『怂』，是怕手术签字。可你守了他四十多天，没抱怨过一句——这不叫怂，这叫在扛。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "lg3_p04" },
    { id: "lg3_c03_c", text: "「男子汉大丈夫，眼泪往肚里咽，这才是顶天立地。别让这点事垮了你。」", kind: "logic", effect: { trust: -8, defense: 8 }, next: "lg3_p04" },
  ],
}
```

```ts-dialog
// id: lg3_p04
{
  id: "lg3_p04",
  speaker: "patient",
  text: "（他的眼眶红了）……眼泪往肚里咽。这话，我从小听到大。我爹咽了一辈子，现在我也在咽。可我咽着咽着，发现自己快咽不下去了。我这两天，一看见我爹躺在床上，我就想哭。我又怕哭出来，就真的垮了。",
  emotion: "sad",
  autoNext: "lg3_c04",
}
```

```ts-dialog
// id: lg3_c04
{
  id: "lg3_c04",
  speaker: "doctor",
  text: "他第一次把「想哭」和「垮了」连在一起——仿佛掉泪就等于失败。",
  choices: [
    { id: "lg3_c04_a", text: "「眼泪不是垮。你爹要是看见你哭，他先心疼的，肯定不是你没出息，是你这四十天受的委屈。」", kind: "empathy", effect: { trust: 0, mood: 3 }, next: "lg3_p05" },
    { id: "lg3_c04_b", text: "「你怕自己哭出来就『垮了』——这个『垮』，是你爹教你的，还是你自己定的规矩？」", kind: "probe", effect: { truth: 2 }, next: "lg3_p05" },
  ],
}
```

```ts-dialog
// id: lg3_p05
{
  id: "lg3_p05",
  speaker: "patient",
  text: "……没人教我。是我自己看出来的。我妈走那年，我爸一滴眼泪没掉。我那时候就发誓，我是他儿子，我以后也一滴眼泪不掉。可我爹这次住院，我守着我爹，守到一半就破功了。我在楼道里，看见个跟我爹差不多年纪的老头，眼泪一下子就下来了。",
  emotion: "neutral",
  autoNext: "lg3_c05",
}
```

```ts-dialog
// id: lg3_c05
{
  id: "lg3_c05",
  speaker: "doctor",
  text: "「破功了」——那可能是他这辈子，第一次允许自己害怕。",
  choices: [
    { id: "lg3_c05_a", text: "「那滴眼泪，不是给你爹丢人，是你终于承认：你也会怕，你也有接不住的时候。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "lg3_p06" },
    { id: "lg3_c05_b", text: "「看见那个老头就哭了——那一刻，你怕的到底是老头，还是老头背后『总有一天我也会失去我爸』这件事？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "lg3_p06" },
  ],
}
```

```ts-dialog
// id: lg3_p06
{
  id: "lg3_p06",
  speaker: "patient",
  text: "（他捂住了脸）……是。我怕的不是老头，是我爸。我特别怕。我怕手术不好，怕我连最后一面都……我长这么大，第一次这么怕。我以前总觉得，怕是不对的，是没出息。可我这两天，真的扛不住了。",
  emotion: "scared",
  autoNext: "lg3_c06",
}
```

```ts-dialog
// id: lg3_c06
{
  id: "lg3_c06",
  speaker: "doctor",
  text: "「怕是不对的」——那是「男人不能怕」这条信念最深的根。",
  choices: [
    { id: "lg3_c06_a", text: "「怕不是没出息。你爹也会怕，他躺在病床上问你『能治吧』的时候，就是在怕。你只是从来不敢承认他也怕。」", kind: "empathy", effect: { trust: 1 }, next: "lg3_p07" },
    { id: "lg3_c06_b", text: "「如果『怕』不是错的，那它在你心里，会变成什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "lg3_p07" },
  ],
}
```

```ts-dialog
// id: lg3_p07
{
  id: "lg3_p07",
  speaker: "patient",
  text: "……变成什么？我不知道。我从来没允许自己怕过。我总觉得，我一怕，天就要塌了。可我这些天扛着、忍着、躲着，天也没塌，是我自己快塌了。我好像……一直把『怕』想得太大了。",
  emotion: "anxious",
  autoNext: "lg3_c07",
}
```

```ts-dialog
// id: lg3_c07
{
  id: "lg3_c07",
  speaker: "doctor",
  text: "「把怕想得太大了」——他开始松开那条捆了自己三十年的绳子。",
  choices: [
    { id: "lg3_c07_a", text: "「你不是在怕『怕』，你是在怕『怕了之后没人接住你』。可你现在有我了，你也可以试着，让你爸知道你怕。」", kind: "empathy", effect: { trust: 1 }, next: "lg3_p08" },
    { id: "lg3_c07_b", text: "「你觉得，你爸会不会其实一直盼着，你能跟他说一句『爸，我也怕』？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "lg3_p08" },
  ],
}
```

```ts-dialog
// id: lg3_p08
{
  id: "lg3_p08",
  speaker: "patient",
  text: "（他愣住，半天没说话）……盼着？他要是盼着，当年我妈走的时候，他怎么会一个人扛着。他那么硬一个人……算了，我不知道。我怕我说了，他更不放心。",
  emotion: "neutral",
  autoNext: "lg3_c08",
}
```

```ts-dialog
// id: lg3_c08
{
  id: "lg3_c08",
  speaker: "doctor",
  text: "「怕说了他不放心」——他在替父亲做决定，就像父亲替他做了四十年决定。",
  choices: [
    { id: "lg3_c08_a", text: "「你替他说『他会不放心』，就像他当年替你说『你读书要紧』。你们爷俩，一个比一个会扛，一个比一个不让人看见。」", kind: "empathy", effect: { trust: 1 }, next: "lg3_p09" },
    { id: "lg3_c08_b", text: "「你有没有想过，你爸现在最想要的，可能不是『让他放心』，而是你还能跟他『说说话』？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "lg3_p09" },
  ],
}
```

```ts-dialog
// id: lg3_p09
{
  id: "lg3_p09",
  speaker: "doctor",
  text: "手术的日子近了。他攥着拳头，坐在你对面，像要上一场大考。",
  choices: [
    { id: "lg3_p09_a", text: "「明天进病房之前，你可以先跟我说说，你最想对你爸说的那句话是什么？」", kind: "empathy", effect: { trust: 1 }, next: "lg3_p10" },
    { id: "lg3_p09_b", text: "「如果手术真到了最坏那一步，你想怎么陪着你爸走？你问过自己吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "lg3_p10" },
    { id: "lg3_p09_c", text: "「别老想这些丧气事。你爸命硬，你比他更硬，手术肯定没问题。想太多反而添乱。」", kind: "logic", require: { trustAtMost: 40 }, effect: { trust: -10, defense: 10 }, next: "lg3_w01", hint: "仅信任≤40 时可见" },
  ],
}
```

```ts-dialog
// id: lg3_p10
{
  id: "lg3_p10",
  speaker: "patient",
  text: "（他想了想，声音有点抖）……我想跟他说，爸，您辛苦了。从小到大，都是您在扛。这回，换我扛。您就……您就踏踏实实躺那儿，别老想着护着我了。您也是个人，您也会累。",
  emotion: "neutral",
  autoNext: "lg3_c10",
}
```

```ts-dialog
// id: lg3_c10
{
  id: "lg3_c10",
  speaker: "doctor",
  text: "他说出了这辈子没跟父亲说过的话——「您也会累」。",
  choices: [
    { id: "lg3_c10_a", text: "「这句话，比你签的任何一张手术单都重。它是你四十年来，第一次把父亲当成了一个『也会累的人』。」", kind: "empathy", effect: { trust: 0, mood: 4 }, next: "lg3_out" },
    { id: "lg3_c10_b", text: "「你准备好，当面跟你爸说这句话了吗？」", kind: "probe", effect: { truth: 2 }, next: "lg3_out" },
  ],
}
```

```ts-dialog
// id: lg3_out
{
  id: "lg3_out",
  speaker: "narration",
  text: "第三次会谈结束。刘国强在门口站了很久，最后说：「医生，我明儿去跟我爸说说话。」你点头。他走了两步，又回头：「他说不定会嫌我烦。」你看见他笑了一下——那大概是他这些天，第一个不是硬撑出来的笑。",
  beatEnd: { resumeNode: "lg4_start" },
  autoNext: "lg4_start",
}
```

#### 恶化分支（worsen）

```ts-dialog
// id: lg3_w01
{
  id: "lg3_w01",
  speaker: "patient",
  text: "（他沉默了很久，声音一点点冷下去）……您说得对。我想多了，都是些没用的念头。我爹命硬，我比他更硬，扛过去就完了。我跟您说这些，有什么用呢。我本来就不该来。",
  emotion: "broken",
  autoNext: "lg3_w02",
}
```

```ts-dialog
// id: lg3_w02
{
  id: "lg3_w02",
  speaker: "doctor",
  text: "你那句「想多了没用」，把他刚打开的那扇门，又给关上了。他咽回了那句「您也会累」。",
  choices: [
    { id: "lg3_w02_a", text: "「我不是那个意思。我是说，你要相信你爸能挺过去，你也得稳住自己，别垮了。」", kind: "logic", effect: { trust: -6, defense: 6 }, next: "lg3_w03" },
    { id: "lg3_w02_b", text: "（你把话咽了回去，试着补救）「……你要是不想说，我们就先不聊这些。」", kind: "empathy", effect: { trust: -3, mood: -4 }, next: "lg3_w03" },
  ],
}
```

```ts-dialog
// id: lg3_w03
{
  id: "lg3_w03",
  speaker: "patient",
  text: "……不用了。您说得对，我不该想那么多。我回去守着就行。我爹那脾气，他知道我在这儿磨磨唧唧，该嫌我没出息了。就这样吧，医生，谢谢您。",
  emotion: "broken",
  autoNext: "lg_end_worsen",
}
```

### 节拍 4 · 转向 + 结局（trust 50→58，cure 主线分叉 + 安全网）

```ts-dialog
// id: lg4_start
{
  id: "lg4_start",
  speaker: "narration",
  text: "手术前一天，刘国强来了。他穿得很整齐，头发也理了，像是要去见什么重要的人。他坐下，没说话，先递给你一样东西——一张皱巴巴的纸条，上面歪歪扭扭写着一行字。",
  autoNext: "lg4_p01",
}
```

```ts-dialog
// id: lg4_p01
{
  id: "lg4_p01",
  speaker: "patient",
  text: "我爹昨晚上醒着，我坐在他床边，也不知道哪来的胆子，把我琢磨了好几天的话，跟他说了。我说，爸，您这回别扛了，您也是个人，您也会累，该哭就哭，该怕就怕。我守着他，他听我说完，半天没说话，然后叫了我一声小名，说了句「你别怕」。就那三个字，我四十岁的人了，当时差点没绷住。",
  emotion: "calm",
  autoNext: "lg4_fork",
}
```

```ts-dialog
// id: lg4_fork
{
  id: "lg4_fork",
  speaker: "doctor",
  text: "他停住了，喉结动了动。那句话卡在他嘴边，像是憋了四十年的东西，终于到了嗓子眼。",
  choices: [
    { id: "lg4_fork_a", text: "「你把纸条上那句话，说给我听听。说出来，你就真的把它放下来了。」", kind: "special", effect: { trust: 1, mood: 2 }, next: "lg4_s01" },
    { id: "lg4_fork_b", text: "「有些话不用急着说。你能把那句话放在心里，陪他走进手术室，也是一种接住。」", kind: "empathy", effect: { trust: 1 }, next: "lg4_a01" },
    { id: "lg4_fork_c", text: "「你爸叫了你的小名，说了『你别怕』——你是不是想说，他那句没说出口的『我也怕』，你其实听见了？」", kind: "confront", require: { trust: 50 }, effect: { trust: 1, truth: 3 }, next: "lg4_h01", hint: "需要信任≥50" },
  ],
}
```

#### 安全网路径（cure 主线）

```ts-dialog
// id: lg4_s01
{
  id: "lg4_s01",
  speaker: "patient",
  text: "（他低头，看着纸条，一个字一个字地念）……「爸，您喊我小名的时候，我差点没绷住。我从小到大，都觉得您是天，是山，是扛不住也会硬扛的人。可那天您抓着我的手问我病能不能治，我才知道，山也会怕。」……念到这儿，他停住了，眼泪啪嗒掉在纸上。",
  emotion: "sad",
  autoNext: "lg4_s02",
}
```

```ts-dialog
// id: lg4_s02
{
  id: "lg4_s02",
  speaker: "doctor",
  text: "他念不下去了——那里面装的，是他四十年攒下来、从没出口的东西。",
  choices: [
    { id: "lg4_s02_a", text: "「那四个字『山也会怕』，你是说给你爸听的，也是说给你自己听的。你终于允许那座山害怕了。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "lg4_s03" },
    { id: "lg4_s02_b", text: "「纸条上还有一句吗？那句话是什么？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "lg4_s03" },
  ],
}
```

```ts-dialog
// id: lg4_s03
{
  id: "lg4_s03",
  speaker: "patient",
  text: "……还有一句。我写了又划掉，划掉又写上。「我也怕。爸，我也是头一回当大人，我怕我当不好，怕您笑话我，怕我以后……就没爸了。」我划掉那行字的时候，手一直抖，写不直。",
  emotion: "sad",
  autoNext: "lg4_s04",
}
```

```ts-dialog
// id: lg4_s04
{
  id: "lg4_s04",
  speaker: "doctor",
  text: "「怕我以后就没爸了」——他把这辈子最不敢说的话，写下来了。",
  choices: [
    { id: "lg4_s04_a", text: "「你把它写下来，不是因为你好了，是因为你终于敢承认：你怕，且这份怕不需要谁来笑话。它是真的。」", kind: "empathy", effect: { trust: 1 }, next: "lg4_s05" },
    { id: "lg4_s04_b", text: "「你划掉那行字的时候，是怕你爸看见，还是怕你自己看见？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "lg4_s05" },
  ],
}
```

```ts-dialog
// id: lg4_s05
{
  id: "lg4_s05",
  speaker: "patient",
  text: "（他垂下头）……都有。我跟我爹说了「您也会累」，可那句「我也怕」，我到底没敢当着他的面说。我怕我一说，他先撑不住。我总觉得，我得比他稳，我才配当他儿子。",
  emotion: "anxious",
  autoNext: "lg4_s06",
}
```

```ts-dialog
// id: lg4_s06
{
  id: "lg4_s06",
  speaker: "doctor",
  text: "「我得比他稳，才配当他儿子」——那条「男人不能怕」的绳子，还捆着他。",
  choices: [
    { id: "lg4_s06_a", text: "「你爸要是知道，你为了『配当他儿子』，把自己逼到不敢承认害怕——他不会骄傲，他会心疼。」", kind: "empathy", effect: { trust: 1 }, next: "lg4_s07" },
    { id: "lg4_s06_b", text: "「你觉得，你爸更想要一个『永远稳得住』的儿子，还是一个『会跟他说害怕』的儿子？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "lg4_s07" },
  ],
}
```

```ts-dialog
// id: lg4_s07
{
  id: "lg4_s07",
  speaker: "patient",
  text: "（他想了很久）……说实话，我摸不准。我爸那个人，一辈子没跟我说过软话。可我妈走那年，他一个人蹲在门口抽烟，我想，他要是有个人能说说，兴许就好过些。我这些天，总算有点明白他那时候啥滋味了。",
  emotion: "neutral",
  autoNext: "lg4_s08",
}
```

```ts-dialog
// id: lg4_s08
{
  id: "lg4_s08",
  speaker: "doctor",
  text: "他正在用自己这些天的苦，去理解父亲当年的苦——父子之间，第一次有了「懂得」的可能。",
  choices: [
    { id: "lg4_s08_a", text: "「你不是『懂』他，你是终于『认得』他了——认得他也是个会累、会怕、会躲起来抽烟的普通人。」", kind: "empathy", effect: { trust: 0, mood: 4 }, next: "lg4_s09" },
    { id: "lg4_s08_b", text: "「那你自己呢？你这些天的怕，有没有人能接住？」", kind: "probe", effect: { truth: 2 }, next: "lg4_s09" },
  ],
}
```

```ts-dialog
// id: lg4_s09
{
  id: "lg4_s09",
  speaker: "patient",
  text: "（他抬眼看了你一下，很快又移开）……这儿算一个吧。您没笑话我，也没嫌我怂。我跟您说这些，说了这么多回，头一回觉得，说出来，好像也没那么丢人。",
  emotion: "neutral",
  autoNext: "lg4_s10",
}
```

```ts-dialog
// id: lg4_s10
{
  id: "lg4_s10",
  speaker: "doctor",
  text: "「说出来没那么丢人」——他正在把「男人不能怕」，换成「男人也可以被接住」。",
  choices: [
    { id: "lg4_s10_a", text: "「你爹在病床上问你『能治吧』——那也是他这辈子，第一次跟你『说出来』。你们爷俩，都在这几天里，学着开口了。」", kind: "empathy", effect: { trust: 1 }, next: "lg4_s11" },
    { id: "lg4_s10_b", text: "「明天进手术室之前，你打算把『我也怕』这三个字，跟你爸说出口吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "lg4_s11" },
  ],
}
```

```ts-dialog
// id: lg4_s11
{
  id: "lg4_s11",
  speaker: "patient",
  text: "（他攥了攥拳头，又松开）……说。我明天进病房，就跟我爹说，爸，我也怕。他要是骂我，我就……我就听着。骂完了，我再跟他说，可我还是怕。我怕，但我还是在这儿。",
  emotion: "calm",
  autoNext: "lg4_s12",
}
```

```ts-dialog
// id: lg4_s12
{
  id: "lg4_s12",
  speaker: "doctor",
  text: "「我怕，但我还是在这儿」——这是整场对话里，最有力量的一句话。害怕和陪伴，第一次在他身上并存了。",
  choices: [
    { id: "lg4_s12_a", text: "「你终于不用在『怕』和『扛』之间二选一了。你可以怕，也可以陪着他——这两件事，本来就该一起发生。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "lg4_s13" },
    { id: "lg4_s12_b", text: "「如果手术那扇门关上之后，你爸没出来，你打算怎么带着这句『我怕』往前走？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "lg4_s13" },
  ],
}
```

```ts-dialog
// id: lg4_s13
{
  id: "lg4_s13",
  speaker: "patient",
  text: "（他闭了闭眼）……想过。我想过最坏那一步。我要是真走到那一步，我就跟他一样，蹲在门口抽根烟，抽完了，抹把脸，该做饭做饭，该上班上班。只是……我会记得他叫我小名那声儿。他怕我，还肯叫我，那就是我这辈子，接得最稳的一次。",
  emotion: "sad",
  autoNext: "lg4_s14",
}
```

```ts-dialog
// id: lg4_s14
{
  id: "lg4_s14",
  speaker: "doctor",
  text: "他给自己想好了最坏那条路，也给自己留好了最暖的那盏灯。",
  choices: [
    { id: "lg4_s14_a", text: "「你爸这辈子护了你四十年。现在你学会了：护着他，也允许他怕。这份『接住』，你爸等了你四十年。」", kind: "empathy", effect: { trust: 0, mood: 4 }, next: "lg4_s15" },
    { id: "lg4_s14_b", text: "「『接得最稳』——那声小名，你想不想让他知道，你听见了？」", kind: "probe", effect: { truth: 2 }, next: "lg4_s15" },
  ],
}
```

```ts-dialog
// id: lg4_s15
{
  id: "lg4_s15",
  speaker: "patient",
  text: "……想。我明天跟他说完「我也怕」，我就告诉他，他那声小名，我听见了，我一辈子都记着。他爱不爱听，是他的事。我说出口，是我的事。我这四十岁，头一回觉得，有些话，说了才算数。",
  emotion: "calm",
  autoNext: "lg4_s16",
}
```

```ts-dialog
// id: lg4_s16
{
  id: "lg4_s16",
  speaker: "doctor",
  text: "「说了才算数」——他正从一个「听父亲安排的儿子」，变成一个「敢开口的父亲」。",
  choices: [
    { id: "lg4_s16_a", text: "「明天进那扇门之前，你已经是『敢开口』的人了。你爸躺在里面，不管手术结果如何，他知道，他儿子没躲。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "lg4_s17" },
    { id: "lg4_s16_b", text: "「你现在回想一下——从陪床那天到今天，你变了多少？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "lg4_s17" },
  ],
}
```

```ts-dialog
// id: lg4_s17
{
  id: "lg4_s17",
  speaker: "patient",
  text: "（他想了想，眼眶有点热）……变了挺多。以前我觉得，男人就得硬扛，扛不住也得扛。现在我明白，接住害怕，也是一种扛。我爹要是看见我今天这样，他大概……大概会放心一点吧。",
  emotion: "calm",
  autoNext: "lg4_s18",
}
```

```ts-dialog
// id: lg4_s18
{
  id: "lg4_s18",
  speaker: "doctor",
  text: "「他会放心一点吧」——他替父亲，给自己批了一份「及格」。",
  choices: [
    { id: "lg4_s18_a", text: "「你早就及格了。你爹不需要你『顶天立地』，他需要的是：他儿子怕的时候，还愿意守在他床边。」", kind: "empathy", effect: { trust: 0, mood: 4 }, next: "lg_end_cure" },
    { id: "lg4_s18_b", text: "「如果手术顺利，你出院以后，第一件想跟你爸做的事是什么？」", kind: "probe", effect: { truth: 2 }, next: "lg_end_cure" },
  ],
}
```

#### 接纳路径（acceptance）

```ts-dialog
// id: lg4_a01
{
  id: "lg4_a01",
  speaker: "patient",
  text: "（他点点头）……行。那句话，我先放着。等我觉得能说的时候，再说。反正人就在那儿，跑不了。我也怕说出来，他要是接不住，我这辈子就……就再也不敢说了。",
  emotion: "neutral",
  autoNext: "lg4_a02",
}
```

```ts-dialog
// id: lg4_a02
{
  id: "lg4_a02",
  speaker: "doctor",
  text: "他选择把「怕」先收着——不是否认，是还没准备好。这也是一种向前。",
  choices: [
    { id: "lg4_a02_a", text: "「收着不等于没有。你允许它待在心里，等哪天觉得安全了，再把它拿出来。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "lg4_a03" },
    { id: "lg4_a02_b", text: "「那句『我也怕』，你打算什么时候说？还是说，你怕的是说了之后，自己先接不住？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "lg4_a03" },
  ],
}
```

```ts-dialog
// id: lg4_a03
{
  id: "lg4_a03",
  speaker: "patient",
  text: "……都有。我怕我一说，自己先哭了，连病房都待不下去。那还不如不说。我守着他就行，他喊我小名的时候，我应一声，他就踏实了。",
  emotion: "neutral",
  autoNext: "lg4_a04",
}
```

```ts-dialog
// id: lg4_a04
{
  id: "lg4_a04",
  speaker: "doctor",
  text: "他找到了一种「接住」的方式——不是非得说出来，而是「他喊，我就应」。",
  choices: [
    { id: "lg4_a04_a", text: "「『他喊，我就应』——这五个字，已经是一种很深的陪伴了。你爸会懂的。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "lg4_a05" },
    { id: "lg4_a04_b", text: "「如果有一天你真的说出口了，你觉得会怎样？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "lg4_a05" },
  ],
}
```

```ts-dialog
// id: lg4_a05
{
  id: "lg4_a05",
  speaker: "patient",
  text: "（他想了想，轻声说）……会怎样？兴许他会愣住，兴许他会骂我，兴许他什么都不说。可不管怎样，那句话我说了，我就……就不是一个人在扛了。医生，谢谢你。你让我知道，怕不是错，硬扛不是唯一的路。",
  emotion: "calm",
  autoNext: "lg_end_accept",
}
```

#### 隐藏路径（hidden · 强制介入）

```ts-dialog
// id: lg4_h01
{
  id: "lg4_h01",
  speaker: "patient",
  text: "（他愣住了，眼睛一下就红了）……您怎么知道。他叫我小名的时候，就那么一声，我耳朵里全是「我爸是不是知道我要说什么了」。他……他其实也怕，他怕我不知道该怎么怕。可我连「我也怕」都没敢说出口。",
  emotion: "broken",
  autoNext: "lg4_h02",
}
```

```ts-dialog
// id: lg4_h02
{
  id: "lg4_h02",
  speaker: "doctor",
  text: "你触碰到了他最后那层壳——他不敢让父亲知道自己在怕，其实是因为，他不敢让父亲知道，父亲也有接不住他的那天。",
  choices: [
    { id: "lg4_h02_a", text: "「我打算明天陪你一起去病房。有些话，你不一定非要一个人说——我可以先替你开口，替你把你爸那句没说出口的话，接住。」", kind: "special", effect: { mood: -2 }, next: "lg4_h03" },
    { id: "lg4_h02_b", text: "「我们先把这句话放在这儿。等你觉得能开口了，我们再试着说。」", kind: "empathy", effect: { trust: 1 }, next: "lg4_h05" },
  ],
}
```

```ts-dialog
// id: lg4_h03
{
  id: "lg4_h03",
  speaker: "patient",
  text: "（他的声音发颤）您陪我进去？可那是我爸……我怕他看见我这样，更不放心。我这一辈子，都没在他面前露过怯。",
  emotion: "scared",
  autoNext: "lg4_h04",
}
```

```ts-dialog
// id: lg4_h04
{
  id: "lg4_h04",
  speaker: "doctor",
  text: "他害怕，但这一次，他没有转身逃走。他在考虑，让你扶着他走进那扇门。",
  choices: [
    { id: "lg4_h04_a", text: "「你守了他四十多天，没在他面前露过怯。可『露怯』不是丢人——是你爸这辈子，第一次有机会知道，他的儿子也需要他。」", kind: "special", effect: { trust: 1, truth: 3, mood: -2 }, next: "lg_end_hidden" },
    { id: "lg4_h04_b", text: "「我们不急。你把这句话带回去，等你自己觉得能开口的那天，我们再说。」", kind: "empathy", effect: { trust: 1 }, next: "lg4_h05" },
  ],
}
```

```ts-dialog
// id: lg4_h05
{
  id: "lg4_h05",
  speaker: "patient",
  text: "（他垂下眼睛）……好。等我敢说的时候，我再跟您说。谢谢您没逼我。您说的对，有些话，得自己攒够了，才说得出口。",
  emotion: "neutral",
  autoNext: "lg_end_accept",
}
```

---

## 四、结局

```ts-dialog
// id: lg_end_cure
{
  id: "lg_end_cure",
  speaker: "narration",
  text: "〔结局 · 治愈〕",
  isEnding: true,
  endingType: "cure",
  endingTitle: "山也会怕",
  endingText: "手术很顺利。你收到刘国强的信：他说他进病房那天，还是把那句「我也怕」说了。他爸听完，沉默了半天，说了句「傻小子，怕就对了，爸也怕」。他说他当时就哭了，哭得像个孩子，可奇怪的是，哭完了，心里那根绷了四十天的弦，一下子松了。他说他现在还是不会说软话，但他学会了：接住父亲的脆弱，也允许自己害怕。他爸出院那天，是爷俩一块儿走出来的——他扶着他爸，第一次觉得，那座山，他也能扶着走一段。",
  endingReward: { doctorReputation: 8, doctorMoney: 300, doctorExp: 50, doctorSanity: 5 },
}
```

```ts-dialog
// id: lg_end_accept
{
  id: "lg_end_accept",
  speaker: "narration",
  text: "〔结局 · 接纳〕",
  isEnding: true,
  endingType: "acceptance",
  endingTitle: "他喊，我就应",
  endingText: "手术顺利。刘国强没有再约新的会谈。他每隔一段时间会来坐一会儿，跟你聊几句。他说他还是没把那句「我也怕」说出口，但他学会了在他爸喊他小名的时候，多应一声，多待一会儿。他说，他爸现在偶尔会跟他说「你别太累了」，他听着，心里又酸又暖。他说，有些话也许这辈子都说不出口了，但「他喊，我就应」这五个字，够他守着他爸，慢慢走完往后的路。",
  endingReward: { doctorReputation: 4, doctorMoney: 180, doctorExp: 35, doctorSanity: 6 },
}
```

```ts-dialog
// id: lg_end_hidden
{
  id: "lg_end_hidden",
  speaker: "narration",
  text: "〔结局 · 隐藏·他喊了我的小名〕",
  isEnding: true,
  endingType: "hidden",
  endingTitle: "他喊了我的小名",
  endingText: "你陪刘国强走进了病房。他爸看见你们进来，先是愣了愣，然后看见刘国强红着的眼睛，什么都没说，只是把那只没输液的手，从被子里伸出来，朝他摆了摆，说了句「过来，爸看看你」。刘国强走过去，在他爸床边蹲下，叫了声「爸」。他爸用那只手，拍了拍他的头。那一瞬间，你看见这个四十岁的男人，在他父亲面前，终于哭了出来。他说，他爸拍他头的时候，嘴里一直念着他小时候的名字。那不是一句「你别怕」，那比「你别怕」更重——那是他爸，第一次用他还小的时候的方式，接住已经长大的他。",
  endingReward: { doctorReputation: -10, doctorMoney: 100, doctorExp: 80, doctorSanity: -15 },
}
```

```ts-dialog
// id: lg_end_worsen
{
  id: "lg_end_worsen",
  speaker: "narration",
  text: "〔结局 · 恶化〕",
  isEnding: true,
  endingType: "worsen",
  endingTitle: "没人替他把那根弦松开",
  endingText: "刘国强没有再来。你后来从厂里传来消息：手术前那几天，他一个人把手术单签了，谁也没商量。他爸问他「孩子，怕不怕」，他说「不怕」。手术那天，他爸进了手术室，他在门口站了整整一天，一口水没喝。后来你收到他徒弟转来的一句话：他说他到现在，还是不敢跟他爸说一句软话。他说，他怕一说，他爸就知道他其实怕得要死，他这辈子，就再也硬不起来了。",
  endingReward: { doctorReputation: -8, doctorMoney: 50, doctorExp: 10, doctorSanity: -20 },
}
```

---

## 五、状态

- [x] v3 机器可解析格式（ts-meta + ts-dialog 全部就位）
- [x] trust 锚点 15→28→40→50→58；truth 0→40；碎片 1 枚 @30
- [x] 恶化入口 @trust≤40（lg3_p09_c）；隐藏结局 @trust50（lg4_fork_c）
- [x] cure 主线 40 轮（4 节拍各 10 轮）
- [x] 转换器生成 + 走线验收（`node scripts/md-to-patient.mjs docs/stories/liu_guoqiang-v3.md --walk`）
