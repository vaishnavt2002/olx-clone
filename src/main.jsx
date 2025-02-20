import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider, { FirebaseContext } from './Store/FirebaseContext.jsx'
import { Firebase,auth } from './Firebase/config.js'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <AuthContextProvider>
    <FirebaseContext.Provider value={{Firebase,auth}}>
      <App />
      </FirebaseContext.Provider>
      </AuthContextProvider>
    </BrowserRouter>    
)
