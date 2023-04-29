import React from "react";
import { Link } from "react-router-dom";

import '../static/css/footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-content-container">
          <h3 className="website-logo">Key Academy</h3>
          <span className="footer-info">111 111 1111</span>
          <span className="footer-info">correo@cotteo.con</span>
        </div>
        <div className="footer-menus">
          <div className="footer-content-container">
            <span className="menu-title">Menu</span>
            <Link to="" className="menu-item-footer">
              Home
            </Link>
            <Link to="" className="menu-item-footer">
              Courses
            </Link>
            <Link to="" className="menu-item-footer">
              Testimonials
            </Link>
          </div>
          <div className="footer-content-container">
            <span className="menu-title">Legal</span>
            <Link to="" className="menu-item-footer">
              Privacy Policy
            </Link>
            <Link to="" className="menu-item-footer">
              Cookies
            </Link>
            <Link to="" className="menu-item-footer">
              Terms and conditions
            </Link>
          </div>
        </div>

        <div className="footer-content-container">
          <span className="menu-title">Follow me</span>
          <div className="social-container">
            <Link to="" className="social-link">
              Twitter
            </Link>
            <Link to="" className="social-link">
              Github
            </Link>
            <Link to="" className="social-link">
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
      <div className="copyright-container">
        <span className="copyright">&copy;2021, jeffrm.com.co</span>
      </div>
    </footer>
  );
};

export default Footer;
