/**
 * Navbar section templates.
 * 5 variants: NavbarCentered, NavbarGlass, NavbarMinimal, NavbarBold, NavbarFloating
 */
const getNavbarTemplate = ({ blueprint, userInput }) => {
  const sectionDef = blueprint.sections.find((s) => s.type === "navbar");
  const variant = sectionDef?.variant || "NavbarCentered";
  const name = userInput.name || "Portfolio";
  const primary = blueprint.primaryColor || "#6366f1";

  // Build nav links based on active sections
  const sectionTypes = blueprint.sections.map((s) => s.type).filter(
    (t) => !["navbar", "hero", "footer"].includes(t)
  );
  
  const links = sectionTypes.map((t) => {
    const label = t.charAt(0).toUpperCase() + t.slice(1);
    return `<a href="#${t}" className="nav-link font-medium text-sm transition-colors hover:opacity-80 block md:inline-block py-2 md:py-0">${label}</a>`;
  });

  const linksJSX = links.join("\n            ");

  // Reusable script for mobile menu toggling (simple inline state alternative)
  const mobileMenuToggle = `
  const [isOpen, setIsOpen] = useState(false);
  `;

  // Base imports
  const imports = `"use client";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";`;

  // NavbarGlass
  if (variant === "NavbarGlass") {
    return `
${imports}

export default function Navbar() {
  ${mobileMenuToggle}
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={\`fixed top-0 left-0 right-0 z-50 transition-all duration-300 \${scrolled ? "py-3" : "py-5"}\`}>
      <div className={\`max-w-6xl mx-auto px-6 flex items-center justify-between transition-all duration-300 \${scrolled ? "bg-[var(--color-nav-bg)] backdrop-blur-md rounded-2xl border shadow-lg border-[var(--color-border)] py-3 px-6" : ""}\`}>
        <a href="#hero" className="text-xl font-bold tracking-tight" style={{color:"var(--color-heading)"}}>
          ${name.split(" ")[0]}<span style={{color:"${primary}"}}>.</span>
        </a>
        
        <div className="hidden md:flex items-center gap-8">
          ${linksJSX}
          <a href="#contact" className="px-5 py-2 rounded-full text-sm font-semibold btn-primary shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">Let's Talk</a>
        </div>

        <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)} style={{color:"var(--color-heading)"}}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full p-4 md:hidden">
          <div className="p-6 rounded-2xl backdrop-blur-xl border shadow-xl flex flex-col gap-4" style={{background:"var(--color-nav-bg)", borderColor:"var(--color-border)"}}>
            ${linksJSX}
            <a href="#contact" className="mt-4 px-5 py-3 text-center rounded-xl font-bold btn-primary">Let's Talk</a>
          </div>
        </div>
      )}
    </nav>
  );
}`;
  }

  // NavbarMinimal
  if (variant === "NavbarMinimal") {
    return `
${imports}

export default function Navbar() {
  ${mobileMenuToggle}

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-nav-bg)] backdrop-blur-md border-b" style={{borderColor:"var(--color-border)"}}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#hero" className="text-lg font-mono tracking-widest uppercase" style={{color:"var(--color-heading)"}}>
          [${name.split(" ")[0]}]
        </a>
        
        <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest font-semibold">
          ${linksJSX}
        </div>

        <button className="md:hidden text-xl" onClick={() => setIsOpen(!isOpen)} style={{color:"var(--color-heading)"}}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {isOpen && (
        <div className="border-b md:hidden bg-[var(--color-nav-bg)] px-6 py-4 flex flex-col gap-4" style={{borderColor:"var(--color-border)"}}>
          ${linksJSX}
        </div>
      )}
    </nav>
  );
}`;
  }

  // NavbarBold
  if (variant === "NavbarBold") {
    return `
${imports}

export default function Navbar() {
  ${mobileMenuToggle}

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6 transition-all">
      <div className="max-w-7xl mx-auto w-full bg-[var(--color-heading)] text-[var(--color-card-bg)] rounded-3xl px-6 py-4 flex items-center justify-between shadow-2xl">
        <a href="#hero" className="text-2xl font-black italic tracking-tighter">
          ${name.toUpperCase()}
        </a>
        
        <div className="hidden md:flex items-center gap-8 font-bold">
          ${sectionTypes.map((t) => `<a href="#${t}" className="hover:opacity-70 transition-opacity">${t.charAt(0).toUpperCase() + t.slice(1)}</a>`).join("\n          ")}
          <a href="#contact" className="px-6 py-2 rounded-full bg-[var(--color-card-bg)] text-[var(--color-heading)] hover:bg-[var(--color-border)] transition-colors">Contact</a>
        </div>

        <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-[80px] left-4 right-4 md:hidden">
          <div className="p-6 rounded-3xl bg-[var(--color-heading)] text-[var(--color-card-bg)] shadow-2xl flex flex-col gap-4 font-bold text-lg text-center">
            ${sectionTypes.map((t) => `<a href="#${t}" className="py-2 hover:opacity-70 transition-opacity">${t.charAt(0).toUpperCase() + t.slice(1)}</a>`).join("\n            ")}
            <a href="#contact" className="mt-2 py-3 rounded-full bg-[var(--color-card-bg)] text-[var(--color-heading)]">Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
}`;
  }

  // NavbarFloating
  if (variant === "NavbarFloating") {
    return `
${imports}

export default function Navbar() {
  ${mobileMenuToggle}

  return (
    <nav className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto bg-[var(--color-nav-bg)] backdrop-blur-xl border rounded-full px-6 py-3 flex items-center gap-6 shadow-2xl" style={{borderColor:"var(--color-border)"}}>
        <div className="hidden md:flex items-center gap-6 font-medium text-sm">
          ${linksJSX}
          <a href="#contact" className="ml-2 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider" style={{background:"${primary}", color:"#fff"}}>Contact</a>
        </div>
        
        <div className="md:hidden flex items-center gap-4 text-sm font-medium">
          <a href="#hero" className="nav-link">Home</a>
          <a href="#contact" className="nav-link">Contact</a>
          <button className="text-xl ml-2" onClick={() => setIsOpen(!isOpen)} style={{color:"var(--color-heading)"}}>
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="absolute bottom-20 left-4 right-4 pointer-events-auto md:hidden flex justify-center">
          <div className="w-full max-w-sm p-6 rounded-3xl backdrop-blur-xl border shadow-2xl flex flex-col gap-4 text-center font-medium" style={{background:"var(--color-nav-bg)", borderColor:"var(--color-border)"}}>
            ${linksJSX}
          </div>
        </div>
      )}
    </nav>
  );
}`;
  }

  // NavbarCentered — default
  return `
${imports}

export default function Navbar() {
  ${mobileMenuToggle}

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 py-6 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <a href="#hero" className="text-2xl font-bold" style={{color:"var(--color-heading)"}}>
          ${name}
        </a>
        
        <div className="hidden md:flex items-center gap-8 border rounded-full px-8 py-3 bg-[var(--color-nav-bg)] backdrop-blur-sm" style={{borderColor:"var(--color-border)"}}>
          ${linksJSX}
        </div>

        <button className="md:hidden absolute top-6 right-6 text-2xl" onClick={() => setIsOpen(!isOpen)} style={{color:"var(--color-heading)"}}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-[var(--color-nav-bg)] backdrop-blur-xl pt-24 px-6 md:hidden">
          <div className="flex flex-col gap-6 text-2xl font-bold text-center">
            ${linksJSX}
            <a href="#contact" className="nav-link mt-8">Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
}`;
};

module.exports = { getNavbarTemplate };
