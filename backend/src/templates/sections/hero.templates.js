/**
 * Hero section templates.
 * 6 variants: HeroCentered, HeroSplit, HeroGradient, HeroMinimal, HeroCreative, HeroGrid
 */
const getHeroTemplate = ({ blueprint, userInput, content }) => {
  const { variant } = blueprint.sections.find((s) => s.type === "hero") || { variant: "HeroCentered" };
  const primary = blueprint.primaryColor;
  const secondary = blueprint.secondaryColor;
  const name = userInput.name;
  const title = userInput.title;
  const tagline = content.tagline || title;
  const bio = content.bio || userInput.bio || "";
  const ctaText = content.ctaText || "View My Work";
  const ctaSecondary = content.ctaSecondaryText || "Contact Me";
  const profileImage = userInput.profileImage || "";
  const social = userInput.social || {};
  const dp = userInput.designPreferences || {};
  const animClass = dp.heroAnimation !== "none" ? `anim-${dp.heroAnimation}` : "";

  // Helper for generating social links with Lucide icons
  const socialLinks = (cls = "text-gray-400 hover:text-white transition-colors") => {
    const links = [];
    if (social.github) links.push(`<a href="${social.github}" target="_blank" className="flex items-center gap-2 ${cls}"><Github className="w-5 h-5" /><span>GitHub</span></a>`);
    if (social.linkedin) links.push(`<a href="${social.linkedin}" target="_blank" className="flex items-center gap-2 ${cls}"><Linkedin className="w-5 h-5" /><span>LinkedIn</span></a>`);
    if (social.twitter) links.push(`<a href="${social.twitter}" target="_blank" className="flex items-center gap-2 ${cls}"><Twitter className="w-5 h-5" /><span>Twitter</span></a>`);
    return links.join("\n            ");
  };

  const socialImports = Object.keys(social).length ? `import { Github, Linkedin, Twitter } from "lucide-react";` : "";

  const avatar = (size = "28", rounded = "full") => profileImage
    ? `<div className="w-${size} h-${size} rounded-${rounded} overflow-hidden border-4 flex-shrink-0" style={{ borderColor: "var(--color-primary)" }}>
          <img src="${profileImage}" alt="${name}" className="w-full h-full object-cover" />
        </div>`
    : `<div className="w-${size} h-${size} rounded-${rounded} flex items-center justify-center border-4 text-5xl font-bold flex-shrink-0" style={{ borderColor: "var(--color-primary)", color: "var(--color-primary)", backgroundColor: "var(--color-card-bg)" }}>
          ${name.charAt(0)}
        </div>`;

  // HeroSplit — image left, text right
  if (variant === "HeroSplit") {
    return `
${socialImports}

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="${animClass}">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm mb-6" style={{ backgroundColor: "var(--color-card-bg)", color: "var(--color-primary)" }}>
            <span>${title}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Hi, I'm<br />
            <span style={{ color: "var(--color-primary)" }}>${name}</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">${bio}</p>
          <div className="flex gap-4 flex-wrap">
            <a href="#projects" className="px-6 py-3 rounded-xl font-semibold btn-primary transition-all hover:opacity-90 hover:-translate-y-0.5">
              ${ctaText}
            </a>
            <a href="#contact" className="px-6 py-3 rounded-xl font-semibold text-gray-300 border border-white/10 hover:border-white/30 transition-colors">
              ${ctaSecondary}
            </a>
          </div>
          <div className="flex gap-4 mt-8">
            ${socialLinks("text-gray-500 hover:text-white text-sm transition-colors")}
          </div>
        </div>
        <div className="flex justify-center">
          ${avatar("72", "2xl")}
        </div>
      </div>
    </section>
  );
}`;
  }

  // HeroGradient — full-screen immersive
  if (variant === "HeroGradient") {
    return `
${socialImports}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 50%, var(--color-primary)20 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, var(--color-secondary)15 0%, transparent 50%)" }} />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: "var(--color-primary)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl opacity-10" style={{ background: "var(--color-secondary)" }} />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center ${animClass}">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card-bg)" }}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "var(--color-primary)" }} />
          <span className="text-sm font-medium" style={{ color: "var(--color-primary)" }}>Available for work</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
          ${name.split(" ")[0]}<br />
          <span style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            ${name.split(" ").slice(1).join(" ") || title}
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-4">${tagline}</p>
        <p className="text-gray-400 max-w-2xl mx-auto mb-10">${bio}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#projects" className="px-8 py-4 rounded-full font-semibold btn-primary transition-transform hover:scale-105">
            ${ctaText}
          </a>
          <a href="#contact" className="px-8 py-4 rounded-full font-semibold text-white border border-white/20 hover:border-white/40 transition-colors">
            ${ctaSecondary}
          </a>
        </div>
        <div className="flex items-center justify-center gap-6 mt-12 flex-wrap">
          ${socialLinks()}
        </div>
      </div>
    </section>
  );
}`;
  }

  // HeroMinimal — developer-style, clean
  if (variant === "HeroMinimal") {
    return `
${socialImports}

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-20 px-6">
      <div className="max-w-3xl mx-auto ${animClass}">
        <p className="text-sm font-mono mb-4" style={{ color: "var(--color-primary)" }}>// Hello, World</p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          I'm <span style={{ color: "var(--color-primary)" }}>${name}</span>,
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-500 mb-8">${tagline}</h2>
        <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl">${bio}</p>
        <div className="flex gap-4 flex-wrap">
          <a href="#projects" className="px-5 py-2.5 rounded-lg font-medium text-sm btn-primary transition-colors">
            ${ctaText} →
          </a>
          <a href="#contact" className="px-5 py-2.5 rounded-lg font-medium text-sm text-gray-400 border border-white/10 hover:border-white/30 transition-colors">
            ${ctaSecondary}
          </a>
        </div>
        <div className="flex gap-6 mt-10 text-sm flex-wrap">
          ${socialLinks("text-gray-600 hover:text-gray-300 font-mono transition-colors")}
        </div>
      </div>
    </section>
  );
}`;
  }

  // HeroCreative — asymmetric with decorative elements
  if (variant === "HeroCreative") {
    return `
${socialImports}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute top-20 right-20 w-64 h-64 border border-white/5 rounded-full" />
      <div className="absolute bottom-40 right-40 w-32 h-32 border border-white/5 rounded-full" />
      <div className="absolute top-40 right-1/3 w-3 h-3 rounded-full" style={{ background: "var(--color-primary)" }} />
      <div className="absolute bottom-1/3 left-20 w-2 h-2 rounded-full" style={{ background: "var(--color-secondary)" }} />
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-5 gap-12 items-center">
        <div className="md:col-span-3 ${animClass}">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-px" style={{ background: "var(--color-primary)" }} />
            <span className="text-sm font-medium uppercase tracking-widest" style={{ color: "var(--color-primary)" }}>${title}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-none tracking-tight">
            ${name.split(" ")[0]}
            <br />
            <span className="text-gray-600">${name.split(" ").slice(1).join(" ") || "Developer"}</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg">${bio}</p>
          <div className="flex gap-4 flex-wrap">
            <a href="#projects" className="group px-8 py-4 rounded-2xl font-semibold btn-primary transition-all hover:-translate-y-1">
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

  // HeroGrid — card-based with stats
  if (variant === "HeroGrid") {
    const skillCount = userInput.skills?.length || 0;
    const projectCount = userInput.projects?.length || 0;
    return `
${socialImports}

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-24 px-6">
      <div className="max-w-6xl mx-auto w-full ${animClass}">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 p-8 md:p-12 rounded-3xl border border-white/5" style={{ background: "var(--color-card-bg)" }}>
            <p className="text-sm font-medium mb-4" style={{ color: "var(--color-primary)" }}>${title}</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">${name}</h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl">${bio}</p>
            <div className="flex gap-4 flex-wrap">
              <a href="#projects" className="px-6 py-3 rounded-xl font-semibold btn-primary transition-all hover:opacity-90">${ctaText}</a>
              <a href="#contact" className="px-6 py-3 rounded-xl font-semibold text-gray-300 border border-white/10 hover:border-white/30 transition-colors">${ctaSecondary}</a>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex-1 p-6 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center" style={{ background: "var(--color-card-bg)" }}>
              <span className="text-4xl font-bold text-white mb-1">${projectCount}+</span>
              <span className="text-sm text-gray-500">Projects Built</span>
            </div>
            <div className="flex-1 p-6 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center" style={{ background: "var(--color-card-bg)" }}>
              <span className="text-4xl font-bold text-white mb-1">${skillCount}+</span>
              <span className="text-sm text-gray-500">Technologies</span>
            </div>
          </div>
        </div>
        <div className="flex gap-6 mt-8 flex-wrap">
          ${socialLinks("text-gray-600 hover:text-white text-sm transition-colors")}
        </div>
      </div>
    </section>
  );
}`;
  }

  // HeroCentered — default
  return `
${socialImports}

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center pt-20 px-6">
      ${avatar("28", "full")}
      <div className="mt-8 ${animClass}">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">${name}</h1>
        <p className="text-xl text-gray-300 mb-2">${title}</p>
        <p className="text-gray-400 max-w-xl mx-auto mb-8">${bio}</p>
        <div className="flex gap-4 flex-wrap justify-center">
          <a href="#projects" className="px-6 py-3 rounded-full font-semibold btn-primary">
            ${ctaText}
          </a>
          <a href="#contact" className="px-6 py-3 rounded-full text-gray-300 border border-white/10 hover:border-white/30 transition-colors">
            ${ctaSecondary}
          </a>
        </div>
        <div className="flex gap-6 mt-8 justify-center flex-wrap">
          ${socialLinks("text-gray-600 hover:text-white transition-colors")}
        </div>
      </div>
    </section>
  );
}`;
};

module.exports = { getHeroTemplate };
