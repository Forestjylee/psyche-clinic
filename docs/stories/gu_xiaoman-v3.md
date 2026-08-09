# 顾小满 · v3 · 短剧本 · 4 节拍 · 44 轮

> 短档剧本 · 患者 1：gu_xiaoman 顾小满 · 身材焦虑 · 客体化
> 数值：trust 15→28→40→50→58；truth 0→40；碎片 1 枚 @30；恶化入口 trust≤40；隐藏结局 @50；cure 主线 44 轮
> 生成：`node scripts/md-to-patient.mjs docs/stories/gu_xiaoman-v3.md --walk`

---

## 〇、人物档案

**一句话核心**：把身体当作被爱的入场券，瘦是她的成绩单。

**姓名 / 年龄 / 职业**：顾小满，22 岁，舞蹈专业应届毕业生，正在备考艺考、找舞蹈团的工作。

**来诊渠道**：练功时晕倒被送去校医室，老师发现她长期只吃水煮菜，劝她来心理门诊看看。

**三层真相**：
- 表层（开场就说）：不敢穿合身的衣服，睡前一根根摸自己的肋骨确认「还在瘦」；拒绝晚饭、天天称重。
- 中间层（节拍 2 揭）：舞蹈老师一句「你腰上还有肉」她能当真一整天；男朋友约会总点沙拉；体检被警告营养不良，她笑着说「正常，跳舞的都这样」。
- 深层（节拍 3 揭）：妈妈从小就夸「瘦的才漂亮」「你看人家那腿」，胖等于不被爱——她从小相信，被爱是要靠瘦来挣的。

**角色三角**：施压者 = 舞蹈老师（一把量她合不合格的尺）；情感忽视者 = 妈妈（只夸瘦、从不夸她本身）；被守护者 = 镜子里那个「理想的自己」。

**症状意义**：节食 / 控制进食是她唯一能完全掌控的事——舞跳得好不好由评委说了算，只有瘦是她自己说了算。瘦是她拿身体去换夸奖与「被爱」的入场券。

**关键转折**：某次路过服装店橱窗，看见倒影里瘦到脱相的自己，她突然认不出那是谁。

**写作注意**：不写催吐细节，控制在「不吃晚饭 / 只吃水煮菜 / 反复称重 / 摸肋骨」的尺度。结局偏向身体和解。

---

## 一、剧本元信息（ts-meta）

```ts-meta
// id: gu_xiaoman
// tier: 短
// anchor: 15,28,40,50,58
// truthEnd: 40
// minCureRounds: 40
// fragments: 1
// worsenAtMost: 40
{
  id: "gu_xiaoman",
  name: "顾小满",
  title: "舞蹈应届生 · 练功晕倒 · 被老师劝诊",
  intro: "练功时眼前一黑晕倒，被送去校医室。老师发现她长期只吃水煮菜、睡前摸肋骨数自己还在不在瘦，劝她来心理门诊看看。她答应了，理由是『不想再让老师担心。』",
  surface: "不敢穿合身的衣服，把自己裹在宽松卫衣里。睡前一根根摸自己的肋骨，确认『还在瘦』；拒绝晚饭、天天称重。说话轻声细语，笑起来很标准，好像生怕自己『占地方』。",
  truth: "妈妈从小就夸『瘦的才漂亮』『你看人家那腿』。胖等于不被爱——她从小相信，被爱是要靠瘦来挣的。她把身体当成被爱的入场券，瘦是她唯一确定能拿到的成绩单。",
  palette: { primary: "#c98ba6", secondary: "#e0b7c4", fog: "#8a7a80", bright: "#cfe3d8" },
  baseReward: 650,
  difficulty: "简单",
  startNode: "gx1_start",
  initialState: { trust: 15, defense: 65, mood: 35, truth: 0, round: 0 },
  memoryFragments: [
    {
      id: "gu_m1",
      trigger: { truth: 30 },
      title: "镜子前的妈妈",
      text: "我六七岁吧，站在穿衣镜前面。我妈从后面打量我，眼睛亮了一下，说：『瘦的才漂亮。你看人家那腿。』她夸我的那天，是我唯一记得她笑得那么高兴的一次。我到现在还记得，我想让她多笑几次。",
      emotion: "sad",
    },
  ],
}
```

---

## 二、节拍骨架（ts-dialog 节点）

### 节拍 1 · 初访·表层（trust 15→28，truth 0→22，阻抗：拒绝被当成「有问题的人」）

```ts-dialog
// id: gx1_start
{
  id: "gx1_start",
  speaker: "narration",
  text: "初秋的午后，候诊室的门被轻轻推开。顾小满站在门口，瘦得像一片纸。她穿一件宽松的灰色卫衣，把自己裹得严严实实，只露出一张巴掌大的脸。她抿了抿嘴，小声问了一句，才慢慢走进来坐下。",
  autoNext: "gx1_p01",
}
```

```ts-dialog
// id: gx1_p01
{
  id: "gx1_p01",
  speaker: "patient",
  text: "医生您好。其实我……真没什么事，就是练功的时候眼前一黑，被送去了校医室。我们老师非让我来看看。她怕我身体出问题，耽误了考试。我挺好的，真的。",
  emotion: "anxious",
  autoNext: "gx1_c01",
}
```

```ts-dialog
// id: gx1_c01
{
  id: "gx1_c01",
  speaker: "doctor",
  text: "她开口第一句是「我挺好的」，可声音和笑意都对不上——这具身体在替她说真话。",
  choices: [
    { id: "gx1_c01_a", text: "「你已经坐在这儿了。不急着证明自己没事，我们先坐一会儿，好吗？」", kind: "empathy", effect: { trust: 2, defense: -1 }, next: "gx1_p02" },
    { id: "gx1_c01_b", text: "「『老师怕耽误考试』——她怕的，和你怕的，是一回事吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "gx1_p02" },
    { id: "gx1_c01_c", text: "「低血糖而已，多吃点饭、规律作息就没事了，别小题大做。」", kind: "logic", effect: { trust: -8, defense: 8, mood: -4 }, next: "gx1_r01" },
  ],
}
```

```ts-dialog
// id: gx1_r01
{
  id: "gx1_r01",
  speaker: "patient",
  text: "（她的脸一下子冷下来）你们怎么都这样。我又不是病人，我就是舞者。跳舞的瘦一点怎么了？你们穿不上小码的人，当然不懂我们这行的规矩。",
  emotion: "angry",
  autoNext: "gx1_p02",
}
```

```ts-dialog
// id: gx1_p02
{
  id: "gx1_p02",
  speaker: "patient",
  text: "（她低头抠着袖口，声音放轻了些）……我就是吃得少一点。现在都这样，我们团里比我瘦的多了去了。您真不用为我紧张。",
  emotion: "neutral",
  autoNext: "gx1_c02",
}
```

```ts-dialog
// id: gx1_c02
{
  id: "gx1_c02",
  speaker: "doctor",
  text: "她把「瘦」当成一件要不断核对、不断证明的事。",
  choices: [
    { id: "gx1_c02_a", text: "「你在团里，是不是也习惯把自己排在『比较瘦的那一档』里？」", kind: "empathy", effect: { trust: 1 }, next: "gx1_p03" },
    { id: "gx1_c02_b", text: "（安静地坐着，等她愿意多说一点。）", kind: "silence", effect: { trust: 1 }, next: "gx1_p03" },
  ],
}
```

```ts-dialog
// id: gx1_p03
{
  id: "gx1_p03",
  speaker: "patient",
  text: "（她顿了顿）……说出来有点丢人。我睡前会摸自己的肋骨。一根一根地摸，确认它们还在。要是哪天摸不太出来，我晚上就睡不着了。",
  emotion: "anxious",
  autoNext: "gx1_c03",
}
```

