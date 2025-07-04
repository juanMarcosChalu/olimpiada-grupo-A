import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // ¡Cambia esto! Es crucial
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});