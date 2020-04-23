import { getParameters } from 'codesandbox/lib/api/define';

import RumbleCode from '!raw-loader!../Rumble/Rumble.ts';
import RumbleHTML from '!raw-loader!../../assets/rumble.html';
import { cleanupCode, tsconfig } from './utils';

export default getParameters({
  files: {
    'index.ts': {
      content: cleanupCode(RumbleCode),
      isBinary: false,
    },
    'index.html': {
      content: RumbleHTML.replace('rumble.bundle.js', 'index.ts'),
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
