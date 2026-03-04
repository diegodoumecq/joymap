import { getParameters } from 'codesandbox/lib/api/define';
import FightingCode from '../../Fighting/Fighting.ts?raw';
import rotatingLogoCode from '../../rotatingLogo.ts?raw';
import FightingStyl from '../../Fighting/Fighting.styl?raw';
import FightingHTML from '../../../assets/fighting.html?raw';

import { cleanupCode, tsconfig, makePckJson, packageJson } from './utils';

export default getParameters({
  files: {
    'index.ts': {
      content: cleanupCode(FightingCode),
      isBinary: false,
    },
    'rotatingLogo.ts': {
      content: cleanupCode(rotatingLogoCode),
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
      content: makePckJson({
        isTs: true,
        hasLodash: true,
        hasReact: false,
        dependencies: {
          playcanvas: packageJson.devDependencies['playcanvas'],
        },
      }),
    },
    'tsconfig.json': tsconfig,
  },
});

