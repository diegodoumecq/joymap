import {
    findKey, isEqual, map, assignIn, forEach,
    flow, flatten, uniq, uniqBy, toString
} from 'lodash/fp';
import { nameIsValid } from '../common/utils';

import {
    mockGamepad, getDefaultButtons,
    getDefaultSticks, updateListenOptions
} from './baseUtils';

export default function createModule(params = {}) {
    let listenOptions = null;
    let gamepadId = params.padId ? params.padId : null;
    let connected = !!params.padId;

    const state = {
        threshold: params.threshold || 0.2,
        clampThreshold: params.clampThreshold !== false,
        pad: mockGamepad,
        prevPad: mockGamepad,

        buttons: getDefaultButtons(),
        sticks: getDefaultSticks()
    };

    const module = {
        getPadId: () => gamepadId,

        isConnected: () => connected,

        disconnect: () => { connected = false; },

        connect: padId => {
            connected = true;
            if (padId) {
                gamepadId = padId;
            }
        },

        getConfig: () => JSON.stringify({
            threshold: state.threshold,
            clampThreshold: state.clampThreshold,
            buttons: state.buttons,
            sticks: state.sticks
        }),

        setConfig: serializedString => assignIn(state, JSON.parse(serializedString)),

        getButtonIndexes: (...inputNames) => flow(
            map(inputName => state.buttons[inputName]),
            flatten,
            uniq
        )(inputNames),

        getStickIndexes: (...inputNames) => flow(
            map(inputName => state.sticks[inputName].indexes),
            flatten,
            uniqBy(toString)
        )(inputNames),

        setButton: (inputName, indexes) => {
            if (!nameIsValid(inputName)) {
                throw new Error(`On setButton('${inputName}'): argument contains invalid characters`);
            }
            state.buttons[inputName] = indexes;
        },

        setStick: (inputName, indexes, inverts) => {
            if (!nameIsValid(inputName)) {
                throw new Error(`On setStick('${inputName}'): inputName contains invalid characters`);
            }

            if (indexes.length === 0) {
                throw new Error(`On setStick('${inputName}', indexes): argument indexes is an empty array`);
            }

            state.sticks[inputName] = {
                indexes,
                inverts: inverts || map(() => false, indexes[0])
            };
        },

        invertSticks: (inverts, ...inputNames) => {
            forEach(inputName => {
                const stick = state.sticks[inputName];
                if (stick.inverts.length === inverts.length) {
                    stick.inverts = inverts;
                } else {
                    throw new Error(`On invertStick(inverts, [..., ${inputName}, ...]):
                        given argument inverts' length does not match '${inputName}' axis' length`);
                }
            }, inputNames);
        },

        swapButtons: (btn1, btn2) => {
            const { buttons } = state;
            [buttons[btn1], buttons[btn2]] = [buttons[btn2], buttons[btn1]];
        },

        swapSticks: (stick1, stick2, includeInverts = false) => {
            const { sticks } = state;
            if (includeInverts) {
                [sticks[stick1], sticks[stick2]] = [sticks[stick2], sticks[stick1]];
            } else {
                [sticks[stick1].indexes, sticks[stick2].indexes] = [sticks[stick2].indexes, sticks[stick1].indexes];
            }
        },

        update: gamepad => {
            state.prevPad = state.pad;
            state.pad = {
                axes: gamepad.axes,
                buttons: map(a => a.value, gamepad.buttons)
            };

            if (listenOptions) {
                listenOptions = updateListenOptions(listenOptions, state.pad, state.threshold);
            }
        },

        cancelListen: () => { listenOptions = null; },

        listenButton: (callback, quantity, {
            waitFor = [1, 'polls'], consecutive = false, allowOffset = true
        } = {}) => {
            listenOptions = {
                callback,
                quantity,
                type: 'buttons',
                currentValue: 0,
                useTimeStamp: waitFor[1] === 'ms',
                targetValue: waitFor[0],
                consecutive,
                allowOffset
            };
        },

        listenAxis: (callback, quantity = 2, {
            waitFor = [100, 'ms'], consecutive = true, allowOffset = true
        } = {}) => {
            listenOptions = {
                callback,
                quantity,
                type: 'axes',
                currentValue: 0,
                useTimeStamp: waitFor[1] === 'ms',
                targetValue: waitFor[0],
                consecutive,
                allowOffset
            };
        },

        buttonBindOnPress: (inputName, callback, allowDuplication = false) => {
            if (!nameIsValid(inputName)) {
                throw new Error(`On buttonBindOnPress('${inputName}'): inputName contains invalid characters`);
            }

            module.listenButton(indexes => {
                const resultName = findKey(value => value[0] === indexes[0], state.buttons);

                if (!allowDuplication && resultName && state.buttons[inputName]) {
                    module.swapButtons(inputName, resultName);
                } else {
                    module.setButton(inputName, indexes);
                }

                callback(resultName);
            });
        },

        stickBindOnPress: (inputName, callback, allowDuplication = false) => {
            if (!nameIsValid(inputName)) {
                throw new Error(`On stickBindOnPress('${inputName}'): inputName contains invalid characters`);
            }

            module.listenAxis(indexesResult => {
                const resultName = findKey(({ indexes }) => isEqual(indexes[0], indexesResult), state.sticks);

                if (!allowDuplication && resultName && state.sticks[inputName]) {
                    module.swapSticks(inputName, resultName);
                } else {
                    module.setStick(inputName, indexesResult);
                }

                callback(resultName);
            });
        },

        destroy: () => {
            module.disconnect();
            state.pad = {
                buttons: [],
                axes: []
            };
            state.prevPad = {
                buttons: [],
                axes: []
            };
        }
    };

    return { module, state };
}
