/*eslint-disable */

// Simple canvas example that doesn't use any other library nor ES6 features
var joyMap = require('../../src/index');
var createJoyMap = joyMap.default;
var createQueryModule = joyMap.createQueryModule;

require('../main.styl');
require('./Canvas.styl');

var SIZE = {
    width: 800,
    height: 600,
    centerX: 400,
    centerY: 300
};

var lastId = 0;
function uniqueId(prefix) {
    lastId += 1;
    return (prefix || '') + lastId;
}

// Populate the app div with a canvas
document.getElementById('app').innerHTML = '<article class="examples-container">' +
        '<header>' +
            '<h1 className="title">JoyMap Canvas example</h1>' +
            '<h2>We create characters whenever you connect a gamepad</h2>' +
            '<h3>We also DESTROY them when the gamepad gets unplugged</h3>' +
        '</header>' +
        '<div class="canvas-example">' +
            '<canvas id="canvas" width="' + SIZE.width + '" height="' + SIZE.height + '" />' +
        '</div>' +
    '</article>';

var gamepadImage = new Image();
gamepadImage.src = 'gamepad.png';

function drawCharacter(ctx, character) {
    var x = character.x;
    var y = character.y;
    var angle = character.angle + Math.PI * 0.1 * character.module.getMappers('LeftVsRight');

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

function updateCharacter(character) {
    var sticks = character.module.getSticks('L', 'R');
    var L = sticks.L;
    var R = sticks.R;

    // Move the character itself
    character.x += L.value[0] * 5;
    character.y += L.value[1] * 5;

    // Don't assign a new angle if the stick isn't being used
    if (R.pressed) {
        character.angle = Math.atan2(R.value[1], R.value[0]) + (Math.PI * 0.5);
    }
}

var characters = [];

var joyMap = createJoyMap({
    onPoll: function onPoll() {
        // Get the canvas context so we can draw on it
        var ctx = document.getElementById('canvas').getContext('2d');

        // Draw background color, clearing the canvas
        ctx.fillStyle = '#EEE';
        ctx.fillRect(0, 0, SIZE.width, SIZE.height);
        var unusedIds = joyMap.getUnusedPadIds();

        if (unusedIds.length > 0) {
            unusedIds.forEach(function (padId) {
                var c = {
                    module: createQueryModule({ padId, autoConnect: false }),
                    id: uniqueId(),
                    x: Math.random() * SIZE.width,
                    y: Math.random() * SIZE.height,
                    angle: Math.random() * 2 * Math.PI
                };
                joyMap.addModule(c.module);

                c.module.setMapper('LeftVsRight', function (module) {
                    var rightButtons = module.getButtons('R1', 'R2', 'R3', 'A', 'B', 'X', 'Y', 'start');
                    var leftButtons = module.getButtons(
                        'dpadUp', 'dpadDown', 'dpadLeft', 'dpadRight', 'L1', 'L2', 'L3', 'select'
                    );

                    var rightResult = Object.keys(rightButtons).reduce(function (result, name) {
                        return result + rightButtons[name].value;
                    }, 0) ;
                    var leftResult = Object.keys(leftButtons).reduce(function (result, name) {
                        return result + leftButtons[name].value;
                    }, 0);

                    return rightResult - leftResult;
                });
                characters.push(c);
            });
        }

        characters.forEach(function (c) {
            if (c.module.isConnected()) {
                updateCharacter(c);
                drawCharacter(ctx, c);
            }
        });
    }
});

joyMap.start();

/* eslint-enable */
