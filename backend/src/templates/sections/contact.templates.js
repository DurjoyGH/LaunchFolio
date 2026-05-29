/**
 * Contact section templates.
 * 4 variants: ContactModern, ContactSplit, ContactGlass, ContactMinimal
 */
const getContactTemplate = ({ blueprint, userInput, content }) => {
  const { variant } = blueprint.sections.find((s) => s.type === "contact") || { variant: "ContactModern" };
  const primary = blueprint.primaryColor;
  const secondary = blueprint.secondaryColor;
  const heading = content.contactHeading || "Get In Touch";
  const subtext = content.contactSubtext || "I'd love to hear from you.";
  const email = userInput.email || "";
  const phone = userInput.phone || "";
  const resumeUrl = userInput.resumeUrl || "";
  const social = userInput.social || {};

  // Dynamic social link builder — supports any platform key
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

  const socialBtns = (cls) => {
    const links = [];
    for (const [key, url] of Object.entries(social)) {
      if (!url || !url.trim()) continue;
      const meta = SOCIAL_META[key] || { label: key.charAt(0).toUpperCase() + key.slice(1), emoji: "🔗" };
      links.push(`<a href="${url}" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 ${cls}"><span>${meta.emoji}</span><span>${meta.label}</span></a>`);
    }
    return links.join("\n            ");
  };

  const socialImports = `import { Mail, Phone, FileText, ArrowRight } from "lucide-react";`;

  // ContactSplit — two columns with form
  if (variant === "ContactSplit") {
    return `
${socialImports}

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        <div>
          <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{ color: "var(--color-primary)" }}>Contact</span>
          <h2 className="text-4xl font-bold text-white mb-4">${heading}</h2>
          <p className="text-gray-400 mb-8">${subtext}</p>
          <div className="space-y-4">
            ${email ? `<a href="mailto:${email}" className="flex items-center gap-3 text-lg font-medium hover:opacity-80 transition-opacity" style={{ color: "var(--color-primary)" }}>
              <Mail className="w-5 h-5" /> ${email}
            </a>` : ""}
            ${phone ? `<p className="flex items-center gap-3 text-gray-400">
              <Phone className="w-5 h-5" /> ${phone}
            </p>` : ""}
            ${resumeUrl ? `<a href="${resumeUrl}" target="_blank" download className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium btn-primary mt-4 transition-opacity hover:opacity-90">
              <FileText className="w-5 h-5" /> Resume
            </a>` : ""}
          </div>
          <div className="flex gap-4 mt-8 flex-wrap">
            ${socialBtns("px-4 py-2 rounded-lg text-sm border border-white/10 text-gray-300 hover:border-white/30 transition-colors")}
          </div>
        </div>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl border border-white/10 text-white placeholder-gray-500 focus:outline-none transition-colors" style={{ background: "var(--color-card-bg)" }} />
          <input type="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-xl border border-white/10 text-white placeholder-gray-500 focus:outline-none transition-colors" style={{ background: "var(--color-card-bg)" }} />
          <textarea rows={5} placeholder="Your Message" className="w-full px-4 py-3 rounded-xl border border-white/10 text-white placeholder-gray-500 focus:outline-none transition-colors resize-none" style={{ background: "var(--color-card-bg)" }} />
          <button type="submit" className="w-full py-3 rounded-xl font-semibold btn-primary transition-opacity hover:opacity-90">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}`;
  }

  // ContactGlass — glassmorphism centered card
  if (variant === "ContactGlass") {
    return `
${socialImports}

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="p-8 md:p-12 rounded-3xl border border-white/10 text-center backdrop-blur-xl" style={{ background: "var(--color-card-bg)" }}>
          <h2 className="text-3xl font-bold text-white mb-4">${heading}</h2>
          <p className="text-gray-400 mb-8">${subtext}</p>
          <div className="flex flex-col items-center gap-4">
            ${email ? `<a href="mailto:${email}" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold btn-primary transition-all hover:scale-105">
              <Mail className="w-5 h-5" /> ${email}
            </a>` : ""}
            ${phone ? `<p className="flex items-center gap-2 text-gray-400">
              <Phone className="w-5 h-5" /> ${phone}
            </p>` : ""}
            ${resumeUrl ? `<a href="${resumeUrl}" target="_blank" download className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white border border-white/20 hover:border-white/40 transition-colors mt-2">
              <FileText className="w-5 h-5" /> Download Resume
            </a>` : ""}
          </div>
          <div className="flex gap-4 justify-center mt-8 flex-wrap">
            ${socialBtns("px-5 py-2.5 rounded-full border border-white/10 text-gray-300 hover:border-white/30 transition-all hover:-translate-y-0.5")}
          </div>
        </div>
      </div>
    </section>
  );
}`;
  }

  // ContactMinimal — simple and clean
  if (variant === "ContactMinimal") {
    return `
${socialImports}

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <p className="text-sm font-mono mb-4" style={{ color: "var(--color-primary)" }}>// contact</p>
        <h2 className="text-3xl font-bold text-white mb-4">${heading}</h2>
        <p className="text-gray-400 mb-8 text-lg">${subtext}</p>
        <div className="space-y-4">
          ${email ? `<a href="mailto:${email}" className="flex items-center gap-3 text-lg font-medium hover:opacity-80 transition-opacity" style={{ color: "var(--color-primary)" }}>
            <ArrowRight className="w-5 h-5" /> ${email}
          </a>` : ""}
          ${phone ? `<p className="flex items-center gap-3 text-gray-400">
            <ArrowRight className="w-5 h-5" /> ${phone}
          </p>` : ""}
          ${resumeUrl ? `<a href="${resumeUrl}" target="_blank" download className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
            <ArrowRight className="w-5 h-5" /> Download Resume
          </a>` : ""}
        </div>
        <div className="flex gap-6 mt-10 pt-8 border-t border-white/5 flex-wrap">
          ${socialBtns("text-sm text-gray-600 hover:text-white font-mono transition-colors")}
        </div>
      </div>
    </section>
  );
}`;
  }

  // ContactModern — default, centered CTA
  return `
${socialImports}

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 text-center">
      <div className="max-w-2xl mx-auto">
        <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{ color: "var(--color-primary)" }}>Contact</span>
        <h2 className="text-4xl font-bold text-white mb-4">${heading}</h2>
        <p className="text-gray-400 mb-10">${subtext}</p>
        <div className="flex flex-col items-center gap-4">
          ${email ? `<a href="mailto:${email}" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold btn-primary transition-opacity hover:opacity-90">
            <Mail className="w-5 h-5" /> ${email}
          </a>` : ""}
          ${phone ? `<p className="flex items-center gap-2 text-gray-400">
            <Phone className="w-5 h-5" /> ${phone}
          </p>` : ""}
          ${resumeUrl ? `<a href="${resumeUrl}" target="_blank" download className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white border border-white/20 hover:border-white/40 transition-colors mt-2">
            <FileText className="w-5 h-5" /> Download Resume
          </a>` : ""}
        </div>
        <div className="flex gap-4 justify-center mt-8 flex-wrap">
          ${socialBtns("px-5 py-2.5 rounded-full border border-white/10 text-gray-300 hover:border-white/30 transition-all hover:-translate-y-0.5")}
        </div>
      </div>
    </section>
  );
}`;
};

module.exports = { getContactTemplate };
