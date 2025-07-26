import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: '.', // your root folder, adjust if needed
  base: '/', // or '/subfolder/' if deploying to a subfolder
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: './index.html',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // shorthand for imports
    },
  },
  server: {
    host: true,
    port: 5173,
    open: true,
    strictPort: true,
    hmr: true,
  },
});
