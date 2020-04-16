import memoize from 'fast-memoize';
import { assignIn, mapValues, forEach } from 'lodash/fp';
import type * as rxjs from 'rxjs';
import type * as operators from 'rxjs/operators';

import createBaseModule, { BaseParams } from '../baseModule/base';
import { RawGamepad } from '../baseModule/baseUtils';

import { buttonMap, stickMap, ButtonResult, StickResult } from '../common/utils';

export type StreamModule = ReturnType<typeof createStreamModule>;

export interface ButtonStreamMapValue {
  stream: rxjs.Subject<() => ButtonResult>;
  updateFn: () => ButtonResult;
}

export interface StickStreamMapValue {
  stream: rxjs.Subject<() => StickResult>;
  updateFn: () => StickResult;
}

export interface StreamParams extends BaseParams {
  rxjs: typeof rxjs;
  operators: typeof operators;
}

export default function createStreamModule(params: StreamParams) {
  if (!params.rxjs || !params.operators) {
    throw new Error(`createStreamModule called without rxjs and/or it's operators`);
  }

  const { state, module: baseModule } = createBaseModule(params);

  const buttonMapMemoized = memoize(buttonMap);
  const stickMapMemoized = memoize(stickMap);

  const allButtonStream = new params.rxjs.Subject<() => Record<string, ButtonResult>>();
  allButtonStream.pipe(params.operators.map((a: () => Record<string, ButtonResult>) => a()));

  const allStickStream = new params.rxjs.Subject<() => Record<string, StickResult>>();
  allStickStream.pipe(params.operators.map((a: () => Record<string, StickResult>) => a()));

  const buttonStreamMap: Record<string, ButtonStreamMapValue> = {};
  const stickStreamMap: Record<string, StickStreamMapValue> = {};

  const updateButtonStream = (streamMap: ButtonStreamMapValue) =>
    streamMap.stream.next(streamMap.updateFn);

  const updateStickStream = (streamMap: StickStreamMapValue) =>
    streamMap.stream.next(streamMap.updateFn);

  const mapButtons = () =>
    mapValues(
      (button) =>
        buttonMapMemoized(state.pad, state.prevPad, button, state.threshold, state.clampThreshold),
      state.buttons,
    );

  const mapSticks = () =>
    mapValues(
      (stick) =>
        stickMapMemoized(
          state.pad,
          state.prevPad,
          stick.indexes,
          stick.inverts,
          state.threshold,
          state.clampThreshold,
        ),
      state.sticks,
    );

  const module = assignIn(baseModule, {
    ...baseModule,

    getAllButtonsStream: () => {
      return allButtonStream;
    },

    getAllStickStream: () => {
      return allStickStream;
    },

    getButtonStream: (buttonName: string) => {
      if (!buttonStreamMap[buttonName]) {
        const buttonStream = new params.rxjs.Subject<() => ButtonResult>();
        buttonStream.pipe(params.operators.map((a: () => ButtonResult) => a()));

        buttonStreamMap[buttonName] = {
          stream: buttonStream,
          updateFn: () =>
            buttonMapMemoized(
              state.pad,
              state.prevPad,
              state.buttons[buttonName],
              state.threshold,
              state.clampThreshold,
            ),
        };
      }

      return buttonStreamMap[buttonName].stream;
    },

    getStickStream: (stickName: string) => {
      if (!stickStreamMap[stickName]) {
        const stickStream = new params.rxjs.Subject<() => StickResult>();
        stickStream.pipe(params.operators.map((a: () => StickResult) => a()));

        stickStreamMap[stickName] = {
          stream: stickStream,
          updateFn: () =>
            stickMapMemoized(
              state.pad,
              state.prevPad,
              state.sticks[stickName].indexes,
              state.sticks[stickName].inverts,
              state.threshold,
              state.clampThreshold,
            ),
        };
      }

      return stickStreamMap[stickName].stream;
    },

    update: (gamepad: RawGamepad) => {
      baseModule.update(gamepad);

      allButtonStream.next(mapButtons);
      allStickStream.next(mapSticks);
      forEach(updateButtonStream, buttonStreamMap);
      forEach(updateStickStream, stickStreamMap);
    },

    destroy: () => {
      baseModule.destroy();

      allButtonStream.unsubscribe();
      allStickStream.unsubscribe();
      forEach(({ stream }) => stream.unsubscribe(), buttonStreamMap);
      forEach(({ stream }) => stream.unsubscribe(), stickStreamMap);
    },
  });

  return module;
}
