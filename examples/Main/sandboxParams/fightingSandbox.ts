import { getParameters } from 'codesandbox/lib/api/define';
import FightingCode from '../../Fighting/Fighting.ts?raw';
import FightingCss from '../../Fighting/Fighting.css?raw';
import FightingHTML from '../../Fighting/index.html?raw';

import { cleanupCode, tsconfig, makePckJson } from './utils';

export default getParameters({
  files: {
    'index.ts': {
      content: cleanupCode(FightingCode),
      isBinary: false,
    },
    'Fighting.css': {
      content: FightingCss,
      isBinary: false,
    },
    'index.html': {
      content: FightingHTML.replace('Fighting.ts', 'index.ts'),
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

