import {
    isButtonSignificant, isStickSignificant, mapValues
} from '../tools';

import type {
    IStickState, IStickStates, IStickIndexes,
    IStickValue, IStickInverts,
    IButtonState, IButtonStates, IButtonIndexes,
    IGamepad,
    IMappers, IButtonMaps, IStickMaps
} from '../types';

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

export function roundSticks(indexMaps: IStickIndexes, axes: number[], threshold: number): IStickValue {
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
