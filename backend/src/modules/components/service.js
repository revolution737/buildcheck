const Component = require('./model');

const getAll = async (filter = {}) => {
  return await Component.find(filter);
};

const getById = async (id) => {
  const component = await Component.findById(id);
  if (!component) {
    const error = new Error('Component not found');
    error.statusCode = 404;
    error.code = 'NOT_FOUND';
    throw error;
  }
  return component;
};

const create = async (data) => {
  return await Component.create(data);
};

const update = async (id, data) => {
  const component = await Component.findByIdAndUpdate(id, data, { new: true });
  if (!component) {
    const error = new Error('Component not found');
    error.statusCode = 404;
    error.code = 'NOT_FOUND';
    throw error;
  }
  return component;
};

const remove = async (id) => {
  const component = await Component.findByIdAndDelete(id);
  if (!component) {
    const error = new Error('Component not found');
    error.statusCode = 404;
    error.code = 'NOT_FOUND';
    throw error;
  }
  return component;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
