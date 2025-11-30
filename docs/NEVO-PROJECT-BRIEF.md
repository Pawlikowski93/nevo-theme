# NEVO Website Project — Developer Brief

**Data:** 2025-01-19  
**Projekt:** nevomarketing.pl  
**Właściciel:** Andrzej Pawlikowski (NEVO Marketing)  
**Cel dokumentu:** Pełna specyfikacja dla zespołu deweloperskiego do kontynuacji prac

---

## TL;DR — Executive Summary

1. **Projekt:** Strona agencji marketingowej NEVO — WordPress Block Theme (FSE) + Vite + Tailwind CSS
2. **Stan:** ~50% ukończone — działa lokalnie na XAMPP, header gotowy, 4/7 landing pages mają strukturę
3. **Główne zadanie teraz:** Dokończyć stronę główną (Home), footer, 3 pozostałe landing pages, deploy na produkcję
4. **Stack:** WordPress 6.7+, Vite, Tailwind CSS, Contact Form 7, Zenbox hosting
5. **Branding:** Navy #1c2e40, Coral #FF6B58 (CTA), Beige #f5f1ed, fonty Montserrat/Inter
6. **Tagline:** "Strategia. Technologia. Efekt."

---

## 1. Kontekst Biznesowy

### O NEVO Marketing
- Agencja premium dla e-commerce, MŚP i marek lokalnych
- Pozycjonowanie: "Od strategii przez technologię po mierzalny wynik"
- Główna konwersja: bezpłatna konsultacja 30 min
- Klienci docelowi: sklepy e-commerce z budżetem 5000+ PLN/mies na reklamy

### Kluczowe Usługi
1. Strategia Marketingowa (4,500 zł jednorazowo)
2. Performance Marketing (2,500 zł setup + od 3,500 zł/mies)
3. E-commerce Development (8,500–25,000+ zł)
4. Analityka & Growth *(wkrótce)*
5. Marketing Automation *(wkrótce)*

### USP (Unique Selling Proposition)
- Nie audytujemy — wdrażamy
- Konkretne metryki i wyniki zamiast raportów PDF
- Odpowiedź w 24h, transparentny proces

---

## 2. Architektura Techniczna

### 2.1 Stack Technologiczny

| Warstwa | Technologia |
|---------|-------------|
| CMS | WordPress 6.7+ (Block Theme / FSE) |
| Bundler | Vite 5.x |
| CSS | Tailwind CSS 3.4 + PostCSS |
| JavaScript | Vanilla JS (bez frameworków) |
| Formularze | Contact Form 7 |
| Środowisko lokalne | XAMPP |
| Hosting produkcyjny | Zenbox (staging: stage.nevo.pl) |
| Repo | Git (GitHub/GitLab) |

### 2.2 Struktura Plików Motywu

```
nevo/
├── assets/
│   ├── css/
│   │   └── main.scss          # Główny plik CSS (Tailwind + custom)
│   ├── js/
│   │   └── main.js            # JavaScript (mobile menu, scroll)
│   ├── fonts/
│   └── images/
├── blocks/                     # Custom Gutenberg blocks (opcjonalnie)
│   ├── hero/
│   ├── tiles/
│   └── cta/
├── build/                      # Zbudowane bloki
├── dist/                       # Output Vite (CSS/JS production)
│   └── assets/
│       ├── css/main.css
│       └── js/main.js
├── inc/
│   ├── block-patterns.php
│   ├── enqueue.php            # Ładowanie CSS/JS
│   └── theme-setup.php
├── parts/
│   ├── header.html            # Header template part ✅ GOTOWY
│   └── footer.html            # Footer template part 🔲 DO ZROBIENIA
├── patterns/
├── templates/
│   ├── front-page.html        # Strona główna 🔲 DO ZROBIENIA
│   ├── page.html              # Standardowe strony ✅
│   ├── single.html            # Pojedyncze posty ✅
│   └── index.html             # Fallback ✅
├── functions.php
├── style.css                  # Theme header
├── theme.json                 # Konfiguracja FSE (kolory, fonty, spacing)
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

### 2.3 Komendy Build

```bash
# Przejdź do katalogu motywu
cd wp-content/themes/nevo

