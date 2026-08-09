# 林晨 · v3 · 短剧本 · 4 节拍 · 40+ 轮

> 短档剧本：高三尖子生学霸倦怠——长期第一后崩塌，对学习失去意义感，但不敢停下。
> 数值：trust 15→28→40→50→58；truth 0→40；碎片 1 枚 @truth15；恶化入口 trust≤40；隐藏结局 @trust50；cure 主线 40 轮。
> 生成：`node scripts/md-to-patient.mjs docs/stories/lin-chen-v3.md --walk`

---

## 〇、人物档案

**姓名** 林晨，17 岁，重点中学高三学生。班主任转介——她在自习室盯着同一页书两小时没翻，被发现后送来。

**一句话核心** 一个相信「不优秀就会被父母抛弃」的高三女生——她不是不想学，是学了十年突然不知道在为谁学，但一停下就害怕。

**三层真相**
- 表层：月考从常年年级第一跌到第十五，失眠、发呆、看不进书，但每天仍硬撑学到凌晨。说「我就是累了」，反复用「还行」「没什么」压低自己。校服永远熨得平整，马尾扎得一丝不苟，手里攥着一支笔，焦虑时转个不停。
- 中间层：上学期末保送名额意外落选（之前三年一直被许诺「这个名额是你的」）。那晚父母没骂她，但妈妈默默把她房间的台灯换了更亮的、爸爸开始每天接送她上下学——这种「加倍关心」让她感到恐惧，因为她在家里从来都是「被盯着成绩」而不是「被看着她这个人」。
- 深层：小学三年级考了班级第二（不是第一），回家后发现妈妈不叫她吃饭、爸爸不问她作业，整整三天父母像「看不见她」。从那以后她明白：父母的爱是有条件的，不优秀就会被「情感撤回」——不是被打被骂，是被当成空气。她靠「永远第一」守住「被看见」的资格，直到保送落选，这条契约断了，学习的意义也随之塌了。可她不敢停，因为停下就会被抛弃。

**角色三角**
- 施压者：母亲——设计了「优秀才配被看见」的契约，用沉默和撤回关注作为惩罚信号。
- 情感忽视者：父亲——长期缺席情感回应，只问成绩，配合母亲的「冷处理」，用「每天接送」式的陪伴制造被监视感。
- 被守护者：三年级那个被当成空气三天的自己——林晨一直在替那个小孩「考第一」换回关注。

**症状意义** 发呆、看不进书不是懒，是「意义系统崩塌」——她突然意识到自己十年学习的动力是「恐惧被抛弃」而非「想要什么」，恐惧用尽了，动力也空了。但停下就触发「被抛弃」的恐慌，所以硬撑。转笔是她焦虑时的小动作，停不下来；失眠是夜里那个三年级的小孩在哭。

**关键转折** 保送落选那晚，妈妈换台灯、爸爸开始接送——她第一次看清「他们的关心和爱是两件事」，关心的是成绩，不是她。

**查重** 与 lin_xiao（家暴+撕画+弟弟守护，「家不会散」）、chen_mo（罚站+废人，已下线）、lin_xiaoman（已抛弃+代偿进食）、xiao_bei（比较+裸辞）均不雷同。核心信念「不优秀就被情感撤回/当成空气」是新的——不是打骂式惩罚，是冷暴力式情感撤回；不是已发生的抛弃，是预防性恐惧驱动；主角是正在经历崩塌的高三学生，非成年回溯。

---

## 一、节拍规划表

| 节拍 | 主题 | trust | truth | 关键元素 |
|---|---|---|---|---|
| 1 | 初访·「我就是累了」 | 15→28 | 0→9 | 阻抗1（别问家里）/ 台灯露出 / 转笔锚点 |
| 2 | 保送落选·「他们不看我了」 | 28→40 | 9→18 | 阻抗2 / 保送落选那晚 / 不敢提小时候 |
| 3 | 三年级的三天·「透明人」 | 40→50 | 18→30 | [m1@truth15] / 阻抗3 / 恶化入口@trust≤40 |
| 4 | 转向+结局 | 50→58 | 30→42 | require30 / 隐藏@50 / 安全网cure |

**数值口径**
- trust 单调递增：empathy +0~+2、probe +1、silence +0~+1、special +1~+2；logic 失误 -6~-10
- truth 由 probe 涨（实质 +3），empathy 在揭示模式时轻涨（+1）
- defense 净下降 60→28，阻抗节点短时 +5~+6
- 每节拍 3~4 个 probe（实质），其余 empathy/silence（轻推进）
- 共情线 trust 精确 58（15+43）；探问线 truth 42；均衡线 m1@节拍2末；失误线 trust≤40→worsen

---

## 二、剧本元信息（ts-meta）

```ts-meta
// id: lin_chen
// tier: 短
// anchor: 15,28,40,50,58
// truthEnd: 40
// minCureRounds: 40
// fragments: 1
// worsenAtMost: 40
{
  id: "lin_chen",
  name: "林晨",
  title: "高三女生 · 班主任转介",
  intro: "重点中学高三尖子生，长期年级第一，上学期保送名额意外落选后月考跌到第十五。班主任发现她在自习室盯着同一页书两小时没翻，转介过来。她答应来，理由是『别让班主任再找我麻烦』。",
  surface: "月考从第一跌到第十五，失眠、发呆、看不进书，但每天仍硬撑学到凌晨。说『我就是累了』，反复用『还行』『没什么』压低自己。校服永远熨得平整，马尾扎得一丝不苟，手里攥着一支笔，焦虑时转个不停。",
  truth: "小学三年级考了班级第二，父母整整三天当她不存在——不叫她吃饭、不问她作业、看了她像看空气。从那以后她明白：父母的爱是有条件的，不优秀就会被『情感撤回』。她靠『永远第一』守住『被看见』的资格，直到保送落选，这条契约断了，学习的意义也随之塌了——可她不敢停，因为停下就会被抛弃。",
  palette: { primary: "#7a8cb8", secondary: "#b8c4d8", fog: "#5a6a8a", bright: "#e8d8a0" },
  baseReward: 600,
  difficulty: "普通",
  startNode: "lc1_start",
  initialState: { trust: 15, defense: 60, mood: 35, truth: 0, round: 0 },
  memoryFragments: [
    {
      id: "lin_chen_m1",
      trigger: { truth: 15 },
      title: "那三天的饭桌",
      text: "我端着碗站在厨房门口。我妈在盛饭，盛了三碗，没盛我的。我爸在客厅看报纸，没抬头。我喊了一声『妈』，她没应。我又喊了一声『爸』，他说『等会儿』。那天是第二天。我后来把那张卷子又做了一遍，做到半夜，全对。第三天早上，我妈终于看了我一眼，说『这还差不多』。从那以后，我再也没考过第二。",
      emotion: "scared",
    },
  ],
}
```

---

## 三、节拍骨架（ts-dialog 节点）

### 节拍 1 · 初访·「我就是累了」（trust 15→28，truth 0→9，阻抗：拒绝被当成「有问题的人」）

```ts-dialog
// id: lc1_start
{
  id: "lc1_start",
  speaker: "narration",
  text: "初秋的下午，候诊区很安静。林晨比预约时间早到了十分钟，校服熨得没有一丝褶皱，马尾扎得一丝不苟。坐下后，她从笔袋里拿出一支笔，在指间转了两圈，又放回去，又拿出来。轮到她时，她站起来，抻了抻校服下摆，推门进来。",
  autoNext: "lc1_p01",
}
```

