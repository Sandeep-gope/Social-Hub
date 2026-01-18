import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
import PostModal from '../components/PostModal';
import Navbar from '../components/Navbar';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/posts');
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto flex flex-col gap-2">
      <div className='flex justify-center gap-10'>
        <h1 className='text-center text-4xl font-bold text-fuchsia-400'>Social Hub</h1>
        <div className='mt-1'>
          <Navbar/>
        </div>
      </div>
      {posts.map(post => (
        <PostCard 
          key={post._id} 
          post={post} 
          onCommentClick={() => setSelectedPost(post)}
          refreshPosts={fetchPosts}
        />
      ))}
      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
};

export default Home;