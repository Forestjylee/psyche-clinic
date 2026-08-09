# 穆青 · v3 · 中剧本 · 5 节拍 · 70+ 轮

> 中档剧本：HR执行者道德创伤。
> 数值：trust 15→30→45→57→65→70；truth 0→70；碎片 2 枚 @25/50；恶化入口 trust≤55；隐藏结局 @65；cure 主线 70+ 轮。
> 生成：`node scripts/md-to-patient.mjs docs/stories/mu-qing-v3.md --walk`

---

## 节拍规划表

| 节拍 | 主题 | trust | truth | 阻抗 | 关键事件 | 碎片 |
|---|---|---|---|---|---|---|
| 1 | 初访·表层（失眠/喝酒/查名单） | 15→30 (+15) | 0→15 | c05 logic | c07 confront req20 | — |
| 2 | 中间层·那张脸（裁员/跳楼员工） | 30→45 (+15) | 15→25 | c05 logic | c08 confront req25 | m1 @truth25（父亲下岗名单） |
| 3 | 深层·执行者罪名（父亲「走狗」） | 45→57 (+12) | 25→40 | c05 logic | c08 confront req40 | m2 @truth50（离职面谈那一眼） |
| 4 | 根源信念·活成父亲 | 57→65 (+8) | 40→55 | c03 logic | c09 恶化入口 req≤55 | — |
| 5 | 转向+结局 | 65→70 (+5) | 55→70 | — | fork confront req45 / hidden req65 | — |

**数值口径**：trust 单调递增，empathy 与 probe 同涨 trust；轻推进 +1~+2、实质 +2~+3、纯过场 +0；logic/prescribe 失误 -8~-12。truth 只由 probe 涨（+2 轻 / +3 实质）。defense 净下降，阻抗短时 +8~+12 回落。cure 主线共情线 trust 精确累加 55（15→70）。

---

## 〇、人物档案

**姓名** 穆青，38 岁，互联网公司 HR 总监。丈夫陪同来诊——她开始喝闷酒，半夜翻去年那批裁员名单，一页一页查到天亮。

**一句话核心** 一个相信「执行命令的人没有错」的 HR——她替公司挥下裁员刀，也替父亲守了一辈子的「走狗」罪名，最后连失眠缩着背的姿势，都和父亲一模一样。

**三层真相**
- 表层（开场就说）：失眠、反复梦见那次离职面谈、白天看见同事就心慌、对工作完全麻木、喝闷酒、半夜查名单。
- 中间层（节拍 2 揭）：去年主导 300 人批量裁员，其中一位被裁员工，后来从二十七楼下来。她记得他签字时抬起头看了她一眼。
- 深层（节拍 3-4 揭）：父亲是九十年代国企车间主任，执行了下岗名单，被工友骂「走狗」一辈子抬不起头。穆青选 HR，潜意识想替父亲证明「执行者也可以堂堂正正」——结果她活成了父亲。核心信念：「我执行的是公司决策，决策不是我做的——但他的脸我每天都看见。我不是凶手，可我也不是无辜的。」

**角色三角**
- 施压者：公司决策机制（「这是公司的决定，我只是执行」）。
- 情感忽视者：丈夫（只关心她「别影响孩子」，要她「翻篇」）。
- 被守护者：那位跳楼员工的形象 + 童年父亲缩着背坐在床沿的背影。

**症状意义** 失眠和半夜查名单不是焦虑，是「守夜仪式」——她用反复确认「名单上没有我、我没有做错」来压住「我沾了血」的念头；喝酒是为了麻掉那张抬起头的脸。开场埋 → 中段被问 → 高潮意义反转：她守的不是名单，是父亲那句「执行命令的人没有错」。

**关键转折** 她意识到自己半夜缩着背坐在床沿的姿势，和父亲当年一模一样——她替父亲证明了一辈子，最后活成了他。

---

## 一、剧本元信息（ts-meta）

```ts-meta
// id: mu_qing
// tier: 中
// anchor: 15,30,45,57,65,70
// truthEnd: 70
// minCureRounds: 70
// fragments: 2
// worsenAtMost: 55
{
  id: "mu_qing",
  name: "穆青",
  title: "38 岁 HR 总监 · 丈夫陪同来诊",
  intro: "丈夫陪她来。说她半年前主导完一轮裁员后，开始喝闷酒，半夜翻那批裁员名单查到天亮。她本人坐下来第一句是：『我没病，就是睡不着。』",
  surface: "失眠、反复梦见离职面谈、白天见同事心慌、对工作麻木、喝闷酒、半夜查裁员名单。说话克制、得体，习惯用『公司的决定』『我只是执行』把自己摘干净。",
  truth: "父亲是九十年代国企车间主任，执行下岗名单，被工友骂『走狗』一辈子抬不起头。她选 HR，潜意识想替父亲证明『执行者也可以堂堂正正』——结果活成了父亲，连失眠缩着背的姿势都一样。她执行的不是自己的决定，但那张脸她每天都看见：『我不是凶手，可我也不是无辜的。』",
  palette: { primary: "#5a6b7a", secondary: "#9faab5", fog: "#3d4651", bright: "#d4c4a8" },
  baseReward: 750,
  difficulty: "普通",
  startNode: "mq1_start",
  initialState: { trust: 15, defense: 68, mood: 30, truth: 0, round: 0 },
  memoryFragments: [
    {
      id: "mu_m1",
      trigger: { truth: 25 },
      title: "缩在床沿的背影",
      text: "九几年那个冬天，我爸把一张名单折成四折塞进兜里。他是车间主任，名单上全是他带出来的工友。楼道里有人骂他走狗，骂了整整一宿。他坐在床沿，背缩得像一张揉皱的纸，一句话不说。我那年八岁，端着饭碗站在门口不敢过去。那碗饭，凉了我都没敢动。",
      emotion: "sad",
    },
    {
      id: "mu_m2",
      trigger: { truth: 50 },
      title: "抬起头的那一眼",
      text: "他坐在我对面，签完字，抬起头看了我一眼。就一眼。他说：『穆总，我家里还有个上中学的孩子。』我那会儿说：『公司会按政策给到位，您回去等通知。』他点点头，没再说话。再听到他名字，是从二十七楼下来。我每天闭上眼，看见的就是他抬起头那一眼。",
      emotion: "broken",
    },
  ],
}
```

---

## 二、节拍骨架（ts-dialog 节点）

### 节拍 1 · 初访·表层（trust 15→30，truth 0→15，阻抗 c05）

```ts-dialog
// id: mq1_start
{
  id: "mq1_start",
  speaker: "narration",
  text: "穆青比预约早到了十分钟。她一个人进的门，丈夫在楼下车里等。她穿着得体的灰西装，坐下来时把包放在腿上，双手交叠搁在包上——像一个来谈离职的高管，而不是来看病的人。",
  autoNext: "mq1_p01",
}
```

```ts-dialog
// id: mq1_p01
{
  id: "mq1_p01",
  speaker: "patient",
  text: "医生您好。我先说，我没病，就是睡不着。我爱人非让我来，说再不睡要出事。其实我没那么严重，就是……晚上有点清醒。",
  emotion: "neutral",
  autoNext: "mq1_c01",
}
```

```ts-dialog
// id: mq1_c01
{
  id: "mq1_c01",
  speaker: "doctor",
  text: "她把「没病」和「睡不着」放在同一句话里，像在替自己辩护。",
  choices: [
    { id: "mq1_c01_a", text: "「你说没病，可你提前十分钟就到了。能睡着的人，不会这么准时。」", kind: "empathy", effect: { trust: 2, defense: -1 }, next: "mq1_p02" },
    { id: "mq1_c01_b", text: "「『晚上有点清醒』——清醒到几点？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "mq1_p02" },
  ],
}
```

```ts-dialog
// id: mq1_p02
{
  id: "mq1_p02",
  speaker: "patient",
  text: "（她顿了一下）……三四点吧。也不是天天，就这几天。我爱人说我半夜不睡觉，老在客厅翻东西。其实我就是翻翻文件，看看名单，确认一下……也没什么好确认的。",
  emotion: "anxious",
  autoNext: "mq1_c02",
}
```

```ts-dialog
// id: mq1_c02
{
  id: "mq1_c02",
  speaker: "doctor",
  text: "「确认一下」——她说完又赶紧收回去了。",
  choices: [
    { id: "mq1_c02_a", text: "「半夜翻名单，确认什么？是确认别人，还是确认自己？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "mq1_p03" },
    { id: "mq1_c02_b", text: "「三四点还坐在客厅——你那阵子，心里是什么感觉？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "mq1_p03" },
  ],
}
```

```ts-dialog
// id: mq1_p03
{
  id: "mq1_p03",
  speaker: "patient",
  text: "……就是空。坐那儿也不困，也不想动，就盯着那张名单。名单上三百多个名字，我一个个看过去，看有没有……看他们现在怎么样了。其实跟我没关系了，流程都走完了。",
  emotion: "neutral",
  autoNext: "mq1_c03",
}
```

```ts-dialog
// id: mq1_c03
{
  id: "mq1_c03",
  speaker: "doctor",
  text: "「跟我没关系了」——她说这句话的时候，声音是平的，平得不正常。",
  choices: [
    { id: "mq1_c03_a", text: "「三百多个名字，你一个个看过去——这不像『没关系』，像在数着什么。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "mq1_p04" },
    { id: "mq1_c03_b", text: "「你说『空』。可空的人不会一宿一宿地翻名单。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "mq1_p04" },
  ],
}
```

```ts-dialog
// id: mq1_p04
{
  id: "mq1_p04",
  speaker: "patient",
  text: "（她低头）……我爱人嫌我喝酒。说真的我也没喝多少，就睡前一杯，能让自己别那么清醒。他不懂，他做技术的，到点就睡。他只担心我这样下去影响孩子。",
  emotion: "sad",
  autoNext: "mq1_c04",
}
```

```ts-dialog
// id: mq1_c04
{
  id: "mq1_c04",
  speaker: "doctor",
  text: "她把丈夫的担心，又转成了「影响孩子」——好像她自己怎么着不重要。",
  choices: [
    { id: "mq1_c04_a", text: "「你爱人担心你影响孩子——可他自己，不担心你吗？」", kind: "probe", effect: { trust: 2, truth: 2 }, next: "mq1_p05" },
    { id: "mq1_c04_b", text: "「你说他不懂。你希望他懂的是什么？」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "mq1_p05" },
    { id: "mq1_c04_c", text: "「睡前一杯不算什么，别有心理负担，先想办法把觉睡好。」", kind: "logic", effect: { trust: -10, defense: 8, mood: -3 }, next: "mq1_r01" },
  ],
}
```

```ts-dialog
// id: mq1_r01
{
  id: "mq1_r01",
  speaker: "patient",
  text: "（她的肩一下绷起来）……您这话，跟我爱人说的一模一样。『先把觉睡好』。您以为我没试过吗？我试过。没用。您要是只能说这个，那我今天白来了。",
  emotion: "angry",
  autoNext: "mq1_p05",
}
```

