const { Router } = require("express");
const {
  createPortfolio,
  listPortfolios,
  getPortfolio,
  getPortfolioStatus,
} = require("../controllers/portfolio.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { validate, portfolioInputSchema } = require("../utils/validator");

const router = Router();

router.use(authMiddleware);

router.post("/", validate(portfolioInputSchema), createPortfolio);
router.get("/", listPortfolios);
router.get("/:id", getPortfolio);
router.get("/:id/status", getPortfolioStatus);

module.exports = router;
