# 何静兰 · v3 · 短剧本 · 4 节拍 · 40+ 轮

> 短档示例剧本：一个用「忙碌」填满丧偶之空的女人——她不是走不出来，是不敢停下来。
> 数值：trust 15→28→40→50→58；truth 0→40；碎片 1 枚 @30；恶化入口 trust≤40；隐藏结局 @50；cure 主线 40 轮。
> 生成：`node scripts/md-to-patient.mjs docs/stories/he-jinglan-v3.md --walk`

---

## 〇、人物档案

**姓名** 何静兰，58 岁，退休小学语文教师。丈夫一年前因肺癌去世，独女在深圳工作。她由邻居陪同来诊，邻居说她连续一周凌晨三点在小区花园里坐着不动。

**表象** 失眠、凌晨游荡、把家里打扫得一尘不染。她说「我就是闲不下来，没事的」。看似坚强、得体，把「他走了一年了我挺好的」挂在嘴边。

**真相** 丈夫生病最后半年，她照顾得精疲力竭，有一次夜里丈夫咳血，她心里闪过一丝「要是早点走，他不用受罪我也不用熬了」。丈夫走后，这个念头变成了钉子——她觉得自己「盼着」他死。她不是悲伤，她是愧疚：她用忙碌惩罚自己，因为「我配不上为他难过」。深层根源：她从小被教「好妻子不该有怨气」，她把照顾中的所有疲惫和委屈都压下去，压成了那句没说出口的「你怎么还不走」——她一辈子都在赎一句自己没说过的话。

---

## 一、剧本元信息（ts-meta）

```ts-meta
// id: he_jinglan
// tier: 短
// anchor: 15,28,40,50,58
// truthEnd: 40
// minCureRounds: 40
// fragments: 1
// worsenAtMost: 40
{
  id: "he_jinglan",
  name: "何静兰",
  title: "退休小学语文教师 · 丧偶一年 · 邻居陪同来诊",
  intro: "邻居说她连续一周凌晨三点在小区花园里坐着不动。她由邻居陪着进了诊室，一坐下就说『真没什么大事，我就是闲不下来。』",
  surface: "失眠、凌晨游荡、把家里打扫得一尘不染。她说『我就是闲不下来，没事的』。看似坚强、得体，把『他走了一年了我挺好的』挂在嘴边。",
  truth: "丈夫生病最后半年，她照顾得精疲力竭，有一次夜里丈夫咳血，她心里闪过一丝『要是早点走，他不用受罪我也不用熬了』。丈夫走后，这个念头变成了钉子——她觉得自己『盼着』他死。她不是悲伤，她是愧疚：她用忙碌惩罚自己，因为『我配不上为他难过』。她一辈子都在赎一句自己没说过的话。",
  palette: { primary: "#7a8ba0", secondary: "#b0bcc8", fog: "#6b5d5a", bright: "#e8d5c4" },
  baseReward: 650,
  difficulty: "简单",
  startNode: "hj1_start",
  initialState: { trust: 15, defense: 65, mood: 35, truth: 0, round: 0 },
  memoryFragments: [
    {
      id: "hj_m1",
      trigger: { truth: 30 },
      title: "凌晨三点的咳血",
      text: "他最后半年，夜里三点又咳血了。我起来给他递水、擦嘴、换垫子。他喘着气跟我说『辛苦你了』。我嘴上说『不辛苦』，心里却闪过一句话——『要是早点走，他不用受罪，我也不用熬了』。这个念头只闪了一下，我马上把它按回去了。但它已经在了，像根针，扎进去就拔不出来。",
      emotion: "scared",
    },
  ],
}
```

---

## 二、节拍骨架（ts-dialog 节点）

### 节拍 1 · 初访·表层（trust 15→28，truth 0→22，阻抗：拒绝被当成「走不出来的人」）

```ts-dialog
// id: hj1_start
{
  id: "hj1_start",
  speaker: "narration",
  text: "深秋的下午，候诊区没什么人。何静兰由邻居陪着来的，邻居在门口跟她嘀咕了几句，她拍了拍邻居的手，自己推门进来。她坐得端正，双手叠在膝上，像还在教室里等上课。",
  autoNext: "hj1_p01",
}
```

```ts-dialog
// id: hj1_p01
{
  id: "hj1_p01",
  speaker: "patient",
  text: "医生您好，劳烦您了。我真没什么大事，就是这几天觉不太够使，邻居非说我脸色不好，硬拉我过来。我挺好的，真的——他走了一年了，我把自己照顾得好好的，没让孩子们操心。",
  emotion: "neutral",
  autoNext: "hj1_c01",
}
```

```ts-dialog
// id: hj1_c01
{
  id: "hj1_c01",
  speaker: "doctor",
  text: "她一开口就把「挺好的」「真的」连着说了两遍——像是怕你不信，也怕自己不信。",
  choices: [
    { id: "hj1_c01_a", text: "「你提前把『挺好的』说了一遍又一遍，我倒想听听，那个『挺好』底下压着什么。」", kind: "empathy", effect: { trust: 2, defense: -1 }, next: "hj1_p02" },
    { id: "hj1_c01_b", text: "「邻居硬拉你来——她看见你什么了，你自己没看见？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "hj1_p02" },
    { id: "hj1_c01_c", text: "「老伴走了一年，失眠也正常，调整作息、多出去走走就行。」", kind: "logic", effect: { trust: -8, defense: 8, mood: -4 }, next: "hj1_r01" },
  ],
}
```

```ts-dialog
// id: hj1_r01
{
  id: "hj1_r01",
  speaker: "patient",
  text: "（她笑了笑，却没笑到眼底）您这话说的，我像是有毛病的人吗？我没那么娇气。他就是走了，人总得往前过。我天天把家收拾得干干净净，自己做饭自己吃，这还不算挺好？您别把我当病人。",
  emotion: "angry",
  autoNext: "hj1_p02",
}
```

```ts-dialog
// id: hj1_p02
{
  id: "hj1_p02",
  speaker: "patient",
  text: "……您别误会，我没藏着什么。就是晚上睡不着，白天就把家里收拾收拾。擦地、擦窗、把东西归置整齐。一忙起来，心里就踏实。我这辈子当老师，闲不住的。",
  emotion: "neutral",
  autoNext: "hj1_c02",
}
```

```ts-dialog
// id: hj1_c02
{
  id: "hj1_c02",
  speaker: "doctor",
  text: "她说「忙起来心里就踏实」——反过来就是，一闲下来，心里就不踏实。",
  choices: [
    { id: "hj1_c02_a", text: "「你说忙起来心里踏实——那闲下来的时候，心里是什么感觉？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "hj1_p03" },
    { id: "hj1_c02_b", text: "（不急着追问，让她自己把话说下去。）", kind: "silence", effect: { trust: 1 }, next: "hj1_p03" },
  ],
}
```

```ts-dialog
// id: hj1_p03
{
  id: "hj1_p03",
  speaker: "patient",
  text: "（她的手指无意识地搓着衣角）……闲下来？闲下来也没事干。屋里太静了，静得我能听见自己喘气。我就是习惯动了，不动反而不舒服。擦地也行，归置东西也行，总得找点事做。",
  emotion: "anxious",
  autoNext: "hj1_c03",
}
```

