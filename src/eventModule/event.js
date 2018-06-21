import memoize from 'fast-memoize';
import { filter, forEach, assignIn, map } from 'lodash/fp';

import createBaseModule from '../baseModule/base';

import { buttonMap, stickMap, nameIsValid } from '../common/utils';
import { eventIsValid, getEventTokens, verifyTokens } from './eventUtils';

export default function createEventModule(params = {}) {
    const { state, module: baseModule } = createBaseModule(params);

    const buttonMapMemoized = memoize(buttonMap);
    const stickMapMemoized = memoize(stickMap);

    let buttonEvents = [];
    let stickEvents = [];

    const module = assignIn(baseModule, {
        ...baseModule,

        addButtonEvent: (eventName, callback) => {
            const tokens = getEventTokens(eventName);
            if (eventIsValid(tokens)) {
                buttonEvents.push({ name: eventName, callback, tokens });
            }
        },

        removeButtonEvent: (eventName, callback) => {
            buttonEvents = filter(event => event.name !== eventName || event.callback !== callback, buttonEvents);
        },

        addStickEvent: (name, callback) => {
            if (nameIsValid(name)) {
                stickEvents.push({ name, callback });
            }
        },

        removeStickEvent: (eventName, callback) => {
            stickEvents = filter(event => event.name !== eventName || event.callback !== callback, stickEvents);
        },

        update: gamepad => {
            baseModule.update(gamepad);

            forEach(event => {
                if (state.buttons[event.name]) {
                    // simple button event
                    const result = buttonMapMemoized(
                        state.pad,
                        state.prevPad,
                        state.buttons[event.name],
                        state.threshold,
                        state.clampThreshold
                    );

                    if (result.pressed) {
                        event.callback(result);
                    }
                } else if (verifyTokens(
                    // composite button event
                    map(({ value, prop }) => (!state.buttons[value] ? value : buttonMapMemoized(
                        state.pad,
                        state.prevPad,
                        state.buttons[value],
                        state.threshold,
                        state.clampThreshold
                    )[prop]), event.tokens)
                )) {
                    event.callback(true);
                }
            }, buttonEvents);

            forEach(event => {
                // simple stick event
                const stick = state.sticks[event.name];
                const result = stickMapMemoized(
                    state.pad,
                    state.prevPad,
                    stick.indexes,
                    stick.inverts,
                    state.threshold,
                    state.clampThreshold
                );

                if (result.pressed) {
                    event.callback(result);
                }
            }, stickEvents);
        },

        destroy() {
            baseModule.destroy();
            buttonEvents = [];
            stickEvents = [];
        }
    });

    return module;
}
