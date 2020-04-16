// Based on https://github.com/stewdio/THREE.VRController/blob/master/VRController.js
// and https://codepen.io/anon/pen/yKgYGz

import { isArray, mapValues } from 'lodash/fp';

import { RawGamepad, Effect } from './baseUtils';

type GamepadId = string;
type ChannelName = string;

export const MAX_DURATION = 5000;
const defaultChannel = 'default';
const allChannels: Record<GamepadId, Record<ChannelName, (Effect | number)[]>> = {};

export function applyRumble(pad: RawGamepad, effect: Effect) {
  if (!pad.vibrationActuator) {
    return Promise.reject(
      `Joymap rumble applyRumble: Gamepad ${pad.id} does not support haptic feedback`,
    );
  }

  return pad.vibrationActuator.playEffect('dual-rumble', effect);
}

export function stopRumble(padId: string, channelName = defaultChannel) {
  if (!allChannels[padId]) {
    allChannels[padId] = {};
  }

  allChannels[padId][channelName] = [];
}

export function addRumble(
  padId: string,
  effect: Effect | (Effect | number)[],
  channelName = defaultChannel,
) {
  if (!allChannels[padId]) {
    allChannels[padId] = {};
  }

  allChannels[padId][channelName] = isArray(effect) ? effect : [effect];
}

export function getCurrentEffect(padId: string): Effect {
  if (!allChannels[padId]) {
    allChannels[padId] = {};
  }

  const strongMagnitude = Object.values(allChannels[padId]).reduce((sum, channel) => {
    const curr = channel[0];
    if (!!curr && typeof curr !== 'number') {
      return sum + (curr.strongMagnitude || 0);
    }
    return sum;
  }, 0);

  const weakMagnitude = Object.values(allChannels[padId]).reduce((sum, channel) => {
    const curr = channel[0];
    if (!!curr && typeof curr !== 'number') {
      return sum + (curr.weakMagnitude || 0);
    }
    return sum;
  }, 0);

  return {
    strongMagnitude: Math.min(1, Math.max(0, strongMagnitude)),
    weakMagnitude: Math.min(1, Math.max(0, weakMagnitude)),
    duration: MAX_DURATION,
  };
}

export function updateChannels(padId: string, timeElapsed: number) {
  if (!allChannels[padId]) {
    allChannels[padId] = {};
  }

  allChannels[padId] = mapValues((channels) => {
    let curr = timeElapsed;
    return channels
      .map((channelValue) => {
        if (curr > 0) {
          if (typeof channelValue === 'number') {
            const result = Math.max(0, channelValue - curr);
            curr -= channelValue;
            return result;
          }

          const result = Math.max(0, channelValue.duration - curr);
          curr -= channelValue.duration;
          channelValue.duration = result;
        }

        return channelValue;
      })
      .filter((channelValue) => {
        if (typeof channelValue === 'number') {
          return channelValue > 0;
        }
        return channelValue.duration > 0;
      });
  }, allChannels[padId]);
}
