# NEVO Theme — Claude Code System Prompt

> Ten dokument zawiera instrukcje dla Claude Code do kontynuacji prac nad motywem WordPress NEVO.

---

## SYSTEM PROMPT (skopiuj jako Custom Instructions w projekcie Claude Code)

```
## Rola

Jesteś senior WordPress developerem pracującym nad custom block theme dla agencji marketingowej NEVO. Twój styl: precyzyjny, pragmatyczny, bez zbędnego gadania. Piszesz po polsku.

## Projekt

- **Nazwa:** nevo-theme
- **Typ:** WordPress Block Theme (FSE)
- **Stack:** Vite + Tailwind CSS + vanilla JS
- **Lokalizacja:** `wp-content/themes/nevo/`

## Design System

### Kolory (używaj CSS custom properties z theme.json)
- `--wp--preset--color--primary`: #1c2e40 (navy)
- `--wp--preset--color--accent`: #FF6B58 (coral) — WSZYSTKIE CTA
- `--wp--preset--color--beige`: #f5f1ed
- `--wp--preset--color--white`: #ffffff

### Fonty
- Nagłówki: Montserrat (600, 700)
- Body: Inter (400, 500)

### Spacing
- Container max: 1400px
- Padding desktop: 32px
- Padding mobile: 20px

## Konwencje

### CSS
- BEM-like: `.nevo-section__element--modifier`
- Tailwind dla layoutu, custom classes dla branded elements
- Responsywność: mobile-first, breakpoints: 768px, 1024px

### HTML (Block Theme)
```html
<!-- wp:group {"className":"nevo-section","layout":{"type":"constrained"}} -->
<div class="wp-block-group nevo-section">
  <!-- content -->
</div>
<!-- /wp:group -->
```

### JavaScript
- Vanilla JS only
- Selektory: `[data-*]` attributes
- No console.log w production

## Aktualne zadania (priorytet)

1. 🔴 Footer (`parts/footer.html`)
2. 🔴 Strona główna (`templates/front-page.html`) — 8 sekcji
3. 🟠 Landing page: Analityka & Growth
4. 🟠 Landing page: Marketing Automation

## Struktura sekcji strony głównej

1. Hero — trust badge, headline, CTA coral, benefit points
2. Problemy — 6 kart z bólami klienta
3. Metryki — 4 karty dashboard-style
4. Trzy Filary — vertical tabs (Strategia/Technologia/Efekt)
5. Proces — 4-krokowy timeline
6. Social Proof — logotypy + testimonial
7. FAQ — akordeon 10-12 pytań
8. Final CTA — ciemna karta z coral buttonem

## Komendy

```bash
# Build
cd wp-content/themes/nevo
npm run build

# Dev mode
npm run dev
```

## Definition of Done (dla każdego zadania)

- [ ] Kod działa bez błędów w konsoli
- [ ] Responsywność: 375px, 768px, 1920px
- [ ] Hover/focus states
- [ ] Semantyczny HTML
- [ ] Klasy `.nevo-*` zamiast inline styles
```

---

## KONTEKST PROJEKTU (do wklejenia na początek rozmowy)

```
Kontynuuję pracę nad motywem WordPress NEVO. Stan projektu:

✅ GOTOWE:
- Header z dropdown menu i mobile hamburger
- Szablony: page.html, single.html, index.html
- Vite + Tailwind setup
- 4 landing pages (struktura)
- theme.json z kolorami/fontami

🔲 DO ZROBIENIA TERAZ:
1. Footer (parts/footer.html)
2. Strona główna (templates/front-page.html)

ZASADY:
- Używaj kolorów z theme.json (nie hardcoded hex)
- CTA zawsze coral (#FF6B58)
- BEM naming: .nevo-*
- Mobile-first CSS
```

---

## PRZYKŁADOWE PROMPTY DLA CLAUDE CODE

### Prompt 1: Footer

```
Stwórz footer dla motywu NEVO.

Struktura:
- Tło: primary (navy)
- 3 kolumny: Logo+tagline | Menu links | Kontakt
- Dolny pasek: copyright + social icons
- Mobile: stack na 1 kolumnę

Wymagania:
- Plik: parts/footer.html
- CSS: dodaj do assets/css/main.scss
- Użyj bloków: wp:group, wp:heading, wp:paragraph, wp:html (dla linków)
```

### Prompt 2: Hero Section

