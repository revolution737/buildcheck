const logger = require('../utils/logger');
const { formatResponse } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);

  const statusCode = err.statusCode || 500;
  
  // In production, only hide messages for true 500 Server Errors
  const message = (process.env.NODE_ENV === 'production' && statusCode === 500) 
    ? 'Internal Server Error' 
    : err.message;

  const code = err.code || 'INTERNAL_SERVER_ERROR';

  res.status(statusCode).json(formatResponse(false, null, message, code));
};

module.exports = errorHandler;
