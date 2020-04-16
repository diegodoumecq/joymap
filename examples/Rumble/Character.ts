import { uniqueId } from 'lodash/fp';
import { QueryModule, createQueryModule } from '../../src/index';

export interface Element {
  id?: string;
  x: number;
  y: number;
  angle: number;
  rotationOffset: number;
  width: number;
  height: number;
}

export interface Character extends Element {
  module: QueryModule;
  timeoutSmall: number;
  timeoutBig: number;
  timeoutSpinning: number;
  timeoutChaos: number;
}

export interface Bullet extends Element {
  speed: number;
  type: 'small' | 'big' | 'spinning' | 'chaos';
}

const quickFire = 200;
const normalFire = 300;
const slowFire = 2000;

export function updateCharacter(character: Character, bullets: Bullet[]) {
  const sticks = character.module.getSticks('L', 'R');
  const fire = character.module.getButton('R1');
  const fireReallyHard = character.module.getButton('R2');
  const spinningFire = character.module.getButton('L1');
  const chaosFire = character.module.getButton('L2');
  const { L, R } = sticks;

  // Move the character itself
  character.x += L.value[0] * 5;
  character.y += L.value[1] * 5;

  // Don't assign a new angle if the stick isn't being used
  if (R.pressed) {
    character.angle = Math.atan2(R.value[1], R.value[0]) + Math.PI * 0.5;
  }

  const now = Date.now();

  if (L.pressed) {
    character.module.addRumble(
      {
        duration: 100,
        strongMagnitude: 0,
        weakMagnitude: 0.15 * Math.sqrt(L.value[0] ** 2 + L.value[1] ** 2),
      },
      'humming engines channel',
    );
  }

  if (fire.pressed && now - character.timeoutSmall >= quickFire) {
    character.timeoutSmall = now;
    bullets.push({
      x: character.x,
      y: character.y,
      angle: character.angle - Math.PI * 0.5,
      width: 181 * (Math.random() * 0.3 + 0.3),
      height: 87 * (Math.random() * 0.3 + 0.3),
      type: 'small',
      speed: 20,
      rotationOffset: 0,
    });

    character.module.addRumble(
      {
        duration: 100,
        strongMagnitude: 0,
        weakMagnitude: 0.4,
      },
      'quickfire',
    );
  }

  if (chaosFire.pressed && now - character.timeoutChaos >= normalFire) {
    character.timeoutChaos = now;
    bullets.push({
      x: character.x,
      y: character.y,
      angle: character.angle - Math.PI * 0.5,
      width: 181 * (Math.random() * 0.3 + 0.1),
      height: 87 * (Math.random() * 0.3 + 0.1),
      type: 'chaos',
      speed: 10,
      rotationOffset: 0,
    });

    character.module.addRumble(
      [
        {
          duration: 40,
          strongMagnitude: 0.1,
          weakMagnitude: 1,
        },
        40,
        {
          duration: 80,
          strongMagnitude: 0,
          weakMagnitude: 0.4,
        },
        {
          duration: 80,
          strongMagnitude: 1,
          weakMagnitude: 0,
        },
      ],
      'chaosFire',
    );
  }

  if (spinningFire.pressed && now - character.timeoutSpinning >= quickFire) {
    character.timeoutSpinning = now;
    bullets.push({
      x: character.x,
      y: character.y,
      angle: character.angle - Math.PI * 0.5,
      width: 181 * (Math.random() * 0.3 + 0.3),
      height: 87 * (Math.random() * 0.3 + 0.3),
      type: 'spinning',
      speed: 15,
      rotationOffset: 0,
    });

    character.module.addRumble(
      {
        duration: 100,
        strongMagnitude: 0,
        weakMagnitude: 1,
      },
      'spinningFire',
    );
  }

  if (fireReallyHard.pressed && now - character.timeoutBig >= slowFire) {
    character.timeoutBig = now;
    bullets.push({
      x: character.x,
      y: character.y,
      angle: character.angle - Math.PI * 0.5,
      width: 374 * (Math.random() * 0.3 + 0.7),
      height: 152 * (Math.random() * 0.3 + 0.7),
      type: 'big',
      speed: 8,
      rotationOffset: 0,
    });

    character.module.addRumble(
      {
        duration: 300,
        strongMagnitude: 1,
        weakMagnitude: 1,
      },
      'bigBoom',
    );
  }
}

export function createCharacter(
  padId: string,
  { width, height }: { width: number; height: number },
): Character {
  return {
    module: createQueryModule({ padId, autoConnect: false }),
    id: uniqueId(''),
    x: Math.random() * width,
    y: Math.random() * height,
    angle: Math.random() * 2 * Math.PI,
    width: 242,
    height: 150,
    timeoutSmall: Date.now(),
    timeoutBig: Date.now(),
    timeoutSpinning: Date.now(),
    timeoutChaos: Date.now(),
    rotationOffset: 0,
  };
}
