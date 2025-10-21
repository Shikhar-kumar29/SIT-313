import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>DEV@Deakin</h1>
        </div>
        <nav className="nav">
          <a href="#home" className="nav-link">Home</a>
          <a href="#articles" className="nav-link">Articles</a>
          <a href="#questions" className="nav-link">Questions</a>
          <a href="#tutorials" className="nav-link">Tutorials</a>
        </nav>
        <div className="header-actions">
          <button className="btn btn-secondary">Log In</button>
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
