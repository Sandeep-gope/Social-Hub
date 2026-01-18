import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div>
      
      <Routes>
        <Route 
          path = '/'
          element = {<Home/>}
        />

        <Route 
          path = '/create'
          element = {<CreatePost/>}
        />
      </Routes>
    </div>
  )
}

export default App
