import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollTo() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  return null;
}

export default ScrollTo;
