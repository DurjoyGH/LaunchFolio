const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/response");

const authMiddleware = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!token) {
      return errorResponse(res, { statusCode: 401, message: "Authentication required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return errorResponse(res, { statusCode: 401, message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
