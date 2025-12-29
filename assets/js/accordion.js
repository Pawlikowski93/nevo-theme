/**
 * NEVO Accordion
 * Automatyczne zamykanie innych details po otwarciu nowego
 */
(function() {
  'use strict';

  const allDetails = document.querySelectorAll('details.wp-block-details');

  allDetails.forEach(detail => {
    detail.addEventListener('toggle', () => {
      if (detail.open) {
        // Zamknij wszystkie inne details
        allDetails.forEach(other => {
          if (other !== detail && other.open) {
            other.open = false;
          }
        });
      }
    });
  });

})();
