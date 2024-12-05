import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Include your custom styles here

function AboutCard() {
  return (
    <div className="about-section py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Text Section */}
          <div className="col-lg-6 text-light">
            <h2 className=" --section-text">About Us</h2>
            <p className="lead">
              The Josephite Math Club is dedicated to cultivating a passion for mathematics.
              Our mission is to provide a supportive environment for students to explore mathematical
              concepts, participate in competitions, and engage in math-related events.
            </p>
            <p className="lead">
              Join us to experience the world of mathematics in a whole new way!
            </p>
          </div>

          {/* Image Section */}
          <div className="col-lg-6 text-center">
            <img
              src="../public/mbg.png" // Replace with a mathematical image URL
              alt="Mathematical Representation"
              className="img-fluid rounded shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutCard;
