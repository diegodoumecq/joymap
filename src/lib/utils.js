/* @flow */
import type {
    IStickAlias, IButtonAlias,
    IStickBinding, IButtonBinding,
    IParsedGamepad, IListenOptions,
    IButtonValue, IStickValue,
    IButton, IStick,
    IPlayerState
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

export const defaultButtonBindings: { [key: string]: IButtonBinding } =
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
export const defaultStickBindings: { [key: string]: IStickBinding } =
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

export function nameIsValid(name: string) {
    return /^[a-z0-9]+$/i.test(name);
}

export function getDefaultBindings() {
    return {
        buttonBindings: defaultButtonBindings,
        stickBindings: defaultStickBindings,
        buttons: mapValues(() => ({
            value: 0,
            pressed: false,
            justChanged: false
        }), defaultButtonBindings),
        sticks: mapValues(() => ({
            value: [0, 0],
            pressed: false,
            justChanged: false,
            inverts: [false, false]
        }), defaultStickBindings)
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
type IButtonAliases = { [key: string]: IButtonAlias };
export function updateButtonAliases(
    state: IPlayerState,
    threshold: number
): IButtonAliases {
    // When an alias has more than 1 button assigned to it, use for reference the one that's pressed the most
    return mapValues((alias: IButtonAlias) => {
        let value = 0;

        alias.inputs.forEach(aliasName => {
            if (state.buttons[aliasName].value > value) {
                value = state.buttons[aliasName].value;
            }
        });

        value = getButtonValue(value, threshold);
        const pressed = isButtonSignificant(value, threshold);

        return {
            pressed,
            justChanged: pressed !== isButtonSignificant(alias.value, threshold),
            value,
            inputs: alias.inputs
        };
    }, state.buttonAliases);
}

export function updateStickAliases(
    state: IPlayerState,
    threshold: number
): { [key: string]: IStickAlias } {
    // When an alias has more than 1 stick assigned to it, do an average
    return mapValues((alias: IStickAlias) => {
        let counts = [];
        let count = 0;

        alias.inputs.forEach(aliasName => {
            if (state.sticks[aliasName].pressed) {
                counts = state.sticks[aliasName].value.map((v, i) => v + (counts[i] || 0));
                count += 1;
            }
        });

        const value = count === 0 ?
            state.sticks[alias.inputs[0]].value.map(() => 0) :
            counts.map(v => v / count);
        const pressed = isStickSignificant(value, threshold);

        return {
            pressed,
            justChanged: pressed !== isStickSignificant(alias.value, threshold),
            value,
            inputs: alias.inputs
        };
    }, state.stickAliases);
}

export function updateStick(
    state: IPlayerState,
    threshold: number,
    clampThreshold: boolean
): { [key: string]: IStick } {
    return mapValues((binding: IStickBinding, inputName: string) => {
        const previous: IStick = state.sticks[inputName];
        const value: IStickValue = binding.mapper(state.parsedGamepad, previous.inverts);
        const pressed = isStickSignificant(value, threshold);

        return {
            pressed,
            justChanged: pressed !== isStickSignificant(previous.value, threshold),
            value: clampThreshold ? value : getStickValue(value, threshold),
            inverts: previous.inverts
        };
    }, state.stickBindings);
}

export function parseGamepad(
    gamepad: Gamepad,
    prevGamepad: IParsedGamepad,
    threshold: number,
    clampThreshold: boolean
): IParsedGamepad {
    return {
        buttons: gamepad.buttons.map((button: { value: number }, index: number) => {
            const previous: IButton = prevGamepad.buttons[index];
            const value = clampThreshold ? getButtonValue(button.value, threshold) : button.value;
            const pressed = isButtonSignificant(value, threshold);

            return {
                pressed,
                justChanged: pressed !== (previous ? isButtonSignificant(previous.value, threshold) : false),
                value
            };
        }),
        axes: gamepad.axes
    };
}

export function updateButtons(
    buttonBindings: IButtonBindings,
    parsedGamepad: IParsedGamepad
): { [key: string]: IButton } {
    return mapValues(({ mapper }: IButtonBinding) => mapper(parsedGamepad), buttonBindings);
}
