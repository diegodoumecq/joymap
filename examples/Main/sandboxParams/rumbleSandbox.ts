import { getParameters } from 'codesandbox/lib/api/define';

import RumbleCode from '!raw-loader!../../Rumble/Rumble.ts';
import RumbleHTML from '!raw-loader!../../../assets/rumble.html';
import { cleanupCode, tsconfig, makePckJson } from './utils';

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
      content: makePckJson({
        isTs: true,
        hasLodash: true,
        hasReact: false,
      }),
    },
    'tsconfig.json': tsconfig,
  },
});
