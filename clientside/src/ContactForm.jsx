import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Assuming your custom CSS is in App.css

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/contact', formData);
      setStatusMessage('Message sent successfully!');
    } catch (error) {
      setStatusMessage('Error sending message. Please try again.');
    }
  };

  return (
    <div className="container my-5">
      <div className="glass-card p-4">
        <h2 className="text-center mb-4 --text-primary">Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-secondary">Name</label>
            <input
              type="text"
              className="form-control custom-bg-black text-white border-secondary"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-secondary">Email</label>
            <input
              type="email"
              className="form-control custom-bg-black text-white border-secondary"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label text-secondary">Message</label>
            <textarea
              className="form-control custom-bg-black text-white border-secondary"
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">Send Message</button>
          </div>
        </form>
        {statusMessage && <p className="text-center mt-3 text-secondary">{statusMessage}</p>}
      </div>
    </div>
  );
}

export default ContactForm;
