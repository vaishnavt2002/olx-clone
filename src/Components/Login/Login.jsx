import React, { use, useContext, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Logo from '../../olx-logo.png';
import './Login.css';
import { FirebaseContext } from '../../Store/FirebaseContext.jsx';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Login() {
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('');
  const {Firebase,auth} = useContext(FirebaseContext)
    const navigate = useNavigate()
  
  const handleLogin = async(e)=>{
    e.preventDefault();
    setErrorMessage("")
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      setErrorMessage(error.message); // Display Firebase error message
    }

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

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <Link to={"/signup"}>
        <p>Signup</p>
        </Link>
      </div>
    </div>
  );
}

export default Login;
