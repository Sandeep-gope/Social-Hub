import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [username, setUsername] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('text', text);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('http://localhost:5000/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/');
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Create New Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="font-semibold">Username</label>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="border p-2 rounded" placeholder="Enter your username" required />
        
        <label className="font-semibold">Message</label>
        <textarea value={text} onChange={e => setText(e.target.value)} className="border p-2 rounded h-24" placeholder="What's on your mind?" required />
        
        <label className="font-semibold">Image (Optional)</label>
        <input type="file" onChange={e => setImage(e.target.files[0])} className="border p-2 rounded" accept="image/*" />
        
        <button type="submit" className="bg-green-600 text-white py-2 rounded mt-4 hover:bg-green-700 transition font-bold">Post Update</button>
      </form>
    </div>
  );
};

export default CreatePost
