/** @type {import('tailwindcss').Config} */
const themeJson = require('./theme.json');

// Map theme.json colors to Tailwind
const colors = {};
themeJson.settings.color.palette.forEach((color) => {
  colors[color.slug] = color.color;
});

// Map spacing
const spacing = {};
themeJson.settings.spacing.spacingSizes.forEach((size) => {
  spacing[size.slug] = size.size;
});

// Map font sizes
const fontSize = {};
themeJson.settings.typography.fontSizes.forEach((size) => {
  fontSize[size.slug] = size.size;
});

module.exports = {
  content: [
    './*.php',
    './templates/**/*.html',
    './parts/**/*.html',
    './patterns/**/*.html',
    './patterns/**/*.php',
    './blocks/**/*.{js,jsx,php}',
    './assets/js/**/*.js',
    './inc/**/*.php',
  ],
  // Safelist WordPress and NEVO classes that might be dynamically generated
  safelist: [
    // WordPress core patterns
    { pattern: /^wp-/ },
    { pattern: /^is-/ },
    { pattern: /^has-/ },
    { pattern: /^align/ },
    // NEVO custom classes
    { pattern: /^nevo-/ },
    // Contact Form 7
    { pattern: /^wpcf7/ },
    // Accessibility
    'screen-reader-text',
    'admin-bar',
    // Dynamic color classes
    { pattern: /^has-(.*)-color$/ },
    { pattern: /^has-(.*)-background-color$/ },
  ],
  theme: {
    extend: {
      colors,
      spacing,
      fontSize,
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        logo: ['Roboto', 'sans-serif'],
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1200px',
        '2xl': '1400px',
      },
    },
  },
  plugins: [],
};