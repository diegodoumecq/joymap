import JoyMap from '../lib/JoyMap';
import { noop } from 'lodash/fp';

// Example of usage:

// Threshold for analog inputs
const threshold = 0.2;

const joyMap = new JoyMap({ threshold });

joyMap.setAlias('Jump', 'B');
joyMap.setAlias('LookUp', 'dpadUp');
joyMap.setAlias('LookDown', 'dpadDown');
joyMap.setAlias('LookLeft', 'dpadLeft');
joyMap.setAlias('LookRight', 'dpadRight');

joyMap.setAlias('Move', (mappedValues) => {
    const x = mappedValues.leftAnalogX;
    const y = mappedValues.leftAnalogY;
    return (joyMap.isSignificant(x.value) || joyMap.isSignificant(y.value));
});

joyMap.setAlias('Point', (mappedValues) => {
    const x = mappedValues.rightAnalogX;
    const y = mappedValues.rightAnalogY;
    return (joyMap.isSignificant(x.value) || joyMap.isSignificant(y.value));
});

joyMap.setAlias('MovePoint', (mappedValues) => {
    const move = mappedValues.Move;
    const point = mappedValues.Point;
    return move.value && point.value;
});

joyMap.setAlias('CountFace', (mappedValues) => {
    return mappedValues.A.value + mappedValues.B.value + mappedValues.X.value + mappedValues.Y.value;
});

joyMap.setAlias('CountAll', (mappedValues) => {
    let count = 0;
    // TODO Make the analog axes count as one for each stick
    joyMap.getSupportedInputs(false).forEach((name) => {
        const state = mappedValues[name].state;
        count += (state !== 'released' && state !== 'justReleased') ? 1 : 0;
    });
    
    return count;
});

const inputs = joyMap.getSupportedInputs(true);


// On each frame log all the activated input
function step() {
    const str = inputs.reduce((result, inputName) => {
        const input = joyMap.getState(inputName) || {};

        if (input.state && input.state !== 'released') {
            return result + inputName + ': ' + input.state + ' ' + input.value + ', ';
        }
        
        return result;
    }, '');

    if (!!str) {
        console.log(str.slice(0, -2));
    } else {
        console.log('Gamepads connected: ' + joyMap.gamepads.length);
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
