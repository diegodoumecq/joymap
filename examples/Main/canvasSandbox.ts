import { getParameters } from 'codesandbox/lib/api/define';

import CanvasCode from '!raw-loader!../Canvas/Canvas.ts';
import CanvasHTML from '!raw-loader!../../assets/canvas.html';
import { cleanupCode, tsconfig } from './utils';

export default getParameters({
  files: {
    'index.ts': {
      content: cleanupCode(CanvasCode),
      isBinary: false,
    },
    'index.html': {
      content: CanvasHTML.replace('canvas.bundle.js', 'index.ts'),
      isBinary: false,
    },
    'package.json': {
      isBinary: false,
      content: JSON.stringify({
        dependencies: {
          joymap: 'latest',
        },
        devDependencies: {
          'parcel-bundler': '^1.6.1',
        },
      }),
    },
    'tsconfig.json': tsconfig,
  },
});
