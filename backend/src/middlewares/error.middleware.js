const { errorResponse } = require("../utils/response");

/**
 * Global error handler — must be last middleware in Express chain.
 */
// eslint-disable-next-line no-unused-vars
const errorMiddleware = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.url}:`, err.message);

  // Mongoose validation errors
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return errorResponse(res, { statusCode: 400, message: "Validation failed", errors });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return errorResponse(res, {
      statusCode: 409,
      message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
    });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return errorResponse(res, { statusCode: 401, message: "Invalid token" });
  }

  if (err.name === "TokenExpiredError") {
    return errorResponse(res, { statusCode: 401, message: "Token expired" });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  return errorResponse(res, { statusCode, message });
};

module.exports = errorMiddleware;
