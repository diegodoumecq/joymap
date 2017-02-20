'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getEmptyMappers = getEmptyMappers;
exports.getEmptyButtons = getEmptyButtons;
exports.getEmptySticks = getEmptySticks;

var _utils = require('../common/utils');

function getEmptyMappers(mappers, mapperNames) {
    var emptyMapper = null;

    if (mapperNames.length === 0) {
        return (0, _utils.mapValues)(function () {
            return emptyMapper;
        }, mappers);
    }

    if (mapperNames.length === 1) {
        return emptyMapper;
    }

    var result = {};
    mapperNames.forEach(function (mapperName) {
        result[mapperName] = emptyMapper;
    });

    return result;
}

function getEmptyButtons(buttons, inputNames) {
    var emptyButton = {
        value: 0,
        pressed: false,
        justChanged: false
    };

    if (inputNames.length === 0) {
        return (0, _utils.mapValues)(function () {
            return emptyButton;
        }, buttons);
    }

    if (inputNames.length === 1) {
        return emptyButton;
    }

    var result = {};
    inputNames.forEach(function (mapperName) {
        result[mapperName] = emptyButton;
    });

    return result;
}

function getEmptySticks(sticks, inputNames) {
    var emptyStick = {
        value: [0, 0],
        pressed: false,
        justChanged: false,
        inverts: [false, false]
    };

    if (inputNames.length === 0) {
        return (0, _utils.mapValues)(function () {
            return emptyStick;
        }, sticks);
    }

    if (inputNames.length === 1) {
        return emptyStick;
    }

    var result = {};
    inputNames.forEach(function (mapperName) {
        result[mapperName] = emptyStick;
    });

    return result;
}