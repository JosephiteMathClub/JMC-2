import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css'; // Assume the provided CSS is saved in this file

function Footer() {
  const footerToggle = (e) => {
    e.currentTarget.parentNode.querySelector('.footer-cat-links').classList.toggle('active');
    e.currentTarget.querySelector('.footer-toggle').classList.toggle('btnActive');
  };

  return (
    <footer>
      <div>
        <span className="logo">Josephite Math Club</span>
      </div>

      <div className="row">
        {/* About Section */}
        <div className="col-3">
          <div className="link-cat" onClick={footerToggle}>
            <span className="footer-toggle"></span>
            <span className="footer-cat">About</span>
          </div>
          <ul className="footer-cat-links">
            <li><a href="executive.html"><span>Executive Members</span></a></li>
            <li><a href="motto.html"><span>Club motto</span></a></li>
            <li><a href="#"><span>Club History</span></a></li>
          </ul>
        </div>

        {/* Resources Section */}
        <div className="col-3">
          <div className="link-cat" onClick={footerToggle}>
            <span className="footer-toggle"></span>
            <span className="footer-cat">Resources</span>
          </div>
          <ul className="footer-cat-links">
            <li><a href="#gallery"><span>Gallery</span></a></li>
            <li><a href="#"><span>Magazine Draft</span></a></li>
            <li><a href="#"><span>Math problems</span></a></li>
            <li><a href="#"><span>Mock tests</span></a></li>
            <li><a href="#"><span>Club activities</span></a></li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div className="col-3">
          <div className="link-cat" onClick={footerToggle}>
            <span className="footer-toggle"></span>
            <span className="footer-cat">Quick Links</span>
          </div>
          <ul className="footer-cat-links">
            <li><a href="#home"><span>Home</span></a></li>
            <li><a href="#events"><span>Events</span></a></li>
            <li><a href="#index.html#articles"><span>Articles</span></a></li>
            <li><a href="#contact"><span>Contact</span></a></li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className="col-3" id="newsletter">
          <span>Stay Connected</span>
          <form id="subscribe">
            <input type="email" id="subscriber-email" placeholder="Enter Email Address" />
            <input type="submit" value="Subscribe" id="btn-scribe" />
          </form>

          <div className="social-links social-2">
            <a href="https://www.facebook.com/2015JMC/photos"><i className="fab fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/jmc_._official/"><i className="fab fa-instagram"></i></a>
          </div>

          <div id="address">
            <span>Club Location</span>
            <ul>
              <li>
                <i className="far fa-building"></i>
                <div>97 Asad Avenue<br /> Mohammadpur, Dhaka-1207</div>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="social-links social-1 col-6">
          <a href="https://www.instagram.com/jmc_._official/"><i className="fab fa-facebook-f"></i></a>
          <a href="https://www.instagram.com/jmc_._official/"><i className="fab fa-instagram"></i></a>
        </div>
      </div>

      <div id="copyright">
        &copy; All Rights Reserved 2024
      </div>
      <div id="owner">
        <span>Designed by JMC</span>
      </div>
    </footer>
  );
}

export default Footer;
