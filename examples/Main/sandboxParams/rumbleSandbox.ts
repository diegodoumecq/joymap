import { getParameters } from 'codesandbox/lib/api/define';

import RumbleCode from '../../Rumble/Rumble.ts?raw';
import RumbleHTML from '../../Rumble/index.html?raw';
import { cleanupCode, tsconfig, makePckJson } from './utils';

export default getParameters({
  files: {
    'index.ts': {
      content: cleanupCode(RumbleCode),
      isBinary: false,
    },
    'index.html': {
      content: RumbleHTML.replace('Rumble.ts', 'index.ts'),
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