```ts-dialog
// id: gx1_c03
{
  id: "gx1_c03",
  speaker: "doctor",
  text: "睡前摸肋骨——她把身体的骨头，当成了每天要对的账。",
  choices: [
    { id: "gx1_c03_a", text: "「睡不着的时候，你在怕什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "gx1_p04" },
    { id: "gx1_c03_b", text: "「你把『瘦』当成了每天晚上要核对的账本。」", kind: "empathy", effect: { trust: 1 }, next: "gx1_p04" },
    { id: "gx1_c03_c", text: "「你这么年轻，代谢快，不会胖的，别自己吓自己。」", kind: "logic", effect: { trust: -5, defense: 4 }, next: "gx1_p04" },
  ],
}
```

```ts-dialog
// id: gx1_p04
{
  id: "gx1_p04",
  speaker: "patient",
  text: "怕什么……我也说不太清。就是觉得，要是哪天我瘦不动了，我就……就没有资格了。跳舞也好，别的也好，都得先过「瘦」这一关。",
  emotion: "sad",
  autoNext: "gx1_c04",
}
```

```ts-dialog
// id: gx1_c04
{
  id: "gx1_c04",
  speaker: "doctor",
  text: "「过瘦这一关」——她给所有事都设了一道以身体为门票的闸口。",
  choices: [
    { id: "gx1_c04_a", text: "「你觉得『瘦』是入场券——过了这一关，才轮到谈别的。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "gx1_p05" },
    { id: "gx1_c04_b", text: "「这个『资格』，是谁发给你的？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "gx1_p05" },
  ],
}
```

```ts-dialog
// id: gx1_p05
{
  id: "gx1_p05",
  speaker: "patient",
  text: "（她沉默了一会儿）……我妈。我妈从小就跟我说，瘦的才漂亮。我们家亲戚都说，我妈当年是班里最瘦的。她拿这个当了一辈子的骄傲。",
  emotion: "neutral",
  autoNext: "gx1_c05",
}
```

```ts-dialog
// id: gx1_c05
{
  id: "gx1_c05",
  speaker: "doctor",
  text: "妈妈第一次露脸——她手里那把尺，是妈妈递给她的。",
  choices: [
    { id: "gx1_c05_a", text: "「你妈夸过你别的吗？除了瘦。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "gx1_p06" },
    { id: "gx1_c05_b", text: "（不打断，让她自己往下想。）", kind: "silence", effect: { trust: 1 }, next: "gx1_p06" },
  ],
}
```

```ts-dialog
// id: gx1_p06
{
  id: "gx1_p06",
  speaker: "patient",
  text: "（她想了想，声音小下去）……没有。我拿过市里的舞蹈比赛二等奖，她把奖状收起来，还是只说我瘦了好看。好像我这个人，就只有「瘦」这一项是能拿出手的。",
  emotion: "sad",
  autoNext: "gx1_c06",
}
```

```ts-dialog
// id: gx1_c06
{
  id: "gx1_c06",
  speaker: "doctor",
  text: "「只有瘦这一项拿得出手」——她把自己压缩成了一张只有一格的成绩单。",
  choices: [
    { id: "gx1_c06_a", text: "「把瘦当成唯一拿得出手的东西——你拿它换到了什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "gx1_p07" },
    { id: "gx1_c06_b", text: "「听起来，你一直在努力交一份只有『瘦』这一格的成绩单。」", kind: "empathy", effect: { trust: 1 }, next: "gx1_p07" },
  ],
}
```

```ts-dialog
// id: gx1_p07
{
  id: "gx1_p07",
  speaker: "patient",
  text: "换到了……老师对我笑。同学说我是「天生跳舞的料」。我男朋友第一次约我，说他喜欢我「轻得像一片叶子」。你看，瘦是真的有用的。它是我唯一确定能得到的夸奖。",
  emotion: "anxious",
  autoNext: "gx1_c07",
}
```

```ts-dialog
// id: gx1_c07
{
  id: "gx1_c07",
  speaker: "doctor",
  text: "她一口气报出那么多「换到的东西」，可语气里没有一丝高兴。",
  choices: [
    { id: "gx1_c07_a", text: "「『唯一确定能得到的夸奖』——你有没有想过，你得到的到底是夸奖，还是『瘦』这个符号？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "gx1_p08" },
    { id: "gx1_c07_b", text: "「可是你说这些的时候，没有一次是笑着的。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "gx1_p08" },
  ],
}
```

```ts-dialog
// id: gx1_p08
{
  id: "gx1_p08",
  speaker: "patient",
  text: "（她愣了一下）……我没笑吗。我以为我挺高兴的。每次称完体重，数字小了，我心里是松快的。可您这么一说，我想想，好像那些松快……都没留在脸上。",
  emotion: "neutral",
  autoNext: "gx1_c08",
}
```

```ts-dialog
// id: gx1_c08
{
  id: "gx1_c08",
  speaker: "doctor",
  text: "「松快」和「高兴」是两回事——她第一次把这个区别看见。",
  choices: [
    { id: "gx1_c08_a", text: "「松快了一会儿，然后呢？它让你睡好了吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "gx1_p09" },
    { id: "gx1_c08_b", text: "「你习惯了『数字小了就开心』——可这个开关，从来不是你的。」", kind: "empathy", effect: { trust: 1 }, next: "gx1_p09" },
  ],
}
```

```ts-dialog
// id: gx1_p09
{
  id: "gx1_p09",
  speaker: "patient",
  text: "（她垂下眼睛）……然后我就去摸肋骨。摸到了，才觉得安心。其实我知道这样不对。体检的时候，医生说我营养不良，我说「正常，跳舞的都这样」。我当时笑得可自然了。",
  emotion: "sad",
  autoNext: "gx1_c09",
}
```

```ts-dialog
// id: gx1_c09
{
  id: "gx1_c09",
  speaker: "doctor",
  text: "「正常，跳舞的都这样」——她在用这句话，替自己把警报按掉。",
  choices: [
    { id: "gx1_c09_a", text: "「你连『知道自己不对』，都只能笑着带过去。」", kind: "empathy", effect: { trust: 1 }, next: "gx1_p10" },
    { id: "gx1_c09_b", text: "「『跳舞的都这样』——这话你是说给医生听的，还是说给自己听的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "gx1_p10" },
  ],
}
```

```ts-dialog
// id: gx1_p10
{
  id: "gx1_p10",
  speaker: "patient",
  text: "……都有吧。给自己听多了，就成真的了。我有时候看着镜子里那个特别瘦的自己，会觉得很陌生。可我又不敢不瘦。一不瘦，我心里那杆秤就开始抖。",
  emotion: "anxious",
  autoNext: "gx1_c10",
}
```

```ts-dialog
// id: gx1_c10
{
  id: "gx1_c10",
  speaker: "doctor",
  text: "「心里那杆秤」——她自己给症状起了名字。",
  choices: [
    { id: "gx1_c10_a", text: "「那杆秤在你心里抖了多久了？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "gx1_p11" },
    { id: "gx1_c10_b", text: "「它量过你，你量过它吗？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "gx1_p11" },
  ],
}
```

```ts-dialog
// id: gx1_p11
{
  id: "gx1_p11",
  speaker: "patient",
  text: "量……我天天称体重，就是怕它抖。我把它当成天气预报：数字好，我就觉得今天是晴天；数字不好，一整天都是阴的。（她苦笑了一下）听我这么说，是不是挺幼稚的。",
  emotion: "anxious",
  autoNext: "gx1_c11",
}
```

```ts-dialog
// id: gx1_c11
{
  id: "gx1_c11",
  speaker: "doctor",
  text: "「天气预报」——她把自己的心情，全押在了一个数字上。",
  choices: [
    { id: "gx1_c11_a", text: "「不幼稚。你只是把整颗心，都押在了一个数字上。」", kind: "empathy", effect: { mood: 2 }, next: "gx1_out" },
    { id: "gx1_c11_b", text: "「如果有一天，那个数字再也不肯变小了——你打算怎么活？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "gx1_out" },
  ],
}
```

```ts-dialog
// id: gx1_out
{
  id: "gx1_out",
  speaker: "narration",
  text: "第一次会谈结束。顾小满起身时，动作很轻，像怕压坏什么。她走到门口，回过头，犹豫了一下：「……医生，我下周还能来吗？我就是……觉得跟您说这些，比跟谁说都松快。」",
  beatEnd: { resumeNode: "gx2_start" },
  autoNext: "gx2_start",
}
```

