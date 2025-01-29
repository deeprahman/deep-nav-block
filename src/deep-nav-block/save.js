import { useBlockProps } from '@wordpress/block-editor';

import { parseMenuItems } from "./dnb-menuitem-parser";
// import NavigationMenu from './deep-navigation-menu';

export default function Save({ attributes }) {
    const blockProps = useBlockProps.save();

    // Extract menuTree from attributes
    const { menuItems } = attributes;
	const menuTree = parseMenuItems(menuItems);
	const menu = NavigationMenu(menuTree);

    // Render the NavigationMenu component
	return (
		<div
                {...blockProps}
                dangerouslySetInnerHTML={{ __html: menu }}
            ></div>
	);
}


function handleItem(item, depth) {
    const hasChildren = item.children && item.children.length > 0;
    const dropdownClass = hasChildren ? 'has-dropdown' : '';
    let out = `<li class="${dropdownClass}">`;
    out += `<a href="${item.url}">${item.title}</a>`;
    if (hasChildren) {
        out += menuBuilder(item.children, depth + 1);
    }
    out += `</li>`;
    return out;
}

function menuBuilder(array, depth = 0) {
    if (!array || array.length === 0) {
        return '';
    }

    // Adjust class names to match the example HTML structure
    const className = depth > 0 ? 'submenu' : 'nav-list';
    let out = `<ul class="${className}">`;

    for (const item of array) {
        out += handleItem(item, depth);
    }

    out += `</ul>`;
    return out;
}
// Navigation Menu component that properly handles the menuTree prop
function NavigationMenu( menuTree ) {
    if (!menuTree || !Array.isArray(menuTree)) {
        return null;
    }

    const navContainerClass = 'nav-container';
    const menuToggleClass = 'menu-toggle';

    return `
        <nav>
            <div class="${navContainerClass}">
                <div class="${menuToggleClass}">☰</div>
                ${menuBuilder(menuTree)}
            </div>
        </nav>
    `;
}