import { assignIn } from 'lodash/fp';

import { isButtonSignificant, findIndexes, isConsecutive, Button, Stick } from '../common/utils';

export interface Effect {
  duration: number;
  weakMagnitude?: number;
  strongMagnitude?: number;
}

// Only implemented by chrome, this api seems to be the spec from 2017
export interface RawGamepad extends Gamepad {
  vibrationActuator?: {
    playEffect: (type: 'dual-rumble', effect: Effect) => Promise<string>;
    reset: () => Promise<string>;
  };
}

export interface CustomGamepad {
  axes: number[];
  buttons: number[];
  rawPad?: RawGamepad;
}

export interface ListenOptions {
  callback: (indexes: number[] | number[][]) => void;
  quantity: number;
  type: 'buttons' | 'axes';
  currentValue: number;
  useTimeStamp: boolean;
  targetValue: number;
  consecutive: boolean;
  allowOffset: boolean;
}

export const mockGamepad: CustomGamepad = {
  axes: [],
  buttons: [],
  rawPad: undefined,
};

export function updateListenOptions(
  listenOptions: ListenOptions,
  pad: CustomGamepad,
  threshold: number,
) {
  const {
    callback,
    quantity,
    type,
    currentValue,
    targetValue,
    useTimeStamp,
    consecutive,
    allowOffset,
  } = listenOptions;

  const indexes =
    type === 'axes'
      ? findIndexes((value) => Math.abs(value) > threshold, pad.axes)
      : findIndexes((value) => isButtonSignificant(value, threshold), pad.buttons);

  if (
    indexes.length === quantity &&
    (!consecutive || isConsecutive(indexes)) &&
    (allowOffset || indexes[0] % quantity === 0)
  ) {
    if (useTimeStamp && currentValue === 0) {
      return assignIn(listenOptions, { currentValue: Date.now() });
    }

    const comparison = useTimeStamp ? Date.now() - currentValue : currentValue + 1;

    if (targetValue <= comparison) {
      if (type === 'axes') {
        callback([indexes]);
      } else {
        callback(indexes);
      }
      return null;
    }

    if (!useTimeStamp) {
      return assignIn(listenOptions, { currentValue: comparison });
    }

    return listenOptions;
  }

  return assignIn(listenOptions, { currentValue: 0 });
}

export function getDefaultButtons(): Record<string, Button> {
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
    home: [16],
  };
}

export function getDefaultSticks(): Record<string, Stick> {
  return {
    L: {
      indexes: [[0, 1]],
      inverts: [false, false],
    },
    R: {
      indexes: [[2, 3]],
      inverts: [false, false],
    },
  };
}
