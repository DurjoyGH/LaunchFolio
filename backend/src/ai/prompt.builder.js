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
    social = {},
    designPreferences = {},
  } = userInput;

  const skillNames = skills.map((s) => s.name).join(", ") || "Not specified";
  const projectTitles = projects.map((p) => p.title).join(", ") || "None";
  const { theme = "dark", style = "modern", primaryColor, fontPreference } = designPreferences;

  return `
You are a professional portfolio design planner for an AI-powered portfolio generation platform called LaunchFolio.

Your task is to analyze the following user information and generate a structured JSON portfolio blueprint.

== USER INFORMATION ==
Name: ${name}
Professional Title: ${title}
Bio: ${bio || "Not provided"}
Skills: ${skillNames}
Projects: ${projectTitles}
GitHub: ${social.github || "Not provided"}
LinkedIn: ${social.linkedin || "Not provided"}
Design Preference: ${style}
Theme: ${theme}
Primary Color Preference: ${primaryColor || "Choose best fit"}
Font Preference: ${fontPreference || "Choose best fit"}

== AVAILABLE COMPONENT VARIANTS ==
- navbar: NavbarOne, NavbarTwo
- hero: HeroOne, HeroTwo, HeroThree
- about: AboutOne, AboutTwo
- skills: SkillsOne, SkillsTwo
- projects: ProjectsOne, ProjectsTwo
- contact: ContactOne, ContactTwo
- footer: FooterOne

== INSTRUCTIONS ==
1. Select the most appropriate component variants based on the user's style preference.
2. Choose a color palette that matches their personality and field.
3. Generate compelling, professional content (bio, tagline, CTA).
4. Return ONLY this exact JSON structure:

{
  "theme": "dark" | "light",
  "font": "Inter" | "Poppins" | "Raleway" | "Roboto" | "Space Grotesk",
  "primaryColor": "#hexcode",
  "secondaryColor": "#hexcode",
  "accentColor": "#hexcode",
  "layout": "modern" | "minimal" | "bold" | "elegant",
  "sections": [
    { "type": "navbar", "variant": "NavbarOne" | "NavbarTwo" },
    { "type": "hero", "variant": "HeroOne" | "HeroTwo" | "HeroThree" },
    { "type": "about", "variant": "AboutOne" | "AboutTwo" },
    { "type": "skills", "variant": "SkillsOne" | "SkillsTwo" },
    { "type": "projects", "variant": "ProjectsOne" | "ProjectsTwo" },
    { "type": "contact", "variant": "ContactOne" | "ContactTwo" },
    { "type": "footer", "variant": "FooterOne" }
  ],
  "content": {
    "tagline": "Short professional tagline (max 10 words)",
    "bio": "Professional bio paragraph (2-3 sentences)",
    "ctaText": "Primary CTA button text (3-5 words)",
    "ctaSecondaryText": "Secondary CTA text (3-5 words)"
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
Style: ${blueprint.layout}

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
