import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import '../Styles/NavBar.css';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">-
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          <span className="menu-icon"></span>
        </button>
      </div>

      
      <ul className={`nav-list ${menuOpen ? 'active' : ''}`}>
        {isAuthenticated ? (
          <>
            <li className="nav-item">
              <button>
                <Link to="/home" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Home
                </Link>
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="nav-link"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <button>
                <Link to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
              </button>
            </li>
            <li className="nav-item">
              <button>
                <Link to="/home" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Home
                </Link>
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
