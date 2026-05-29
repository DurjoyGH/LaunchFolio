/**
 * Projects section templates.
 * 5 variants: ProjectsGrid, ProjectsShowcase, ProjectsMinimal, ProjectsCards, ProjectsMasonry
 */
const getProjectsTemplate = ({ blueprint, userInput, content }) => {
  const { variant } = blueprint.sections.find((s) => s.type === "projects") || { variant: "ProjectsGrid" };
  const projects = userInput.projects || [];
  const heading = content.projectsHeading || "Featured Projects";
  const { renderSimpleIcon, getSocialIcon } = require("../../utils/social-icons");
  const externalIcon = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\"/><path d=\"M15 3h6v6\"/><path d=\"M10 14L21 3\"/></svg>";
  const githubIcon = renderSimpleIcon(getSocialIcon("github"), 16);

  // ProjectsShowcase — large featured cards
  if (variant === "ProjectsShowcase") {
    const items = projects.map((p, i) => `
        <div key={${i}} className="group grid md:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? "md:flex-row-reverse" : ""}">
          <div className="${i % 2 === 1 ? "md:order-2" : ""}">
            ${p.image
              ? `<div className="aspect-video rounded-2xl overflow-hidden border border-white/5 group-hover:border-white/20 transition-colors">
                <img src="${p.image}" alt="${p.title}" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>`
              : `<div className="aspect-video rounded-2xl border border-white/5 flex items-center justify-center" style={{ background: "var(--color-card-bg)" }}>
                <span className="text-6xl font-bold" style={{ color: "var(--color-primary)", opacity: 0.2 }}>0${i + 1}</span>
              </div>`
            }
          </div>
          <div className="${i % 2 === 1 ? "md:order-1" : ""}">
            <span className="text-sm font-mono" style={{ color: "var(--color-primary)" }}>0${i + 1}</span>
            <h3 className="text-2xl font-bold text-white mt-2 mb-3">${p.title}</h3>
            <p className="text-gray-400 leading-relaxed mb-4">${p.description || ""}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              ${(p.techStack || []).map(t => `<span className="px-3 py-1 rounded-full text-xs border border-white/10 text-gray-400">${t}</span>`).join("\n              ")}
            </div>
            <div className="flex gap-3 flex-wrap">
              ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium btn-primary transition-opacity hover:opacity-90">${externalIcon} Live Demo</a>` : ""}
              ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-gray-400 border border-white/10 hover:border-white/30 transition-colors">${githubIcon} Source Code</a>` : ""}
            </div>
          </div>
        </div>`).join("\n");

    return `
export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{ color: "var(--color-primary)" }}>Work</span>
        <h2 className="text-4xl font-bold text-white mb-16">${heading}</h2>
        <div className="space-y-24">
          ${items}
        </div>
      </div>
    </section>
  );
}`;
  }

  // ProjectsMinimal — clean list style
  if (variant === "ProjectsMinimal") {
    const items = projects.map((p, i) => `
        <a key={${i}} href="${p.liveUrl || p.githubUrl || "#"}" target="_blank" className="group flex items-center justify-between py-6 border-b border-white/5 hover:border-white/20 transition-colors">
          <div>
            <h3 className="text-xl font-semibold text-white group-hover:translate-x-2 transition-transform">${p.title}</h3>
            <p className="text-sm text-gray-500 mt-1">${(p.techStack || []).join(" · ")}</p>
          </div>
          <span className="text-gray-600 group-hover:text-white transition-colors">${externalIcon}</span>
        </a>`).join("\n");

    return `
