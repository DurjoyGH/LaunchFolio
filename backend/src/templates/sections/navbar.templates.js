/**
 * Navbar section templates.
 * 5 variants: NavbarCentered, NavbarGlass, NavbarMinimal, NavbarBold, NavbarFloating
 * Nav links are built DYNAMICALLY from the actual blueprint sections.
 */

// Human-readable label map for section types
const SECTION_LABELS = {
  hero: null,       // Never shown in nav
  navbar: null,     // Never shown in nav
  footer: null,     // Never shown in nav
  about: "About",
  skills: "Skills",
  projects: "Projects",
  education: "Education",
  gallery: "Gallery",
  services: "Services",
  testimonials: "Testimonials",
  hobbies: "Hobbies",
  achievements: "Achievements",
  contact: "Contact",
};

const getNavbarTemplate = ({ blueprint, userInput }) => {
  const sectionDef = blueprint.sections.find((s) => s.type === "navbar");
  const variant = sectionDef?.variant || "NavbarCentered";
  const primary = blueprint.primaryColor;
  const name = userInput.name;
  const firstName = name.split(" ")[0];
  const profileImage = userInput.profileImage || "";
  const dp = userInput.designPreferences || {};
  const logoStyle = dp.logoStyle || "initial";

  // Build nav links DYNAMICALLY from blueprint sections (skip navbar/hero/footer)
  const linkableSections = blueprint.sections.filter(
    (s) => SECTION_LABELS[s.type] !== null && SECTION_LABELS[s.type] !== undefined
  );

  const navLinksJSX = linkableSections
    .map((s) => `<a href="#${s.type}" className="nav-link">${SECTION_LABELS[s.type]}</a>`)
    .join("\n            ");

  // Floating variant builds vertical links slightly differently
  const floatingLinksJSX = linkableSections
    .map((s) => `<a href="#${s.type}" className="nav-link text-xs">${SECTION_LABELS[s.type]}</a>`)
    .join("\n        ");

  // Logo JSX
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
      <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm" style={{background:"${primary}"}}>${firstName.charAt(0)}</div>
      <span className="font-semibold text-white">${firstName}</span>
    `;
  }

  // Determine CTA href: prefer contact section, else first linkable section
  const hasContact = linkableSections.some((s) => s.type === "contact");
  const ctaHref = hasContact ? "#contact" : `#${linkableSections[0]?.type || "contact"}`;
  const ctaLabel = hasContact ? "Contact" : (SECTION_LABELS[linkableSections[0]?.type] || "Connect");

  if (variant === "NavbarGlass") {
    return `
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-8 py-3 rounded-2xl border border-white/10 backdrop-blur-xl" style={{background:"var(--color-nav-bg)"}}>
      <div className="flex items-center gap-8">
        <a href="#" className="flex items-center gap-2">
          ${logoJSX}
        </a>
        <div className="hidden md:flex items-center gap-6 text-sm">
          ${navLinksJSX}
        </div>
        <a href="${ctaHref}" className="hidden md:inline-flex px-4 py-1.5 rounded-full text-sm font-medium btn-primary transition-colors">
          Let's Talk
        </a>
        <button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden mt-4 pt-4 border-t border-white/10 flex flex-col gap-4">
          ${navLinksJSX}
          <a href="${ctaHref}" className="inline-flex px-4 py-2 rounded-full text-sm font-medium btn-primary">${ctaLabel}</a>
        </div>
      )}
    </nav>
  );
}`;
  }

  if (variant === "NavbarMinimal") {
    return `
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-md" style={{background:"var(--color-nav-bg)"}}>
      <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          ${logoJSX}
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm">
          ${navLinksJSX}
        </div>
        <button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden px-6 pb-6 border-t border-white/10 flex flex-col gap-4">
          ${navLinksJSX}
        </div>
      )}
    </nav>
  );
}`;
  }

  if (variant === "NavbarBold") {
    return `
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{background:"linear-gradient(180deg, var(--color-nav-bg) 0%, transparent 100%)"}}>
      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          ${logoJSX}
        </a>
        <div className="hidden md:flex items-center gap-10 text-sm font-medium uppercase tracking-widest">
          ${navLinksJSX}
        </div>
        <a href="${ctaHref}" className="hidden md:inline-flex px-6 py-2.5 rounded-lg text-sm font-bold btn-primary transition-all hover:scale-105">
          ${ctaLabel}
        </a>
        <button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden px-8 pb-6 border-t border-white/10 flex flex-col gap-4" style={{background:"var(--color-nav-bg)"}}>
          ${navLinksJSX}
          <a href="${ctaHref}" className="inline-flex px-5 py-2 rounded-lg text-sm font-bold btn-primary">${ctaLabel}</a>
        </div>
      )}
    </nav>
  );
}`;
  }

  if (variant === "NavbarFloating") {
    return `
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-6 right-6 z-50">
      <div className="flex flex-col items-end gap-3 px-5 py-4 rounded-2xl border border-white/10 backdrop-blur-xl" style={{background:"var(--color-nav-bg)"}}>
        <div className="flex items-center gap-2">
          <a href="#" className="flex items-center gap-2">
            ${logoJSX}
          </a>
          <button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        <div className="hidden md:flex flex-col items-end gap-3">
          ${floatingLinksJSX}
        </div>
        {open && (
          <div className="md:hidden flex flex-col items-end gap-3 pt-2 border-t border-white/10 w-full">
            ${floatingLinksJSX}
          </div>
        )}
      </div>
    </nav>
  );
}`;
  }

  // NavbarCentered — default
  return `
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-md" style={{background:"var(--color-nav-bg)"}}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          ${logoJSX}
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm">
          ${navLinksJSX}
        </div>
        <a href="${ctaHref}" className="hidden md:inline-flex px-5 py-2 rounded-xl text-sm font-medium btn-primary transition-all hover:opacity-90">
          ${ctaLabel}
        </a>
        <button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden px-6 pb-6 border-t border-white/10 flex flex-col gap-4" style={{background:"var(--color-nav-bg)"}}>
          ${navLinksJSX}
          <a href="${ctaHref}" className="inline-flex px-5 py-2 rounded-xl text-sm font-medium btn-primary">${ctaLabel}</a>
        </div>
      )}
    </nav>
  );
}`;
};

module.exports = { getNavbarTemplate };
