/**
 * NEVO Main JavaScript
 *
 * @package NEVO
 */

console.log('NEVO theme loaded');
import '../css/main.scss';

/**
 * Mobile Menu Toggle
 */
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const body = document.body;

  if (menuToggle && mobileMenu) {
    // Toggle menu on button click
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', isOpen);

      if (isOpen) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        mobileMenu.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      }
    });

    // Close when clicking on links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      });
    });

    // Submenu toggles
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

  // Header scroll effect
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

  // Smooth scroll for anchor links
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

/**
 * Table of Contents Generator
 * Dynamically generates ToC from H2 headings in article content
 */
document.addEventListener('DOMContentLoaded', () => {
  const articleContent = document.querySelector('.nevo-article-content');
  const tocList = document.querySelector('.nevo-toc__list');
  const tocWrapper = document.querySelector('.nevo-toc');

  if (!articleContent || !tocList) return;

  // Find all H2 headings in article content
  const headings = articleContent.querySelectorAll('h2');

  // Hide ToC if no headings found
  if (headings.length === 0) {
    if (tocWrapper) {
      tocWrapper.style.display = 'none';
    }
    return;
  }

  // Clear placeholder items
  tocList.innerHTML = '';

  // Generate ToC items
  headings.forEach((heading, index) => {
    // Generate ID if not exists
    if (!heading.id) {
      // Create slug from heading text
      const slug = heading.textContent
        .toLowerCase()
        .replace(/[^a-z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .substring(0, 50);
      heading.id = slug || `section-${index + 1}`;
    }

    // Create list item with link
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${heading.id}`;
    a.textContent = heading.textContent;
    a.className = 'nevo-toc__link';
    li.appendChild(a);
    tocList.appendChild(li);
  });

  // Get all ToC links for active state management
  const tocLinks = tocList.querySelectorAll('.nevo-toc__link');

  // Intersection Observer for highlighting active section
  const observerOptions = {
    rootMargin: '-100px 0px -66%',
    threshold: 0
  };

  let currentActiveLink = null;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const tocLink = tocList.querySelector(`a[href="#${id}"]`);

      if (entry.isIntersecting) {
        // Remove active from all links
        tocLinks.forEach(link => link.classList.remove('is-active'));
        // Add active to current link
        if (tocLink) {
          tocLink.classList.add('is-active');
          currentActiveLink = tocLink;
        }
      }
    });
  }, observerOptions);

  // Observe all headings
  headings.forEach(heading => observer.observe(heading));

  // Smooth scroll for ToC links
  tocLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);

      if (target) {
        // Calculate offset for fixed header
        const headerHeight = document.querySelector('#site-header')?.offsetHeight || 0;
        const targetPosition = target.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Update active state immediately
        tocLinks.forEach(l => l.classList.remove('is-active'));
        link.classList.add('is-active');

        // Update URL hash without jumping
        history.pushState(null, null, `#${targetId}`);
      }
    });
  });

  // Set first item as active on load if at top
  if (tocLinks.length > 0 && window.scrollY < 200) {
    tocLinks[0].classList.add('is-active');
  }
});

/**
 * Share Buttons
 * Generate share URLs and handle copy link functionality
 */
document.addEventListener('DOMContentLoaded', () => {
  const shareButtons = document.querySelectorAll('.nevo-share-btn[data-share]');
  const copyButton = document.querySelector('.nevo-share-copy');

  if (shareButtons.length === 0 && !copyButton) return;

  const pageUrl = encodeURIComponent(window.location.href);
  const pageTitle = encodeURIComponent(document.title);

  // Share URL templates
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`
  };

  // Set share URLs
  shareButtons.forEach(button => {
    const platform = button.dataset.share;
    if (shareUrls[platform]) {
      button.href = shareUrls[platform];
    }
  });

  // Copy link button
  if (copyButton) {
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);

        // Show success state
        copyButton.classList.add('is-copied');

        // Reset after 2 seconds
        setTimeout(() => {
          copyButton.classList.remove('is-copied');
        }, 2000);
      } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();

        try {
          document.execCommand('copy');
          copyButton.classList.add('is-copied');
          setTimeout(() => {
            copyButton.classList.remove('is-copied');
          }, 2000);
        } catch (e) {
          console.error('Could not copy link:', e);
        }

        document.body.removeChild(textArea);
      }
    });
  }
});