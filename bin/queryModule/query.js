'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = createQueryModule;

var _fastMemoize = require('fast-memoize');

var _fastMemoize2 = _interopRequireDefault(_fastMemoize);

var _base = require('../baseModule/base');

var _base2 = _interopRequireDefault(_base);

var _utils = require('../common/utils');

var _queryUtils = require('./queryUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createQueryModule() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _createBaseModule = (0, _base2.default)(params),
        state = _createBaseModule.state,
        baseModule = _createBaseModule.module;

    var mappers = {};

    var buttonMapMemoized = (0, _fastMemoize2.default)(_utils.buttonMap);
    var stickMapMemoized = (0, _fastMemoize2.default)(_utils.stickMap);

    var module = (0, _extends3.default)({}, baseModule, {
        getButtons: function getButtons() {
            for (var _len = arguments.length, inputNames = Array(_len), _key = 0; _key < _len; _key++) {
                inputNames[_key] = arguments[_key];
            }

            if (!module.isConnected()) {
                return (0, _queryUtils.getEmptyButtons)(state.buttons, inputNames);
            }

            if (inputNames.length === 0) {
                return (0, _utils.mapValues)(function (button) {
                    return buttonMapMemoized(state.pad, state.prevPad, button, state.threshold);
                }, state.buttons);
            }

            if (inputNames.length === 1) {
                return buttonMapMemoized(state.pad, state.prevPad, state.buttons[inputNames[0]], state.threshold);
            }

            var result = {};
            inputNames.forEach(function (inputName) {
                result[inputName] = buttonMapMemoized(state.pad, state.prevPad, state.buttons[inputName], state.threshold);
            });

            return result;
        },
        getSticks: function getSticks() {
            for (var _len2 = arguments.length, inputNames = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                inputNames[_key2] = arguments[_key2];
            }

            if (!module.isConnected()) {
                return (0, _queryUtils.getEmptySticks)(state.sticks, inputNames);
            }

            if (inputNames.length === 0) {
                return (0, _utils.mapValues)(function (stick) {
                    var indexes = stick.indexes,
                        inverts = stick.inverts;

                    return stickMapMemoized(state.pad, state.prevPad, indexes, inverts, state.threshold);
                }, state.sticks);
            }

            if (inputNames.length === 1) {
                var _state$sticks$inputNa = state.sticks[inputNames[0]],
                    indexes = _state$sticks$inputNa.indexes,
                    inverts = _state$sticks$inputNa.inverts;

                return stickMapMemoized(state.pad, state.prevPad, indexes, inverts, state.threshold);
            }

            var result = {};
            inputNames.forEach(function (inputName) {
                var _state$sticks$inputNa2 = state.sticks[inputName],
                    indexes = _state$sticks$inputNa2.indexes,
                    inverts = _state$sticks$inputNa2.inverts;

                result[inputName] = stickMapMemoized(state.pad, state.prevPad, indexes, inverts, state.threshold);
            });

            return result;
        },
        getMappers: function getMappers() {
            for (var _len3 = arguments.length, mapperNames = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                mapperNames[_key3] = arguments[_key3];
            }

            if (!module.isConnected()) {
                return (0, _queryUtils.getEmptyMappers)(mappers, mapperNames);
            }

            if (mapperNames.length === 0) {
                return (0, _utils.mapValues)(function (mapper) {
                    return mapper(module);
                }, mappers);
            }

            if (mapperNames.length === 1) {
                return mappers[mapperNames[0]](module);
            }

            var result = {};
            mapperNames.forEach(function (mapperName) {
                result[mapperName] = mappers[mapperName](module);
            });

            return result;
        },
        setMapper: function setMapper(mapperName, callback) {
            if (!(0, _utils.nameIsValid)(mapperName)) {
                throw new Error('On setMapper(\'' + mapperName + '\', ...):\n                    first argument contains invalid characters');
            }

            mappers[mapperName] = callback;
        },
        removeMapper: function removeMapper(mapperName) {
            mappers = (0, _utils.omit)([mapperName], mappers);
        },
        clearMappers: function clearMappers() {
            mappers = {};
        },
        destroy: function destroy() {
            module.disconnect();
            state.pad = {
                buttons: [],
                axes: []
            };
            state.prevPad = {
                buttons: [],
                axes: []
            };
            module.clearMappers();
        }
    });

    return module;
}