### 节拍 2 · 中间层触发（trust 28→40，truth 22→34，[m1 碎片@30]）

```ts-dialog
// id: gx2_start
{
  id: "gx2_start",
  speaker: "narration",
  text: "一周后，顾小满准时来了。这次她穿了一条修身的练功裤，把线条绷得很清楚。坐下的时候，她下意识并拢双腿，又用手去拉裤脚，好像想把自己再收紧一点。",
  autoNext: "gx2_p01",
}
```

```ts-dialog
// id: gx2_p01
{
  id: "gx2_p01",
  speaker: "patient",
  text: "这周我试着……多吃了一点点。就一口饭。结果舞蹈老师一眼就看出来了，说「腰上有肉了」。她是在开玩笑，我知道。可我还是忍不住，那天晚上把晚饭给省了。",
  emotion: "neutral",
  autoNext: "gx2_c01",
}
```

```ts-dialog
// id: gx2_c01
{
  id: "gx2_c01",
  speaker: "doctor",
  text: "「老师说腰上有肉」——一句玩笑，在她这里变成了一张判决书。",
  choices: [
    { id: "gx2_c01_a", text: "「老师说『腰上有肉』——这句话在你这里，是不是比夸你十句都响？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "gx2_p02" },
    { id: "gx2_c01_b", text: "「只是一句玩笑，你就用一顿晚饭去『补』——她话里的分量，你替她称得太重了。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "gx2_p02" },
  ],
}
```

```ts-dialog
// id: gx2_p02
{
  id: "gx2_p02",
  speaker: "patient",
  text: "是……我那天晚上躺床上，一直摸腰上那点肉。其实也没有，可能就是水肿。但我摸到的时候，心里慌得不行。我就爬起来，跳了四十分钟操，才敢睡。",
  emotion: "anxious",
  autoNext: "gx2_c02",
}
```

```ts-dialog
// id: gx2_c02
{
  id: "gx2_c02",
  speaker: "doctor",
  text: "「跳四十分钟操才敢睡」——她用运动惩罚自己，只为了抵消一句玩笑。",
  choices: [
    { id: "gx2_c02_a", text: "「你跳操的时候，心里在跟谁较劲？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "gx2_p03" },
    { id: "gx2_c02_b", text: "（看着她，让她把那股慌乱说完。）", kind: "silence", effect: { trust: 1 }, next: "gx2_p03" },
  ],
}
```

```ts-dialog
// id: gx2_p03
{
  id: "gx2_p03",
  speaker: "patient",
  text: "（她想了想）……跟我自己吧。也跟我妈。我妈要是在，她肯定会说，你看你，一松劲就胖。我得让她放心。也得让老师放心。不然他们都该觉得，我不适合跳舞了。",
  emotion: "sad",
  autoNext: "gx2_c03",
}
```

```ts-dialog
// id: gx2_c03
{
  id: "gx2_c03",
  speaker: "doctor",
  text: "「让所有人都放心」——她把自己活成了一份让渡自己的担保。",
  choices: [
    { id: "gx2_c03_a", text: "「你把自己活成了要让所有人放心的人——可你自己呢？」", kind: "empathy", effect: { trust: 1 }, next: "gx2_p04" },
    { id: "gx2_c03_b", text: "「『不适合跳舞』——这句话为什么这么可怕？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "gx2_p04" },
  ],
}
```

```ts-dialog
// id: gx2_p04
{
  id: "gx2_p04",
  speaker: "patient",
  text: "因为我除了跳舞，什么都不会啊。我练了十四年，从八岁开始。我的腿、我的腰、我的肋骨，都是为跳舞长的。要是哪天它们不合格了，我就……没有我了。",
  emotion: "neutral",
  autoNext: "gx2_c04",
}
```

```ts-dialog
// id: gx2_c04
{
  id: "gx2_c04",
  speaker: "doctor",
  text: "「没有我了」——她把自己的存在，和身体的合格划了等号。",
  choices: [
    { id: "gx2_c04_a", text: "「你把『会跳舞的瘦身体』当成了自己全部的档案——难怪它一点都松动不得。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "gx2_p05" },
    { id: "gx2_c04_b", text: "「『没有我了』——如果你不用瘦去证明，你还会是谁？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "gx2_p05" },
  ],
}
```

```ts-dialog
// id: gx2_p05
{
  id: "gx2_p05",
  speaker: "patient",
  text: "（她沉默了很久）……我不知道。我没想过这个问题。我妈让我学跳舞，我就跳；老师让我减重，我就减。好像从来没有人问过我，我想成为谁。只有我男朋友……约会的时候他总给我点沙拉。",
  emotion: "sad",
  autoNext: "gx2_c05",
}
```

```ts-dialog
// id: gx2_c05
{
  id: "gx2_c05",
  speaker: "doctor",
  text: "「点沙拉」——她连亲密关系里的菜单，都读成了一把尺。",
  choices: [
    { id: "gx2_c05_a", text: "「他给你点沙拉——你从里面听出的是什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "gx2_p06" },
    { id: "gx2_c05_b", text: "「你连男朋友点沙拉，都解读成『他想要我更瘦』。」", kind: "empathy", effect: { trust: 1 }, next: "gx2_p06" },
  ],
}
```

```ts-dialog
// id: gx2_p06
{
  id: "gx2_p06",
  speaker: "patient",
  text: "我……我当然是这么想的。不然他为什么点沙拉？他知道我在意体重，所以迁就我。可有一次我实在馋，想吃块披萨，他说「你再忍忍，快了」。我不知道他说的「快了」是什么意思——是要我等练完，还是等我瘦到某个数字。",
  emotion: "anxious",
  autoNext: "gx2_c06",
}
```

```ts-dialog
// id: gx2_c06
{
  id: "gx2_c06",
  speaker: "doctor",
  text: "「快了」——她在那句话里，听见的不是心疼，是一把伸向自己的尺。",
  choices: [
    { id: "gx2_c06_a", text: "「你在他那句『快了』里，听出的是心疼，还是一把尺？」", kind: "empathy", effect: { trust: 1 }, next: "gx2_p07" },
    { id: "gx2_c06_b", text: "「『快了』——你觉得自己离那个目标，还有多远？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "gx2_p07" },
  ],
}
```

```ts-dialog
// id: gx2_p07
{
  id: "gx2_p07",
  speaker: "patient",
  text: "（她眼睛红了）……我不知道。我越减，越觉得远。体检那天，医生拿着报告，语气很重，说再这样下去，会影响我跳舞。我当时笑了一下，说「正常，跳舞的都这样」。回了家，我在镜子前站了很久，第一次觉得那个镜子里的人，瘦得有点吓人。",
  emotion: "broken",
  autoNext: "gx2_c07",
}
```

```ts-dialog
// id: gx2_c07
{
  id: "gx2_c07",
  speaker: "doctor",
  text: "「镜子里的人瘦得有点吓人」——她的身体，第一次在她面前露出了真相。",
  choices: [
    { id: "gx2_c07_a", text: "「你第一次觉得镜子里的人『吓人』——那一刻你在怕什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "gx2_p08" },
    { id: "gx2_c07_b", text: "「『吓人』这个词，是你身体在跟你喊停。」", kind: "empathy", effect: { trust: 1 }, next: "gx2_p08" },
    { id: "gx2_c07_c", text: "「你就是太焦虑了。年轻人注意点饮食就行，别把体重想得太严重。」", kind: "logic", effect: { trust: -5, defense: 6 }, next: "gx2_p08" },
  ],
}
```

```ts-dialog
// id: gx2_p08
{
  id: "gx2_p08",
  speaker: "patient",
  text: "（她没接话，过了好一会儿才说）……医生，我说件事您别笑我。我每天晚上睡觉前，要把所有衣服的尺码在心里过一遍。小码能穿，我就踏实；要是哪天中码只剩一件，我就觉得天要塌了。我知道这没道理。可控制不住。",
  emotion: "scared",
  autoNext: "gx2_c08",
}
```

