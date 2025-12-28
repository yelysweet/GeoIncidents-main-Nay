import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@services': '/src/services',
      '@store': '/src/store'
    }
  },

  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 1000, // evita la advertencia de >500kb
    sourcemap: false, // opcional: quita mapas para producción
    minify: "esbuild" // más rápido para React
  }
});
