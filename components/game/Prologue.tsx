"use client";

import { useMemo, useState } from "react";
import { useGame } from "@/lib/hooks/useGame";
import type { GameMessage, PrologueChoice } from "@/lib/types";

/** 序章动作步骤种类（P4-2）：挂门牌 / 整理诊室 / 泡茶。纯叙事代入，无数值变化。 */
type ActionKind = "sign" | "tidy" | "tea";

/** 序章四幕：点击逐段推进，末幕「走进诊所」接新手引导 */
const ACTS = [
  {
    label: "幕一 · 困在城市里",
    text: "你曾被困在城市里太久——早高峰的地铁、改不完的方案、永远在线的群消息。直到某个深夜，你盯着屏幕里那个疲惫的自己，忽然不想再这样活下去了。",
  },
  {
    label: "幕二 · 转身",
    text: "你辞了职，用半年时间考下心理咨询师证。没人看好你，连你自己也说不清，这算逃离，还是某种靠近。",
  },
  {
    label: "幕三 · 森林边上",
    text: "你来到一个陌生的城市，在森林边盘下这间闲置的小诊所。推开门，木头和旧书的气味扑面而来——你闻到一种叫自由的东西。",
  },
  {
    label: "幕四 · 第一束光",
    text: "挂钟滴答地走起来，门牌在风里晃了晃，诊室里还飘着淡淡的茶香。第一位患者，正走在来的路上。",
  },
] as const;

/** 离开城市的原因（P4-1）：选项 + 专属独白 + 开局信。仅影响叙事，不改变任何数值。 */
interface PrologueChoiceConfig {
  id: PrologueChoice;
  option: string;
  /** 专属独白一幕的小标题 */
  label: string;
  monologue: string;
  letter: GameMessage;
}

const PROLOGUE_CHOICES: PrologueChoiceConfig[] = [
  {
    id: "burnout",
    option: "厌倦无止境的加班",
    label: "幕间 · 承认疲惫",
    monologue:
      "那些被会议和消息填满的夜晚，你数着屏幕右下角跳动的时钟，才发现自己已经很久没有抬头看过窗外的月亮。那一刻你终于承认——你不是机器，你也会累。",
    letter: {
      id: "prologue_letter_burnout",
      kind: "letter",
      patientName: "阿鹏",
      title: "老地方亮着灯",
      body: "听说你走了。加班那几年，我们总说等哪天不忙了就好好吃一顿，结果一直没等到。现在你替我们俩，把「哪天」找回来了。桌子还给你留着，想回来喝一杯，随时说一声。",
      day: 1,
      read: false,
      tone: "neutral",
    },
  },
  {
    id: "witness",
    option: "亲历过身边的人崩溃",
    label: "幕间 · 想学会接住",
    monologue:
      "你见过一个人在最亲近的人面前碎掉，那天你手足无措，什么话都接不住。从那以后你一直在想，要是再来一次，自己能不能接住他。",
    letter: {
      id: "prologue_letter_witness",
      kind: "letter",
      patientName: "苏姨",
      title: "你那句话，我记住了",
      body: "那年你什么都没说，只是坐在我旁边，陪我把碎掉的自己一块一块捡起来。后来我才知道，你一直悄悄学着怎么接住别人。这间诊所开起来，替我也多接几个人。好好的。",
      day: 1,
      read: false,
      tone: "thanks",
    },
  },
  {
    id: "breath",
    option: "想找一个能呼吸的地方",
    label: "幕间 · 想推开一扇窗",
    monologue:
      "城市太挤，地铁里连转身都费劲，你在人潮里常常忘记自己长什么样子。你只是想推开一扇窗，让风进来，再好好喘一口气。",
    letter: {
      id: "prologue_letter_breath",
      kind: "letter",
      patientName: "陈野",
      title: "窗边给你留着",
      body: "记得你总说，宿舍那扇窗太小，风进不来。现在你去森林边上了，那里的风大概够大。我们几个老室友打赌，你肯定能把日子过成你想要的样子。等收拾妥当，来信说一声，我们去你那看看树。",
      day: 1,
      read: false,
      tone: "neutral",
    },
  },
  {
    id: "heartbreak",
    option: "被一段走散的关系刺痛",
    label: "幕间 · 那道伤口",
    monologue:
      "有些告别没有说再见，只是某天起，手机上再也没有那个人的消息。你带着那道还没愈合的伤口，离开了那座处处都是回忆的城市。",
    letter: {
      id: "prologue_letter_heartbreak",
      kind: "letter",
      patientName: "表姐",
      title: "家里那碗汤还热着",
      body: "你走那天没告诉我，我猜到你心里那道伤还没好。一个人去了那么远的地方，别什么都自己扛。想家的时候，记得表姐这碗汤还给你留着，随时回来喝。",
      day: 1,
      read: false,
      tone: "sad",
    },
  },
];

