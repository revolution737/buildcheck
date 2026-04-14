const express = require('express');
const router = express.Router();
const componentController = require('./controller');
const authMiddleware = require('../../middleware/auth');
const roleMiddleware = require('../../middleware/role');
const validateMiddleware = require('../../middleware/validator');
const { componentSchema, updateComponentSchema } = require('./validation');

/**
 * @swagger
 * /components:
 *   get:
 *     summary: List all components
 *     tags: [Components]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 */
router.get('/', authMiddleware, componentController.getAll);

/**
 * @swagger
 * /components/{id}:
 *   get:
 *     summary: Get a single component
 *     tags: [Components]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.get('/:id', authMiddleware, componentController.getById);

/**
 * @swagger
 * /components:
 *   post:
 *     summary: Create a component (Admin only)
 *     tags: [Components]
 *     security:
 *       - bearerAuth: []
 */
router.post('/', authMiddleware, roleMiddleware('ADMIN'), validateMiddleware(componentSchema), componentController.create);

/**
 * @swagger
 * /components/{id}:
 *   put:
 *     summary: Update a component (Admin only)
 *     tags: [Components]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', authMiddleware, roleMiddleware('ADMIN'), validateMiddleware(updateComponentSchema), componentController.update);

/**
 * @swagger
 * /components/{id}:
 *   delete:
 *     summary: Delete a component (Admin only)
 *     tags: [Components]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', authMiddleware, roleMiddleware('ADMIN'), componentController.remove);

module.exports = router;
