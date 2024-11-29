import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './Styles/App.css';
import Home from './Home';
import Login from './login';
import Register from './register';
import Game from './Game';
import Navbar from './Components/NavBar';
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/game" element={<Game />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        <footer>
          <p>Copyright 2024</p>
        </footer>
      </div>
      </AuthProvider>
  );
}

export default App;