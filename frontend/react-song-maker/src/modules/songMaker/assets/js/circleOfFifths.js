//
//  COUNT MENU ITEMS
//–––––––––––––––––––––––––––––––––––––
function countMenuItems(elems) {
  // Initialize empty counter.
  var elemCounter = 0;

  for (let i = 0; i < elems.length; i++) {
    var elem = elems[i];

    // Get elements current "display" value.
    var elemDisplay = elem.currentStyle
      ? elem.currentStyle.display
      : getComputedStyle(elem, null).display;

    // If the elem is not hidden.
    if (elemDisplay !== 'none') {
      // Increment the elem counter.
      elemCounter++;
    }
  }

  return elemCounter;
}

//
//  SETUP LINKS
//–––––––––––––––––––––––––––––––––––––
export function setupLinks(links, domElements, menuDimensions) {
  // Count elems.
  var elemsCount = links.length;

  // Count menu items.
  var menuItemsCount = countMenuItems(domElements.menuItems);

  // Find degree interval.
  var degreeInterval = 360 / menuItemsCount;

  // Loop through elems.
  for (var i = 0; i < elemsCount; i++) {
    var elem = links[i];

    var parentMenuItem = elem.parentElement;

    // Get parent menu item's current "display" value.
    var parentMenuItemDisplay = parentMenuItem.currentStyle
      ? parentMenuItem.currentStyle.display
      : getComputedStyle(parentMenuItem, null).display;

    if (parentMenuItemDisplay !== 'none') {
      var cssTransform =
        'translateY(-50%) translateZ(0) rotateZ(' +
        degreeInterval * i +
        'deg) perspective(' +
        menuDimensions / 1.5 +
        'px)';

      var transformString = getLinkTransforms(menuItemsCount);

      cssTransform += transformString;

      elem.style.transform = cssTransform;
    }
  }
}

//
//  ON LINK HOVER
//–––––––––––––––––––––––––––––––––––––
export function setupLinkHovers(links, container) {
  // Count elems.
  var elemsCount = links.length;

  // Loop through elems.
  for (var i = 0; i < elemsCount; i++) {
    var elem = links[i];
    //var parentMenuItem  = elem.parentElement;

    // Get parent menu item's current "display" value.
    var parentMenuItemDisplay = elem.currentStyle
      ? elem.currentStyle.display
      : getComputedStyle(elem, null).display;

    // If the menu item's display is not set to none.'
    if (parentMenuItemDisplay !== 'none') {
      elem.addEventListener('mouseenter', function (event) {
        var parentMenuItem = this.parentElement;
        parentMenuItem.classList.add('hovered');
        container.classList.add('item-is-hovered');
      });

      elem.addEventListener('mouseleave', function (event) {
        var parentMenuItem = this.parentElement;
        parentMenuItem.classList.remove('hovered');
        container.classList.remove('item-is-hovered');
      });
    }
  }
}

//
//  GET LINK TRANSFORMS
//–––––––––––––––––––––––––––––––––––––
function getLinkTransforms(count) {
  var transformString;

  switch (count) {
    case 3:
      transformString = 'rotateY(-88.012deg) scaleX(1.45)';
      break;

    case 4:
      transformString = 'rotateY(-86.45deg) scaleX(1.425)';
      break;

    case 5:
      transformString = 'rotateY(-85.025deg) scaleX(1.39)';
      break;

    case 6:
      transformString = 'rotateY(-83.65deg) scaleX(1.36)';
      break;

    case 7:
      transformString = 'rotateY(-82.1deg) scaleX(1.325)';
      break;

    case 8:
      transformString = 'rotateY(-80.8deg) scaleX(1.3)';
      break;

    case 9:
      transformString = 'rotateY(-79deg) scaleX(1.265)';
      break;

    case 10:
      transformString = 'rotateY(-77.3deg) scaleX(1.23)';
      break;

    case 11:
      transformString = 'rotateY(-76deg) scaleX(1.21)';
      break;

    case 12:
      transformString = 'rotateY(-74.75deg) scaleX(1.185)';
      break;

    case 13:
      transformString = 'rotateY(-72.1deg) scaleX(1.14)';
      break;

    case 14:
      transformString = 'rotateY(-69.8deg) scaleX(1.11)';
      break;

    case 15:
      transformString = 'rotateY(-67.7deg) scaleX(1.086)';
      break;
    default:
      break;
  }

  return transformString;
}

export function positionIcons(icons, iconDistance, menuItems) {
  //var menuItems = container.querySelectorAll(".radial-menu__menu-item");

  // Count menu items.
  var menuItemsCount = countMenuItems(menuItems);

  // Count icons.
  var iconsCount = icons.length;
  var iconOffset = 1.575; // Used to rotate 90deg.

  // Loop through icons.
  for (var i = 0; i < iconsCount; i++) {
    var icon = icons[i];

    var parentMenuItem = icon.parentElement;

    // Get parent menu item's current "display" value.
    var parentMenuItemDisplay = parentMenuItem.currentStyle
      ? parentMenuItem.currentStyle.display
      : getComputedStyle(parentMenuItem, null).display;

    // If the menu item's display is not set to none.'
    if (parentMenuItemDisplay !== 'none') {
      var phase = i / menuItemsCount;

      var theta = phase * 2 * Math.PI;
      theta = theta + iconOffset;

      icon.style.top = (-iconDistance * Math.cos(theta)).toFixed(1) + 'px';
      icon.style.left = (iconDistance * Math.sin(theta)).toFixed(1) + 'px';
    }
  }
}