```ts-dialog
// id: gx2_c08
{
  id: "gx2_c08",
  speaker: "doctor",
  text: "「尺码安检」——她每天都给自己的存在做一次「是否合格」的检查。",
  choices: [
    { id: "gx2_c08_a", text: "「你每天都在用尺码给自己『安检』——这日子过得多累啊。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "gx2_p09" },
    { id: "gx2_c08_b", text: "「如果有一天，所有衣服都换成中码，你打算怎么跟自己交代？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "gx2_p09" },
  ],
}
```

```ts-dialog
// id: gx2_p09
{
  id: "gx2_p09",
  speaker: "patient",
  text: "（她低下头，声音很轻）……我没想过还能穿中码。我连想都不敢想。我妈会伤心的。她这辈子最骄傲的事，就是把我养得「瘦瘦的好看」。我要是胖了，她就没什么可夸我的了。",
  emotion: "sad",
  autoNext: "gx2_c09",
}
```

```ts-dialog
// id: gx2_c09
{
  id: "gx2_c09",
  speaker: "doctor",
  text: "核心信念开始露头：「不瘦 = 妈妈没得可夸我」。",
  choices: [
    { id: "gx2_c09_a", text: "「所以你不是怕胖，你是怕『妈妈没什么可夸你的了』？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "gx2_p10" },
    { id: "gx2_c09_b", text: "「你把『让妈妈有得夸』，背在了自己身上。可她夸的，从来不是「你」。」", kind: "empathy", effect: { trust: 2, mood: 4 }, next: "gx2_p10" },
  ],
}
```

```ts-dialog
// id: gx2_p10
{
  id: "gx2_p10",
  speaker: "patient",
  text: "（她没说话，把脸埋进手里）……我知道。我知道她夸的是「瘦」，不是我。可我从小到大的那点安全感，就是从「瘦」上长出来的。我想改，可我不知道拿什么去填那个位置。",
  emotion: "neutral",
  autoNext: "gx2_c10",
}
```

```ts-dialog
// id: gx2_c10
{
  id: "gx2_c10",
  speaker: "doctor",
  text: "「拿什么去填那个位置」——这是她第一次愿意把空缺说出来。",
  choices: [
    { id: "gx2_c10_a", text: "「我们先不急着填。你今天就先看清楚：那个位置，是妈妈留的，不是你自己选的。」", kind: "empathy", effect: { mood: 3 }, next: "gx2_p11" },
    { id: "gx2_c10_b", text: "「你心里有没有一个画面，是『不需要瘦也够好』的你自己？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "gx2_p11" },
  ],
}
```

```ts-dialog
// id: gx2_p11
{
  id: "gx2_p11",
  speaker: "patient",
  text: "（她抬起头，声音有点抖）……有一个。很小的时候，我妈带我去公园，我跑在前面，她追不上我，在后头笑着喊「小满，等等我」。那时候她喊的是我的名字，不是我的体重。那个画面，我好久没想起来过了。",
  emotion: "calm",
  autoNext: "gx2_c11",
}
```

```ts-dialog
// id: gx2_c11
{
  id: "gx2_c11",
  speaker: "doctor",
  text: "「她喊的是我的名字，不是我的体重」——她自己找到了那把丢失的钥匙。",
  choices: [
    { id: "gx2_c11_a", text: "「那个跑在前面的小满，她现在还愿意被你看见吗？」", kind: "empathy", effect: { mood: 3 }, next: "gx2_out" },
    { id: "gx2_c11_b", text: "「她喊『小满』的时候，你觉得她爱的是谁？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "gx2_out" },
  ],
}
```

```ts-dialog
// id: gx2_out
{
  id: "gx2_out",
  speaker: "narration",
  text: "第二次会谈结束。顾小满没急着走，她低头看了看自己的手，忽然说：「医生，我好像好久没好好看过自己的手了。」她张开十指，在灯光下看了很久，像在看一个陌生人的。",
  beatEnd: { resumeNode: "gx3_start" },
  autoNext: "gx3_start",
}
```

### 节拍 3 · 深层信念（trust 40→50，truth 34→46，恶化入口 @trust≤40）

```ts-dialog
// id: gx3_start
{
  id: "gx3_start",
  speaker: "narration",
  text: "又一周，顾小满来了。这次她穿的是那件宽松卫衣，但没有把自己裹那么紧。她坐下时，没有先说话，而是把手放在膝盖上，轻轻握了握，像在给自己鼓劲。",
  autoNext: "gx3_p01",
}
```

```ts-dialog
// id: gx3_p01
{
  id: "gx3_p01",
  speaker: "patient",
  text: "这周我试了您说的，睡前摸肋骨的时候，先停三秒再摸。我发现自己……很怕那三秒。好像不马上确认「还在」，就会掉进一个黑窟窿里。",
  emotion: "neutral",
  autoNext: "gx3_c01",
}
```

```ts-dialog
// id: gx3_c01
{
  id: "gx3_c01",
  speaker: "doctor",
  text: "「停三秒就掉进黑窟窿」——她第一次敢描述那个黑洞，而不是用摸肋骨把它盖住。",
  choices: [
    { id: "gx3_c01_a", text: "「那三秒里，你在怕的那个黑窟窿，是什么？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "gx3_p02" },
    { id: "gx3_c01_b", text: "「你敢让自己停三秒去感觉那个怕——这已经是很大的进步了。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "gx3_p02" },
  ],
}
```

```ts-dialog
// id: gx3_p02
{
  id: "gx3_p02",
  speaker: "patient",
  text: "（她声音发紧）……我怕的不是胖。我怕的是，我一旦不瘦，我妈就会失望，老师就会放弃我，男朋友就会走。我怕所有喜欢我的人，喜欢的其实都是「瘦瘦的我」。那他们喜欢的，从来就不是我。",
  emotion: "scared",
  autoNext: "gx3_c02",
}
```

```ts-dialog
// id: gx3_c02
{
  id: "gx3_c02",
  speaker: "doctor",
  text: "她第一次说破：「他们喜欢的不是『我』，是『瘦瘦的我』」。",
  choices: [
    { id: "gx3_c02_a", text: "「如果他们喜欢的真的只是『瘦瘦的你』——那该怕的，到底是他们，还是你？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "gx3_p03" },
    { id: "gx3_c02_b", text: "（让她把这句话在心里放一会儿，不急着接。）", kind: "silence", effect: { trust: 1 }, next: "gx3_p03" },
  ],
}
```

```ts-dialog
// id: gx3_p03
{
  id: "gx3_p03",
  speaker: "patient",
  text: "（她沉默了很久）……您这么一说，我怎么觉得更空了。要是他们爱的真是瘦，那我这些年拼命维持的，是一份「不是给我的」爱。可要是我不瘦，我连这份假的都没有了。我宁可要假的。",
  emotion: "sad",
  autoNext: "gx3_c03",
}
```

```ts-dialog
// id: gx3_c03
{
  id: "gx3_c03",
  speaker: "doctor",
  text: "「宁可要假的」——她被困在「假的」和「没有」之间，进退不得。",
  choices: [
    { id: "gx3_c03_a", text: "「你被逼到只能在『假的』和『没有』之间选——这本身就是最让人心疼的地方。」", kind: "empathy", effect: { trust: 1 }, next: "gx3_p04" },
    { id: "gx3_c03_b", text: "「这份『假的爱』，是从什么时候开始，成了你的保底？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "gx3_p04" },
  ],
}
```

```ts-dialog
// id: gx3_p04
{
  id: "gx3_p04",
  speaker: "patient",
  text: "从小。从我记事起。我妈抱着我，亲戚夸我「小满真白真瘦」，我妈笑得特别开心，把我举起来。我到现在都记得那份开心——因为只要我瘦，就能换来我妈抱着我笑。我想被她抱。",
  emotion: "broken",
  autoNext: "gx3_c04",
}
```

