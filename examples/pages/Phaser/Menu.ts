import { QueryModule } from 'joymap';
import Phaser from 'phaser';

export const menuItems = ['New Game', 'Options', 'Beans', 'Quit'];

export class Menu {
  private textObjects: Phaser.GameObjects.Text[] = [];
  private statusText!: Phaser.GameObjects.Text;
  private echoes: { text: Phaser.GameObjects.Text; offset: number }[] = [];
  private currentTween: Phaser.Tweens.Tween | null = null;
  private onBeansSelected: (() => void) | null = null;
  public selectedIndex = 0;

  create(scene: Phaser.Scene, onBeansSelected: () => void) {
    this.onBeansSelected = onBeansSelected;

    scene.add
      .text(400, 100, 'PHASER MENU', {
        fontSize: '72px',
        fontFamily: 'Audiowide',
        fontStyle: 'normal',
        color: '#ffffffdd',
      })
      .setOrigin(0.5);

    this.statusText = scene.add
      .text(400, 550, 'Connect a gamepad, mouse or use arrow keys to navigate', {
        fontSize: '18px',
        fontFamily: 'Audiowide',
        fontStyle: 'normal',
        padding: { x: 8, y: 4 },
        color: '#888888',
      })
      .setOrigin(0.5);

    menuItems.forEach((item, index) => {
      const text = scene.add
        .text(400, 250 + index * 60, item, {
          fontSize: '32px',
          fontFamily: 'Audiowide',
          fontStyle: 'normal',
          padding: { x: 12, y: 4 },
          color: index === this.selectedIndex ? '#5700fa' : '#a78bfa',
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
          text.setColor('#8000fa');
        })
        .on('pointerout', () => {
          text.setColor(index === this.selectedIndex ? '#5700fa' : '#a78bfa');
        })
        .on('pointerdown', () => {
          this.selectedIndex = index;
          this.updateSelection(scene);
          this.confirmSelection();
        });

      this.textObjects.push(text);
    });

    this.updateSelection(scene);

    scene.input.keyboard?.on('keydown-UP', () => {
      this.selectedIndex = (this.selectedIndex - 1 + menuItems.length) % menuItems.length;
      this.updateSelection(scene);
    });

    scene.input.keyboard?.on('keydown-DOWN', () => {
      this.selectedIndex = (this.selectedIndex + 1) % menuItems.length;
      this.updateSelection(scene);
    });

    scene.input.keyboard?.on('keydown-ENTER', () => {
      this.confirmSelection();
    });
  }

  update(scene: Phaser.Scene, gamepadModule: QueryModule | null) {
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

    if (gamepadModule) {
      const up = gamepadModule.getButton('dpadUp');
      const down = gamepadModule.getButton('dpadDown');
      const a = gamepadModule.getButton('A');
      const leftStick = gamepadModule.getStick('L');

      if (
        (up.justChanged && up.pressed) ||
        (leftStick.justChanged && leftStick.pressed && leftStick.value[1] < -0.5)
      ) {
        this.selectedIndex = (this.selectedIndex - 1 + menuItems.length) % menuItems.length;
        this.updateSelection(scene);
      }

      if (
        (down.justChanged && down.pressed) ||
        (leftStick.justChanged && leftStick.pressed && leftStick.value[1] > 0.5)
      ) {
        this.selectedIndex = (this.selectedIndex + 1) % menuItems.length;
        this.updateSelection(scene);
      }

      if (a.justChanged && a.pressed) {
        this.confirmSelection();
      }
    }
  }

  private confirmSelection() {
    const selected = menuItems[this.selectedIndex];
    this.statusText.setText(`Selected: ${selected}!`);

    if (this.selectedIndex === 2) {
      this.onBeansSelected?.();
    }
  }

  private updateSelection(scene: Phaser.Scene) {
    if (this.currentTween) {
      this.currentTween.stop();
    }

    this.echoes.forEach((e) => e.text.destroy());
    this.echoes = [];

    this.textObjects.forEach((text, index) => {
      if (index === this.selectedIndex) {
        text.setColor('#5700fa');
        this.currentTween = scene.tweens.add({
          targets: text,
          scale: 1.1,
          duration: 400,
          ease: 'Back.easeOut',
        });
        this.spawnEcho(scene);
      } else {
        text.setColor('#a78bfa');
        scene.tweens.add({
          targets: text,
          scale: 1,
          from: 1.1,
          duration: 150,
          ease: 'Back.easeOut',
        });
      }
    });
  }

  private spawnEcho(scene: Phaser.Scene) {
    const x = 400;
    const y = 250 + this.selectedIndex * 60;

    for (let i = 0; i < 5; i++) {
      const echo = scene.add
        .text(x, y, menuItems[this.selectedIndex], {
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
}
