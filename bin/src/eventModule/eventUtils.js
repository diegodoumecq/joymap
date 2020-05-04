"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEventTokens = getEventTokens;
exports.eventIsValid = eventIsValid;
exports.verifyTokens = verifyTokens;

var _isString2 = _interopRequireDefault(require("lodash/fp/isString"));

var _map2 = _interopRequireDefault(require("lodash/fp/map"));

var _flow2 = _interopRequireDefault(require("lodash/fp/flow"));

var _filter2 = _interopRequireDefault(require("lodash/fp/filter"));

var _reduce2 = _interopRequireDefault(require("lodash/fp/reduce"));

var _split2 = _interopRequireDefault(require("lodash/fp/split"));

var _utils = require("../common/utils");

var _shuntingYard = _interopRequireWildcard(require("./shuntingYard"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getEventTokens(name) {
  return (0, _flow2.default)((0, _split2.default)(/([^a-zA-Z0-9.&&||])/g), (0, _filter2.default)(function (value) {
    return !!value && value !== ' ';
  }), _shuntingYard.default, (0, _map2.default)(function (value) {
    if (_shuntingYard.operators.includes(value)) {
      return value;
    }

    return {
      inputName: (0, _split2.default)('.', value)[0],
      inputState: (0, _split2.default)('.', value)[1] || 'pressed'
    };
  }))(name);
}

function eventIsValid(inputs) {
  var eventTokens = Array.isArray(inputs) ? inputs : getEventTokens(inputs);
  return (0, _reduce2.default)(function (result, token) {
    if (!result) {
      return result;
    }

    if ((0, _isString2.default)(token)) {
      return _shuntingYard.operators.includes(token);
    }

    return (0, _utils.nameIsValid)(token.inputName);
  }, true, eventTokens);
}

function verifyTokens(arr) {
  var stack = [];
  arr.forEach(function (token) {
    if (typeof token === 'boolean') {
      stack.push(token);
    } else {
      var elem1 = stack.pop();
      var elem2 = stack.pop();

      if (token === '&&') {
        stack.push(!!(elem1 && elem2));
      } else if (token === '||') {
        stack.push(!!(elem1 || elem2));
      } else {
        throw new Error("verifyTokens: invalid operator ".concat(token, " was used"));
      }
    }
  });
  return stack[0];
}
//# sourceMappingURL=eventUtils.js.map