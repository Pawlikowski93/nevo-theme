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

/**
 * FAQ Accordion - Analityka Landing Page
 * Only one item open at a time, smooth animation
 */
document.addEventListener('DOMContentLoaded', () => {
  const faqAccordions = document.querySelectorAll('[data-faq-accordion]');

  faqAccordions.forEach(accordion => {
    const items = accordion.querySelectorAll('.nevo-faq-item');

    items.forEach(item => {
      const question = item.querySelector('.nevo-faq-question');
      const answer = item.querySelector('.nevo-faq-answer');

      if (!question || !answer) return;

      question.addEventListener('click', () => {
        const isCurrentlyOpen = item.classList.contains('is-open');

        // Close all items in this accordion
        items.forEach(otherItem => {
          otherItem.classList.remove('is-open');
          const otherQuestion = otherItem.querySelector('.nevo-faq-question');
          if (otherQuestion) {
            otherQuestion.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current item (open if it was closed)
        if (!isCurrentlyOpen) {
          item.classList.add('is-open');
          question.setAttribute('aria-expanded', 'true');
        }
      });

      // Keyboard accessibility
      question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          question.click();
        }
      });
    });
  });
});

/**
 * Case Studies Filter
 * Filter cards by category tags
 */
document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.nevo-case-filter-btn');
  const caseCards = document.querySelectorAll('.nevo-case-card');

  if (filterButtons.length === 0 || caseCards.length === 0) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      // Update active state
      filterButtons.forEach(btn => btn.classList.remove('is-active'));
      button.classList.add('is-active');

      // Filter cards
      caseCards.forEach(card => {
        const tags = card.dataset.tags || '';
        const shouldShow = filter === 'all' || tags.includes(filter);

        if (shouldShow) {
          card.classList.remove('is-hidden');
          card.classList.add('is-visible');
        } else {
          card.classList.remove('is-visible');
          card.classList.add('is-hidden');
        }
      });
    });
  });
});