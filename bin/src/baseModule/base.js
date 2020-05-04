"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createModule;

var _toString2 = _interopRequireDefault(require("lodash/fp/toString"));

var _uniqBy2 = _interopRequireDefault(require("lodash/fp/uniqBy"));

var _uniq2 = _interopRequireDefault(require("lodash/fp/uniq"));

var _flatten2 = _interopRequireDefault(require("lodash/fp/flatten"));

var _flow2 = _interopRequireDefault(require("lodash/fp/flow"));

var _forEach2 = _interopRequireDefault(require("lodash/fp/forEach"));

var _assignIn2 = _interopRequireDefault(require("lodash/fp/assignIn"));

var _map2 = _interopRequireDefault(require("lodash/fp/map"));

var _isEqual2 = _interopRequireDefault(require("lodash/fp/isEqual"));

var _findKey2 = _interopRequireDefault(require("lodash/fp/findKey"));

var _utils = require("../common/utils");

var _baseUtils = require("./baseUtils");

var _rumble = require("./rumble");

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
    prevRumble: {
      duration: 0,
      weakMagnitude: 0,
      strongMagnitude: 0
    },
    lastRumbleUpdate: Date.now(),
    lastUpdate: Date.now(),
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
      return JSON.stringify({
        threshold: state.threshold,
        clampThreshold: state.clampThreshold,
        buttons: state.buttons,
        sticks: state.sticks
      });
    },
    setConfig: function setConfig(serializedString) {
      return (0, _assignIn2.default)(state, JSON.parse(serializedString));
    },
    getButtonIndexes: function getButtonIndexes() {
      for (var _len = arguments.length, inputNames = new Array(_len), _key = 0; _key < _len; _key++) {
        inputNames[_key] = arguments[_key];
      }

      return (0, _flow2.default)((0, _map2.default)(function (inputName) {
        return state.buttons[inputName];
      }), _flatten2.default, _uniq2.default)(inputNames);
    },
    getStickIndexes: function getStickIndexes() {
      for (var _len2 = arguments.length, inputNames = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        inputNames[_key2] = arguments[_key2];
      }

      return (0, _flow2.default)((0, _map2.default)(function (inputName) {
        return state.sticks[inputName].indexes;
      }), _flatten2.default, (0, _uniqBy2.default)(_toString2.default))(inputNames);
    },
    setButton: function setButton(inputName, indexes) {
      if (!(0, _utils.nameIsValid)(inputName)) {
        throw new Error("On setButton('".concat(inputName, "'): argument contains invalid characters"));
      }

      state.buttons[inputName] = indexes;
    },
    setStick: function setStick(inputName, indexes, inverts) {
      if (!(0, _utils.nameIsValid)(inputName)) {
        throw new Error("On setStick('".concat(inputName, "'): inputName contains invalid characters"));
      }

      if (indexes.length === 0) {
        throw new Error("On setStick('".concat(inputName, "', indexes): argument indexes is an empty array"));
      }

      state.sticks[inputName] = {
        indexes: indexes,
        inverts: inverts || (0, _map2.default)(function () {
          return false;
        }, indexes[0])
      };
    },
    invertSticks: function invertSticks(inverts) {
      for (var _len3 = arguments.length, inputNames = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        inputNames[_key3 - 1] = arguments[_key3];
      }

      (0, _forEach2.default)(function (inputName) {
        var stick = state.sticks[inputName];

        if (stick.inverts.length === inverts.length) {
          stick.inverts = inverts;
        } else {
          throw new Error("On invertSticks(inverts, [..., ".concat(inputName, ", ...]): given argument inverts' length does not match '").concat(inputName, "' axis' length"));
        }
      }, inputNames);
    },
    swapButtons: function swapButtons(btn1, btn2) {
      var buttons = state.buttons;
      var _ref = [buttons[btn2], buttons[btn1]];
      buttons[btn1] = _ref[0];
      buttons[btn2] = _ref[1];
    },
    swapSticks: function swapSticks(stick1, stick2) {
      var includeInverts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var sticks = state.sticks;

      if (includeInverts) {
        var _ref2 = [sticks[stick2], sticks[stick1]];
        sticks[stick1] = _ref2[0];
        sticks[stick2] = _ref2[1];
      } else {
        var _ref3 = [sticks[stick2].indexes, sticks[stick1].indexes];
        sticks[stick1].indexes = _ref3[0];
        sticks[stick2].indexes = _ref3[1];
      }
    },
    update: function update(gamepad) {
      state.prevPad = state.pad;
      state.pad = {
        axes: gamepad.axes,
        buttons: (0, _map2.default)(function (a) {
          return a.value;
        }, gamepad.buttons),
        rawPad: gamepad
      };

      if (listenOptions) {
        listenOptions = (0, _baseUtils.updateListenOptions)(listenOptions, state.pad, state.threshold);
      }

      if (module.isRumbleSupported()) {
        var now = Date.now();
        var currentRumble = (0, _rumble.getCurrentEffect)(gamepad.id);
        (0, _rumble.updateChannels)(gamepad.id, now - state.lastUpdate);

        if (state.prevRumble.weakMagnitude !== currentRumble.weakMagnitude || state.prevRumble.strongMagnitude !== currentRumble.strongMagnitude || now - state.lastRumbleUpdate >= _rumble.MAX_DURATION / 2) {
          (0, _rumble.applyRumble)(gamepad, currentRumble);
          state.prevRumble = currentRumble;
          state.lastRumbleUpdate = now;
        }

        state.lastUpdate = now;
      }
    },
    cancelListen: function cancelListen() {
      listenOptions = null;
    },
    listenButton: function listenButton(callback) {
      var quantity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      var _ref4 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          _ref4$waitFor = _ref4.waitFor,
          waitFor = _ref4$waitFor === void 0 ? [1, 'polls'] : _ref4$waitFor,
          _ref4$consecutive = _ref4.consecutive,
          consecutive = _ref4$consecutive === void 0 ? false : _ref4$consecutive,
          _ref4$allowOffset = _ref4.allowOffset,
          allowOffset = _ref4$allowOffset === void 0 ? true : _ref4$allowOffset;

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

      var _ref5 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          _ref5$waitFor = _ref5.waitFor,
          waitFor = _ref5$waitFor === void 0 ? [100, 'ms'] : _ref5$waitFor,
          _ref5$consecutive = _ref5.consecutive,
          consecutive = _ref5$consecutive === void 0 ? true : _ref5$consecutive,
          _ref5$allowOffset = _ref5.allowOffset,
          allowOffset = _ref5$allowOffset === void 0 ? true : _ref5$allowOffset;

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
        throw new Error("On buttonBindOnPress('".concat(inputName, "'): inputName contains invalid characters"));
      }

      module.listenButton(function (indexes) {
        var resultName = (0, _findKey2.default)(function (value) {
          return value[0] === indexes[0];
        }, state.buttons);

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
        throw new Error("On stickBindOnPress('".concat(inputName, "'): inputName contains invalid characters"));
      }

      module.listenAxis(function (indexesResult) {
        var resultName = (0, _findKey2.default)(function (_ref6) {
          var indexes = _ref6.indexes;
          return (0, _isEqual2.default)(indexes, indexesResult);
        }, state.sticks);

        if (!allowDuplication && resultName && state.sticks[inputName]) {
          module.swapSticks(inputName, resultName);
        } else {
          module.setStick(inputName, indexesResult);
        }

        callback(resultName);
      });
    },
    isRumbleSupported: function isRumbleSupported(rawPad) {
      var padToTest = rawPad || state.pad.rawPad;

      if (padToTest) {
        return !!padToTest.vibrationActuator && !!padToTest.vibrationActuator.playEffect;
      } else {
        return null;
      }
    },
    stopRumble: function stopRumble(channelName) {
      if (state.pad.rawPad) {
        (0, _rumble.stopRumble)(state.pad.rawPad.id, channelName);
      }
    },
    addRumble: function addRumble(effect, channelName) {
      if (state.pad.rawPad) {
        (0, _rumble.addRumble)(state.pad.rawPad.id, effect, channelName);
      }
    },
    destroy: function destroy() {
      module.disconnect();
      state.pad = _baseUtils.mockGamepad;
      state.prevPad = _baseUtils.mockGamepad;
    }
  };
  return {
    module: module,
    state: state
  };
}
//# sourceMappingURL=base.js.map