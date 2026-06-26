import { generateJSON } from "./gemini.client";
import { buildBlueprintPrompt } from "./prompt.builder";

// Component registry — exactly 5 variants per section
export const COMPONENT_REGISTRY: Record<string, string[]> = {
  navbar: ["NavbarCentered", "NavbarGlass", "NavbarMinimal", "NavbarBold", "NavbarFloating"],
  hero: ["HeroCentered", "HeroSplit", "HeroGradient", "HeroMinimal", "HeroCreative"],
  about: ["AboutCard", "AboutTimeline", "AboutSplit", "AboutMinimal", "AboutGrid"],
  skills: ["SkillsGrid", "SkillsProgress", "SkillsCards", "SkillsTags", "SkillsMasonry"],
  education: ["EducationTimeline", "EducationCards", "EducationMinimal", "EducationSplit", "EducationGrid"],
  projects: ["ProjectsGrid", "ProjectsShowcase", "ProjectsMinimal", "ProjectsCards", "ProjectsMasonry"],
  gallery: ["GalleryMasonry", "GalleryGrid", "GalleryShowcase", "GalleryCarousel", "GalleryPolaroid"],
  services: ["ServicesGrid", "ServicesCards", "ServicesMinimal", "ServicesList", "ServicesSplit"],
  testimonials: ["TestimonialsCards", "TestimonialsGrid", "TestimonialsQuote", "TestimonialsMasonry", "TestimonialsSlider"],
  hobbies: ["HobbiesGrid", "HobbiesCards", "HobbiesList", "HobbiesPills", "HobbiesTimeline"],
  achievements: ["AchievementsCards", "AchievementsTimeline", "AchievementsTrophy", "AchievementsGrid", "AchievementsList"],
  contact: ["ContactModern", "ContactSplit", "ContactGlass", "ContactMinimal", "ContactCentered"],
  footer: ["FooterSimple", "FooterCentered", "FooterColumns", "FooterGlass", "FooterMinimal"],
};

export const STYLE_PRESETS: Record<string, any> = {
  minimal: { navbar: "NavbarMinimal", hero: "HeroMinimal", about: "AboutMinimal", skills: "SkillsTags", projects: "ProjectsMinimal", contact: "ContactMinimal", footer: "FooterSimple", education: "EducationMinimal" },
  developer: { navbar: "NavbarMinimal", hero: "HeroMinimal", about: "AboutTimeline", skills: "SkillsProgress", projects: "ProjectsMinimal", contact: "ContactMinimal", footer: "FooterSimple", education: "EducationMinimal" },
  creative: { navbar: "NavbarGlass", hero: "HeroCreative", about: "AboutSplit", skills: "SkillsCards", projects: "ProjectsMasonry", contact: "ContactGlass", footer: "FooterCentered", education: "EducationCards" },
  corporate: { navbar: "NavbarCentered", hero: "HeroSplit", about: "AboutTimeline", skills: "SkillsGrid", projects: "ProjectsCards", contact: "ContactSplit", footer: "FooterColumns", education: "EducationTimeline" },
  glassmorphism: { navbar: "NavbarGlass", hero: "HeroGradient", about: "AboutCard", skills: "SkillsCards", projects: "ProjectsGrid", contact: "ContactGlass", footer: "FooterCentered", education: "EducationCards" },
  futuristic: { navbar: "NavbarFloating", hero: "HeroGradient", about: "AboutTimeline", skills: "SkillsTags", projects: "ProjectsMasonry", contact: "ContactGlass", footer: "FooterSimple", education: "EducationTimeline" },
};

const validateBlueprint = (blueprint: any) => {
  let validatedSections: { type: string; variant: string }[] = [];

  if (Array.isArray(blueprint.sections)) {
    for (const s of blueprint.sections) {
      if (s && s.type && COMPONENT_REGISTRY[s.type]) {
        const variants = COMPONENT_REGISTRY[s.type];
        const variant = variants[Math.floor(Math.random() * variants.length)];
        validatedSections.push({ type: s.type, variant });
      }
    }
  }

  const getRandom = (type: string) => COMPONENT_REGISTRY[type][Math.floor(Math.random() * COMPONENT_REGISTRY[type].length)];
  const types = validatedSections.map((s) => s.type);
  if (!types.includes("navbar")) validatedSections.unshift({ type: "navbar", variant: getRandom("navbar") });
  if (!types.includes("hero")) validatedSections.splice(1, 0, { type: "hero", variant: getRandom("hero") });
  if (!types.includes("about")) validatedSections.splice(2, 0, { type: "about", variant: getRandom("about") });
  if (!types.includes("contact")) validatedSections.push({ type: "contact", variant: getRandom("contact") });
  if (!types.includes("footer")) validatedSections.push({ type: "footer", variant: getRandom("footer") });

  const designTokens = {
    spacing: ["compact", "comfortable", "spacious"].includes(blueprint.designTokens?.spacing) ? blueprint.designTokens.spacing : "comfortable",
    radius: ["none", "sm", "md", "lg", "full"].includes(blueprint.designTokens?.radius) ? blueprint.designTokens.radius : "lg",
    shadow: ["none", "soft", "medium", "dramatic"].includes(blueprint.designTokens?.shadow) ? blueprint.designTokens.shadow : "soft",
    animation: ["none", "subtle", "smooth", "energetic"].includes(blueprint.designTokens?.animation) ? blueprint.designTokens.animation : "smooth",
  };

  return {
    theme: ["dark", "light"].includes(blueprint.theme) ? blueprint.theme : "dark",
    font: blueprint.font || "Inter",
    primaryColor: blueprint.primaryColor || "#6366f1",
    secondaryColor: blueprint.secondaryColor || "#8b5cf6",
    accentColor: blueprint.accentColor || "#06b6d4",
    personality: Object.keys(STYLE_PRESETS).includes(blueprint.personality) ? blueprint.personality : "creative",
    designTokens,
    sections: validatedSections,
    content: blueprint.content || {},
  };
};

export const planPortfolio = async (userInput: any) => {
  const prompt = buildBlueprintPrompt(userInput, COMPONENT_REGISTRY);
  const raw = await generateJSON(prompt);
  return validateBlueprint(raw);
};
