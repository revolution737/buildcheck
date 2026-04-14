const express = require('express');
const router = express.Router();
const User = require('../auth/model');
const authMiddleware = require('../../middleware/auth');
const roleMiddleware = require('../../middleware/role');
const { formatResponse } = require('../../utils/response');

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: List all users (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.get('/users', authMiddleware, roleMiddleware('ADMIN'), async (req, res, next) => {
  try {
    const users = await User.find({}).select('-passwordHash');
    res.status(200).json(formatResponse(true, users));
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /admin/users/{id}/role:
 *   patch:
 *     summary: Change user role (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.patch('/users/:id/role', authMiddleware, roleMiddleware('ADMIN'), async (req, res, next) => {
  try {
    const { role } = req.body;
    if (!['USER', 'ADMIN'].includes(role)) {
       return res.status(400).json(formatResponse(false, null, 'Invalid role', 'BAD_REQUEST'));
    }
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-passwordHash');
    if (!user) {
        return res.status(404).json(formatResponse(false, null, 'User not found', 'NOT_FOUND'));
    }
    res.status(200).json(formatResponse(true, user, 'Role updated successfully'));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
