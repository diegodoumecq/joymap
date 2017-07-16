
import {
    isButtonSignificant, findIndexes, isConsecutive,
    assignIn
} from '../common/utils';

export const mockGamepad = {
    axes: [],
    buttons: []
};

export function updateListenOptions(listenOptions, pad, threshold) {
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
            return assignIn(listenOptions, { currentValue: Date.now() });
        }

        const comparison = useTimeStamp ? Date.now() - currentValue : currentValue + 1;

        if (targetValue <= comparison) {
            if (type === 'axes') {
                callback([indexes]);
            } else {
                callback(indexes);
            }
            return null;
        }

        if (!useTimeStamp) {
            return assignIn(listenOptions, { currentValue: comparison });
        }

        return listenOptions;
    }

    // Clean currentValue
    return assignIn(listenOptions, { currentValue: 0 });
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
