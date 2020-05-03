import { getParameters } from 'codesandbox/lib/api/define';
import FightingCode from '!raw-loader!../../Fighting/Fighting.ts';
import rotatingLogoCode from '!raw-loader!../../rotatingLogo.js';
import FightingStyl from '!raw-loader!../../Fighting/Fighting.styl';
import FightingHTML from '!raw-loader!../../../assets/fighting.html';

import { cleanupCode, tsconfig, makePckJson, packageJson } from './utils';

export default getParameters({
  files: {
    'index.ts': {
      content: cleanupCode(FightingCode),
      isBinary: false,
    },
    'rotatingLogo.js': {
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
