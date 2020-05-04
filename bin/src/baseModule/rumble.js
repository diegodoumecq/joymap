"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeEffectStrict = makeEffectStrict;
exports.applyRumble = applyRumble;
exports.stopRumble = stopRumble;
exports.addRumble = addRumble;
exports.getCurrentEffect = getCurrentEffect;
exports.updateChannels = updateChannels;
exports.MAX_DURATION = void 0;

var _mapValues2 = _interopRequireDefault(require("lodash/fp/mapValues"));

var _isArray2 = _interopRequireDefault(require("lodash/fp/isArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MAX_DURATION = 5000;
exports.MAX_DURATION = MAX_DURATION;
var defaultChannel = 'default';
var allChannels = {};

function makeEffectStrict(effect) {
  if (typeof effect === 'number') {
    return {
      duration: effect,
      weakMagnitude: 0,
      strongMagnitude: 0
    };
  }

  return {
    duration: Math.max(0, effect.duration),
    weakMagnitude: Math.min(1, Math.max(0, effect.weakMagnitude || 0)),
    strongMagnitude: Math.min(1, Math.max(0, effect.strongMagnitude || 0))
  };
}

function applyRumble(pad, effect) {
  if (!pad.vibrationActuator) {
    return Promise.reject("Joymap rumble applyRumble: Gamepad ".concat(pad.id, " does not support haptic feedback"));
  }

  return pad.vibrationActuator.playEffect('dual-rumble', effect);
}

function stopRumble(padId) {
  var channelName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultChannel;

  if (!allChannels[padId]) {
    allChannels[padId] = {};
  }

  allChannels[padId][channelName] = [];
}

function addRumble(padId, effect) {
  var channelName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultChannel;

  if (!allChannels[padId]) {
    allChannels[padId] = {};
  }

  allChannels[padId][channelName] = (0, _isArray2.default)(effect) ? effect.map(makeEffectStrict) : [makeEffectStrict(effect)];
}

function getCurrentEffect(padId) {
  if (!allChannels[padId]) {
    allChannels[padId] = {};
  }

  var strongMagnitude = Object.values(allChannels[padId]).reduce(function (sum, channel) {
    var curr = channel[0];

    if (!!curr && typeof curr !== 'number') {
      return sum + (curr.strongMagnitude || 0);
    }

    return sum;
  }, 0);
  var weakMagnitude = Object.values(allChannels[padId]).reduce(function (sum, channel) {
    var curr = channel[0];

    if (!!curr && typeof curr !== 'number') {
      return sum + (curr.weakMagnitude || 0);
    }

    return sum;
  }, 0);
  return {
    strongMagnitude: Math.min(1, Math.max(0, strongMagnitude)),
    weakMagnitude: Math.min(1, Math.max(0, weakMagnitude)),
    duration: MAX_DURATION
  };
}

function updateChannels(padId, timeElapsed) {
  if (!allChannels[padId]) {
    allChannels[padId] = {};
  }

  allChannels[padId] = (0, _mapValues2.default)(function (channels) {
    var curr = timeElapsed;
    return channels.map(function (channelValue) {
      if (curr > 0) {
        var result = Math.max(0, channelValue.duration - curr);
        curr -= channelValue.duration;
        channelValue.duration = result;
      }

      return channelValue;
    }).filter(function (channelValue) {
      return channelValue.duration > 0;
    });
  }, allChannels[padId]);
}
//# sourceMappingURL=rumble.js.map