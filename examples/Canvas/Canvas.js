import { some, forEach, pull, uniqueId } from 'lodash/fp';

import createJoyMap from '../../src/JoyMap';

import '../main.styl';
import './Canvas.styl';

const SIZE = {
    width: 800,
    height: 600,
    centerX: 400,
    centerY: 300
};

// Populate the app div with a canvas
document.getElementById('app').innerHTML = `
    <article class="examples-container">
        <header>
            <h1 className="title">JoyMap Canvas example</h1>
            <h2>We create player characters whenever you connect a gamepad</h2>
            <h3>We also DESTROY them when the gamepad gets unplugged</h3>
        </header>
        <div class="canvas-example">
            <canvas
                id="canvas"
                width="${SIZE.width}"
                height="${SIZE.height}" />
        </div>
    </article>`;

const gamepadImage = new Image();
gamepadImage.src = 'gamepad.png';

function drawCharacter(ctx, character) {
    const { x, y } = character;

    const angle = !character.player.aggregators.AnyButton.value ? character.angle : character.angle + Math.PI;

    // Rotate whole canvas
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.translate(-x, -y);

    // Draw straight image onto the rotated canvas
    ctx.drawImage(gamepadImage, x - 121, y - 75, 242, 150);
    ctx.font = '48px serif';
    ctx.strokeText(character.player.name, x - 15, y);

    // Unrotate canvas to straighten it and leave the image rotated instead
    ctx.translate(x, y);
    ctx.rotate(-angle);
    ctx.translate(-x, -y);
}

function updateCharacter(character) {
    const { L, R } = character.player.sticks;

    // Move the character itself
    character.x += L.value[0] * 5;
    character.y += L.value[1] * 5;

    // Don't assign a new angle if the stick isn't being used
    if (R.pressed) {
        character.angle = Math.atan2(R.value[1], R.value[0]) + (Math.PI * 0.5);
    }
}

const characters = [];

const joyMap = createJoyMap({
    threshold: 0.2,
    onPoll() {
        // Get the canvas context so we can draw on it
        const ctx = document.getElementById('canvas').getContext('2d');

        // Draw background color, clearing the canvas
        ctx.fillStyle = '#EEE';
        ctx.fillRect(0, 0, SIZE.width, SIZE.height);
        const unusedIds = joyMap.getUnusedGamepadIds();

        if (unusedIds.length > 0) {
            forEach(() => {
                const c = {
                    player: joyMap.addPlayer(uniqueId()),
                    x: Math.random() * SIZE.width,
                    y: Math.random() * SIZE.height,
                    angle: Math.random() * 2 * Math.PI
                };
                c.player.setAggregator('AnyButton', ({ buttons }) => some('pressed', buttons));
                characters.push(c);
            }, unusedIds);
        }

        forEach(c => {
            if (!c.player.connected) {
                pull(c, characters);
                joyMap.removePlayer(c.player);
            } else {
                updateCharacter(c);
                drawCharacter(ctx, c);
            }
        }, characters);
    }
});

joyMap.start();
