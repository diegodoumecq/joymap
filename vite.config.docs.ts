import fs from 'fs';
import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  assetsInclude: ['**/*.md'],
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
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        readme: path.resolve(__dirname, 'examples/Main/Readme/index.html'),
        fighting: path.resolve(__dirname, 'examples/Fighting/index.html'),
        log: path.resolve(__dirname, 'examples/Log/index.html'),
        react: path.resolve(__dirname, 'examples/React/index.html'),
        rumble: path.resolve(__dirname, 'examples/Rumble/index.html'),
        editor: path.resolve(__dirname, 'examples/Editor/index.html'),
      },
    },
  },
});
