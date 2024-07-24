import React from 'react';
import './AboutUs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const AboutUs = () => {

  return (
    <div id='about' className="about-us-container">
      <h2>About Us</h2>
      <p>Where quality meets affordability. We</p>
      <p>understand the importance of a smooth</p>
      <p>and enjoyable journey without the burden</p>
      <p>of excessive costs. That's why we have</p>
      <p>meticulously crafted our offerings to </p>
      <p>provide you with top-notch vehicles at</p>
      <p>minimum expense.</p>
      <div className="social-network-column">
        <h2 className="social-network-header">Social Network</h2>
        <div className="social-network-icons">
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} className="icon instagram" /></a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} className="icon facebook" /></a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} className="icon linkedin" /></a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
