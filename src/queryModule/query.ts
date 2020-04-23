import memoize from 'fast-memoize';
import { assignIn, mapValues, omit, forEach } from 'lodash/fp';

import { buttonMap, stickMap } from '../common/utils';
import createBaseModule from '../baseModule/base';
import { StickResult, ButtonResult } from '../types';

// the following definition allows for the circular Mapper type
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface QueryModule extends ReturnType<typeof createQueryModule> {}

export type MapperResult = any;

export type Mapper = (module: QueryModule) => MapperResult;

export const emptyMapper: MapperResult = null;

export const emptyStick: StickResult = {
  value: [0, 0],
  pressed: false,
  justChanged: false,
  inverts: [false, false],
};

export const emptyButton: ButtonResult = {
  value: 0,
  pressed: false,
  justChanged: false,
};

export default function createQueryModule(params = {}) {
  const { state, module: baseModule } = createBaseModule(params);

  let mappers: Record<string, Mapper> = {};

  const buttonMapMemoized = memoize(buttonMap);
  const stickMapMemoized = memoize(stickMap);

  const module = assignIn(baseModule, {
    getButton: (inputName: string) => {
      if (!module.isConnected()) {
        return emptyButton;
      }

      return buttonMapMemoized(
        state.pad,
        state.prevPad,
        state.buttons[inputName],
        state.threshold,
        state.clampThreshold,
      );
    },

    getButtons: (...inputNames: string[]) => {
      if (!module.isConnected()) {
        const result: Record<string, ButtonResult> = {};
        forEach((mapperName) => {
          result[mapperName] = emptyButton;
        }, inputNames);

        return result;
      }

      const result: Record<string, ButtonResult> = {};
      forEach((inputName) => {
        result[inputName] = buttonMapMemoized(
          state.pad,
          state.prevPad,
          state.buttons[inputName],
          state.threshold,
          state.clampThreshold,
        );
      }, inputNames);

      return result;
    },

    getAllButtons: (): Record<string, ButtonResult> => {
      if (!module.isConnected()) {
        return mapValues(state.buttons, () => emptyButton);
      }

      return mapValues(
        (button) =>
          buttonMapMemoized(
            state.pad,
            state.prevPad,
            button,
            state.threshold,
            state.clampThreshold,
          ),
        state.buttons,
      );
    },

    getStick: (inputName: string) => {
      if (!module.isConnected()) {
        return emptyStick;
      }

      const { indexes, inverts } = state.sticks[inputName];
      return stickMapMemoized(
        state.pad,
        state.prevPad,
        indexes,
        inverts,
        state.threshold,
        state.clampThreshold,
      );
    },

    getSticks: (...inputNames: string[]) => {
      if (!module.isConnected()) {
        const result: Record<string, StickResult> = {};
        forEach((mapperName) => {
          result[mapperName] = emptyStick;
        }, inputNames);

        return result;
      }

      const result: Record<string, StickResult> = {};
      forEach((inputName) => {
        const { indexes, inverts } = state.sticks[inputName];
        result[inputName] = stickMapMemoized(
          state.pad,
          state.prevPad,
          indexes,
          inverts,
          state.threshold,
          state.clampThreshold,
        );
      }, inputNames);

      return result;
    },

    getAllSticks: (): Record<string, StickResult> => {
      if (!module.isConnected()) {
        return mapValues(state.sticks, () => emptyStick);
      }

      return mapValues((stick) => {
        const { indexes, inverts } = stick;
        return stickMapMemoized(
          state.pad,
          state.prevPad,
          indexes,
          inverts,
          state.threshold,
          state.clampThreshold,
        );
      }, state.sticks);
    },

    getMapper: (mapperName: string) => {
      if (!module.isConnected()) {
        const emptyMapper = null;
        return emptyMapper;
      }

      return mappers[mapperName](module);
    },

    getMappers: (...mapperNames: string[]) => {
      if (!module.isConnected()) {
        const result: Record<string, MapperResult> = {};
        forEach((mapperName) => {
          result[mapperName] = emptyMapper;
        }, mapperNames);

        return result;
      }

      const result: Record<string, Mapper> = {};
      forEach((mapperName) => {
        result[mapperName] = mappers[mapperName](module);
      }, mapperNames);

      return result;
    },

    getAllMappers: (): Record<string, MapperResult> => {
      if (!module.isConnected()) {
        return mapValues(() => emptyMapper, mappers);
      }

      return mapValues((mapper) => mapper(module), mappers);
    },

    setMapper: (mapperName: string, mapper: Mapper) => {
      mappers[mapperName] = mapper;
    },

    removeMapper: (mapperName: string) => {
      mappers = omit([mapperName], mappers);
    },

    clearMappers: () => {
      mappers = {};
    },

    destroy: () => {
      baseModule.destroy();
      module.clearMappers();
    },
  });

  return module;
}
