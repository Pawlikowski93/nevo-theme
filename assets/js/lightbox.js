/**
 * NEVO Simple Lightbox
 * Kliknij na zdjęcie aby powiększyć
 */
(function() {
  'use strict';

  // Utwórz overlay lightbox
  const overlay = document.createElement('div');
  overlay.className = 'nevo-lightbox-overlay';
  overlay.innerHTML = `
    <button class="nevo-lightbox-close" aria-label="Zamknij">&times;</button>
    <img class="nevo-lightbox-img" src="" alt="">
  `;
  document.body.appendChild(overlay);

  const lightboxImg = overlay.querySelector('.nevo-lightbox-img');
  const closeBtn = overlay.querySelector('.nevo-lightbox-close');

  // Znajdź wszystkie zdjęcia z klasą lightbox
  const images = document.querySelectorAll('.nevo-lightbox img, img.nevo-lightbox, .wp-block-image.nevo-lightbox img');

  images.forEach(img => {
    img.style.cursor = 'zoom-in';

    img.addEventListener('click', (e) => {
      e.preventDefault();
      const src = img.dataset.fullSrc || img.src;
      lightboxImg.src = src;
      lightboxImg.alt = img.alt || '';
      overlay.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Zamknij lightbox
  function closeLightbox() {
    overlay.classList.remove('is-active');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  closeBtn.addEventListener('click', closeLightbox);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-active')) {
      closeLightbox();
    }
  });

})();
