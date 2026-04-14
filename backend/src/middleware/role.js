const { formatResponse } = require('../utils/response');

const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json(formatResponse(false, null, 'Insufficient permissions', 'FORBIDDEN'));
    }
    next();
  };
};

module.exports = roleMiddleware;
