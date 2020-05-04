"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createJoymap;

var _compact2 = _interopRequireDefault(require("lodash/fp/compact"));

var _includes2 = _interopRequireDefault(require("lodash/fp/includes"));

var _forEach2 = _interopRequireDefault(require("lodash/fp/forEach"));

var _difference2 = _interopRequireDefault(require("lodash/fp/difference"));

var _filter2 = _interopRequireDefault(require("lodash/fp/filter"));

var _find2 = _interopRequireDefault(require("lodash/fp/find"));

var _isFunction2 = _interopRequireDefault(require("lodash/fp/isFunction"));

var _map2 = _interopRequireDefault(require("lodash/fp/map"));

var _noop2 = _interopRequireDefault(require("lodash/fp/noop"));

var _utils = require("./common/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createJoymap() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var animationFrameRequestId = null;

  var _isSupported = navigator && (0, _isFunction2.default)(navigator.getGamepads);

  var state = {
    onPoll: params.onPoll || _noop2.default,
    autoConnect: params.autoConnect !== false,
    gamepads: [],
    modules: []
  };
  var joymap = {
    isSupported: function isSupported() {
      return _isSupported;
    },
    start: function start() {
      if (_isSupported && animationFrameRequestId === null) {
        joymap.poll();

        if (state.autoConnect) {
          (0, _forEach2.default)(function (module) {
            if (!module.isConnected()) {
              var padId = joymap.getUnusedPadId();

              if (padId) {
                module.connect(padId);
              }
            }
          }, state.modules);
        }

        var step = function step() {
          joymap.poll();
          animationFrameRequestId = window.requestAnimationFrame(step);
        };

        animationFrameRequestId = window.requestAnimationFrame(step);
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
      return (0, _compact2.default)((0, _difference2.default)((0, _map2.default)('id', state.gamepads), (0, _map2.default)(function (module) {
        return module.getPadId();
      }, state.modules)));
    },
    getUnusedPadId: function getUnusedPadId() {
      var usedIds = (0, _map2.default)(function (module) {
        return module.getPadId();
      }, state.modules);
      var gamepadIds = (0, _map2.default)('id', state.gamepads);
      return (0, _find2.default)(function (id) {
        return !(0, _includes2.default)(id, usedIds);
      }, gamepadIds);
    },
    addModule: function addModule(module) {
      state.modules.push(module);

      if (state.autoConnect && !module.getPadId()) {
        var padId = joymap.getUnusedPadId();

        if (padId) {
          module.connect(padId);
        }
      }
    },
    removeModule: function removeModule(module) {
      state.modules = (0, _filter2.default)(function (m) {
        return m !== module;
      }, state.modules);
      module.destroy();
    },
    clearModules: function clearModules() {
      (0, _forEach2.default)(function (module) {
        return joymap.removeModule(module);
      }, state.modules);
    },
    poll: function poll() {
      state.gamepads = (0, _filter2.default)(_utils.gamepadIsValid, (0, _utils.getRawGamepads)());
      (0, _forEach2.default)(function (module) {
        if (state.autoConnect && !module.getPadId()) {
          var padId = joymap.getUnusedPadId();

          if (padId) {
            module.connect(padId);
            var pad = (0, _find2.default)({
              id: module.getPadId()
            }, state.gamepads);

            if (pad) {
              module.update(pad);
            }
          }
        } else {
          var gamepad = (0, _find2.default)({
            id: module.getPadId()
          }, state.gamepads);

          if (gamepad) {
            if (!module.isConnected()) {
              module.connect();
            }

            module.update(gamepad);
          } else if (module.isConnected()) {
            module.disconnect();
          }
        }
      }, state.modules);
      state.onPoll();
    }
  };
  return joymap;
}
//# sourceMappingURL=Joymap.js.map