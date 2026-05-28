/**
 * Navbar section templates.
 * Two variants: NavbarOne (minimal), NavbarTwo (glassmorphism sticky)
 */

const getNavbarTemplate = ({ blueprint, userInput, content }) => {
  const { variant } = blueprint.sections.find((s) => s.type === "navbar") || { variant: "NavbarOne" };
  const name = userInput.name;
  const social = userInput.social || {};
  const primary = blueprint.primaryColor;

  if (variant === "NavbarTwo") {
    return `
"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = ["About", "Skills", "Projects", "Contact"];
  return (
    <nav className={\`fixed top-0 left-0 right-0 z-50 transition-all duration-300 \${scrolled ? "backdrop-blur-xl bg-black/60 shadow-lg" : "bg-transparent"}\`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="text-xl font-bold" style={{ color: "${primary}" }}>
          {${JSON.stringify(name)}}
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <a key={link} href={\`#\${link.toLowerCase()}\`} className="text-sm text-gray-300 hover:text-white transition-colors">
              {link}
            </a>
          ))}
          ${social.github ? `<a href="${social.github}" target="_blank" className="text-sm px-4 py-2 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors">GitHub</a>` : ""}
        </div>
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {open ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 backdrop-blur-xl bg-black/80">
          {links.map(link => (
            <a key={link} href={\`#\${link.toLowerCase()}\`} onClick={() => setOpen(false)} className="text-gray-300 hover:text-white transition-colors">
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
`;
  }

  // NavbarOne — minimal fixed
  return `
"use client";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = ["About", "Skills", "Projects", "Contact"];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-blur border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="text-xl font-bold text-white">
          {${JSON.stringify(name)}.split(" ")[0]}<span style={{ color: "${primary}" }}>.</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <a key={link} href={\`#\${link.toLowerCase()}\`} className="text-sm text-gray-400 hover:text-white transition-colors">
              {link}
            </a>
          ))}
        </div>
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 bg-gray-950">
          {links.map(link => (
            <a key={link} href={\`#\${link.toLowerCase()}\`} onClick={() => setOpen(false)} className="text-gray-400 hover:text-white">
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
`;
};

module.exports = { getNavbarTemplate };
