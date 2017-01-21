/* @flow */
import type {
    IParsedGamepad, IListenOptions,
    IButtonValue, IStickValue, IStickInverts,
    IButtonState, IStickState, IButton, IStick
} from '../types';

import {
    findIndexes, isConsecutive, mapValues
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
        select: [8],
        home: [16]
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

export function isStickSignificant(stickValues: IStickValue, threshold: number): boolean {
    return stickValues.findIndex(value => Math.abs(value) >= threshold) !== -1;
}

export function getStickValue(stickValues: IStickValue, threshold: number): IStickValue {
    if (!isStickSignificant(stickValues, threshold)) {
        return stickValues.map(() => 0);
    }

    return stickValues;
}

export function getEmptyMappers(
    mappers: { [key: string]: Function },
    mapperNames: string[]
): null | { [index: string]: null } {
    const emptyMapper = null;

    if (mapperNames.length === 0) {
        return mapValues(() => emptyMapper, mappers);
    }

    if (mapperNames.length === 1) {
        return emptyMapper;
    }

    const result = {};
    mapperNames.forEach(mapperName => {
        result[mapperName] = emptyMapper;
    });

    return result;
}

export function getEmptyButtons(
    buttons: { [key: string]: IButton },
    inputNames: string[]
): IButtonState | { [index: string]: IButtonState } {
    const emptyButton: IButtonState = {
        value: 0,
        pressed: false,
        justChanged: false
    };

    if (inputNames.length === 0) {
        return mapValues(() => emptyButton, buttons);
    }

    if (inputNames.length === 1) {
        return emptyButton;
    }

    const result = {};
    inputNames.forEach(mapperName => {
        result[mapperName] = emptyButton;
    });

    return result;
}

export function getEmptySticks(
    sticks: { [key: string]: IStick },
    inputNames: string[]
): IStickState | { [index: string]: IStickState } {
    const emptyStick: IStickState = {
        value: [0, 0],
        pressed: false,
        justChanged: false,
        inverts: [false, false]
    };

    if (inputNames.length === 0) {
        return mapValues(() => emptyStick, sticks);
    }

    if (inputNames.length === 1) {
        return emptyStick;
    }

    const result = {};
    inputNames.forEach(mapperName => {
        result[mapperName] = emptyStick;
    });

    return result;
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
            const pressed = isButtonSignificant(button.value, threshold);

            return {
                pressed,
                justChanged: pressed !== (previous ? isButtonSignificant(previous.value, threshold) : false),
                value: clampThreshold && !pressed ? 0 : button.value
            };
        }),
        axes: pad.axes
    };
}

export function buttonMap(
    pad: IParsedGamepad,
    prevPad: IParsedGamepad,
    indexes: number[]
): IButtonState {
    const length = indexes.length;

    let prevPressed = false;
    let value = 0;
    let pressed = false;

    let i = 0;
    while (i < length) {
        const prevValue = prevPad.buttons[indexes[i]];
        if (!prevPressed) {
            prevPressed = !!prevValue && prevValue.pressed;
        }
        const padButton = pad.buttons[indexes[i]];
        value = Math.max(value, !padButton ? 0 : padButton.value);
        pressed = pressed || (!!padButton && padButton.pressed);
        i += 1;
    }

    return {
        value,
        pressed,
        justChanged: pressed !== prevPressed
    };
}

function roundSticks(indexMaps: IStickValue[], axes: number[], threshold: number): IStickValue {
    let count = 0;
    let counts = [];

    indexMaps.forEach(indexes => {
        const values = indexes.map(i => axes[i]);

        if (isStickSignificant(values, threshold)) {
            counts = values.map((v, i) => v + (counts[i] || 0));
            count += 1;
        }
    });

    return count === 0 ? indexMaps[0].map(() => 0) : counts.map(v => v / count);
}

export function stickMap(
    pad: IParsedGamepad,
    prevPad: IParsedGamepad,
    indexMaps: IStickValue[],
    inverts: IStickInverts,
    threshold: number
): IStickState {
    const prevPressed = isStickSignificant(roundSticks(indexMaps, prevPad.axes, threshold), threshold);
    const value = roundSticks(indexMaps, pad.axes, threshold).map((v, i) => (!inverts[i] ? v : v * -1));
    const pressed = isStickSignificant(value, threshold);

    return {
        value,
        pressed,
        justChanged: pressed !== prevPressed,
        inverts
    };
}
