import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// vite.config.js
export default defineConfig({
  base: '/',  // Cambia esto (es el valor por defecto)
  plugins: [react()],
  build: {
    outDir: 'dist',
    // Añade esto para mejor compatibilidad:
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  }
});