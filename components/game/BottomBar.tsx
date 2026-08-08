"use client";

import { useGame } from "@/lib/hooks/useGame";
import type { Scene } from "@/lib/hooks/useGame";
import { allAchievements } from "@/lib/data/achievements";

/** 开罗式底部菜单栏：经营层功能入口，顶栏只留常驻数值与全局操作 */
export function BottomBar() {
  const { game, scene, setScene, restOneDay, achievementEngine, playSound } =
    useGame();

  // 对话/标题屏不显示底部栏（M3 对话场景化后另行布局）
  if (scene === "title" || scene === "dialogue") return null;

  const unread = game.messages.filter((m) => !m.read).length;
  const achCount = achievementEngine
    ? Object.values(achievementEngine.getProgressMap()).filter((p) => p.unlocked)
        .length
    : 0;
  const restRecovery = () => {
    let base = 15;
    if (game.clinicUpgrades.includes("rest_room")) base += 10;
    return base;
  };

  const go = (s: Scene) => {
    playSound("page");
    setScene(s);
  };

  const items: {
    key: Scene | "rest" | "archive";
    icon: string;
    label: string;
    badge?: string | number;
    badgeClass?: string;
    disabled?: boolean;
    onClick: () => void;
    title: string;
  }[] = [
    {
      key: "skills",
      icon: "⚕",
      label: "技能",
      badge: `Lv.${game.doctor.level}`,
      badgeClass: "bb-badge-lv",
      onClick: () => go("skills"),
      title: "技能树",
    },
    {
      key: "clinic_upgrades",
      icon: "🏗",
      label: "升级",
      onClick: () => go("clinic_upgrades"),
      title: "诊所升级",
    },
    {
      key: "letters",
      icon: "✉",
      label: "消息",
      badge: unread > 0 ? unread : undefined,
      badgeClass: unread > 0 ? "bb-badge-red" : undefined,
      onClick: () => go("letters"),
      title: "消息盒子",
    },
    {
      key: "tracking",
      icon: "📋",
      label: "追踪",
      onClick: () => go("tracking"),
      title: "客户追踪",
    },
    {
      key: "discover",
      icon: "🔍",
      label: "发现",
      onClick: () => go("discover"),
      title: "发现客户",
    },
    {
      key: "achievements",
      icon: "🏅",
      label: "成就",
      badge: `${achCount}/${allAchievements.length}`,
      badgeClass: "bb-badge-ach",
      onClick: () => go("achievements"),
      title: "成就图鉴",
    },
    {
      key: "archive",
      icon: "🗂",
      label: "档案",
      onClick: () => go("archive"),
      title: "患者档案",
    },
    {
      key: "rest",
      icon: "😴",
      label: "休息",
      badge: `+${restRecovery()}`,
      badgeClass: "bb-badge-rest",
      onClick: () => {
        playSound("page");
        restOneDay();
      },
      title: "休息一日",
    },
  ];

  return (
    <nav className="bottom-bar" aria-label="经营菜单">
      {items.map((it) => {
        const active = it.key !== "rest" && scene === it.key;
        return (
          <button
            key={it.key}
            className={`bb-item ${active ? "active" : ""}`}
            onClick={it.onClick}
            title={it.title}
            disabled={it.disabled}
          >
            <span className="bb-icon">{it.icon}</span>
            {it.badge !== undefined ? (
              <span className={`bb-badge ${it.badgeClass ?? ""}`}>{it.badge}</span>
            ) : null}
            <span className="bb-label">{it.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
