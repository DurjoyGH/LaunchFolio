/**
 * Hero section templates.
 * 6 variants: HeroCentered, HeroSplit, HeroGradient, HeroMinimal, HeroCreative, HeroGrid
 *
 * RULE: Hero shows TAGLINE (1-2 lines based on role/title), NOT the full bio.
 * Full bio belongs in the About section only.
 */

// Dynamic social link builder supporting all platform keys
const SOCIAL_META = {
  github:    { label: "GitHub",    emoji: "🐙" },
  linkedin:  { label: "LinkedIn",  emoji: "🔗" },
  twitter:   { label: "X",         emoji: "𝕏"  },
  website:   { label: "Website",   emoji: "🌐" },
  facebook:  { label: "Facebook",  emoji: "📘" },
  instagram: { label: "Instagram", emoji: "📸" },
  youtube:   { label: "YouTube",   emoji: "▶️" },
  tiktok:    { label: "TikTok",    emoji: "🎵" },
  snapchat:  { label: "Snapchat",  emoji: "👻" },
  pinterest: { label: "Pinterest", emoji: "📌" },
  threads:   { label: "Threads",   emoji: "🧵" },
};

const getHeroTemplate = ({ blueprint, userInput, content }) => {
  const sectionDef = blueprint.sections.find((s) => s.type === "hero");
  const variant = sectionDef?.variant || "HeroCentered";
  const primary = blueprint.primaryColor;
  const secondary = blueprint.secondaryColor;
  const name = userInput.name;
  const title = userInput.title;

  // RULE: tagline is short (1-2 lines based on role/position), NOT the full bio
  const tagline = content.tagline || title;

  // For HeroSplit/HeroCreative/HeroGrid that show a short description line,
  // use a CONDENSED version — just the title/role, never the full bio paragraph.
  const roleSubtext = `${title}${userInput.location ? ` · ${userInput.location}` : ""}`;

  const ctaText = content.ctaText || "View My Work";
  const ctaSecondary = content.ctaSecondaryText || "Contact Me";
  const profileImage = userInput.profileImage || "";
  const social = userInput.social || {};
  const dp = userInput.designPreferences || {};
  const animClass = dp.heroAnimation && dp.heroAnimation !== "none" ? `anim-${dp.heroAnimation}` : "";

  // Build social links dynamically
  const buildSocialLinks = (cls) => {
    const links = [];
    for (const [key, url] of Object.entries(social)) {
      if (!url || !url.trim()) continue;
      const meta = SOCIAL_META[key] || { label: key, emoji: "🔗" };
      links.push(`<a href="${url}" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 ${cls}"><span>${meta.emoji}</span><span>${meta.label}</span></a>`);
    }
    return links.join("\n            ");
  };

  // Determine a good CTA anchor from blueprint
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

  // HeroSplit — image right, text left
  if (variant === "HeroSplit") {
    return `
export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="${animClass}">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm mb-6" style={{backgroundColor:"var(--color-card-bg)",color:"var(--color-primary)"}}>
            <span>${title}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{color:"var(--color-heading)"}}>
            Hi, I'm<br />
            <span style={{color:"var(--color-primary)"}}>${name}</span>
          </h1>
          <p className="text-lg mb-8 leading-relaxed" style={{color:"var(--color-text-muted)"}}>${tagline}</p>
          <div className="flex gap-4 flex-wrap">
            <a href="${ctaAnchor}" className="px-6 py-3 rounded-xl font-semibold btn-primary transition-all hover:opacity-90 hover:-translate-y-0.5">
              ${ctaText}
            </a>
            <a href="#contact" className="px-6 py-3 rounded-xl font-semibold border border-white/10 hover:border-white/30 transition-colors" style={{color:"var(--color-text-muted)"}}>
              ${ctaSecondary}
            </a>
          </div>
          ${hasSocial ? `<div className="flex gap-4 mt-8">
            ${buildSocialLinks("text-sm transition-colors hover:opacity-80")}
          </div>` : ""}
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
export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0" style={{background:"radial-gradient(ellipse at 20% 50%, ${primary}20 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, ${secondary}15 0%, transparent 50%)"}} />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20" style={{background:"${primary}"}} />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl opacity-10" style={{background:"${secondary}"}} />
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
        <p className="text-xl md:text-2xl mb-10" style={{color:"var(--color-text-muted)"}}>${tagline}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="${ctaAnchor}" className="px-8 py-4 rounded-full font-semibold btn-primary transition-transform hover:scale-105">
            ${ctaText}
          </a>
          <a href="#contact" className="px-8 py-4 rounded-full font-semibold border border-white/20 hover:border-white/40 transition-colors" style={{color:"var(--color-text-muted)"}}>
            ${ctaSecondary}
          </a>
        </div>
        ${hasSocial ? `<div className="flex items-center justify-center gap-6 mt-12 flex-wrap">
          ${buildSocialLinks("transition-colors hover:opacity-80")}
        </div>` : ""}
      </div>
    </section>
  );
}`;
  }

  // HeroMinimal — developer-style, clean
  if (variant === "HeroMinimal") {
    return `
export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-20 px-6">
      <div className="max-w-3xl mx-auto ${animClass}">
        <p className="text-sm font-mono mb-4" style={{color:"${primary}"}}>// Hello, World</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight" style={{color:"var(--color-heading)"}}>
          I'm <span style={{color:"${primary}"}}>${name}</span>,
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{color:"var(--color-text-muted)"}}>${tagline}</h2>
        <div className="flex gap-4 flex-wrap">
          <a href="${ctaAnchor}" className="px-5 py-2.5 rounded-lg font-medium text-sm btn-primary transition-colors">
            ${ctaText} →
          </a>
          <a href="#contact" className="px-5 py-2.5 rounded-lg font-medium text-sm border border-white/10 hover:border-white/30 transition-colors" style={{color:"var(--color-text-muted)"}}>
            ${ctaSecondary}
          </a>
        </div>
        ${hasSocial ? `<div className="flex gap-6 mt-10 text-sm flex-wrap">
          ${buildSocialLinks("font-mono transition-colors hover:opacity-80")}
        </div>` : ""}
      </div>
    </section>
  );
}`;
  }

  // HeroCreative — asymmetric with decorative elements
  if (variant === "HeroCreative") {
    return `
export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute top-20 right-20 w-64 h-64 border border-white/5 rounded-full" />
      <div className="absolute bottom-40 right-40 w-32 h-32 border border-white/5 rounded-full" />
      <div className="absolute top-40 right-1/3 w-3 h-3 rounded-full" style={{background:"${primary}"}} />
      <div className="absolute bottom-1/3 left-20 w-2 h-2 rounded-full" style={{background:"${secondary}"}} />
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-5 gap-12 items-center">
        <div className="md:col-span-3 ${animClass}">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-px" style={{background:"${primary}"}} />
            <span className="text-sm font-medium uppercase tracking-widest" style={{color:"${primary}"}}>${title}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-none tracking-tight" style={{color:"var(--color-heading)"}}>
            ${name.split(" ")[0]}
            <br />
            <span style={{color:"var(--color-text-muted)"}}>${name.split(" ").slice(1).join(" ") || ""}</span>
          </h1>
          <p className="text-lg leading-relaxed mb-8 max-w-lg" style={{color:"var(--color-text-muted)"}}>${tagline}</p>
          <div className="flex gap-4 flex-wrap">
            <a href="${ctaAnchor}" className="group px-8 py-4 rounded-2xl font-semibold btn-primary transition-all hover:-translate-y-1">
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

  // HeroGrid — card-based layout
  if (variant === "HeroGrid") {
    const sectionCount = blueprint.sections.filter((s) => !["navbar", "footer"].includes(s.type)).length;
    return `
export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-24 px-6">
      <div className="max-w-6xl mx-auto w-full ${animClass}">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 p-8 md:p-12 rounded-3xl border border-white/5" style={{background:"var(--color-card-bg)"}}>
            <p className="text-sm font-medium mb-4" style={{color:"${primary}"}}>${title}</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{color:"var(--color-heading)"}}>${name}</h1>
            <p className="text-lg leading-relaxed mb-8 max-w-xl" style={{color:"var(--color-text-muted)"}}>${tagline}</p>
            <div className="flex gap-4 flex-wrap">
              <a href="${ctaAnchor}" className="px-6 py-3 rounded-xl font-semibold btn-primary transition-all hover:opacity-90">${ctaText}</a>
              <a href="#contact" className="px-6 py-3 rounded-xl font-semibold border border-white/10 hover:border-white/30 transition-colors" style={{color:"var(--color-text-muted)"}}>${ctaSecondary}</a>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex-1 p-6 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center" style={{background:"var(--color-card-bg)"}}>
              <span className="text-4xl font-bold mb-1" style={{color:"var(--color-heading)"}}>${sectionCount}</span>
              <span className="text-sm" style={{color:"var(--color-text-muted)"}}>Sections</span>
            </div>
            <div className="flex-1 p-6 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center" style={{background:"var(--color-card-bg)"}}>
              <span className="text-2xl mb-1">${profileImage ? "📸" : "👤"}</span>
              <span className="text-sm" style={{color:"var(--color-text-muted)"}}>${userInput.location || "Available"}</span>
            </div>
          </div>
        </div>
        ${hasSocial ? `<div className="flex gap-6 mt-8 flex-wrap">
          ${buildSocialLinks("text-sm transition-colors hover:opacity-80")}
        </div>` : ""}
      </div>
    </section>
  );
}`;
  }

  // HeroCentered — default
  return `
export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center pt-20 px-6">
      ${avatar("28", "full")}
      <div className="mt-8 ${animClass}">
        <h1 className="text-5xl md:text-7xl font-bold mb-4" style={{color:"var(--color-heading)"}}>${name}</h1>
        <p className="text-xl mb-2" style={{color:"${primary}"}}>${title}</p>
        <p className="max-w-xl mx-auto mb-8 text-lg" style={{color:"var(--color-text-muted)"}}>${tagline}</p>
        <div className="flex gap-4 flex-wrap justify-center">
          <a href="${ctaAnchor}" className="px-6 py-3 rounded-full font-semibold btn-primary">
            ${ctaText}
          </a>
          <a href="#contact" className="px-6 py-3 rounded-full border border-white/10 hover:border-white/30 transition-colors" style={{color:"var(--color-text-muted)"}}>
            ${ctaSecondary}
          </a>
        </div>
        ${hasSocial ? `<div className="flex gap-6 mt-8 justify-center flex-wrap">
          ${buildSocialLinks("transition-colors hover:opacity-80")}
        </div>` : ""}
      </div>
    </section>
  );
}`;
};

module.exports = { getHeroTemplate };
