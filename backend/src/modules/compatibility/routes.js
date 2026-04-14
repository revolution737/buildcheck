const express = require('express');
const router = express.Router();
const compatibilityController = require('./controller');
const authMiddleware = require('../../middleware/auth');

/**
 * @swagger
 * /compatibility/check:
 *   post:
 *     summary: Check compatibility of a set of components
 *     tags: [Compatibility]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               componentIds:
 *                 type: array
 *                 items:
 *                   type: string
 */
router.post('/check', authMiddleware, compatibilityController.check);

module.exports = router;
