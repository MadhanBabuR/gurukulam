import { defineConfig } from 'vite';

// Served from the root of the custom domain (gvsayurvedagurukulam.com),
// so both dev and production builds use the root base path.
export default defineConfig(() => ({
  base: '/',
}));
