
import React from 'react';

const WebTeam = () => {


      
  return (
    <section id="web-team">
      <h2>Meet Our Web Team</h2>
      <div className="team-description">
        <p>
          The Web Team is the creative force behind Campus Life's digital presence at SRM Ramapuram. Our dedicated team combines technical expertise with artistic vision to create an engaging online experience that showcases the vibrant spirit of our campus community.
        </p>
      </div>
      <div className="team-members">
        <div className="member">
          <img src="assets/webteam/aalan.jpeg" alt="Aalan" />
          <p>
            Aalan
            <br />
            <span>Lead Developer</span>
          </p>
          <div className="member-social">
            <a href="https://www.linkedin.com/in/aalan294aalan294/" target="_blank">
              <i className="fab fa-linkedin" />
            </a>
            <a href="https://github.com/aalan294" target="_blank">
              <i className="fab fa-github" />
            </a>
          </div>
        </div>
        <div className="member">
          <img src="assets/webteam/jd.jpg" alt="Jeyadeepak" />
          <p>
            Jeyadeepak
            <br />
            <span>Frontend Developer</span>
          </p>
          <div className="member-social">
            <a href="https://www.linkedin.com/in/jeyadeepak-u-r/" target="_blank">
              <i className="fab fa-linkedin" />
            </a>
            <a href="https://github.com/JeyadeepakUR" target="_blank">
              <i className="fab fa-github" />
            </a>
          </div>
        </div>
        <div className="member">
          <img src="assets/webteam/gokul.jpg" alt="Gokul" />
          <p>
            Gokul
            <br />
            <span>Backend Developer</span>
          </p>
          <div className="member-social">
            <a href="http://www.linkedin.com/in/gokulpriyan-karthikeyan-078652200" target="_blank">
              <i className="fab fa-linkedin" />
            </a>
            <a href="https://github.com/Gokul1734" target="_blank">
              <i className="fab fa-github" />
            </a>
          </div>
        </div>
        <div className="member">
          <img src="assets/webteam/arbaaz.jpeg" alt="Arbaaz" />
          <p>
            Arbaaz
            <br />
            <span>UI/UX Designer</span>
          </p>
          <div className="member-social">
            <a href="https://www.linkedin.com/in/mohamed-arbaaz-4a8847202/" target="_blank">
              <i className="fab fa-linkedin" />
            </a>
            <a href="https://github.com/Adribv" target="_blank">
              <i className="fab fa-github" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );



 
};

export default WebTeam;