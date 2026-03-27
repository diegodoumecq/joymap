import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { Effect, RawGamepad, StrictEffect } from '../types';
import {
  addRumble,
  allChannels,
  applyRumble,
  getCurrentEffect,
  makeEffectStrict,
  MAX_DURATION,
  stopRumble,
  updateChannels,
} from './rumble';

describe('baseModule/rumble', () => {
  const testPadId = 'test-gamepad-0';

  beforeEach(() => {
    // Clear all channels before each test
    Object.keys(allChannels).forEach((key) => {
      delete allChannels[key];
    });
  });

  describe('MAX_DURATION', () => {
    it('should be 5000ms', () => {
      expect(MAX_DURATION).toBe(5000);
    });
  });

  describe('makeEffectStrict', () => {
    it('should convert number to StrictEffect', () => {
      const result = makeEffectStrict(1000);
      expect(result).toEqual({
        duration: 1000,
        weakMagnitude: 0,
        strongMagnitude: 0,
      });
    });

    it('should handle object effect', () => {
      const effect: Effect = { duration: 2000, weakMagnitude: 0.5, strongMagnitude: 0.8 };
      const result = makeEffectStrict(effect);
      expect(result).toEqual({
        duration: 2000,
        weakMagnitude: 0.5,
        strongMagnitude: 0.8,
      });
    });

    it('should clamp duration to 0 if negative', () => {
      const result = makeEffectStrict({ duration: -100, weakMagnitude: 0.5, strongMagnitude: 0.5 });
      expect(result.duration).toBe(0);
    });

    it('should clamp weakMagnitude between 0 and 1', () => {
      const result = makeEffectStrict({ duration: 100, weakMagnitude: 1.5, strongMagnitude: 0.5 });
      expect(result.weakMagnitude).toBe(1);
    });

    it('should clamp strongMagnitude between 0 and 1', () => {
      const result = makeEffectStrict({ duration: 100, weakMagnitude: 0.5, strongMagnitude: -0.5 });
      expect(result.strongMagnitude).toBe(0);
    });

    it('should default magnitudes to 0 if not provided', () => {
      const result = makeEffectStrict({ duration: 100 });
      expect(result.weakMagnitude).toBe(0);
      expect(result.strongMagnitude).toBe(0);
    });
  });

  describe('stopRumble', () => {
    it('should clear all channels for pad', () => {
      addRumble(testPadId, { duration: 1000, weakMagnitude: 1, strongMagnitude: 1 });
      stopRumble(testPadId);
      const effect = getCurrentEffect(testPadId);
      expect(effect.weakMagnitude).toBe(0);
      expect(effect.strongMagnitude).toBe(0);
    });

    it('should clear specific channel', () => {
      addRumble(testPadId, { duration: 1000, weakMagnitude: 1, strongMagnitude: 1 }, 'channel1');
      addRumble(testPadId, { duration: 1000, weakMagnitude: 1, strongMagnitude: 1 }, 'channel2');
      stopRumble(testPadId, 'channel1');
      const effect = getCurrentEffect(testPadId);
      expect(effect.weakMagnitude).toBe(1);
    });

    it('should handle non-existent pad', () => {
      expect(() => stopRumble('non-existent')).not.toThrow();
    });
  });

  describe('addRumble', () => {
    it('should add effect to default channel', () => {
      addRumble(testPadId, { duration: 1000, weakMagnitude: 0.5, strongMagnitude: 0.5 });
      const effect = getCurrentEffect(testPadId);
      expect(effect.weakMagnitude).toBe(0.5);
      expect(effect.strongMagnitude).toBe(0.5);
    });

    it('should add effect to named channel', () => {
      addRumble(
        testPadId,
        { duration: 1000, weakMagnitude: 0.3, strongMagnitude: 0.7 },
        'myChannel',
      );
      const effect = getCurrentEffect(testPadId);
      expect(effect.weakMagnitude).toBe(0.3);
      expect(effect.strongMagnitude).toBe(0.7);
    });

    it('should accept array of effects', () => {
      const effects: (Effect | number)[] = [
        { duration: 500, weakMagnitude: 0.5, strongMagnitude: 0.5 },
        { duration: 500, weakMagnitude: 0.5, strongMagnitude: 0.5 },
      ];
      addRumble(testPadId, effects);
      const effect = getCurrentEffect(testPadId);
      // Only first effect is used
      expect(effect.weakMagnitude).toBe(0.5);
      expect(effect.strongMagnitude).toBe(0.5);
    });

    it('should accept number as effect (duration only)', () => {
      addRumble(testPadId, 1000);
      const effect = getCurrentEffect(testPadId);
      expect(effect.weakMagnitude).toBe(0);
      expect(effect.strongMagnitude).toBe(0);
    });
  });

  describe('getCurrentEffect', () => {
    it('should return zero magnitudes when no effects', () => {
      const effect = getCurrentEffect(testPadId);
      expect(effect.weakMagnitude).toBe(0);
      expect(effect.strongMagnitude).toBe(0);
    });

    it('should sum magnitudes from all channels', () => {
      addRumble(testPadId, { duration: 1000, weakMagnitude: 0.3, strongMagnitude: 0.4 }, 'ch1');
      addRumble(testPadId, { duration: 1000, weakMagnitude: 0.2, strongMagnitude: 0.3 }, 'ch2');
      const effect = getCurrentEffect(testPadId);
      expect(effect.weakMagnitude).toBe(0.5);
      expect(effect.strongMagnitude).toBe(0.7);
    });

    it('should clamp magnitudes to max 1', () => {
      addRumble(testPadId, { duration: 1000, weakMagnitude: 0.8, strongMagnitude: 0.8 }, 'ch1');
      addRumble(testPadId, { duration: 1000, weakMagnitude: 0.8, strongMagnitude: 0.8 }, 'ch2');
      const effect = getCurrentEffect(testPadId);
      expect(effect.weakMagnitude).toBe(1);
      expect(effect.strongMagnitude).toBe(1);
    });

    it('should ignore number-only effects in magnitude calculation', () => {
      addRumble(testPadId, 1000);
      addRumble(testPadId, { duration: 1000, weakMagnitude: 0.5, strongMagnitude: 0.5 });
      const effect = getCurrentEffect(testPadId);
      expect(effect.weakMagnitude).toBe(0.5);
      expect(effect.strongMagnitude).toBe(0.5);
    });

    it('should return MAX_DURATION as default duration', () => {
      addRumble(testPadId, { duration: 1000, weakMagnitude: 0.5, strongMagnitude: 0.5 });
      const effect = getCurrentEffect(testPadId);
      expect(effect.duration).toBe(MAX_DURATION);
    });
  });

  describe('updateChannels', () => {
    it('should decrease duration by elapsed time', () => {
      addRumble(testPadId, { duration: 1000, weakMagnitude: 1, strongMagnitude: 1 });
      updateChannels(testPadId, 500);
      const effect = getCurrentEffect(testPadId);
      expect(effect.weakMagnitude).toBe(1);
    });

    it('should remove effects with expired duration', () => {
      addRumble(testPadId, { duration: 100, weakMagnitude: 1, strongMagnitude: 1 });
      updateChannels(testPadId, 200);
      const effect = getCurrentEffect(testPadId);
      expect(effect.weakMagnitude).toBe(0);
      expect(effect.strongMagnitude).toBe(0);
    });

    it('should handle multiple channels', () => {
      addRumble(testPadId, { duration: 1000, weakMagnitude: 1, strongMagnitude: 1 }, 'ch1');
      addRumble(testPadId, { duration: 100, weakMagnitude: 1, strongMagnitude: 1 }, 'ch2');
      updateChannels(testPadId, 150);
      const effect = getCurrentEffect(testPadId);
      expect(effect.weakMagnitude).toBe(1);
      expect(effect.strongMagnitude).toBe(1);
    });

    it('should handle non-existent pad', () => {
      expect(() => updateChannels('non-existent', 100)).not.toThrow();
    });
  });

  describe('applyRumble', () => {
    it('should reject if no vibrationActuator', async () => {
      const mockPad = { id: 'test' } as unknown as RawGamepad;
      await expect(
        applyRumble(mockPad, { duration: 100, weakMagnitude: 0.5, strongMagnitude: 0.5 }),
      ).rejects.toBeDefined();
    });

    it('should call playEffect with dual-rumble', async () => {
      const mockPlayEffect = vi.fn().mockResolvedValue(undefined);
      const mockPad = {
        id: 'test',
        vibrationActuator: {
          playEffect: mockPlayEffect,
        },
      } as unknown as RawGamepad;

      const effect: StrictEffect = { duration: 100, weakMagnitude: 0.5, strongMagnitude: 0.5 };
      await applyRumble(mockPad, effect);

      expect(mockPlayEffect).toHaveBeenCalledWith('dual-rumble', effect);
    });
  });
});
