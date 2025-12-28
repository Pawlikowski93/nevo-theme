<?php
/**
 * Title: Transformation Section
 * Slug: nevo/transformation-section
 * Categories: nevo-sections
 * Description: Animowana sekcja porównania Wizytówka vs Narzędzie
 */
?>

<section class="nevo-transformation alignfull" data-section="transformation">
  <div class="section-header">
    <h2 class="section-title">Ta sama strona. Inne podejście.</h2>
    <p class="section-subtitle">Zobacz różnicę między wizytówką a narzędziem</p>
  </div>

  <div class="transformation-container">
    <div class="transformation-card">
      <div class="transformation-bar"></div>

      <div class="transformation-badge-wrapper">
        <span class="transformation-badge">Strona-Wizytówka</span>
      </div>

      <p class="transformation-quote">"Mamy stronę, bo wypada mieć"</p>

      <div class="transformation-metrics">
        <div class="transformation-metric">
          <div class="metric-value">0</div>
          <div class="metric-label">leadów / msc</div>
        </div>
        <div class="transformation-metric">
          <div class="metric-value">85%</div>
          <div class="metric-label">bounce rate</div>
        </div>
        <div class="transformation-metric">
          <div class="metric-value">0:12</div>
          <div class="metric-label">czas na stronie</div>
        </div>
        <div class="transformation-metric">
          <div class="metric-value">-100%</div>
          <div class="metric-label">ROI</div>
        </div>
      </div>

      <div class="transformation-summary">Kosztuje. Nie zarabia.</div>

      <div class="transformation-indicator">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
        </svg>
      </div>
    </div>

    <p class="transformation-hint">Najedź lub kliknij aby zobaczyć transformację</p>

    <div class="transformation-toggles">
      <button class="transformation-toggle is-active" data-state="wizytowka">Wizytówka</button>
      <button class="transformation-toggle" data-state="narzedzie">Narzędzie</button>
    </div>
  </div>

  <div class="transformation-cta">
    <p>Która wersja opisuje Twoją stronę?</p>
    <a href="#kalkulator" class="btn-transformation">
      Oblicz ile tracisz
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </a>
  </div>
</section>
