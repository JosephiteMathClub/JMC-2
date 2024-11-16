import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import './custom.css'; // Import your CSS or SCSS file here if using custom colors

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg custom-bg-black"> {/* Custom classd for background */}
      <div className="container-fluid">
        <Link className="navbar-brand --text-primary" to="/home">JMC</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-secondary" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-secondary" to="/home#about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-secondary" to="/home#events">Events</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-secondary" to="/article">Articles</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-secondary" to="/home#contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
