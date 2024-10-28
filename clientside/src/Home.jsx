import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer';
import Navbar from './Navbar';
import AboutCard from './AboutCard'; // Import the AboutCard component
import { Link } from 'react-router-dom'; // Import Link for navigation
import './App.css'
import './custom.css'
function Home() {
  return (
    <div>
      <Navbar />
      <div className="container my-5 text-center">
        <h1>Josephite Math Club</h1>
        <p>Explore our blogs, events, and resources to enhance your math skills.</p>
        
        {/* Add the AboutCard component here */}
        <AboutCard />
        
        <div className="mt-4">
          <Link to="/events" className="btn btn-primary">Upcoming Events</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
