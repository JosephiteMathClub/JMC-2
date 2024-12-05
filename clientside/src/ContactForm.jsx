import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Custom styles

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('');

    try {
      const response = await axios.post('http://localhost:3001/contact', formData);
      if (response.status === 200) {
        setStatusMessage('Message sent successfully!');
      } else {
        setStatusMessage('Error sending message. Please try again.');
      }
    } catch (error) {
      setStatusMessage('Error sending message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="apple-card p-5 rounded">
            <h2 className="text-center mb-4 --section-text --text-primary">Contact Us</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-wrapper mb-4">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder=" "
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="name">Your Name</label>
              </div>
              <div className="input-wrapper mb-4">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder=" "
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="email">Your Email</label>
              </div>
              <div className="input-wrapper mb-4">
                <textarea
                  id="message"
                  name="message"
                  placeholder=" "
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
                <label htmlFor="message">Your Message</label>
              </div>
              <div className="text-center">
                <button type="submit" className="apple-button" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send'}
                </button>
              </div>
            </form>
            {statusMessage && (
              <p className="text-center mt-4 status-message">{statusMessage}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
