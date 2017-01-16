'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

exports.default = createJoyMap;

var _utils = require('./lib/utils');

var _tools = require('./lib/tools');

var _Player = require('./Player');

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createJoyMap() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$threshold = _ref.threshold,
        threshold = _ref$threshold === undefined ? 0.2 : _ref$threshold,
        _ref$clampThreshold = _ref.clampThreshold,
        clampThreshold = _ref$clampThreshold === undefined ? true : _ref$clampThreshold,
        _ref$onPoll = _ref.onPoll,
        onPoll = _ref$onPoll === undefined ? _tools.noop : _ref$onPoll,
        _ref$playerHandling = _ref.playerHandling,
        playerHandling = _ref$playerHandling === undefined ? 'auto' : _ref$playerHandling;

    var isSupported = navigator && (0, _tools.isFunction)(navigator.getGamepads);
    var animationFrameRequestId = null;

    var joyMap = {
        isSupported: isSupported,
        gamepads: [],
        players: {},

        start: function start() {
            if (isSupported && animationFrameRequestId === null) {
                (function () {
                    var step = function step() {
                        joyMap.poll();
                        animationFrameRequestId = window.requestAnimationFrame(step);
                    };
                    animationFrameRequestId = window.requestAnimationFrame(step);
                })();
            }
        },
        stop: function stop() {
            if (animationFrameRequestId !== null) {
                window.cancelAnimationFrame(animationFrameRequestId);
                animationFrameRequestId = null;
            }
        },
        getUnusedGamepadIds: function getUnusedGamepadIds() {
            return (0, _tools.difference)((0, _tools.map)('id', joyMap.gamepads), (0, _tools.map)('gamepadId', joyMap.players));
        },
        setPlayers: function setPlayers() {
            var jsonString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '{}';

            joyMap.cleanPlayers();
            joyMap.players = JSON.parse(jsonString);
        },
        addPlayer: function addPlayer(name) {
            if (!(0, _utils.nameIsValid)(name)) {
                throw new Error('On addPlayer(\'' + name + '\'): argument contains invalid characters');
            }

            var player = (0, _Player2.default)({ name: name, threshold: threshold, clampThreshold: clampThreshold });

            var gamepadIds = (0, _tools.map)('id', joyMap.gamepads);
            var unusedId = gamepadIds.find(function (gamepadId) {
                return !(0, _tools.findKey)({ gamepadId: gamepadId }, joyMap.players);
            });

            if (unusedId) {
                player.connect(unusedId);
            }

            joyMap.players[name] = player;

            return player;
        },
        removePlayer: function removePlayer(player) {
            joyMap.players = (0, _tools.omit)([player.name], joyMap.players);
            player.destroy();
        },
        cleanPlayers: function cleanPlayers() {
            // REVIEW: Had to use "any" type because flow thinks Object.values return mixed
            // and fails to notice that joyMap.players is { [key: string]: IPlayer }
            (0, _values2.default)(joyMap.players).forEach(function (player) {
                return joyMap.removePlayer(player);
            });
        },
        poll: function poll() {
            joyMap.gamepads = (0, _utils.getRawGamepads)().filter(function (rawGamepad) {
                return rawGamepad && rawGamepad.connected && rawGamepad.buttons.length && rawGamepad.axes.length && (!!rawGamepad.id || rawGamepad.id === 0);
            });

            (0, _keys2.default)(joyMap.players).forEach(function (name) {
                var player = joyMap.players[name];
                var unusedGamepadIds = joyMap.getUnusedGamepadIds();

                // Given unassigned players and unusued gamepads, automatically assign them
                if (playerHandling === 'auto' && player.gamepadId === null && unusedGamepadIds.length > 0) {
                    player.connect(unusedGamepadIds[0]);
                }

                var gamepad = (0, _tools.find)({ id: player.gamepadId }, joyMap.gamepads);

                if (!player.connected) {
                    if (gamepad) {
                        player.reconnect();
                        player.update(gamepad);
                    }
                } else if (gamepad) {
                    player.update(gamepad);
                } else {
                    player.disconnect();
                }
            });

            onPoll();
        }
    };

    return joyMap;
}