/** 动作 step 小标题（承接「幕三 · 森林边上」之后、「幕四 · 第一束光」之前） */
const ACTION_LABELS: Record<ActionKind, string> = {
  sign: "第一件事 · 挂上门牌",
  tidy: "第二件事 · 收拾诊室",
  tea: "第三件事 · 泡一杯茶",
};

/** 动作 step 引导语（sign 的名字在渲染时拼入诊所名） */
const ACTION_LEADS: Record<ActionKind, string> = {
  sign: "手里握着门牌，「{clinicName}」几个字刻得整整齐齐。",
  tidy: "诊室还乱着——旧书、绿植、挂钟都不在原处。你挽起袖子，一样一样来。",
  tea: "候诊室空着。先烧上水，给自己沏杯茶，等第一位患者推门进来。",
};

/** 整理诊室的三件待归位物品（逐个点击归位，纯 CSS 色块呈现） */
const TIDY_ITEMS = [
  { id: "books", label: "摞起桌角的旧书" },
  { id: "plant", label: "摆正窗台的绿植" },
  { id: "clock", label: "校准墙上的挂钟" },
] as const;

type PrologueStep =
  | { kind: "act"; act: (typeof ACTS)[number] }
  | { kind: "choice" }
  | { kind: "monologue"; cfg: PrologueChoiceConfig }
  | { kind: "action"; action: ActionKind };

