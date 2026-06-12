/**
 * Projects section templates.
 * 5 variants: ProjectsGrid, ProjectsShowcase, ProjectsMinimal, ProjectsCards, ProjectsMasonry
 */
const getProjectsTemplate = ({ blueprint, userInput }) => {
  const sectionDef = blueprint.sections.find((s) => s.type === "projects");
  const variant = sectionDef?.variant || "ProjectsGrid";
  const projects = userInput.projects || [];
  const primary = blueprint.primaryColor || "#6366f1";

  if (projects.length === 0) {
    return `\nexport default function Projects() { return null; }`;
  }

  // ProjectsCards
  if (variant === "ProjectsCards") {
    const cards = projects.map((p, i) => `
        <div key={${i}} className="flex flex-col bg-white/5 rounded-3xl overflow-hidden border transition-transform hover:-translate-y-2 hover:shadow-2xl" style={{ borderColor: "var(--color-border)" }}>
          ${p.image ? `<div className="aspect-video w-full overflow-hidden border-b" style={{borderColor:"var(--color-border)"}}><img src="${p.image}" alt="${p.title}" className="w-full h-full object-cover" /></div>` : ""}
          <div className="p-8 flex-1 flex flex-col">
            <h3 className="text-2xl font-bold mb-3" style={{color:"var(--color-heading)"}}>${p.title}</h3>
            <p className="leading-relaxed mb-6 flex-1" style={{color:"var(--color-body)"}}>${p.description}</p>
            ${p.techStack && p.techStack.length > 0 ? `
            <div className="flex flex-wrap gap-2 mb-8">
              ${p.techStack.map(t => `<span className="text-xs px-3 py-1 rounded-full font-medium" style={{background:"var(--color-card-bg)", border:"1px solid var(--color-border)", color:"var(--color-text-muted)"}}>${t}</span>`).join("")}
            </div>` : ""}
            <div className="flex gap-4 mt-auto">
              ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" rel="noreferrer" className="flex-1 py-3 text-center rounded-xl font-bold text-sm transition-colors" style={{background:"${primary}", color:"#fff"}}>Live Site</a>` : ""}
              ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" rel="noreferrer" className="flex-1 py-3 text-center rounded-xl font-bold text-sm border transition-colors hover:bg-white/5" style={{borderColor:"var(--color-border)", color:"var(--color-heading)"}}>Source Code</a>` : ""}
            </div>
          </div>
        </div>`).join("\n");

    return `
export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: "${primary}" }}>Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-black" style={{color:"var(--color-heading)"}}>Featured Projects</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${cards}
        </div>
      </div>
    </section>
  );
}`;
  }

  // ProjectsShowcase
  if (variant === "ProjectsShowcase") {
    const items = projects.map((p, i) => `
        <div key={${i}} className="${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex flex-col gap-10 md:gap-16 items-center mb-24 last:mb-0">
          ${p.image ? `<div className="w-full md:w-1/2 rounded-[2rem] overflow-hidden border shadow-2xl" style={{borderColor:"var(--color-border)"}}><img src="${p.image}" alt="${p.title}" className="w-full aspect-[4/3] object-cover" /></div>` : "<div className='w-full md:w-1/2'/>"}
          <div className="w-full md:w-1/2">
            <span className="text-sm font-bold font-mono mb-4 block" style={{ color: "${primary}" }}>0${i+1}</span>
            <h3 className="text-4xl font-bold mb-6" style={{color:"var(--color-heading)"}}>${p.title}</h3>
            <p className="text-lg leading-relaxed mb-8" style={{color:"var(--color-body)"}}>${p.description}</p>
            ${p.techStack && p.techStack.length > 0 ? `
            <div className="flex flex-wrap gap-3 mb-10">
              ${p.techStack.map(t => `<span className="text-sm font-medium" style={{color:"var(--color-text-muted)"}}>#${t}</span>`).join("")}
            </div>` : ""}
            <div className="flex gap-6">
              ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" rel="noreferrer" className="px-8 py-3 rounded-full font-bold btn-primary shadow-lg hover:-translate-y-1 transition-all">Visit Website</a>` : ""}
              ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" rel="noreferrer" className="px-8 py-3 rounded-full font-bold border transition-colors hover:bg-white/5" style={{borderColor:"var(--color-border)", color:"var(--color-heading)"}}>GitHub</a>` : ""}
            </div>
          </div>
        </div>`).join("\n");

    return `
