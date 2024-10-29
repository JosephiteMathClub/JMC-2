import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer';
import Navbar from './Navbar';
import GalleryCarousel from './GalleryCarousel'
import ContactForm from './ContactForm';
import EventCard from './EventCard';
import AboutCard from './AboutCard'; // Import the AboutCard component
import { Link } from 'react-router-dom'; // Import Link for navigation
import './App.css'
import './custom.css'
function Home() {
  return (
    <div>
      <Navbar /> 
      <video autoPlay muted loop id="myVideo">
            <source src="../public/vid.mp4" type="video/mp4"/>
          </video> 
          <br></br>

      <div className="container my-5 text-center">
     
        {/* Add the AboutCard component here */}
        <section id="about">
        <AboutCard />
        </section>
        <GalleryCarousel />
 <EventCard />

      </div> 
    <ContactForm />

      <Footer />

    </div>
  );
}

export default Home;
