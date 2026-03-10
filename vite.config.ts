import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      joymap: path.resolve(__dirname, './src/index.ts'),
    },
  },
  server: {
    port: 9001,
  },
  build: {
    outDir: 'devBundle',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        readme: path.resolve(__dirname, 'examples/pages/Readme/index.html'),
        fighting: path.resolve(__dirname, 'examples/pages/Fighting/index.html'),
        log: path.resolve(__dirname, 'examples/pages/Log/index.html'),
        react: path.resolve(__dirname, 'examples/pages/React/index.html'),
        rumble: path.resolve(__dirname, 'examples/pages/Rumble/index.html'),
        editor: path.resolve(__dirname, 'examples/pages/Editor/index.html'),
      },
    },
  },
});
