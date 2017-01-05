/* @flow */
import { assign, mapValues } from 'lodash/fp';

import type {
    IStickAlias, IButtonAlias,
    IStickBinding, IButtonBinding
} from './types';

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

export function makeButtonMapper(index: number): IButtonBinding {
    return {
        index,
        mapper: pad => pad.buttons[index]
    };
}

export const buttonsMap: { [key: string]: IButtonBinding } =
    assign(mapValues(value => makeButtonMapper(value), buttonIndexMapping), mockButtons);

export function addButtonAlias(alias: ?IButtonAlias, inputs: string[]) {
    if (!alias) {
        return {
            inputs,
            value: 0,
            pressed: false,
            justChanged: false
        };
    }

    return assign(alias, {
        inputs: [...alias.inputs, ...inputs]
    });
}

export const stickIndexMapping = {
    L: 0,
    R: 2
};

export function makeStickMapper(index: number): IStickBinding {
    return {
        index,
        mapper: (pad, invertX = false, invertY = false) => ({
            x: !invertX ? pad.axes[index] : -1 * pad.axes[index],
            y: !invertY ? pad.axes[index + 1] : -1 * pad.axes[index + 1]
        })
    };
}
export const sticksMap: { [key: string]: IStickBinding } =
    mapValues(value => makeStickMapper(value), stickIndexMapping);

export function addStickAlias(alias: ?IStickAlias, inputs: string[]) {
    if (!alias) {
        return {
            inputs,
            value: { x: 0, y: 0 },
            pressed: false,
            justChanged: false
        };
    }

    return assign(alias, {
        inputs: [...alias.inputs, ...inputs]
    });
}
