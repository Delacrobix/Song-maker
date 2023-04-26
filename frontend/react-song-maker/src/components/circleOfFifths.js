import React, { useEffect } from "react";
import "../static/css/circleOfFifths.css";
import {
  setupLinks,
  setupLinkHovers,
  positionIcons,
  onMenuItemsDropdownChange,
} from "../static/js/circleOfFifths.js";

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
      container: container
    };

    var menuDimensions = container.offsetWidth;
    
    setupLinks(links, domElements, menuDimensions);
    setupLinkHovers(links, container);

    setupLinks(linkBGs, domElements, menuDimensions);

    var iconDistance = 95;

    positionIcons(icons, iconDistance, menuItems);

    //
    //  RIGHT CLICK
    //–––––––––––––––––––––––––––––––––––––
    document.addEventListener(
      "contextmenu",
      (e) => {
        e.preventDefault();
        var mousePosX = e.clientX;
        var mousePosY = e.clientY;
        // console.log( 'mousePosX: ' + mousePosX );
        // console.log( 'mousePosY: ' + mousePosY );

        container.classList.remove("is-hidden");
        container.classList.add("is-active");

        container.style.top = mousePosY + "px";
        container.style.left = mousePosX + "px";

        //mouseMoveListener(mousePosX, mousePosY, container);

        return false;
      },
      false
    );

    //
    //  RIGHT CLICK MOUSE UP
    //–––––––––––––––––––––––––––––––––––––
    document.addEventListener("mouseup", function (e) {
      var mouseButton = e.button;

      // If it's the right mouse button.
      if (mouseButton == 2) {
        // Hide the menu.
        container.classList.add("is-hidden");
        container.classList.remove("is-active");
      }
    });

    //
    //  MENU ITEMS DROPDOWN
    //–––––––––––––––––––––––––––––––––––––
    onMenuItemsDropdownChange(domElements, menuDimensions);
  });
  return (
    <div>
      <div className="radial-menu">
        <ul className="radial-menu__menu-list">
          <li className="radial-menu__menu-item">
            <div className="radial-menu__menu-link-bg"></div>
            <div className="radial-menu__menu-icon">
              <span
                className="oi"
                data-glyph="bold"
                title="Bold"
                aria-hidden="true"
              ></span>
            </div>
            <div className="radial-menu__menu-content">
              <div className="radial-menu__menu-content-wrapper">
                <h6 className="radial-menu__menu-content-title">Bold</h6>
                <p className="radial-menu__menu-content-description">
                  Make text bold
                </p>
              </div>
            </div>
            <a href="/#" className="radial-menu__menu-link">
              1
            </a>
          </li>

          <li className="radial-menu__menu-item">
            <div className="radial-menu__menu-link-bg"></div>
            <div className="radial-menu__menu-icon">
              <span
                className="oi"
                data-glyph="italic"
                title="Italic"
                aria-hidden="true"
              ></span>
            </div>
            <div className="radial-menu__menu-content">
              <div className="radial-menu__menu-content-wrapper">
                <h6 className="radial-menu__menu-content-title">Italic</h6>
                <p className="radial-menu__menu-content-description">
                  Make text italic
                </p>
              </div>
            </div>
            <a href="/#" className="radial-menu__menu-link">
              1
            </a>
          </li>

          <li className="radial-menu__menu-item">
            <div className="radial-menu__menu-link-bg"></div>
            <div className="radial-menu__menu-icon">
              <span
                className="oi"
                data-glyph="underline"
                title="Underline"
                aria-hidden="true"
              ></span>
            </div>
            <div className="radial-menu__menu-content">
              <div className="radial-menu__menu-content-wrapper">
                <h6 className="radial-menu__menu-content-title">Underline</h6>
                <p className="radial-menu__menu-content-description">
                  Underline text
                </p>
              </div>
            </div>
            <a href="/#" className="radial-menu__menu-link">
              1
            </a>
          </li>

          <li className="radial-menu__menu-item">
            <div className="radial-menu__menu-link-bg"></div>
            <div className="radial-menu__menu-icon">
              <span
                className="oi"
                data-glyph="align-left"
                title="Align left"
                aria-hidden="true"
              ></span>
            </div>
            <div className="radial-menu__menu-content">
              <div className="radial-menu__menu-content-wrapper">
                <h6 className="radial-menu__menu-content-title">
                  Text Alignment
                </h6>
                <p className="radial-menu__menu-content-description">
                  Set text alignment
                </p>
              </div>
            </div>
            <a href="/#" className="radial-menu__menu-link">
              1
            </a>
          </li>

          <li className="radial-menu__menu-item">
            <div className="radial-menu__menu-link-bg"></div>
            <div className="radial-menu__menu-icon">
              <span
                className="oi"
                data-glyph="list-rich"
                title="Bulleted List"
                aria-hidden="true"
              ></span>
            </div>
            <div className="radial-menu__menu-content">
              <div className="radial-menu__menu-content-wrapper">
                <h6 className="radial-menu__menu-content-title">
                  Bulleted List
                </h6>
                <p className="radial-menu__menu-content-description">
                  Add a bulleted list
                </p>
              </div>
            </div>
            <a href="/#" className="radial-menu__menu-link">
              1
            </a>
          </li>

          <li className="radial-menu__menu-item">
            <div className="radial-menu__menu-link-bg"></div>
            <div className="radial-menu__menu-icon">
              <span
                className="oi"
                data-glyph="list"
                title="Numbered List"
                aria-hidden="true"
              ></span>
            </div>
            <div className="radial-menu__menu-content">
              <div className="radial-menu__menu-content-wrapper">
                <h6 className="radial-menu__menu-content-title">
                  Numbered List
                </h6>
                <p className="radial-menu__menu-content-description">
                  Add a numbered list
                </p>
              </div>
            </div>
            <a href="/#" className="radial-menu__menu-link">
              1
            </a>
          </li>

          <li className="radial-menu__menu-item">
            <div className="radial-menu__menu-link-bg"></div>
            <div className="radial-menu__menu-icon">
              <span
                className="oi"
                data-glyph="header"
                title="Heading"
                aria-hidden="true"
              ></span>
            </div>
            <div className="radial-menu__menu-content">
              <div className="radial-menu__menu-content-wrapper">
                <h6 className="radial-menu__menu-content-title">Heading</h6>
                <p className="radial-menu__menu-content-description">
                  Add a heading
                </p>
              </div>
            </div>
            <a href="/#" className="radial-menu__menu-link">
              1
            </a>
          </li>

          <li className="radial-menu__menu-item">
            <div className="radial-menu__menu-link-bg"></div>
            <div className="radial-menu__menu-icon">
              <span
                className="oi"
                data-glyph="double-quote-serif-right"
                title="Blockquote"
                aria-hidden="true"
              ></span>
            </div>
            <div className="radial-menu__menu-content">
              <div className="radial-menu__menu-content-wrapper">
                <h6 className="radial-menu__menu-content-title">Blockquote</h6>
                <p className="radial-menu__menu-content-description">
                  Add a blockquote
                </p>
              </div>
            </div>
            <a href="/#" className="radial-menu__menu-link">
              1
            </a>
          </li>

          <li className="radial-menu__menu-item">
            <div className="radial-menu__menu-link-bg"></div>
            <div className="radial-menu__menu-icon">
              <span
                className="oi"
                data-glyph="link-intact"
                title="Hyperlink"
                aria-hidden="true"
              ></span>
            </div>
            <div className="radial-menu__menu-content">
              <div className="radial-menu__menu-content-wrapper">
                <h6 className="radial-menu__menu-content-title">Hyperlink</h6>
                <p className="radial-menu__menu-content-description">
                  Add a link to something
                </p>
              </div>
            </div>
            <a href="/#" className="radial-menu__menu-link">
              1
            </a>
          </li>

          <li className="radial-menu__menu-item">
            <div className="radial-menu__menu-link-bg"></div>
            <div className="radial-menu__menu-icon">
              <span
                className="oi"
                data-glyph="image"
                title="Image"
                aria-hidden="true"
              ></span>
            </div>
            <div className="radial-menu__menu-content">
              <div className="radial-menu__menu-content-wrapper">
                <h6 className="radial-menu__menu-content-title">Image</h6>
                <p className="radial-menu__menu-content-description">
                  Add an image
                </p>
              </div>
            </div>
            <a href="/#" className="radial-menu__menu-link">
              1
            </a>
          </li>

          <li className="radial-menu__menu-item" style={{ display: "none" }}>
            <div className="radial-menu__menu-link-bg"></div>
            <div className="radial-menu__menu-icon">
              <span
                className="oi"
                data-glyph="paperclip"
                title="Attach File"
                aria-hidden="true"
              ></span>
            </div>
            <div className="radial-menu__menu-content">
              <div className="radial-menu__menu-content-wrapper">
                <h6 className="radial-menu__menu-content-title">Attach File</h6>
                <p className="radial-menu__menu-content-description">
                  Attach a file
                </p>
              </div>
            </div>
            <a href="/#" className="radial-menu__menu-link">
              1
            </a>
          </li>

          <li className="radial-menu__menu-item" style={{ display: "none" }}>
            <div className="radial-menu__menu-link-bg"></div>
            <div className="radial-menu__menu-icon">
              <span
                className="oi"
                data-glyph="code"
                title="Code"
                aria-hidden="true"
              ></span>
            </div>
            <div className="radial-menu__menu-content">
              <div className="radial-menu__menu-content-wrapper">
                <h6 className="radial-menu__menu-content-title">Code</h6>
                <p className="radial-menu__menu-content-description">
                  Add some HTML
                </p>
              </div>
            </div>
            <a href="/#" className="radial-menu__menu-link">
              1
            </a>
          </li>

          <li className="radial-menu__menu-item" style={{ display: "none" }}>
            <div className="radial-menu__menu-link-bg"></div>
            <div className="radial-menu__menu-icon">
              <span
                className="oi"
                data-glyph="eyedropper"
                title="Font Color"
                aria-hidden="true"
              ></span>
            </div>
            <div className="radial-menu__menu-content">
              <div className="radial-menu__menu-content-wrapper">
                <h6 className="radial-menu__menu-content-title">Font Color</h6>
                <p className="radial-menu__menu-content-description">
                  Set font color
                </p>
              </div>
            </div>
            <a href="/#" className="radial-menu__menu-link">
              1
            </a>
          </li>

          <li className="radial-menu__menu-item" style={{ display: "none" }}>
            <div className="radial-menu__menu-link-bg"></div>
            <div className="radial-menu__menu-icon">
              <span
                className="oi"
                data-glyph="droplet"
                title="Highlight Color"
                aria-hidden="true"
              ></span>
            </div>
            <div className="radial-menu__menu-content">
              <div className="radial-menu__menu-content-wrapper">
                <h6 className="radial-menu__menu-content-title">
                  Highlight Color
                </h6>
                <p className="radial-menu__menu-content-description">
                  Set font color
                </p>
              </div>
            </div>
            <a href="/#" className="radial-menu__menu-link">
              1
            </a>
          </li>

          <li className="radial-menu__menu-item" style={{ display: "none" }}>
            <div className="radial-menu__menu-link-bg"></div>
            <div className="radial-menu__menu-icon">
              <span
                className="oi"
                data-glyph="ellipses"
                title="More"
                aria-hidden="true"
              ></span>
            </div>
            <div className="radial-menu__menu-content">
              <div className="radial-menu__menu-content-wrapper">
                <h6 className="radial-menu__menu-content-title">More</h6>
                <p className="radial-menu__menu-content-description">
                  Add more things
                </p>
              </div>
            </div>
            <a href="/#" className="radial-menu__menu-link">
              1
            </a>
          </li>
        </ul>
        <div className="radial-menu__label">Menu</div>
      </div>

      <div className="menu-items-select">
        <label
          className="menu-items-select__label"
          htmlFor="menu-items-to-show"
        >
          Menu items
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

      <div className="right-click-prompt">
        <p className="right-click-prompt__label">Right click and drag</p>
      </div>
    </div>
  );
};

export default CircleOfFifths;
