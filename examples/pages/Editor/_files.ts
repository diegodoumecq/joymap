import { cleanupCode, devDependencies, makePckJson, tsconfig, viteconfig } from '../utils';
import ckHelpersCode from './ckHelpers.ts?raw';
import commandsCode from './commands.ts?raw';
import customCss from './custom.css?raw';
import EditorCode from './Editor.tsx?raw';
import EditorHTML from './index.html?raw';
import Index from './index.ts?raw';

export const editorFiles = {
  'Editor.tsx': cleanupCode(EditorCode),
  'commands.ts': cleanupCode(commandsCode),
  'custom.css': cleanupCode(customCss),
  'index.ts': cleanupCode(Index),
  'index.html': EditorHTML,
  'ckHelpers.ts': cleanupCode(ckHelpersCode),
  'package.json': makePckJson({
    hasLodash: false,
    hasReact: true,
    dependencies: {
      '@ckeditor/ckeditor5-react': devDependencies['@ckeditor/ckeditor5-react'],
      ckeditor5: devDependencies['ckeditor5'],
      'lorem-ipsum': devDependencies['lorem-ipsum'],
    },
  }),
  'tsconfig.json': tsconfig,
  'vite.config.ts': viteconfig,
};