# Build CSS + JS (production)
npm run build

# Dev mode (hot reload)
npm run dev

# Build bloków Gutenberg
npm run build:blocks
```

---

## 3. Design System

### 3.1 Kolory

| Nazwa | Hex | Zastosowanie |
|-------|-----|--------------|
| Primary (Navy) | `#1c2e40` | Tła ciemne, teksty główne |
| Accent (Coral) | `#FF6B58` | **CTA buttons**, akcenty |
| Coral Hover | `#FF8573` | Hover state CTA |
| Background (Beige) | `#f5f1ed` | Tła jasne, karty |
| White | `#ffffff` | Karty kontrastowe |
| Text Secondary | `#4b5563` | Teksty pomocnicze |

> **WAŻNE:** Badanie konkurencji wykazało, że coral/salmon działa lepiej jako kolor CTA niż beige. Wszystkie główne CTA powinny być #FF6B58.

### 3.2 Typografia

| Rola | Font | Wagi |
|------|------|------|
| Nagłówki | Montserrat | 600, 700 |
| Body | Inter | 400, 500 |
| Logo | Roboto | 500, 700 |

**Rozmiary (clamp dla responsywności):**
- H1 Hero: `clamp(2.5rem, 5vw, 4.5rem)`
- H2 Section: `clamp(2rem, 4vw, 3rem)`
- Body: 16–18px
- Small: 14px

### 3.3 Spacing & Layout

- Max-width container: 1400px
- Padding desktop: 32px
- Padding mobile: 20px
- Section spacing: 80–120px vertical
- Border-radius karty: 12–18px
- Box-shadow karty: `0 8px 24px rgba(0, 0, 0, 0.08)`

---

## 4. Komponenty UI — Status i Specyfikacja

### 4.1 Header ✅ GOTOWY

**Plik:** `parts/header.html`

**Funkcjonalności:**
- Fixed header z blur backdrop
- Logo po lewej (180px)
- Navigation z dropdown "Usługi"
- CTA button "Kontakt" (coral)
- Mobile hamburger menu z overlay
- Scroll behavior (dodaje klasę `.scrolled`)

**Ważne decyzje:**
- Hardcoded links (nie WordPress Navigation block) — stabilniejsze w FSE
- Menu "Usługi" zawiera badge "Wkrótce" dla niedokończonych stron

### 4.2 Footer 🔲 DO ZROBIENIA

**Planowana struktura:**
- Tło: Navy #1c2e40
- Kolumny: Logo+tagline | Linki nawigacji | Dane kontaktowe
- Dolny pasek: Copyright + social icons
- Responsywność: stack na mobile

### 4.3 Hero Section 🔲 DO ZROBIENIA (dla front-page)

**Specyfikacja z badania konkurencji:**

```
[Trust Badge] — Google Certified | 6+ lat w e-commerce | Shoper Partner
[Headline] — Od chaotycznych działań marketingowych do systemowego wzrostu sprzedaży
[Tagline] — Strategia. Technologia. Efekt.
[Subheadline] — Agencja premium dla e-commerce, MŚP i marek lokalnych
[Case Study Box] — +250% wzrost przychodu w 4 miesiące
[CTA Primary] — Umów bezpłatną konsultację 30 min (CORAL)
[Benefit Points] — ✓ Odpowiedź w 24h • ✓ Bez zobowiązań
[Hero Graphic] — AI-generated dashboard/growth visual
```

**Tło:** Gradient `#1c2e40 → #2a4458` + subtle pattern

### 4.4 Sekcje Strony Głównej (kolejność)

| # | Sekcja | Cel | Status |
|---|--------|-----|--------|
| 1 | Hero | Pierwsze wrażenie + główne CTA | 🔲 |
| 2 | Problemy | "Twój biznes rośnie, ale..." — 6 bólów klienta | 🔲 |
| 3 | Metryki | Dashboard liczb (ROAS, przychód, doświadczenie) | 🔲 |
| 4 | Trzy Filary | Strategia/Technologia/Efekt — zakładki | 🔲 |
| 5 | Proces | 4 kroki współpracy — timeline | 🔲 |
| 6 | Social Proof | Logotypy klientów + testimonial | 🔲 |
| 7 | FAQ | Akordeon 10-12 pytań | 🔲 |
| 8 | Final CTA | Mocne domknięcie — ciemna karta | 🔲 |

