import { cleanupCode, devDependencies, makePckJson, tsconfig } from '../utils';
import ckHelpersCode from './ckHelpers.ts?raw';
import commandsCode from './commands.ts?raw';
import customCss from './custom.css?raw';
import EditorCode from './Editor.tsx?raw';
import EditorHTML from './index.html?raw';
import Index from './index.ts?raw';

export const editorFiles = {
  'Editor.tsx': {
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
  'index.ts': {
    content: cleanupCode(Index),
    isBinary: false,
  },
  'index.html': {
    content: EditorHTML,
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
};

