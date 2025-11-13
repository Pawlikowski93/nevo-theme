import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './',
  base: '/wp-content/themes/nevo/',
  
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'assets/css/main.scss'),
        js: resolve(__dirname, 'assets/js/main.js'),
      },
      output: {
        entryFileNames: 'assets/js/[name].js',
        assetFileNames: 'assets/css/[name].[ext]',
      },
    },
    manifest: true,
    emptyOutDir: true,
  },

  server: {
    proxy: {
      '^(?!/wp-content/themes/nevo/)': 'http://nevo-local.local', // Twoja lokalna domena
    },
    cors: true,
    strictPort: true,
    port: 3000,
    hmr: {
      host: 'localhost',
      protocol: 'ws',
    },
  },
});