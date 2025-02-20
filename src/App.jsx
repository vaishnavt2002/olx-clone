import React, { useContext, useEffect } from 'react';
import './App.css';
import Home from './Pages/Home';
import { Route, Routes } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create'
import { AuthContext } from './Store/FirebaseContext';
import { auth } from './Firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import View from './Components/View/View';
import Post from './Store/PostContext';
function App() {
  const {user,setUser} = useContext(AuthContext)
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      setUser(user)
    })
  })
  return (
    <div>
      <Post>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/view' element={<View/>}/>
      </Routes>
      </Post>
    </div>
    
  );
}

export default App;