```ts-dialog
// id: lc1_p01
{
  id: "lc1_p01",
  speaker: "patient",
  text: "医生您好。我没什么事，就是我们班主任非让我来，说我最近状态不对。我挺好的，就是这阵子有点累。耽误您时间了。",
  emotion: "neutral",
  autoNext: "lc1_c01",
}
```

```ts-dialog
// id: lc1_c01
{
  id: "lc1_c01",
  speaker: "doctor",
  text: "你提前十分钟到，却说自己「没什么事」。一个一直说『没事』的人，愿意在这儿坐下来，本身就是件不容易的事。",
  choices: [
    { id: "lc1_c01_a", text: "「你不急着证明自己没事。先在这儿坐一会儿。」", kind: "empathy", effect: { trust: 2, defense: -1 }, next: "lc1_p02" },
    { id: "lc1_c01_b", text: "「班主任说你『状态不对』——他看出了什么？」", kind: "probe", effect: { trust: 1, truth: 2 }, next: "lc1_p02" },
    { id: "lc1_c01_c", text: "「高三累是正常的，调整一下作息就好。」", kind: "logic", effect: { trust: -8, defense: 6, mood: -3 }, next: "lc1_r01" },
  ],
}
```

```ts-dialog
// id: lc1_p02
{
  id: "lc1_p02",
  speaker: "patient",
  text: "（她攥了攥笔）……他说我在自习室盯着书看了两个小时，一页没翻。可我真的是在看，就是……脑子好像不在纸上。",
  emotion: "anxious",
  autoNext: "lc1_c02",
}
```

```ts-dialog
// id: lc1_c02
{
  id: "lc1_c02",
  speaker: "doctor",
  text: "「脑子不在纸上」——她很会形容那种空。",
  choices: [
    { id: "lc1_c02_a", text: "「脑子不在——它跑哪儿去了？」", kind: "empathy", effect: { trust: 1 }, next: "lc1_p03" },
    { id: "lc1_c02_b", text: "（安静地等着，不急着追问。）", kind: "silence", effect: { trust: 1 }, next: "lc1_p03" },
  ],
}
```

```ts-dialog
// id: lc1_p03
{
  id: "lc1_p03",
  speaker: "patient",
  text: "（她低头）……我也不知它跑哪儿了。就是空空的，像底下有个洞。这次月考我考了第十五。之前我一直都是第一。我妈知道那天，没说话。",
  emotion: "sad",
  autoNext: "lc1_c03",
}
```

```ts-dialog
// id: lc1_c03
{
  id: "lc1_c03",
  speaker: "doctor",
  text: "「之前都是第一」——她把掉到第十五，说得很轻。",
  choices: [
    { id: "lc1_c03_a", text: "「她没说话——那个沉默，比骂你更难受吧。」", kind: "empathy", effect: { trust: 2, defense: -2, truth: 1 }, next: "lc1_p04" },
    { id: "lc1_c03_b", text: "「掉到第十五，你心里是什么感觉？」", kind: "probe", effect: { trust: 1, truth: 3 }, next: "lc1_p04" },
  ],
}
```

```ts-dialog
// id: lc1_p04
{
  id: "lc1_p04",
  speaker: "patient",
  text: "……她没骂我。她就是把我房间的台灯换了，换了个更亮的。她说，这样你晚上看书不伤眼睛。可那个灯太亮了，我晚上根本睡不着。",
  emotion: "anxious",
  autoNext: "lc1_c04",
}
```

```ts-dialog
// id: lc1_c04
{
  id: "lc1_c04",
  speaker: "doctor",
  text: "「换了更亮的台灯」——她妈妈递过来的不是关心，是一盏不让她停下来的灯。",
  choices: [
    { id: "lc1_c04_a", text: "「灯太亮你睡不着——这件事，你跟她说过吗？」", kind: "empathy", effect: { trust: 2, defense: -2, truth: 1 }, next: "lc1_p05" },
    { id: "lc1_c04_b", text: "「更亮的台灯——她是在照亮你，还是在盯着你？」", kind: "probe", effect: { trust: 1, truth: 3 }, next: "lc1_p05" },
    { id: "lc1_c04_c", text: "「你妈也是好心，换了就适应几天。」", kind: "logic", effect: { trust: -6, defense: 5 }, next: "lc1_p05" },
  ],
}
```

```ts-dialog
// id: lc1_p05
{
  id: "lc1_p05",
  speaker: "patient",
  text: "（她摇头）没说过。我不敢说。我一说她就会叹气，说『我都是为了你』。那口气一出来，我就什么都不敢说了。",
  emotion: "scared",
  autoNext: "lc1_c05",
}
```

```ts-dialog
// id: lc1_c05
{
  id: "lc1_c05",
  speaker: "doctor",
  text: "「为了你」三个字，把想说的话都堵了回去。",
  choices: [
    { id: "lc1_c05_a", text: "「她的『为了你』，把你吓得不敢出声——这份怕，从什么时候开始的？」", kind: "empathy", effect: { trust: 2, mood: 2, truth: 1 }, next: "lc1_p06" },
    { id: "lc1_c05_b", text: "「不敢说的，只是台灯的事吗？」", kind: "probe", effect: { trust: 1, truth: 3 }, next: "lc1_p06" },
  ],
}
```

```ts-dialog
// id: lc1_p06
{
  id: "lc1_p06",
  speaker: "patient",
  text: "（她手里的笔转得更快了）……不只是台灯。我现在一翻开书就发慌。明明该看的，一个字都进不去。可我又不敢不看。我一停下，就……",
  emotion: "anxious",
  autoNext: "lc1_c06",
}
```

```ts-dialog
// id: lc1_c06
{
  id: "lc1_c06",
  speaker: "doctor",
  text: "她没把那句「一停下就……」说完——那个没说出口的，才是关键。",
  choices: [
    { id: "lc1_c06_a", text: "「你不敢停——停下来会怎么样？」", kind: "empathy", effect: { trust: 1, truth: 1 }, next: "lc1_p07" },
    { id: "lc1_c06_b", text: "「『发慌』——慌的是什么？」", kind: "probe", effect: { trust: 1, truth: 3 }, next: "lc1_p07" },
  ],
}
```

```ts-dialog
// id: lc1_p07
{
  id: "lc1_p07",
  speaker: "patient",
  text: "……我不知道。就是心里空落落的，一停就往下掉。我只能一直学，一直学，把它填上。我这半年每天都学到凌晨一点，可成绩还是往下掉。我越使劲，它越往下掉。",
  emotion: "sad",
  autoNext: "lc1_c07",
}
```

```ts-dialog
// id: lc1_c07
{
  id: "lc1_c07",
  speaker: "doctor",
  text: "「越使劲越往下掉」——她用力气的方向，好像反了。",
  choices: [
    { id: "lc1_c07_a", text: "「你一直在用学习填那个洞。填了多久了？」", kind: "empathy", effect: { trust: 1 }, next: "lc1_p08" },
    { id: "lc1_c07_b", text: "（把纸巾盒往她那边推了推，没说话。）", kind: "silence", effect: { trust: 1 }, next: "lc1_p08" },
  ],
}
```

```ts-dialog
// id: lc1_p08
{
  id: "lc1_p08",
  speaker: "patient",
  text: "（她没碰纸巾）……半年了吧。也可能更早。我也不想这样，我知道应该停下来歇歇。可我一歇，就觉得自己在偷懒。我妈会说我的。",
  emotion: "neutral",
  autoNext: "lc1_c08",
}
```

