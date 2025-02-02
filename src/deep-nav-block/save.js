import { useBlockProps } from '@wordpress/block-editor';
import { parseMenuItems } from "./dnb-menuitem-parser";

export default function Save({ attributes }) {
    const blockProps = useBlockProps.save();
    const { menuItems } = attributes;
    const menuTree = parseMenuItems(menuItems);

    return (
        <div {...blockProps}>
            <NavigationMenu menuTree={menuTree} />
        </div>
    );
}

function NavigationMenu({ menuTree }) {
    if (!menuTree || !Array.isArray(menuTree)) {
        return null;
    }

    return (
        <nav>
            <div className="nav-container">
                <div className="menu-toggle">☰</div>
                {menuBuilder(menuTree)}
            </div>
        </nav>
    );
}

function menuBuilder(array, depth = 0) {
    if (!array || array.length === 0) {
        return null;
    }

    const className = depth > 0 ? 'submenu' : 'nav-list';
    
    return (
        <ul className={className}>
            {array.map((item) => handleItem(item, depth))}
        </ul>
    );
}

function handleItem(item, depth) {
    const hasChildren = item.children && item.children.length > 0;
    const dropdownClass = hasChildren ? 'has-dropdown' : '';
    
    return (
        <li className={dropdownClass} key={item.url}>
            <a href={item.url}>{item.title}</a>
            {hasChildren && menuBuilder(item.children, depth + 1)}
        </li>
    );
}