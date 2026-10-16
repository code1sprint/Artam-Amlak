import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

/** Normalize Vite `base` so it always ends with `/`. */
function normalizeBase(raw: string | undefined): string {
  if (!raw || raw === '/') return '/';
  return raw.endsWith('/') ? raw : `${raw}/`;
}

/** Copy index.html → 404.html so deep links work on GitHub Pages (SPA fallback). */
function spaFallback404(): Plugin {
  return {
    name: 'spa-fallback-404',
    closeBundle() {
      const dist = path.resolve(import.meta.dirname, 'dist');
      const indexHtml = path.join(dist, 'index.html');
      const notFoundHtml = path.join(dist, '404.html');
      if (fs.existsSync(indexHtml)) {
        fs.copyFileSync(indexHtml, notFoundHtml);
      }
    },
  };
}

export default defineConfig(() => {
  return {
    // GitHub Actions sets BASE_PATH=/<repo>/ ; local/dev defaults to `/`
    base: normalizeBase(process.env.BASE_PATH),
    plugins: [react(), tailwindcss(), spaFallback404()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, './src'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
