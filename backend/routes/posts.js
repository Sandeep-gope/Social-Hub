import express from 'express';
import multer from 'multer';
import path from 'path';
import * as postController from '../controllers/postController.js';
import * as commentController from '../controllers/commentController.js';

const router = express.Router();
// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Post Routes
router.get('/', postController.getAllPosts);
router.post('/', upload.single('image'), postController.createPost);
router.post('/:id/like', postController.likePost);

// Comment Routes
router.post('/:id/comment', commentController.addComment);
router.get('/:id/comments', commentController.getCommentsByPostId);

export default router;