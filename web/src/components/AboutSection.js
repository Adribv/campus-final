import React from 'react';

const AboutSection = () => {
  return (
    <section id="about">
      <h2>About Campus Life</h2>
      <div className="about-content">
        <div className="about-text">
          <p>
            Campus Life at SRM Ramapuram E&T is the vibrant and dynamic heart of all cultural activities within the Engineering and Technology department. Comprising a passionate group of students and faculty, we are dedicated to fostering creativity, collaboration, and inclusivity through various events and initiatives.
            From organizing cultural festivals, workshops, and talent showcases to creating unforgettable experiences that celebrate diversity and innovation, Campus Life ensures that every student feels connected and inspired.
            Our mission is to enhance the student journey by blending academics with cultural enrichment, making SRM Ramapuram E&T a thriving hub of learning and fun.
          </p>
        </div>
        <div className="about-image">
          <img src="./assets/events/9.jpg" alt="Campus Life Event" />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;