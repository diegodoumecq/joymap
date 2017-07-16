
import { findKey, isEqual, map } from 'lodash/fp';
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
        disconnect() {
            connected = false;
        },
        connect(padId) {
            connected = true;
            if (padId) {
                gamepadId = padId;
            }
        },
        getConfig() {
            return JSON.stringify({
                threshold: state.threshold,
                clampThreshold: state.clampThreshold,
                buttons: state.buttons,
                sticks: state.sticks
            });
        },
        setConfig(serializedString) {
            Object.assign(state, JSON.parse(serializedString));
        },

        getButtonIndexes(...inputNames) {
            const indexes = [];
            inputNames.forEach(inputName => indexes.push(...state.buttons[inputName]));
            return indexes;
        },

        getStickIndexes(...inputNames) {
            const indexes = [];
            inputNames.forEach(inputName => indexes.push(...state.sticks[inputName].indexes));
            return indexes;
        },

        setButton(inputName, indexes) {
            if (!nameIsValid(inputName)) {
                throw new Error(`On setButton('${inputName}'): argument contains invalid characters`);
            }
            state.buttons[inputName] = indexes;
        },

        setStick(inputName, indexes, inverts) {
            if (!nameIsValid(inputName)) {
                throw new Error(`On setStick('${inputName}'): argument contains invalid characters`);
            }

            if (indexes.length === 0) {
                throw new Error(`On setStick('${inputName}', indexes):
                    argument indexes is an empty array`);
            }

            const firstValue = indexes[0];

            state.sticks[inputName] = {
                indexes,
                inverts: inverts || map(() => false, firstValue)
            };
        },

        invertSticks(inverts, ...inputNames) {
            if (inputNames.length > 0) {
                inputNames.forEach(inputName => {
                    const stick = state.sticks[inputName];
                    if (stick.inverts.length === inverts.length) {
                        stick.inverts = inverts;
                    } else {
                        throw new Error(`On invertStick(inverts, [..., ${inputName}, ...]):
                            given argument inverts' length does not match '${inputName}' axis' length`);
                    }
                });
            }
        },

        swapButtons(btn1, btn2) {
            const { buttons } = state;
            // For some reason, the following line throws "unsupported expression pattern in destructuring" in Flow IDE
            // [buttons[btn1], buttons[btn2]] = [buttons[btn2], buttons[btn1]];
            const replacement = buttons[btn1];
            buttons[btn1] = buttons[btn2];
            buttons[btn2] = replacement;
        },

        swapSticks(btn1, btn2, includeInverts = false) {
            const { sticks } = state;
            if (includeInverts) {
                const replacement = sticks[btn1];
                sticks[btn1] = sticks[btn2];
                sticks[btn2] = replacement;
            } else {
                const replacement = sticks[btn1].indexes;
                sticks[btn1].indexes = sticks[btn2].indexes;
                sticks[btn2].indexes = replacement;
            }
        },

        update(gamepad) {
            state.prevPad = state.pad;
            state.pad = {
                axes: gamepad.axes,
                buttons: map(a => a.value, gamepad.buttons)
            };

            if (listenOptions) {
                listenOptions = updateListenOptions(listenOptions, state.pad, state.threshold);
            }
        },

        cancelListen() {
            listenOptions = null;
        },

        listenButton(
            callback,
            quantity,
            { waitFor = [1, 'polls'], consecutive = false, allowOffset = true } = {}
        ) {
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

        listenAxis(
            callback,
            quantity = 2,
            { waitFor = [100, 'ms'], consecutive = true, allowOffset = true } = {}
        ) {
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

        buttonBindOnPress(inputName, callback, allowDuplication = false) {
            if (!nameIsValid(inputName)) {
                throw new Error(`On buttonBindOnPress('${inputName}', ...):
                    first argument contains invalid characters`);
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

        stickBindOnPress(inputName, callback, allowDuplication = false) {
            if (!nameIsValid(inputName)) {
                throw new Error(`On stickBindOnPress('${inputName}', ...):
                    first argument contains invalid characters`);
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
        }
    };

    return { module, state };
}