```ts-dialog
// id: hj1_c03
{
  id: "hj1_c03",
  speaker: "doctor",
  text: "她的手指在搓衣角——这是她嘴里说「没事」时，身体在说的另一句话。",
  choices: [
    { id: "hj1_c03_a", text: "「你手一直在搓衣角——你自己注意到了吗？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "hj1_p04" },
    { id: "hj1_c03_b", text: "「『屋里太静了』——这个静，是什么时候开始的？」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "hj1_p04" },
  ],
}
```

```ts-dialog
// id: hj1_p04
{
  id: "hj1_p04",
  speaker: "patient",
  text: "（她低头看了看自己的手，慢慢放下）……就是他走了以后。家里就我一个人，我闺女在深圳，打电话回来我就说『妈挺好的，你别操心』。她忙，我不想给她添乱。我把自己照顾好，就是帮她的忙了。",
  emotion: "sad",
  autoNext: "hj1_c04",
}
```

```ts-dialog
// id: hj1_c04
{
  id: "hj1_c04",
  speaker: "doctor",
  text: "「妈挺好的你别操心」——她把这句话当成了礼物送给女儿，自己却凌晨三点坐在花园里。",
  choices: [
    { id: "hj1_c04_a", text: "「你跟女儿说『挺好的』，可你凌晨三点坐在花园里——这两件事，哪个是真的？」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "hj1_p05" },
    { id: "hj1_c04_b", text: "「『不想给她添乱』——你把不添乱，看得比自己难不难受还重要？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "hj1_p05" },
  ],
}
```

```ts-dialog
// id: hj1_p05
{
  id: "hj1_p05",
  speaker: "patient",
  text: "（搓衣角的动作停了一下）……凌晨三点？我……我就是醒得早。醒了屋里太静，我出来坐坐。小区花园那个点儿没人，我坐一会儿，天快亮了就回去。没什么的。",
  emotion: "anxious",
  autoNext: "hj1_c05",
}
```

```ts-dialog
// id: hj1_c05
{
  id: "hj1_c05",
  speaker: "doctor",
  text: "她把「凌晨三点坐在花园里」说成「没什么的」——她在压低这件事的分量。",
  choices: [
    { id: "hj1_c05_a", text: "「连着一周，每天凌晨三点都坐在花园里——这不像『没什么的』。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "hj1_p06" },
    { id: "hj1_c05_b", text: "（等着她，不替她找理由。）", kind: "silence", effect: { trust: 1 }, next: "hj1_p06" },
  ],
}
```

```ts-dialog
// id: hj1_p06
{
  id: "hj1_p06",
  speaker: "patient",
  text: "邻居跟您说的吧……我都没注意连着多少天了。就是到了那个点儿，身体自己就醒了，屋里待不住，就得出来。坐一会儿，心里就没那么空。",
  emotion: "neutral",
  autoNext: "hj1_c06",
}
```

```ts-dialog
// id: hj1_c06
{
  id: "hj1_c06",
  speaker: "doctor",
  text: "「到了那个点儿，身体自己就醒了」——这不像是失眠，像是一个钟在响。",
  choices: [
    { id: "hj1_c06_a", text: "「『那个点儿』——凌晨三点，以前在你家意味着什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "hj1_p07" },
    { id: "hj1_c06_b", text: "「身体记住的事，比脑子记得清楚。三点钟，你的身体在等什么？」", kind: "empathy", effect: { trust: 1 }, next: "hj1_p07" },
  ],
}
```

```ts-dialog
// id: hj1_p07
{
  id: "hj1_p07",
  speaker: "patient",
  text: "（她低下头，声音轻了）……以前是他起来喝药的时候。他最后半年，每天凌晨三点都得吃药。我那时候陪着，给他倒水、递药。现在一到那个点，我就自动醒了……身体记着呢。",
  emotion: "sad",
  autoNext: "hj1_c07",
}
```

```ts-dialog
// id: hj1_c07
{
  id: "hj1_c07",
  speaker: "doctor",
  text: "她不是失眠——她在守一个已经不存在的三点钟。",
  choices: [
    { id: "hj1_c07_a", text: "「三点钟你醒了，屋里太静——是因为听不到他翻身、咳嗽的声音了？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "hj1_p08" },
    { id: "hj1_c07_b", text: "「你身体还在陪他吃药——可屋里已经没有他了。这个落差，你一个人扛着。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "hj1_p08" },
  ],
}
```

```ts-dialog
// id: hj1_p08
{
  id: "hj1_p08",
  speaker: "patient",
  text: "……他在的时候，三点钟有他翻身的声音、咳嗽的声音。我听着，心里踏实。现在什么都没有，我待不住。出来坐坐，能好一点。我不是想他想到睡不着，我没那么脆弱。",
  emotion: "sad",
  autoNext: "hj1_c08",
}
```

```ts-dialog
// id: hj1_c08
{
  id: "hj1_c08",
  speaker: "doctor",
  text: "「我不是想他想到睡不着」——她急着否认，好像想他是一件丢人的事。",
  choices: [
    { id: "hj1_c08_a", text: "「你说自己『没那么脆弱』——想他，算脆弱吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "hj1_p09" },
    { id: "hj1_c08_b", text: "「你守着这个三点钟守了一年——这不是脆弱，这是你还在陪他。」", kind: "empathy", effect: { trust: 1 }, next: "hj1_p09" },
  ],
}
```

```ts-dialog
// id: hj1_p09
{
  id: "hj1_p09",
  speaker: "patient",
  text: "（她沉默了一会儿）……我不敢想他。一想他，脑子里先出来的不是他好的时候，是他最后那半年。咳血、喘不上气、瘦得只剩骨头……我一想就难受，难受了就得找点事做。擦地比哭有用。",
  emotion: "anxious",
  autoNext: "hj1_c09",
}
```

```ts-dialog
// id: hj1_c09
{
  id: "hj1_c09",
  speaker: "doctor",
  text: "「擦地比哭有用」——她把所有的情绪都用来擦地了。",
  choices: [
    { id: "hj1_c09_a", text: "「擦地比哭有用——可眼泪不是废物，它是你还在疼的证据。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "hj1_p10" },
    { id: "hj1_c09_b", text: "「你说不敢想他——不敢想的，是他最后那半年，还是那半年里你自己心里的什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "hj1_p10" },
  ],
}
```

```ts-dialog
// id: hj1_p10
{
  id: "hj1_p10",
  speaker: "patient",
  text: "（她站起来，又坐下，像是不知道该把自己放在哪）……医生，我真没事。我就是闲不下来。您别把我当病人，我就是觉少了点。下次我还来吗？",
  emotion: "neutral",
  autoNext: "hj1_c10",
}
```

```ts-dialog
// id: hj1_c10
{
  id: "hj1_c10",
  speaker: "doctor",
  text: "她嘴上说「没事」，却主动问「下周还来吗」——她比她表现出来的更需要这里。",
  choices: [
    { id: "hj1_c10_a", text: "「来。这个三点钟的事，我们下周接着聊。」", kind: "empathy", effect: { mood: 2 }, next: "hj1_out" },
    { id: "hj1_c10_b", text: "「你说『没事』，可你问了我『还来吗』——这两句话，哪句是真的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "hj1_out" },
  ],
}
```

```ts-dialog
// id: hj1_out
{
  id: "hj1_out",
  speaker: "narration",
  text: "第一次会谈结束。何静兰在门口停了一下，回头看了你一眼，像想说什么，最后只点了点头：「那我走了。」她走得很直，像怕被人看见背影。",
  beatEnd: { resumeNode: "hj2_start" },
  autoNext: "hj2_start",
}
```

