import React from 'react';

// MenuItem: Renders individual navigation items and their children recursively
/**
 * MenuItem component renders a single menu item and its children recursively.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.item - The menu item object.
 * @param {string} props.item.title - The title of the menu item.
 * @param {string} props.item.url - The URL of the menu item.
 * @param {Array} [props.item.children] - The children of the menu item, if any.
 * @param {number} props.depth - The depth level of the menu item.
 * @returns {JSX.Element} The rendered menu item.
 */
const MenuItem = ({ item, depth }) => {
  // Check if the item has children for dropdown functionality
  const hasChildren = item.children?.length > 0;
  
  return (
    <li className={hasChildren ? 'has-dropdown' : ''}>
      {/* Render the navigation link */}
      <a href={item.url}>{item.title}</a>
      
      {/* Recursively render child menu items if they exist */}
      {hasChildren && <MenuBuilder items={item.children} depth={depth + 1} />}
    </li>
  );
};

// MenuBuilder: Builds the menu structure recursively
/**
 * MenuBuilder component that recursively builds a menu structure.
 *
 * @param {Object} props - The properties object.
 * @param {Array} props.items - The array of menu items to be rendered.
 * @param {number} [props.depth=0] - The current depth of the menu, used to determine class names.
 * @returns {JSX.Element|null} The rendered menu structure or null if no items are provided.
 */
const MenuBuilder = ({ items, depth = 0 }) => {
  // Return null if no items are provided
  if (!items?.length) {
    return null;
  }

  // Determine appropriate class name based on menu depth
  const className = depth > 0 ? 'submenu' : 'nav-list';
  
  return (
    <ul className={className}>
      {/* Map through items and render MenuItem components */}
      {items.map((item, index) => (
        <MenuItem 
          key={`${item.title}-${index}`}
          item={item} 
          depth={depth}
        />
      ))}
    </ul>
  );
};

// NavigationMenu: Main navigation component that renders the entire menu structure
/**
 * NavigationMenu component renders a navigation menu based on the provided menu tree.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.menuTree - The tree structure representing the menu items.
 * @returns {JSX.Element|null} The rendered navigation menu or null if the menuTree is invalid.
 */
const NavigationMenu = ({ menuTree }) => {
  // Return null if menuTree is invalid
  if (!menuTree?.length) {
    return null;
  }

  return (
    <nav>
      <div className="nav-container">
        {/* Mobile menu toggle button */}
        <div className="menu-toggle">☰</div>
        {/* Render the main menu structure */}
        <MenuBuilder items={menuTree} />
      </div>
    </nav>
  );
};

export default NavigationMenu;

