import React from "react";
import "./MottoPage.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
const MottoPage = () => {
return (
    <>
    <Navbar />
    <div className="motto-page">
      {/* Header Section */}
      <section className="motto-header">
        <h1 className="motto-title">Josephite Math Club</h1>
        <h2 className="motto-tagline">Let Infinity Be Your Limit</h2>
      </section>

      {/* Infinity Animation */}
      <div className="motto-animation">
        <svg
          className="motto-infinity-symbol"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 50"
        >
          <path d="M10 25c0-8.3 6.7-15 15-15s15 6.7 15 15-6.7 15-15 15S10 33.3 10 25zM60 25c0-8.3 6.7-15 15-15s15 6.7 15 15-6.7 15-15 15-15-6.7-15-15z" />
        </svg>
      </div>

      {/* Motto Description */}
      <section className="motto-description">
        <h3 className="motto-highlight">Unlocking the infinite potential within.</h3>
        <p>
          At the Josephite Math Club, we believe that the possibilities of mathematics are limitless.
          Our motto inspires every member to reach beyond boundaries, embrace challenges, and explore
          the infinite beauty of numbers, logic, and creativity.
        </p>
      </section>
      <br></br>
      <br></br>
      <br></br>


    </div>
    <Footer />
    </>
  );
};

export default MottoPage;
