# 白兰 · v3 · 中剧本 · 5 节拍 · 70+ 轮

> 中档剧本：48 岁小学退休语文老师，乳腺癌术后五年，医生说她恢复得很好。可病好了，那个被全家围着、被所有人心疼的「坚强的她」也消失了——「幸存者的空」。
> 数值：trust 15→30→45→57→65→70；truth 0→70；碎片 2 枚 @25/@50；恶化入口 trust≤55；隐藏结局 @65；cure 主线 72 轮。
> 生成：`node scripts/md-to-patient.mjs docs/stories/bai_lan-v3.md --walk`

---

## 〇、人物档案

**姓名** 白兰，48 岁，小学退休在即的语文老师。乳腺癌术后五年，复查一切正常。来诊渠道：退休前体检，她对着「一切正常」的报告单在候诊室坐了很久，被老同事转介来坐坐。

**一句话核心** 所有人都恭喜她康复，只有她知道——病好了，那个被全家围着、被所有人心疼的「坚强的她」也消失了。她不知道没了病，自己还剩什么。

**三层真相**
- 表层（开场就说）：睡不好、没来由的空；看到抗癌群大家报喜她替人开心，转头自己莫名失落；反复强调「我没事」「我该高兴」。
- 中间层（第 2-3 节拍揭）：生病那两年，全家围着她转、老同学都来看她，她是所有人的牵挂；康复后大家忙自己的，她的手机安静下来。她甚至不敢承认「要是还病着就好了」。
- 深层（核心信念，根源）：她这辈子都在「被需要」里找位置——教书写「白老师」，带娃写「妈妈」，持家写「能干」；病是一场意外的「被需要」，病好了，位置又空了。她从小被母亲那句「你要争气，别让人瞧不起」追着长大，学会了「有用才配被爱」「不能给人添麻烦」。

**角色三角**
- 施压者：「要坚强、要感恩、要争气」的期待——病了要坚强，好了要感恩，她两头都不敢漏。
- 情感忽视者：康复后各自忙碌、没人再问「你今天怎么样」的家人——不是不爱她，是都放心了。
- 被守护者：那个靠「被需要」确认自己活着的人——连「我想被在乎」都不许自己说出口的白兰。

**症状意义** 怀念生病时的被照顾，让她羞耻又愧疚——她把「想念被在乎」藏成「想念生病」，把自己吓了好几年。症状不是病，是她用「我还有用吗」确认自己还存在的方式。高潮反转：她终于分开了「我不是想念生病，我是想念被在乎」。

**关键转折** 她翻到化疗时女儿写的小纸条「妈妈加油」，第一次哭着承认：我不是想生病，我只是想被这样在乎。

**结局偏向** 不靠生病，也允许自己被人爱——「我是一棵白兰，今年有人来闻了」。

**查重**：已读剧本登记表。本剧本触及「退休身份」「女性长辈被需要」，但与 tang_zhiyuan（退休·身份崩塌，靠头衔定义自我，尺子断了）切入不同：白兰不是失去社会头衔的尺子，是被爱的方式断了一端、又因羞耻不敢承认自己想被爱；与 he_jinglan（丧亲·愧疚，守一个「盼他早走」的赎罪钉子）核心信念完全不同（病愈后的失落 vs 丧夫愧疚）；与 lu_yunxin（控制·代际创伤，补偿七岁自己）不同根。核心困境「病愈身份失落 / 幸存者的空」在登记表中未被占用。不雷同。

---

## 一、节拍规划表

| 节拍 | 主题 | trust | truth | 阻抗 | 关键事件 | 碎片 |
|---|---|---|---|---|---|---|
| 1 | 初访·表层 | 15→30 | 0→~15 | c01/c03/c09 logic | c09 probe（require 25）「心里在找谁」 | — |
| 2 | 外部触发·中间层 | 30→45 | ~15→~25 | c03/c08 logic | c04/c08 probe 揭「要是还病着就好了」「被放心了」 | m1 @25 |
| 3 | 第一次复访·深层 | 45→57 | ~25→~40 | c03/c07 logic | c05 probe（require 40）「什么时候开始怕安静」 | — |
| 4 | 根源信念 | 57→65 | ~40→~55 | c07 logic | c05 probe（require 45）「有用才有人要」；c13 分开「想念生病/想念被在乎」 | m2 @50，恶化入口 c01（trust≤55） |
| 5 | 转向+结局 | 65→70 | ~55→70 | — | c01 关键转折落地；fork（require 45 / 隐藏 65） | — |

数值口径：trust 单调递增（empathy 与 probe 同涨 trust）；empathy 线净 +55（15→70 恰达锚点末位）；truth 只由 probe 涨（轻 +2、实质 +3）；defense 净下降，阻抗节点短时 +8~+12 回落；cure 路径 72 轮（14×4 + 16）。

---

## 二、剧本元信息（ts-meta）

```ts-meta
// id: bai_lan
// tier: 中
// anchor: 15,30,45,57,65,70
// truthEnd: 70
// minCureRounds: 70
// fragments: 2
// worsenAtMost: 55
{
  id: "bai_lan",
  name: "白兰",
  title: "48岁退休在即的语文老师 · 乳腺癌术后五年 · 被老同事转介",
  intro: "退休前体检，她对着『一切正常』的报告单在候诊室坐了很久，被老同事劝来坐坐。坐下时，她把报告单折了又折，说：『我都好了，就是不知道为什么，高兴不起来。』",
  surface: "睡不好、没来由的空。说起『复查一切正常』语气平淡，看到病友群报喜会真心道贺，转头自己莫名失落。说话条理清楚、得体客气，把『我没事』『不想麻烦大家』挂在嘴边。一个把体面维护得很好的、刚刚退休的女人。",
  truth: "乳腺癌术后五年，医生说她恢复得很好。可病好了，那个被全家围着、被所有人心疼的『坚强的她』也消失了。她这辈子都在『被需要』里找位置——教书要学生、带娃要孩子、持家要她张罗；病是一场意外的『被需要』，病好了，位置又空了。从小被母亲『你要争气，别让人瞧不起』追着长大，学会了『有用才配被爱』『不能给人添麻烦』。她不是想念生病，是想念被在乎。",
  palette: { primary: "#9db4a0", secondary: "#c9d4cb", fog: "#8a7d72", bright: "#e3ead9" },
  baseReward: 750,
  difficulty: "普通",
  startNode: "bl1_start",
  initialState: { trust: 15, defense: 65, mood: 35, truth: 0, round: 0 },
  memoryFragments: [
    {
      id: "bl_m1",
      trigger: { truth: 25 },
      title: "病房里的下午三点",
      text: "下午三点，病房里人最多。我爱人给我削苹果，我闺女趴在我床边睡着了，老同事带着花来，坐一会儿就走。我妈坐在门口，跟谁都小声说『让我闺女歇歇』。那两年，我每天都盼着下午三点。现在我一个人坐在空荡荡的客厅里，才慢慢明白——我盼的从来不是探视时间，是有人围着我。",
      emotion: "sad",
    },
    {
      id: "bl_m2",
      trigger: { truth: 50 },
      title: "妈妈加油",
      text: "化疗那阵子，我枕头底下总压着一张纸条，是我闺女写的，就四个字：妈妈加油。我半夜疼得睡不着，就摸出来看，字被我眼泪摸得模糊了。后来我好了，把纸条收进抽屉最深处，再没看过。我怕一看，就想起那时候——那时候，全世界都在围着我转。",
      emotion: "sad",
    },
  ],
}
```

---

## 三、节拍骨架（ts-dialog 节点）

### 节拍 1 · 初访·表层（trust 15→30，truth 0→~15，阻抗：拒绝被当成「不该不高兴的人」）

```ts-dialog
// id: bl1_start
{
  id: "bl1_start",
  speaker: "narration",
  text: "候诊室下午没什么人。白兰比预约早到了二十分钟，端端正正坐在长椅上，手里一直攥着那张体检报告。报告右下角印着『一切正常』四个字，她来回摩挲那四个字，像在辨认一件和自己有关的陌生事。轮到她时，她起身，把报告折好放进包里，推门进来。",
  autoNext: "bl1_p01",
}
```

```ts-dialog
// id: bl1_p01
{
  id: "bl1_p01",
  speaker: "patient",
  text: "医生您好。其实……我没什么事。就是退休前体检查了个遍，报告都是好的。我老同事非让我来坐坐，说看我脸色不好。您别耽误时间，我坐会儿就走，省得占着您的号。",
  emotion: "neutral",
  autoNext: "bl1_c01",
}
```

```ts-dialog
// id: bl1_c01
{
  id: "bl1_c01",
  speaker: "doctor",
  text: "她比预约早到了二十分钟，却说自己「没什么事」——一个刚拿到「一切正常」报告的人，为什么在候诊室坐了那么久？",
  choices: [
    { id: "bl1_c01_a", text: "「报告都好了，你还愿意来坐坐——这份愿意，本身就是件事。」", kind: "empathy", effect: { trust: 2, defense: -2 }, next: "bl1_p02" },
    { id: "bl1_c01_b", text: "「『没什么事』——那你坐下时，心里飘过的是什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl1_p02" },
    { id: "bl1_c01_c", text: "「报告全正常，你该高兴才对，别想太多了，放宽心。」", kind: "logic", effect: { trust: -10, defense: 10, mood: -4 }, next: "bl1_r01" },
  ],
}
```

```ts-dialog
// id: bl1_r01
{
  id: "bl1_r01",
  speaker: "patient",
  text: "（她嘴角一绷）高兴。医生，我天天都在高兴。我该高兴，我好了，全家都松口气。您这话说得轻巧，好像我不该不高兴似的。",
  emotion: "angry",
  autoNext: "bl1_p02",
}
```

```ts-dialog
// id: bl1_p02
{
  id: "bl1_p02",
  speaker: "patient",
  text: "……我就是最近睡不好。夜里总醒，醒了就再也睡不着，望着天花板到天亮。白天又困，一坐下就打盹，做点事就累。医生说这可能是闲的，刚退休都这样。",
  emotion: "anxious",
  autoNext: "bl1_c02",
}
```

```ts-dialog
// id: bl1_c02
{
  id: "bl1_c02",
  speaker: "doctor",
  text: "她说「闲的」时，手无意识地摩挲着膝盖——像是把这句话念给自己听。",
  choices: [
    { id: "bl1_c02_a", text: "「忙了一辈子的人，突然闲下来，是会站不稳的。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "bl1_p03" },
    { id: "bl1_c02_b", text: "「『刚退休都这样』——这是谁跟你说的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl1_p03" },
  ],
}
```

```ts-dialog
// id: bl1_p03
{
  id: "bl1_p03",
  speaker: "patient",
  text: "我爱人说的。他说我忙了一辈子，该享清福了。我心里明白他是为我好。可我闲下来，浑身没劲，做什么都提不起劲。以前上课，一天唰一下就过去了，现在一天跟一年似的。",
  emotion: "neutral",
  autoNext: "bl1_c03",
}
```

```ts-dialog
// id: bl1_c03
{
  id: "bl1_c03",
  speaker: "doctor",
  text: "她说着说着，自己绕回了那个「闲」字——好像「闲」才是她今天的病。",
  choices: [
    { id: "bl1_c03_a", text: "「你不是怕闲，是怕闲下来之后，那个空荡荡的自己。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "bl1_p04" },
    { id: "bl1_c03_b", text: "「一天跟一年似的——那一天里，你最难熬的是什么时候？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl1_p04" },
    { id: "bl1_c03_c", text: "「退休就该享清福，你出去旅游、跳跳舞，别老闷在家里。」", kind: "logic", effect: { trust: -10, defense: 10, mood: -4 }, next: "bl1_r02" },
  ],
}
```

```ts-dialog
// id: bl1_r02
{
  id: "bl1_r02",
  speaker: "patient",
  text: "（她语气硬了些）旅游？跳舞？医生，您让我一个人去？我教了一辈子书，朋友不是没有，可人家都有自己的日子。我总不能天天拉着人陪我。",
  emotion: "angry",
  autoNext: "bl1_p04",
}
```

