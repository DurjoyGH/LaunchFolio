import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const links = {
    Product: ["Features", "How it works", "Pricing"],
    Company: ["About", "Blog", "Careers"],
    Legal: ["Privacy", "Terms", "Cookies"],
  };

  return (
    <footer className="border-t mt-24" style={{ borderColor: "var(--color-border-subtle)" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <Image src="/logo.png" alt="LaunchFolio" width={28} height={28} className="rounded-md" />
              <span className="font-bold text-white">LaunchFolio</span>
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
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {item}
                    </a>
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
            Built with ❤️ using Next.js & Gemini AI
          </p>
        </div>
      </div>
    </footer>
  );
}
