import React from "react";
import { Link } from "react-router-dom";

import "../static/css/footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-content-container">
          <h3 className="website-logo">Song Maker</h3>
          <span className="footer-info">111 111 1111</span>
          <span className="footer-info">correo@cotteo.con</span>
        </div>
        <div className="footer-menus">
          <div className="footer-content-container">
            <span className="menu-title">Menu</span>
            <Link to="/" className="menu-item-footer">
              Home
            </Link>
            <Link to="/#" className="menu-item-footer">
              option 1
            </Link>
            <Link to="/#" className="menu-item-footer">
              Option 2
            </Link>
          </div>
          <div className="footer-content-container">
            <span className="menu-title">Legal</span>
            <Link to="/#" className="menu-item-footer">
              Option 1
            </Link>
            <Link to="/#" className="menu-item-footer">
              Option 2
            </Link>
            <Link to="/#" className="menu-item-footer">
              Terms and conditions
            </Link>
          </div>
        </div>

        <div className="footer-content-container">
          <span className="menu-title">Follow me</span>
          <div className="social-container">
            <Link
              to="https://www.linkedin.com/in/jeffrey-rerin/"
              target="_blank"
              className="social-link"
            ></Link>
            <Link
              to="https://github.com/Delacrobix"
              target="_blank"
              className="social-link"
            ></Link>
            <Link
              to="https://www.jeffrm.com.co"
              target="_blank"
              className="social-link"
            ></Link>
          </div>
        </div>
      </div>
      <div className="copyright-container">
        <span className="copyright">&copy;2023, jeffrm.com.co</span>
      </div>
    </footer>
  );
};

export default Footer;
