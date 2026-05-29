/**
 * Skills section templates.
 * 4 variants: SkillsGrid, SkillsProgress, SkillsCards, SkillsTags
 */
const { resolveSkillIcons } = require("../../utils/tech-icons");

const getSkillsTemplate = ({ blueprint, userInput, content }) => {
  const { variant } = blueprint.sections.find((s) => s.type === "skills") || { variant: "SkillsGrid" };
  const primary = blueprint.primaryColor;
  const secondary = blueprint.secondaryColor;
  const skills = userInput.skills || [];
  const heading = userInput.userType === "nonit"
    ? "My Skills"
    : (content.skillsHeading || "Skills & Technologies");

  const { siImports, faImports, iconMap } = resolveSkillIcons(skills);
  
  let imports = [];
  if (siImports && siImports.size > 0) {
    imports.push(`import { ${Array.from(siImports).join(", ")} } from "react-icons/si";`);
  }
  if (faImports && faImports.size > 0) {
    imports.push(`import { ${Array.from(faImports).join(", ")} } from "react-icons/fa";`);
  }
  const importStr = imports.join("\n");

  const levelPercent = { beginner: 30, intermediate: 55, advanced: 80, expert: 95 };

  const skillItems = skills.map((s, i) => {
    const pct = levelPercent[s.level] || 60;
    const iconData = iconMap[s.name];
    let iconJSX = "";
    if (iconData) {
      iconJSX = `<${iconData.icon} className="w-5 h-5" />`;
    } else {
      iconJSX = `<div className="w-5 h-5 flex items-center justify-center font-bold text-xs bg-white/10 rounded">${s.name.charAt(0)}</div>`;
    }
    return { ...s, pct, i, iconJSX };
  });

  // SkillsProgress — horizontal bars
  if (variant === "SkillsProgress") {
    const bars = skillItems.map(s => `
        <div key={${s.i}}>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2 text-white">
              <span style={{ color: "var(--color-primary)" }}>${s.iconJSX}</span>
              <span className="text-sm font-medium">${s.name}</span>
            </div>
            <span className="text-xs text-gray-500">${s.level || "intermediate"}</span>
          </div>
          <div className="h-2 rounded-full bg-white/5 overflow-hidden">
            <div className="h-full rounded-full transition-all duration-1000" style={{ width: "${s.pct}%", background: "linear-gradient(90deg, var(--color-primary), var(--color-secondary))" }} />
          </div>
        </div>`).join("\n");

    return `
${importStr}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{ color: "var(--color-primary)" }}>Expertise</span>
        <h2 className="text-4xl font-bold text-white mb-12">${heading}</h2>
        <div className="space-y-6">
          ${bars}
        </div>
      </div>
    </section>
  );
}`;
  }

  // SkillsCards — individual cards with icon/level
  if (variant === "SkillsCards") {
    const cards = skillItems.map(s => `
        <div key={${s.i}} className="group p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all hover:-translate-y-1" style={{ background: "var(--color-card-bg)" }}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white" style={{ background: "linear-gradient(135deg, var(--color-primary)30, var(--color-secondary)20)" }}>
            ${s.iconJSX.replace('w-5 h-5', 'w-6 h-6')}
          </div>
          <h3 className="font-semibold text-white mb-1">${s.name}</h3>
          <p className="text-xs text-gray-500 capitalize">${s.level || "intermediate"}</p>
        </div>`).join("\n");

    return `
${importStr}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{ color: "var(--color-primary)" }}>Skills</span>
          <h2 className="text-4xl font-bold text-white">${heading}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          ${cards}
        </div>
      </div>
    </section>
  );
}`;
  }

  // SkillsTags — tag cloud style
  if (variant === "SkillsTags") {
    const tags = skillItems.map(s => {
      const size = s.pct > 70 ? "text-lg px-6 py-3" : s.pct > 50 ? "text-sm px-5 py-2.5" : "text-xs px-4 py-2";
      return `<span key={${s.i}} className="flex items-center gap-2 ${size} rounded-full border border-white/10 text-gray-300 hover:border-white/30 hover:text-white transition-all cursor-default">
        <span style={{ color: "var(--color-primary)" }}>${s.iconJSX}</span>
        ${s.name}
      </span>`;
    }).join("\n            ");

    return `
${importStr}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-12">${heading}</h2>
        <div className="flex flex-wrap gap-3 justify-center">
            ${tags}
        </div>
      </div>
    </section>
  );
}`;
  }

  // SkillsGrid — default, pill badges in grid
  const pills = skillItems.map(s => `
        <div key={${s.i}} className="flex items-center gap-3 px-5 py-3 rounded-xl border border-white/5 hover:border-white/15 transition-colors" style={{ background: "var(--color-card-bg)" }}>
          <span style={{ color: "var(--color-primary)" }}>${s.iconJSX}</span>
          <span className="text-sm font-medium text-white">${s.name}</span>
          <span className="text-xs text-gray-600 ml-auto capitalize">${s.level || ""}</span>
        </div>`).join("\n");

  return `
${importStr}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{ color: "var(--color-primary)" }}>Skills</span>
          <h2 className="text-4xl font-bold text-white">${heading}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          ${pills}
        </div>
      </div>
    </section>
  );
}`;
};

module.exports = { getSkillsTemplate };
