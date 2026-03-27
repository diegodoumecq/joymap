import { describe, expect, it, vi } from 'vitest';

import type { CustomGamepad, ListenOptions } from '../types';
import { getDefaultButtons, getDefaultSticks, mockGamepad, updateListenOptions } from './baseUtils';

describe('baseModule/baseUtils', () => {
  describe('mockGamepad', () => {
    it('should have empty axes', () => {
      expect(mockGamepad.axes).toEqual([]);
    });

    it('should have empty buttons', () => {
      expect(mockGamepad.buttons).toEqual([]);
    });

    it('should have undefined rawPad', () => {
      expect(mockGamepad.rawPad).toBeUndefined();
    });
  });

  describe('getDefaultButtons', () => {
    it('should return all standard gamepad buttons', () => {
      const buttons = getDefaultButtons();
      expect(Object.keys(buttons).sort()).toEqual(
        [
          'A',
          'B',
          'L1',
          'L2',
          'L3',
          'R1',
          'R2',
          'R3',
          'X',
          'Y',
          'home',
          'select',
          'start',
          'dpadDown',
          'dpadLeft',
          'dpadRight',
          'dpadUp',
        ].sort(),
      );
    });

    it('should map dpadUp to button index 12', () => {
      const buttons = getDefaultButtons();
      expect(buttons.dpadUp).toEqual([12]);
    });

    it('should map A to button index 0', () => {
      const buttons = getDefaultButtons();
      expect(buttons.A).toEqual([0]);
    });

    it('should map L3 to button index 10', () => {
      const buttons = getDefaultButtons();
      expect(buttons.L3).toEqual([10]);
    });
  });

  describe('getDefaultSticks', () => {
    it('should return L and R sticks', () => {
      const sticks = getDefaultSticks();
      expect(Object.keys(sticks)).toEqual(['L', 'R']);
    });

    it('should have L stick on axes 0 and 1', () => {
      const sticks = getDefaultSticks();
      expect(sticks.L).toEqual({ indexes: [[0, 1]], inverts: [false, false] });
    });

    it('should have R stick on axes 2 and 3', () => {
      const sticks = getDefaultSticks();
      expect(sticks.R).toEqual({ indexes: [[2, 3]], inverts: [false, false] });
    });
  });

  describe('updateListenOptions', () => {
    const makePad = (axes: number[], buttons: number[]): CustomGamepad => ({
      axes,
      buttons,
      rawPad: undefined,
    });

    it('should trigger callback when button quantity matches', () => {
      const callback = vi.fn();
      const listenOptions: ListenOptions = {
        callback,
        quantity: 1,
        type: 'buttons',
        currentValue: 0,
        useTimeStamp: false,
        targetValue: 1,
        consecutive: false,
        allowOffset: true,
      };

      const pad = makePad([], [1]);
      const result = updateListenOptions(listenOptions, pad, 0.2);

      expect(callback).toHaveBeenCalledWith([0]);
      expect(result).toBeNull();
    });

    it('should not trigger when below threshold', () => {
      const callback = vi.fn();
      const listenOptions: ListenOptions = {
        callback,
        quantity: 1,
        type: 'buttons',
        currentValue: 0,
        useTimeStamp: false,
        targetValue: 1,
        consecutive: false,
        allowOffset: true,
      };

      const pad = makePad([], [0.1]);
      const result = updateListenOptions(listenOptions, pad, 0.2);

      expect(callback).not.toHaveBeenCalled();
      expect(result).not.toBeNull();
    });

    it('should trigger after target polls', () => {
      const callback = vi.fn();
      let listenOptions: ListenOptions = {
        callback,
        quantity: 1,
        type: 'buttons',
        currentValue: 0,
        useTimeStamp: false,
        targetValue: 3,
        consecutive: false,
        allowOffset: true,
      };

      const pad = makePad([], [1]);
      listenOptions = updateListenOptions(listenOptions, pad, 0.2)!;
      listenOptions = updateListenOptions(listenOptions, pad, 0.2)!;
      const result = updateListenOptions(listenOptions, pad, 0.2);

      expect(callback).toHaveBeenCalledTimes(1);
      expect(result).toBeNull();
    });

    it('should trigger axes when quantity matches', () => {
      const callback = vi.fn();
      const listenOptions: ListenOptions = {
        callback,
        quantity: 2,
        type: 'axes',
        currentValue: 0,
        useTimeStamp: false,
        targetValue: 1,
        consecutive: true,
        allowOffset: true,
      };

      const pad = makePad([0.5, 0.5], []);
      const result = updateListenOptions(listenOptions, pad, 0.2);

      expect(callback).toHaveBeenCalledWith([[0, 1]]);
      expect(result).toBeNull();
    });

    it('should require consecutive axes', () => {
      const callback = vi.fn();
      const listenOptions: ListenOptions = {
        callback,
        quantity: 2,
        type: 'axes',
        currentValue: 0,
        useTimeStamp: false,
        targetValue: 1,
        consecutive: true,
        allowOffset: true,
      };

      const pad = makePad([0.5, 0, 0.5], []);
      updateListenOptions(listenOptions, pad, 0.2);

      expect(callback).not.toHaveBeenCalled();
    });

    it('should allow offset when allowOffset is true', () => {
      const callback = vi.fn();
      const listenOptions: ListenOptions = {
        callback,
        quantity: 2,
        type: 'axes',
        currentValue: 0,
        useTimeStamp: false,
        targetValue: 1,
        consecutive: false,
        allowOffset: true,
      };

      const pad = makePad([0, 0.5, 0.5], []);
      updateListenOptions(listenOptions, pad, 0.2);

      expect(callback).toHaveBeenCalled();
    });

    it('should reset currentValue when no match', () => {
      const listenOptions: ListenOptions = {
        callback: vi.fn(),
        quantity: 1,
        type: 'buttons',
        currentValue: 2,
        useTimeStamp: false,
        targetValue: 3,
        consecutive: false,
        allowOffset: true,
      };

      const pad = makePad([], [0]);
      const result = updateListenOptions(listenOptions, pad, 0.2);

      expect(result?.currentValue).toBe(0);
    });

    it('should use timestamp when useTimeStamp is true', () => {
      const callback = vi.fn();
      const listenOptions: ListenOptions = {
        callback,
        quantity: 1,
        type: 'buttons',
        currentValue: Date.now(),
        useTimeStamp: true,
        targetValue: 100,
        consecutive: false,
        allowOffset: true,
      };

      const pad = makePad([], [1]);
      const result = updateListenOptions(listenOptions, pad, 0.2);

      expect(callback).not.toHaveBeenCalled();
      expect(result).not.toBeNull();
    });
  });
});
