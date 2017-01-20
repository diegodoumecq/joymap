/* @flow */
import {
    updateListenOptions, nameIsValid,
    getDefaultButtons, getDefaultSticks, parseGamepad,
    stickMap, buttonMap
} from './lib/utils';

import {
    findKey, omit, arraysEqual, mapValues
} from './lib/tools';

import type {
    IStickState, IButtonState, IButtonIndexes,
    IStickIndexes, IStickInverts, IListenOptions,
    IListenParams, IPlayerState, IPlayer
} from './types';

export default function createPlayer({
    name,
    threshold = 0.3,
    clampThreshold = true
}: { name: string, threshold: number, clampThreshold: boolean } = {}): IPlayer {
    let listenOptions: null | IListenOptions = null;

    const state: IPlayerState = {
        name,
        pad: {
            buttons: [],
            axes: []
        },
        prevPad: {
            buttons: [],
            axes: []
        },
        mappers: {},
        gamepadId: null,
        connected: false,
        buttons: getDefaultButtons(),
        sticks: getDefaultSticks()
    };

    const player: IPlayer = {
        getName: () => state.name,
        getGamepadId: () => state.gamepadId,
        isConnected: () => state.connected,

        getParsedGamepad: () => state.pad,

        clearMappers() {
            state.mappers = {};
        },

        removeMapper(mapperName: string) {
            state.mappers = omit([mapperName], state.mappers);
        },

        update(gamepad: Gamepad) {
            // TODO Store the buttons, sticks and mappers that have already been queried
            // and clear those structures at the start of update
            // Maybe we can use those structures to avoid some costly calculations to stickMap's prevPressed
            // Maybe add a memoizeMappers flag (default true) to Player construction
            state.prevPad = state.pad;
            state.pad = parseGamepad(gamepad, state.prevPad, threshold, clampThreshold);

            listenOptions = updateListenOptions(listenOptions, state.pad, threshold);
        },

        getButtons(...inputNames: string[]): IButtonState | { [index: string]: IButtonState } {
            if (inputNames.length === 0) {
                return mapValues(button => buttonMap(state.pad, state.prevPad, button), state.buttons);
            }

            if (inputNames.length === 1) {
                return buttonMap(state.pad, state.prevPad, state.buttons[inputNames[0]]);
            }

            const result = {};
            inputNames.forEach(inputName => {
                result[inputName] = buttonMap(state.pad, state.prevPad, state.buttons[inputName]);
            });

            return result;
        },

        getSticks(...inputNames: string[]): IStickState | { [index: string]: IStickState } {
            if (inputNames.length === 0) {
                return mapValues(stick => {
                    const { indexes, inverts } = stick;
                    return stickMap(state.pad, state.prevPad, indexes, inverts, threshold);
                }, state.sticks);
            }

            if (inputNames.length === 0) {
                const { indexes, inverts } = state.sticks[inputNames[0]];
                return stickMap(state.pad, state.prevPad, indexes, inverts, threshold);
            }

            const result = {};
            inputNames.forEach(inputName => {
                const { indexes, inverts } = state.sticks[inputName];
                result[inputName] = stickMap(state.pad, state.prevPad, indexes, inverts, threshold);
            });

            return result;
        },

        getMappers(...mapperNames: string[]): any | { [index: string]: any } {
            if (mapperNames.length === 0) {
                return mapValues(mapper => mapper({
                    pad: state.pad,
                    prevPad: state.prevPad,
                    player
                }), state.mappers);
            }

            if (mapperNames.length === 1) {
                return state.mappers[mapperNames[0]]({
                    pad: state.pad,
                    prevPad: state.prevPad,
                    player
                });
            }

            const result = {};
            mapperNames.forEach(mapperName => {
                result[mapperName] = state.mappers[mapperName]({
                    pad: state.pad,
                    prevPad: state.prevPad,
                    player
                });
            });

            return result;
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

        setButton(inputName: string, indexes: number | IButtonIndexes) {
            if (!nameIsValid(inputName)) {
                throw new Error(`On setButton('${inputName}'): argument contains invalid characters`);
            }
            state.buttons[inputName] = (typeof indexes === 'number') ? [indexes] : indexes;
        },

        setStick(
            inputName: string,
            // #FlowExpectError No idea why this fails spectacularly, tried everything
            indexes: number[] | IStickIndexes,
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

        setMapper(mapperName: string, callback: Function) {
            if (!nameIsValid(mapperName)) {
                throw new Error(`On setMapper('${mapperName}', ...):
                    first argument contains invalid characters`);
            }

            state.mappers[mapperName] = callback;
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
            // For some reason I can't do:
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

        disconnect() {
            state.connected = false;
        },

        reconnect() {
            state.connected = true;
        },

        connect(gamepadId: string) {
            state.connected = true;
            state.gamepadId = gamepadId;
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
            player.listenButton(indexes => {
                const index = indexes[0];
                const bindingIndex = findKey(index, state.buttons);

                if (!allowDuplication && bindingIndex && state.buttons[inputName]) {
                    player.swapButtons(inputName, bindingIndex);
                } else {
                    player.setButton(inputName, index);
                }

                callback(bindingIndex);
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

            player.listenAxis((indexesResult: IStickIndexes) => {
                const c: Function = ({ indexes }) => arraysEqual(indexes, indexesResult);
                const bindingIndex: string | null = findKey(c, state.sticks);

                if (!allowDuplication && bindingIndex && state.sticks[inputName]) {
                    player.swapSticks(inputName, bindingIndex);
                } else {
                    player.setStick(inputName, indexesResult);
                }

                callback(bindingIndex);
            });
        },

        destroy() {
            player.disconnect();
            state.pad = {
                buttons: [],
                axes: []
            };
            state.prevPad = {
                buttons: [],
                axes: []
            };
            player.clearMappers();
        }
    };

    return player;
}