```ts-dialog
// id: mq1_p05
{
  id: "mq1_p05",
  speaker: "patient",
  text: "……对不起，我嗓门大了。我最近容易急。我也不知道我希望他懂什么。他要是问我名单上的事，我又不想说。说了他也不懂，他只会说『那是公司的决定，跟你没关系』。",
  emotion: "anxious",
  autoNext: "mq1_c05",
}
```

```ts-dialog
// id: mq1_c05
{
  id: "mq1_c05",
  speaker: "doctor",
  text: "「那是公司的决定，跟你没关系」——这句话，丈夫说过，她也说过。",
  choices: [
    { id: "mq1_c05_a", text: "「『跟你没关系』——这句话，是你爱人先说的，还是你先说的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "mq1_p06" },
    { id: "mq1_c05_b", text: "「你不想说，可你又半夜翻名单。这两件事，打架。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "mq1_p06" },
  ],
}
```

```ts-dialog
// id: mq1_p06
{
  id: "mq1_p06",
  speaker: "patient",
  text: "……打架。是打架。我白天跟自己说一百遍『跟我没关系』，晚上一闭眼，那张脸就出来。不是害怕，是……它就搁在那儿，过不去。",
  emotion: "sad",
  autoNext: "mq1_c06",
}
```

```ts-dialog
// id: mq1_c06
{
  id: "mq1_c06",
  speaker: "doctor",
  text: "「那张脸」第一次露出来了——她还不想说那是谁。",
  choices: [
    { id: "mq1_c06_a", text: "「你先不急着说是谁。那张脸出现的时候，你心里是什么滋味？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "mq1_p07" },
    { id: "mq1_c06_b", text: "「白天说一百遍没关系，晚上还是过不去——这一百遍，是说给谁听的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "mq1_p07" },
  ],
}
```

```ts-dialog
// id: mq1_p07
{
  id: "mq1_p07",
  speaker: "patient",
  text: "（她沉默了很久）……说给自己听的吧。我是执行的人，名单不是我定的，补偿方案也不是我定的。我就是那个，坐在对面，让人签字的人。我能怎么办呢，那是我的活儿。",
  emotion: "neutral",
  autoNext: "mq1_c07",
}
```

```ts-dialog
// id: mq1_c07
{
  id: "mq1_c07",
  speaker: "doctor",
  text: "「那是我的活儿」——她把自己拆成了两半：执行的那半，和半夜翻名单的那半。",
  choices: [
    { id: "mq1_c07_a", text: "「执行的人，也是人。你心里过不去，恰恰说明你没把自己变成机器。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "mq1_p08" },
    { id: "mq1_c07_b", text: "「『我能怎么办』——这句话，你是在问我，还是在问你自己？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "mq1_p08" },
    { id: "mq1_c07_c", text: "「执行者也是有责任的。你不说清楚那张脸是谁，这结打不开。」", kind: "confront", require: { trust: 20 }, effect: { trust: 1, truth: 3, mood: -2 }, next: "mq1_p08", hint: "需要信任≥20" },
  ],
}
```

```ts-dialog
// id: mq1_p08
{
  id: "mq1_p08",
  speaker: "patient",
  text: "（她攥了一下包带）……那张脸，是去年那批裁员里的一个人。我跟他谈的离职面谈。他签字的时候，抬头看了我一眼。就那一眼，我到现在都……",
  emotion: "sad",
  autoNext: "mq1_c08",
}
```

```ts-dialog
// id: mq1_c08
{
  id: "mq1_c08",
  speaker: "doctor",
  text: "她终于把「那个人」带到了桌上，但还没说后面发生了什么。",
  choices: [
    { id: "mq1_c08_a", text: "「那一眼——他看你的眼神，你读到了什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "mq1_p09" },
    { id: "mq1_c08_b", text: "「你说『到现在都』——到现在都怎样？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "mq1_p09" },
  ],
}
```

```ts-dialog
// id: mq1_p09
{
  id: "mq1_p09",
  speaker: "patient",
  text: "……到现在都忘不了。他没骂我，也没求我。就看了我一眼，点点头，签了字。我当时觉得，这人真体面。后来我才知道，他家里有个上中学的孩子。",
  emotion: "sad",
  autoNext: "mq1_c09",
}
```

```ts-dialog
// id: mq1_c09
{
  id: "mq1_c09",
  speaker: "doctor",
  text: "「后来我才知道」——她把那句话压得很轻，像怕惊动什么。",
  choices: [
    { id: "mq1_c09_a", text: "「你说『后来才知道』——后来，他怎么了？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "mq1_p10" },
    { id: "mq1_c09_b", text: "（不催她。让她自己缓一缓，再说下去。）", kind: "silence", effect: { trust: 1, mood: 2 }, next: "mq1_p10" },
  ],
}
```

```ts-dialog
// id: mq1_p10
{
  id: "mq1_p10",
  speaker: "patient",
  text: "（她的手开始抖）……他从二十七楼，下来了。我听说的时候，正在开会。我愣了一下，然后……把会开完了。医生，您别误会，我跟他不熟，就是谈过那一次。可那张脸……",
  emotion: "scared",
  autoNext: "mq1_c10",
}
```

```ts-dialog
// id: mq1_c10
{
  id: "mq1_c10",
  speaker: "doctor",
  text: "「把会开完了」——她用职业的体面，把那一刻的崩塌封了起来。",
  choices: [
    { id: "mq1_c10_a", text: "「你愣了一下，然后把会开完。那一刻，你心里有没有一闪而过的什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "mq1_p11" },
    { id: "mq1_c10_b", text: "「『跟他不熟』——你反复强调这个。是不熟，让你安心，还是让你更难受？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "mq1_p11" },
  ],
}
```

```ts-dialog
// id: mq1_p11
{
  id: "mq1_p11",
  speaker: "patient",
  text: "……难受。我跟他确实不熟，可他是从我手里接过的那张纸。他签完字，我还在心里说了一句『顺利』。您说，我是不是……是不是我那时候多说一句话，他就不会……",
  emotion: "sad",
  autoNext: "mq1_c11",
}
```

```ts-dialog
// id: mq1_c11
{
  id: "mq1_c11",
  speaker: "doctor",
  text: "她开始往自己身上揽了——「多说一句话」。但还没到核心。",
  choices: [
    { id: "mq1_c11_a", text: "「你开始想『如果当初』——这个念头，是从他出事那天起的，还是更早？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "mq1_p12" },
    { id: "mq1_c11_b", text: "「你心里那个『顺利』，现在听出来是什么滋味了？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "mq1_p12" },
  ],
}
```

```ts-dialog
// id: mq1_p12
{
  id: "mq1_p12",
  speaker: "patient",
  text: "……从那天起。白天我还能压住，一上班全是会、全是流程，我忙起来就忘了。可一回家，一安静下来，那张脸就搁在眼前。我爱人说我半夜坐在床沿，一动不动，一坐就两三个钟头。我自己都没发觉。",
  emotion: "anxious",
  autoNext: "mq1_c12",
}
```

```ts-dialog
// id: mq1_c12
{
  id: "mq1_c12",
  speaker: "doctor",
  text: "「坐在床沿，一动不动」——这是个画面，先记住它。",
  choices: [
    { id: "mq1_c12_a", text: "「半夜坐在床沿——你那时候脑子里在想什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "mq1_p13" },
    { id: "mq1_c12_b", text: "「你爱人看见了，但他没问你在想什么。是吗？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "mq1_p13" },
  ],
}
```

```ts-dialog
// id: mq1_p13
{
  id: "mq1_p13",
  speaker: "patient",
  text: "他想问，我不让问。一说这个我就烦。他后来就只说『早点睡』『别影响孩子』。其实……我也知道他是好意。可『别影响孩子』这话，听着像在说，我这件事，不值得闹这么大。",
  emotion: "neutral",
  autoNext: "mq1_c13",
}
```

```ts-dialog
// id: mq1_c13
{
  id: "mq1_c13",
  speaker: "doctor",
  text: "她卡在「不值当」和「过不去」之间——这正是她坐到这儿的原因。",
  choices: [
    { id: "mq1_c13_a", text: "「他觉得不值当，你觉得过不去——这两个人，住在一个屋里，却像隔着一层。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "mq1_p14" },
    { id: "mq1_c13_b", text: "（点到为止，今天她已经说了很多。）", kind: "silence", effect: { trust: 0, mood: 2 }, next: "mq1_p14" },
  ],
}
```

```ts-dialog
// id: mq1_p14
{
  id: "mq1_p14",
  speaker: "patient",
  text: "……是隔着一层。我也不想跟他隔着一层。医生，我今天就先到这儿吧。再说我脑子有点乱。下次……下次我再跟您说那个人，到底是怎么回事。",
  emotion: "neutral",
  autoNext: "mq1_c14",
}
```

```ts-dialog
// id: mq1_c14
{
  id: "mq1_c14",
  speaker: "doctor",
  text: "第一次会谈，她把「那张脸」带到了桌上，又轻轻盖上了。",
  choices: [
    { id: "mq1_c14_a", text: "「好。那张脸，你今天愿意让它露出来，已经是迈出去了。下次你准备好了，我们再往下看。」", kind: "empathy", effect: { trust: 0, mood: 3 }, next: "mq1_out" },
    { id: "mq1_c14_b", text: "「下次我们聊聊，那张脸背后，还有没有别的脸。」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "mq1_out" },
  ],
}
```

```ts-dialog
// id: mq1_out
{
  id: "mq1_out",
  speaker: "narration",
  text: "穆青起身时，习惯性地把包带理了理，又把椅子推回原位——动作利落得像在收尾一场离职面谈。走到门口她停了一下，没回头：「……谢谢您没催我。」",
  autoNext: "mq2_start",
}
```

### 节拍 2 · 中间层·那张脸（trust 30→45，truth 15→25，[m1 碎片@25]，关键事件 c08 req25）

```ts-dialog
// id: mq2_start
{
  id: "mq2_start",
  speaker: "narration",
  text: "一周后，穆青准时到。这回她没提前，是踩着点进来的。她说这周有两天没喝酒，但名单还是翻了。她把手机扣在包上，像怕它响。",
  autoNext: "mq2_p01",
}
```

```ts-dialog
// id: mq2_p01
{
  id: "mq2_p01",
  speaker: "patient",
  text: "这周还行，睡了两个整觉。但有一回，我又翻到他的名字。我盯着那一行看了半天，想不起来当时谈的时候，他穿的是什么颜色的衣服。我连这个都记不清，可他抬头的那个眼神，我忘不掉。",
  emotion: "neutral",
  autoNext: "mq2_c01",
}
```

```ts-dialog
// id: mq2_c01
{
  id: "mq2_c01",
  speaker: "doctor",
  text: "记不清衣服颜色，却忘不掉眼神——她在记的，不是那个人，是那一刻的亏。",
  choices: [
    { id: "mq2_c01_a", text: "「你记不清他穿什么，却记得那个眼神——你记住的，是自己的滋味，不是他。」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "mq2_p02" },
    { id: "mq2_c01_b", text: "「你怕忘了他的样子，又怕记太清。是吗？」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "mq2_p02" },
  ],
}
```