```ts-dialog
// id: lc1_c08
{
  id: "lc1_c08",
  speaker: "doctor",
  text: "「一歇就觉得偷懒」——连歇一会儿，她都不被允许。",
  choices: [
    { id: "lc1_c08_a", text: "「你连歇一会儿，都觉得是偷懒——这条规矩，谁给你立的？」", kind: "empathy", effect: { trust: 1, truth: 1 }, next: "lc1_p09" },
    { id: "lc1_c08_b", text: "（不接话，让她自己往下想。）", kind: "silence", effect: { trust: 1 }, next: "lc1_p09" },
  ],
}
```

```ts-dialog
// id: lc1_p09
{
  id: "lc1_p09",
  speaker: "patient",
  text: "……规矩？我也不知道谁立的。反正从小就这样。我考好了，什么事都没有。我考砸了，我妈不骂我，她就是不看我。那种『不看』，比骂我还难受。",
  emotion: "sad",
  autoNext: "lc1_c09",
}
```

```ts-dialog
// id: lc1_c09
{
  id: "lc1_c09",
  speaker: "doctor",
  text: "「不看比骂还难受」——她第一次把那种冷说出来了。",
  choices: [
    { id: "lc1_c09_a", text: "「她不看你——你却一直在用成绩，换她的一个眼神。」", kind: "empathy", effect: { trust: 1, mood: 2, truth: 1 }, next: "lc1_p10" },
    { id: "lc1_c09_b", text: "「『从小就这样』——能跟我讲讲，小时候有一次这样的『不看』吗？」", kind: "probe", effect: { trust: 1, truth: 3 }, next: "lc1_p10" },
  ],
}
```

```ts-dialog
// id: lc1_p10
{
  id: "lc1_p10",
  speaker: "patient",
  text: "（她沉默了一会儿）……医生，小时候的事，我不太想提。今天说了挺多的了。我回去……会试着不学那么晚。",
  emotion: "neutral",
  autoNext: "lc1_c10",
}
```

```ts-dialog
// id: lc1_c10
{
  id: "lc1_c10",
  speaker: "doctor",
  text: "她把门关上了——「小时候的事不太想提」。不急，今天她已经开了口。",
  choices: [
    { id: "lc1_c10_a", text: "「好，小时候的事先放着。你能来，就很好。」", kind: "empathy", effect: { mood: 3 }, next: "lc1_out" },
    { id: "lc1_c10_b", text: "（点点头，没追问，把门给她留着。）", kind: "silence", effect: { trust: 1 }, next: "lc1_out" },
  ],
}
```

```ts-dialog
// id: lc1_out
{
  id: "lc1_out",
  speaker: "narration",
  text: "林晨走的时候，把那支笔攥得紧紧的。到门口她停了一下，回头问：「医生，我下周还能来吗？」没等你回答，她就走了。你注意到她手背因为攥笔攥得太紧，勒出了一道白印。",
  beatEnd: { resumeNode: "lc2_start" },
  autoNext: "lc2_start",
}
```

```ts-dialog
// id: lc1_r01
{
  id: "lc1_r01",
  speaker: "patient",
  text: "（她脸色冷下来）您也这么说？我班主任也说我调整一下就好。我没毛病，我就是累。我又不是没努力。",
  emotion: "angry",
  autoNext: "lc1_p02",
}
```

### 节拍 2 · 保送落选·「他们不看我了」（trust 28→40，truth 9→18，阻抗2）

```ts-dialog
// id: lc2_start
{
  id: "lc2_start",
  speaker: "narration",
  text: "一周后，林晨准时来了。这次她没攥笔，但手指一直在搓校服的衣角。坐下后她先开口，像是憋了一周的话终于找着了出口。",
  autoNext: "lc2_p01",
}
```

```ts-dialog
// id: lc2_p01
{
  id: "lc2_p01",
  speaker: "patient",
  text: "医生，这周我月考又考砸了，第十二名。我妈没说话，我爸开始每天接送我上下学。他以前从不送我。",
  emotion: "anxious",
  autoNext: "lc2_c01",
}
```

```ts-dialog
// id: lc2_c01
{
  id: "lc2_c01",
  speaker: "doctor",
  text: "「以前从不送」——爸爸突然开始接送，这个变化让她不安。",
  choices: [
    { id: "lc2_c01_a", text: "「你爸开始送你——这让你不习惯吧。」", kind: "empathy", effect: { trust: 2, mood: 2 }, next: "lc2_p02" },
    { id: "lc2_c01_b", text: "（示意她说下去，不急着追问。）", kind: "silence", effect: { trust: 1 }, next: "lc2_p02" },
  ],
}
```

```ts-dialog
// id: lc2_p02
{
  id: "lc2_p02",
  speaker: "patient",
  text: "不习惯。他一路上不说话，就开车。偶尔回头看我一眼，问一句『今天怎么样』。我说『还行』，他就不问了。那种沉默比我妈的叹气还压人。",
  emotion: "scared",
  autoNext: "lc2_c02",
}
```

```ts-dialog
// id: lc2_c02
{
  id: "lc2_c02",
  speaker: "doctor",
  text: "「他送你，却不跟你说话」——这种『陪着』，比不送更累。",
  choices: [
    { id: "lc2_c02_a", text: "「他陪着却不说话——你在车里是什么感觉？」", kind: "empathy", effect: { trust: 1 }, next: "lc2_p03" },
    { id: "lc2_c02_b", text: "「『以前从不送』——他为什么现在开始送你了？」", kind: "probe", effect: { trust: 1, truth: 3 }, next: "lc2_p03" },
  ],
}
```

```ts-dialog
// id: lc2_p03
{
  id: "lc2_p03",
  speaker: "patient",
  text: "因为我考砸了。以前我成绩好，他们不用操心，我自己上下学。他们只看成绩单。考好了，什么事都没有。考不好……",
  emotion: "neutral",
  autoNext: "lc2_c03",
}
```

```ts-dialog
// id: lc2_c03
{
  id: "lc2_c03",
  speaker: "doctor",
  text: "她把「考不好」后面的话咽了回去。",
  choices: [
    { id: "lc2_c03_a", text: "「他们只看成绩单——那『你』呢？谁来看你？」", kind: "empathy", effect: { trust: 2, defense: -2, truth: 1 }, next: "lc2_p04" },
    { id: "lc2_c03_b", text: "「『考不好』——后面的话，你咽回去了。」", kind: "silence", effect: { trust: 1 }, next: "lc2_p04" },
  ],
}
```

```ts-dialog
// id: lc2_p04
{
  id: "lc2_p04",
  speaker: "patient",
  text: "（她眼眶红了一下，又压住）……上学期末，保送名额的事。他们早就跟我说，这个名额是我的。我也一直这么以为。结果出来，没有我。那天我回家，我妈在厨房，没出来。我爸坐在客厅，看了我一眼，说『下学期再努力』。然后就没话了。",
  emotion: "broken",
  autoNext: "lc2_c04",
}
```

```ts-dialog
// id: lc2_c04
{
  id: "lc2_c04",
  speaker: "doctor",
  text: "保送落选那晚——她在等一句什么话，却只等到沉默。",
  choices: [
    { id: "lc2_c04_a", text: "「那晚他们没骂你，可那种沉默，比骂还重。」", kind: "empathy", effect: { trust: 2, defense: -2, mood: 2, truth: 1 }, next: "lc2_p05" },
    { id: "lc2_c04_b", text: "「『没有我』——你当时心里第一个念头是什么？」", kind: "probe", effect: { trust: 1, truth: 3 }, next: "lc2_p05" },
    { id: "lc2_c04_c", text: "「保送没上就高考呗，你底子还在。」", kind: "logic", effect: { trust: -6, defense: 5 }, next: "lc2_r01" },
  ],
}
```

