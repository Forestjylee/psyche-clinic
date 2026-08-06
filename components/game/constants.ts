import type { PatientEmotion, EndingType } from "@/lib/types";

export const emotionLabels: Record<PatientEmotion, string> = {
  neutral: "平静",
  anxious: "焦虑",
  angry: "愤怒",
  sad: "悲伤",
  scared: "恐惧",
  calm: "平和",
  happy: "愉悦",
  broken: "崩溃",
};

export const emotionColors: Record<PatientEmotion, string> = {
  neutral: "#8b92b0",
  anxious: "#ffc870",
  angry: "#ff7a8a",
  sad: "#7c9eff",
  scared: "#c8a4ff",
  calm: "#6ad4a0",
  happy: "#a8d8ff",
  broken: "#5a6080",
};

export const choiceIcons: Record<string, string> = {
  empathy: "心",
  probe: "问",
  confront: "锋",
  logic: "理",
  prescribe: "药",
  hypnosis: "眠",
  silence: "默",
  special: "特",
};

export function endingLabel(e: EndingType): string {
  return {
    cure: "治愈",
    acceptance: "接纳",
    dependent: "依赖",
    worsen: "恶化",
    tragic: "悲剧",
    hidden: "隐藏",
    transfer: "转介",
    awakening: "觉醒",
  }[e];
}

export function endingColor(e: EndingType): string {
  return {
    cure: "#6ad4a0",
    acceptance: "#8ad4c8",
    dependent: "#ffc870",
    worsen: "#ff9a7a",
    tragic: "#ff5a6a",
    hidden: "#c8a4ff",
    transfer: "#7ab8ff",
    awakening: "#e8c878",
  }[e];
}

export function catName(c: string): string {
  return (
    { symptom: "症状", therapy: "治疗", theory: "理论", drug: "药物", ethics: "伦理" }[
      c
    ] ?? c
  );
}

/**
 * 温暖回响：根据结局类型，生成一句「你给患者带去了什么」的情感反馈。
 * 设计理念：把焦点从「诊疗技术」转移到「被看见、被陪伴」本身的价值。
 * 即便是坏结局，也温柔地承接住玩家，而非冰冷地扣分。
 */
export function warmthEcho(e: EndingType, patientName?: string): string {
  const who = patientName ? `${patientName}` : "对方";
  const map: Record<EndingType, string> = {
    cure: `${who}久违地笑了一下。那一刻你忽然明白：所谓治愈，不是你治好了谁，而是有人愿意坐下来，听他把话说完。`,
    acceptance: `${who}带着不完美的自己走了出去。你没有替他解决所有问题，但你让他相信：带着伤口，也能继续往前走。`,
    awakening: `${who}第一次看清了自己。你做的不是诊断，是递出了一面镜子——而他有勇气往里看。`,
    transfer: `${who}得到了更合适的帮助。承认「这超出我能做的」不是失败，是你对另一个生命最清醒的善意。`,
    hidden: `你替${who}挡了一次风。这件事或许没人知道，但你知道，他知道。这就够了。`,
    dependent: `${who}此刻很依赖你。这分依赖是真的，但你心里隐隐知道：真正的功课，是有一天让他不再需要你。`,
    worsen: `${who}的情况变糟了。你坐在空荡的诊室里，心里发紧。请记得：不是你不够好，是有些事，一个人扛不动。明天，我们再试一次。`,
    tragic: `这一页很难翻过去。你没法假装无事发生，也不必假装。允许自己难过——这份难过，恰恰说明你在乎。`,
  };
  return map[e] ?? `你和${who}共度了这段时间。这本身，就是一种郑重。`;
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
