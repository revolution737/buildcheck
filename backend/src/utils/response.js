/**
 * @param {boolean} success 
 * @param {any} data 
 * @param {string} message 
 * @param {string} code 
 */
const formatResponse = (success, data = null, message = '', code = null) => {
  if (success) {
    return {
      success: true,
      data,
      ...(message && { message }),
    };
  }
  return {
    success: false,
    error: message,
    ...(code && { code }),
  };
};

module.exports = { formatResponse };
