'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.stickBindings = exports.stickIndexMapping = exports.buttonBindings = exports.buttonIndexMapping = undefined;

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.makeButtonBinding = makeButtonBinding;
exports.addButtonAlias = addButtonAlias;
exports.makeStickBinding = makeStickBinding;
exports.addStickAlias = addStickAlias;
exports.getRawGamepads = getRawGamepads;
exports.updateListenOptions = updateListenOptions;
exports.nameIsValid = nameIsValid;

var _tools = require('./tools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buttonIndexMapping = exports.buttonIndexMapping = {
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

var mockButtons = {
    home: {
        index: -1,
        mapper: function mapper() {
            return 0;
        }
    }
};

function makeButtonBinding(index) {
    return {
        index: index,
        mapper: function mapper(pad) {
            return pad.buttons[index];
        }
    };
}

var buttonBindings = exports.buttonBindings = (0, _assign2.default)((0, _tools.mapValues)(function (value) {
    return makeButtonBinding(value);
}, buttonIndexMapping), mockButtons);

function addButtonAlias(alias, inputs) {
    if (!alias) {
        return {
            inputs: inputs,
            value: 0,
            pressed: false,
            justChanged: false
        };
    }

    return (0, _assign2.default)({}, alias, {
        inputs: [].concat((0, _toConsumableArray3.default)(alias.inputs), (0, _toConsumableArray3.default)(inputs))
    });
}

var stickIndexMapping = exports.stickIndexMapping = {
    L: [0, 1],
    R: [2, 3]
};

function makeStickBinding() {
    for (var _len = arguments.length, indexes = Array(_len), _key = 0; _key < _len; _key++) {
        indexes[_key] = arguments[_key];
    }

    return {
        indexes: indexes,
        mapper: function mapper(pad, inverts) {
            return indexes.map(function (value, i) {
                return !inverts[i] ? pad.axes[value] : pad.axes[value] * -1;
            });
        }
    };
}
var stickBindings = exports.stickBindings = (0, _tools.mapValues)(function (values) {
    return makeStickBinding.apply(undefined, (0, _toConsumableArray3.default)(values));
}, stickIndexMapping);

function addStickAlias(alias, inputs) {
    if (!alias) {
        return {
            inputs: inputs,
            value: [0, 0],
            pressed: false,
            justChanged: false
        };
    }

    return (0, _assign2.default)({}, alias, {
        inputs: [].concat((0, _toConsumableArray3.default)(alias.inputs), (0, _toConsumableArray3.default)(inputs))
    });
}

function getRawGamepads() {
    if (navigator && navigator.getGamepads) {
        return (0, _from2.default)(navigator.getGamepads());
    }
    return [];
}

function updateListenOptions(listenOptions, parsedGamepad, threshold) {
    if (!listenOptions) {
        return null;
    }

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
    }, parsedGamepad.axes) : (0, _tools.findIndexes)(function (_ref) {
        var pressed = _ref.pressed,
            justChanged = _ref.justChanged;
        return pressed && (currentValue !== 0 || justChanged);
    }, parsedGamepad.buttons);

    if (indexes.length === quantity && (!consecutive || (0, _tools.isConsecutive)(indexes)) && (allowOffset || indexes[0] % quantity === 0)) {
        if (useTimeStamp && currentValue === 0) {
            return (0, _assign2.default)({}, listenOptions, { currentValue: Date.now() });
        }

        var comparison = useTimeStamp ? Date.now() - currentValue : currentValue + 1;

        if (targetValue <= comparison) {
            callback.apply(undefined, (0, _toConsumableArray3.default)(indexes));
            return null;
        }

        if (!useTimeStamp) {
            return (0, _assign2.default)({}, listenOptions, { currentValue: comparison });
        }

        return listenOptions;
    }

    // Clean currentValue
    return (0, _assign2.default)({}, listenOptions, { currentValue: 0 });
}

function nameIsValid(name) {
    return (/^[a-z0-9]+$/i.test(name)
    );
}