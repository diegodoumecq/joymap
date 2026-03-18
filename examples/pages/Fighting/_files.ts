import { cleanupCode, makePckJson, tsconfig } from '../utils';
import FightingCss from './Fighting.css?raw';
import FightingHTML from './index.html?raw';
import FightingCode from './index.ts?raw';

export const fightingFiles = {
  'index.ts': cleanupCode(FightingCode),
  'Fighting.css': FightingCss,
  'index.html': FightingHTML,
  'package.json': makePckJson({
    hasLodash: true,
    hasReact: false,
  }),
  'tsconfig.json': tsconfig,
};
