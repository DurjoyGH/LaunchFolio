/**
 * Footer section templates.
 * 5 variants: FooterSimple, FooterCentered, FooterColumns, FooterGlass, FooterMinimal
 */
const { buildSocialLinks } = require("../../utils/social-icons");

const getFooterTemplate = ({ blueprint, userInput, content }) => {
  const sectionDef = blueprint.sections.find((s) => s.type === "footer");
  const variant = sectionDef?.variant || "FooterSimple";
  const name = userInput.name || "";
  const title = userInput.title || "";
  const social = userInput.social || {};
  const year = new Date().getFullYear();
  const primary = blueprint.primaryColor || "#6366f1";

  const sectionTypes = blueprint.sections
    .map((s) => s.type)
    .filter((t) => !["navbar", "footer"].includes(t));

  // Fix: pass social object (not a string) to buildSocialLinks
  const socialLinks = buildSocialLinks(social, "text-sm text-gray-500 hover:text-white transition-colors");
  const hasSocial = Object.values(social).some((v) => v && v.trim());

  const navLinks = sectionTypes.slice(0, 5).map((t) => {
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
        <p className="text-2xl font-bold mb-4" style={{color:"var(--color-heading)"}}>${name.split(" ")[0]}<span style={{color:"${primary}"}}>.</span></p>
        ${hasSocial ? `<div className="flex flex-wrap gap-6 justify-center mb-8">
          ${buildSocialLinks(social, "flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors")}
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
          <p className="text-xl font-bold mb-3" style={{color:"var(--color-heading)"}}>${name}</p>
          <p className="text-sm text-gray-500 leading-relaxed">${title}</p>
        </div>
        <div>
          <p className="text-sm font-semibold mb-4" style={{color:"var(--color-heading)"}}>Navigation</p>
          <div className="flex flex-col gap-2">
            ${navLinks}
          </div>
        </div>
        ${hasSocial ? `<div>
          <p className="text-sm font-semibold mb-4" style={{color:"var(--color-heading)"}}>Connect</p>
          <div className="flex flex-col gap-3">
            ${buildSocialLinks(social, "flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors")}
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

  // FooterGlass
  if (variant === "FooterGlass") {
    return `
export default function Footer() {
  return (
    <footer className="py-16 px-6" style={{background:"var(--color-card-bg)",borderTop:"1px solid var(--color-border)"}}>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          <div className="max-w-xs">
            <p className="text-2xl font-bold mb-3" style={{color:"var(--color-heading)"}}>${name}</p>
            <p className="text-sm text-gray-500 leading-relaxed">${title}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            ${navLinks}
          </div>
          ${hasSocial ? `<div className="flex flex-col gap-3">
            ${buildSocialLinks(social, "flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors")}
          </div>` : ""}
        </div>
        <div className="pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4" style={{borderColor:"var(--color-border)"}}>
          <p className="text-xs text-gray-700">© ${year} ${name}. All rights reserved.</p>
          <span className="text-xs px-3 py-1 rounded-full" style={{background:"var(--color-primary)20",color:"${primary}"}}>Made with LaunchFolio</span>
        </div>
      </div>
    </footer>
  );
}`;
  }

  // FooterMinimal
  if (variant === "FooterMinimal") {
    return `
export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-6">
          <span className="font-bold text-lg" style={{color:"var(--color-heading)"}}>${name}<span style={{color:"${primary}"}}>.</span></span>
          <div className="flex flex-wrap gap-5 justify-center">
            ${navLinks}
          </div>
        </div>
        ${hasSocial ? `<div className="flex flex-wrap gap-4 justify-center mb-6">
          ${buildSocialLinks(social, "flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors")}
        </div>` : ""}
        <p className="text-xs text-center text-gray-700">© ${year} ${name} — Built with LaunchFolio</p>
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
