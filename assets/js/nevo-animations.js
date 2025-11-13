import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  // Fade in dla bloków
  gsap.utils.toArray('.nevo-tile, .nevo-cta').forEach((element) => {
    gsap.from(element, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });

  // Hero parallax (jeśli chcesz)
  const hero = document.querySelector('.nevo-hero');
  if (hero) {
    gsap.to(hero, {
      backgroundPosition: '50% 100px',
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }
});