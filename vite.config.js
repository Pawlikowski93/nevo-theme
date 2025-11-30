import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './',
  base: '/wp-content/themes/nevo/',

  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'assets/js/main.js'),
      },
      output: {
        entryFileNames: 'assets/js/[name].js',
        assetFileNames: (assetInfo) => {
          // CSS wrzucamy do assets/css
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/css/[name].[ext]';
          }
          return 'assets/[name].[ext]';
        },
      },
    },
    manifest: true,
    emptyOutDir: true,
  },

  server: {
    proxy: {
      '^(?!/wp-content/themes/nevo/)': 'http://nevo-local.local',
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
