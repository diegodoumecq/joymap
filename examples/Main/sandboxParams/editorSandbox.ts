import ckHelpersCode from '../../Editor/ckHelpers.ts?raw';
import commandsCode from '../../Editor/commands.ts?raw';
import customCss from '../../Editor/custom.css?raw';
import EditorCode from '../../Editor/Editor.tsx?raw';
import { getParameters } from './getParameters';
import { cleanupCode, devDependencies, makePckJson, tsconfig } from './utils';

export default getParameters({
  files: {
    'index.tsx': {
      content: cleanupCode(EditorCode),
      isBinary: false,
    },
    'commands.ts': {
      content: cleanupCode(commandsCode),
      isBinary: false,
    },
    'custom.css': {
      content: cleanupCode(customCss),
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
          '@ckeditor/ckeditor5-react': devDependencies['@ckeditor/ckeditor5-react'],
          ckeditor5: devDependencies['ckeditor5'],
          'lorem-ipsum': devDependencies['lorem-ipsum'],
        },
      }),
    },
    'tsconfig.json': tsconfig,
  },
});
