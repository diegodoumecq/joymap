import { getParameters } from 'codesandbox/lib/api/define';
// @ts-ignore
import LogCode from '!raw-loader!../../Log/Log.ts';
// @ts-ignore
import LogUtils from '!raw-loader!../../Log/utils.ts';
import rotatingLogoCode from '!raw-loader!../../rotatingLogo.js';
import LogStyl from '!raw-loader!../../Log/Log.styl';
import LogHTML from '!raw-loader!../../../assets/log.html';

import { cleanupCode, tsconfig, makePckJson, packageJson } from './utils';

export default getParameters({
  files: {
    'index.ts': {
      content: cleanupCode(LogCode),
      isBinary: false,
    },
    'rotatingLogo.js': {
      // @ts-ignore
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
        }
      }),
    },
    'tsconfig.json': tsconfig,
  },
});
