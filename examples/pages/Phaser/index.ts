import { createJoymap, createQueryModule, QueryModule } from 'joymap';
import Phaser from 'phaser';

const menuItems = ['Start Game', 'Options', 'Quit'];
let selectedIndex = 0;
let gamepadModule: QueryModule | null = null;
let gameInstance: Phaser.Game | null = null;

class MenuScene extends Phaser.Scene {
  private textObjects: Phaser.GameObjects.Text[] = [];
  private statusText!: Phaser.GameObjects.Text;
  instructionsText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    this.add
      .text(400, 100, 'PHASER MENU', {
        fontSize: '48px',
        fontFamily: 'Bangers',
        fontStyle: 'normal',
        padding: { x: 16, y: 8 },
        color: '#a78bfa',
      })
      .setOrigin(0.5);

    this.instructionsText = this.add
      .text(400, 550, 'Connect a gamepad or use arrow keys to navigate', {
        fontSize: '18px',
        fontFamily: 'Bangers',
        fontStyle: 'normal',
        padding: { x: 8, y: 4 },
        color: '#888888',
      })
      .setOrigin(0.5);

    this.statusText = this.add
      .text(400, 500, '', {
        fontSize: '24px',
        fontFamily: 'Bangers',
        fontStyle: 'normal',
        padding: { x: 8, y: 4 },
        color: '#a78bfa',
      })
      .setOrigin(0.5);

    menuItems.forEach((item, index) => {
      const text = this.add
        .text(400, 250 + index * 60, item, {
          fontSize: '32px',
          fontFamily: 'Bangers',
          fontStyle: 'normal',
          padding: { x: 12, y: 4 },
          color: index === selectedIndex ? '#5700fa' : '#a78bfa',
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerover', function () {
          text.setColor('#8000fa');
        })
        .on('pointerout', function () {
          text.setColor(index === selectedIndex ? '#5700fa' : '#a78bfa');
        })
        .on('pointerdown', () => {
          selectedIndex = index;
          this.updateSelection();
          const selected = menuItems[selectedIndex];
          this.statusText.setText(`Selected: ${selected}!`);
        });

      this.textObjects.push(text);
    });

    this.updateSelection();

    this.input.keyboard?.on('keydown-UP', () => {
      selectedIndex = (selectedIndex - 1 + menuItems.length) % menuItems.length;
      this.updateSelection();
    });

    this.input.keyboard?.on('keydown-DOWN', () => {
      selectedIndex = (selectedIndex + 1) % menuItems.length;
      this.updateSelection();
    });

    this.input.keyboard?.on('keydown-ENTER', () => {
      const selected = menuItems[selectedIndex];
      this.statusText.setText(`Selected: ${selected}!`);
    });
  }

  update() {
    if (!gamepadModule || !gamepadModule.isConnected()) {
      return;
    }

    const up = gamepadModule.getButton('dpadUp');
    const down = gamepadModule.getButton('dpadDown');
    const a = gamepadModule.getButton('A');
    const leftStick = gamepadModule.getStick('L');

    if (
      (up.justChanged && up.pressed) ||
      (leftStick.justChanged && leftStick.pressed && leftStick.value[1] < -0.5)
    ) {
      selectedIndex = (selectedIndex - 1 + menuItems.length) % menuItems.length;
      this.updateSelection();
    }

    if (
      (down.justChanged && down.pressed) ||
      (leftStick.justChanged && leftStick.pressed && leftStick.value[1] > 0.5)
    ) {
      selectedIndex = (selectedIndex + 1) % menuItems.length;
      this.updateSelection();
    }

    if (a.justChanged && a.pressed) {
      const selected = menuItems[selectedIndex];
      this.statusText.setText(`Selected: ${selected}!`);
    }
  }

  private updateSelection() {
    this.textObjects.forEach((text, index) => {
      text.setColor(index === selectedIndex ? '#5700fa' : '#a78bfa');
      text.setScale(index === selectedIndex ? 1.2 : 1);
    });
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'app',
  backgroundColor: '#1a0032',
  scene: [MenuScene],
  physics: {
    default: 'arcade',
  },
};

gameInstance = new Phaser.Game(config);

const joymap = createJoymap({
  onPoll() {
    const unusedIds = joymap.getUnusedPadIds();

    if (unusedIds.length > 0 && !gamepadModule) {
      gamepadModule = createQueryModule({ padId: unusedIds[0] });
      joymap.addModule(gamepadModule);

      const scene = gameInstance?.scene.getScene('MenuScene') as MenuScene;
      if (scene && scene.instructionsText) {
        scene.instructionsText.setText(
          'Use D-pad/Stick or Arrow keys to navigate, A/Enter to select',
        );
      }
    }

    if (gamepadModule && !gamepadModule.isConnected()) {
      gamepadModule = null;

      const scene = gameInstance?.scene.getScene('MenuScene') as MenuScene;
      if (scene && scene.instructionsText) {
        scene.instructionsText.setText('Connect a gamepad or use arrow keys to navigate');
      }
    }
  },
});

joymap.start();
