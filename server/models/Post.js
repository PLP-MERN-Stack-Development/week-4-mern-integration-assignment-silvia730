import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true 
  },
  featuredImage: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Post', postSchema);