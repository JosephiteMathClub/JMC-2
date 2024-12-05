import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is included
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Ensure Bootstrap JS bundle is included (with collapse functionality)
import './custom.css'; // Your custom CSS file
import { useNavigate } from 'react-router-dom';
import './navbar.css';
function Navbar() {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/signup'); // Navigates to the target route
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-bg-black">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home"><img src="jmc (1).png"/></Link>
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
          <ul className="navbar-nav mx-auto"> {/* Center the links */}
            <li className="nav-item">
              <Link className="nav-link text-secondary" to="/home#about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-secondary" to="/article">Articles</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-secondary" to="/home#contact">Contact</Link>
            </li>
          </ul>
          <button className="eventbtn ms-lg-3 btnn" onClick={handleNavigation}> <strong className="strong">Register</strong>
  <div id="container-stars">
    <div id="stars"></div>
  </div>
  <div id="glow">
    <div className="circle"></div>
    <div className="circle"></div>
  </div>
  </button> {/* Button at the far right */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
