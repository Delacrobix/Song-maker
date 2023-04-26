import React from "react";
import 'https://kit.fontawesome.com/a8a57473f2.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ToneLayer = (props) => {
  return (
    <li className="radial-menu__menu-item">
      <div className="radial-menu__menu-link-bg"></div>
      <div className="radial-menu__menu-icon">
        <span
          className="oi"
          data-glyph={props.glyph}
          title={props.title}
          aria-hidden="true"
        ></span>
      </div>
      <div className="radial-menu__menu-content">
        <div className="radial-menu__menu-content-wrapper">
          <h6 className="radial-menu__menu-content-title">{props.title}</h6>
          <p className="radial-menu__menu-content-description">
            {props.description}
          </p>
        </div>
      </div>
        <FontAwesomeIcon icon="fa-sharp fa-light fa-music-note" />
      <a href="/#" className="radial-menu__menu-link">
        HOLA
      </a>
    </li>
  );
};

export default ToneLayer;
