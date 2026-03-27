import { describe, expect, it, vi } from 'vitest';

import type { RawGamepad } from '../types';
import createEventModule from './event';

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

describe('eventModule/event', () => {
  describe('addEvent/removeEvent', () => {
    it('should add simple button event', () => {
      const module = createEventModule({ padId: 'gamepad-0' });
      const callback = vi.fn();
      module.addEvent('A', callback);
      // Event is stored internally
      expect(callback).not.toHaveBeenCalled();
    });

    it('should add simple stick event', () => {
      const module = createEventModule({ padId: 'gamepad-0' });
      const callback = vi.fn();
      module.addEvent('L', callback);
      expect(callback).not.toHaveBeenCalled();
    });

    it('should add composite event with && operator', () => {
      const module = createEventModule({ padId: 'gamepad-0' });
      const callback = vi.fn();
      module.addEvent('A && B', callback);
      expect(callback).not.toHaveBeenCalled();
    });

    it('should add composite event with || operator', () => {
      const module = createEventModule({ padId: 'gamepad-0' });
      const callback = vi.fn();
      module.addEvent('A || B', callback);
      expect(callback).not.toHaveBeenCalled();
    });

    it('should remove event', () => {
      const module = createEventModule({ padId: 'gamepad-0' });
      const callback = vi.fn();
      module.addEvent('A', callback);
      module.removeEvent('A', callback);
      // Event should be removed
      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should call callback when button pressed', () => {
      const module = createEventModule({ padId: 'gamepad-0' });
      const callback = vi.fn();
      module.addEvent('A', callback);

      const pad = mockGamepad('gamepad-0', [1, 0, 0, 0]);
      module.update(pad);

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should not call callback when button not pressed', () => {
      const module = createEventModule({ padId: 'gamepad-0' });
      const callback = vi.fn();
      module.addEvent('A', callback);

      const pad = mockGamepad('gamepad-0', [0, 0, 0, 0]);
      module.update(pad);

      expect(callback).not.toHaveBeenCalled();
    });

    it('should call callback when stick moved', () => {
      const module = createEventModule({ padId: 'gamepad-0' });
      const callback = vi.fn();
      module.addEvent('L', callback);

      const pad = mockGamepad('gamepad-0', [], [0.5, 0.5, 0, 0]);
      module.update(pad);

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should not call callback when stick not moved', () => {
      const module = createEventModule({ padId: 'gamepad-0' });
      const callback = vi.fn();
      module.addEvent('L', callback);

      const pad = mockGamepad('gamepad-0', [], [0, 0, 0, 0]);
      module.update(pad);

      expect(callback).not.toHaveBeenCalled();
    });

    it('should call composite event when both buttons pressed (&&)', () => {
      const module = createEventModule({ padId: 'gamepad-0' });
      const callback = vi.fn();
      module.addEvent('A && B', callback);

      const pad = mockGamepad('gamepad-0', [1, 1, 0, 0]);
      module.update(pad);

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should not call composite event when one button not pressed (&&)', () => {
      const module = createEventModule({ padId: 'gamepad-0' });
      const callback = vi.fn();
      module.addEvent('A && B', callback);

      const pad = mockGamepad('gamepad-0', [1, 0, 0, 0]);
      module.update(pad);

      expect(callback).not.toHaveBeenCalled();
    });

    it('should call composite event when one button pressed (||)', () => {
      const module = createEventModule({ padId: 'gamepad-0' });
      const callback = vi.fn();
      module.addEvent('A || B', callback);

      const pad = mockGamepad('gamepad-0', [1, 0, 0, 0]);
      module.update(pad);

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should call justPressed event', () => {
      const module = createEventModule({ padId: 'gamepad-0' });
      const callback = vi.fn();
      module.addEvent('A.justPressed', callback);

      // First update - button not pressed
      const pad1 = mockGamepad('gamepad-0', [0, 0, 0, 0]);
      module.update(pad1);

      // Second update - button pressed
      const pad2 = mockGamepad('gamepad-0', [1, 0, 0, 0]);
      module.update(pad2);

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should call justReleased event', () => {
      const module = createEventModule({ padId: 'gamepad-0' });
      const callback = vi.fn();
      module.addEvent('A.justReleased', callback);

      // First update - button pressed
      const pad1 = mockGamepad('gamepad-0', [1, 0, 0, 0]);
      module.update(pad1);

      // Second update - button released
      const pad2 = mockGamepad('gamepad-0', [0, 0, 0, 0]);
      module.update(pad2);

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should not call when below threshold', () => {
      const module = createEventModule({ padId: 'gamepad-0', threshold: 0.5 });
      const callback = vi.fn();
      module.addEvent('A', callback);

      const pad = mockGamepad('gamepad-0', [0.3, 0, 0, 0]);
      module.update(pad);

      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('destroy', () => {
    it('should clear events on destroy', () => {
      const module = createEventModule({ padId: 'gamepad-0' });
      const callback = vi.fn();
      module.addEvent('A', callback);
      module.destroy();

      const pad = mockGamepad('gamepad-0', [1, 0, 0, 0]);
      module.update(pad);

      expect(callback).not.toHaveBeenCalled();
    });
  });
});
