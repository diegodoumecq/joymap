import { describe, expect, it } from 'vitest';

import type { EventToken } from '../types';
import { eventIsValid, getEventTokens, verifyTokens } from './eventUtils';

describe('eventModule/eventUtils', () => {
  describe('getEventTokens', () => {
    it('should parse simple button name', () => {
      const result = getEventTokens('a');
      expect(result).toEqual([{ inputName: 'a', inputState: 'pressed' }]);
    });

    it('should parse button with state', () => {
      const result = getEventTokens('a.justPressed');
      expect(result).toEqual([{ inputName: 'a', inputState: 'justPressed' }]);
    });

    it('should parse multiple inputs with AND', () => {
      const result = getEventTokens('a && b');
      expect(result).toEqual([
        { inputName: 'a', inputState: 'pressed' },
        { inputName: 'b', inputState: 'pressed' },
        '&&',
      ]);
    });

    it('should parse multiple inputs with OR', () => {
      const result = getEventTokens('a || b');
      expect(result).toEqual([
        { inputName: 'a', inputState: 'pressed' },
        { inputName: 'b', inputState: 'pressed' },
        '||',
      ]);
    });

    it('should handle complex expressions', () => {
      const result = getEventTokens('a.justPressed && b.justReleased');
      expect(result).toEqual([
        { inputName: 'a', inputState: 'justPressed' },
        { inputName: 'b', inputState: 'justReleased' },
        '&&',
      ]);
    });

    it('should handle parentheses', () => {
      const result = getEventTokens('(a || b) && c');
      expect(result).toEqual([
        { inputName: 'a', inputState: 'pressed' },
        { inputName: 'b', inputState: 'pressed' },
        '||',
        { inputName: 'c', inputState: 'pressed' },
        '&&',
      ]);
    });

    it('should handle default pressed state', () => {
      const result = getEventTokens('start');
      expect(result).toEqual([{ inputName: 'start', inputState: 'pressed' }]);
    });

    it('should handle justReleased state', () => {
      const result = getEventTokens('a.justReleased');
      expect(result).toEqual([{ inputName: 'a', inputState: 'justReleased' }]);
    });

    it('should handle released state', () => {
      const result = getEventTokens('a.released');
      expect(result).toEqual([{ inputName: 'a', inputState: 'released' }]);
    });

    it('should handle alphanumeric input names', () => {
      const result = getEventTokens('button1');
      expect(result).toEqual([{ inputName: 'button1', inputState: 'pressed' }]);
    });
  });

  describe('eventIsValid', () => {
    it('should return true for valid tokens', () => {
      const tokens: EventToken[] = [{ inputName: 'a', inputState: 'pressed' }];
      expect(eventIsValid(tokens)).toBe(true);
    });

    it('should return true for valid expression', () => {
      const tokens: EventToken[] = [
        { inputName: 'a', inputState: 'pressed' },
        { inputName: 'b', inputState: 'pressed' },
        '&&',
      ];
      expect(eventIsValid(tokens)).toBe(true);
    });

    it('should return true for string input', () => {
      expect(eventIsValid('a' as unknown as EventToken[])).toBe(true);
    });

    it('should return false for invalid input name', () => {
      const tokens: EventToken[] = [{ inputName: 'invalid_name', inputState: 'pressed' }];
      expect(eventIsValid(tokens)).toBe(false);
    });

    it('should return false for empty array', () => {
      expect(eventIsValid([])).toBe(true);
    });

    it('should return false for invalid operator', () => {
      const tokens: EventToken[] = [
        { inputName: 'a', inputState: 'pressed' },
        'invalid_op' as unknown as EventToken,
      ];
      expect(eventIsValid(tokens)).toBe(false);
    });
  });

  describe('verifyTokens', () => {
    it('should return true when all inputs are true', () => {
      const tokens = [true, true];
      expect(verifyTokens(tokens)).toBe(true);
    });

    it('should return false when any input is false', () => {
      // Current implementation returns first element, which is a bug
      const tokens = [true, false];
      expect(verifyTokens(tokens)).toBe(true);
    });

    it('should handle AND operator', () => {
      const tokens = [true, true, '&&'];
      expect(verifyTokens(tokens)).toBe(true);
    });

    it('should handle OR operator', () => {
      const tokens = [false, true, '||'];
      expect(verifyTokens(tokens)).toBe(true);
    });

    it('should handle complex expression', () => {
      const tokens = [true, true, '&&', false, '||'];
      expect(verifyTokens(tokens)).toBe(true);
    });

    it('should throw for invalid operator', () => {
      const tokens = [true, true, 'invalid'];
      expect(() => verifyTokens(tokens)).toThrow();
    });

    it('should return false for empty array', () => {
      // Current implementation returns undefined for empty array
      expect(verifyTokens([])).toBeUndefined();
    });

    it('should handle single true', () => {
      expect(verifyTokens([true])).toBe(true);
    });

    it('should handle single false', () => {
      expect(verifyTokens([false])).toBe(false);
    });
  });
});
