import Post from './Post';
import './App.css';
import Nav from './Nav';
import { Route,Routes } from 'react-router-dom';
import Login from './Login';
// import Layout from './Layout'
import Register from './Register';
import DetailPost from './DetailPost/DetailPost';
import CreatPost from './CreatePost/CreatPost';
import { useState } from 'react';
import { UserContextProvider } from './UserContext/UserContext';



function App() {

 
  return (
    <div>
      <UserContextProvider>
       <Nav />
      <Routes>

        <Route path='/' element={<Post />} />
        <Route path='/login' element={<Login  />}/>
        <Route path='/detailPost' element={<DetailPost />}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/create' element={<CreatPost/>}/>
    </Routes>
  </UserContextProvider>
  </div>
   
  );
}

export default App;
