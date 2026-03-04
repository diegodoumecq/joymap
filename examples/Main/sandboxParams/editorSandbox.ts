import { getParameters } from 'codesandbox/lib/api/define';
import EditorCode from '../../Editor/Editor.jsx?raw';
import commandsCode from '../../Editor/commands.js?raw';
import ckHelpersCode from '../../Editor/ckHelpers.js?raw';
import EditorHTML from '../../../assets/react.html?raw';

import { cleanupCode, tsconfig, makePckJson, packageJson } from './utils';

export default getParameters({
  files: {
    'index.js': {
      content: cleanupCode(EditorCode),
      isBinary: false,
    },
    'commands.js': {
      content: cleanupCode(commandsCode),
      isBinary: false,
    },
    'ckHelpers.js': {
      content: cleanupCode(ckHelpersCode),
      isBinary: false,
    },
    'index.html': {
      content: EditorHTML.replace('react.bundle.js', 'index.js'),
      isBinary: false,
    },
    'package.json': {
      isBinary: false,
      content: makePckJson({
        isTs: false,
        hasLodash: false,
        hasReact: true,
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

