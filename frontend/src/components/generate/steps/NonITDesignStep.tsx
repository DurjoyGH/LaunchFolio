"use client";

import { useState } from "react";
import * as simpleIcons from "simple-icons";
import type { FormData } from "@/stores/generate.store";
import { useGenerateStore } from "@/stores/generate.store";

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
  { name: "Black Ops One",      preview: "Bold, tactical, and high-impact" },
  { name: "Inter",              preview: "Clean, modern, and highly readable" },
  { name: "Poppins",            preview: "Geometric, friendly, and versatile" },
  { name: "Montserrat",         preview: "Bold, contemporary, and elegant" },
  { name: "Playfair Display",   preview: "Serif, sophisticated, and editorial" },
  { name: "Nunito",             preview: "Rounded, soft, and approachable" },
];

// ===== SOCIAL PLATFORMS =====
type SimpleIcon = { path: string; hex: string; title: string };

const LINKEDIN_ICON: SimpleIcon = {
  title: "LinkedIn",
  hex: "0A66C2",
  path: "M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.476-.9 1.636-1.85 3.366-1.85 3.6 0 4.267 2.368 4.267 5.455v6.286zM5.337 7.433A2.065 2.065 0 1 1 5.337 3.3a2.065 2.065 0 0 1 0 4.133zM6.882 20.452H3.79V9h3.092v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.727v20.545C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.273V1.727C24 .774 23.2 0 22.222 0h.003z",
};

const iconOrFallback = (icon?: SimpleIcon) => icon || (simpleIcons as { siLinktree: SimpleIcon }).siLinktree;

const SOCIAL_PLATFORMS: { key: string; label: string; icon: SimpleIcon; placeholder: string }[] = [
  { key: "facebook",  label: "Facebook",  icon: iconOrFallback((simpleIcons as { siFacebook?: SimpleIcon }).siFacebook), placeholder: "https://facebook.com/username" },
  { key: "linkedin",  label: "LinkedIn",  icon: (simpleIcons as { siLinkedin?: SimpleIcon }).siLinkedin || LINKEDIN_ICON, placeholder: "https://linkedin.com/in/username" },
  { key: "instagram", label: "Instagram", icon: iconOrFallback((simpleIcons as { siInstagram?: SimpleIcon }).siInstagram), placeholder: "https://instagram.com/username" },
  { key: "twitter",   label: "X (Twitter)", icon: iconOrFallback((simpleIcons as { siX?: SimpleIcon }).siX), placeholder: "https://x.com/username" },
  { key: "youtube",   label: "YouTube",   icon: iconOrFallback((simpleIcons as { siYoutube?: SimpleIcon }).siYoutube), placeholder: "https://youtube.com/@channel" },
  { key: "tiktok",    label: "TikTok",    icon: iconOrFallback((simpleIcons as { siTiktok?: SimpleIcon }).siTiktok), placeholder: "https://tiktok.com/@username" },
  { key: "pinterest", label: "Pinterest", icon: iconOrFallback((simpleIcons as { siPinterest?: SimpleIcon }).siPinterest), placeholder: "https://pinterest.com/username" },
  { key: "threads",   label: "Threads",   icon: iconOrFallback((simpleIcons as { siThreads?: SimpleIcon }).siThreads), placeholder: "https://threads.net/@username" },
  { key: "github",    label: "GitHub",    icon: iconOrFallback((simpleIcons as { siGithub?: SimpleIcon }).siGithub), placeholder: "https://github.com/username" },
];

const renderSimpleIcon = (icon: SimpleIcon, size = 16) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d={icon.path} />
  </svg>
);

export default function NonITDesignStep() {
  const { formData, update } = useGenerateStore();
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
          Choose a color palette and font — we&apos;ll handle the rest.
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
                  ? "border-white/60 bg-white/10"
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
            className="input rounded-r-none flex-1 border-r-0 min-w-0"
          />
          <div className="input rounded-l-none border-l-0 font-mono text-xs sm:text-sm whitespace-nowrap flex-shrink-0" style={{ width: "auto" }}>
            .vercel.app
          </div>
        </div>
        <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
          If you skip this, we will generate a random domain like <strong>launchfolio-abc123</strong>.
        </p>
      </div>

      {/* ===== SOCIAL LINKS ===== */}
      <div>
        <label className="text-sm font-semibold text-white mb-3 block">Social Links</label>
        <p className="text-xs mb-4" style={{ color: "var(--color-text-muted)" }}>
          Add your social media profiles. Icons will appear automatically on your portfolio.
        </p>
        <p className="text-xs mb-4" style={{ color: "var(--color-text-secondary)" }}>
          At least one social link is required.
        </p>

        {/* Active socials */}
        <div className="space-y-3 mb-4">
          {activeSocials.map((key) => {
            const platform = SOCIAL_PLATFORMS.find((p) => p.key === key);
            if (!platform) return null;
            return (
              <div key={key} className="flex items-center gap-3">
                <span className="w-8 text-center flex-shrink-0 text-gray-300">
                  {renderSimpleIcon(platform.icon)}
                </span>
                <input
                  type="url"
                  value={formData.social[key] || ""}
                  onChange={(e) => updateSocial(key, e.target.value)}
                  placeholder={platform.placeholder}
                  className="input flex-1"
                />
                <button
                  onClick={() => removeSocial(key)}
                  className="text-xs text-white/70 hover:text-white px-2 py-1"
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
                  .filter((p) => {
                    const q = socialSearch.toLowerCase();
                    if (!q) return true;
                    return (
                      p.label.toLowerCase().includes(q)
                      || p.key.toLowerCase().includes(q)
                      || p.placeholder.toLowerCase().includes(q)
                    );
                  })
                  .map((p) => {
                    return (
                    <button
                      key={p.key}
                      onClick={() => addSocialPlatform(p.key)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-white/5 transition-colors"
                    >
                      <span className="text-gray-300">
                        {renderSimpleIcon(p.icon)}
                      </span>
                      <span className="text-white">{p.label}</span>
                    </button>
                  );
                  })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
