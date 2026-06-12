import type { FormData } from "@/app/generate/page";

const THEMES = [
  { value: "dark", label: "Dark", desc: "Sleek dark background", preview: "bg-gray-900" },
  { value: "light", label: "Light", desc: "Clean light background", preview: "bg-gray-100" },
];

const STYLES = [
  { value: "minimal", label: "Minimal", desc: "Clean whitespace, understated" },
  { value: "developer", label: "Developer", desc: "Technical, terminal-inspired" },
  { value: "creative", label: "Creative", desc: "Bold, asymmetric, playful" },
  { value: "corporate", label: "Corporate", desc: "Professional, structured" },
  { value: "glassmorphism", label: "Glass", desc: "Frosted glass, translucent" },
  { value: "futuristic", label: "Futuristic", desc: "Neon accents, glowing" },
];

const FONTS = ["Black Ops One", "Inter", "Poppins", "Raleway", "Roboto", "Space Grotesk"];

const COLORS = [
  "#ffffff", "#000000", "#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b",
  "#ef4444", "#ec4899", "#3b82f6", "#84cc16", "#f97316",
];

const HERO_ANIMATIONS = [
  { value: "fadeUp", label: "Fade Up" },
  { value: "slideIn", label: "Slide In" },
  { value: "typewriter", label: "Typewriter" },
  { value: "glow", label: "Glow Pulse" },
  { value: "none", label: "None" },
];

const LOGO_STYLES = [
  { value: "initial", label: "Initial (A)", desc: "First letter in a box" },
  { value: "name", label: "Name Only", desc: "Just your name" },
  { value: "photo", label: "Photo", desc: "Your profile picture" },
  { value: "photoName", label: "Photo + Name", desc: "Photo with your name" },
];

interface Props {
  formData: FormData;
  update: (partial: Partial<FormData>) => void;
}