```ts-dialog
// id: lc2_p05
{
  id: "lc2_p05",
  speaker: "patient",
  text: "（她声音发抖）我第一个念头是……完了，他们不要我了。不是真的不要，就是那种，他们看我的眼神变了。像我不是他们认识的那个小孩了。",
  emotion: "scared",
  autoNext: "lc2_c05",
}
```

```ts-dialog
// id: lc2_c05
{
  id: "lc2_c05",
  speaker: "doctor",
  text: "「他们不要我了」——她把落选，说成了被抛弃。",
  choices: [
    { id: "lc2_c05_a", text: "「『他们不要我了』——这个念头，吓到你了。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "lc2_p06" },
    { id: "lc2_c05_b", text: "「你怕的是保送没了，还是他们对你的态度变了？」", kind: "probe", effect: { trust: 1, truth: 3 }, next: "lc2_p06" },
  ],
}
```

```ts-dialog
// id: lc2_p06
{
  id: "lc2_p06",
  speaker: "patient",
  text: "是态度。保送没了就高考，我能认。可他们那种眼神……我妈给我换了台灯，我爸开始接送我。他们更『关心』我了，可我觉得，他们是在盯着我。",
  emotion: "anxious",
  autoNext: "lc2_c06",
}
```

```ts-dialog
// id: lc2_c06
{
  id: "lc2_c06",
  speaker: "doctor",
  text: "「更关心却更累」——她分清了关心和盯着，这是很重要的觉察。",
  choices: [
    { id: "lc2_c06_a", text: "「他们越关心，你越觉得在被盯着——这份『关心』，让你喘不过气。」", kind: "empathy", effect: { trust: 2, mood: 2, truth: 1 }, next: "lc2_p07" },
    { id: "lc2_c06_b", text: "（不接话，让她自己把那份『盯着』再坐一会儿。）", kind: "silence", effect: { trust: 1 }, next: "lc2_p07" },
  ],
}
```

```ts-dialog
// id: lc2_p07
{
  id: "lc2_p07",
  speaker: "patient",
  text: "……他们从来盯的都是成绩。我考第一的时候，他们说我乖，说我有出息。我考砸了，他们不骂我，但他们不看我了。那种『不看』，比骂还冷。",
  emotion: "sad",
  autoNext: "lc2_c07",
}
```

```ts-dialog
// id: lc2_c07
{
  id: "lc2_c07",
  speaker: "doctor",
  text: "「考第一才被看」——她在用成绩换一个眼神。这条规矩，是从什么时候立的？",
  choices: [
    { id: "lc2_c07_a", text: "「你一直在用『考第一』，换他们看你一眼。」", kind: "empathy", effect: { trust: 1, truth: 1 }, next: "lc2_p08" },
    { id: "lc2_c07_b", text: "（陪她停在这儿，不急着往里推。）", kind: "silence", effect: { trust: 1 }, next: "lc2_p08" },
  ],
}
```

```ts-dialog
// id: lc2_p08
{
  id: "lc2_p08",
  speaker: "patient",
  text: "（她别过脸）……医生，小时候的事，我真的不想提。我今天说了够多了。我们能不能就说现在？我现在该怎么办？",
  emotion: "anxious",
  autoNext: "lc2_c08",
}
```

```ts-dialog
// id: lc2_c08
{
  id: "lc2_c08",
  speaker: "doctor",
  text: "她又把小时候的门关上了——这次比上次更用力。",
  choices: [
    { id: "lc2_c08_a", text: "「好，小时候的事先放着。你现在最想说的是哪句？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "lc2_p09" },
    { id: "lc2_c08_b", text: "「『不想提』——是不想，还是不敢？」", kind: "probe", effect: { trust: 1, truth: 3 }, next: "lc2_p09" },
  ],
}
```

```ts-dialog
// id: lc2_p09
{
  id: "lc2_p09",
  speaker: "patient",
  text: "（她想了很久）……不敢。我怕一说就收不住。我这半年就是靠『不想』撑过来的。现在跟您说这些，我晚上回去可能又睡不着了。",
  emotion: "sad",
  autoNext: "lc2_c09",
}
```

```ts-dialog
// id: lc2_c09
{
  id: "lc2_c09",
  speaker: "doctor",
  text: "「怕收不住」——她知道自己心里压着什么，只是不敢松手。",
  choices: [
    { id: "lc2_c09_a", text: "「你怕收不住——可你已经在这儿了。收不住也没关系。」", kind: "empathy", effect: { mood: 3 }, next: "lc2_p10" },
    { id: "lc2_c09_b", text: "（不说话，把空间留给她。）", kind: "silence", effect: { trust: 1 }, next: "lc2_p10" },
  ],
}
```

```ts-dialog
// id: lc2_p10
{
  id: "lc2_p10",
  speaker: "patient",
  text: "……我也不知道撑的是什么。就是觉得，我得撑着。一倒下，就什么都没了。",
  emotion: "neutral",
  autoNext: "lc2_c10",
}
```

```ts-dialog
// id: lc2_c10
{
  id: "lc2_c10",
  speaker: "doctor",
  text: "「一倒下就什么都没了」——她说不出『什么』是什么，但那个恐惧是真的。",
  choices: [
    { id: "lc2_c10_a", text: "「你不知道撑的是什么，可你还在撑——这份力气，先留着。下周见。」", kind: "empathy", effect: { mood: 2 }, next: "lc2_out" },
    { id: "lc2_c10_b", text: "（点点头，约下次。）", kind: "silence", effect: { trust: 1 }, next: "lc2_out" },
  ],
}
```

```ts-dialog
// id: lc2_out
{
  id: "lc2_out",
  speaker: "narration",
  text: "林晨走的时候，在门口站了一会儿。她说：「医生，我回去会试着……不学那么晚。」你看着她离开，校服后背绷得很紧，像在扛着什么看不见的东西。",
  beatEnd: { resumeNode: "lc3_start" },
  autoNext: "lc3_start",
}
```

```ts-dialog
// id: lc2_r01
{
  id: "lc2_r01",
  speaker: "patient",
  text: "（她声音冷下来）高考？您说得轻巧。您不知道那个名额对我家意味着什么。那是我妈盼了三年的。",
  emotion: "angry",
  autoNext: "lc2_p05",
}
```

### 节拍 3 · 三年级的三天·「透明人」（trust 40→50，truth 18→30，[m1@truth30]，恶化入口@trust≤40）

```ts-dialog
// id: lc3_start
{
  id: "lc3_start",
  speaker: "narration",
  text: "又一周，林晨来的时候，眼下有青影。她说这周试着十二点睡，可躺在床上脑子转个不停，天快亮才睡着。坐下后，她没等我问，自己开了口。",
  autoNext: "lc3_p01",
}
```

```ts-dialog
// id: lc3_p01
{
  id: "lc3_p01",
  speaker: "patient",
  text: "医生，我这周想了一件事，想了很久。我一直没敢跟您说……小时候有一次，我考了班级第二。",
  emotion: "broken",
  autoNext: "lc3_c01",
}
```

```ts-dialog
// id: lc3_c01
{
  id: "lc3_c01",
  speaker: "doctor",
  text: "她主动提了小时候——那扇关了两次的门，这次她自己推开了。",
  choices: [
    { id: "lc3_c01_a", text: "「班级第二——对别人是好事，对你不是。」", kind: "empathy", effect: { trust: 2, defense: -2 }, next: "lc3_p02" },
    { id: "lc3_c01_b", text: "「『没敢说』——那次考第二，发生了什么？」", kind: "probe", effect: { trust: 1, truth: 3 }, next: "lc3_p02" },
  ],
}
```