```ts-dialog
// id: bl1_p04
{
  id: "bl1_p04",
  speaker: "patient",
  text: "（她停了一下，声音软下来）……对不起，我声音大了。我不是冲您。我就是……这阵子心里堵得慌。以前再累，累得踏实。现在闲了，反倒像心里空了一块，怎么填都填不满。",
  emotion: "sad",
  autoNext: "bl1_c04",
}
```

```ts-dialog
// id: bl1_c04
{
  id: "bl1_c04",
  speaker: "doctor",
  text: "她道了歉，又给自己下了个定义——「心里空了一块」。",
  choices: [
    { id: "bl1_c04_a", text: "（安静地坐着，等她自己把那个「空」往下说。）", kind: "silence", effect: { trust: 1, mood: 2 }, next: "bl1_p05" },
    { id: "bl1_c04_b", text: "「『空了一块』——这块空，是从什么时候开始空下来的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl1_p05" },
  ],
}
```

```ts-dialog
// id: bl1_p05
{
  id: "bl1_p05",
  speaker: "patient",
  text: "……说不清什么时候。退休手续办完那天，我站在学校门口，看学生放学，心里忽然空了一下。后来那阵空就常来。我加了个病友群，都是得过我这场病的人。群里大家报喜，说复查都好，我回一句恭喜恭喜。",
  emotion: "neutral",
  autoNext: "bl1_c05",
}
```

```ts-dialog
// id: bl1_c05
{
  id: "bl1_c05",
  speaker: "doctor",
  text: "她说「恭喜」时，语气里有一丝她自己没察觉的失落。",
  choices: [
    { id: "bl1_c05_a", text: "「你替他们高兴，是真的。可放下手机那一下的失落，也是真的。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "bl1_p06" },
    { id: "bl1_c05_b", text: "「报喜——你是替他们高兴，还是替自己难过？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl1_p06" },
  ],
}
```

```ts-dialog
// id: bl1_p06
{
  id: "bl1_p06",
  speaker: "patient",
  text: "（她愣了一下）……替自己难过？我也不知道。我就觉得，人家都好了，都往前走了，我怎么还站在原地。我都不好意思跟人说我心里发闷——人家会说，你都好了，还矫情什么。",
  emotion: "anxious",
  autoNext: "bl1_c06",
}
```

```ts-dialog
// id: bl1_c06
{
  id: "bl1_c06",
  speaker: "doctor",
  text: "她先说「不好意思说」，又说「怕被说矫情」——她把自己的感受，早早关在了门外。",
  choices: [
    { id: "bl1_c06_a", text: "「你怕被说矫情，所以把心里的闷压了又压——这份忍，比那份闷还累。」", kind: "empathy", effect: { trust: 2, mood: 2 }, next: "bl1_p07" },
    { id: "bl1_c06_b", text: "「『矫情』这个词，是谁教你的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl1_p07" },
  ],
}
```

```ts-dialog
// id: bl1_p07
{
  id: "bl1_p07",
  speaker: "patient",
  text: "没人教。是我自己心里头就有个声音。我爱人高兴，我闺女高兴，她们天天说『妈你身体好了，该好好享福了』。我该高兴。可我有时候笑不出来，又不敢让她们看见，只能躲开去。",
  emotion: "sad",
  autoNext: "bl1_c07",
}
```

```ts-dialog
// id: bl1_c07
{
  id: "bl1_c07",
  speaker: "doctor",
  text: "「笑不出来，又不敢让她们看见」——她把自己的难过，也当成了一件要藏的事。",
  choices: [
    { id: "bl1_c07_a", text: "「你怕她们担心。可你把难过藏起来，家里是不是就只剩你一个人在扛？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "bl1_p08" },
    { id: "bl1_c07_b", text: "「『躲开去』——你躲开的时候，心里最想的是什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl1_p08" },
  ],
}
```

```ts-dialog
// id: bl1_p08
{
  id: "bl1_p08",
  speaker: "patient",
  text: "想的是……她们能过自己的日子。我闺女嫁人了，有自己的小家，天天忙。我爱人上班，也忙。我想，我好了，就不该再拖累她们了。我该自己把自己安顿好。",
  emotion: "neutral",
  autoNext: "bl1_c08",
}
```

```ts-dialog
// id: bl1_c08
{
  id: "bl1_c08",
  speaker: "doctor",
  text: "「把自己安顿好」——她说得很平静，像在交接一件早就该办完的事。",
  choices: [
    { id: "bl1_c08_a", text: "「你把自己『安顿』在哪儿了呢？她俩的心里，还是你自己的日子里？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "bl1_p09" },
    { id: "bl1_c08_b", text: "「『安顿好』——可你刚才说，你一个人坐不住。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl1_p09" },
  ],
}
```

```ts-dialog
// id: bl1_p09
{
  id: "bl1_p09",
  speaker: "patient",
  text: "（她沉默了一会儿）……坐不住。以前家里总有声响，学生叽叽喳喳，我爱人看电视，我闺女打电话。现在屋里安安静静的，静得我发慌。我就去把家里每个角落都擦一遍，擦得干干净净，还是发慌。",
  emotion: "sad",
  autoNext: "bl1_c09",
}
```

```ts-dialog
// id: bl1_c09
{
  id: "bl1_c09",
  speaker: "doctor",
  text: "她把家里擦得干干净净，却还是发慌——她好像在用干净，填那个空。",
  choices: [
    { id: "bl1_c09_a", text: "「你把家里擦得那么干净，是想让谁来住呢？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "bl1_p10" },
    { id: "bl1_c09_b", text: "「发慌的时候，你心里在找谁？」", kind: "probe", require: { trust: 25 }, effect: { trust: 2, truth: 3 }, next: "bl1_p10", hint: "需要信任≥25" },
    { id: "bl1_c09_c", text: "「你就是闲得慌，找点事做，报个老年大学，日子就充实了。」", kind: "logic", effect: { trust: -10, defense: 8, mood: -3 }, next: "bl1_r03" },
  ],
}
```

```ts-dialog
// id: bl1_r03
{
  id: "bl1_r03",
  speaker: "patient",
  text: "（她站起来，又坐下）老年大学。医生，我不是不会找事做。我是找不到自己。您懂吗？我这一辈子，都是围着别人转的。突然没人围着了，我连自己往哪儿站都不知道。",
  emotion: "angry",
  autoNext: "bl1_p10",
}
```

```ts-dialog
// id: bl1_p10
{
  id: "bl1_p10",
  speaker: "patient",
  text: "（她坐回去，声音低下来）……我没走。医生，您别赶我。我就是心里头乱。教了三十年书，最后那学期，孩子们给我写了本留言册。我翻着翻着，不是难过，就是空。像是一下子，没人需要我了。",
  emotion: "sad",
  autoNext: "bl1_c10",
}
```

```ts-dialog
// id: bl1_c10
{
  id: "bl1_c10",
  speaker: "doctor",
  text: "「没人需要我了」——她第一次，说出了那个让她发慌的东西。",
  choices: [
    { id: "bl1_c10_a", text: "「翻着那本留言册，你看见的其实不是空，是被学生围着的那三十年。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "bl1_p11" },
    { id: "bl1_c10_b", text: "「『没人需要我了』——你确定，是没人需要你，还是没人来找你了？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl1_p11" },
  ],
}
```

```ts-dialog
// id: bl1_p11
{
  id: "bl1_p11",
  speaker: "patient",
  text: "……您这句问得我有点接不上。可能都有吧。孩子们有自己的老师了，学生们有自己的新生活了。我退休了，我的位置，自然就有人顶上去了。这是好事。可我就是……有点站不稳。",
  emotion: "calm",
  autoNext: "bl1_c11",
}
```

```ts-dialog
// id: bl1_c11
{
  id: "bl1_c11",
  speaker: "doctor",
  text: "她给自己找了个很好的理由——「这是好事」。但她坐着的姿势，还像一株被从土里拔出来的花。",
  choices: [
    { id: "bl1_c11_a", text: "（不急着纠正，陪她把「站不稳」的感觉，多坐一会儿。）", kind: "silence", effect: { trust: 1, mood: 2 }, next: "bl1_p12" },
    { id: "bl1_c11_b", text: "「『位置有人顶上去了』——那你的位置，现在空了多久了？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl1_p12" },
  ],
}
```

```ts-dialog
// id: bl1_p12
{
  id: "bl1_p12",
  speaker: "patient",
  text: "……空了大半年了。从办完退休手续那天起。我有时半夜醒过来，看着天花板，会想：我这一辈子，好像一直在别人身上。教书的为学生，当妈的为孩子，当媳妇的为这个家。轮到我自己……我好像没什么可想的了。",
  emotion: "neutral",
  autoNext: "bl1_c12",
}
```

```ts-dialog
// id: bl1_c12
{
  id: "bl1_c12",
  speaker: "doctor",
  text: "「轮到我自己，没什么可想的了」——这句话，她自己都没敢多停留。",
  choices: [
    { id: "bl1_c12_a", text: "「你把自己排在名单的最后，排到大半辈子——现在名单轮空了，你反而不会排了。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "bl1_p13" },
    { id: "bl1_c12_b", text: "「『没什么可想的』——是你真的没有，还是你从来不敢想自己？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl1_p13" },
  ],
}
```

```ts-dialog
// id: bl1_p13
{
  id: "bl1_p13",
  speaker: "patient",
  text: "（她眼圈红了，又压下去）……不敢想。想了就觉得，我一个五十岁的人，还琢磨这些，是不是太晚了。医生，我这辈子，没为自己安排过什么。现在想安排，又不知道从哪儿下手。",
  emotion: "sad",
  autoNext: "bl1_c13",
}
```

```ts-dialog
// id: bl1_c13
{
  id: "bl1_c13",
  speaker: "doctor",
  text: "「太晚了」——她给自己的后半辈子，先划了个叉。",
  choices: [
    { id: "bl1_c13_a", text: "「五十岁不算晚。你教了三十年书，最会做的事就是『从头教起』。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "bl1_p14" },
    { id: "bl1_c13_b", text: "「『从哪儿下手』——如果从想一件你自己喜欢的事开始呢？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl1_p14" },
  ],
}
```

```ts-dialog
// id: bl1_p14
{
  id: "bl1_p14",
  speaker: "patient",
  text: "（她想了想，有些不好意思）……我年轻时候爱写诗。后来当了老师，天天改作文，就把自己的诗忘了。您这么一问，我忽然想起来，我好像还有本旧本子，压在箱底。",
  emotion: "calm",
  autoNext: "bl1_c14",
}
```

```ts-dialog
// id: bl1_c14
{
  id: "bl1_c14",
  speaker: "doctor",
  text: "她想起那本压箱底的诗本时，眼角的皱纹舒展开了——那是今天第一次，她脸上没有「该高兴」的勉强。",
  choices: [
    { id: "bl1_c14_a", text: "（送她到门口，不急着戳破，让那本旧本子先在她心里待一会儿。）", kind: "silence", effect: { mood: 2 }, next: "bl1_out" },
    { id: "bl1_c14_b", text: "「下次，把那本旧本子带来，我们一起翻翻？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl1_out" },
  ],
}
```

```ts-dialog
// id: bl1_out
{
  id: "bl1_out",
  speaker: "narration",
  text: "白兰起身时，把那张报告单又折了一遍，放进包里。走到门口她回头：「医生，我下回……还能来吗？」问完她自己先笑了，「我这是怎么了，还要人批准。」",
  beatEnd: { resumeNode: "bl2_start" },
  autoNext: "bl2_start",
}
```

### 节拍 2 · 外部触发·中间层（trust 30→45，truth ~15→~25，[m1 碎片 @25]，揭示「被放心了」）

