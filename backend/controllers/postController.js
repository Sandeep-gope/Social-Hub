import Post from '../models/Post.js';

// GET /posts
export const getAllPosts = async (req, res) => {
  try {
    // Fetch all posts, sorted by newest first
    const posts = await Post.find().sort({ created_at: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error: error.message });
  }
};

// POST /posts
export const createPost = async (req, res) => {
  try {
    const { username, text } = req.body;
    
    // Handle image upload:
    // If using multer, req.file will contain the file info.
    // If the frontend sends a URL string directly, check req.body.image_url.
    let image_url = req.body.image_url || '';
    
    if (req.file) {
      // Assuming the server serves static files or uploads to cloud storage
      image_url = req.file.path.replace(/\\/g, "/");
    }

    const newPost = new Post({
      username,
      text,
      image_url,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: 'Error creating post', error: error.message });
  }
};

// POST /posts/:id/like
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    // Find post by ID and increment likes count by 1
    const updatedPost = await Post.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error liking post', error: error.message });
  }
};