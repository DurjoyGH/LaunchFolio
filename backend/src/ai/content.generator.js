const { generateJSON } = require("./gemini.client");
const { buildContentPrompt } = require("./prompt.builder");

/**
 * Generates enhanced portfolio content from user input + blueprint context.
 * @param {Object} userInput
 * @param {Object} blueprint
 * @returns {Promise<Object>} content
 */
const generateContent = async (userInput, blueprint) => {
  const prompt = buildContentPrompt(userInput, blueprint);
  const content = await generateJSON(prompt);

  // BIO PRIORITY: User's own bio is sacred — never override it with AI content
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

module.exports = { generateContent };
