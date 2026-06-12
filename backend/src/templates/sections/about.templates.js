/**
 * About section templates.
 * 5 variants: AboutCard, AboutTimeline, AboutSplit, AboutMinimal, AboutGrid
 */
const getAboutTemplate = ({ blueprint, userInput, content }) => {
  const sectionDef = blueprint.sections.find((s) => s.type === "about");
  const variant = sectionDef?.variant || "AboutCard";
  const primary = blueprint.primaryColor || "#6366f1";
  
  // We use the bio as the main text
  const bio = userInput.bio || "I'm a professional dedicated to my craft, bringing years of experience and a passion for excellence.";
  const name = userInput.name || "there";
  const location = userInput.location || "";
  const email = userInput.email || "";

  // AboutSplit
  if (variant === "AboutSplit") {
    return `
export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{ color: "${primary}" }}>About Me</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-8" style={{color:"var(--color-heading)"}}>A little about who I am.</h2>
          <div className="w-16 h-1 mb-8" style={{ background: "${primary}" }} />
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-6" style={{color:"var(--color-body)"}}>${bio}</p>
          <div className="flex flex-col sm:flex-row gap-6 mt-8 p-6 rounded-2xl border" style={{ borderColor: "var(--color-border)", background: "var(--color-card-bg)" }}>
            ${location ? `<div><p className="text-sm font-bold" style={{color:"var(--color-heading)"}}>Location</p><p className="text-sm" style={{color:"var(--color-text-muted)"}}>${location}</p></div>` : ""}
            ${email ? `<div><p className="text-sm font-bold" style={{color:"var(--color-heading)"}}>Email</p><a href="mailto:${email}" className="text-sm" style={{color:"var(--color-text-muted)"}}>${email}</a></div>` : ""}
          </div>
        </div>
      </div>
    </section>
  );
}`;
  }

  // AboutTimeline
  if (variant === "AboutTimeline") {
    return `
export default function About() {
  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{ color: "${primary}" }}>My Story</span>
          <h2 className="text-4xl font-bold" style={{color:"var(--color-heading)"}}>About ${name.split(" ")[0]}</h2>
        </div>
        <div className="relative pl-8 border-l-2" style={{ borderColor: "${primary}40" }}>
          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full" style={{ background: "${primary}" }} />
          <div className="pb-8">
            <h3 className="text-xl font-bold mb-4" style={{color:"var(--color-heading)"}}>Introduction</h3>
            <p className="text-lg leading-relaxed" style={{color:"var(--color-body)"}}>${bio}</p>
          </div>
        </div>
      </div>
    </section>
  );
}`;
  }

  // AboutMinimal
  if (variant === "AboutMinimal") {
    return `
export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-sm font-mono mb-8 uppercase tracking-widest" style={{ color: "${primary}" }}>[ About Me ]</h2>
        <p className="text-2xl md:text-3xl leading-relaxed font-medium" style={{color:"var(--color-heading)"}}>
          ${bio}
        </p>
      </div>
    </section>
  );
}`;
  }

  // AboutGrid
  if (variant === "AboutGrid") {
    return `
export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12" style={{color:"var(--color-heading)"}}>About Me<span style={{color:"${primary}"}}>.</span></h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 p-8 md:p-10 rounded-3xl border" style={{ borderColor: "var(--color-border)", background: "var(--color-card-bg)" }}>
            <p className="text-xl leading-relaxed" style={{color:"var(--color-body)"}}>${bio}</p>
          </div>
          <div className="flex flex-col gap-6">
            ${location ? `<div className="p-8 rounded-3xl border flex flex-col justify-center" style={{ borderColor: "var(--color-border)", background: "var(--color-card-bg)" }}><span className="text-3xl mb-4">🌍</span><h3 className="font-bold mb-1" style={{color:"var(--color-heading)"}}>Based in</h3><p style={{color:"var(--color-text-muted)"}}>${location}</p></div>` : ""}
            ${email ? `<div className="p-8 rounded-3xl border flex flex-col justify-center" style={{ borderColor: "var(--color-border)", background: "var(--color-card-bg)" }}><span className="text-3xl mb-4">✉️</span><h3 className="font-bold mb-1" style={{color:"var(--color-heading)"}}>Contact</h3><p style={{color:"var(--color-text-muted)"}} className="truncate">${email}</p></div>` : ""}
          </div>
        </div>
      </div>
    </section>
  );
}`;
  }

  // AboutCard - Default
  return `
export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="p-10 md:p-16 rounded-3xl border text-center shadow-2xl relative overflow-hidden" style={{ borderColor: "var(--color-border)", background: "var(--color-card-bg)" }}>
          <div className="absolute top-0 left-0 w-full h-2" style={{background: "linear-gradient(90deg, ${primary}, transparent)"}} />
          <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{ color: "${primary}" }}>Biography</span>
          <h2 className="text-4xl font-bold mb-8" style={{color:"var(--color-heading)"}}>Hello, I'm ${name}</h2>
          <p className="text-lg leading-relaxed mb-8 max-w-2xl mx-auto" style={{color:"var(--color-body)"}}>${bio}</p>
          <div className="flex flex-wrap justify-center gap-8 pt-8 border-t" style={{borderColor:"var(--color-border)"}}>
            ${location ? `<div className="text-center"><p className="text-xs uppercase tracking-wider mb-1" style={{color:"var(--color-text-muted)"}}>Location</p><p className="font-medium" style={{color:"var(--color-heading)"}}>${location}</p></div>` : ""}
            ${email ? `<div className="text-center"><p className="text-xs uppercase tracking-wider mb-1" style={{color:"var(--color-text-muted)"}}>Email</p><a href="mailto:${email}" className="font-medium hover:underline" style={{color:"var(--color-heading)"}}>${email}</a></div>` : ""}
          </div>
        </div>
      </div>
    </section>
  );
}`;
};

module.exports = { getAboutTemplate };
