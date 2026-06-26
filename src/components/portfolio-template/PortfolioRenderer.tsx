import type { ComponentType, CSSProperties } from "react";
import type { PortfolioSection, PortfolioSectionType, PortfolioTemplateData, SectionProps } from "./types";
import { getTheme } from "./utils";
import { NavbarSection } from "./sections/NavbarSection";
import { HeroSection } from "./sections/HeroSection";
import { AboutSection } from "./sections/AboutSection";
import {
  AchievementsSection,
  EducationSection,
  GallerySection,
  HobbiesSection,
  ProjectsSection,
  ServicesSection,
  SkillsSection,
  TestimonialsSection,
} from "./sections/ListSections";
import { ContactSection, FooterSection } from "./sections/ContactFooterSections";

const sectionComponents: Record<PortfolioSectionType, ComponentType<SectionProps>> = {
  navbar: NavbarSection,
  hero: HeroSection,
  about: AboutSection,
  skills: SkillsSection,
  education: EducationSection,
  projects: ProjectsSection,
  gallery: GallerySection,
  services: ServicesSection,
  testimonials: TestimonialsSection,
  hobbies: HobbiesSection,
  achievements: AchievementsSection,
  contact: ContactSection,
  footer: FooterSection,
};

const fallbackSections: PortfolioSection[] = ["navbar", "hero", "about", "projects", "contact", "footer"].map((type) => ({
  type: type as PortfolioSectionType,
}));

export function PortfolioRenderer({ input, blueprint, content }: PortfolioTemplateData) {
  const theme = getTheme(blueprint, input);
  const sections = blueprint.sections?.length ? blueprint.sections : fallbackSections;

  return (
    <main
      style={{
        "--portfolio-primary": theme.primary,
        "--portfolio-secondary": theme.secondary,
        "--portfolio-accent": theme.accent,
        "--portfolio-text": theme.text,
        "--portfolio-muted": theme.muted,
        "--portfolio-card": theme.surface,
        "--portfolio-border": theme.border,
        "--portfolio-bg": theme.isDark ? "#020617" : "#f8fafc",
      } as CSSProperties}
      className="min-h-screen bg-[var(--portfolio-bg)] text-[var(--portfolio-text)]"
    >
      {sections.map((section) => {
        const Component = sectionComponents[section.type];
        if (!Component) return null;
        return <Component key={`${section.type}-${section.variant || "default"}`} input={input} blueprint={blueprint} content={content} section={section} />;
      })}
    </main>
  );
}