```ts-dialog
// id: bl2_start
{
  id: "bl2_start",
  speaker: "narration",
  text: "一周后，白兰准时来了。这周她眼圈有点肿，说病友群里一个病友出院，大家热闹地祝贺，她也发了句「恭喜」，发完一个人在阳台站了很久，眼泪自己就下来了。",
  autoNext: "bl2_p01",
}
```

```ts-dialog
// id: bl2_p01
{
  id: "bl2_p01",
  speaker: "patient",
  text: "医生，我又来了。这周……群里小周出院了，大家都替她高兴。我也高兴，是真心高兴。可我放下手机，一个人站阳台，眼泪自己就下来了。我自己都吓一跳。",
  emotion: "anxious",
  autoNext: "bl2_c01",
}
```

```ts-dialog
// id: bl2_c01
{
  id: "bl2_c01",
  speaker: "doctor",
  text: "她替别人高兴是真的，那滴眼泪也是真的——两件真的东西，在她这里却对不上了。",
  choices: [
    { id: "bl2_c01_a", text: "「恭喜是替她高兴，眼泪是替自己流——这两样，可以不打架。」", kind: "empathy", effect: { trust: 2, mood: 2 }, next: "bl2_p02" },
    { id: "bl2_c01_b", text: "「他出院了，你为什么哭？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl2_p02" },
  ],
}
```

```ts-dialog
// id: bl2_p02
{
  id: "bl2_p02",
  speaker: "patient",
  text: "……我说不上来。可能因为他好了，就回到自己日子去了，不用再来这个群报到了。我替他高兴，也替他……有点舍不得？这话我都不好意思说。他好了，我当然高兴。",
  emotion: "sad",
  autoNext: "bl2_c02",
}
```

```ts-dialog
// id: bl2_c02
{
  id: "bl2_c02",
  speaker: "doctor",
  text: "「舍不得」——她自己也接不上这三个字。",
  choices: [
    { id: "bl2_c02_a", text: "「你舍不得的，也许不是他，是这个群还把你算作『病友』的那份关系。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "bl2_p03" },
    { id: "bl2_c02_b", text: "「他回到自己日子去了——那你呢？你在哪个群里？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl2_p03" },
  ],
}
```

```ts-dialog
// id: bl2_p03
{
  id: "bl2_p03",
  speaker: "patient",
  text: "我在哪个群里……您这话问得我心里咯噔一下。我闺女最近老打电话，说妈你复查没事就出去走走，别老闷家里。我说好。挂了电话我就发呆。我该去哪儿？去哪儿都觉得，我不在人家群里。",
  emotion: "neutral",
  autoNext: "bl2_c03",
}
```

```ts-dialog
// id: bl2_c03
{
  id: "bl2_c03",
  speaker: "doctor",
  text: "「我不在人家群里」——她把自己的人生，说成了别人的一个个圈子。",
  choices: [
    { id: "bl2_c03_a", text: "「你不是不在任何群里。你是从来没有过自己的那个圈。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "bl2_p04" },
    { id: "bl2_c03_b", text: "「你挂完电话发呆——发呆的时候，你在等什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl2_p04" },
    { id: "bl2_c03_c", text: "「你都好了，就该出去走走、多交朋友，别老窝在家里伤春悲秋。」", kind: "logic", effect: { trust: -10, defense: 10, mood: -4 }, next: "bl2_r01" },
  ],
}
```

```ts-dialog
// id: bl2_r01
{
  id: "bl2_r01",
  speaker: "patient",
  text: "（她声音冷下来）交朋友？我这一辈子，朋友不少，学生更多。可那都是『白老师』的朋友。现在没人叫我白老师了。我坐在人家中间，人家聊孙子、聊旅游，我插不上话，只能陪着笑。您说，那也算朋友吗？",
  emotion: "angry",
  autoNext: "bl2_p04",
}
```

```ts-dialog
// id: bl2_p04
{
  id: "bl2_p04",
  speaker: "patient",
  text: "（她低下头）……医生，我说句您可能觉得荒唐的话。我翻手机，翻到以前的消息，一条条都是『白老师你怎么样了』『白老师我们来看你』。现在翻到底，置顶的没几个。我有时候居然会想……要是还病着就好了。",
  emotion: "sad",
  autoNext: "bl2_c04",
}
```

```ts-dialog
// id: bl2_c04
{
  id: "bl2_c04",
  speaker: "doctor",
  text: "她说出了那句压在心底的话——「要是还病着就好了」。说出口，她自己先愣住了。",
  choices: [
    { id: "bl2_c04_a", text: "「你居然敢把这句话说出来——你知道这有多勇敢吗？」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "bl2_p05" },
    { id: "bl2_c04_b", text: "「『要是还病着就好了』——你真正想要的，是病，还是病带来的什么？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "bl2_p05" },
  ],
}
```

```ts-dialog
// id: bl2_p05
{
  id: "bl2_p05",
  speaker: "patient",
  text: "（她眼泪下来）……我不是想生病。我就是……生病那两年，谁都在乎我。现在我好了，谁都在过自己的日子。我也不是怪她们，我是怪我自己，怎么会有这种念头。我是不是特别不知好歹？",
  emotion: "scared",
  autoNext: "bl2_c05",
}
```

```ts-dialog
// id: bl2_c05
{
  id: "bl2_c05",
  speaker: "doctor",
  text: "她给自己定罪了——「不知好歹」。但她那句「谁都在乎我」，是今天最真的一句话。",
  choices: [
    { id: "bl2_c05_a", text: "「你不是不知好歹。你只是太久没被人这样在乎，想念了。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "bl2_p06" },
    { id: "bl2_c05_b", text: "「『谁都在乎我』——那两年，你是被谁在乎着的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl2_p06" },
  ],
}
```

```ts-dialog
// id: bl2_p06
{
  id: "bl2_p06",
  speaker: "patient",
  text: "……我爱人请了假，天天陪床，饭都端到床边。我闺女隔三差五就来看我，给我带吃的，趴我床边睡着。我那些老同事、老学生，都来病房看过我。我妈坐在门口，谁来了都说『让我闺女歇歇』。那两年，病房里从来不冷清。",
  emotion: "neutral",
  autoNext: "bl2_c06",
}
```

```ts-dialog
// id: bl2_c06
{
  id: "bl2_c06",
  speaker: "doctor",
  text: "她回忆病房里人来人往时，语气反而比说起现在要松快——她自己也发现了这个反常。",
  choices: [
    { id: "bl2_c06_a", text: "「你生病那两年，被所有人围着——那时候的你，心里是什么感觉？」", kind: "empathy", effect: { trust: 2, mood: 2 }, next: "bl2_p07" },
    { id: "bl2_c06_b", text: "「那两年，你病着，心里却是满的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl2_p07" },
  ],
}
```

```ts-dialog
// id: bl2_p07
{
  id: "bl2_p07",
  speaker: "patient",
  text: "（她低头）……说出来怪不好意思的。那两年我病着，可我心里是踏实的。我知道大家都念着我。现在我好了，大家都放心了。我……我被放心了。这两个字，我自己说着都心酸。",
  emotion: "sad",
  autoNext: "bl2_c07",
}
```

```ts-dialog
// id: bl2_c07
{
  id: "bl2_c07",
  speaker: "doctor",
  text: "「被放心了」——她给自己这几年的失落，找到了一个名字。",
  choices: [
    { id: "bl2_c07_a", text: "「你被所有人放心了，可你还没学会，放心地把自己交给自己。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "bl2_p08" },
    { id: "bl2_c07_b", text: "「『被放心了』之后，谁还来问过你『你今天怎么样』？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl2_p08" },
  ],
}
```

```ts-dialog
// id: bl2_p08
{
  id: "bl2_p08",
  speaker: "patient",
  text: "（她想了很久）……没有。我爱人上班忙，我闺女有自己的小家，朋友各自有日子。没人问我了。我以前总盼着没人操心我，真没人操心了，我又空得慌。我是不是挺矛盾的？",
  emotion: "sad",
  autoNext: "bl2_c08",
}
```

```ts-dialog
// id: bl2_c08
{
  id: "bl2_c08",
  speaker: "doctor",
  text: "她把自己的渴望，包装成「矛盾」，好像这样就不会显得贪心。",
  choices: [
    { id: "bl2_c08_a", text: "「你不矛盾。你只是把『被人操心』当成了不该要的东西。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "bl2_p09" },
    { id: "bl2_c08_b", text: "「你盼着没人操心你，是真心的。可没人操心了，那份空也是真心的——两样都是你的，不是矛盾。」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "bl2_p09" },
    { id: "bl2_c08_c", text: "「你该知足。多少人想好都好不了，你好了就别再自寻烦恼了。」", kind: "logic", effect: { trust: -10, defense: 10, mood: -4 }, next: "bl2_r02" },
  ],
}
```

```ts-dialog
// id: bl2_r02
{
  id: "bl2_r02",
  speaker: "patient",
  text: "（她声音发抖）知足，我天天都在知足。我每天跟自己说，白兰，你好好的，别折腾了。可那阵空还在，我压不住它。您也说我不该烦恼——那这份烦恼，我该拿它怎么办？",
  emotion: "broken",
  autoNext: "bl2_p09",
}
```

```ts-dialog
// id: bl2_p09
{
  id: "bl2_p09",
  speaker: "patient",
  text: "这周我闺女回来吃饭。饭后她跟她爸在客厅说话，我插不上嘴，就坐厨房剥豆子，剥了一晚上。剥完我才发现，我也不知道剥给谁吃。就那么坐着，听她们爷俩笑。",
  emotion: "neutral",
  autoNext: "bl2_c09",
}
```

```ts-dialog
// id: bl2_c09
{
  id: "bl2_c09",
  speaker: "doctor",
  text: "「剥给谁吃」——她给自己找了个不得不坐着的理由，却不知道自己为什么还坐着。",
  choices: [
    { id: "bl2_c09_a", text: "「你坐在厨房里，等的是什么？是一声『妈，来吃豆子』吧。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "bl2_p10" },
    { id: "bl2_c09_b", text: "「你剥那一晚豆子，是在等谁来叫你过去？」", kind: "probe", require: { trust: 25 }, effect: { trust: 2, truth: 3 }, next: "bl2_p10", hint: "需要信任≥25" },
  ],
}
```

```ts-dialog
// id: bl2_p10
{
  id: "bl2_p10",
  speaker: "patient",
  text: "（她愣了一下）……等谁来叫我。您这么一说，我才发现，我确实是在等。等她们想起来，哦，妈还在厨房呢，叫她来坐。可她们没叫。她们聊得热热闹闹的，我在厨房，挺冷的。也不是她们冷落我，是我自己站不到她们中间去。",
  emotion: "sad",
  autoNext: "bl2_c10",
}
```

```ts-dialog
// id: bl2_c10
{
  id: "bl2_c10",
  speaker: "doctor",
  text: "「站不到她们中间去」——她开始看清，那个空的位置，是她自己站不进去。",
  choices: [
    { id: "bl2_c10_a", text: "「你等她们叫你，自己却不敢走过去——这一步，差的就是一句『我需要你们』。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "bl2_p11" },
    { id: "bl2_c10_b", text: "「你冷，是因为客厅的热闹没算上你——还是因为你自己先把自己摘出去了？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl2_p11" },
  ],
}
```

```ts-dialog
// id: bl2_p11
{
  id: "bl2_p11",
  speaker: "patient",
  text: "……我自己摘出去的。我总觉得，她们的日子过得正好，我别去添乱。我闺女那天晚上走的时候，抱了我一下，说妈你早点睡。我搂着她，眼泪差点下来。我赶紧说，好，妈这就睡。",
  emotion: "sad",
  autoNext: "bl2_c11",
}
```

```ts-dialog
// id: bl2_c11
{
  id: "bl2_c11",
  speaker: "doctor",
  text: "她搂着女儿的时候，眼泪差点下来，又咽了回去——她连在女儿怀里，都不敢让自己软弱。",
  choices: [
    { id: "bl2_c11_a", text: "「你搂着她的时候，心里想的是什么？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "bl2_p12" },
    { id: "bl2_c11_b", text: "「你想对女儿说的那句话，为什么咽回去了？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl2_p12" },
  ],
}
```

