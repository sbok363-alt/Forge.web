import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = env.VITE_FORGE_SITE_URL || process.env.VITE_FORGE_SITE_URL || '';

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'html-seo-transform',
        transformIndexHtml(html) {
          if (siteUrl && siteUrl.trim()) {
            const cleanUrl = siteUrl.trim().replace(/\/$/, '');
            const tags = [
              `<link rel="canonical" href="${cleanUrl}" />`,
              `<meta property="og:url" content="${cleanUrl}" />`,
            ].join('\n    ');
            return html.replace('<!-- VITE_SEO_CANONICAL -->', tags);
          }
          return html.replace('<!-- VITE_SEO_CANONICAL -->', '');
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
