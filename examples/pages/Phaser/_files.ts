import packageJson from '../../../package.json';
import { cleanupCode, makePckJson, tsconfig } from '../utils';
import BackgroundCode from './Background.ts?raw';
import PhaserHTML from './index.html?raw';
import PhaserCode from './index.ts?raw';
import MainSceneCode from './MainScene.ts?raw';
import MenuCode from './Menu.ts?raw';

export const phaserFiles = {
  'index.ts': cleanupCode(PhaserCode),
  'index.html': PhaserHTML,
  'MainScene.ts': cleanupCode(MainSceneCode),
  'Menu.ts': cleanupCode(MenuCode),
  'Background.ts': cleanupCode(BackgroundCode),
  'package.json': makePckJson({
    hasLodash: false,
    hasReact: false,
    dependencies: {
      phaser: packageJson.devDependencies.phaser,
    },
  }),
  'tsconfig.json': tsconfig,
};
