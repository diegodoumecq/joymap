import { cleanupCode, devDependencies, makePckJson, tsconfig, viteconfig } from '../utils';
import GamepadCode from './Gamepad.tsx?raw';
import ReactHTML from './index.html?raw';
import Index from './index.ts?raw';
import Main from './Main.tsx?raw';

export const reactFiles = {
  'index.ts': cleanupCode(Index),
  'Main.tsx': cleanupCode(Main),
  'Gamepad.tsx': cleanupCode(GamepadCode),
  'index.html': ReactHTML,
  'package.json': makePckJson({
    hasLodash: false,
    hasReact: true,
    dependencies: {
      'color-hash': devDependencies['color-hash'],
      tinycolor2: devDependencies.tinycolor2,
      '@types/color-hash': devDependencies['@types/color-hash'],
      '@types/tinycolor2': devDependencies['@types/tinycolor2'],
    },
  }),
  'tsconfig.json': tsconfig,
  'vite.config.ts': viteconfig,
};
