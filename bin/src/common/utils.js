"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isConsecutive = isConsecutive;
exports.findIndexes = findIndexes;
exports.getRawGamepads = getRawGamepads;
exports.gamepadIsValid = gamepadIsValid;
exports.nameIsValid = nameIsValid;
exports.isButtonSignificant = isButtonSignificant;
exports.isStickSignificant = isStickSignificant;
exports.buttonMap = buttonMap;
exports.roundSticks = roundSticks;
exports.stickMap = stickMap;

var _map2 = _interopRequireDefault(require("lodash/fp/map"));

var _reduce2 = _interopRequireDefault(require("lodash/fp/reduce"));

var _forEach2 = _interopRequireDefault(require("lodash/fp/forEach"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isConsecutive(target) {
  var length = target.length;

  if (length <= 1) {
    return true;
  }

  var i = 0;

  while (i < length - 1) {
    if (target[i] + 1 !== target[i + 1]) {
      return false;
    }

    i += 1;
  }

  return true;
}

function findIndexes(iterator, target) {
  var length = target.length;
  var result = [];
  var i = 0;

  while (i < length) {
    if (iterator(target[i])) {
      result.push(i);
    }

    i += 1;
  }

  return result;
}

function getRawGamepads() {
  if (navigator && navigator.getGamepads) {
    return Array.from(navigator.getGamepads());
  }

  return [];
}

function gamepadIsValid(rawGamepad) {
  return !!rawGamepad && !!rawGamepad.connected && !!rawGamepad.buttons.length && !!rawGamepad.axes.length && rawGamepad.timestamp !== 0 && !!rawGamepad.id;
}

function nameIsValid(name) {
  return /^[a-z0-9]+$/i.test(name);
}

function isButtonSignificant() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var threshold = arguments.length > 1 ? arguments[1] : undefined;
  return Math.abs(value) > threshold;
}

function isStickSignificant(stickValue, threshold) {
  var squaredMagnitude = (0, _reduce2.default)(function (result, value) {
    return result + Math.pow(value, 2);
  }, 0, stickValue);
  return threshold * threshold < squaredMagnitude;
}

function buttonMap(pad, prevPad, indexes, threshold, clampThreshold) {
  var length = indexes.length;
  var prevPressed = false;
  var value = 0;
  var pressed = false;
  var i = 0;

  while (i < length) {
    if (!prevPressed) {
      var prevValue = prevPad.buttons[indexes[i]] || 0;
      prevPressed = isButtonSignificant(prevValue, threshold);
    }

    var currValue = pad.buttons[indexes[i]] || 0;
    value = Math.max(value, currValue);

    if (!pressed) {
      pressed = isButtonSignificant(currValue, threshold);
    }

    i += 1;
  }

  return {
    type: 'button',
    value: !clampThreshold || pressed ? value : 0,
    pressed: pressed,
    justChanged: pressed !== prevPressed
  };
}

function roundSticks(indexMaps, axes, threshold) {
  var stickNumber = 0;
  var axesSums = [];
  (0, _forEach2.default)(function (indexes) {
    var values = (0, _map2.default)(function (i) {
      return axes[i];
    }, indexes);

    if (isStickSignificant(values, threshold)) {
      axesSums = values.map(function (v, i) {
        return v + (axesSums[i] || 0);
      });
      stickNumber += 1;
    }
  }, indexMaps);
  return stickNumber === 0 ? (0, _map2.default)(function () {
    return 0;
  }, indexMaps[0]) : (0, _map2.default)(function (v) {
    return v / stickNumber;
  }, axesSums);
}

function stickMap(pad, prevPad, indexMaps, inverts, threshold, clampThreshold) {
  var prevPressed = isStickSignificant(roundSticks(indexMaps, prevPad.axes, threshold), threshold);
  var value = roundSticks(indexMaps, pad.axes, threshold);
  var pressed = isStickSignificant(value, threshold);
  return {
    type: 'stick',
    value: !clampThreshold || pressed ? value.map(function (v, i) {
      return !inverts[i] ? v : v * -1;
    }) : (0, _map2.default)(function () {
      return 0;
    }, value),
    pressed: pressed,
    justChanged: pressed !== prevPressed,
    inverts: inverts
  };
}
//# sourceMappingURL=utils.js.map