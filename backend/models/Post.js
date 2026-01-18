import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    // Optional, as a post might just be text
  },
  likes: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Post', postSchema);