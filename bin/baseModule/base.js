'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = createModule;

var _utils = require('../common/utils');

var _baseUtils = require('./baseUtils');

var _baseTypes = require('./baseTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createModule() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var listenOptions = null;
    var gamepadId = params.padId ? params.padId : null;
    var connected = !!params.padId;

    var state = {
        threshold: params.threshold || 0.2,
        clampThreshold: params.clampThreshold !== false,
        pad: _baseUtils.mockGamepad,
        prevPad: _baseUtils.mockGamepad,

        buttons: (0, _baseUtils.getDefaultButtons)(),
        sticks: (0, _baseUtils.getDefaultSticks)()
    };

    var module = {
        getPadId: function getPadId() {
            return gamepadId;
        },
        isConnected: function isConnected() {
            return connected;
        },
        disconnect: function disconnect() {
            connected = false;
        },
        connect: function connect(padId) {
            connected = true;
            if (padId) {
                gamepadId = padId;
            }
        },
        getConfig: function getConfig() {
            return (0, _stringify2.default)({
                threshold: state.threshold,
                clampThreshold: state.clampThreshold,
                buttons: state.buttons,
                sticks: state.sticks
            });
        },
        setConfig: function setConfig(serializedString) {
            (0, _assign2.default)(state, JSON.parse(serializedString));
        },
        getButtonIndexes: function getButtonIndexes() {
            var indexes = [];

            for (var _len = arguments.length, inputNames = Array(_len), _key = 0; _key < _len; _key++) {
                inputNames[_key] = arguments[_key];
            }

            inputNames.forEach(function (inputName) {
                return indexes.push.apply(indexes, (0, _toConsumableArray3.default)(state.buttons[inputName]));
            });
            return indexes;
        },
        getStickIndexes: function getStickIndexes() {
            var indexes = [];

            for (var _len2 = arguments.length, inputNames = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                inputNames[_key2] = arguments[_key2];
            }

            inputNames.forEach(function (inputName) {
                return indexes.push.apply(indexes, (0, _toConsumableArray3.default)(state.sticks[inputName].indexes));
            });
            return indexes;
        },
        setButton: function setButton(inputName, indexes) {
            if (!(0, _utils.nameIsValid)(inputName)) {
                throw new Error('On setButton(\'' + inputName + '\'): argument contains invalid characters');
            }
            state.buttons[inputName] = typeof indexes === 'number' ? [indexes] : indexes;
        },
        setStick: function setStick(inputName, indexes, inverts) {
            if (!(0, _utils.nameIsValid)(inputName)) {
                throw new Error('On setStick(\'' + inputName + '\'): argument contains invalid characters');
            }

            if (indexes.length === 0) {
                throw new Error('On setStick(\'' + inputName + '\', indexes):\n                    argument indexes is an empty array');
            }

            var firstValue = indexes[0];

            if (Array.isArray(firstValue)) {
                state.sticks[inputName] = {
                    indexes: indexes,
                    inverts: inverts || firstValue.map(function () {
                        return false;
                    })
                };
            } else {
                state.sticks[inputName] = {
                    indexes: [indexes],
                    inverts: inverts || indexes.map(function () {
                        return false;
                    })
                };
            }
        },
        invertSticks: function invertSticks(inverts) {
            for (var _len3 = arguments.length, inputNames = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                inputNames[_key3 - 1] = arguments[_key3];
            }

            if (inputNames.length > 0) {
                inputNames.forEach(function (inputName) {
                    var stick = state.sticks[inputName];
                    if (stick.inverts.length === inverts.length) {
                        stick.inverts = inverts;
                    } else {
                        throw new Error('On invertStick(inverts, [..., ' + inputName + ', ...]):\n                            given argument inverts\' length does not match \'' + inputName + '\' axis\' length');
                    }
                });
            }
        },
        swapButtons: function swapButtons(btn1, btn2) {
            var buttons = state.buttons;

            var replacement = buttons[btn1];
            buttons[btn1] = buttons[btn2];
            buttons[btn2] = replacement;
        },
        swapSticks: function swapSticks(btn1, btn2) {
            var includeInverts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var sticks = state.sticks;

            if (includeInverts) {
                var replacement = sticks[btn1];
                sticks[btn1] = sticks[btn2];
                sticks[btn2] = replacement;
            } else {
                var _replacement = sticks[btn1].indexes;
                sticks[btn1].indexes = sticks[btn2].indexes;
                sticks[btn2].indexes = _replacement;
            }
        },
        update: function update(gamepad) {
            state.prevPad = state.pad;
            state.pad = {
                axes: gamepad.axes,
                buttons: gamepad.buttons.map(function (a) {
                    return a.value;
                })
            };

            if (listenOptions) {
                listenOptions = (0, _baseUtils.updateListenOptions)(listenOptions, state.pad, state.threshold);
            }
        },
        cancelListen: function cancelListen() {
            listenOptions = null;
        },
        listenButton: function listenButton(callback) {
            var quantity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

            var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
                _ref$waitFor = _ref.waitFor,
                waitFor = _ref$waitFor === undefined ? [1, 'polls'] : _ref$waitFor,
                _ref$consecutive = _ref.consecutive,
                consecutive = _ref$consecutive === undefined ? false : _ref$consecutive,
                _ref$allowOffset = _ref.allowOffset,
                allowOffset = _ref$allowOffset === undefined ? true : _ref$allowOffset;

            listenOptions = {
                callback: callback,
                quantity: quantity,
                type: 'buttons',
                currentValue: 0,
                useTimeStamp: waitFor[1] === 'ms',
                targetValue: waitFor[0],
                consecutive: consecutive,
                allowOffset: allowOffset
            };
        },
        listenAxis: function listenAxis(callback) {
            var quantity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

            var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
                _ref2$waitFor = _ref2.waitFor,
                waitFor = _ref2$waitFor === undefined ? [100, 'ms'] : _ref2$waitFor,
                _ref2$consecutive = _ref2.consecutive,
                consecutive = _ref2$consecutive === undefined ? true : _ref2$consecutive,
                _ref2$allowOffset = _ref2.allowOffset,
                allowOffset = _ref2$allowOffset === undefined ? true : _ref2$allowOffset;

            listenOptions = {
                callback: callback,
                quantity: quantity,
                type: 'axes',
                currentValue: 0,
                useTimeStamp: waitFor[1] === 'ms',
                targetValue: waitFor[0],
                consecutive: consecutive,
                allowOffset: allowOffset
            };
        },
        buttonBindOnPress: function buttonBindOnPress(inputName, callback) {
            var allowDuplication = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            if (!(0, _utils.nameIsValid)(inputName)) {
                throw new Error('On buttonBindOnPress(\'' + inputName + '\', ...):\n                    first argument contains invalid characters');
            }
            module.listenButton(function (indexes) {
                var findKeyCb = function findKeyCb(value) {
                    return value[0] === indexes[0];
                };
                var resultName = (0, _utils.findKey)(findKeyCb, state.buttons);

                if (!allowDuplication && resultName && state.buttons[inputName]) {
                    module.swapButtons(inputName, resultName);
                } else {
                    module.setButton(inputName, indexes);
                }

                callback(resultName);
            });
        },
        stickBindOnPress: function stickBindOnPress(inputName, callback) {
            var allowDuplication = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            if (!(0, _utils.nameIsValid)(inputName)) {
                throw new Error('On stickBindOnPress(\'' + inputName + '\', ...):\n                    first argument contains invalid characters');
            }

            module.listenAxis(function (indexesResult) {
                var findKeyCb = function findKeyCb(_ref3) {
                    var indexes = _ref3.indexes;
                    return (0, _utils.arraysEqual)(indexes[0], indexesResult);
                };
                var resultName = (0, _utils.findKey)(findKeyCb, state.sticks);

                if (!allowDuplication && resultName && state.sticks[inputName]) {
                    module.swapSticks(inputName, resultName);
                } else {
                    module.setStick(inputName, indexesResult);
                }

                callback(resultName);
            });
        },
        destroy: function destroy() {
            module.disconnect();
            state.pad = {
                buttons: [],
                axes: []
            };
            state.prevPad = {
                buttons: [],
                axes: []
            };
        }
    };

    return { module: module, state: state };
}