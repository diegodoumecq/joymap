import JoyMap from '../../lib/JoyMap';
import { noop, reduce } from 'lodash/fp';
import { join } from 'lodash';

// Threshold for analog inputs
const threshold = 0.2;

const joyMap = new JoyMap({ threshold });
const mainPlayer = joyMap.addPlayer('mainPlayer');

mainPlayer.setAlias('Jump', ['A', 'X', 'Y', 'L2', 'R2']);
mainPlayer.setAlias('Shoot', 'B');
mainPlayer.setAlias('LookUp', 'dpadUp');
mainPlayer.setAlias('LookDown', 'dpadDown');
mainPlayer.setAlias('LookLeft', 'dpadLeft');
mainPlayer.setAlias('LookRight', 'dpadRight');
mainPlayer.setAlias('StickAverage', ['L', 'R']);

mainPlayer.setAggregator('Point', player => player.sticks.R.pressed);
mainPlayer.setAggregator('MovePoint', (player, prevValue, gamepad) => {
    const { L, R } = player.sticks;
    return L.pressed && R.pressed;
});

mainPlayer.setAggregator('CountFace', (player, prevValue, gamepad) => {
    const { A, B, X, Y } = player.buttons;
    return A.value + B.value + X.value + Y.value;
});

mainPlayer.setAggregator('CountAll', (player, prevValue, gamepad) => {
    const buttonCount = reduce((result, { pressed }) => result + (pressed ? 1 : 0), 0, player.buttons);
    const stickCount = reduce((result, { pressed }) => result + (pressed ? 1 : 0), 0, player.sticks);
    const buttonAliasCount = reduce((result, { pressed }) => result + (pressed ? 1 : 0), 0, player.buttonAliases);
    const stickAliasCount = reduce((result, { pressed }) => result + (pressed ? 1 : 0), 0, player.stickAliases);
    const total = buttonCount + stickCount + buttonAliasCount + stickAliasCount;

    if (total > 0) {
        return `${total}(Btn:${buttonCount} Sticks:${stickCount} Aliases:${buttonAliasCount + stickAliasCount})`;
    } else {
        return null;
    }
});

function printState(pressed) {
    return pressed ? 'pressed' : 'released';
}

function buttonToString(buttonName, { pressed, value }) {
    return `${buttonName}: ${printState(pressed)}(${value})`;
}

function stickToString(stickName, { pressed, value }) {
    return `${stickName}: ${printState(pressed)}(x: ${value.x}, y: ${value.y})`;
}

const showButtons = true;
const showSticks = true;
const showButtonAliases = true;
const showStickAliases = true;
const showAggregators = true;

// On each frame log all the activated inputs, aliases and aggregators
function step() {
    const result = join([
        !showButtons ? '' : reduce((result, buttonName) => {
            const button = mainPlayer.buttons[buttonName];

            if (button.pressed || button.justChanged) {
                return `${result} ${buttonToString(buttonName, button)},`;
            }
            
            return result;
        }, '', Object.keys(mainPlayer.buttons)),
        !showSticks ? '' : reduce((result, stickName) => {
            const stick = mainPlayer.sticks[stickName];

            if (stick.pressed || stick.justChanged) {
                return `${result} ${stickToString(stickName, stick)},`;
            }
            
            return result;
        }, '', Object.keys(mainPlayer.sticks)),
        !showButtonAliases ? '' : reduce((result, aliasName) => {
            const aliasInput = mainPlayer.buttonAliases[aliasName];

            if (aliasInput.pressed || aliasInput.justChanged) {
                return `${result} ${buttonToString(aliasName, aliasInput)},`;
            }
            
            return result;
        }, '', Object.keys(mainPlayer.buttonAliases)),
        !showStickAliases ? '' : reduce((result, aliasName) => {
            const aliasInput = mainPlayer.stickAliases[aliasName];

            if (aliasInput.pressed || aliasInput.justChanged) {
                return `${result} ${stickToString(aliasName, aliasInput)},`;
            }
            
            return result;
        }, '', Object.keys(mainPlayer.stickAliases)),
        !showAggregators ? '' : reduce((result, aggregatorName) => {
            const stuff = mainPlayer.aggregators[aggregatorName];

            if (!!stuff && !!stuff.value) {
                return `${result} ${aggregatorName}: ${stuff.value},`;
            }
            
            return result;
        }, '', Object.keys(mainPlayer.aggregators))
    ], '');
    
    if (result) {
        console.log(result.slice(0, -1));
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
