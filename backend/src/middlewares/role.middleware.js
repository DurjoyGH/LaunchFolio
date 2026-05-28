const { errorResponse } = require("../utils/response");

/**
 * Restricts route to users with a specific role.
 * @param {...string} roles
 */
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return errorResponse(res, { statusCode: 401, message: "Authentication required" });
    }
    if (!roles.includes(req.user.role)) {
      return errorResponse(res, { statusCode: 403, message: "Access forbidden" });
    }
    next();
  };
};

module.exports = requireRole;
