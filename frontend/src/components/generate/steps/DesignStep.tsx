import type { FormData } from "@/app/generate/page";

const THEMES = [
  { value: "dark", label: "Dark", desc: "Sleek dark background", preview: "bg-gray-900" },
  { value: "light", label: "Light", desc: "Clean light background", preview: "bg-gray-100" },
];

const STYLES = [
  { value: "modern", label: "Modern", desc: "Clean lines, bold typography" },
  { value: "minimal", label: "Minimal", desc: "Less is more, pure whitespace" },
  { value: "bold", label: "Bold", desc: "High contrast, strong statements" },
  { value: "elegant", label: "Elegant", desc: "Refined, premium feel" },
];

const FONTS = ["Inter", "Poppins", "Raleway", "Roboto", "Space Grotesk"];

const COLORS = [
  "#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b",
  "#ef4444", "#ec4899", "#3b82f6", "#84cc16", "#f97316",
];

interface Props {
  formData: FormData;
  update: (partial: Partial<FormData>) => void;
}

export default function DesignStep({ formData, update }: Props) {
  const dp = formData.designPreferences;
  const set = (key: string, value: string) =>
    update({ designPreferences: { ...dp, [key]: value } });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Design Preferences</h2>
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          Tell the AI how your portfolio should look and feel.
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
            className="input rounded-r-none flex-1"
            style={{ borderRight: "none" }}
          />
          <span
            className="px-4 py-2.5 text-sm rounded-r-xl border border-l-0 font-mono whitespace-nowrap"
            style={{ borderColor: "var(--color-border-subtle)", background: "var(--color-bg-card)", color: "var(--color-text-muted)" }}
          >
            .vercel.app
          </span>
        </div>
        <p className="text-xs mt-1.5" style={{ color: "var(--color-text-muted)" }}>
          Use a unique name (e.g. <strong>tarin-portfolio</strong>). Short/common names may get a suffix from Vercel.
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
              className={`p-4 rounded-xl border text-left transition-all ${dp.theme === t.value ? "border-indigo-500/60 bg-indigo-500/10" : "border-white/5 hover:border-white/10"}`}
            >
              <div className={`w-full h-8 rounded-lg mb-2 ${t.preview}`} />
              <p className="text-sm font-medium text-white">{t.label}</p>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>{t.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Style */}
      <div>
        <label className="text-sm font-semibold text-white mb-3 block">Design Style</label>
        <div className="grid grid-cols-2 gap-3">
          {STYLES.map((s) => (
            <button
              key={s.value}
              onClick={() => set("style", s.value)}
              className={`p-4 rounded-xl border text-left transition-all ${dp.style === s.value ? "border-indigo-500/60 bg-indigo-500/10" : "border-white/5 hover:border-white/10"}`}
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
                boxShadow: dp.primaryColor === c ? `0 0 0 2px ${c}` : "none",
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
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full" style={{ backgroundColor: dp.primaryColor }} />
          <span className="text-sm font-mono" style={{ color: "var(--color-text-secondary)" }}>{dp.primaryColor}</span>
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
              className={`px-4 py-2 rounded-full text-sm border transition-all ${dp.fontPreference === f ? "border-indigo-500/60 bg-indigo-500/10 text-white" : "border-white/5 hover:border-white/10 text-gray-400"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
