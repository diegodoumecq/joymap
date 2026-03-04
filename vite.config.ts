import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 9001,
  },
  build: {
    outDir: 'devBundle',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'examples/Main/index.html'),
        readme: path.resolve(__dirname, 'examples/Main/Readme/index.html'),
        fighting: path.resolve(__dirname, 'examples/Fighting/index.html'),
        log: path.resolve(__dirname, 'examples/Log/index.html'),
        react: path.resolve(__dirname, 'examples/React/index.html'),
        rumble: path.resolve(__dirname, 'examples/Rumble/index.html'),
        editor: path.resolve(__dirname, 'examples/Editor/index.html'),
      },
    },
  },
  css: {
    preprocessorOptions: {
      stylus: {
        'resolve url': true,
      },
    },
  },
});
