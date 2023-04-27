import React from "react";
import { printTonality } from "../static/js/circleOfFifths";

const ToneLayer = (props) => {
  return (
    <li className="radial-menu__menu-item">
      <div className="radial-menu__menu-link-bg"></div>
      <div className="radial-menu__menu-icon">
        <span className="oi" title={props.title} aria-hidden="true"></span>
      </div>
      <div className="radial-menu__menu-content">
        <div className="radial-menu__menu-content-wrapper">
          <h6 className="radial-menu__menu-content-title">{props.title}</h6>
        </div>
      </div>
      <p
        id="select-tonality"
        onClick={printTonality}
        className="radial-menu__menu-link"
      >
        {props.title}
      </p>
    </li>
  );
};

export default ToneLayer;
