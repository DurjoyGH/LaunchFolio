/**
 * Footer section templates.
 * 3 variants: FooterSimple, FooterCentered, FooterColumns
 */
const getFooterTemplate = ({ blueprint, userInput }) => {
  const { variant } = blueprint.sections.find((s) => s.type === "footer") || { variant: "FooterSimple" };
  const name = userInput.name;
  const social = userInput.social || {};
  const year = new Date().getFullYear();

  const socialLinks = (cls) => {
    const links = [];
    if (social.github) links.push(`<a href="${social.github}" target="_blank" className="flex items-center gap-2 ${cls}"><Github className="w-4 h-4" /><span>GitHub</span></a>`);
    if (social.linkedin) links.push(`<a href="${social.linkedin}" target="_blank" className="flex items-center gap-2 ${cls}"><Linkedin className="w-4 h-4" /><span>LinkedIn</span></a>`);
    if (social.twitter) links.push(`<a href="${social.twitter}" target="_blank" className="flex items-center gap-2 ${cls}"><Twitter className="w-4 h-4" /><span>Twitter</span></a>`);
    if (social.website) links.push(`<a href="${social.website}" target="_blank" className="flex items-center gap-2 ${cls}"><Globe className="w-4 h-4" /><span>Website</span></a>`);
    return links.join("\n            ");
  };

  const socialImports = Object.keys(social).length ? `import { Github, Linkedin, Twitter, Globe } from "lucide-react";` : "";

  // FooterCentered — centered with social icons
  if (variant === "FooterCentered") {
    return `
${socialImports}

export default function Footer() {
  return (
    <footer className="py-12 px-6 text-center border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <p className="text-2xl font-bold text-white mb-4">${name.split(" ")[0]}<span style={{ color: "var(--color-primary)" }}>.</span></p>
        <div className="flex flex-wrap gap-6 justify-center mb-8">
          ${socialLinks("text-sm text-gray-500 hover:text-white transition-colors")}
        </div>
        <div className="flex flex-wrap gap-6 justify-center text-sm text-gray-600 mb-6">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#skills" className="hover:text-white transition-colors">Skills</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
        <p className="text-xs text-gray-700">© ${year} ${name}. Built with LaunchFolio.</p>
      </div>
    </footer>
  );
}`;
  }

  // FooterColumns — multi-column layout
  if (variant === "FooterColumns") {
    return `
${socialImports}

export default function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
        <div>
          <p className="text-xl font-bold text-white mb-3">${name}</p>
          <p className="text-sm text-gray-500 leading-relaxed">${userInput.title || "Developer"}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white mb-4">Navigation</p>
          <div className="flex flex-col gap-2">
            <a href="#about" className="text-sm text-gray-500 hover:text-white transition-colors">About</a>
            <a href="#skills" className="text-sm text-gray-500 hover:text-white transition-colors">Skills</a>
            <a href="#projects" className="text-sm text-gray-500 hover:text-white transition-colors">Projects</a>
            <a href="#contact" className="text-sm text-gray-500 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-white mb-4">Connect</p>
          <div className="flex flex-col gap-3">
            ${socialLinks("text-sm text-gray-500 hover:text-white transition-colors")}
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-gray-700">© ${year} ${name}</p>
        <p className="text-xs text-gray-700">Built with <span style={{ color: "var(--color-primary)" }}>LaunchFolio</span></p>
      </div>
    </footer>
  );
}`;
  }

  // FooterSimple — default
  return `
${socialImports}

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-600">© ${year} ${name}. All rights reserved.</p>
        <div className="flex flex-wrap gap-6">
          ${socialLinks("text-sm text-gray-600 hover:text-white transition-colors")}
        </div>
      </div>
    </footer>
  );
}`;
};

module.exports = { getFooterTemplate };
