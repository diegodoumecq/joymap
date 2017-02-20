'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.noop = noop;
exports.arraysEqual = arraysEqual;
exports.map = map;
exports.isFunction = isFunction;
exports.includes = includes;
exports.difference = difference;
exports.omit = omit;
exports.unique = unique;
exports.isConsecutive = isConsecutive;
exports.findIndexes = findIndexes;
exports.mapValues = mapValues;
exports.matches = matches;
exports.find = find;
exports.findIndex = findIndex;
exports.findKey = findKey;
exports.getRawGamepads = getRawGamepads;
exports.nameIsValid = nameIsValid;
exports.isButtonSignificant = isButtonSignificant;
exports.isStickSignificant = isStickSignificant;
exports.buttonMap = buttonMap;
exports.roundSticks = roundSticks;
exports.stickMap = stickMap;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function noop() {}

function arraysEqual(a, b) {
    if (a === b) {
        return true;
    }

    var length = a.length;
    if (length !== b.length) {
        return false;
    }

    var i = 0;
    while (i < length) {
        if (a[i] !== b[i]) {
            return false;
        }
        i += 1;
    }
    return true;
}

function map() {
    var attr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var target = arguments[1];

    if (Array.isArray(target)) {
        return target.map(function (value) {
            return value[attr];
        });
    }

    var indexes = (0, _keys2.default)(target);
    var length = indexes.length;
    var result = [];
    var i = 0;
    while (i < length) {
        var _index = indexes[i];
        result.push(target[_index][attr]);
        i += 1;
    }

    return result;
}

function isFunction(value) {
    return typeof value === 'function';
}

function includes(search) {
    var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    return list.indexOf(search) !== -1;
}

function difference(source, removal) {
    var length = source.length;
    var result = [];
    var i = 0;

    while (i < length) {
        if (!includes(source[i], removal)) {
            result.push(source[i]);
        }
        i += 1;
    }

    return result;
}

function omit(indexes, target) {
    var length = indexes.length;
    var result = (0, _assign2.default)({}, target);
    var i = 0;

    while (i < length) {
        delete result[indexes[i]];
        i += 1;
    }

    return result;
}

function unique(target) {
    var length = target.length;

    if (length <= 1) {
        return target;
    }

    var result = [];
    var i = 0;
    while (i < length) {
        if (!result.includes(target[i])) {
            result.push(target[i]);
        }
        i += 1;
    }

    return result;
}

function isConsecutive(target) {
    var length = target.length;

    if (length <= 1) {
        return true;
    }

    var i = 0;
    while (i < length - 1) {
        if (target[i] + 1 !== target[i + 1]) {
            return false;
        }
        i += 1;
    }

    return true;
}

function findIndexes(iterator, target) {
    var length = target.length;
    var result = [];
    var i = 0;

    while (i < length) {
        if (iterator(target[i], i)) {
            result.push(i);
        }
        i += 1;
    }

    return result;
}

function mapValues(iterator, obj) {
    var result = {};
    (0, _keys2.default)(obj).forEach(function (name) {
        result[name] = iterator(obj[name], name);
    });
    return result;
}

function matches(comparison, source) {
    var match = (0, _keys2.default)(comparison).map(function (name) {
        return [comparison[name], name];
    });
    var length = match.length;
    var i = 0;

    while (i < length) {
        var _match$i = (0, _slicedToArray3.default)(match[i], 2),
            _value = _match$i[0],
            _index2 = _match$i[1];

        if (source[_index2] !== _value) {
            return false;
        }
        i += 1;
    }

    return true;
}

function find(search, target) {
    var length = target.length;
    var i = 0;

    while (i < length) {
        var _value2 = target[i];
        if (matches(search, _value2)) {
            return _value2;
        }
        i += 1;
    }

    return null;
}

function findIndex(search, target) {
    var length = target.length;
    var i = 0;

    while (i < length) {
        if (matches(search, target[i])) {
            return i;
        }
        i += 1;
    }

    return -1;
}

function findKey(search, target) {
    var targetIndexes = (0, _keys2.default)(target);
    var length = targetIndexes.length;
    var i = 0;
    if (typeof search === 'function') {
        while (i < length) {
            var _index3 = targetIndexes[i];
            if (search(target[_index3], _index3)) {
                return _index3;
            }
            i += 1;
        }
    } else {
        while (i < length) {
            var _index4 = targetIndexes[i];
            if (matches(search, target[_index4])) {
                return _index4;
            }
            i += 1;
        }
    }

    return null;
}

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