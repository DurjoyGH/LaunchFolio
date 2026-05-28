const { Router } = require("express");
const authRoutes = require("./auth.routes");
const portfolioRoutes = require("./portfolio.routes");
const uploadRoutes = require("./upload.routes");

const router = Router();

router.use("/auth", authRoutes);
router.use("/portfolio", portfolioRoutes);
router.use("/upload", uploadRoutes);

module.exports = router;
