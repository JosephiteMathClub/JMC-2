import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
function AboutCard() {
  return (
    <div className="glass-card mx-auto mt-4 p-4" id="about" style={{ maxWidth: '400px' }}>
      <h2>About</h2>
      <p>
        The Josephite Math Club is dedicated to cultivating a passion for mathematics.
        Our mission is to provide a supportive environment for students to explore mathematical
        concepts, participate in competitions, and engage in math-related events. Join us to
        experience the world of mathematics in a whole new way!
      </p>
    </div>
  );
}

export default AboutCard;