```ts-dialog
// id: bl2_p12
{
  id: "bl2_p12",
  speaker: "patient",
  text: "想的是……我要是能一直这样被她搂着就好了。可她都嫁人了，有自己的家了。我不能老占着她。我当妈的，哪能拦着孩子过自己的日子。",
  emotion: "sad",
  autoNext: "bl2_c12",
}
```

```ts-dialog
// id: bl2_c12
{
  id: "bl2_c12",
  speaker: "doctor",
  text: "「我不能老占着她」——她连被女儿搂一下，都觉得是占了女儿的时间。",
  choices: [
    { id: "bl2_c12_a", text: "「被女儿搂一下不是占用，是你们母女都需要的——你不欠她，她也不欠你。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "bl2_p13" },
    { id: "bl2_c12_b", text: "「你怕『占着她』——那女儿小时候黏着你，你嫌过她占你吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl2_p13" },
  ],
}
```

```ts-dialog
// id: bl2_p13
{
  id: "bl2_p13",
  speaker: "patient",
  text: "（她摇摇头，笑了笑）……没有。她小时候天天黏着我，我高兴还来不及。医生，您这么一比，我心里好像……明白了一点。原来我给自己定的规矩，比给女儿的严多了。",
  emotion: "calm",
  autoNext: "bl2_c13",
}
```

```ts-dialog
// id: bl2_c13
{
  id: "bl2_c13",
  speaker: "doctor",
  text: "「给自己定的规矩比给女儿的严」——她自己看出来了。",
  choices: [
    { id: "bl2_c13_a", text: "「你对别人那么宽容，对自己却那么苛刻——这份苛刻，是从哪儿学来的？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "bl2_p14" },
    { id: "bl2_c13_b", text: "「那些规矩，是别人给你定的，还是你给自己定的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl2_p14" },
  ],
}
```

```ts-dialog
// id: bl2_p14
{
  id: "bl2_p14",
  speaker: "patient",
  text: "（她低头）……我小时候，我妈总说『你要争气，别让人瞧不起』。我争了一辈子气，就学会了『我不能让人操心』『我不能添麻烦』。这些话，像刻在我骨头里。医生，我心里头……想跟您说说我妈。",
  emotion: "sad",
  autoNext: "bl2_c14",
}
```

```ts-dialog
// id: bl2_c14
{
  id: "bl2_c14",
  speaker: "doctor",
  text: "她主动想谈母亲了——那条「争气」的规矩，开始在松动。",
  choices: [
    { id: "bl2_c14_a", text: "「你想谈的时候，我就在这儿。你母亲给你定的规矩，今天可以先松一松。」", kind: "empathy", effect: { mood: 2 }, next: "bl2_out" },
    { id: "bl2_c14_b", text: "「『不能让人操心』——这句话，你打算还要守多久？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl2_out" },
  ],
}
```

```ts-dialog
// id: bl2_out
{
  id: "bl2_out",
  speaker: "narration",
  text: "白兰离开时，把手机里病友群的消息又翻了一遍，停在「恭喜」两个字上。她在后面删掉了一行没发出去的字。走出门时，她回头说了句：「医生，麻烦您了。」",
  beatEnd: { resumeNode: "bl3_start" },
  autoNext: "bl3_start",
}
```

### 节拍 3 · 第一次复访·深层（trust 45→57，truth ~25→~40，把病当成被需要的时光）

```ts-dialog
// id: bl3_start
{
  id: "bl3_start",
  speaker: "narration",
  text: "又一周，白兰来时带了那本学生留言册。深蓝色的布面，边角磨得发白。她把它放在膝上，像捧着一件旧宝贝。说孩子们的字歪歪扭扭，她翻了好多遍，今天想请您也看看。",
  autoNext: "bl3_p01",
}
```

```ts-dialog
// id: bl3_p01
{
  id: "bl3_p01",
  speaker: "patient",
  text: "医生，您看这本留言册。有个孩子写：「老师，我以后不当你学生了，还能来看你吗？」我看了好多遍。我教了一辈子，天天有人喊我老师。现在退休了，没人叫我了。我有时候听着楼下小孩喊妈妈，心里都会空一下。",
  emotion: "neutral",
  autoNext: "bl3_c01",
}
```

```ts-dialog
// id: bl3_c01
{
  id: "bl3_c01",
  speaker: "doctor",
  text: "「没人叫我老师了」——她的位置，第一次有了一个具体的名字。",
  choices: [
    { id: "bl3_c01_a", text: "「『白老师』这声称呼，你听了一辈子——现在没人喊了，那个位置就空了。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "bl3_p02" },
    { id: "bl3_c01_b", text: "「楼下小孩喊妈妈，你空一下——你是在替谁空？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl3_p02" },
  ],
}
```

```ts-dialog
// id: bl3_p02
{
  id: "bl3_p02",
  speaker: "patient",
  text: "替谁空……我以前天天站着讲课，站一天也不觉得累。现在我天天坐着，坐着坐着就发呆。我闺女说，妈你以前多精神。我说，妈老了。其实我心里知道，不是老了，是没人支着我了。",
  emotion: "neutral",
  autoNext: "bl3_c02",
}
```

```ts-dialog
// id: bl3_c02
{
  id: "bl3_c02",
  speaker: "doctor",
  text: "「没人支着我了」——她自己说出了那个词：支着。",
  choices: [
    { id: "bl3_c02_a", text: "「你以前总有人支着——学生、孩子、这个家。现在没人支着你，你就得自己站了。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "bl3_p03" },
    { id: "bl3_c02_b", text: "「『支着』——你这一辈子，是靠什么被支着的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl3_p03" },
  ],
}
```

```ts-dialog
// id: bl3_p03
{
  id: "bl3_p03",
  speaker: "patient",
  text: "……靠被需要吧。学生需要我教，孩子需要我管，家里需要我张罗。我被人需要着，我才觉得，我是个人，我有用。现在没人需要我了，我就不知道自己站哪儿了。",
  emotion: "sad",
  autoNext: "bl3_c03",
}
```

```ts-dialog
// id: bl3_c03
{
  id: "bl3_c03",
  speaker: "doctor",
  text: "她给「我是个人」和「我有用」之间，画上了等号。",
  choices: [
    { id: "bl3_c03_a", text: "「你这一辈子，好像都是靠着『被人需要』才敢站着的。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "bl3_p04" },
    { id: "bl3_c03_b", text: "「『我有用』才算个人——这句话，你信了多久了？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl3_p04" },
    { id: "bl3_c03_c", text: "「你都这把年纪了，儿孙满堂，还想那些『被需要』干嘛，安安稳稳享福就行了。」", kind: "logic", effect: { trust: -10, defense: 10, mood: -4 }, next: "bl3_r01" },
  ],
}
```

```ts-dialog
// id: bl3_r01
{
  id: "bl3_r01",
  speaker: "patient",
  text: "（她冷下来）享福。我爱人也这么说。可我没享过福，我不会享。我这一辈子学的都是怎么伺候人、怎么照顾人。您让我享福，我不知道那福气，长什么样。",
  emotion: "angry",
  autoNext: "bl3_p04",
}
```

```ts-dialog
// id: bl3_p04
{
  id: "bl3_p04",
  speaker: "patient",
  text: "我闺女小时候，我天天围着她转，觉得日子特别满。后来她上大学、结婚、有了自己的家。我高兴，是真高兴。可高兴完了，家里就剩我和我爱人，大眼瞪小眼。他看电视，我发呆。",
  emotion: "sad",
  autoNext: "bl3_c04",
}
```

```ts-dialog
// id: bl3_c04
{
  id: "bl3_c04",
  speaker: "doctor",
  text: "「她有了自己的家」——女儿过得好，她高兴。可女儿那个家，把她心里那块「妈妈被需要」的地方，一起带走了。",
  choices: [
    { id: "bl3_c04_a", text: "「你闺女有了自己的家——你心里空出来的那块，是她的位置，还是你的？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "bl3_p05" },
    { id: "bl3_c04_b", text: "「高兴完了就空——你高兴的，和空的，是同一件事吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl3_p05" },
  ],
}
```

```ts-dialog
// id: bl3_p05
{
  id: "bl3_p05",
  speaker: "patient",
  text: "（她想了想）……是同一件事。她过得好，我高兴。她不需要我了，我空。我从来没学会，自己一个人待着。以前再累，身边都有人。现在屋里安安静静的，静得我发慌。",
  emotion: "sad",
  autoNext: "bl3_c05",
}
```

```ts-dialog
// id: bl3_c05
{
  id: "bl3_c05",
  speaker: "doctor",
  text: "「静得发慌」——她不是怕安静，是怕安静里那个没人需要的自己。",
  choices: [
    { id: "bl3_c05_a", text: "「你怕的不是安静，是安静下来之后，那个『没人需要』的自己。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "bl3_p06" },
    { id: "bl3_c05_b", text: "「你什么时候开始怕安静的？是病那阵子之后，还是更早？」", kind: "probe", require: { trust: 40 }, effect: { trust: 2, truth: 3 }, next: "bl3_p06", hint: "需要信任≥40" },
  ],
}
```

```ts-dialog
// id: bl3_p06
{
  id: "bl3_p06",
  speaker: "patient",
  text: "（她低头想了一会儿）……更早。我从小家里就吵吵嚷嚷的，我爸妈、我弟弟，一屋子人。后来我教书，天天对着几十个孩子。我这辈子，真没怎么一个人待过。头一回一个人，就是退休以后。",
  emotion: "neutral",
  autoNext: "bl3_c06",
}
```

```ts-dialog
// id: bl3_c06
{
  id: "bl3_c06",
  speaker: "doctor",
  text: "「一屋子人长大、对着孩子教书」——她这一生，都是在人群里确认自己的位置的。",
  choices: [
    { id: "bl3_c06_a", text: "「你这一辈子，都在人群里找自己的位置——现在人群散了，你才第一次看见自己一个人。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "bl3_p07" },
    { id: "bl3_c06_b", text: "「那一屋子人里，你站在什么位置？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl3_p07" },
  ],
}
```

```ts-dialog
// id: bl3_p07
{
  id: "bl3_p07",
  speaker: "patient",
  text: "（她眼泪下来）……站在最前面吧。我是姐姐，我得懂事，得让着弟弟，得帮家里干活。后来当老师，我得站在讲台上，撑起一整个班。我好像从来都站在别人前头，替别人撑着。我自己的手，发抖的时候，没人看见。",
  emotion: "scared",
  autoNext: "bl3_c07",
}
```

```ts-dialog
// id: bl3_c07
{
  id: "bl3_c07",
  speaker: "doctor",
  text: "「我自己的手发抖，没人看见」——她终于说到了自己身上。",
  choices: [
    { id: "bl3_c07_a", text: "「你替别人撑了一辈子——现在，轮到谁撑着你呢？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "bl3_p08" },
    { id: "bl3_c07_b", text: "「你手发抖的时候，最想被谁看见？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl3_p08" },
    { id: "bl3_c07_c", text: "「你哭也没用，日子不还得照过。你该庆幸自己撑得住。」", kind: "logic", effect: { trust: -10, defense: 8, mood: -4 }, next: "bl3_r02" },
  ],
}
```

```ts-dialog
// id: bl3_r02
{
  id: "bl3_r02",
  speaker: "patient",
  text: "（她擦了擦眼睛，声音硬起来）照过。我知道日子照过。可我心里这道坎，没人替我扛，我也过不去。您要是觉得我矫情，我这就走。",
  emotion: "broken",
  autoNext: "bl3_p08",
}
```

```ts-dialog
// id: bl3_p08
{
  id: "bl3_p08",
  speaker: "patient",
  text: "（她没走，声音又软下来）……我没走。医生，我就是想说。我有儿有女，我知道她们爱我。可她们都有自己的日子了。我打电话，她们接，但我插不上话。我去了，她们招待，但我坐着不自在。我不是她们日子里的谁了。",
  emotion: "sad",
  autoNext: "bl3_c08",
}
```

