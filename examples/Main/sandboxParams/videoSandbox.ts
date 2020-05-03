import { getParameters } from 'codesandbox/lib/api/define';

import VideoCode from '!raw-loader!../../Video/Video.ts';
import VideoHTML from '!raw-loader!../../../assets/video.html';
import { cleanupCode, tsconfig, makePckJson } from './utils';

export default getParameters({
  files: {
    'index.ts': {
      content: cleanupCode(VideoCode),
      isBinary: false,
    },
    'index.html': {
      content: VideoHTML.replace('video.bundle.js', 'index.ts'),
      isBinary: false,
    },
    'sandbox.config.json': {
      isBinary: false,
      content: JSON.stringify({
        infiniteLoopProtection: false,
      }),
    },
    'package.json': {
      isBinary: false,
      content: makePckJson({
        isTs: true,
        hasLodash: false,
        hasReact: false,
        dependencies: {
          'regenerator-runtime': '^0.13.5',
          rxjs: '^6.5.5',
        },
      }),
    },
    'tsconfig.json': tsconfig,
  },
});
