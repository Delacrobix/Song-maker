import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setTonality } from '../../../redux/tonalitySlice';

const ToneLayer = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { title } = props;

  function handleClick({ target: { innerHTML } }) {
    dispatch(setTonality(innerHTML));

    navigate('/rhythm-selector');
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
