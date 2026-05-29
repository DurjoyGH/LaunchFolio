/**
 * Component template registry.
 * Maps section types to their template generator functions.
 * Each generator receives { blueprint, userInput, content } and returns a JSX string.
 */

const { getHeroTemplate } = require("./sections/hero.templates");
const { getNavbarTemplate } = require("./sections/navbar.templates");
const { getAboutTemplate } = require("./sections/about.templates");
const { getSkillsTemplate } = require("./sections/skills.templates");
const { getEducationTemplate } = require("./sections/education.templates");
const { getProjectsTemplate } = require("./sections/projects.templates");
const { getContactTemplate } = require("./sections/contact.templates");
const { getFooterTemplate } = require("./sections/footer.templates");
const { getGalleryTemplate } = require("./sections/gallery.templates");
const { getServicesTemplate } = require("./sections/services.templates");
const { getTestimonialsTemplate } = require("./sections/testimonials.templates");
const { getHobbiesTemplate } = require("./sections/hobbies.templates");
const { getAchievementsTemplate } = require("./sections/achievements.templates");

const SECTION_GENERATORS = {
  navbar: getNavbarTemplate,
  hero: getHeroTemplate,
  about: getAboutTemplate,
  skills: getSkillsTemplate,
  education: getEducationTemplate,
  projects: getProjectsTemplate,
  gallery: getGalleryTemplate,
  services: getServicesTemplate,
  testimonials: getTestimonialsTemplate,
  hobbies: getHobbiesTemplate,
  achievements: getAchievementsTemplate,
  contact: getContactTemplate,
  footer: getFooterTemplate,
};

module.exports = { SECTION_GENERATORS };