### 节拍 2 · 中间层触发（trust 28→40，truth 22→34，[m1 碎片@30]，阻抗2）

```ts-dialog
// id: hj2_start
{
  id: "hj2_start",
  speaker: "narration",
  text: "一周后，何静兰准时来了。她手里拎着一个布袋，说是顺路买的菜。坐下后她先开口：「这周我没去花园坐。」你问她三点钟醒了吗，她顿了一下：「醒了，但我没出去，我在家擦了地。」",
  autoNext: "hj2_p01",
}
```

```ts-dialog
// id: hj2_p01
{
  id: "hj2_p01",
  speaker: "patient",
  text: "这周还好，没去花园。三点钟醒了，我就在家擦地。我把客厅擦了一遍，又把储物间门口擦了一遍……擦到那儿，我手停了一下。其实我每天都擦到那儿，都会停一下。",
  emotion: "neutral",
  autoNext: "hj2_c01",
}
```

```ts-dialog
// id: hj2_c01
{
  id: "hj2_c01",
  speaker: "doctor",
  text: "她说「储物间门口」时，声音低下去——那不是一扇普通的门。",
  choices: [
    { id: "hj2_c01_a", text: "「储物间里放着什么？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "hj2_p02" },
    { id: "hj2_c01_b", text: "「你每天擦到那儿都停一下——那扇门后面，是什么让你停下？」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "hj2_p02" },
  ],
}
```

```ts-dialog
// id: hj2_p02
{
  id: "hj2_p02",
  speaker: "patient",
  text: "……他的东西。他走以后，我把他的衣服、杯子、药盒、看的书，全收进储物间了。我一开始是想，收起来眼不见心不烦。可是收进去以后，我每天晚上都会把门打开一条缝，看一眼。就一眼，看完就关上。",
  emotion: "anxious",
  autoNext: "hj2_c02",
}
```

```ts-dialog
// id: hj2_c02
{
  id: "hj2_c02",
  speaker: "doctor",
  text: "「收起来眼不见心不烦」——可她每天晚上都打开门看一眼。她不敢扔，也不敢看。",
  choices: [
    { id: "hj2_c02_a", text: "「你说收起来就不烦了——可你每天晚上都去开门。这算『不烦』吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "hj2_p03" },
    { id: "hj2_c02_b", text: "（让她停在这个画面里：深夜，她打开门，看一眼，关上。）", kind: "silence", effect: { trust: 1 }, next: "hj2_p03" },
  ],
}
```

```ts-dialog
// id: hj2_p03
{
  id: "hj2_p03",
  speaker: "patient",
  text: "……我不知道我为什么要看。看一眼，心里更难受。可不看，我睡不踏实。就好像……不确认一下他在里头，我就放不下心。您说这是不是有病？",
  emotion: "scared",
  autoNext: "hj2_c03",
}
```

```ts-dialog
// id: hj2_c03
{
  id: "hj2_c03",
  speaker: "doctor",
  text: "她把「想确认他在」说成了「有病」——她在替自己的不舍找罪名。",
  choices: [
    { id: "hj2_c03_a", text: "「这不是有病。是你舍不得他一点痕迹都没有。」", kind: "empathy", effect: { trust: 1 }, next: "hj2_p04" },
    { id: "hj2_c03_b", text: "「你不敢扔，也不敢看——你怕的是扔掉他还是怕看到什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "hj2_p04" },
  ],
}
```

```ts-dialog
// id: hj2_p04
{
  id: "hj2_p04",
  speaker: "patient",
  text: "（她的眼圈红了一下，又马上压下去）……我不敢扔。扔了好像他就真没了。我也不敢看，一看就想到他最后那样。我闺女打电话来，说『妈要不把他东西寄点给我吧』，我说『不用，妈收好了』。其实我没收好，我就是把它们关在那扇门后面，假装没事。",
  emotion: "sad",
  autoNext: "hj2_c04",
}
```

```ts-dialog
// id: hj2_c04
{
  id: "hj2_c04",
  speaker: "doctor",
  text: "她对女儿说「收好了」，对自己说「假装没事」——她在所有人面前演一个挺过来的人。",
  choices: [
    { id: "hj2_c04_a", text: "「你在女儿面前演『收好了』，在储物间门口演『没事』——你一个人，演给谁看？」", kind: "empathy", effect: { trust: 2, mood: 4 }, next: "hj2_p05" },
    { id: "hj2_c04_b", text: "「你说假装没事——那真正的事，是什么？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "hj2_p05" },
    { id: "hj2_c04_c", text: "「老伴走了就把东西收起来，这是常规处理方式，不用多想。」", kind: "logic", effect: { trust: -5, defense: 4 }, next: "hj2_r01" },
  ],
}
```

```ts-dialog
// id: hj2_r01
{
  id: "hj2_r01",
  speaker: "patient",
  text: "（她的脸色冷下来）常规处理方式？您这是书上学的吧。您没经历过，您不知道那是什么感觉。我把他的杯子收进去的时候，手都在抖。您跟我说常规，我听不进去。",
  emotion: "angry",
  autoNext: "hj2_p05",
}
```

```ts-dialog
// id: hj2_p05
{
  id: "hj2_p05",
  speaker: "patient",
  text: "……真正的事，是我不知道我该怎么面对他。我想他，可我一想他，脑子里全是最后那半年。他受罪，我也受罪。我有时候觉得，他走了，我轻松了——可我一这么想，就觉得自己不是个东西。",
  emotion: "scared",
  autoNext: "hj2_c05",
}
```

```ts-dialog
// id: hj2_c05
{
  id: "hj2_c05",
  speaker: "doctor",
  text: "「他走了我轻松了」——这句话一出口，她马上给自己定了罪：『不是个东西』。",
  choices: [
    { id: "hj2_c05_a", text: "「你说『轻松了』——这个词冒出来的时候，你心里是什么感觉？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "hj2_p06" },
    { id: "hj2_c05_b", text: "（这话很重，先不接，让她自己听见自己说了什么。）", kind: "silence", effect: { trust: 1 }, next: "hj2_p06" },
  ],
}
```

```ts-dialog
// id: hj2_p06
{
  id: "hj2_p06",
  speaker: "patient",
  text: "……害怕。我觉得我不该有这个想法。他是我丈夫，他受罪我怎么能觉得轻松？可我那时候真的太累了……半年，每天夜里三点起来，白天还得打起精神。我累到站着都能睡着。可我一想到他走了我轻松了，我就恨自己。",
  emotion: "scared",
  autoNext: "hj2_c06",
}
```

```ts-dialog
// id: hj2_c06
{
  id: "hj2_c06",
  speaker: "doctor",
  text: "她把「累」和「恨自己」绑在了一起——累变成了罪。",
  choices: [
    { id: "hj2_c06_a", text: "「你说累到站着都能睡着——那半年你到底熬成什么样了？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "hj2_p07" },
    { id: "hj2_c06_b", text: "「累是累，爱是爱——你把累当成了不爱他的证据。」", kind: "empathy", effect: { trust: 1 }, next: "hj2_p07" },
  ],
}
```