```ts-dialog
// id: lc3_p02
{
  id: "lc3_p02",
  speaker: "patient",
  text: "那天我回家，特别高兴，我想跟我妈说，我考了第二。可我一进门，我妈在打电话，看了我一眼，没理我。我爸在书房，门关着。我跟我爸说『我考了第二』，他说『哦』。就一个字。",
  emotion: "scared",
  autoNext: "lc3_c02",
}
```

```ts-dialog
// id: lc3_c02
{
  id: "lc3_c02",
  speaker: "doctor",
  text: "「哦」——一个字，把她的高兴全压回去了。",
  choices: [
    { id: "lc3_c02_a", text: "「你高高兴兴回家，却像进了间空屋子。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "lc3_p03" },
    { id: "lc3_c02_b", text: "（不打断，让她自己接上那段记忆。）", kind: "silence", effect: { trust: 1 }, next: "lc3_p03" },
  ],
}
```

```ts-dialog
// id: lc3_p03
{
  id: "lc3_p03",
  speaker: "patient",
  text: "我当时没觉得什么，我想可能他们忙。可接下来那几天，还是那样。我妈不叫我吃饭，我爸不问我作业。整整三天，他们像看不见我。",
  emotion: "neutral",
  autoNext: "lc3_c03",
}
```

```ts-dialog
// id: lc3_c03
{
  id: "lc3_c03",
  speaker: "doctor",
  text: "「整整三天像看不见我」——她第一次把那个被当成空气的画面摆出来。",
  choices: [
    { id: "lc3_c03_a", text: "「整整三天被当成空气——那年你多大？」", kind: "empathy", effect: { trust: 1 }, next: "lc3_p04" },
    { id: "lc3_c03_b", text: "「那三天，你做了一件事——是什么？」", kind: "probe", effect: { trust: 1, truth: 3 }, next: "lc3_p04" },
  ],
}
```

```ts-dialog
// id: lc3_p04
{
  id: "lc3_p04",
  speaker: "patient",
  text: "（她攥紧衣角）……我回房间把卷子拿出来，又做了一遍，做到半夜。睡了一觉起来拿去给我妈看，说『我又做了一遍，全对了』。她这才看了我一眼，说『这还差不多』。",
  emotion: "anxious",
  autoNext: "lc3_c04",
}
```

```ts-dialog
// id: lc3_c04
{
  id: "lc3_c04",
  speaker: "doctor",
  text: "「再做一遍全对，换回一个眼神」——这就是她学到的规矩：不优秀，就不被看见。",
  choices: [
    { id: "lc3_c04_a", text: "「你用『再做一遍全对』，换回了她的一个眼神——从那以后，你是不是再也没考过第二？」", kind: "empathy", effect: { trust: 2, defense: -2 }, next: "lc3_p05" },
    { id: "lc3_c04_b", text: "「从那以后，你是不是再也没考过第二？」", kind: "probe", effect: { trust: 1, truth: 3 }, next: "lc3_p05" },
    { id: "lc3_c04_c", text: "「小孩子都这样，父母也不是故意的，别往心里去。」", kind: "logic", effect: { trust: -8, defense: 6 }, next: "lc3_r01" },
  ],
}
```

```ts-dialog
// id: lc3_p05
{
  id: "lc3_p05",
  speaker: "patient",
  text: "（她眼泪掉下来，又很快抹掉）再也没。从那以后我一直第一。因为我发现，只有第一，他们才『看得见』我。不优秀，我就是个透明人。",
  emotion: "broken",
  autoNext: "lc3_c05",
}
```

```ts-dialog
// id: lc3_c05
{
  id: "lc3_c05",
  speaker: "doctor",
  text: "「不优秀就是透明人」——核心信念露出来了。她用了十年，替那个三年级的小孩，换一个『被看见』的资格。",
  choices: [
    { id: "lc3_c05_a", text: "「你用了十年，换一个『被看见』。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "lc3_p06" },
    { id: "lc3_c05_b", text: "（陪她停在这个发现上，不急着往下推。）", kind: "silence", effect: { trust: 1 }, next: "lc3_p06" },
  ],
}
```

```ts-dialog
// id: lc3_p06
{
  id: "lc3_p06",
  speaker: "patient",
  text: "……所以保送落选那晚，我才那么怕。不是怕没保送，是怕他们又像三年级那样，不看我。那个名额没了，我换『被看见』的筹码也没了。",
  emotion: "scared",
  autoNext: "lc3_c06",
}
```

```ts-dialog
// id: lc3_c06
{
  id: "lc3_c06",
  speaker: "doctor",
  text: "她把保送落选和三年级那三天，第一次连到了一起。",
  choices: [
    { id: "lc3_c06_a", text: "「保送没了，你就觉得『被看见』的资格也没了——这份怕，跟了你十年。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "lc3_p07" },
    { id: "lc3_c06_b", text: "（不说话，让她把这个连接再坐一会儿。）", kind: "silence", effect: { trust: 1 }, next: "lc3_p07" },
  ],
}
```

```ts-dialog
// id: lc3_p07
{
  id: "lc3_p07",
  speaker: "patient",
  text: "（她反复搓着衣角）……所以我不敢停。我一停，那个『透明』的感觉就回来了。我宁可硬撑到凌晨，也不想再被那样对待。可我现在撑不住了，成绩还在掉，我越掉越怕，越怕越使劲……",
  emotion: "anxious",
  autoNext: "lc3_c07",
}
```

```ts-dialog
// id: lc3_c07
{
  id: "lc3_c07",
  speaker: "doctor",
  text: "「越掉越怕，越怕越使劲」——她困在这个圈里，转了十年。",
  choices: [
    { id: "lc3_c07_a", text: "「你困在一个圈里：越怕被抛弃，越拼命；越拼命，越累；越累，越掉。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "lc3_p08" },
    { id: "lc3_c07_b", text: "「这个圈，是你自己画的，还是你妈教你画的？」", kind: "probe", effect: { trust: 1, truth: 3 }, next: "lc3_p08" },
  ],
}
```

```ts-dialog
// id: lc3_p08
{
  id: "lc3_p08",
  speaker: "patient",
  text: "（她愣了一下）……是她教的。她从来没打过我，没骂过我，她就是『不看』。她一不看我，我就知道自己又不够好了。我就得再去考第一。",
  emotion: "neutral",
  autoNext: "lc3_c08",
}
```

```ts-dialog
// id: lc3_c08
{
  id: "lc3_c08",
  speaker: "doctor",
  text: "「不打不骂，只是不看」——这种冷，比打还深。",
  choices: [
    { id: "lc3_c08_a", text: "「她用『不看』，教会你『不优秀就不配被爱』。你信了十年。」", kind: "empathy", effect: { mood: 3 }, next: "lc3_p09" },
    { id: "lc3_c08_b", text: "（陪她看着这个发现，不急着给答案。）", kind: "silence", effect: { trust: 1 }, next: "lc3_p09" },
  ],
}
```

```ts-dialog
// id: lc3_p09
{
  id: "lc3_p09",
  speaker: "patient",
  text: "（她声音很轻）……医生，我现在才明白，我学了十年，不是为了自己，是为了不被她『不看』。可我现在真的学不动了。我不知道……不学了，我是谁。",
  emotion: "broken",
  autoNext: "lc3_c09",
}
```

