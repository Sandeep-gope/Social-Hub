import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

// POST /posts/:id/comment
export const addComment = async (req, res) => {
  try {
    const { id } = req.params; // post_id
    const { username, comment } = req.body;

    // Optional: Verify post exists before commenting
    const postExists = await Post.exists({ _id: id });
    if (!postExists) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newComment = new Comment({
      post_id: id,
      username,
      comment,
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(400).json({ message: 'Error adding comment', error: error.message });
  }
};

// GET /posts/:id/comments
export const getCommentsByPostId = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Comment.find({ post_id: id }).sort({ created_at: -1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error: error.message });
  }
};