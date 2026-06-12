/**
 * Services section templates.
 * 5 variants: ServicesGrid, ServicesCards, ServicesMinimal, ServicesList, ServicesSplit
 */
const getServicesTemplate = ({ blueprint, userInput, content }) => {
  const sectionDef = blueprint.sections.find((s) => s.type === "services");
  const variant = sectionDef?.variant || "ServicesGrid";
  const services = userInput.services || [];
  const primary = blueprint.primaryColor || "#6366f1";
  
  if (services.length === 0) {
    return `\nexport default function Services() { return null; }`;
  }

  // ServicesCards
  if (variant === "ServicesCards") {
    const cards = services.map((s, i) => `
        <div key={${i}} className="group p-8 rounded-3xl border transition-all hover:-translate-y-2 hover:shadow-2xl" style={{ borderColor: "var(--color-border)", background: "var(--color-card-bg)" }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-3xl transition-transform group-hover:scale-110" style={{ background: "${primary}20" }}>
             ⚡
          </div>
          <h3 className="text-2xl font-bold mb-4" style={{color:"var(--color-heading)"}}>${s.title}</h3>
          <p className="leading-relaxed mb-6" style={{color:"var(--color-body)"}}>${s.description}</p>
          ${s.price ? `<p className="font-bold text-lg" style={{ color: "${primary}" }}>${s.price}</p>` : ""}
        </div>`).join("\n");

    return `
export default function Services() {
  return (
    <section id="services" className="py-24 px-6 bg-opacity-5" style={{backgroundColor:"var(--color-primary)10"}}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: "${primary}" }}>What I Do</span>
          <h2 className="text-4xl md:text-5xl font-black" style={{color:"var(--color-heading)"}}>My Services</h2>
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
    const items = services.map((s, i) => `
        <div key={${i}} className="py-10 border-b last:border-0" style={{borderColor:"var(--color-border)"}}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4">
            <h3 className="text-3xl font-bold" style={{color:"var(--color-heading)"}}>${s.title}</h3>
            ${s.price ? `<span className="text-lg font-mono px-4 py-2 rounded-full" style={{ background: "var(--color-card-bg)", color: "${primary}", borderColor:"var(--color-border)", borderWidth:"1px" }}>${s.price}</span>` : ""}
          </div>
          <p className="text-xl leading-relaxed max-w-3xl" style={{color:"var(--color-body)"}}>${s.description}</p>
        </div>`).join("\n");

    return `
export default function Services() {
  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-sm font-mono mb-12 uppercase tracking-widest" style={{ color: "${primary}" }}>[ Services ]</h2>
        <div className="border-t" style={{borderColor:"var(--color-border)"}}>
          ${items}
        </div>
      </div>
    </section>
  );
}`;
  }

  // ServicesList
  if (variant === "ServicesList") {
    const items = services.map((s, i) => `
        <div key={${i}} className="flex gap-8 group">
          <div className="w-16 h-16 shrink-0 rounded-full flex items-center justify-center font-bold text-xl border transition-colors group-hover:bg-white/5" style={{borderColor:"${primary}", color:"${primary}"}}>0${i+1}</div>
          <div className="pb-12">
            <div className="flex flex-wrap items-baseline gap-4 mb-4">
              <h3 className="text-2xl font-bold" style={{color:"var(--color-heading)"}}>${s.title}</h3>
              ${s.price ? `<span className="font-semibold text-sm" style={{ color: "${primary}" }}>${s.price}</span>` : ""}
            </div>
            <p className="text-lg leading-relaxed max-w-2xl" style={{color:"var(--color-body)"}}>${s.description}</p>
          </div>
        </div>`).join("\n");

    return `
export default function Services() {
  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-20">
          <h2 className="text-5xl font-bold mb-6" style={{color:"var(--color-heading)"}}>How I can help.</h2>
          <div className="w-24 h-2" style={{background:"${primary}"}} />
        </div>
        <div>
          ${items}
        </div>
      </div>
    </section>
  );
}`;
  }

  // ServicesSplit
  if (variant === "ServicesSplit") {
    const items = services.map((s, i) => `
        <div key={${i}} className="p-10 rounded-2xl border" style={{borderColor:"var(--color-border)", background:"var(--color-card-bg)"}}>
          <h3 className="text-2xl font-bold mb-4" style={{color:"var(--color-heading)"}}>${s.title}</h3>
          <p className="leading-relaxed mb-6" style={{color:"var(--color-body)"}}>${s.description}</p>
          ${s.price ? `<div className="inline-block px-4 py-1.5 rounded-full text-sm font-bold" style={{background:"${primary}20", color:"${primary}"}}>${s.price}</div>` : ""}
        </div>`).join("\n");

    return `
export default function Services() {
  return (
    <section id="services" className="py-32 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-16">
        <div className="lg:col-span-1">
          <div className="sticky top-32">
            <h2 className="text-5xl md:text-6xl font-black mb-6" style={{color:"var(--color-heading)"}}>Services.</h2>
            <p className="text-lg" style={{color:"var(--color-text-muted)"}}>Comprehensive solutions tailored to your specific needs.</p>
          </div>
        </div>
        <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
          ${items}
        </div>
      </div>
    </section>
  );
}`;
  }

  // ServicesGrid — default
  const gridItems = services.map((s, i) => `
        <div key={${i}} className="relative pl-6 border-l-2" style={{ borderColor: "${primary}" }}>
          <h3 className="text-xl font-bold mb-3" style={{color:"var(--color-heading)"}}>${s.title}</h3>
          <p className="mb-4 leading-relaxed" style={{color:"var(--color-body)"}}>${s.description}</p>
          ${s.price ? `<p className="font-semibold text-sm" style={{ color: "${primary}" }}>${s.price}</p>` : ""}
        </div>`).join("\n");

  return `
export default function Services() {
  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" style={{color:"var(--color-heading)"}}>Services</h2>
          <div className="w-16 h-1 mx-auto" style={{background:"${primary}"}} />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          ${gridItems}
        </div>
      </div>
    </section>
  );
}`;
};

module.exports = { getServicesTemplate };
