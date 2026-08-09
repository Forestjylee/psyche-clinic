# 许晨曦 · v3 · 中剧本 · 5 节拍 · 70+ 轮

> 中档剧本：新手妈妈的孤独与标准（完美幻想）。
> 数值：trust 15→30→45→57→65→70；truth 0→70；碎片 2 枚 @25/50；恶化入口 trust≤55；隐藏结局 @65；cure 主线 70 轮。
> 生成：`node scripts/md-to-patient.mjs docs/stories/xu_chenxi-v3.md --walk`

---

## 节拍规划表

| 节拍 | 主题 | trust | truth | 阻抗 | 关键事件 | 碎片 |
|---|---|---|---|---|---|---|
| 1 | 初访·表层（失眠/反复查育儿视频/夜哭跟着掉泪/奶量不够自责） | 15→30 (+15) | 0→15 | c04 logic | c07 confront req20 | — |
| 2 | 中间层·婆婆与先生（婆婆那句话记一整晚 / 「你已经很好了」她不信） | 30→45 (+15) | 15→25 | c04 logic | c08 confront req25 | m1 @truth25（考第二被问为什么不是第一） |
| 3 | 深层·妈妈的声音（隔电话指点带娃 / 从没听过「做得不错」） | 45→57 (+12) | 25→40 | c04 logic | c08 confront req40 | m2 @truth50（隔着电话的指点） |
| 4 | 根源信念·最后一场补考（把当妈当补考 / 自己给自己批卷） | 57→65 (+8) | 40→55 | c03 logic | c09 恶化入口 req≤55 | — |
| 5 | 转向+结局（孩子半夜摸她的脸 / 做 60 分的妈妈也够好） | 65→70 (+5) | 55→70 | — | fork confront req45 / hidden req65 | — |

**数值口径**：trust 单调递增，empathy 与 probe 同涨 trust；轻推进 +1、实质 +2、纯过场 +0；logic/prescribe 失误 -8~-12。truth 只由 probe 涨（轻 +2、实质 +3）。defense 净下降，阻抗短时 +8~+12 回落。cure 主线共情线 trust 精确累加 55（15→70）。

---

## 〇、人物档案

**姓名** 许晨曦，28 岁，产假中的新媒体运营，孩子 6 个月。产后复查时对着问卷哭出来，被医生建议来聊聊。

**一句话核心** 孩子一哭她就慌——不是孩子难带，是她从小被「你什么都不行」追着，现在要靠把妈妈当好，来证明自己终于行了。

**三层真相**
- 表层（开场就说）：整夜睡不着，反复查育儿视频；孩子夜哭，她跟着掉眼泪；奶量不够，就自责一整天。
- 中间层（节拍 2 揭）：婆婆一句「现在的年轻人不会带孩子」她能记一整晚；先生说「你已经很好了」她不信，觉得他在安慰。
- 深层（节拍 3-4 揭）：妈妈从小挑剔她——考第二要问「为什么不是第一」，现在隔着电话还要指点她带娃。她这辈子的执念，全押在「把妈妈当好」这一件事上，像一场最后的补考——考过了，她才是那个终于行了的人；考不过，她就还是那个「什么都不行」的小孩。

**角色三角**
- 施压者：挑剔的妈妈，与婆婆那句「现在的年轻人不会带孩子」的标准。
- 情感忽视者：从没夸过她的妈妈（隔着电话只指点，不接住）。
- 被守护者：孩子——她怕自己不够好，孩子会「被怪罪」到她头上；她更怕孩子长大，长成第二个只会自我责怪的她。

**症状意义** 焦虑不是矫情，是她把「当妈」当成最后一次补考——考不过，她就还是那个「什么都不行」的小孩。开场埋（「我得把孩子带好，才算真的行了」）→ 中段被问（「你拿孩子，补考你自己的童年吗」）→ 高潮意义反转（她不是考生，是那个把孩子抱在怀里、从没离开过的人）。

**关键转折** 孩子半夜醒来，看见她哭，竟伸手摸了摸她的脸——她第一次明白，孩子不是来审判她的。是自己给自己，设了个考场。

---

## 一、剧本元信息（ts-meta）

```ts-meta
// id: xu_chenxi
// tier: 中
// anchor: 15,30,45,57,65,70
// truthEnd: 70
// minCureRounds: 70
// fragments: 2
// worsenAtMost: 55
{
  id: "xu_chenxi",
  name: "许晨曦",
  title: "新手妈妈 · 产假中的新媒体运营 · 产后复查转介",
  intro: "产后复查的问卷上，她写到『你有没有觉得照顾不好宝宝』那题，眼泪忽然掉下来。护士把她转介来聊聊。她说：『我不是身体累，是心里一直绷着。』",
  surface: "整夜睡不着，反复刷育儿视频；孩子夜哭，她跟着掉眼泪；奶量不够，就自责一整天。28 岁，产假中的新媒体运营，孩子六个月。表面是『新手妈妈的焦虑』，底下是一把从小到大都没松过的尺子。",
  truth: "妈妈从小挑剔她——考第二要问『为什么不是第一』，现在隔着电话还要指点她带娃。她从来没听到过一句『你做得不错』。她把这辈子对『够好』的执念，全押在了『把妈妈当好』这一件事上——像一场最后的补考。考过了，她才是那个终于行了的人；考不过，她就还是那个『什么都不行』的小孩。",
  palette: { primary: "#d9a066", secondary: "#ecd2b0", fog: "#b58a6b", bright: "#f6e6cf" },
  baseReward: 750,
  difficulty: "普通",
  startNode: "xc1_start",
  initialState: { trust: 15, defense: 68, mood: 30, truth: 0, round: 0 },
  memoryFragments: [
    {
      id: "xu_m1",
      trigger: { truth: 25 },
      title: "为什么不是第一",
      text: "那张卷子我折了很多次，角都折皱了。我考了第二，同桌是第一名。我兴冲冲拿回家，我妈接过去看了一眼，放下，问：『为什么不是第一？』我站在那儿，手里还捏着卷子，不知道该说什么。从那以后，我举卷子的手，就再也没举高过。我好像总在等一句『不错』，一直没等到。",
      emotion: "sad",
    },
    {
      id: "xu_m2",
      trigger: { truth: 50 },
      title: "隔着电话的指点",
      text: "电话那头，我妈的声音有点远。她说我抱孩子的姿势不对，说奶粉冲太稀，说孩子睡太少。我一边听一边点头，说『嗯』『好』。挂了电话我才发现，我抱着孩子的手，一直没松开。孩子在我怀里睡着了，我忽然想问她一句：妈，我小时候，你有没有觉得我做得不错？可我没问出口。我从来，不敢问。",
      emotion: "sad",
    },
  ],
}
```

---

## 二、节拍骨架（ts-dialog 节点）

### 节拍 1 · 初访·表层（trust 15→30，truth 0→15，阻抗 c04）

```ts-dialog
// id: xc1_start
{
  id: "xc1_start",
  speaker: "narration",
  text: "初秋的下午，候诊区很安静。许晨曦早到了十五分钟，坐在最角落的位置，低头看手机。走近才看见，屏幕上是某个育儿视频的暂停画面，讲的是宝宝夜醒的安抚方法。轮到她时，她先把手机锁屏，又解了锁，最后才起身走进来。",
  autoNext: "xc1_p01",
}
```

```ts-dialog
// id: xc1_p01
{
  id: "xc1_p01",
  speaker: "patient",
  text: "医生您好。我……真的不是有什么毛病。就是产后复查填问卷，填到一半眼泪自己掉下来了，护士说让我来坐坐。我可能就是，这段时间太累了。",
  emotion: "neutral",
  autoNext: "xc1_c01",
}
```

```ts-dialog
// id: xc1_c01
{
  id: "xc1_c01",
  speaker: "doctor",
  text: "她先说「不是有毛病」，又说问卷时掉眼泪——像在替自己找理由。",
  choices: [
    { id: "xc1_c01_a", text: "「你提前十五分钟就到了，还攥着手机。能让自己停一停的人，才舍得承认『太累』这两个字。」", kind: "empathy", effect: { trust: 2, defense: -1 }, next: "xc1_p02" },
    { id: "xc1_c01_b", text: "「那页问卷上，是哪道题让你的眼泪掉下来的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc1_p02" },
    { id: "xc1_c01_c", text: "「产后累是正常的，先把觉睡好，别自己吓自己。」", kind: "logic", effect: { trust: -8, defense: 8, mood: -3 }, next: "xc1_r01" },
  ],
}
```

```ts-dialog
// id: xc1_r01
{
  id: "xc1_r01",
  speaker: "patient",
  text: "（她的肩膀一下绷起来）……您这话，我妈也说过。『想开点』。我要能想开，我早想开了。我站在阳台上，抱着孩子，满脑子都是要怎么做才不会辜负他，我怎么可能想得开。对不起，我嗓门大了。",
  emotion: "angry",
  autoNext: "xc1_p05",
}
```

```ts-dialog
// id: xc1_p02
{
  id: "xc1_p02",
  speaker: "patient",
  text: "（她低头盯着手机屏）……我也说不清是哪道。反正写到『你有没有觉得照顾不好宝宝』那题，我手一抖，眼泪就下来了。我自己都觉得莫名其妙。我明明……挺用心的啊。",
  emotion: "anxious",
  autoNext: "xc1_c02",
}
```

```ts-dialog
// id: xc1_c02
{
  id: "xc1_c02",
  speaker: "doctor",
  text: "她把「照顾不好宝宝」几个字轻轻带过，又回头看了一眼屏幕。",
  choices: [
    { id: "xc1_c02_a", text: "「你不是累，你是怕——怕『照顾不好』这四个字，真的会落到自己头上。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc1_p03" },
    { id: "xc1_c02_b", text: "「你晚上一般几点能睡？孩子夜醒几回？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc1_p03" },
  ],
}
```

```ts-dialog
// id: xc1_p03
{
  id: "xc1_p03",
  speaker: "patient",
  text: "……十一点躺下，躺到一两点还睡不着。孩子一翻身我就惊醒，摸他额头，数他呼吸。白天他睡了，我就去刷视频，看人家怎么带，看完更睡不着了，觉得自己哪哪都没做对。",
  emotion: "anxious",
  autoNext: "xc1_c03",
}
```

```ts-dialog
// id: xc1_c03
{
  id: "xc1_c03",
  speaker: "doctor",
  text: "她查的不是方法，是「别出错」的许可证。",
  choices: [
    { id: "xc1_c03_a", text: "「你在用那些视频，把自己钉在『不能出错』四个字上。可宝宝不是考卷，没有人给他判分。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc1_p04" },
    { id: "xc1_c03_b", text: "「刷完那些视频，你心里是踏实一点，还是更慌了？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc1_p04" },
  ],
}
```

```ts-dialog
// id: xc1_p04
{
  id: "xc1_p04",
  speaker: "patient",
  text: "……更慌。越看越慌。有个视频说夜奶不能喂太勤，我照着做，孩子哭了一整夜。那晚我一边喂一边哭，喂着喂着奶也少了。奶一少，我更慌，觉得都是我的错。",
  emotion: "sad",
  autoNext: "xc1_c04",
}
```

```ts-dialog
// id: xc1_c04
{
  id: "xc1_c04",
  speaker: "doctor",
  text: "她把「奶不够」和「我的错」，焊在了同一句话里。",
  choices: [
    { id: "xc1_c04_a", text: "「奶是你身体的，你的自责不是你的——你为了『不够』责备自己一整天，心疼你的人看见，会比你更难受。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc1_p05" },
    { id: "xc1_c04_b", text: "「奶不够那天，你先生在家吗？他看见你哭了吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc1_p05" },
    { id: "xc1_c04_c", text: "「你已经做得很好了，别对自己这么苛刻。想开点，孩子健康就行了。」", kind: "logic", effect: { trust: -10, defense: 8, mood: -3 }, next: "xc1_r01" },
  ],
}
```

