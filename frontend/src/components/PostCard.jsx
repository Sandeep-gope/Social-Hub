import React from 'react';
import axios from 'axios';
import { AiTwotoneLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";

const PostCard = ({ post, onCommentClick, refreshPosts }) => {
  const handleLike = async () => {
    try {
      await axios.post(`http://localhost:5000/posts/${post._id}/like`);
      refreshPosts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="border rounded-lg p-4 mb-4 shadow-sm bg-white">
      <div className="font-bold mb-2 text-lg">{post.username}</div>
      <p className="mb-3 text-gray-800">{post.text}</p>
      {post.image_url && (
        <img 
          src={`http://localhost:5000/${post.image_url}`} 
          alt="Post" 
          className="w-full h-64 object-cover rounded mb-3"
        />
      )}
      <div className="flex gap-4 text-sm font-semibold text-gray-600 border-t pt-2">
        <button onClick={handleLike} className="hover:text-red-500 flex items-center gap-1">
            <AiTwotoneLike size = {20}/>
           {post.likes} Likes
        </button>
        <button onClick={onCommentClick} className="hover:text-blue-500 flex items-center gap-1">
            <FaRegCommentAlt size = {16}/>
           Comments
        </button>
      </div>
    </div>
  );
};

export default PostCard;