/**
 * Testimonials section templates.
 * 5 variants: TestimonialsCards, TestimonialsGrid, TestimonialsQuote, TestimonialsMasonry, TestimonialsSlider
 */
const getTestimonialsTemplate = ({ blueprint, userInput }) => {
  const sectionDef = blueprint.sections.find((s) => s.type === "testimonials");
  const variant = sectionDef?.variant || "TestimonialsCards";
  const testimonials = userInput.testimonials || [];
  const primary = blueprint.primaryColor || "#6366f1";

  if (testimonials.length === 0) {
    return `\nexport default function Testimonials() { return null; }`;
  }

  // TestimonialsGrid
  if (variant === "TestimonialsGrid") {
    const items = testimonials.map((t, i) => `
        <div key={${i}} className="p-8 rounded-[2rem] border" style={{ borderColor: "var(--color-border)", background: "var(--color-card-bg)" }}>
          <p className="text-lg leading-relaxed mb-8 italic" style={{color:"var(--color-body)"}}>"{ \`${t.text}\` }"</p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl bg-white/10" style={{color:"${primary}"}}>${t.name.charAt(0)}</div>
            <div>
              <p className="font-bold" style={{color:"var(--color-heading)"}}>${t.name}</p>
              <p className="text-sm" style={{color:"var(--color-text-muted)"}}>${t.role}</p>
            </div>
          </div>
        </div>`).join("\n");

    return `
export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16" style={{color:"var(--color-heading)"}}>What People Say</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${items}
        </div>
      </div>
    </section>
  );
}`;
  }

  // TestimonialsQuote
  if (variant === "TestimonialsQuote") {
    const items = testimonials.map((t, i) => `
        <div key={${i}} className="py-16 border-b last:border-0" style={{borderColor:"var(--color-border)"}}>
          <span className="text-6xl font-serif opacity-20 block mb-6" style={{color:"${primary}"}}>""</span>
          <p className="text-2xl md:text-4xl font-medium leading-relaxed mb-10" style={{color:"var(--color-heading)"}}>${t.text}</p>
          <p className="text-xl font-bold mb-2" style={{color:"var(--color-heading)"}}>${t.name}</p>
          <p className="text-lg" style={{color:"var(--color-text-muted)"}}>${t.role}</p>
        </div>`).join("\n");

    return `
export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        ${items}
      </div>
    </section>
  );
}`;
  }

  // TestimonialsMasonry
  if (variant === "TestimonialsMasonry") {
    const items = testimonials.map((t, i) => `
        <div key={${i}} className="break-inside-avoid mb-6 p-8 rounded-3xl border" style={{ borderColor: "var(--color-border)", background: "var(--color-card-bg)" }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center font-bold text-2xl bg-white/5 border" style={{borderColor:"var(--color-border)", color:"${primary}"}}>${t.name.charAt(0)}</div>
            <div>
              <p className="font-bold text-lg" style={{color:"var(--color-heading)"}}>${t.name}</p>
              <p className="text-sm" style={{color:"var(--color-text-muted)"}}>${t.role}</p>
            </div>
          </div>
          <p className="leading-relaxed" style={{color:"var(--color-body)"}}>${t.text}</p>
        </div>`).join("\n");

    return `
export default function Testimonials() {
  return (
    <section id="testimonials" className="py-32 px-6 bg-opacity-5" style={{backgroundColor:"var(--color-primary)10"}}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-5xl font-black mb-6" style={{color:"var(--color-heading)"}}>Testimonials.</h2>
          <p className="text-lg" style={{color:"var(--color-text-muted)"}}>Kind words from colleagues and clients.</p>
        </div>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          ${items}
        </div>
      </div>
    </section>
  );
}`;
  }

  // TestimonialsSlider (CSS snap)
  if (variant === "TestimonialsSlider") {
    const items = testimonials.map((t, i) => `
        <div key={${i}} className="snap-center shrink-0 w-[85vw] md:w-[60vw] p-10 md:p-16 rounded-[3rem] border" style={{borderColor:"var(--color-border)", background:"var(--color-card-bg)"}}>
          <p className="text-2xl md:text-3xl font-medium leading-relaxed mb-12" style={{color:"var(--color-heading)"}}>${t.text}</p>
          <div className="flex items-center gap-4">
            <div className="w-16 h-1 rounded-full" style={{background:"${primary}"}} />
            <div>
              <p className="font-bold text-lg" style={{color:"var(--color-heading)"}}>${t.name}</p>
              <p style={{color:"var(--color-text-muted)"}}>${t.role}</p>
            </div>
          </div>
        </div>`).join("\n");

    return `
export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24">
      <div className="px-6 mb-16 max-w-7xl mx-auto">
        <h2 className="text-sm font-mono mb-4 uppercase tracking-widest" style={{ color: "${primary}" }}>[ Recommendations ]</h2>
        <h3 className="text-4xl font-bold" style={{color:"var(--color-heading)"}}>Colleagues & Clients</h3>
      </div>
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-8 px-6 pb-12 hide-scrollbar">
        ${items}
      </div>
    </section>
  );
}`;
  }

  // TestimonialsCards — default
  const items = testimonials.map((t, i) => `
        <div key={${i}} className="relative p-8 rounded-2xl border bg-white/5" style={{ borderColor: "var(--color-border)" }}>
          <span className="absolute -top-4 -left-2 text-6xl text-white/10 font-serif">"</span>
          <p className="relative z-10 text-lg leading-relaxed mb-8" style={{color:"var(--color-body)"}}>${t.text}</p>
          <div>
            <p className="font-bold" style={{color:"var(--color-heading)"}}>${t.name}</p>
            <p className="text-sm" style={{color:"${primary}"}}>${t.role}</p>
          </div>
        </div>`).join("\n");

  return `
export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{ color: "${primary}" }}>Testimonials</span>
          <h2 className="text-4xl font-bold" style={{color:"var(--color-heading)"}}>Client Feedback</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          ${items}
        </div>
      </div>
    </section>
  );
}`;
};

module.exports = { getTestimonialsTemplate };
