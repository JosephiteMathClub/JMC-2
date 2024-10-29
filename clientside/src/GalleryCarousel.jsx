import React from 'react';
import {Carousel} from "react-bootstrap";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css'; // Make sure custom.css is imported here for the color scheme

// Sample images (you can replace these with your own images)
const images = [
  { src: './one.jpg', alt: 'Slide 1' },
  { src: './one.webp', alt: 'Slide 2' },
  { src: './three.jpg', alt: 'Slide 3' },
  { src: './two.jpg', alt: 'Slide 4' },
  { src: './four.jpg', alt: 'Slide 5' },
  { src: './five.jpg', alt: 'Slide 6' },
  { src: './six.jpg', alt: 'Slide 7' },
];

function GalleryCarousel() {
  return (
    <div className="container my-5">
      <h2 className="--text-primary text-center mb-4">Gallery</h2>
      <Carousel
        indicators={false} // Hide indicators if you prefer
        prevLabel=""
        nextLabel=""
        className="custom-carousel"
      >
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100 rounded"
              src={image.src}
              alt={image.alt}
              style={{ boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.3)' }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default GalleryCarousel;
