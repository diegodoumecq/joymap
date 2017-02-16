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
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var animationFrameRequestId = null;
    var _isSupported = navigator && (0, _tools.isFunction)(navigator.getGamepads);

    var state = {
        threshold: params.threshold || 0.2,
        clampThreshold: params.clampThreshold !== false,
        onPoll: params.onPoll || _tools.noop,
        autoConnect: params.autoConnect !== false,
        gamepads: [],
        players: []
    };

    var joyMap = {
        isSupported: function isSupported() {
            return _isSupported;
        },

        getPlayerConfigs: function getPlayerConfigs() {
            return '[' + state.players.map(function (player) {
                return player.getConfig;
            }).join(',') + ']';
        },
        setPlayerConfigs: function setPlayerConfigs() {
            var jsonString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '[]';

            joyMap.clearPlayers();
            var parsedList = JSON.parse(jsonString);
            parsedList.forEach(function (playerConfig) {
                return joyMap.addPlayer().setConfig(playerConfig);
            });
        },
        start: function start() {
            if (_isSupported && animationFrameRequestId === null) {
                (function () {
                    joyMap.poll();
                    if (state.autoConnect) {
                        state.players.forEach(function (p) {
                            if (!p.isConnected()) {
                                var padId = joyMap.getUnusedPadId();
                                if (padId) {
                                    p.connect(padId);
                                }
                            }
                        });
                    }
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
        setThreshold: function setThreshold(threshold) {
            state.threshold = threshold;
        },
        setClampThreshold: function setClampThreshold(clampThreshold) {
            state.clampThreshold = clampThreshold;
        },
        setOnPoll: function setOnPoll(onPoll) {
            state.onPoll = onPoll;
        },
        setAutoConnect: function setAutoConnect(autoConnect) {
            state.autoConnect = autoConnect;
        },


        getGamepads: function getGamepads() {
            return state.gamepads;
        },
        getPlayers: function getPlayers() {
            return state.players;
        },

        getUnusedPadIds: function getUnusedPadIds() {
            return (0, _tools.difference)((0, _tools.map)('id', state.gamepads), state.players.map(function (p) {
                return p.getPadId();
            }));
        },
        getUnusedPadId: function getUnusedPadId() {
            var playerIds = state.players.map(function (p) {
                return p.getPadId();
            });
            var gamepadIds = (0, _tools.map)('id', state.gamepads);

            var length = gamepadIds.length;
            var i = 0;
            while (i < length) {
                if (!playerIds.includes(gamepadIds[i])) {
                    return gamepadIds[i];
                }
                i += 1;
            }

            return null;
        },
        addPlayer: function addPlayer(padId) {
            if (state.autoConnect && !padId) {
                padId = joyMap.getUnusedPadId();
            }

            var player = (0, _Player2.default)({
                threshold: state.threshold,
                clampThreshold: state.clampThreshold,
                padId: padId
            });

            state.players.push(player);

            return player;
        },
        removePlayer: function removePlayer(player) {
            var index = state.players.indexOf(player);
            if (index !== -1) {
                state.players.splice(index, 1);
                player.destroy();
            } else {
                throw new Error('removePlayer(player), could not find such player');
            }
        },
        clearPlayers: function clearPlayers() {
            state.players.forEach(function (player) {
                return joyMap.removePlayer(player);
            });
        },
        poll: function poll() {
            state.gamepads = (0, _utils.getRawGamepads)().filter(function (rawGamepad) {
                return rawGamepad && rawGamepad.connected && rawGamepad.buttons.length && rawGamepad.axes.length && rawGamepad.timestamp !== 0 && (!!rawGamepad.id || rawGamepad.id === 0);
            });

            state.players.forEach(function (player) {
                var gamepad = (0, _tools.find)({ id: player.getPadId() }, state.gamepads);

                if (gamepad) {
                    if (!player.isConnected()) {
                        player.connect();
                    }
                    player.update(gamepad);
                } else if (player.isConnected()) {
                    player.disconnect();
                }
            });

            state.onPoll();
        }
    };

    return joyMap;
}