```ts-dialog
// id: bl3_c08
{
  id: "bl3_c08",
  speaker: "doctor",
  text: "「我不是她们日子里的谁了」——这句话，她自己又重复了一遍，像在确认一个很疼的事实。",
  choices: [
    { id: "bl3_c08_a", text: "「你把自己从她们的日子里摘出去了——可她们，也许从没想过要把你摘出去。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "bl3_p09" },
    { id: "bl3_c08_b", text: "「你说是你『不是谁了』——还是你不敢站进她们的日子去？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl3_p09" },
  ],
}
```

```ts-dialog
// id: bl3_p09
{
  id: "bl3_p09",
  speaker: "patient",
  text: "医生，我说句您可能觉得荒唐的话。生病那两年，是我这辈子……最被需要的时候。我爱人天天围着我，我闺女天天来看我，谁见了我都问『白老师，你怎么样了』。我那时候病着，可我心里是满的。",
  emotion: "sad",
  autoNext: "bl3_c09",
}
```

```ts-dialog
// id: bl3_c09
{
  id: "bl3_c09",
  speaker: "doctor",
  text: "她把生病的两年，称作「最被需要的时候」——这句话的分量，她自己都没察觉有多重。",
  choices: [
    { id: "bl3_c09_a", text: "「你病着的时候心里是满的，好了之后反而空了——你不觉得，这不是你的错吗？」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "bl3_p10" },
    { id: "bl3_c09_b", text: "「『最被需要』——那两年里，有人问过你累不累、怕不怕吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl3_p10" },
  ],
}
```

```ts-dialog
// id: bl3_p10
{
  id: "bl3_p10",
  speaker: "patient",
  text: "（她愣了一下，眼泪又下来）……没有。那两年，大家都在跟我说『你要坚强』『你会好起来的』。没人问过我怕不怕。我也不敢说怕。我怕我一说，他们更担心。我就那么撑着，撑到好了。",
  emotion: "scared",
  autoNext: "bl3_c10",
}
```

```ts-dialog
// id: bl3_c10
{
  id: "bl3_c10",
  speaker: "doctor",
  text: "她撑着病，也撑着所有人的心——那两年，她连怕都不敢怕。",
  choices: [
    { id: "bl3_c10_a", text: "「你撑着撑到好——可那两年里被压下的『怕』，现在才一点点浮上来。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "bl3_p11" },
    { id: "bl3_c10_b", text: "「你那时候想被人问一句『怕不怕』——这句话，你等了多久？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl3_p11" },
  ],
}
```

```ts-dialog
// id: bl3_p11
{
  id: "bl3_p11",
  speaker: "patient",
  text: "（她低着头，声音很轻）……等了五年。医生，我这几年，总做梦。梦里我还躺在病床上，床边围满了人。我一睁眼，就剩下我一个人。醒来我半天缓不过神，分不清哪个才是真的。",
  emotion: "sad",
  autoNext: "bl3_c11",
}
```

```ts-dialog
// id: bl3_c11
{
  id: "bl3_c11",
  speaker: "doctor",
  text: "「分不清哪个才是真的」——她连自己的记忆，都在替那个被围着的自己守着门。",
  choices: [
    { id: "bl3_c11_a", text: "「梦里有人围着你的那份踏实，是你心里最想要、又最不敢要的东西。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "bl3_p12" },
    { id: "bl3_c11_b", text: "「你醒来觉得空——你想要的，是床边的人，还是『有人牵挂你』这件事？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl3_p12" },
  ],
}
```

```ts-dialog
// id: bl3_p12
{
  id: "bl3_p12",
  speaker: "patient",
  text: "（她想了想）……是『有人牵挂我』这件事。我不是想念那张病床。我是想念，那时候全世界都知道我，都在牵挂我。现在我好了，全世界都把我忘了，就剩下我自己，还记得自己是谁。",
  emotion: "neutral",
  autoNext: "bl3_c12",
}
```

```ts-dialog
// id: bl3_c12
{
  id: "bl3_c12",
  speaker: "doctor",
  text: "「全世界都把我忘了，就剩我自己还记得自己是谁」——她今天，比前几天离自己更近了。",
  choices: [
    { id: "bl3_c12_a", text: "「你记得自己是谁——这句话，是你这几天说的最有力的一句。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "bl3_p13" },
    { id: "bl3_c12_b", text: "「那你说说看，白兰是谁？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl3_p13" },
  ],
}
```

```ts-dialog
// id: bl3_p13
{
  id: "bl3_p13",
  speaker: "patient",
  text: "（她张了张嘴，半天没说出来，眼眶红了）……我说不上来。我是老师，是妈妈，是媳妇，是女儿。把这些都拿掉……我一下子，想不起我是谁了。",
  emotion: "sad",
  autoNext: "bl3_c13",
}
```

```ts-dialog
// id: bl3_c13
{
  id: "bl3_c13",
  speaker: "doctor",
  text: "「把角色都拿掉，想不起自己是谁」——她摸到了那个最深的位置。",
  choices: [
    { id: "bl3_c13_a", text: "（陪她停在这个空上，不急着填——这个空，得她自己先待得住。）", kind: "silence", effect: { mood: 2 }, next: "bl3_p14" },
    { id: "bl3_c13_b", text: "「把那些角色拿掉之前，你最早『只是白兰』的时候，是什么样子的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl3_p14" },
  ],
}
```

```ts-dialog
// id: bl3_p14
{
  id: "bl3_p14",
  speaker: "patient",
  text: "最早……（她沉默了很久）最早是写诗的白兰。坐在学校老槐树底下，写了一本又一本。那时候还没人叫我老师，也没人叫我妈妈。就只有我自己，和我的诗。医生，我好像，把那个小姑娘弄丢了好多年。",
  emotion: "sad",
  autoNext: "bl3_c14",
}
```

```ts-dialog
// id: bl3_c14
{
  id: "bl3_c14",
  speaker: "doctor",
  text: "「写诗的白兰」——她在最空的地方，找到了一个她自己都忘了的名字。",
  choices: [
    { id: "bl3_c14_a", text: "「那个写诗的小姑娘，还在箱底等你。下次，把她请出来坐坐。」", kind: "empathy", effect: { mood: 3 }, next: "bl3_out" },
    { id: "bl3_c14_b", text: "「你弄丢了她好多年——她怪过你吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl3_out" },
  ],
}
```

```ts-dialog
// id: bl3_out
{
  id: "bl3_out",
  speaker: "narration",
  text: "白兰走的时候，把那本留言册紧紧抱在怀里。她在门口站了很久，像在把「写诗的白兰」这个名字，在心里念了又念。转身下楼时，她的背挺得比来时直了一些。",
  beatEnd: { resumeNode: "bl4_start" },
  autoNext: "bl4_start",
}
```

### 节拍 4 · 根源信念（trust 57→65，truth ~40→~55，[m2 碎片 @50]，恶化入口 c01 @trust≤55）

```ts-dialog
// id: bl4_start
{
  id: "bl4_start",
  speaker: "narration",
  text: "白兰这次来，眼睛是红的。她从贴身口袋里，小心翼翼地掏出一张对折的纸条，纸已经发黄，边角被摩挲得起了毛。她说，这是化疗那阵子，闺女塞在她枕头底下的，她藏了好几年，谁也没给看过。",
  autoNext: "bl4_p01",
}
```

```ts-dialog
// id: bl4_p01
{
  id: "bl4_p01",
  speaker: "patient",
  text: "医生，您让我说的那件事……我翻出来了。我闺女那会儿刚上大学，隔着几百里，给我写了这张纸条。我藏了好几年。她要是知道我还留着，该笑话我了。",
  emotion: "sad",
  autoNext: "bl4_c01",
}
```

```ts-dialog
// id: bl4_c01
{
  id: "bl4_c01",
  speaker: "doctor",
  text: "她把一张纸条，贴身带了好几年——那上面不只是四个字，是她整个生病期间，唯一握得住的东西。",
  choices: [
    { id: "bl4_c01_a", text: "「藏了好几年，今天愿意拿出来——你已经准备好了。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "bl4_p02" },
    { id: "bl4_c01_b", text: "「纸条上写了什么？你念给我听听。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl4_p02" },
    { id: "bl4_c01_c", text: "「一张纸条而已，你天天藏着干什么，不就是自己放不下吗。」", kind: "logic", require: { trustAtMost: 55 }, effect: { trust: -10, defense: 12, mood: -5 }, next: "bl4_w01", hint: "信任低时可见" },
  ],
}
```

```ts-dialog
// id: bl4_p02
{
  id: "bl4_p02",
  speaker: "patient",
  text: "（她把纸条展开，看着）「妈妈加油」。就这四个字。我闺女写字不好看，这四个字写得歪歪扭扭的。我看了哭，哭了看，把纸条都摸软了。我那时候想，我要是走了，我闺女就没人疼了，我得撑住。",
  emotion: "sad",
  autoNext: "bl4_c02",
}
```

```ts-dialog
// id: bl4_c02
{
  id: "bl4_c02",
  speaker: "doctor",
  text: "「妈妈加油」四个字，她摸了五年——她撑着活下来的那根绳，是「有人要我活着」。",
  choices: [
    { id: "bl4_c02_a", text: "「四个字，你摸了五年——那上面，有你的牵挂，也有她的牵挂。」", kind: "empathy", effect: { mood: 3 }, next: "bl4_p03" },
    { id: "bl4_c02_b", text: "「你撑住，是因为『有人要我活着』——可你现在好了，这根绳，还在吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl4_p03" },
  ],
}
```

```ts-dialog
// id: bl4_p03
{
  id: "bl4_p03",
  speaker: "patient",
  text: "（她握着纸条，手有点抖）……不在了。她那时候需要我撑住，我就撑住了。现在我好了，她不需要我撑了。我手里这根绳，就断了。我握着它，不知道往哪儿系。",
  emotion: "sad",
  autoNext: "bl4_c03",
}
```

```ts-dialog
// id: bl4_c03
{
  id: "bl4_c03",
  speaker: "doctor",
  text: "「绳断了，不知道往哪儿系」——她不是要病，是要那根被人需要的绳。",
  choices: [
    { id: "bl4_c03_a", text: "「你这几年空，不是因为病好了——是因为系着你活下来的那根绳，还没找到新的地方。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "bl4_p04" },
    { id: "bl4_c03_b", text: "「你觉得，那根绳只能系在『被人需要』上吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl4_p04" },
  ],
}
```

```ts-dialog
// id: bl4_p04
{
  id: "bl4_p04",
  speaker: "patient",
  text: "（她停了一会儿）……我好像，只会往那儿系。我小时候，我爸妈说『你是姐姐，要让着弟弟』，我就让着，这样他们需要我。长大了教书，学生需要我，我就使劲教。生了病，全家需要我撑着，我就撑。我这辈子，都是在『被需要』里找自己的。",
  emotion: "neutral",
  autoNext: "bl4_c04",
}
```

```ts-dialog
// id: bl4_c04
{
  id: "bl4_c04",
  speaker: "doctor",
  text: "她把自己的一生，短短几句就数完了——每一句，都落在「被需要」三个字上。",
  choices: [
    { id: "bl4_c04_a", text: "「你这一生，都在『被需要』里找自己的位置——这个位置塌了，你才空。」", kind: "empathy", effect: { mood: 2 }, next: "bl4_p05" },
    { id: "bl4_c04_b", text: "「小时候让着弟弟，是爸妈要你让，还是你自己想让？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl4_p05" },
  ],
}
```

```ts-dialog
// id: bl4_p05
{
  id: "bl4_p05",
  speaker: "patient",
  text: "（她沉默了很久）……是爸妈要的。可我也学会了，让着，才被夸懂事；有用，才被看得起。我不让、没用，就没人要我。医生，我好像从来没敢想过：如果我停下来，不再有用，还会不会有人要我。",
  emotion: "scared",
  autoNext: "bl4_c05",
}
```

