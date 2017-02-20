import { mapValues } from '../common/utils';

import type {
    IStickState, IStickStates,
    IButtonState, IButtonStates, IButtonMaps, IStickMaps
} from '../common/types';

import type { IMappers } from './queryTypes';

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
