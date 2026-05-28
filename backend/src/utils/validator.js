const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const skillSchema = Joi.object({
  name: Joi.string().required(),
  level: Joi.string().valid("beginner", "intermediate", "advanced", "expert").default("intermediate"),
  icon: Joi.string().allow("", null).optional(),
});

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

const portfolioInputSchema = Joi.object({
  name: Joi.string().required(),
  title: Joi.string().required(),
  bio: Joi.string().allow("", null).optional(),
  email: Joi.string().email().allow("", null).optional(),
  location: Joi.string().allow("", null).optional(),
  phone: Joi.string().allow("", null).optional(),
  profileImage: Joi.string().uri().allow("", null).optional(),
  resumeUrl: Joi.string().uri().allow("", null).optional(),
  customDomain: Joi.string().allow("", null).optional(),
  skills: Joi.array().items(skillSchema).default([]),
  education: Joi.array().items(educationSchema).default([]),
  projects: Joi.array().items(projectSchema).default([]),
  social: Joi.object({
    github: Joi.string().uri().allow("", null).optional(),
    linkedin: Joi.string().uri().allow("", null).optional(),
    twitter: Joi.string().uri().allow("", null).optional(),
    website: Joi.string().uri().allow("", null).optional(),
  }).default({}),
  designPreferences: Joi.object({
    theme: Joi.string().valid("dark", "light", "auto").default("dark"),
    style: Joi.string().valid("modern", "minimal", "bold", "elegant").default("modern"),
    primaryColor: Joi.string().allow("", null).optional(),
    fontPreference: Joi.string().allow("", null).optional(),
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
  portfolioInputSchema,
};
