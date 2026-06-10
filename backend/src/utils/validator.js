const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const skillSchemaIT = Joi.object({
  name: Joi.string().required(),
  level: Joi.string().valid("beginner", "intermediate", "advanced", "expert").default("intermediate"),
  icon: Joi.string().allow("", null).optional(),
});

const skillSchemaNonIT = Joi.object({
  name: Joi.string().required(),
}).unknown(false);

const projectSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow("", null).optional(),
  techStack: Joi.array().items(Joi.string()).default([]),
  liveUrl: Joi.string().uri().allow("", null).optional(),
  githubUrl: Joi.string().uri().allow("", null).optional(),
  image: Joi.string().uri().allow("", null).optional(),
});

const educationSchema = Joi.object({
  institution: Joi.string().required(),
  degree: Joi.string().required(),
  field: Joi.string().allow("", null).optional(),
  startYear: Joi.string().allow("", null).optional(),
  endYear: Joi.string().allow("", null).optional(),
  description: Joi.string().allow("", null).optional(),
});

const serviceSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow("", null).optional(),
  price: Joi.string().allow("", null).optional(),
});

const testimonialSchema = Joi.object({
  name: Joi.string().required(),
  role: Joi.string().allow("", null).optional(),
  text: Joi.string().required(),
});

const gallerySchema = Joi.object({
  url: Joi.string().uri().required(),
  caption: Joi.string().allow("", null).optional(),
});

const hobbySchema = Joi.object({
  name: Joi.string().required(),
  emoji: Joi.string().allow("", null).optional(),
  description: Joi.string().allow("", null).optional(),
});

const achievementSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.string().allow("", null).optional(),
  description: Joi.string().allow("", null).optional(),
});

const contactSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  subject: Joi.string().max(150).allow("", null).optional(),
  message: Joi.string().min(5).max(2000).required(),
});

const portfolioInputSchema = Joi.object({
  // User type (IT or Non-IT)
  userType: Joi.string().valid("it", "nonit").default("it"),
  selectedSections: Joi.array().items(Joi.string()).default([]),

  // Core personal info
  name: Joi.string().required(),
  title: Joi.string().required(),
  bio: Joi.string().allow("", null).optional(),
  email: Joi.string().email().allow("", null).optional(),
  location: Joi.string().allow("", null).optional(),
  phone: Joi.string().allow("", null).optional(),
  profileImage: Joi.string().uri().allow("", null).optional(),
  resumeUrl: Joi.string().uri().allow("", null).optional(),
  customDomain: Joi.string().allow("", null).optional(),

  // IT sections
  skills: Joi.when("userType", {
    is: "it",
    then: Joi.array().items(skillSchemaIT).default([]),
    otherwise: Joi.array().items(skillSchemaNonIT).default([]),
  }),
  education: Joi.array().items(educationSchema).default([]),
  projects: Joi.array().items(projectSchema).default([]),

  // Non-IT optional sections
  services: Joi.array().items(serviceSchema).default([]),
  testimonials: Joi.array().items(testimonialSchema).default([]),
  gallery: Joi.array().items(gallerySchema).default([]),
  hobbies: Joi.array().items(hobbySchema).default([]),
  achievements: Joi.array().items(achievementSchema).default([]),

  // Social — allow any string keys (Instagram, TikTok, Facebook, etc.)
  social: Joi.object().pattern(Joi.string(), Joi.string().uri().allow("", null)).default({}),

  designPreferences: Joi.object({
    theme: Joi.string().valid("dark", "light", "auto").default("dark"),
    style: Joi.string().valid("minimal", "developer", "creative", "corporate", "glassmorphism", "futuristic", "modern", "bold", "elegant").default("creative"),
    primaryColor: Joi.string().allow("", null).optional(),
    fontPreference: Joi.string().allow("", null).optional(),
    palette: Joi.string().allow("", null).optional(),
    buttonColor: Joi.string().allow("", null).optional(),
    buttonTextColor: Joi.string().allow("", null).optional(),
    navBgColor: Joi.string().allow("", null).optional(),
    navLinkColor: Joi.string().allow("", null).optional(),
    textColor: Joi.string().allow("", null).optional(),
    heroAnimation: Joi.string().valid("fadeUp", "slideIn", "typewriter", "glow", "none").default("fadeUp"),
    logoStyle: Joi.string().valid("initial", "name", "photo", "photoName").default("initial"),
  }).default({}),
});

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
  if (error) {
    const errors = error.details.map((d) => d.message);
    return res.status(400).json({ success: false, message: "Validation failed", errors });
  }
  req.body = value;
  next();
};

module.exports = {
  validate,
  registerSchema,
  loginSchema,
  contactSchema,
  portfolioInputSchema,
};
