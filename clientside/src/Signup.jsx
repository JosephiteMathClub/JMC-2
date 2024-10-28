import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'; // Import Link for navigation
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    institute: '',
    class: '',
    roll: '',
    section: '',
    phone: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/signup', formData)
    .then(response => console.log("Submitted successfully:", response))
    navigate('/login')
    .catch(err => console.log("Submission error:", err));
      console.log("Submitted data:", formData);
  };

  return (
    <div className="container mt-5">
      <div className="card bg-dark text-white p-4 shadow-lg" style={{ maxWidth: '500px', margin: 'auto' }}>
        <h2 className="text-center text-primary mb-4">Registration</h2>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control bg-dark text-white border-primary"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Name"
            />
            <label htmlFor="name" className="text-secondary">Name</label>
          </div>

          {/* Institute */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control bg-dark text-white border-primary"
              id="institute"
              name="institute"
              value={formData.institute}
              onChange={handleChange}
              required
              placeholder="Institute"
            />
            <label htmlFor="institute" className="text-secondary">Institute</label>
          </div>

          {/* Class */}
          <div className="form-floating mb-3">
            <input
              type="number"
              className="form-control bg-dark text-white border-primary"
              id="class"
              name="class"
              value={formData.class}
              onChange={handleChange}
              min="3"
              max="12"
              required
              placeholder="Class"
            />
            <label htmlFor="class" className="text-secondary">Class</label>
          </div>

          {/* Roll */}
          <div className="form-floating mb-3">
            <input
              type="number"
              className="form-control bg-dark text-white border-primary"
              id="roll"
              name="roll"
              value={formData.roll}
              onChange={handleChange}
              maxLength="4"
              required
              placeholder="Roll"
            />
            <label htmlFor="roll" className="text-secondary">Roll</label>
          </div>

          {/* Section */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control bg-dark text-white border-primary"
              id="section"
              name="section"
              value={formData.section}
              onChange={handleChange}
              required
              placeholder="Section"
            />
            <label htmlFor="section" className="text-secondary">Section</label>
          </div>

          {/* Phone */}
          <div className="form-floating mb-3">
            <input
              type="tel"
              className="form-control bg-dark text-white border-primary"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              pattern="[0-9]{11}"
              required
              placeholder="Phone Number"
            />
            <label htmlFor="phone" className="text-secondary">Phone Number</label>
          </div>

          {/* Email */}
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control bg-dark text-white border-primary"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email"
            />
            <label htmlFor="email" className="text-secondary">Email</label>
          </div>

          {/* Password */}
          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control bg-dark text-white border-primary"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
            />
            <label htmlFor="password" className="text-secondary">Password</label>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="text-secondary">Already registered before?{' '}
          <Link to="/login" className="text-primary">Click here</Link> {/* Corrected */}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
