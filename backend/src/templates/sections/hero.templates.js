/**
 * Hero section templates.
 * 5 variants: HeroCentered, HeroSplit, HeroGradient, HeroMinimal, HeroCreative
 */
const { buildSocialLinks } = require("../../utils/social-icons");

const getHeroTemplate = ({ blueprint, userInput, content }) => {
  const sectionDef = blueprint.sections.find((s) => s.type === "hero");
  const variant = sectionDef?.variant || "HeroCentered";
  const primary = blueprint.primaryColor;
  const secondary = blueprint.secondaryColor;
  const name = userInput.name;
  const title = userInput.title;

  let summary = content.heroSummary || content.tagline || `I'm a passionate ${title} dedicated to building exceptional experiences. Let's work together to create something amazing.`;

  const ctaText = content.ctaText || "View My Work";
  const ctaSecondary = content.ctaSecondaryText || "Contact Me";
  const profileImage = userInput.profileImage || "";
  const social = userInput.social || {};
  const dp = userInput.designPreferences || {};
  const animClass = dp.heroAnimation && dp.heroAnimation !== "none" ? `anim-${dp.heroAnimation}` : "";

  const socialLinks = (cls) => buildSocialLinks(social, cls, 20);

  const sectionTypes = blueprint.sections.map((s) => s.type);
  const ctaAnchor = sectionTypes.includes("projects") ? "#projects"
    : sectionTypes.includes("gallery") ? "#gallery"
    : sectionTypes.includes("services") ? "#services"
    : "#about";

  const avatar = (size = "28", rounded = "full") => profileImage
    ? `<div className="w-${size} h-${size} rounded-${rounded} overflow-hidden border-4 flex-shrink-0" style={{borderColor:"var(--color-primary)"}}>
          <img src="${profileImage}" alt="${name}" className="w-full h-full object-cover" />
        </div>`
    : `<div className="w-${size} h-${size} rounded-${rounded} flex items-center justify-center border-4 text-5xl font-bold flex-shrink-0" style={{borderColor:"var(--color-primary)",color:"var(--color-primary)",backgroundColor:"var(--color-card-bg)"}}>
          ${name.charAt(0)}
        </div>`;

  const hasSocial = Object.values(social).some((v) => v && v.trim());

  if (variant === "HeroSplit") {
    return `
export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="${animClass}">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm mb-6 border" style={{borderColor:"var(--color-primary)50", color:"var(--color-primary)"}}>
            <span>${title}</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight" style={{color:"var(--color-heading)"}}>
            Hi, I'm<br />
            <span style={{color:"var(--color-primary)"}}>${name}</span>
          </h1>
          <p className="text-lg mb-8 leading-relaxed max-w-lg" style={{color:"var(--color-text-muted)"}}>${summary}</p>
          <div className="flex gap-4 flex-wrap">
            <a href="${ctaAnchor}" className="px-6 py-3 rounded-xl font-semibold btn-primary transition-all hover:-translate-y-0.5">
              ${ctaText}
            </a>
            <a href="#contact" className="px-6 py-3 rounded-xl font-semibold border transition-colors hover:bg-white/5" style={{borderColor:"var(--color-border)", color:"var(--color-heading)"}}>
              ${ctaSecondary}
            </a>
          </div>
          ${hasSocial ? `<div className="flex gap-4 mt-8">
            ${socialLinks("transition-colors hover:opacity-80")}
          </div>` : ""}
        </div>
        <div className="flex justify-center md:justify-end">
          ${avatar("80", "3xl")}
        </div>
      </div>
    </section>
  );
}`;
  }

  if (variant === "HeroGradient") {
    return `
export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0" style={{background:"radial-gradient(ellipse at 20% 50%, ${primary}20 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, ${secondary}15 0%, transparent 50%)"}} />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20" style={{background:"${primary}"}} />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center ${animClass}">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8" style={{borderColor:"var(--color-border)",backgroundColor:"var(--color-card-bg)"}}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{backgroundColor:"${primary}"}} />
          <span className="text-sm font-medium" style={{color:"${primary}"}}>${title}</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight" style={{color:"var(--color-heading)"}}>
          ${name.split(" ")[0]}<br />
          <span style={{background:"linear-gradient(135deg, ${primary}, ${secondary})",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
            ${name.split(" ").slice(1).join(" ") || title}
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed" style={{color:"var(--color-text-muted)"}}>${summary}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="${ctaAnchor}" className="px-8 py-4 rounded-full font-semibold btn-primary transition-transform hover:scale-105">
            ${ctaText}
          </a>
          <a href="#contact" className="px-8 py-4 rounded-full font-semibold border transition-colors hover:bg-white/5" style={{borderColor:"var(--color-border)",color:"var(--color-heading)"}}>
            ${ctaSecondary}
          </a>
        </div>
        ${hasSocial ? `<div className="flex items-center justify-center gap-6 mt-12 flex-wrap">
          ${socialLinks("transition-colors hover:opacity-80")}
        </div>` : ""}
      </div>
    </section>
  );
}`;
  }

  if (variant === "HeroMinimal") {
    return `
export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-20 px-6">
      <div className="max-w-4xl mx-auto w-full ${animClass}">
        <p className="text-sm font-mono mb-6" style={{color:"${primary}"}}>// Hello, World</p>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" style={{color:"var(--color-heading)"}}>
          I'm <span style={{color:"${primary}"}}>${name}</span>.
        </h1>
        <h2 className="text-2xl md:text-3xl font-medium mb-8 leading-relaxed" style={{color:"var(--color-text-muted)"}}>${summary}</h2>
        <div className="flex gap-4 flex-wrap mt-10">
          <a href="${ctaAnchor}" className="px-6 py-3 rounded-none font-semibold text-sm transition-colors border-2" style={{borderColor:"var(--color-primary)", color:"var(--color-primary)"}}>
            ${ctaText} &rarr;
          </a>
          <a href="#contact" className="px-6 py-3 rounded-none font-semibold text-sm border-2 transition-colors hover:bg-white/5" style={{borderColor:"var(--color-border)",color:"var(--color-heading)"}}>
            ${ctaSecondary}
          </a>
        </div>
        ${hasSocial ? `<div className="flex gap-6 mt-12 text-sm flex-wrap">
          ${socialLinks("font-mono transition-colors hover:opacity-80")}
        </div>` : ""}
      </div>
    </section>
  );
}`;
  }

  if (variant === "HeroCreative") {
    return `
export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute top-20 right-20 w-64 h-64 border border-white/5 rounded-full" />
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-5 gap-12 items-center w-full">
        <div className="md:col-span-3 ${animClass}">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-px" style={{background:"${primary}"}} />
            <span className="text-sm font-medium uppercase tracking-widest" style={{color:"${primary}"}}>${title}</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-none tracking-tight" style={{color:"var(--color-heading)"}}>
            ${name.split(" ")[0]}
            <br />
            <span style={{WebkitTextStroke:"2px var(--color-heading)", color:"transparent"}}>${name.split(" ").slice(1).join(" ") || "Creative"}</span>
          </h1>
          <p className="text-xl leading-relaxed mb-10 max-w-xl" style={{color:"var(--color-text-muted)"}}>${summary}</p>
          <div className="flex gap-4 flex-wrap">
            <a href="${ctaAnchor}" className="group px-8 py-4 rounded-2xl font-semibold btn-primary transition-all hover:-translate-y-1 shadow-lg">
              ${ctaText} ↗
            </a>
          </div>
        </div>
        <div className="md:col-span-2 flex justify-center">
          ${avatar("80", "3xl")}
        </div>
      </div>
    </section>
  );
}`;
  }

  // HeroCentered (Default)
  return `
export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center pt-20 px-6">
      ${avatar("32", "full")}
      <div className="mt-8 max-w-4xl ${animClass}">
        <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{color:"var(--color-heading)"}}>${name}</h1>
        <p className="text-xl md:text-2xl mb-6 font-medium" style={{color:"${primary}"}}>${title}</p>
        <p className="mx-auto mb-10 text-lg md:text-xl leading-relaxed" style={{color:"var(--color-text-muted)"}}>${summary}</p>
        <div className="flex gap-4 flex-wrap justify-center">
          <a href="${ctaAnchor}" className="px-8 py-4 rounded-full font-bold btn-primary shadow-lg hover:shadow-xl transition-shadow">
            ${ctaText}
          </a>
          <a href="#contact" className="px-8 py-4 rounded-full font-bold border-2 transition-colors hover:bg-white/5" style={{borderColor:"var(--color-border)", color:"var(--color-heading)"}}>
            ${ctaSecondary}
          </a>
        </div>
        ${hasSocial ? `<div className="flex gap-6 mt-12 justify-center flex-wrap">
          ${socialLinks("transition-colors hover:opacity-80 scale-125")}
        </div>` : ""}
      </div>
    </section>
  );
}`;
};

module.exports = { getHeroTemplate };
