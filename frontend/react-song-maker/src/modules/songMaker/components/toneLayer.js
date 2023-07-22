import React from 'react';
import { useNavigate } from 'react-router-dom';

const ToneLayer = (props) => {
  const navigate = useNavigate();
  const { title } = props;

  function handleClick({ target: { innerHTML } }) {
    navigate('/rhythm-selector', {
      state: { tonality: innerHTML },
    });
  }

  return (
    <li className='radial-menu__menu-item'>
      <div className='radial-menu__menu-link-bg'></div>
      <div className='radial-menu__menu-icon'>
        <span className='oi' title={title} aria-hidden='true'>
          {title}
        </span>
      </div>
      <div className='radial-menu__menu-content'>
        <div className='radial-menu__menu-content-wrapper'>
          <h6 className='radial-menu__menu-content-title'>{title}</h6>
        </div>
      </div>
      <p
        className='radial-menu__menu-link'
        id='select-tonality'
        onClick={handleClick}
      >
        {title}
      </p>
    </li>
  );
};

export default ToneLayer;
