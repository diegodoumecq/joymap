import { cleanupCode, makePckJson, tsconfig } from '../utils';
import NavigationHTML from './index.html?raw';
import NavigationCode from './index.ts?raw';

export const navigationFiles = {
  'index.ts': cleanupCode(NavigationCode),
  'index.html': NavigationHTML,
  'package.json': makePckJson({
    hasLodash: false,
    hasReact: false,
  }),
  'tsconfig.json': tsconfig,
};
