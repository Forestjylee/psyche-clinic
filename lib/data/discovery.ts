import type { DiscoveryChannel } from "../types";

/**
 * 善意连接：连接方式数据表（慈善活动/口口相传/家属求助，数据驱动，新增渠道只需在此追加一项）。
 * 对应 SPEC.md 3.6「善意连接（主动获客）」。
 */
export const discoveryChannels: DiscoveryChannel[] = [
  {
    id: "flyer",
    name: "捐图书角",
    cost: 30,
    desc: "在社区角落捐建一个小图书角。善意会慢慢传开。",
    minCount: 1,
    maxCount: 1,
    acceptRate: 0.45,
  },
  {
    id: "radio",
    name: "资助社区讲座",
    cost: 80,
    desc: "资助社区办一场心理讲座。听过的人，深夜会想起你。",
    minCount: 2,
    maxCount: 2,
    acceptRate: 0.55,
  },
  {
    id: "newspaper",
    name: "公益宣传",
    cost: 150,
    desc: "参与一场公益宣传，会有家属为家人悄悄来打听。",
    minCount: 2,
    maxCount: 2,
    acceptRate: 0.65,
  },
  {
    id: "referral",
    name: "治愈者口口相传",
    cost: 0,
    desc: "被你治愈过的人，会向身边需要帮助的人提起你。需声望 40。",
    minCount: 1,
    maxCount: 1,
    acceptRate: 0.8,
    requireReputation: 40,
  },
];

/** 邀约接受率的声望加成：每 10 点声望 +2%，上限 +20% */
export const REPUTATION_ACCEPT_BONUS_EVERY = 10;
export const REPUTATION_ACCEPT_BONUS_STEP = 0.02;
export const REPUTATION_ACCEPT_BONUS_MAX = 0.2;
/** 接受率封顶，避免必中 */
export const ACCEPT_RATE_CAP = 0.95;

/** 邀约接受率 = 渠道基础接受率 + 声望加成（clamp 0.95） */
export function inviteAcceptRate(channelId: string, reputation: number): number {
  const ch = discoveryChannels.find((c) => c.id === channelId);
  const base = ch?.acceptRate ?? 0.5;
  const bonus = Math.min(
    REPUTATION_ACCEPT_BONUS_MAX,
    Math.floor(reputation / REPUTATION_ACCEPT_BONUS_EVERY) *
      REPUTATION_ACCEPT_BONUS_STEP
  );
  return Math.min(ACCEPT_RATE_CAP, base + bonus);
}

/** 到达日偏移分布：今日 50% / 明日 30% / 后日 20%（纯函数，可注入 random 测试） */
export function arrivalDayOffset(random: () => number = Math.random): number {
  const r = random();
  if (r < 0.5) return 0;
  if (r < 0.8) return 1;
  return 2;
}
