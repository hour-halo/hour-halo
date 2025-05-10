// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  // Set the base path to '/hour-halo/' for GitHub Pages deployment
  // This matches the repository name
  base: '/hour-halo/',
  build: {
    outDir: 'docs', // Output to docs folder for GitHub Pages
    emptyOutDir: true
  }
});
