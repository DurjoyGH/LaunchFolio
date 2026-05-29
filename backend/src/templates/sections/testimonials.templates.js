/**
 * Testimonials section templates.
 * 3 variants: TestimonialsCards, TestimonialsGrid, TestimonialsQuote
 */
const getTestimonialsTemplate = ({ blueprint, userInput, content }) => {
  const sectionDef = blueprint.sections.find((s) => s.type === "testimonials");
  const variant = sectionDef?.variant || "TestimonialsCards";
  const testimonials = userInput.testimonials || [];
  const heading = content?.testimonialsHeading || "What People Say";
  const primary = blueprint.primaryColor || "#6366f1";

  if (testimonials.length === 0) {
    return `\nexport default function Testimonials() { return null; }`;
  }

  const items = testimonials.map((t) => ({
    name: (t.name || "Anonymous").replace(/'/g, "\\'"),
    role: (t.role || "").replace(/'/g, "\\'"),
    text: (t.text || "").replace(/'/g, "\\'"),
    initial: (t.name || "A").charAt(0).toUpperCase(),
  }));

  // TestimonialsQuote
  if (variant === "TestimonialsQuote") {
    const quoteItems = items.map((t, i) => `
    <div key={${i}} className="text-center max-w-2xl mx-auto py-12 ${i > 0 ? "border-t border-white/5" : ""}">
      <p className="text-xl text-gray-300 italic leading-relaxed mb-8">&#34;${t.text}&#34;</p>
      <div className="flex items-center justify-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white" style={{background:"${primary}30"}}>${t.initial}</div>
        <div className="text-left">
          <p className="font-bold text-white text-sm">${t.name}</p>
          <p className="text-xs text-gray-500">${t.role}</p>
        </div>
      </div>
    </div>`).join("\n");

    return `
export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{color:"${primary}"}}>Testimonials</span>
          <h2 className="text-4xl font-bold text-white">${heading}</h2>
        </div>
        ${quoteItems}
      </div>
    </section>
  );
}`;
  }

  // TestimonialsGrid
  if (variant === "TestimonialsGrid") {
    const gridItems = items.map((t, i) => `
    <div key={${i}} className="break-inside-avoid mb-6 p-6 rounded-2xl border border-white/10" style={{background:"var(--color-card-bg)"}}>
      <p className="text-gray-400 italic mb-6">&#34;${t.text}&#34;</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white" style={{background:"${primary}30"}}>${t.initial}</div>
        <div>
          <p className="font-bold text-white text-sm">${t.name}</p>
          <p className="text-xs text-gray-500">${t.role}</p>
        </div>
      </div>
    </div>`).join("\n");

    return `
export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{color:"${primary}"}}>Reviews</span>
          <h2 className="text-4xl font-bold text-white">${heading}</h2>
        </div>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          ${gridItems}
        </div>
      </div>
    </section>
  );
}`;
  }

  // TestimonialsCards — default
  const cardItems = items.map((t, i) => `
    <div key={${i}} className="p-8 rounded-3xl border border-white/10" style={{background:"var(--color-card-bg)"}}>
      <p className="text-gray-300 text-lg leading-relaxed mb-8">&#34;${t.text}&#34;</p>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-bold text-lg text-white">${t.initial}</div>
        <div>
          <h4 className="font-bold text-white">${t.name}</h4>
          <p className="text-sm text-gray-500">${t.role}</p>
        </div>
      </div>
    </div>`).join("\n");

  return `
export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{color:"${primary}"}}>Testimonials</span>
          <h2 className="text-4xl font-bold text-white">${heading}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          ${cardItems}
        </div>
      </div>
    </section>
  );
}`;
};

module.exports = { getTestimonialsTemplate };