```ts-dialog
// id: hj2_p07
{
  id: "hj2_p07",
  speaker: "patient",
  text: "……累到后来，我什么都不想干了，就想着什么时候能睡个整觉。他一咳，我就得醒，醒了就得起。有时候我给他递水，手是抖的，不是怕，是困。我那时候心里有过一个念头……不，我不能说。",
  emotion: "scared",
  autoNext: "hj2_c07",
}
```

```ts-dialog
// id: hj2_c07
{
  id: "hj2_c07",
  speaker: "doctor",
  text: "她说「不能说」——那个念头就在嘴边了，她用三个字又把它按了回去。",
  choices: [
    { id: "hj2_c07_a", text: "「你说『不能说』——是怕说出来，我就跟你一样觉得你不是个东西？」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "hj2_p08" },
    { id: "hj2_c07_b", text: "「那个念头，跟『他走了我轻松了』，是同一个吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "hj2_p08" },
  ],
}
```

```ts-dialog
// id: hj2_p08
{
  id: "hj2_p08",
  speaker: "patient",
  text: "（她闭上眼，像是不敢看你）……是。那半年有一个夜里，他又咳血了，我起来给他擦。我心里闪过一句话——『你怎么还不走』。就这一句，闪了一下，我马上就把它压回去了。可它已经在了。从那以后，我就觉得自己有罪。",
  emotion: "broken",
  autoNext: "hj2_c08",
}
```

```ts-dialog
// id: hj2_c08
{
  id: "hj2_c08",
  speaker: "doctor",
  text: "那句话终于说出口了——『你怎么还不走』。她守了一年的罪，就是这一句没说出口的话。",
  choices: [
    { id: "hj2_c08_a", text: "「你把一句没说出口的话，判了自己一年的刑。」", kind: "empathy", effect: { trust: 1, defense: 3 }, next: "hj2_p09" },
    { id: "hj2_c08_b", text: "「那句话闪了一下，你就记了一年——你记得他对你说过多少次『辛苦你了』吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "hj2_p09" },
  ],
}
```

```ts-dialog
// id: hj2_p09
{
  id: "hj2_p09",
  speaker: "patient",
  text: "……他说过。他咳完血，喘着气跟我说『辛苦你了，别太累』。我嘴上说『不辛苦』，心里却在想『你都不知道我累成什么样了』。您看，他那么疼我，我心里还在怨他。我是不是太自私了？",
  emotion: "sad",
  autoNext: "hj2_c09",
}
```

```ts-dialog
// id: hj2_c09
{
  id: "hj2_c09",
  speaker: "doctor",
  text: "她说「他那么疼我，我心里还在怨他」——她把人的正常极限，当成了自私。",
  choices: [
    { id: "hj2_c09_a", text: "「半年没日没夜地照顾，你累到极限了——累不代表不爱，怨也不代表不疼。」", kind: "empathy", effect: { trust: 2, mood: 4 }, next: "hj2_p10" },
    { id: "hj2_c09_b", text: "「你说自己自私——一个自私的人，会连续半年夜里三点起来伺候病人吗？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "hj2_p10" },
  ],
}
```

```ts-dialog
// id: hj2_p10
{
  id: "hj2_p10",
  speaker: "patient",
  text: "（她没说话，眼泪掉下来，她赶紧擦了）……我不知道。我只知道，他走了以后，我一闲下来就难受，一难受就觉得自己该忙。忙起来，就不用想那句话了。医生，我是不是……是不是没资格难过？",
  emotion: "broken",
  autoNext: "hj2_c10",
}
```

```ts-dialog
// id: hj2_c10
{
  id: "hj2_c10",
  speaker: "doctor",
  text: "「我是不是没资格难过」——这才是她用忙碌惩罚自己的根。",
  choices: [
    { id: "hj2_c10_a", text: "「你用擦地、用凌晨三点、用一年不让自己停，赎那句没说出口的话——可他真的需要你赎吗？」", kind: "empathy", effect: { mood: 3 }, next: "hj2_out" },
    { id: "hj2_c10_b", text: "「『没资格难过』——这话是你自己说的，还是谁教你的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "hj2_out" },
  ],
}
```

```ts-dialog
// id: hj2_out
{
  id: "hj2_out",
  speaker: "narration",
  text: "第二次会谈结束时，何静兰没有马上起身。她看着自己的手，轻声说：「我以前当老师，教孩子写字，说『一笔一划要写清楚』。可我自己心里，有句话糊了一年，没写清楚过。」",
  beatEnd: { resumeNode: "hj3_start" },
  autoNext: "hj3_start",
}
```

### 节拍 3 · 深层信念（trust 40→50，truth 34→46，恶化入口 @trust≤40）

```ts-dialog
// id: hj3_start
{
  id: "hj3_start",
  speaker: "narration",
  text: "又一周，何静兰来的时候，眼圈有点红。她说这周女儿打了两次电话，她两次都说「妈挺好的」。挂了电话，她坐在沙发上哭了十分钟，然后起来把厨房擦了一遍。",
  autoNext: "hj3_p01",
}
```

```ts-dialog
// id: hj3_p01
{
  id: "hj3_p01",
  speaker: "patient",
  text: "这周我还是三点醒。醒了我就去储物间门口站着，站一会儿，不开门。我以前每天开门看一眼，这周我不敢开了。我觉得……一开门，那句『你怎么还不走』就又冒出来了。",
  emotion: "anxious",
  autoNext: "hj3_c01",
}
```

```ts-dialog
// id: hj3_c01
{
  id: "hj3_c01",
  speaker: "doctor",
  text: "她不敢开门了——她把那扇门当成了那句话的开关。",
  choices: [
    { id: "hj3_c01_a", text: "「那句话冒出来的时候，你心里除了害怕，还有什么？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "hj3_p02" },
    { id: "hj3_c01_b", text: "「你怕那句话——可那句话真的是你的意思吗？」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "hj3_p02" },
  ],
}
```

```ts-dialog
// id: hj3_p02
{
  id: "hj3_p02",
  speaker: "patient",
  text: "……愧疚。我觉得我盼着他走。他要是不走，我还得熬；他走了，我轻松了。您说，这不就是盼着他死吗？一个盼着自己丈夫死的人，有什么资格难过？",
  emotion: "broken",
  autoNext: "hj3_c02",
}
```

```ts-dialog
// id: hj3_c02
{
  id: "hj3_c02",
  speaker: "doctor",
  text: "她把「累到极限时闪过一个念头」直接定成了「盼着他死」——给自己判了最重的罪。",
  choices: [
    { id: "hj3_c02_a", text: "「一个念头，和『盼着』，是一回事吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "hj3_p03" },
    { id: "hj3_c02_b", text: "（这句话很重，先让她自己掂一掂。）", kind: "silence", effect: { trust: 1 }, next: "hj3_p03" },
  ],
}
```

```ts-dialog
// id: hj3_p03
{
  id: "hj3_p03",
  speaker: "patient",
  text: "……我不知道。我只知道那句话冒出来的时候，我是松了一口气的。就那一口气，我恨了自己一年。我从小我妈就教我，好妻子不该有怨气，嫁了人就好好伺候。我连一句怨言都没跟人说过，可我心里有。我心里有，就是我不对。",
  emotion: "scared",
  autoNext: "hj3_c03",
}
```

