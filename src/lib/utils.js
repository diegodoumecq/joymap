/* @flow */
import type {
    IStickAlias, IButtonAlias,
    IStickBinding, IButtonBinding,
    IParsedGamepad, IListenOptions
} from '../types';

import {
    mapValues, findIndexes, isConsecutive
} from './tools';

export const buttonIndexMapping = {
    dpadUp: 12,
    dpadDown: 13,
    dpadLeft: 14,
    dpadRight: 15,
    L1: 4,
    L2: 6,
    L3: 10,
    R1: 5,
    R2: 7,
    R3: 11,
    A: 0,
    B: 1,
    X: 2,
    Y: 3,
    start: 9,
    select: 8
};

const mockButtons = {
    home: {
        index: -1,
        mapper: () => 0
    }
};

export function makeButtonBinding(index: number): IButtonBinding {
    return {
        index,
        mapper: pad => pad.buttons[index]
    };
}

export const buttonBindings: { [key: string]: IButtonBinding } =
    Object.assign(mapValues(value => makeButtonBinding(value), buttonIndexMapping), mockButtons);

export function addButtonAlias(alias: ?IButtonAlias, inputs: string[]) {
    if (!alias) {
        return {
            inputs,
            value: 0,
            pressed: false,
            justChanged: false
        };
    }

    return Object.assign({}, alias, {
        inputs: [...alias.inputs, ...inputs]
    });
}

export const stickIndexMapping = {
    L: [0, 1],
    R: [2, 3]
};

export function makeStickBinding(...indexes: number[]): IStickBinding {
    return {
        indexes,
        mapper: (pad, inverts) => indexes.map((value, i) => (
            !inverts[i] ? pad.axes[value] : pad.axes[value] * -1
        ))
    };
}
export const stickBindings: { [key: string]: IStickBinding } =
    mapValues(values => makeStickBinding(...values), stickIndexMapping);

export function addStickAlias(alias: ?IStickAlias, inputs: string[]) {
    if (!alias) {
        return {
            inputs,
            value: [0, 0],
            pressed: false,
            justChanged: false
        };
    }

    return Object.assign({}, alias, {
        inputs: [...alias.inputs, ...inputs]
    });
}

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
            callback(...indexes);
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
