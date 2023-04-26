import React, { useEffect } from "react";
import "../static/css/circleOfFifths.css";
import {
  setupLinks,
  setupLinkHovers,
  positionIcons,
  onMenuItemsDropdownChange,
} from "../static/js/circleOfFifths.js";
import ToneLayer from "./toneLayer";
import 'https://kit.fontawesome.com/a8a57473f2.js';

const CircleOfFifths = () => {
  useEffect(() => {
    var container = document.querySelector(".radial-menu");
    var menuItems = container.querySelectorAll(".radial-menu__menu-item");
    var menuItemsSelect = document.getElementById("menu-items-to-show");
    var links = document.querySelectorAll(".radial-menu__menu-link");
    var linkBGs = document.querySelectorAll(".radial-menu__menu-link-bg");
    var icons = document.querySelectorAll(".radial-menu__menu-icon");

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

    //
    //  MENU ITEMS DROPDOWN
    //–––––––––––––––––––––––––––––––––––––
    onMenuItemsDropdownChange(domElements, menuDimensions);
  });

  return (
    <div>
      <div className="radial-menu">
        <ul className="radial-menu__menu-list">
          <ToneLayer description="Make text bold" title="Bold" glyph="bold" />
          <ToneLayer
            description="Make text italic"
            title="Italic"
            glyph="italic"
          />
          <ToneLayer
            description="Underline text"
            title="Underline"
            glyph="underline"
          />
          <ToneLayer
            description="Text Alignment"
            title="Align left"
            glyph="align-left"
          />
          <ToneLayer
            description="Add a bulleted list"
            title="Bulleted List"
            glyph="list-rich"
          />
          <ToneLayer
            description="Add a numbered list"
            title="Numbered List"
            glyph="list"
          />
          <ToneLayer
            description="Add a heading"
            title="Heading"
            glyph="header"
          />
          <ToneLayer
            description="Add a blockquote"
            title="Blockquote"
            glyph="double-quote-serif-right"
          />
          <ToneLayer
            description="Add a link to something"
            title="Hyperlink"
            glyph="link-intact"
          />
          <ToneLayer description="Add an image" title="Image" glyph="image" />
          <ToneLayer
            description="Attach a file"
            title="Attach File"
            glyph="paperclip"
          />
          <ToneLayer description="Add some HTML" title="Code" glyph="code" />
        </ul>
        <div className="radial-menu__label">Tonality</div>
      </div>

      <div className="menu-items-select">
        <label
          className="menu-items-select__label"
          htmlFor="menu-items-to-show"
        >
          Select musical cipher
        </label>
        <select
          className="menu-items-select__select"
          name="menu-items-to-show"
          id="menu-items-to-show"
          defaultValue="12"
        >
          <option value="3">Three</option>
          <option value="4">Four</option>
          <option value="5">Five</option>
          <option value="6">Six</option>
          <option value="7">Seven</option>
          <option value="8">Eight</option>
          <option value="9">Nine</option>
          <option value="10">Ten</option>
          <option value="11">Eleven</option>
          <option value="12">Twelve</option>
          <option value="13">Thirteen</option>
          <option value="14">Fourteen</option>
          <option value="15">Fifteen</option>
        </select>
      </div>
    </div>
  );
};

export default CircleOfFifths;
