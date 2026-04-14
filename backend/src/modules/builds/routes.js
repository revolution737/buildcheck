const express = require('express');
const router = express.Router();
const buildController = require('./controller');
const authMiddleware = require('../../middleware/auth');
const validateMiddleware = require('../../middleware/validator');
const { createBuildSchema, updateBuildSchema } = require('./validation');

/**
 * @swagger
 * /builds:
 *   get:
 *     summary: List my builds
 *     tags: [Builds]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', authMiddleware, buildController.getMyBuilds);

/**
 * @swagger
 * /builds/{id}:
 *   get:
 *     summary: Get build detail
 *     tags: [Builds]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', authMiddleware, buildController.getById);

/**
 * @swagger
 * /builds:
 *   post:
 *     summary: Create a build
 *     tags: [Builds]
 *     security:
 *       - bearerAuth: []
 */
router.post('/', authMiddleware, validateMiddleware(createBuildSchema), buildController.create);

/**
 * @swagger
 * /builds/{id}:
 *   put:
 *     summary: Update a build
 *     tags: [Builds]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', authMiddleware, validateMiddleware(updateBuildSchema), buildController.update);

/**
 * @swagger
 * /builds/{id}:
 *   delete:
 *     summary: Delete a build
 *     tags: [Builds]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', authMiddleware, buildController.remove);

module.exports = router;
