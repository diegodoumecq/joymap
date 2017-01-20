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
        mappersOnPoll: {},
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

        setMapper(mapperName: string, callback: Function, mapOnPoll: boolean = false) {
            if (!nameIsValid(mapperName)) {
                throw new Error(`On setMapper('${mapperName}', ...):
                    first argument contains invalid characters`);
            }
            if (!mapOnPoll) {
                state.mappers[mapperName] = callback;
            } else {
                state.mappersOnPoll[mapperName] = { callback, value: null };
            }
        },

        removeMapper(mapperName: string) {
            state.mappersOnPoll = omit([mapperName], state.mappersOnPoll);
            state.mappers = omit([mapperName], state.mappers);
        },

        clearMappers() {
            state.mappersOnPoll = {};
            state.mappers = {};
        },

        mapper(mapperName: string) {
            if (state.mappersOnPoll[mapperName]) {
                return state.mappersOnPoll[mapperName].value;
            }

            return state.mappers[mapperName]({
                pad: state.pad,
                prevPad: state.prevPad,
                player
            });
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
        },

        update(gamepad: Gamepad) {
            state.prevPad = state.pad;
            state.pad = parseGamepad(gamepad, state.prevPad, threshold, clampThreshold);
            state.mappersOnPoll = updateMappers(state.pad, state.prevPad, state.mappersOnPoll, player);

            listenOptions = updateListenOptions(listenOptions, state.pad, threshold);
        }
    };

    return player;
}
