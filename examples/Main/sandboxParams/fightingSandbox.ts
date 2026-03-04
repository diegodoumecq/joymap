import FightingCss from '../../Fighting/Fighting.css?raw';
import FightingCode from '../../Fighting/Fighting.ts?raw';
import FightingHTML from '../../Fighting/index.html?raw';
import { getParameters } from './getParameters';
import { cleanupCode, makePckJson, tsconfig } from './utils';

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
