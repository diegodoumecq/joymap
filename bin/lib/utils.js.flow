/* @flow */
import type {
    IListenOptions, IMappers, IGamepad,
    IButtonState, IButtonStates, IButtonMaps, IButtonIndexes,
    IStickState, IStickStates, IStickMaps, IStickValue, IStickInverts, IStickIndexes
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

export function isButtonSignificant(value: number = 0, threshold: number): boolean {
    return Math.abs(value) > threshold;
}

export function isStickSignificant(stickValue: IStickValue, threshold: number): boolean {
    return stickValue.findIndex(value => Math.abs(value) >= threshold) !== -1;
}

export function getStickValue(stickValue: IStickValue, threshold: number): IStickValue {
    if (!isStickSignificant(stickValue, threshold)) {
        return stickValue.map(() => 0);
    }

    return stickValue;
}

export function getEmptyMappers(
    mappers: IMappers,
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
    buttons: IButtonMaps,
    inputNames: string[]
): IButtonState | IButtonStates {
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
    sticks: IStickMaps,
    inputNames: string[]
): IStickState | IStickStates {
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

export function buttonMap(
    pad: IGamepad,
    prevPad: IGamepad,
    indexes: IButtonIndexes,
    threshold: number
): IButtonState {
    const length = indexes.length;

    let prevPressed = false;
    let value = 0;
    let pressed = false;

    let i = 0;
    while (i < length) {
        if (!prevPressed) {
            const prevValue = prevPad.buttons[indexes[i]] || 0;
            prevPressed = isButtonSignificant(prevValue, threshold);
        }

        const currValue = pad.buttons[indexes[i]] || 0;
        value = Math.max(value, currValue);
        if (!pressed) {
            pressed = isButtonSignificant(currValue, threshold);
        }

        i += 1;
    }

    return {
        value,
        pressed,
        justChanged: pressed !== prevPressed
    };
}

function roundSticks(indexMaps: IStickIndexes, axes: number[], threshold: number): IStickValue {
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
    pad: IGamepad,
    prevPad: IGamepad,
    indexMaps: IStickIndexes,
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

export function updateListenOptions(
    listenOptions: IListenOptions,
    pad: IGamepad,
    threshold: number
) {
    const {
        callback, quantity, type,
        currentValue, targetValue,
        useTimeStamp, consecutive, allowOffset
    } = listenOptions;

    const indexes = type === 'axes' ?
        findIndexes(value => Math.abs(value) > threshold, pad.axes) :
        findIndexes(value => isButtonSignificant(value, threshold), pad.buttons);

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
