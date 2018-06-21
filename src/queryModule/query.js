import memoize from 'fast-memoize';
import { assignIn, mapValues, omit, forEach } from 'lodash/fp';

import { buttonMap, stickMap } from '../common/utils';
import createBaseModule from '../baseModule/base';

import {
    getEmptyMappers, getEmptyButtons, getEmptySticks
} from './queryUtils';

export default function createQueryModule(params = {}) {
    const { state, module: baseModule } = createBaseModule(params);

    let mappers = {};

    const buttonMapMemoized = memoize(buttonMap);
    const stickMapMemoized = memoize(stickMap);

    const module = assignIn(baseModule, {
        getButtons: (...inputNames) => {
            if (!module.isConnected()) {
                return getEmptyButtons(state.buttons, inputNames);
            }

            // Return the complete collection of button states
            if (inputNames.length === 0) {
                return mapValues(
                    button => buttonMapMemoized(
                        state.pad,
                        state.prevPad,
                        button,
                        state.threshold,
                        state.clampThreshold
                    ),
                    state.buttons
                );
            }

            // Return one button state
            if (inputNames.length === 1) {
                return buttonMapMemoized(
                    state.pad,
                    state.prevPad,
                    state.buttons[inputNames[0]],
                    state.threshold,
                    state.clampThreshold
                );
            }

            // Return the collection of button states requested
            const result = {};
            forEach(inputName => {
                result[inputName] = buttonMapMemoized(
                    state.pad,
                    state.prevPad,
                    state.buttons[inputName],
                    state.threshold,
                    state.clampThreshold
                );
            }, inputNames);

            return result;
        },

        getSticks: (...inputNames) => {
            if (!module.isConnected()) {
                return getEmptySticks(state.sticks, inputNames);
            }

            if (inputNames.length === 0) {
                return mapValues(stick => {
                    const { indexes, inverts } = stick;
                    return stickMapMemoized(
                        state.pad,
                        state.prevPad,
                        indexes,
                        inverts,
                        state.threshold,
                        state.clampThreshold
                    );
                }, state.sticks);
            }

            if (inputNames.length === 1) {
                const { indexes, inverts } = state.sticks[inputNames[0]];
                return stickMapMemoized(
                    state.pad,
                    state.prevPad,
                    indexes,
                    inverts,
                    state.threshold,
                    state.clampThreshold
                );
            }

            const result = {};
            forEach(inputName => {
                const { indexes, inverts } = state.sticks[inputName];
                result[inputName] = stickMapMemoized(
                    state.pad,
                    state.prevPad,
                    indexes,
                    inverts,
                    state.threshold,
                    state.clampThreshold
                );
            }, inputNames);

            return result;
        },

        getMappers: (...mapperNames) => {
            if (!module.isConnected()) {
                return getEmptyMappers(mappers, mapperNames);
            }

            if (mapperNames.length === 0) {
                return mapValues(mapper => mapper(module), mappers);
            }

            if (mapperNames.length === 1) {
                return mappers[mapperNames[0]](module);
            }

            const result = {};
            forEach(mapperName => {
                result[mapperName] = mappers[mapperName](module);
            }, mapperNames);

            return result;
        },

        setMapper: (mapperName, callback) => { mappers[mapperName] = callback; },

        removeMapper: mapperName => { mappers = omit([mapperName], mappers); },

        clearMappers: () => { mappers = {}; },

        destroy: () => {
            baseModule.destroy();
            module.clearMappers();
        }
    });

    return module;
}
