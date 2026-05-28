/**
 * Education section template.
 */
const getEducationTemplate = ({ userInput, content }) => {
  const education = userInput.education || content.education || [];

  const eduCards = education
    .map(
      (edu, i) => `
        <div key={${i}} className="relative pl-8 pb-8 border-l-2 border-[var(--primary)]/30 last:pb-0">
          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[var(--primary)]" />
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[var(--primary)]/40 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <h3 className="text-lg font-bold text-white">${edu.degree || "Degree"}${edu.field ? ` in ${edu.field}` : ""}</h3>
              <span className="text-sm px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] whitespace-nowrap">
                ${edu.startYear || ""}${edu.endYear ? ` — ${edu.endYear}` : " — Present"}
              </span>
            </div>
            <p className="text-[var(--accent)] font-medium mb-2">${edu.institution || "Institution"}</p>
            ${edu.description ? `<p className="text-sm text-gray-400">${edu.description}</p>` : ""}
          </div>
        </div>`
    )
    .join("\n");

  return `
export default function Education() {
  return (
    <section id="education" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-4">Education</h2>
        <p className="text-center text-gray-400 mb-12 max-w-xl mx-auto">My academic background</p>
        <div className="max-w-2xl mx-auto">
          ${eduCards || '<p className="text-gray-400 text-center">No education added yet.</p>'}
        </div>
      </div>
    </section>
  );
}`;
};

module.exports = { getEducationTemplate };