```ts-dialog
// id: hj3_c03
{
  id: "hj3_c03",
  speaker: "doctor",
  text: "「好妻子不该有怨气」——这是她妈教她的规矩，她拿这条规矩给自己定了罪。",
  choices: [
    { id: "hj3_c03_a", text: "「你妈教你『不该有怨气』——可怨气是人累到极限时长出来的，不是你想有就有的。」", kind: "empathy", effect: { trust: 1 }, next: "hj3_p04" },
    { id: "hj3_c03_b", text: "「你连一句怨言都没说过——那这句没说的话，去了哪儿？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "hj3_p04" },
  ],
}
```

```ts-dialog
// id: hj3_p04
{
  id: "hj3_p04",
  speaker: "patient",
  text: "（她的肩膀塌下来）……压下去了。压进那句话里了。『你怎么还不走』——我没说出口，可我心里响了无数遍。每次夜里三点他一咳，这句话就在心里响一下。我一边伺候他，一边在心里怨他。您说，我算什么妻子？",
  emotion: "broken",
  autoNext: "hj3_c04",
}
```

```ts-dialog
// id: hj3_c04
{
  id: "hj3_c04",
  speaker: "doctor",
  text: "她把照顾中所有的疲惫和委屈，都压成了那句没说出口的怨——然后拿这句怨给自己判了无期。",
  choices: [
    { id: "hj3_c04_a", text: "「你心里响了无数遍那句话——可你的手从来没停过。你一边怨，一边伺候了他半年。」", kind: "empathy", effect: { mood: 2 }, next: "hj3_p05" },
    { id: "hj3_c04_b", text: "「『我算什么妻子』——你想听谁的回答？他的，还是你妈的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "hj3_p05" },
  ],
}
```

```ts-dialog
// id: hj3_p05
{
  id: "hj3_p05",
  speaker: "patient",
  text: "……他的。我多想听他说一句『我知道你累』。可他走之前没说清楚。他说过『辛苦你了』，可我不知道他是真知道，还是客气话。要是他知道我心里那句话，他还会不会说辛苦我了？",
  emotion: "sad",
  autoNext: "hj3_c05",
}
```

```ts-dialog
// id: hj3_c05
{
  id: "hj3_c05",
  speaker: "doctor",
  text: "她守了一年的「我不配难过」，根在这儿——她不知道丈夫知不知道她的累和怨。",
  choices: [
    { id: "hj3_c05_a", text: "「你说他没说清楚——可他说的那句『辛苦你了，别太累』，你不信？」", kind: "probe", effect: { trust: 2, truth: 3 }, next: "hj3_p06" },
    { id: "hj3_c05_b", text: "「你怕他知道你心里那句话就不疼你了——可一个会咳着血说『辛苦你了』的人，是那种人吗？」", kind: "empathy", effect: { trust: 2, mood: 4 }, next: "hj3_p06" },
  ],
}
```

```ts-dialog
// id: hj3_p06
{
  id: "hj3_p06",
  speaker: "patient",
  text: "……我不知道。我那时候太累了，他说什么我都没往心里去，就想着赶紧伺候完能睡一会儿。我现在想不起来他那时候的眼神了……我连他最后什么表情都不记得了。我光顾着累了。",
  emotion: "sad",
  autoNext: "hj3_c06",
}
```

```ts-dialog
// id: hj3_c06
{
  id: "hj3_c06",
  speaker: "doctor",
  text: "她累到连丈夫最后的眼神都没记住——这份累本身，就是她最大的痛。",
  choices: [
    { id: "hj3_c06_a", text: "「你累到记不住他的脸——这份累，是真实的，不是你的错。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "hj3_p07" },
    { id: "hj3_c06_b", text: "「你说累到什么都不往心里去——那现在呢？现在你想往心里放进什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "hj3_p07" },
  ],
}
```

```ts-dialog
// id: hj3_p07
{
  id: "hj3_p07",
  speaker: "patient",
  text: "……我想知道，他走的时候，是不是怪我了。他最后那几天话很少，我也不敢问。我就想着，他要是不怪我，为什么不说？要是怪我，为什么不骂我一句？他什么都不说，我就觉得，他肯定知道我心里那句话了。",
  emotion: "scared",
  autoNext: "hj3_c07",
}
```

```ts-dialog
// id: hj3_c07
{
  id: "hj3_c07",
  speaker: "doctor",
  text: "她把丈夫的沉默，读成了「他知道我那句话了」——她用一年的愧疚，替丈夫下了一个他没下的判决。",
  choices: [
    { id: "hj3_c07_a", text: "「他什么都没说，你就替他判了自己一年——他真的判了吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "hj3_p08" },
    { id: "hj3_c07_b", text: "「一个会写『辛苦你了别太累』的人，最后那几天话少——你觉得是怪你，还是他不忍心看你累？」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "hj3_p08" },
  ],
}
```

```ts-dialog
// id: hj3_p08
{
  id: "hj3_p08",
  speaker: "patient",
  text: "（她愣住了，半晌没说话）……不忍心？他……他是不忍心？我从来没这么想过。我一直以为，他是失望了，不想跟我说话了。我一年都这么以为的。",
  emotion: "anxious",
  autoNext: "hj3_c08",
}
```

```ts-dialog
// id: hj3_c08
{
  id: "hj3_c08",
  speaker: "doctor",
  text: "她第一次听到「他不忍心」——这个念头转了一年，今天松了一寸。",
  choices: [
    { id: "hj3_c08_a", text: "「『不忍心』这三个字，你听了是什么感觉？」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "hj3_p09" },
    { id: "hj3_c08_b", text: "「如果他不忍心，不是怪你——那你守了一年的那句『我配不上难过』，还站得住吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "hj3_p09" },
  ],
}
```

```ts-dialog
// id: hj3_p09
{
  id: "hj3_p09",
  speaker: "patient",
  text: "（她的眼泪又下来了，这次没擦）……我不知道。我一年没敢哭，我一哭就觉得我不配。我现在……我现在也不知道我配不配。可您说的『不忍心』，我……我想信。我不敢信。",
  emotion: "broken",
  autoNext: "hj3_c09",
}
```

```ts-dialog
// id: hj3_c09
{
  id: "hj3_c09",
  speaker: "doctor",
  text: "她想信「他不忍心」，却不敢信——这一年她把自己钉得太死，松一寸都疼。",
  choices: [
    { id: "hj3_c09_a", text: "「不敢信就先放着。下周你回家，做一件事——打开储物间，这次不是看一眼，是走进去。」", kind: "empathy", effect: { trust: 1 }, next: "hj3_p10" },
    { id: "hj3_c09_b", text: "「你说不敢信——你怕信了之后，会发现自己白恨了自己一年？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "hj3_p10" },
    { id: "hj3_c09_c", text: "「人走了就走了，你老这么纠结也没用，日子总得过。」", kind: "logic", require: { trustAtMost: 40 }, effect: { trust: -10, defense: 10 }, next: "hj3_w01", hint: "仅信任≤40 时可见" },
  ],
}
```

```ts-dialog
// id: hj3_p10
{
  id: "hj3_p10",
  speaker: "patient",
  text: "（她擦了擦眼睛，吸了口气）……打开储物间。好。我试试。其实……其实我这一周，做梦老梦到那扇门。梦里我把门打开了，他在里头坐着，跟我说了一句话。可我醒来记不清他说什么了。我想听清楚。",
  emotion: "neutral",
  autoNext: "hj3_c10",
}
```

