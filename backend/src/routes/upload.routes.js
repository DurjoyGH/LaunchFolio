const { Router } = require("express");
const { uploadProfileImage, uploadProjectImage } = require("../controllers/upload.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

const router = Router();

router.use(authMiddleware);

router.post("/profile", upload.single("image"), uploadProfileImage);
router.post("/project", upload.single("image"), uploadProjectImage);

module.exports = router;
