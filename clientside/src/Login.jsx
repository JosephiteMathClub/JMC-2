import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './custom.css';
import Footer from './Footer';
import Navbar from './Navbar';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading status
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    setErrorMessage(''); // Clear previous error messages

    axios.post('http://localhost:3001/login', formData)
      .then(result => {
        if (result.data.token) {
          localStorage.setItem('token', result.data.token); // Store the token
        }
        console.log("Login success:", result);
        navigate('/dashboard');
      })
      .catch(err => {
        console.error("Login error:", err);
        setErrorMessage(err.response?.data?.error || "Login failed. Please try again."); // Set error message
      })
      .finally(() => {
        setLoading(false); // Reset loading state
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="card bg-dark text-white p-4 shadow-lg" style={{ maxWidth: '400px', margin: 'auto' }}>
          <h2 className="text-center text-primary mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
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

            {/* Error Message */}
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="text-center mt-3">
            <p className="text-secondary">Don't have an account?{' '}
              <Link to="/signup" className="text-primary">Click here</Link>
            </p>
          </div>
        </div>
      </div>
      <br />
      <Footer />
    </div>
  );
}

export default Login;
