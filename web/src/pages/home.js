import React from 'react';

import HomeSection from '../components/HomeSection.js';
import AboutSection from '../components/AboutSection.js';
import EventsSection from '../components/EventsSection.js';
import FacultySection from '../components/FacultySection.js';

import '../style.css';

const Home = () => {
  return (
    <div>
      <HomeSection />
      <AboutSection />
      <EventsSection />
      <FacultySection />
    </div>
  );
};

export default Home;