import { getParameters } from 'codesandbox/lib/api/define';

import ReactCode from '!raw-loader!../React/React.tsx';
import GamepadCode from '!raw-loader!../React/Gamepad.tsx';
import StylesCode from '!raw-loader!../React/styles.ts';
import ReactHTML from '!raw-loader!../../assets/react.html';

import { cleanupCode, tsconfig } from './utils';

export default getParameters({
  files: {
    'index.tsx': {
      content: cleanupCode(ReactCode),
      isBinary: false,
    },
    'Gamepad.tsx': {
      content: cleanupCode(GamepadCode),
      isBinary: false,
    },
    'styles.ts': {
      content: cleanupCode(StylesCode),
      isBinary: false,
    },
    'index.html': {
      content: ReactHTML.replace('react.bundle.js', 'index.tsx'),
      isBinary: false,
    },
    'package.json': {
      isBinary: false,
      content: JSON.stringify({
        dependencies: {
          'color-hash': '^1.0.3',
          joymap: 'latest',
          lodash: '^4.17.15',
          react: '^16.13.1',
          'react-dom': '^16.13.1',
          'styled-components': '^5.0.1',
          tinycolor2: '^1.4.1',
          tslib: 'latest',
        },
        devDependencies: {
          '@types/color-hash': '^1.0.0',
          '@types/lodash': '^4.14.149',
          '@types/react': '^16.9.32',
          '@types/react-dom': '^16.9.6',
          '@types/styled-components': '^5.0.1',
          '@types/tinycolor2': '^1.4.2',
          'parcel-bundler': '^1.6.1',
        },
      }),
    },
    'tsconfig.json': tsconfig,
  },
});
