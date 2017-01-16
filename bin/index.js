'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeStickBinding = exports.makeButtonBinding = undefined;

require('babel-polyfill');

var _JoyMap = require('./JoyMap');

var _JoyMap2 = _interopRequireDefault(_JoyMap);

var _utils = require('./lib/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _JoyMap2.default;
var makeButtonBinding = exports.makeButtonBinding = _utils.makeButtonBinding;
var makeStickBinding = exports.makeStickBinding = _utils.makeStickBinding;