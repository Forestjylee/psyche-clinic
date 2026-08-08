import type { GameMessage } from "../types";

/**
 * 成就纪念信数据表（P5-5）：关键成就解锁的纪念信，插入消息盒（kind="letter"）展示。
 * 字段为 GameMessage 子集；id 唯一，被成就 reward.unlock.letter 引用。
 */

export interface AchievementLetter {
  id: string;
  title: string;
  body: string;
  /** 来信的情感色调（与 GameMessage.tone 一致，用于 chibi 表情与配色） */
  tone: NonNullable<GameMessage["tone"]>;
  /** 署名（发信人，非必须） */
  patientName?: string;
}

export const ACHIEVEMENT_LETTERS: AchievementLetter[] = [
  {
    id: "ach_letter_first_heal",
    title: "谢谢你听我说完",
    body: "医生，你好。写下这封信的时候，我才敢承认——那天的我，其实是抱着\"最后一次尝试\"来的。谢谢你没有急着给答案，只是坐在那里，听我把话说完。原来被人听完，是这样轻的感觉。我会好好的。——一位曾经不敢开口的来访者",
    tone: "thanks",
  },
  {
    id: "ach_letter_seven_days",
    title: "一周之后",
    body: "你的诊室开张七天，小镇已经有人在街角谈论你。有人说你家的灯总亮到很晚，有人学你说话的样子。我猜你大概没想过，一间小小的诊室，会变成这么多人夜里安心的去处。请继续亮着吧。——镇口杂货铺老板",
    tone: "thanks",
  },
  {
    id: "ach_letter_reunion",
    title: "后会有期",
    body: "我以为治好了就是结束，没想到你还会记得我，像记得一位老朋友。那句话我一直没当面说：谢谢你没把我当成\"一个病例\"。以后路过，我会进来喝杯茶的。——你治愈过的某个人",
    tone: "thanks",
  },
  {
    id: "ach_letter_awakening",
    title: "我看见了月亮",
    body: "医生，昨天夜里我失眠，爬起来走到窗边，发现月亮其实一直挂在那里。以前我总觉得自己活在一层雾里，做什么都隔着一层。那天和你聊完，雾好像散了一点。我不知道该怎么形容，但我终于能说出：我看见了月亮。——一位刚醒来的来访者",
    tone: "neutral",
  },
  {
    id: "ach_letter_half_month",
    title: "半个月",
    body: "你的诊所开张半个月了。每天走过那条街，都能看到门口那盆花又精神了一点。有人问我在里面是不是能治好所有的难过，我说不知道，但至少，走进那扇门的人，都愿意相信会好起来。这一点，很难得。——街角面包店的店员",
    tone: "thanks",
  },
  {
    id: "ach_letter_transfer",
    title: "谢谢你为我指路",
    body: "你没有硬扛着留住我，而是告诉我哪里更合适。当时我心里是不愿意的，觉得被推开了。现在才明白，被认真对待的人，才不会在你最需要的时候敷衍你。谢谢你，把我指给更亮的地方。——一位被你转介的来访者",
    tone: "thanks",
  },
];

/** 按 id 查成就纪念信 */
export function getAchievementLetter(id: string): AchievementLetter | undefined {
  return ACHIEVEMENT_LETTERS.find((l) => l.id === id);
}
