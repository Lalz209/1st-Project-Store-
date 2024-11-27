import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/NavBar.css';

function Navbar() {
  // Cheking if user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simulación de verificar el estado de autenticación (puedes reemplazar esto con tu lógica real)
  useEffect(() => {
    const token = localStorage.getItem('token'); // O cualquier otra forma de obtener el estado de autenticación
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    // Lógica para cerrar sesión
    localStorage.removeItem('token'); // Elimina el token o realiza la lógica de cierre de sesión
    setIsAuthenticated(false); // Actualiza el estado
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
        {isAuthenticated ? (
          <>
            <li className="nav-item">
              <button onClick={handleLogout} className="nav-link">Logout</button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
