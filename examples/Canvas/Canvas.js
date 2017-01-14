import { some } from 'lodash/fp';

import JoyMap from '../../src/JoyMap';

import '../main.styl';
import './Canvas.styl';

// IDEA: Add another example where a new player avatar is added to the game for each new gamepad

const SIZE = {
    width: 800,
    height: 600,
    centerX: 400,
    centerY: 300
};

const gamepadImage = new Image();
gamepadImage.src = 'gamepad.png';

const joyMap = new JoyMap({ threshold: 0.2 });

const mainPlayer = joyMap.addPlayer('mainPlayer');
mainPlayer.setAggregator('AnyButton', ({ buttons }) => some('pressed', buttons));

const mascot = {
    x: SIZE.centerX,
    y: SIZE.centerY,
    angle: 45
};

function updateMascot() {
    const { L, R } = mainPlayer.sticks;

    // Move the mascot itself
    mascot.x += L.value[0] * 5;
    mascot.y += L.value[1] * 5;

    // Don't assign a new angle if the stick isn't being used
    if (R.pressed) {
        mascot.angle = Math.atan2(R.value[1], R.value[0]) + (Math.PI * 0.5);
    }
}

function redrawCanvas(ctx) {
    // Draw background color, clearing previous image
    ctx.fillStyle = !mainPlayer.aggregators.AnyButton.value ? '#EEE' : '#DEE';
    ctx.fillRect(0, 0, SIZE.width, SIZE.height);

    const { x, y, angle } = mascot;

    // Rotate whole canvas
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.translate(-x, -y);

    // Draw straight image onto the rotated canvas
    ctx.drawImage(gamepadImage, x - 242, y - 150, 484, 300);

    // Unrotate canvas to straighten it and leave the image rotated instead
    ctx.translate(x, y);
    ctx.rotate(-angle);
    ctx.translate(-x, -y);
}

// Populate the app div with a canvas
document.getElementById('app').innerHTML = `
    <article class="examples-container">
        <header>
            <h1 className="title">JoyMap Canvas example</h1>
        </header>
        <div class="canvas-example">
            <canvas
                id="canvas"
                width="${SIZE.width}"
                height="${SIZE.height}" />
        </div>
    </article>`;

// Get the canvas context so we can draw on it
const ctx = document.getElementById('canvas').getContext('2d');

joyMap.onPoll = () => {
    updateMascot();
    redrawCanvas(ctx);
};

joyMap.start();
