import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Contact Us */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: <a href="mailto:khushijewellers@example.com">khushijewellers@example.com</a></p>
          <p>Phone: <a href="tel:+919876543210">+91 98441 01760</a></p>
        </div>

        {/* Visit Our Store */}
        <div className="footer-section">
          <h3>Visit Our Store</h3>
          <p>Khushi Jewellers</p>
          <p>CTS,NO: 3862 Kotwal Galli Belagavi, Karnataka</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <Link to="/">Home </Link>
          <Link to="/wishlist">Wishlist </Link>
          <Link to="/about"> About Us</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Khushi Jewellers. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
