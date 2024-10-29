import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate for redirection
import Footer from './Footer';
import axios from 'axios';
import './custom.css'; // Your custom styles if any

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate(); // Initialize navigate for redirection

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve token from local storage

    // Check if token exists
    if (!token) {
      navigate('/login'); // Redirect to login if not logged in
      return;
    }

    // Fetch user data if token exists
    axios.get('http://localhost:3001/user', {
      headers: { Authorization: token },
    })
    .then(response => {
      setUserData(response.data);
    })
    .catch(error => {
      console.error("Error fetching user data:", error);
      navigate('/login'); // Redirect to login if there's an error fetching data
    });
  }, [navigate]); // Add navigate to dependency array

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      {/* Main Content Area */}
      <div className="d-flex flex-grow-1">
        {/* Side Navbar */}
        <nav className="bg-dark text-white p-3" style={{ minWidth: '250px' }}>
          <h4 className="text-center">Dashboard</h4>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link text-white" to="#profile" data-bs-toggle="tab">
                <i className="bi bi-person-fill"></i> Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="#quizzes" data-bs-toggle="tab">
                <i className="bi bi-file-earmark-text"></i> Quizzes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="#events" data-bs-toggle="tab">
                <i className="bi bi-calendar-event"></i> Events
              </Link>
            </li>
          </ul>
        </nav>

        {/* Main Tab Content */}
        <div className="flex-grow-1 p-4">
          <div className="tab-content" id="myTabContent">
            {/* Profile Tab */}
            <div className="tab-pane fade show active" id="profile" role="tabpanel">
              <h3>Profile</h3>
              {userData ? (
                <div>
                  <p><strong>Name:</strong> {userData.name}</p>
                  <p><strong>Email:</strong> {userData.email}</p>
                  <p><strong>Institute:</strong> {userData.institute}</p>
                  <p><strong>Class:</strong> {userData.class}</p>
                  <p><strong>Roll:</strong> {userData.roll}</p>
                  <p><strong>Section:</strong> {userData.section}</p>
                  <p><strong>Phone:</strong> {userData.phone}</p>
                </div>
              ) : (
                <p>Loading user data...</p>
              )}
            </div>

            {/* Quizzes Tab */}
            <div className="tab-pane fade" id="quizzes" role="tabpanel">
              <h3>Quizzes</h3>
              <p>List of quizzes available for you.</p>
            </div>

            {/* Events Tab */}
            <div className="tab-pane fade" id="events" role="tabpanel">
              <h3>Events</h3>
              <p>Upcoming events will be displayed here.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Dashboard;
