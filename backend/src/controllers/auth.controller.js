const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { hashPassword, comparePassword } = require("../utils/hash");
const { successResponse, errorResponse } = require("../utils/response");
const { sendEmail } = require("../services/email");
const { welcomeEmail } = require("../utils/email.content");

const signToken = (user) =>
  jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const setTokenCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return errorResponse(res, { statusCode: 409, message: "Email already registered" });
    }

    const hashed = await hashPassword(password);
    const user = await User.create({ name, email, password: hashed });

    const token = signToken(user);
    setTokenCookie(res, token);

    // Send welcome email (non-blocking)
    sendEmail({ to: email, subject: "Welcome to LaunchFolio 🚀", html: welcomeEmail(name) });

    return successResponse(res, {
      statusCode: 201,
      message: "Account created successfully",
      data: { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } },
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await comparePassword(password, user.password))) {
      return errorResponse(res, { statusCode: 401, message: "Invalid email or password" });
    }

    const token = signToken(user);
    setTokenCookie(res, token);

    return successResponse(res, {
      message: "Login successful",
      data: { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } },
    });
  } catch (err) {
    next(err);
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  return successResponse(res, { message: "Logged out successfully" });
};

const me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return errorResponse(res, { statusCode: 404, message: "User not found" });
    return successResponse(res, { data: { user } });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, logout, me };
