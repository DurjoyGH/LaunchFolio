/**
 * Builds structured prompts for different AI tasks.
 * Keeps prompt engineering centralized and testable.
 */

const buildBlueprintPrompt = (userInput) => {
  const {
    name,
    title,
    bio,
    skills = [],
    projects = [],
    education = [],
    social = {},
    designPreferences = {},
  } = userInput;

  const skillNames = skills.map((s) => s.name).join(", ") || "Not specified";
  const projectTitles = projects.map((p) => p.title).join(", ") || "None";
  const eduSummary = education.map((e) => `${e.degree} at ${e.institution}`).join(", ") || "None";
  const { theme = "dark", style = "modern", primaryColor, fontPreference } = designPreferences;

  return `
You are a professional portfolio design AI for LaunchFolio — an AI-powered portfolio generator.

Your job is to analyze the user's profile and generate a UNIQUE portfolio blueprint.
Every portfolio must feel VISUALLY DISTINCT. You must intelligently combine components to create diversity.

== USER INFORMATION ==
Name: ${name}
Professional Title: ${title}
Bio: ${bio || "Not provided"}
Skills: ${skillNames}
Projects: ${projectTitles}
Education: ${eduSummary}
GitHub: ${social.github || "Not provided"}
LinkedIn: ${social.linkedin || "Not provided"}
Design Style Preference: ${style}
Theme: ${theme}
Primary Color Preference: ${primaryColor || "Choose best fit"}
Font Preference: ${fontPreference || "Choose best fit"}

== AVAILABLE COMPONENT VARIANTS ==
- navbar: NavbarCentered, NavbarGlass, NavbarMinimal, NavbarBold, NavbarFloating
- hero: HeroCentered, HeroSplit, HeroGradient, HeroMinimal, HeroCreative, HeroGrid
- about: AboutCard, AboutTimeline, AboutSplit, AboutMinimal
- skills: SkillsGrid, SkillsProgress, SkillsCards, SkillsTags
- education: EducationTimeline, EducationCards, EducationMinimal
- projects: ProjectsGrid, ProjectsShowcase, ProjectsMinimal, ProjectsCards, ProjectsMasonry
- contact: ContactModern, ContactSplit, ContactGlass, ContactMinimal
- footer: FooterSimple, FooterCentered, FooterColumns

== STYLE PERSONALITIES ==
Choose ONE that best fits the user:
- "minimal" — Clean whitespace, understated, mono fonts
- "developer" — Technical, terminal-inspired
- "creative" — Bold colors, asymmetric, playful
- "corporate" — Professional, structured, formal
- "glassmorphism" — Frosted glass, translucent, modern
- "futuristic" — Neon accents, dark, glowing effects

== DESIGN TOKENS ==
Choose design tokens that match the personality:
- spacing: "compact" | "comfortable" | "spacious"
- radius: "none" | "sm" | "md" | "lg" | "full"
- shadow: "none" | "soft" | "medium" | "dramatic"
- animation: "none" | "subtle" | "smooth" | "energetic"

== RULES ==
1. DO NOT always pick the same components. Vary your choices based on user data.
2. If user has many projects, prefer ProjectsGrid or ProjectsMasonry.
3. If user has a photo, prefer HeroSplit or HeroCreative.
4. If user style is "minimal", pick Minimal variants.
5. Match the personality with coherent component choices.
6. Generate a color palette that feels cohesive with the personality.
7. Choose colors that are NOT generic (#6366f1 every time). Be creative.

Return ONLY this exact JSON structure:

{
  "theme": "dark" | "light",
  "font": "Inter" | "Poppins" | "Raleway" | "Roboto" | "Space Grotesk",
  "primaryColor": "#hexcode",
  "secondaryColor": "#hexcode",
  "accentColor": "#hexcode",
  "personality": "minimal" | "developer" | "creative" | "corporate" | "glassmorphism" | "futuristic",
  "designTokens": {
    "spacing": "compact" | "comfortable" | "spacious",
    "radius": "none" | "sm" | "md" | "lg" | "full",
    "shadow": "none" | "soft" | "medium" | "dramatic",
    "animation": "none" | "subtle" | "smooth" | "energetic"
  },
  "sections": [
    { "type": "navbar", "variant": "..." },
    { "type": "hero", "variant": "..." },
    { "type": "about", "variant": "..." },
    { "type": "skills", "variant": "..." },
    { "type": "education", "variant": "..." },
    { "type": "projects", "variant": "..." },
    { "type": "contact", "variant": "..." },
    { "type": "footer", "variant": "..." }
  ],
  "content": {
    "tagline": "Short professional tagline (max 10 words)",
    "bio": "Professional bio paragraph (2-3 sentences)",
    "ctaText": "Primary CTA button text (3-5 words)",
    "ctaSecondaryText": "Secondary CTA text (3-5 words)",
    "aboutHeading": "About section heading",
    "aboutSubtext": "About section subtext",
    "skillsHeading": "Skills section heading",
    "projectsHeading": "Projects section heading",
    "contactHeading": "Contact section heading",
    "contactSubtext": "Contact section subtext"
  }
}
`;
};

const buildContentPrompt = (userInput, blueprint) => {
  return `
You are a professional copywriter for developer portfolios.

Based on this developer's profile:
Name: ${userInput.name}
Title: ${userInput.title}
Skills: ${userInput.skills?.map((s) => s.name).join(", ")}
Projects: ${userInput.projects?.map((p) => p.title).join(", ")}
Personality: ${blueprint.personality || "creative"}

Write enhanced, professional content. Return JSON:
{
  "tagline": "...",
  "bio": "...",
  "ctaText": "...",
  "ctaSecondaryText": "...",
  "aboutHeading": "...",
  "aboutSubtext": "...",
  "skillsHeading": "...",
  "projectsHeading": "...",
  "contactHeading": "...",
  "contactSubtext": "..."
}
`;
};

module.exports = { buildBlueprintPrompt, buildContentPrompt };
