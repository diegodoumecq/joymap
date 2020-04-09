// Simple canvas example that doesn't use any other library nor ES6 features

import { createJoyMap, createQueryModule, QueryModule } from '../../src/index';

import '../main.styl';
import './Canvas.styl';

interface Character {
  module: QueryModule;
  id: string;
  x: number;
  y: number;
  angle: number;
}

const SIZE = {
  width: 800,
  height: 600,
  centerX: 400,
  centerY: 300,
};

let lastId = 0;
function uniqueId(prefix = '') {
  lastId += 1;
  return `${prefix}${lastId}`;
}

// Populate the app div with a canvas
const app = document.getElementById('app') as HTMLElement;
app.innerHTML = `
  <article class="examples-container">
    <header>
      <h1 className="title">JoyMap Canvas example using query module</h1>
      <h2>We create characters whenever you connect a gamepad</h2>
      <h3>We also DESTROY them when the gamepad gets unplugged</h3>
    </header>
    <div class="canvas-example">
      <canvas id="canvas" width="${SIZE.width}" height="${SIZE.height}" />
    </div>
  </article>
`;

const gamepadImage = new Image();
gamepadImage.src = 'gamepad.png';

function drawCharacter(ctx: CanvasRenderingContext2D, character: Character) {
  const { x, y } = character;
  const angle = character.angle + Math.PI * 0.1 * character.module.getMapper('LeftVsRight');

  // Rotate whole canvas
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.translate(-x, -y);

  // Draw straight image onto the rotated canvas
  ctx.drawImage(gamepadImage, x - 121, y - 75, 242, 150);
  ctx.font = '48px serif';
  ctx.strokeText(character.id, x - 15, y);

  // Unrotate canvas to straighten it and leave the image rotated instead
  ctx.translate(x, y);
  ctx.rotate(-angle);
  ctx.translate(-x, -y);
}

function updateCharacter(character: Character) {
  const sticks = character.module.getSticks('L', 'R');
  const { L, R } = sticks;

  // Move the character itself
  character.x += L.value[0] * 5;
  character.y += L.value[1] * 5;

  // Don't assign a new angle if the stick isn't being used
  if (R.pressed) {
    character.angle = Math.atan2(R.value[1], R.value[0]) + Math.PI * 0.5;
  }
}

const characters: Character[] = [];

const joyMap = createJoyMap({
  onPoll: function onPoll() {
    // Get the canvas context so we can draw on it
    const ctx = (document.getElementById('canvas') as HTMLCanvasElement).getContext(
      '2d',
    ) as CanvasRenderingContext2D;

    // Draw background color, clearing the canvas
    ctx.fillStyle = '#EEE';
    ctx.fillRect(0, 0, SIZE.width, SIZE.height);
    const unusedIds = joyMap.getUnusedPadIds();

    if (unusedIds.length > 0) {
      unusedIds.forEach((padId) => {
        const c = {
          module: createQueryModule({ padId, autoConnect: false }),
          id: uniqueId(),
          x: Math.random() * SIZE.width,
          y: Math.random() * SIZE.height,
          angle: Math.random() * 2 * Math.PI,
        };
        joyMap.addModule(c.module);

        c.module.setMapper('LeftVsRight', (module) => {
          const rightButtons = module.getButtons('R1', 'R2', 'R3', 'A', 'B', 'X', 'Y', 'start');
          const leftButtons = module.getButtons(
            'dpadUp',
            'dpadDown',
            'dpadLeft',
            'dpadRight',
            'L1',
            'L2',
            'L3',
            'select',
          );

          const rightResult = Object.keys(rightButtons).reduce(
            (result, name) => result + rightButtons[name].value,
            0,
          );
          const leftResult = Object.keys(leftButtons).reduce(
            (result, name) => result + leftButtons[name].value,
            0,
          );

          return rightResult - leftResult;
        });
        characters.push(c);
      });
    }

    characters.forEach((c) => {
      if (c.module.isConnected()) {
        updateCharacter(c);
        drawCharacter(ctx, c);
      }
    });
  },
});

joyMap.start();
