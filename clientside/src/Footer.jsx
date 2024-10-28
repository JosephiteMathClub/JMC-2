import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';

function Footer() {
  return (
    <footer className="custom-bg-black text-white py-5"> {/* Custom background */}
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <span className="logo text-primary fs-4">Josephite Math Club</span>
          <div className="d-flex social-links">
            <a href="https://www.facebook.com/2015JMC/photos" className="me-3 text-secondary">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/jmc_._official/" className="text-secondary">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        <div className="row">
          {/* About Section */}
          <div className="col-6 col-md-3 mb-3">
            <h5 className="footer-cat">About</h5>
            <ul className="footer-cat-links list-unstyled">
              <li><a href="executive.html" className="text-secondary">Executive Members</a></li>
              <li><a href="motto.html" className="text-secondary">Club Motto</a></li>
              <li><a href="#" className="text-secondary">Club History</a></li>
            </ul>
          </div>

          {/* Resources Section */}
          <div className="col-6 col-md-3 mb-3">
            <h5 className="footer-cat">Resources</h5>
            <ul className="footer-cat-links list-unstyled">
              <li><a href="#gallery" className="text-secondary">Gallery</a></li>
              <li><a href="#" className="text-secondary">Magazine Draft</a></li>
              <li><a href="#" className="text-secondary">Math Problems</a></li>
              <li><a href="#" className="text-secondary">Mock Tests</a></li>
              <li><a href="#" className="text-secondary">Club Activities</a></li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="col-6 col-md-3 mb-3">
            <h5 className="footer-cat">Quick Links</h5>
            <ul className="footer-cat-links list-unstyled">
              <li><a href="#home" className="text-secondary">Home</a></li>
              <li><a href="#events" className="text-secondary">Events</a></li>
              <li><a href="#articles" className="text-secondary">Articles</a></li>
              <li><a href="#contact" className="text-secondary">Contact</a></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="col-12 col-md-3 mb-3">
            <h5 className="footer-cat">Stay Connected</h5>
            <form id="subscribe" className="mb-2">
              <input
                type="email"
                className="form-control custom-bg-black text-white border-secondary mb-2"
                placeholder="Enter Email Address"
                required
              />
              <button type="submit" className="btn btn-primary w-100">Subscribe</button>
            </form>
            <div id="address" className="text-secondary">
              <p className="mb-1">Club Location</p>
              <div>97 Asad Avenue<br />Mohammadpur, Dhaka-1207</div>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <small className="text-secondary">&copy; 2024 All Rights Reserved | Designed by JMC</small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
