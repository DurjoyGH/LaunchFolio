import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const links = {
    Platform: [
      { label: "Features", href: "/#features" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Builder Engine", href: "/generate" },
      { label: "Dashboard", href: "/dashboard" },
    ],
    Company: [
      { label: "About", href: "/#about" },
      { label: "Contact", href: "/#contact" },
      { label: "Sign In", href: "/auth/login" },
      { label: "Sign Up", href: "/auth/register" },
    ],
    Legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  };

  return (
    <footer className="border-t mt-24" style={{ borderColor: "var(--color-border-subtle)" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-8">
              <Image src="/logo.png" alt="LaunchFolio" width={320} height={80} className="h-12 w-auto object-contain scale-150 origin-left" />
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              Build stunning AI-powered portfolios and deploy them in minutes.
            </p>
          </div>

          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="text-sm font-semibold text-white mb-4">{section}</h4>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t"
          style={{ borderColor: "var(--color-border-subtle)" }}
        >
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            © {new Date().getFullYear()} LaunchFolio. All rights reserved.
          </p>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Built with <Link href="https://www.tarinprosadghosh.me/" target="_blank" className="underline hover:text-white">Durjoy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
