/**
 * Builds structured prompts for different AI tasks.
 * Keeps prompt engineering centralized and testable.
 */

const buildBlueprintPrompt = (userInput) => {
  const {
    name,
    title,
    bio,
    userType = "it",
    skills = [],
    projects = [],
    education = [],
    services = [],
    testimonials = [],
    gallery = [],
    hobbies = [],
    achievements = [],
    social = {},
    selectedSections = [],
    designPreferences = {},
  } = userInput;

  const skillNames = skills.map((s) => s.name).join(", ") || "None";
  const projectTitles = projects.map((p) => p.title).join(", ") || "None";
  const serviceTitles = services.map((s) => s.title).join(", ") || "None";
  const { theme = "dark", style = "modern", primaryColor, fontPreference, palette } = designPreferences;

  // Build section list based on user type
  let sectionGuide = "";
  if (userType === "nonit") {
    const mandatory = ["navbar", "hero", "about", "education", "contact", "footer"];
    const optional = selectedSections || [];
    const allSections = [...mandatory.slice(0, 3), ...optional, ...mandatory.slice(3)];
    sectionGuide = `
The user selected these sections (MANDATORY + optional): ${allSections.join(", ")}
ONLY include these exact sections in your response. Do NOT add extra sections.`;
  } else {
    sectionGuide = `
Include these sections: navbar, hero, about, skills, education, projects, contact, footer.
If user has no projects, you may skip "projects".`;
  }

  return `
You are a professional portfolio design AI for LaunchFolio.

Your job is to analyze the user's profile and generate a UNIQUE portfolio blueprint.
Every portfolio must feel VISUALLY DISTINCT. Vary layouts aggressively.

== USER INFORMATION ==
User Type: ${userType === "nonit" ? "Non-IT / General" : "IT / Developer"}
Name: ${name}
Professional Title: ${title}
Bio: ${bio || "Not provided"}
Skills: ${skillNames}
Projects: ${projectTitles}
Services: ${serviceTitles}
Has Gallery: ${gallery.length > 0}
Has Testimonials: ${testimonials.length > 0}
Has Hobbies: ${hobbies.length > 0}
Has Achievements: ${achievements.length > 0}
Design Style: ${style}
Theme: ${theme}
Color Palette: ${palette || "Not specified"}
Primary Color: ${primaryColor || "Auto"}
Font: ${fontPreference || "Auto"}

== SECTION RULES ==${sectionGuide}

== AVAILABLE COMPONENT VARIANTS ==
- navbar: NavbarCentered, NavbarGlass, NavbarMinimal, NavbarBold, NavbarFloating
- hero: HeroCentered, HeroSplit, HeroGradient, HeroMinimal, HeroCreative, HeroGrid
- about: AboutCard, AboutTimeline, AboutSplit, AboutMinimal
- skills: SkillsGrid, SkillsProgress, SkillsCards, SkillsTags
- education: EducationTimeline, EducationCards, EducationMinimal
- projects: ProjectsGrid, ProjectsShowcase, ProjectsMinimal, ProjectsCards, ProjectsMasonry
- gallery: GalleryMasonry, GalleryGrid, GalleryShowcase
- services: ServicesGrid, ServicesCards, ServicesMinimal
- testimonials: TestimonialsCards, TestimonialsGrid, TestimonialsQuote
- hobbies: HobbiesGrid, HobbiesCards, HobbiesList
- achievements: AchievementsCards, AchievementsTimeline, AchievementsTrophy
- contact: ContactModern, ContactSplit, ContactGlass, ContactMinimal
- footer: FooterSimple, FooterCentered, FooterColumns

== STYLE PERSONALITIES ==
Choose ONE: "minimal", "developer", "creative", "corporate", "glassmorphism", "futuristic"

== DESIGN TOKENS ==
- spacing: "compact" | "comfortable" | "spacious"
- radius: "none" | "sm" | "md" | "lg" | "full"
- shadow: "none" | "soft" | "medium" | "dramatic"
- animation: "none" | "subtle" | "smooth" | "energetic"

== CRITICAL RULES ==
1. VARY component choices. Never use the same combination twice.
2. Choose colors that are NOT generic. Be creative with the palette.
3. For Non-IT users, prefer clean/modern/elegant styles.
4. Each section MUST use a DIFFERENT variant from previous generations.

Return ONLY this JSON:

{
  "theme": "dark" | "light",
  "font": "Inter" | "Poppins" | "Raleway" | "Roboto" | "Space Grotesk" | "Montserrat" | "Nunito" | "Playfair Display",
  "primaryColor": "#hexcode",
  "secondaryColor": "#hexcode",
  "accentColor": "#hexcode",
  "personality": "...",
  "designTokens": { "spacing": "...", "radius": "...", "shadow": "...", "animation": "..." },
  "sections": [
    { "type": "navbar", "variant": "..." },
    { "type": "hero", "variant": "..." },
    ... only sections the user selected ...
  ],
  "content": {
    "tagline": "Short tagline (max 10 words)",
    "bio": "Professional bio (2-3 sentences) — ONLY if user did not provide one",
    "ctaText": "CTA button text",
    "ctaSecondaryText": "Secondary CTA text",
    "aboutHeading": "About section heading",
    "skillsHeading": "Skills heading",
    "projectsHeading": "Projects heading",
    "contactHeading": "Contact heading",
    "contactSubtext": "Contact subtext"
  }
}
`;
};

const buildContentPrompt = (userInput, blueprint) => {
  return `
You are a professional copywriter for personal portfolios.

User profile:
Name: ${userInput.name}
Title: ${userInput.title}
User Type: ${userInput.userType === "nonit" ? "Non-technical / General" : "IT / Developer"}
Personality: ${blueprint.personality || "creative"}

Write professional content. Return JSON:
{
  "tagline": "...",
  "bio": "...",
  "ctaText": "...",
  "ctaSecondaryText": "...",
  "aboutHeading": "...",
  "skillsHeading": "...",
  "projectsHeading": "...",
  "contactHeading": "...",
  "contactSubtext": "..."
}
`;
};

module.exports = { buildBlueprintPrompt, buildContentPrompt };
