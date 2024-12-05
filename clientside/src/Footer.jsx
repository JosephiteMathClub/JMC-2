import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';
import './custom.css'
import "bootstrap-icons/font/bootstrap-icons.css";
function Footer() {
  return (
    <footer className="custom-bg-black text-white py-5"> {/* Custom background */}
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <span className="logo --text-primary fs-4">Josephite Math Club</span>
          <div className="d-flex social-links">
            <a href="https://www.facebook.com/2015JMC/photos" className="me-3 ">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="https://www.instagram.com/jmc_._official/" className="">
              <i className="bi bi-instagram"></i>
            </a>
          </div>
        </div>

        <div className="row">
          {/* About Section */}
          <div className="col-6 col-md-3 mb-3">
            <h5 className="footer-cat">About</h5>
            <ul className="footer-cat-links list-unstyled">
              <li><a href="/executive" className="">Executive Members</a></li>
              <li><a href="/motto" className="">Club Motto</a></li>
              <li><a href="#" className="">Club History</a></li>
            </ul>
          </div>

          {/* Resources Section */}
          <div className="col-6 col-md-3 mb-3">
            <h5 className="footer-cat">Resources</h5>
            <ul className="footer-cat-links list-unstyled">
              <li><a href="/home#gallery" className="">Gallery</a></li>
              <li><a href="#" className="">Magazine Draft</a></li>
              <li><a href="#" className="">Club Activities</a></li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="col-6 col-md-3 mb-3">
            <h5 className="footer-cat">Quick Links</h5>
            <ul className="footer-cat-links list-unstyled">
              <li><a href="/home#home" className="">Home</a></li>
              <li><a href="/home#events" className="">Events</a></li>
              <li><a href="/article" className="">Articles</a></li>
              <li><a href="/home#contact" className="">Contact</a></li>
              <li><a href="/admin" className="">Admin</a></li>

            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="col-12 col-md-3 mb-3">
            <h5 className="footer-cat">Stay Connected</h5>
            <form id="subscribe" className="mb-2 --text-primary">
              <input
                type="email"
                className="form-control custom-bg-black text-white border-primary mb-2"
                placeholder="Email Address"
                required
              />
              <button type="submit" className="btn btn-primary w-100">Subscribe</button>
            </form>
            <div id="address" className="">
              <p className="mb-1">Club Location</p>
              <div>97 Asad Avenue<br />Mohammadpur, Dhaka-1207</div>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <small className="text-secondary">&copy; 2024 All Rights Reserved | Designed proudly by JMC</small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
