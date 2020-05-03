import { getParameters } from 'codesandbox/lib/api/define';
import ReactCode from '!raw-loader!../../React/React.tsx';
import GamepadCode from '!raw-loader!../../React/Gamepad.tsx';
import StylesCode from '!raw-loader!../../React/styles.ts';
import ReactHTML from '!raw-loader!../../../assets/react.html';

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
        hasLodash: true,
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
