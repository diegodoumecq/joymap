import { cleanupCode, makePckJson, tsconfig } from '../utils';
import LogHTML from './index.html?raw';
import LogCode from './index.ts?raw';
import LogCss from './Log.css?raw';
import LogUtils from './utils.ts?raw';

export const logFiles = {
  'index.ts': cleanupCode(LogCode),
  'utils.ts': cleanupCode(LogUtils),
  'Log.css': LogCss,
  'index.html': LogHTML,
  'package.json': makePckJson({
    hasLodash: true,
    hasReact: false,
  }),
  'tsconfig.json': tsconfig,
};
