const { Router } = require("express");
const { register, login, logout, me } = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { validate, registerSchema, loginSchema } = require("../utils/validator");

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);
router.get("/me", authMiddleware, me);

module.exports = router;