```ts-dialog
// id: bl4_c05
{
  id: "bl4_c05",
  speaker: "doctor",
  text: "「如果我不再有用，还会不会有人要我」——这是她这一生，最不敢问的一句话。",
  choices: [
    { id: "bl4_c05_a", text: "「你把『被要』和『有用』焊在了一起——现在，可以试着拆开了。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "bl4_p06" },
    { id: "bl4_c05_b", text: "「『有用才有人要』——这个等式，是谁写在你心里的？」", kind: "probe", require: { trust: 45 }, effect: { trust: 2, truth: 3 }, next: "bl4_p06", hint: "需要信任≥45" },
  ],
}
```

```ts-dialog
// id: bl4_p06
{
  id: "bl4_p06",
  speaker: "patient",
  text: "（她声音发抖）……我妈。我小时候，我妈总说『你要争气，别让人瞧不起』。我争了一辈子气，就是怕被人瞧不起，怕人家觉得我没用，不要我。我把自己活成了『有用』两个字，活到把自己的名字都忘了。",
  emotion: "scared",
  autoNext: "bl4_c06",
}
```

```ts-dialog
// id: bl4_c06
{
  id: "bl4_c06",
  speaker: "doctor",
  text: "「把自己活成『有用』两个字」——她终于摸到了那根绳的另一头，系在母亲手里。",
  choices: [
    { id: "bl4_c06_a", text: "「你母亲要你争气，是怕你被人瞧不起——可她从没说过，你本身已经够好了。」", kind: "empathy", effect: { mood: 3 }, next: "bl4_p07" },
    { id: "bl4_c06_b", text: "「你把自己的名字都忘了——那『白兰』两个字，你打算什么时候认回来？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl4_p07" },
  ],
}
```

```ts-dialog
// id: bl4_p07
{
  id: "bl4_p07",
  speaker: "doctor",
  text: "她站在那个焊点上了——「有用才有资格被爱」，这条规矩跟了她半辈子。",
  choices: [
    { id: "bl4_p07_a", text: "「你怕自己停下来，就不再有用、不再有人要——可你停下来的这几年，谁真的不要你了？」", kind: "empathy", effect: { mood: 2 }, next: "bl4_p08" },
    { id: "bl4_p07_b", text: "「『有用才有资格被爱』——这条规矩，你今天还认吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl4_p08" },
    { id: "bl4_p07_c", text: "「儿孙自有儿孙福，你就安享晚年吧，想这些有什么用。」", kind: "logic", effect: { trust: -10, defense: 10, mood: -4 }, next: "bl4_r01" },
  ],
}
```

```ts-dialog
// id: bl4_r01
{
  id: "bl4_r01",
  speaker: "patient",
  text: "（她抬起头，声音又冷又哑）安享晚年。医生，我不是不想安享，是我安不下来。您说的『享福』，跟我这辈子学的，不是一回事。我学了一辈子『有用』，您现在让我学『没用』，我不会。",
  emotion: "broken",
  autoNext: "bl4_p08",
}
```

```ts-dialog
// id: bl4_p08
{
  id: "bl4_p08",
  speaker: "patient",
  text: "（她缓了缓）……医生，我怕。我要是真的学会不为任何人活，我……我还剩下什么？我这一辈子，全在别人身上。我自己的那块，是空的。我怕我一转身去看，发现那里什么都没有。",
  emotion: "sad",
  autoNext: "bl4_c08",
}
```

```ts-dialog
// id: bl4_c08
{
  id: "bl4_c08",
  speaker: "doctor",
  text: "她不是怕「没有」，是怕看清「空」之后，不知道自己拿什么站。",
  choices: [
    { id: "bl4_c08_a", text: "（陪她站在这个「空」旁边，不急着填——她第一次敢看它了。）", kind: "silence", effect: { mood: 2 }, next: "bl4_p09" },
    { id: "bl4_c08_b", text: "「你怕那块是空的——可你刚才，不是想起来了『写诗的白兰』吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl4_p09" },
  ],
}
```

```ts-dialog
// id: bl4_p09
{
  id: "bl4_p09",
  speaker: "patient",
  text: "（她愣了一下，眼泪又下来，但没再躲）……对。写诗的白兰。我回去翻了箱底，那本旧本子还在。纸都黄了，字还认得出。我年轻时写过『我是一棵白兰，也要有人来闻』。那时候的我，多敢想啊。",
  emotion: "calm",
  autoNext: "bl4_c09",
}
```

```ts-dialog
// id: bl4_c09
{
  id: "bl4_c09",
  speaker: "doctor",
  text: "「我是一棵白兰，也要有人来闻」——二十岁的她，早把今天的话写好了。",
  choices: [
    { id: "bl4_c09_a", text: "「你二十岁就敢说『要有人来闻』——现在五十岁，怎么反而不敢了？」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "bl4_p10" },
    { id: "bl4_c09_b", text: "「『也要有人来闻』——你想要的那份被看见，现在是谁欠你的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl4_p10" },
  ],
}
```

```ts-dialog
// id: bl4_p10
{
  id: "bl4_p10",
  speaker: "patient",
  text: "……没人欠我。是我自己不敢要了。我总觉得，我好了，就不该再跟人要什么了。我该知足，该感恩，该一个人把日子过好。可我心里那棵白兰，它……它还是想被人闻一闻。",
  emotion: "sad",
  autoNext: "bl4_c10",
}
```

```ts-dialog
// id: bl4_c10
{
  id: "bl4_c10",
  speaker: "doctor",
  text: "「它还是想被人闻一闻」——那棵被她压下去几十年的白兰，今天冒出芽来了。",
  choices: [
    { id: "bl4_c10_a", text: "「你好了，所以『不该再要』——可被爱，什么时候变成了要『配得上』才行的？」", kind: "empathy", effect: { mood: 2 }, next: "bl4_p11" },
    { id: "bl4_c10_b", text: "「『我好了就不该要』——这句话，是你妈说的，还是你自己信的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl4_p11" },
  ],
}
```

```ts-dialog
// id: bl4_p11
{
  id: "bl4_p11",
  speaker: "patient",
  text: "（她沉默了很久，声音很轻）……我自己信的。我妈说的是『要争气』。我自己把它翻译成了『要坚强、要感恩、不能要』。我给自己加了这么多锁，把自己关得死死的。医生，我想开锁，可我不会。",
  emotion: "scared",
  autoNext: "bl4_c11",
}
```

```ts-dialog
// id: bl4_c11
{
  id: "bl4_c11",
  speaker: "doctor",
  text: "「我想开锁，可我不会」——她第一次，主动想解那把锁了。",
  choices: [
    { id: "bl4_c11_a", text: "「你今天能说出『想开锁』，钥匙就已经在你手里了——它叫『我想被爱』。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "bl4_p12" },
    { id: "bl4_c11_b", text: "「你给自己上的第一道锁，是什么时候上的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl4_p12" },
  ],
}
```

```ts-dialog
// id: bl4_p12
{
  id: "bl4_p12",
  speaker: "patient",
  text: "……小时候。我弟弟摔哭了，我妈说『你是姐姐，别添乱』。我从此就学会了，不能添乱，不能要。后来生病，我更不能要了，全家都围着我了，我要是还要，那不是得寸进尺吗。",
  emotion: "sad",
  autoNext: "bl4_c12",
}
```

```ts-dialog
// id: bl4_c12
{
  id: "bl4_c12",
  speaker: "doctor",
  text: "「全家都围着我了，我更不能要了」——她连被爱的时候，都怕自己「要」得太多。",
  choices: [
    { id: "bl4_c12_a", text: "「你被全家围着的时候，也一句『我需要你们』没说过——那份被爱，你接得忐忑吗？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "bl4_p13" },
    { id: "bl4_c12_b", text: "「那时候，如果有人说一句『妈，你可以不用坚强』，你会怎样？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl4_p13" },
  ],
}
```

```ts-dialog
// id: bl4_p13
{
  id: "bl4_p13",
  speaker: "patient",
  text: "（她攥着纸条，眼泪滴在「加油」两个字上）……我会哭出来。五年了，没人跟我说过这句话。医生，我不是想念生病。我是想念……有人把我当回事。这句话，我今天终于敢说了。",
  emotion: "sad",
  autoNext: "bl4_c13",
}
```

```ts-dialog
// id: bl4_c13
{
  id: "bl4_c13",
  speaker: "doctor",
  text: "「我不是想念生病，我是想念有人把我当回事」——她亲手把这两件事分开了。这是她这几天，最重要的一句话。",
  choices: [
    { id: "bl4_c13_a", text: "「你分开了它们——那你想要的，从来不是病，是被爱。这不羞耻，这很正常。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "bl4_p14" },
    { id: "bl4_c13_b", text: "「『把我当回事』——你现在最想让谁，把你当回事？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl4_p14" },
  ],
}
```

```ts-dialog
// id: bl4_p14
{
  id: "bl4_p14",
  speaker: "patient",
  text: "……我闺女。还有我爱人。我想让他们知道，妈不是全好了。妈心里有个空，妈想了五年，才敢说出口。医生，我想让我闺女陪我来一趟。有些话，我想当着她的面说。",
  emotion: "calm",
  autoNext: "bl4_c14",
}
```

```ts-dialog
// id: bl4_c14
{
  id: "bl4_c14",
  speaker: "doctor",
  text: "她想让女儿来——这是她五年里，第一次准备把自己打开给家人看。",
  choices: [
    { id: "bl4_c14_a", text: "「你愿意让她们看见你的空——这句话，比那张纸条还重。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "bl4_out" },
    { id: "bl4_c14_b", text: "「你想跟女儿说的第一句，会是什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl4_out" },
  ],
}
```

```ts-dialog
// id: bl4_out
{
  id: "bl4_out",
  speaker: "narration",
  text: "白兰走的时候，把那张纸条小心地放回贴身口袋。她走到门口，停了一下，回头说：「医生，我下次带她来。您……得陪着我。」说完自己先笑了，眼睛却是湿的。",
  beatEnd: { resumeNode: "bl5_start" },
  autoNext: "bl5_start",
}
```

#### 失误分支（恶化路径）

```ts-dialog
// id: bl4_w01
{
  id: "bl4_w01",
  speaker: "patient",
  text: "（她的脸一下子垮下来，纸条从手里滑到桌上）……您也这么说。我爱人这么说，我闺女这么说，连您也这么说——『不就是一张纸条吗，放不下』。行。那我也不折腾了。我本来就不该来。",
  emotion: "broken",
  autoNext: "bl4_w02",
}
```

```ts-dialog
// id: bl4_w02
{
  id: "bl4_w02",
  speaker: "doctor",
  text: "话赶话，把她推到了那个「我不该来」的坡上。现在得看还能不能拉一把。",
  choices: [
    { id: "bl4_w02_a", text: "「你就是放不下，才会把日子过成这样——你就是想太多了。」", kind: "logic", effect: { trust: -6, defense: 8, mood: -4 }, next: "bl4_w03" },
    { id: "bl4_w02_b", text: "（你意识到自己说重了，想补救。）「我不是那个意思，我是说——」", kind: "empathy", effect: { trust: -3, mood: -3 }, next: "bl4_w03" },
  ],
}
```

```ts-dialog
// id: bl4_w03
{
  id: "bl4_w03",
  speaker: "patient",
  text: "（她站起身，把纸条攥进手心，声音很轻）……不用补救了。您说得对，我放不下，是我不知足。我好了，就该自己好好过。是我贪心，还想有人惦记。我走了，别再找我了。",
  emotion: "broken",
  autoNext: "bl_end_worsen",
}
```

### 节拍 5 · 转向+结局（trust 65→70，truth ~55→70，fork：cure / acceptance / hidden @65）