export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <h2 className="text-6xl md:text-7xl font-black tracking-tight" style={{color:"var(--color-heading)"}}>Selected<br/>Works.</h2>
        </div>
        <div>
          ${items}
        </div>
      </div>
    </section>
  );
}`;
  }

  // ProjectsMinimal
  if (variant === "ProjectsMinimal") {
    const items = projects.map((p, i) => `
        <div key={${i}} className="py-12 border-b last:border-0" style={{borderColor:"var(--color-border)"}}>
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 mb-6">
            <h3 className="text-3xl font-bold" style={{color:"var(--color-heading)"}}>${p.title}</h3>
            <div className="flex gap-4 text-sm font-mono uppercase tracking-wider">
              ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" rel="noreferrer" className="hover:underline" style={{color:"${primary}"}}>Live &rarr;</a>` : ""}
              ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" rel="noreferrer" className="hover:underline" style={{color:"var(--color-text-muted)"}}>Code &rarr;</a>` : ""}
            </div>
          </div>
          <p className="text-xl leading-relaxed max-w-4xl mb-6" style={{color:"var(--color-body)"}}>${p.description}</p>
          ${p.techStack && p.techStack.length > 0 ? `
          <p className="text-sm font-mono" style={{color:"var(--color-text-muted)"}}>
            [${p.techStack.join(" / ")}]
          </p>` : ""}
        </div>`).join("\n");

    return `
export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-sm font-mono mb-12 uppercase tracking-widest" style={{ color: "${primary}" }}>[ Projects ]</h2>
        <div className="border-t" style={{borderColor:"var(--color-border)"}}>
          ${items}
        </div>
      </div>
    </section>
  );
}`;
  }

  // ProjectsMasonry
  if (variant === "ProjectsMasonry") {
    const items = projects.map((p, i) => `
        <div key={${i}} className="break-inside-avoid mb-8 rounded-3xl overflow-hidden border group" style={{borderColor:"var(--color-border)", background:"var(--color-card-bg)"}}>
          ${p.image ? `<div className="relative overflow-hidden"><img src="${p.image}" alt="${p.title}" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" /></div>` : ""}
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-3" style={{color:"var(--color-heading)"}}>${p.title}</h3>
            <p className="text-lg leading-relaxed mb-6" style={{color:"var(--color-body)"}}>${p.description}</p>
            <div className="flex gap-4">
              ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" rel="noreferrer" className="text-sm font-bold hover:underline" style={{color:"${primary}"}}>Visit Site</a>` : ""}
              ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" rel="noreferrer" className="text-sm font-bold hover:underline" style={{color:"var(--color-heading)"}}>Repository</a>` : ""}
            </div>
          </div>
        </div>`).join("\n");

    return `
export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <h2 className="text-5xl font-black" style={{color:"var(--color-heading)"}}>Works.</h2>
          <div className="h-2 flex-1 max-w-lg hidden md:block" style={{background:"${primary}"}} />
        </div>
        <div className="columns-1 md:columns-2 gap-8">
          ${items}
        </div>
      </div>
    </section>
  );
}`;
  }

  // ProjectsGrid — default
  const items = projects.map((p, i) => `
        <div key={${i}} className="group relative border overflow-hidden rounded-2xl" style={{borderColor:"var(--color-border)", background:"var(--color-card-bg)"}}>
          ${p.image ? `
          <div className="aspect-video w-full overflow-hidden border-b" style={{borderColor:"var(--color-border)"}}>
            <img src="${p.image}" alt="${p.title}" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>` : ""}
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2" style={{color:"var(--color-heading)"}}>${p.title}</h3>
            <p className="text-sm mb-6 line-clamp-3" style={{color:"var(--color-body)"}}>${p.description}</p>
            <div className="flex gap-4 text-sm font-medium">
              ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" rel="noreferrer" className="hover:underline" style={{color:"${primary}"}}>Live Demo</a>` : ""}
              ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" rel="noreferrer" className="hover:underline" style={{color:"var(--color-text-muted)"}}>Source Code</a>` : ""}
            </div>
          </div>
        </div>`).join("\n");

  return `
export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{ color: "${primary}" }}>Portfolio</span>
          <h2 className="text-4xl font-bold" style={{color:"var(--color-heading)"}}>Recent Projects</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          ${items}
        </div>
      </div>
    </section>
  );
}`;
};

module.exports = { getProjectsTemplate };
