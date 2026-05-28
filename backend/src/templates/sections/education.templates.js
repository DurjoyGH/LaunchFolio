/**
 * Education section templates.
 * 3 variants: EducationTimeline, EducationCards, EducationMinimal
 */
const getEducationTemplate = ({ blueprint, userInput }) => {
  const { variant } = blueprint.sections.find((s) => s.type === "education") || { variant: "EducationTimeline" };
  const education = userInput.education || [];

  if (education.length === 0) {
    return `
export default function Education() {
  return null;
}`;
  }

  // EducationCards — card grid
  if (variant === "EducationCards") {
    const cards = education.map((edu, i) => `
        <div key={${i}} className="p-6 rounded-2xl border border-white/5 hover:border-white/15 transition-all hover:-translate-y-1" style={{ background: "var(--color-card-bg)" }}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-xl font-bold text-white" style={{ background: "linear-gradient(135deg, var(--color-primary)30, var(--color-secondary)20)" }}>
            ${edu.institution?.charAt(0) || "U"}
          </div>
          <h3 className="text-lg font-bold text-white mb-1">${edu.degree || "Degree"}${edu.field ? ` in ${edu.field}` : ""}</h3>
          <p className="text-sm font-medium mb-2" style={{ color: "var(--color-primary)" }}>${edu.institution || "Institution"}</p>
          <p className="text-xs text-gray-500 mb-3">${edu.startYear || ""}${edu.endYear ? ` — ${edu.endYear}` : " — Present"}</p>
          ${edu.description ? `<p className="text-sm text-gray-500 leading-relaxed">${edu.description}</p>` : ""}
        </div>`).join("\n");

    return `
export default function Education() {
  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{ color: "var(--color-primary)" }}>Education</span>
          <h2 className="text-4xl font-bold text-white">Academic Background</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${cards}
        </div>
      </div>
    </section>
  );
}`;
  }

  // EducationMinimal — simple list
  if (variant === "EducationMinimal") {
    const items = education.map((edu, i) => `
        <div key={${i}} className="flex items-start justify-between py-6 border-b border-white/5">
          <div>
            <h3 className="font-semibold text-white">${edu.degree || "Degree"}${edu.field ? ` in ${edu.field}` : ""}</h3>
            <p className="text-sm mt-1" style={{ color: "var(--color-primary)" }}>${edu.institution || "Institution"}</p>
            ${edu.description ? `<p className="text-sm text-gray-500 mt-2 max-w-lg">${edu.description}</p>` : ""}
          </div>
          <span className="text-sm text-gray-600 whitespace-nowrap ml-4">${edu.startYear || ""}${edu.endYear ? ` — ${edu.endYear}` : ""}</span>
        </div>`).join("\n");

    return `
export default function Education() {
  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-sm font-mono mb-4" style={{ color: "var(--color-primary)" }}>// education</p>
        <h2 className="text-3xl font-bold text-white mb-8">Education</h2>
        <div>
          ${items}
        </div>
      </div>
    </section>
  );
}`;
  }

  // EducationTimeline — default
  const timelineItems = education.map((edu, i) => `
        <div key={${i}} className="relative pl-8 pb-8 border-l-2 last:pb-0" style={{ borderColor: "var(--color-primary)" }}>
          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full" style={{ background: "var(--color-primary)" }} />
          <div className="p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-colors" style={{ background: "var(--color-card-bg)" }}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <h3 className="text-lg font-bold text-white">${edu.degree || "Degree"}${edu.field ? ` in ${edu.field}` : ""}</h3>
              <span className="text-sm px-3 py-1 rounded-full text-gray-400 whitespace-nowrap" style={{ background: "var(--color-primary)10" }}>
                ${edu.startYear || ""}${edu.endYear ? ` — ${edu.endYear}` : " — Present"}
              </span>
            </div>
            <p className="font-medium mb-2" style={{ color: "var(--color-primary)" }}>${edu.institution || "Institution"}</p>
            ${edu.description ? `<p className="text-sm text-gray-500">${edu.description}</p>` : ""}
          </div>
        </div>`).join("\n");

  return `
export default function Education() {
  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{ color: "var(--color-primary)" }}>Education</span>
          <h2 className="text-4xl font-bold text-white">Academic Background</h2>
        </div>
        <div className="max-w-2xl mx-auto">
          ${timelineItems}
        </div>
      </div>
    </section>
  );
}`;
};

module.exports = { getEducationTemplate };
