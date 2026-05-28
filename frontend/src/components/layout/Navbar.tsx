"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b" : "bg-transparent"
      }`}
      style={{ borderColor: scrolled ? "var(--color-border-subtle)" : "transparent" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="LaunchFolio" width={32} height={32} className="rounded-lg" />
          <span className="text-lg font-bold text-white">LaunchFolio</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Features", href: "#features" },
            { label: "How it works", href: "#how-it-works" },
            { label: "Pricing", href: "#pricing" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm transition-colors hover:text-white"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/auth/login"
            className="text-sm font-medium transition-colors hover:text-white"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Sign in
          </Link>
          <Link href="/auth/register">
            <Button size="sm">Get Started Free</Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden px-6 pb-6 glass border-t" style={{ borderColor: "var(--color-border-subtle)" }}>
          <div className="flex flex-col gap-4 pt-4">
            {["Features", "How it works", "Pricing"].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase().replace(" ", "-")}`}
                onClick={() => setMobileOpen(false)}
                className="text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <Link href="/auth/login" className="text-sm text-center py-2" style={{ color: "var(--color-text-secondary)" }}>
                Sign in
              </Link>
              <Link href="/auth/register">
                <Button size="sm" className="w-full">Get Started Free</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
