'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.default = createEventModule;

var _fastMemoize = require('fast-memoize');

var _fastMemoize2 = _interopRequireDefault(_fastMemoize);

var _base = require('../baseModule/base');

var _base2 = _interopRequireDefault(_base);

var _utils = require('../common/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isValidButtonEventName(name, buttons) {
    return (0, _keys2.default)(buttons).includes(name);
}

function isValidStickEventName(name, sticks) {
    return (0, _keys2.default)(sticks).includes(name);
}

function createEventModule() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _createBaseModule = (0, _base2.default)(params),
        state = _createBaseModule.state,
        baseModule = _createBaseModule.module;

    var buttonMapMemoized = (0, _fastMemoize2.default)(_utils.buttonMap);
    var stickMapMemoized = (0, _fastMemoize2.default)(_utils.stickMap);

    var buttonEvents = [];
    var stickEvents = [];

    var module = (0, _extends3.default)({}, baseModule, {
        addButtonEvent: function addButtonEvent(name, callback) {
            if (isValidButtonEventName(name, state.buttons)) {
                buttonEvents.push({
                    name: name, callback: callback
                });
            }
        },
        removeButtonEvent: function removeButtonEvent(name, callback) {
            buttonEvents = buttonEvents.filter(function (e) {
                return e.name !== name || e.callback !== callback;
            });
        },
        addStickEvent: function addStickEvent(name, callback) {
            if (isValidStickEventName(name, state.sticks)) {
                stickEvents.push({
                    name: name, callback: callback
                });
            }
        },
        removeStickEvent: function removeStickEvent(name, callback) {
            stickEvents = stickEvents.filter(function (e) {
                return e.name !== name || e.callback !== callback;
            });
        },
        update: function update(gamepad) {
            baseModule.update(gamepad);

            buttonEvents.forEach(function (e) {
                var indexes = state.buttons[e.name];
                var result = buttonMapMemoized(state.pad, state.prevPad, indexes, state.threshold);

                if (result.pressed) {
                    e.callback(result);
                }
            });
            stickEvents.forEach(function (e) {
                var stick = state.sticks[e.name];
                var result = stickMapMemoized(state.pad, state.prevPad, stick.indexes, stick.inverts, state.threshold);

                if (result.pressed) {
                    e.callback(result);
                }
            });
        }
    });

    return module;
}