/* @flow */
import {
    updateListenOptions, nameIsValid,
    getDefaultButtons, getDefaultSticks, parseGamepad,
    updateMappers, stickMap, buttonMap
} from './lib/utils';

import {
    findKey, omit, arraysEqual
} from './lib/tools';

import type {
    IParsedGamepad, IStickState, IButtonState, IButtonIndexes, IStickIndexes, IStickInverts,
    IListenOptions, IListenParams, IPlayerState
} from './types';

export type IPlayer = {
    isConnected: () => boolean,
    getName: () => string,
    getGamepadId: () => ?string,
    getParsedGamepad: () => IParsedGamepad,

    setMapper: (mapperName: string, callback: Function, automatic?: boolean) => void,
    removeMapper: (mapperName: string) => void,
    clearMappers: () => void,

    button: (name: string) => IButtonState,
    stick: (name: string) => IStickState,
    setButton: (inputName: string, indexes: number | IButtonIndexes) => void,
    setStick: (inputName: string, indexes: number[] | IStickIndexes, inverts?: IStickInverts) => void,

    swapButtons: (btn1: string, btn2: string) => void,
    swapSticks: (btn1: string, btn2: string, includeInverts?: boolean) => void,

    disconnect: () => void,
    reconnect: () => void,
    connect: (gamepadId: string) => void,

    listenButton: (callback: Function, quantity?: number, params?: IListenParams) => void,
    listenAxis: (callback: Function, quantity?: number, params?: IListenParams) => void,
    cancelListen: () => void,
    buttonBindOnPress: (inputName: string, callback: Function, allowDuplication?: boolean) => void,
    stickBindOnPress: (inputName: string, callback: Function, allowDuplication?: boolean) => void,

    destroy: () => void,
    update: (gamepad: Gamepad) => void
};

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

        setMapper(mapperName: string, callback: Function, automatic: boolean = false) {
            if (!nameIsValid(mapperName)) {
                throw new Error(`On setMapper('${mapperName}', ...):
                first argument contains invalid characters`);
            }
            state.mappers[mapperName] = { callback, value: null, automatic };
        },

        removeMapper(mapperName: string) {
            state.mappers = omit([mapperName], state.mappers);
        },

        clearMappers() {
            state.mappers = {};
        },

        button(inputName: string): IButtonState {
            return buttonMap(state.pad, state.prevPad, state.buttons[inputName]);
        },

        stick(inputName: string): IStickState {
            const { indexes, inverts } = state.sticks[inputName];
            return stickMap(state.pad, state.prevPad, indexes, inverts, threshold);
        },

        setButton(inputName: string, indexes: number | IButtonIndexes) {
            if (!nameIsValid(inputName)) {
                throw new Error(`On setButton('${inputName}'): argument contains invalid characters`);
            }
            state.buttons[inputName] = (typeof indexes === 'number') ? [indexes] : indexes;
        },

        setStick(
            inputName: string,
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

            if (Array.isArray(indexes[0])) {
                state.sticks[inputName] = {
                    indexes,
                    inverts: inverts || indexes[0].map(() => false)
                };
            } else {
                state.sticks[inputName] = {
                    indexes: [indexes],
                    inverts: inverts || indexes.map(() => false)
                };
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
            }
            const replacement = sticks[btn1].indexes;
            sticks[btn1].indexes = sticks[btn2].indexes;
            sticks[btn2].indexes = replacement;
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

            player.listenAxis((indexesResult: number[]) => {
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
        },

        update(gamepad: Gamepad) {
            state.prevPad = state.pad;
            state.pad = parseGamepad(gamepad, state.prevPad, threshold, clampThreshold);
            state.mappers = updateMappers(state.pad, state.prevPad, state.mappers);

            listenOptions = updateListenOptions(listenOptions, state.pad, threshold);
        }
    };

    return player;
}