```ts-dialog
// id: xc1_p05
{
  id: "xc1_p05",
  speaker: "patient",
  text: "（她深吸一口气，声音低下去）……我白天一个人带孩子，他哭我也哭。他哭是因为饿，是因为困，我哭是因为……我也不知道我为什么哭。我就是看着他，眼泪自己就下来。",
  emotion: "sad",
  autoNext: "xc1_c05",
}
```

```ts-dialog
// id: xc1_c05
{
  id: "xc1_c05",
  speaker: "doctor",
  text: "「他哭我也哭」——她把自己和孩子，绑在了同一根线上。",
  choices: [
    { id: "xc1_c05_a", text: "「孩子哭，你也哭——你掉的那滴泪，不是给他的，是给那个怕自己不够好的你。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc1_p06" },
    { id: "xc1_c05_b", text: "「他夜哭的时候，你脑子里转得最快的那句话，是什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc1_p06" },
  ],
}
```

```ts-dialog
// id: xc1_p06
{
  id: "xc1_p06",
  speaker: "patient",
  text: "……『我连一个孩子都带不好，我还能干什么。』这句话在我脑子里，像个循环。白天还好，一到夜里就响。",
  emotion: "neutral",
  autoNext: "xc1_c06",
}
```

```ts-dialog
// id: xc1_c06
{
  id: "xc1_c06",
  speaker: "doctor",
  text: "「我连一个孩子都带不好」——她把这辈子的价值，全押在了一件事上。",
  choices: [
    { id: "xc1_c06_a", text: "「你把『带好孩子』当成了唯一能证明自己的事——好像这件事做不好，你这个人就没了。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc1_p07" },
    { id: "xc1_c06_b", text: "「『带不好』这三个字，你最早是听谁说的？还是你自己学会的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc1_p07" },
  ],
}
```

```ts-dialog
// id: xc1_p07
{
  id: "xc1_p07",
  speaker: "patient",
  text: "（她愣住，想了很久）……好像是，我自己学会的。我妈从小就说我，这不行那不行。我考第二，她要问为什么不是第一。我那时候就想，我是不是真的什么都不行。",
  emotion: "neutral",
  autoNext: "xc1_c07",
}
```

```ts-dialog
// id: xc1_c07
{
  id: "xc1_c07",
  speaker: "doctor",
  text: "妈妈的声音第一次出来了——「为什么不是第一」。",
  choices: [
    { id: "xc1_c07_a", text: "「你不是『什么都不行』。你只是一个人在撑着，撑太久了。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "xc1_p08" },
    { id: "xc1_c07_b", text: "「你考第二那天，你几岁？你还记得那天的情景吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc1_p08" },
    { id: "xc1_c07_c", text: "「那些视频都在教你『标准答案』。可宝宝从来不是标准题——你不是答错，是没人教过你，这题可以没有标准。」", kind: "confront", require: { trust: 20 }, effect: { trust: 1, truth: 3, mood: -2 }, next: "xc1_p08", hint: "需要信任≥20" },
  ],
}
```

```ts-dialog
// id: xc1_p08
{
  id: "xc1_p08",
  speaker: "patient",
  text: "……七岁吧。我把卷子举得高高的，想让她夸我。她看了一眼，说『为什么不是第一』。从那以后，我举卷子的手，就再也没那么高过了。",
  emotion: "sad",
  autoNext: "xc1_c08",
}
```

```ts-dialog
// id: xc1_c08
{
  id: "xc1_c08",
  speaker: "doctor",
  text: "「再也没举高过」——一句话，压了她二十年。",
  choices: [
    { id: "xc1_c08_a", text: "「那句话之后，你再考第一、考第二，是不是都再没觉得够过？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc1_p09" },
    { id: "xc1_c08_b", text: "「你白天最怕的，是哪一刻？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc1_p09" },
  ],
}
```

```ts-dialog
// id: xc1_p09
{
  id: "xc1_p09",
  speaker: "patient",
  text: "……怕婆婆来。她一来，我整个人都绷着。她倒没骂我，就是看我冲奶粉、看孩子睡，眼里总像有话说。我最怕她那种，不说出来的眼神。",
  emotion: "anxious",
  autoNext: "xc1_c09",
}
```

```ts-dialog
// id: xc1_c09
{
  id: "xc1_c09",
  speaker: "doctor",
  text: "「不说出来的眼神」——她怕的不是人，是没落地的审判。",
  choices: [
    { id: "xc1_c09_a", text: "「你怕的不是她，是那双眼睛后面，那句你没听见的话。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc1_p10" },
    { id: "xc1_c09_b", text: "「她有没有哪次，把话说出来过？让你记到现在的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc1_p10" },
  ],
}
```

```ts-dialog
// id: xc1_p10
{
  id: "xc1_p10",
  speaker: "patient",
  text: "（她低头，声音小下去）……说过一句。『现在的年轻人，哪儿会带孩子。』那天她说完，我抱着孩子回了屋，把那句话反反复复，记了一整晚。",
  emotion: "sad",
  autoNext: "xc1_c10",
}
```

```ts-dialog
// id: xc1_c10
{
  id: "xc1_c10",
  speaker: "doctor",
  text: "一句话能压她一整晚——它踩到的地方，早就疼过了。",
  choices: [
    { id: "xc1_c10_a", text: "「一句话能压你一整晚——它踩到的地方，一定早就疼过了。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc1_p11" },
    { id: "xc1_c10_b", text: "「那一整晚，你在反复想她这句话，还是在想她这句话对不对？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc1_p11" },
  ],
}
```

```ts-dialog
// id: xc1_p11
{
  id: "xc1_p11",
  speaker: "patient",
  text: "……想它对不对。我一边想『她说的也有道理』，一边又觉得委屈。我明明已经很努力了。可我一想『努力』，又觉得，我连个孩子都带不好，努力有什么用。",
  emotion: "neutral",
  autoNext: "xc1_c11",
}
```

```ts-dialog
// id: xc1_c11
{
  id: "xc1_c11",
  speaker: "doctor",
  text: "她习惯先把别人的标准接过来，再反过来责怪自己。",
  choices: [
    { id: "xc1_c11_a", text: "「你习惯先把别人的标准接过来，再责怪自己——这不是你的事，是从小就学会的。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc1_p12" },
    { id: "xc1_c11_b", text: "「『努力有什么用』——这句话，是不是也是谁教你的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc1_p12" },
  ],
}
```

```ts-dialog
// id: xc1_p12
{
  id: "xc1_p12",
  speaker: "patient",
  text: "（她轻轻摇头）……我妈吧。我做什么，她都觉得不够。我毕业了，她说你表哥都买房了；我结婚了，她说你表姐孩子都俩了。我现在有孩子了，她隔着电话还要指点我怎么带。",
  emotion: "neutral",
  autoNext: "xc1_c12",
}
```

```ts-dialog
// id: xc1_c12
{
  id: "xc1_c12",
  speaker: "doctor",
  text: "「隔着电话还要指点」——妈妈不在身边，尺子却一直在线。",
  choices: [
    { id: "xc1_c12_a", text: "「你妈妈隔着电话指点你——你听着的时候，心里是什么感觉？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc1_p13" },
    { id: "xc1_c12_b", text: "「她说你的时候，你有没有哪一次，跟她说过『妈，我已经很努力了』？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc1_p13" },
  ],
}
```

```ts-dialog
// id: xc1_p13
{
  id: "xc1_p13",
  speaker: "patient",
  text: "……没说出口过。我怕一说，她又说我想多了。我从小就觉得，只有我把所有事都做好了，她才不会再挑。可我把婚结了，孩子也生了，她还是能挑出话来。",
  emotion: "neutral",
  autoNext: "xc1_c13",
}
```

```ts-dialog
// id: xc1_c13
{
  id: "xc1_c13",
  speaker: "doctor",
  text: "她还在追那把不断往前挪的尺子。",
  choices: [
    { id: "xc1_c13_a", text: "「你一直在等一个『够好了』——可那把尺子，是你妈妈拿着的。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc1_p14" },
    { id: "xc1_c13_b", text: "「你心里那杆秤，是不是也搬到『当妈妈』这件事上了？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc1_p14" },
  ],
}
```

```ts-dialog
// id: xc1_p14
{
  id: "xc1_p14",
  speaker: "patient",
  text: "（她愣了一下，眼眶又有点红）……是。我生孩子之前，觉得考过试、毕了业、上了班，就终于行了。现在发现，那些都不算数。我得把孩子带好，才算真的行了。我怕我……考不过。",
  emotion: "sad",
  autoNext: "xc1_c14",
}
```

```ts-dialog
// id: xc1_c14
{
  id: "xc1_c14",
  speaker: "doctor",
  text: "「我怕我考不过」——她把自己的后半生，押在了一场没人出题的考试上。",
  choices: [
    { id: "xc1_c14_a", text: "「你把自己押在一场『考试』上——可这场考试，从来没有人给你出过题。今天先到这儿，你愿意说出那个『怕』，已经很有力气了。」", kind: "empathy", effect: { trust: 0, mood: 3 }, next: "xc1_out" },
    { id: "xc1_c14_b", text: "「下次，我们看看那把尺子，是怎么从小跟着你到现在的。」", kind: "probe", effect: { trust: 0, truth: 2 }, next: "xc1_out" },
  ],
}
```

```ts-dialog
// id: xc1_out
{
  id: "xc1_out",
  speaker: "narration",
  text: "第一次会谈结束。许晨曦起身时，把手机塞进包里，又掏出来看了一眼屏幕——还是那个育儿视频。她按灭屏幕，声音很轻：『……下次，我还来。』她在门口站了两秒，才转身走出去。",
  beatEnd: { resumeNode: "xc2_start" },
  autoNext: "xc2_start",
}
```

### 节拍 2 · 中间层·婆婆与先生（trust 30→45，truth 15→25，[m1 碎片@25]，关键事件 c08 req25）

```ts-dialog
// id: xc2_start
{
  id: "xc2_start",
  speaker: "narration",
  text: "一周后，许晨曦准时来了。她今天没刷手机，手里拎着一个保温杯，说是给孩子装的温水。她坐下，把杯子放在腿上，手指轻轻摩挲杯沿，过了好一会儿才开口。",
  autoNext: "xc2_p01",
}
```

```ts-dialog
// id: xc2_p01
{
  id: "xc2_p01",
  speaker: "patient",
  text: "医生，我回去想了您的话。您说那是把尺子。我后来发现，那把尺子不光我妈拿着，婆婆也拿着。前几天，她来家里，看见我哄孩子，又说了句『现在的年轻人啊』。我当场没说话，晚上躺下，那半句话又回来了。",
  emotion: "neutral",
  autoNext: "xc2_c01",
}
```

```ts-dialog
// id: xc2_c01
{
  id: "xc2_c01",
  speaker: "doctor",
  text: "「现在的年轻人啊」——她替她把后半句咽下去了。",
  choices: [
    { id: "xc2_c01_a", text: "「『现在的年轻人啊』——后半句她没说，你自己给她填上了。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc2_p02" },
    { id: "xc2_c01_b", text: "「那半句话，你替她填的是哪个字？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc2_p02" },
  ],
}
```

```ts-dialog
// id: xc2_p02
{
  id: "xc2_p02",
  speaker: "patient",
  text: "……填的是『不会带孩子』。我一填完，眼泪就上来了。我把孩子哄睡，一个人在客厅坐到半夜。我先生出来看见，问怎么了，我说没事。他信了，又回去睡了。",
  emotion: "sad",
  autoNext: "xc2_c02",
}
```

