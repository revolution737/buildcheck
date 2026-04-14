const { formatResponse } = require('../utils/response');

const validateMiddleware = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      const fieldErrors = {};
      const issues = error.issues || error.errors || [];
      
      issues.forEach((err) => {
        fieldErrors[err.path.join('.')] = err.message;
      });

      return res.status(422).json({
        success: false,
        error: 'Validation failed',
        code: 'VALIDATION_ERROR',
        fields: fieldErrors,
      });
    }
  };
};

module.exports = validateMiddleware;
