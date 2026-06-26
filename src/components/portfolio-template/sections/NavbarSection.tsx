import { Code2, Mail, Menu, UserRound } from "lucide-react";
import type { ComponentType } from "react";
import type { SectionProps } from "../types";
import { sectionLabel } from "../utils";
import { AnchorButton } from "../ui/button";

const socialIcons: Record<string, ComponentType<{ className?: string }>> = {
  github: Code2,
  linkedin: UserRound,
  email: Mail,
};

export function NavbarSection({ input, blueprint }: SectionProps) {
  const sections = blueprint.sections?.filter((section) => !["navbar", "footer"].includes(section.type)) || [];
  const name = input.name || "Portfolio";
  const variant = blueprint.sections?.find((section) => section.type === "navbar")?.variant || "NavbarGlass";
  const floating = variant === "NavbarFloating";

  return (
    <header className={floating ? "fixed left-0 right-0 top-4 z-50 px-4" : "sticky top-0 z-50 border-b border-[var(--portfolio-border)] bg-[var(--portfolio-bg)]/85 backdrop-blur-xl"}>
      <nav className={floating ? "mx-auto flex max-w-5xl items-center justify-between rounded-lg border border-[var(--portfolio-border)] bg-[var(--portfolio-bg)]/85 px-4 py-3 shadow-sm backdrop-blur-xl" : "mx-auto flex max-w-6xl items-center justify-between px-5 py-4"}>
        <a href="#hero" className="text-sm font-semibold tracking-tight text-[var(--portfolio-text)]">
          {name}
        </a>
        <div className="hidden items-center gap-5 md:flex">
          {sections.slice(0, 7).map((section) => (
            <a key={section.type} href={`#${section.type}`} className="text-sm text-[var(--portfolio-muted)] transition-colors hover:text-[var(--portfolio-text)]">
              {sectionLabel(section.type)}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-2 md:flex">
          {Object.entries(input.social || {}).slice(0, 3).map(([key, value]) => {
            if (!value) return null;
            const Icon = socialIcons[key.toLowerCase()];
            return (
              <a key={key} href={value} target="_blank" rel="noreferrer" aria-label={key} className="rounded-md p-2 text-[var(--portfolio-muted)] hover:bg-[var(--portfolio-card)] hover:text-[var(--portfolio-text)]">
                {Icon ? <Icon className="h-4 w-4" /> : <span className="text-xs">{key.slice(0, 2).toUpperCase()}</span>}
              </a>
            );
          })}
        </div>
        <AnchorButton href="#contact" variant="outline" size="icon" className="md:hidden" aria-label="Contact">
          <Menu className="h-4 w-4" />
        </AnchorButton>
      </nav>
    </header>
  );
}
