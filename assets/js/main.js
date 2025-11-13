/**
 * NEVO Main JavaScript
 * 
 * @package NEVO
 */

console.log('NEVO theme loaded');

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      menuToggle.setAttribute(
        'aria-expanded',
        menuToggle.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
      );
    });
  }
});