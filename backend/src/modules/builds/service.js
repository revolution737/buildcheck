const Build = require('./model');

const getMyBuilds = async (userId) => {
  return await Build.find({ userId }).populate('components');
};

const getById = async (id, userId) => {
  const build = await Build.findOne({ _id: id, userId }).populate('components');
  if (!build) {
    const error = new Error('Build not found');
    error.statusCode = 404;
    error.code = 'NOT_FOUND';
    throw error;
  }
  return build;
};

const create = async (userId, { name, componentIds }) => {
  return await Build.create({
    userId,
    name,
    components: componentIds,
  });
};

const update = async (id, userId, { name, componentIds }) => {
  const build = await Build.findOneAndUpdate(
    { _id: id, userId },
    { ...(name && { name }), ...(componentIds && { components: componentIds }) },
    { new: true }
  ).populate('components');
  
  if (!build) {
    const error = new Error('Build not found');
    error.statusCode = 404;
    error.code = 'NOT_FOUND';
    throw error;
  }
  return build;
};

const remove = async (id, userId) => {
  const build = await Build.findOneAndDelete({ _id: id, userId });
  if (!build) {
    const error = new Error('Build not found');
    error.statusCode = 404;
    error.code = 'NOT_FOUND';
    throw error;
  }
  return build;
};

module.exports = {
  getMyBuilds,
  getById,
  create,
  update,
  remove,
};
