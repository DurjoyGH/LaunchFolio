/**
 * Education section templates.
 * 5 variants: EducationTimeline, EducationCards, EducationMinimal, EducationSplit, EducationGrid
 */
const getEducationTemplate = ({ blueprint, userInput }) => {
  const { variant } = blueprint.sections.find((s) => s.type === "education") || { variant: "EducationTimeline" };
  const education = userInput.education || [];
  const primary = blueprint.primaryColor || "#6366f1";

  if (education.length === 0) {
    return `\nexport default function Education() { return null; }`;
  }

  // EducationCards
  if (variant === "EducationCards") {
    const cards = education.map((edu, i) => `
        <div key={${i}} className="p-8 rounded-3xl border transition-all hover:-translate-y-1 shadow-lg" style={{ borderColor: "var(--color-border)", background: "var(--color-card-bg)" }}>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-2xl font-bold" style={{ background: "${primary}20", color: "${primary}" }}>
            ${edu.institution?.charAt(0) || "U"}
          </div>
          <h3 className="text-xl font-bold mb-2" style={{color:"var(--color-heading)"}}>${edu.degree || "Degree"}${edu.field ? ` in ${edu.field}` : ""}</h3>
          <p className="font-semibold mb-3" style={{ color: "${primary}" }}>${edu.institution || "Institution"}</p>
          <p className="text-sm mb-4 font-mono" style={{color:"var(--color-text-muted)"}}>${edu.startYear || ""}${edu.endYear ? ` — ${edu.endYear}` : " — Present"}</p>
          ${edu.description ? `<p className="text-sm leading-relaxed" style={{color:"var(--color-body)"}}>${edu.description}</p>` : ""}
        </div>`).join("\n");

    return `
export default function Education() {
  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: "${primary}" }}>Education</span>
          <h2 className="text-4xl font-black" style={{color:"var(--color-heading)"}}>Academic Background</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          ${cards}
        </div>
      </div>
    </section>
  );
}`;
  }

  // EducationMinimal
  if (variant === "EducationMinimal") {
    const items = education.map((edu, i) => `
        <div key={${i}} className="flex flex-col md:flex-row md:items-start justify-between py-8 border-b last:border-0" style={{borderColor:"var(--color-border)"}}>
          <div className="md:w-1/4 mb-4 md:mb-0">
             <span className="text-sm font-mono px-3 py-1 rounded" style={{background:"var(--color-border)", color:"var(--color-text-muted)"}}>${edu.startYear || ""}${edu.endYear ? ` — ${edu.endYear}` : ""}</span>
          </div>
          <div className="md:w-3/4">
            <h3 className="text-2xl font-semibold mb-2" style={{color:"var(--color-heading)"}}>${edu.degree || "Degree"}${edu.field ? ` in ${edu.field}` : ""}</h3>
            <p className="text-lg mb-4" style={{ color: "${primary}" }}>${edu.institution || "Institution"}</p>
            ${edu.description ? `<p className="text-base leading-relaxed" style={{color:"var(--color-body)"}}>${edu.description}</p>` : ""}
          </div>
        </div>`).join("\n");

    return `
export default function Education() {
  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-sm font-mono mb-12 uppercase tracking-widest" style={{ color: "${primary}" }}>[ Education ]</h2>
        <div className="border-t" style={{borderColor:"var(--color-border)"}}>
          ${items}
        </div>
      </div>
    </section>
  );
}`;
  }

  // EducationSplit
  if (variant === "EducationSplit") {
    const items = education.map((edu, i) => `
        <div key={${i}} className="mb-10 last:mb-0">
          <h3 className="text-2xl font-bold mb-1" style={{color:"var(--color-heading)"}}>${edu.degree || "Degree"}${edu.field ? ` in ${edu.field}` : ""}</h3>
          <p className="font-semibold text-lg mb-2" style={{ color: "${primary}" }}>${edu.institution || "Institution"}</p>
          <p className="text-sm font-bold uppercase tracking-wider mb-4" style={{color:"var(--color-text-muted)"}}>${edu.startYear || ""}${edu.endYear ? ` — ${edu.endYear}` : " — Present"}</p>
          ${edu.description ? `<p className="leading-relaxed" style={{color:"var(--color-body)"}}>${edu.description}</p>` : ""}
        </div>`).join("\n");

    return `
export default function Education() {
  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-16">
        <div className="md:col-span-1">
          <h2 className="text-5xl font-black sticky top-32" style={{color:"var(--color-heading)"}}>Education.</h2>
        </div>
        <div className="md:col-span-2">
          ${items}
        </div>
      </div>
    </section>
  );
}`;
  }

  // EducationGrid
  if (variant === "EducationGrid") {
    const items = education.map((edu, i) => `
        <div key={${i}} className="p-8 border-l-4" style={{borderColor:"${primary}", background:"var(--color-card-bg)"}}>
          <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{color:"var(--color-text-muted)"}}>${edu.startYear || ""}${edu.endYear ? ` — ${edu.endYear}` : " — Present"}</span>
          <h3 className="text-xl font-bold mb-2" style={{color:"var(--color-heading)"}}>${edu.degree || "Degree"}${edu.field ? ` in ${edu.field}` : ""}</h3>
          <p className="mb-4" style={{ color: "${primary}" }}>${edu.institution || "Institution"}</p>
          ${edu.description ? `<p className="text-sm leading-relaxed" style={{color:"var(--color-body)"}}>${edu.description}</p>` : ""}
        </div>`).join("\n");

    return `
export default function Education() {
  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-16 gap-6">
          <h2 className="text-4xl md:text-5xl font-bold" style={{color:"var(--color-heading)"}}>Education</h2>
          <div className="h-1 flex-1 max-w-md hidden md:block" style={{background:"var(--color-border)"}} />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${items}
        </div>
      </div>
    </section>
  );
}`;
  }

  // EducationTimeline — default
  const timelineItems = education.map((edu, i) => `
        <div key={${i}} className="relative pl-8 pb-12 border-l-2 last:pb-0" style={{ borderColor: "${primary}50" }}>
          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4" style={{ background: "var(--color-card-bg)", borderColor: "${primary}" }} />
          <div className="p-8 rounded-2xl border shadow-sm hover:shadow-md transition-shadow" style={{ background: "var(--color-card-bg)", borderColor:"var(--color-border)" }}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <h3 className="text-xl font-bold" style={{color:"var(--color-heading)"}}>${edu.degree || "Degree"}${edu.field ? ` in ${edu.field}` : ""}</h3>
              <span className="text-sm font-bold px-4 py-1.5 rounded-full whitespace-nowrap" style={{ background: "${primary}15", color:"${primary}" }}>
                ${edu.startYear || ""}${edu.endYear ? ` — ${edu.endYear}` : " — Present"}
              </span>
            </div>
            <p className="font-semibold text-lg mb-4" style={{ color: "${primary}" }}>${edu.institution || "Institution"}</p>
            ${edu.description ? `<p className="leading-relaxed" style={{color:"var(--color-body)"}}>${edu.description}</p>` : ""}
          </div>
        </div>`).join("\n");

  return `
export default function Education() {
  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" style={{color:"var(--color-heading)"}}>Academic Background</h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{background:"${primary}"}} />
        </div>
        <div className="max-w-3xl mx-auto">
          ${timelineItems}
        </div>
      </div>
    </section>
  );
}`;
};

module.exports = { getEducationTemplate };
