import { describe, expect, it } from 'vitest';

import {
  buttonMap,
  findIndexes,
  gamepadIsValid,
  isButtonSignificant,
  isConsecutive,
  isStickSignificant,
  nameIsValid,
  roundSticks,
  stickMap,
} from '../common/utils';
import { CustomGamepad, RawGamepad } from '../types';

describe('common/utils', () => {
  describe('isConsecutive', () => {
    it('should return true for empty array', () => {
      expect(isConsecutive([])).toBe(true);
    });

    it('should return true for single element', () => {
      expect(isConsecutive([1])).toBe(true);
    });

    it('should return true for consecutive numbers', () => {
      expect(isConsecutive([1, 2, 3, 4])).toBe(true);
    });

    it('should return false for non-consecutive numbers', () => {
      expect(isConsecutive([1, 3, 4])).toBe(false);
    });

    it('should return false for descending consecutive', () => {
      expect(isConsecutive([4, 3, 2, 1])).toBe(false);
    });
  });

  describe('findIndexes', () => {
    it('should find indexes matching predicate', () => {
      const result = findIndexes((x) => x > 2, [1, 2, 3, 4, 5]);
      expect(result).toEqual([2, 3, 4]);
    });

    it('should return empty array when none match', () => {
      const result = findIndexes((x) => x > 10, [1, 2, 3]);
      expect(result).toEqual([]);
    });

    it('should return all indexes when all match', () => {
      const result = findIndexes((x) => x > 0, [1, 2, 3]);
      expect(result).toEqual([0, 1, 2]);
    });
  });

  describe('gamepadIsValid', () => {
    const validGamepad = {
      connected: true,
      buttons: [{ value: 0 }, { value: 1 }],
      axes: [0, 0, 0, 0],
      timestamp: 1000,
      id: 'Test Gamepad',
    } as unknown as RawGamepad;

    it('should return false for null', () => {
      expect(gamepadIsValid(null)).toBe(false);
    });

    it('should return false when not connected', () => {
      expect(gamepadIsValid({ ...validGamepad, connected: false })).toBe(false);
    });

    it('should return false when no buttons', () => {
      expect(gamepadIsValid({ ...validGamepad, buttons: [] })).toBe(false);
    });

    it('should return false when no axes', () => {
      expect(gamepadIsValid({ ...validGamepad, axes: [] })).toBe(false);
    });

    it('should return false when timestamp is 0', () => {
      expect(gamepadIsValid({ ...validGamepad, timestamp: 0 })).toBe(false);
    });

    it('should return false when no id', () => {
      expect(gamepadIsValid({ ...validGamepad, id: '' })).toBe(false);
    });

    it('should return true for valid gamepad', () => {
      expect(gamepadIsValid(validGamepad)).toBe(true);
    });
  });

  describe('nameIsValid', () => {
    it('should return true for alphanumeric names', () => {
      expect(nameIsValid('abc123')).toBe(true);
    });

    it('should return true for numbers only', () => {
      expect(nameIsValid('123')).toBe(true);
    });

    it('should return true for letters only', () => {
      expect(nameIsValid('abc')).toBe(true);
    });

    it('should return false for empty string', () => {
      expect(nameIsValid('')).toBe(false);
    });

    it('should return false for special characters', () => {
      expect(nameIsValid('abc_123')).toBe(false);
    });

    it('should return false for spaces', () => {
      expect(nameIsValid('abc 123')).toBe(false);
    });
  });

  describe('isButtonSignificant', () => {
    it('should return false when value below threshold', () => {
      expect(isButtonSignificant(0.1, 0.2)).toBe(false);
    });

    it('should return true when value above threshold', () => {
      expect(isButtonSignificant(0.3, 0.2)).toBe(true);
    });

    it('should return true when value equals threshold', () => {
      expect(isButtonSignificant(0.21, 0.2)).toBe(true);
    });

    it('should work with negative values', () => {
      expect(isButtonSignificant(-0.3, 0.2)).toBe(true);
    });
  });

  describe('isStickSignificant', () => {
    it('should return false when squared magnitude below threshold squared', () => {
      expect(isStickSignificant([0.1, 0.1], 0.2)).toBe(false);
    });

    it('should return true when squared magnitude above threshold squared', () => {
      expect(isStickSignificant([0.3, 0.3], 0.2)).toBe(true);
    });

    it('should return true for single axis', () => {
      expect(isStickSignificant([0.5], 0.2)).toBe(true);
    });

    it('should return false for zeros', () => {
      expect(isStickSignificant([0, 0], 0.2)).toBe(false);
    });
  });

  describe('buttonMap', () => {
    const makePad = (buttons: number[]): CustomGamepad => ({
      axes: [],
      buttons,
      rawPad: undefined,
    });

    it('should return pressed: true when button pressed above threshold', () => {
      const pad = makePad([1]);
      const prevPad = makePad([0]);
      const result = buttonMap(pad, prevPad, [0], 0.2, true);
      expect(result.pressed).toBe(true);
      expect(result.value).toBe(1);
    });

    it('should return pressed: false when button below threshold', () => {
      const pad = makePad([0.1]);
      const prevPad = makePad([0]);
      const result = buttonMap(pad, prevPad, [0], 0.2, true);
      expect(result.pressed).toBe(false);
      expect(result.value).toBe(0);
    });

    it('should detect justChanged', () => {
      const pad = makePad([1]);
      const prevPad = makePad([0]);
      const result = buttonMap(pad, prevPad, [0], 0.2, true);
      expect(result.justChanged).toBe(true);
    });

    it('should return type button', () => {
      const pad = makePad([1]);
      const prevPad = makePad([0]);
      const result = buttonMap(pad, prevPad, [0], 0.2, true);
      expect(result.type).toBe('button');
    });

    it('should combine multiple button indexes with max', () => {
      const pad = makePad([0.5, 1]);
      const prevPad = makePad([0, 0]);
      const result = buttonMap(pad, prevPad, [0, 1], 0.2, true);
      expect(result.value).toBe(1);
    });
  });

  describe('roundSticks', () => {
    it('should return zeros when nothing significant', () => {
      const result = roundSticks([[0, 1]], [0, 0], 0.2);
      expect(result).toEqual([0, 0]);
    });

    it('should return averaged stick values when significant', () => {
      const result = roundSticks([[0, 1]], [0.5, 0.5], 0.2);
      expect(result).toEqual([0.5, 0.5]);
    });

    it('should average multiple sticks', () => {
      const result = roundSticks(
        [
          [0, 1],
          [2, 3],
        ],
        [0.2, 0.2, 0.4, 0.4],
        0.1,
      );
      expect(result[0]).toBeCloseTo(0.3);
      expect(result[1]).toBeCloseTo(0.3);
    });
  });

  describe('stickMap', () => {
    const makePad = (axes: number[]): CustomGamepad => ({
      axes,
      buttons: [],
      rawPad: undefined,
    });

    it('should return pressed: true when stick moved above threshold', () => {
      const pad = makePad([0.5, 0.5]);
      const prevPad = makePad([0, 0]);
      const result = stickMap(pad, prevPad, [[0, 1]], [false, false], 0.2, true);
      expect(result.pressed).toBe(true);
    });

    it('should return pressed: false when stick below threshold', () => {
      const pad = makePad([0.1, 0.1]);
      const prevPad = makePad([0, 0]);
      const result = stickMap(pad, prevPad, [[0, 1]], [false, false], 0.2, true);
      expect(result.pressed).toBe(false);
    });

    it('should apply invert', () => {
      const pad = makePad([0.5, 0.5]);
      const prevPad = makePad([0, 0]);
      const result = stickMap(pad, prevPad, [[0, 1]], [true, false], 0.2, true);
      expect(result.value).toEqual([-0.5, 0.5]);
    });

    it('should return type stick', () => {
      const pad = makePad([0.5, 0.5]);
      const prevPad = makePad([0, 0]);
      const result = stickMap(pad, prevPad, [[0, 1]], [false, false], 0.2, true);
      expect(result.type).toBe('stick');
    });

    it('should return inverts in result', () => {
      const pad = makePad([0.5, 0.5]);
      const prevPad = makePad([0, 0]);
      const result = stickMap(pad, prevPad, [[0, 1]], [true, false], 0.2, true);
      expect(result.inverts).toEqual([true, false]);
    });
  });
});