export function Prologue() {
  const { game, dismissPrologue, choosePrologue, playSound } = useGame();
  const [idx, setIdx] = useState(0);
  const [choice, setChoice] = useState<PrologueChoice | null>(null);
  /** 三个动作的完成态：动作未完成前 advance() 被守卫拦截 */
  const [done, setDone] = useState<Record<ActionKind, boolean>>({
    sign: false,
    tidy: false,
    tea: false,
  });
  /** tidy：三件物品各自的归位状态 */
  const [tidyDone, setTidyDone] = useState<boolean[]>(() => TIDY_ITEMS.map(() => false));
  /** tea：0 未烧水 → 1 水开 → 2 已沏茶 */
  const [teaPhase, setTeaPhase] = useState<0 | 1 | 2>(0);

  const clinicName = game.clinicName.trim() || "森林诊所";

  const steps = useMemo<PrologueStep[]>(() => {
    const s: PrologueStep[] = [
      { kind: "act", act: ACTS[0] },
      { kind: "choice" },
    ];
    if (choice) {
      const cfg = PROLOGUE_CHOICES.find((c) => c.id === choice);
      if (cfg) s.push({ kind: "monologue", cfg });
    }
    s.push({ kind: "act", act: ACTS[1] });
    s.push({ kind: "act", act: ACTS[2] });
    // P4-2：动作 step 固定插在幕三之后、幕四之前，迎第一位患者的过渡
    s.push({ kind: "action", action: "sign" });
    s.push({ kind: "action", action: "tidy" });
    s.push({ kind: "action", action: "tea" });
    s.push({ kind: "act", act: ACTS[3] });
    return s;
  }, [choice]);

  const step = steps[idx] ?? steps[steps.length - 1];
  const last = idx >= steps.length - 1;
  const prologueLetter = choice
    ? PROLOGUE_CHOICES.find((c) => c.id === choice)?.letter
    : undefined;

  const advance = () => {
    // 选择屏不能整块点击推进，须点具体选项（避免误触发）
    if (step.kind === "choice") return;
    // P4-2：动作步守卫——动作未完成不能推进
    if (step.kind === "action" && !done[step.action]) return;
    if (last) {
      dismissPrologue(prologueLetter);
      return;
    }
    playSound("page");
    setIdx((i) => i + 1);
  };

  return (
    <div className="prologue" role="dialog" aria-modal="true" aria-label="序章" onClick={advance}>
      <div className="prologue-content" key={idx}>
        {step.kind === "choice" ? (
          <div className="prologue-choice">
            <div className="prologue-act">离开城市的原因</div>
            <p className="prologue-choice-q">你放下那座城市的一切，是因为——</p>
            <div className="prologue-choice-list">
              {PROLOGUE_CHOICES.map((c) => (
                <button
                  key={c.id}
                  className="prologue-choice-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    choosePrologue(c.id);
                    playSound("page");
                    setChoice(c.id);
                    setIdx(2);
                  }}
                >
                  <span className="prologue-choice-mark" aria-hidden="true" />
                  <span>{c.option}</span>
                </button>
              ))}
            </div>
            <div className="prologue-choice-hint">选一个最贴近你的理由，它会化作一段独白，还有一封来信。</div>
          </div>
        ) : step.kind === "action" ? (
          <div className="prologue-action">
            <div className="prologue-act">{ACTION_LABELS[step.action]}</div>
            <p className="prologue-action-lead">
              {step.action === "sign"
                ? ACTION_LEADS.sign.replace("{clinicName}", clinicName)
                : ACTION_LEADS[step.action]}
            </p>

            {step.action === "sign" && (
              <div className={`prologue-sign ${done.sign ? "is-hung" : ""}`}>
                <div className="prologue-sign-plate">
                  <span className="prologue-sign-plate-text">{clinicName}</span>
                </div>
                {done.sign ? (
                  <p className="prologue-action-done">「{clinicName}」被晨风轻轻吹得晃了晃。</p>
                ) : (
                  <button
                    className="prologue-action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      playSound("click");
                      setDone((d) => ({ ...d, sign: true }));
                    }}
                  >
                    把门牌挂上去
                  </button>
                )}
              </div>
            )}

            {step.action === "tidy" && (
              <div className="prologue-tidy">
                <div className="prologue-tidy-items">
                  {TIDY_ITEMS.map((item, i) => (
                    <button
                      key={item.id}
                      className={`prologue-tidy-item ${tidyDone[i] ? "is-tidy" : ""}`}
                      onClick={(e) => {
                        // 三件全归位后，点击交给外层推进（advance 守卫已放行）
                        if (done.tidy) return;
                        e.stopPropagation();
                        if (tidyDone[i]) return;
                        playSound("click");
                        const next = [...tidyDone];
                        next[i] = true;
                        setTidyDone(next);
                        if (next.every(Boolean)) setDone((d) => ({ ...d, tidy: true }));
                      }}
                    >
                      <span className={`ptv ptv-${item.id}`} aria-hidden="true">
                        {item.id === "books" && (
                          <>
                            <i className="ptv-book" />
                            <i className="ptv-book" />
                            <i className="ptv-book" />
                          </>
                        )}
                        {item.id === "plant" && (
                          <>
                            <i className="ptv-stem" />
                            <i className="ptv-pot" />
                          </>
                        )}
                      </span>
                      <span className="prologue-tidy-label">{item.label}</span>
                      <span className="prologue-tidy-check" aria-hidden="true">
                        ✓
                      </span>
                    </button>
                  ))}
                </div>
                {done.tidy && <p className="prologue-action-done">诊室终于像个能坐下好好说话的地方了。</p>}
              </div>
            )}

            {step.action === "tea" && (
              <div className="prologue-tea">
                <div className="prologue-tea-stage">
                  <div className={`prologue-kettle ${teaPhase >= 1 ? "is-boiling" : ""}`} aria-hidden="true">
                    <span className="prologue-kettle-lid" />
                    <span className="prologue-kettle-body" />
                    {teaPhase >= 1 && (
                      <>
                        <span className="prologue-steam prologue-steam-1" />
                        <span className="prologue-steam prologue-steam-2" />
                      </>
                    )}
                  </div>
                  <div className={`prologue-cup ${teaPhase >= 2 ? "is-full" : ""}`} aria-hidden="true">
                    {teaPhase >= 2 && <span className="prologue-tea-steam" />}
                  </div>
                </div>
                {teaPhase === 0 && (
                  <button
                    className="prologue-action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      playSound("click");
                      setTeaPhase(1);
                    }}
                  >
                    烧水
                  </button>
                )}
                {teaPhase === 1 && (
                  <button
                    className="prologue-action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      playSound("click");
                      setTeaPhase(2);
                      setDone((d) => ({ ...d, tea: true }));
                    }}
                  >
                    沏茶
                  </button>
                )}
                {teaPhase === 2 && (
                  <p className="prologue-action-done">茶还烫着，蒸汽在杯口打着转。该准备的，都备好了。</p>
                )}
              </div>
            )}

            {done[step.action] && <div className="prologue-hint">点击继续 ▸</div>}
          </div>
        ) : (
          <>
            <div className="prologue-act">
              {step.kind === "monologue" ? step.cfg.label : step.act.label}
            </div>
            <p className="prologue-text">
              {step.kind === "monologue" ? step.cfg.monologue : step.act.text}
            </p>
            {last ? (
              <button
                className="prologue-enter"
                onClick={(e) => {
                  e.stopPropagation();
                  dismissPrologue(prologueLetter);
                }}
              >
                走进诊所
              </button>
            ) : (
              <div className="prologue-hint">点击继续 ▸</div>
            )}
          </>
        )}
      </div>
      <div className="prologue-dots">
        {steps.map((_, i) => (
          <span key={i} className={`prologue-dot ${i === idx ? "active" : ""}`} />
        ))}
      </div>
    </div>
  );
}
