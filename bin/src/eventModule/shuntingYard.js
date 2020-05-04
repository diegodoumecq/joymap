"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = shuntingYard;
exports.nonInputs = exports.operators = exports.operatorPrecedence = void 0;

var _last2 = _interopRequireDefault(require("lodash/fp/last"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var operatorPrecedence = {
  '||': 1,
  '&&': 2
};
exports.operatorPrecedence = operatorPrecedence;
var operators = Object.keys(operatorPrecedence);
exports.operators = operators;
var nonInputs = [].concat(_toConsumableArray(operators), ['(', ')']);
exports.nonInputs = nonInputs;

function shuntingYard(tokens) {
  var stack = [];
  return tokens.reduce(function (output, token) {
    if (!nonInputs.includes(token)) {
      output.push(token);
    }

    if (token in operatorPrecedence) {
      while ((0, _last2.default)(stack) in operatorPrecedence && operatorPrecedence[token] <= operatorPrecedence[(0, _last2.default)(stack)]) {
        output.push(stack.pop());
      }

      stack.push(token);
    }

    if (token === '(') {
      stack.push(token);
    }

    if (token === ')') {
      while ((0, _last2.default)(stack) !== '(') {
        output.push(stack.pop());
      }

      stack.pop();
    }

    return output;
  }, []).concat(stack.reverse());
}
//# sourceMappingURL=shuntingYard.js.map