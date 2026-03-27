import * as rxjs from 'rxjs';
import * as operators from 'rxjs/operators';
import { describe, expect, it } from 'vitest';

import type { RawGamepad } from '../types';
import createStreamModule from './stream';

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

describe('streamModule/stream', () => {
  describe('creation', () => {
    it('should throw if rxjs not provided', () => {
      expect(() => createStreamModule({} as Parameters<typeof createStreamModule>[0])).toThrow();
    });

    it('should throw if operators not provided', () => {
      expect(() =>
        createStreamModule({ rxjs } as Parameters<typeof createStreamModule>[0]),
      ).toThrow();
    });
  });

  describe('getAllButtonsStream', () => {
    it('should return observable stream', () => {
      const module = createStreamModule({ rxjs, operators, padId: 'gamepad-0' });
      const stream = module.getAllButtonsStream();
      expect(stream).toBeDefined();
    });
  });

  describe('getAllStickStream', () => {
    it('should return observable stream', () => {
      const module = createStreamModule({ rxjs, operators, padId: 'gamepad-0' });
      const stream = module.getAllStickStream();
      expect(stream).toBeDefined();
    });
  });

  describe('getButtonStream', () => {
    it('should return observable for button', () => {
      const module = createStreamModule({ rxjs, operators, padId: 'gamepad-0' });
      const stream = module.getButtonStream('A');
      expect(stream).toBeDefined();
    });

    it('should return same stream on multiple calls', () => {
      const module = createStreamModule({ rxjs, operators, padId: 'gamepad-0' });
      const stream1 = module.getButtonStream('A');
      const stream2 = module.getButtonStream('A');
      expect(stream1).toBe(stream2);
    });
  });

  describe('getStickStream', () => {
    it('should return observable for stick', () => {
      const module = createStreamModule({ rxjs, operators, padId: 'gamepad-0' });
      const stream = module.getStickStream('L');
      expect(stream).toBeDefined();
    });

    it('should return same stream on multiple calls', () => {
      const module = createStreamModule({ rxjs, operators, padId: 'gamepad-0' });
      const stream1 = module.getStickStream('L');
      const stream2 = module.getStickStream('L');
      expect(stream1).toBe(stream2);
    });
  });

  describe('update', () => {
    it('should emit values on update', () => {
      const module = createStreamModule({ rxjs, operators, padId: 'gamepad-0' });
      const values: unknown[] = [];
      module.getAllButtonsStream().subscribe((v) => values.push(v));

      const pad = mockGamepad('gamepad-0', [1, 0, 0, 0]);
      module.update(pad);

      expect(values.length).toBeGreaterThan(0);
    });
  });

  describe('destroy', () => {
    it('should not throw on destroy', () => {
      const module = createStreamModule({ rxjs, operators, padId: 'gamepad-0' });
      expect(() => module.destroy()).not.toThrow();
    });
  });
});
