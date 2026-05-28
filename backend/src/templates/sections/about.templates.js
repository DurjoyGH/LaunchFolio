const getAboutTemplate = ({ blueprint, userInput, content }) => {
  const { variant } = blueprint.sections.find((s) => s.type === "about") || { variant: "AboutOne" };
  const primary = blueprint.primaryColor;
  const name = userInput.name;
  const bio = content.bio || userInput.bio || `I'm ${name}, a passionate developer.`;
  const heading = content.aboutHeading || "About Me";
  const subtext = content.aboutSubtext || "Here's a bit about me.";
  const profileImage = userInput.profileImage || "";
  const social = userInput.social || {};

  if (variant === "AboutTwo") {
    return `
export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{ color: "${primary}" }}>About Me</span>
            <h2 className="text-4xl font-bold text-white mb-6">${heading}</h2>
            <p className="text-gray-400 leading-relaxed mb-6">${bio}</p>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">${subtext}</p>
            <div className="flex gap-4">
              ${social.github ? `<a href="${social.github}" target="_blank" className="px-4 py-2 rounded-lg text-sm border border-white/10 text-gray-300 hover:border-white/30 transition-colors">GitHub</a>` : ""}
              ${social.linkedin ? `<a href="${social.linkedin}" target="_blank" className="px-4 py-2 rounded-lg text-sm border border-white/10 text-gray-300 hover:border-white/30 transition-colors">LinkedIn</a>` : ""}
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            ${
              profileImage
                ? `<div className="relative">
                <div className="w-80 h-80 rounded-3xl overflow-hidden">
                  <img src="${profileImage}" alt="${name}" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl" style={{ background: "linear-gradient(135deg, ${primary}, ${blueprint.secondaryColor})", opacity: 0.6 }} />
              </div>`
                : `<div className="w-80 h-80 rounded-3xl flex items-center justify-center border border-white/10" style={{ background: "linear-gradient(135deg, ${primary}10, ${blueprint.secondaryColor}10)" }}>
                <span className="text-9xl font-bold" style={{ color: "${primary}30" }}>${name.charAt(0)}</span>
              </div>`
            }
          </div>
        </div>
      </div>
    </section>
  );
}
`;
  }

  // AboutOne — card with stats
  return `
export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{ color: "${primary}" }}>About Me</span>
        <h2 className="text-4xl font-bold text-white mb-6">${heading}</h2>
        <p className="text-gray-400 leading-relaxed mb-8 max-w-2xl mx-auto">${bio}</p>
        <p className="text-gray-500 mb-12">${subtext}</p>
        <div className="flex flex-wrap gap-4 justify-center">
          ${social.github ? `<a href="${social.github}" target="_blank" className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-gray-300 hover:border-white/30 transition-all hover:-translate-y-0.5">GitHub →</a>` : ""}
          ${social.linkedin ? `<a href="${social.linkedin}" target="_blank" className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-gray-300 hover:border-white/30 transition-all hover:-translate-y-0.5">LinkedIn →</a>` : ""}
          ${social.twitter ? `<a href="${social.twitter}" target="_blank" className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-gray-300 hover:border-white/30 transition-all hover:-translate-y-0.5">Twitter →</a>` : ""}
        </div>
      </div>
    </section>
  );
}
`;
};

module.exports = { getAboutTemplate };
