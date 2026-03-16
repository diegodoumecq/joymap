import { createJoymap, createQueryModule, QueryModule } from 'joymap';
import Phaser from 'phaser';

const menuItems = ['New Game', 'Options', 'Beans', 'Quit'];
let selectedIndex = 0;
let gamepadModule: QueryModule | null = null;

class MenuScene extends Phaser.Scene {
  private textObjects: Phaser.GameObjects.Text[] = [];
  private statusText!: Phaser.GameObjects.Text;
  instructionsText!: Phaser.GameObjects.Text;
  private gridLines: { sprite: Phaser.GameObjects.TileSprite; speed: number }[] = [];
  private gradientOverlay!: Phaser.GameObjects.Graphics;
  private echoes: { text: Phaser.GameObjects.Text; offset: number }[] = [];
  private cans: Phaser.GameObjects.Text[] = [];
  private currentTween: Phaser.Tweens.Tween | null = null;

  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    // Background
    this.cameras.main.setBackgroundColor('#000000');

    const depths = [0.2, 0.3, 0.4, 0.5];
    depths.forEach((speed) => {
      const key = 'grid-' + speed;
      const size = Math.floor(80 + speed * 40);

      const graphics = this.make.graphics();
      graphics.lineStyle(10 * speed, 0xa78bfa, Math.min(0.8, speed * 2));

      graphics.lineBetween(0, 0, size, size);

      graphics.generateTexture(key, size, size);
      graphics.destroy();

      const sprite = this.add.tileSprite(400, 300, 800, 600, key);
      sprite.tileScaleX = 1;
      sprite.tileScaleY = 1;
      this.gridLines.push({ sprite, speed: speed * 0.5 });
    });

    this.gradientOverlay = this.add.graphics();
    const gradientSteps = 20;
    for (let i = 0; i < gradientSteps; i++) {
      const t = i / gradientSteps;
      const r = Math.floor(Phaser.Math.Interpolation.Linear([26, 0], t));
      const g = Math.floor(Phaser.Math.Interpolation.Linear([0, 0], t));
      const b = Math.floor(Phaser.Math.Interpolation.Linear([50, 0], t));
      const color = (r << 16) | (g << 8) | b;

      this.gradientOverlay.fillStyle(color, 0.9);
      this.gradientOverlay.fillRect(0, (i / gradientSteps) * 600, 800, 600 / gradientSteps + 1);
    }

    // Text
    this.add
      .text(400, 100, 'PHASER MENU', {
        fontSize: '72px',
        fontFamily: 'Audiowide',
        fontStyle: 'normal',
        color: '#ffffffdd',
      })
      .setOrigin(0.5);

    this.statusText = this.add
      .text(400, 550, 'Connect a gamepad, mouse or use arrow keys to navigate', {
        fontSize: '18px',
        fontFamily: 'Audiowide',
        fontStyle: 'normal',
        padding: { x: 8, y: 4 },
        color: '#888888',
      })
      .setOrigin(0.5);

    menuItems.forEach((item, index) => {
      const text = this.add
        .text(400, 250 + index * 60, item, {
          fontSize: '32px',
          fontFamily: 'Audiowide',
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

    const floor = this.add.rectangle(400, 610, 800, 20, 0x000000);
    this.matter.add.gameObject(floor, { isStatic: true, restitution: 0.5 });

    const leftWall = this.add.rectangle(-10, 300, 20, 600, 0x000000);
    this.matter.add.gameObject(leftWall, { isStatic: true, restitution: 0.5 });

    const rightWall = this.add.rectangle(810, 300, 20, 600, 0x000000);
    this.matter.add.gameObject(rightWall, { isStatic: true, restitution: 0.5 });

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
    this.gridLines.forEach(({ sprite, speed }) => {
      sprite.tilePositionY += speed;
    });

    this.updateEchoes();

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
    if (this.currentTween) {
      this.currentTween.stop();
    }

    this.textObjects.forEach((text, index) => {
      text.setColor(index === selectedIndex ? '#5700fa' : '#a78bfa');
    });

    this.echoes.forEach((e) => e.text.destroy());
    this.echoes = [];

    this.textObjects.forEach((text, index) => {
      if (index === selectedIndex) {
        this.currentTween = this.tweens.add({
          targets: text,
          scale: 1.1,
          duration: 400,
          ease: 'Back.easeOut',
        });
        this.spawnEcho(text.text);

        if (index === 2) {
          this.spawnCans();
        }
      } else {
        this.tweens.add({
          targets: text,
          scale: 1,
          from: 1.1,
          duration: 150,
          ease: 'Back.easeOut',
        });
      }
    });
  }

  private spawnEcho(text: string) {
    const x = 400;
    const y = 250 + selectedIndex * 60;

    for (let i = 0; i < 5; i++) {
      const echo = this.add
        .text(x, y, text, {
          fontSize: '32px',
          fontFamily: 'Audiowide',
          fontStyle: 'normal',
          color: '#FFF',
        })
        .setOrigin(0.5)
        .setDepth(-1);

      this.echoes.push({ text: echo, offset: i * 10 });
    }
  }

  private updateEchoes() {
    this.echoes.forEach((echo) => {
      echo.offset += 1;

      const alpha = Math.max(0, 1 - echo.offset * 0.025);
      const scaleOffset = echo.offset * 0.02;

      echo.text.setAlpha(alpha);
      echo.text.setScale(1.2 + scaleOffset);

      if (alpha <= 0) {
        echo.offset = 0;
      }
    });
  }

  private spawnCans() {
    const x = Phaser.Math.Between(350, 450);
    const y = 380;

    const can = this.add.text(x, y, '🥫', { fontSize: '48px' }).setOrigin(0.5, 0.5);
    can.setDepth(10);

    this.matter.add.gameObject(can, {
      shape: { type: 'rectangle', width: 24, height: 32 },
      restitution: 0.5,
      friction: 0.1,
      force: { x: Phaser.Math.FloatBetween(-0.02, 0.02), y: -0.04 },
      torque: Phaser.Math.FloatBetween(-1, 1),
    });

    can.setRotation(Phaser.Math.FloatBetween(0, Math.PI * 2));

    this.cans.push(can);
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
    default: 'matter',
    matter: {
      gravity: { x: 0, y: 1 },
      debug: false,
    },
  },
};

new Phaser.Game(config);

const joymap = createJoymap({
  onPoll() {
    const unusedIds = joymap.getUnusedPadIds();

    if (unusedIds.length > 0 && !gamepadModule) {
      gamepadModule = createQueryModule({ padId: unusedIds[0] });
      joymap.addModule(gamepadModule);
    }

    if (gamepadModule && !gamepadModule.isConnected()) {
      gamepadModule = null;
    }
  },
});

joymap.start();
