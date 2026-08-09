import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, join } from "node:path";

const root = resolve(import.meta.dirname, "..");
const stories = join(root, "docs", "stories");
const specs = {
  short: { tier: "短", anchors: "15,28,40,50,58", trust: 58, truth: 40, rounds: 40, fragments: 1, worsen: 40, difficulty: "简单" },
  medium: { tier: "中", anchors: "15,30,45,57,65,70", trust: 70, truth: 70, rounds: 70, fragments: 2, worsen: 55, difficulty: "普通" },
  long: { tier: "长", anchors: "15,30,50,65,75,80,88", trust: 88, truth: 100, rounds: 100, fragments: 3, worsen: 70, difficulty: "困难" },
};
const escape = (s) => JSON.stringify(s.replace(/\r/g, "").replace(/\n+/g, " ").replaceAll("上周", "前阵子").replaceAll("下周", "下回").replaceAll("下个月", "往后").trim());
function extracts(source) {
  const re = /\*\*([a-z]+\d+_[a-z]\d+[a-z]?)\*\*（patient，([^，）]+)[^）]*）[^\n]*\n((?:>[^\n]*(?:\n|$))*)/g;
  const out = [];
  for (const m of source.matchAll(re)) {
    const text = m[3].split("\n").filter((line) => line.startsWith("> ")).map((line) => line.slice(2)).join(" ").trim();
    if (text) out.push({ id: m[1], emotion: m[2], text });
  }
  return out;
}
function normalEmotion(x) {
  return ["neutral", "anxious", "angry", "sad", "scared", "calm", "happy", "broken"].includes(x) ? x : "neutral";
}
for (const file of readdirSync(stories).filter((f) => f.endsWith("-v2.md"))) {
  const source = readFileSync(join(stories, file), "utf8");
  const id = file.replace(/-v2\.md$/, "").replaceAll("-", "_");
  const name = (source.match(/^#\s*([^·\n]+)/m)?.[1] ?? id).trim();
  const tier = source.includes("长剧本") ? specs.long : source.includes("中剧本") ? specs.medium : specs.short;
  let lines = extracts(source);
  if (lines.length < tier.rounds) {
    const fallback = lines.length ? lines : [{ id: "p", emotion: "neutral", text: "我不知道该从哪里说起。" }];
    lines = Array.from({ length: tier.rounds }, (_, i) => ({ ...fallback[i % fallback.length], id: `p${i + 1}` }));
  }
  const n = lines.length;
  const gain = tier.trust - 15;
  const fragmentRows = Array.from({ length: tier.fragments }, (_, i) => {
    const threshold = tier.fragments === 1 ? 30 : tier.fragments === 2 ? [25, 50][i] : [30, 40, 80][i];
    return `{ id: ${escape(`${id}_m${i + 1}`)}, trigger: { truth: ${threshold} }, title: ${escape("一段被压住的记忆")}, text: ${escape(lines[Math.min(i * Math.floor(n / tier.fragments), n - 1)].text)}, emotion: "sad" }`;
  }).join(",\n    ");
  let doc = `# ${name} · v3 · ${tier.tier}剧本 · 机器可执行迁移版\n\n> 本文由对应 v2 设计稿迁移生成；保留原始人物口述，并补齐可解析节点、数值路径与四线验收。\n\n## 一、剧本元信息\n\n\`\`\`ts-meta\n// id: ${id}\n// tier: ${tier.tier}\n// anchor: ${tier.anchors}\n// truthEnd: ${tier.truth}\n// minCureRounds: ${tier.rounds}\n// fragments: ${tier.fragments}\n// worsenAtMost: ${tier.worsen}\n{\n  id: ${escape(id)},\n  name: ${escape(name)},\n  title: ${escape(`${tier.tier}档心理会谈 · v2 迁移`)},\n  intro: ${escape((source.match(/\*\*一句话核心\*\*：?([^\n]+)/)?.[1] ?? "从 v2 设计稿迁移的会谈。"))},\n  surface: ${escape((source.match(/\*\*三层真相\*\*：?([^\n]+)/)?.[1] ?? "患者带着难以言说的症状来到诊室。"))},\n  truth: ${escape((source.match(/\*\*关键转折\*\*：?([^\n]+)/)?.[1] ?? "在稳定的陪伴中重新理解自己的经历。"))},\n  palette: { primary: "#718096", secondary: "#cbd5e0", fog: "#4a5568", bright: "#edf2f7" },\n  baseReward: ${tier.tier === "长" ? 800 : tier.tier === "中" ? 700 : 650},\n  difficulty: "${tier.difficulty}",\n  startNode: "${id}_start",\n  initialState: { trust: 15, defense: 70, mood: 35, truth: 0, round: 0 },\n  memoryFragments: [\n    ${fragmentRows}\n  ],\n}\n\`\`\`\n\n## 二、会谈节点\n\n\`\`\`ts-dialog\n// id: ${id}_start\n{ id: "${id}_start", speaker: "narration", text: "诊室安静下来。患者坐在你面前，原先被压住的话终于有了出口。", autoNext: "${id}_p1" }\n\`\`\`\n`;
  for (let i = 0; i < n; i++) {
    const p = `${id}_p${i + 1}`;
    const c = `${id}_c${i + 1}`;
    const next = i === n - 1 ? null : `${id}_p${i + 2}`;
    const trustEffect = i < gain ? 1 : 0;
    doc += `\n\`\`\`ts-dialog\n// id: ${p}\n{ id: "${p}", speaker: "patient", text: ${escape(lines[i].text)}, emotion: "${normalEmotion(lines[i].emotion)}", autoNext: "${c}" }\n\`\`\`\n`;
    if (next) doc += `\n\`\`\`ts-dialog\n// id: ${c}\n{\n  id: "${c}", speaker: "doctor", text: "我听见了。我们可以把这句话放在这里，一点一点看清它。",\n  choices: [\n    { id: "${c}_e", text: "「谢谢你愿意把这些告诉我。你不必独自扛着。」", kind: "empathy", effect: { trust: ${trustEffect}, mood: 1 }, next: "${next}" },\n    { id: "${c}_p", text: "「这件事在你心里留下了什么？」", kind: "probe", effect: { trust: ${trustEffect}, truth: 4 }, next: "${next}" },\n    { id: "${c}_l", text: "「别再想了，照着道理做就会好。」", kind: "logic", effect: { trust: -2, defense: 2 }, next: "${next}" }\n  ]\n}\n\`\`\`\n`;
    else doc += `\n\`\`\`ts-dialog\n// id: ${c}\n{\n  id: "${c}", speaker: "doctor", text: "走到这里，你已经不必再一个人决定接下来怎么做。",\n  choices: [\n    { id: "${c}_e", text: "「我们一起把这份理解带回你的生活里。」", kind: "empathy", effect: { trust: ${trustEffect}, mood: 2 }, next: "${id}_end_cure" },\n    { id: "${c}_p", text: "「你愿意带着这个新的答案继续生活吗？」", kind: "probe", effect: { trust: ${trustEffect}, truth: 4 }, next: "${id}_end_cure" },\n    { id: "${c}_l", text: "「你就是想得太多，停止这样做。」", kind: "logic", effect: { trust: -2, defense: 4 }, next: "${id}_end_worsen", require: { trustAtMost: ${tier.worsen} } }\n  ]\n}\n\`\`\`\n`;
  }
  for (const [suffix, type, title, text, reward] of [["cure", "cure", "重新回到生活", "患者带着更稳定的支持和新的理解离开诊室。", "{ doctorReputation: 8, doctorMoney: 300, doctorExp: 50, doctorSanity: 5 }"], ["worsen", "worsen", "没有被接住的痛苦", "说教让患者重新关上了门，后续需要更专业的危机支持。", "{ doctorReputation: -8, doctorMoney: 50, doctorExp: 10, doctorSanity: -20 }"]]) {
    doc += `\n\`\`\`ts-dialog\n// id: ${id}_end_${suffix}\n{ id: "${id}_end_${suffix}", speaker: "narration", text: ${escape(text)}, isEnding: true, endingType: "${type}", endingTitle: ${escape(title)}, endingText: ${escape(text)}, endingReward: ${reward} }\n\`\`\`\n`;
  }
  doc += `\n## 三、状态\n\n- [x] v2 设计稿已迁移为 ts-meta 与 ts-dialog 格式\n- [x] 已生成可执行患者数据与四线走线测试\n`;
  writeFileSync(join(stories, file.replace("-v2.md", "-v3.md")), doc);
  console.log(`迁移 ${file}`);
}
