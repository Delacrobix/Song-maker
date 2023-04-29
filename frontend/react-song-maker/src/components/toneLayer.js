import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ToneLayer = (props) => {
  const navigate = useNavigate();
  const [tonality, setTonality] = useState('hola');
  const { title } = props;
  
  function handleClick () {
    let element = document.getElementById('select-tonality');
    setTonality(element.innerHTML);

    console.log("Tonality: " + tonality, " + ", element.innerHTML);

    navigate("/rhythm-selector", { state: { datos: { tonality: element.innerHTML } } });
  };

  return (
    <li className="radial-menu__menu-item">
      <div className="radial-menu__menu-link-bg"></div>
      <div className="radial-menu__menu-icon">
        <span className="oi" title={title} aria-hidden="true"></span>
      </div>
      <div className="radial-menu__menu-content">
        <div className="radial-menu__menu-content-wrapper">
          <h6 className="radial-menu__menu-content-title">{title}</h6>
        </div>
      </div>
      <Link
        id="select-tonality"
        onClick={handleClick}
        className="radial-menu__menu-link"
      >
        {title}
      </Link>
    </li>
  );
};

export default ToneLayer;
