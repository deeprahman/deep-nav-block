const jsonData = [
    {
        "id": 6,
        "title": "Page-1.0.0",
        "url": "http://deeprahmanlo.local/page-1-0-0/",
        "children": []
    },
    {
        "id": 10,
        "title": "Page-2.0.0",
        "url": "http://deeprahmanlo.local/page-2-0-0/",
        "children": [
            {
                "id": 1738001871588,
                "title": "Level-1",
                "url": "#",
                "children": [
                    {
                        "id": 15,
                        "title": "Page-2.1.1",
                        "url": "http://deeprahmanlo.local/page-2-1-1/",
                        "children": []
                    },
                    {
                        "id": 1738001871588,
                        "title": "Level-2",
                        "url": "#",
                        "children": [
                            {
                                "id": 15,
                                "title": "Page-2.1.1",
                                "url": "http://deeprahmanlo.local/page-2-1-1/",
                                "children": []
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
/*
const htm = `
<nav>
                        <div class="nav-container">
                            <div class="menu-toggle">☰</div>
                            <ul class="nav-list">
                                <li><a href="#">Home</a></li>
                                <li class="has-dropdown">
                                    <a href="#">Products</a>
                                    <ul class="submenu">
                                        <li><a href="#">Electronics</a></li>
                                        <li class="has-dropdown">
                                            <a href="#">Clothing</a>
                                            <ul class="submenu">
                                                <li><a href="#">Men</a></li>
                                                <li><a href="#">Women</a></li>
                                                <li><a href="#">Kids</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="#">Books</a></li>
                                    </ul>
                                </li>
                                <li class="has-dropdown">
                                    <a href="#">Services</a>
                                    <ul class="submenu">
                                        <li><a href="#">Consulting</a></li>
                                        <li><a href="#">Training</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">Contact</a></li>
                            </ul>
                        </div>
                    </nav>
`;

*/
// const data =(JSON.parse(jsonData));
//---------
/*
function name: menuBuilder
input: array: javascript array of objects, depth: number(default 0)
Algo:
1. Return empty string if array is empty
2. Set class to submenu if depth is greater than 0
3. set out string to <ul class="${class}">
4. Loop through array
5. call handleItem function with item and depth
6. set out string to out string + handleItem return value and </ul> tag
7. return out string


function name: handleItem
input: item: object, depth: number(default 0)
Algo:
1. Set class to dropdown if item has children
2. Set out string to <li class="${class}">
3. Set out string to out string + <a href="${item.url}">${item.title}</a>
4. If item has children, set out string to out string + menuBuilder(item.children, depth+1)
5. Set out string to out string + </li>
6. return out string
*/


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

// Example usage with correct data passing (no JSON.parse needed)
const menuHtml = menuBuilder(jsonData);
console.log(menuHtml);