```ts-dialog
// id: gx3_c04
{
  id: "gx3_c04",
  speaker: "doctor",
  text: "「瘦 = 妈妈的抱」——她七岁的推理，到今天还在运行。",
  choices: [
    { id: "gx3_c04_a", text: "「你想被她抱——可你记得的所有『抱』，都是瘦换来的。你心里那个小孩，一直在用身体讨好妈妈。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "gx3_p05" },
    { id: "gx3_c04_b", text: "「她抱你的时候，她看见的是你，还是『瘦』这个功劳？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "gx3_p05" },
    { id: "gx3_c04_c", text: "「你都二十二了，还那么在意你妈的一句话，幼稚不幼稚。」", kind: "confront", effect: { trust: -3, defense: 5 }, next: "gx3_p05" },
  ],
}
```

```ts-dialog
// id: gx3_p05
{
  id: "gx3_p05",
  speaker: "patient",
  text: "（她猛地抬头，又缓缓低下去）……我是不是太没用了。别人都为梦想努力，我天天盯着体重秤。我知道这没出息，可我真的怕。我怕我一停下来，那个「瘦」给我的全部东西——被夸、被选上、被喜欢——就全塌了。",
  emotion: "scared",
  autoNext: "gx3_c05",
}
```

```ts-dialog
// id: gx3_c05
{
  id: "gx3_c05",
  speaker: "doctor",
  text: "「怕全塌了」——她把自己整个人生的承重，压在了「瘦」这一根梁上。",
  choices: [
    { id: "gx3_c05_a", text: "「『全部东西』——你数过吗？除了这些，你手里还有什么是塌不了的？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "gx3_p06" },
    { id: "gx3_c05_b", text: "「你不是没用。你是把一棵大树的重量，全押在了『瘦』这一根细细的枝上。」", kind: "empathy", effect: { trust: 2, mood: 4 }, next: "gx3_p06" },
  ],
}
```

```ts-dialog
// id: gx3_p06
{
  id: "gx3_p06",
  speaker: "patient",
  text: "（她愣了一下）……我没数过。我好像从来没想过，除了瘦，我还有什么是自己的。我跳舞好，是因为我练得久，可一上场，我脑子里全是「这段动作会不会显胖」……您说，我是不是连跳舞都没为自己跳过？",
  emotion: "neutral",
  autoNext: "gx3_c06",
}
```

```ts-dialog
// id: gx3_c06
{
  id: "gx3_c06",
  speaker: "doctor",
  text: "「连跳舞都没为自己跳过」——她自己把这个发现说破了。",
  choices: [
    { id: "gx3_c06_a", text: "「你上一次纯粹为了『跳得开心』跳舞，是什么时候？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "gx3_p07" },
    { id: "gx3_c06_b", text: "（不打断她，让她自己回到那个画面。）", kind: "silence", effect: { trust: 1 }, next: "gx3_p07" },
  ],
}
```

```ts-dialog
// id: gx3_p07
{
  id: "gx3_p07",
  speaker: "patient",
  text: "（她想了很久，眼泪慢慢掉下来）……是小时候。那时候我瘦，但我不在乎瘦。我在乎的是转起来裙子能飞起来，是音乐响起来的时候浑身发麻。不知道从什么时候起，跳舞变成了考试，我的身体变成了考卷。",
  emotion: "sad",
  autoNext: "gx3_c07",
}
```

```ts-dialog
// id: gx3_c07
{
  id: "gx3_c07",
  speaker: "doctor",
  text: "「跳舞变成了考试，身体变成了考卷」——她给痛苦找到了最准的话。",
  choices: [
    { id: "gx3_c07_a", text: "「你的身体替你扛了这份考卷扛了十几年——它今天在跟你说，它累了。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "gx3_p08" },
    { id: "gx3_c07_b", text: "「如果身体是一张考卷，那出题的人，从头到尾是不是只有你妈一个？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "gx3_p08" },
  ],
}
```

```ts-dialog
// id: gx3_p08
{
  id: "gx3_p08",
  speaker: "patient",
  text: "（她吸了吸鼻子，声音稳下来一点）……好像是。我考了十几年，考卷上每一格都是我身体的一部分——腰、腿、肋骨、尺码。我拿它们去换她的笑，去换老师的点头，去换别人「看一眼就喜欢」。可我从来没问过它们，累不累。",
  emotion: "calm",
  autoNext: "gx3_c08",
}
```

```ts-dialog
// id: gx3_c08
{
  id: "gx3_c08",
  speaker: "doctor",
  text: "「从来没问过它们累不累」——她第一次把身体当成『它们』，而不是『它』。",
  choices: [
    { id: "gx3_c08_a", text: "「那你现在问它们一句：为了换来那些，它们付了多少？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "gx3_p09" },
    { id: "gx3_c08_b", text: "（安静地陪着她，等她把这句问话放在心里。）", kind: "empathy", effect: { mood: 2 }, next: "gx3_p09" },
  ],
}
```

```ts-dialog
// id: gx3_p09
{
  id: "gx3_p09",
  speaker: "patient",
  text: "（她把手放在自己心口，轻轻按了按）……我听见了。它们说：为了换那一句夸奖，我们把整条命都押进去了。医生，我不想这样了。可我好怕，我不瘦了，就真的没有人要我了。",
  emotion: "broken",
  autoNext: "gx3_c09",
}
```

```ts-dialog
// id: gx3_c09
{
  id: "gx3_c09",
  speaker: "doctor",
  text: "「我不想这样了」——这是她整场第一次主动说出想改变。",
  choices: [
    { id: "gx3_c09_a", text: "「『不想这样了』——这句话，比你体重秤上任何一个数字都重。」", kind: "empathy", effect: { mood: 3 }, next: "gx3_p10" },
    { id: "gx3_c09_b", text: "「『没有人要我』——你确定那是事实，还是你妈教你的那句台词？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "gx3_p10" },
  ],
}
```

```ts-dialog
// id: gx3_p10
{
  id: "gx3_p10",
  speaker: "patient",
  text: "（她攥着衣角，声音发抖）……可我真改不动啊。我一看见体重秤往上跳，整个人就垮了。医生，您说，我这辈子是不是就得被这台秤牵着走了？",
  emotion: "scared",
  autoNext: "gx3_c10",
}
```

```ts-dialog
// id: gx3_c10
{
  id: "gx3_c10",
  speaker: "doctor",
  text: "「被一台秤牵着走」——她第一次把问题对准了那台秤，而不是自己。",
  choices: [
    { id: "gx3_c10_a", text: "「你可以怕。怕不是错。今天你已经敢摸着心口说『不想这样了』——这句话，比秤上任何一个数字都重。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "gx3_p11" },
    { id: "gx3_c10_b", text: "「『没人要我』——你确定那是事实，还是你妈念了一辈子的那句台词？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "gx3_p11" },
    { id: "gx3_c10_c", text: "「你要真想改变，就别整天想这些有的没的，先把你那晚饭吃了。」", kind: "logic", require: { trustAtMost: 40 }, effect: { trust: -10, defense: 10 }, next: "gx3_w01", hint: "仅信任≤40 时可见" },
  ],
}
```

```ts-dialog
// id: gx3_p11
{
  id: "gx3_p11",
  speaker: "patient",
  text: "（她抬起头，眼睛亮了一下）……台词。我从来没想过它是台词。我妈念了一辈子，我也跟着念了一辈子，把它当成了人生手册。今天您这么一说，我怎么觉得……我手里的手册，其实从来没写上过我的名字。",
  emotion: "calm",
  autoNext: "gx3_c11",
}
```

```ts-dialog
// id: gx3_c11
{
  id: "gx3_c11",
  speaker: "doctor",
  text: "「手册上从来没写过我的名字」——她把核心信念亲手拆开了。",
  choices: [
    { id: "gx3_c11_a", text: "「那本手册不是你的。从今天起，你可以试着用自己的声音，给自己写一句新的。」", kind: "empathy", effect: { mood: 4 }, next: "gx3_out" },
    { id: "gx3_c11_b", text: "「如果给你一次机会，你会在那本手册的扉页上，写一句什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "gx3_out" },
  ],
}
```

