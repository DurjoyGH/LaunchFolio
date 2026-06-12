/**
 * Achievements section templates.
 * 5 variants: AchievementsCards, AchievementsTimeline, AchievementsTrophy, AchievementsGrid, AchievementsList
 */
const getAchievementsTemplate = ({ blueprint, userInput }) => {
  const sectionDef = blueprint.sections.find((s) => s.type === "achievements");
  const variant = sectionDef?.variant || "AchievementsCards";
  const achievements = userInput.achievements || [];
  const primary = blueprint.primaryColor || "#6366f1";

  if (achievements.length === 0) {
    return `\nexport default function Achievements() { return null; }`;
  }

  // AchievementsTimeline
  if (variant === "AchievementsTimeline") {
    const items = achievements.map((a, i) => `
        <div key={${i}} className="relative pl-8 pb-10 border-l-2 last:pb-0" style={{ borderColor: "${primary}40" }}>
          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full" style={{ background: "${primary}" }} />
          <div>
            <span className="inline-block px-3 py-1 text-xs font-bold rounded-full mb-3" style={{ background: "${primary}20", color: "${primary}" }}>${a.year || "Award"}</span>
            <h3 className="text-xl font-bold mb-2" style={{color:"var(--color-heading)"}}>${a.title}</h3>
            ${a.description ? `<p className="leading-relaxed" style={{color:"var(--color-body)"}}>${a.description}</p>` : ""}
          </div>
        </div>`).join("\n");

    return `
export default function Achievements() {
  return (
    <section id="achievements" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{ color: "${primary}" }}>Milestones</span>
          <h2 className="text-4xl font-bold" style={{color:"var(--color-heading)"}}>Key Achievements</h2>
        </div>
        <div className="pl-4 md:pl-0">
          ${items}
        </div>
      </div>
    </section>
  );
}`;
  }

  // AchievementsTrophy
  if (variant === "AchievementsTrophy") {
    const items = achievements.map((a, i) => `
        <div key={${i}} className="flex gap-6 mb-10 last:mb-0 items-start">
          <div className="w-16 h-16 rounded-full flex shrink-0 items-center justify-center text-3xl shadow-lg border-2" style={{ background: "var(--color-card-bg)", borderColor: "${primary}" }}>🏆</div>
          <div>
            <h3 className="text-2xl font-bold mb-2" style={{color:"var(--color-heading)"}}>${a.title} <span className="text-sm font-mono opacity-50 ml-2">${a.year || ""}</span></h3>
            ${a.description ? `<p className="text-lg leading-relaxed" style={{color:"var(--color-body)"}}>${a.description}</p>` : ""}
          </div>
        </div>`).join("\n");

    return `
export default function Achievements() {
  return (
    <section id="achievements" className="py-32 px-6">
      <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-16">
        <div className="md:col-span-2">
          <h2 className="text-5xl font-black mb-6 sticky top-32" style={{color:"var(--color-heading)"}}>Awards & Honors.</h2>
        </div>
        <div className="md:col-span-3">
          ${items}
        </div>
      </div>
    </section>
  );
}`;
  }

  // AchievementsGrid
  if (variant === "AchievementsGrid") {
    const items = achievements.map((a, i) => `
        <div key={${i}} className="relative overflow-hidden p-8 rounded-3xl border bg-white/5 group" style={{ borderColor: "var(--color-border)" }}>
          <div className="absolute top-0 right-0 p-8 text-6xl opacity-10 group-hover:scale-125 transition-transform origin-top-right">★</div>
          <span className="text-sm font-bold uppercase tracking-wider block mb-4" style={{color:"${primary}"}}>${a.year || "Highlight"}</span>
          <h3 className="text-2xl font-bold mb-4 relative z-10" style={{color:"var(--color-heading)"}}>${a.title}</h3>
          ${a.description ? `<p className="leading-relaxed relative z-10" style={{color:"var(--color-body)"}}>${a.description}</p>` : ""}
        </div>`).join("\n");

    return `
export default function Achievements() {
  return (
    <section id="achievements" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-sm font-mono mb-4 uppercase tracking-widest" style={{ color: "${primary}" }}>[ Recognition ]</h2>
          <h3 className="text-4xl font-bold" style={{color:"var(--color-heading)"}}>Achievements</h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${items}
        </div>
      </div>
    </section>
  );
}`;
  }

  // AchievementsList
  if (variant === "AchievementsList") {
    const items = achievements.map((a, i) => `
        <div key={${i}} className="py-8 border-b border-dashed last:border-0" style={{borderColor:"var(--color-border)"}}>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-3">
            <h3 className="text-2xl font-bold" style={{color:"var(--color-heading)"}}>${a.title}</h3>
            <span className="font-mono text-lg" style={{color:"${primary}"}}>${a.year || "—"}</span>
          </div>
          ${a.description ? `<p className="text-lg leading-relaxed max-w-4xl" style={{color:"var(--color-body)"}}>${a.description}</p>` : ""}
        </div>`).join("\n");

    return `
export default function Achievements() {
  return (
    <section id="achievements" className="py-24 px-6">
      <div className="max-w-5xl mx-auto border-t-4" style={{borderColor:"${primary}"}}>
        <div className="py-8 border-b" style={{borderColor:"var(--color-border)"}}>
          <h2 className="text-4xl font-black uppercase tracking-tight" style={{color:"var(--color-heading)"}}>Achievements & Awards</h2>
        </div>
        <div>
          ${items}
        </div>
      </div>
    </section>
  );
}`;
  }

  // AchievementsCards — default
  const items = achievements.map((a, i) => `
        <div key={${i}} className="p-8 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-lg" style={{ borderColor: "var(--color-border)", background: "var(--color-card-bg)" }}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl" style={{ background: "${primary}20", color: "${primary}" }}>🏅</div>
            <div>
              <h3 className="font-bold text-lg leading-tight" style={{color:"var(--color-heading)"}}>${a.title}</h3>
              <p className="text-sm font-medium" style={{color:"var(--color-text-muted)"}}>${a.year || ""}</p>
            </div>
          </div>
          ${a.description ? `<p className="text-sm leading-relaxed" style={{color:"var(--color-body)"}}>${a.description}</p>` : ""}
        </div>`).join("\n");

  return `
export default function Achievements() {
  return (
    <section id="achievements" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{ color: "${primary}" }}>Recognition</span>
          <h2 className="text-4xl font-bold" style={{color:"var(--color-heading)"}}>Achievements</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${items}
        </div>
      </div>
    </section>
  );
}`;
};

module.exports = { getAchievementsTemplate };
