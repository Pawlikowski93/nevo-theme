/**
 * NEVO Transformation Section
 * Animowany box: Wizytówka → Narzędzie
 */
(function() {
  'use strict';

  const section = document.querySelector('.nevo-transformation');
  if (!section) return;

  const card = section.querySelector('.transformation-card');
  const badge = section.querySelector('.transformation-badge');
  const quote = section.querySelector('.transformation-quote');
  const metrics = section.querySelectorAll('.transformation-metric');
  const summary = section.querySelector('.transformation-summary');
  const indicator = section.querySelector('.transformation-indicator');
  const btnWizytowka = section.querySelector('[data-state="wizytowka"]');
  const btnNarzedzie = section.querySelector('[data-state="narzedzie"]');
  const hint = section.querySelector('.transformation-hint');

  let isTransformed = false;
  let isAutoPlaying = true;
  let autoPlayInterval;

  const content = {
    wizytowka: {
      badge: 'Strona-Wizytówka',
      quote: '"Mamy stronę, bo wypada mieć"',
      metrics: ['0', '85%', '0:12', '-100%'],
      summary: 'Kosztuje. Nie zarabia.'
    },
    narzedzie: {
      badge: 'Strona-Narzędzie',
      quote: '"Strona pracuje na mnie, nawet gdy śpię"',
      metrics: ['47+', '35%', '3:42', '+847%'],
      summary: 'Pracuje 24/7. Zarabia.'
    }
  };

  function transform(state) {
    isTransformed = state;
    const data = state ? content.narzedzie : content.wizytowka;

    // Card styling
    card.classList.toggle('is-transformed', state);

    // Badge
    badge.textContent = data.badge;
    badge.classList.toggle('is-transformed', state);

    // Quote
    quote.textContent = data.quote;
    quote.classList.toggle('is-transformed', state);

    // Metrics
    metrics.forEach((metric, i) => {
      const value = metric.querySelector('.metric-value');
      if (value) {
        value.textContent = data.metrics[i];
        value.classList.toggle('is-transformed', state);
        // ROI special color
        if (i === 3) {
          value.classList.toggle('is-positive', state);
        }
      }
    });

    // Summary
    summary.textContent = data.summary;
    summary.classList.toggle('is-transformed', state);

    // Indicator
    indicator.classList.toggle('is-transformed', state);

    // Buttons
    btnWizytowka.classList.toggle('is-active', !state);
    btnNarzedzie.classList.toggle('is-active', state);
  }

  function stopAutoPlay() {
    if (isAutoPlaying) {
      isAutoPlaying = false;
      clearInterval(autoPlayInterval);
      if (hint) {
        hint.textContent = 'Kliknij aby przełączyć';
      }
    }
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      transform(!isTransformed);
    }, 3500);
  }

  // Event listeners
  if (card) {
    card.addEventListener('mouseenter', () => {
      stopAutoPlay();
      transform(true);
    });

    card.addEventListener('mouseleave', () => {
      transform(false);
    });

    card.addEventListener('click', () => {
      stopAutoPlay();
      transform(!isTransformed);
    });
  }

  if (btnWizytowka) {
    btnWizytowka.addEventListener('click', (e) => {
      e.stopPropagation();
      stopAutoPlay();
      transform(false);
    });
  }

  if (btnNarzedzie) {
    btnNarzedzie.addEventListener('click', (e) => {
      e.stopPropagation();
      stopAutoPlay();
      transform(true);
    });
  }

  // Start auto-play
  startAutoPlay();

})();
