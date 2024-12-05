import React, { useEffect, useState } from 'react';
import './App.css'; // Assuming your custom CSS file is imported here
import { Container, Row, Col } from 'react-bootstrap';

const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const targetDate = new Date('December 5, 2024 00:00:00').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    return difference > 0
      ? {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      : { days: 0o0, hours: 0o0, minutes: 0o0, seconds: 0o0 };
  }

  return (
    <div className="hero-section">
      <Container fluid className="text-center py-5">
      <Row className="justify-content-start align-items-center hero-title-container">
  <Col md={6} className="text-start">
    <h1 className="display-4 text-primary fw-bold mb-3">
      <span className="d-block">Josephite</span>
      <span className="d-block">Math</span>
      <span className="d-block">Mania</span>
    </h1>
    <p className="lead mb-5">5th December @SJHSS</p>
  </Col>
</Row>

        <Row className="justify-content-center">
          <Col xs={6} md={3} className="countdown-box --card ">
            <h2 className="text-primary">{timeLeft.days}</h2>
            <p className="">Days</p>
          </Col>
          <Col xs={6} md={3} className="countdown-box --card ">
            <h2 className="text-primary">{timeLeft.hours}</h2>
            <p className="">Hours</p>
          </Col>
          <Col xs={6} md={3} className="countdown-box --card ">
            <h2 className="text-primary">{timeLeft.minutes}</h2>
            <p className="">Minutes</p>
          </Col>
          <Col xs={6} md={3} className="countdown-box --card ">
            <h2 className="text-primary">{timeLeft.seconds}</h2>
            <p className="">Seconds</p>
          </Col>
        </Row>
      </Container>
      <div className="floating-math-icons">
        {/* Add floating math symbols */}
        <span className="math-icon">π</span>
        <span className="math-icon">∫</span>
        <span className="math-icon">e</span>
        <span className="math-icon">Σ</span>
        <span className="math-icon">√</span>
      </div>
      <div className="hero-curve">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      className="glassy-curve"
    >
      <path
        fill="rgba(0, 170, 255, 0.2)" /* Slightly transparent */
        d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,186.7C672,171,768,117,864,90.7C960,64,1056,64,1152,90.7C1248,117,1344,171,1392,197.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      ></path>
    </svg>
  </div>
    </div>
  );
};

export default HeroSection;
