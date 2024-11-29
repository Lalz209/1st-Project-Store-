import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import '../Styles/NavBar.css';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar">
      <ul className="nav-list">
        {isAuthenticated ? (
          <>
            <li className="nav-item">
              <button onClick={logout} className="nav-link">Logout</button>
            </li>
            <li className='home'>
              <button><Link to='/home' className='nav-link'>Home</Link></button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <button><Link to="/login" className="nav-link">Login</Link></button>
            </li>
            <li className='nav-item'>
              <button><Link to='/home' className='nav-link'>Home</Link></button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;