import React, { useEffect, useState } from 'react';
import { client } from '../lib/sanity'; // Adjust the import path

const EventsSection = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fetch slides from Sanity
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const query = `*[_type == "homepageSlide"] | order(order asc) {
          title,
          "imageUrl": image.asset->url,
          order
        }`;
        const fetchedSlides = await client.fetch(query);
        setSlides(fetchedSlides);
      } catch (error) {
        console.error('Error fetching slides:', error);
      }
    };

    fetchSlides();
  }, []);

  // Auto-advance slides
  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (slides.length === 0) {
    return (
      <section id="events">
        <h2>Our Events</h2>
        <div>Loading...</div>
      </section>
    );
  }

  return (
    <section id="events">
      <h2>Our Events</h2>
      <div className="carousel relative">
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-item ${index === currentSlide ? 'active' : ''}`}
            >
              <img 
                src={slide.imageUrl} 
                alt={slide.title}
                className="w-full h-auto"
              />
              <div className="carousel-title-overlay">
                {slide.title}
              </div>
            </div>
          ))}
        </div>

        <button 
          className="carousel-control prev" 
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button 
          className="carousel-control next" 
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <i className="fas fa-chevron-right"></i>
        </button>

        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;