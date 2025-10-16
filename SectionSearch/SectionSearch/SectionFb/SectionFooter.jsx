import React from "react";
import "./SectionFooterCss.css";
import { ChevronDown } from "lucide-react";
import { FaTiktok, FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-columns">
        {/* About Us */}
        <div className="footer-col">
          <h4>About us</h4>
          <ul>
            <li>About Quizlet</li>
            <li>Careers</li>
            <li>Advertise with us</li>
            <li>Get the app</li>
          </ul>
        </div>

        {/* For Students */}
        <div className="footer-col">
          <h4>For Students</h4>
          <ul>
            <li>Flashcards</li>
            <li>Test</li>
            <li>Learn</li>
            <li>Study groups</li>
            <li>Solutions</li>
            <li>Quizlet Plus</li>
            <li>Study Guides</li>
            <li>Pomodoro timer</li>
          </ul>
        </div>

        {/* For Teachers */}
        <div className="footer-col">
          <h4>For teachers</h4>
          <ul>
            <li>Live</li>
            <li>Blog</li>
            <li>Quizlet Plus for teachers</li>
          </ul>
        </div>

        {/* Resources */}
        <div className="footer-col">
          <h4>Resources</h4>
          <ul>
            <li>Help centre</li>
            <li>Honour Code</li>
            <li>Community Guidelines</li>
            <li>Terms</li>
            <li>Privacy</li>
            <li>California privacy</li>
            <li>Your privacy and cookie choices</li>
            <li>Ad and cookie settings</li>
            <li>Interest-Based Advertising</li>
            <li>Quizlet for Schools</li>
            <li>Parents</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <div className="social-section">
          <div className="social-icons">
            <FaTiktok />
            <FaXTwitter />
            <FaFacebook />
            <FaInstagram />
            <FaYoutube />
            <FaLinkedin />
          </div>
          <p>© 2025 Quizlet, Inc.</p>
        </div>
      </div>
    </footer>
  );
}
