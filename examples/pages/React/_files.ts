import { cleanupCode, devDependencies, makePckJson, tsconfig } from '../utils';
import GamepadCode from './Gamepad.tsx?raw';
import ReactHTML from './index.html?raw';
import Index from './index.ts?raw';
import Main from './Main.tsx?raw';

export const reactFiles = {
  'index.ts': {
    content: cleanupCode(Index),
    isBinary: false,
  },
  'Main.tsx': {
    content: cleanupCode(Main),
    isBinary: false,
  },
  'Gamepad.tsx': {
    content: cleanupCode(GamepadCode),
    isBinary: false,
  },
  'index.html': {
    content: ReactHTML,
    isBinary: false,
  },
  'package.json': {
    isBinary: false,
    content: makePckJson({
      hasLodash: false,
      hasReact: true,
      dependencies: {
        'color-hash': devDependencies['color-hash'],
        tinycolor2: devDependencies.tinycolor2,
      },
      devDependencies: {
        '@types/color-hash': devDependencies['@types/color-hash'],
        '@types/tinycolor2': devDependencies['@types/tinycolor2'],
      },
    }),
  },
  'tsconfig.json': tsconfig,
};
