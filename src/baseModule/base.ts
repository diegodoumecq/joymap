import {
  findKey,
  isEqual,
  map,
  assignIn,
  forEach,
  flow,
  flatten,
  uniq,
  uniqBy,
  toString,
} from 'lodash/fp';

import { nameIsValid } from '../common/utils';
import { mockGamepad, getDefaultButtons, getDefaultSticks, updateListenOptions } from './baseUtils';
import {
  stopRumble,
  addRumble,
  applyRumble,
  getCurrentEffect,
  updateChannels,
  MAX_DURATION,
} from './rumble';
import {
  ListenOptions,
  RawGamepad,
  Effect,
  BaseParams,
  CustomGamepad,
  StrictEffect,
  Button,
  Stick,
} from '../types';

export type BaseModule = ReturnType<typeof createModule>;

interface BaseState {
  threshold: number;
  clampThreshold: boolean;
  pad: CustomGamepad;
  prevPad: CustomGamepad;
  prevRumble: StrictEffect;
  lastRumbleUpdate: number;
  lastUpdate: number;

  buttons: Record<string, Button>;
  sticks: Record<string, Stick>;
}

export default function createModule(params: BaseParams = {}) {
  let listenOptions: ListenOptions | null = null;
  let gamepadId = params.padId ? params.padId : null;
  let connected = !!params.padId;

  const state: BaseState = {
    threshold: params.threshold || 0.2,
    clampThreshold: params.clampThreshold !== false,
    pad: mockGamepad,
    prevPad: mockGamepad,
    prevRumble: {
      duration: 0,
      weakMagnitude: 0,
      strongMagnitude: 0,
    },
    lastRumbleUpdate: Date.now(),
    lastUpdate: Date.now(),

    buttons: getDefaultButtons(),
    sticks: getDefaultSticks(),
  };

  const module = {
    getPadId: () => gamepadId,

    isConnected: () => connected,

    disconnect: () => {
      connected = false;
    },

    connect: (padId?: string) => {
      connected = true;
      if (padId) {
        gamepadId = padId;
      }
    },

    getConfig: () =>
      JSON.stringify({
        threshold: state.threshold,
        clampThreshold: state.clampThreshold,
        buttons: state.buttons,
        sticks: state.sticks,
      }),

    setConfig: (serializedString: string) => assignIn(state, JSON.parse(serializedString)),

    getButtonIndexes: (...inputNames: string[]) =>
      flow(
        map((inputName: string) => state.buttons[inputName]),
        flatten,
        uniq,
      )(inputNames),

    getStickIndexes: (...inputNames: string[]) =>
      flow(
        map((inputName: string) => state.sticks[inputName].indexes),
        flatten,
        uniqBy(toString),
      )(inputNames),

    setButton: (inputName: string, indexes: number[]) => {
      if (!nameIsValid(inputName)) {
        throw new Error(`On setButton('${inputName}'): argument contains invalid characters`);
      }
      state.buttons[inputName] = indexes;
    },

    setStick: (inputName: string, indexes: number[][], inverts?: boolean[]) => {
      if (!nameIsValid(inputName)) {
        throw new Error(`On setStick('${inputName}'): inputName contains invalid characters`);
      }

      if (indexes.length === 0) {
        throw new Error(`On setStick('${inputName}', indexes): argument indexes is an empty array`);
      }

      state.sticks[inputName] = {
        indexes,
        inverts: inverts || map(() => false, indexes[0]),
      };
    },

    invertSticks: (inverts: boolean[], ...inputNames: string[]) => {
      forEach((inputName) => {
        const stick = state.sticks[inputName];
        if (stick.inverts.length === inverts.length) {
          stick.inverts = inverts;
        } else {
          throw new Error(
            `On invertSticks(inverts, [..., ${inputName}, ...]): given argument inverts' length does not match '${inputName}' axis' length`,
          );
        }
      }, inputNames);
    },

    swapButtons: (btn1: string, btn2: string) => {
      const { buttons } = state;
      [buttons[btn1], buttons[btn2]] = [buttons[btn2], buttons[btn1]];
    },

    swapSticks: (stick1: string, stick2: string, includeInverts = false) => {
      const { sticks } = state;
      if (includeInverts) {
        [sticks[stick1], sticks[stick2]] = [sticks[stick2], sticks[stick1]];
      } else {
        [sticks[stick1].indexes, sticks[stick2].indexes] = [
          sticks[stick2].indexes,
          sticks[stick1].indexes,
        ];
      }
    },

    update: (gamepad: RawGamepad) => {
      state.prevPad = state.pad;
      state.pad = {
        axes: gamepad.axes as number[],
        buttons: map((a) => a.value, gamepad.buttons),
        rawPad: gamepad,
      };

      if (listenOptions) {
        listenOptions = updateListenOptions(listenOptions, state.pad, state.threshold);
      }

      // Update rumble state

      const now = Date.now();
      const currentRumble = getCurrentEffect(gamepad.id);
      updateChannels(gamepad.id, now - state.lastUpdate);

      if (
        state.prevRumble.weakMagnitude !== currentRumble.weakMagnitude ||
        state.prevRumble.strongMagnitude !== currentRumble.strongMagnitude ||
        now - state.lastRumbleUpdate >= MAX_DURATION / 2
      ) {
        applyRumble(gamepad, currentRumble);
        state.prevRumble = currentRumble;
        state.lastRumbleUpdate = now;
      }

      state.lastUpdate = now;
    },

    cancelListen: () => {
      listenOptions = null;
    },

    listenButton: (
      callback: (indexes: number[]) => void,
      quantity = 1,
      {
        waitFor = [1, 'polls'],
        consecutive = false,
        allowOffset = true,
      }: { waitFor?: [number, 'polls' | 'ms']; consecutive?: boolean; allowOffset?: boolean } = {},
    ) => {
      listenOptions = {
        callback: callback as (indexes: number[] | number[][]) => void,
        quantity,
        type: 'buttons',
        currentValue: 0,
        useTimeStamp: waitFor[1] === 'ms',
        targetValue: waitFor[0],
        consecutive,
        allowOffset,
      };
    },

    listenAxis: (
      callback: (indexes: number[][]) => void,
      quantity = 2,
      {
        waitFor = [100, 'ms'],
        consecutive = true,
        allowOffset = true,
      }: { waitFor?: [number, 'polls' | 'ms']; consecutive?: boolean; allowOffset?: boolean } = {},
    ) => {
      listenOptions = {
        callback: callback as (indexes: number[] | number[][]) => void,
        quantity,
        type: 'axes',
        currentValue: 0,
        useTimeStamp: waitFor[1] === 'ms',
        targetValue: waitFor[0],
        consecutive,
        allowOffset,
      };
    },

    buttonBindOnPress: (
      inputName: string,
      callback: (buttonName?: string) => void,
      allowDuplication = false,
    ) => {
      if (!nameIsValid(inputName)) {
        throw new Error(
          `On buttonBindOnPress('${inputName}'): inputName contains invalid characters`,
        );
      }

      module.listenButton((indexes: number[]) => {
        const resultName = findKey((value) => value[0] === indexes[0], state.buttons);

        if (!allowDuplication && resultName && state.buttons[inputName]) {
          module.swapButtons(inputName, resultName);
        } else {
          module.setButton(inputName, indexes);
        }

        callback(resultName);
      });
    },

    stickBindOnPress: (
      inputName: string,
      callback: (stickName?: string) => void,
      allowDuplication = false,
    ) => {
      if (!nameIsValid(inputName)) {
        throw new Error(
          `On stickBindOnPress('${inputName}'): inputName contains invalid characters`,
        );
      }

      module.listenAxis((indexesResult: number[][]) => {
        const resultName = findKey(({ indexes }) => isEqual(indexes, indexesResult), state.sticks);

        if (!allowDuplication && resultName && state.sticks[inputName]) {
          module.swapSticks(inputName, resultName);
        } else {
          module.setStick(inputName, indexesResult);
        }

        callback(resultName);
      });
    },

    isRumbleSupported: (rawPad?: RawGamepad) => {
      const padToTest = rawPad || state.pad.rawPad;
      if (padToTest) {
        return !!padToTest.vibrationActuator && !!padToTest.vibrationActuator.playEffect;
      } else {
        return null;
      }
    },

    stopRumble: (channelName?: string) => {
      if (state.pad.rawPad) {
        stopRumble(state.pad.rawPad.id, channelName);
      }
    },

    addRumble: (effect: Effect | Effect[], channelName?: string) => {
      if (state.pad.rawPad) {
        addRumble(state.pad.rawPad.id, effect, channelName);
      }
    },

    destroy: () => {
      module.disconnect();
      state.pad = mockGamepad;
      state.prevPad = mockGamepad;
    },
  };

  return { module, state };
}
