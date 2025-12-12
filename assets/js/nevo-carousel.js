/**
 * NEVO Carousel - Vanilla JS
 *
 * Obsługuje karuzele z przyciskami prev/next i scroll-snap.
 * Zero zależności.
 *
 * @package NEVO
 */

(function() {
  'use strict';

  /**
   * Inicjalizacja wszystkich karuzel na stronie
   */
  function initCarousels() {
    const carousels = document.querySelectorAll('[data-nevo-carousel]');

    carousels.forEach(function(carousel) {
      initSingleCarousel(carousel);
    });
  }

  /**
   * Inicjalizacja pojedynczej karuzeli
   * @param {HTMLElement} carousel - Element karuzeli
   */
  function initSingleCarousel(carousel) {
    const viewport = carousel.querySelector('[data-nevo-carousel-viewport]');
    const track = carousel.querySelector('[data-nevo-carousel-track]');
    const prevBtn = carousel.querySelector('.nevo-carousel__btn--prev');
    const nextBtn = carousel.querySelector('.nevo-carousel__btn--next');

    if (!viewport || !track) {
      return;
    }

    const slides = track.querySelectorAll('.nevo-carousel__slide');

    if (slides.length === 0) {
      return;
    }

    /**
     * Oblicz szerokość slajdu + gap
     * @returns {number} Szerokość do przewinięcia
     */
    function getScrollAmount() {
      const firstSlide = slides[0];
      const slideWidth = firstSlide.getBoundingClientRect().width;
      const trackStyles = window.getComputedStyle(track);
      const gap = parseFloat(trackStyles.gap) || 0;

      return slideWidth + gap;
    }

    /**
     * Sprawdź czy karuzela wymaga przewijania
     * @returns {boolean}
     */
    function needsScrolling() {
      return viewport.scrollWidth > viewport.clientWidth + 1; // +1 dla zaokrągleń
    }

    /**
     * Aktualizuj stan przycisków (disabled)
     */
    function updateButtonStates() {
      if (!prevBtn || !nextBtn) {
        return;
      }

      const scrollLeft = viewport.scrollLeft;
      const maxScroll = viewport.scrollWidth - viewport.clientWidth;
      const threshold = 2; // tolerancja dla zaokrągleń

      // Ukryj przyciski jeśli nie ma co przewijać
      if (!needsScrolling()) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        return;
      }

      // Pokaż przyciski (na tablet+)
      if (window.innerWidth >= 768) {
        prevBtn.style.display = '';
        nextBtn.style.display = '';
      }

      // Ustaw disabled state
      prevBtn.disabled = scrollLeft <= threshold;
      nextBtn.disabled = scrollLeft >= maxScroll - threshold;
    }

    /**
     * Przewiń do przodu
     */
    function scrollNext() {
      const amount = getScrollAmount();
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      viewport.scrollBy({
        left: amount,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    }

    /**
     * Przewiń do tyłu
     */
    function scrollPrev() {
      const amount = getScrollAmount();
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      viewport.scrollBy({
        left: -amount,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    }

    // Event listeners dla przycisków
    if (prevBtn) {
      prevBtn.addEventListener('click', scrollPrev);
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', scrollNext);
    }

    // Aktualizuj stan przycisków przy scroll
    let scrollTimeout;
    viewport.addEventListener('scroll', function() {
      // Debounce dla wydajności
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateButtonStates, 50);
    }, { passive: true });

    // Aktualizuj przy resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateButtonStates, 100);
    }, { passive: true });

    // Obsługa klawiatury (strzałki gdy fokus na karuzeli)
    carousel.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollNext();
      }
    });

    // Inicjalizacja stanu przycisków
    updateButtonStates();
  }

  // Inicjalizacja po załadowaniu DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousels);
  } else {
    initCarousels();
  }

  // Eksportuj dla ewentualnego użycia zewnętrznego
  window.NevoCarousel = {
    init: initCarousels
  };

})();