```ts-dialog
// id: xc2_c02
{
  id: "xc2_c02",
  speaker: "doctor",
  text: "最难过的时候，她把门关得最紧。",
  choices: [
    { id: "xc2_c02_a", text: "「你一个人坐到半夜，把『没事』说出口——你最难过的时候，反而把门关得最紧。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc2_p03" },
    { id: "xc2_c02_b", text: "「你先生回去睡了——他要是当时再问一句，你会说吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc2_p03" },
  ],
}
```

```ts-dialog
// id: xc2_p03
{
  id: "xc2_p03",
  speaker: "patient",
  text: "……会吗？我不知道。他说过一句话，『你已经很好了』。可我听完，第一个念头不是信，是『他在安慰我』。他不懂，他要真觉得我好，为什么我还能让孩子哭成这样。",
  emotion: "anxious",
  autoNext: "xc2_c03",
}
```

```ts-dialog
// id: xc2_c03
{
  id: "xc2_c03",
  speaker: "doctor",
  text: "先生递过来的「你已经很好了」，她接不住。",
  choices: [
    { id: "xc2_c03_a", text: "「他说『你已经很好了』，你选择不信——不是他的话不够真，是你心里那把尺子，从来没给自己判过『好』。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "xc2_p04" },
    { id: "xc2_c03_b", text: "「『你已经很好了』——你心里，有没有哪一刻，也对自己说过这几个字？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc2_p04" },
  ],
}
```

```ts-dialog
// id: xc2_p04
{
  id: "xc2_p04",
  speaker: "patient",
  text: "……没说过。我对我自己，从来只说『还差一点』『还不够』。我先生有时候逗我，说我是最严格的监考老师，天天给自己判不及格。",
  emotion: "neutral",
  autoNext: "xc2_c04",
}
```

```ts-dialog
// id: xc2_c04
{
  id: "xc2_c04",
  speaker: "doctor",
  text: "「最严格的监考老师」——她自己给自己发卷、自己判卷。",
  choices: [
    { id: "xc2_c04_a", text: "「你给自己当监考老师当了多少年——是从考第二那年开始的吗？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc2_p05" },
    { id: "xc2_c04_b", text: "「你先生那句『最严格的监考老师』，你听了，笑了吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc2_p05" },
    { id: "xc2_c04_c", text: "「你先生都说了你很好了，你还有什么可担心的。想开点，别钻牛角尖。」", kind: "logic", effect: { trust: -10, defense: 8, mood: -3 }, next: "xc2_r01" },
  ],
}
```

```ts-dialog
// id: xc2_r01
{
  id: "xc2_r01",
  speaker: "patient",
  text: "（她的脸色一下子冷下来）……又来了。『想开点』。你们都觉得我想不开，可谁想过，我为什么想不开。我先生是好人，可他一句『已经很好了』，解决不了我心里那个声音。您要是也说想开点，那我还是走吧。",
  emotion: "angry",
  autoNext: "xc2_p05",
}
```

```ts-dialog
// id: xc2_p05
{
  id: "xc2_p05",
  speaker: "patient",
  text: "（她顿了顿，声音软下来）……对不起，我又急了。我不是冲您。我就是听不得『想开点』『别钻牛角尖』。好像我这些难受，都是我自找的。",
  emotion: "anxious",
  autoNext: "xc2_c05",
}
```

```ts-dialog
// id: xc2_c05
{
  id: "xc2_c05",
  speaker: "doctor",
  text: "她把「难受」当成了自己的错。",
  choices: [
    { id: "xc2_c05_a", text: "「你不是自找的。你是从小被一把尺子量大的——难受不是你的错，是你从没被人告诉过，可以不用量。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc2_p06" },
    { id: "xc2_c05_b", text: "「你听不得『想开点』——除了我，还有谁这么跟你说过？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc2_p06" },
  ],
}
```

```ts-dialog
// id: xc2_p06
{
  id: "xc2_p06",
  speaker: "patient",
  text: "……我妈。她打电话来，我稍微说句累，她就说『你想太多了』『你就是闲的』。我后来就不爱接她电话了。可我又不敢不接，怕她觉得我不孝。",
  emotion: "neutral",
  autoNext: "xc2_c06",
}
```

```ts-dialog
// id: xc2_c06
{
  id: "xc2_c06",
  speaker: "doctor",
  text: "怕她不孝，又怕她的尺子——她两头都被拴着。",
  choices: [
    { id: "xc2_c06_a", text: "「你怕她觉得你不孝——所以你一边怕她，一边还得接她的电话。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc2_p07" },
    { id: "xc2_c06_b", text: "「她打电话来，说的最多的是什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc2_p07" },
  ],
}
```

```ts-dialog
// id: xc2_p07
{
  id: "xc2_p07",
  speaker: "patient",
  text: "……全是『怎么带孩子』。奶粉冲多少，衣服穿几件，什么时候添辅食。我要是说我跟医生聊过，她又说你们年轻人信网上那些。我夹在她和我自己中间，喘不过气。",
  emotion: "anxious",
  autoNext: "xc2_c07",
}
```

```ts-dialog
// id: xc2_c07
{
  id: "xc2_c07",
  speaker: "doctor",
  text: "妈妈隔着电话，还在当她的考官。",
  choices: [
    { id: "xc2_c07_a", text: "「她把『怎么带』当成她要管的事——可孩子是你的，你才是那个一天二十四小时抱着他的人。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc2_p08" },
    { id: "xc2_c07_b", text: "「你有没有哪一次，想过跟她说一句『妈，我自己可以』？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc2_p08" },
  ],
}
```

```ts-dialog
// id: xc2_p08
{
  id: "xc2_p08",
  speaker: "patient",
  text: "……『我自己可以』。这句话，我在心里排练过很多次。可一听到她的声音，我就怂了。我怕她一句『你懂什么』，就把我打回原形。",
  emotion: "neutral",
  autoNext: "xc2_c08",
}
```

```ts-dialog
// id: xc2_c08
{
  id: "xc2_c08",
  speaker: "doctor",
  text: "「打回原形」——那个原形，是七岁举着卷子的她。",
  choices: [
    { id: "xc2_c08_a", text: "「你一直在她面前把自己放得很小——小到忘了，你已经是一个把新生命平安带到世界上的人了。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "xc2_p09" },
    { id: "xc2_c08_b", text: "「『我自己可以』——这句话，你敢在心里，对它，默念一遍吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc2_p09" },
    { id: "xc2_c08_c", text: "「如果你真的把孩子带成了她眼里的『标准』，她会夸你一句『不错』吗？你信吗？」", kind: "confront", require: { trust: 25 }, effect: { trust: 1, truth: 3, mood: -2 }, next: "xc2_p09", hint: "需要信任≥25" },
  ],
}
```

```ts-dialog
// id: xc2_p09
{
  id: "xc2_p09",
  speaker: "patient",
  text: "（她沉默了很久）……就算她夸我，我也不信。我从小到大，等那句『不错』等得太久，久到它要是真来了，我肯定觉得是假的。我宁愿她一直不说，我还能骗自己，是我还不够好。",
  emotion: "sad",
  autoNext: "xc2_c09",
}
```

```ts-dialog
// id: xc2_c09
{
  id: "xc2_c09",
  speaker: "doctor",
  text: "她宁愿信「自己不够好」，也不敢信真会有人夸她。",
  choices: [
    { id: "xc2_c09_a", text: "「你宁愿信『自己不够好』，也不敢信她真会夸你——这句话，你压了多少年。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc2_p10" },
    { id: "xc2_c09_b", text: "「『自己还不够好』——好到什么样，才算好？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc2_p10" },
  ],
}
```

```ts-dialog
// id: xc2_p10
{
  id: "xc2_p10",
  speaker: "patient",
  text: "（她低头看着保温杯）……好到，我妈不挑。可这不可能。她永远有的挑。我考第一，她说第二名的进步空间更大。我把孩子带得再仔细，她都能找出个角度说我。",
  emotion: "neutral",
  autoNext: "xc2_c10",
}
```

```ts-dialog
// id: xc2_c10
{
  id: "xc2_c10",
  speaker: "doctor",
  text: "她在追一个永远跑不到头的终点——因为尺子会跟着她一起往前挪。",
  choices: [
    { id: "xc2_c10_a", text: "「你在追一个永远跑不到头的终点——因为那把尺子，会随着你变好，一起往前挪。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc2_p11" },
    { id: "xc2_c10_b", text: "「你考第一那年，你妈妈说了什么，你还记得吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc2_p11" },
  ],
}
```

```ts-dialog
// id: xc2_p11
{
  id: "xc2_p11",
  speaker: "patient",
  text: "……记得。她说『第二名进步空间更大』。我那时候想，那我下次考第二名好了。可我又怕考第二她又说别的。我就发现，不管我考第几，她总有话。从那以后，我就不跟她说了。",
  emotion: "neutral",
  autoNext: "xc2_c11",
}
```

```ts-dialog
// id: xc2_c11
{
  id: "xc2_c11",
  speaker: "doctor",
  text: "「怎么做都不对」——那把尺子从来就没打算放过她。",
  choices: [
    { id: "xc2_c11_a", text: "「你发现『怎么做都不对』——那不是你的问题，是那把尺子从来就没打算放过你。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc2_p12" },
    { id: "xc2_c11_b", text: "「你后来不跟她说了——可你现在，又在心里，跟自己说了多少遍？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc2_p12" },
  ],
}
```

```ts-dialog
// id: xc2_p12
{
  id: "xc2_p12",
  speaker: "patient",
  text: "……每天都在说。我白天带孩子，心里那个声音就没停过。冲奶粉，觉得水多了一点；哄睡，觉得姿势不对；孩子多咳一声，我整颗心都提起来。我把所有事都当成考试，考得我自己快散架了。",
  emotion: "anxious",
  autoNext: "xc2_c12",
}
```

```ts-dialog
// id: xc2_c12
{
  id: "xc2_c12",
  speaker: "doctor",
  text: "她把每一天都过成了一场考试。",
  choices: [
    { id: "xc2_c12_a", text: "「你把每一天都过成了一场考试——可孩子需要的不是满分妈妈，是一个还没散架、还能抱他的人。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc2_p13" },
    { id: "xc2_c12_b", text: "「『散架』——你有没有哪一刻，真的觉得自己撑不住了？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc2_p13" },
  ],
}
```

```ts-dialog
// id: xc2_p13
{
  id: "xc2_p13",
  speaker: "patient",
  text: "（她停住，眼睛有点湿）……有一回。孩子夜里一直哭，我抱着他，他哭我也哭。我先生加班不在家。我抱着孩子坐在飘窗上，看着楼下的路灯，忽然想，要是这一片黑里，只有我们娘俩，我该怎么办。就那一下，我慌了，赶紧给他爸打电话。",
  emotion: "scared",
  autoNext: "xc2_c13",
}
```

```ts-dialog
// id: xc2_c13
{
  id: "xc2_c13",
  speaker: "doctor",
  text: "「只有我们娘俩」——那一瞬间，她第一次觉得孤立无援。",
  choices: [
    { id: "xc2_c13_a", text: "「你抱着孩子坐在黑里，心里第一个想的，是给孩子爸打电话——那一刻，你没有放弃。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc2_p14" },
    { id: "xc2_c13_b", text: "「你打电话，是想跟他说什么？还是只是想听个声音？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc2_p14" },
  ],
}
```

```ts-dialog
// id: xc2_p14
{
  id: "xc2_p14",
  speaker: "patient",
  text: "……想听个声音吧。他接了，我说『你快回来』。他说好，二十分钟到。他到了，看见我们俩脸上都挂着泪，愣了一下，先把孩子接过去，又用另一只手，揽了一下我的肩。就那一下，我忽然觉得，我好像不是一个人在撑着。",
  emotion: "neutral",
  autoNext: "xc2_c14",
}
```