```ts-dialog
// id: bl5_start
{
  id: "bl5_start",
  speaker: "narration",
  text: "最后一次会谈。白兰的女儿小禾在候诊室里等着。白兰先进来，坐定后，把那张纸条放在桌上，又把它拿起来，放回口袋，再拿出来——反复了几次。最后她深吸一口气，说：「医生，您让她进来吧。我想好了。」",
  autoNext: "bl5_p01",
}
```

```ts-dialog
// id: bl5_p01
{
  id: "bl5_p01",
  speaker: "patient",
  text: "医生，我闺女在外头。我还没跟她说。我想先跟您说——我想通了。我不是想生病。我是不敢说，我想被人这样在乎。这五年，我把这份想念，藏成了『我想生病』，把自己吓坏了。",
  emotion: "sad",
  autoNext: "bl5_c01",
}
```

```ts-dialog
// id: bl5_c01
{
  id: "bl5_c01",
  speaker: "doctor",
  text: "「我不是想生病，我是想被人这样在乎」——她把压在心底五年的话，说出来了。",
  choices: [
    { id: "bl5_c01_a", text: "「这句话，你花了五年才说出口。它不羞耻，它是你最真的想念。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "bl5_p02" },
    { id: "bl5_c01_b", text: "「『想被人这样在乎』——你上次被这样在乎，是什么时候？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl5_p02" },
  ],
}
```

```ts-dialog
// id: bl5_p02
{
  id: "bl5_p02",
  speaker: "patient",
  text: "（她哭出来）……生病那会儿。我贪恋被人心疼，这话我一直不敢认。我怕说出来，人家说我都好了还矫情。可它就是真的。我渴了好几年了，渴有人问我一句『你今天怎么样』。",
  emotion: "sad",
  autoNext: "bl5_c02",
}
```

```ts-dialog
// id: bl5_c02
{
  id: "bl5_c02",
  speaker: "doctor",
  text: "「你渴的不是生病，是被在乎」——这两件事，今天在你嘴里，终于分开了。",
  choices: [
    { id: "bl5_c02_a", text: "「你渴了五年，今天敢说出口了——这份诚实，是你送给自己最好的礼物。」", kind: "empathy", effect: { mood: 3 }, next: "bl5_p03" },
    { id: "bl5_c02_b", text: "「那句『你今天怎么样』，你想让谁对你说？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl5_p03" },
  ],
}
```

```ts-dialog
// id: bl5_p03
{
  id: "bl5_p03",
  speaker: "patient",
  text: "……我闺女。医生，我今天想叫我闺女进来。我想告诉她，妈不是全好了。妈心里有个空，妈想了五年才敢说。妈想学着，往这个空里装点别的——装点我自己。",
  emotion: "calm",
  autoNext: "bl5_c03",
}
```

```ts-dialog
// id: bl5_c03
{
  id: "bl5_c03",
  speaker: "doctor",
  text: "「往空里装点我自己」——她第一次，想把位置留给自己了。",
  choices: [
    { id: "bl5_c03_a", text: "「你愿意让女儿看见你的空——这是你给自己，也是给她的礼物。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "bl5_p04" },
    { id: "bl5_c03_b", text: "「你打算怎么跟她说第一句？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl5_p04" },
  ],
}
```

```ts-dialog
// id: bl5_p04
{
  id: "bl5_p04",
  speaker: "patient",
  text: "……我有点怕。她要是觉得她妈变脆弱了，会不会更担心我？她工作那么忙，我不想让她把日子都花在照顾我身上。我一辈子怕给人添麻烦，到头来，还是要麻烦她。",
  emotion: "scared",
  autoNext: "bl5_c04",
}
```

```ts-dialog
// id: bl5_c04
{
  id: "bl5_c04",
  speaker: "doctor",
  text: "「怕添麻烦」——她把自己对女儿的爱，也算进了「麻烦」里。",
  choices: [
    { id: "bl5_c04_a", text: "「你怕被照顾，又渴望被爱——这两样，可以同时有，它们不是一回事。」", kind: "empathy", effect: { mood: 2 }, next: "bl5_p05" },
    { id: "bl5_c04_b", text: "「『添麻烦』——你女儿小时候生病，你觉得她是麻烦吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl5_p05" },
  ],
}
```

```ts-dialog
// id: bl5_p05
{
  id: "bl5_p05",
  speaker: "patient",
  text: "（她愣住）……她小时候感冒发烧，我整夜不睡守着，从来没觉得她是麻烦。医生，我活了五十多年，一直以为，被照顾就是累赘，被爱就得有用。您说，一个没用的老太太，能被人爱吗？",
  emotion: "neutral",
  autoNext: "bl5_c05",
}
```

```ts-dialog
// id: bl5_c05
{
  id: "bl5_c05",
  speaker: "doctor",
  text: "「一个没用的老太太，能被人爱吗」——她把自己，问得那么小心翼翼。",
  choices: [
    { id: "bl5_c05_a", text: "「你女儿小时候，什么都不会，也不是什么『有用』的人——你不是照样爱她爱得不得了？」", kind: "empathy", effect: { mood: 2 }, next: "bl5_p06" },
    { id: "bl5_c05_b", text: "「『有用才配被爱』——这条规矩，你打算跟它较劲到什么时候？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl5_p06" },
  ],
}
```

```ts-dialog
// id: bl5_p06
{
  id: "bl5_p06",
  speaker: "patient",
  text: "（她想了想，眼泪还在，声音却稳了）……我闺女小时候，连话都不会说，我抱着她，从来没想过她有没有用。原来爱，不是用『有用』换的。那我，为什么老要自己有用，才配被人爱？",
  emotion: "calm",
  autoNext: "bl5_c06",
}
```

```ts-dialog
// id: bl5_c06
{
  id: "bl5_c06",
  speaker: "doctor",
  text: "她把「爱不是用有用换的」这句话，第一次说给了自己听。",
  choices: [
    { id: "bl5_c06_a", text: "「因为你从小被教，只有争气、只有有用，才配被看得起——可那不是真的。」", kind: "empathy", effect: { mood: 2 }, next: "bl5_p07" },
    { id: "bl5_c06_b", text: "「你女儿爱你，是因为你是白兰——不是因为你是老师、是妈妈、是有用的人。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl5_p07" },
  ],
}
```

```ts-dialog
// id: bl5_p07
{
  id: "bl5_p07",
  speaker: "patient",
  text: "（她擦干眼泪，眼睛很亮）……医生，我想好了。我想叫我闺女进来，当着她面跟她说：妈这阵子不舒坦，不是身体，是心里。妈想学着自己活，也想学着被人爱。妈这辈子，还没跟人这样开过口。",
  emotion: "calm",
  autoNext: "bl5_c07",
}
```

```ts-dialog
// id: bl5_c07
{
  id: "bl5_c07",
  speaker: "doctor",
  text: "她准备把藏了五年的话，当着女儿的面说出来了——这是她这几次会谈，最勇敢的一次。",
  choices: [
    { id: "bl5_c07_a", text: "「你准备好了，我们就叫她进来。你开口的这一刻，我陪着你。」", kind: "empathy", effect: { mood: 3 }, next: "bl5_fork" },
    { id: "bl5_c07_b", text: "「你想让女儿听见的第一句，是『我需要你』，还是『我爱你』？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl5_fork" },
  ],
}
```

```ts-dialog
// id: bl5_fork
{
  id: "bl5_fork",
  speaker: "doctor",
  text: "走到这里，有个分岔得你来选。你手里有那张纸条，有「我不是想念生病」这句话，女儿也坐在外头等你。你打算，怎么推开这扇门？",
  choices: [
    { id: "bl5_fork_a", text: "「我们先把这份「开锁」的事，落成一张清单：你想重拾的诗、每周三女儿来看你的固定日子、你想跟我说的任何话。让这张网，先替你兜一阵。」", kind: "special", effect: { trust: 1, mood: 3 }, next: "bl5_s01" },
    { id: "bl5_fork_b", text: "「你不用今天就全说开。带着『我不是在等生病，我是在等被爱』这句话，先慢慢学着，也是一种答案。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "bl5_a01" },
    { id: "bl5_fork_c", text: "「你母亲那句『要争气』，压了你五十多年。今天，当着你的面，也当着它的面，我想替你说一句：白兰，你早就不用争气了。」", kind: "confront", require: { trust: 65 }, effect: { trust: 1, truth: 3, mood: -2 }, next: "bl5_h01", hint: "需要信任≥65" },
  ],
}
```

#### 安全网路径（cure 主线）

```ts-dialog
// id: bl5_s01
{
  id: "bl5_s01",
  speaker: "patient",
  text: "（她看着那张白纸，又看看门口）……清单。我活了五十多年，列的都是别人的清单：课程表、作业本、菜市场要买什么。列我自己的……我还没试过。",
  emotion: "neutral",
  autoNext: "bl5_s02",
}
```

```ts-dialog
// id: bl5_s02
{
  id: "bl5_s02",
  speaker: "doctor",
  text: "她这辈子都在替别人列清单，第一次要列一张给自己的。",
  choices: [
    { id: "bl5_s02_a", text: "「第一行，就写今天最简单的：每周三，我闺女来看我，我们一起去买菜。」", kind: "empathy", effect: { mood: 3 }, next: "bl5_s03" },
    { id: "bl5_s02_b", text: "「这张清单上，你最想先写哪一件？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl5_s03" },
  ],
}
```

```ts-dialog
// id: bl5_s03
{
  id: "bl5_s03",
  speaker: "patient",
  text: "（她笑了，眼眶却是红的）……就写这个。我以前总觉得，把日子放在别人身上是没出息。现在我想通了，有个人惦记我，是我该得的。我想理直气壮地要一回。",
  emotion: "calm",
  autoNext: "bl5_s04",
}
```

```ts-dialog
// id: bl5_s04
{
  id: "bl5_s04",
  speaker: "doctor",
  text: "「我想理直气壮地要一回」——她等这句话，等了五十年。",
  choices: [
    { id: "bl5_s04_a", text: "「『该得的』这三个字，你等了好多年才说出口。今天它出来了，就别再收回去。」", kind: "empathy", effect: { mood: 3 }, next: "bl5_s05" },
    { id: "bl5_s04_b", text: "「『要一回』——你想要的第二件，是什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl5_s05" },
  ],
}
```

```ts-dialog
// id: bl5_s05
{
  id: "bl5_s05",
  speaker: "patient",
  text: "……写诗。我教了一辈子学生认字，现在想给自己写写字。那本箱底的本子，我昨天翻出来了，第一页还是空白的。我有点不敢下笔——怕写出来的，不是年轻时那个白兰了。",
  emotion: "calm",
  autoNext: "bl5_s06",
}
```

```ts-dialog
// id: bl5_s06
{
  id: "bl5_s06",
  speaker: "doctor",
  text: "她怕写出来的不是年轻时的自己——可她现在，比年轻时更知道想要什么。",
  choices: [
    { id: "bl5_s06_a", text: "「你教了一辈子学生认字——现在轮到你，给自己认字了。写什么都是你。」", kind: "empathy", effect: { mood: 3 }, next: "bl5_s07" },
    { id: "bl5_s06_b", text: "「年轻时的白兰写了什么，你还记得吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl5_s07" },
  ],
}
```

```ts-dialog
// id: bl5_s07
{
  id: "bl5_s07",
  speaker: "patient",
  text: "记得。写『我是一棵白兰，也要有人来闻』。年轻的我多敢啊。现在的我，把这棵树，藏了半辈子，差点忘了自己会开花。医生，您说，我要是现在重新写，还来得及吗？",
  emotion: "calm",
  autoNext: "bl5_s08",
}
```

```ts-dialog
// id: bl5_s08
{
  id: "bl5_s08",
  speaker: "doctor",
  text: "「还来得及吗」——她问得小心翼翼，像怕那个答案会跑掉。",
  choices: [
    { id: "bl5_s08_a", text: "「你五十岁问『还来得及吗』——你女儿三岁的时候，可没问过『我还能学会走路吗』。她想走，就迈步了。」", kind: "empathy", effect: { mood: 3 }, next: "bl5_s09" },
    { id: "bl5_s08_b", text: "「来得及。你不是在找回年轻的白兰，你是在写一个不再躲的白兰。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl5_s09" },
  ],
}
```

