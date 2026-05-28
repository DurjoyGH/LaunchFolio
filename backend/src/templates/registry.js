/**
 * Component template registry.
 * Maps component variant names to their template generator functions.
 * Each generator receives { blueprint, userInput, content } and returns a JSX string.
 */

const { getHeroTemplate } = require("./sections/hero.templates");
const { getNavbarTemplate } = require("./sections/navbar.templates");
const { getAboutTemplate } = require("./sections/about.templates");
const { getSkillsTemplate } = require("./sections/skills.templates");
const { getProjectsTemplate } = require("./sections/projects.templates");
const { getContactTemplate } = require("./sections/contact.templates");
const { getFooterTemplate } = require("./sections/footer.templates");

const SECTION_GENERATORS = {
  navbar: getNavbarTemplate,
  hero: getHeroTemplate,
  about: getAboutTemplate,
  skills: getSkillsTemplate,
  projects: getProjectsTemplate,
  contact: getContactTemplate,
  footer: getFooterTemplate,
};

module.exports = { SECTION_GENERATORS };
