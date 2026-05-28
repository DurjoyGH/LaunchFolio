/**
 * About section templates.
 * 4 variants: AboutCard, AboutTimeline, AboutSplit, AboutMinimal
 */
const getAboutTemplate = ({ blueprint, userInput, content }) => {
  const { variant } = blueprint.sections.find((s) => s.type === "about") || { variant: "AboutCard" };
  const name = userInput.name;
  const bio = content.bio || userInput.bio || `I'm ${name}, a passionate developer.`;
  const heading = content.aboutHeading || "About Me";
  const subtext = content.aboutSubtext || "";
  const profileImage = userInput.profileImage || "";
  const social = userInput.social || {};

  const socialBtns = (cls = "px-4 py-2 rounded-lg text-sm border border-white/10 text-gray-300 hover:border-white/30 transition-colors") => {
    const links = [];
    if (social.github) links.push(`<a href="${social.github}" target="_blank" className="flex items-center gap-2 ${cls}"><Github className="w-4 h-4" /><span>GitHub</span></a>`);
    if (social.linkedin) links.push(`<a href="${social.linkedin}" target="_blank" className="flex items-center gap-2 ${cls}"><Linkedin className="w-4 h-4" /><span>LinkedIn</span></a>`);
    if (social.twitter) links.push(`<a href="${social.twitter}" target="_blank" className="flex items-center gap-2 ${cls}"><Twitter className="w-4 h-4" /><span>Twitter</span></a>`);
    return links.join("\n            ");
  };

  const socialImports = Object.keys(social).length ? `import { Github, Linkedin, Twitter } from "lucide-react";` : "";

  // AboutTimeline — experience-style
  if (variant === "AboutTimeline") {
    return `
${socialImports}

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-px" style={{ background: "var(--color-primary)" }} />
          <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "var(--color-primary)" }}>About</span>
        </div>
        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold text-white mb-4">${heading}</h2>
            <p className="text-gray-500 text-sm leading-relaxed">${subtext}</p>
            <div className="flex flex-col gap-3 mt-6">
              ${socialBtns("text-sm text-gray-500 hover:text-white transition-colors")}
            </div>
          </div>
          <div className="md:col-span-3">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">${bio}</p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-4 rounded-2xl border border-white/5" style={{ background: "var(--color-card-bg)" }}>
                <span className="text-2xl font-bold text-white">${userInput.skills?.length || 0}+</span>
                <p className="text-xs text-gray-500 mt-1">Technologies</p>
              </div>
              <div className="p-4 rounded-2xl border border-white/5" style={{ background: "var(--color-card-bg)" }}>
                <span className="text-2xl font-bold text-white">${userInput.projects?.length || 0}+</span>
                <p className="text-xs text-gray-500 mt-1">Projects</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}`;
  }

  // AboutSplit — image + text side by side
  if (variant === "AboutSplit") {
    return `
${socialImports}

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{ color: "var(--color-primary)" }}>About Me</span>
            <h2 className="text-4xl font-bold text-white mb-6">${heading}</h2>
            <p className="text-gray-400 leading-relaxed mb-6">${bio}</p>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">${subtext}</p>
            <div className="flex gap-4 flex-wrap">
              ${socialBtns()}
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            ${profileImage
              ? `<div className="relative">
                <div className="w-80 h-80 rounded-3xl overflow-hidden">
                  <img src="${profileImage}" alt="${name}" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl" style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))", opacity: 0.6 }} />
              </div>`
              : `<div className="w-80 h-80 rounded-3xl flex items-center justify-center border border-white/10" style={{ background: "var(--color-card-bg)" }}>
                <span className="text-9xl font-bold" style={{ color: "var(--color-primary)", opacity: 0.3 }}>${name.charAt(0)}</span>
              </div>`
            }
          </div>
        </div>
      </div>
    </section>
  );
}`;
  }

  // AboutMinimal — just text, editorial style
  if (variant === "AboutMinimal") {
    return `
${socialImports}

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <p className="text-sm font-mono mb-6" style={{ color: "var(--color-primary)" }}>// about</p>
        <h2 className="text-3xl font-bold text-white mb-8">${heading}</h2>
        <div className="space-y-4 text-gray-400 leading-relaxed text-lg">
          <p>${bio}</p>
          ${subtext ? `<p className="text-gray-500">${subtext}</p>` : ""}
        </div>
        <div className="flex gap-6 mt-10 pt-8 border-t border-white/5 flex-wrap">
          ${socialBtns("text-sm text-gray-600 hover:text-white font-mono transition-colors")}
        </div>
      </div>
    </section>
  );
}`;
  }

  // AboutCard — default, centered card
  return `
${socialImports}

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{ color: "var(--color-primary)" }}>About Me</span>
        <h2 className="text-4xl font-bold text-white mb-6">${heading}</h2>
        <p className="text-gray-400 leading-relaxed mb-8 max-w-2xl mx-auto">${bio}</p>
        ${subtext ? `<p className="text-gray-500 mb-12">${subtext}</p>` : ""}
        <div className="flex flex-wrap gap-4 justify-center">
          ${socialBtns("px-5 py-2.5 rounded-full border border-white/10 text-gray-300 hover:border-white/30 transition-all hover:-translate-y-0.5")}
        </div>
      </div>
    </section>
  );
}`;
};

module.exports = { getAboutTemplate };
