const steps = [
  {
    number: "01",
    title: "Share Your Details",
    description:
      "Tell us about yourself and the work you want to showcase. Choose IT or non-IT and add only what matters.",
    detail: "Guided form — about 3 minutes",
  },
  {
    number: "02",
    title: "Pick Your Style",
    description:
      "Choose a theme, color palette, and layout style. We tailor the structure to fit your profile.",
    detail: "Looks great by default",
  },
  {
    number: "03",
    title: "Review & Generate",
    description:
      "Preview the summary, adjust any sections, and generate your portfolio with a single click.",
    detail: "Clear, simple, fast",
  },
  {
    number: "04",
    title: "Live Link Ready",
    description:
      "Your portfolio goes live automatically and you get a shareable link right away.",
    detail: "Usually live within a few minutes",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{ color: "var(--color-brand-primary)" }}>
            The Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            From form to live{" "}
            <span className="gradient-text">in minutes</span>
          </h2>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute left-8 top-12 bottom-12 w-px"
            style={{ background: "linear-gradient(to bottom, #ffffff, transparent)" }} />

          <div className="flex flex-col gap-8">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-8 items-start group">
                {/* Number badge */}
                <div
                  className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-lg font-bold border relative z-10 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: "linear-gradient(135deg, #ffffff, #bdbdbd)",
                    borderColor: "rgba(255,255,255,0.4)",
                    color: "black",
                  }}
                >
                  {step.number}
                </div>

                {/* Content */}
                <div className="card flex-1 p-6 transition-colors">
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="leading-relaxed mb-3" style={{ color: "var(--color-text-secondary)" }}>
                    {step.description}
                  </p>
                  <span
                    className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full border"
                    style={{ borderColor: "rgba(255,255,255,0.22)", color: "var(--color-text-primary)", backgroundColor: "rgba(255,255,255,0.06)" }}
                  >
                    <span className="text-[10px] leading-none">◉</span>
                    <span>{step.detail}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
