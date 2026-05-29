/**
 * Hobbies section templates.
 * 3 variants: HobbiesGrid, HobbiesCards, HobbiesList
 */
const getHobbiesTemplate = ({ blueprint, userInput, content }) => {
  const sectionDef = blueprint.sections.find((s) => s.type === "hobbies");
  const variant = sectionDef?.variant || "HobbiesGrid";
  const hobbies = userInput.hobbies || [];
  const heading = content?.hobbiesHeading || "Hobbies & Interests";
  const primary = blueprint.primaryColor || "#6366f1";

  if (hobbies.length === 0) {
    return `\nexport default function Hobbies() { return null; }`;
  }

  const items = hobbies.map((h) => ({
    name: (h.name || "").replace(/'/g, "\\'"),
    emoji: h.emoji || "✨",
    description: (h.description || "").replace(/'/g, "\\'"),
  }));

  // HobbiesCards
  if (variant === "HobbiesCards") {
    const cards = items.map((h, i) => `
    <div key={${i}} style={{background:"var(--color-card-bg)"}} className="group p-6 rounded-2xl border border-white/10 hover:border-primary/40 transition-all hover:-translate-y-1">
      <span className="text-3xl mb-4 block">${h.emoji}</span>
      <h3 className="text-lg font-bold text-white mb-2">${h.name}</h3>
      ${h.description ? `<p className="text-sm text-gray-400 leading-relaxed">${h.description}</p>` : ""}
    </div>`).join("\n");

    return `
export default function Hobbies() {
  return (
    <section id="hobbies" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{color:"${primary}"}}>Interests</span>
          <h2 className="text-4xl font-bold text-white">${heading}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          ${cards}
        </div>
      </div>
    </section>
  );
}`;
  }

  // HobbiesList
  if (variant === "HobbiesList") {
    const listItems = items.map((h, i) => `
    <div key={${i}} className="flex items-center gap-4 py-5 border-b border-white/5 last:border-0">
      <span className="text-2xl flex-shrink-0">${h.emoji}</span>
      <div>
        <h3 className="font-semibold text-white">${h.name}</h3>
        ${h.description ? `<p className="text-sm text-gray-500 mt-1">${h.description}</p>` : ""}
      </div>
    </div>`).join("\n");

    return `
export default function Hobbies() {
  return (
    <section id="hobbies" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">${heading}</h2>
        <div>${listItems}</div>
      </div>
    </section>
  );
}`;
  }

  // HobbiesGrid — default
  const gridItems = items.map((h, i) => `
    <div key={${i}} className="flex items-center gap-3 px-5 py-3 rounded-full border border-white/10 hover:scale-105 transition-all text-white text-sm">
      <span>${h.emoji}</span>
      <span>${h.name}</span>
    </div>`).join("\n");

  return `
export default function Hobbies() {
  return (
    <section id="hobbies" className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{color:"${primary}"}}>Beyond Work</span>
        <h2 className="text-4xl font-bold text-white mb-12">${heading}</h2>
        <div className="flex flex-wrap justify-center gap-4">
          ${gridItems}
        </div>
      </div>
    </section>
  );
}`;
};

module.exports = { getHobbiesTemplate };