```ts-dialog
// id: xc2_c14
{
  id: "xc2_c14",
  speaker: "doctor",
  text: "「揽了一下我的肩」——她第一次，被人接住了。",
  choices: [
    { id: "xc2_c14_a", text: "「就那一下——你发现，有人愿意伸手，接住你。你不必一个人考完这场试。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "xc2_p15" },
    { id: "xc2_c14_b", text: "「他那一下，你到现在还记得——你心里是不是，一直在等有人这么接住你？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc2_p15" },
  ],
}
```

```ts-dialog
// id: xc2_p15
{
  id: "xc2_p15",
  speaker: "patient",
  text: "……是。我从小，我妈妈没接过我。我考第一，她把卷子放下就走。我哭，她说别哭了像什么样子。我从来不知道，被接住是什么感觉。直到我那晚，被他揽了一下。",
  emotion: "sad",
  autoNext: "xc2_c15",
}
```

```ts-dialog
// id: xc2_c15
{
  id: "xc2_c15",
  speaker: "doctor",
  text: "「被接住」不重，很轻，只是一下——可她等了一辈子。",
  choices: [
    { id: "xc2_c15_a", text: "「你被你先生接住过一次——原来『被接住』不重，很轻，只是一下。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "xc2_out" },
    { id: "xc2_c15_b", text: "「你妈妈没接过你——你心里那个小女孩，是不是还在等那一接？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc2_out" },
  ],
}
```

```ts-dialog
// id: xc2_out
{
  id: "xc2_out",
  speaker: "narration",
  text: "第二次会谈结束。许晨曦握着保温杯，在门口停了一会儿。她说：『医生，我回去以后，想试着跟我先生说一句实话——那天晚上我不是没事，我是很难过。』她说完，自己先笑了一下，眼眶却红了。",
  beatEnd: { resumeNode: "xc3_start" },
  autoNext: "xc3_start",
}
```

### 节拍 3 · 深层·妈妈的声音（trust 45→57，truth 25→40，[m2 碎片@50]，关键事件 c08 req40）

```ts-dialog
// id: xc3_start
{
  id: "xc3_start",
  speaker: "narration",
  text: "又一周。许晨曦来的时候，眼睛下面有淡淡的青，但嘴角比上次松了一点。她坐下来，把手机放到一边——这次没刷视频。她说：『医生，我这周，跟我妈吵了一架。』",
  autoNext: "xc3_p01",
}
```

```ts-dialog
// id: xc3_p01
{
  id: "xc3_p01",
  speaker: "patient",
  text: "我试着跟我先生说了一句实话，他听了，没劝我，就坐我旁边。我忽然觉得心里松了一点。可后来我妈打电话来，又说我抱孩子的姿势不对。我不知怎么，就顶了一句『我自己会带』。她那边沉默了很久，说『你翅膀硬了』。",
  emotion: "anxious",
  autoNext: "xc3_c01",
}
```

```ts-dialog
// id: xc3_c01
{
  id: "xc3_c01",
  speaker: "doctor",
  text: "「我自己会带」——这句话，她可能等了二十年。",
  choices: [
    { id: "xc3_c01_a", text: "「你顶了一句『我自己会带』——这句话，你等了二十年才说出口。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc3_p02" },
    { id: "xc3_c01_b", text: "「她说你『翅膀硬了』——你听着，心里是痛快，还是慌？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc3_p02" },
  ],
}
```

```ts-dialog
// id: xc3_p02
{
  id: "xc3_p02",
  speaker: "patient",
  text: "……又痛快又慌。痛快的是，我终于说出来了。慌的是，我怕她真的再也不管我。我怕她寒心，又怕她不管我以后，我就真的没人管了。",
  emotion: "anxious",
  autoNext: "xc3_c02",
}
```

```ts-dialog
// id: xc3_c02
{
  id: "xc3_c02",
  speaker: "doctor",
  text: "她卡在「要认可」和「怕控制」中间，被抻了二十年。",
  choices: [
    { id: "xc3_c02_a", text: "「你想要她的认可，又怕她的控制——你在这两头中间，被抻了二十年。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc3_p03" },
    { id: "xc3_c02_b", text: "「『没人管』——可你已经是一个孩子的妈妈了，你其实，早就是那个『管』着别人的人了。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc3_p03" },
  ],
}
```

```ts-dialog
// id: xc3_p03
{
  id: "xc3_p03",
  speaker: "patient",
  text: "（她愣了一下）……我管着他，可我连自己都管不好。我抱着他，总觉得我自己也是个没长大的孩子，只是怀里多了个更小的。我怕我把他带歪了，我怕他将来，也长成我这个样子，天天觉得自己不够好。",
  emotion: "sad",
  autoNext: "xc3_c03",
}
```

```ts-dialog
// id: xc3_c03
{
  id: "xc3_c03",
  speaker: "doctor",
  text: "「怕他长成我」——她第一次，看见了代际的那条线。",
  choices: [
    { id: "xc3_c03_a", text: "「你怕他长成你——可你正在做的每一件事，都在告诉他，有人会接住他。他会长成你，也会长成那一下被揽住的温度。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "xc3_p04" },
    { id: "xc3_c03_b", text: "「你怕把他带歪——可『歪』的标准，是你妈妈那把尺子量出来的，还是你自己心里那杆秤？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc3_p04" },
  ],
}
```

```ts-dialog
// id: xc3_p04
{
  id: "xc3_p04",
  speaker: "patient",
  text: "……我分不清了。我抱着他，有时候觉得他是我生的，有时候又觉得，他是所有人眼睛里的一个考题。他笑一下，我松口气；他哭一声，我心就揪起来。我好像不是个妈妈，是站在考场外面的一个考生，等着被宣判。",
  emotion: "anxious",
  autoNext: "xc3_c04",
}
```

```ts-dialog
// id: xc3_c04
{
  id: "xc3_c04",
  speaker: "doctor",
  text: "「考场外的考生」——她把「当妈」过成了一场考试。",
  choices: [
    { id: "xc3_c04_a", text: "「你不是考生。你是那个把他抱在怀里、一晚上惊醒七八次也要看他好不好的人——这世上没有哪场考试，考这个。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc3_p05" },
    { id: "xc3_c04_b", text: "「你抱着他的时候，最忘掉那些『标准』的是哪一刻？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc3_p05" },
    { id: "xc3_c04_c", text: "「孩子是拿来带的，不是拿来愁的。你把心态放平，别老想东想西。」", kind: "logic", effect: { trust: -10, defense: 8, mood: -3 }, next: "xc3_r01" },
  ],
}
```

```ts-dialog
// id: xc3_r01
{
  id: "xc3_r01",
  speaker: "patient",
  text: "（她低着头，好一会儿没说话）……您说得对，我不该老想。可我要是真能不想，我不会半夜坐起来，去摸他的鼻息。您说我心态放平，我放不平——我心里有个声音，从七岁就开始喊，说我不够好，它不会因为我当了妈妈就停下来。",
  emotion: "angry",
  autoNext: "xc3_p05",
}
```

```ts-dialog
// id: xc3_p05
{
  id: "xc3_p05",
  speaker: "patient",
  text: "（她吸了吸鼻子）……对不起。我就是忽然想，我妈妈要是当年，哪怕有一次，跟我说一句『你做得好』，我是不是就不用这么用力，去证明自己了。我是不是就不用，拿我自己的孩子，去补考我自己的童年了。",
  emotion: "sad",
  autoNext: "xc3_c05",
}
```

```ts-dialog
// id: xc3_c05
{
  id: "xc3_c05",
  speaker: "doctor",
  text: "「拿孩子补考自己的童年」——她把那根线，自己揪出来了。",
  choices: [
    { id: "xc3_c05_a", text: "「你看见了那根线——你现在带孩子的每一分用力，都在补一场没人给你判过的考试。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc3_p06" },
    { id: "xc3_c05_b", text: "「『拿孩子补考自己的童年』——这句话，你自己说出来，心里是什么感觉？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc3_p06" },
  ],
}
```

```ts-dialog
// id: xc3_p06
{
  id: "xc3_p06",
  speaker: "patient",
  text: "……酸。又有点对不起他。他那么小，什么都不懂，我却把这么大一份『要证明自己』压在他身上。他每次哭，我都觉得是我不够好——可他就是个正常的宝宝，他也需要哭啊。我为什么，连他哭都要怪自己。",
  emotion: "sad",
  autoNext: "xc3_c06",
}
```

```ts-dialog
// id: xc3_c06
{
  id: "xc3_c06",
  speaker: "doctor",
  text: "「连他哭都要怪自己」——她把「被爱」也设了门槛。",
  choices: [
    { id: "xc3_c06_a", text: "「你连他哭都要怪自己——那不是你爱得太多，是你把『被爱』的门槛，定得太高了。你也值得，什么都不做，就被他爱着。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc3_p07" },
    { id: "xc3_c06_b", text: "「他说不定，正用他的哭，在告诉你：你不用当满分妈妈，我只要你在这儿。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc3_p07" },
  ],
}
```

```ts-dialog
// id: xc3_p07
{
  id: "xc3_p07",
  speaker: "patient",
  text: "（她的眼泪掉下来，这次没有忍）……真的吗？我总觉得，他要是不哭了、不闹了，我带得好了，他才爱我。我好像……把爱也当成考试了。我连被爱，都要考及格才行。",
  emotion: "broken",
  autoNext: "xc3_c07",
}
```

```ts-dialog
// id: xc3_c07
{
  id: "xc3_c07",
  speaker: "doctor",
  text: "「连被爱都要考及格」——这句话，是她这周最诚实的一句。",
  choices: [
    { id: "xc3_c07_a", text: "「你把『被爱』也当成了要考及格的事——可他从你肚子里出来那刻起，就没给你出过题。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc3_p08" },
    { id: "xc3_c07_b", text: "「他第一次对你笑的时候，你觉得是自己考好了，还是他本来就高兴？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc3_p08" },
  ],
}
```

```ts-dialog
// id: xc3_p08
{
  id: "xc3_p08",
  speaker: "patient",
  text: "（她愣住）……我从来，没想过这个问题。他笑，我就觉得，呼，今天没考砸。我没想过，他可能就是，看见我，高兴。",
  emotion: "neutral",
  autoNext: "xc3_c08",
}
```

```ts-dialog
// id: xc3_c08
{
  id: "xc3_c08",
  speaker: "doctor",
  text: "孩子不需要她交卷——这个念头，第一次进到她的考场里。",
  choices: [
    { id: "xc3_c08_a", text: "「你这一路，都在等一句『你做得不错』——可你怀里这个孩子，从出生那天起，就在用每一次呼吸告诉你：你就在这儿，就是够好。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "xc3_p09" },
    { id: "xc3_c08_b", text: "「如果我说，你已经是够好的妈妈了——你心里第一个冒出来的声音，是谁的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc3_p09" },
    { id: "xc3_c08_c", text: "「你妈妈的尺子，量了你三十年。可它从来没量过『爱』——它只量『够不够』。而你给孩子的那份，它量不出来。」", kind: "confront", require: { trust: 40 }, effect: { trust: 1, truth: 3, mood: -2 }, next: "xc3_p09", hint: "需要信任≥40" },
  ],
}
```

```ts-dialog
// id: xc3_p09
{
  id: "xc3_p09",
  speaker: "patient",
  text: "（她愣了很久，轻轻抱住自己）……量不出来。我给他冲奶、哄睡、半夜起来摸他的鼻息，我从来没想过这是不是『够好』，我就是想让他别难受。我原来……一直在爱他啊。我怎么把自己活成了，只看得见尺子，看不见爱。",
  emotion: "scared",
  autoNext: "xc3_c09",
}
```

