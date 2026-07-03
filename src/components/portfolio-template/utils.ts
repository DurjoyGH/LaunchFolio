import type { PortfolioBlueprint, PortfolioInput, PortfolioSectionType } from "./types";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function getTheme(blueprint: PortfolioBlueprint, input: PortfolioInput) {
  const preferences = input.designPreferences || {};
  const primary = preferences.primaryColor || blueprint.primaryColor || "#2563eb";
  const secondary = blueprint.secondaryColor || "#0f766e";
  const accent = blueprint.accentColor || "#f59e0b";
  const isDark = blueprint.theme === "dark";

  return {
    primary,
    secondary,
    accent,
    isDark,
    text: isDark ? "#f8fafc" : "#0f172a",
    muted: isDark ? "#94a3b8" : "#64748b",
    surface: isDark ? "rgba(15, 23, 42, 0.72)" : "rgba(255, 255, 255, 0.86)",
    border: isDark ? "rgba(148, 163, 184, 0.2)" : "rgba(15, 23, 42, 0.12)",
  };
}

export function getContentString(content: Record<string, unknown> | undefined, key: string, fallback: string) {
  const value = content?.[key];
  return typeof value === "string" && value.trim() ? value : fallback;
}

export function getFirstAvailableSection(sections: Array<{ type: PortfolioSectionType }>, candidates: PortfolioSectionType[]) {
  return candidates.find((type) => sections.some((section) => section.type === type)) || "about";
}

export function getInitials(name = "") {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
  return initials || "LF";
}

export function sectionLabel(type: string) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}
