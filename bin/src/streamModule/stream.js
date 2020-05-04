"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createStreamModule;

var _forEach2 = _interopRequireDefault(require("lodash/fp/forEach"));

var _mapValues2 = _interopRequireDefault(require("lodash/fp/mapValues"));

var _assignIn2 = _interopRequireDefault(require("lodash/fp/assignIn"));

var _fastMemoize = _interopRequireDefault(require("fast-memoize"));

var _base = _interopRequireDefault(require("../baseModule/base"));

var _utils = require("../common/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createStreamModule(params) {
  if (!params.rxjs || !params.operators) {
    throw new Error("createStreamModule called without rxjs and/or it's operators");
  }

  var _createBaseModule = (0, _base.default)(params),
      state = _createBaseModule.state,
      baseModule = _createBaseModule.module;

  var buttonMapMemoized = (0, _fastMemoize.default)(_utils.buttonMap);
  var stickMapMemoized = (0, _fastMemoize.default)(_utils.stickMap);
  var allButtonStream = new params.rxjs.Subject();
  allButtonStream.pipe(params.operators.map(function (a) {
    return a();
  }));
  var allStickStream = new params.rxjs.Subject();
  allStickStream.pipe(params.operators.map(function (a) {
    return a();
  }));
  var buttonStreamMap = {};
  var stickStreamMap = {};

  var updateButtonStream = function updateButtonStream(streamMap) {
    return streamMap.stream.next(streamMap.updateFn);
  };

  var updateStickStream = function updateStickStream(streamMap) {
    return streamMap.stream.next(streamMap.updateFn);
  };

  var mapButtons = function mapButtons() {
    return (0, _mapValues2.default)(function (button) {
      return buttonMapMemoized(state.pad, state.prevPad, button, state.threshold, state.clampThreshold);
    }, state.buttons);
  };

  var mapSticks = function mapSticks() {
    return (0, _mapValues2.default)(function (stick) {
      return stickMapMemoized(state.pad, state.prevPad, stick.indexes, stick.inverts, state.threshold, state.clampThreshold);
    }, state.sticks);
  };

  var module = (0, _assignIn2.default)(baseModule, _objectSpread(_objectSpread({}, baseModule), {}, {
    getAllButtonsStream: function getAllButtonsStream() {
      return allButtonStream;
    },
    getAllStickStream: function getAllStickStream() {
      return allStickStream;
    },
    getButtonStream: function getButtonStream(buttonName) {
      if (!buttonStreamMap[buttonName]) {
        var buttonStream = new params.rxjs.Subject();
        buttonStream.pipe(params.operators.map(function (a) {
          return a();
        }));
        buttonStreamMap[buttonName] = {
          stream: buttonStream,
          updateFn: function updateFn() {
            return buttonMapMemoized(state.pad, state.prevPad, state.buttons[buttonName], state.threshold, state.clampThreshold);
          }
        };
      }

      return buttonStreamMap[buttonName].stream;
    },
    getStickStream: function getStickStream(stickName) {
      if (!stickStreamMap[stickName]) {
        var stickStream = new params.rxjs.Subject();
        stickStream.pipe(params.operators.map(function (a) {
          return a();
        }));
        stickStreamMap[stickName] = {
          stream: stickStream,
          updateFn: function updateFn() {
            return stickMapMemoized(state.pad, state.prevPad, state.sticks[stickName].indexes, state.sticks[stickName].inverts, state.threshold, state.clampThreshold);
          }
        };
      }

      return stickStreamMap[stickName].stream;
    },
    update: function update(gamepad) {
      baseModule.update(gamepad);
      allButtonStream.next(mapButtons);
      allStickStream.next(mapSticks);
      (0, _forEach2.default)(updateButtonStream, buttonStreamMap);
      (0, _forEach2.default)(updateStickStream, stickStreamMap);
    },
    destroy: function destroy() {
      baseModule.destroy();
      allButtonStream.unsubscribe();
      allStickStream.unsubscribe();
      (0, _forEach2.default)(function (_ref) {
        var stream = _ref.stream;
        return stream.unsubscribe();
      }, buttonStreamMap);
      (0, _forEach2.default)(function (_ref2) {
        var stream = _ref2.stream;
        return stream.unsubscribe();
      }, stickStreamMap);
    }
  }));
  return module;
}
//# sourceMappingURL=stream.js.map