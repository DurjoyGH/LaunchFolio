const { Queue, Worker } = require("bullmq");
const { getRedisClient } = require("../config/redis");
const Portfolio = require("../models/Portfolio");
const { planPortfolio } = require("../ai/portfolio.planner");
const { generateContent } = require("../ai/content.generator");
const { buildPortfolio } = require("../builders/portfolio.builder");
const { deployPortfolio } = require("../deploy/deploy.orchestrator");
const { sendEmail } = require("../services/email");
const { portfolioReadyEmail, generationFailedEmail } = require("../utils/email.content");
const User = require("../models/User");

const GENERATION_QUEUE = "portfolio-generation";

let generationQueue = null;

const getGenerationQueue = () => {
  if (generationQueue) return generationQueue;
  generationQueue = new Queue(GENERATION_QUEUE, { connection: getRedisClient() });
  return generationQueue;
};

/**
 * Enqueue a portfolio generation + deployment job.
 */
const enqueuePortfolioJob = async (portfolioId) => {
  const queue = getGenerationQueue();
  await queue.add(
    "generate",
    { portfolioId },
    {
      attempts: 3,
      backoff: { type: "exponential", delay: 5000 },
      removeOnComplete: 100,
      removeOnFail: 50,
    }
  );
};

/**
 * Start the generation worker (called once at server start).
 */
const startGenerationWorker = () => {
  const worker = new Worker(
    GENERATION_QUEUE,
    async (job) => {
      const { portfolioId } = job.data;
      const portfolio = await Portfolio.findById(portfolioId).lean();
      if (!portfolio) throw new Error("Portfolio not found");

      const user = await User.findById(portfolio.userId).lean();

      // 1. AI Planning
      await Portfolio.findByIdAndUpdate(portfolioId, { status: "generating" });
      const blueprint = await planPortfolio(portfolio.input);
      const content = await generateContent(portfolio.input, blueprint);
      const fullBlueprint = { ...blueprint, content };
      await Portfolio.findByIdAndUpdate(portfolioId, { blueprint: fullBlueprint });

      // 2. Build
      await Portfolio.findByIdAndUpdate(portfolioId, { status: "building" });
      const localPath = await buildPortfolio({
        portfolioId,
        blueprint: fullBlueprint,
        userInput: portfolio.input,
        content,
      });

      // 3. Deploy
      await Portfolio.findByIdAndUpdate(portfolioId, { status: "deploying" });
      const { repoUrl, deployUrl, vercelProjectId, vercelDeployId } = await deployPortfolio({
        portfolioId,
        userName: portfolio.input.name,
        localPath,
        customDomain: portfolio.input.customDomain,
      });

      // 4. Update record
      await Portfolio.findByIdAndUpdate(portfolioId, {
        status: "deployed",
        "deployment.githubRepo": repoUrl,
        "deployment.vercelProjectId": vercelProjectId,
        "deployment.vercelDeployId": vercelDeployId,
        "deployment.deployUrl": deployUrl,
        deployedAt: new Date(),
      });

      // 5. Notify user (non-critical — don't fail the job if email fails)
      if (user?.email) {
        try {
          await sendEmail({
            to: user.email,
            subject: "🚀 Your portfolio is live!",
            html: portfolioReadyEmail(user.name, deployUrl),
          });
        } catch (emailErr) {
          console.error("Email send failed:", emailErr.message);
        }
      }
    },
    {
      connection: getRedisClient(),
      concurrency: 2,
    }
  );

  worker.on("failed", async (job, err) => {
    console.error(`[Queue] Job ${job?.id} failed:`, err.message);
    if (job?.data?.portfolioId) {
      await Portfolio.findByIdAndUpdate(job.data.portfolioId, {
        status: "failed",
        "error.message": err.message,
        "error.at": new Date(),
      });

      // Notify user of failure (don't throw if email fails)
      try {
        const portfolio = await Portfolio.findById(job.data.portfolioId).lean();
        const user = portfolio ? await User.findById(portfolio.userId).lean() : null;
        if (user?.email) {
          await sendEmail({
            to: user.email,
            subject: "Portfolio generation failed",
            html: generationFailedEmail(user.name),
          });
        }
      } catch (emailErr) {
        console.error("Failure notification email failed:", emailErr.message);
      }
    }
  });

  worker.on("completed", (job) => {
    console.log(`[Queue] Job ${job.id} completed`);
  });

  console.log("✅ Portfolio generation worker started");
  return worker;
};

module.exports = { getGenerationQueue, enqueuePortfolioJob, startGenerationWorker };