```ts-dialog
// id: gx3_out
{
  id: "gx3_out",
  speaker: "narration",
  text: "第三次会谈结束。顾小满走之前，在门口停了一下，忽然笑了：「医生，我今天进来的时候，没先摸肋骨。我是走楼梯上来的，六层。好像也没那么累。」",
  beatEnd: { resumeNode: "gx4_start" },
  autoNext: "gx4_start",
}
```

```ts-dialog
// id: gx3_w01
{
  id: "gx3_w01",
  speaker: "patient",
  text: "（她沉默了很久，声音很冷）……您也这么说。我妈这么说，老师这么说，现在您也这么说。行，那我知道了，我就是矫情，连顿饭都吃不明白。",
  emotion: "broken",
  autoNext: "gx3_w02",
}
```

```ts-dialog
// id: gx3_w02
{
  id: "gx3_w02",
  speaker: "doctor",
  text: "「连顿饭都吃不明白」——她把你的一句话，听成了又一张判决书。",
  choices: [
    { id: "gx3_w02_a", text: "「我不是这个意思，我是说，你得先照顾好身体……算了，你自己看着办吧。」", kind: "logic", effect: { trust: -6, defense: 6 }, next: "gx3_w03" },
    { id: "gx3_w02_b", text: "（她显然已经不想听了。你道歉，然后试着补救。）", kind: "empathy", effect: { trust: -3, mood: -4 }, next: "gx3_w03" },
  ],
}
```

```ts-dialog
// id: gx3_w03
{
  id: "gx3_w03",
  speaker: "patient",
  text: "……不用补救了。我本来就没指望谁。反正从小到大，也没人真觉得我能好。谢谢您今天的时间，就到这儿吧。",
  emotion: "broken",
  autoNext: "gx3_w04",
}
```

```ts-dialog
// id: gx3_w04
{
  id: "gx3_w04",
  speaker: "doctor",
  text: "她站起身，你却不知道该不该拦。",
  choices: [
    { id: "gx3_w04_a", text: "「至少把下一次的时间约上——就当给我一个机会。」", kind: "empathy", effect: { trust: -2, mood: -3 }, next: "gx3_w05" },
    { id: "gx3_w04_b", text: "「你要是真不想来，我也没办法。」", kind: "logic", effect: { trust: -6, defense: 6 }, next: "gx3_w05" },
  ],
}
```

```ts-dialog
// id: gx3_w05
{
  id: "gx3_w05",
  speaker: "patient",
  text: "（她没有回头）……不用了。我想一个人待着。医生，谢谢您的好意。就这样吧。",
  emotion: "broken",
  autoNext: "gx_end_worsen",
}
```

### 节拍 4 · 转向 + 结局（trust 50→58，cure 主线分叉 + 安全网）

```ts-dialog
// id: gx4_start
{
  id: "gx4_start",
  speaker: "narration",
  text: "两周后是最后一次会谈。顾小满进来的时候，脸色比上次好一些，但坐下没多久，她就说起了那件事——她说她路过一家服装店的橱窗，玻璃映出一个人影，瘦得有点脱相，颧骨支棱着。她站在那儿看了半天，才认出来那是自己。",
  autoNext: "gx4_p01",
}
```

```ts-dialog
// id: gx4_p01
{
  id: "gx4_p01",
  speaker: "patient",
  text: "（她说得很慢，像在复述一件还不确定真假的事）……我认不出来。那是我的脸，可我不认识她。我站在原地，看了她很久，心里就一句话：你怎么把自己活成这样了。可我没骂她，我就是……挺心疼她的。",
  emotion: "sad",
  autoNext: "gx4_fork",
}
```

```ts-dialog
// id: gx4_fork
{
  id: "gx4_fork",
  speaker: "doctor",
  text: "「挺心疼她」——这是她第一次用「她」，而不是「它」来说自己的身体。走到这里，有一条分岔需要她选择。",
  choices: [
    { id: "gx4_fork_a", text: "「我们来做最后一件『把身体还给自己』的事：列一张清单——允许自己好好吃饭的事、紧急联系人、你和我都知道的『快撑不住』的信号。让安全网先替你兜着。」", kind: "special", effect: { trust: 1, mood: 2 }, next: "gx4_s01" },
    { id: "gx4_fork_b", text: "「你不用逼自己今天就『想通』。能对镜子里那个人说一句『挺心疼你』，已经是很深的和解了。」", kind: "empathy", effect: { trust: 1 }, next: "gx4_a01" },
    { id: "gx4_fork_c", text: "「你妈从小教你『瘦才配被爱』。今天，我想替那个站在橱窗前认不出自己的女孩说一次：她已经够好了。」", kind: "confront", require: { trust: 50 }, effect: { trust: 1, truth: 3 }, next: "gx4_h01", hint: "需要信任≥50" },
  ],
}
```

#### 安全网路径（cure 主线）

```ts-dialog
// id: gx4_s01
{
  id: "gx4_s01",
  speaker: "patient",
  text: "（她低头看那张空白清单，笔尖悬着）……「允许自己好好吃饭」。我长这么大，吃饭一直是要「配得上」的——考好了才能多吃，练得好才配吃口好的。还没人跟我说过，吃饭不用挣。",
  emotion: "neutral",
  autoNext: "gx4_s02",
}
```

```ts-dialog
// id: gx4_s02
{
  id: "gx4_s02",
  speaker: "doctor",
  text: "「吃饭不用挣」——她第一次听到这句话，愣了很久。",
  choices: [
    { id: "gx4_s02_a", text: "「吃饭不用挣。你本来就有资格吃饱——这不是奖励，是底线。」", kind: "empathy", effect: { trust: 1 }, next: "gx4_s03" },
    { id: "gx4_s02_b", text: "「你小时候，是不是连吃饭都要先看我妈的脸色？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "gx4_s03" },
  ],
}
```

```ts-dialog
// id: gx4_s03
{
  id: "gx4_s03",
  speaker: "patient",
  text: "（她点点头）……我妈会看着我的碗，说「差不多行了，别吃太多，晚上还要练」。我那时候不懂，为什么吃饭还要被管着。现在我明白了，她不是管饭，她是管我的身体。她把我的身体，管成了她的作品。",
  emotion: "sad",
  autoNext: "gx4_s04",
}
```

```ts-dialog
// id: gx4_s04
{
  id: "gx4_s04",
  speaker: "doctor",
  text: "「她的作品」——她看清了身体被谁攥在手里。",
  choices: [
    { id: "gx4_s04_a", text: "「你的身体是她的作品，不是你自己的家——这种感觉，你不必再一个人扛着。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "gx4_s05" },
    { id: "gx4_s04_b", text: "「那你的身体，什么时候开始是『你的』？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "gx4_s05" },
  ],
}
```

```ts-dialog
// id: gx4_s05
{
  id: "gx4_s05",
  speaker: "patient",
  text: "（她想了很久）……就现在吧。就刚才，我说「它累了」的时候，我觉得我好像第一次跟它站在同一边。以前都是我在上面管着它，它在下头听我的。现在我想……跟它握个手。",
  emotion: "calm",
  autoNext: "gx4_s06",
}
```

```ts-dialog
// id: gx4_s06
{
  id: "gx4_s06",
  speaker: "doctor",
  text: "「跟它握个手」——她不再指挥身体，开始把它当成同一边的人。",
  choices: [
    { id: "gx4_s06_a", text: "「你不需要再指挥它了。你可以听它的：饿的时候吃，累的时候歇，疼的时候停下来。」", kind: "empathy", effect: { trust: 1 }, next: "gx4_s07" },
    { id: "gx4_s06_b", text: "「如果它现在开口，你最想让它先告诉你什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "gx4_s07" },
  ],
}
```

```ts-dialog
// id: gx4_s07
{
  id: "gx4_s07",
  speaker: "patient",
  text: "（她轻声说）……它会告诉我，其实它没有那么喜欢那些水煮菜。它想尝一口热汤面，想闻闻街角那家店的油条香。以前我不敢听，怕一听就收不住。现在我有点想……试着听一次。",
  emotion: "calm",
  autoNext: "gx4_s08",
}
```

