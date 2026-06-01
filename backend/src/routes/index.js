const { Router } = require("express");
const authRoutes = require("./auth.routes");
const portfolioRoutes = require("./portfolio.routes");
const uploadRoutes = require("./upload.routes");
const contactRoutes = require("./contact.routes");

const router = Router();

router.use("/auth", authRoutes);
router.use("/portfolio", portfolioRoutes);
router.use("/upload", uploadRoutes);
router.use("/contact", contactRoutes);

module.exports = router;
