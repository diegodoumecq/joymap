import {
  noop,
  map,
  isFunction,
  find,
  filter,
  difference,
  forEach,
  includes,
  compact,
} from 'lodash/fp';

import { getRawGamepads, gamepadIsValid } from './common/utils';
import { RawGamepad, JoymapParams } from './types';
import { BaseModule } from './baseModule/base';
import { QueryModule } from './queryModule/query';
import { StreamModule } from './streamModule/stream';
import { EventModule } from './eventModule/event';

interface JoymapState {
  onPoll: () => void;
  autoConnect: boolean;
  gamepads: RawGamepad[];
  modules: AnyModule[];
}

export type AnyModule = BaseModule['module'] | QueryModule | StreamModule | EventModule;

export type Joymap = ReturnType<typeof createJoymap>;

export default function createJoymap(params: JoymapParams = {}) {
  let animationFrameRequestId: number | null = null;
  const isSupported = navigator && isFunction(navigator.getGamepads);

  const state: JoymapState = {
    onPoll: params.onPoll || noop,
    autoConnect: params.autoConnect !== false,
    gamepads: [],
    modules: [],
  };

  const joymap = {
    isSupported: () => isSupported,

    start: () => {
      if (isSupported && animationFrameRequestId === null) {
        joymap.poll();
        if (state.autoConnect) {
          forEach((module) => {
            if (!module.isConnected()) {
              const padId = joymap.getUnusedPadId();
              if (padId) {
                module.connect(padId);
              }
            }
          }, state.modules);
        }
        const step = () => {
          joymap.poll();
          animationFrameRequestId = window.requestAnimationFrame(step);
        };
        animationFrameRequestId = window.requestAnimationFrame(step);
      }
    },

    stop: () => {
      if (animationFrameRequestId !== null) {
        window.cancelAnimationFrame(animationFrameRequestId);
        animationFrameRequestId = null;
      }
    },

    setOnPoll: (onPoll: () => void) => {
      state.onPoll = onPoll;
    },

    setAutoConnect: (autoConnect: boolean) => {
      state.autoConnect = autoConnect;
    },

    getGamepads: () => state.gamepads,

    getModules: () => state.modules,

    getUnusedPadIds: () =>
      compact(
        difference(
          map('id', state.gamepads),
          map((module) => module.getPadId(), state.modules),
        ),
      ),

    getUnusedPadId: () => {
      const usedIds = map((module) => module.getPadId(), state.modules);
      const gamepadIds = map('id', state.gamepads);

      return find((id) => !includes(id, usedIds), gamepadIds);
    },

    addModule: (module: AnyModule) => {
      state.modules.push(module);

      if (state.autoConnect && !module.getPadId()) {
        const padId = joymap.getUnusedPadId();
        if (padId) {
          module.connect(padId);
        }
      }
    },

    removeModule: (module: AnyModule) => {
      state.modules = filter((m) => m !== module, state.modules);
      module.destroy();
    },

    clearModules: () => {
      forEach((module) => joymap.removeModule(module), state.modules);
    },

    poll: () => {
      state.gamepads = filter(gamepadIsValid, getRawGamepads()) as RawGamepad[];

      forEach((module) => {
        if (state.autoConnect && !module.getPadId()) {
          const padId = joymap.getUnusedPadId();
          if (padId) {
            module.connect(padId);
            const pad = find({ id: module.getPadId() }, state.gamepads) as RawGamepad | undefined;
            if (pad) {
              module.update(pad);
            }
          }
        } else {
          const gamepad = find({ id: module.getPadId() }, state.gamepads) as RawGamepad | undefined;

          if (gamepad) {
            if (!module.isConnected()) {
              module.connect();
            }
            module.update(gamepad);
          } else if (module.isConnected()) {
            module.disconnect();
          }
        }
      }, state.modules);

      state.onPoll();
    },
  };

  return joymap;
}