```ts-dialog
// id: xc3_c09
{
  id: "xc3_c09",
  speaker: "doctor",
  text: "「只看得见尺子，看不见爱」——她心里那杆秤，第一次晃了。",
  choices: [
    { id: "xc3_c09_a", text: "「你看见了——你心里那杆秤，第一次，晃了一下。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc3_p10" },
    { id: "xc3_c09_b", text: "「你妈妈那把尺子，是不是也一直在量她自己，却从来没量过，你其实已经做得多好了？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc3_p10" },
  ],
}
```

```ts-dialog
// id: xc3_p10
{
  id: "xc3_p10",
  speaker: "patient",
  text: "……她量她自己吗？我没想过。我光顾着恨那把尺子了。我现在忽然想，她是不是也跟我一样，从小也是被这么量的。她不是不想夸我，是她从来没学过怎么夸。她一个人把我拉扯大，光是让我吃饱穿暖，就已经用尽全力了。",
  emotion: "neutral",
  autoNext: "xc3_c10",
}
```

```ts-dialog
// id: xc3_c10
{
  id: "xc3_c10",
  speaker: "doctor",
  text: "她第一次，试着不恨那把尺子了——她看见了尺子后面那个人。",
  choices: [
    { id: "xc3_c10_a", text: "（陪她在这个新念头里坐一会儿——她第一次，试着不恨那把尺子了。）", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "xc3_p11" },
    { id: "xc3_c10_b", text: "「你想到了你妈妈的那把尺子——你现在，想对她说点什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc3_p11" },
  ],
}
```

```ts-dialog
// id: xc3_p11
{
  id: "xc3_p11",
  speaker: "patient",
  text: "……想说『妈，我懂你了』。可我又怕，我懂了她，我就没法生她的气了。我恨了她这么多年，拿她的话折磨自己这么多年，忽然要我放下，我不甘心。又觉得，该放下了。",
  emotion: "neutral",
  autoNext: "xc3_c11",
}
```

```ts-dialog
// id: xc3_c11
{
  id: "xc3_c11",
  speaker: "doctor",
  text: "放下不是原谅她——是把尺子请出她的心。",
  choices: [
    { id: "xc3_c11_a", text: "「放下不是原谅她，是把那把尺子，从你心里请出去——你受过的那些苦，不用因为她『也是苦过来的』，就一笔勾销。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc3_p12" },
    { id: "xc3_c11_b", text: "「如果你不放下，那把尺子，会跟着你孩子一辈子——你想让他，也考这门试吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc3_p12" },
  ],
}
```

```ts-dialog
// id: xc3_p12
{
  id: "xc3_p12",
  speaker: "patient",
  text: "（她的肩膀慢慢垮下来）……不想。我一点都不想。我想他这一辈子，都不知道什么叫『为什么不是第一』。我想他半夜醒来，伸手就能摸到妈妈，不用去猜，妈妈是不是又觉得我不够好。",
  emotion: "sad",
  autoNext: "xc3_c12",
}
```

```ts-dialog
// id: xc3_c12
{
  id: "xc3_c12",
  speaker: "doctor",
  text: "她想给他一个不用考试的童年。",
  choices: [
    { id: "xc3_c12_a", text: "「你想给他一个不用考试的童年——这个念头，比任何『标准答案』都值钱。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "xc3_p13" },
    { id: "xc3_c12_b", text: "「你小时候，半夜醒来，摸到的是什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc3_p13" },
  ],
}
```

```ts-dialog
// id: xc3_p13
{
  id: "xc3_p13",
  speaker: "patient",
  text: "（她低头，声音很轻）……摸到的是凉的。我妈上夜班，我半夜醒来，旁边是空的。我学会了自己把被子裹紧，学会了自己不哭。我现在抱着我儿子，他半夜一哼，我立刻醒。我有时候想，我是不是，在给他补我自己小时候，没睡过的那种觉。",
  emotion: "sad",
  autoNext: "xc3_c13",
}
```

```ts-dialog
// id: xc3_c13
{
  id: "xc3_c13",
  speaker: "doctor",
  text: "「给他补我小时候没睡过的觉」——她守着的，不只是孩子，还有那个没人守的自己。",
  choices: [
    { id: "xc3_c13_a", text: "「你半夜醒来的次数，是在补偿那个小时候的自己——你守着的不只是一个孩子，还有那个没人守的你。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "xc3_p14" },
    { id: "xc3_c13_b", text: "「你现在守着他——你有没有想过，你也值得，被人这么守着？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc3_p14" },
  ],
}
```

```ts-dialog
// id: xc3_p14
{
  id: "xc3_p14",
  speaker: "patient",
  text: "（她轻轻笑了一下）……我先生守着我。我现在，半夜醒来，会把他叫醒，跟他说一句『我做噩梦了』。他迷迷糊糊，伸手拍拍我。就那样，我就觉得，我这辈子，好像头一回，有个人，在我旁边。",
  emotion: "calm",
  autoNext: "xc3_c14",
}
```

```ts-dialog
// id: xc3_c14
{
  id: "xc3_c14",
  speaker: "doctor",
  text: "「这辈子头一回有个人在旁边」——她不是没人爱，是没被教会怎么接住爱。",
  choices: [
    { id: "xc3_c14_a", text: "「『我这辈子头一回有个人在旁边』——你不是没人爱，你只是从小，没被人教会，怎么接住这份爱。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "xc3_p15" },
    { id: "xc3_c14_b", text: "「你先生拍你那一下——要是你妈妈当年，也这样拍过你，你会不会，就不用考这么多年试了？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc3_p15" },
  ],
}
```

```ts-dialog
// id: xc3_p15
{
  id: "xc3_p15",
  speaker: "patient",
  text: "（她沉默了很久）……会。医生，我想下次，给我妈打个电话。不是跟她吵，就是……听听她的声音。我想知道，我能不能，既不恨她，也不被她那把尺子量着，过我自己的日子。",
  emotion: "neutral",
  autoNext: "xc3_c15",
}
```

```ts-dialog
// id: xc3_c15
{
  id: "xc3_c15",
  speaker: "doctor",
  text: "她开始往自己的那一侧迈了。",
  choices: [
    { id: "xc3_c15_a", text: "「你可以的。那把尺子是她量你的方式——但过日子，是你自己的事。你已经在，往自己的那一边，迈了。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "xc3_out" },
    { id: "xc3_c15_b", text: "「你打电话，最想跟她说的第一句话，是什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc3_out" },
  ],
}
```

```ts-dialog
// id: xc3_out
{
  id: "xc3_out",
  speaker: "narration",
  text: "第三次会谈结束。许晨曦走到门口，又折回来，把保温杯放下，从里面倒出一点水，说：『医生，这是孩子今天喝剩的。我忽然觉得，连这点剩水，都比我考过的所有试，更有温度。』她说完，自己笑了。",
  beatEnd: { resumeNode: "xc4_start" },
  autoNext: "xc4_start",
}
```

### 节拍 4 · 根源信念·最后一场补考（trust 57→65，truth 40→55，阻抗 c03，恶化入口 c09 req≤55）

```ts-dialog
// id: xc4_start
{
  id: "xc4_start",
  speaker: "narration",
  text: "又一周。许晨曦来的时候，手里没拿保温杯，也没拿手机。她坐下来，两只手交叠放在膝上，手指轻轻绞着。她说：『医生，我这周，给我妈打了个电话。』",
  autoNext: "xc4_p01",
}
```

```ts-dialog
// id: xc4_p01
{
  id: "xc4_p01",
  speaker: "patient",
  text: "我打过去了。她接起来，第一句是『喂』。我听着那个声音，半天没说话。她问我怎么了。我说没事，就是想听你说话。她那边静了一下，说『你是不是又在乱想』。我笑了一下，说『没有』。挂了电话，我坐在那儿，眼泪流了很久。",
  emotion: "neutral",
  autoNext: "xc4_c01",
}
```

```ts-dialog
// id: xc4_c01
{
  id: "xc4_c01",
  speaker: "doctor",
  text: "她打过去了——没有吵，也没有求夸。只是想听她的声音。",
  choices: [
    { id: "xc4_c01_a", text: "「你打过去了——你没有跟她吵，也没有求她夸你。你只是，想听她的声音。这已经，很不容易了。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "xc4_p02" },
    { id: "xc4_c01_b", text: "「她说『又在乱想』的时候，你心里，是失望，还是松了一口气？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc4_p02" },
  ],
}
```

```ts-dialog
// id: xc4_p02
{
  id: "xc4_p02",
  speaker: "patient",
  text: "……都有一点。失望的是，她还是那句。松气的是，她还在，她还会接我的电话。我怕她哪天，真的不管我了。我就成了那个，举着卷子，没人看的小孩。",
  emotion: "sad",
  autoNext: "xc4_c02",
}
```

```ts-dialog
// id: xc4_c02
{
  id: "xc4_c02",
  speaker: "doctor",
  text: "「举着卷子，没人看的小孩」——她心里那个七岁的身影，又出来了。",
  choices: [
    { id: "xc4_c02_a", text: "「你怕她不管你了——可你已经是那个『举着卷子的小孩』的妈妈了。你不用再等谁来批卷。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc4_p03" },
    { id: "xc4_c02_b", text: "「你心里那个举卷子的小孩——你现在，能抱抱她吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc4_p03" },
  ],
}
```

```ts-dialog
// id: xc4_p03
{
  id: "xc4_p03",
  speaker: "patient",
  text: "（她闭上眼，好一会儿）……我试着抱了。我跟她说，你考第二也没事，你已经很努力了。她说，真的吗。我说，真的。我说完，忽然明白，我等这句话，等了三十年——可我能对她说出来，我是不是，也终于，肯对自己说了。",
  emotion: "scared",
  autoNext: "xc4_c03",
}
```

```ts-dialog
// id: xc4_c03
{
  id: "xc4_c03",
  speaker: "doctor",
  text: "「你已经很努力了」——这句话，她终于从自己嘴里，听见了。",
  choices: [
    { id: "xc4_c03_a", text: "「你对你心里那个小孩说了『你已经很努力了』——这句话，你终于，从自己嘴里，听见了。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc4_p04" },
    { id: "xc4_c03_b", text: "「说这句话的时候，你心里那个『监考老师』，有没有，稍微走开一下？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc4_p04" },
    { id: "xc4_c03_c", text: "「行了，你都当了妈了，该跟过去和解了。老抓着小时候那些事，对谁都没好处。」", kind: "logic", effect: { trust: -12, defense: 10, mood: -4 }, next: "xc4_r01" },
  ],
}
```

```ts-dialog
// id: xc4_r01
{
  id: "xc4_r01",
  speaker: "patient",
  text: "（她的脸白了一下，声音却平静下来）……对，我该和解。可『和解』两个字，要是能说到做到，我早做了。您说得轻巧，我听着，像是说我这三十年，都是我自己放不下、想不开。我要是能选，我也不想，半夜摸着儿子的头，问是不是我在拖累他。",
  emotion: "angry",
  autoNext: "xc4_p04",
}
```

```ts-dialog
// id: xc4_p04
{
  id: "xc4_p04",
  speaker: "patient",
  text: "（她缓了缓，声音低下来）……我不是怪您。我是怪我自己。我明明已经，能对我心里那个小孩说『你很好』了，可一到夜里，孩子一哭，我还是会想，是不是我哪里做错了。那个声音，它不死心。它要是不死心，我儿子，是不是也得跟着，听一辈子？",
  emotion: "anxious",
  autoNext: "xc4_c04",
}
```

```ts-dialog
// id: xc4_c04
{
  id: "xc4_c04",
  speaker: "doctor",
  text: "「它不死心」——她怕那个声音，会传给孩子。",
  choices: [
    { id: "xc4_c04_a", text: "「那个声音不死心，是因为你让它喊了三十年——你不可能一晚就让它安静。但你今天，已经听懂它了。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc4_p05" },
    { id: "xc4_c04_b", text: "「孩子一哭你就觉得做错了——你能分辨一下，那个『错』，是孩子的，还是那个声音塞给你的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc4_p05" },
  ],
}
```

