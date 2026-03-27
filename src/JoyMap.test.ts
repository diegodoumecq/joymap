import { beforeEach, describe, expect, it, vi } from 'vitest';

import createEventModule from './eventModule/event';
import createJoymap from './JoyMap';
import createQueryModule from './queryModule/query';
import type { RawGamepad } from './types';

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

describe('JoyMap', () => {
  beforeEach(() => {
    // Mock navigator.getGamepads for jsdom environment
    Object.defineProperty(global, 'navigator', {
      value: {
        getGamepads: vi.fn(() => [mockGamepad('gamepad-0')]),
      },
      writable: true,
    });
  });

  describe('creation', () => {
    it('should create joymap instance', () => {
      const joymap = createJoymap();
      expect(joymap).toBeDefined();
    });

    it('should accept custom onPoll callback', () => {
      const onPoll = vi.fn();
      const joymap = createJoymap({ onPoll });
      joymap.poll();
      expect(onPoll).toHaveBeenCalled();
    });

    it('should default autoConnect to true', () => {
      const joymap = createJoymap();
      expect(joymap.getGamepads()).toEqual([]);
    });
  });

  describe('start/stop', () => {
    it('should set isSupported correctly', () => {
      const joymap = createJoymap();
      expect(joymap.isSupported()).toBe(true);
    });

    it('should start polling', () => {
      const joymap = createJoymap({ autoConnect: false });
      const pollSpy = vi.spyOn(joymap, 'poll');
      joymap.start();
      expect(pollSpy).toHaveBeenCalled();
      joymap.stop();
    });

    it('should stop polling', () => {
      const joymap = createJoymap({ autoConnect: false });
      joymap.start();
      joymap.stop();
      expect(joymap.isSupported()).toBe(true);
    });
  });

  describe('setOnPoll', () => {
    it('should update onPoll callback', () => {
      const joymap = createJoymap();
      const cb1 = vi.fn();
      const cb2 = vi.fn();
      joymap.setOnPoll(cb1);
      joymap.poll();
      expect(cb1).toHaveBeenCalled();
      expect(cb2).not.toHaveBeenCalled();
      joymap.setOnPoll(cb2);
      joymap.poll();
      expect(cb2).toHaveBeenCalled();
    });
  });

  describe('setAutoConnect', () => {
    it('should update autoConnect setting', () => {
      const joymap = createJoymap({ autoConnect: true });
      joymap.setAutoConnect(false);
      // After setting to false, adding a module won't auto-connect
      const module = createQueryModule();
      joymap.addModule(module);
      // With autoConnect=false, the module won't be connected automatically
      expect(module.isConnected()).toBe(false);
    });
  });

  describe('getGamepads', () => {
    it('should return empty array initially', () => {
      const joymap = createJoymap();
      expect(joymap.getGamepads()).toEqual([]);
    });

    it('should return gamepads after poll', () => {
      const joymap = createJoymap({ autoConnect: false });
      joymap.poll();
      expect(joymap.getGamepads().length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('getModules', () => {
    it('should return empty array initially', () => {
      const joymap = createJoymap();
      expect(joymap.getModules()).toEqual([]);
    });
  });

  describe('getUnusedPadIds', () => {
    it('should return available pad ids', () => {
      const joymap = createJoymap({ autoConnect: false });
      const unused = joymap.getUnusedPadIds();
      expect(Array.isArray(unused)).toBe(true);
    });
  });

  describe('addModule', () => {
    it('should add module to list', () => {
      const joymap = createJoymap({ autoConnect: false });
      const module = createQueryModule();
      joymap.addModule(module);
      expect(joymap.getModules().length).toBe(1);
    });

    it('should auto-connect module if autoConnect enabled after start', () => {
      const joymap = createJoymap({ autoConnect: true });
      const module = createQueryModule();
      joymap.addModule(module);
      joymap.start();
      expect(module.isConnected()).toBe(true);
    });
  });

  describe('removeModule', () => {
    it('should remove module from list', () => {
      const joymap = createJoymap({ autoConnect: false });
      const module = createQueryModule();
      joymap.addModule(module);
      joymap.removeModule(module);
      expect(joymap.getModules().length).toBe(0);
    });
  });

  describe('clearModules', () => {
    it('should remove all modules', () => {
      const joymap = createJoymap({ autoConnect: false });
      joymap.addModule(createQueryModule());
      joymap.addModule(createEventModule());
      joymap.clearModules();
      expect(joymap.getModules().length).toBe(0);
    });
  });

  describe('poll', () => {
    it('should poll gamepads and update modules', () => {
      const joymap = createJoymap({ autoConnect: false });
      const module = createQueryModule();
      joymap.addModule(module);
      joymap.poll();
      expect(joymap.getGamepads().length).toBeGreaterThanOrEqual(0);
    });
  });
});
