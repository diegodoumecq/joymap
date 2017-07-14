/* @flow */
import memoize from 'fast-memoize';

import createBaseModule from '../baseModule/base';

import {
    omit, mapValues, buttonMap, stickMap
} from '../common/utils';

import type {
    IStickState, IStickStates,
    IButtonState, IButtonStates
} from '../common/types';

import {
    getEmptyMappers, getEmptyButtons, getEmptySticks
} from './queryUtils';

import type {
    IQueryModule, IModuleParams,
    IMapper, IMapperValue, IMapperValues
} from './queryTypes';

export default function createQueryModule(params?: IModuleParams = {}): IQueryModule {
    const { state, module: baseModule } = createBaseModule(params);

    let mappers = {};

    const buttonMapMemoized = memoize(buttonMap);
    const stickMapMemoized = memoize(stickMap);

    const module: IQueryModule = {
        ...baseModule,
        getButtons(...inputNames: string[]): IButtonState | IButtonStates {
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
            inputNames.forEach(inputName => {
                result[inputName] = buttonMapMemoized(
                    state.pad,
                    state.prevPad,
                    state.buttons[inputName],
                    state.threshold,
                    state.clampThreshold
                );
            });

            return result;
        },

        getSticks(...inputNames: string[]): IStickState | IStickStates {
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
            inputNames.forEach(inputName => {
                const { indexes, inverts } = state.sticks[inputName];
                result[inputName] = stickMapMemoized(
                    state.pad,
                    state.prevPad,
                    indexes,
                    inverts,
                    state.threshold,
                    state.clampThreshold
                );
            });

            return result;
        },

        getMappers(...mapperNames: string[]): IMapperValue | IMapperValues {
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
            mapperNames.forEach(mapperName => {
                result[mapperName] = mappers[mapperName](module);
            });

            return result;
        },

        setMapper(mapperName: string, callback: IMapper) {
            // TODO: Figure out how to change mapper's API to allow memoization
            mappers[mapperName] = callback;
        },

        removeMapper(mapperName: string) {
            mappers = omit([mapperName], mappers);
        },

        clearMappers() {
            mappers = {};
        },

        destroy() {
            module.disconnect();
            state.pad = {
                buttons: [],
                axes: []
            };
            state.prevPad = {
                buttons: [],
                axes: []
            };
            module.clearMappers();
        }
    };

    return module;
}
