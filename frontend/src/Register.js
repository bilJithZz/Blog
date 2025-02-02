import React, { useState } from 'react'

const Register = () => {

  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")

 async function register(ev){
    ev.preventDefault();
    await fetch('http://localhost:4001/Api/register',{
      method:'POST',
      body:JSON.stringify({username,password}),
      headers:{'Content-Type':'application/json'}
    })
    }
  return (
    <form className='Register' onSubmit={register}>
        <h2>Register User</h2>
        <input type="text" placeholder='username' value={username} onChange={ev=>setUsername(ev.target.value)}/>
        <input type="password" placeholder='password' value={password} onChange={ev=>setPassword(ev.target.value)}/>
        <button>Register</button>
    </form>
  )
}

export default Register