import { createQueryModule, Joymap, QueryModule } from 'joymap';
import Phaser from 'phaser';

import { Background } from './Background';
import { Menu } from './Menu';

export class MainScene extends Phaser.Scene {
  private cans: Phaser.GameObjects.Text[] = [];
  private background = new Background();
  private menu = new Menu();
  private gamepadModule: QueryModule | null = null;
  private joymap: Joymap | null = null;

  constructor() {
    super({ key: 'MainScene' });
  }

  init(data: { joymap: Joymap }) {
    this.joymap = data.joymap;
  }

  setupGamepad(joymapInstance: Joymap) {
    this.joymap = joymapInstance;
  }

  create() {
    this.background.create(this);
    this.menu.create(this, () => this.spawnEmojis());

    const floor = this.add.rectangle(400, 610, 800, 20, 0x000000);
    this.matter.add.gameObject(floor, { isStatic: true, restitution: 0.5 });

    const leftWall = this.add.rectangle(-10, 300, 20, 600, 0x000000);
    this.matter.add.gameObject(leftWall, { isStatic: true, restitution: 0.5 });

    const rightWall = this.add.rectangle(810, 300, 20, 600, 0x000000);
    this.matter.add.gameObject(rightWall, { isStatic: true, restitution: 0.5 });
  }

  update() {
    this.background.update();

    if (this.joymap) {
      const unusedIds = this.joymap.getUnusedPadIds();

      if (unusedIds.length > 0 && !this.gamepadModule) {
        this.gamepadModule = createQueryModule({ padId: unusedIds[0] });
        this.joymap.addModule(this.gamepadModule);
      }

      if (this.gamepadModule && !this.gamepadModule.isConnected()) {
        this.gamepadModule = null;
      }
    }

    this.menu.update(this, this.gamepadModule);
  }

  private spawnEmojis() {
    const x = Phaser.Math.Between(350, 450);
    const y = 380;
    const rand = Math.random();

    if (rand > 0.98) {
      this.spawnBin(x, y);
    } else if (rand > 0.7) {
      this.spawnBean(x, y);
    } else {
      this.spawnCan(x, y);
    }
  }

  private spawnCan(x: number, y: number) {
    const can = this.add.text(x, y, '🥫', { fontSize: '48px' }).setOrigin(0.5, 0.5);
    can.setDepth(10);

    this.matter.add.gameObject(can, {
      shape: { type: 'rectangle', width: 24, height: 42 },
      restitution: 0.5,
      friction: 0.1,
      force: { x: Phaser.Math.FloatBetween(-0.02, 0.02), y: -0.04 },
      torque: Phaser.Math.FloatBetween(-1, 1),
    });

    can.setRotation(Phaser.Math.FloatBetween(0, Math.PI * 2));
    this.cans.push(can);
  }

  private spawnBean(x: number, y: number) {
    const bean = this.add.text(x, y, '🫘', { fontSize: '48px' }).setOrigin(0.5, 0.5);
    bean.setDepth(10);

    this.matter.add.gameObject(bean, {
      shape: { type: 'circle', radius: 18 },
      restitution: 0.7,
      friction: 0.1,
      force: { x: Phaser.Math.FloatBetween(-0.02, 0.02), y: -0.04 },
      torque: Phaser.Math.FloatBetween(-1, 1),
    });

    bean.setRotation(Phaser.Math.FloatBetween(0, Math.PI * 2));
    this.cans.push(bean);
  }

  private spawnBin(x: number, y: number) {
    const bin = this.add
      .text(x, y, '🗑️', { fontSize: '48px', padding: { y: 5 } })
      .setOrigin(0.5, 0.5);
    bin.setDepth(10);

    this.matter.add.gameObject(bin, {
      shape: { type: 'rectangle', width: 40, height: 52 },
      restitution: 0.5,
      friction: 0.1,
      force: { x: Phaser.Math.FloatBetween(-0.02, 0.02), y: -0.04 },
      torque: Phaser.Math.FloatBetween(-1, 1),
    });

    bin.setRotation(Phaser.Math.FloatBetween(0, Math.PI * 2));
    this.cans.push(bin);
  }
}
