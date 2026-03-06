import GamepadCode from '../../React/Gamepad.tsx?raw';
import ReactHTML from '../../React/index.html?raw';
import ReactCode from '../../React/React.tsx?raw';
import { getParameters } from './getParameters';
import { cleanupCode, devDependencies, makePckJson, tsconfig } from './utils';

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
          'color-hash': devDependencies['color-hash'],
          tinycolor2: devDependencies.tinycolor2,
        },
        devDependencies: {
          '@types/color-hash': devDependencies['@types/color-hash'],
          '@types/tinycolor2': devDependencies['@types/tinycolor2'],
        },
      }),
    },
    'tsconfig.json': tsconfig,
  },
});
