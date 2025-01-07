import React from 'react';


const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p className="address">SRM Institute of Science and Technology<br />Ramapuram Campus</p>
          <p>Bharathi Salai, Ramapuram, Chennai – 600 089.</p>
          <p className="phone">044 - 4392 3042, 044 - 4392 3133</p>
          <div className="social-links">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Gallery</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="webteam">Web Team</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Other Links</h3>
          <ul>
            <li><a href="#">Announcements</a></li>
            <li><a href="#">Events</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;