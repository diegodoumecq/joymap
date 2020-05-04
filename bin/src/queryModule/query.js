"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createQueryModule;
exports.emptyButton = exports.emptyStick = exports.emptyMapper = void 0;

var _forEach2 = _interopRequireDefault(require("lodash/fp/forEach"));

var _omit2 = _interopRequireDefault(require("lodash/fp/omit"));

var _mapValues2 = _interopRequireDefault(require("lodash/fp/mapValues"));

var _assignIn2 = _interopRequireDefault(require("lodash/fp/assignIn"));

var _fastMemoize = _interopRequireDefault(require("fast-memoize"));

var _utils = require("../common/utils");

var _base = _interopRequireDefault(require("../baseModule/base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emptyMapper = null;
exports.emptyMapper = emptyMapper;
var emptyStick = {
  type: 'stick',
  value: [0, 0],
  pressed: false,
  justChanged: false,
  inverts: [false, false]
};
exports.emptyStick = emptyStick;
var emptyButton = {
  type: 'button',
  value: 0,
  pressed: false,
  justChanged: false
};
exports.emptyButton = emptyButton;

function createQueryModule() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _createBaseModule = (0, _base.default)(params),
      state = _createBaseModule.state,
      baseModule = _createBaseModule.module;

  var mappers = {};
  var buttonMapMemoized = (0, _fastMemoize.default)(_utils.buttonMap);
  var stickMapMemoized = (0, _fastMemoize.default)(_utils.stickMap);
  var module = (0, _assignIn2.default)(baseModule, {
    getButton: function getButton(inputName) {
      if (!module.isConnected()) {
        return emptyButton;
      }

      return buttonMapMemoized(state.pad, state.prevPad, state.buttons[inputName], state.threshold, state.clampThreshold);
    },
    getButtons: function getButtons() {
      for (var _len = arguments.length, inputNames = new Array(_len), _key = 0; _key < _len; _key++) {
        inputNames[_key] = arguments[_key];
      }

      if (!module.isConnected()) {
        var _result = {};
        (0, _forEach2.default)(function (mapperName) {
          _result[mapperName] = emptyButton;
        }, inputNames);
        return _result;
      }

      var result = {};
      (0, _forEach2.default)(function (inputName) {
        result[inputName] = buttonMapMemoized(state.pad, state.prevPad, state.buttons[inputName], state.threshold, state.clampThreshold);
      }, inputNames);
      return result;
    },
    getAllButtons: function getAllButtons() {
      if (!module.isConnected()) {
        return (0, _mapValues2.default)(state.buttons, function () {
          return emptyButton;
        });
      }

      return (0, _mapValues2.default)(function (button) {
        return buttonMapMemoized(state.pad, state.prevPad, button, state.threshold, state.clampThreshold);
      }, state.buttons);
    },
    getStick: function getStick(inputName) {
      if (!module.isConnected()) {
        return emptyStick;
      }

      var _state$sticks$inputNa = state.sticks[inputName],
          indexes = _state$sticks$inputNa.indexes,
          inverts = _state$sticks$inputNa.inverts;
      return stickMapMemoized(state.pad, state.prevPad, indexes, inverts, state.threshold, state.clampThreshold);
    },
    getSticks: function getSticks() {
      for (var _len2 = arguments.length, inputNames = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        inputNames[_key2] = arguments[_key2];
      }

      if (!module.isConnected()) {
        var _result2 = {};
        (0, _forEach2.default)(function (mapperName) {
          _result2[mapperName] = emptyStick;
        }, inputNames);
        return _result2;
      }

      var result = {};
      (0, _forEach2.default)(function (inputName) {
        var _state$sticks$inputNa2 = state.sticks[inputName],
            indexes = _state$sticks$inputNa2.indexes,
            inverts = _state$sticks$inputNa2.inverts;
        result[inputName] = stickMapMemoized(state.pad, state.prevPad, indexes, inverts, state.threshold, state.clampThreshold);
      }, inputNames);
      return result;
    },
    getAllSticks: function getAllSticks() {
      if (!module.isConnected()) {
        return (0, _mapValues2.default)(state.sticks, function () {
          return emptyStick;
        });
      }

      return (0, _mapValues2.default)(function (stick) {
        var indexes = stick.indexes,
            inverts = stick.inverts;
        return stickMapMemoized(state.pad, state.prevPad, indexes, inverts, state.threshold, state.clampThreshold);
      }, state.sticks);
    },
    getMapper: function getMapper(mapperName) {
      if (!module.isConnected()) {
        var _emptyMapper = null;
        return _emptyMapper;
      }

      return mappers[mapperName](module);
    },
    getMappers: function getMappers() {
      for (var _len3 = arguments.length, mapperNames = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        mapperNames[_key3] = arguments[_key3];
      }

      if (!module.isConnected()) {
        var _result3 = {};
        (0, _forEach2.default)(function (mapperName) {
          _result3[mapperName] = emptyMapper;
        }, mapperNames);
        return _result3;
      }

      var result = {};
      (0, _forEach2.default)(function (mapperName) {
        result[mapperName] = mappers[mapperName](module);
      }, mapperNames);
      return result;
    },
    getAllMappers: function getAllMappers() {
      if (!module.isConnected()) {
        return (0, _mapValues2.default)(function () {
          return emptyMapper;
        }, mappers);
      }

      return (0, _mapValues2.default)(function (mapper) {
        return mapper(module);
      }, mappers);
    },
    setMapper: function setMapper(mapperName, mapper) {
      mappers[mapperName] = mapper;
    },
    removeMapper: function removeMapper(mapperName) {
      mappers = (0, _omit2.default)([mapperName], mappers);
    },
    clearMappers: function clearMappers() {
      mappers = {};
    },
    destroy: function destroy() {
      baseModule.destroy();
      module.clearMappers();
    }
  });
  return module;
}
//# sourceMappingURL=query.js.map