```ts-dialog
// id: xc4_p05
{
  id: "xc4_p05",
  speaker: "patient",
  text: "……塞给我的。他哭，是他的事，他饿了，困了，哪儿不舒服了。可我一听见哭，第一反应不是去看他怎么了，是先怪自己。我好像，把『听到哭』和『我做错了』，焊在了一块儿。",
  emotion: "neutral",
  autoNext: "xc4_c05",
}
```

```ts-dialog
// id: xc4_c05
{
  id: "xc4_c05",
  speaker: "doctor",
  text: "「哭声」和「我的错」，被她焊在了一起——她能看见，就能撬开。",
  choices: [
    { id: "xc4_c05_a", text: "「你看见了这个焊点——『哭声』和『我的错』，是被焊在一起的。你能看见，就能撬开。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc4_p06" },
    { id: "xc4_c05_b", text: "「下次他再哭，你想不想试试，先问一句『宝宝，你怎么了』，而不是先问『我又怎么了』？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc4_p06" },
  ],
}
```

```ts-dialog
// id: xc4_p06
{
  id: "xc4_p06",
  speaker: "patient",
  text: "（她眼睛一亮，又暗下去）……我想试。可我又怕，我试了，还是做不到。我怕我让他失望。我怕他以后，也变成我这样，一有动静就觉得自己错了。我这辈子，最怕的，就是把他，养成第二个我。",
  emotion: "sad",
  autoNext: "xc4_c06",
}
```

```ts-dialog
// id: xc4_c06
{
  id: "xc4_c06",
  speaker: "doctor",
  text: "「养成第二个我」——她最深的怕，在这儿。",
  choices: [
    { id: "xc4_c06_a", text: "「你怕他变成第二个你——可你已经，在往『第一个你』的路上走了。你能怕这件事，就说明，你不想让他，重复你的路。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc4_p07" },
    { id: "xc4_c06_b", text: "「第二个你，是什么样子的？你能跟那个『第二个你』，说一句什么话吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc4_p07" },
  ],
}
```

```ts-dialog
// id: xc4_p07
{
  id: "xc4_p07",
  speaker: "patient",
  text: "……第二个我，是那个考第二，就不敢抬头的小孩；是那个抱孩子，还觉得自己不够好的人。我想对她说：你够好了。你不用考满分，他不需要你满分，他只需要，你在这儿。",
  emotion: "calm",
  autoNext: "xc4_c07",
}
```

```ts-dialog
// id: xc4_c07
{
  id: "xc4_c07",
  speaker: "doctor",
  text: "「他只需要你在这儿」——她对自己说，也说给那个考第二的小孩听。",
  choices: [
    { id: "xc4_c07_a", text: "「『他只需要你在这儿』——这句话，你说给你儿子，也说给了那个考第二的小孩。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc4_p08" },
    { id: "xc4_c07_b", text: "「你要是现在，就能跟她说这句话——你心里的那场补考，是不是，可以交卷了？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc4_p08" },
  ],
}
```

```ts-dialog
// id: xc4_p08
{
  id: "xc4_p08",
  speaker: "patient",
  text: "（她沉默了很久，眼泪慢慢掉下来）……我想交卷。医生，我怕的是，我交了卷，还是不及格。我怕我放下了那把尺子，我妈妈就真的，再也没人，替她举着那把尺子了。我怕她一个人，站在她那把尺子底下，也没人接住她。",
  emotion: "broken",
  autoNext: "xc4_c08",
}
```

```ts-dialog
// id: xc4_c08
{
  id: "xc4_c08",
  speaker: "doctor",
  text: "她放不下的，不是那把尺子，是尺子底下，没人接的妈妈。",
  choices: [
    { id: "xc4_c08_a", text: "「你怕她没人接——可你接不住她。你能接住的，是你自己，是你儿子。你把你那根尺子放下，不是背叛她，是替她，把那些年的苦，先放下了。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "xc4_p09" },
    { id: "xc4_c08_b", text: "「你妈妈的尺子，是她那辈子的铠甲——你脱掉她给的这一身，她会不会，反而觉得，你终于，长大了？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc4_p09" },
  ],
}
```

```ts-dialog
// id: xc4_p09
{
  id: "xc4_p09",
  speaker: "patient",
  text: "（她擦了擦脸，抬起头）……交卷吧。我不是考过了，我是想明白了：这场考试，本来就不存在。它是我自己，替我妈，替我小时候，设的一个考场。现在，我把它撤了。",
  emotion: "calm",
  autoNext: "xc4_c09",
}
```

```ts-dialog
// id: xc4_c09
{
  id: "xc4_c09",
  speaker: "doctor",
  text: "她亲手撤掉了自己设的考场——这是她整场最重要的一步。但这里有一条岔路。",
  choices: [
    { id: "xc4_c09_a", text: "「撤掉考场之后，你想做的第一件事，是什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc4_p10" },
    { id: "xc4_c09_b", text: "「你撤掉的，不只是考场，还有那个举着卷子，等批了三十年的小孩。她自由了。」", kind: "empathy", effect: { trust: 0, mood: 3 }, next: "xc4_p10" },
    { id: "xc4_c09_c", text: "「说白了，你就是想太多了。人家当妈的都这么过来的，就你矫情。赶紧翻篇，别把孩子也带得神经兮兮的。」", kind: "logic", require: { trustAtMost: 55 }, effect: { trust: -10, defense: 8, mood: -4 }, next: "xc4_w01", hint: "仅信任≤55 时可见" },
  ],
}
```

```ts-dialog
// id: xc4_p10
{
  id: "xc4_p10",
  speaker: "patient",
  text: "（她怔住，看了你很久）……您说，我撤了考场。可我心里那个声音，还在说：你撤了，也不会有人批你。我妈妈不会批，我婆婆不会批，连我自己，都不敢给自己批。我好像，一辈子都在等一个，不存在的考官。",
  emotion: "neutral",
  autoNext: "xc4_c10",
}
```

```ts-dialog
// id: xc4_c10
{
  id: "xc4_c10",
  speaker: "doctor",
  text: "「不存在的考官」——她等了一辈子，等一个永远不会出现的人。",
  choices: [
    { id: "xc4_c10_a", text: "「那个考官不存在——所以你等不到。可你发现没有：现在批卷的人，可以是你自己。你想给自己，批个什么？」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "xc4_p11" },
    { id: "xc4_c10_b", text: "「『不存在的考官』——你现在，能替那个位置，自己坐上去吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc4_p11" },
  ],
}
```

```ts-dialog
// id: xc4_p11
{
  id: "xc4_p11",
  speaker: "patient",
  text: "（她低头，声音很轻）……我批。我批一句：许晨曦，你当妈这一年，及格了。不是因为你做得多好，是因为你一直，没走。你一直抱着他，一直半夜醒，一直怕他不好。这一科，你及格了。你不用满分，你及格了，就够了。",
  emotion: "calm",
  autoNext: "xc4_c11",
}
```

```ts-dialog
// id: xc4_c11
{
  id: "xc4_c11",
  speaker: "doctor",
  text: "「及格了，就够了」——她终于把「满分」那把尺子，放下了。",
  choices: [
    { id: "xc4_c11_a", text: "「『及格了，就够了』——你终于，把『满分』那把尺子，放下了。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "xc4_p12" },
    { id: "xc4_c11_b", text: "「你给自己批的那句，你妈妈听了，会难过吗？你会难过吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc4_p12" },
  ],
}
```

```ts-dialog
// id: xc4_p12
{
  id: "xc4_p12",
  speaker: "patient",
  text: "……我妈妈听不见。但我要是哪天，能当着她面，把这句话说出来，我大概，也不会难过了。我不是在跟她决裂，我是想告诉她：妈，你不用替我批了。我这一科，我自己批。我也希望，你那一科，你自己，也能批个及格。",
  emotion: "neutral",
  autoNext: "xc4_c12",
}
```

```ts-dialog
// id: xc4_c12
{
  id: "xc4_c12",
  speaker: "doctor",
  text: "她不替妈妈举尺子了，也不让妈妈替她举了。",
  choices: [
    { id: "xc4_c12_a", text: "「你不替她举那把尺子了，也不让她替你举了——你们俩，都该歇歇了。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "xc4_p13" },
    { id: "xc4_c12_b", text: "「要是能选，你想替她批一句什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc4_p13" },
  ],
}
```

```ts-dialog
// id: xc4_p13
{
  id: "xc4_p13",
  speaker: "patient",
  text: "（她想了想，声音软下来）……批一句：妈，你一个人把我带大，你那一科，也及格了。你不用再拿『挑剔』，证明你爱我。你爱我的方式，我收到了。只是，我这一辈子，想换一种，更轻的方式，去爱我自己。",
  emotion: "calm",
  autoNext: "xc4_c13",
}
```

```ts-dialog
// id: xc4_c13
{
  id: "xc4_c13",
  speaker: "doctor",
  text: "她把这句没说出口的话，先说给了自己听。",
  choices: [
    { id: "xc4_c13_a", text: "「你把那句一直没说出口的话，说给你自己听了——这就是，你给自己交的卷。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "xc4_p14" },
    { id: "xc4_c13_b", text: "「『更轻的方式去爱自己』——你打算，怎么开始？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc4_p14" },
  ],
}
```

```ts-dialog
// id: xc4_p14
{
  id: "xc4_p14",
  speaker: "patient",
  text: "……先从，不查那些视频开始。先从，他哭的时候，先抱他，而不是先怪自己开始。先从，半夜醒了，叫我先生一声，而不是一个人坐到天亮开始。医生，我是不是，终于，有点像个妈妈了？",
  emotion: "calm",
  autoNext: "xc4_c14",
}
```

```ts-dialog
// id: xc4_c14
{
  id: "xc4_c14",
  speaker: "doctor",
  text: "「有点像个妈妈了」——她问出这句话时，其实已经是了。",
  choices: [
    { id: "xc4_c14_a", text: "「你不是『有点像个妈妈』——你一直是。只是从现在起，你肯让自己，轻松一点当了。」", kind: "empathy", effect: { trust: 0, mood: 3 }, next: "xc4_out" },
    { id: "xc4_c14_b", text: "「你心里那个考第二的小孩，听到你这些话，她是不是，终于，可以睡了？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc4_out" },
  ],
}
```

```ts-dialog
// id: xc4_out
{
  id: "xc4_out",
  speaker: "narration",
  text: "第四次会谈结束。许晨曦没有立刻走。她看着窗外，轻声说：『医生，我想回家，好好抱抱我儿子。抱他的时候，我不想再数他够不够好，就想抱抱他。』她说完，自己先笑出了声，那笑声里，带着一点从没有过的轻。",
  beatEnd: { resumeNode: "xc5_start" },
  autoNext: "xc5_start",
}
```

### 节拍 5 · 转向+结局（trust 65→70，truth 55→70，fork special/empathy/confront req65）

```ts-dialog
// id: xc5_start
{
  id: "xc5_start",
  speaker: "narration",
  text: "最后一次会谈。许晨曦来的时候，眼睛亮亮的。她坐下，没等开口，先说了：『医生，我昨晚，哭了。不是因为难过。』她说着，眼眶又红了，但嘴角是弯的。",
  autoNext: "xc5_p01",
}
```

```ts-dialog
// id: xc5_p01
{
  id: "xc5_p01",
  speaker: "patient",
  text: "孩子半夜醒了，我在飘窗上坐着。他爬过来，伸手，摸了摸我的脸。就那样，摸了一下。他什么也没说，又回去睡了。我坐在那儿，哭了好久。我忽然明白——他不是来审判我的。他从来，都不是来审判我的。是我自己，给自己，设了个考场。",
  emotion: "broken",
  autoNext: "xc5_fork",
}
```

