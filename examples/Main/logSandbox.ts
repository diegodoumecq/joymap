import { getParameters } from 'codesandbox/lib/api/define';

import LogCode from '!raw-loader!../Log/Log.ts';
import LogUtils from '!raw-loader!../Log/utils.ts';
import LogStyl from '!raw-loader!../Log/Log.styl';
import LogHTML from '!raw-loader!../../assets/log.html';

import { cleanupCode, tsconfig } from './utils';

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
    'Log.styl': {
      content: LogStyl,
      isBinary: false,
    },
    'index.html': {
      content: LogHTML.replace('log.bundle.js', 'index.ts'),
      isBinary: false,
    },
    'package.json': {
      isBinary: false,
      content: JSON.stringify({
        dependencies: {
          joymap: 'latest',
          lodash: '^4.17.15',
        },
        devDependencies: {
          '@types/lodash': '^4.14.149',
          'parcel-bundler': '^1.6.1',
        },
      }),
    },
    'tsconfig.json': tsconfig,
  },
});
