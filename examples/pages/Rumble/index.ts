// Simple canvas example that doesn't use any other library nor ES6 features
import { createJoymap, createQueryModule, QueryModule } from 'joymap';

import gamepadUrl from '@/examples/assets/gamepad.png';

const SIZE = {
  width: window.innerWidth,
  height: window.innerHeight,
  centerX: window.innerWidth * 0.5,
  centerY: window.innerHeight * 0.5,
};

window.addEventListener('resize', () => {
  SIZE.width = window.innerWidth;
  SIZE.height = window.innerHeight;
  SIZE.centerX = window.innerWidth * 0.5;
  SIZE.centerY = window.innerHeight * 0.5;
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  canvas.width = SIZE.width;
  canvas.height = SIZE.height;
});

interface GameObj {
  color?: Color;
  x: number;
  y: number;
  angle: number;
  rotationOffset: number;
  width: number;
  height: number;
}

interface Character extends GameObj {
  module: QueryModule;
  timeoutSmall: number;
  timeoutBig: number;
  timeoutSpinning: number;
  timeoutChaos: number;
  color: Color;
}

interface Bullet extends GameObj {
  speed: number;
  type: 'small' | 'big' | 'spinning' | 'chaos';
}

const quickFire = 200;
const normalFire = 300;
const slowFire = 2000;

function updateCharacter(character: Character, bullets: Bullet[]) {
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

const characters: Character[] = [];
let bullets: Bullet[] = [];

const app = document.getElementById('app') as HTMLElement;
app.innerHTML = `
  <article style="text-align: center;">
    <canvas
      id="canvas"
      style="position: absolute; width: 100%; height: 100%; left: 0; right: 0; bottom: 0; top: 0;"
      width="${SIZE.width}"
      height="${SIZE.height}"
    />
  </article>
`;

const gamepadImage = new Image();
gamepadImage.src = gamepadUrl;

function createTintedSprite(color: string) {
  const c = document.createElement('canvas');
  c.width = gamepadImage.width;
  c.height = gamepadImage.height;

  const ctx = c.getContext('2d')!;

  ctx.drawImage(gamepadImage, 0, 0);
  ctx.globalCompositeOperation = 'multiply';
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, c.width, c.height);

  ctx.globalCompositeOperation = 'destination-in';
  ctx.drawImage(gamepadImage, 0, 0);
  ctx.globalCompositeOperation = 'source-over';
  return c;
}

// Get the canvas context so we can draw on it
const ctx = (document.getElementById('canvas') as HTMLCanvasElement).getContext(
  '2d',
) as CanvasRenderingContext2D;

const colorList = ['#debabd', '#debad5', '#bad5de', '#baded6', '#d6bade'] as const;
type Color = (typeof colorList)[number];
let colorSprites: Record<Color, HTMLCanvasElement>;

gamepadImage.onload = () => {
  colorSprites = {} as Record<Color, HTMLCanvasElement>;

  for (let key of colorList) {
    colorSprites[key] = createTintedSprite(key);
  }
};

let charCounter = 0;

function createCharacter(
  padId: string,
  { width, height }: { width: number; height: number },
): Character {
  const color = colorList[charCounter];
  charCounter = (charCounter + 1) % colorList.length;

  return {
    module: createQueryModule({ padId, autoConnect: false }),
    color,
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

function drawElement(ctx: CanvasRenderingContext2D, element: GameObj, image: CanvasImageSource) {
  const { x, y, angle, rotationOffset, width, height } = element;

  // Rotate whole canvas
  ctx.translate(x, y);
  ctx.rotate(angle + rotationOffset);
  ctx.translate(-x, -y);

  // Draw straight image onto the rotated canvas
  ctx.drawImage(image, x - width * 0.5, y - height * 0.5, width, height);

  // Unrotate canvas to straighten it and leave the image rotated instead
  ctx.translate(x, y);
  ctx.rotate(-angle - rotationOffset);
  ctx.translate(-x, -y);
}

const joymap = createJoymap({
  onPoll: function onPoll() {
    // Clear canvas by drawing background color and then the welcome messages
    ctx.fillStyle = '#282828';
    ctx.fillRect(0, 0, SIZE.width, SIZE.height);
    ctx.strokeStyle = '#FFF';
    ctx.fillStyle = '#FFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '48px serif';
    if (characters.length === 0) {
      ctx.fillText(`Let's get ready`, SIZE.centerX, SIZE.centerY - 48);
      ctx.fillText(`To haptic feedback`, SIZE.centerX, SIZE.centerY);
      ctx.fillText(`Please connect gamepad/s`, SIZE.centerX, SIZE.centerY + 48);
    } else {
      ctx.fillText(`Use sticks to move and aim`, SIZE.centerX, SIZE.centerY - 48);
      ctx.fillText(`Shoulders and triggers to shoot`, SIZE.centerX, SIZE.centerY);
    }
    const unusedIds = joymap.getUnusedPadIds();

    if (unusedIds.length > 0) {
      unusedIds.forEach((padId) => {
        const c = createCharacter(padId, SIZE);
        joymap.addModule(c.module);

        characters.push(c);
      });
    }

    bullets = bullets.filter(
      (bullet) =>
        bullet.x + bullet.width > 0 &&
        bullet.x - bullet.width < SIZE.width &&
        bullet.y + bullet.height > 0 &&
        bullet.y - bullet.height < SIZE.height,
    );

    bullets.forEach((bullet) => {
      bullet.x += bullet.speed * Math.cos(bullet.angle);
      bullet.y += bullet.speed * Math.sin(bullet.angle);
      if (bullet.type === 'spinning') {
        bullet.rotationOffset += Math.PI * 0.05;
      }
      if (bullet.type === 'chaos') {
        bullet.angle += Math.PI * 0.2 * Math.random() - Math.PI * 0.1;
      }

      drawElement(ctx, bullet, gamepadImage);
    });

    characters.forEach((c) => {
      if (c.module.isConnected()) {
        updateCharacter(c, bullets);
        drawElement(ctx, c, colorSprites[c.color]);
      }
    });
  },
});

joymap.start();
