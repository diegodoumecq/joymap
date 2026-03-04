import { getParameters } from 'codesandbox/lib/api/define';
import LogCode from '../../Log/Log.ts?raw';
import LogUtils from '../../Log/utils.ts?raw';
import rotatingLogoCode from '../../rotatingLogo.ts?raw';
import LogStyl from '../../Log/Log.styl?raw';
import LogHTML from '../../../assets/log.html?raw';

import { cleanupCode, tsconfig, makePckJson, packageJson } from './utils';

export default getParameters({
  files: {
    'index.ts': {
      content: cleanupCode(LogCode),
      isBinary: false,
    },
    'rotatingLogo.ts': {
      content: cleanupCode(rotatingLogoCode),
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

