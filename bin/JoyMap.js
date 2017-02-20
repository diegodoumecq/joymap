'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createJoyMap;

var _utils = require('./common/utils');

function createJoyMap() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var animationFrameRequestId = null;
    var isSupported = navigator && (0, _utils.isFunction)(navigator.getGamepads);

    var state = {
        onPoll: params.onPoll || _utils.noop,
        autoConnect: params.autoConnect !== false,
        gamepads: [],
        modules: []
    };

    var joyMap = {
        isSupported: function (_isSupported) {
            function isSupported() {
                return _isSupported.apply(this, arguments);
            }

            isSupported.toString = function () {
                return _isSupported.toString();
            };

            return isSupported;
        }(function () {
            return isSupported;
        }),

        start: function start() {
            if (isSupported && animationFrameRequestId === null) {
                (function () {
                    joyMap.poll();
                    if (state.autoConnect) {
                        state.modules.forEach(function (module) {
                            if (!module.isConnected()) {
                                var padId = joyMap.getUnusedPadId();
                                if (padId) {
                                    module.connect(padId);
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
        setOnPoll: function setOnPoll(onPoll) {
            state.onPoll = onPoll;
        },
        setAutoConnect: function setAutoConnect(autoConnect) {
            state.autoConnect = autoConnect;
        },


        getGamepads: function getGamepads() {
            return state.gamepads;
        },
        getModules: function getModules() {
            return state.modules;
        },

        getUnusedPadIds: function getUnusedPadIds() {
            return (0, _utils.difference)((0, _utils.map)('id', state.gamepads), state.modules.map(function (m) {
                return m.getPadId();
            }));
        },
        getUnusedPadId: function getUnusedPadId() {
            var usedIds = state.modules.map(function (module) {
                return module.getPadId();
            });
            var gamepadIds = (0, _utils.map)('id', state.gamepads);

            var length = gamepadIds.length;
            var i = 0;
            while (i < length) {
                if (!usedIds.includes(gamepadIds[i])) {
                    return gamepadIds[i];
                }
                i += 1;
            }

            return null;
        },
        addModule: function addModule(module) {
            state.modules.push(module);

            if (state.autoConnect && !module.getPadId()) {
                var padId = joyMap.getUnusedPadId();
                if (padId) {
                    module.connect(padId);
                }
            }
        },
        removeModule: function removeModule(module) {
            var index = state.modules.indexOf(module);
            if (index !== -1) {
                state.modules.splice(index, 1);
                module.destroy();
            } else {
                throw new Error('removeModule(module), could not find such module');
            }
        },
        clearModules: function clearModules() {
            state.modules.forEach(function (module) {
                return joyMap.removeModule(module);
            });
        },
        poll: function poll() {
            state.gamepads = (0, _utils.getRawGamepads)().filter(function (rawGamepad) {
                return rawGamepad && rawGamepad.connected && rawGamepad.buttons.length && rawGamepad.axes.length && rawGamepad.timestamp !== 0 && (!!rawGamepad.id || rawGamepad.id === 0);
            });

            state.modules.forEach(function (module) {
                var gamepad = (0, _utils.find)({ id: module.getPadId() }, state.gamepads);

                if (gamepad) {
                    if (!module.isConnected()) {
                        module.connect();
                    }
                    module.update(gamepad);
                } else if (module.isConnected()) {
                    module.disconnect();
                }
            });

            state.onPoll();
        }
    };

    return joyMap;
}