import React, { useContext, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create';
import View from './Components/View/View';
import { AuthContext } from './Store/FirebaseContext';
import { auth } from './Firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import Post from './Store/PostContext';
import ViewPost from './Pages/ViewPost';

function App() {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [setUser]);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <div>
      <Post>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route
            path='/create'
            element={
              <ProtectedRoute>
                <Create />
              </ProtectedRoute>
            }
          />
          <Route path='/view' element={<ViewPost />} />
        </Routes>
      </Post>
    </div>
  );
}

export default App;
