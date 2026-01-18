import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/create')} className='bg-blue-500 text-white font-bold px-2 p-1 rounded text-xl'>Create Post</button>
    </div>
  )
}

export default Navbar
