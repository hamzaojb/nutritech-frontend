import React from 'react';
import './Navbar.css';


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/home">NUTRITECH</a>
      </div>
      <ul className="navbar-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#about">Setting</a></li>

      </ul>
      <div className="navbar-buttons">
        <a href="/" className="navbar-login">Logout</a>
        
      </div>
    </nav>
  );
};

export default Navbar;