const ColorPicker = ({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder: string }) => (
  <div className="flex items-center gap-3">
    <input
      type="color"
      value={value || placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-8 h-8 rounded-lg cursor-pointer border-0 overflow-hidden flex-shrink-0"
    />
    <div className="flex-1">
      <p className="text-xs font-medium text-white">{label}</p>
      <p className="text-xs font-mono" style={{ color: "var(--color-text-muted)" }}>{value || "auto"}</p>
    </div>
    {value && (
      <button onClick={() => onChange("")} className="text-xs text-white/50 hover:text-white">Reset</button>
    )}
  </div>
);

export default function DesignStep({ formData, update }: Props) {
  const dp = formData.designPreferences;
  const set = (key: string, value: string) =>
    update({ designPreferences: { ...dp, [key]: value } });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Design Preferences</h2>
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          Customize every visual detail of your portfolio.
        </p>
      </div>

      {/* Custom Domain */}
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
          <div
            className="input rounded-l-none border-l-0 font-mono text-xs sm:text-sm whitespace-nowrap flex-shrink-0"
            style={{ width: "auto" }}
          >
            .vercel.app
          </div>
        </div>
        <p className="text-xs mt-1.5" style={{ color: "var(--color-text-muted)" }}>
          Use a unique name (e.g. <strong>tarin-portfolio</strong>). Short/common names may get a suffix from Vercel.
        </p>
        <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
          If you skip this, we will generate a random domain like <strong>launchfolio-abc123</strong>.
        </p>
      </div>

      {/* Theme */}
      <div>
        <label className="text-sm font-semibold text-white mb-3 block">Color Theme</label>
        <div className="grid grid-cols-2 gap-3">
          {THEMES.map((t) => (
            <button
              key={t.value}
              onClick={() => set("theme", t.value)}
              className={`p-4 rounded-xl border text-left transition-all ${dp.theme === t.value ? "border-white/60 bg-white/10" : "border-white/5 hover:border-white/10"}`}
            >
              <div className={`w-full h-8 rounded-lg mb-2 ${t.preview}`} />
              <p className="text-sm font-medium text-white">{t.label}</p>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>{t.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Style Personality */}
      <div>
        <label className="text-sm font-semibold text-white mb-3 block">Design Personality</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {STYLES.map((s) => (
            <button
              key={s.value}
              onClick={() => set("style", s.value)}
              className={`p-4 rounded-xl border text-left transition-all ${dp.style === s.value ? "border-white/60 bg-white/10" : "border-white/5 hover:border-white/10"}`}
            >
              <p className="text-sm font-medium text-white mb-0.5">{s.label}</p>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>{s.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Primary Color */}
      <div>
        <label className="text-sm font-semibold text-white mb-3 block">Primary Color</label>
        <div className="flex flex-wrap gap-3 mb-3">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => set("primaryColor", c)}
              className="w-8 h-8 rounded-full border-2 transition-all hover:scale-110"
              style={{
                backgroundColor: c,
                borderColor: dp.primaryColor === c ? "white" : "transparent",
                boxShadow: dp.primaryColor === c ? "0 0 0 2px rgba(255,255,255,0.35)" : "none",
              }}
            />
          ))}
          <input
            type="color"
            value={dp.primaryColor}
            onChange={(e) => set("primaryColor", e.target.value)}
            className="w-8 h-8 rounded-full cursor-pointer border-0 overflow-hidden"
            title="Custom color"
          />
        </div>
      </div>

      {/* Detailed Color Controls */}
      <div>
        <label className="text-sm font-semibold text-white mb-3 block">Color Customization</label>
        <p className="text-xs mb-4" style={{ color: "var(--color-text-muted)" }}>Leave on &quot;auto&quot; to let AI choose, or pick your own.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl border" style={{ borderColor: "var(--color-border-subtle)", background: "var(--color-bg-card)" }}>
          <ColorPicker label="Button Background" value={dp.buttonColor} onChange={(v) => set("buttonColor", v)} placeholder={dp.primaryColor} />
          <ColorPicker label="Button Text" value={dp.buttonTextColor} onChange={(v) => set("buttonTextColor", v)} placeholder="#ffffff" />
          <ColorPicker label="Navbar Background" value={dp.navBgColor} onChange={(v) => set("navBgColor", v)} placeholder="#000000" />
          <ColorPicker label="Navbar Links" value={dp.navLinkColor} onChange={(v) => set("navLinkColor", v)} placeholder="#ffffff" />
          <ColorPicker label="Body Text" value={dp.textColor} onChange={(v) => set("textColor", v)} placeholder="#ffffff" />
        </div>
      </div>

      {/* Hero Animation */}
      <div>
        <label className="text-sm font-semibold text-white mb-3 block">Hero Animation</label>
        <div className="flex flex-wrap gap-2">
          {HERO_ANIMATIONS.map((a) => (
            <button
              key={a.value}
              onClick={() => set("heroAnimation", a.value)}
              className={`px-4 py-2 rounded-full text-sm border transition-all ${dp.heroAnimation === a.value ? "border-white/60 bg-white/10 text-white" : "border-white/5 hover:border-white/10 text-white/50"}`}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* Navbar Logo Style */}
      <div>
        <label className="text-sm font-semibold text-white mb-3 block">Navbar Logo Style</label>
        <div className="grid grid-cols-2 gap-3">
          {LOGO_STYLES.map((l) => (
            <button
              key={l.value}
              onClick={() => set("logoStyle", l.value)}
              className={`p-3 rounded-xl border text-left transition-all ${dp.logoStyle === l.value ? "border-white/60 bg-white/10" : "border-white/5 hover:border-white/10"}`}
            >
              <p className="text-sm font-medium text-white">{l.label}</p>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>{l.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Font */}
      <div>
        <label className="text-sm font-semibold text-white mb-3 block">Font Family</label>
        <div className="flex flex-wrap gap-2">
          {FONTS.map((f) => (
            <button
              key={f}
              onClick={() => set("fontPreference", f)}
              className={`px-4 py-2 rounded-full text-sm border transition-all ${dp.fontPreference === f ? "border-white/60 bg-white/10 text-white" : "border-white/5 hover:border-white/10 text-white/50"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
