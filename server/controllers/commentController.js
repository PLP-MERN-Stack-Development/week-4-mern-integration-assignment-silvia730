import Comment from '../models/Comment.js';
import { validationResult } from 'express-validator';

// Get all comments for a post
export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.id }).populate('author', 'username');
    res.json(comments);
  } catch (error) {
    next(error);
  }
};

// Add a comment to a post
export const addComment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { content } = req.body;
    const comment = new Comment({
      content,
      author: req.user.id,
      post: req.params.id
    });
    await comment.save();
    await comment.populate('author', 'username');
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
}; 