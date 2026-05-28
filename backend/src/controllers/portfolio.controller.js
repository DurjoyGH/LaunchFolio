const Portfolio = require("../models/Portfolio");
const { enqueuePortfolioJob } = require("../queues/generation.queue");
const { successResponse, errorResponse } = require("../utils/response");

const createPortfolio = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.create({
      userId: req.user.id,
      input: req.body,
      status: "queued",
    });

    await enqueuePortfolioJob(portfolio._id.toString());

    return successResponse(res, {
      statusCode: 202,
      message: "Portfolio generation started",
      data: { portfolioId: portfolio._id, status: "queued" },
    });
  } catch (err) {
    next(err);
  }
};

const listPortfolios = async (req, res, next) => {
  try {
    const portfolios = await Portfolio.find({ userId: req.user.id })
      .select("status input.name input.title deployment createdAt deployedAt")
      .sort("-createdAt")
      .limit(20)
      .lean();

    return successResponse(res, { data: { portfolios } });
  } catch (err) {
    next(err);
  }
};

const getPortfolio = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findOne({ _id: req.params.id, userId: req.user.id }).lean();
    if (!portfolio) return errorResponse(res, { statusCode: 404, message: "Portfolio not found" });
    return successResponse(res, { data: { portfolio } });
  } catch (err) {
    next(err);
  }
};

const getPortfolioStatus = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findOne({ _id: req.params.id, userId: req.user.id })
      .select("status deployment error")
      .lean();

    if (!portfolio) return errorResponse(res, { statusCode: 404, message: "Portfolio not found" });

    return successResponse(res, {
      data: {
        status: portfolio.status,
        deployUrl: portfolio.deployment?.deployUrl || null,
        error: portfolio.error?.message || null,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createPortfolio, listPortfolios, getPortfolio, getPortfolioStatus };
