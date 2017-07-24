
import { mapValues, forEach } from 'lodash/fp';

export function getEmptyMappers(mappers, mapperNames) {
    const emptyMapper = null;

    if (mapperNames.length === 0) {
        return mapValues(() => emptyMapper, mappers);
    }

    if (mapperNames.length === 1) {
        return emptyMapper;
    }

    const result = {};
    forEach(mapperName => {
        result[mapperName] = emptyMapper;
    }, mapperNames);

    return result;
}

export function getEmptyButtons(buttons, inputNames) {
    const emptyButton = {
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
    forEach(mapperName => {
        result[mapperName] = emptyButton;
    }, inputNames);

    return result;
}

export function getEmptySticks(sticks, inputNames) {
    const emptyStick = {
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
    forEach(mapperName => {
        result[mapperName] = emptyStick;
    }, inputNames);

    return result;
}