```ts-dialog
// id: xc5_fork
{
  id: "xc5_fork",
  speaker: "doctor",
  text: "孩子摸她的那一下，把她设的考场，拆了。走到这里，她需要选一条路往下走。",
  choices: [
    { id: "xc5_fork_a", text: "「你已经走到这里了。我们来做最后一张清单——你累的时候能靠的地方，能找的人，能对自己说的话。让这张网，先替你兜一阵。」", kind: "special", effect: { trust: 1, mood: 2 }, next: "xc5_s01" },
    { id: "xc5_fork_b", text: "「你找到了那句话——『他不是来审判我的』。带着它，慢慢走，也是一种答案。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc5_a01" },
    { id: "xc5_fork_c", text: "「你妈妈那把尺子，量了你三十年。你有没有想过，当面，把『我自己批及格了』这句话，说给她听一次？」", kind: "confront", require: { trust: 65 }, effect: { trust: 0, truth: 3, mood: -3 }, next: "xc5_h01", hint: "需要信任≥65" },
  ],
}
```

#### 安全网路径（cure 主线）

```ts-dialog
// id: xc5_s01
{
  id: "xc5_s01",
  speaker: "patient",
  text: "（她看着那张空白的清单，想了想）……能靠的地方。我以前觉得，当妈不能靠别人，靠别人就是不合格。可我这阵子试着靠了靠我先生，他倒挺高兴的。他好像，一直等着我靠他。",
  emotion: "neutral",
  autoNext: "xc5_s02",
}
```

```ts-dialog
// id: xc5_s02
{
  id: "xc5_s02",
  speaker: "doctor",
  text: "「靠别人就不合格」——这条规矩，又是谁定的？",
  choices: [
    { id: "xc5_s02_a", text: "「你发现，你靠过去，他不躲——这世上，不是所有地方，都像你小时候的床，是凉的。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "xc5_s03" },
    { id: "xc5_s02_b", text: "「你觉得靠别人不合格——这个『合格』，又是谁定的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc5_s03" },
  ],
}
```

```ts-dialog
// id: xc5_s03
{
  id: "xc5_s03",
  speaker: "patient",
  text: "……是我自己定的。我定了太多规矩了。这条我改：累的时候，就靠一靠。我儿子都懂得，伸手摸我一下。我凭什么，不许我自己，伸手靠别人一下。",
  emotion: "calm",
  autoNext: "xc5_s04",
}
```

```ts-dialog
// id: xc5_s04
{
  id: "xc5_s04",
  speaker: "doctor",
  text: "她学会「伸手」了——跟她儿子一样。",
  choices: [
    { id: "xc5_s04_a", text: "「你学会『伸手』了——跟你儿子一样。他伸手摸你，你伸手靠人。你俩，都在学同一个本事：被接住。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc5_s05" },
    { id: "xc5_s04_b", text: "「你儿子教会你的，比所有育儿视频都多——你觉得呢？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc5_s05" },
  ],
}
```

```ts-dialog
// id: xc5_s05
{
  id: "xc5_s05",
  speaker: "patient",
  text: "……是。那些视频教我怎么带，他教我怎么做人。我以前，拿他当考题，现在觉得，他是我这辈子，最温柔的一门课。他不上课，他就睡在我旁边，我就学会了。",
  emotion: "calm",
  autoNext: "xc5_s06",
}
```

```ts-dialog
// id: xc5_s06
{
  id: "xc5_s06",
  speaker: "doctor",
  text: "她把「当妈」从考场，挪到了课堂。",
  choices: [
    { id: "xc5_s06_a", text: "「你把『当妈』从考场，挪到了课堂——你不再是考生，你是和他一起，学走路的人。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "xc5_s07" },
    { id: "xc5_s06_b", text: "「他说不定，也在跟你学——学你怎样，从一场考了三十年的试里，走出来。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc5_s07" },
  ],
}
```

```ts-dialog
// id: xc5_s07
{
  id: "xc5_s07",
  speaker: "patient",
  text: "……我想教他的，就一件事：你不必满分。你考第二，也有人爱你；你哭，有人接住你；你半夜醒来，旁边有人。他要是能学会这个，我这辈子，就没白当这趟妈。",
  emotion: "neutral",
  autoNext: "xc5_s08",
}
```

```ts-dialog
// id: xc5_s08
{
  id: "xc5_s08",
  speaker: "doctor",
  text: "她教他的这件事，她也正在教自己。",
  choices: [
    { id: "xc5_s08_a", text: "「你教他的这件事，你也在教你自己——你俩，是彼此的老师。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "xc5_s09" },
    { id: "xc5_s08_b", text: "「你儿子会长大，会离开——可你教会他的这个，他会带一辈子。就像你，把『被接住』带了一辈子。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc5_s09" },
  ],
}
```

```ts-dialog
// id: xc5_s09
{
  id: "xc5_s09",
  speaker: "patient",
  text: "（她低头，笑了一下）……我以前，特别怕他长大。怕他长大了，我就没事干了，就又变回那个『什么都不行』的人。现在我有点，不怕了。我教他的东西，会替我陪着他。而我自己，也有我自己，要学的东西。",
  emotion: "neutral",
  autoNext: "xc5_s10",
}
```

```ts-dialog
// id: xc5_s10
{
  id: "xc5_s10",
  speaker: "doctor",
  text: "她开始分一点爱，给自己了。",
  choices: [
    { id: "xc5_s10_a", text: "「『你有你自己要学的东西』——你不再把自己的全部，押在他身上了。你开始，分一点爱，给自己。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc5_s11" },
    { id: "xc5_s10_b", text: "「你想学点什么？除了当妈妈，你想做点，什么给自己？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc5_s11" },
  ],
}
```

```ts-dialog
// id: xc5_s11
{
  id: "xc5_s11",
  speaker: "patient",
  text: "……我以前是新媒体运营，会写文案。我想等他大一点，我试着，把这段日子写下来。不是写我多苦，是写，有个妈妈，半夜坐在飘窗上，被儿子摸了一下脸，忽然就不怕了。我想让别的妈妈看见，她们不是一个人。",
  emotion: "happy",
  autoNext: "xc5_s12",
}
```

```ts-dialog
// id: xc5_s12
{
  id: "xc5_s12",
  speaker: "doctor",
  text: "她想把这份「不怕」，分给别人。",
  choices: [
    { id: "xc5_s12_a", text: "「你想把这份『不怕』，分给别人——你已经，从那个等批卷的小孩，变成给旁人递手的人了。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "xc5_s13" },
    { id: "xc5_s12_b", text: "「你写的时候，是想给谁看？给你自己，还是给那些和你一样的妈妈？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc5_s13" },
  ],
}
```

```ts-dialog
// id: xc5_s13
{
  id: "xc5_s13",
  speaker: "patient",
  text: "……都有。先给我自己。我以前，连给自己写一句『你很好』都不敢。我想先从，给自己写起。写我喂他，写我哄他，写我半夜醒来摸他鼻息——写这些，不用打分，不用满不满分。写下来，就够了。",
  emotion: "calm",
  autoNext: "xc5_s14",
}
```

```ts-dialog
// id: xc5_s14
{
  id: "xc5_s14",
  speaker: "doctor",
  text: "「写下来，就够了」——她把「够好」，从一句等不到的批语，改成了自己写下的字。",
  choices: [
    { id: "xc5_s14_a", text: "「『写下来，就够了』——你把『够好』，从一句等不到的批语，改成了自己写下的字。这就是你，给那场考试，交的卷。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc5_s15" },
    { id: "xc5_s14_b", text: "「你写的第一句话，会是哪句？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc5_s15" },
  ],
}
```

```ts-dialog
// id: xc5_s15
{
  id: "xc5_s15",
  speaker: "patient",
  text: "……就写：你摸我脸那一下，我及格了。你不用批，我自己批。我批：许晨曦，你这辈子，考过很多试，可你第一次，觉得自己行了，是在一个半夜，被你六个月的儿子，摸了一下脸。",
  emotion: "happy",
  autoNext: "xc5_s16",
}
```

```ts-dialog
// id: xc5_s16
{
  id: "xc5_s16",
  speaker: "doctor",
  text: "她第一次，觉得自己行了——不是因为考了第一。",
  choices: [
    { id: "xc5_s16_a", text: "「你第一次，觉得自己行了——不是因为考了第一，是因为，你被爱着，也敢接住那份爱了。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "xc5_s17" },
    { id: "xc5_s16_b", text: "「你儿子摸你那一下，是他爱你的方式——你现在，能接住你自己了吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc5_s17" },
  ],
}
```

```ts-dialog
// id: xc5_s17
{
  id: "xc5_s17",
  speaker: "patient",
  text: "（她看着窗外，阳光照在她脸上）……能了。我现在半夜醒来，不再数他呼吸数到天亮。我摸一下他的脸，他哼哼，我拍拍他，又都睡了。我先生有时候笑我，说我们娘俩，像两只互相蹭的猫。我就想，这日子，挺好的。",
  emotion: "happy",
  autoNext: "xc5_s18",
}
```

```ts-dialog
// id: xc5_s18
{
  id: "xc5_s18",
  speaker: "doctor",
  text: "「这日子，挺好的」——她等了一辈子，才等到自己说出口。",
  choices: [
    { id: "xc5_s18_a", text: "「『这日子挺好的』——这句话，你等了一辈子，才等到自己说出口。」", kind: "empathy", effect: { trust: 0, mood: 2 }, next: "xc5_s19" },
    { id: "xc5_s18_b", text: "「你以前觉得，当妈是场补考——现在你觉得，是什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc5_s19" },
  ],
}
```

```ts-dialog
// id: xc5_s19
{
  id: "xc5_s19",
  speaker: "patient",
  text: "……是过日子。是把他喂饱，把自己也喂饱；是看着他笑，也让自己笑；是我掉眼泪，有人擦，他掉眼泪，我擦。就是一些，很小很小的事。我以前，把所有的力气，都拿去够那个『满分』了，错过了这么多，手边上的好日子。",
  emotion: "calm",
  autoNext: "xc5_s20",
}
```

```ts-dialog
// id: xc5_s20
{
  id: "xc5_s20",
  speaker: "doctor",
  text: "她把手边上的好日子，重新收回来了。",
  choices: [
    { id: "xc5_s20_a", text: "「你把手边上的好日子，重新收回来了——你不是考满分了，你是，好好过日子了。这比满分，难得多，也好得多。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc5_s21" },
    { id: "xc5_s20_b", text: "「手边上这些好日子——你想从哪一件，开始过？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc5_s21" },
  ],
}
```

```ts-dialog
// id: xc5_s21
{
  id: "xc5_s21",
  speaker: "patient",
  text: "（她想了想，笑得很轻）……从明天早上开始吧。他不睡，我就不慌着哄他睡，我陪他玩一会儿。以前我总觉得，他不睡就是我没带好。现在我想，他不睡，可能就是，想跟他妈多待一会儿。那我就，陪他。",
  emotion: "happy",
  autoNext: "xc5_s22",
}
```

```ts-dialog
// id: xc5_s22
{
  id: "xc5_s22",
  speaker: "doctor",
  text: "「那我就陪他」——这是她这场考试，最好的答案。",
  choices: [
    { id: "xc5_s22_a", text: "「『那我就陪他』——这四个字，是你这场考试，最好的答案。带它回家。」", kind: "empathy", effect: { trust: 0, mood: 3 }, next: "xc5_s23" },
    { id: "xc5_s22_b", text: "「你想陪他的时候——你有没有想过，也陪陪你自己？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc5_s23" },
  ],
}
```

