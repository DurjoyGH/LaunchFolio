const getContactTemplate = ({ blueprint, userInput, content }) => {
  const { variant } = blueprint.sections.find((s) => s.type === "contact") || { variant: "ContactOne" };
  const primary = blueprint.primaryColor;
  const heading = content.contactHeading || "Get In Touch";
  const subtext = content.contactSubtext || "I'd love to hear from you.";
  const email = userInput.email || "";
  const phone = userInput.phone || "";
  const resumeUrl = userInput.resumeUrl || "";
  const social = userInput.social || {};

  if (variant === "ContactTwo") {
    return `export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        <div>
          <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{ color: "${primary}" }}>Contact</span>
          <h2 className="text-4xl font-bold text-white mb-4">${heading}</h2>
          <p className="text-gray-400 mb-8">${subtext}</p>
          ${email ? `<a href="mailto:${email}" className="text-lg font-medium block mb-2" style={{ color: "${primary}" }}>${email}</a>` : ""}
          ${phone ? `<p className="text-gray-400 mb-2">📞 ${phone}</p>` : ""}
          ${resumeUrl ? `<a href="${resumeUrl}" target="_blank" download className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-white mt-4 transition-opacity hover:opacity-90" style={{ background: "linear-gradient(135deg, ${primary}, ${blueprint.secondaryColor})" }}>📄 Resume</a>` : ""}
          <div className="flex gap-4 mt-6">
            ${social.github ? `<a href="${social.github}" target="_blank" className="px-4 py-2 rounded-lg text-sm border border-white/10 text-gray-300 hover:border-white/30 transition-colors">GitHub</a>` : ""}
            ${social.linkedin ? `<a href="${social.linkedin}" target="_blank" className="px-4 py-2 rounded-lg text-sm border border-white/10 text-gray-300 hover:border-white/30 transition-colors">LinkedIn</a>` : ""}
            ${social.twitter ? `<a href="${social.twitter}" target="_blank" className="px-4 py-2 rounded-lg text-sm border border-white/10 text-gray-300 hover:border-white/30 transition-colors">Twitter</a>` : ""}
          </div>
        </div>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[${primary}] transition-colors" />
          <input type="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[${primary}] transition-colors" />
          <textarea rows={5} placeholder="Your Message" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[${primary}] transition-colors resize-none" />
          <button type="submit" className="w-full py-3 rounded-xl font-semibold text-white transition-opacity hover:opacity-90" style={{ background: "linear-gradient(135deg, ${primary}, ${blueprint.secondaryColor})" }}>
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}`;
  }

  return `export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 text-center">
      <div className="max-w-2xl mx-auto">
        <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{ color: "${primary}" }}>Contact</span>
        <h2 className="text-4xl font-bold text-white mb-4">${heading}</h2>
        <p className="text-gray-400 mb-10">${subtext}</p>
        ${email ? `<a href="mailto:${email}" className="inline-block px-8 py-4 rounded-full font-semibold text-white mb-4 transition-opacity hover:opacity-90" style={{ background: "linear-gradient(135deg, ${primary}, ${blueprint.secondaryColor})" }}>${email}</a>` : ""}
        ${phone ? `<p className="text-gray-400 mb-4">📞 ${phone}</p>` : ""}
        ${resumeUrl ? `<a href="${resumeUrl}" target="_blank" download className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white mb-6 transition-opacity hover:opacity-90 border border-white/20 hover:border-white/40">📄 Download Resume</a>` : ""}
        <div className="flex gap-4 justify-center mt-4">
          ${social.github ? `<a href="${social.github}" target="_blank" className="px-5 py-2.5 rounded-full border border-white/10 text-gray-300 hover:border-white/30 transition-all hover:-translate-y-0.5">GitHub</a>` : ""}
          ${social.linkedin ? `<a href="${social.linkedin}" target="_blank" className="px-5 py-2.5 rounded-full border border-white/10 text-gray-300 hover:border-white/30 transition-all hover:-translate-y-0.5">LinkedIn</a>` : ""}
          ${social.twitter ? `<a href="${social.twitter}" target="_blank" className="px-5 py-2.5 rounded-full border border-white/10 text-gray-300 hover:border-white/30 transition-all hover:-translate-y-0.5">Twitter</a>` : ""}
        </div>
      </div>
    </section>
  );
}`;
};

module.exports = { getContactTemplate };
