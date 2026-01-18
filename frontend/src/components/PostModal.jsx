import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostModal = ({ post, onClose }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [username, setUsername] = useState('');

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/posts/${post._id}/comments`);
      setComments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !newComment) return;
    
    await axios.post(`http://localhost:5000/posts/${post._id}/comment`, {
      username,
      comment: newComment
    });
    setNewComment('');
    fetchComments();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto relative shadow-xl">
        <button onClick={onClose} className="absolute top-3 right-4 text-gray-500 hover:text-black font-bold text-xl">✕</button>
        <h2 className="text-xl font-bold mb-4 border-b pb-2">Comments</h2>
        
        <div className="mb-6 space-y-3">
          {comments.length === 0 ? <p className="text-gray-500">No comments yet.</p> : null}
          {comments.map(c => (
            <div key={c._id} className="bg-gray-100 p-3 rounded">
              <span className="font-bold text-blue-600">{c.username}</span>
              <p className="text-gray-800">{c.comment}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 border-t pt-4">
          <input type="text" placeholder="Your Name" value={username} onChange={e => setUsername(e.target.value)} className="border p-2 rounded w-full" required />
          <textarea placeholder="Add a comment..." value={newComment} onChange={e => setNewComment(e.target.value)} className="border p-2 rounded w-full" required />
          <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Post Comment</button>
        </form>
      </div>
    </div>
  );
};

export default PostModal;