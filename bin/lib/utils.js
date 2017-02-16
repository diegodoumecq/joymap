'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

exports.getRawGamepads = getRawGamepads;
exports.nameIsValid = nameIsValid;
exports.getDefaultButtons = getDefaultButtons;
exports.getDefaultSticks = getDefaultSticks;
exports.isButtonSignificant = isButtonSignificant;
exports.isStickSignificant = isStickSignificant;
exports.getStickValue = getStickValue;
exports.getEmptyMappers = getEmptyMappers;
exports.getEmptyButtons = getEmptyButtons;
exports.getEmptySticks = getEmptySticks;
exports.buttonMap = buttonMap;
exports.stickMap = stickMap;
exports.updateListenOptions = updateListenOptions;

var _tools = require('./tools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRawGamepads() {
    if (navigator && navigator.getGamepads) {
        return (0, _from2.default)(navigator.getGamepads());
    }
    return [];
}

function nameIsValid(name) {
    return (/^[a-z0-9]+$/i.test(name)
    );
}

function getDefaultButtons() {
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

function getDefaultSticks() {
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

function isButtonSignificant() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var threshold = arguments[1];

    return Math.abs(value) > threshold;
}

function isStickSignificant(stickValue, threshold) {
    return stickValue.findIndex(function (value) {
        return Math.abs(value) >= threshold;
    }) !== -1;
}

function getStickValue(stickValue, threshold) {
    if (!isStickSignificant(stickValue, threshold)) {
        return stickValue.map(function () {
            return 0;
        });
    }

    return stickValue;
}

function getEmptyMappers(mappers, mapperNames) {
    var emptyMapper = null;

    if (mapperNames.length === 0) {
        return (0, _tools.mapValues)(function () {
            return emptyMapper;
        }, mappers);
    }

    if (mapperNames.length === 1) {
        return emptyMapper;
    }

    var result = {};
    mapperNames.forEach(function (mapperName) {
        result[mapperName] = emptyMapper;
    });

    return result;
}

function getEmptyButtons(buttons, inputNames) {
    var emptyButton = {
        value: 0,
        pressed: false,
        justChanged: false
    };

    if (inputNames.length === 0) {
        return (0, _tools.mapValues)(function () {
            return emptyButton;
        }, buttons);
    }

    if (inputNames.length === 1) {
        return emptyButton;
    }

    var result = {};
    inputNames.forEach(function (mapperName) {
        result[mapperName] = emptyButton;
    });

    return result;
}

function getEmptySticks(sticks, inputNames) {
    var emptyStick = {
        value: [0, 0],
        pressed: false,
        justChanged: false,
        inverts: [false, false]
    };

    if (inputNames.length === 0) {
        return (0, _tools.mapValues)(function () {
            return emptyStick;
        }, sticks);
    }

    if (inputNames.length === 1) {
        return emptyStick;
    }

    var result = {};
    inputNames.forEach(function (mapperName) {
        result[mapperName] = emptyStick;
    });

    return result;
}

function buttonMap(pad, prevPad, indexes, threshold) {
    var length = indexes.length;

    var prevPressed = false;
    var value = 0;
    var pressed = false;

    var i = 0;
    while (i < length) {
        if (!prevPressed) {
            var prevValue = prevPad.buttons[indexes[i]] || 0;
            prevPressed = isButtonSignificant(prevValue, threshold);
        }

        var currValue = pad.buttons[indexes[i]] || 0;
        value = Math.max(value, currValue);
        if (!pressed) {
            pressed = isButtonSignificant(currValue, threshold);
        }

        i += 1;
    }

    return {
        value: value,
        pressed: pressed,
        justChanged: pressed !== prevPressed
    };
}

function roundSticks(indexMaps, axes, threshold) {
    var count = 0;
    var counts = [];

    indexMaps.forEach(function (indexes) {
        var values = indexes.map(function (i) {
            return axes[i];
        });

        if (isStickSignificant(values, threshold)) {
            counts = values.map(function (v, i) {
                return v + (counts[i] || 0);
            });
            count += 1;
        }
    });

    return count === 0 ? indexMaps[0].map(function () {
        return 0;
    }) : counts.map(function (v) {
        return v / count;
    });
}

function stickMap(pad, prevPad, indexMaps, inverts, threshold) {
    var prevPressed = isStickSignificant(roundSticks(indexMaps, prevPad.axes, threshold), threshold);
    var value = roundSticks(indexMaps, pad.axes, threshold).map(function (v, i) {
        return !inverts[i] ? v : v * -1;
    });
    var pressed = isStickSignificant(value, threshold);

    return {
        value: value,
        pressed: pressed,
        justChanged: pressed !== prevPressed,
        inverts: inverts
    };
}

function updateListenOptions(listenOptions, pad, threshold) {
    var callback = listenOptions.callback,
        quantity = listenOptions.quantity,
        type = listenOptions.type,
        currentValue = listenOptions.currentValue,
        targetValue = listenOptions.targetValue,
        useTimeStamp = listenOptions.useTimeStamp,
        consecutive = listenOptions.consecutive,
        allowOffset = listenOptions.allowOffset;


    var indexes = type === 'axes' ? (0, _tools.findIndexes)(function (value) {
        return Math.abs(value) > threshold;
    }, pad.axes) : (0, _tools.findIndexes)(function (value) {
        return isButtonSignificant(value, threshold);
    }, pad.buttons);

    if (indexes.length === quantity && (!consecutive || (0, _tools.isConsecutive)(indexes)) && (allowOffset || indexes[0] % quantity === 0)) {
        if (useTimeStamp && currentValue === 0) {
            return (0, _assign2.default)({}, listenOptions, { currentValue: Date.now() });
        }

        var comparison = useTimeStamp ? Date.now() - currentValue : currentValue + 1;

        if (targetValue <= comparison) {
            callback(indexes);
            return null;
        }

        if (!useTimeStamp) {
            return (0, _assign2.default)({}, listenOptions, { currentValue: comparison });
        }

        return listenOptions;
    }

    return (0, _assign2.default)({}, listenOptions, { currentValue: 0 });
}