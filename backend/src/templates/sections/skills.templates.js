const getSkillsTemplate = ({ blueprint, userInput, content }) => {
  const { variant } = blueprint.sections.find((s) => s.type === "skills") || { variant: "SkillsOne" };
  const primary = blueprint.primaryColor;
  const secondary = blueprint.secondaryColor;
  const heading = content.skillsHeading || "My Skills";
  const skills = userInput.skills || [];

  const skillsList = JSON.stringify(
    skills.map((s) => ({
      name: s.name,
      level: s.level || "intermediate",
      pct: s.level === "expert" ? 95 : s.level === "advanced" ? 80 : s.level === "intermediate" ? 60 : 35,
    }))
  );

  if (variant === "SkillsTwo") {
    return `export default function Skills() {
  const skills = ${skillsList};
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{ color: "${primary}" }}>Skills</span>
          <h2 className="text-4xl font-bold text-white">${heading}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, i) => (
            <div key={i} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
              <div className="flex justify-between mb-3">
                <span className="text-white font-medium">{skill.name}</span>
                <span className="text-sm text-gray-500 capitalize">{skill.level}</span>
              </div>
              <div className="h-2 rounded-full bg-white/10">
                <div className="h-2 rounded-full" style={{ width: skill.pct + "%", background: "linear-gradient(90deg, ${primary}, ${secondary})" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`;
  }

  return `export default function Skills() {
  const skills = ${skillsList};
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{ color: "${primary}" }}>Skills</span>
        <h2 className="text-4xl font-bold text-white mb-12">${heading}</h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {skills.map((skill, i) => (
            <div key={i} className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 bg-white/[0.03] hover:scale-105 transition-transform">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "${primary}" }} />
              <span className="text-white font-medium">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`;
};

module.exports = { getSkillsTemplate };
