/**
 * Hobbies section templates.
 * 5 variants: HobbiesGrid, HobbiesCards, HobbiesList, HobbiesPills, HobbiesTimeline
 */
const getHobbiesTemplate = ({ blueprint, userInput }) => {
  const sectionDef = blueprint.sections.find((s) => s.type === "hobbies");
  const variant = sectionDef?.variant || "HobbiesGrid";
  const hobbies = userInput.hobbies || [];
  const primary = blueprint.primaryColor || "#6366f1";

  if (hobbies.length === 0) {
    return `\nexport default function Hobbies() { return null; }`;
  }

  // HobbiesCards
  if (variant === "HobbiesCards") {
    const items = hobbies.map((h, i) => `
        <div key={${i}} className="p-8 rounded-3xl border text-center transition-transform hover:-translate-y-2 hover:shadow-xl" style={{ borderColor: "var(--color-border)", background: "var(--color-card-bg)" }}>
          <div className="text-5xl mb-6">${h.emoji || "✨"}</div>
          <h3 className="text-xl font-bold mb-3" style={{color:"var(--color-heading)"}}>${h.name}</h3>
          ${h.description ? `<p className="text-sm leading-relaxed" style={{color:"var(--color-text-muted)"}}>${h.description}</p>` : ""}
        </div>`).join("\n");

    return `
export default function Hobbies() {
  return (
    <section id="hobbies" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: "${primary}" }}>Beyond Work</span>
          <h2 className="text-4xl font-bold" style={{color:"var(--color-heading)"}}>Interests & Hobbies</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          ${items}
        </div>
      </div>
    </section>
  );
}`;
  }

  // HobbiesList
  if (variant === "HobbiesList") {
    const items = hobbies.map((h, i) => `
        <div key={${i}} className="flex items-center gap-6 py-6 border-b last:border-0" style={{borderColor:"var(--color-border)"}}>
          <div className="w-16 h-16 rounded-2xl flex shrink-0 items-center justify-center text-3xl border bg-white/5" style={{borderColor:"var(--color-border)"}}>${h.emoji || "✨"}</div>
          <div>
            <h3 className="text-xl font-bold mb-1" style={{color:"var(--color-heading)"}}>${h.name}</h3>
            ${h.description ? `<p className="leading-relaxed" style={{color:"var(--color-body)"}}>${h.description}</p>` : ""}
          </div>
        </div>`).join("\n");

    return `
export default function Hobbies() {
  return (
    <section id="hobbies" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{color:"var(--color-heading)"}}>What I do for fun.</h2>
        <div className="border-t" style={{borderColor:"var(--color-border)"}}>
          ${items}
        </div>
      </div>
    </section>
  );
}`;
  }

  // HobbiesPills
  if (variant === "HobbiesPills") {
    const items = hobbies.map((h, i) => `
        <div key={${i}} className="flex items-center gap-3 px-6 py-3 rounded-full border bg-white/5 hover:bg-white/10 transition-colors" style={{borderColor:"var(--color-border)"}}>
          <span className="text-2xl">${h.emoji || "✨"}</span>
          <span className="font-medium text-lg" style={{color:"var(--color-heading)"}}>${h.name}</span>
        </div>`).join("\n");

    return `
export default function Hobbies() {
  return (
    <section id="hobbies" className="py-24 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-sm font-mono mb-12 uppercase tracking-widest" style={{ color: "${primary}" }}>[ Interests ]</h2>
        <div className="flex flex-wrap justify-center gap-4">
          ${items}
        </div>
      </div>
    </section>
  );
}`;
  }

  // HobbiesTimeline
  if (variant === "HobbiesTimeline") {
    const items = hobbies.map((h, i) => `
        <div key={${i}} className="flex gap-6 mb-12 last:mb-0">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full flex shrink-0 items-center justify-center text-2xl border-4" style={{borderColor:"var(--color-card-bg)", background:"${primary}"}}>${h.emoji || "✨"}</div>
            <div className="w-0.5 h-full opacity-20" style={{background:"${primary}"}} />
          </div>
          <div className="pt-2">
            <h3 className="text-2xl font-bold mb-2" style={{color:"var(--color-heading)"}}>${h.name}</h3>
            ${h.description ? `<p className="text-lg leading-relaxed max-w-2xl" style={{color:"var(--color-body)"}}>${h.description}</p>` : ""}
          </div>
        </div>`).join("\n");

    return `
export default function Hobbies() {
  return (
    <section id="hobbies" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-black mb-16" style={{color:"var(--color-heading)"}}>Off-screen.</h2>
        <div>
          ${items}
        </div>
      </div>
    </section>
  );
}`;
  }

  // HobbiesGrid — default
  const items = hobbies.map((h, i) => `
        <div key={${i}} className="flex items-start gap-4 p-6 rounded-2xl border" style={{ borderColor: "var(--color-border)", background: "var(--color-card-bg)" }}>
          <span className="text-3xl">${h.emoji || "✨"}</span>
          <div>
            <h3 className="text-lg font-bold mb-1" style={{color:"var(--color-heading)"}}>${h.name}</h3>
            ${h.description ? `<p className="text-sm" style={{color:"var(--color-text-muted)"}}>${h.description}</p>` : ""}
          </div>
        </div>`).join("\n");

  return `
export default function Hobbies() {
  return (
    <section id="hobbies" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{ color: "${primary}" }}>Personal</span>
          <h2 className="text-4xl font-bold" style={{color:"var(--color-heading)"}}>Interests & Hobbies</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${items}
        </div>
      </div>
    </section>
  );
}`;
};

module.exports = { getHobbiesTemplate };
