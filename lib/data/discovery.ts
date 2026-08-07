import type { DiscoveryChannel } from "../types";

/**
 * 发现客户：获客渠道数据表（数据驱动，新增渠道只需在此追加一项）。
 * 对应 SPEC.md 3.6「发现客户（主动获客）」。
 */
export const discoveryChannels: DiscoveryChannel[] = [
  {
    id: "flyer",
    name: "街头发传单",
    cost: 80,
    desc: "在街角散发传单，触达大众。成本低，来客随缘。",
    minCount: 1,
    maxCount: 1,
    acceptRate: 0.45,
  },
  {
    id: "radio",
    name: "本地广播",
    cost: 200,
    desc: "投放本地电台广告，覆盖面广，有一定筛选。",
    minCount: 2,
    maxCount: 2,
    acceptRate: 0.55,
  },
  {
    id: "newspaper",
    name: "报纸专栏",
    cost: 380,
    desc: "报纸心理专栏广告，触达中高收入人群。",
    minCount: 2,
    maxCount: 2,
    acceptRate: 0.65,
  },
  {
    id: "referral",
    name: "老客户转介",
    cost: 0,
    desc: "由已治愈的患者口碑介绍，质量高。需声望 40。",
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
