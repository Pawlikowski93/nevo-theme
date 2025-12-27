# Deployment Landing Page "Strony internetowe"

## Pre-deployment checklist

### Pliki do stworzenia
- [x] templates/landing-strony.html
- [x] assets/css/landing-strony.css
- [x] assets/js/landing-strony.js
- [x] blocks/comparison-table/ (block.json, index.js, style.css, editor.css)
- [x] blocks/process-timeline/ (block.json, index.js, style.css, editor.css)
- [x] blocks/time-calculator/ (block.json, index.js, style.css, view.js)
- [x] blocks/audit-widget/ (block.json, index.js, style.css, editor.css)
- [x] blocks/ai-chat/ (block.json, index.js, style.css, editor.css)
- [x] blocks/booking-calendar/ (block.json, index.js, style.css, editor.css)

### Aktualizacje istniejących plików
- [x] inc/enqueue.php — dodane ładowanie CSS/JS dla landing page
- [x] functions.php — zarejestrowane nowe bloki
- [x] webpack.config.js — dodane entry points dla nowych bloków

---

## Build process (localhost)

```bash
cd wp-content/themes/nevo

npm install

npm run build

npm run build:blocks
```

### Weryfikacja builda
```bash
ls -la build/blocks/
ls -la dist/assets/
```

Powinny istnieć katalogi:
- `build/blocks/comparison-table/`
- `build/blocks/process-timeline/`
- `build/blocks/time-calculator/`
- `build/blocks/audit-widget/`
- `build/blocks/ai-chat/`
- `build/blocks/booking-calendar/`

---

## Pliki do przesłania przez FTP

### NOWE PLIKI (upload cały katalog/plik)

```
wp-content/themes/nevo/
├── templates/
│   └── landing-strony.html          ← NOWY
├── assets/
│   ├── css/
│   │   └── landing-strony.css       ← NOWY
│   └── js/
│       └── landing-strony.js        ← NOWY
├── blocks/
│   ├── comparison-table/            ← CAŁY KATALOG
│   ├── process-timeline/            ← CAŁY KATALOG
│   ├── time-calculator/             ← CAŁY KATALOG
│   ├── audit-widget/                ← CAŁY KATALOG
│   ├── ai-chat/                     ← CAŁY KATALOG
│   └── booking-calendar/            ← CAŁY KATALOG
└── build/
    └── blocks/
        ├── comparison-table/        ← CAŁY KATALOG
        ├── process-timeline/        ← CAŁY KATALOG
        ├── time-calculator/         ← CAŁY KATALOG
        ├── audit-widget/            ← CAŁY KATALOG
        ├── ai-chat/                 ← CAŁY KATALOG
        └── booking-calendar/        ← CAŁY KATALOG
```

### ZAKTUALIZOWANE PLIKI (nadpisz)

```
wp-content/themes/nevo/
├── inc/
│   └── enqueue.php                  ← NADPISZ
├── functions.php                    ← NADPISZ
├── webpack.config.js                ← NADPISZ
└── dist/
    └── assets/
        ├── css/
        │   └── main.css             ← NADPISZ
        └── js/
            └── main.js              ← NADPISZ
```

---

## Szybka lista FTP (kopiuj-wklej)

### Katalogi do uploadu:
```
templates/
assets/css/landing-strony.css
assets/js/landing-strony.js
blocks/comparison-table/
blocks/process-timeline/
blocks/time-calculator/
blocks/audit-widget/
blocks/ai-chat/
blocks/booking-calendar/
build/blocks/comparison-table/
build/blocks/process-timeline/
build/blocks/time-calculator/
build/blocks/audit-widget/
build/blocks/ai-chat/
build/blocks/booking-calendar/
dist/assets/
```

### Pliki do nadpisania:
```
inc/enqueue.php
functions.php
webpack.config.js
```

---

## Konfiguracja w WordPress Admin

### 1. Utwórz stronę
- **Tytuł:** Strony internetowe
- **Slug:** strony-internetowe
- **Template:** Landing - Strony internetowe (z dropdown)
- **Status:** Draft (do testów)

### 2. Dodaj bloki w edytorze
Wyszukaj w inserterze "NEVO" - powinny pojawić się:
- NEVO Tabela Porównawcza
- NEVO Timeline Procesu
- NEVO Kalkulator Czasu
- NEVO Live Audit
- NEVO AI Chat
- NEVO Kalendarz Rezerwacji

### 3. Konfiguracja bloków

**nevo/booking-calendar:**
- Wpisz URL Cal.com w panelu bocznym
- Wybierz typ: inline lub popup

**nevo/time-calculator:**
- Ustaw stawkę godzinową (domyślnie 100 PLN)
- Zmień tekst CTA jeśli potrzeba

---

## Testy po wdrożeniu

### Responsywność
- [ ] Desktop 1920px
- [ ] Desktop 1440px
- [ ] Laptop 1200px
- [ ] Tablet 1024px
- [ ] Tablet 768px
- [ ] Mobile 414px
- [ ] Mobile 375px

### Personalizacja
Testuj z parametrami URL:
- `?utm_source=google` → headline Google
- `?utm_source=facebook` → headline Facebook
- Otwórz ponownie (returning user)
- Testuj wieczorem (wariant night)

### Funkcjonalność
- [ ] Smooth scroll działa (linki #sekcja)
- [ ] Kalkulator czasu liczy poprawnie
- [ ] Placeholdery widoczne (audit, chat, calendar)
- [ ] Bloki edytowalne w Gutenberg
- [ ] Formularze działają (jeśli są)

### Performance
- [ ] PageSpeed Insights > 85 (mobile)
- [ ] Brak błędów w konsoli JS
- [ ] CSS/JS ładują się warunkowo (tylko na landing)

---

## SEO checklist

- [ ] Meta title ustawiony (Yoast/RankMath)
- [ ] Meta description ustawiony
- [ ] Open Graph image (1200x630px)
- [ ] Canonical URL poprawny
- [ ] Schema markup (opcjonalnie)

---

## Troubleshooting

### Bloki nie pojawiają się w edytorze
1. Sprawdź czy `build/blocks/*/block.json` istnieją
2. Sprawdź konsolę przeglądarki (F12) na błędy JS
3. Wyczyść cache WordPressa

### Style nie działają
1. Sprawdź czy `dist/assets/css/main.css` jest aktualny
2. Sprawdź czy `assets/css/landing-strony.css` został przesłany
3. Wyczyść cache przeglądarki (Ctrl+Shift+R)

### Personalizacja nie działa
1. Sprawdź czy `assets/js/landing-strony.js` jest załadowany
2. Otwórz konsolę → szukaj `[NEVO Personalization]`
3. Sprawdź localStorage: `localStorage.getItem('nevo_visited')`

### Kalkulator nie renderuje się
1. Sprawdź czy `build/blocks/time-calculator/view.js` istnieje
2. Sprawdź czy `wp-element` jest dostępny
3. Sprawdź czy div `#nevo-calculator` jest w HTML

---

## Rollback

Jeśli coś nie działa, przywróć poprzednie wersje plików:

```bash
git checkout HEAD~1 -- inc/enqueue.php
git checkout HEAD~1 -- functions.php
```

Lub przez FTP przywróć backup plików przed zmianami.