```ts-dialog
// id: xc5_s23
{
  id: "xc5_s23",
  speaker: "patient",
  text: "（她站起来，又坐回去）……想过。医生，我这阵子，总算明白了一件事：做 60 分的妈妈，也够好。我不必完美。他会吃，会睡，会长大，会在我怀里笑，会半夜摸我的脸。我只要，好好在这儿，陪着他，就够了。谢谢您，听我说了这么多。谢谢您，没让我一个人，考这场试。",
  emotion: "calm",
  autoNext: "xc_end_cure",
}
```

#### 接纳路径（acceptance）

```ts-dialog
// id: xc5_a01
{
  id: "xc5_a01",
  speaker: "patient",
  text: "（她点点头）……带着它，慢慢走。那个声音可能还会来，半夜孩子一哭，它可能还会说『是不是你不好』。我以前，是想把它赶走。现在我不赶了。它来，我就跟它说一句『我知道了，但我今天，想先抱孩子』。",
  emotion: "neutral",
  autoNext: "xc5_a02",
}
```

```ts-dialog
// id: xc5_a02
{
  id: "xc5_a02",
  speaker: "doctor",
  text: "她没选「战胜」，选了「共处」——这也是往前。",
  choices: [
    { id: "xc5_a02_a", text: "「你没选『战胜』，选了『共处』——那个声音，会慢慢小下去，因为它发现，吓不住你了。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc5_a03" },
    { id: "xc5_a02_b", text: "「它再说『是不是你不好』的时候，你会怎么答它？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc5_a03" },
  ],
}
```

```ts-dialog
// id: xc5_a03
{
  id: "xc5_a03",
  speaker: "patient",
  text: "……我会说：也许吧，也许我今天哪里做得不够好。可这不影响我爱他。我也不用，因为不够好，就不配当他妈妈。我就在这儿，陪着他就好。",
  emotion: "calm",
  autoNext: "xc5_a04",
}
```

```ts-dialog
// id: xc5_a04
{
  id: "xc5_a04",
  speaker: "doctor",
  text: "她把「不够好」和「不配被爱」，分开了。",
  choices: [
    { id: "xc5_a04_a", text: "「你把『不够好』和『不配被爱』，分开了——这是你，这辈子，最值的一刀。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc5_a05" },
    { id: "xc5_a04_b", text: "「你这么说的时候——你心里那个考第二的小孩，还怕吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "xc5_a05" },
  ],
}
```

```ts-dialog
// id: xc5_a05
{
  id: "xc5_a05",
  speaker: "patient",
  text: "（她摇头，声音很轻）……不怎么怕了。她考第二那天，卷子举得不高。可今天，她能跟我儿子说：你不用满分。她举不起卷子，但她能举起她儿子。这就算，交卷了吧。我不用等她妈妈批。我自己批：及格。",
  emotion: "calm",
  autoNext: "xc_end_accept",
}
```

#### 隐藏路径（hidden · 当面放下尺子）

```ts-dialog
// id: xc5_h01
{
  id: "xc5_h01",
  speaker: "patient",
  text: "（她猛地抬头，眼睛睁大）……当面，跟我妈说？医生，我……我这一辈子，都没敢当她的面，说一句重话。我怕她一哭，我就心软；我怕她一句『翅膀硬了』，我就又缩回去。可我……我心里，一直存着这句话。",
  emotion: "scared",
  autoNext: "xc5_h02",
}
```

```ts-dialog
// id: xc5_h02
{
  id: "xc5_h02",
  speaker: "doctor",
  text: "她想当面说——但这件事，不该她一个人扛。",
  choices: [
    { id: "xc5_h02_a", text: "「我陪你，一起想这句话，怎么说。不是去跟她吵，是去把『我自己批及格了』，从你心里，搬到你们俩中间。你不用一个人去。」", kind: "special", effect: { trust: 0, mood: -2 }, next: "xc5_h03" },
    { id: "xc5_h02_b", text: "「你怕她一哭你就心软——可你不去，那句话会一直压着你，也压着她。我们慢慢来。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc5_h04" },
  ],
}
```

```ts-dialog
// id: xc5_h03
{
  id: "xc5_h03",
  speaker: "patient",
  text: "（她闭上眼，好一会儿）……好。我想好了。我去，不是去怪她。我就是想让她知道：妈，你当年没有夸我的那些年，我自己，学会夸自己了。你那一科，你及格了；我这一科，我也及格了。我们俩，都别再，拿尺子过日子了。",
  emotion: "broken",
  autoNext: "xc5_h04",
}
```

```ts-dialog
// id: xc5_h04
{
  id: "xc5_h04",
  speaker: "doctor",
  text: "她要把那句话，从心里，搬到她们俩中间。",
  choices: [
    { id: "xc5_h04_a", text: "「你带着这句话去——不管她接不接得住，你说出来了，那一场考了三十年的试，就交卷了。」", kind: "special", effect: { truth: 3, mood: -2 }, next: "xc_end_hidden" },
    { id: "xc5_h04_b", text: "「你要是觉得还没准备好——就把这句话，先放在这儿。它已经是你的了。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "xc5_h05" },
  ],
}
```

```ts-dialog
// id: xc5_h05
{
  id: "xc5_h05",
  speaker: "patient",
  text: "（她点头，眼里有光）……我先放在这儿。等我哪天，觉得她准备好了，或者我觉得我准备好了，我再去说。反正，这句话，我说给过我自己听了。它是我的了。谁都拿不走。",
  emotion: "calm",
  autoNext: "xc_end_accept",
}
```

#### 恶化路径（worsen）

```ts-dialog
// id: xc4_w01
{
  id: "xc4_w01",
  speaker: "patient",
  text: "（她的脸一下子白下来，声音却出奇地平静）……您也这么说。想太多，矫情。好。那我就是矫情。我儿子半夜醒来，我不去摸他脸了，我去想：别矫情。他哭，我说别哭，像我外婆说的，别丢人。我这就去，把我这辈子，那些想太多，都咽回去。",
  emotion: "broken",
  autoNext: "xc4_w02",
}
```

```ts-dialog
// id: xc4_w02
{
  id: "xc4_w02",
  speaker: "doctor",
  text: "这句话把她推进了「我就是矫情是吧」的坑——她要把刚长出来的那点东西，亲手撕了。",
  choices: [
    { id: "xc4_w02_a", text: "「我不是那个意思——你听我说，你得振作起来，别整天陷在过去里。孩子还小，你要往前看。」", kind: "logic", effect: { trust: -6, defense: 6, mood: -3 }, next: "xc4_w03" },
    { id: "xc4_w02_b", text: "（她已经在气头上。你先别再说话，等着，看她会不会慢慢缓过来。）", kind: "empathy", effect: { trust: -3, mood: -4 }, next: "xc4_w03" },
  ],
}
```

```ts-dialog
// id: xc4_w03
{
  id: "xc4_w03",
  speaker: "patient",
  text: "（她低着头，很长时间）……不用缓了。您说得对，我就是要往前看。我这就回去，把那些育儿视频，全删了。我不哭了，也不查了。我儿子哭，我就把他放下，让他哭够。我妈妈当年，不也这么带的我吗。我这不是，挺好的吗。挺好的。谢谢您今天的时间。",
  emotion: "broken",
  autoNext: "xc_end_worsen",
}
```

---

## 三、结局

```ts-dialog
// id: xc_end_cure
{
  id: "xc_end_cure",
  speaker: "narration",
  text: "〔结局 · 治愈〕",
  isEnding: true,
  endingType: "cure",
  endingTitle: "摸脸那一下，我及格了",
  endingText: "半年后，许晨曦寄来一封信，信里夹着一张照片——她抱着孩子，在小区楼下看月亮，孩子伸手，正摸着她的脸。她说她把那段日子写成了专栏，发在以前的号上，很多妈妈给她留言，说『谢谢你替我说出了心里话』。她说她现在半夜醒来，会先摸摸儿子的脸，再往旁边靠一靠，把她先生叫醒，三个人挤在一起接着睡。信的最后她写：我以前总觉得，当妈是场补考，考不过就还是那个什么都不行的小孩。现在我懂了——我不是考过了，是我终于，允许自己不用考了。",
  endingReward: { doctorReputation: 8, doctorMoney: 300, doctorExp: 50, doctorSanity: 5 },
}
```

```ts-dialog
// id: xc_end_accept
{
  id: "xc_end_accept",
  speaker: "narration",
  text: "〔结局 · 接纳〕",
  isEnding: true,
  endingType: "acceptance",
  endingTitle: "及格，就够了",
  endingText: "许晨曦没有再约新的会谈，但隔一阵会来坐坐。她说那个声音偶尔还会回来，半夜孩子一哭，它还会说『是不是你不好』。她学会了跟它说：也许吧，可我不用满分，我及格就够了。她说她现在会跟孩子说『你不用考第一』，会跟先生说不让他猜，也会偶尔，给她妈妈打个电话，不吵架，只是听听声音。她笑着跟医生说：我这辈子，可能就这样了，带着那个声音，好好过我的日子。这挺好。",
  endingReward: { doctorReputation: 4, doctorMoney: 180, doctorExp: 35, doctorSanity: 6 },
}
```

```ts-dialog
// id: xc_end_hidden
{
  id: "xc_end_hidden",
  speaker: "narration",
  text: "〔结局 · 隐藏·把尺子还给她〕",
  isEnding: true,
  endingType: "hidden",
  endingTitle: "把尺子，还给她",
  endingText: "你陪许晨曦，把那句话反复拟了很多遍。最后她选了一个午后，去见了她妈妈。她说出口的时候，声音在抖：『妈，你当年没夸我的那些年，我自己学会夸自己了。你及格了，我也及格了。咱俩，都别拿尺子过日子了。』她妈妈沉默了很久，说了一句话，她转述给你时，声音还是抖的——『我跟你外婆，也是这么过的。妈对不起你。』她挂了电话，在楼下坐了很久，哭完又笑。她说：我不是想听她道歉，我就是想让她知道，那把尺子，可以放下了。后来她常带儿子回娘家，她妈妈开始学着，只夸，不挑。",
  endingReward: { doctorReputation: -10, doctorMoney: 100, doctorExp: 80, doctorSanity: -15 },
}
```

```ts-dialog
// id: xc_end_worsen
{
  id: "xc_end_worsen",
  speaker: "narration",
  text: "〔结局 · 恶化〕",
  isEnding: true,
  endingType: "worsen",
  endingTitle: "没人接住的那只手",
  endingText: "许晨曦没有再来。她的先生后来转来一条消息：她把所有育儿视频都删了，也学着不哭、不查、不难过。她儿子夜里哭，她就把他放下，让他哭够。她说这是『往前看』。可那阵子，她半夜坐在飘窗上的时间，比以前更长了——她不再摸孩子的鼻息，也不叫醒她先生，就那样坐着，坐到天亮。她的先生说：她看着好好的，可我觉得，她把她自己，关到哪儿去了。那把尺子没有消失，它只是从她妈妈手里，搬到了她自己手里。那个半夜被儿子摸过脸的孩子，终究，还是没有人，接住过她。",
  endingReward: { doctorReputation: -8, doctorMoney: 50, doctorExp: 10, doctorSanity: -20 },
}
```

---

## 六、状态

- [x] 人物档案完整（一句话核心/三层真相/角色三角/症状意义/关键转折）
- [x] 节拍规划表（中档 5 节拍，trust 15→30→45→57→65→70，truth 0→70）
- [x] v3 结构校验通过 + tsc 通过（节点总数 / 医生节点数待转换器统计）
- [x] 走线四线全绿（共情 cure trust=70 rounds=70 / 均衡 cure 2碎片 / 失误 worsen / 探问 cure truth≥70）
- [x] 剧本登记表（由主流程统一登记：新手妈妈的孤独与标准 · 完美幻想）
