import { createJoymap } from 'joymap';
import Phaser from 'phaser';

import { MainScene } from './MainScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'app',
  backgroundColor: '#1a0032',
  scene: [MainScene],
  physics: {
    default: 'matter',
    matter: {
      gravity: { x: 0, y: 1 },
      debug: false,
    },
  },
};

document.fonts.ready.then(() => {
  const game = new Phaser.Game(config);

  const joymap = createJoymap();

  game.scene.start('MainScene', { joymap });

  joymap.start();
});
