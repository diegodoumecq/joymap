"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createEventModule;

var _isString2 = _interopRequireDefault(require("lodash/fp/isString"));

var _map2 = _interopRequireDefault(require("lodash/fp/map"));

var _assignIn2 = _interopRequireDefault(require("lodash/fp/assignIn"));

var _forEach2 = _interopRequireDefault(require("lodash/fp/forEach"));

var _filter2 = _interopRequireDefault(require("lodash/fp/filter"));

var _fastMemoize = _interopRequireDefault(require("fast-memoize"));

var _base = _interopRequireDefault(require("../baseModule/base"));

var _utils = require("../common/utils");

var _eventUtils = require("./eventUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createEventModule() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _createBaseModule = (0, _base.default)(params),
      state = _createBaseModule.state,
      baseModule = _createBaseModule.module;

  var buttonMapMemoized = (0, _fastMemoize.default)(_utils.buttonMap);
  var stickMapMemoized = (0, _fastMemoize.default)(_utils.stickMap);
  var inputEvents = [];
  var module = (0, _assignIn2.default)(baseModule, _objectSpread(_objectSpread({}, baseModule), {}, {
    addEvent: function addEvent(eventName, callback) {
      var tokens = (0, _eventUtils.getEventTokens)(eventName);

      if ((0, _eventUtils.eventIsValid)(tokens)) {
        inputEvents.push({
          name: eventName,
          callback: callback,
          tokens: tokens
        });
      }
    },
    removeEvent: function removeEvent(eventName, callback) {
      inputEvents = (0, _filter2.default)(function (event) {
        return event.name !== eventName || event.callback !== callback;
      }, inputEvents);
    },
    update: function update(gamepad) {
      baseModule.update(gamepad);
      (0, _forEach2.default)(function (event) {
        if (state.buttons[event.name]) {
          var result = buttonMapMemoized(state.pad, state.prevPad, state.buttons[event.name], state.threshold, state.clampThreshold);

          if (result.pressed) {
            event.callback([result]);
          }
        } else if (state.sticks[event.name]) {
          var _state$sticks$event$n = state.sticks[event.name],
              indexes = _state$sticks$event$n.indexes,
              inverts = _state$sticks$event$n.inverts;

          var _result = stickMapMemoized(state.pad, state.prevPad, indexes, inverts, state.threshold, state.clampThreshold);

          if (_result.pressed) {
            event.callback([_result]);
          }
        } else {
          var resultCopy = [];
          var results = (0, _map2.default)(function (token) {
            if ((0, _isString2.default)(token)) {
              return token;
            }

            var result;

            if (state.buttons[token.inputName]) {
              result = buttonMapMemoized(state.pad, state.prevPad, state.buttons[token.inputName], state.threshold, state.clampThreshold);
            } else if (state.sticks[token.inputName]) {
              var _state$sticks$token$i = state.sticks[token.inputName],
                  _indexes = _state$sticks$token$i.indexes,
                  _inverts = _state$sticks$token$i.inverts;
              result = stickMapMemoized(state.pad, state.prevPad, _indexes, _inverts, state.threshold, state.clampThreshold);
            }

            if (result) {
              if (!resultCopy.includes(result)) {
                resultCopy.push(result);
              }

              if (token.inputState === 'pressed') {
                return result.pressed;
              }

              if (token.inputState === 'justPressed') {
                return result.pressed && result.justChanged;
              }

              if (token.inputState === 'justReleased') {
                return !result.pressed && result.justChanged;
              }

              return !result.pressed;
            }

            return false;
          }, event.tokens);

          if ((0, _eventUtils.verifyTokens)(results)) {
            event.callback(resultCopy);
          }
        }
      }, inputEvents);
    },
    destroy: function destroy() {
      baseModule.destroy();
      inputEvents = [];
    }
  }));
  return module;
}
//# sourceMappingURL=event.js.map