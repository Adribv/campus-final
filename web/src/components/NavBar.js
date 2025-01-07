import React from 'react';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const handleNavigation = (e, sectionId) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav>
      <div className="logo">
        <img src="assets/logos/logo1.webp" alt="SRM Logo" />
      </div>
      <ul>
        <li>
          <a 
            href="#home" 
            onClick={(e) => handleNavigation(e, 'home')}
          >
            Home
          </a>
        </li>
        <li>
          <a 
            href="#about" 
            onClick={(e) => handleNavigation(e, 'about')}
          >
            About
          </a>
        </li>
        <li>
          <a 
            href="/events" 
            // onClick={(e) => handleNavigation(e, 'events')}
          >
            Events
          </a>
        </li>
        <li>
          <a 
            href="#faculty" 
            onClick={(e) => handleNavigation(e, 'faculty')}
          >
            Faculty
          </a>
        </li>
        <li>
          <a 
            href="#team" 
            onClick={(e) => handleNavigation(e, 'team')}
          >
            Team
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;