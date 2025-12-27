(function() {
	'use strict';

	const isDev = window.location.hostname === 'localhost' ||
		window.location.hostname === '127.0.0.1' ||
		document.body.classList.contains('wp-debug');

	function log(...args) {
		if (isDev) console.log('[NEVO Personalization]', ...args);
	}

	const variants = {
		headlines: {
			'google': 'Szukasz agencji do strony? Dobrze trafiłeś.',
			'facebook': 'Widziałeś nas na Facebooku — oto co możemy zrobić.',
			'instagram': 'Z Instagrama prosto do współpracy — zaczynamy?',
			'linkedin': 'Profesjonalne strony dla profesjonalistów.',
			'returning': 'Hej, miło że wróciłeś!',
			'returning-3': 'Wciąż się wahasz? Porozmawiajmy.',
			'night': 'Pracujesz po godzinach? My też — napisz teraz.',
			'morning': 'Dzień dobry! Zacznij dzień od dobrej decyzji.',
			'local': 'Działamy w Zakopanem — spotkajmy się na kawę.',
			'default': 'Twoja strona to pracownik za 0 zł/msc — albo dziura w budżecie.'
		},
		trustBars: {
			'local': '📍 Jesteśmy z Podhala — działamy lokalnie i zdalnie',
			'returning': '👋 Fajnie, że wróciłeś! Masz pytania?',
			'returning-3': '🤔 Trzecia wizyta — może czas na rozmowę?',
			'night': '🌙 Odpowiadamy też wieczorami',
			'morning': '☀️ Świeża kawa i nowe projekty — codziennie od 8:00',
			'google': '🔍 Znalazłeś nas w Google — sprawdź co możemy zrobić',
			'default': '🚀 47 firm z Małopolski nam zaufało'
		},
		ctas: {
			'returning': 'Wróćmy do rozmowy',
			'returning-3': 'Porozmawiajmy wreszcie',
			'night': 'Napisz teraz — odezwiemy się rano',
			'morning': 'Zacznij od bezpłatnej konsultacji',
			'local': 'Umów spotkanie w Zakopanem',
			'google': 'Zobacz co możemy dla Ciebie zrobić',
			'default': 'Umów bezpłatną konsultację'
		}
	};

	function getTimeOfDay() {
		const hour = new Date().getHours();
		if (hour >= 5 && hour < 12) return 'morning';
		if (hour >= 12 && hour < 18) return 'day';
		if (hour >= 18 && hour < 22) return 'evening';
		return 'night';
	}

	function getVisitorContext() {
		const params = new URLSearchParams(window.location.search);
		const visitCount = parseInt(localStorage.getItem('nevo_visits') || '0') + 1;

		return {
			source: params.get('utm_source'),
			medium: params.get('utm_medium'),
			campaign: params.get('utm_campaign'),
			timeOfDay: getTimeOfDay(),
			isReturning: localStorage.getItem('nevo_visited') === 'true',
			lastSection: localStorage.getItem('nevo_last_section'),
			visitCount: visitCount,
			geo: null
		};
	}

	function getVariantKey(context) {
		if (context.geo === 'local') return 'local';

		if (context.visitCount >= 3 && context.isReturning) return 'returning-3';
		if (context.isReturning) return 'returning';

		if (context.source === 'google' || context.medium === 'cpc') return 'google';
		if (context.source === 'facebook' || context.source === 'fb') return 'facebook';
		if (context.source === 'instagram' || context.source === 'ig') return 'instagram';
		if (context.source === 'linkedin') return 'linkedin';

		if (context.timeOfDay === 'night') return 'night';
		if (context.timeOfDay === 'morning') return 'morning';

		return 'default';
	}

	function applyPersonalization(context) {
		try {
			const variantKey = getVariantKey(context);
			log('Applying variant:', variantKey, context);

			const headline = document.querySelector('.personalized-headline');
			const trustBar = document.querySelector('.personalized-trust-bar');
			const ctas = document.querySelectorAll('.personalized-cta');

			if (headline && variants.headlines[variantKey]) {
				headline.textContent = variants.headlines[variantKey];
				headline.classList.add('personalized');
			}

			if (trustBar && variants.trustBars[variantKey]) {
				trustBar.textContent = variants.trustBars[variantKey];
				trustBar.classList.add('personalized');
			}

			if (ctas.length > 0) {
				const ctaText = variants.ctas[variantKey] || variants.ctas.default;
				ctas.forEach(cta => {
					cta.textContent = ctaText;
					cta.classList.add('personalized');
				});
			}

			document.body.classList.add('variant-' + variantKey);

			if (context.isReturning) {
				document.body.classList.add('is-returning-visitor');
			}

			if (context.timeOfDay) {
				document.body.classList.add('time-' + context.timeOfDay);
			}

		} catch (e) {
			log('Personalization error:', e);
		}
	}

	function trackSections() {
		const sections = document.querySelectorAll('section[data-section], [data-section]');

		if (!sections.length || !('IntersectionObserver' in window)) return;

		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const sectionName = entry.target.dataset.section;
					localStorage.setItem('nevo_last_section', sectionName);

					entry.target.classList.add('section-viewed');

					if (window.gtag) {
						gtag('event', 'section_view', {
							section_name: sectionName,
							page_path: window.location.pathname
						});
					}

					log('Section viewed:', sectionName);
				}
			});
		}, {
			threshold: 0.3,
			rootMargin: '-50px 0px'
		});

		sections.forEach(section => observer.observe(section));
	}

	async function fetchGeo() {
		try {
			const cached = sessionStorage.getItem('nevo_geo');
			if (cached) {
				const geoData = JSON.parse(cached);
				if (geoData.isLocal) {
					applyPersonalization({ ...getVisitorContext(), geo: 'local' });
				}
				return;
			}

			const response = await fetch('https://ipapi.co/json/', {
				signal: AbortSignal.timeout(3000)
			});

			if (!response.ok) return;

			const data = await response.json();

			const localCities = [
				'Zakopane', 'Nowy Targ', 'Kraków', 'Poronin', 'Bukowina',
				'Białka', 'Murzasichle', 'Kościelisko', 'Szaflary', 'Rabka'
			];

			const isLocal = localCities.some(city =>
				data.city?.toLowerCase().includes(city.toLowerCase())
			) || data.region?.includes('Lesser Poland') || data.region?.includes('Małopolskie');

			sessionStorage.setItem('nevo_geo', JSON.stringify({ isLocal, city: data.city }));

			if (isLocal) {
				log('Local visitor detected:', data.city);
				applyPersonalization({ ...getVisitorContext(), geo: 'local' });
			}

		} catch (e) {
			log('Geo detection skipped');
		}
	}

	function initSmoothScroll() {
		document.querySelectorAll('a[href^="#"]').forEach(anchor => {
			anchor.addEventListener('click', function(e) {
				const targetId = this.getAttribute('href');
				if (targetId === '#' || targetId === '#top') {
					e.preventDefault();
					window.scrollTo({ top: 0, behavior: 'smooth' });
					return;
				}

				const target = document.querySelector(targetId);
				if (target) {
					e.preventDefault();
					const headerOffset = 80;
					const elementPosition = target.getBoundingClientRect().top;
					const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

					window.scrollTo({
						top: offsetPosition,
						behavior: 'smooth'
					});

					history.pushState(null, null, targetId);
				}
			});
		});
	}

	function initScrollAnimations() {
		const animatedElements = document.querySelectorAll('.animate-on-scroll, .fade-in-up');

		if (!animatedElements.length || !('IntersectionObserver' in window)) return;

		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					observer.unobserve(entry.target);
				}
			});
		}, {
			threshold: 0.1,
			rootMargin: '0px 0px -50px 0px'
		});

		animatedElements.forEach(el => {
			el.classList.add('animate-ready');
			observer.observe(el);
		});
	}

	function initReturningSectionScroll(context) {
		if (!context.isReturning || !context.lastSection) return;

		const showPrompt = sessionStorage.getItem('nevo_scroll_prompt_shown');
		if (showPrompt) return;

		const lastSection = document.querySelector(`[data-section="${context.lastSection}"]`);
		if (!lastSection) return;

		sessionStorage.setItem('nevo_scroll_prompt_shown', 'true');

		log('Returning user last viewed:', context.lastSection);
	}

	function trackOutboundLinks() {
		document.querySelectorAll('a[href^="http"]').forEach(link => {
			if (link.hostname === window.location.hostname) return;

			link.addEventListener('click', function() {
				if (window.gtag) {
					gtag('event', 'click', {
						event_category: 'outbound',
						event_label: this.href,
						transport_type: 'beacon'
					});
				}
			});
		});
	}

	function initFormTracking() {
		const forms = document.querySelectorAll('form');

		forms.forEach(form => {
			form.addEventListener('submit', function() {
				if (window.gtag) {
					gtag('event', 'form_submit', {
						form_id: this.id || 'unknown',
						page_path: window.location.pathname
					});
				}
			});

			const inputs = form.querySelectorAll('input, textarea, select');
			let interacted = false;

			inputs.forEach(input => {
				input.addEventListener('focus', function() {
					if (!interacted && window.gtag) {
						interacted = true;
						gtag('event', 'form_start', {
							form_id: form.id || 'unknown'
						});
					}
				}, { once: true });
			});
		});
	}

	function init() {
		const visits = parseInt(localStorage.getItem('nevo_visits') || '0') + 1;
		localStorage.setItem('nevo_visits', visits.toString());
		localStorage.setItem('nevo_visited', 'true');

		log('Visit count:', visits);

		const context = getVisitorContext();
		applyPersonalization(context);

		fetchGeo();

		trackSections();

		initSmoothScroll();

		initScrollAnimations();

		initReturningSectionScroll(context);

		trackOutboundLinks();

		initFormTracking();

		log('Initialization complete');
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}

})();
