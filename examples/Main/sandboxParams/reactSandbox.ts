import { getParameters } from 'codesandbox/lib/api/define';
import ReactCode from '../../React/React.tsx?raw';
import GamepadCode from '../../React/Gamepad.tsx?raw';
import StylesCode from '../../React/styles.ts?raw';
import ReactHTML from '../../../assets/react.html?raw';

import { cleanupCode, tsconfig, makePckJson, packageJson } from './utils';

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
      content: makePckJson({
        isTs: true,
        hasLodash: false,
        hasReact: true,
        dependencies: {
          'color-hash': packageJson.devDependencies['color-hash'],
          'styled-components': packageJson.devDependencies['styled-components'],
          tinycolor2: packageJson.devDependencies.tinycolor2,
        },
        devDependencies: {
          '@types/color-hash': packageJson.devDependencies['@types/color-hash'],
          '@types/styled-components': packageJson.devDependencies['@types/styled-components'],
          '@types/tinycolor2': packageJson.devDependencies['@types/tinycolor2'],
        },
      }),
    },
    'tsconfig.json': tsconfig,
  },
});

