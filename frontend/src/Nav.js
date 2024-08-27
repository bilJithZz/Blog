import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import { UserContext } from './UserContext/UserContext';

const Nav = () => {

  const {user,setUser}=useContext(UserContext)

  useEffect(() => {
     fetch('http://localhost:4001/Api/profile', {
          credentials: 'include',
        }).then(response=>{
          response.json().then(userInfo=>{
            setUser(userInfo.username)
          })
        })
}, []); 

function logout(){
  fetch('http://localhost:4000/Api/logout',{
    credentials:'include',
    method:'POST',
  })
  setUser(null);
}


  return (
    <div className="nav">
      <div className="Blog">
        <a href="/">My Blog</a>
      </div>

      <nav>
        {user ? (
          <>
            <Link to="/create">Create Post</Link>
            <Link to="/login" onClick={logout}>Log Out</Link>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Nav;
