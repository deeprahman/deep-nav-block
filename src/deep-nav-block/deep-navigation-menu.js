document.addEventListener('DOMContentLoaded', function() {
  // Toggle mobile menu
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.nav-list');
  
  menuToggle.addEventListener('click', function() {
      navList.classList.toggle('active');
  });

  // Handle dropdown menus
  const dropdownItems = document.querySelectorAll('.has-dropdown');
  
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
          submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
      }
  }

  dropdownItems.forEach(item => {
      const link = item.querySelector('a');
      link.addEventListener('click', toggleDropdown);
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
