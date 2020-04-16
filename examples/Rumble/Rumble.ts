// Simple canvas example that doesn't use any other library nor ES6 features

import { createJoyMap } from '../../src/index';

import '../main.styl';
import './Rumble.styl';
import { Character, Bullet, Element, updateCharacter, createCharacter } from './Character';

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

const characters: Character[] = [];
let bullets: Bullet[] = [];

const app = document.getElementById('app') as HTMLElement;
app.innerHTML = `
  <article class="examples-container">
    <canvas id="canvas" width="${SIZE.width}" height="${SIZE.height}" />
  </article>
`;

const gamepadImage = new Image();
gamepadImage.src = 'gamepad.png';

const bulletImage = new Image();
bulletImage.src = 'bullet.png';

const smallBulletImage = new Image();
smallBulletImage.src = 'smallBullet.png';

function drawElement(ctx: CanvasRenderingContext2D, element: Element, image: HTMLImageElement) {
  const { x, y, angle, rotationOffset, width, height, id } = element;

  // Rotate whole canvas
  ctx.translate(x, y);
  ctx.rotate(angle + rotationOffset);
  ctx.translate(-x, -y);

  // Draw straight image onto the rotated canvas
  ctx.drawImage(image, x - width * 0.5, y - height * 0.5, width, height);
  if (id) {
    ctx.font = '48px serif';
    ctx.strokeText(id, x - 15, y);
  }

  // Unrotate canvas to straighten it and leave the image rotated instead
  ctx.translate(x, y);
  ctx.rotate(-angle - rotationOffset);
  ctx.translate(-x, -y);
}

const joyMap = createJoyMap({
  onPoll: function onPoll() {
    // Get the canvas context so we can draw on it
    const ctx = (document.getElementById('canvas') as HTMLCanvasElement).getContext(
      '2d',
    ) as CanvasRenderingContext2D;

    // Clear canvas by drawing background color and then the welcome messages
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, SIZE.width, SIZE.height);
    ctx.strokeStyle = '#FFF';
    ctx.fillStyle = '#FFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '48px serif';
    ctx.fillText(`Let's get ready to haptic feedback`, SIZE.centerX, SIZE.centerY - 24);
    if (characters.length === 0) {
      ctx.fillText(`Connect gamepad/s to add player/s`, SIZE.centerX, SIZE.centerY + 24);
    } else {
      ctx.fillText(
        `Use sticks to move, shoulders and triggers to shoot`,
        SIZE.centerX,
        SIZE.centerY + 24,
      );
    }
    const unusedIds = joyMap.getUnusedPadIds();

    if (unusedIds.length > 0) {
      unusedIds.forEach((padId) => {
        const c = createCharacter(padId, SIZE);
        joyMap.addModule(c.module);

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
      const sprite = (() => {
        if (bullet.type === 'small') {
          return smallBulletImage;
        }
        if (bullet.type === 'big') {
          return bulletImage;
        }
        if (bullet.type === 'spinning') {
          return gamepadImage;
        }

        return smallBulletImage;
      })();

      drawElement(ctx, bullet, sprite);
    });

    characters.forEach((c) => {
      if (c.module.isConnected()) {
        updateCharacter(c, bullets);
        drawElement(ctx, c, gamepadImage);
      }
    });
  },
});

joyMap.start();
