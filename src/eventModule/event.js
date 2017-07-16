
import memoize from 'fast-memoize';
import { filter, forEach, assignIn } from 'lodash/fp';

import createBaseModule from '../baseModule/base';

import { buttonMap, stickMap } from '../common/utils';

function isValidButtonEventName(name, buttons) {
    return !!buttons[name];
}

function isValidStickEventName(name, sticks) {
    return !!sticks[name];
}

export default function createEventModule(params = {}) {
    const { state, module: baseModule } = createBaseModule(params);

    const buttonMapMemoized = memoize(buttonMap);
    const stickMapMemoized = memoize(stickMap);

    let buttonEvents = [];
    let stickEvents = [];

    const module = assignIn(baseModule, {
        ...baseModule,

        // TODO Support more options other than just button names and stick names

        addButtonEvent: (name, callback) => {
            if (isValidButtonEventName(name, state.buttons)) {
                buttonEvents.push({ name, callback });
            }
        },

        removeButtonEvent: (name, callback) => {
            buttonEvents = filter(event => event.name !== name || event.callback !== callback, buttonEvents);
        },

        addStickEvent: (name, callback) => {
            if (isValidStickEventName(name, state.sticks)) {
                stickEvents.push({ name, callback });
            }
        },

        removeStickEvent: (name, callback) => {
            stickEvents = filter(event => event.name !== name || event.callback !== callback, stickEvents);
        },

        update: gamepad => {
            baseModule.update(gamepad);

            forEach(event => {
                const indexes = state.buttons[event.name];
                const result = buttonMapMemoized(state.pad, state.prevPad, indexes, state.threshold);

                if (result.pressed) {
                    event.callback(result);
                }
            }, buttonEvents);

            forEach(event => {
                const stick = state.sticks[event.name];
                const result = stickMapMemoized(
                    state.pad,
                    state.prevPad,
                    stick.indexes,
                    stick.inverts,
                    state.threshold
                );

                if (result.pressed) {
                    event.callback(result);
                }
            }, stickEvents);
        }
    });

    return module;
}
