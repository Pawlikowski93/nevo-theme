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
// Mobile menu (rozszerz istniejący kod)
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const body = document.body;

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      body.classList.toggle('menu-open', isOpen);
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        mobileMenu.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        body.classList.remove('menu-open');
      }
    });
  }
});