'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createJoyMap = exports.createEventModule = exports.createQueryModule = exports.createBaseModule = undefined;

require('babel-polyfill');

var _base = require('./baseModule/base');

var _base2 = _interopRequireDefault(_base);

var _query = require('./queryModule/query');

var _query2 = _interopRequireDefault(_query);

var _event = require('./eventModule/event');

var _event2 = _interopRequireDefault(_event);

var _JoyMap = require('./JoyMap');

var _JoyMap2 = _interopRequireDefault(_JoyMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    createBaseModule: _base2.default,
    createQueryModule: _query2.default,
    createEventModule: _event2.default,
    createJoyMap: _JoyMap2.default
};
exports.createBaseModule = _base2.default;
exports.createQueryModule = _query2.default;
exports.createEventModule = _event2.default;
exports.createJoyMap = _JoyMap2.default;