import { cleanupCode, makePckJson, tsconfig } from '../utils';
import LogHTML from './index.html?raw';
import LogCode from './index.ts?raw';
import LogCss from './Log.css?raw';
import LogUtils from './utils.ts?raw';

export const logFiles = {
  'index.ts': {
    content: cleanupCode(LogCode),
    isBinary: false,
  },
  'utils.ts': {
    content: cleanupCode(LogUtils),
    isBinary: false,
  },
  'Log.css': {
    content: LogCss,
    isBinary: false,
  },
  'index.html': {
    content: LogHTML,
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
