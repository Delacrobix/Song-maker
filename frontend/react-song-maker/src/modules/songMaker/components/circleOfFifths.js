import React, { useEffect, useRef, useState } from 'react';
import ToneLayer from './toneLayer';
import {
  setupLinks,
  setupLinkHovers,
  positionIcons,
} from '../assets/js/circleOfFifths.js';

const CircleOfFifths = () => {
  // const selectRef = useRef(null);
  // const minorArr = [
  //   'F#m',
  //   'C#m',
  //   'G#m',
  //   'Ebm',
  //   'Bbm',
  //   'Fm',
  //   'Cm',
  //   'Gm',
  //   'Dm',
  //   'Am',
  //   'Em',
  //   'Bm',
  // ];
  const majorArr = [
    'A',
    'E',
    'B',
    'F#',
    'Db',
    'Ab',
    'Eb',
    'Bb',
    'F',
    'C',
    'G',
    'D',
  ];
  const [tonArr, setTonArr] = useState(majorArr);

  useEffect(() => {
    var container = document.querySelector('.radial-menu');
    var menuItems = container.querySelectorAll('.radial-menu__menu-item');
    var menuItemsSelect = document.querySelector('#menu-items-to-show');
    var links = document.querySelectorAll('.radial-menu__menu-link');
    var linkBGs = document.querySelectorAll('.radial-menu__menu-link-bg');
    var icons = document.querySelectorAll('.radial-menu__menu-icon');

    let domElements = {
      menuItems: menuItems,
      links: links,
      linkBGs: linkBGs,
      icons: icons,
      menuItemsSelect: menuItemsSelect,
      container: container,
    };

    var menuDimensions = container.offsetWidth;

    setupLinks(links, domElements, menuDimensions);
    setupLinkHovers(links, container);

    setupLinks(linkBGs, domElements, menuDimensions);

    var iconDistance = 95;

    positionIcons(icons, iconDistance, menuItems);
  });

  // function handleChange() {
  //   const value = selectRef.current.value;

  //   if (value === 'minor') {
  //     setTonArr(minorArr);
  //   } else {
  //     setTonArr(majorArr);
  //   }
  // }

  return (
    <div>
      <div className='radial-menu'>
        <ul className='radial-menu__menu-list'>
          <ToneLayer title={tonArr[0]} />
          <ToneLayer title={tonArr[1]} />
          <ToneLayer title={tonArr[2]} />
          <ToneLayer title={tonArr[3]} />
          <ToneLayer title={tonArr[4]} />
          <ToneLayer title={tonArr[5]} />
          <ToneLayer title={tonArr[6]} />
          <ToneLayer title={tonArr[7]} />
          <ToneLayer title={tonArr[8]} />
          <ToneLayer title={tonArr[9]} />
          <ToneLayer title={tonArr[10]} />
          <ToneLayer title={tonArr[11]} />
        </ul>
        <div className='radial-menu__label'>Tonality</div>
      </div>
      {/* <div className='menu-items'>
        <div className='menu-items-select'>
          <label
            className='menu-items-select__label'
            htmlFor='menu-items-to-show'
          >
            Tonalities
          </label>
          <select
            className='menu-items-select__select'
            name='menu-items-to-show'
            id='menu-items-to-show'
            defaultValue='major'
            ref={selectRef}
            onChange={handleChange}
          >
            <option value='major'>Major</option>
            <option value='minor'>Minor</option>
          </select>
        </div>
      </div> */}
    </div>
  );
};

export default CircleOfFifths;
