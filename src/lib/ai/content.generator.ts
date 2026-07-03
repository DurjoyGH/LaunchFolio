import { generateJSON } from "./gemini.client";
import { buildContentPrompt } from "./prompt.builder";

export const generateContent = async (userInput: any, blueprint: any) => {
  const prompt = buildContentPrompt(userInput, blueprint);
  const content = await generateJSON(prompt);

  const finalBio = (userInput.bio && userInput.bio.trim())
    ? userInput.bio
    : (content.bio || `Hi, I'm ${userInput.name}.`);

  return {
    tagline: content.tagline || `${userInput.title} & Problem Solver`,
    bio: finalBio,
    ctaText: content.ctaText || "View My Work",
    ctaSecondaryText: content.ctaSecondaryText || "Download Resume",
    aboutHeading: content.aboutHeading || "About Me",
    aboutSubtext: content.aboutSubtext || "",
    skillsHeading: content.skillsHeading || "My Skills",
    projectsHeading: content.projectsHeading || "Featured Projects",
    contactHeading: content.contactHeading || "Get In Touch",
    contactSubtext: content.contactSubtext || "Feel free to reach out.",
    servicesHeading: content.servicesHeading || "My Services",
    testimonialsHeading: content.testimonialsHeading || "What People Say",
    galleryHeading: content.galleryHeading || "Gallery",
    hobbiesHeading: content.hobbiesHeading || "Hobbies & Interests",
    achievementsHeading: content.achievementsHeading || "Achievements",
  };
};
