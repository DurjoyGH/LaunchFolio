const steps = [
  {
    number: "01",
    title: "Fill the Form",
    description:
      "Enter your name, skills, projects, social links, and pick your preferred design style and colors.",
    detail: "Multi-step wizard — takes about 3 minutes",
  },
  {
    number: "02",
    title: "AI Plans Your Portfolio",
    description:
      "Gemini AI analyzes your data, selects the best sections, component variants, color palette, and generates all copy.",
    detail: "Blueprint JSON is generated in seconds",
  },
  {
    number: "03",
    title: "Builder Assembles It",
    description:
      "Our builder engine loads matching React components, injects your data and design tokens, and writes a clean Next.js project.",
    detail: "Component-based — no AI code sprawl",
  },
  {
    number: "04",
    title: "Deployed & Live",
    description:
      "The project is pushed to a GitHub repo, deployed to Vercel, and you receive a live URL — all automatically.",
    detail: "Usually live within 2–5 minutes",
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
            style={{ background: "linear-gradient(to bottom, var(--color-brand-primary), transparent)" }} />

          <div className="flex flex-col gap-8">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-8 items-start group">
                {/* Number badge */}
                <div
                  className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-lg font-bold border relative z-10 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: "var(--gradient-brand)",
                    borderColor: "rgba(99,102,241,0.3)",
                    color: "white",
                  }}
                >
                  {step.number}
                </div>

                {/* Content */}
                <div className="card flex-1 p-6 group-hover:border-[rgba(99,102,241,0.2)] transition-colors">
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="leading-relaxed mb-3" style={{ color: "var(--color-text-secondary)" }}>
                    {step.description}
                  </p>
                  <span
                    className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full border"
                    style={{ borderColor: "rgba(99,102,241,0.2)", color: "var(--color-brand-primary)", backgroundColor: "rgba(99,102,241,0.05)" }}
                  >
                    ◉ {step.detail}
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
