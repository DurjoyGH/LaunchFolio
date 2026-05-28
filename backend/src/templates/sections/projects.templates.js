const getProjectsTemplate = ({ blueprint, userInput, content }) => {
  const { variant } = blueprint.sections.find((s) => s.type === "projects") || { variant: "ProjectsOne" };
  const primary = blueprint.primaryColor;
  const secondary = blueprint.secondaryColor;
  const heading = content.projectsHeading || "Featured Projects";
  const projects = JSON.stringify(userInput.projects || []);

  const cardBase = `
  const projects = ${projects};`;

  if (variant === "ProjectsTwo") {
    return `export default function Projects() {${cardBase}
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{ color: "${primary}" }}>Work</span>
          <h2 className="text-4xl font-bold text-white">${heading}</h2>
        </div>
        <div className="space-y-8">
          {projects.map((project, i) => (
            <div key={i} className="grid md:grid-cols-2 gap-8 p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition-colors group">
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[${primary}] transition-colors">{project.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {(project.techStack || []).map((tech, j) => (
                    <span key={j} className="px-3 py-1 text-xs rounded-full border" style={{ borderColor: "${primary}40", color: "${primary}", backgroundColor: "${primary}10" }}>{tech}</span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.liveUrl && <a href={project.liveUrl} target="_blank" className="text-sm font-medium transition-colors hover:opacity-80" style={{ color: "${primary}" }}>Live Demo →</a>}
                  {project.githubUrl && <a href={project.githubUrl} target="_blank" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">GitHub →</a>}
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/5 bg-white/5 flex items-center justify-center min-h-48">
                {project.image ? <img src={project.image} alt={project.title} className="w-full h-full object-cover" /> : <span className="text-5xl font-bold text-white/10">{project.title?.[0]}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`;
  }

  return `export default function Projects() {${cardBase}
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{ color: "${primary}" }}>Projects</span>
          <h2 className="text-4xl font-bold text-white">${heading}</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden hover:border-white/10 transition-all hover:-translate-y-1 group">
              <div className="h-48 bg-white/5 flex items-center justify-center">
                {project.image ? <img src={project.image} alt={project.title} className="w-full h-full object-cover" /> : <span className="text-6xl font-bold text-white/10">{project.title?.[0]}</span>}
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[${primary}] transition-colors">{project.title}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {(project.techStack || []).slice(0,3).map((tech, j) => (
                    <span key={j} className="px-2 py-0.5 text-xs rounded border" style={{ borderColor: "${primary}30", color: "${primary}90", backgroundColor: "${primary}08" }}>{tech}</span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {project.liveUrl && <a href={project.liveUrl} target="_blank" className="text-xs font-medium" style={{ color: "${primary}" }}>Live →</a>}
                  {project.githubUrl && <a href={project.githubUrl} target="_blank" className="text-xs text-gray-500 hover:text-white">GitHub →</a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`;
};

module.exports = { getProjectsTemplate };
