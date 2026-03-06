import RumbleHTML from '../../Rumble/index.html?raw';
import RumbleCode from '../../Rumble/Rumble.ts?raw';
import { getParameters } from './getParameters';
import { cleanupCode, makePckJson, tsconfig } from './utils';

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

