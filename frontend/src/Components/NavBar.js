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
    <nav className="nav">
      
      <div className="menu-toggle">
        <input
          type="checkbox"
          id="menu-toggle"
          checked={menuOpen}
          onChange={toggleMenu}
        />
        <label htmlFor="menu-toggle" className="menu-icon">
          <span></span>
          <span></span>
        </label>
      </div>

      
      <ul className={`menu ${menuOpen ? 'active' : ''}`}>
        {isAuthenticated ? (
          <>
            <li>
              <button><Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link></button>
            </li>
            <li>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
            <button><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></button>
            </li>
            <li>
            <button><Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link></button>
            </li>
            <li>
            <button><Link to="/uploadgame" onClick={() => setMenuOpen(false)}>Upload Game</Link></button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
