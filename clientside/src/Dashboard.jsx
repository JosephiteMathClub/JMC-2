import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';
import './custom.css';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    axios.get('http://localhost:3001/user', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      setUserData(response.data);
    })
    .catch(error => {
      console.error("Error fetching user data:", error);
      navigate('/login');
    });
  }, [navigate]);

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <div className="d-flex flex-grow-1">
        <nav className="bg-dark text-white p-3" style={{ minWidth: '250px' }} role="tablist">
          <h4 className="text-center --text-primary">Dashboard</h4>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link text-white" to="#profile" data-bs-toggle="tab" role="tab">
                <i className="bi bi-person-fill"></i> Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="#quizzes" data-bs-toggle="tab" role="tab">
                <i className="bi bi-file-earmark-text"></i> Quizzes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="#events" data-bs-toggle="tab" role="tab">
                <i className="bi bi-calendar-event"></i> Events
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex-grow-1 p-4 --text-secondary">
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade" id="profile" role="tabpanel">
              <h3 class="--text-primary">Profile</h3>
              {userData ? (
                <div>
                  <p><strong>Name:</strong> {userData.name}</p>
                  <p><strong>Email:</strong> {userData.email}</p>
                  <p><strong>Institute:</strong> {userData.institute}</p>
                  <p><strong>Class:</strong> {userData.classd}</p>
                  <p><strong>Roll:</strong> {userData.roll}</p>
                  <p><strong>Section:</strong> {userData.section}</p>
                  <p><strong>Phone:</strong> {userData.phone}</p>
                </div>
              ) : (
                <p>Loading user data...</p>
              )}
            </div>

            <div className="tab-pane fade" id="quizzes" role="tabpanel">
              <h3>Quizzes</h3>
              <p>List of quizzes available for you.</p>
            </div>

            <div className="tab-pane fade" id="events" role="tabpanel">
              <h3>Events</h3>
              <p>Upcoming events will be displayed here.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;
