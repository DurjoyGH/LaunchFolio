export default function AboutSection() {
  return (
    <section id="about-us" className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--color-brand-accent)" }}>
            About Us
          </p>
          <h2 className="text-4xl font-bold text-white mb-4">
            LaunchFolio turns your details into a live portfolio.
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
            We blend smart AI planning with beautiful, production-ready templates so anyone can ship a
            polished portfolio in minutes. No design skills required.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              "AI-crafted layouts",
              "Instant deployment",
              "Custom themes",
            ].map((item) => (
              <span key={item} className="px-3 py-1 rounded-full text-xs border" style={{ borderColor: "var(--color-border-subtle)", color: "var(--color-text-muted)" }}>
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {[
            {
              title: "Build fast",
              text: "A guided flow that collects only what matters.",
            },
            {
              title: "Look premium",
              text: "Modern visuals with curated color palettes and typography.",
            },
            {
              title: "Share instantly",
              text: "Your live link is ready to send the moment it is deployed.",
            },
          ].map((item) => (
            <div key={item.title} className="card p-6">
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