```ts-dialog
// id: gx4_s08
{
  id: "gx4_s08",
  speaker: "doctor",
  text: "「想尝一口热汤面」——身体的声音，第一次被她放进来。",
  choices: [
    { id: "gx4_s08_a", text: "「那就去听。明天早上，你可以允许自己，吃一顿『不用挣』的早饭。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "gx4_s09" },
    { id: "gx4_s08_b", text: "「你怕『收不住』——怕的到底是一碗面，还是收不住之后那个不瘦的自己？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "gx4_s09" },
  ],
}
```

```ts-dialog
// id: gx4_s09
{
  id: "gx4_s09",
  speaker: "patient",
  text: "（她沉默了一会儿，眼泪落下来）……都有。我怕我不瘦了，我妈就不抱我了。可我今天站在镜子前，看着那个脱相的自己，忽然想：要是我妈看到她现在这样，她会心疼吗？还是只会说「再瘦点」？我不知道。但我想，总得有人先心疼她。那个人不该是我妈，也不该是老师。该是我。",
  emotion: "sad",
  autoNext: "gx4_s10",
}
```

```ts-dialog
// id: gx4_s10
{
  id: "gx4_s10",
  speaker: "doctor",
  text: "「该是我」——她等了二十二年，终于等到这句话从自己嘴里说出来。",
  choices: [
    { id: "gx4_s10_a", text: "「『该是我』——你等了二十二年，终于等到这句话从你自己嘴里说出来。」", kind: "empathy", effect: { trust: 1 }, next: "gx4_s11" },
    { id: "gx4_s10_b", text: "「你打算怎么疼她？从第一件小事开始。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "gx4_s11" },
  ],
}
```

```ts-dialog
// id: gx4_s11
{
  id: "gx4_s11",
  speaker: "patient",
  text: "（她擦掉眼泪，声音稳下来）……从今天开始，睡前摸肋骨的时候，我不数它们了。我跟它们说一声「辛苦了」，然后把手放下来。还有，我明天约了朋友吃火锅。她会惊讶的，我知道。但我想试一次。",
  emotion: "calm",
  autoNext: "gx4_s12",
}
```

```ts-dialog
// id: gx4_s12
{
  id: "gx4_s12",
  speaker: "doctor",
  text: "「说一声辛苦了，然后把手放下来」——这是她给身体的第一份礼物。",
  choices: [
    { id: "gx4_s12_a", text: "「你给身体的第一份礼物，不是减肥计划，是晚安。」", kind: "empathy", effect: { trust: 1 }, next: "gx4_s13" },
    { id: "gx4_s12_b", text: "「朋友惊讶的时候，你打算怎么跟她说？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "gx4_s13" },
  ],
}
```

```ts-dialog
// id: gx4_s13
{
  id: "gx4_s13",
  speaker: "patient",
  text: "我就跟她说，我最近在学着跟自己的身体做朋友。她要笑话我，我就说，那你也跟你自己的胃做做朋友，它都跟了你三十年了。（她笑了一下）说完我自己都觉得，好像没那么难。",
  emotion: "calm",
  autoNext: "gx4_s14",
}
```

```ts-dialog
// id: gx4_s14
{
  id: "gx4_s14",
  speaker: "doctor",
  text: "「跟身体做朋友」——她学会拿自己的身体开玩笑了。",
  choices: [
    { id: "gx4_s14_a", text: "「你都能拿自己的身体开玩笑了——它听见了，会松一大口气的。」", kind: "empathy", effect: { mood: 3 }, next: "gx4_s15" },
    { id: "gx4_s14_b", text: "「以后上了秤，数字不好看的时候，你打算怎么跟自己说？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "gx4_s15" },
  ],
}
```

```ts-dialog
// id: gx4_s15
{
  id: "gx4_s15",
  speaker: "patient",
  text: "（她想了想）……就跟它说：哦，今天你是这个数字啊。没关系，我今天该吃吃，该练练。你只是我身体的一个数据，不是我的成绩单。说完这句，我就去干别的事，不让它杵在我脑子里过一整天。",
  emotion: "neutral",
  autoNext: "gx4_s16",
}
```

```ts-dialog
// id: gx4_s16
{
  id: "gx4_s16",
  speaker: "doctor",
  text: "「数据不是成绩单」——她正在用新的话，替换那本旧手册。",
  choices: [
    { id: "gx4_s16_a", text: "「『数据不是成绩单』——这句话，你可以记一辈子。它比秤上的数字管用多了。」", kind: "empathy", effect: { mood: 3 }, next: "gx4_s17" },
    { id: "gx4_s16_b", text: "「你觉得，你妈这辈子还能听见你这句话吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "gx4_s17" },
  ],
}
```

```ts-dialog
// id: gx4_s17
{
  id: "gx4_s17",
  speaker: "patient",
  text: "（她低头，声音很轻）……我不知道。她可能永远也听不进去。但我已经不再等她那句夸奖了。以前我靠她的眼光活着，现在……我想先让那个橱窗里的女孩，好好吃一顿饭。",
  emotion: "calm",
  autoNext: "gx4_s18",
}
```

```ts-dialog
// id: gx4_s18
{
  id: "gx4_s18",
  speaker: "doctor",
  text: "「不再等她那句夸奖了」——她开始松开那只攥了二十二年的手。",
  choices: [
    { id: "gx4_s18_a", text: "「你不再等她那句夸奖了——这是你跟自己和解的第一步，也是最后一步。」", kind: "empathy", effect: { mood: 3 }, next: "gx4_s19" },
    { id: "gx4_s18_b", text: "「如果能对十八岁的自己说一句话，你会说什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "gx4_s19" },
  ],
}
```

```ts-dialog
// id: gx4_s19
{
  id: "gx4_s19",
  speaker: "patient",
  text: "（她笑了，眼睛亮亮的）……我会说：小满，你不用瘦到那个数字，也值得被好好对待。你跳舞的样子，比你的体重好看多了。（她顿了顿）这句话，我也说给现在的我自己听。",
  emotion: "happy",
  autoNext: "gx4_s20",
}
```

```ts-dialog
// id: gx4_s20
{
  id: "gx4_s20",
  speaker: "doctor",
  text: "「我跳舞的样子，比体重好看多了」——她自己写出了那本手册的新扉页。",
  choices: [
    { id: "gx4_s20_a", text: "「从『摸肋骨确认还在』，到『摸心口跟身体握手』——你这一路，走得比任何一支舞都长。」", kind: "empathy", effect: { mood: 4 }, next: "gx4_s21" },
    { id: "gx4_s20_b", text: "「回去之后，第一顿『不用挣』的饭，你打算吃什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "gx4_s21" },
  ],
}
```

```ts-dialog
// id: gx4_s21
{
  id: "gx4_s21",
  speaker: "patient",
  text: "（她认真地想了想）……我跟我妈视频的时候，让她看看我吃饭。不是给她证明什么，是我想让她知道：你的女儿，开始喂饱自己了。她要是皱眉，我就说，妈，我挺好的，真的。这一次我说「我挺好的」，是认真的。",
  emotion: "happy",
  autoNext: "gx_end_cure",
}
```

#### 接纳路径（acceptance）

```ts-dialog
// id: gx4_a01
{
  id: "gx4_a01",
  speaker: "patient",
  text: "（她点点头，声音很轻）……和解。这个词我听进去了。我没法一下子不摸肋骨，也没法一下子不称体重。但我可以……先试着不骂它们。跟它们说一声「你们辛苦了」。",
  emotion: "neutral",
  autoNext: "gx4_a02",
}
```

```ts-dialog
// id: gx4_a02
{
  id: "gx4_a02",
  speaker: "doctor",
  text: "她没有选「战胜」，而是选了「和解」——这也是一种向前。",
  choices: [
    { id: "gx4_a02_a", text: "「先从『不骂它们』开始——让身体知道你站在它这边。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "gx4_a03" },
    { id: "gx4_a02_b", text: "「下次那杆秤又抖起来的时候，你会怎么跟它说？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "gx4_a03" },
  ],
}
```

