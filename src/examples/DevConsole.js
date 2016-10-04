import JoyMap from '../lib/JoyMap';
import { noop, flowRight, reduce, isEmpty } from 'lodash/fp';

// Example of usage:

// Threshold for analog inputs
const threshold = 0.2;

const joyMap = new JoyMap({ threshold });
const mainPlayer = joyMap.addPlayer('mainPlayer');

mainPlayer.sticks.L.invertX = true;
mainPlayer.sticks.L.invertY = true;

mainPlayer.setAlias('Jump', 'A');
mainPlayer.setAlias('Shoot', 'B');
mainPlayer.setAlias('LookUp', 'dpadUp');
mainPlayer.setAlias('LookDown', 'dpadDown');
mainPlayer.setAlias('LookLeft', 'dpadLeft');
mainPlayer.setAlias('LookRight', 'dpadRight');

mainPlayer.setAggregator('Move', (player, prevValue, gamepad) => {
    const { L } = player.sticks;
    return !!player.isAxisSignificant(L.value);
});

mainPlayer.setAggregator('Point', (player, prevValue, gamepad) => {
    const { R } = player.sticks;
    return player.isAxisSignificant(R.value);
});

mainPlayer.setAggregator('MovePoint', (player, prevValue, gamepad) => {
    const { L, R } = player.sticks;
    return player.isAxisSignificant(L.value) && player.isAxisSignificant(R.value);
});

mainPlayer.setAggregator('CountFace', (player, prevValue, gamepad) => {
    const { A, B, X, Y } = player.buttons;
    return A.value + B.value + X.value + Y.value;
});

// Commented out due to noisier-than-desired output, but is still a nice example
// mainPlayer.setAggregator('CountAll', (player, prevValue, gamepad) => {
//     const buttonCount = reduce((result, { pressed }) => result + (pressed ? 1 : 0), 0, player.buttons);
//     const axisCount = reduce((result, { pressed }) => result + (pressed ? 1 : 0), 0, player.sticks);
//     const aliasCount = reduce((result, { pressed }) => result + (pressed ? 1 : 0), 0, player.aliases);

//     return `${buttonCount + axisCount + aliasCount}(Btn:${buttonCount} Axes:${axisCount} Alias:${aliasCount})`;
// });


function printState(pressed) {
    return pressed ? 'pressed' : 'released';
}

function buttonToString(buttonName, { pressed, value }) {
    return `${buttonName}: ${printState(pressed)}(${value})`;
}

function axisToString(axisName, { pressed, value }) {
    return `${axisName}: ${printState(pressed)}(x: ${value.x}, y: ${value.y})`;
}

// On each frame log all the activated input
function step() {
    const buttons = reduce((result, buttonName) => {
        const button = mainPlayer.buttons[buttonName];

        if (button.pressed || button.justChanged) {
            return `${result} ${buttonToString(buttonName, button)},`;
        }
        
        return result;
    }, '', Object.keys(mainPlayer.buttons));

    const sticks = reduce((result, axisName) => {
        const stick = mainPlayer.sticks[axisName];

        if (stick.pressed || stick.justChanged) {
            return `${result} ${axisToString(axisName, stick)},`;
        }
        
        return result;
    }, '', Object.keys(mainPlayer.sticks));

    const aliases = reduce((result, aliasName) => {
        const aliasInput = mainPlayer.aliases[aliasName];

        if (aliasInput.pressed || aliasInput.justChanged) {
            if (aliasInput.isButton) {
                return `${result} ${buttonToString(aliasName, aliasInput)},`;
            } else {
                return `${result} ${axisToString(aliasName, aliasInput)},`;
            }
        }
        
        return result;
    }, '', Object.keys(mainPlayer.aliases));

    const aggregators = reduce((result, aggregatorName) => {
        const stuff = mainPlayer.aggregators[aggregatorName];

        if (!!stuff) {
            return `${result} ${aggregatorName} ${stuff},`;
        }
        
        return result;
    }, '', Object.keys(mainPlayer.aggregators));

    if (!!buttons || !!sticks || !!aliases || !!aggregators) {
        console.log((buttons + sticks + aliases + aggregators).slice(0, -1));
    }
}

export function startConsole() {
    joyMap.onPoll = step;
    joyMap.start();
}

export function stopConsole() {
    joyMap.onPoll = noop;
    joyMap.stop();
}
