import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Raw user input — stored as flexible Mixed so all user data is preserved
    input: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    // AI-generated blueprint
    blueprint: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    // Generation status
    status: {
      type: String,
      enum: ["queued", "generating", "building", "deploying", "deployed", "failed", "ready"],
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

export const Portfolio = mongoose.models.Portfolio || mongoose.model("Portfolio", portfolioSchema);