```ts-dialog
// id: mq2_p02
{
  id: "mq2_p02",
  speaker: "patient",
  text: "……是。我怕忘了，对不起他。又怕记太清，自己过不去。医生，我跟他真不熟。可那天谈的时候，他说了一句话，我一直没跟人讲过。",
  emotion: "anxious",
  autoNext: "mq2_c02",
}
```

```ts-dialog
// id: mq2_c02
{
  id: "mq2_c02",
  speaker: "doctor",
  text: "「一直没跟人讲过」——她要往里走一步了。",
  choices: [
    { id: "mq2_c02_a", text: "「你说他讲了一句话。你愿意把它说出来吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "mq2_p03" },
    { id: "mq2_c02_b", text: "（点点头，等她自己开口，不催。）", kind: "silence", effect: { trust: 1, mood: 2 }, next: "mq2_p03" },
  ],
}
```

```ts-dialog
// id: mq2_p03
{
  id: "mq2_p03",
  speaker: "patient",
  text: "他说：『穆总，我家里还有个上中学的孩子。』就这一句。我当时说：『公司会按政策给到位，您回去等通知。』他点点头，没再说话。我当时觉得我答得挺标准。现在想想……他不是在跟我谈政策。",
  emotion: "sad",
  autoNext: "mq2_c03",
}
```

```ts-dialog
// id: mq2_c03
{
  id: "mq2_c03",
  speaker: "doctor",
  text: "「他不是在跟我谈政策」——她开始听见那句话背后的人了。",
  choices: [
    { id: "mq2_c03_a", text: "「他跟你说的不是政策，是一个父亲。你当时为什么没接住？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "mq2_p04" },
    { id: "mq2_c03_b", text: "「你答得很标准——『标准』这两个字，是你那一刻的保护壳吧。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "mq2_p04" },
  ],
}
```

```ts-dialog
// id: mq2_p04
{
  id: "mq2_p04",
  speaker: "patient",
  text: "……是保护壳。我要是不按流程答，我怕我自己会软下来。软下来，那批三百人就谈不完了。我是总监，我软了，下面那几个 HR 怎么办？我只能把每一场都谈成『标准流程』。",
  emotion: "neutral",
  autoNext: "mq2_c04",
}
```

```ts-dialog
// id: mq2_c04
{
  id: "mq2_c04",
  speaker: "doctor",
  text: "「我软了，下面怎么办」——她用整个团队，把自己架在了那个位置上。",
  choices: [
    { id: "mq2_c04_a", text: "「你怕软下来——可你心里明明是软的。这份软，你藏了多久？」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "mq2_p05" },
    { id: "mq2_c04_b", text: "「三百人，你把自己变成了『标准流程』。那你自己呢？你在哪儿？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "mq2_p05" },
    { id: "mq2_c04_c", text: "「总监就是干这个的，你要是软了，那才是失职。」", kind: "logic", effect: { trust: -10, defense: 8, mood: -3 }, next: "mq2_r01" },
  ],
}
```

```ts-dialog
// id: mq2_r01
{
  id: "mq2_r01",
  speaker: "patient",
  text: "（她猛地抬头）……失职。对，您说得对，我没失职。我就是干这个的。您要这么说，我心里倒踏实了。可您不知道，踏实完，晚上那张脸还是来。踏实没用。",
  emotion: "angry",
  autoNext: "mq2_p05",
}
```

```ts-dialog
// id: mq2_p05
{
  id: "mq2_p05",
  speaker: "patient",
  text: "……您别介意我急。我就是听不得『这是你的活儿』这种话。听了我反而更堵。我承认是我的活儿，可『是我的活儿』，不等于『我没错』。这俩事，我心里一直拧着。",
  emotion: "anxious",
  autoNext: "mq2_c05",
}
```

```ts-dialog
// id: mq2_c05
{
  id: "mq2_c05",
  speaker: "doctor",
  text: "「是我的活儿」和「我没错」——她第一次把这两件事分开摆了。",
  choices: [
    { id: "mq2_c05_a", text: "「你拧着的，是『执行』和『无辜』——这俩字，你什么时候开始分不清的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "mq2_p06" },
    { id: "mq2_c05_b", text: "「你听不得『这是你的活儿』——这句话，除了我，还有谁跟你说过？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "mq2_p06" },
  ],
}
```

```ts-dialog
// id: mq2_p06
{
  id: "mq2_p06",
  speaker: "patient",
  text: "……这话我爸说过。他以前在厂里，也是干这个的。九几年那会儿，厂里分流，他就是那个宣布名单的人。我妈说，他那时候也是整宿整宿睡不着。我那会儿小，不懂。我就记得他背总是缩着的。",
  emotion: "neutral",
  autoNext: "mq2_c06",
}
```

```ts-dialog
// id: mq2_c06
{
  id: "mq2_c06",
  speaker: "doctor",
  text: "父亲第一次出来了——「也是干这个的」「也是整宿睡不着」。",
  choices: [
    { id: "mq2_c06_a", text: "「你爸也干过这个，也睡不着——你听到这话，心里是什么感觉？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "mq2_p07" },
    { id: "mq2_c06_b", text: "「你爸的背总是缩着的——你记得这个细节，说明你看过很多次。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "mq2_p07" },
  ],
}
```

```ts-dialog
// id: mq2_p07
{
  id: "mq2_p07",
  speaker: "patient",
  text: "看过。他坐在床沿，背缩着，一句话不说。楼道里有人骂他，骂得很难听。他也不还嘴，就那么坐着。我那时候想，爸你怎么不回他们啊。后来我才知道，他回不了——名单是他念的，可名单不是他定的。",
  emotion: "sad",
  autoNext: "mq2_c07",
}
```

```ts-dialog
// id: mq2_c07
{
  id: "mq2_c07",
  speaker: "doctor",
  text: "「名单是他念的，可名单不是他定的」——她替父亲辩解的话，和替自己辩解的话，一字不差。",
  choices: [
    { id: "mq2_c07_a", text: "「你替父亲说的这句话，你有没有对自己说过？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "mq2_p08" },
    { id: "mq2_c07_b", text: "「你心疼你爸缩着背的样子——可你有没有想过，你现在坐着的姿势，像谁？」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "mq2_p08" },
  ],
}
```

```ts-dialog
// id: mq2_p08
{
  id: "mq2_p08",
  speaker: "doctor",
  text: "她把父亲和自己摆到了同一张桌子上——这是个关键的时刻。",
  choices: [
    { id: "mq2_c08_a", text: "「你选 HR 这行，是因为喜欢，还是因为想替你爸证明点什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "mq2_p09" },
    { id: "mq2_c08_b", text: "（让她在这个发现里停一会儿，不急着推。）", kind: "silence", effect: { trust: 1, mood: 2 }, next: "mq2_p09" },
    { id: "mq2_c08_c", text: "「你爸挨了一辈子骂，你从小就想替他翻案——所以你选了 HR，想证明执行者也能堂堂正正？」", kind: "confront", require: { trust: 25 }, effect: { trust: 1, truth: 3, mood: -2 }, next: "mq2_p09", hint: "需要信任≥25" },
  ],
}
```

```ts-dialog
// id: mq2_p09
{
  id: "mq2_p09",
  speaker: "patient",
  text: "（她愣了很久）……我从来没这么想过。我选 HR 的时候，我以为我是喜欢跟人打交道。可您这么一说……我好像确实，从小看我爸那样，心里憋着一口气。我想证明，干这个的，不一定都得缩着背。",
  emotion: "anxious",
  autoNext: "mq2_c09",
}
```

```ts-dialog
// id: mq2_c09
{
  id: "mq2_c09",
  speaker: "doctor",
  text: "「不一定都得缩着背」——她替父亲立的一个愿，也是给自己定的规矩。",
  choices: [
    { id: "mq2_c09_a", text: "「你想证明自己不用缩背——可你现在半夜坐在床沿的姿势，你爱人怎么说？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "mq2_p10" },
    { id: "mq2_c09_b", text: "「你替父亲立的这口气，撑了你二十年。可它撑得住你吗？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "mq2_p10" },
  ],
}
```

```ts-dialog
// id: mq2_p10
{
  id: "mq2_p10",
  speaker: "patient",
  text: "……我爱人说，我半夜坐那儿，背也是缩着的。他以为我没听见，其实我听见了。我当时想，不能啊，我怎么会跟我爸一样。可我就是……坐成那样了，自己都不知道。",
  emotion: "scared",
  autoNext: "mq2_c10",
}
```

```ts-dialog
// id: mq2_c10
{
  id: "mq2_c10",
  speaker: "doctor",
  text: "「坐成那样了，自己都不知道」——身体比她先承认了。",
  choices: [
    { id: "mq2_c10_a", text: "「你的背，替你说了一句你嘴上不肯说的话。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "mq2_p11" },
    { id: "mq2_c10_b", text: "「你拼命不想活成你爸——可你越不想，就越像。这事儿，你想过为什么吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "mq2_p11" },
  ],
}
```

```ts-dialog
// id: mq2_p11
{
  id: "mq2_p11",
  speaker: "patient",
  text: "我没想过。或者说，我不敢想。我要是活成了我爸，那我替他证明的那口气，不就白憋了？可我要是没活成他，那张脸，为什么天天来找我，不来找定名单的人？",
  emotion: "anxious",
  autoNext: "mq2_c11",
}
```

```ts-dialog
// id: mq2_c11
{
  id: "mq2_c11",
  speaker: "doctor",
  text: "「不来找定名单的人」——她终于问出了一个真正的问题。",
  choices: [
    { id: "mq2_c11_a", text: "「这张脸来找你，不找别人——你觉得，它在跟你要什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "mq2_p12" },
    { id: "mq2_c11_b", text: "「你替父亲憋了口气，又替公司背了张脸——你什么时候，能替自己说句话？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "mq2_p12" },
  ],
}
```

```ts-dialog
// id: mq2_p12
{
  id: "mq2_p12",
  speaker: "patient",
  text: "……我不知道它要什么。它就来那儿，看着我。我有时候想，是不是它要我说一句『对不起』。可我说了对不起，又能怎么样呢？人回不来了。再说，我又不是凶手。",
  emotion: "neutral",
  autoNext: "mq2_c12",
}
```

```ts-dialog
// id: mq2_c12
{
  id: "mq2_c12",
  speaker: "doctor",
  text: "「我又不是凶手」——她把这句话当成了终点。可它下面还压着半句。",
  choices: [
    { id: "mq2_c12_a", text: "「你不是凶手。可你也没说自己是无辜的——对吗？」", kind: "probe", effect: { trust: 0, truth: 3 }, next: "mq2_p13" },
    { id: "mq2_c12_b", text: "（让这句话在空气里停一会儿。）", kind: "silence", effect: { trust: 0, mood: 2 }, next: "mq2_p13" },
  ],
}
```

