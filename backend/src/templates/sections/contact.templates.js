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

  const { buildSocialLinks } = require("../../utils/social-icons");
  const socialImports = "";

  const mailIcon = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 4h16v16H4z\"/><path d=\"M22 6L12 13 2 6\"/></svg>";
  const phoneIcon = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M22 16.92V21a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 1 4.18 2 2 0 0 1 3 2h4.09a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"/></svg>";
  const fileIcon = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z\"/><path d=\"M14 2v6h6\"/></svg>";
  const arrowIcon = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M5 12h14\"/><path d=\"M13 5l7 7-7 7\"/></svg>";

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
              ${mailIcon} ${email}
            </a>` : ""}
            ${phone ? `<p className="flex items-center gap-3 text-gray-400">
              ${phoneIcon} ${phone}
            </p>` : ""}
            ${resumeUrl ? `<a href="${resumeUrl}" target="_blank" download className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium btn-primary mt-4 transition-opacity hover:opacity-90">
              ${fileIcon} Resume
            </a>` : ""}
          </div>
          <div className="flex gap-4 mt-8 flex-wrap">
            ${buildSocialLinks(social, "px-4 py-2 rounded-lg text-sm border border-white/10 text-gray-300 hover:border-white/30 transition-colors")}
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
              ${mailIcon} ${email}
            </a>` : ""}
            ${phone ? `<p className="flex items-center gap-2 text-gray-400">
              ${phoneIcon} ${phone}
            </p>` : ""}
            ${resumeUrl ? `<a href="${resumeUrl}" target="_blank" download className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white border border-white/20 hover:border-white/40 transition-colors mt-2">
              ${fileIcon} Download Resume
            </a>` : ""}
          </div>
          <div className="flex gap-4 justify-center mt-8 flex-wrap">
            ${buildSocialLinks(social, "px-5 py-2.5 rounded-full border border-white/10 text-gray-300 hover:border-white/30 transition-all hover:-translate-y-0.5")}
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
            ${arrowIcon} ${email}
          </a>` : ""}
          ${phone ? `<p className="flex items-center gap-3 text-gray-400">
            ${arrowIcon} ${phone}
          </p>` : ""}
          ${resumeUrl ? `<a href="${resumeUrl}" target="_blank" download className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
            ${arrowIcon} Download Resume
          </a>` : ""}
        </div>
        <div className="flex gap-6 mt-10 pt-8 border-t border-white/5 flex-wrap">
          ${buildSocialLinks(social, "text-sm text-gray-600 hover:text-white font-mono transition-colors")}
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
            ${mailIcon} ${email}
          </a>` : ""}
          ${phone ? `<p className="flex items-center gap-2 text-gray-400">
            ${phoneIcon} ${phone}
          </p>` : ""}
          ${resumeUrl ? `<a href="${resumeUrl}" target="_blank" download className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white border border-white/20 hover:border-white/40 transition-colors mt-2">
            ${fileIcon} Download Resume
          </a>` : ""}
        </div>
        <div className="flex gap-4 justify-center mt-8 flex-wrap">
          ${buildSocialLinks(social, "px-5 py-2.5 rounded-full border border-white/10 text-gray-300 hover:border-white/30 transition-all hover:-translate-y-0.5")}
        </div>
      </div>
    </section>
  );
}`;
};

module.exports = { getContactTemplate };
