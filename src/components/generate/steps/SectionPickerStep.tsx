"use client";

import type { FormData } from "@/stores/generate.store";
import { useGenerateStore } from "@/stores/generate.store";

const OPTIONAL_SECTIONS = [
  { key: "gallery",       label: "Gallery",          emoji: "🖼️", desc: "Showcase photos of your work or memories" },
  { key: "hobbies",       label: "Hobbies",          emoji: "🎯", desc: "Share your interests and passions" },
  { key: "services",      label: "Services",         emoji: "💼", desc: "List services you offer with pricing" },
  { key: "testimonials",  label: "Testimonials",     emoji: "💬", desc: "Reviews from clients or colleagues" },
  { key: "achievements",  label: "Achievements",     emoji: "🏆", desc: "Awards, certifications, milestones" },
  { key: "skills",        label: "Skills",           emoji: "⚡", desc: "Your abilities and expertise" },
  { key: "projects",      label: "Projects",         emoji: "📂", desc: "Showcase your work and projects" },
];

const MAX_SECTIONS = 3;

export default function SectionPickerStep() {
  const { formData, update } = useGenerateStore();
  const selected = formData.selectedSections;

  const toggle = (key: string) => {
    if (selected.includes(key)) {
      update({ selectedSections: selected.filter((s) => s !== key) });
    } else if (selected.length < MAX_SECTIONS) {
      update({ selectedSections: [...selected, key] });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Choose Optional Sections</h2>
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          Your portfolio already includes <strong className="text-white">Hero</strong>, <strong className="text-white">About Me</strong>, <strong className="text-white">Education</strong>, and <strong className="text-white">Contact</strong>.
        </p>
        <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
          Pick up to <strong className="text-white">{MAX_SECTIONS}</strong> additional sections to personalize your portfolio.
        </p>
      </div>

      <div className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg" style={{ background: "var(--color-bg-card)" }}>
        <span style={{ color: "var(--color-brand-primary)" }}>{selected.length}</span>
        <span style={{ color: "var(--color-text-muted)" }}>/ {MAX_SECTIONS} selected</span>
        {selected.length === MAX_SECTIONS && (
          <span className="text-white text-xs ml-auto">Maximum reached</span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {OPTIONAL_SECTIONS.map((section) => {
          const isSelected = selected.includes(section.key);
          const isDisabled = !isSelected && selected.length >= MAX_SECTIONS;

          return (
            <button
              key={section.key}
              onClick={() => !isDisabled && toggle(section.key)}
              disabled={isDisabled}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                isSelected
                  ? "border-white/60 bg-white/10"
                  : isDisabled
                  ? "border-white/5 opacity-40 cursor-not-allowed"
                  : "border-white/5 hover:border-white/15"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{section.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-white text-sm">{section.label}</p>
                    {isSelected && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white">✓ Added</span>
                    )}
                  </div>
                  <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>{section.desc}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selected.length === 0 && (
        <p className="text-center text-sm py-4" style={{ color: "var(--color-text-muted)" }}>
          You can skip this step if you don&apos;t want extra sections.
        </p>
      )}
    </div>
  );
}
