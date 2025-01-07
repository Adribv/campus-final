import React from 'react';

const HomeSection = () => {
  return (
    <section id="home">
      <div className="hero">
        <div className="hero-background"></div>
        <div className="hanging-gallery">
          {[1, 14, 6, 8, 14].map((eventId, index) => (
            <div className="hanging-image" key={index}>
              <div className="rope"></div>
              <div className="frame">
                <img src={`./assets/events/${eventId}.jpg`} alt="Event" />
              </div>
            </div>
          ))}
        </div>
        <div className="hero-content">
          <div className="title-container">
            <h1>Welcome to <span className="highlight">Campus Life</span></h1>
            <h2>SRMIST (E&T) Ramapuram</h2>
          </div>
          <div className="hero-logo-container">
            <img src="./assets/logos/logo2.png" alt="SRM Logo" className="hero-logo" />
          </div>
          <div className="quote-container">
            <p className="quote">"The Heart of Campus"</p>
            <p className="quote-subtitle">Where Moments Become Memories, and Dreams Take Flight</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;