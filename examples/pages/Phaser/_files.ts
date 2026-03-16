import packageJson from '../../../package.json';
import { cleanupCode, makePckJson, tsconfig } from '../utils';
import PhaserHTML from './index.html?raw';
import PhaserCode from './index.ts?raw';

export const phaserFiles = {
  'index.ts': {
    content: cleanupCode(PhaserCode),
    isBinary: false,
  },
  'index.html': {
    content: PhaserHTML,
    isBinary: false,
  },
  'package.json': {
    isBinary: false,
    content: makePckJson({
      hasLodash: false,
      hasReact: false,
      devDependencies: {
        phaser: packageJson.devDependencies.phaser,
      },
    }),
  },
  'tsconfig.json': tsconfig,
};