```ts-dialog
// id: mq2_p13
{
  id: "mq2_p13",
  speaker: "patient",
  text: "（她闭了下眼）……对。我不是无辜的。可我也不是凶手。我卡在中间，医生。这就是我最难受的地方。我要是凶手，我认；我要是无辜的，我翻篇。可我两边都不是。",
  emotion: "sad",
  autoNext: "mq2_c13",
}
```

```ts-dialog
// id: mq2_c13
{
  id: "mq2_c13",
  speaker: "doctor",
  text: "「两边都不是」——她把自己卡在了凶手和无辜之间，哪边都落不下。",
  choices: [
    { id: "mq2_c13_a", text: "「两边都不是——那中间这个位置，你打算怎么待着？」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "mq2_p14" },
    { id: "mq2_c13_b", text: "「你卡着，是因为你既不肯把自己摘干净，也不敢把自己判死。这其实，是你在乎。」", kind: "empathy", effect: { trust: 0, mood: 3 }, next: "mq2_p14" },
  ],
}
```

```ts-dialog
// id: mq2_p14
{
  id: "mq2_p14",
  speaker: "patient",
  text: "……在乎。我爸也在乎。他要是不在乎，他背不会缩成那样。可他嘴上从来不说在乎，他只会说『执行命令的人没有错』。我从小听他念叨这句话，听到大。",
  emotion: "neutral",
  autoNext: "mq2_c14",
}
```

```ts-dialog
// id: mq2_c14
{
  id: "mq2_c14",
  speaker: "doctor",
  text: "「执行命令的人没有错」——父亲的那句话，从她嘴里念出来，像念一句刻在骨头里的经。",
  choices: [
    { id: "mq2_c14_a", text: "「你爸念了一辈子这句话——你信吗？」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "mq2_p15" },
    { id: "mq2_c14_b", text: "「这句话，是你爸念给他自己听的，还是念给你听的？」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "mq2_p15" },
  ],
}
```

```ts-dialog
// id: mq2_p15
{
  id: "mq2_p15",
  speaker: "patient",
  text: "……都念吧。他念给自己壮胆，也念给我听，让我别替他难受。可他念这句话的时候，眼睛是空的。我从小就觉得，这句话他自己都不信。但他除了这句话，没别的可说。",
  emotion: "sad",
  autoNext: "mq2_c15",
}
```

```ts-dialog
// id: mq2_c15
{
  id: "mq2_c15",
  speaker: "doctor",
  text: "「这句话他自己都不信」——她看穿了父亲，也快看穿自己了。",
  choices: [
    { id: "mq2_c15_a", text: "「你爸不信这句话，可他念了一辈子。你呢？你信吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "mq2_out" },
    { id: "mq2_c15_b", text: "「今天你把父亲那张脸，和那个员工的脸，放在了一起。下次，我们看看这两张脸，在你心里是不是同一张。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "mq2_out" },
  ],
}
```

```ts-dialog
// id: mq2_out
{
  id: "mq2_out",
  speaker: "narration",
  text: "穆青这次没有立刻起身。她盯着自己交叠的双手看了一会儿，轻声说：「我以前觉得，我爸是爸，我是我。这两件事，好像不是两件事了。」出门时，她的背比上次直了一些，但走到门口又习惯性地缩了回去。",
  autoNext: "mq3_start",
}
```

### 节拍 3 · 深层·执行者罪名（trust 45→57，truth 25→40，[m2 碎片@50]，关键事件 c08 req40）

```ts-dialog
// id: mq3_start
{
  id: "mq3_start",
  speaker: "narration",
  text: "又一周。穆青进来时眼睛下面有青。她说这周没翻名单，但连着三天梦见那次离职面谈——梦里那个员工签字的笔，怎么也落不下去。她把外套搭在膝上，手指无意识地搓着袖口。",
  autoNext: "mq3_p01",
}
```

```ts-dialog
// id: mq3_p01
{
  id: "mq3_p01",
  speaker: "patient",
  text: "这周没翻名单，改做梦了。梦里我又坐在那个会议室，他坐对面。他拿着笔，一直不签。我就那么等着。等我醒过来，枕头是湿的。医生，我是不是快疯了？",
  emotion: "anxious",
  autoNext: "mq3_c01",
}
```

```ts-dialog
// id: mq3_c01
{
  id: "mq3_c01",
  speaker: "doctor",
  text: "「笔落不下去」——梦把白天不敢做的事，替她做了一遍。",
  choices: [
    { id: "mq3_c01_a", text: "「不是疯。是你心里有个动作，白天没做完，晚上替你补上了。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "mq3_p02" },
    { id: "mq3_c01_b", text: "「他笔落不下去——你梦里有没有想让他别签？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "mq3_p02" },
  ],
}
```

```ts-dialog
// id: mq3_p02
{
  id: "mq3_p02",
  speaker: "patient",
  text: "……我想。我梦里甚至想伸手把那张纸抽回来。可我没动。我就坐在那儿，跟当时一模一样，看着他。醒过来我才发现，我一直在等的，不是他签字，是……是他说点别的。",
  emotion: "sad",
  autoNext: "mq3_c02",
}
```

```ts-dialog
// id: mq3_c02
{
  id: "mq3_c02",
  speaker: "doctor",
  text: "「等他说点别的」——她想让他把自己骂一顿，可他什么都没说。",
  choices: [
    { id: "mq3_c02_a", text: "你想让他骂你？骂了，是不是你就好受了？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "mq3_p03" },
    { id: "mq3_c02_b", text: "「他什么都没说，比骂你更重——你一直背着这份沉默。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "mq3_p03" },
  ],
}
```

```ts-dialog
// id: mq3_p03
{
  id: "mq3_p03",
  speaker: "patient",
  text: "他要是骂我，我反倒踏实。骂了，我就知道，错我认了，这事结了。可他没骂。他就点了点头，说『我知道了』。那种客气，比骂还狠。我现在闭上眼，全是那句『我知道了』。",
  emotion: "sad",
  autoNext: "mq3_c03",
}
```

```ts-dialog
// id: mq3_c03
{
  id: "mq3_c03",
  speaker: "doctor",
  text: "「我知道了」——三个字，比三百人的名单还沉。",
  choices: [
    { id: "mq3_c03_a", text: "「他说『我知道了』——他知道的是什么？是你，还是这个世道？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "mq3_p04" },
    { id: "mq3_c03_b", text: "「你反复念这三个字——你怕的，是这三个字，还是它背后那个认命的人？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "mq3_p04" },
  ],
}
```

```ts-dialog
// id: mq3_p04
{
  id: "mq3_p04",
  speaker: "patient",
  text: "……他认了命。他认命那一刻，我其实想跟他说，『你别认，你骂我两句，你去告，你去闹』。可我嘴上是『公司会按政策给到位』。您说，我那时候是不是已经，不是人了？",
  emotion: "scared",
  autoNext: "mq3_c04",
}
```

```ts-dialog
// id: mq3_c04
{
  id: "mq3_c04",
  speaker: "doctor",
  text: "「不是人了」——她把自己钉在了「执行机器」的位置上，又为变成机器而难受。",
  choices: [
    { id: "mq3_c04_a", text: "「你说『不是人了』——可你现在还为这件事难受。难受的，是人。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "mq3_p05" },
    { id: "mq3_c04_b", text: "（陪她停在这个难受里，不急着替她开脱。）", kind: "silence", effect: { trust: 0, mood: 2 }, next: "mq3_p05" },
  ],
}
```

```ts-dialog
// id: mq3_p05
{
  id: "mq3_p05",
  speaker: "patient",
  text: "……我爸那时候也是这么难受的吧。他那时候从厂里回来，也是一句话不说。我妈劝他，他就说『执行命令的人没有错』。我那时候小，跟着念。现在我坐在他当年的位置上，念同一句话。",
  emotion: "neutral",
  autoNext: "mq3_c05",
}
```

```ts-dialog
// id: mq3_c05
{
  id: "mq3_c05",
  speaker: "doctor",
  text: "她把父亲的话和自己的话，缝成了一句。",
  choices: [
    { id: "mq3_c05_a", text: "「你念你爸那句话，是在替他开脱，还是在替自己开脱？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "mq3_p06" },
    { id: "mq3_c05_b", text: "「你和你爸，念同一句话，坐同一个姿势——你们俩之间，有没有谁，跟谁说过一句真话？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "mq3_p06" },
  ],
}
```

```ts-dialog
// id: mq3_p06
{
  id: "mq3_p06",
  speaker: "patient",
  text: "……没有。我们家里人都不说真话。我爸不说，我妈替他瞒着，我假装看不懂。后来我长大了，我想问他一句『爸你那会儿心里苦不苦』，可话到嘴边，又咽回去了。问了他也不会答，他只会说那一句。",
  emotion: "sad",
  autoNext: "mq3_c06",
}
```

```ts-dialog
// id: mq3_c06
{
  id: "mq3_c06",
  speaker: "doctor",
  text: "「问了他也不会答」——她和父亲之间，隔着一道她不敢推的门。",
  choices: [
    { id: "mq3_c06_a", text: "「你不敢问他——是怕他答不出，还是怕他一答，你们俩都得塌？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "mq3_p07" },
    { id: "mq3_c06_b", text: "「你替他憋了这么多年。可他那份苦，你其实早就替他咽下去了，对吗？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "mq3_p07" },
  ],
}
```

```ts-dialog
// id: mq3_p07
{
  id: "mq3_p07",
  speaker: "patient",
  text: "……我咽下去了。我从小就觉得，我爸太苦了，我不能给他添乱。我考好大学，找好工作，当 HR 总监，我就是想让他抬一次头。我跟他说我升职那天，他就『嗯』了一声。就一声。可他那天晚上，背挺得特别直。",
  emotion: "neutral",
  autoNext: "mq3_c07",
}
```

```ts-dialog
// id: mq3_c07
{
  id: "mq3_c07",
  speaker: "doctor",
  text: "「背挺得特别直」——这是父亲唯一一次，让她看见他直着背。",
  choices: [
    { id: "mq3_c07_a", text: "「你升职那天，他背挺直了——你那一刻是不是觉得，值了？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "mq3_p08" },
    { id: "mq3_c07_b", text: "「你用升职，换他一次直背。可这次裁员之后，他的背，还有机会直吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "mq3_p08" },
  ],
}
```

```ts-dialog
// id: mq3_p08
{
  id: "mq3_p08",
  speaker: "doctor",
  text: "她用父亲的背，丈量自己这辈子的成败——这是个该被看见的时刻。",
  choices: [
    { id: "mq3_c08_a", text: "「你爸的背，是你这辈子最重要的一把尺子。这把尺子，量的是什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "mq3_p09" },
    { id: "mq3_c08_b", text: "（让她自己接上这段，不替她说。）", kind: "silence", effect: { trust: 1, mood: 2 }, next: "mq3_p09" },
    { id: "mq3_c08_c", text: "「你替父亲证明了一辈子——可你裁掉的那个人，也是个父亲。这两件事，你敢放在一起看吗？」", kind: "confront", require: { trust: 40 }, effect: { trust: 1, truth: 3, mood: -2 }, next: "mq3_p09", hint: "需要信任≥40" },
  ],
}
```