---

## 5. Landing Pages — Status

### 5.1 GOTOWE (struktura + treść)

| Strona | URL | Pricing | Hero Pattern |
|--------|-----|---------|--------------|
| Strategia Marketingowa | `/strategia-marketingowa/` | 4,500 zł | Blueprint grid |
| Performance Marketing | `/performance-marketing/` | 2,500 + 3,500+/mies | Mesh + dots |
| E-commerce Development | `/ecommerce-development/` | 8.5k / 15.5k / 25k+ | Circuit board |
| Kontakt | `/kontakt/` | — | — |

### 5.2 DO ZROBIENIA

| Strona | URL | Opis |
|--------|-----|------|
| Home (front-page) | `/` | Główna landing page |
| Analityka & Growth | `/analityka-growth/` | GA4, GTM, dashboardy |
| Marketing Automation | `/marketing-automation/` | Klaviyo, flow automation |

---

## 6. Kluczowe Decyzje Architektoniczne

### 6.1 Dlaczego Block Theme (FSE)?

- Native WordPress bez page builderów
- Lepszy performance (brak dodatkowych pluginów)
- Pełna kontrola nad kodem
- Zgodność z przyszłymi wersjami WP

### 6.2 Dlaczego Vite + Tailwind?

- Szybki build i HMR
- Tailwind utility classes przyspieszają development
- Output zminifikowany automatycznie
- theme.json integruje kolory z Tailwind config

### 6.3 Dlaczego hardcoded menu?

- WordPress Navigation block jest niestabilny w FSE
- Dropdown wymaga custom JS
- Pełna kontrola nad strukturą i stylami

### 6.4 Stylowanie sekcji

- **Preferowane:** Klasy CSS (`.nevo-section__element`)
- **Unikać:** Inline styles w blokach
- Wszystkie custom styles w `assets/css/main.scss`

---

## 7. Wzorce UX/UI z Badania Konkurencji

### 7.1 Najważniejsze Wnioski

1. **Trust signals PRZED konwersją** — award badges, certyfikaty, metryki w hero
2. **Coral > Beige dla CTA** — ciepły akcent na navy tle = wyższa konwersja
3. **Problem-first approach** — najpierw bóle klienta, potem rozwiązanie
4. **Process transparency** — 4 kroki, timeline, jasne expectation
5. **FAQ zbija obiekcje** — cena, czas, zakres, różnice od konkurencji
6. **Brak chatbotów/popupów** — premium feel = spokojne UX

### 7.2 Referencje

- **MONSOON** (monsoon.agency) — European Agency of the Year, coral CTAs
- **Delante** (delante.co) — metryki, process transparency
- **Bluerank** (bluerank.com) — social proof, client logos

---

## 8. TODO — Priorytety

### 🔴 Krytyczne (przed launch)

1. [ ] **Footer** — kompletny z danymi kontaktowymi
2. [ ] **Strona główna** — wszystkie 8 sekcji
3. [ ] **Logo** — wgrać własne do WordPress
4. [ ] **npm run build** — upewnić się że działa bez błędów
5. [ ] **Test mobile** — header, hero, wszystkie sekcje

### 🟠 Ważne (pierwszy tydzień po launch)

1. [ ] Landing: Analityka & Growth
2. [ ] Landing: Marketing Automation
3. [ ] Grafiki AI dla hero (Midjourney/DALL-E)
4. [ ] Ikony dla sekcji (SVG lub AI-generated)
5. [ ] Formularze CF7 — walidacja, tracking

### 🟢 Nice-to-have

1. [ ] Case Studies (oddzielna strona)
2. [ ] O nas / Zespół
3. [ ] Blog
4. [ ] Animacje GSAP (fade-in on scroll)
5. [ ] A/B testy nagłówków

---

## 9. Deploy Checklist

### Pre-deploy

- [ ] `npm run build` bez błędów
- [ ] Test lokalnie wszystkich stron
- [ ] Test mobile menu
- [ ] Test formularza kontaktowego
- [ ] Sprawdzić wszystkie linki

