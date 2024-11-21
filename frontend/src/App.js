import React from "react";
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Register from './register';
import Login from './login';
import Home from './Home';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/Login">Login</Link>
      </nav>
      <Routes>
        <Route exact path="/" element={Home} />
        <Route path="/register" element={Register} />
        <Route path="/Login" element={Login} />
      </Routes>
    </Router>
  );
}

export default App;