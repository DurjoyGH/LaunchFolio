"use client";

import { useState } from "react";
import type { FormData } from "@/app/generate/page";

// ===== COLOR PALETTES =====
const PALETTES = [
  { id: "ocean-blue",      name: "Ocean Blue",       primary: "#0ea5e9", secondary: "#0284c7", accent: "#38bdf8", bg: "dark" },
  { id: "modern-purple",   name: "Modern Purple",    primary: "#8b5cf6", secondary: "#7c3aed", accent: "#a78bfa", bg: "dark" },
  { id: "emerald-green",   name: "Emerald Green",    primary: "#10b981", secondary: "#059669", accent: "#34d399", bg: "dark" },
  { id: "sunset-orange",   name: "Sunset Orange",    primary: "#f97316", secondary: "#ea580c", accent: "#fb923c", bg: "dark" },
  { id: "professional",    name: "Professional Gray", primary: "#6b7280", secondary: "#4b5563", accent: "#9ca3af", bg: "light" },
  { id: "elegant-black",   name: "Elegant Black",    primary: "#a3a3a3", secondary: "#737373", accent: "#d4d4d4", bg: "dark" },
  { id: "soft-pink",       name: "Soft Pink",        primary: "#ec4899", secondary: "#db2777", accent: "#f472b6", bg: "light" },
  { id: "luxury-gold",     name: "Luxury Gold",      primary: "#d97706", secondary: "#b45309", accent: "#fbbf24", bg: "dark" },
  { id: "minimal-white",   name: "Minimal White",    primary: "#6366f1", secondary: "#4f46e5", accent: "#818cf8", bg: "light" },
  { id: "forest-green",    name: "Forest Green",     primary: "#22c55e", secondary: "#16a34a", accent: "#4ade80", bg: "dark" },
  { id: "rose-gold",       name: "Rose Gold",        primary: "#e11d48", secondary: "#be123c", accent: "#fb7185", bg: "dark" },
  { id: "sky-blue",        name: "Sky Blue",         primary: "#3b82f6", secondary: "#2563eb", accent: "#60a5fa", bg: "light" },
  { id: "deep-indigo",     name: "Deep Indigo",      primary: "#6366f1", secondary: "#4338ca", accent: "#818cf8", bg: "dark" },
];

// ===== FONTS =====
const FONTS = [
  { name: "Inter",             preview: "Clean, modern, and highly readable" },
  { name: "Poppins",           preview: "Geometric, friendly, and versatile" },
  { name: "Montserrat",        preview: "Bold, contemporary, and elegant" },
  { name: "Playfair Display",  preview: "Serif, sophisticated, and editorial" },
  { name: "Nunito",            preview: "Rounded, soft, and approachable" },
];

// ===== SOCIAL PLATFORMS =====
const SOCIAL_PLATFORMS = [
  { key: "facebook",  label: "Facebook",  icon: "📘", placeholder: "https://facebook.com/username" },
  { key: "linkedin",  label: "LinkedIn",  icon: "🔗", placeholder: "https://linkedin.com/in/username" },
  { key: "instagram", label: "Instagram", icon: "📸", placeholder: "https://instagram.com/username" },
  { key: "twitter",   label: "X (Twitter)", icon: "𝕏", placeholder: "https://x.com/username" },
  { key: "youtube",   label: "YouTube",   icon: "▶️", placeholder: "https://youtube.com/@channel" },
  { key: "tiktok",    label: "TikTok",    icon: "🎵", placeholder: "https://tiktok.com/@username" },
  { key: "pinterest", label: "Pinterest", icon: "📌", placeholder: "https://pinterest.com/username" },
  { key: "threads",   label: "Threads",   icon: "🧵", placeholder: "https://threads.net/@username" },
  { key: "github",    label: "GitHub",    icon: "🐙", placeholder: "https://github.com/username" },
  { key: "website",   label: "Website",   icon: "🌐", placeholder: "https://yoursite.com" },
];

interface Props {
  formData: FormData;
  update: (partial: Partial<FormData>) => void;
}

