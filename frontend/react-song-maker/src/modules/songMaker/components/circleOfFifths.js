import React, { useEffect } from 'react';
import ToneLayer from './toneLayer';
import {
  setupLinks,
  setupLinkHovers,
  positionIcons,
} from '../assets/js/circleOfFifths.js';

const CircleOfFifths = () => {
  useEffect(() => {
    var container = document.querySelector('.radial-menu');
    var menuItems = container.querySelectorAll('.radial-menu__menu-item');
    var menuItemsSelect = document.getElementById('menu-items-to-show');
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

  return (
    <div>
      <div className='radial-menu'>
        <ul className='radial-menu__menu-list'>
          <ToneLayer title='A' />
          <ToneLayer title='E' />
          <ToneLayer title='B/Cb' />
          <ToneLayer title='F#/Gb' />
          <ToneLayer title='Db/C#' />
          <ToneLayer title='Ab' />
          <ToneLayer title='Eb' />
          <ToneLayer title='Bb' />
          <ToneLayer title='F' />
          <ToneLayer title='C' />
          <ToneLayer title='G' />
          <ToneLayer title='D' />
        </ul>
        <div className='radial-menu__label'>Tonality</div>
      </div>

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
          defaultValue='1'
        >
          <option value='1'>Major</option>
          <option value='2'>Minor</option>
        </select>
      </div>
    </div>
  );
};

export default CircleOfFifths;
