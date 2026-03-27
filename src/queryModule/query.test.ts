import { describe, expect, it } from 'vitest';

import type { RawGamepad } from '../types';
import createQueryModule, { emptyButton, emptyStick } from './query';

const makeGamepadButtons = (values: number[]) =>
  values.map((value) => ({ pressed: value > 0, value, touched: false }));

const mockGamepad = (
  id: string,
  buttonValues: number[] = [0, 0, 0, 0],
  axisValues: number[] = [0, 0, 0, 0],
): RawGamepad =>
  ({
    id,
    index: 0,
    connected: true,
    mapping: 'standard',
    timestamp: Date.now(),
    buttons: makeGamepadButtons(buttonValues),
    axes: axisValues,
    vibrationActuator: null,
    hapticActuators: [],
  }) as RawGamepad;

describe('queryModule/query', () => {
  describe('getButton', () => {
    it('should return empty button when not connected', () => {
      const module = createQueryModule();
      const result = module.getButton('A');
      expect(result).toEqual(emptyButton);
    });

    it('should return button value when connected', () => {
      const module = createQueryModule({ padId: 'gamepad-0' });
      const pad = mockGamepad('gamepad-0', [1, 0, 0, 0]);
      module.update(pad);

      const result = module.getButton('A');
      expect(result.pressed).toBe(true);
      expect(result.value).toBe(1);
      expect(result.type).toBe('button');
    });

    it('should return pressed false when below threshold', () => {
      const module = createQueryModule({ padId: 'gamepad-0', threshold: 0.5 });
      const pad = mockGamepad('gamepad-0', [0.3, 0, 0, 0]);
      module.update(pad);

      const result = module.getButton('A');
      expect(result.pressed).toBe(false);
    });
  });

  describe('getButtons', () => {
    it('should return empty buttons when not connected', () => {
      const module = createQueryModule();
      const result = module.getButtons('A', 'B');
      expect(result.A).toEqual(emptyButton);
      expect(result.B).toEqual(emptyButton);
    });

    it('should return multiple button values', () => {
      const module = createQueryModule({ padId: 'gamepad-0' });
      const pad = mockGamepad('gamepad-0', [1, 0.5, 0, 0]);
      module.update(pad);

      const result = module.getButtons('A', 'B');
      expect(result.A.pressed).toBe(true);
      expect(result.B.pressed).toBe(true);
    });
  });

  describe('getAllButtons', () => {
    it('should return empty object when not connected', () => {
      const module = createQueryModule();
      const result = module.getAllButtons();
      // When not connected, it returns empty object (actual behavior)
      expect(Object.keys(result).length).toBe(0);
    });

    it('should return all button values', () => {
      const module = createQueryModule({ padId: 'gamepad-0' });
      const pad = mockGamepad('gamepad-0', [1, 0, 0, 0]);
      module.update(pad);

      const result = module.getAllButtons();
      expect(result.A.pressed).toBe(true);
    });
  });

  describe('getStick', () => {
    it('should return empty stick when not connected', () => {
      const module = createQueryModule();
      const result = module.getStick('L');
      expect(result).toEqual(emptyStick);
    });

    it('should return stick value when connected', () => {
      const module = createQueryModule({ padId: 'gamepad-0' });
      const pad = mockGamepad('gamepad-0', [], [0.5, -0.5, 0, 0]);
      module.update(pad);

      const result = module.getStick('L');
      expect(result.pressed).toBe(true);
      expect(result.value[0]).toBeCloseTo(0.5);
      expect(result.value[1]).toBeCloseTo(-0.5);
      expect(result.type).toBe('stick');
    });

    it('should apply invert', () => {
      const module = createQueryModule({ padId: 'gamepad-0' });
      module.setStick('L', [[0, 1]], [true, false]);
      const pad = mockGamepad('gamepad-0', [], [0.5, 0.5, 0, 0]);
      module.update(pad);

      const result = module.getStick('L');
      expect(result.value[0]).toBeCloseTo(-0.5);
      expect(result.value[1]).toBeCloseTo(0.5);
    });

    it('should return pressed false when below threshold', () => {
      const module = createQueryModule({ padId: 'gamepad-0', threshold: 0.5 });
      const pad = mockGamepad('gamepad-0', [], [0.3, 0.3, 0, 0]);
      module.update(pad);

      const result = module.getStick('L');
      expect(result.pressed).toBe(false);
    });
  });

  describe('getSticks', () => {
    it('should return empty sticks when not connected', () => {
      const module = createQueryModule();
      const result = module.getSticks('L', 'R');
      expect(result.L).toEqual(emptyStick);
      expect(result.R).toEqual(emptyStick);
    });

    it('should return multiple stick values', () => {
      const module = createQueryModule({ padId: 'gamepad-0' });
      const pad = mockGamepad('gamepad-0', [], [0.5, 0, 0.5, 0]);
      module.update(pad);

      const result = module.getSticks('L', 'R');
      expect(result.L.pressed).toBe(true);
      expect(result.R.pressed).toBe(true);
    });
  });

  describe('getAllSticks', () => {
    it('should return empty object when not connected', () => {
      const module = createQueryModule();
      const result = module.getAllSticks();
      // When not connected, it returns empty object (actual behavior)
      expect(Object.keys(result).length).toBe(0);
    });

    it('should return all stick values', () => {
      const module = createQueryModule({ padId: 'gamepad-0' });
      const pad = mockGamepad('gamepad-0', [], [0.5, 0, 0, 0]);
      module.update(pad);

      const result = module.getAllSticks();
      expect(result.L.pressed).toBe(true);
    });
  });

  describe('mapper', () => {
    it('should return null when not connected', () => {
      const module = createQueryModule();
      const result = module.getMapper('testMapper');
      expect(result).toBeNull();
    });

    it('should throw when mapper not defined but connected', () => {
      const module = createQueryModule({ padId: 'gamepad-0' });
      // When connected but mapper doesn't exist, it throws an error
      expect(() => module.getMapper('nonExistent')).toThrow();
    });

    it('should return mapper result when defined', () => {
      const module = createQueryModule({ padId: 'gamepad-0' });
      module.setMapper('testMapper', (m) => m.getButton('A'));
      const pad = mockGamepad('gamepad-0', [1, 0, 0, 0]);
      module.update(pad);

      const result = module.getMapper('testMapper');
      expect(result).toBeDefined();
      expect(result.pressed).toBe(true);
    });

    it('should get multiple mappers', () => {
      const module = createQueryModule({ padId: 'gamepad-0' });
      module.setMapper('mapper1', () => 'result1');
      module.setMapper('mapper2', () => 'result2');

      const result = module.getMappers('mapper1', 'mapper2');
      expect(result.mapper1).toBe('result1');
      expect(result.mapper2).toBe('result2');
    });

    it('should get all mappers', () => {
      const module = createQueryModule({ padId: 'gamepad-0' });
      module.setMapper('mapper1', () => 'result1');
      module.setMapper('mapper2', () => 'result2');

      const result = module.getAllMappers();
      expect(result.mapper1).toBe('result1');
      expect(result.mapper2).toBe('result2');
    });

    it('should remove mapper', () => {
      const module = createQueryModule({ padId: 'gamepad-0' });
      module.setMapper('testMapper', () => 'result');
      module.removeMapper('testMapper');
      // After removal, trying to get it will throw
      expect(() => module.getMapper('testMapper')).toThrow();
    });

    it('should clear all mappers', () => {
      const module = createQueryModule({ padId: 'gamepad-0' });
      module.setMapper('mapper1', () => 'result1');
      module.setMapper('mapper2', () => 'result2');
      module.clearMappers();

      const result = module.getAllMappers();
      expect(Object.keys(result).length).toBe(0);
    });
  });

  describe('justChanged', () => {
    it('should detect button justChanged', () => {
      const module = createQueryModule({ padId: 'gamepad-0' });
      const pad1 = mockGamepad('gamepad-0', [0, 0, 0, 0]);
      module.update(pad1);

      const pad2 = mockGamepad('gamepad-0', [1, 0, 0, 0]);
      module.update(pad2);

      const result = module.getButton('A');
      expect(result.justChanged).toBe(true);
    });

    it('should detect stick justChanged', () => {
      const module = createQueryModule({ padId: 'gamepad-0' });
      const pad1 = mockGamepad('gamepad-0', [], [0, 0, 0, 0]);
      module.update(pad1);

      const pad2 = mockGamepad('gamepad-0', [], [0.5, 0, 0, 0]);
      module.update(pad2);

      const result = module.getStick('L');
      expect(result.justChanged).toBe(true);
    });
  });
});