export default function NonITDesignStep({ formData, update }: Props) {
  const dp = formData.designPreferences;
  const [showSocial, setShowSocial] = useState(false);
  const [socialSearch, setSocialSearch] = useState("");

  const setDP = (key: string, value: string) =>
    update({ designPreferences: { ...dp, [key]: value } });

  const selectPalette = (p: typeof PALETTES[0]) => {
    update({
      designPreferences: {
        ...dp,
        palette: p.id,
        primaryColor: p.primary,
        theme: p.bg,
      },
    });
  };

  const updateSocial = (key: string, value: string) => {
    update({ social: { ...formData.social, [key]: value } });
  };

  const addSocialPlatform = (key: string) => {
    if (!formData.social[key]) {
      updateSocial(key, "");
    }
    setShowSocial(false);
    setSocialSearch("");
  };

  const removeSocial = (key: string) => {
    const newSocial = { ...formData.social };
    delete newSocial[key];
    update({ social: newSocial });
  };

  const activeSocials = Object.keys(formData.social);

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Design Your Portfolio</h2>
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          Choose a color palette and font — we'll handle the rest.
        </p>
      </div>

      {/* ===== COLOR PALETTE ===== */}
      <div>
        <label className="text-sm font-semibold text-white mb-4 block">Color Palette</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {PALETTES.map((p) => (
            <button
              key={p.id}
              onClick={() => selectPalette(p)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                dp.palette === p.id
                  ? "border-white/40 scale-[1.02] shadow-lg"
                  : "border-white/5 hover:border-white/15"
              }`}
            >
              <div className="flex gap-1.5 mb-3">
                <div className="w-6 h-6 rounded-full" style={{ background: p.primary }} />
                <div className="w-6 h-6 rounded-full" style={{ background: p.secondary }} />
                <div className="w-6 h-6 rounded-full" style={{ background: p.accent }} />
              </div>
              <p className="text-sm font-medium text-white">{p.name}</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                {p.bg === "dark" ? "Dark theme" : "Light theme"}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* ===== FONT SELECTION ===== */}
      <div>
        <label className="text-sm font-semibold text-white mb-4 block">Font Style</label>
        <div className="space-y-3">
          {FONTS.map((f) => (
            <button
              key={f.name}
              onClick={() => setDP("fontPreference", f.name)}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                dp.fontPreference === f.name
                  ? "border-indigo-500/60 bg-indigo-500/5"
                  : "border-white/5 hover:border-white/15"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base font-semibold text-white">{f.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>{f.preview}</p>
                </div>
                <span className="text-lg text-white opacity-60" style={{ fontFamily: f.name }}>Aa</span>
              </div>
              {/* Live preview */}
              <p className="mt-3 text-sm leading-relaxed border-t pt-3" style={{ fontFamily: f.name, borderColor: "var(--color-border-subtle)", color: "var(--color-text-secondary)" }}>
                The quick brown fox jumps over the lazy dog. 0123456789
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* ===== CUSTOM DOMAIN ===== */}
      <div>
        <label className="text-sm font-semibold text-white mb-2 block">Custom Domain</label>
        <div className="flex items-center gap-0">
          <input
            type="text"
            placeholder="your-name"
            value={formData.customDomain}
            onChange={(e) => update({ customDomain: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") })}
            className="input rounded-r-none flex-1"
            style={{ borderRight: "none" }}
          />
          <span className="px-4 py-2.5 text-sm rounded-r-xl border border-l-0 font-mono whitespace-nowrap" style={{ borderColor: "var(--color-border-subtle)", background: "var(--color-bg-card)", color: "var(--color-text-muted)" }}>
            .vercel.app
          </span>
        </div>
      </div>

      {/* ===== SOCIAL LINKS ===== */}
      <div>
        <label className="text-sm font-semibold text-white mb-3 block">Social Links</label>
        <p className="text-xs mb-4" style={{ color: "var(--color-text-muted)" }}>
          Add your social media profiles. Icons will appear automatically on your portfolio.
        </p>

        {/* Active socials */}
        <div className="space-y-3 mb-4">
          {activeSocials.map((key) => {
            const platform = SOCIAL_PLATFORMS.find((p) => p.key === key);
            if (!platform) return null;
            return (
              <div key={key} className="flex items-center gap-3">
                <span className="text-lg w-8 text-center flex-shrink-0">{platform.icon}</span>
                <input
                  type="url"
                  value={formData.social[key] || ""}
                  onChange={(e) => updateSocial(key, e.target.value)}
                  placeholder={platform.placeholder}
                  className="input flex-1"
                />
                <button
                  onClick={() => removeSocial(key)}
                  className="text-xs text-red-400 hover:text-red-300 px-2 py-1"
                >✕</button>
              </div>
            );
          })}
        </div>

        {/* Add platform button */}
        <div className="relative">
          <button
            onClick={() => setShowSocial(!showSocial)}
            className="w-full py-3 rounded-xl border-2 border-dashed text-sm font-medium transition-colors hover:border-white/20"
            style={{ borderColor: "var(--color-border-subtle)", color: "var(--color-text-secondary)" }}
          >
            + Add Social Link
          </button>

          {showSocial && (
            <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border shadow-xl z-20 overflow-hidden" style={{ borderColor: "var(--color-border-subtle)", background: "var(--color-bg-card)" }}>
              <input
                type="text"
                placeholder="Search platforms..."
                value={socialSearch}
                onChange={(e) => setSocialSearch(e.target.value)}
                className="w-full px-4 py-3 text-sm bg-transparent border-b outline-none text-white"
                style={{ borderColor: "var(--color-border-subtle)" }}
                autoFocus
              />
              <div className="max-h-48 overflow-y-auto">
                {SOCIAL_PLATFORMS
                  .filter((p) => !activeSocials.includes(p.key))
                  .filter((p) => p.label.toLowerCase().includes(socialSearch.toLowerCase()))
                  .map((p) => (
                    <button
                      key={p.key}
                      onClick={() => addSocialPlatform(p.key)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-white/5 transition-colors"
                    >
                      <span className="text-lg">{p.icon}</span>
                      <span className="text-white">{p.label}</span>
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
