import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css';
import { useNavigate } from 'react-router-dom';

function EventCard() {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLearnMoreClick = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const navigateLogin = () => {
    // Navigate to the register page
    navigate('/signup');
  };
  return (
    <div classd="mx-auto mt-4 p-4 container my-5">
      {/* Event Card */}
      <h2 className="text-center mb-4 --text-primary">Upcoming Events</h2>

      <div className="card event-card mb-4 custom-bg-black" style={{ width: '18rem' }}>
        <img
          src="https://via.placeholder.com/200x100"
          className="card-img-top"
          alt="Event Thumbnail"
          style={{ borderRadius: '8px 8px 0 0' }}
        />
        <div className="card-body text-center">
          <h5 className="card-title --text-primary">Josephite Math Mania Inter</h5>
          <p className="card-text text-secondary">
            Short description of the event.
          </p>
          <button className="btn btn-primary" onClick={handleLearnMoreClick}>
            Learn More
          </button>
        </div>
      </div>

      {/* Zoomed-In Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div
            className="modal-content glassmorphism text-white position-relative p-4"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside modal
          >
            <button
              className="btn-close position-absolute top-0 end-0 m-3"
              onClick={handleCloseModal}
              aria-label="Close"
            ></button>
            <h3 className="--text-primary">Josephite Math Mania Inter</h3>
            <p className="text-secondary">
              Here is a more detailed description of the event, including date, time, and location.
            </p>
            <p className="text-secondary">
              Additional details about speakers, agenda, or any other specifics.
            </p>
            <button className="btn btn-primary mt-3" onClick={navigateLogin}>
              Register Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventCard;
