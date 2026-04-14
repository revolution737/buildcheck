const compatibilityService = require('./service');
const Component = require('../components/model');
const { formatResponse } = require('../../utils/response');

const check = async (req, res, next) => {
  try {
    const { componentIds } = req.body;
    const components = await Component.find({ _id: { $in: componentIds } });
    
    // Maintain order if necessary, though the service doesn't strictly require it
    const result = compatibilityService.checkCompatibility(components);
    res.status(200).json(result); // Returning raw result as per prompt request
  } catch (error) {
    next(error);
  }
};

module.exports = { check };
