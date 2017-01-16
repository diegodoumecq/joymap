'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = createPlayer;

var _utils = require('./lib/utils');

var _tools = require('./lib/tools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _cleanBindings() {
    return {
        buttonBindings: _utils.buttonBindings,
        stickBindings: _utils.stickBindings,
        buttons: (0, _tools.mapValues)(function () {
            return {
                value: 0,
                pressed: false,
                justChanged: false
            };
        }, _utils.buttonBindings),
        sticks: (0, _tools.mapValues)(function () {
            return {
                value: [0, 0],
                pressed: false,
                justChanged: false,
                inverts: [false, false]
            };
        }, _utils.stickBindings)
    };
}

function createPlayer() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        name = _ref.name,
        _ref$threshold = _ref.threshold,
        threshold = _ref$threshold === undefined ? 0.3 : _ref$threshold,
        _ref$clampThreshold = _ref.clampThreshold,
        clampThreshold = _ref$clampThreshold === undefined ? true : _ref$clampThreshold;

    var listenOptions = null;

    var player = (0, _extends3.default)({
        name: name,
        parsedGamepad: {
            buttons: [],
            axes: []
        },
        buttonAliases: {},
        stickAliases: {},
        aggregators: {},
        gamepadId: null,
        connected: false
    }, _cleanBindings(), {
        cleanBindings: function cleanBindings() {
            (0, _assign2.default)(player, _cleanBindings());
        },
        disconnect: function disconnect() {
            player.connected = false;
        },
        reconnect: function reconnect() {
            player.connected = true;
        },
        connect: function connect(gamepadId) {
            player.connected = true;
            player.gamepadId = gamepadId;
        },
        clearButtonBindings: function clearButtonBindings() {
            player.buttonBindings = {};
        },
        clearStickBindings: function clearStickBindings() {
            player.stickBindings = {};
        },
        buttonRebind: function buttonRebind(inputName, binding) {
            if (!(0, _utils.nameIsValid)(inputName)) {
                throw new Error('On buttonRebind(\'' + inputName + '\'): argument contains invalid characters');
            }
            player.buttonBindings[inputName] = binding;
        },
        stickRebind: function stickRebind(inputName, binding) {
            if (!(0, _utils.nameIsValid)(inputName)) {
                throw new Error('On stickRebind(\'' + inputName + '\'): argument contains invalid characters');
            }
            player.stickBindings[inputName] = binding;
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
        buttonRebindOnPress: function buttonRebindOnPress(inputName) {
            var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _tools.noop;
            var allowDuplication = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            if (!(0, _utils.nameIsValid)(inputName)) {
                throw new Error('On buttonRebindOnPress(\'' + inputName + '\', ...):\n                first argument contains invalid characters');
            }
            player.listenButton(function (index) {
                var bindingIndex = (0, _tools.findKey)({ index: index }, player.buttonBindings);

                if (bindingIndex) {
                    if (inputName !== bindingIndex) {
                        if (allowDuplication) {
                            player.buttonBindings[inputName] = (0, _utils.makeButtonBinding)(index);
                        } else {
                            var _binding = player.buttonBindings[bindingIndex];
                            player.buttonBindings[bindingIndex] = player.buttonBindings[inputName];
                            player.buttonBindings[inputName] = _binding;
                        }
                    }
                } else {
                    player.buttonBindings[inputName] = (0, _utils.makeButtonBinding)(index);
                }

                callback(bindingIndex);
            });
        },
        stickRebindOnPress: function stickRebindOnPress(inputName) {
            var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _tools.noop;
            var allowDuplication = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            if (!(0, _utils.nameIsValid)(inputName)) {
                throw new Error('On stickRebindOnPress(\'' + inputName + '\', ...):\n                first argument contains invalid characters');
            }

            player.listenAxis(function (index1, index2) {
                // REVIEW Needed to define the callback as a function
                var findCallback = function findCallback(_ref4) {
                    var indexes = _ref4.indexes;
                    return indexes.includes(index1) && indexes.includes(index2);
                };

                var bindingIndex = (0, _tools.findKey)(findCallback, player.stickBindings);

                if (bindingIndex) {
                    if (inputName !== bindingIndex) {
                        if (allowDuplication) {
                            player.stickBindings[inputName] = (0, _utils.makeStickBinding)(index1, index2);
                        } else {
                            var _binding2 = player.stickBindings[bindingIndex];
                            player.stickBindings[bindingIndex] = player.stickBindings[inputName];
                            player.stickBindings[inputName] = _binding2;
                        }
                    }
                } else {
                    player.stickBindings[inputName] = (0, _utils.makeStickBinding)(index1, index2);
                }

                callback(bindingIndex);
            });
        },
        setAggregator: function setAggregator(aggregatorName, callback) {
            if (!(0, _utils.nameIsValid)(aggregatorName)) {
                throw new Error('On setAggregator(\'' + aggregatorName + '\', ...):\n                first argument contains invalid characters');
            }
            player.aggregators[aggregatorName] = { callback: callback, value: null };
        },
        removeAggregator: function removeAggregator(aggregatorName) {
            player.aggregators = (0, _tools.omit)([aggregatorName], player.aggregators);
        },
        cleanAggregators: function cleanAggregators() {
            player.aggregators = {};
        },
        setAlias: function setAlias(aliasName, inputs) {
            if (!(0, _utils.nameIsValid)(aliasName)) {
                throw new Error('On setAlias(\'' + aliasName + '\', ...): first argument contains invalid characters');
            }
            var inputList = typeof inputs === 'string' ? [inputs] : inputs;

            if ((0, _tools.difference)(inputList, (0, _keys2.default)(player.buttons)).length === 0) {
                player.buttonAliases[aliasName] = (0, _utils.addButtonAlias)(player.buttonAliases[aliasName], inputList);
            } else if ((0, _tools.difference)(inputList, (0, _keys2.default)(player.sticks)).length === 0) {
                var lengths = inputList.map(function (inputName) {
                    return player.sticks[inputName].value.length;
                });

                if ((0, _tools.unique)(lengths).length === 1) {
                    player.stickAliases[aliasName] = (0, _utils.addStickAlias)(player.stickAliases[aliasName], inputList);
                } else {
                    throw new Error('On setAlias(' + aliasName + ', [' + inputList.join(', ') + ']):\n                        all sticks specified did not have the same number of axes');
                }
            } else {
                throw new Error('On setAlias(' + aliasName + ', [' + inputList.join(', ') + ']):\n                    either one of the inputs is void or it wasn\'t all a collection of just buttons or just sticks');
            }
        },
        removeAlias: function removeAlias(aliasName) {
            if ((0, _tools.includes)(aliasName, (0, _keys2.default)(player.buttonAliases))) {
                player.buttonAliases = (0, _tools.omit)([aliasName], player.buttonAliases);
            } else if ((0, _tools.includes)(aliasName, (0, _keys2.default)(player.stickAliases))) {
                player.stickAliases = (0, _tools.omit)([aliasName], player.stickAliases);
            } else {
                throw new Error('On removeAlias(\'' + aliasName + '\'): Specified alias does not exist');
            }
        },
        cleanAliases: function cleanAliases() {
            player.buttonAliases = {};
            player.stickAliases = {};
        },
        destroy: function destroy() {
            player.disconnect();
            player.cleanBindings();
            player.cleanAliases();
            player.cleanAggregators();
        },
        parseGamepad: function parseGamepad(gamepad) {
            var prevGamepad = player.parsedGamepad;

            return {
                buttons: gamepad.buttons.map(function (_ref5, index) {
                    var value = _ref5.value;

                    var previous = prevGamepad.buttons[index];
                    var pressed = player.isButtonSignificant(value);

                    return {
                        pressed: pressed,
                        justChanged: pressed !== (previous ? player.isButtonSignificant(previous.value) : false),
                        value: value
                    };
                }),
                axes: gamepad.axes
            };
        },
        update: function update(gamepad) {
            player.parsedGamepad = player.parseGamepad(gamepad);
            player.updateButtons(player.parsedGamepad);
            player.updateStick(player.parsedGamepad);
            player.updateAliases();
            player.updateAggregators(gamepad); // REVIEW: Shouldn't this use parsedGamepad too?

            listenOptions = (0, _utils.updateListenOptions)(listenOptions, player.parsedGamepad, threshold);
        },
        getButtonValue: function getButtonValue() {
            var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            if (!clampThreshold) {
                return value;
            }

            return !player.isButtonSignificant(value) ? 0 : value;
        },
        isButtonSignificant: function isButtonSignificant() {
            var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            return Math.abs(value) > threshold;
        },
        updateButtons: function updateButtons(gamepad) {
            player.buttons = (0, _tools.mapValues)(function (binding) {
                return binding.mapper(gamepad);
            }, player.buttonBindings);
        },
        getStickValue: function getStickValue(stickValues) {
            if (clampThreshold && !player.isStickSignificant(stickValues)) {
                return stickValues.map(function () {
                    return 0;
                });
            }

            return stickValues;
        },
        isStickSignificant: function isStickSignificant(stickValues) {
            return stickValues.findIndex(function (value) {
                return Math.abs(value) >= threshold;
            }) !== -1;
        },
        updateStick: function updateStick(gamepad) {
            var prevStick = player.sticks;

            player.sticks = (0, _tools.mapValues)(function (binding, inputName) {
                var previous = prevStick[inputName];
                var value = binding.mapper(gamepad, previous.inverts);
                var pressed = player.isStickSignificant(value);

                return {
                    pressed: pressed,
                    justChanged: pressed !== player.isStickSignificant(previous.value),
                    value: player.getStickValue(value),
                    inverts: previous.inverts
                };
            }, player.stickBindings);
        },
        updateAliases: function updateAliases() {
            // When an alias has more than 1 button assigned to it, use for reference the one that's pressed the most
            player.buttonAliases = (0, _tools.mapValues)(function (alias) {
                var value = 0;

                alias.inputs.forEach(function (aliasName) {
                    if (player.buttons[aliasName].value > value) {
                        value = player.buttons[aliasName].value;
                    }
                });

                value = player.getButtonValue(value);
                var pressed = player.isButtonSignificant(value);

                return {
                    pressed: pressed,
                    justChanged: pressed !== player.isButtonSignificant(alias.value),
                    value: value,
                    inputs: alias.inputs
                };
            }, player.buttonAliases);

            // When an alias has more than 1 stick assigned to it, do an average
            player.stickAliases = (0, _tools.mapValues)(function (alias) {
                var counts = [];
                var count = 0;

                alias.inputs.forEach(function (aliasName) {
                    if (player.sticks[aliasName].pressed) {
                        counts = player.sticks[aliasName].value.map(function (v, i) {
                            return v + (counts[i] || 0);
                        });
                        count += 1;
                    }
                });

                var value = count === 0 ? player.sticks[alias.inputs[0]].value.map(function () {
                    return 0;
                }) : counts.map(function (v) {
                    return v / count;
                });
                var pressed = player.isStickSignificant(value);

                return {
                    pressed: pressed,
                    justChanged: pressed !== player.isStickSignificant(alias.value),
                    value: value,
                    inputs: alias.inputs
                };
            }, player.stickAliases);
        },
        updateAggregators: function updateAggregators(gamepad) {
            var _this = this;

            player.aggregators = (0, _tools.mapValues)(function (_ref6) {
                var callback = _ref6.callback,
                    value = _ref6.value;
                return {
                    callback: callback,
                    value: callback(_this, value, gamepad)
                };
            }, player.aggregators);
        }
    });

    return player;
}