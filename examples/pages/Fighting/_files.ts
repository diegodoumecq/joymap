import { cleanupCode, makePckJson, tsconfig } from '../utils';
import FightingCss from './Fighting.css?raw';
import FightingHTML from './index.html?raw';
import FightingCode from './index.ts?raw';

export const fightingFiles = {
  'index.ts': {
    content: cleanupCode(FightingCode),
    isBinary: false,
  },
  'Fighting.css': {
    content: FightingCss,
    isBinary: false,
  },
  'index.html': {
    content: FightingHTML,
    isBinary: false,
  },
  'package.json': {
    isBinary: false,
    content: makePckJson({
      hasLodash: true,
      hasReact: false,
    }),
  },
  'tsconfig.json': tsconfig,
};
