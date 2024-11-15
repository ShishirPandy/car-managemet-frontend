import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';  

const Header = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session data (e.g., token, user data)
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Optional if you store user data
    onLogout(); // Call the passed logout function
    navigate('/'); // Redirect to login page
  };

  return (
    <header className="header">
      <section className="header-content">
        <div className="logo-container">
          <img src='/unnamed.png' alt="Decorative" className='header-image' />
          <Link to="/" className="logo">Car Management</Link>
        </div>
      </section>

      <div className="user-info">
        {user ? (
          <>
            <span className="welcome-message">Welcome, {user.name}</span>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login" className="login-link">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
