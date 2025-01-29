import React from 'react';

// MenuItem: Renders individual navigation items and their children recursively
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

