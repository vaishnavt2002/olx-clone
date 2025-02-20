import React, { useContext, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../Store/FirebaseContext.jsx';
import { db } from '../../Firebase/config';
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { auth } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const validatePhone = (phone) => {
    return /^[4-9]\d{9}$/.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username || !email || !phone || !password) {
      setErrorMessage("All fields are required.");
      return;
    }
    if (!validatePhone(phone)) {
      setErrorMessage("Invalid phone number");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: username });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        username: username,
        email: email,
        phone: phone,
        createdAt: new Date(),
      });

      console.log("User profile updated and saved in Firestore");
      navigate('/login');
    } catch (error) {
      setErrorMessage(error.message); 
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <Link to="/login">
          <p>Login</p>
        </Link>
      </div>
    </div>
  );
}
