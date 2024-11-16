import React, { useEffect, useState } from 'react';
import './LoadingScreen.css';

function LoadingScreen() {
  const [displayText, setDisplayText] = useState('');
  const fullText = "Calculating dt.";
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) {
        clearInterval(interval);
      }
    }, 150);

    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    // Disable scrolling when the loading screen is visible
    if (isVisible) {
      document.body.style.overflowY = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflowY = 'scroll'; // Enable scrolling
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      document.body.style.overflowY = 'scroll'; // Ensure scrolling is enabled when component unmounts
    };
  }, [fullText, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <span className="integral-sign">∫</span>
        <p className="loading-text">{displayText}</p>
      </div>
    </div>
  );
}

export default LoadingScreen;
