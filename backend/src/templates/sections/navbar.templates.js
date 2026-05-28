/**
 * Navbar section templates.
 * 5 variants: NavbarCentered, NavbarGlass, NavbarMinimal, NavbarBold, NavbarFloating
 */
const getNavbarTemplate = ({ blueprint, userInput }) => {
  const { variant } = blueprint.sections.find((s) => s.type === "navbar") || { variant: "NavbarCentered" };
  const primary = blueprint.primaryColor;
  const name = userInput.name;
  const firstName = name.split(" ")[0];
  const profileImage = userInput.profileImage || "";
  const dp = userInput.designPreferences || {};
  const logoStyle = dp.logoStyle || "initial";

  // Build the logo JSX based on user preference
  let logoJSX = "";
  if (logoStyle === "photo" && profileImage) {
    logoJSX = `<img src="${profileImage}" alt="${name}" className="w-8 h-8 rounded-full object-cover" />`;
  } else if (logoStyle === "photoName" && profileImage) {
    logoJSX = `
      <img src="${profileImage}" alt="${name}" className="w-8 h-8 rounded-full object-cover" />
      <span className="font-semibold text-white">${firstName}</span>
    `;
  } else if (logoStyle === "name") {
    logoJSX = `<span className="font-semibold text-white text-lg">${firstName}</span>`;
  } else {
    logoJSX = `
      <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm" style={{ background: "${primary}" }}>${firstName.charAt(0)}</div>
      <span className="font-semibold text-white">${firstName}</span>
    `;
  }

  const navLinks = `
            <a href="#about" className="nav-link">About</a>
            <a href="#skills" className="nav-link">Skills</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#contact" className="nav-link">Contact</a>`;

  if (variant === "NavbarGlass") {
    return `
export default function Navbar() {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-8 py-3 rounded-2xl border border-white/10 backdrop-blur-xl" style={{ background: "var(--color-nav-bg)" }}>
      <div className="flex items-center gap-8">
        <a href="#" className="flex items-center gap-2">
          ${logoJSX}
        </a>
        <div className="hidden md:flex items-center gap-6 text-sm">
          ${navLinks}
        </div>
        <a href="#contact" className="hidden md:inline-flex px-4 py-1.5 rounded-full text-sm font-medium btn-primary transition-colors">
          Let's Talk
        </a>
      </div>
    </nav>
  );
}`;
  }

  if (variant === "NavbarMinimal") {
    return `
export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-md" style={{ background: "var(--color-nav-bg)" }}>
      <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          ${logoJSX}
        </a>
        <div className="flex items-center gap-8 text-sm text-gray-500">
          ${navLinks}
        </div>
      </div>
    </nav>
  );
}`;
  }

  if (variant === "NavbarBold") {
    return `
export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: "linear-gradient(180deg, var(--color-nav-bg) 0%, transparent 100%)" }}>
      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          ${logoJSX}
        </a>
        <div className="hidden md:flex items-center gap-10 text-sm font-medium uppercase tracking-widest">
          ${navLinks}
        </div>
        <a href="#contact" className="hidden md:inline-flex px-6 py-2.5 rounded-lg text-sm font-bold btn-primary transition-all hover:scale-105">
          Hire Me
        </a>
      </div>
    </nav>
  );
}`;
  }

  if (variant === "NavbarFloating") {
    return `
export default function Navbar() {
  return (
    <nav className="fixed top-6 right-6 z-50">
      <div className="flex flex-col items-end gap-3 px-5 py-4 rounded-2xl border border-white/10 backdrop-blur-xl" style={{ background: "var(--color-nav-bg)" }}>
        <a href="#" className="flex items-center gap-2 mb-2">
          ${logoJSX}
        </a>
        <a href="#about" className="nav-link text-xs">About</a>
        <a href="#skills" className="nav-link text-xs">Skills</a>
        <a href="#projects" className="nav-link text-xs">Projects</a>
        <a href="#contact" className="nav-link text-xs">Contact</a>
      </div>
    </nav>
  );
}`;
  }

  // NavbarCentered — default
  return `
export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-md" style={{ background: "var(--color-nav-bg)" }}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          ${logoJSX}
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm">
          ${navLinks}
        </div>
        <a href="#contact" className="hidden md:inline-flex px-5 py-2 rounded-xl text-sm font-medium btn-primary transition-all hover:opacity-90">
          Contact
        </a>
      </div>
    </nav>
  );
}`;
};

module.exports = { getNavbarTemplate };
