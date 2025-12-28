/**
 * NEVO Landing Page Personalization
 *
 * Dynamiczna personalizacja treści na podstawie:
 * - UTM parameters (źródło ruchu)
 * - Pora dnia
 * - Powracający użytkownik
 * - Geolokalizacja (Podhale detection)
 *
 * @package NEVO
 * @version 1.0.0
 */

(function() {
  'use strict';

  // Debug mode - tylko na localhost lub gdy WP_DEBUG
  const DEBUG = window.location.hostname === 'localhost' ||
                window.location.hostname === '127.0.0.1' ||
                window.NEVO_DEBUG === true;

  function log(...args) {
    if (DEBUG) console.log('[NEVO Personalization]', ...args);
  }

  // ==============================================
  // WARIANTY TREŚCI
  // ==============================================

  const variants = {
    headlines: {
      'google': 'Szukasz agencji do strony? Dobrze trafiłeś.',
      'facebook': 'Widziałeś nas na Facebooku — oto co możemy zrobić.',
      'instagram': 'Z Instagrama prosto do współpracy — zaczynamy?',
      'linkedin': 'Profesjonalny marketing dla Twojej firmy',
      'returning': 'Hej, miło że wróciłeś!',
      'returning_multiple': 'Znowu tu jesteś — może czas pogadać?',
      'morning': 'Dzień dobry! Gotowy na wzrost sprzedaży?',
      'evening': 'Dobry wieczór! Planuj jutrzejszy sukces już dziś.',
      'night': 'Pracujesz po godzinach? My też — napisz teraz.',
      'local': 'Jesteśmy z Podhala — spotkajmy się na kawę.',
      'local_zakopane': 'Działamy w Zakopanem — znamy lokalny rynek.',
      'local_krakow': 'Obsługujemy firmy z Krakowa i okolic.',
      'default': 'Od chaotycznych działań marketingowych do systemowego wzrostu sprzedaży'
    },

    trustBars: {
      'google': '🎯 Certyfikowani specjaliści Google Ads',
      'local': '📍 Jesteśmy z Podhala — działamy lokalnie i zdalnie',
      'local_zakopane': '📍 Siedziba w Groniu k. Białki — 15 min od Zakopanego',
      'returning': '👋 Fajnie, że wróciłeś! Masz pytania?',
      'returning_multiple': '🔥 To już Twoja ' + (parseInt(localStorage.getItem('nevo_visits') || '1')) + ' wizyta — czas działać!',
      'night': '🌙 Odpowiadamy też wieczorami',
      'morning': '☀️ Świetny czas na nowe początki',
      'default': '🎓 Google Certified | 6+ lat w e-commerce | Podhale'
    },

    ctas: {
      'returning': 'Wróćmy do rozmowy',
      'returning_multiple': 'Pogadajmy w końcu',
      'night': 'Napisz teraz — odezwiemy się rano',
      'morning': 'Zacznij dzień od dobrej decyzji',
      'local': 'Umów spotkanie w Zakopanem',
      'local_zakopane': 'Spotkajmy się na kawę',
      'google': 'Sprawdź co możemy zrobić',
      'default': 'Umów bezpłatną konsultację'
    },

    subheadlines: {
      'returning': 'Wiesz już kim jesteśmy. Teraz pokażemy co możemy zrobić dla Ciebie.',
      'local': 'Agencja premium z Podhala. Lokalni, ale myślimy globalnie.',
      'google': 'Agencja premium dla e-commerce, MŚP i marek lokalnych.',
      'default': 'Strategia. Technologia. Efekt.'
    }
  };

  // ==============================================
  // HELPER FUNCTIONS
  // ==============================================

  /**
   * Pobiera porę dnia
   */
  function getTimeOfDay() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'day';
    if (hour >= 18 && hour < 22) return 'evening';
    return 'night';
  }

  /**
   * Pobiera parametr UTM z URL
   */
  function getUTM(param) {
    return new URLSearchParams(window.location.search).get(param);
  }

  /**
   * Pobiera kontekst użytkownika
   */
  function getVisitorContext() {
    const visits = parseInt(localStorage.getItem('nevo_visits') || '0');

    return {
      // UTM parameters
      source: getUTM('utm_source'),
      medium: getUTM('utm_medium'),
      campaign: getUTM('utm_campaign'),

      // Pora dnia
      timeOfDay: getTimeOfDay(),

      // Powracający user
      isReturning: localStorage.getItem('nevo_visited') === 'true',
      visitCount: visits + 1,
      lastSection: localStorage.getItem('nevo_last_section'),

      // Geolokalizacja (uzupełniane async)
      geo: null
    };
  }

  /**
   * Określa klucz wariantu na podstawie kontekstu
   * Priorytet: UTM > Geolokalizacja > Powracający > Pora dnia > Default
   */
  function getVariantKey(context) {
    // 1. UTM source (najwyższy priorytet przy pierwszej wizycie)
    if (context.source && !context.isReturning) {
      const source = context.source.toLowerCase();
      if (source.includes('google')) return 'google';
      if (source.includes('facebook') || source.includes('fb')) return 'facebook';
      if (source.includes('instagram') || source.includes('ig')) return 'instagram';
      if (source.includes('linkedin')) return 'linkedin';
    }

    // 2. Geolokalizacja
    if (context.geo === 'local_zakopane') return 'local_zakopane';
    if (context.geo === 'local_krakow') return 'local_krakow';
    if (context.geo === 'local') return 'local';

    // 3. Powracający użytkownik
    if (context.isReturning) {
      if (context.visitCount >= 3) return 'returning_multiple';
      return 'returning';
    }

    // 4. Pora dnia
    if (context.timeOfDay === 'night') return 'night';
    if (context.timeOfDay === 'morning') return 'morning';

    // 5. Default
    return 'default';
  }

  // ==============================================
  // PERSONALIZACJA
  // ==============================================

  /**
   * Aplikuje personalizację na stronie
   */
  function applyPersonalization(context) {
    const variantKey = getVariantKey(context);
    log('Applying variant:', variantKey, context);

    // Selektory elementów do personalizacji
    const selectors = {
      headline: '.personalized-headline, .hero-headline, [data-personalize="headline"]',
      trustBar: '.personalized-trust-bar, .trust-badge, [data-personalize="trust-bar"]',
      cta: '.personalized-cta, .cta-primary a, [data-personalize="cta"]',
      subheadline: '.personalized-subheadline, .hero-tagline, [data-personalize="subheadline"]'
    };

    // Podmień headline
    const headline = document.querySelector(selectors.headline);
    if (headline && variants.headlines[variantKey]) {
      headline.textContent = variants.headlines[variantKey];
      log('Headline updated:', variants.headlines[variantKey]);
    }

    // Podmień trust bar
    const trustBar = document.querySelector(selectors.trustBar);
    if (trustBar && variants.trustBars[variantKey]) {
      trustBar.textContent = variants.trustBars[variantKey];
      log('Trust bar updated:', variants.trustBars[variantKey]);
    }

    // Podmień CTA
    const cta = document.querySelector(selectors.cta);
    if (cta && variants.ctas[variantKey]) {
      cta.textContent = variants.ctas[variantKey];
      log('CTA updated:', variants.ctas[variantKey]);
    }

    // Podmień subheadline
    const subheadline = document.querySelector(selectors.subheadline);
    if (subheadline && variants.subheadlines[variantKey]) {
      subheadline.textContent = variants.subheadlines[variantKey];
      log('Subheadline updated:', variants.subheadlines[variantKey]);
    }

    // Dodaj klasę wariantu do body (dla CSS)
    document.body.classList.add('variant-' + variantKey);
    document.body.dataset.variant = variantKey;

    // Zapisz aktywny wariant (dla analityki)
    sessionStorage.setItem('nevo_variant', variantKey);

    // Event do GA4
    if (window.gtag) {
      gtag('event', 'personalization_applied', {
        variant: variantKey,
        visit_count: context.visitCount,
        is_returning: context.isReturning,
        time_of_day: context.timeOfDay,
        utm_source: context.source || 'direct'
      });
    }
  }

  // ==============================================
  // GEOLOKALIZACJA
  // ==============================================

  /**
   * Pobiera geolokalizację i aktualizuje personalizację
   */
  async function fetchGeo() {
    // Sprawdź cache
    const cachedGeo = sessionStorage.getItem('nevo_geo');
    if (cachedGeo) {
      log('Using cached geo:', cachedGeo);
      return cachedGeo;
    }

    try {
      const response = await fetch('https://ipapi.co/json/', {
        timeout: 3000
      });

      if (!response.ok) throw new Error('Geo API error');

      const data = await response.json();
      log('Geo data:', data);

      // Miasta lokalne (Podhale + okolice)
      const zakopaneArea = ['Zakopane', 'Poronin', 'Bukowina', 'Białka', 'Groń', 'Kościelisko', 'Murzasichle'];
      const podhaleCities = ['Nowy Targ', 'Rabka', 'Czarny Dunajec', 'Jabłonka'];
      const krakowArea = ['Kraków', 'Krakow', 'Wieliczka', 'Skawina', 'Myślenice'];

      let geoVariant = null;

      // Sprawdź po mieście
      if (data.city) {
        if (zakopaneArea.some(city => data.city.includes(city))) {
          geoVariant = 'local_zakopane';
        } else if (podhaleCities.some(city => data.city.includes(city))) {
          geoVariant = 'local';
        } else if (krakowArea.some(city => data.city.includes(city))) {
          geoVariant = 'local_krakow';
        }
      }

      // Fallback: sprawdź region
      if (!geoVariant && data.region) {
        if (data.region.includes('Lesser Poland') || data.region.includes('Małopolskie')) {
          geoVariant = 'local';
        }
      }

      if (geoVariant) {
        sessionStorage.setItem('nevo_geo', geoVariant);

        // Re-apply personalization z geo
        const context = getVisitorContext();
        context.geo = geoVariant;
        applyPersonalization(context);

        log('Geo variant applied:', geoVariant);
      }

      return geoVariant;

    } catch (e) {
      log('Geo detection failed:', e.message);
      return null;
    }
  }

  // ==============================================
  // TRACKING SEKCJI
  // ==============================================

  /**
   * Śledzi które sekcje użytkownik ogląda
   */
  function trackSections() {
    const sections = document.querySelectorAll('section[data-section], [data-track-section]');

    if (!sections.length) {
      log('No sections to track');
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionName = entry.target.dataset.section || entry.target.dataset.trackSection;
          localStorage.setItem('nevo_last_section', sectionName);
          log('Section viewed:', sectionName);

          // Event do GA4
          if (window.gtag) {
            gtag('event', 'section_view', {
              section_name: sectionName,
              variant: sessionStorage.getItem('nevo_variant') || 'default'
            });
          }
        }
      });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));
    log('Tracking', sections.length, 'sections');
  }

  // ==============================================
  // SMOOTH SCROLL
  // ==============================================

  /**
   * Inicjalizuje płynne przewijanie dla anchor linków
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          // Aktualizuj URL bez przeładowania
          history.pushState(null, null, href);
        }
      });
    });
  }

  // ==============================================
  // SCROLL ANIMATIONS
  // ==============================================

  /**
   * Animacje elementów przy scroll
   */
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll, [data-animate]');

    if (!animatedElements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Animuj tylko raz
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px' // Trigger trochę wcześniej
    });

    animatedElements.forEach(el => observer.observe(el));
  }

  // ==============================================
  // INICJALIZACJA
  // ==============================================

  function init() {
    log('Initializing...');

    // Zapisz wizytę
    const visits = parseInt(localStorage.getItem('nevo_visits') || '0') + 1;
    localStorage.setItem('nevo_visits', visits.toString());
    localStorage.setItem('nevo_visited', 'true');
    log('Visit count:', visits);

    // Pobierz kontekst i personalizuj
    const context = getVisitorContext();
    applyPersonalization(context);

    // Geolokalizacja (async, może nadpisać personalizację)
    fetchGeo();

    // Tracking sekcji
    trackSections();

    // Smooth scroll
    initSmoothScroll();

    // Scroll animations
    initScrollAnimations();

    log('Initialization complete');
  }

  // Start po załadowaniu DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose dla debug
  window.NEVOPersonalization = {
    getContext: getVisitorContext,
    applyVariant: (key) => {
      const context = getVisitorContext();
      context.geo = key; // Force variant
      applyPersonalization(context);
    },
    variants: variants,
    debug: () => {
      console.log('Context:', getVisitorContext());
      console.log('Current variant:', sessionStorage.getItem('nevo_variant'));
      console.log('Visit count:', localStorage.getItem('nevo_visits'));
      console.log('Geo cache:', sessionStorage.getItem('nevo_geo'));
    }
  };

})();
