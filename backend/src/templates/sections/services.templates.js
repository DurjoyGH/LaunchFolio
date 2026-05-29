/**
 * Services section templates.
 * 3 variants: ServicesGrid, ServicesCards, ServicesMinimal
 */
const getServicesTemplate = ({ blueprint, userInput, content }) => {
  const sectionDef = blueprint.sections.find((s) => s.type === "services");
  const variant = sectionDef?.variant || "ServicesGrid";
  const services = userInput.services || [];
  const heading = content?.servicesHeading || "Services";
  const primary = blueprint.primaryColor || "#6366f1";

  if (services.length === 0) {
    return `\nexport default function Services() { return null; }`;
  }

  const items = services.map((s) => ({
    title: (s.title || "").replace(/'/g, "\\'"),
    description: (s.description || "").replace(/'/g, "\\'"),
    price: (s.price || "").replace(/'/g, "\\'"),
  }));

  // ServicesCards
  if (variant === "ServicesCards") {
    const cards = items.map((s, i) => `
    <div key={${i}} className="p-8 rounded-2xl border border-white/10 hover:border-primary/50 transition-all group" style={{background:"var(--color-card-bg)"}}>
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">${s.title}</h3>
      <p className="text-gray-400 mb-6 leading-relaxed">${s.description}</p>
      ${s.price ? `<div className="text-2xl font-bold text-white pt-4 border-t border-white/10">${s.price}</div>` : ""}
    </div>`).join("\n");

    return `
export default function Services() {
  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{color:"${primary}"}}>What I Offer</span>
          <h2 className="text-4xl font-bold text-white">${heading}</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${cards}
        </div>
      </div>
    </section>
  );
}`;
  }

  // ServicesMinimal
  if (variant === "ServicesMinimal") {
    const minimalItems = items.map((s, i) => `
    <div key={${i}} className="py-8 border-b border-white/10 last:border-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="max-w-2xl">
        <h3 className="text-2xl font-bold text-white mb-2">${s.title}</h3>
        <p className="text-gray-400">${s.description}</p>
      </div>
      ${s.price ? `<div className="text-xl font-mono flex-shrink-0" style={{color:"${primary}"}}>${s.price}</div>` : ""}
    </div>`).join("\n");

    return `
export default function Services() {
  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12">${heading}</h2>
        <div className="border-t border-white/10">${minimalItems}</div>
      </div>
    </section>
  );
}`;
  }

  // ServicesGrid — default
  const gridItems = items.map((s, i) => `
    <div key={${i}} className="p-6">
      <div className="w-12 h-12 mb-4 rounded-lg flex items-center justify-center" style={{background:"${primary}20",color:"${primary}"}}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
      </div>
      <h3 className="text-xl font-bold text-white mb-3">${s.title}</h3>
      <p className="text-gray-400 leading-relaxed mb-4">${s.description}</p>
      ${s.price ? `<span className="inline-block px-3 py-1 rounded-full text-xs font-semibold" style={{background:"${primary}15",color:"${primary}"}}>${s.price}</span>` : ""}
    </div>`).join("\n");

  return `
export default function Services() {
  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">${heading}</h2>
          <div className="w-20 h-1" style={{background:"${primary}"}} />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          ${gridItems}
        </div>
      </div>
    </section>
  );
}`;
};

module.exports = { getServicesTemplate };