```
Stwórz sekcję Hero dla strony głównej NEVO.

Treść:
- Trust Badge: "Google Certified | 6+ lat w e-commerce | Shoper Partner"
- Headline: "Od chaotycznych działań marketingowych do systemowego wzrostu sprzedaży"
- Tagline: "Strategia. Technologia. Efekt."
- CTA: "Umów bezpłatną konsultację 30 min" (kolor coral)
- Benefits: "✓ Odpowiedź w 24h • ✓ Bez zobowiązań"

Styl:
- Tło: gradient navy
- Animacje: fadeInUp dla elementów (staggered)
- Mobile: zmniejsz font-size, stack benefits pionowo
```

### Prompt 3: Sekcja Problemów

```
Stwórz sekcję "Problemy" dla strony głównej.

Nagłówek: "Twój biznes online rośnie, ale..."

6 kart z problemami:
1. Konwersja stoi w miejscu mimo ruchu
2. Budżet reklamowy topi się w nieefektywnych kampaniach
3. Bałagan w analityce — GA4/pixel/sklep pokazują co innego
4. Poprzednie agencje audytowały, ale nie wdrażały
5. Generyczne strategie "kopiuj-wklej"
6. Brak przejrzystych metryk

Styl:
- Grid: 3 kolumny desktop, 1 mobile
- Hover: translateY(-4px) + shadow
- Tło sekcji: gradient beige
```

### Prompt 4: FAQ Akordeon

```
Stwórz sekcję FAQ z akordeonem.

Pytania (10):
1. Od jakiego budżetu ma sens współpraca?
2. Na jak długo podpisujemy umowę?
3. Czy mogę zacząć od samego audytu?
4. Czy pracujecie tylko z e-commerce?
5. Jak wygląda start — co dzieje się w pierwszym miesiącu?
6. Ile to kosztuje?
7. Kiedy zobaczę pierwsze wyniki?
8. Co, jeśli kampanie nie przynoszą efektu?
9. Czym różnicie się od innych agencji?
10. Jak wygląda komunikacja?

Wymagania:
- Akordeon: klik otwiera/zamyka
- CSS: transitions dla smooth open/close
- JS: dodaj do assets/js/main.js
- Jedna otwarta naraz (toggle)
```

---

## TROUBLESHOOTING

### Problem: Bloki się nie renderują

```bash
# Sprawdź syntax bloków
grep -n "wp:group" templates/front-page.html

# Wymagana struktura:
<!-- wp:group -->
<div class="wp-block-group">
</div>
<!-- /wp:group -->
```

### Problem: CSS nie działa

```bash
# Rebuild
npm run build

# Sprawdź czy dist/ istnieje
ls -la dist/assets/css/

# Sprawdź enqueue
cat inc/enqueue.php | grep "main.css"
```

### Problem: JS nie działa

```bash
# Sprawdź konsolę przeglądarki
# F12 → Console → szukaj błędów

# Sprawdź czy plik jest enqueued
cat inc/enqueue.php | grep "main.js"
```

---

## PLIKI REFERENCYJNE

Poproś Claude Code o przeczytanie tych plików przed rozpoczęciem pracy:

1. **theme.json** — kolory, fonty, spacing
2. **parts/header.html** — przykład struktury bloków
3. **assets/css/main.scss** — istniejące style
4. **assets/js/main.js** — istniejący JS

---

## GOTOWE SNIPPETY

### Button CTA (coral)

```html
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons">
  <!-- wp:button {"backgroundColor":"accent","textColor":"white","className":"nevo-cta-btn"} -->
  <div class="wp-block-button nevo-cta-btn">
    <a class="wp-block-button__link has-white-color has-accent-background-color" href="/kontakt/">
      Umów bezpłatną konsultację 30 min
    </a>
  </div>
  <!-- /wp:button -->
</div>
<!-- /wp:buttons -->
```

### Sekcja z constrained layout

```html
<!-- wp:group {"align":"full","className":"nevo-section","layout":{"type":"constrained","contentSize":"1200px"}} -->
<section class="wp-block-group alignfull nevo-section">
  
  <!-- wp:heading {"textAlign":"center","level":2,"className":"nevo-section__title"} -->
  <h2 class="wp-block-heading has-text-align-center nevo-section__title">
    Tytuł sekcji
  </h2>
  <!-- /wp:heading -->
  
</section>
<!-- /wp:group -->
```

### Card component

```html
<!-- wp:group {"className":"nevo-card","backgroundColor":"white"} -->
<div class="wp-block-group nevo-card has-white-background-color">
  <!-- wp:heading {"level":3,"className":"nevo-card__title"} -->
  <h3 class="wp-block-heading nevo-card__title">Tytuł karty</h3>
  <!-- /wp:heading -->
  
  <!-- wp:paragraph {"className":"nevo-card__text"} -->
  <p class="nevo-card__text">Opis karty.</p>
  <!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
```

---

*Instrukcja dla Claude Code — wersja 1.0*
