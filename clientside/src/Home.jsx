import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer';
import Navbar from './Navbar';
import GalleryCarousel from './GalleryCarousel'
import ContactForm from './ContactForm';
import EventCard from './EventCard';
import ScrollTo from './ScrollTo';
import LoadingScreen from './LoadingScreen'
import AboutCard from './AboutCard'; // Import the AboutCard component
import { Link } from 'react-router-dom'; // Import Link for navigation
import './App.css'
import './custom.css'
function Home() {
  return (
    <div>
      <ScrollTo /> {/* Component to handle smooth scroll */}
    <LoadingScreen/>
      <Navbar /> 
      <video autoPlay muted loop id="myVideo">
            <source src="/vid.mp4" type="video/mp4"/>
          </video> 
          <br></br>

      <div className="container my-5 text-center">
     
        {/* Add the AboutCard component here */}
        <section id="about">
          <AboutCard />
        </section>

        {/* Gallery Section */}
        <section id="gallery">
          <GalleryCarousel />
        </section>

        {/* Events Section */}
        <section id="events">
          <EventCard />
        </section>
      </div> 

      {/* Contact Section */}
      <section id="contact">
        <ContactForm />
      </section>

      <Footer />

    </div>
  );
}

export default Home;
