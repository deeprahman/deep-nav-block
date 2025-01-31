document.addEventListener('DOMContentLoaded', function() {
    // Toggle mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    const navElement = document.querySelector('.nav-container').parentElement;

    menuToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
        navElement.classList.toggle('deep-navigation-menu-open');
    });

    // Handle dropdown menus
    const dropdownItems = document.querySelectorAll('.has-dropdown');
    
    function calculateDropdownPosition(submenu) {
        const viewportWidth = window.innerWidth;
        const submenuRect = submenu.getBoundingClientRect();
        const parentRect = submenu.parentElement.getBoundingClientRect();
        
        // Check if submenu would overflow on the right
        const overflowRight = (parentRect.right + submenuRect.width) > viewportWidth;
        // Check if there's enough space on the left
        const hasSpaceLeft = parentRect.left > submenuRect.width;

        if (overflowRight && hasSpaceLeft) {
            // Position to the left if there's not enough space on the right
            submenu.style.left = 'auto';
            submenu.style.right = '100%';
        } else {
            // Default position to the right
            submenu.style.left = '100%';
            submenu.style.right = 'auto';
        }
    }

    function toggleDropdown(e) {
        e.preventDefault();
        const parent = this.closest('.has-dropdown');
        
        // Close other dropdowns at the same level
        const siblings = parent.parentElement.children;
        Array.from(siblings).forEach(sibling => {
            if (sibling !== parent && sibling.classList.contains('has-dropdown')) {
                sibling.classList.remove('active');
                const submenu = sibling.querySelector('.submenu');
                if (submenu) submenu.style.display = 'none';
            }
        });

        // Toggle current dropdown
        parent.classList.toggle('active');
        const submenu = parent.querySelector('.submenu');
        if (submenu) {
            if (submenu.style.display !== 'block') {
                submenu.style.display = 'block';
                // Only calculate position for non-mobile view
                if (window.innerWidth > 768) {
                    calculateDropdownPosition(submenu);
                }
            } else {
                submenu.style.display = 'none';
            }
        }
    }

    dropdownItems.forEach(item => {
        const link = item.querySelector('a');
        link.addEventListener('click', toggleDropdown);
    });

    // Recalculate positions on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            dropdownItems.forEach(item => {
                const submenu = item.querySelector('.submenu');
                if (submenu && submenu.style.display === 'block') {
                    calculateDropdownPosition(submenu);
                }
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-list')) {
            dropdownItems.forEach(item => {
                item.classList.remove('active');
                const submenu = item.querySelector('.submenu');
                if (submenu) submenu.style.display = 'none';
            });
        }
    });
});