```ts-dialog
// id: mq3_p09
{
  id: "mq3_p09",
  speaker: "patient",
  text: "（她的手抖了一下）……您这话太狠了。他是个父亲。他签字的时候说『我家里还有个上中学的孩子』。我爸当年宣布名单，名单上也有带着孩子的工友。我爸背缩了一辈子，我……我是不是把那个孩子的爸，亲手送下去了？",
  emotion: "scared",
  autoNext: "mq3_c09",
}
```

```ts-dialog
// id: mq3_c09
{
  id: "mq3_c09",
  speaker: "doctor",
  text: "「亲手送下去了」——她第一次把「执行」说成了「送」。",
  choices: [
    { id: "mq3_c09_a", text: "「你说『亲手』——可名单不是你定的。你送了他，还是接了他？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "mq3_p10" },
    { id: "mq3_c09_b", text: "「你把他和名单上的工友放在一起了——你怕的，是不是你活成了当年骂你爸的人？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "mq3_p10" },
  ],
}
```

```ts-dialog
// id: mq3_p10
{
  id: "mq3_p10",
  speaker: "patient",
  text: "……我没骂过我爸。可楼道里那些人骂的『走狗』，我从小听到大。我那时候想，我爸才不是走狗，他是好人。现在……现在那个员工的孩子，会不会也觉得，我是个走狗？",
  emotion: "sad",
  autoNext: "mq3_c10",
}
```

```ts-dialog
// id: mq3_c10
{
  id: "mq3_c10",
  speaker: "doctor",
  text: "「走狗」——她最怕的那个词，从父亲身上，挪到了自己身上。",
  choices: [
    { id: "mq3_c10_a", text: "「你怕那个孩子叫你走狗——你爸当年，是不是也怕你这么叫他？」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "mq3_p11" },
    { id: "mq3_c10_b", text: "（让这个词停一会儿，别急着替她卸下来。）", kind: "silence", effect: { trust: 0, mood: 2 }, next: "mq3_p11" },
  ],
}
```

```ts-dialog
// id: mq3_p11
{
  id: "mq3_p11",
  speaker: "patient",
  text: "……他怕。他特别怕我嫌弃他。所以他才老念那句『执行命令的人没有错』，他是念给我听的。他怕我像别人那样看他。我没看。可我……我现在，坐到了他当年的位置上，我自己看自己，都觉得不像个好人。",
  emotion: "broken",
  autoNext: "mq3_c11",
}
```

```ts-dialog
// id: mq3_c11
{
  id: "mq3_c11",
  speaker: "doctor",
  text: "「自己看自己都不像个好人」——她把父亲的罪名，戴到了自己头上。",
  choices: [
    { id: "mq3_c11_a", text: "「你替父亲扛了『走狗』这个词，又替自己扛了一遍。这个词，到底是谁的？」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "mq3_p12" },
    { id: "mq3_c11_b", text: "「你不是走狗，你也不是无辜的。你是一个，知道自己沾了血的人。这比那两个字，重得多。」", kind: "empathy", effect: { trust: 0, mood: 3 }, next: "mq3_p12" },
  ],
}
```

```ts-dialog
// id: mq3_p12
{
  id: "mq3_p12",
  speaker: "patient",
  text: "……沾了血。是，我沾了血。可这血不是我放的，是公司放的。我只是那只手。医生，您说，一只手，要不要为自己的动作负责？我爸当年也问过自己这个吧。他没想明白，所以背缩了一辈子。",
  emotion: "sad",
  autoNext: "mq3_c12",
}
```

```ts-dialog
// id: mq3_c12
{
  id: "mq3_c12",
  speaker: "doctor",
  text: "「一只手要不要负责」——她替自己和父亲，问了同一个问题。",
  choices: [
    { id: "mq3_c12_a", text: "「手没有错——可手是你长的。你这一辈子，是要做别人的手，还是做自己的人？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "mq3_p13" },
    { id: "mq3_c12_b", text: "「你爸没想明白，背缩了一辈子。你想明白了吗？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "mq3_p13" },
  ],
}
```

```ts-dialog
// id: mq3_p13
{
  id: "mq3_p13",
  speaker: "patient",
  text: "……我没想明白。我之前以为我想明白了，我升职、我直着背、我证明给所有人看。可这次裁员一出，我那个直背，一夜就塌了。原来我没证明什么，我只是把那句『执行命令的人没有错』，从我爸嘴里，搬到了我自己嘴里。",
  emotion: "anxious",
  autoNext: "mq3_c13",
}
```

```ts-dialog
// id: mq3_c13
{
  id: "mq3_c13",
  speaker: "doctor",
  text: "「把那句话搬到自己嘴里」——她看清了自己这些年到底在做什么。",
  choices: [
    { id: "mq3_c13_a", text: "（这是个重要的看清。陪她停在这里。）", kind: "silence", effect: { trust: 0, mood: 2 }, next: "mq3_p14" },
    { id: "mq3_c13_b", text: "「你搬了这句话，也搬了这个姿势。你替你爸活了一遍——可你的下半辈子，还替他活吗？」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "mq3_p14" },
  ],
}
```

```ts-dialog
// id: mq3_p14
{
  id: "mq3_p14",
  speaker: "patient",
  text: "……我不知道。我只知道，我不想再半夜坐在床沿了。可我一闭眼，那张脸就来。它不让我睡。它好像在说，你别想翻篇。",
  emotion: "scared",
  autoNext: "mq3_c14",
}
```

```ts-dialog
// id: mq3_c14
{
  id: "mq3_c14",
  speaker: "doctor",
  text: "「它不让我翻篇」——她以为那张脸在惩罚她。",
  choices: [
    { id: "mq3_c14_a", text: "「它不让你翻篇——是它不放你，还是你不肯放自己？」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "mq3_p15" },
    { id: "mq3_c14_b", text: "（让她自己感受这句话的分量。）", kind: "silence", effect: { trust: 0, mood: 2 }, next: "mq3_p15" },
  ],
}
```

```ts-dialog
// id: mq3_p15
{
  id: "mq3_p15",
  speaker: "patient",
  text: "（她沉默了很久，眼眶红了）……是我不肯放自己。我要是放了，我就成了我嘴里那种『翻篇』的人。我爱人就翻得很快。我不要做他那样的人。可我这样卡着，又活不下去。医生，我到底该怎么办？",
  emotion: "sad",
  autoNext: "mq3_c15",
}
```

```ts-dialog
// id: mq3_c15
{
  id: "mq3_c15",
  speaker: "doctor",
  text: "她终于在问「怎么办」了——卡在「翻篇」和「活不下去」之间，她需要一个不是这俩的出口。",
  choices: [
    { id: "mq3_c15_a", text: "「翻篇不是忘掉，是带着它往前走。这两件事，你一直当成一件了。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "mq3_out" },
    { id: "mq3_c15_b", text: "「你不肯翻篇，是因为你怕对不起那张脸。可你这样熬垮自己，那张脸就有人对得起了吗？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "mq3_out" },
  ],
}
```

```ts-dialog
// id: mq3_out
{
  id: "mq3_out",
  speaker: "narration",
  text: "第三次会谈结束，穆青没有立刻走。她低头看着自己的手，轻声说：「我以前以为，我是替我爸活。现在才觉得，我把他没走完的路，原封不动走了一遍。」这次出门，她在门口深吸了一口气，背没有再缩。",
  autoNext: "mq4_start",
}
```

### 节拍 4 · 根源信念·活成父亲（trust 57→65，truth 40→55，阻抗 c03，恶化入口 c09 req≤55）

```ts-dialog
// id: mq4_start
{
  id: "mq4_start",
  speaker: "narration",
  text: "穆青这次带了一样东西——一张折成四折的纸，攥在手里攥得发皱。她说这是上次会谈回去后，从抽屉深处翻出来的。她把纸放在膝上，没有展开。",
  autoNext: "mq4_p01",
}
```

```ts-dialog
// id: mq4_p01
{
  id: "mq4_p01",
  speaker: "patient",
  text: "我回去翻了翻旧东西，找到这个。这是我爸当年那张名单的底稿，他留着的。我都忘了家里还有这个。我看着它，手一直在抖。我忽然明白，我半夜翻的，不是去年的名单，是这个。",
  emotion: "scared",
  autoNext: "mq4_c01",
}
```

```ts-dialog
// id: mq4_c01
{
  id: "mq4_c01",
  speaker: "doctor",
  text: "「翻的不是去年的名单，是这个」——她把两张名单，叠在了一起。",
  choices: [
    { id: "mq4_c01_a", text: "「你半夜翻的，是父亲那张名单——你能不能跟我说说，那上面是什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "mq4_p02" },
    { id: "mq4_c01_b", text: "「你攥着它发抖——你怕这张纸，还是怕它让你看见自己？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "mq4_p02" },
  ],
}
```

```ts-dialog
// id: mq4_p02
{
  id: "mq4_p02",
  speaker: "patient",
  text: "上面是我爸亲笔写的名字，一个一个。有几个名字旁边还画了圈，我妈说那是他最熟的工友。他画圈的时候，手也是抖的吧。我看着这些圈，忽然觉得，我去年那张名单上的名字，也是一个个画着圈的人。",
  emotion: "sad",
  autoNext: "mq4_c02",
}
```

```ts-dialog
// id: mq4_c02
{
  id: "mq4_c02",
  speaker: "doctor",
  text: "「一个个画着圈的人」——她终于看见名单上的字，是人。",
  choices: [
    { id: "mq4_c02_a", text: "「你父亲画圈，你也画圈——你们俩手里的笔，是一样的重。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "mq4_p03" },
    { id: "mq4_c02_b", text: "「你以前说『跟我没关系』。现在呢？这些圈里的人，跟你有关系吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "mq4_p03" },
  ],
}
```

```ts-dialog
// id: mq4_p03
{
  id: "mq4_p03",
  speaker: "patient",
  text: "……有关系。我以前嘴硬，说没关系。可我半夜睡不着，就是因为我心里清楚，有关系。那张脸，那些圈，都是我亲手画的。我躲不掉这个『亲手』。",
  emotion: "neutral",
  autoNext: "mq4_c03",
}
```

```ts-dialog
// id: mq4_c03
{
  id: "mq4_c03",
  speaker: "doctor",
  text: "她不躲了——但这里有个坎，有的人会绕进「我全错了」的另一个坑。",
  choices: [
    { id: "mq4_c03_a", text: "「你认了这个『亲手』——可认了，不等于你一个人背下整条链子的错。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "mq4_p04" },
    { id: "mq4_c03_b", text: "（让她在这个『认』里停一下，别急着往下推。）", kind: "silence", effect: { trust: 0, mood: 2 }, next: "mq4_p04" },
    { id: "mq4_c03_c", text: "「既然躲不掉，那就彻底认下来——你裁掉他，就是你害了他，别再找『公司的决定』当挡箭牌了。」", kind: "logic", effect: { trust: -12, defense: 10, mood: -4 }, next: "mq4_r01" },
  ],
}
```

