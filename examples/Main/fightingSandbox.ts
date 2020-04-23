import { getParameters } from 'codesandbox/lib/api/define';

import FightingCode from '!raw-loader!../Fighting/Fighting.ts';
import FightingStyl from '!raw-loader!../Fighting/Fighting.styl';
import FightingHTML from '!raw-loader!../../assets/fighting.html';

import { cleanupCode, tsconfig } from './utils';

export default getParameters({
  files: {
    'index.ts': {
      content: cleanupCode(FightingCode),
      isBinary: false,
    },
    'Fighting.styl': {
      content: FightingStyl,
      isBinary: false,
    },
    'index.html': {
      content: FightingHTML.replace('fighting.bundle.js', 'index.ts'),
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
