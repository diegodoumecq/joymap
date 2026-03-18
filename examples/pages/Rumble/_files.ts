import { cleanupCode, makePckJson, tsconfig } from '../utils';
import RumbleHTML from './index.html?raw';
import RumbleCode from './index.ts?raw';

export const rumbleFiles = {
  'index.ts': cleanupCode(RumbleCode),
  'index.html': RumbleHTML,
  'package.json': makePckJson({
    hasLodash: false,
    hasReact: false,
  }),
  'tsconfig.json': tsconfig,
};
