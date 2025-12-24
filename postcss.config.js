const purgecss = require('@fullhuman/postcss-purgecss').default;

const isProd = process.env.NODE_ENV === 'production';
if (isProd) {
  console.log('📦 PurgeCSS: ENABLED for production build');
} else {
  console.log('🔧 PurgeCSS: DISABLED (development mode)');
}

const purgecssConfig = {
  content: [
    './templates/**/*.html',
    './parts/**/*.html',
    './patterns/**/*.{html,php}',
    './blocks/**/*.{js,jsx,php}',
    './inc/**/*.php',
    './*.php',
    './assets/js/**/*.js',
  ],
  defaultExtractor: content => {
    const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
    const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
    return broadMatches.concat(innerMatches);
  },
  safelist: {
    standard: [
      // WordPress dynamically added classes
      /^wp-/,
      /^is-/,
      /^has-/,
      /^align/,
      /^entry-/,
      /^post-/,
      /^page-/,
      /^admin-bar/,
      /^logged-in/,
      // Contact Form 7 (dynamic form states)
      /^wpcf7/,
      // FontAwesome
      /^fa-/,
      /^fa$/,
      /^fas$/,
      /^far$/,
      /^fab$/,
      // Accessibility
      /^screen-reader/,
      /^sr-only/,
      // JS-toggled state classes
      /^is-active$/,
      /^is-open$/,
      /^is-visible$/,
      /^is-hidden$/,
      /^active$/,
      /^open$/,
    ],
    deep: [
      /wp-block/,
      /entry-content/,
      /wpcf7/,
    ],
    greedy: [
      // WordPress dynamic color/size classes
      /^has-.*-color$/,
      /^has-.*-background-color$/,
      /^has-.*-font-size$/,
    ],
  },
  variables: true,
};

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    ...(isProd ? [purgecss(purgecssConfig)] : []),
  ],
};
