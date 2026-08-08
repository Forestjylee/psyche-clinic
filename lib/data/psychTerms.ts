import type { PsychTerm } from "../types";

// ============================================================
// 心理学专业词汇库（悬停浮窗解释用）
// 覆盖：症状、治疗法、理论、药物、伦理
// 每个词汇来自真实心理学权威来源（DSM-5/ICD-11）
// ============================================================
export const allPsychTerms: PsychTerm[] = [
  // ---------- 症状类 ----------
  {
    id: "ptsd",
    term: "PTSD",
    aliases: ["创伤后应激障碍", "创伤后压力综合征"],
    category: "symptom",
    severity: 4,
    brief: "创伤后应激障碍：经历严重创伤（战争/性侵/灾难等）后，反复闪回、回避、高警觉持续>1个月。",
    detail:
      "DSM-5 诊断：(1)暴露于实际/威胁性死亡、重伤或性暴力；(2)侵入性症状（闪回/噩梦）；(3)回避与创伤有关的刺激；(4)认知与心境负性改变；(5)唤醒与反应性显著改变。持续≥1个月。",
    source: "DSM-5 (F43.10)",
  },
  {
    id: "c_ptsd",
    term: "复杂PTSD",
    aliases: ["C-PTSD", "复杂性创伤后应激障碍"],
    category: "symptom",
    severity: 5,
    brief: "ICD-11 新增：长期、重复创伤（如童年虐待/家暴/人质）后，自我组织紊乱——情绪调节失调、自我认知破碎、关系困难。",
    detail:
      "区别于单一创伤导致的 PTSD，C-PTSD 三大特征：情绪调节严重失调、对自我的极端负性认知、无法建立持久的人际关系。常与边缘型人格障碍共病。",
    source: "ICD-11 (6B41)",
  },
  {
    id: "dissociation",
    term: "解离",
    aliases: ["解离症状", "解离性", "解离发作"],
    category: "symptom",
    severity: 3,
    brief: "意识、记忆、身份或感知的连续性中断——感觉自己像在旁观自己、时间「丢失」、眼前的世界像假的。",
    detail:
      "解离是一种常见的自我保护机制：大脑无法承受压倒性情绪时，会「断开」与当下的连接。偶发解离正常人也会有（开车走神即轻度），但频繁发作需要干预。",
    source: "DSM-5",
  },
  {
    id: "did",
    term: "DID",
    aliases: ["解离性身份障碍", "多重人格", "解离性身份认同障碍"],
    category: "symptom",
    severity: 5,
    brief: "解离性身份障碍：同一个体存在≥2个独立人格身份，控制行为，伴随严重遗忘。",
    detail:
      "几乎全部 DID 患者有童年期严重创伤史（躯体/性虐待 90%+）。不是「精神分裂」，是身份分裂而非现实检验分裂。治疗以整合各身份、恢复安全与稳定为主轴。",
    source: "DSM-5 (F44.81)",
  },
  {
    id: "nssi",
    term: "NSSI",
    aliases: ["自伤", "非自杀性自伤", "割腕"],
    category: "symptom",
    severity: 4,
    brief: "非自杀性自伤：故意伤害自己身体但无自杀意图（割腕/烫伤/撞击），青少年检出率约17%-23%。",
    detail:
      "常被误解为「矫情」「吸引注意」，实际是个体用来调节压倒性情绪的生存策略。自伤时的痛感能暂时「切断」情绪的海啸。干预原则：先理解不评判，再寻找替代出口（握冰块/橡皮筋弹手腕等）。",
    source: "DSM-5-TR (Section III)",
  },
  {
    id: "body_memory",
    term: "身体记忆",
    aliases: ["躯体记忆"],
    category: "symptom",
    severity: 3,
    brief: "创伤以躯体症状形式存储，而非叙事记忆——找不到明确原因的疼痛、麻木、心悸、窒息感。",
    detail:
      "Van der Kolk 提出「创伤的记忆存在于身体里」：创伤发生时大脑的布洛卡区（语言区）被杏仁核压制，记忆无法转化为语言存储，只能以躯体感受的形式「回闪」。",
    source: "Van der Kolk《身体从未忘记》",
  },
  {
    id: "defense_mechanism",
    term: "防御机制",
    aliases: ["心理防御"],
    category: "theory",
    severity: 2,
    brief: "精神分析概念：自我为了应对焦虑而无意识启动的心理策略（压抑/否认/投射/合理化等）。",
    detail:
      "由弗洛伊德首创、女儿安娜·弗洛伊德系统化。常用防御举例：否认（拒绝承认已发生的事）、投射（把自己不愿承认的想法安给别人）、反向形成（内心恨你表现得过度爱你）。不是「脆弱」，是每个人都在用的「心理免疫系统」。",
    source: "精神分析经典理论",
  },
  {
    id: "cognitive_distortion",
    term: "认知扭曲",
    aliases: ["思维扭曲", "非理性信念"],
    category: "symptom",
    severity: 2,
    brief: "认知行为疗法核心概念：反复出现、偏离现实的思维模式（全或无/灾难化/读心术/应该语句）。",
    detail:
      "常见 10 大认知扭曲：全或无思维、过度概括、心理过滤、否定积极、读心术、算命术（灾难化）、放大或缩小、情绪化推理、应该语句、标签化。CBT 通过「三栏法」（事件-自动思维-理性回应）练习纠正。",
    source: "Burns《伯恩斯新情绪疗法》",
  },
  {
    id: "rumination",
    term: "反刍",
    aliases: ["思维反刍"],
    category: "symptom",
    severity: 2,
    brief: "反复、被动地回想负面事件或感受，而不解决问题——抑郁与焦虑的发动机。",
    detail:
      "反刍（Rumination）来自拉丁语「反复咀嚼」。研究显示反复反刍会激活大脑默认模式网络，持续消耗前额叶能量，直接维持抑郁。干预：具体化（写下是什么/怎么做）、注意力转移到外部（正念锚定五感）。",
    source: "Nolen-Hoeksema 反刍反应理论",
  },
  {
    id: "hypervigilance",
    term: "高警觉",
    aliases: ["过度警觉", "过度警惕"],
    category: "symptom",
    severity: 3,
    brief: "持续处于「随时有危险」的警戒状态，易惊跳、失眠、注意力始终盯向环境威胁。",
    detail:
      "PTSD 三大症状群之一（B/C/D 中的 D 群）。生理基础是杏仁核过度敏感 + 前额叶调节失败。患者即使在安全环境中也无法「关闭」警戒开关。",
    source: "DSM-5 PTSD 诊断标准 D",
  },
  {
    id: "flashback",
    term: "闪回",
    aliases: ["侵入性回忆"],
    category: "symptom",
    severity: 4,
    brief: "创伤场景以视觉、躯体、情绪的形式重新「闯入」当下，个体感觉回到了事件中。",
    detail:
      "不是「想起」，是「重新经历」——瞳孔放大、血压飙升、呼吸急促与创伤发生时完全相同。Grounding（接地技术）是紧急干预：让个体注意当下环境中的 5 种感觉，重新锚定时间/地点。",
    source: "PTSD 临床干预指南",
  },
  {
    id: "depersonalization",
    term: "人格解体",
    aliases: ["自我感丧失"],
    category: "symptom",
    severity: 3,
    brief: "感觉自己像在看自己的电影、不认识自己的身体、与自己的感受「分开」。",
    detail:
      "DSM-5 归类为解离症状群。常见触发：持续高压/急性创伤/大麻使用。绝大多数是一过性，但如果持续≥1个月则为解离性障碍。",
    source: "DSM-5 (F48.1)",
  },
  {
    id: "derealization",
    term: "现实解体",
    aliases: ["非真实感"],
    category: "symptom",
    severity: 3,
    brief: "感觉周围世界不真实、像假的、像隔着一层雾或玻璃罩。",
    detail: "常与人格解体成对出现。急性焦虑发作/解离时常见。",
    source: "DSM-5 (F48.1)",
  },
  {
    id: "anhedonia",
    term: "快感缺失",
    aliases: ["无快感症"],
    category: "symptom",
    severity: 3,
    brief: "对曾经喜欢的事失去兴趣、无法感到愉快——抑郁症的核心诊断症状之一。",
    detail: "不是「心情不好」，是「感觉不到好」——大脑奖赏通路（多巴胺系统）功能下降。",
    source: "DSM-5 抑郁障碍诊断标准",
  },
  {
    id: "all_or_nothing",
    term: "全或无思维",
    aliases: ["二分法思维", "非黑即白"],
    category: "symptom",
    severity: 2,
    brief: "认为任何事情只有两极：完美或全败、成功或废物——认知扭曲家族最常见的一员。",
    detail: "典型：「考不到第一=废物」「他没回消息=讨厌我」。纠正技术：用 0–100 连续谱代替两极。",
    source: "CBT 基础理论",
  },

  // ---------- 常见症状词（对话高频出现，玩家最需要解释）----------
  {
    id: "anxiety",
    term: "焦虑",
    aliases: ["焦虑症", "焦虑情绪", "广泛性焦虑"],
    category: "symptom",
    severity: 2,
    brief: "对未来的过度担忧与紧张，伴心悸、出汗、肌肉紧绷，持续超过 6 个月即为广泛性焦虑障碍。",
    detail: "DSM-5 广泛性焦虑障碍（F41.1）：难以控制的担忧＋以下至少 3 项（坐立不安、易疲劳、注意力下降、易激惹、肌肉紧张、睡眠障碍），持续≥6 个月，明显影响功能。",
    source: "DSM-5 (F41.1)",
  },
  {
    id: "depression",
    term: "抑郁",
    aliases: ["抑郁症", "抑郁发作", "抑郁情绪"],
    category: "symptom",
    severity: 3,
    brief: "持续心境低落、兴趣减退≥2 周，伴自责、精力下降、睡眠食欲改变，重者有自杀意念。",
    detail: "DSM-5 重性抑郁障碍（F32）：≥2 周内出现≥5 项症状（含心境低落或快感缺失），含体重/睡眠/精神运动改变、无价值感、反复想死。需排除躁狂史。",
    source: "DSM-5 (F32)",
  },
  {
    id: "ocd",
    term: "强迫症",
    aliases: ["OCD", "强迫障碍", "强迫性障碍"],
    category: "symptom",
    severity: 3,
    brief: "反复出现不受控的侵入性想法（强迫思维），并靠重复行为（强迫行为）缓解焦虑。",
    detail: "DSM-5（F42）：强迫思维或行为耗时长（>1 小时/天）、引发明显痛苦、非外源物质所致。常见：怕脏/污染、怀疑未锁门、对称强迫。一线治疗：SSRI＋暴露与反应预防（ERP）。",
    source: "DSM-5 (F42)",
  },
  {
    id: "insomnia",
    term: "失眠",
    aliases: ["失眠症", "入睡困难", "睡眠障碍"],
    category: "symptom",
    severity: 2,
    brief: "入睡困难、易醒或早醒，每周≥3 晚、持续≥3 个月，并影响日间功能。",
    detail: "DSM-5 失眠障碍（G47.00）：尽管有充足机会与环境仍入睡/维持睡眠困难；伴日间疲劳、注意力下降、情绪烦躁。首选治疗不是安眠药，而是失眠认知行为疗法（CBT-I）。",
    source: "DSM-5 (G47.00)",
  },
  {
    id: "panic_attack",
    term: "惊恐发作",
    aliases: ["惊恐", "恐慌发作"],
    category: "symptom",
    severity: 3,
    brief: "突如其来的强烈恐惧，伴心悸、窒息感、濒死感，10 分钟内达峰，常被误以为心脏病。",
    detail: "反复非预期发作＋持续担心再次发作≥1 月，即为惊恐障碍（F41.0）。常见认知扭曲：把心跳加速误读为「要死了」。治疗：CBT 纠正灾难化＋内感性暴露。",
    source: "DSM-5 (F41.0)",
  },
  {
    id: "somatization",
    term: "躯体化",
    aliases: ["躯体症状", "躯体化障碍"],
    category: "symptom",
    severity: 2,
    brief: "心理压力以身体症状（疼痛、麻木、乏力）表达，医学检查无明显器质性病因。",
    detail: "DSM-5 躯体症状障碍（F45.1）：对躯体症状异常关注＋过度思虑/焦虑，持续≥6 月。核心：不是「装病」，痛苦真实。治疗需排查共病抑郁焦虑，避免过度检查。",
    source: "DSM-5 (F45.1)",
  },
  {
    id: "delusion",
    term: "妄想",
    aliases: ["妄想症状"],
    category: "symptom",
    severity: 4,
    brief: "坚信不疑的错误信念，与证据相悖、与文化背景不符，无法用说理纠正。",
    detail: "常见类型：被害妄想（被监视/迫害）、关系妄想（周围事件均指向自己）、夸大妄想。多见于精神分裂症、重度抑郁/躁狂。需精神科评估，常需抗精神病药。",
    source: "ICD-11 精神分裂症",
  },
  {
    id: "hallucination",
    term: "幻觉",
    aliases: ["幻听", "幻视"],
    category: "symptom",
    severity: 4,
    brief: "无外部刺激时产生的感知体验，幻听最常见（听到评论/命令自己的声音）。",
    detail: "需区分：入睡前幻听（正常）、丧亲期幻视（常见可正常）vs 持续命令性幻听（高危）。常见于精神病性障碍、重度抑郁、谵妄、物质中毒/戒断。",
    source: "ICD-11 精神病性症状",
  },
  {
    id: "suicidal_ideation",
    term: "自杀意念",
    aliases: ["自杀倾向", "想死", "自杀念头"],
    category: "symptom",
    severity: 5,
    brief: "想到、计划或试图结束生命的想法，分被动（希望消失）与主动（有计划）。",
    detail: "评估要点：频率、强度、有无计划与手段、保护因子。主动意念＋计划＋近期行为＝高危，需立即危机干预并启动安全计划。记住：直接询问自杀不会「教唆」，反而降低风险。",
    source: "C-SSRS 哥伦比亚自杀严重度量表",
  },
  {
    id: "mania",
    term: "躁狂",
    aliases: ["躁狂发作", "轻躁狂"],
    category: "symptom",
    severity: 4,
    brief: "异常高涨/易怒的心境，伴精力爆棚、睡眠需要减少、话多、冲动，持续≥1 周。",
    detail: "DSM-5 躁狂发作（F30）：心境高涨/易激惹＋活动增多、自尊膨胀、思维奔逸、冒险行为（挥霍/性冲动）。出现躁狂即排除单纯抑郁，诊断为双相障碍。抗抑郁药可能诱发躁狂。",
    source: "DSM-5 双相障碍",
  },
  {
    id: "phobia",
    term: "恐惧症",
    aliases: ["恐惧", "社交恐惧", "场所恐惧"],
    category: "symptom",
    severity: 2,
    brief: "对特定物体/情境的强烈、不成比例的恐惧，并主动回避，持续≥6 个月。",
    detail: "分社交恐惧（F40.1）、特定恐惧（F40.2）、场所恐惧（F40.0）。核心：患者知道恐惧过度但无法控制。治疗首选暴露疗法。",
    source: "DSM-5 (F40)",
  },
  {
    id: "adjustment_disorder",
    term: "适应障碍",
    aliases: ["适应性障碍"],
    category: "symptom",
    severity: 2,
    brief: "面对明确应激源（失业/离婚/患病）后 3 个月内出现的情绪/行为反应，超出正常强度。",
    detail: "DSM-5（F43.2）：症状在应激源结束后 6 个月内缓解。表现抑郁/焦虑/品行问题。与正常应激反应区别在于：明显影响功能或痛苦超常。心理治疗首选。",
    source: "DSM-5 (F43.2)",
  },
  {
    id: "rumination_common",
    term: "反刍思维",
    aliases: ["反复想", "钻牛角尖"],
    category: "symptom",
    severity: 2,
    brief: "反复被动地回想负面事件与感受却不解决问题，是抑郁与焦虑的维持引擎。",
    detail: "区别于「反思」（解决问题导向）：反刍是循环的、沉浸的、关注「为什么我这么糟」。干预：正念、行为激活、把「为什么」换成「怎么做」。",
    source: "Nolen-Hoeksema 反刍反应风格量表",
  },

  // ---------- 治疗法类 ----------
  {
    id: "cbt",
    term: "CBT",
    aliases: ["认知行为疗法", "认知行为治疗"],
    category: "therapy",
    brief: "认知行为疗法：识别并纠正「认知扭曲→负面情绪→不良行为」链条的循证心理疗法。",
    detail:
      "Beck 创立，目前临床证据最多的短程心理治疗（6–20次）。核心模型：不是事件本身导致情绪，是对事件的认知。核心技术：思维记录（三栏/五栏法）、行为激活、暴露练习、苏格拉底提问。对抑郁/焦虑/OCD/ PTSD 均一线推荐。",
    source: "APA 临床实践指南",
  },
  {
    id: "emdr",
    term: "EMDR",
    aliases: ["眼动脱敏与再加工"],
    category: "therapy",
    brief: "眼动脱敏与再加工：通过双侧刺激（眼动/交替敲击）处理创伤记忆的短程疗法。",
    detail:
      "Shapiro 1987 年意外发现。核心机制（假说）：创伤记忆被「冻结」在未加工状态，双侧刺激激活双侧大脑半球，让记忆得以被整合。WHO 与 APA 均将 EMDR 列为 PTSD 一线治疗。通常 4–8 次对单一创伤有效。",
    source: "WHO PTSD 治疗指南",
  },
  {
    id: "exposure",
    term: "暴露疗法",
    aliases: ["暴露练习"],
    category: "therapy",
    brief: "有控制、循序渐进地让来访者面对恐惧刺激，打破「回避→恐惧加剧」的恶性循环。",
    detail:
      "分为想象暴露 / 现场暴露 / 内感性暴露（惊恐时暴露于心跳加速等感觉）。CBT 中用于恐惧症、PTSD、OCD。关键：必须在安全关系中进行，且要足够长的时间让「习惯化」发生（焦虑下降≥50% 才能结束一次）。",
    source: "CBT 临床指南",
  },
  {
    id: "cpt",
    term: "CPT",
    aliases: ["认知加工疗法"],
    category: "therapy",
    brief: "认知加工疗法：专门针对创伤后「卡住的信念」（我活该/世界完全危险）的结构化疗法。",
    detail:
      "Resick 开发，PTSD 一线治疗（12次）。核心是写「冲击信」（给施害者/给自己/给重要他人），通过苏格拉底提问松动固着的创伤信念。对性侵/家暴/退伍军人创伤均有大样本循证。",
    source: "VA/DoD PTSD 治疗指南",
  },
  {
    id: "grounding",
    term: "接地技术",
    aliases: ["锚定技术", "五感落地法"],
    category: "therapy",
    brief: "解离/闪回/惊恐发作时的紧急干预：把注意力从「过去的记忆」拉回「当下的环境」。",
    detail:
      "经典 5-4-3-2-1 法：说出 5 样能看到的、4 样能摸到的、3 样能听到的、2 样能闻到的、1 样能尝到的。原理：强迫激活负责外部注意的大脑网络，抑制默认模式网络（反刍/回闪）。",
    source: "PTSD 临床急救手册",
  },
  {
    id: "free_association",
    term: "自由联想",
    aliases: ["自由联想技术"],
    category: "therapy",
    brief: "精神分析核心技术：让来访者不加评判地说出脑子里一切念头，以接触无意识。",
    detail:
      "由弗洛伊德首创。操作：让来访者躺椅放松，报告任何进入意识的内容，哪怕零碎、荒谬、令人尴尬。分析师从中识别「防御」「移情」「阻抗」模式。现代精神分析关系学派已从「白板」转向「合作探索」。",
    source: "精神分析基础技术",
  },
  {
    id: "dbt",
    term: "DBT",
    aliases: ["辩证行为疗法"],
    category: "therapy",
    brief: "辩证行为疗法：Linehan 为边缘型人格障碍/自伤/自杀倾向开发的 CBT 升级版，四大技能模块。",
    detail:
      "四模块：正念（What / How 技能）、痛苦耐受（TIPP / ACCEPTS）、情绪调节（检查事实 / 相反行动）、人际效能（DEAR MAN / GIVE / FAST）。核心辩证：「接纳自己」与「必须改变」同时成立。",
    source: "APA 边缘型人格障碍治疗指南",
  },
  {
    id: "act",
    term: "ACT",
    aliases: ["接纳承诺疗法"],
    category: "therapy",
    brief: "接纳承诺疗法：「不消灭症状，而是带着症状活成想要的人生」的第三浪潮 CBT。",
    detail:
      "Hayes 创立，核心六角模型：接纳、认知解离、活在当下、观察自我、价值澄清、承诺行动。区别于传统 CBT「纠正想法」，ACT 教人与想法「保持距离」（如「我有一个想法：我是废物」≠「我是废物」）。",
    source: "语境行为科学协会 (ACBS)",
  },
  {
    id: "behavioral_activation",
    term: "行为激活",
    aliases: ["行为活化", "BA"],
    category: "therapy",
    brief: "抑郁症循证一线：从「先有心情才做事」切换为「先做事来生成心情」的结构化练习。",
    detail:
      "Lewinsohn 创立，对抑郁的疗效不亚于甚至优于药物（大样本 Rorsch 等 2016 元分析）。步骤：(1)用活动日志记录每天的愉快/成就感；(2)安排「小到无法拒绝」的活动；(3)逐渐重建价值连接的行为节律。",
    source: "NICE 抑郁症治疗指南",
  },
  {
    id: "stabilization",
    term: "稳定化",
    aliases: ["安全稳定化"],
    category: "therapy",
    brief: "创伤治疗的第一阶段：建立身体/环境/关系的安全感，没有稳定绝对不能「挖创伤」。",
    detail:
      "Herman《创伤与复原》经典三阶段模型：(1)安全稳定化 → (2)创伤回忆与哀悼 → (3)重新连接生活。跳过第一阶段直接「谈创伤」是最常见的二次伤害来源。稳定化技术：容器练习、安全岛、接地、呼吸调节。",
    source: "Herman 创伤经典三阶段模型",
  },
  {
    id: "transference",
    term: "移情",
    aliases: ["转移关系"],
    category: "theory",
    brief: "精神分析核心：来访者把童年对重要他人的情感和模式，投射到治疗师身上。",
    detail:
      "不是「爱上医生」那种八卦化解读——例如早年被忽略的来访者，可能把治疗师正常的 5 分钟迟到解读为「您不要我了」。分析与修通移情是深层改变的关键。反移情（治疗师的反应）同样是诊断工具。",
    source: "精神分析关系学派",
  },
  {
    id: "working_alliance",
    term: "治疗同盟",
    aliases: ["工作同盟", "咨询关系"],
    category: "theory",
    brief: "研究证明，心理治疗效果的最大预测因子不是流派，而是来访者-治疗师之间的治疗同盟。",
    detail:
      "Wampold 元分析（2002 年至今）：治疗同盟对疗效的解释力远超流派技术差异。三大组成：(1)任务共识（我们一起做什么）；(2)目标共识（要达成什么）；(3)情感联结（我们信任彼此吗）。",
    source: "Wampold《伟大的心理治疗师》",
  },
  {
    id: "bio_psycho_social",
    term: "生物-心理-社会模型",
    aliases: ["生物心理社会模型"],
    category: "theory",
    brief: "Engel 1977 提出：心理疾病不是「大脑化学失衡」或「想不开」，而是三层因素交互作用。",
    detail:
      "批判了把心理疾病简单还原为「血清素不够」的生物还原论，也反对「你就是想太多」的纯道德解释。健康与疾病必须同时考虑：生物（基因/神经/躯体）、心理（认知/情绪/人格）、社会（家庭/文化/经济/创伤史）。",
    source: "Engel《Science》1977",
  },

  // ---------- 药物类 ----------
  {
    id: "ssri",
    term: "SSRI",
    aliases: ["选择性5-羟色胺再摄取抑制剂", "抗抑郁药"],
    category: "drug",
    brief: "一线抗抑郁/抗焦虑药：氟西汀、舍曲林、帕罗西汀、艾司西酞普兰等。",
    detail:
      "作用机制：抑制突触前 5-HT 再摄取，提高突触间隙 5-羟色胺浓度。起效通常 2–4 周。前 1–2 周可能短暂加重焦虑（J 曲线）。突然停药会有「戒断反应」（头晕、电击感），需逐步减量。非「成瘾性」。",
    source: "NICE 抑郁/焦虑药物指南",
  },
  {
    id: "snri",
    term: "SNRI",
    aliases: ["血清素-去甲肾上腺素再摄取抑制剂"],
    category: "drug",
    brief: "双通道抗抑郁药：作用于 5-HT + 去甲肾上腺素，对 SSRI 无效或伴躯体疼痛时常用。",
    detail: "代表：文拉法辛、度洛西汀、米那普仑。度洛西汀常用于纤维肌痛、糖尿病周围神经痛等躯体疼痛合并抑郁。",
    source: "精神药理学教科书",
  },
  {
    id: "benzodiazepine",
    term: "苯二氮卓",
    aliases: ["苯二氮平", "安定类", "阿普唑仑", "氯硝西泮"],
    category: "drug",
    brief: "抗焦虑/助眠「安定类」：快速有效，但 2–4 周即产生依赖与耐受，临床指南仅短期使用。",
    detail:
      "代表：阿普唑仑、艾司唑仑、氯硝西泮、劳拉西泮。风险：反跳性焦虑、认知损害、与酒精/阿片联用呼吸抑制、老年跌倒骨折。临床推荐焦虑一线为 SSRI，苯二氮卓仅短期救急。长期停用需慢递减以防癫痫大发作。",
    source: "APA/NICE 苯二氮卓使用限制指南",
  },
  {
    id: "antipsychotic",
    term: "抗精神病药",
    aliases: ["抗精神分裂症药物"],
    category: "drug",
    brief: "分两代：一代（氯丙嗪/氟哌啶醇）锥体外系副作用重；二代（利培酮/奥氮平/喹硫平）改善阳性症状。",
    detail:
      "二代也有显著副作用：体重增加（奥氮平最明显，平均 4–10kg/年）、代谢综合征、泌乳素升高、QT 间期延长。处方需规律监测：BMI、血糖、血脂、泌乳素、心电图。",
    source: "精神药理学教科书",
  },

  // ---------- 伦理类 ----------
  {
    id: "confidentiality",
    term: "保密原则",
    aliases: ["保密义务", "保密伦理"],
    category: "ethics",
    brief: "心理治疗伦理基石：来访者所说的一切未经同意不得外传。例外仅 4 种法定强制情形。",
    detail:
      "中国《精神卫生法》、APA伦理守则均列明保密例外：(1)来访者对自己/他人有明确即刻危险；(2)虐待/忽视儿童、老人；(3)法庭传票；(4)来访者同意解除。违反保密是全球最多投诉的伦理违规类型。",
    source: "中国《临床与咨询心理学工作伦理守则》",
  },
  {
    id: "boundary",
    term: "边界",
    aliases: ["专业边界", "双重关系"],
    category: "ethics",
    brief: "治疗关系是专业关系不是朋友——避免双重关系（同时做朋友/恋人/商业伙伴）。",
    detail:
      "边界破坏的典型滑坡：延长咨询时间→私下联系→吃饭→赠送礼物→性关系。绝大多数来访者-治疗师性剥削案例，都以「破例一次」开始。清晰的边界是来访者安全感的来源，不是「冷漠」。",
    source: "APA 伦理守则 3.05（多重关系）",
  },
  {
    id: "vicarious_trauma",
    term: "替代性创伤",
    aliases: ["二次创伤", "共情疲劳"],
    category: "ethics",
    brief: "长期接触他人创伤叙事，治疗师自身也出现类 PTSD 症状（闪回/噩梦/世界观改变）。",
    detail:
      "区别于「职业倦怠」：倦怠是耗竭，替代性创伤是「认知图式改变」——比如从「世界大体安全」变成「到处都是危险」。这不是「心理素质差」，是「太投入的代价」。预防：个案负荷上限、督导、同行支持、自我关怀。",
    source: "创伤临床伦理指南",
  },
  {
    id: "informed_consent",
    term: "知情同意",
    aliases: ["知情同意权"],
    category: "ethics",
    brief: "开始治疗前，治疗师必须清楚告知：治疗目标、方法、风险、时长、费用、保密边界。",
    detail:
      "不是让来访者签一张纸，是持续沟通——来访者任何时候都有权问「我们现在在做什么」「这一步为什么」。药物处方时也须告知适应症、常见副作用、严重风险、替代方案。",
    source: "医学伦理四原则（Beauchamp & Childress）",
  },
  {
    id: "duty_to_warn",
    term: "警告义务",
    aliases: ["保护义务", "Tarasoff 规则"],
    category: "ethics",
    brief: "来访者明确表示要伤害特定他人时，治疗师有法律义务打破保密，警告受害者与警方。",
    detail:
      "起源于美国 Tarasoff 案（1976）：加州大学学生威胁杀女友 Tatiana Tarasoff，心理学家未警告任何人，女友被杀，家属胜诉。不同国家细节有差异，但全球共识是「即将发生的具体危险」> 保密。",
    source: "Tarasoff v. Regents (1976) CA 经典判例",
  },
  {
    id: "hypnosis",
    term: "催眠",
    aliases: ["催眠术"],
    category: "therapy",
    brief: "引导来访者进入高度放松状态，接触平时难以触及的记忆与感受；用于创伤与恐惧议题时需要极谨慎。",
    detail:
      "催眠不是让来访者失去控制，而是在放松与专注的引导下，让人更容易把注意力转向内在感受与记忆。它可以帮助缓解焦虑、处理创伤记忆，但也被认为存在记忆扭曲的风险，因此必须由受过训练的专业人员操作，并充分尊重来访者的知情同意。",
    source: "临床催眠实践指南",
  },
  {
    id: "psychoanalysis",
    term: "精神分析",
    aliases: ["精神分析疗法"],
    category: "therapy",
    brief: "弗洛伊德创立的深度心理治疗：通过自由联想、梦的分析，理解无意识中的冲突如何塑造当下的情感与行为。",
    detail:
      "精神分析认为许多困扰源自无意识——那些被压抑、不愿面对的冲突与愿望。治疗中通过自由联想、梦的解析与移情关系，让来访者逐渐看清并整合这些无意识内容。它是心理治疗的奠基性流派，后来的许多疗法都从它发展而来。",
    source: "精神分析经典理论",
  },
];

// ---------- 索引：词（含别名）→ PsychTerm ----------
const termIndex = new Map<string, PsychTerm>();
for (const t of allPsychTerms) {
  termIndex.set(normalizeTerm(t.term), t);
  if (t.aliases) for (const a of t.aliases) termIndex.set(normalizeTerm(a), t);
}

/** 规范化用于查询：去标点、trim、统一大小写（中文无大小写） */
export function normalizeTerm(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[「」【】\s\-·.…，,。！？?！（）()"]/g, "");
}

/** 查询词汇（支持别名） */
export function lookupTerm(raw: string): PsychTerm | undefined {
  const key = normalizeTerm(raw);
  if (!key) return undefined;
  return termIndex.get(key);
}
