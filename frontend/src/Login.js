import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext/UserContext'; // Correctly import UserContext

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState('');
  const { setUser } = useContext(UserContext); // Correctly destructure setUser from context

  async function login(ev) {
    ev.preventDefault();
    try {
      const response = await fetch('http://localhost:4001/Api/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.ok) {
        const userinfo = await response.json();
        setUser(userinfo);
        setRedirect(true);
      } else {
        const data = await response.json();
        setError(data.message || 'Wrong credentials');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  }

  if (redirect) {
    return <Navigate to='/' />;
  }

  return (
    <form className='Login1' onSubmit={login}>
      <h2>Login User</h2>
      <input
        type='text'
        placeholder='Username'
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
        required
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
        required
      />
      <button type='submit'>Login</button>
      {error && <p className='error'>{error}</p>}
    </form>
  );
}
