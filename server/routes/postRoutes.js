import express from 'express';
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} from '../controllers/postController.js';
import { body } from 'express-validator';
import auth from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
import commentRoutes from './commentRoutes.js';

const router = express.Router();

router.route('/')
  .get(getPosts)
  .post([
    auth,
    upload.single('featuredImage'),
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('category').notEmpty().withMessage('Category is required')
  ], createPost);

router.route('/:id')
  .get(getPostById)
  .put([
    auth,
    upload.single('featuredImage'),
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('category').notEmpty().withMessage('Category is required')
  ], updatePost)
  .delete(auth, deletePost);

router.use('/:id/comments', commentRoutes);

export default router;