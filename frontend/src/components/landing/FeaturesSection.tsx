const features = [
  {
    icon: "✦",
    title: "AI Portfolio Planner",
    description: "Gemini analyzes your profile and selects the perfect layout, sections, and color palette for your field.",
    gradient: "from-indigo-500/20 to-purple-500/20",
    border: "rgba(99,102,241,0.3)",
  },
  {
    icon: "⬡",
    title: "Component-Based System",
    description: "Built on a library of production-ready React sections. Clean, accessible, and blazing fast.",
    gradient: "from-violet-500/20 to-pink-500/20",
    border: "rgba(139,92,246,0.3)",
  },
  {
    icon: "↗",
    title: "Auto-Deploy to Vercel",
    description: "Your portfolio is pushed to GitHub and deployed live on Vercel automatically. Zero DevOps required.",
    gradient: "from-cyan-500/20 to-blue-500/20",
    border: "rgba(6,182,212,0.3)",
  },
  {
    icon: "◈",
    title: "AI Content Generation",
    description: "Gets your professional bio, tagline, CTA copy, and section headings crafted by AI — not templates.",
    gradient: "from-emerald-500/20 to-cyan-500/20",
    border: "rgba(16,185,129,0.3)",
  },
  {
    icon: "❖",
    title: "Multiple Design Styles",
    description: "Choose from Modern, Minimal, Bold, or Elegant. Each style uses a curated component combination.",
    gradient: "from-amber-500/20 to-orange-500/20",
    border: "rgba(245,158,11,0.3)",
  },
  {
    icon: "◉",
    title: "Cloudinary Media Storage",
    description: "Profile and project images are automatically optimized and hosted on Cloudinary globally.",
    gradient: "from-rose-500/20 to-pink-500/20",
    border: "rgba(244,63,94,0.3)",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{ color: "var(--color-brand-primary)" }}>
            Why LaunchFolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Everything you need to{" "}
            <span className="gradient-text">launch fast</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--color-text-secondary)" }}>
            A full-stack AI pipeline that handles design, content, code, and deployment — so you can focus on your work.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="card p-6 hover:-translate-y-1 group relative overflow-hidden"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Subtle gradient bg */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl bg-gradient-to-br ${feature.gradient}`}
              />
              <div className="relative z-10">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4 border"
                  style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: feature.border }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