### Upload na produkcję (Zenbox)

```bash
# Upload przez SFTP (wyłącznie te foldery/pliki):
dist/
parts/
templates/
inc/
functions.php
style.css
theme.json

# NIE uploadować:
node_modules/
package.json
*.config.js
assets/css/main.scss (tylko dist/)
```

### Post-deploy

- [ ] Aktywować motyw w WP Admin
- [ ] Settings → Permalinks → Save (regenerate)
- [ ] SSL certificate (Let's Encrypt)
- [ ] Google Analytics + GTM
- [ ] Google Search Console
- [ ] PageSpeed test (target: 85+ mobile, 95+ desktop)

---

## 10. Kontakt / Dane Konfiguracyjne

### Dane firmy

- **Email:** kontakt@nevomarketing.pl
- **Telefon:** +48 XXX XXX XXX *(do uzupełnienia)*
- **Godziny:** Pn–Pt 9:00–17:00
- **Lokalizacja:** Zakopane, Polska

### Środowiska

| Środowisko | URL | Dostęp |
|------------|-----|--------|
| Lokalne | `http://localhost/nevo-marketing/` | XAMPP |
| Staging | `https://stage.nevo.pl` | Zenbox |
| Produkcja | `https://nevomarketing.pl` | Zenbox |

### Repozytorium

```
git@github.com:nevo-agency/nevo-theme.git
```

---

## 11. Znane Problemy / Gotchas

### Problem: CSS się nie ładuje

**Rozwiązanie:**
1. Sprawdź czy `dist/assets/css/main.css` istnieje
2. Uruchom `npm run build`
3. Sprawdź `inc/enqueue.php` — ścieżka do pliku
4. Clear cache: Ctrl+Shift+R

### Problem: Template part nie renderuje

**Rozwiązanie:**
1. Sprawdź pierwszą linię w template:
   ```html
   <!-- wp:template-part {"slug":"header","tagName":"header"} /-->
   ```
2. Sprawdź czy `parts/header.html` istnieje
3. Nazwa pliku musi odpowiadać `slug`

### Problem: Block Theme nie ma "Menus"

**Rozwiązanie:**
Block Theme (FSE) nie używa klasycznego Appearance → Menus.
Menu jest hardcoded w `parts/header.html` jako `<!-- wp:html -->` block.

### Problem: Vite HMR nie działa

**Rozwiązanie:**
1. Sprawdź `vite.config.js` — proxy URL musi pasować do localhost
2. W `inc/enqueue.php` sprawdź czy `WP_DEBUG = true`
3. Port 3000 musi być wolny

---

## 12. Konwencje Kodowania

### CSS

```scss
// BEM-like naming
.nevo-section { }
.nevo-section__title { }
.nevo-section__title--accent { }

// Tailwind utilities dla layoutu
// Custom classes dla branded elements
```

### JavaScript

```javascript
// Vanilla JS, no frameworks
// data-* attributes dla selektorów
// Event delegation gdzie możliwe
document.querySelector('[data-menu-toggle]')
```

### HTML (Block Theme)

```html
<!-- Zawsze komentarz przed blokiem -->
<!-- wp:group {"className":"nevo-section"} -->
<div class="wp-block-group nevo-section">
  <!-- content -->
</div>
<!-- /wp:group -->
```

### Git Commits

```
feat: add hero section with animations
fix: mobile menu not closing on link click
style: adjust CTA button padding
docs: update README with deploy instructions
```

---

## Załączniki

### A. Pliki do przeczytania (w kolejności)

1. `podsumowanie-claude-nevo.md` — aktualny stan projektu
2. `podsumowanie-gpt-nevo.md` — specyfikacja strony głównej
3. `plan.md` — oryginalny plan 7 faz
4. `badanie.md` — analiza konkurencji

### B. Kluczowe pliki kodu (do skopiowania z repozytorium)

1. `theme.json` — konfiguracja kolorów, fontów, spacing
2. `parts/header.html` — kompletny header
3. `inc/enqueue.php` — ładowanie CSS/JS
4. `assets/js/main.js` — mobile menu, scroll handling

---

*Dokument wygenerowany: 2025-01-19*  
*Wersja: 1.0*
