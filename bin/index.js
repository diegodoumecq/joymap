'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stickBindings = exports.makeButtonBinding = undefined;

var _JoyMap = require('./JoyMap');

var _JoyMap2 = _interopRequireDefault(_JoyMap);

var _utils = require('./lib/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Ugly imports and export because flow does not understand export X from 'path'

exports.default = _JoyMap2.default;
var makeButtonBinding = exports.makeButtonBinding = _utils.makeButtonBinding;
var stickBindings = exports.stickBindings = _utils.stickBindings;