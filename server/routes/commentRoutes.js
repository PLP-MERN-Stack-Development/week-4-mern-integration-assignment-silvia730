import express from 'express';
import { getComments, addComment } from '../controllers/commentController.js';
import { body } from 'express-validator';
import auth from '../middleware/authMiddleware.js';

const router = express.Router({ mergeParams: true });

router.get('/', getComments);
router.post('/', auth, [body('content').notEmpty().withMessage('Content is required')], addComment);

export default router; 