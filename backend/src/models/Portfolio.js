const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Raw user input
    input: {
      name: { type: String, required: true },
      title: { type: String, required: true },
      bio: { type: String },
      email: { type: String },
      location: { type: String },
      phone: { type: String },
      profileImage: { type: String }, // Cloudinary URL
      resumeUrl: { type: String },    // Cloudinary URL
      customDomain: { type: String },  // User-chosen subdomain prefix
      skills: [
        {
          name: { type: String },
          level: { type: String, enum: ["beginner", "intermediate", "advanced", "expert"] },
          icon: { type: String },
        },
      ],
      projects: [
        {
          title: { type: String },
          description: { type: String },
          techStack: [String],
          liveUrl: { type: String },
          githubUrl: { type: String },
          image: { type: String }, // Cloudinary URL
        },
      ],
      education: [
        {
          institution: { type: String },
          degree: { type: String },
          field: { type: String },
          startYear: { type: String },
          endYear: { type: String },
          description: { type: String },
        },
      ],
      social: {
        github: { type: String },
        linkedin: { type: String },
        twitter: { type: String },
        website: { type: String },
      },
      designPreferences: {
        theme: { type: String, enum: ["dark", "light", "auto"], default: "dark" },
        style: { type: String, enum: ["modern", "minimal", "bold", "elegant", "developer", "creative", "corporate", "glassmorphism", "futuristic"], default: "creative" },
        primaryColor: { type: String },
        fontPreference: { type: String },
        buttonColor: { type: String },
        buttonTextColor: { type: String },
        navBgColor: { type: String },
        navLinkColor: { type: String },
        textColor: { type: String },
        heroAnimation: { type: String, enum: ["fadeUp", "slideIn", "typewriter", "glow", "none"], default: "fadeUp" },
        logoStyle: { type: String, enum: ["initial", "name", "photo", "photoName"], default: "initial" },
      },
    },

    // AI-generated blueprint
    blueprint: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    // Generation status
    status: {
      type: String,
      enum: ["queued", "generating", "building", "deploying", "deployed", "failed"],
      default: "queued",
    },

    // GitHub and Vercel metadata
    deployment: {
      githubRepo: { type: String, default: null },
      vercelProjectId: { type: String, default: null },
      vercelDeployId: { type: String, default: null },
      deployUrl: { type: String, default: null },
    },

    // Error tracking
    error: {
      message: { type: String, default: null },
      at: { type: Date, default: null },
    },

    generatedAt: { type: Date, default: null },
    deployedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Portfolio", portfolioSchema);
