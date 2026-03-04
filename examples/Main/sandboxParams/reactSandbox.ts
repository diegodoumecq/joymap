import { getParameters } from 'codesandbox/lib/api/define';
import ReactCode from '../../React/React.tsx?raw';
import GamepadCode from '../../React/Gamepad.tsx?raw';
import ReactHTML from '../../React/index.html?raw';

import { cleanupCode, tsconfig, makePckJson, packageJson } from './utils';

export default getParameters({
  files: {
    'React.tsx': {
      content: cleanupCode(ReactCode),
      isBinary: false,
    },
    'Gamepad.tsx': {
      content: cleanupCode(GamepadCode),
      isBinary: false,
    },
    'index.html': {
      content: ReactHTML.replace('react.bundle.js', 'index.tsx'),
      isBinary: false,
    },
    'package.json': {
      isBinary: false,
      content: makePckJson({
        hasLodash: false,
        hasReact: true,
        dependencies: {
          'color-hash': packageJson.devDependencies['color-hash'],
          tinycolor2: packageJson.devDependencies.tinycolor2,
        },
        devDependencies: {
          '@types/color-hash': packageJson.devDependencies['@types/color-hash'],
          '@types/tinycolor2': packageJson.devDependencies['@types/tinycolor2'],
        },
      }),
    },
    'tsconfig.json': tsconfig,
  },
});