```ts-dialog
// id: mq4_r01
{
  id: "mq4_r01",
  speaker: "patient",
  text: "（她猛地抬头，眼里有火）……您也这么说？您也说我害了他？好，我害了他，行了吧？那定名单的人呢？拍板的人呢？他们不害，就我一个执行的害？您这跟楼道里骂我爸的人，有什么两样？",
  emotion: "angry",
  autoNext: "mq4_p04",
}
```

```ts-dialog
// id: mq4_p04
{
  id: "mq4_p04",
  speaker: "patient",
  text: "……对不起，我又急了。我不是冲您。我是冲我自己。我心里一边说『是我害的』，一边说『不是我的错』。这两句话天天打架。我快被它们撕开了。",
  emotion: "anxious",
  autoNext: "mq4_c04",
}
```

```ts-dialog
// id: mq4_c04
{
  id: "mq4_c04",
  speaker: "doctor",
  text: "「是我害的」和「不是我的错」——这两句话，她以为必须选一句。",
  choices: [
    { id: "mq4_c04_a", text: "「这两句话，你非得选一句吗？」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "mq4_p05" },
    { id: "mq4_c04_b", text: "（不替她选。让她自己看这两句话能不能同时是真的。）", kind: "silence", effect: { trust: 0, mood: 2 }, next: "mq4_p05" },
  ],
}
```

```ts-dialog
// id: mq4_p05
{
  id: "mq4_p05",
  speaker: "patient",
  text: "……我非得选一句。要不我睡不着。可我选哪句，都不对。选『我害的』，我扛不起三百人；选『不是我的错』，我对不起那张脸。我爸选了一辈子后一句，他睡得着吗？他也没睡着过。",
  emotion: "sad",
  autoNext: "mq4_c05",
}
```

```ts-dialog
// id: mq4_c05
{
  id: "mq4_c05",
  speaker: "doctor",
  text: "「他选了后一句，他也没睡着」——她发现那句话救不了任何人。",
  choices: [
    { id: "mq4_c05_a", text: "「你爸选了那句话，背缩了一辈子。你还要替他选下去吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "mq4_p06" },
    { id: "mq4_c05_b", text: "「那句话救不了你爸，也救不了你。你俩都醒了，都不肯睡——这不是巧合。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "mq4_p06" },
  ],
}
```

```ts-dialog
// id: mq4_p06
{
  id: "mq4_p06",
  speaker: "patient",
  text: "……不是巧合。我活成了他。我以前死活不肯认这句话。今天我把它摆出来了。医生，我活成了我爸，连失眠的姿势都一样。我替他证明了一辈子，最后证明的是，他没走通的路，我也走不通。",
  emotion: "broken",
  autoNext: "mq4_c06",
}
```

```ts-dialog
// id: mq4_c06
{
  id: "mq4_c06",
  speaker: "doctor",
  text: "「他没走通的路，我也走不通」——这是她最深的一句话，也是最危险的一句。",
  choices: [
    { id: "mq4_c06_a", text: "「你爸没走通，不等于你走不通。你比他多一样东西——你看见了他在走，他没看见自己。」", kind: "empathy", effect: { trust: 0, mood: 3 }, next: "mq4_p07" },
    { id: "mq4_c06_b", text: "「你说『也走不通』——你是在判自己，还是在替他认命？」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "mq4_p07" },
  ],
}
```

```ts-dialog
// id: mq4_p07
{
  id: "mq4_p07",
  speaker: "patient",
  text: "……我是在替他认命。我从小看他认命，我就跟着认。我升职、我直背，那都不算不认命，那只是换了个姿势认。我心里那根弦，跟我爸是一根。他断了，我也就快断了。",
  emotion: "scared",
  autoNext: "mq4_c07",
}
```

```ts-dialog
// id: mq4_c07
{
  id: "mq4_c07",
  speaker: "doctor",
  text: "「他断了，我也就快断了」——这话里有很重的味道，得接住。",
  choices: [
    { id: "mq4_c07_a", text: "「你说『快断了』——你最近，有没有想过，不活了？」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "mq4_p08" },
    { id: "mq4_c07_b", text: "（认真地接住这句话，不要轻飘飘带过。）", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "mq4_p08" },
  ],
}
```

```ts-dialog
// id: mq4_p08
{
  id: "mq4_p08",
  speaker: "patient",
  text: "……没敢想。可我有时候站在阳台上，会想，他从二十七楼下来的时候，心里想的是什么。我是不是也会有一天……医生，我不会的。我还有孩子。我就是……太累了，那张脸不让我歇。",
  emotion: "scared",
  autoNext: "mq4_c08",
}
```

```ts-dialog
// id: mq4_c08
{
  id: "mq4_c08",
  speaker: "doctor",
  text: "她说「不会的」，又说了「太累了」——这两件事要分开接。",
  choices: [
    { id: "mq4_c08_a", text: "「你愿意为了孩子撑着，这已经是撑着的理由。可『撑着』不等于一个人扛。你爱人知道你站阳台的事吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "mq4_p09" },
    { id: "mq4_c08_b", text: "「你不会的——这句话，我相信你。可你太累了，也得有个地方搁。这儿就是搁的地方。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "mq4_p09" },
  ],
}
```

```ts-dialog
// id: mq4_p09
{
  id: "mq4_p09",
  speaker: "doctor",
  text: "走到这里，有一条岔路。她要么往「我这样的人没救」的坑里滑，要么开始找一条带血往前走的路。",
  choices: [
    { id: "mq4_c09_a", text: "「那张脸不让你歇——可它真在罚你吗？还是你借它，罚自己？」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "mq4_p10" },
    { id: "mq4_c09_b", text: "「你怕对不起它，所以不肯歇。可你垮了，它就真的没人记得了。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "mq4_p10" },
    { id: "mq4_c09_c", text: "「说白了，你这就是自找的。公司给你发工资，你拿了钱又来装愧疚，何必呢，翻篇吧。」", kind: "logic", require: { trustAtMost: 55 }, effect: { trust: -10, defense: 8, mood: -4 }, next: "mq4_w01", hint: "仅信任≤55 时可见" },
  ],
}
```

```ts-dialog
// id: mq4_p10
{
  id: "mq4_p10",
  speaker: "patient",
  text: "……您说得对，我借它罚自己。我要是不罚，我怕我就真的成了那种翻篇的人。我爱人翻得快，我看着他翻，心里更慌。我不要做他那样的人。可我也不想再做我爸那样的人。我夹在中间，没路了。",
  emotion: "sad",
  autoNext: "mq4_c10",
}
```

```ts-dialog
// id: mq4_c10
{
  id: "mq4_c10",
  speaker: "doctor",
  text: "「翻篇的人」和「缩背的人」——她以为世上只有这两种。",
  choices: [
    { id: "mq4_c10_a", text: "「你爸是一种，你爱人是一种。可你是第三种——你愿意背着血，还往前走的人。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "mq4_p11" },
    { id: "mq4_c10_b", text: "「你不想做他，也不想做你爸——那你愿不愿意，做一次你自己？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "mq4_p11" },
  ],
}
```

```ts-dialog
// id: mq4_p11
{
  id: "mq4_p11",
  speaker: "patient",
  text: "……我自己。我都不知道『我自己』长什么样。我从小心里的尺子是我爸，后来是公司，是流程，是三百人的名单。我什么时候为自己拿过主意？我连失眠，都是照着他的姿势来的。",
  emotion: "neutral",
  autoNext: "mq4_c11",
}
```

```ts-dialog
// id: mq4_c11
{
  id: "mq4_c11",
  speaker: "doctor",
  text: "「连失眠都是照着他的姿势」——她看清了，但还没找到自己的姿势。",
  choices: [
    { id: "mq4_c11_a", text: "（不急着给她答案。让她先把这句话听进自己耳朵里。）", kind: "silence", effect: { trust: 0, mood: 2 }, next: "mq4_p12" },
    { id: "mq4_c11_b", text: "「你不知道自己长什么样——那下次失眠的时候，试试不坐床沿，坐别的地方。看你会不会听见自己。」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "mq4_p12" },
  ],
}
```

```ts-dialog
// id: mq4_p12
{
  id: "mq4_p12",
  speaker: "patient",
  text: "……试试不坐床沿。好。我这周试试。其实我昨晚试了一下，我没坐床沿，我坐到客厅沙发上。我爱人出来问怎么了，我破天荒跟他说了一句『我难受』。他愣了半天，给我倒了杯水。",
  emotion: "neutral",
  autoNext: "mq4_c12",
}
```

```ts-dialog
// id: mq4_c12
{
  id: "mq4_c12",
  speaker: "doctor",
  text: "「我难受」——这是她第一次，没说「公司的决定」，说的是自己。",
  choices: [
    { id: "mq4_c12_a", text: "「你跟他说了『我难受』——他给你倒了杯水。这杯水，比『别影响孩子』暖，对吗？」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "mq4_p13" },
    { id: "mq4_c12_b", text: "（这是个开始。让她记住这一刻。）", kind: "silence", effect: { trust: 0, mood: 2 }, next: "mq4_p13" },
  ],
}
```

```ts-dialog
// id:mq4_p13
{
  id: "mq4_p13",
  speaker: "patient",
  text: "……暖。他其实不是不疼我，他是不懂怎么疼。他以为我翻篇就好了，他不知道我不要翻篇。我跟他说了『我难受』，他没劝我，就坐我旁边。那一刻，那张脸没那么重了。",
  emotion: "calm",
  autoNext: "mq4_c13",
}
```

```ts-dialog
// id: mq4_c13
{
  id: "mq4_c13",
  speaker: "doctor",
  text: "「那张脸没那么重了」——第一次，那张脸松了一点。",
  choices: [
    { id: "mq4_c13_a", text: "「你没翻篇，你只是让人坐到了你旁边。那张脸就轻了——它要的，或许就是这个。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "mq4_p14" },
    { id: "mq4_c13_b", text: "「你说『我难受』那一刻，你不是你爸，也不是那只手。你是你自己。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "mq4_p14" },
  ],
}
```

```ts-dialog
// id: mq4_p14
{
  id: "mq4_p14",
  speaker: "patient",
  text: "……是我自己。医生，我想下次，把我爸那张名单也带来。我想跟您，也跟我自己，好好看看它。我躲了它三十年了。这次，我不躲了。",
  emotion: "neutral",
  autoNext: "mq4_c14",
}
```

