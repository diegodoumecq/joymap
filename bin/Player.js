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

exports.default = createPlayer;

var _fastMemoize = require('fast-memoize');

var _fastMemoize2 = _interopRequireDefault(_fastMemoize);

var _utils = require('./lib/utils');

var _tools = require('./lib/tools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createPlayer() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var listenOptions = null;
    var gamepadId = params.padId ? params.padId : null;
    var connected = !!params.padId;

    var state = {
        threshold: params.threshold || 0.2,
        clampThreshold: params.clampThreshold !== false,
        memoize: params.memoize !== false,
        pad: {
            buttons: [],
            axes: []
        },
        prevPad: {
            buttons: [],
            axes: []
        },

        buttonMap: params.memoize ? (0, _fastMemoize2.default)(_utils.buttonMap) : _utils.buttonMap,
        stickMap: params.memoize ? (0, _fastMemoize2.default)(_utils.stickMap) : _utils.stickMap,

        buttons: (0, _utils.getDefaultButtons)(),
        sticks: (0, _utils.getDefaultSticks)(),
        mappers: {}
    };

    var player = {
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


        getParsedGamepad: function getParsedGamepad() {
            return state.pad;
        },

        getButtons: function getButtons() {
            for (var _len = arguments.length, inputNames = Array(_len), _key = 0; _key < _len; _key++) {
                inputNames[_key] = arguments[_key];
            }

            if (!connected) {
                return (0, _utils.getEmptyButtons)(state.buttons, inputNames);
            }

            if (inputNames.length === 0) {
                return (0, _tools.mapValues)(function (button) {
                    return state.buttonMap(state.pad, state.prevPad, button);
                }, state.buttons);
            }

            if (inputNames.length === 1) {
                return state.buttonMap(state.pad, state.prevPad, state.buttons[inputNames[0]]);
            }

            var result = {};
            inputNames.forEach(function (inputName) {
                result[inputName] = state.buttonMap(state.pad, state.prevPad, state.buttons[inputName]);
            });

            return result;
        },
        getSticks: function getSticks() {
            for (var _len2 = arguments.length, inputNames = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                inputNames[_key2] = arguments[_key2];
            }

            if (!connected) {
                return (0, _utils.getEmptySticks)(state.sticks, inputNames);
            }

            if (inputNames.length === 0) {
                return (0, _tools.mapValues)(function (stick) {
                    var indexes = stick.indexes,
                        inverts = stick.inverts;

                    return state.stickMap(state.pad, state.prevPad, indexes, inverts, state.threshold);
                }, state.sticks);
            }

            if (inputNames.length === 1) {
                var _state$sticks$inputNa = state.sticks[inputNames[0]],
                    _indexes = _state$sticks$inputNa.indexes,
                    inverts = _state$sticks$inputNa.inverts;

                return state.stickMap(state.pad, state.prevPad, _indexes, inverts, state.threshold);
            }

            var result = {};
            inputNames.forEach(function (inputName) {
                var _state$sticks$inputNa2 = state.sticks[inputName],
                    indexes = _state$sticks$inputNa2.indexes,
                    inverts = _state$sticks$inputNa2.inverts;

                result[inputName] = state.stickMap(state.pad, state.prevPad, indexes, inverts, state.threshold);
            });

            return result;
        },
        getMappers: function getMappers() {
            for (var _len3 = arguments.length, mapperNames = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                mapperNames[_key3] = arguments[_key3];
            }

            if (!connected) {
                return (0, _utils.getEmptyMappers)(state.mappers, mapperNames);
            }

            if (mapperNames.length === 0) {
                return (0, _tools.mapValues)(function (mapper) {
                    return mapper({
                        pad: state.pad,
                        prevPad: state.prevPad,
                        player: player
                    });
                }, state.mappers);
            }

            if (mapperNames.length === 1) {
                return state.mappers[mapperNames[0]]({
                    pad: state.pad,
                    prevPad: state.prevPad,
                    player: player
                });
            }

            var result = {};
            mapperNames.forEach(function (mapperName) {
                result[mapperName] = state.mappers[mapperName]({
                    pad: state.pad,
                    prevPad: state.prevPad,
                    player: player
                });
            });

            return result;
        },
        getButtonIndexes: function getButtonIndexes() {
            var indexes = [];

            for (var _len4 = arguments.length, inputNames = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                inputNames[_key4] = arguments[_key4];
            }

            inputNames.forEach(function (inputName) {
                return indexes.push.apply(indexes, (0, _toConsumableArray3.default)(state.buttons[inputName]));
            });
            return indexes;
        },
        getStickIndexes: function getStickIndexes() {
            var indexes = [];

            for (var _len5 = arguments.length, inputNames = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                inputNames[_key5] = arguments[_key5];
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
        setMapper: function setMapper(mapperName, callback) {
            if (!(0, _utils.nameIsValid)(mapperName)) {
                throw new Error('On setMapper(\'' + mapperName + '\', ...):\n                    first argument contains invalid characters');
            }
            state.mappers[mapperName] = state.memoize ? (0, _fastMemoize2.default)(callback) : callback;
        },
        invertSticks: function invertSticks(inverts) {
            for (var _len6 = arguments.length, inputNames = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
                inputNames[_key6 - 1] = arguments[_key6];
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
        removeMapper: function removeMapper(mapperName) {
            state.mappers = (0, _tools.omit)([mapperName], state.mappers);
        },
        clearMappers: function clearMappers() {
            state.mappers = {};
        },
        update: function update(gamepad) {
            state.prevPad = state.pad;
            state.pad = (0, _utils.parseGamepad)(gamepad, state.prevPad, state.threshold, state.clampThreshold);

            listenOptions = (0, _utils.updateListenOptions)(listenOptions, state.pad, state.threshold);
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
            player.listenButton(function (indexes) {
                var findKeyCb = function findKeyCb(value) {
                    return value[0] === indexes[0];
                };
                var resultName = (0, _tools.findKey)(findKeyCb, state.buttons);

                if (!allowDuplication && resultName && state.buttons[inputName]) {
                    player.swapButtons(inputName, resultName);
                } else {
                    player.setButton(inputName, indexes);
                }

                callback(resultName);
            });
        },
        stickBindOnPress: function stickBindOnPress(inputName, callback) {
            var allowDuplication = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            if (!(0, _utils.nameIsValid)(inputName)) {
                throw new Error('On stickBindOnPress(\'' + inputName + '\', ...):\n                    first argument contains invalid characters');
            }

            player.listenAxis(function (indexesResult) {
                var findKeyCb = function findKeyCb(_ref3) {
                    var indexes = _ref3.indexes;
                    return (0, _tools.arraysEqual)(indexes[0], indexesResult);
                };
                var resultName = (0, _tools.findKey)(findKeyCb, state.sticks);

                if (!allowDuplication && resultName && state.sticks[inputName]) {
                    player.swapSticks(inputName, resultName);
                } else {
                    player.setStick(inputName, indexesResult);
                }

                callback(resultName);
            });
        },
        destroy: function destroy() {
            player.disconnect();
            state.pad = {
                buttons: [],
                axes: []
            };
            state.prevPad = {
                buttons: [],
                axes: []
            };
            player.clearMappers();
        }
    };

    return player;
}