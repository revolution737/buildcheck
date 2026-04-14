const buildService = require('./service');
const { formatResponse } = require('../../utils/response');

const getMyBuilds = async (req, res, next) => {
  try {
    const builds = await buildService.getMyBuilds(req.user.id);
    res.status(200).json(formatResponse(true, builds));
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const build = await buildService.getById(req.params.id, req.user.id);
    res.status(200).json(formatResponse(true, build));
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const build = await buildService.create(req.user.id, req.body);
    res.status(201).json(formatResponse(true, build, 'Build saved successfully'));
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const build = await buildService.update(req.params.id, req.user.id, req.body);
    res.status(200).json(formatResponse(true, build, 'Build updated successfully'));
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await buildService.remove(req.params.id, req.user.id);
    res.status(200).json(formatResponse(true, null, 'Build deleted successfully'));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMyBuilds,
  getById,
  create,
  update,
  remove,
};
