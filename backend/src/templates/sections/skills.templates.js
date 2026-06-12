/**
 * Skills section templates.
 * 5 variants: SkillsGrid, SkillsProgress, SkillsCards, SkillsTags, SkillsMasonry
 */
const getSkillsTemplate = ({ blueprint, userInput }) => {
  const sectionDef = blueprint.sections.find((s) => s.type === "skills");
  const variant = sectionDef?.variant || "SkillsGrid";
  const primary = blueprint.primaryColor || "#6366f1";
  
  // NOTE: Skills logic was changed, so we just use plain strings or an array of objects
  const rawSkills = userInput.skills || [];
  if (rawSkills.length === 0) return `\nexport default function Skills() { return null; }`;
  
  const skills = typeof rawSkills[0] === "string" 
    ? rawSkills.map(s => ({ name: s, level: "Experienced" }))
    : rawSkills;

  // SkillsTags
  if (variant === "SkillsTags") {
    const tags = skills.map((s, i) => `
        <span key={${i}} className="px-6 py-3 rounded-full border text-lg font-medium transition-colors hover:bg-white/5" style={{borderColor:"var(--color-border)", color:"var(--color-heading)"}}>
          ${s.name}
        </span>`).join("\n");

    return `
export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-sm font-mono mb-12 uppercase tracking-widest" style={{ color: "${primary}" }}>[ Core Competencies ]</h2>
        <div className="flex flex-wrap justify-center gap-4">
          ${tags}
        </div>
      </div>
    </section>
  );
}`;
  }

  // SkillsProgress
  if (variant === "SkillsProgress") {
    const bars = skills.map((s, i) => {
      const p = s.level === "beginner" ? "30%" : s.level === "intermediate" ? "60%" : s.level === "advanced" ? "85%" : s.level === "expert" ? "95%" : "80%";
      return `
        <div key={${i}} className="mb-8 last:mb-0">
          <div className="flex justify-between items-end mb-2">
            <span className="font-bold text-lg" style={{color:"var(--color-heading)"}}>${s.name}</span>
            <span className="text-sm font-mono" style={{color:"${primary}"}}>${p}</span>
          </div>
          <div className="h-2 w-full rounded-full overflow-hidden" style={{background:"var(--color-border)"}}>
            <div className="h-full rounded-full" style={{width:"${p}", background:"${primary}"}} />
          </div>
        </div>`;
    }).join("\n");

    return `
export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{color:"var(--color-heading)"}}>Technical Arsenal</h2>
          <p className="text-lg leading-relaxed" style={{color:"var(--color-body)"}}>A snapshot of my current proficiency across various tools and technologies.</p>
        </div>
        <div>
          ${bars}
        </div>
      </div>
    </section>
  );
}`;
  }

  // SkillsCards
  if (variant === "SkillsCards") {
    const cards = skills.map((s, i) => `
        <div key={${i}} className="p-8 rounded-3xl border text-center transition-all hover:-translate-y-2 hover:shadow-xl group" style={{ borderColor: "var(--color-border)", background: "var(--color-card-bg)" }}>
          <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 transition-colors group-hover:bg-white/5 border" style={{borderColor:"var(--color-border)", color:"${primary}"}}>
            <span className="text-2xl">⚡</span>
          </div>
          <h3 className="text-xl font-bold mb-2" style={{color:"var(--color-heading)"}}>${s.name}</h3>
          ${s.level ? `<p className="text-sm font-medium uppercase tracking-wider" style={{color:"var(--color-text-muted)"}}>${s.level}</p>` : ""}
        </div>`).join("\n");

    return `
export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 bg-opacity-5" style={{backgroundColor:"var(--color-primary)10"}}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" style={{color:"var(--color-heading)"}}>Skills & Expertise</h2>
          <div className="w-16 h-1 mx-auto" style={{background:"${primary}"}} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          ${cards}
        </div>
      </div>
    </section>
  );
}`;
  }

  // SkillsMasonry
  if (variant === "SkillsMasonry") {
    const items = skills.map((s, i) => `
        <div key={${i}} className="break-inside-avoid mb-4 p-6 rounded-2xl border bg-white/5" style={{borderColor:"var(--color-border)"}}>
          <h3 className="text-xl font-bold" style={{color:"var(--color-heading)"}}>${s.name}</h3>
          ${s.level ? `<div className="mt-3 inline-block px-3 py-1 rounded text-xs font-mono" style={{background:"${primary}20", color:"${primary}"}}>${s.level}</div>` : ""}
        </div>`).join("\n");

    return `
export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <h2 className="text-5xl font-black" style={{color:"var(--color-heading)"}}>Skills.</h2>
          <p className="max-w-md text-lg" style={{color:"var(--color-text-muted)"}}>A comprehensive overview of my capabilities and technical expertise.</p>
        </div>
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
          ${items}
        </div>
      </div>
    </section>
  );
}`;
  }

  // SkillsGrid — default
  const gridItems = skills.map((s, i) => `
        <div key={${i}} className="flex items-center gap-4 p-4 border-b border-white/5">
          <div className="w-2 h-2 rounded-full shrink-0" style={{background:"${primary}"}} />
          <div className="flex-1 flex justify-between items-baseline">
            <span className="text-lg font-medium" style={{color:"var(--color-heading)"}}>${s.name}</span>
            ${s.level ? `<span className="text-sm italic" style={{color:"var(--color-text-muted)"}}>${s.level}</span>` : ""}
          </div>
        </div>`).join("\n");

  return `
export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{ color: "${primary}" }}>Expertise</span>
          <h2 className="text-4xl font-bold" style={{color:"var(--color-heading)"}}>Core Skills</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-x-16 gap-y-4">
          ${gridItems}
        </div>
      </div>
    </section>
  );
}`;
};

module.exports = { getSkillsTemplate };
