/* @flow */
import type {
    IParsedGamepad, IListenOptions,
    IButtonValue, IStickValue,
    IButtonState, IMapper
} from '../types';

import {
    findIndexes, isConsecutive
} from './tools';

export function getRawGamepads(): Gamepad[] {
    if (navigator && navigator.getGamepads) {
        return Array.from(navigator.getGamepads());
    }
    return [];
}

export function updateListenOptions(
    listenOptions: IListenOptions | null,
    parsedGamepad: IParsedGamepad,
    threshold: number
) {
    if (!listenOptions) {
        return null;
    }

    const {
        callback, quantity, type,
        currentValue, targetValue,
        useTimeStamp, consecutive, allowOffset
    } = listenOptions;

    const indexes = type === 'axes' ?
        findIndexes(value => Math.abs(value) > threshold, parsedGamepad.axes) :
        findIndexes(
            ({ pressed, justChanged }) => pressed && (currentValue !== 0 || justChanged),
            parsedGamepad.buttons
        );

    if (indexes.length === quantity
    && (!consecutive || isConsecutive(indexes))
    && (allowOffset || indexes[0] % quantity === 0)) {
        if (useTimeStamp && currentValue === 0) {
            return Object.assign({}, listenOptions, { currentValue: Date.now() });
        }

        const comparison = useTimeStamp ? Date.now() - currentValue : currentValue + 1;

        if (targetValue <= comparison) {
            callback(indexes);
            return null;
        }

        if (!useTimeStamp) {
            return Object.assign({}, listenOptions, { currentValue: comparison });
        }

        return listenOptions;
    }

    // Clean currentValue
    return Object.assign({}, listenOptions, { currentValue: 0 });
}

export function nameIsValid(name: string) {
    return /^[a-z0-9]+$/i.test(name);
}

export function getDefaultButtons() {
    return {
        dpadUp: [12],
        dpadDown: [13],
        dpadLeft: [14],
        dpadRight: [15],
        L1: [4],
        L2: [6],
        L3: [10],
        R1: [5],
        R2: [7],
        R3: [11],
        A: [0],
        B: [1],
        X: [2],
        Y: [3],
        start: [9],
        select: [8]
    };
}

export function getDefaultSticks() {
    return {
        L: {
            indexes: [[0, 1]],
            inverts: [false, false]
        },
        R: {
            indexes: [[2, 3]],
            inverts: [false, false]
        }
    };
}

export function isButtonSignificant(value: IButtonValue = 0, threshold: number): boolean {
    return Math.abs(value) > threshold;
}

export function getButtonValue(value: IButtonValue = 0, threshold: number): IButtonValue {
    return !isButtonSignificant(value, threshold) ? 0 : value;
}

export function isStickSignificant(stickValues: IStickValue, threshold: number): boolean {
    return stickValues.findIndex(value => Math.abs(value) >= threshold) !== -1;
}

export function getStickValue(stickValues: IStickValue, threshold: number): IStickValue {
    if (!isStickSignificant(stickValues, threshold)) {
        return stickValues.map(() => 0);
    }

    return stickValues;
}

export function parseGamepad(
    pad: Gamepad,
    prevPad: IParsedGamepad,
    threshold: number,
    clampThreshold: boolean
): IParsedGamepad {
    return {
        buttons: pad.buttons.map((button: { value: number }, index: number) => {
            const previous: IButtonState = prevPad.buttons[index];
            const value = clampThreshold ? getButtonValue(button.value, threshold) : button.value;
            const pressed = isButtonSignificant(value, threshold);

            return {
                pressed,
                justChanged: pressed !== (previous ? isButtonSignificant(previous.value, threshold) : false),
                value
            };
        }),
        axes: pad.axes
    };
}

export function buttonMap(
    pad: IParsedGamepad,
    prevPad: IParsedGamepad,
    indexes: number[]
) {
    const length = indexes.length;

    let prevPressed = false;
    let value = 0;
    let pressed = false;

    let i = 0;
    while (i < length) {
        if (!prevPressed) {
            prevPressed = prevPad.buttons[indexes[i]].pressed;
        }
        value = Math.max(value, pad.buttons[indexes[i]].value);
        pressed = pressed || pad.buttons[indexes[i]].pressed;
        i += 1;
    }

    return {
        value,
        pressed,
        justChanged: pressed !== prevPressed
    };
}

export function stickMap(
    pad: IParsedGamepad,
    prevPad: IParsedGamepad,
    indexes: Array<number[]>,
    inverts: boolean[]
) {
    // TODO

    return {
        value: [0, 0],
        pressed: false,
        justChanged: false,
        inverts
    };
}

export function updateMappers(
    pad: IParsedGamepad,
    prevPad: IParsedGamepad,
    mappers: { [key: string]: IMapper }
): { [key: string]: IMapper } {
    return mappers;
}