```ts-dialog
// id: lc3_c09
{
  id: "lc3_c09",
  speaker: "doctor",
  text: "「不学了，我是谁」——这是她整场最诚实的一句。走到这儿，下一步怎么走，由你决定。",
  choices: [
    { id: "lc3_c09_a", text: "「你不只是『考第一的那个人』。你愿意的话，我们下周一起找找，那个『不学的你』是谁。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "lc3_p10" },
    { id: "lc3_c09_b", text: "「那个『不学的你』，三年级之前，她是什么样的？」", kind: "probe", effect: { trust: 1, truth: 3 }, next: "lc3_p10" },
    { id: "lc3_c09_c", text: "「你要是真学不动了，那也没办法。高考还等着你，自己看着办吧。」", kind: "logic", require: { trustAtMost: 40 }, effect: { trust: -10, defense: 8, mood: -6 }, next: "lc3_w01", hint: "仅信任≤40 时可见" },
  ],
}
```

```ts-dialog
// id: lc3_p10
{
  id: "lc3_p10",
  speaker: "patient",
  text: "（她想了很久，第一次笑得有点松）……三年级之前？我好像……挺喜欢画画的。我妈说画画没用，我就没画了。我都快忘了这回事。",
  emotion: "calm",
  autoNext: "lc3_c10",
}
```

```ts-dialog
// id: lc3_c10
{
  id: "lc3_c10",
  speaker: "doctor",
  text: "「喜欢画画」——她在废墟里翻出了一件自己的东西。这是今晚的出口。",
  choices: [
    { id: "lc3_c10_a", text: "「这周回去，试着画一笔。不是为了谁，就为你自己。」", kind: "empathy", effect: { mood: 3 }, next: "lc3_out" },
    { id: "lc3_c10_b", text: "「『画画没用』——这句话，是你妈说的，还是你信了的？」", kind: "probe", effect: { trust: 1, truth: 3 }, next: "lc3_out" },
  ],
}
```

```ts-dialog
// id: lc3_out
{
  id: "lc3_out",
  speaker: "narration",
  text: "林晨走的时候，在门口站了很久。她回头看了你一眼，那一眼比前两次都轻。她说：「医生，我回去……会试着画一笔。」你看着她离开，校服后背没那么绷了。",
  beatEnd: { resumeNode: "lc4_start" },
  autoNext: "lc4_start",
}
```

```ts-dialog
// id: lc3_r01
{
  id: "lc3_r01",
  speaker: "patient",
  text: "（她猛地站起来，又坐下）……您也觉得是我矫情？我都这么大了，还记着小时候的事。是我自己放不下，跟他们没关系，对吧？",
  emotion: "angry",
  autoNext: "lc3_p05",
}
```

```ts-dialog
// id: lc3_w01
{
  id: "lc3_w01",
  speaker: "patient",
  text: "（她沉默了很久，声音很冷）您说得对，是我自己学不动了。高考是我的事，跟您没关系。我就该这样，反正从小到大，也没人真觉得我能歇着。",
  emotion: "broken",
  autoNext: "lc3_w02",
}
```

```ts-dialog
// id: lc3_w02
{
  id: "lc3_w02",
  speaker: "doctor",
  text: "你说错了话，把她推进了「没人觉得我能歇着」的深坑。",
  choices: [
    { id: "lc3_w02_a", text: "「我不是这个意思，我只是……你得自己想开才行。」", kind: "logic", effect: { trust: -6, defense: 5 }, next: "lc3_w03" },
    { id: "lc3_w02_b", text: "（你意识到说错了，试着补救。）", kind: "empathy", effect: { trust: -3, mood: -4 }, next: "lc3_w03" },
  ],
}
```

```ts-dialog
// id: lc3_w03
{
  id: "lc3_w03",
  speaker: "patient",
  text: "……不用补救了。我本来就没指望谁。就这样吧，谢谢您今天的时间。",
  emotion: "broken",
  autoNext: "lc_end_worsen",
}
```

### 节拍 4 · 转向+结局（trust 50→58，cure 主线分叉 + 安全网）

```ts-dialog
// id: lc4_start
{
  id: "lc4_start",
  speaker: "narration",
  text: "一周后，林晨来的时候，手里多了一样东西——一张折好的纸。坐下后，她没等你问，先把纸展开，放在桌上。是一幅画，画的是一个小孩蹲在桌边，桌上摆着三碗饭。",
  autoNext: "lc4_p01",
}
```

```ts-dialog
// id: lc4_p01
{
  id: "lc4_p01",
  speaker: "patient",
  text: "医生，我回去画了。画的是三年级那件事。画完我才发现，那个小孩蹲在那儿，我看着她，心里挺疼的。我以前从来没……没心疼过自己。",
  emotion: "calm",
  autoNext: "lc4_fork",
}
```

```ts-dialog
// id: lc4_fork
{
  id: "lc4_fork",
  speaker: "doctor",
  text: "她画出了那个蹲在桌边的小孩，还说「心疼过自己」——这是她第一次，用大人的眼睛看那个三年级的孩子。走到这儿，有一条分岔需要她选。",
  choices: [
    { id: "lc4_fork_a", text: "「我们来做最后一件事：写一张清单——允许自己停下来的事、累了能找谁、什么时候必须歇。让这张网替你兜一阵。」", kind: "special", effect: { trust: 1, mood: 2 }, next: "lc4_s01" },
    { id: "lc4_fork_b", text: "「你不用一下子变好。学会带着那份空感慢慢走，也是一种答案。」", kind: "empathy", effect: { trust: 1 }, next: "lc4_a01" },
    { id: "lc4_fork_c", text: "「你妈用『不看』教会你害怕。这件事，不该只有你一个人扛——我想约你父母谈一次。」", kind: "confront", require: { trust: 50 }, effect: { trust: 1, truth: 3 }, next: "lc4_h01", hint: "需要信任≥50" },
  ],
}
```

#### 安全网路径（cure 主线）

```ts-dialog
// id: lc4_s01
{
  id: "lc4_s01",
  speaker: "patient",
  text: "（她看着那张空白的清单）……『允许自己停下来』。我长这么大，还没跟任何人说过『我要歇一会儿』。我总觉得，歇就是偷懒，偷懒就会被……被不看。",
  emotion: "neutral",
  autoNext: "lc4_s02",
}
```

```ts-dialog
// id: lc4_s02
{
  id: "lc4_s02",
  speaker: "doctor",
  text: "她把「歇」和「被不看」连在了一起——这正是要拆开的地方。",
  choices: [
    { id: "lc4_s02_a", text: "「歇不是偷懒。是你给自己续一口气的权利。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "lc4_s03" },
    { id: "lc4_s02_b", text: "「『歇就会被不看』——这条规矩，是你妈立的，还是你自己信的？」", kind: "probe", effect: { trust: 1, truth: 3 }, next: "lc4_s03" },
  ],
}
```

```ts-dialog
// id: lc4_s03
{
  id: "lc4_s03",
  speaker: "patient",
  text: "（她低头看着清单）……是我妈立的。她从来没说出口，但她一不看我，我就懂了。我信了十年，现在你这么一问，我好像……没那么确定了。",
  emotion: "anxious",
  autoNext: "lc4_s04",
}
```

```ts-dialog
// id: lc4_s04
{
  id: "lc4_s04",
  speaker: "doctor",
  text: "「没那么确定了」——十年的规矩，第一次动摇了。",
  choices: [
    { id: "lc4_s04_a", text: "「这份不确定，是好事。它说明你开始用自己的眼睛看了。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "lc4_s05" },
    { id: "lc4_s04_b", text: "「如果那条规矩是错的——你不优秀，也配被爱吗？」", kind: "probe", effect: { trust: 1, truth: 3 }, next: "lc4_s05" },
  ],
}
```

