import { getParameters } from 'codesandbox/lib/api/define';
import EditorCode from '../../Editor/Editor.tsx?raw';
import commandsCode from '../../Editor/commands.ts?raw';
import ckHelpersCode from '../../Editor/ckHelpers.ts?raw';

import { cleanupCode, tsconfig, makePckJson, packageJson } from './utils';

export default getParameters({
  files: {
    'index.ts': {
      content: cleanupCode(EditorCode),
      isBinary: false,
    },
    'commands.ts': {
      content: cleanupCode(commandsCode),
      isBinary: false,
    },
    'ckHelpers.ts': {
      content: cleanupCode(ckHelpersCode),
      isBinary: false,
    },
    'package.json': {
      isBinary: false,
      content: makePckJson({
        hasLodash: false,
        hasReact: true,
        reactScripts: true,
        dependencies: {
          '@ckeditor/ckeditor5-react': packageJson.devDependencies['@ckeditor/ckeditor5-react'],
          ckeditor5: packageJson.devDependencies['ckeditor5'],
          'lorem-ipsum': packageJson.devDependencies['lorem-ipsum'],
        },
      }),
    },
    'tsconfig.json': tsconfig,
  },
});