```ts-dialog
// id: mq4_c14
{
  id: "mq4_c14",
  speaker: "doctor",
  text: "她主动要带那张名单来了——这是她第一次，不躲。",
  choices: [
    { id: "mq4_c14_a", text: "「好。下次我们一起看。你不躲，那张名单就只是纸，不是债了。」", kind: "empathy", effect: { trust: 0, mood: 3 }, next: "mq4_out" },
    { id: "mq4_c14_b", text: "「你躲了三十年——这一句『不躲了』，是你替自己说的第一句话。」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "mq4_out" },
  ],
}
```

```ts-dialog
// id: mq4_out
{
  id: "mq4_out",
  speaker: "narration",
  text: "穆青把那张折成四折的纸，重新塞回包里。这次她没有攥紧，而是轻轻放进去。出门时，她在门口停了一下，回头说：「医生，我今晚，不坐床沿了。」",
  autoNext: "mq5_start",
}
```

### 节拍 5 · 转向+结局（trust 65→70，truth 55→70，fork confront req45 / hidden req65）

```ts-dialog
// id: mq5_start
{
  id: "mq5_start",
  speaker: "narration",
  text: "最后一次会谈。穆青带来了两样东西：父亲那张名单底稿，和一个新买的笔记本。笔记本第一页，她写了几个字——「我执行的不是我定的，但我的手是我的」。她把两样东西并排摆在腿上。",
  autoNext: "mq5_p01",
}
```

```ts-dialog
// id: mq5_p01
{
  id: "mq5_p01",
  speaker: "patient",
  text: "这周我做了件事。我给我爸打了个电话。我没问他那张名单，我就问了一句『爸你那会儿，睡得着吗』。他沉默了好久，说『睡不着』。这是他第一次，没跟我说『执行命令的人没有错』。",
  emotion: "calm",
  autoNext: "mq5_fork",
}
```

```ts-dialog
// id: mq5_fork
{
  id: "mq5_fork",
  speaker: "doctor",
  text: "她父亲第一次没念那句话——这是她整场最大的松动。走到这里，她需要选一条路往下走。",
  choices: [
    { id: "mq5_fork_a", text: "「我们来搭一张安全网：你半夜扛不住时能找的人、能做的事、能写下来的话。让你不再一个人坐在床沿。」", kind: "special", effect: { trust: 1, mood: 2 }, next: "mq5_s01" },
    { id: "mq5_fork_b", text: "「你爸第一次没念那句话——你能接受这份松动，慢慢带着它走，也是一种答案。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "mq5_a01" },
    { id: "mq5_fork_c", text: "「你不是凶手，可你也不是无辜的——这句话，你敢对那个孩子的家，说一次吗？」", kind: "confront", require: { trust: 65 }, effect: { trust: 0, truth: 3, mood: -3 }, next: "mq5_h01", hint: "需要信任≥65" },
  ],
}
```

#### 安全网路径（cure 主线）

```ts-dialog
// id: mq5_s01
{
  id: "mq5_s01",
  speaker: "patient",
  text: "（她看着那张空白的安全网）……扛不住时能找的人。我以前觉得，找人是给底下那几个 HR 看的笑话。我是总监，我得扛着。可这次，我扛不住了，我连自己都骗不下去了。",
  emotion: "neutral",
  autoNext: "mq5_s02",
}
```

```ts-dialog
// id: mq5_s02
{
  id: "mq5_s02",
  speaker: "doctor",
  text: "「总监得扛着」——她把头衔当成了不能求救的理由。",
  choices: [
    { id: "mq5_s02_a", text: "「总监是你的活儿，不是你的命。活儿可以换，命只有一条。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "mq5_s03" },
    { id: "mq5_s02_b", text: "「你怕底下人笑话——可你扛到半夜坐床沿，他们看见了吗？真正扛不住的，从来没人看见。」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "mq5_s03" },
  ],
}
```

```ts-dialog
// id: mq5_s03
{
  id: "mq5_s03",
  speaker: "patient",
  text: "……没人看见。我爱人看见的也只是我坐在那儿。他不知道我脑子里是那张脸。好，我写。我写『半夜想坐床沿的时候，叫醒他，跟他说我难受』。这条，行吗？",
  emotion: "calm",
  autoNext: "mq5_s04",
}
```

```ts-dialog
// id: mq5_s04
{
  id: "mq5_s04",
  speaker: "doctor",
  text: "她写下了第一条——不是「别想了」，是「叫醒他」。",
  choices: [
    { id: "mq5_s04_a", text: "「行。叫醒他，比独自坐到天亮，难得多，也管用得多。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "mq5_s05" },
    { id: "mq5_s04_b", text: "（让她继续写，不催。）", kind: "silence", effect: { trust: 0, mood: 2 }, next: "mq5_s05" },
  ],
}
```

```ts-dialog
// id: mq5_s05
{
  id: "mq5_s05",
  speaker: "patient",
  text: "（她写着写着，停了笔）……医生，我还想写一条，但不知道该不该。我想写，找个机会，去那个员工的家门口，站一会儿。不求什么，就站一会儿。我是不是疯了？",
  emotion: "anxious",
  autoNext: "mq5_s06",
}
```

```ts-dialog
// id: mq5_s06
{
  id: "mq5_s06",
  speaker: "doctor",
  text: "「去他家门口站一会儿」——这不是疯了，是她想给那张脸一个交代。",
  choices: [
    { id: "mq5_s06_a", text: "「你没疯。你想去的，不是他家门口，是想让那张脸，落地。」", kind: "empathy", effect: { trust: 0, mood: 3 }, next: "mq5_s07" },
    { id: "mq5_s06_b", text: "「站一会儿，是想认这个人，不是认罪。这两件事，你想清楚了吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "mq5_s07" },
  ],
}
```

```ts-dialog
// id: mq5_s07
{
  id: "mq5_s07",
  speaker: "patient",
  text: "……认人，不是认罪。对。我不想认罪，我没资格认罪——认罪是把锅揽自己身上，那是偷懒。我想认的是，他这个人，从我这儿接过那张纸，他是个有名有姓有孩子的人。我以前没认过他，我只认那张名单。",
  emotion: "neutral",
  autoNext: "mq5_s08",
}
```

```ts-dialog
// id: mq5_s08
{
  id: "mq5_s08",
  speaker: "doctor",
  text: "「认人，不是认罪」——她把那条一直拧着的线，终于分开了。",
  choices: [
    { id: "mq5_s08_a", text: "「你分清了执行和认人——这一刀，你替自己也替你爸，切下去了。」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "mq5_s09" },
    { id: "mq5_s08_b", text: "（让她把这个分清，稳稳地接住。）", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "mq5_s09" },
  ],
}
```

```ts-dialog
// id: mq5_s09
{
  id: "mq5_s09",
  speaker: "patient",
  text: "……我爸那句话『执行命令的人没有错』，我以后不念了。不是因为它错，是因为它只说了一半。它没说的那半句是——『可你经手的人，你得认』。我爸没认，所以他背缩了一辈子。我认。",
  emotion: "calm",
  autoNext: "mq5_s10",
}
```

```ts-dialog
// id: mq5_s10
{
  id: "mq5_s10",
  speaker: "doctor",
  text: "「可你经手的人，你得认」——她替父亲，把那半句话补上了。",
  choices: [
    { id: "mq5_s10_a", text: "「你补上的这半句，救的是你，也是你爸没说出口的那半生。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "mq5_s11" },
    { id: "mq5_s10_b", text: "（不急。让她把这句话，写进那个笔记本。）", kind: "silence", effect: { trust: 0, mood: 2 }, next: "mq5_s11" },
  ],
}
```

```ts-dialog
// id: mq5_s11
{
  id: "mq5_s11",
  speaker: "patient",
  text: "（她把那半句写了下来）……医生，我昨晚睡了五个钟头，整觉。没做梦。我爱人说我没打呼噜，但他看我睡得安稳，他自己反倒失眠了，高兴得失眠。我第一次觉得，睡得着，不是对不起谁。",
  emotion: "happy",
  autoNext: "mq5_s12",
}
```

```ts-dialog
// id: mq5_s12
{
  id: "mq5_s12",
  speaker: "doctor",
  text: "「睡得着不是对不起谁」——她放下了「用失眠赎罪」这个老规矩。",
  choices: [
    { id: "mq5_s12_a", text: "「你用失眠罚了自己半年。现在你允许自己睡——这是你给那张脸，也是给你爸，最好的交代。」", kind: "empathy", effect: { trust: 0, mood: 3 }, next: "mq5_s15" },
    { id: "mq5_s12_b", text: "（让她把这个『允许』，多停一会儿。）", kind: "silence", effect: { trust: 0, mood: 2 }, next: "mq5_s15" },
  ],
}
```

```ts-dialog
// id: mq5_s15
{
  id: "mq5_s15",
  speaker: "patient",
  text: "（她又翻了一页笔记本）……医生，我还想写几条。第二条：『名单想翻的时候，先去倒杯水，坐客厅，别进卧室。』我以前一进卧室就坐床沿，一坐就到天亮。",
  emotion: "neutral",
  autoNext: "mq5_s16",
}
```

```ts-dialog
// id: mq5_s16
{
  id: "mq5_s16",
  speaker: "doctor",
  text: "「别进卧室」——她给那个老姿势，设了一道门。",
  choices: [
    { id: "mq5_s16_a", text: "「你给自己换了个地方——床沿换到客厅。位置换了，那个姿势就断了。」", kind: "empathy", effect: { trust: 0, mood: 3 }, next: "mq5_s17" },
    { id: "mq5_s16_b", text: "「别进卧室——你怕的是那张床沿，还是床沿上那个缩背的自己？」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "mq5_s17" },
  ],
}
```

```ts-dialog
// id: mq5_s17
{
  id: "mq5_s17",
  speaker: "patient",
  text: "……怕那个缩背的自己。我一坐上去，就跟我爸一个姿势，那一刻我就不是我，是我爸。我得让自己别坐上去。",
  emotion: "scared",
  autoNext: "mq5_s18",
}
```

```ts-dialog
// id: mq5_s18
{
  id: "mq5_s18",
  speaker: "doctor",
  text: "她把「自己」和「父亲」分开了——这是她这半年最难的一刀。",
  choices: [
    { id: "mq5_s18_a", text: "「你分清了自己和父亲——这一刀，切得不容易。」", kind: "empathy", effect: { trust: 0, mood: 3 }, next: "mq5_s19" },
    { id: "mq5_s18_b", text: "（让她在这个分清里停一下，不催。）", kind: "silence", effect: { trust: 0, mood: 2 }, next: "mq5_s19" },
  ],
}
```

```ts-dialog
// id: mq5_s19
{
  id: "mq5_s19",
  speaker: "patient",
  text: "（她又写了一条）……第三条：『跟底下几个 HR 说，我有时候也扛不住。』我以前死撑着，怕他们慌。可他们也是人，他们谈完离职面谈，回去也会失眠。",
  emotion: "neutral",
  autoNext: "mq5_s20",
}
```

