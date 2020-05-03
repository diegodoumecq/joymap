import { getParameters } from 'codesandbox/lib/api/define';
import EditorCode from '!raw-loader!../../Editor/Editor.jsx';
import commandsCode from '!raw-loader!../../Editor/commands.js';
import ckHelpersCode from '!raw-loader!../../Editor/ckHelpers.js';
import EditorHTML from '!raw-loader!../../../assets/react.html';

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
          '@ckeditor/ckeditor5-build-classic':
            packageJson.devDependencies['@ckeditor/ckeditor5-build-classic'],
          'lorem-ipsum': packageJson.devDependencies['lorem-ipsum'],
        },
      }),
    },
    'tsconfig.json': tsconfig,
  },
});
