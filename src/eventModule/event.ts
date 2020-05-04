import memoize from 'fast-memoize';
import { filter, forEach, assignIn, map, isString } from 'lodash/fp';

import createBaseModule from '../baseModule/base';
import { buttonMap, stickMap } from '../common/utils';
import { eventIsValid, getEventTokens, verifyTokens } from './eventUtils';

import { RawGamepad, InputEvent, InputResult } from '../types';

export type EventModule = ReturnType<typeof createEventModule>;

export default function createEventModule(params = {}) {
  const { state, module: baseModule } = createBaseModule(params);

  const buttonMapMemoized = memoize(buttonMap);
  const stickMapMemoized = memoize(stickMap);

  let inputEvents: InputEvent[] = [];

  const module = assignIn(baseModule, {
    ...baseModule,

    addEvent: (eventName: string, callback: InputEvent['callback']) => {
      const tokens = getEventTokens(eventName);
      if (eventIsValid(tokens)) {
        inputEvents.push({ name: eventName, callback, tokens });
      }
    },

    removeEvent: (eventName: string, callback: InputEvent['callback']) => {
      inputEvents = filter(
        (event) => event.name !== eventName || event.callback !== callback,
        inputEvents,
      );
    },

    update: (gamepad: RawGamepad) => {
      baseModule.update(gamepad);

      forEach((event) => {
        if (state.buttons[event.name]) {
          // simple button event
          const result = buttonMapMemoized(
            state.pad,
            state.prevPad,
            state.buttons[event.name],
            state.threshold,
            state.clampThreshold,
          );

          if (result.pressed) {
            event.callback([result]);
          }
        } else if (state.sticks[event.name]) {
          // simple stick event
          const { indexes, inverts } = state.sticks[event.name];
          const result = stickMapMemoized(
            state.pad,
            state.prevPad,
            indexes,
            inverts,
            state.threshold,
            state.clampThreshold,
          );

          if (result.pressed) {
            event.callback([result]);
          }
        } else {
          // composite event with operators
          const resultCopy: InputResult[] = [];
          const results: (string | boolean)[] = map((token) => {
            if (isString(token)) {
              return token;
            }

            let result;
            if (state.buttons[token.inputName]) {
              result = buttonMapMemoized(
                state.pad,
                state.prevPad,
                state.buttons[token.inputName],
                state.threshold,
                state.clampThreshold,
              );
            } else if (state.sticks[token.inputName]) {
              const { indexes, inverts } = state.sticks[token.inputName];
              result = stickMapMemoized(
                state.pad,
                state.prevPad,
                indexes,
                inverts,
                state.threshold,
                state.clampThreshold,
              );
            }

            if (result) {
              if (!resultCopy.includes(result)) {
                // we save the input result for the callback (avoiding repetition)
                // TODO: maybe there's a cleaner way of doing this?
                resultCopy.push(result);
              }

              if (token.inputState === 'pressed') {
                return result.pressed;
              }

              if (token.inputState === 'justPressed') {
                return result.pressed && result.justChanged;
              }

              if (token.inputState === 'justReleased') {
                return !result.pressed && result.justChanged;
              }

              return !result.pressed;
            }

            return false;
          }, event.tokens);

          if (verifyTokens(results)) {
            event.callback(resultCopy);
          }
        }
      }, inputEvents);
    },

    destroy() {
      baseModule.destroy();
      inputEvents = [];
    },
  });

  return module;
}