```ts-dialog
// id: hj3_c10
{
  id: "hj3_c10",
  speaker: "doctor",
  text: "她梦里在听丈夫说话——她的心已经比脑子先走了一步。",
  choices: [
    { id: "hj3_c10_a", text: "「你梦里想听的那句话，跟我们今天说的，会是同一句吗？」", kind: "empathy", effect: { mood: 4 }, next: "hj3_out" },
    { id: "hj3_c10_b", text: "「打开那扇门——也许里头有比梦里更清楚的东西。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "hj3_out" },
  ],
}
```

```ts-dialog
// id: hj3_out
{
  id: "hj3_out",
  speaker: "narration",
  text: "第三次会谈结束。何静兰走的时候，在门口站了一会儿，轻声说：「医生，我这一年，好像一直在等一个人跟我说一句『你不怪自己了』。今天你说的『他不忍心』，离那句话近了一点。」",
  beatEnd: { resumeNode: "hj4_start" },
  autoNext: "hj4_start",
}
```

```ts-dialog
// id: hj3_w01
{
  id: "hj3_w01",
  speaker: "patient",
  text: "（她的脸色一下子冷下来，声音发抖）日子总得过……您说得轻巧。您是不是也觉得我矫情？我一个老太婆，丈夫走了，在这儿哭哭啼啼的，是不是挺烦人的？那我走了，不耽误您了。",
  emotion: "broken",
  autoNext: "hj3_w02",
}
```

```ts-dialog
// id: hj3_w02
{
  id: "hj3_w02",
  speaker: "doctor",
  text: "说错了话，把她推回了「我矫情、我烦人」的深坑。",
  choices: [
    { id: "hj3_w02_a", text: "「我不是这个意思，我是说……你别老纠结过去。」", kind: "logic", effect: { trust: -6, defense: 6 }, next: "hj3_w03" },
    { id: "hj3_w02_b", text: "（道歉，试着拉她回来。）「我话说重了，对不起。我不是觉得你矫情。」", kind: "empathy", effect: { trust: -3, mood: -4 }, next: "hj3_w03" },
  ],
}
```

```ts-dialog
// id: hj3_w03
{
  id: "hj3_w03",
  speaker: "patient",
  text: "……不用道歉了。我本来就没指望谁。我就是闲不下来，闲下来就难受。我回去了，家里还等着我擦地呢。谢谢您的时间。",
  emotion: "broken",
  autoNext: "hj_end_worsen",
}
```

### 节拍 4 · 转向 + 结局（trust 50→58，cure 主线分叉 + 安全网）

```ts-dialog
// id: hj4_start
{
  id: "hj4_start",
  speaker: "narration",
  text: "最后一次会谈。何静兰进来的时候，手里攥着一样东西——一张从药盒里翻出来的纸条，边角已经磨毛了。她坐下，把纸条放在桌上，没说话，眼泪先下来了。",
  autoNext: "hj4_p01",
}
```

```ts-dialog
// id: hj4_p01
{
  id: "hj4_p01",
  speaker: "patient",
  text: "我打开储物间了。我把他的东西一件一件拿出来，擦干净。翻到他那个药盒，里头夹着一张纸条。是他写的，字歪歪扭扭的——他最后那阵子手抖，写不利索。上面写着……（她哽住）上面写着『静兰，辛苦你了，别太累』。",
  emotion: "broken",
  autoNext: "hj4_fork",
}
```

```ts-dialog
// id: hj4_fork
{
  id: "hj4_fork",
  speaker: "doctor",
  text: "她找到了那张纸条——丈夫最后写给她的话。这一刻，她面前有三条路：走进去把这份「知道」接住；先学着带着它生活；或者，把这份真话告诉那个一直在被骗的女儿。",
  choices: [
    { id: "hj4_fork_a", text: "「我们一起把这张纸条念清楚——这次不是偷偷看一眼，是把它接住。」", kind: "special", effect: { trust: 1, mood: 2 }, next: "hj4_s01" },
    { id: "hj4_fork_b", text: "「你不用现在全想通。学会带着这份想念和这份累生活，也是一种答案。」", kind: "empathy", effect: { trust: 1 }, next: "hj4_a01" },
    { id: "hj4_fork_c", text: "「你给女儿打了一年电话，每一通都说『妈挺好的』。今天，我想请你跟她说一次真话。」", kind: "confront", require: { trust: 50 }, effect: { trust: 1, truth: 3 }, next: "hj4_h01", hint: "需要信任≥50" },
  ],
}
```

#### 安全网路径（cure 主线）

```ts-dialog
// id: hj4_s01
{
  id: "hj4_s01",
  speaker: "patient",
  text: "（她把纸条推到你面前，手在抖）……您念给我听。我自己看了一遍又一遍，可我不敢信。我怕是我自己想出来的。您念，我听。",
  emotion: "scared",
  autoNext: "hj4_s02",
}
```

```ts-dialog
// id: hj4_s02
{
  id: "hj4_s02",
  speaker: "doctor",
  text: "她不敢信自己的眼睛，要你的声音替她确认。",
  choices: [
    { id: "hj4_s02_a", text: "「（你念）『静兰，辛苦你了，别太累。』——这是他写的，不是你想的。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "hj4_s03" },
    { id: "hj4_s02_b", text: "「他把它夹在药盒里——每天吃药都能看见。他是写给自己看的，还是写给你看的？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "hj4_s03" },
  ],
}
```

```ts-dialog
// id: hj4_s03
{
  id: "hj4_s03",
  speaker: "patient",
  text: "（她闭上眼，眼泪顺着脸往下淌）……夹在药盒里。他每天三点起来吃药，都能看见这张纸条。他是不是……是不是早就想跟我说，一直没说出口？",
  emotion: "sad",
  autoNext: "hj4_s04",
}
```

```ts-dialog
// id: hj4_s04
{
  id: "hj4_s04",
  speaker: "doctor",
  text: "「一直没说出口」——跟她的那句「你怎么还不走」一样，他也有话没说出口。",
  choices: [
    { id: "hj4_s04_a", text: "「他有话没说出口，你也有——你们俩，都被『没说出口』困了一年。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "hj4_s05" },
    { id: "hj4_s04_b", text: "「他没说出口，可他写了。他怕说出口你更难受——他替你想了一层。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "hj4_s05" },
  ],
}
```

```ts-dialog
// id: hj4_s05
{
  id: "hj4_s05",
  speaker: "patient",
  text: "……他怕我难受。他都知道我累了，他都知道……可他一句都没怪我。他写的是『别太累』，不是『别怨我』，不是『你欠我的』。他就让我别太累了……（她终于哭出声来）",
  emotion: "broken",
  autoNext: "hj4_s06",
}
```

```ts-dialog
// id: hj4_s06
{
  id: "hj4_s06",
  speaker: "doctor",
  text: "她终于哭了——不是「不配难过」的哭，是「原来他不需要我赎罪」的哭。",
  choices: [
    { id: "hj4_s06_a", text: "「他没怪你——他心疼你。你守了一年的罪，他根本没判过。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "hj4_s07" },
    { id: "hj4_s06_b", text: "「『别太累』——这是他给你的判决吗？还是他给你的解药？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "hj4_s07" },
  ],
}
```

```ts-dialog
// id: hj4_s07
{
  id: "hj4_s07",
  speaker: "patient",
  text: "（她哭了一会儿，慢慢平下来）……是解药。他让我别太累了。可我这一年，把自己累得更狠了。我擦地、凌晨不睡、不让自己停——我是在替他罚我自己。他要是知道了，该多心疼。",
  emotion: "sad",
  autoNext: "hj4_s08",
}
```

