import fs from 'fs';
import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/joymap/',
  assetsInclude: ['**/*.md'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      joymap: path.resolve(__dirname, './src/index.ts'),
    },
  },
  plugins: [
    react(),
    {
      name: 'copy-assets',
      closeBundle() {
        const srcDir = path.resolve(__dirname, 'assets');
        const destDir = path.resolve(__dirname, 'docs');
        if (fs.existsSync(srcDir)) {
          fs.cpSync(srcDir, destDir, { recursive: true });
        }
      },
    },
  ],
  build: {
    outDir: 'docs',
    sourcemap: true,
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

