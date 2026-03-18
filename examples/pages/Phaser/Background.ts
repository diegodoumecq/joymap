import Phaser from 'phaser';

export class Background {
  private gridLines: { sprite: Phaser.GameObjects.TileSprite; speed: number }[] = [];
  private gradientOverlay!: Phaser.GameObjects.Graphics;

  create(scene: Phaser.Scene) {
    scene.cameras.main.setBackgroundColor('#000000');

    const depths = [0.2, 0.3, 0.4, 0.5];
    depths.forEach((speed) => {
      const key = 'grid-' + speed;
      const size = Math.floor(80 + speed * 40);

      const graphics = scene.make.graphics();
      graphics.lineStyle(10 * speed, 0xa78bfa, Math.min(0.8, speed * 2));

      graphics.lineBetween(0, 0, size, size);

      graphics.generateTexture(key, size, size);
      graphics.destroy();

      const sprite = scene.add.tileSprite(400, 300, 800, 600, key);
      sprite.tileScaleX = 1;
      sprite.tileScaleY = 1;
      this.gridLines.push({ sprite, speed: speed * 0.5 });
    });

    this.gradientOverlay = scene.add.graphics();
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
  }

  update() {
    this.gridLines.forEach(({ sprite, speed }) => {
      sprite.tilePositionY += speed;
    });
  }
}
