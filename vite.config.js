import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'; // <-- importação
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      // opções: veja abaixo
      test: /\.(jpe?g|png|gif|tiff|webp|svg)$/i,
      includePublic: true, // processa imagens da pasta public
      logStats: true,
      png: { quality: 80 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      webp: { quality: 75 },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});