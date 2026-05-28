const { generateJSON } = require("./gemini.client");
const { buildBlueprintPrompt } = require("./prompt.builder");

// Component registry — all available variants
const COMPONENT_REGISTRY = {
  navbar: ["NavbarOne", "NavbarTwo"],
  hero: ["HeroOne", "HeroTwo", "HeroThree"],
  about: ["AboutOne", "AboutTwo"],
  skills: ["SkillsOne", "SkillsTwo"],
  education: ["EducationOne"],
  projects: ["ProjectsOne", "ProjectsTwo"],
  contact: ["ContactOne", "ContactTwo"],
  footer: ["FooterOne"],
};

const REQUIRED_SECTIONS = ["navbar", "hero", "about", "skills", "education", "projects", "contact", "footer"];

/**
 * Validates AI blueprint against known component registry.
 * Falls back to safe defaults if AI returns invalid variants.
 */
const validateBlueprint = (blueprint) => {
  const validatedSections = REQUIRED_SECTIONS.map((type) => {
    const aiSection = blueprint.sections?.find((s) => s.type === type);
    const availableVariants = COMPONENT_REGISTRY[type];

    if (aiSection && availableVariants.includes(aiSection.variant)) {
      return { type, variant: aiSection.variant };
    }

    // Fallback to first available variant
    return { type, variant: availableVariants[0] };
  });

  return {
    theme: ["dark", "light"].includes(blueprint.theme) ? blueprint.theme : "dark",
    font: blueprint.font || "Inter",
    primaryColor: blueprint.primaryColor || "#6366f1",
    secondaryColor: blueprint.secondaryColor || "#8b5cf6",
    accentColor: blueprint.accentColor || "#06b6d4",
    layout: ["modern", "minimal", "bold", "elegant"].includes(blueprint.layout)
      ? blueprint.layout
      : "modern",
    sections: validatedSections,
    content: blueprint.content || {},
  };
};

/**
 * Main portfolio planner — calls AI and returns a validated blueprint.
 * @param {Object} userInput
 * @returns {Promise<Object>} blueprint
 */
const planPortfolio = async (userInput) => {
  const prompt = buildBlueprintPrompt(userInput);
  const raw = await generateJSON(prompt);
  return validateBlueprint(raw);
};

module.exports = { planPortfolio, COMPONENT_REGISTRY };
