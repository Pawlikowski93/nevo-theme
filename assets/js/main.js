/**
 * NEVO Main JavaScript
 * 
 * @package NEVO
 */

console.log('NEVO theme loaded');
import '../css/main.scss';

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

// assets/js/nevo-faq.js
document.addEventListener('DOMContentLoaded', function () {
  const faqRoot = document.querySelector('.nevo-faq');
  if (!faqRoot) return;

  const items = faqRoot.querySelectorAll('.nevo-faq__item');

  items.forEach((item) => {
    const question = item.querySelector('.nevo-faq__question');
    const answer = item.querySelector('.nevo-faq__answer');
    if (!question || !answer) return;

    // domyślnie wszystko zamknięte
    item.classList.remove('is-open');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // zamykamy wszystkie inne (klasyczny akordeon)
      items.forEach((it) => it.classList.remove('is-open'));

      // jeśli kliknięty był zamknięty – otwieramy
      if (!isOpen) {
        item.classList.add('is-open');
      }
    });
  });
});


document.addEventListener('DOMContentLoaded', () => {
  
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const body = document.body;

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      
      if (isOpen) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        mobileMenu.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      }
    });

    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      });
    });

    const submenuToggles = mobileMenu.querySelectorAll('.submenu-toggle');
    submenuToggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        const submenu = toggle.nextElementSibling;
        if (submenu && submenu.classList.contains('submenu')) {
          submenu.classList.toggle('is-open');
          toggle.classList.toggle('active');
        }
      });
    });
  }

  const header = document.getElementById('site-header');

  if (header) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      if (href === '#' || href === '') {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      
      const target = document.querySelector(href);
      if (target) {
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

});