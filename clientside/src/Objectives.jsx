import React from 'react';
import './App.css'; // Ensure the styles are applied
import './Obj.css'
function Objectives() {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-5 --text-primary --section-text">Our Objectives</h2>
      <div className="row justify-content-center">
        <div className="col-md-3 mb-4">
          <div className="objective-box">
            <i className="fas fa-calculator fa-3x"></i>
            <h4>Problem Solving</h4>
            <p>
              Develop your math skills through challenging problems and real-world
              applications. Build critical thinking and problem-solving abilities.
            </p>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="objective-box">
            <i className="fas fa-trophy fa-3x"></i>
            <h4>Olympiad Preparation</h4>
            <p>
              Preparing for math Olympiads helps you think outside the box and tackle
              advanced problems with confidence.
            </p>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="objective-box">
            <i className="fas fa-lightbulb fa-3x"></i>
            <h4>Creativity</h4>
            <p>
              Learn how creativity fuels problem-solving. Apply mathematical thinking
              in innovative ways.
            </p>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="objective-box">
            <i className="fas fa-heart fa-3x"></i>
            <h4>Love for Math</h4>
            <p>
              Embrace your passion for mathematics and explore its beauty in a
              supportive environment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Objectives;
