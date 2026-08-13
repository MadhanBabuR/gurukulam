import { defineConfig } from 'vite';

// Dev server stays at root; only the production build (deployed to GitHub
// Pages as a project site) needs the /gurukulam/ subpath prefix.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/gurukulam/' : '/',
}));
