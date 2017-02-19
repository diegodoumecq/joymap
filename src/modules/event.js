/* @flow */
import memoize from 'fast-memoize';

import createBaseModule from './base';

import { buttonMap, stickMap } from './queryUtils';

import type {
    IEventModule, IModuleParams, IButtonEventCb, IStickEventCb
} from '../types';

function isValidButtonEventName(name: string, buttons: {}): boolean {
    return Object.keys(buttons).includes(name);
}

function isValidStickEventName(name: string, sticks: {}): boolean {
    return Object.keys(sticks).includes(name);
}

export default function createEventModule(params?: IModuleParams = {}): IEventModule {
    const { state, module: baseModule } = createBaseModule(params);

    const buttonMapMemoized = memoize(buttonMap);
    const stickMapMemoized = memoize(stickMap);

    let buttonEvents = [];
    let stickEvents = [];

    const module: IEventModule = {
        ...baseModule,

        // TODO Support more options other than just button names and stick names

        addButtonEvent(name: string, callback: IButtonEventCb) {
            if (isValidButtonEventName(name, state.buttons)) {
                buttonEvents.push({
                    name, callback
                });
            }
        },

        removeButtonEvent(name: string, callback: IButtonEventCb) {
            buttonEvents = buttonEvents.filter(e => e.name !== name || e.callback !== callback);
        },

        addStickEvent(name: string, callback: IStickEventCb) {
            if (isValidStickEventName(name, state.sticks)) {
                stickEvents.push({
                    name, callback
                });
            }
        },

        removeStickEvent(name: string, callback: IStickEventCb) {
            stickEvents = stickEvents.filter(e => e.name !== name || e.callback !== callback);
        },

        update(gamepad: Gamepad) {
            baseModule.update(gamepad);

            buttonEvents.forEach(e => {
                const indexes = state.buttons[e.name];
                const result = buttonMapMemoized(state.pad, state.prevPad, indexes, state.threshold);

                if (result.pressed) {
                    e.callback(result);
                }
            });
            stickEvents.forEach(e => {
                const stick = state.sticks[e.name];
                const result = stickMapMemoized(
                    state.pad,
                    state.prevPad,
                    stick.indexes,
                    stick.inverts,
                    state.threshold
                );

                if (result.pressed) {
                    e.callback(result);
                }
            });
        }
    };

    return module;
}
