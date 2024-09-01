import "./Fotter.css";
// src/components/Footer.js

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="blackGlass interactive-footer">
      <div className="footer-container">
        {/* Logo or Title */}
        <div className="footer-logo">
          <h2>Magic Brain</h2>
        </div>

        {/* Navigation Links
        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
        </div> */}

        {/* Social Media Icons */}
        <div className="footer-social">
          <a
            href="https://github.com/itamarshapira/smartBrain"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>

          <a
            href="https://www.linkedin.com/in/itamar-shapira-921a72279/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
        </div>

        {/* Footer Copy */}
        <div className="footer-copy">
          <p>&copy; 2024 Itamar Shapira. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