```ts-dialog
// id: bl5_s09
{
  id: "bl5_s09",
  speaker: "patient",
  text: "（她站起身，走到门口，又回头看你）……医生，我叫我闺女进来了。我想让她看看，她妈不是只会擦桌子、剥豆子。她妈心里，还有一棵白兰。我还没跟人说过这话。",
  emotion: "calm",
  autoNext: "bl5_s10",
}
```

```ts-dialog
// id: bl5_s10
{
  id: "bl5_s10",
  speaker: "doctor",
  text: "她要去给女儿开门了——开门这个动作，她心里排练了五年。",
  choices: [
    { id: "bl5_s10_a", text: "「你开口的那一刻，把那棵白兰一起带出去。它值得被人看见。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "bl5_s11" },
    { id: "bl5_s10_b", text: "「你想跟女儿说的第一句，还是那句『妈心里有个空』吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl5_s11" },
  ],
}
```

```ts-dialog
// id: bl5_s11
{
  id: "bl5_s11",
  speaker: "patient",
  text: "（女儿小禾推门进来。白兰站起来，拉了她的手，眼眶红了，声音却稳）……闺女，妈心里空了好几年，一直没敢跟你说。妈不是全好了。妈是想学着，有你在，妈愿意试着好。",
  emotion: "calm",
  autoNext: "bl5_s12",
}
```

```ts-dialog
// id: bl5_s12
{
  id: "bl5_s12",
  speaker: "doctor",
  text: "她把藏了五年的话，当着女儿的面说出来了——诊室里一下子很静，静得能听见两个人的呼吸。",
  choices: [
    { id: "bl5_s12_a", text: "（让这间屋子安静一会儿，不急着说话——这句话，值得被听见。）", kind: "silence", effect: { mood: 3 }, next: "bl5_s13" },
    { id: "bl5_s12_b", text: "「你这一句，比那张『妈妈加油』的纸条，重得多。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl5_s13" },
  ],
}
```

```ts-dialog
// id: bl5_s13
{
  id: "bl5_s13",
  speaker: "patient",
  text: "（女儿握紧她的手。她笑中带泪，接着往下说）……那张纸条，我摸了五年。今天我想通了，不用再摸它了。我要把它收进相册，跟咱们全家的照片放一块儿。它不该是撑着我活的东西了，它该是咱家的回忆。",
  emotion: "calm",
  autoNext: "bl5_s14",
}
```

```ts-dialog
// id: bl5_s14
{
  id: "bl5_s14",
  speaker: "doctor",
  text: "「它该是咱家的回忆」——她把那根撑着她活下来的绳，重新系到了家人的爱上。",
  choices: [
    { id: "bl5_s14_a", text: "「它从『妈妈加油』，变成了你们的回忆——这五年，你没有辜负它。」", kind: "empathy", effect: { mood: 3 }, next: "bl5_s15" },
    { id: "bl5_s14_b", text: "「现在那根绳系到哪儿了？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl5_s15" },
  ],
}
```

```ts-dialog
// id: bl5_s15
{
  id: "bl5_s15",
  speaker: "patient",
  text: "（她看着女儿，又看着你，眼睛弯弯的）……系到我自己这儿了。医生，我想每周三去闺女家吃饭，不用她来接我，我自己去。我想让她们知道，我是自愿去的，不是她们该孝顺我。我是想她们了，我就是想她们了。",
  emotion: "happy",
  autoNext: "bl5_s16",
}
```

```ts-dialog
// id: bl5_s16
{
  id: "bl5_s16",
  speaker: "doctor",
  text: "「我就是想她们了」——她说这句话时，不再需要任何借口。",
  choices: [
    { id: "bl5_s16_a", text: "「这句话，是你这辈子，最理直气壮的一句『我要』。带走它。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "bl_end_cure" },
    { id: "bl5_s16_b", text: "「不靠生病，也允许自己被人爱——你今天，做到了。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl_end_cure" },
  ],
}
```

#### 接纳路径（acceptance）

```ts-dialog
// id: bl5_a01
{
  id: "bl5_a01",
  speaker: "patient",
  text: "（她点点头，又看了一眼门口）……带着这句话先学着。您说得对，我可能没法一下子全说开。我先把『我不是在等生病，我是在等被爱』这句话，在心里念熟了。",
  emotion: "neutral",
  autoNext: "bl5_a02",
}
```

```ts-dialog
// id: bl5_a02
{
  id: "bl5_a02",
  speaker: "doctor",
  text: "她选择了先跟自己和解——没彻底掀开，但她不再躲。",
  choices: [
    { id: "bl5_a02_a", text: "「带着这句话，比带着那张纸条轻多了。你先把自己念熟了再说。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "bl5_a03" },
    { id: "bl5_a02_b", text: "「念这句话的时候，你最想讲给谁听？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl5_a03" },
  ],
}
```

```ts-dialog
// id: bl5_a03
{
  id: "bl5_a03",
  speaker: "patient",
  text: "……讲给我闺女。我还不确定怎么开口。但我答应您，也答应自己：她下次回来，我至少跟她说一句『妈这阵子想你了』。就这一句，先练起来。",
  emotion: "calm",
  autoNext: "bl5_a04",
}
```

```ts-dialog
// id: bl5_a04
{
  id: "bl5_a04",
  speaker: "doctor",
  text: "「妈这阵子想你了」——这句她排练了五年的话，今天终于有了一个可以落脚的版本。",
  choices: [
    { id: "bl5_a04_a", text: "「就这一句，够了。剩下的，等你说完这一句，自然就跟着出来了。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "bl5_a05" },
    { id: "bl5_a04_b", text: "「你说完这句，最想听她回你一句什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "bl5_a05" },
  ],
}
```

```ts-dialog
// id: bl5_a05
{
  id: "bl5_a05",
  speaker: "patient",
  text: "（她想了想，眼睛亮了一下）……听她说『妈，我也想你了』。就这一句，我等了五年。医生，我先把这句话等来。日子，慢慢过。那棵白兰，也慢慢开。",
  emotion: "calm",
  autoNext: "bl_end_accept",
}
```

#### 隐藏路径（hidden · 替白兰开口）

```ts-dialog
// id: bl5_h01
{
  id: "bl5_h01",
  speaker: "patient",
  text: "（她愣了很久，眼眶慢慢红了）……替我说那句『不用争气了』？医生，从来没有人替我说过这句话。我……我答应。可我怕，我听完，会哭得停不下来。",
  emotion: "scared",
  autoNext: "bl5_h02",
}
```

```ts-dialog
// id: bl5_h02
{
  id: "bl5_h02",
  speaker: "doctor",
  text: "她怕的不是那句「不用争气」，是那句背后，五十多年的委屈一下子涌上来。",
  choices: [
    { id: "bl5_h02_a", text: "「哭得停不下来就停不下来。那句话，你等了几十年，值得一次痛快的哭。今天，我陪你哭完。」", kind: "special", effect: { truth: 3, mood: -2 }, next: "bl5_h03" },
    { id: "bl5_h02_b", text: "「你要是还没准备好，我们就先把那句话放着，等你愿意听的那天。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "bl5_h04" },
  ],
}
```

```ts-dialog
// id: bl5_h03
{
  id: "bl5_h03",
  speaker: "patient",
  text: "（她咬着嘴唇，眼泪大颗大颗地掉，却点了点头）……您说。您替我说。我听着。我等着这句话，等了五十多年了。",
  emotion: "broken",
  autoNext: "bl_end_hidden",
}
```

```ts-dialog
// id: bl5_h04
{
  id: "bl5_h04",
  speaker: "patient",
  text: "（她深吸一口气，把眼泪逼回去一点）……我先放一放。可我答应您，也答应我自己：等我觉得能听的那天，我会回来。我会学着，对自己说那句『不用争气了』。谢谢您，替我想着这句话。",
  emotion: "calm",
  autoNext: "bl_end_accept",
}
```

---

## 四、结局

```ts-dialog
// id: bl_end_cure
{
  id: "bl_end_cure",
  speaker: "narration",
  text: "〔结局 · 治愈〕",
  isEnding: true,
  endingType: "cure",
  endingTitle: "那棵白兰开了",
  endingText: "三个月后，白兰来信。信里夹着一张照片：她站在女儿家的阳台，捧着一盆刚开的兰花，笑得眼睛弯弯。她说她每周三去女儿家吃饭，不用接，自己坐公交去。她说她翻出箱底的本子，又写诗了，第一句是『我是一棵白兰，今年有人来闻了』。她说那张『妈妈加油』的纸条，她收进了相册，跟全家福放在一起。信末她写：医生，我好了，也敢要了。我没再靠生病，也有人爱我了。",
  endingReward: { doctorReputation: 8, doctorMoney: 300, doctorExp: 50, doctorSanity: 5 },
}
```

```ts-dialog
// id: bl_end_accept
{
  id: "bl_end_accept",
  speaker: "narration",
  text: "〔结局 · 接纳〕",
  isEnding: true,
  endingType: "acceptance",
  endingTitle: "先学会说想你",
  endingText: "白兰没再约新的会谈，但每隔一两个月会来坐一坐。她说她还没敢跟女儿说那句『妈心里有个空』，但她先学会了说『妈这阵子想你了』。她说女儿听了，愣了一下，然后红了眼睛，回了一句『妈，我也想你了』。她为此高兴了好几天。她说那张纸条还在贴身口袋里，但摸得少了。那棵白兰，还没完全开花，但她说：急什么，我这一辈子，头一回学会了等自己。",
  endingReward: { doctorReputation: 4, doctorMoney: 180, doctorExp: 35, doctorSanity: 6 },
}
```

```ts-dialog
// id: bl_end_hidden
{
  id: "bl_end_hidden",
  speaker: "narration",
  text: "〔结局 · 隐藏·不用争气了〕",
  isEnding: true,
  endingType: "hidden",
  endingTitle: "不用争气了",
  endingText: "你替白兰，说出了那句压了她五十多年的话：「白兰，你早就不用争气了。」她在诊室里哭了很久，哭完说，她这辈子，第一次听见这句话。后来她告诉女儿，这句话是医生说的。再后来，她母亲病了，她去医院陪床，鬼使神差地对病床上的母亲说了一句：「妈，你不用争气了，我们谁都没觉得你丢人。」母亲没说话，眼泪顺着眼角流下来。白兰说，她俩谁都没道歉，但那道跨了半辈子的坎，终于有人先迈了一步。",
  endingReward: { doctorReputation: -10, doctorMoney: 100, doctorExp: 80, doctorSanity: -15 },
}
```

```ts-dialog
// id: bl_end_worsen
{
  id: "bl_end_worsen",
  speaker: "narration",
  text: "〔结局 · 恶化〕",
  isEnding: true,
  endingType: "worsen",
  endingTitle: "空了的客厅",
  endingText: "白兰没有再来。她女儿后来给诊室捎来一句话：妈把自己锁在屋里，谁叫都不开。女儿说，妈把这几年攒的奖状、教案、留言册，全都装进了一个大纸箱，搬到楼下，又搬了回来，来回好几趟。女儿问她怎么了，她只说『我在收拾，收拾完就好了』。那张『妈妈加油』的纸条，她最后也没舍得扔。那间空荡荡的客厅，还是没有人来问她一句『你今天怎么样』。",
  endingReward: { doctorReputation: -8, doctorMoney: 50, doctorExp: 10, doctorSanity: -20 },
}
```

---

## 六、状态

- [x] 人物档案完整（一句话核心 / 三层真相 / 角色三角 / 症状意义 / 关键转折）
- [x] 节拍规划表写在剧本开头，数值口径符合信任合并线（empathy 线净 +55 → 15→70）
- [x] v3 结构校验通过 + tsc 通过
- [x] 走线四线全绿
- [ ] 聚合入口（由 parent 处理）
- [ ] 剧本登记表（由 parent 处理）
