/**
 * Hero section templates.
 * Three variants: HeroOne (centered), HeroTwo (split), HeroThree (full-screen gradient)
 */

const getHeroTemplate = ({ blueprint, userInput, content }) => {
  const { variant } = blueprint.sections.find((s) => s.type === "hero") || { variant: "HeroOne" };
  const primary = blueprint.primaryColor;
  const secondary = blueprint.secondaryColor;
  const name = userInput.name;
  const title = userInput.title;
  const tagline = content.tagline || title;
  const bio = content.bio || userInput.bio || "";
  const ctaText = content.ctaText || "View My Work";
  const ctaSecondaryText = content.ctaSecondaryText || "Contact Me";
  const profileImage = userInput.profileImage || "";
  const social = userInput.social || {};

  if (variant === "HeroThree") {
    return `
export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, ${primary}20, ${secondary}10, transparent)" }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8" style={{ borderColor: "${primary}50", backgroundColor: "${primary}10" }}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "${primary}" }} />
          <span className="text-sm font-medium" style={{ color: "${primary}" }}>Available for work</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
          ${name.split(" ")[0]}<br />
          <span style={{ background: "linear-gradient(135deg, ${primary}, ${secondary})", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            ${name.split(" ").slice(1).join(" ") || name.split(" ")[0]}
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-4">${tagline}</p>
        <p className="text-gray-400 max-w-2xl mx-auto mb-10">${bio}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#projects" className="px-8 py-4 rounded-full font-semibold text-white transition-transform hover:scale-105" style={{ background: "linear-gradient(135deg, ${primary}, ${secondary})" }}>
            ${ctaText}
          </a>
          <a href="#contact" className="px-8 py-4 rounded-full font-semibold text-white border border-white/20 hover:bg-white/10 transition-colors">
            ${ctaSecondaryText}
          </a>
        </div>
        <div className="flex items-center justify-center gap-6 mt-12">
          ${social.github ? `<a href="${social.github}" target="_blank" className="text-gray-400 hover:text-white transition-colors">GitHub</a>` : ""}
          ${social.linkedin ? `<a href="${social.linkedin}" target="_blank" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>` : ""}
          ${social.twitter ? `<a href="${social.twitter}" target="_blank" className="text-gray-400 hover:text-white transition-colors">Twitter</a>` : ""}
        </div>
      </div>
    </section>
  );
}
`;
  }

  if (variant === "HeroTwo") {
    return `
export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm mb-6" style={{ backgroundColor: "${primary}15", color: "${primary}" }}>
            <span>${title}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Hi, I'm<br />
            <span style={{ color: "${primary}" }}>${name}</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">${bio}</p>
          <div className="flex gap-4 flex-wrap">
            <a href="#projects" className="px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 hover:-translate-y-0.5" style={{ backgroundColor: "${primary}" }}>
              ${ctaText}
            </a>
            <a href="#contact" className="px-6 py-3 rounded-xl font-semibold text-gray-300 border border-white/10 hover:border-white/30 transition-colors">
              ${ctaSecondaryText}
            </a>
          </div>
          <div className="flex gap-4 mt-8">
            ${social.github ? `<a href="${social.github}" target="_blank" className="text-gray-500 hover:text-white text-sm transition-colors">GitHub →</a>` : ""}
            ${social.linkedin ? `<a href="${social.linkedin}" target="_blank" className="text-gray-500 hover:text-white text-sm transition-colors">LinkedIn →</a>` : ""}
          </div>
        </div>
        <div className="flex justify-center">
          ${
            profileImage
              ? `<div className="relative w-72 h-72 rounded-2xl overflow-hidden border-2" style={{ borderColor: "${primary}40" }}>
              <img src="${profileImage}" alt="${name}" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, ${primary}20)" }} />
            </div>`
              : `<div className="w-72 h-72 rounded-2xl flex items-center justify-center border-2" style={{ borderColor: "${primary}30", background: "linear-gradient(135deg, ${primary}10, ${secondary}10)" }}>
              <span className="text-8xl font-bold" style={{ color: "${primary}40" }}>${name.charAt(0)}</span>
            </div>`
          }
        </div>
      </div>
    </section>
  );
}
`;
  }

  // HeroOne — centered minimal
  return `
export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center pt-20 px-6">
      ${
        profileImage
          ? `<div className="w-28 h-28 rounded-full overflow-hidden border-4 mb-8" style={{ borderColor: "${primary}" }}>
          <img src="${profileImage}" alt="${name}" className="w-full h-full object-cover" />
        </div>`
          : `<div className="w-28 h-28 rounded-full flex items-center justify-center border-4 mb-8 text-5xl font-bold" style={{ borderColor: "${primary}", color: "${primary}", backgroundColor: "${primary}15" }}>
          ${name.charAt(0)}
        </div>`
      }
      <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">${name}</h1>
      <p className="text-xl text-gray-300 mb-2">${title}</p>
      <p className="text-gray-400 max-w-xl mb-8">${bio}</p>
      <div className="flex gap-4 flex-wrap justify-center">
        <a href="#projects" className="px-6 py-3 rounded-full font-semibold text-white" style={{ backgroundColor: "${primary}" }}>
          ${ctaText}
        </a>
        <a href="#contact" className="px-6 py-3 rounded-full text-gray-300 border border-gray-700 hover:border-gray-500 transition-colors">
          ${ctaSecondaryText}
        </a>
      </div>
    </section>
  );
}
`;
};

module.exports = { getHeroTemplate };
