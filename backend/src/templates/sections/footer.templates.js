/**
 * Footer section templates.
 * 3 variants: FooterSimple, FooterCentered, FooterColumns
 * Supports dynamic social links (any platform key).
 */

const { buildSocialLinks } = require("../../utils/social-icons");

const getFooterTemplate = ({ blueprint, userInput, content }) => {
  const sectionDef = blueprint.sections.find((s) => s.type === "footer");
  const variant = sectionDef?.variant || "FooterSimple";
  const name = userInput.name || "";
  const social = userInput.social || {};
  const year = new Date().getFullYear();
  const primary = blueprint.primaryColor || "#6366f1";

  // Build active sections list from blueprint for nav links
  const sectionTypes = blueprint.sections.map((s) => s.type).filter(
    (t) => !["navbar", "footer"].includes(t)
  );

  const socialLinks = buildSocialLinks(social, "text-sm text-gray-500 hover:text-white transition-colors");
  const hasSocial = Object.values(social).some((v) => v && v.trim());

  // Nav links from sections
  const navLinks = sectionTypes.slice(0, 4).map((t) => {
    const label = t.charAt(0).toUpperCase() + t.slice(1);
    return `<a href="#${t}" className="text-sm text-gray-500 hover:text-white transition-colors">${label}</a>`;
  }).join("\n            ");

  // FooterCentered
  if (variant === "FooterCentered") {
    return `
export default function Footer() {
  return (
    <footer className="py-12 px-6 text-center border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <p className="text-2xl font-bold text-white mb-4">${name.split(" ")[0]}<span style={{color:"${primary}"}}>.</span></p>
        ${hasSocial ? `<div className="flex flex-wrap gap-6 justify-center mb-8">
          ${buildSocialLinks("flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors")}
        </div>` : ""}
        <div className="flex flex-wrap gap-6 justify-center mb-6">
          ${navLinks}
        </div>
        <p className="text-xs text-gray-700">© ${year} ${name}. Built with <span style={{color:"${primary}"}}>LaunchFolio</span>.</p>
      </div>
    </footer>
  );
}`;
  }

  // FooterColumns
  if (variant === "FooterColumns") {
    return `
export default function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
        <div>
          <p className="text-xl font-bold text-white mb-3">${name}</p>
          <p className="text-sm text-gray-500 leading-relaxed">${userInput.title || ""}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white mb-4">Navigation</p>
          <div className="flex flex-col gap-2">
            ${navLinks}
          </div>
        </div>
        ${hasSocial ? `<div>
          <p className="text-sm font-semibold text-white mb-4">Connect</p>
          <div className="flex flex-col gap-3">
            ${socialLinks}
          </div>
        </div>` : "<div />"}
      </div>
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-gray-700">© ${year} ${name}</p>
        <p className="text-xs text-gray-700">Built with <span style={{color:"${primary}"}}>LaunchFolio</span></p>
      </div>
    </footer>
  );
}`;
  }

  // FooterSimple — default
  return `
export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-600">© ${year} ${name}. All rights reserved.</p>
        ${hasSocial ? `<div className="flex flex-wrap gap-6">
          ${socialLinks}
        </div>` : ""}
      </div>
    </footer>
  );
}`;
};

module.exports = { getFooterTemplate };
