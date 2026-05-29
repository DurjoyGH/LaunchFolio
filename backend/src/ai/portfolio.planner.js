const { generateJSON } = require("./gemini.client");
const { buildBlueprintPrompt } = require("./prompt.builder");

// Component registry — all available variants per section
const COMPONENT_REGISTRY = {
  navbar: ["NavbarCentered", "NavbarGlass", "NavbarMinimal", "NavbarBold", "NavbarFloating"],
  hero: ["HeroCentered", "HeroSplit", "HeroGradient", "HeroMinimal", "HeroCreative", "HeroGrid"],
  about: ["AboutCard", "AboutTimeline", "AboutSplit", "AboutMinimal"],
  skills: ["SkillsGrid", "SkillsProgress", "SkillsCards", "SkillsTags"],
  education: ["EducationTimeline", "EducationCards", "EducationMinimal"],
  projects: ["ProjectsGrid", "ProjectsShowcase", "ProjectsMinimal", "ProjectsCards", "ProjectsMasonry"],
  gallery: ["GalleryMasonry", "GalleryGrid", "GalleryShowcase"],
  services: ["ServicesGrid", "ServicesCards", "ServicesMinimal"],
  testimonials: ["TestimonialsCards", "TestimonialsGrid", "TestimonialsQuote"],
  hobbies: ["HobbiesGrid", "HobbiesCards", "HobbiesList"],
  achievements: ["AchievementsCards", "AchievementsTimeline", "AchievementsTrophy"],
  contact: ["ContactModern", "ContactSplit", "ContactGlass", "ContactMinimal"],
  footer: ["FooterSimple", "FooterCentered", "FooterColumns"],
};

/**
 * Style personality presets — maps design personality to recommended component combinations.
 * AI may override any of these based on user data.
 */
const STYLE_PRESETS = {
  minimal: { navbar: "NavbarMinimal", hero: "HeroMinimal", about: "AboutMinimal", skills: "SkillsTags", projects: "ProjectsMinimal", contact: "ContactMinimal", footer: "FooterSimple", education: "EducationMinimal" },
  developer: { navbar: "NavbarMinimal", hero: "HeroMinimal", about: "AboutTimeline", skills: "SkillsProgress", projects: "ProjectsMinimal", contact: "ContactMinimal", footer: "FooterSimple", education: "EducationMinimal" },
  creative: { navbar: "NavbarGlass", hero: "HeroCreative", about: "AboutSplit", skills: "SkillsCards", projects: "ProjectsMasonry", contact: "ContactGlass", footer: "FooterCentered", education: "EducationCards" },
  corporate: { navbar: "NavbarCentered", hero: "HeroSplit", about: "AboutTimeline", skills: "SkillsGrid", projects: "ProjectsCards", contact: "ContactSplit", footer: "FooterColumns", education: "EducationTimeline" },
  glassmorphism: { navbar: "NavbarGlass", hero: "HeroGradient", about: "AboutCard", skills: "SkillsCards", projects: "ProjectsGrid", contact: "ContactGlass", footer: "FooterCentered", education: "EducationCards" },
  futuristic: { navbar: "NavbarFloating", hero: "HeroGradient", about: "AboutTimeline", skills: "SkillsTags", projects: "ProjectsMasonry", contact: "ContactGlass", footer: "FooterSimple", education: "EducationTimeline" },
};

/**
 * Validates AI blueprint against known component registry.
 * Supports dynamic section lists — no hardcoded REQUIRED_SECTIONS.
 */
const validateBlueprint = (blueprint) => {
  let validatedSections = [];

  if (Array.isArray(blueprint.sections)) {
    for (const s of blueprint.sections) {
      if (s && s.type && COMPONENT_REGISTRY[s.type]) {
        const variants = COMPONENT_REGISTRY[s.type];
        const variant = variants.includes(s.variant) ? s.variant : variants[0];
        validatedSections.push({ type: s.type, variant });
      }
    }
  }

  // Ensure minimum sections exist
  const types = validatedSections.map((s) => s.type);
  if (!types.includes("navbar")) validatedSections.unshift({ type: "navbar", variant: "NavbarCentered" });
  if (!types.includes("hero")) validatedSections.splice(1, 0, { type: "hero", variant: "HeroCentered" });
  if (!types.includes("about")) validatedSections.splice(2, 0, { type: "about", variant: "AboutCard" });
  if (!types.includes("contact")) validatedSections.push({ type: "contact", variant: "ContactModern" });
  if (!types.includes("footer")) validatedSections.push({ type: "footer", variant: "FooterSimple" });

  // Validate design tokens
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

/**
 * Main portfolio planner — calls AI and returns a validated blueprint.
 */
const planPortfolio = async (userInput) => {
  const prompt = buildBlueprintPrompt(userInput);
  const raw = await generateJSON(prompt);
  return validateBlueprint(raw);
};

module.exports = { planPortfolio, COMPONENT_REGISTRY, STYLE_PRESETS };
