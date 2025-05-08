import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout, role } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false); // cerrar menú al logout
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Cerrar menú al navegar
  const handleLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="navbar">
       <button
        className=  {`menu-toggle${isMenuOpen ? ' open' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
      >
        &#9776;
      </button>
      <div className="logo">
        <Link to="/dashboard" onClick={handleLinkClick}>SPA App</Link>
      </div>

      <div className={`nav-links${isMenuOpen ? ' open' : ''}`}>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard/profile" onClick={handleLinkClick}>Mi Perfil</Link>
            {role === 'admin' && <Link to="/dashboard/users" onClick={handleLinkClick}>Gestión Usuarios</Link>}
            <button onClick={handleLogout} className="btn-logout">Cerrar Sesión</button>
          </>
        ) : (
          <Link to="/login" onClick={handleLinkClick}>Login</Link>
        )}
      </div>

      <style>{`
        /* Navbar base */
        .navbar {
          display: flex;
          flex-direction: column;
          background-color: #007bff;
          color: white;
          height: 100vh;
          width: 200px;
          padding: 1rem;
          box-sizing: border-box;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1000;
        }
        .logo a {
          color: white;
          text-decoration: none;
          font-weight: 700;
          font-size: 1.5rem;
          margin-bottom: 2rem;
          user-select: none;
        }
        .nav-links {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          user-select: none;
        }
        .nav-links a {
          color: white;
          text-decoration: none;
          font-weight: 500;
          user-select: none;
          padding: 0.4rem 0.6rem;
          border-radius: 4px;
          transition: background-color 0.3s;
        }
        .nav-links a:hover {
          background-color: rgba(255 255 255 / 0.2);
        }
        .btn-logout {
          background: none;
          border: 1px solid white;
          color: white;
          padding: 0.3rem 0.7rem;
          border-radius: 3px;
          cursor: pointer;
          user-select: none;
          width: 10rem;
          margin-top: 1rem;
          transition: background-color 0.3s, color 0.3s;
          text-align: center;
        }
        .btn-logout:hover {
          background-color: white;
          color: #007bff;
        }
        .menu-toggle {
          display: none; /* oculto en escritorio */
          background: none;
          border: none;
          color: white;
          font-size: 2rem;
          cursor: pointer;
          user-select: none;
          z-index: 1500;
        }

        /* Mobile styles */
        @media (max-width: 768px) {
          .navbar {
            width: 100%;
            height: 60px;
            position: fixed;
            top: 0;
            left: 0;
            padding: 0 1rem;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            z-index: 1000;
          }
          .logo {
            display: flex;
            align-items: center;
          }
          .logo a {
            font-size: 1.3rem;
            margin-bottom: 0;
          }
          .menu-toggle {
            display: flex;
            position: static;
            align-items: center;
            font-size: 2rem;
            margin-top: 0 !important
          }
          .nav-links {
            position: fixed;
            top: 50px;
            left: 0;
            width: 84%;
            height: calc(102vh - 60px);
            background-color: #007bff;
            flex-direction: column;
            overflow-y: auto;
            padding: 1.5rem 2rem;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
            box-sizing: border-box;
            z-index: 1100;
          }
          .nav-links.open {
            transform: translateX(0);
          }
          .nav-links a {
            font-size: 1.2rem;
            padding: 0.8rem 1rem;
          }
          .btn-logout {
            width: 100%;
            margin-top: 2rem;
            font-size: 1.1rem;
          }

           /* Mobile styles */
        @media (max-width: 480px) {
          .button {
          height: 50px
          margin-top: 0;
           
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
