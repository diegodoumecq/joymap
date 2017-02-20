/* @flow */
import {
    nameIsValid, findKey, arraysEqual
} from '../common/utils';

import type {
    IStickIndexes, IStickInverts,
    IButtonIndex, IButtonIndexes
} from '../common/types';

import {
    mockGamepad, getDefaultButtons,
    getDefaultSticks, updateListenOptions
} from './baseUtils';

import {
    IModule, IModuleParams, IModuleState,
    IListenOptions, IListenParams
} from './baseTypes';

// TODO review clampThreshold

export default function createModule(params?: IModuleParams = {}): { module: IModule, state: IModuleState } {
    let listenOptions: null | IListenOptions = null;
    let gamepadId: ?string = params.padId ? params.padId : null;
    let connected: boolean = !!params.padId;

    const state: IModuleState = {
        threshold: params.threshold || 0.2,
        clampThreshold: params.clampThreshold !== false,
        pad: mockGamepad,
        prevPad: mockGamepad,

        buttons: getDefaultButtons(),
        sticks: getDefaultSticks()
    };

    const module: IModule = {
        getPadId: () => gamepadId,
        isConnected: () => connected,
        disconnect() {
            connected = false;
        },
        connect(padId?: string) {
            connected = true;
            if (padId) {
                gamepadId = padId;
            }
        },
        getConfig(): string {
            return JSON.stringify({
                threshold: state.threshold,
                clampThreshold: state.clampThreshold,
                buttons: state.buttons,
                sticks: state.sticks
            });
        },
        setConfig(serializedString: string) {
            Object.assign(state, JSON.parse(serializedString));
        },

        getButtonIndexes(...inputNames: string[]): IButtonIndexes {
            const indexes = [];
            inputNames.forEach(inputName => indexes.push(...state.buttons[inputName]));
            return indexes;
        },

        getStickIndexes(...inputNames: string[]): IStickIndexes {
            const indexes = [];
            inputNames.forEach(inputName => indexes.push(...state.sticks[inputName].indexes));
            return indexes;
        },

        setButton(inputName: string, indexes: IButtonIndex | IButtonIndexes) {
            if (!nameIsValid(inputName)) {
                throw new Error(`On setButton('${inputName}'): argument contains invalid characters`);
            }
            state.buttons[inputName] = (typeof indexes === 'number') ? [indexes] : indexes;
        },

        setStick(
            inputName: string,
            indexes: any[], // Real typing throws error: IStickIndex | IStickIndexes,
            inverts?: IStickInverts
        ) {
            if (!nameIsValid(inputName)) {
                throw new Error(`On setStick('${inputName}'): argument contains invalid characters`);
            }

            if (indexes.length === 0) {
                throw new Error(`On setStick('${inputName}', indexes):
                    argument indexes is an empty array`);
            }

            const firstValue: number | number[] = indexes[0];

            if (Array.isArray(firstValue)) {
                state.sticks[inputName] = {
                    indexes,
                    inverts: inverts || firstValue.map(() => false)
                };
            } else {
                state.sticks[inputName] = {
                    indexes: [indexes],
                    inverts: inverts || indexes.map(() => false)
                };
            }
        },

        invertSticks(inverts: IStickInverts, ...inputNames: string[]) {
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

        swapButtons(btn1: string, btn2: string) {
            const { buttons } = state;
            // For some reason, the following line throws "unsupported expression pattern in destructuring" in Flow IDE
            // [buttons[btn1], buttons[btn2]] = [buttons[btn2], buttons[btn1]];
            const replacement = buttons[btn1];
            buttons[btn1] = buttons[btn2];
            buttons[btn2] = replacement;
        },

        swapSticks(btn1: string, btn2: string, includeInverts?: boolean = false) {
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

        update(gamepad: Gamepad) {
            state.prevPad = state.pad;
            state.pad = {
                axes: gamepad.axes,
                buttons: gamepad.buttons.map(a => a.value)
            };

            if (listenOptions) {
                listenOptions = updateListenOptions(listenOptions, state.pad, state.threshold);
            }
        },

        cancelListen() {
            listenOptions = null;
        },

        listenButton(
            callback: (indexes: number[]) => void,
            quantity?: number = 1,
            { waitFor = [1, 'polls'], consecutive = false, allowOffset = true }: IListenParams = {}
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
            callback: (indexes: number[]) => void,
            quantity: number = 2,
            { waitFor = [100, 'ms'], consecutive = true, allowOffset = true }: IListenParams = {}
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

        buttonBindOnPress(
            inputName: string,
            callback: () => void,
            allowDuplication?: boolean = false
        ) {
            if (!nameIsValid(inputName)) {
                throw new Error(`On buttonBindOnPress('${inputName}', ...):
                    first argument contains invalid characters`);
            }
            module.listenButton((indexes: IButtonIndexes) => {
                const findKeyCb: Function = value => value[0] === indexes[0];
                const resultName: string | null = findKey(findKeyCb, state.buttons);

                if (!allowDuplication && resultName && state.buttons[inputName]) {
                    module.swapButtons(inputName, resultName);
                } else {
                    module.setButton(inputName, indexes);
                }

                callback(resultName);
            });
        },

        stickBindOnPress(
            inputName: string,
            callback: () => void,
            allowDuplication?: boolean = false
        ) {
            if (!nameIsValid(inputName)) {
                throw new Error(`On stickBindOnPress('${inputName}', ...):
                    first argument contains invalid characters`);
            }

            module.listenAxis((indexesResult: IStickIndexes) => {
                const findKeyCb: Function = ({ indexes }) => arraysEqual(indexes[0], indexesResult);
                const resultName: string | null = findKey(findKeyCb, state.sticks);

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
