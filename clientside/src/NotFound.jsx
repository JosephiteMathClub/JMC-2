import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'; // Optional, for custom styling

function NotFound() {
  return (
    <div className="not-found-container text-center">
      <h1 className="display-3 text-primary">404</h1>
      <p className="lead text-secondary">Page Not Found</p>
      <p>We're sorry, but the page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary mt-3">
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;
