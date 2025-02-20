import React, { use, useContext, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Logo from '../../olx-logo.png';
import './Login.css';
import { FirebaseContext } from '../../Store/FirebaseContext.jsx';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {Firebase,auth} = useContext(FirebaseContext)
    const navigate = useNavigate()
  
  const handleLogin = (e)=>{
    e.preventDefault();
    signInWithEmailAndPassword(auth,email,password).then(()=>{
      navigate('/')
    })
    .catch((error)=>{
      alert(error.message)
    })

  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button type='submit'>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
