import LogHTML from '../../Log/index.html?raw';
import LogCss from '../../Log/Log.css?raw';
import LogCode from '../../Log/Log.ts?raw';
import LogUtils from '../../Log/utils.ts?raw';
import { getParameters } from './getParameters';
import { cleanupCode, makePckJson, tsconfig } from './utils';

export default getParameters({
  files: {
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
      content: LogHTML.replace('Log.ts', 'index.ts'),
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
  },
});
