import { defineConfig } from 'vite';
import { resolve } from 'path';

// Served from the root of the custom domain (gvsayurvedagurukulam.com),
// so both dev and production builds use the root base path.
export default defineConfig(() => ({
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        lineage: resolve(__dirname, 'lineage/index.html'),
        programmes: resolve(__dirname, 'programmes/index.html'),
      },
    },
  },
}));
