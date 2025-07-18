import express from 'express';
import { getCategories, createCategory } from '../controllers/categoryController.js';
import { body } from 'express-validator';

const router = express.Router();

router.get('/', getCategories);
router.post(
  '/',
  [body('name').notEmpty().withMessage('Name is required')],
  createCategory
);

export default router;
