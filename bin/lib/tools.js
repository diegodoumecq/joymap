'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.noop = noop;
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Lodash function replacements

function noop() {}

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