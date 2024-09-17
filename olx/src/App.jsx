import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Create from './pages/Create';
import {AuthContext,FirebaseContext} from "./store/FirebaseContext";
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";

function App() {

  const {setuser} =useContext(AuthContext)
  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user); 
      if (user) {
        setuser(user);
      } else {
        setuser(null);
      }
    });
    return () => unsubscribe();
  }, [setuser]);


  return (
   <>
    <Router>
    <Routes>
        <Route path="/" element={<Home />}/>  
      </Routes>
      <Routes>
        <Route path="/signup" element={<Signup/>}/>  
      </Routes>
      <Routes>
        <Route path="/login" element={<Login/>}/>  
      </Routes>
      <Routes>
        <Route path="/create" element={<Create/>}/>  
      </Routes>
    </Router>

   </>
  );
}

export default App;
