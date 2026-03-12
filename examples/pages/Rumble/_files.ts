import { cleanupCode, makePckJson, tsconfig } from '../utils';
import RumbleHTML from './index.html?raw';
import RumbleCode from './index.ts?raw';

export const rumbleFiles = {
  'index.ts': {
    content: cleanupCode(RumbleCode),
    isBinary: false,
  },
  'index.html': {
    content: RumbleHTML,
    isBinary: false,
  },
  'package.json': {
    isBinary: false,
    content: makePckJson({
      hasLodash: false,
      hasReact: false,
    }),
  },
  'tsconfig.json': tsconfig,
};
