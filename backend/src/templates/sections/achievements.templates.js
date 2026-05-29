/**
 * Achievements section templates.
 * 3 variants: AchievementsCards, AchievementsTimeline, AchievementsTrophy
 */
const getAchievementsTemplate = ({ blueprint, userInput, content }) => {
  const sectionDef = blueprint.sections.find((s) => s.type === "achievements");
  const variant = sectionDef?.variant || "AchievementsCards";
  const achievements = userInput.achievements || [];
  const heading = content?.achievementsHeading || "Achievements";
  const primary = blueprint.primaryColor || "#6366f1";

  if (achievements.length === 0) {
    return `\nexport default function Achievements() { return null; }`;
  }

  const items = achievements.map((a) => ({
    title: (a.title || "").replace(/'/g, "\\'"),
    year: a.year || "",
    description: (a.description || "").replace(/'/g, "\\'"),
  }));

  // AchievementsTimeline
  if (variant === "AchievementsTimeline") {
    const timelineItems = items.map((a, i) => `
    <div key={${i}} className="relative pl-8 pb-10 border-l-2 last:pb-0" style={{borderColor:"${primary}"}}>
      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full" style={{background:"${primary}"}} />
      <div className="p-5 rounded-2xl border border-white/10" style={{background:"var(--color-card-bg)"}}>
        <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
          <h3 className="text-lg font-bold text-white">${a.title}</h3>
          ${a.year ? `<span className="text-xs px-2 py-1 rounded-full" style={{background:"${primary}20",color:"${primary}"}}>${a.year}</span>` : ""}
        </div>
        ${a.description ? `<p className="text-sm text-gray-400">${a.description}</p>` : ""}
      </div>
    </div>`).join("\n");

    return `
export default function Achievements() {
  return (
    <section id="achievements" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{color:"${primary}"}}>Milestones</span>
          <h2 className="text-4xl font-bold text-white">${heading}</h2>
        </div>
        <div>${timelineItems}</div>
      </div>
    </section>
  );
}`;
  }

  // AchievementsTrophy
  if (variant === "AchievementsTrophy") {
    const trophyItems = items.map((a, i) => `
    <div key={${i}} className="text-center p-8 rounded-2xl border border-white/10 hover:-translate-y-1 transition-transform" style={{background:"var(--color-card-bg)"}}>
      <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl" style={{background:"${primary}20"}}>🏆</div>
      <h3 className="text-lg font-bold text-white mb-2">${a.title}</h3>
      ${a.year ? `<p className="text-xs mb-3" style={{color:"${primary}"}}>${a.year}</p>` : ""}
      ${a.description ? `<p className="text-sm text-gray-400">${a.description}</p>` : ""}
    </div>`).join("\n");

    return `
export default function Achievements() {
  return (
    <section id="achievements" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{color:"${primary}"}}>Recognition</span>
          <h2 className="text-4xl font-bold text-white">${heading}</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${trophyItems}
        </div>
      </div>
    </section>
  );
}`;
  }

  // AchievementsCards — default
  const cardItems = items.map((a, i) => `
    <div key={${i}} className="p-6 rounded-2xl border border-white/10 hover:border-primary/30 transition-all" style={{background:"var(--color-card-bg)"}}>
      <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
        <h3 className="text-lg font-bold text-white">${a.title}</h3>
        ${a.year ? `<span className="text-xs text-gray-500 whitespace-nowrap">${a.year}</span>` : ""}
      </div>
      ${a.description ? `<p className="text-sm text-gray-400 leading-relaxed">${a.description}</p>` : ""}
    </div>`).join("\n");

  return `
export default function Achievements() {
  return (
    <section id="achievements" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{color:"${primary}"}}>Accomplishments</span>
          <h2 className="text-4xl font-bold text-white">${heading}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          ${cardItems}
        </div>
      </div>
    </section>
  );
}`;
};

module.exports = { getAchievementsTemplate };
