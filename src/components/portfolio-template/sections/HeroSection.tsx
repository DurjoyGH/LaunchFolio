import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import type { SectionProps } from "../types";
import { getContentString, getFirstAvailableSection, getInitials } from "../utils";
import { AnchorButton } from "../ui/button";
import { Badge } from "../ui/badge";

export function HeroSection({ input, blueprint, content }: SectionProps) {
  const name = input.name || "Your Name";
  const title = input.title || "Creative Professional";
  const sections = blueprint.sections || [];
  const target = getFirstAvailableSection(sections, ["projects", "gallery", "services", "about"]);
  const summary = getContentString(content, "heroSummary", input.bio || `A focused ${title} building clear, polished work for ambitious teams.`);
  const variant = sections.find((section) => section.type === "hero")?.variant || "HeroCentered";
  const split = variant === "HeroSplit" || variant === "HeroCreative";

  return (
    <section id="hero" className="flex min-h-[92vh] items-center px-5 pt-20">
      <div className={split ? "mx-auto grid max-w-6xl items-center gap-12 py-16 md:grid-cols-[1.15fr_0.85fr]" : "mx-auto max-w-4xl py-20 text-center"}>
        <div>
          <Badge className="mb-5">{title}</Badge>
          <h1 className="text-balance text-5xl font-semibold leading-tight text-[var(--portfolio-text)] md:text-7xl">
            {variant === "HeroMinimal" ? "Work with clarity." : name}
          </h1>
          <p className={split ? "mt-6 max-w-2xl text-lg leading-8 text-[var(--portfolio-muted)]" : "mx-auto mt-6 max-w-2xl text-lg leading-8 text-[var(--portfolio-muted)]"}>
            {summary}
          </p>
          <div className={split ? "mt-8 flex flex-wrap gap-3" : "mt-8 flex flex-wrap justify-center gap-3"}>
            <AnchorButton href={`#${target}`} size="lg">
              View Work <ArrowDown className="h-4 w-4" />
            </AnchorButton>
            <AnchorButton href="#contact" variant="outline" size="lg">
              Contact <ArrowUpRight className="h-4 w-4" />
            </AnchorButton>
            {input.resumeUrl ? (
              <AnchorButton href={input.resumeUrl} variant="ghost" size="lg" target="_blank" rel="noreferrer">
                Resume <Download className="h-4 w-4" />
              </AnchorButton>
            ) : null}
          </div>
        </div>
        {split ? (
          <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-lg border border-[var(--portfolio-border)] bg-[var(--portfolio-card)]">
            {input.profileImage ? (
              <img src={input.profileImage} alt={name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-7xl font-semibold text-[var(--portfolio-primary)]">
                {getInitials(name)}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}
