'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
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

    var _isSupported = navigator && (0, _tools.isFunction)(navigator.getGamepads);

    var animationFrameRequestId = null;
    var gamepads = [];
    var players = [];

    var joyMap = {
        isSupported: function isSupported() {
            return _isSupported;
        },
        getGamepads: function getGamepads() {
            return gamepads;
        },
        getPlayers: function getPlayers() {
            return players;
        },

        start: function start() {
            if (_isSupported && animationFrameRequestId === null) {
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
            return (0, _tools.difference)((0, _tools.map)('id', gamepads), (0, _tools.map)('gamepadId', players));
        },
        setPlayers: function setPlayers() {
            var jsonString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '[]';

            joyMap.cleanPlayers();
            players = JSON.parse(jsonString);
        },
        addPlayer: function addPlayer(name) {
            if (!(0, _utils.nameIsValid)(name)) {
                throw new Error('On addPlayer(\'' + name + '\'): argument contains invalid characters');
            }

            var player = (0, _Player2.default)({ name: name, threshold: threshold, clampThreshold: clampThreshold });

            var gamepadIds = (0, _tools.map)('id', gamepads);
            var unusedId = gamepadIds.find(function (gamepadId) {
                return !(0, _tools.find)({ gamepadId: gamepadId }, players);
            });

            if (unusedId) {
                player.connect(unusedId);
            }

            players.push(player);

            return player;
        },
        removePlayer: function removePlayer(player) {
            var index = players.indexOf(player);
            if (index !== -1) {
                players.splice(index, 1);
                player.destroy();
            } else {
                throw new Error('removePlayer(player.name: ' + player.getName() + '), could not find such player');
            }
        },
        cleanPlayers: function cleanPlayers() {
            players.forEach(function (player) {
                return joyMap.removePlayer(player);
            });
        },
        poll: function poll() {
            gamepads = (0, _utils.getRawGamepads)().filter(function (rawGamepad) {
                return rawGamepad && rawGamepad.connected && rawGamepad.buttons.length && rawGamepad.axes.length && (!!rawGamepad.id || rawGamepad.id === 0);
            });

            players.forEach(function (player) {
                if (playerHandling === 'auto' && player.getGamepadId() === null) {
                    var unusedGamepadIds = joyMap.getUnusedGamepadIds();

                    if (unusedGamepadIds.length > 0) {
                        player.connect(unusedGamepadIds[0]);
                    }
                }

                var gamepad = (0, _tools.find)({ id: player.getGamepadId() }, gamepads);

                if (gamepad) {
                    if (!player.isConnected()) {
                        player.reconnect();
                    }
                    player.update(gamepad);
                } else if (player.isConnected()) {
                    player.disconnect();
                }
            });

            onPoll();
        }
    };

    return joyMap;
}