"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateListenOptions = updateListenOptions;
exports.getDefaultButtons = getDefaultButtons;
exports.getDefaultSticks = getDefaultSticks;
exports.mockGamepad = void 0;

var _assignIn2 = _interopRequireDefault(require("lodash/fp/assignIn"));

var _utils = require("../common/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mockGamepad = {
  axes: [],
  buttons: [],
  rawPad: undefined
};
exports.mockGamepad = mockGamepad;

function updateListenOptions(listenOptions, pad, threshold) {
  var callback = listenOptions.callback,
      quantity = listenOptions.quantity,
      type = listenOptions.type,
      currentValue = listenOptions.currentValue,
      targetValue = listenOptions.targetValue,
      useTimeStamp = listenOptions.useTimeStamp,
      consecutive = listenOptions.consecutive,
      allowOffset = listenOptions.allowOffset;
  var indexes = type === 'axes' ? (0, _utils.findIndexes)(function (value) {
    return Math.abs(value) > threshold;
  }, pad.axes) : (0, _utils.findIndexes)(function (value) {
    return (0, _utils.isButtonSignificant)(value, threshold);
  }, pad.buttons);

  if (indexes.length === quantity && (!consecutive || (0, _utils.isConsecutive)(indexes)) && (allowOffset || indexes[0] % quantity === 0)) {
    if (useTimeStamp && currentValue === 0) {
      return (0, _assignIn2.default)(listenOptions, {
        currentValue: Date.now()
      });
    }

    var comparison = useTimeStamp ? Date.now() - currentValue : currentValue + 1;

    if (targetValue <= comparison) {
      if (type === 'axes') {
        callback([indexes]);
      } else {
        callback(indexes);
      }

      return null;
    }

    if (!useTimeStamp) {
      return (0, _assignIn2.default)(listenOptions, {
        currentValue: comparison
      });
    }

    return listenOptions;
  }

  return (0, _assignIn2.default)(listenOptions, {
    currentValue: 0
  });
}

function getDefaultButtons() {
  return {
    dpadUp: [12],
    dpadDown: [13],
    dpadLeft: [14],
    dpadRight: [15],
    L1: [4],
    L2: [6],
    L3: [10],
    R1: [5],
    R2: [7],
    R3: [11],
    A: [0],
    B: [1],
    X: [2],
    Y: [3],
    start: [9],
    select: [8],
    home: [16]
  };
}

function getDefaultSticks() {
  return {
    L: {
      indexes: [[0, 1]],
      inverts: [false, false]
    },
    R: {
      indexes: [[2, 3]],
      inverts: [false, false]
    }
  };
}
//# sourceMappingURL=baseUtils.js.map