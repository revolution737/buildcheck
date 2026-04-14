const componentService = require('./service');
const { formatResponse } = require('../../utils/response');

const getAll = async (req, res, next) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const components = await componentService.getAll(filter);
    res.status(200).json(formatResponse(true, components));
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const component = await componentService.getById(req.params.id);
    res.status(200).json(formatResponse(true, component));
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const component = await componentService.create(req.body);
    res.status(201).json(formatResponse(true, component, 'Component created successfully'));
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const component = await componentService.update(req.params.id, req.body);
    res.status(200).json(formatResponse(true, component, 'Component updated successfully'));
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await componentService.remove(req.params.id);
    res.status(200).json(formatResponse(true, null, 'Component deleted successfully'));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