```ts-dialog
// id: gx4_a03
{
  id: "gx4_a03",
  speaker: "patient",
  text: "（她想了想）……我就跟它说：我知道你在替我看门，怕我变回没人要的样子。可我不想再让你看门了。我想自己开门。说多了，它好像真的会安静一点。",
  emotion: "calm",
  autoNext: "gx4_a04",
}
```

```ts-dialog
// id: gx4_a04
{
  id: "gx4_a04",
  speaker: "doctor",
  text: "「我想自己开门」——她从那杆秤手里，把钥匙拿回来了一点。",
  choices: [
    { id: "gx4_a04_a", text: "「那杆秤会安静一点——不是因为你赢了它，是因为你不再只靠它活着了。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "gx4_a05" },
    { id: "gx4_a04_b", text: "「如果有一天它真的不抖了，你打算拿省下来的力气做什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "gx4_a05" },
  ],
}
```

```ts-dialog
// id: gx4_a05
{
  id: "gx4_a05",
  speaker: "patient",
  text: "（她想了想，第一次笑得有点放松）……跳一支不为谁跳的舞。就我自己，在排练厅，关着灯。想转多少圈转多少圈，不用管哪段显胖。就为这个，我也得学着把那杆秤放下一点。",
  emotion: "calm",
  autoNext: "gx_end_accept",
}
```

#### 隐藏路径（hidden · 替她说一次）

```ts-dialog
// id: gx4_h01
{
  id: "gx4_h01",
  speaker: "patient",
  text: "（她愣住了，半晌没说话。然后她的眼睛红了）……从来没有人替她说过这句话。我自己，也从来没对自己说过。您替她……替我说了。",
  emotion: "broken",
  autoNext: "gx4_h02",
}
```

```ts-dialog
// id: gx4_h02
{
  id: "gx4_h02",
  speaker: "doctor",
  text: "「她已经够好了」——这句话替橱窗前的那个女孩说了出口。但接下来，有个更重的决定需要你面对。",
  choices: [
    { id: "gx4_h02_a", text: "「我打算联系你妈妈。有些话，不该只有你一个人记得——她当年那句『瘦的才漂亮』，也该有人替你说破。」", kind: "special", effect: { mood: -3 }, next: "gx4_h03" },
    { id: "gx4_h02_b", text: "「我们先把这句话放在这儿，等你准备好再说。」", kind: "empathy", effect: { trust: 1 }, next: "gx4_h05" },
  ],
}
```

```ts-dialog
// id: gx4_h03
{
  id: "gx4_h03",
  speaker: "patient",
  text: "（她的声音发抖）联系我妈？您……您要跟我妈谈那面镜子的事？医生，我怕。我这一辈子，都在躲那面镜子。我怕她看见现在的我，还是只会说「再瘦点」。",
  emotion: "scared",
  autoNext: "gx4_h04",
}
```

```ts-dialog
// id: gx4_h04
{
  id: "gx4_h04",
  speaker: "doctor",
  text: "她害怕，但这一次，她愿意让你扶着她走向那面镜子。",
  choices: [
    { id: "gx4_h04_a", text: "「你怕，是因为你一个人在那面镜子前站了二十二年。现在你二十二岁，身后有我。」", kind: "special", effect: { truth: 3, mood: -2 }, next: "gx_end_hidden" },
    { id: "gx4_h04_b", text: "「我们先不急着谈。把这句话放在心里，等你觉得能开口的那天，我们再说。」", kind: "empathy", effect: { trust: 1 }, next: "gx4_h05" },
  ],
}
```

```ts-dialog
// id: gx4_h05
{
  id: "gx4_h05",
  speaker: "patient",
  text: "（她垂下眼睛）……好。等我觉得能说的时候，我再跟您说。谢谢您没有逼我。也谢谢您……替她说了那句话。",
  emotion: "neutral",
  autoNext: "gx_end_accept",
}
```

---

## 三、结局

```ts-dialog
// id: gx_end_cure
{
  id: "gx_end_cure",
  speaker: "narration",
  text: "〔结局 · 治愈〕",
  isEnding: true,
  endingType: "cure",
  endingTitle: "小满，吃饱了",
  endingText: "两个月后，顾小满来信。她没有瘦，也没有胖——她第一次觉得「体重」两个字不是判决书了。她说她现在偶尔还是会看一眼镜子，但已经不再只数肋骨。她跟舞蹈团请了假，去吃了一顿热腾腾的火锅，拍照发了朋友圈，配文是「今天，小满吃饱了」。她说：我以前用瘦去换爱，换得那么用力。现在我明白了，爱不是挣来的，是长出来的。",
  endingReward: { doctorReputation: 8, doctorMoney: 300, doctorExp: 50, doctorSanity: 5 },
}
```

```ts-dialog
// id: gx_end_accept
{
  id: "gx_end_accept",
  speaker: "narration",
  text: "〔结局 · 接纳〕",
  isEnding: true,
  endingType: "acceptance",
  endingTitle: "跟身体做朋友",
  endingText: "顾小满没有再约新的会谈，但她会隔一阵子来坐一会儿，跟你聊几句。她说她还没办法完全放下那杆秤，但已经开始学着在称完体重之后，跟自己说一句「今天你辛苦了」。她回了趟家，妈妈又说她瘦了好看，她没接话，只是给自己盛了第二碗饭。她说：我可能这辈子都等不到她夸我别的了，但没关系，我已经开始自己夸自己了。",
  endingReward: { doctorReputation: 4, doctorMoney: 180, doctorExp: 35, doctorSanity: 6 },
}
```

```ts-dialog
// id: gx_end_hidden
{
  id: "gx_end_hidden",
  speaker: "narration",
  text: "〔结局 · 隐藏·那面镜子〕",
  isEnding: true,
  endingType: "hidden",
  endingTitle: "那面镜子",
  endingText: "你约了顾小满的母亲。她坐在你对面，听说女儿「睡前摸肋骨、不吃晚饭、在橱窗前认不出自己」时，先是一脸不解：「跳舞的不都这样吗？」你复述了她那句「瘦的才漂亮」，她沉默了很久，忽然说：「我是为她好啊。」后来，顾小满给你发了条消息：她妈那天晚上给她打了电话，没夸她瘦，只问她「最近吃得好不好」。她说她举着电话，在阳台上哭了一场。母女俩没有和解，但那天晚上，她第一次觉得，妈妈的声音里除了「作品」，也有了一点「女儿」。",
  endingReward: { doctorReputation: -10, doctorMoney: 100, doctorExp: 80, doctorSanity: -15 },
}
```

```ts-dialog
// id: gx_end_worsen
{
  id: "gx_end_worsen",
  speaker: "narration",
  text: "〔结局 · 恶化〕",
  isEnding: true,
  endingType: "worsen",
  endingTitle: "那台没人停下来的秤",
  endingText: "顾小满没有再来。舞蹈老师后来转来一条消息：她在排练厅晕倒，被送进了医院。医生说她的身体已经到了撑不住的地步，让她先休养半年。她给老师发消息说「对不起，我又给你们添麻烦了」。那面橱窗的玻璃还亮着，只是再没人站在前面，认不出那个瘦到脱相的倒影了。",
  endingReward: { doctorReputation: -8, doctorMoney: 50, doctorExp: 10, doctorSanity: -20 },
}
```

---

## 六、状态

- [x] v3 机器可解析格式（ts-meta + ts-dialog 全部就位）
- [x] trust 锚点 15→28→40→50→58；truth 0→40；碎片 1 枚 @30
- [x] 恶化入口 @trust≤40（gx3_c10_c）；隐藏结局 @trust50（gx4_fork_c）
- [x] cure 主线 44 轮（4 节拍各 11 轮）
- [x] 转换器生成 + 走线验收（`node scripts/md-to-patient.mjs docs/stories/gu_xiaoman-v3.md --walk`）
