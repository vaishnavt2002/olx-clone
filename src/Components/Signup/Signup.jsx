import React, { useContext, useState } from 'react';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged ,updateProfile} from "firebase/auth";
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../Store/FirebaseContext.jsx';
import { db } from '../../Firebase/config';
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const {Firebase,auth} =useContext(FirebaseContext)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return updateProfile(user, { displayName: username }).then(() => user); // Return user
      })
      .then((user) => {
        return setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          username: username,
          email: email,
          phone: phone,
          createdAt: new Date(),
        });
      })
      .then(() => {
        console.log("User profile updated and saved in Firestore");
        navigate('/login')
      })
      .catch((error) => {
        console.error("Error signing up:", error);
      });
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
           
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
        
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
           
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
       
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