```ts-dialog
// id: lc4_s05
{
  id: "lc4_s05",
  speaker: "patient",
  text: "（她眼眶红了）……我不确定。但我画那个小孩的时候，我心里想的是：她才三年级，她不该用考第一，换一顿饭吃。她不该那么活。",
  emotion: "broken",
  autoNext: "lc4_s06",
}
```

```ts-dialog
// id: lc4_s06
{
  id: "lc4_s06",
  speaker: "doctor",
  text: "「她不该那么活」——她在替那个三年级的小孩说话了。",
  choices: [
    { id: "lc4_s06_a", text: "「你替她说话了。现在，也替你自己说一句——你想要什么？」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "lc4_s07" },
    { id: "lc4_s06_b", text: "（不说话，让这句话落到底。）", kind: "silence", effect: { trust: 1 }, next: "lc4_s07" },
  ],
}
```

```ts-dialog
// id: lc4_s07
{
  id: "lc4_s07",
  speaker: "patient",
  text: "（她想了很久）……我想要……我妈能看我一眼，不是因为我考了第一，就是因为我是她女儿。我想要我爸接送我，是因为他想接我，不是因为怕我又考砸。我想要……不学那么晚，也能睡着。",
  emotion: "sad",
  autoNext: "lc4_s08",
}
```

```ts-dialog
// id: lc4_s08
{
  id: "lc4_s08",
  speaker: "doctor",
  text: "她第一次说出了自己想要什么——不是成绩，不是第一，是「被看着」。",
  choices: [
    { id: "lc4_s08_a", text: "「这些想要，都很正常。你憋了十年，今天说出来了。」", kind: "empathy", effect: { trust: 1, mood: 3 }, next: "lc4_s09" },
    { id: "lc4_s08_b", text: "「『不学那么晚也能睡着』——这周回去，试着关一次灯。」", kind: "probe", effect: { trust: 1, truth: 3 }, next: "lc4_s09" },
  ],
}
```

```ts-dialog
// id: lc4_s09
{
  id: "lc4_s09",
  speaker: "patient",
  text: "（她在清单上写了一行字）……『累了可以歇』。我写下来了。写的时候手在抖。我以前从来不敢把这句话写出来，怕被我妈看见。",
  emotion: "anxious",
  autoNext: "lc4_s10",
}
```

```ts-dialog
// id: lc4_s10
{
  id: "lc4_s10",
  speaker: "doctor",
  text: "她亲手写下了「累了可以歇」——这是她给自己立的第一条新规矩。",
  choices: [
    { id: "lc4_s10_a", text: "「这张清单你留着。那个声音再说『不准歇』，你拿出来看一眼。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "lc4_s11" },
    { id: "lc4_s10_b", text: "「『怕被我妈看见』——这张清单，是你自己的，不是她的。」", kind: "probe", effect: { trust: 1, truth: 3 }, next: "lc4_s11" },
  ],
}
```

```ts-dialog
// id: lc4_s11
{
  id: "lc4_s11",
  speaker: "patient",
  text: "（她把清单折好，放进口袋）……医生，我还有件事想说。我昨晚关了灯，躺了半个小时，没看书。我妈推门进来问我在干嘛，我说『我在歇着』。她愣了一下，没说话，就关上门走了。",
  emotion: "neutral",
  autoNext: "lc4_s12",
}
```

```ts-dialog
// id: lc4_s12
{
  id: "lc4_s12",
  speaker: "doctor",
  text: "「我在歇着」——她第一次，对妈妈说出了这句话。",
  choices: [
    { id: "lc4_s12_a", text: "「你说了『我在歇着』。她没骂你，也没不看你了——你发现了吗？」", kind: "empathy", effect: { trust: 2, mood: 3 }, next: "lc4_s13" },
    { id: "lc4_s12_b", text: "（让她自己把这个发现坐一会儿。）", kind: "silence", effect: { trust: 1 }, next: "lc4_s13" },
  ],
}
```

```ts-dialog
// id: lc4_s13
{
  id: "lc4_s13",
  speaker: "patient",
  text: "（她愣了一下）……对。她没不看我。她就是走了。我躺了半小时，居然……睡着了。我半年没睡得那么沉了。",
  emotion: "calm",
  autoNext: "lc4_s14",
}
```

```ts-dialog
// id: lc4_s14
{
  id: "lc4_s14",
  speaker: "doctor",
  text: "「关灯，歇着，睡着了」——她亲手试了一次，那个『不学就会被抛弃』的恐惧，没有成真。",
  choices: [
    { id: "lc4_s14_a", text: "「你试了一次，天没塌。那个三年的小孩，今晚可以歇了。」", kind: "empathy", effect: { mood: 3 }, next: "lc4_s15" },
    { id: "lc4_s14_b", text: "（点点头，把这份『没塌』留给她自己确认。）", kind: "silence", effect: { trust: 1 }, next: "lc4_s15" },
  ],
}
```

```ts-dialog
// id: lc4_s15
{
  id: "lc4_s15",
  speaker: "patient",
  text: "（她看着窗外）……医生，我昨晚想了一件事。我学了十年，不是为了自己。可我昨晚关灯的时候，心里忽然有个念头：也许我可以，为自己学一点。就一点。",
  emotion: "neutral",
  autoNext: "lc4_s16",
}
```

```ts-dialog
// id: lc4_s16
{
  id: "lc4_s16",
  speaker: "doctor",
  text: "「为自己学一点」——这是她十年里，第一次把『学习』和『自己』连在一起。",
  choices: [
    { id: "lc4_s16_a", text: "「这一点，够了。它会长大的。」", kind: "empathy", effect: { mood: 3 }, next: "lc4_s17" },
    { id: "lc4_s16_b", text: "（不说话，让她把这个念头收好。）", kind: "silence", effect: { trust: 1 }, next: "lc4_s17" },
  ],
}
```

```ts-dialog
// id: lc4_s17
{
  id: "lc4_s17",
  speaker: "patient",
  text: "（她站起来，把那幅画也收进书包）……医生，谢谢您。我以前从来没跟人说过这些。我妈不知道，我爸不知道，我同学都以为我什么都行。您是第一个问我『你自己想要什么』的人。",
  emotion: "calm",
  autoNext: "lc4_s18",
}
```

```ts-dialog
// id: lc4_s18
{
  id: "lc4_s18",
  speaker: "doctor",
  text: "「你是第一个问我自己想要什么的人」——她把压了十年的那句话，放了出来。",
  choices: [
    { id: "lc4_s18_a", text: "「你最该谢的是自己——是你敢推开门，敢回头看那个三年级的小孩。」", kind: "empathy", effect: { mood: 3 }, next: "lc_end_cure" },
    { id: "lc4_s18_b", text: "（把那幅画递回给她。）「这幅画你带走。它是你重新开始画画的第一笔。」", kind: "silence", effect: { trust: 1 }, next: "lc_end_cure" },
  ],
}
```

#### 接纳路径（acceptance）

```ts-dialog
// id: lc4_a01
{
  id: "lc4_a01",
  speaker: "patient",
  text: "（她点点头）……带着空感慢慢走。您说得对，我可能没办法一下子把那个『不学就被抛弃』的怕赶走。它跟了我十年，我允许它再住一阵。",
  emotion: "neutral",
  autoNext: "lc4_a02",
}
```

```ts-dialog
// id: lc4_a02
{
  id: "lc4_a02",
  speaker: "doctor",
  text: "她没选「战胜」，选了「共处」——这也是一种向前。",
  choices: [
    { id: "lc4_a02_a", text: "「允许它住一阵，但把钥匙从它手里拿回来——让它住，你来当家。」", kind: "empathy", effect: { trust: 2, mood: 2 }, next: "lc4_a03" },
    { id: "lc4_a02_b", text: "「它再响的时候，你会怎么回应它？」", kind: "probe", effect: { trust: 1, truth: 3 }, next: "lc4_a03" },
  ],
}
```