```ts-dialog
// id: hj4_s08
{
  id: "hj4_s08",
  speaker: "doctor",
  text: "她看见了自己这一年在做什么——不是爱他，是罚自己。",
  choices: [
    { id: "hj4_s08_a", text: "「他写『别太累』——你现在还觉得，忙到停不下来是他想要的吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "hj4_s09" },
    { id: "hj4_s08_b", text: "「他心疼你累——你现在能替他心疼自己一回吗？」", kind: "empathy", effect: { trust: 0, mood: 4 }, next: "hj4_s09" },
  ],
}
```

```ts-dialog
// id: hj4_s09
{
  id: "hj4_s09",
  speaker: "patient",
  text: "（她擦了擦脸，看着那张纸条）……他想让我歇着。他走之前，最放心不下的就是我会把自己熬坏了。我当时没听进去，现在我……我想听他一回。可我不知道怎么停。我一辈子都在忙，我不会闲着。",
  emotion: "neutral",
  autoNext: "hj4_s10",
}
```

```ts-dialog
// id: hj4_s10
{
  id: "hj4_s10",
  speaker: "doctor",
  text: "她想停，但不会停——忙了三十年，停下来对她来说比忙还难。",
  choices: [
    { id: "hj4_s10_a", text: "「不会停就慢慢学。今天回去，试一件事：三点钟醒了，不擦地，坐在窗边等天亮。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "hj4_s11" },
    { id: "hj4_s10_b", text: "「他说『别太累』——你能把这三个字，当给自己的话吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "hj4_s11" },
  ],
}
```

```ts-dialog
// id: hj4_s11
{
  id: "hj4_s11",
  speaker: "patient",
  text: "（她把纸条折好，攥在手心里）……别太累。我试试。我以前觉得闲下来是偷懒，是不想他。现在我想……闲下来，也许是听他想跟我说的话。他都在纸条上写明白了，我该听一回了。",
  emotion: "calm",
  autoNext: "hj4_s12",
}
```

```ts-dialog
// id: hj4_s12
{
  id: "hj4_s12",
  speaker: "doctor",
  text: "「闲下来是听他想跟我说的话」——她第一次给「停」找了一个不是罪的理由。",
  choices: [
    { id: "hj4_s12_a", text: "「这不是偷懒——这是你替他，疼自己一回。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "hj4_s13" },
    { id: "hj4_s12_b", text: "「他说『别太累』，你说『闲下来是听他的话』——这是你俩之间的暗号。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "hj4_s13" },
  ],
}
```

```ts-dialog
// id: hj4_s13
{
  id: "hj4_s13",
  speaker: "patient",
  text: "（她笑了一下，眼眶还红着）……暗号。我以前老嫌他不爱说话，什么闷在心里。他倒好，把最要紧的话夹在药盒里，等我一年以后自己翻出来。他这个人……他比我想的疼我。",
  emotion: "calm",
  autoNext: "hj4_s14",
}
```

```ts-dialog
// id: hj4_s14
{
  id: "hj4_s14",
  speaker: "doctor",
  text: "「他比我想的疼我」——她终于敢信了。",
  choices: [
    { id: "hj4_s14_a", text: "「他疼你，你也疼他——你伺候了他半年，没说过一句怨。」", kind: "empathy", effect: { mood: 4 }, next: "hj4_s15" },
    { id: "hj4_s14_b", text: "「你现在信他疼你了——那句『我不配难过』，还站得住吗？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "hj4_s15" },
  ],
}
```

```ts-dialog
// id: hj4_s15
{
  id: "hj4_s15",
  speaker: "patient",
  text: "……站不住了。他不怪我，他心疼我，他让我别太累。我这一年……我这一年是在替自己赎一句他根本没判的罪。我傻不傻？（她吸了吸鼻子）我以后……我以后可以难过了吧？不用偷偷地难过了吧？",
  emotion: "neutral",
  autoNext: "hj4_s16",
}
```

```ts-dialog
// id: hj4_s16
{
  id: "hj4_s16",
  speaker: "doctor",
  text: "「我可以难过了吧」——她终于敢开口要这个资格了。",
  choices: [
    { id: "hj4_s16_a", text: "「你可以。难过不是赎罪，是你爱他的方式。他写『别太累』，不是不让你难过，是不让你拿难过罚自己。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "hj4_s17" },
    { id: "hj4_s16_b", text: "「他给你留了三个字『别太累』——你现在给自己留一句话，会留什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "hj4_s17" },
  ],
}
```

```ts-dialog
// id: hj4_s17
{
  id: "hj4_s17",
  speaker: "patient",
  text: "（她想了一会儿）……『你可以歇着』。我当了一辈子老师，老跟孩子说『别偷懒』。现在我得跟自己说一回『你可以歇着』。歇着不丢人，歇着不是不想他，歇着是……是替他照顾我自己。",
  emotion: "calm",
  autoNext: "hj4_s18",
}
```

```ts-dialog
// id: hj4_s18
{
  id: "hj4_s18",
  speaker: "doctor",
  text: "「歇着是替他照顾我自己」——她把那句「别太累」，终于接住了。",
  choices: [
    { id: "hj4_s18_a", text: "「这张纸条你留着。三点钟醒了，不用擦地，把这张纸条念一遍——他在里头。」", kind: "empathy", effect: { mood: 4 }, next: "hj_end_cure" },
    { id: "hj4_s18_b", text: "「你替他照顾好自己——这就是他最想看到的事。」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "hj_end_cure" },
  ],
}
```

#### 接纳路径（acceptance）

```ts-dialog
// id: hj4_a01
{
  id: "hj4_a01",
  speaker: "patient",
  text: "（她点点头，把纸条收起来）……带着它生活。您说得对，我可能没办法一下子全想通。这张纸条我先收好，慢慢看。我不逼自己了。",
  emotion: "neutral",
  autoNext: "hj4_a02",
}
```

```ts-dialog
// id: hj4_a02
{
  id: "hj4_a02",
  speaker: "doctor",
  text: "她没有选择「全想通」，而是选择了「慢慢带着它」——这也是一种向前。",
  choices: [
    { id: "hj4_a02_a", text: "「带着它，但别再拿它罚自己了。他说『别太累』，你听着就行。」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "hj4_a03" },
    { id: "hj4_a02_b", text: "「你以后再想擦地的时候，会跟自己说什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "hj4_a03" },
  ],
}
```

```ts-dialog
// id: hj4_a03
{
  id: "hj4_a03",
  speaker: "patient",
  text: "……我会跟自己说『静兰，别太累了，坐一会儿』。说多了，说不定我就真信了。我以前只会跟自己说『闲不下来』，现在我多了一句可以说的。",
  emotion: "calm",
  autoNext: "hj4_a04",
}
```

```ts-dialog
// id: hj4_a04
{
  id: "hj4_a04",
  speaker: "doctor",
  text: "她给自己多留了一句话——不再是只有「闲不下来」一个选项了。",
  choices: [
    { id: "hj4_a04_a", text: "「『别太累了，坐一会儿』——这是他说的，也是你开始对自己说的。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "hj4_a05" },
    { id: "hj4_a04_b", text: "「如果有一天你真坐下来了，你觉得他会说什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "hj4_a05" },
  ],
}
```

