import JoyPad from 'joypad';

// Example of usage:

// Threshold for analog inputs
const threshold = 0.2;

const joyMap = new JoyMap(threshold);

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
    Object.keys(mappedValues).forEach((name) => {
        count += (mappedValues[name].state !== 'released') ? 1 : 0;
    });
    return count;
});

const inputs = joyMap.getSupportedInputs(true);

joyMap.init();

// On each frame log all the activated input
function step() {
    const str = inputs.reduce((result, inputName) => {
            const input = joyMap.getState(inputName) || {};

            if (input.state !== 'released') {
                return result + inputName + ': ' + input.state + ' ' + input.value + ', ';
            }
            
            return result;
        }, '');

    if (!!str) {
        console.log(str.slice(0, -2));
    } else {
        console.log(joyMap.gamepads.length);
    }
    
    window.requestAnimationFrame(step);
}

step();