export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-sm font-mono mb-4" style={{ color: "var(--color-primary)" }}>// projects</p>
        <h2 className="text-3xl font-bold text-white mb-8">${heading}</h2>
        <div>
          ${items}
        </div>
      </div>
    </section>
  );
}`;
  }

  // ProjectsCards — compact card grid
  if (variant === "ProjectsCards") {
    const items = projects.map((p, i) => `
        <div key={${i}} className="group p-6 rounded-2xl border border-white/5 hover:border-white/15 transition-all hover:-translate-y-1" style={{ background: "var(--color-card-bg)" }}>
          ${p.image ? `<div className="aspect-video rounded-xl overflow-hidden mb-4 border border-white/5">
            <img src="${p.image}" alt="${p.title}" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>` : ""}
          <h3 className="text-lg font-semibold text-white mb-2">${p.title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">${p.description || ""}</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            ${(p.techStack || []).map(t => `<span className="px-2.5 py-0.5 rounded-md text-xs text-gray-400 bg-white/5">${t}</span>`).join("\n            ")}
          </div>
          <div className="flex gap-4 pt-2 border-t border-white/5">
            ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" className="flex items-center gap-1 text-xs font-medium hover:opacity-80 transition-opacity" style={{ color: "var(--color-primary)" }}>${externalIcon} Live</a>` : ""}
            ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" className="flex items-center gap-1 text-xs text-gray-500 hover:text-white transition-colors">${githubIcon} Code</a>` : ""}
          </div>
        </div>`).join("\n");

    return `
export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{ color: "var(--color-primary)" }}>Portfolio</span>
          <h2 className="text-4xl font-bold text-white">${heading}</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${items}
        </div>
      </div>
    </section>
  );
}`;
  }

  // ProjectsMasonry — alternating large/small
  if (variant === "ProjectsMasonry") {
    const items = projects.map((p, i) => {
      const isLarge = i % 3 === 0;
      return `
        <div key={${i}} className="${isLarge ? "md:col-span-2" : ""} group relative rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all">
          ${p.image
            ? `<img src="${p.image}" alt="${p.title}" className="w-full ${isLarge ? "h-80" : "h-64"} object-cover group-hover:scale-105 transition-transform duration-500" />`
            : `<div className="${isLarge ? "h-80" : "h-64"} flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--color-primary)15, var(--color-secondary)08)" }}>
              <span className="text-7xl font-black" style={{ color: "var(--color-primary)", opacity: 0.15 }}>${p.title.charAt(0)}</span>
            </div>`
          }
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
            <h3 className="text-xl font-bold text-white mb-1">${p.title}</h3>
            <p className="text-sm text-gray-300 mb-3">${(p.techStack || []).join(" · ")}</p>
            <div className="flex gap-4">
              ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" className="flex items-center gap-1.5 text-sm font-medium text-white underline">${externalIcon} Live</a>` : ""}
              ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" className="flex items-center gap-1.5 text-sm text-gray-400 underline">${githubIcon} Code</a>` : ""}
            </div>
          </div>
        </div>`;
    }).join("\n");

    return `
export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white">${heading}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          ${items}
        </div>
      </div>
    </section>
  );
}`;
  }

  // ProjectsGrid — default
  const items = projects.map((p, i) => `
        <div key={${i}} className="group p-1 rounded-2xl border border-white/5 hover:border-white/15 transition-all hover:-translate-y-1 overflow-hidden" style={{ background: "var(--color-card-bg)" }}>
          ${p.image
            ? `<div className="aspect-video rounded-xl overflow-hidden">
              <img src="${p.image}" alt="${p.title}" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>`
            : `<div className="aspect-video rounded-xl flex items-center justify-center border border-white/5">
              <span className="text-5xl font-bold" style={{ color: "var(--color-primary)", opacity: 0.2 }}>${p.title.charAt(0)}</span>
            </div>`
          }
          <div className="p-5">
            <h3 className="text-lg font-bold text-white mb-2">${p.title}</h3>
            <p className="text-sm text-gray-500 mb-4 line-clamp-2">${p.description || ""}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              ${(p.techStack || []).map(t => `<span className="px-2.5 py-0.5 rounded-full text-xs border border-white/10 text-gray-400">${t}</span>`).join("\n              ")}
            </div>
            <div className="flex gap-4">
              ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" className="flex items-center gap-1.5 text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: "var(--color-primary)" }}>${externalIcon} Live Demo</a>` : ""}
              ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-white transition-colors">${githubIcon} GitHub</a>` : ""}
            </div>
          </div>
        </div>`).join("\n");

  return `
export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{ color: "var(--color-primary)" }}>Projects</span>
          <h2 className="text-4xl font-bold text-white">${heading}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          ${items}
        </div>
      </div>
    </section>
  );
}`;
};

module.exports = { getProjectsTemplate };