```ts-dialog
// id: lc4_a03
{
  id: "lc4_a03",
  speaker: "patient",
  text: "……我会跟它说：你说了十年了，我知道你怕。但我今天想歇着。说多了，它好像真的会小声一点。",
  emotion: "calm",
  autoNext: "lc4_a04",
}
```

```ts-dialog
// id: lc4_a04
{
  id: "lc4_a04",
  speaker: "doctor",
  text: "她在「歇」和「被抛弃」之间，第一次站到了歇这一边。",
  choices: [
    { id: "lc4_a04_a", text: "「它小声一点——不是你赢了它，是你不再那么怕它了。」", kind: "empathy", effect: { trust: 1, mood: 2 }, next: "lc4_a05" },
    { id: "lc4_a04_b", text: "（不接话，让她把这份『小声一点』收好。）", kind: "silence", effect: { trust: 1 }, next: "lc4_a05" },
  ],
}
```

```ts-dialog
// id: lc4_a05
{
  id: "lc4_a05",
  speaker: "patient",
  text: "（她想了想）……医生，我回去会试着，每天给自己留一个小时。不学习，就画画，或者发呆。我妈要是不看我，我就……自己看自己一眼。",
  emotion: "neutral",
  autoNext: "lc_end_accept",
}
```

#### 隐藏路径（hidden · 强制介入）

```ts-dialog
// id: lc4_h01
{
  id: "lc4_h01",
  speaker: "patient",
  text: "（她猛地抬头）……约我父母？谈什么？谈三年级那件事？医生，我怕。我从来没跟他们提过那三天。他们可能都不记得了。",
  emotion: "scared",
  autoNext: "lc4_h02",
}
```

```ts-dialog
// id: lc4_h02
{
  id: "lc4_h02",
  speaker: "doctor",
  text: "「他们可能都不记得了」——最伤人的，往往就是这种「不记得」。",
  choices: [
    { id: "lc4_h02_a", text: "「他们不记得，可你记了十年。有些话，不该只有你一个人扛着。」", kind: "confront", effect: { trust: 1, truth: 3, mood: -2 }, next: "lc4_h03" },
    { id: "lc4_h02_b", text: "「我们先不急着约。把这件事放在心里，等你觉得能开口的那天，我们再说。」", kind: "empathy", effect: { trust: 1 }, next: "lc4_h05" },
  ],
}
```

```ts-dialog
// id: lc4_h03
{
  id: "lc4_h03",
  speaker: "patient",
  text: "（她的声音发抖）……如果我爸妈来了，我说出那三天，他们会不会觉得我在怪他们？我不想怪他们。我只是……想让他们知道，那次，很疼。",
  emotion: "broken",
  autoNext: "lc4_h04",
}
```

```ts-dialog
// id: lc4_h04
{
  id: "lc4_h04",
  speaker: "doctor",
  text: "她怕的不是谈，是谈了之后，连这份「想被知道」的心都会被当成「矫情」。",
  choices: [
    { id: "lc4_h04_a", text: "「你不怪他们，你只是想被知道。我会陪你把这句话说出口——他们接不接得住，是他们的事。」", kind: "confront", effect: { truth: 3, mood: -2 }, next: "lc_end_hidden" },
    { id: "lc4_h04_b", text: "「我们先不约。你今天能把『很疼』说出来，已经是很大一步了。」", kind: "empathy", effect: { trust: 1 }, next: "lc4_h05" },
  ],
}
```

```ts-dialog
// id: lc4_h05
{
  id: "lc4_h05",
  speaker: "patient",
  text: "（她垂下眼睛）……好。等我觉得能说的时候，我再跟您说。谢谢您没有逼我。",
  emotion: "neutral",
  autoNext: "lc_end_accept",
}
```

---

## 四、结局

```ts-dialog
// id: lc_end_cure
{
  id: "lc_end_cure",
  speaker: "narration",
  text: "〔结局 · 治愈〕",
  isEnding: true,
  endingType: "cure",
  endingTitle: "关灯的那一夜",
  endingText: "三个月后，林晨来信。她说高考考了第九名，没保送，但去了一所她想去的学校。她说她现在每晚十一点关灯，那盏更亮的台灯，她换回了自己原来的那盏。她妈妈问过她一次「怎么不学了」，她说「我在歇着」。她妈妈愣了一下，没再说话。她说：那个三年级的小孩，终于可以坐下吃饭了。",
  endingReward: { doctorReputation: 8, doctorMoney: 300, doctorExp: 50, doctorSanity: 5 },
}
```

```ts-dialog
// id: lc_end_accept
{
  id: "lc_end_accept",
  speaker: "narration",
  text: "〔结局 · 接纳〕",
  isEnding: true,
  endingType: "acceptance",
  endingTitle: "自己看自己一眼",
  endingText: "林晨没有再约新的会谈，但她每隔一个月会来一趟，坐一会儿，聊几句。她说那个『不学就被抛弃』的怕还在，偶尔还是会冲她喊『你废了』。她现在会回一句：知道了，我今天想歇着。她说，这不是赢，但她终于觉得，那个三年级的小孩，有人看着了。",
  endingReward: { doctorReputation: 4, doctorMoney: 180, doctorExp: 35, doctorSanity: 6 },
}
```

```ts-dialog
// id: lc_end_hidden
{
  id: "lc_end_hidden",
  speaker: "narration",
  text: "〔结局 · 隐藏·那三天〕",
  isEnding: true,
  endingType: "hidden",
  endingTitle: "那三天",
  endingText: "你约谈了林晨的父母。她妈妈听到「三年级考了第二，你们三天没理她」时，沉默了很久。她说：「我不记得了。」她爸爸坐在旁边，没说话。后来林晨妈妈补了一句：「我只是……不知道该怎么管她。」你把那幅画——一个小孩蹲在桌边看着三碗饭——放在桌上。她妈妈看了很久，最后说：「我不知道她记得那么深。」这段关系没有和解，但终于有人，替那三天的饭桌开口了。",
  endingReward: { doctorReputation: -10, doctorMoney: 100, doctorExp: 80, doctorSanity: -15 },
}
```

```ts-dialog
// id: lc_end_worsen
{
  id: "lc_end_worsen",
  speaker: "narration",
  text: "〔结局 · 恶化〕",
  isEnding: true,
  endingType: "worsen",
  endingTitle: "那盏没人替她关的灯",
  endingText: "林晨没有再来。班主任后来转来消息：她在模考前一周，在自习室晕倒，被送进了医院。检查结果是严重睡眠不足加轻度脱水。她醒来的第一句话是「对不起，我又添麻烦了」。那盏更亮的台灯，最终还是没人替那个三年级的小孩关上。",
  endingReward: { doctorReputation: -8, doctorMoney: 50, doctorExp: 10, doctorSanity: -20 },
}
```

---

## 五、状态

- [x] 人物档案完整（三层真相 / 角色三角 / 症状意义 / 关键转折 / 查重）
- [x] 节拍规划表（短档4节拍，trust 15→28→40→50→58，truth 0→40，碎片@15，恶化@trust≤40，隐藏@50）
- [x] v3 机器可解析格式（ts-meta + ts-dialog 全部就位）
- [x] v3 结构校验通过 + tsc 通过
- [x] 走线四线全绿
- [ ] 聚合入口（由 parent 处理）
- [ ] 剧本登记表（由 parent 处理）
