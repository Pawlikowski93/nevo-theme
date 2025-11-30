// assets/js/pillars-tabs.js

document.addEventListener('DOMContentLoaded', function () {
  const pillarsRoot = document.querySelector('[data-nevo-pillars]');
  if (!pillarsRoot) return;

  const tabs = pillarsRoot.querySelectorAll('.nevo-pillars__tab');
  const panels = pillarsRoot.querySelectorAll('.nevo-pillars__panel');

  if (!tabs.length || !panels.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.pillar;
      if (!target) return;

      // zakładki
      tabs.forEach((btn) => {
        btn.classList.remove('is-active');
        btn.setAttribute('aria-selected', 'false');
      });

      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      // panele
      panels.forEach((panel) => {
        const isTarget = panel.dataset.pillar === target;
        panel.classList.toggle('is-active', isTarget);
        if (isTarget) {
          panel.removeAttribute('hidden');
        } else {
          panel.setAttribute('hidden', '');
        }
      });

      // Event do GA4 – tylko jeśli gtag istnieje
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'nevo_pillar_tab_click', {
          pillar_name: target,
        });
      }
    });
  });
});