```ts-dialog
// id: hj4_a05
{
  id: "hj4_a05",
  speaker: "patient",
  text: "（她笑了笑）……他会说『这才对嘛』。他那个人，就爱看我坐着喝茶。我以后试试，三点钟醒了，不擦地了，泡杯茶，坐窗边等天亮。茶他以前爱喝的那种，我给他也泡一杯放着。",
  emotion: "neutral",
  autoNext: "hj_end_accept",
}
```

#### 隐藏路径（hidden · 强制介入）

```ts-dialog
// id: hj4_h01
{
  id: "hj4_h01",
  speaker: "patient",
  text: "（她愣住了，攥紧纸条）……跟她说真话？我跟她说了一年『妈挺好的』，现在突然说真话？她会……她会怪我吗？怪我骗了她一年？",
  emotion: "scared",
  autoNext: "hj4_h02",
}
```

```ts-dialog
// id: hj4_h02
{
  id: "hj4_h02",
  speaker: "doctor",
  text: "她怕女儿怪她骗了一年——可这份「骗」，本身就是她一个人扛了太久的证据。",
  choices: [
    { id: "hj4_h02_a", text: "「我打算联系你女儿。有些话，你不该一个人扛着——她也有权利知道她爸最后说了什么。」", kind: "special", effect: { mood: -3 }, next: "hj4_h03" },
    { id: "hj4_h02_b", text: "「你怕她怪你——可你想过没有，她也许更怕你一个人扛？」", kind: "empathy", effect: { trust: 1 }, next: "hj4_h05" },
  ],
}
```

```ts-dialog
// id: hj4_h03
{
  id: "hj4_h03",
  speaker: "patient",
  text: "（她的声音发抖）联系她……您要让小颖知道她爸最后写的是什么？还有我这一年在干什么？医生，我怕。我怕她知道了，会哭，会怪我没照顾好她爸，会怪我骗了她……",
  emotion: "scared",
  autoNext: "hj4_h04",
}
```

```ts-dialog
// id: hj4_h04
{
  id: "hj4_h04",
  speaker: "doctor",
  text: "她怕，但这一次，她攥着纸条没松手——她心里有一部分想让女儿知道。",
  choices: [
    { id: "hj4_h04_a", text: "「你怕她怪你——可这张纸条上的话，是给她的，不只是给你的。她爸最后的心事，她有权利接一半。」", kind: "special", effect: { truth: 3, mood: -2 }, next: "hj_end_hidden" },
    { id: "hj4_h04_b", text: "「我们先不急。这张纸条你先收着，等你觉得能开口的那天，再跟她说。」", kind: "empathy", effect: { trust: 1 }, next: "hj4_h05" },
  ],
}
```

```ts-dialog
// id: hj4_h05
{
  id: "hj4_h05",
  speaker: "patient",
  text: "（她垂下眼睛，把纸条贴在胸口）……好。等我觉得能说的时候，我跟小颖说。这张纸条，我替她爸先收着。谢谢您没逼我。",
  emotion: "neutral",
  autoNext: "hj_end_accept",
}
```

---

## 三、结局

```ts-dialog
// id: hj_end_cure
{
  id: "hj_end_cure",
  speaker: "narration",
  text: "〔结局 · 治愈〕",
  isEnding: true,
  endingType: "cure",
  endingTitle: "别太累",
  endingText: "三个月后，何静兰来信。她说那张纸条她裱了起来，挂在储物间的门上——储物间的门现在整天开着。她说她还是会三点钟醒，但她不再出门擦地了，她会泡一杯茶，坐在窗边等天亮。女儿回来过一次，她跟女儿说了一回真话，娘俩抱头哭了一场。她说：他让我别太累，我听了三个月，终于学会坐下来了。茶我给他也倒一杯放着，他爱喝的那种。",
  endingReward: { doctorReputation: 8, doctorMoney: 300, doctorExp: 50, doctorSanity: 5 },
}
```

```ts-dialog
// id: hj_end_accept
{
  id: "hj_end_accept",
  speaker: "narration",
  text: "〔结局 · 接纳〕",
  isEnding: true,
  endingType: "acceptance",
  endingTitle: "多留一句话",
  endingText: "何静兰没有再约新的会谈，但她每隔一阵会来坐坐。她说她还是会忙，还是会擦地，但擦到储物间门口时，她会停下来，站一会儿，不再开门看一眼，而是跟自己说一句『静兰，别太累了，坐一会儿』。她说，她心里多了一句话，不再只有『闲不下来』。那个三点钟，她有时候泡杯茶等天亮，有时候还是出门坐坐——但她说，花园的长椅上，她不再是一个人了，她带着他写的那三个字。",
  endingReward: { doctorReputation: 4, doctorMoney: 180, doctorExp: 35, doctorSanity: 6 },
}
```

```ts-dialog
// id: hj_end_hidden
{
  id: "hj_end_hidden",
  speaker: "narration",
  text: "〔结局 · 隐藏·纸条〕",
  isEnding: true,
  endingType: "hidden",
  endingTitle: "他爸最后的话",
  endingText: "你联系了何静兰的女儿小颖。小颖从深圳赶回来，进家门那天，何静兰把那张纸条递给她。小颖看完，蹲在地上哭了很久。她说：我以为妈真的挺好的，我以为就我一个人想爸。那天晚上，娘俩在储物间里坐了一夜，把何静兰这一年没说出口的话，一句一句说给彼此听。后来小颖给你打了个电话，说：谢谢你让我妈把那张纸条拿出来了。我爸最后的心事，我接到了。这段母女之间隔了一年的「挺好的」，终于被人捅破了。",
  endingReward: { doctorReputation: -10, doctorMoney: 100, doctorExp: 80, doctorSanity: -15 },
}
```

```ts-dialog
// id: hj_end_worsen
{
  id: "hj_end_worsen",
  speaker: "narration",
  text: "〔结局 · 恶化〕",
  isEnding: true,
  endingType: "worsen",
  endingTitle: "擦不完的地",
  endingText: "何静兰没有再来。邻居后来转告你，她还是每天凌晨三点出门，在花园坐到天亮。家里擦得一尘不染，储物间的门再没打开过。女儿打电话来，她还是说「妈挺好的你别操心」。邻居说，有一次见她在花园里坐着，嘴里念叨一句话，听不清，像是在跟谁说话。那张夹在药盒里的纸条，她没有找到——或者说，她找到了也不敢看。那句「别太累」，还关在储物间的门后面，等着她有一天敢走进去。",
  endingReward: { doctorReputation: -8, doctorMoney: 50, doctorExp: 10, doctorSanity: -20 },
}
```

---

## 四、状态

- [x] v3 机器可解析格式（ts-meta + ts-dialog 全部就位）
- [x] trust 锚点 15→28→40→50→58；truth 0→40；碎片 1 枚 @30
- [x] 恶化入口 @trust≤40（hj3_c09_c）；隐藏结局 @trust50（hj4_fork_c）
- [x] cure 主线 40 轮（4 节拍各 10 轮）
- [x] 转换器生成 + 走线验收（`node scripts/md-to-patient.mjs docs/stories/he-jinglan-v3.md --walk`）
- [x] 核心信念「我不配难过」与登记表已有丧亲主题（song_huilan / zhou_ping / chen_an）不雷同
