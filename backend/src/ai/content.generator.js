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

  // Merge with any existing blueprint content (AI fills gaps)
  return {
    tagline: content.tagline || `${userInput.title} & Problem Solver`,
    bio: content.bio || userInput.bio || `Hi, I'm ${userInput.name}.`,
    ctaText: content.ctaText || "View My Work",
    ctaSecondaryText: content.ctaSecondaryText || "Download Resume",
    aboutHeading: content.aboutHeading || "About Me",
    aboutSubtext: content.aboutSubtext || "A passionate developer.",
    skillsHeading: content.skillsHeading || "My Skills",
    projectsHeading: content.projectsHeading || "Featured Projects",
    contactHeading: content.contactHeading || "Get In Touch",
    contactSubtext: content.contactSubtext || "Feel free to reach out.",
  };
};

module.exports = { generateContent };
