const authService = require('./service');
const { formatResponse } = require('../../utils/response');
const User = require('./model');

const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(formatResponse(true, result, 'User registered successfully'));
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json(formatResponse(true, result, 'Login successful'));
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json(formatResponse(true, user));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe,
};