```ts-dialog
// id: mq5_s20
{
  id: "mq5_s20",
  speaker: "doctor",
  text: "「跟底下人说扛不住」——她要把「总监」这层壳，也松一松。",
  choices: [
    { id: "mq5_s20_a", text: "「你让底下人看见你的难——这不是示弱，是把他们也当人。」", kind: "empathy", effect: { trust: 0, mood: 3 }, next: "mq5_s21" },
    { id: "mq5_s20_b", text: "「你怕他们慌——可你扛到半夜坐床沿，他们看见了吗？谁在替你扛？」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "mq5_s21" },
  ],
}
```

```ts-dialog
// id: mq5_s21
{
  id: "mq5_s21",
  speaker: "patient",
  text: "……没谁替我扛。我扛得太体面了，体面到没人知道我垮了。医生，我想试着，不那么体面地活一阵子。",
  emotion: "calm",
  autoNext: "mq5_s22",
}
```

```ts-dialog
// id: mq5_s22
{
  id: "mq5_s22",
  speaker: "doctor",
  text: "「不那么体面地活」——这是她给自己松的第一个绑。",
  choices: [
    { id: "mq5_s22_a", text: "「体面是给别人看的，不用扛着它过夜。」", kind: "empathy", effect: { trust: 0, mood: 3 }, next: "mq5_s13" },
    { id: "mq5_s22_b", text: "（让她把这一条也写下来，不催。）", kind: "silence", effect: { trust: 0, mood: 2 }, next: "mq5_s13" },
  ],
}
```

```ts-dialog
// id: mq5_s13
{
  id: "mq5_s13",
  speaker: "patient",
  text: "……我想找个时间带我爸出来走走。不谈名单，就走走。他这辈子背缩着，我想让他看看，直着背走路是什么样。我也想让他看看，他闺女直着背，是什么样。不是替他证明，是替我自己，站一会儿。",
  emotion: "calm",
  autoNext: "mq5_s14",
}
```

```ts-dialog
// id: mq5_s14
{
  id: "mq5_s14",
  speaker: "doctor",
  text: "「不是替他证明，是替自己站一会儿」——她终于找到了自己的姿势。",
  choices: [
    { id: "mq5_s14_a", text: "「这张安全网你带回去。那张脸再来，你知道往哪儿搁，也知道该叫醒谁。你不是一个人坐在床沿了。」", kind: "empathy", effect: { trust: 0, mood: 3 }, next: "mq_end_cure" },
    { id: "mq5_s14_b", text: "「你替自己站了一会儿——这一会儿，是你这半年，最直的一刻。」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "mq_end_cure" },
  ],
}
```

#### 接纳路径（acceptance）

```ts-dialog
// id: mq5_a01
{
  id: "mq5_a01",
  speaker: "patient",
  text: "……松动。我也没指望一下子全好。那张脸还在，它可能一辈子都在。我只是，不想再跟它死磕了。它来，我让它坐一会儿；它走，我不追。",
  emotion: "neutral",
  autoNext: "mq5_a02",
}
```

```ts-dialog
// id: mq5_a02
{
  id: "mq5_a02",
  speaker: "doctor",
  text: "她没选「战胜」，选了「共处」——这也是往前。",
  choices: [
    { id: "mq5_a02_a", text: "「让它坐一会儿，你来当家——钥匙在你手里，不在它手里。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "mq5_a03" },
    { id: "mq5_a02_b", text: "「它来的时候，你心里那句话，还念吗？」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "mq5_a03" },
  ],
}
```

```ts-dialog
// id: mq5_a03
{
  id: "mq5_a03",
  speaker: "patient",
  text: "……不念了。我换了一句——『我经手过他，我记得他』。就这一句。它来，我跟它说这一句，然后该干嘛干嘛。我爱人说我这周脸色好多了，其实就是，我不跟自己较劲了。",
  emotion: "calm",
  autoNext: "mq_end_accept",
}
```

#### 隐藏路径（hidden · 强制介入）

```ts-dialog
// id: mq5_h01
{
  id: "mq5_h01",
  speaker: "patient",
  text: "（她的手抖了一下，纸从膝上滑下去）……您是让我，去找他家？医生，我怕。我怕他们不让我进门，我怕一开门看见那个上中学的孩子。可我心里，一直想站到那个门口去。",
  emotion: "scared",
  autoNext: "mq5_h02",
}
```

```ts-dialog
// id: mq5_h02
{
  id: "mq5_h02",
  speaker: "doctor",
  text: "她想站到那个门口——这不是认罪，是认人。但这件事，不该她一个人扛。",
  choices: [
    { id: "mq5_h02_a", text: "「我陪你一起想这件事怎么做。不是认罪，是把那张脸，还回它该在的地方。你不是一个人去。」", kind: "special", effect: { trust: 0, mood: -2 }, next: "mq5_h03" },
    { id: "mq5_h02_b", text: "「你怕那个孩子——可你不去，那个孩子也一直在等你这句话。我们慢慢来。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "mq5_h04" },
  ],
}
```

```ts-dialog
// id: mq5_h03
{
  id: "mq5_h03",
  speaker: "patient",
  text: "（她闭上眼，半晌才开口）……好。我不求他们原谅，我没资格求。我就想站在门口，跟那个孩子，或者说跟那个家，说一句——『我记得他，他不是名单上一行字，他是个人』。说完，我就走。我不要他们原谅，我要他们知道，有人认过他。",
  emotion: "broken",
  autoNext: "mq_end_hidden",
}
```

```ts-dialog
// id: mq5_h04
{
  id: "mq5_h04",
  speaker: "patient",
  text: "……慢慢来。好。我还没准备好。但我把这件事，写进笔记本了。等我哪天直得起背，我就去。医生，谢谢您没逼我，也谢谢您没让我一个人去。",
  emotion: "neutral",
  autoNext: "mq_end_accept",
}
```

#### 恶化路径（worsen）

```ts-dialog
// id: mq4_w01
{
  id: "mq4_w01",
  speaker: "patient",
  text: "（她的脸一下子冷下来）……您也这么说。装愧疚。好。那我装了半年，是装的。那我翻篇。我回家就把那张名单烧了，我把那个笔记本扔了。翻篇，谁不会啊。",
  emotion: "angry",
  autoNext: "mq4_w02",
}
```

```ts-dialog
// id: mq4_w02
{
  id: "mq4_w02",
  speaker: "doctor",
  text: "这句话把她推进了「我就是装的是吧」的坑——她要把自己刚长出来的那点东西，亲手撕了。",
  choices: [
    { id: "mq4_w02_a", text: "「你不是装的，你就是累了。别逼自己翻篇，慢慢来。」", kind: "logic", effect: { trust: -6, defense: 6, mood: -3 }, next: "mq4_w03" },
    { id: "mq4_w02_b", text: "（她已经在气头上，你先稳住，不跟她争。）", kind: "empathy", effect: { trust: -3, mood: -4 }, next: "mq4_w03" },
  ],
}
```

```ts-dialog
// id: mq4_w03
{
  id: "mq4_w03",
  speaker: "patient",
  text: "……别劝我了。我本来还想着，回去试试不坐床沿。现在不用试了。我就是这样的人，跟我爸一样，缩一辈子。您救不了我，我自己也救不了。谢谢您今天的时间。",
  emotion: "broken",
  autoNext: "mq_end_worsen",
}
```

---

## 三、结局

```ts-dialog
// id: mq_end_cure
{
  id: "mq_end_cure",
  speaker: "narration",
  text: "〔结局 · 治愈〕",
  isEnding: true,
  endingType: "cure",
  endingTitle: "直着背站一会儿",
  endingText: "三个月后，穆青来信。她真的去了那个员工家附近的街口，没敲门，只是站了一会儿，心里把那句『我记得他』默念了一遍。她说她爸后来真的跟她出来走了一趟，老人家走得很慢，背还是缩着，但有一段路，挺直了几步。她自己在公司推动了离职面谈流程的改版——每一场面谈，先认人，再谈政策。她说：那张脸还在，但它不再坐在床沿上了，我也不是。",
  endingReward: { doctorReputation: 8, doctorMoney: 300, doctorExp: 50, doctorSanity: 5 },
}
```

```ts-dialog
// id: mq_end_accept
{
  id: "mq_end_accept",
  speaker: "narration",
  text: "〔结局 · 接纳〕",
  isEnding: true,
  endingType: "acceptance",
  endingTitle: "它来，我让它坐一会儿",
  endingText: "穆青没有再约新的会谈，但每隔一阵会来坐坐。她说那张脸还会来，半夜偶尔还是会醒。她不再跟它死磕——泡杯茶，跟它心里默念一句『我经手过你，我记得你』，然后接着睡。她说：我没赢过它，可它也不再独占我的夜。这就够了。",
  endingReward: { doctorReputation: 4, doctorMoney: 180, doctorExp: 35, doctorSanity: 6 },
}
```

```ts-dialog
// id: mq_end_hidden
{
  id: "mq_end_hidden",
  speaker: "narration",
  text: "〔结局 · 隐藏·认人〕",
  isEnding: true,
  endingType: "hidden",
  endingTitle: "那张脸，还回去了",
  endingText: "你陪穆青一起，拟了一封不寄的信——写给她那个员工的家。信里没有『对不起』，只有『我记得他签字那天抬起头那一眼，他叫得出孩子的年纪』。穆青把信读了很多遍，最后没有寄出去，而是折好，放在父亲那张名单底稿旁边。她说：我不求他们原谅，我求的是，那张脸从我床沿，挪到它该在的地方——它不是我的债主，它是个人。后来她真的去那个街口站过一次。回来后，她睡了整觉。",
  endingReward: { doctorReputation: -10, doctorMoney: 100, doctorExp: 80, doctorSanity: -15 },
}
```

```ts-dialog
// id: mq_end_worsen
{
  id: "mq_end_worsen",
  speaker: "narration",
  text: "〔结局 · 恶化〕",
  isEnding: true,
  endingType: "worsen",
  endingTitle: "缩回去的背",
  endingText: "穆青没有再来。她丈夫后来转来消息：她把那个笔记本烧了，名单底稿也扔了，说『翻篇』。可她开始天天喝酒，半夜还是坐在床沿——比之前坐得更久，背缩得更深。他说，有天夜里他醒来，听见她在跟空气说话，反复念『执行命令的人没有错』。那句话，她爸念了一辈子，现在轮到她，在没人看见的夜里，一个人念。",
  endingReward: { doctorReputation: -8, doctorMoney: 50, doctorExp: 10, doctorSanity: -20 },
}
```

---

## 六、状态

- [x] 人物档案完整（一句话核心/三层真相/角色三角/症状意义/关键转折）
- [x] 节拍规划表（中档 5 节拍，trust 15→30→45→57→65→70，truth 0→70）
- [x] v3 结构校验通过 + tsc 通过（163 节点 / 73 医生节点）
- [x] 走线四线全绿（共情 cure trust=70 rounds=70 / 均衡 cure 2碎片 / 失误 worsen / 探问 cure truth≥70）
- [x] 聚合入口（index.generated.ts 自动收录 mu_qing）
- [x] 剧本登记表（已登记：执行者道德创伤 · 代际重复）
