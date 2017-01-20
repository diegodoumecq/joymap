'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createPlayer;

var _utils = require('./lib/utils');

var _tools = require('./lib/tools');

function createPlayer() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        name = _ref.name,
        _ref$threshold = _ref.threshold,
        threshold = _ref$threshold === undefined ? 0.3 : _ref$threshold,
        _ref$clampThreshold = _ref.clampThreshold,
        clampThreshold = _ref$clampThreshold === undefined ? true : _ref$clampThreshold;

    var listenOptions = null;

    var state = {
        name: name,
        pad: {
            buttons: [],
            axes: []
        },
        prevPad: {
            buttons: [],
            axes: []
        },
        mappers: {},
        mappersOnPoll: {},
        gamepadId: null,
        connected: false,
        buttons: (0, _utils.getDefaultButtons)(),
        sticks: (0, _utils.getDefaultSticks)()
    };

    var player = {
        getName: function getName() {
            return state.name;
        },
        getGamepadId: function getGamepadId() {
            return state.gamepadId;
        },
        isConnected: function isConnected() {
            return state.connected;
        },

        getParsedGamepad: function getParsedGamepad() {
            return state.pad;
        },

        setMapper: function setMapper(mapperName, callback) {
            var mapOnPoll = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            if (!(0, _utils.nameIsValid)(mapperName)) {
                throw new Error('On setMapper(\'' + mapperName + '\', ...):\n                    first argument contains invalid characters');
            }
            if (!mapOnPoll) {
                state.mappers[mapperName] = callback;
            } else {
                state.mappersOnPoll[mapperName] = { callback: callback, value: null };
            }
        },
        removeMapper: function removeMapper(mapperName) {
            state.mappersOnPoll = (0, _tools.omit)([mapperName], state.mappersOnPoll);
            state.mappers = (0, _tools.omit)([mapperName], state.mappers);
        },
        clearMappers: function clearMappers() {
            state.mappersOnPoll = {};
            state.mappers = {};
        },
        mapper: function mapper(mapperName) {
            if (state.mappersOnPoll[mapperName]) {
                return state.mappersOnPoll[mapperName].value;
            }

            return state.mappers[mapperName]({
                pad: state.pad,
                prevPad: state.prevPad,
                player: player
            });
        },
        button: function button(inputName) {
            return (0, _utils.buttonMap)(state.pad, state.prevPad, state.buttons[inputName]);
        },
        stick: function stick(inputName) {
            var _state$sticks$inputNa = state.sticks[inputName],
                indexes = _state$sticks$inputNa.indexes,
                inverts = _state$sticks$inputNa.inverts;

            return (0, _utils.stickMap)(state.pad, state.prevPad, indexes, inverts, threshold);
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
        disconnect: function disconnect() {
            state.connected = false;
        },
        reconnect: function reconnect() {
            state.connected = true;
        },
        connect: function connect(gamepadId) {
            state.connected = true;
            state.gamepadId = gamepadId;
        },
        cancelListen: function cancelListen() {
            listenOptions = null;
        },
        listenButton: function listenButton(callback) {
            var quantity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

            var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
                _ref2$waitFor = _ref2.waitFor,
                waitFor = _ref2$waitFor === undefined ? [1, 'polls'] : _ref2$waitFor,
                _ref2$consecutive = _ref2.consecutive,
                consecutive = _ref2$consecutive === undefined ? false : _ref2$consecutive,
                _ref2$allowOffset = _ref2.allowOffset,
                allowOffset = _ref2$allowOffset === undefined ? true : _ref2$allowOffset;

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

            var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
                _ref3$waitFor = _ref3.waitFor,
                waitFor = _ref3$waitFor === undefined ? [100, 'ms'] : _ref3$waitFor,
                _ref3$consecutive = _ref3.consecutive,
                consecutive = _ref3$consecutive === undefined ? true : _ref3$consecutive,
                _ref3$allowOffset = _ref3.allowOffset,
                allowOffset = _ref3$allowOffset === undefined ? true : _ref3$allowOffset;

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
                var index = indexes[0];
                var bindingIndex = (0, _tools.findKey)(index, state.buttons);

                if (!allowDuplication && bindingIndex && state.buttons[inputName]) {
                    player.swapButtons(inputName, bindingIndex);
                } else {
                    player.setButton(inputName, index);
                }

                callback(bindingIndex);
            });
        },
        stickBindOnPress: function stickBindOnPress(inputName, callback) {
            var allowDuplication = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            if (!(0, _utils.nameIsValid)(inputName)) {
                throw new Error('On stickBindOnPress(\'' + inputName + '\', ...):\n                    first argument contains invalid characters');
            }

            player.listenAxis(function (indexesResult) {
                var c = function c(_ref4) {
                    var indexes = _ref4.indexes;
                    return (0, _tools.arraysEqual)(indexes, indexesResult);
                };
                var bindingIndex = (0, _tools.findKey)(c, state.sticks);

                if (!allowDuplication && bindingIndex && state.sticks[inputName]) {
                    player.swapSticks(inputName, bindingIndex);
                } else {
                    player.setStick(inputName, indexesResult);
                }

                callback(bindingIndex);
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
        },
        update: function update(gamepad) {
            state.prevPad = state.pad;
            state.pad = (0, _utils.parseGamepad)(gamepad, state.prevPad, threshold, clampThreshold);
            state.mappersOnPoll = (0, _utils.updateMappers)(state.pad, state.prevPad, state.mappersOnPoll, player);

            listenOptions = (0, _utils.updateListenOptions)(listenOptions, state.pad, threshold);
        }
    };

    return player;
}