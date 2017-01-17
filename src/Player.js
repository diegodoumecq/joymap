/* @flow */
import {
    addButtonAlias, addStickAlias,
    makeButtonBinding, makeStickBinding,
    updateListenOptions, nameIsValid,
    getDefaultBindings, isButtonSignificant,
    getButtonValue, isStickSignificant, getStickValue,
    updateButtonAliases, updateStickAliases
} from './lib/utils';

import {
    includes, mapValues, findKey,
    omit, difference, noop, unique
} from './lib/tools';

import type {
    IStickValue, IParsedGamepad, IStick, IButton,
    IStickAlias, IButtonAlias, IAggregator,
    IStickBinding, IButtonBinding, IListenOptions, IListenParams,
    IPlayerState
} from './types';

export type IPlayer = {
    isConnected: () => boolean,
    getName: () => string,
    getGamepadId: () => ?string,
    getParsedGamepad: () => IParsedGamepad,

    getButtonAliases: () => { [key: string]: IButtonAlias },
    getStickAliases: () => { [key: string]: IStickAlias },
    setAlias: (aliasName: string, inputs: string | string[]) => void,
    removeAlias: (aliasName: string) => void,
    clearAliases: () => void,

    getAggregators: () => { [key: string]: IAggregator },
    setAggregator: (aggregatorName: string, callback: Function) => void,
    removeAggregator: (aggregatorName: string) => void,
    clearAggregators: () => void,

    getButtonBindings: () => { [key: string]: IButtonBinding },
    getStickBindings: () => { [key: string]: IStickBinding },
    clearButtonBindings: () => void,
    clearStickBindings: () => void,

    getButtons: () => { [key: string]: IButton },
    getSticks: () => { [key: string]: IStick },

    disconnect: () => void,
    reconnect: () => void,
    connect: (gamepadId: string) => void,

    buttonRebind: (inputName: string, binding: IButtonBinding) => void,
    stickRebind: (inputName: string, binding: IStickBinding) => void,
    listenButton: (callback: Function, quantity?: number, params?: IListenParams) => void,
    listenAxis: (callback: Function, quantity?: number, params?: IListenParams) => void,
    cancelListen: () => void,
    buttonRebindOnPress: (inputName: string, callback: Function, allowDuplication: boolean) => void,
    stickRebindOnPress: (inputName: string, callback: Function, allowDuplication: boolean) => void,

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
        parsedGamepad: {
            buttons: [],
            axes: []
        },
        buttonAliases: {},
        stickAliases: {},
        aggregators: {},
        gamepadId: null,
        connected: false,
        ...getDefaultBindings()
    };

    function updateAggregators(gamepad: Gamepad) {
        state.aggregators = mapValues(({ callback, value }: IAggregator) => ({
            callback,
            value: callback(this, value, gamepad)
        }), state.aggregators);
    }

    const player: IPlayer = {
        getName: () => state.name,
        getParsedGamepad: () => state.parsedGamepad,
        getButtonAliases: () => state.buttonAliases,
        getStickAliases: () => state.stickAliases,

        getAggregators: () => state.aggregators,
        getGamepadId: () => state.gamepadId,
        isConnected: () => state.connected,

        getButtonBindings: () => state.buttonBindings,
        getStickBindings: () => state.stickBindings,

        getButtons: () => state.buttons,
        getSticks: () => state.sticks,

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

        clearButtonBindings() {
            state.buttonBindings = {};
        },

        clearStickBindings() {
            state.stickBindings = {};
        },

        buttonRebind(inputName: string, binding: IButtonBinding) {
            if (!nameIsValid(inputName)) {
                throw new Error(`On buttonRebind('${inputName}'): argument contains invalid characters`);
            }
            state.buttonBindings[inputName] = binding;
        },

        stickRebind(inputName: string, binding: IStickBinding) {
            if (!nameIsValid(inputName)) {
                throw new Error(`On stickRebind('${inputName}'): argument contains invalid characters`);
            }
            state.stickBindings[inputName] = binding;
        },

        cancelListen() {
            listenOptions = null;
        },

        listenButton(
            callback: (...indexes: number[]) => void,
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
            callback: (...indexes: number[]) => void,
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

        buttonRebindOnPress(
            inputName: string,
            callback: () => void = noop,
            allowDuplication: boolean = false
        ) {
            if (!nameIsValid(inputName)) {
                throw new Error(`On buttonRebindOnPress('${inputName}', ...):
                first argument contains invalid characters`);
            }
            player.listenButton(index => {
                const bindingIndex = findKey({ index }, state.buttonBindings);

                if (bindingIndex) {
                    if (inputName !== bindingIndex) {
                        if (allowDuplication) {
                            state.buttonBindings[inputName] = makeButtonBinding(index);
                        } else {
                            const binding = state.buttonBindings[bindingIndex];
                            state.buttonBindings[bindingIndex] = state.buttonBindings[inputName];
                            state.buttonBindings[inputName] = binding;
                        }
                    }
                } else {
                    state.buttonBindings[inputName] = makeButtonBinding(index);
                }

                callback(bindingIndex);
            });
        },

        stickRebindOnPress(
            inputName: string,
            callback: () => void = noop,
            allowDuplication: boolean = false
        ) {
            if (!nameIsValid(inputName)) {
                throw new Error(`On stickRebindOnPress('${inputName}', ...):
                first argument contains invalid characters`);
            }

            player.listenAxis((index1, index2) => {
                // REVIEW Needed to define the callback as a function
                // because of https://github.com/facebook/flow/issues/1948
                const findCallback: Function = ({ indexes }) => (
                    indexes.includes(index1) && indexes.includes(index2)
                );

                const bindingIndex: string | null = findKey(findCallback, state.stickBindings);

                if (bindingIndex) {
                    if (inputName !== bindingIndex) {
                        if (allowDuplication) {
                            state.stickBindings[inputName] = makeStickBinding(index1, index2);
                        } else {
                            const binding = state.stickBindings[bindingIndex];
                            state.stickBindings[bindingIndex] = state.stickBindings[inputName];
                            state.stickBindings[inputName] = binding;
                        }
                    }
                } else {
                    state.stickBindings[inputName] = makeStickBinding(index1, index2);
                }

                callback(bindingIndex);
            });
        },

        setAggregator(aggregatorName: string, callback: Function) {
            if (!nameIsValid(aggregatorName)) {
                throw new Error(`On setAggregator('${aggregatorName}', ...):
                first argument contains invalid characters`);
            }
            state.aggregators[aggregatorName] = { callback, value: null };
        },

        removeAggregator(aggregatorName: string) {
            state.aggregators = omit([aggregatorName], state.aggregators);
        },

        clearAggregators() {
            state.aggregators = {};
        },

        setAlias(aliasName: string, inputs: string | string[]) {
            if (!nameIsValid(aliasName)) {
                throw new Error(`On setAlias('${aliasName}', ...): first argument contains invalid characters`);
            }
            const inputList: string[] = typeof inputs === 'string' ? [inputs] : inputs;

            if (difference(inputList, Object.keys(state.buttons)).length === 0) {
                state.buttonAliases[aliasName] = addButtonAlias(state.buttonAliases[aliasName], inputList);
            } else if (difference(inputList, Object.keys(state.sticks)).length === 0) {
                const lengths: number[] = inputList.map(inputName => state.sticks[inputName].value.length);

                if (unique(lengths).length === 1) {
                    state.stickAliases[aliasName] = addStickAlias(state.stickAliases[aliasName], inputList);
                } else {
                    throw new Error(
                        `On setAlias(${aliasName}, [${inputList.join(', ')}]):
                        all sticks specified did not have the same number of axes`
                    );
                }
            } else {
                throw new Error(
                    `On setAlias(${aliasName}, [${inputList.join(', ')}]):
                    either one of the inputs is void or it wasn't all a collection of just buttons or just sticks`
                );
            }
        },

        removeAlias(aliasName: string) {
            if (includes(aliasName, Object.keys(state.buttonAliases))) {
                state.buttonAliases = omit([aliasName], state.buttonAliases);
            } else if (includes(aliasName, Object.keys(state.stickAliases))) {
                state.stickAliases = omit([aliasName], state.stickAliases);
            } else {
                throw new Error(`On removeAlias('${aliasName}'): Specified alias does not exist`);
            }
        },

        clearAliases() {
            state.buttonAliases = {};
            state.stickAliases = {};
        },

        destroy() {
            player.disconnect();
            player.clearButtonBindings();
            player.clearStickBindings();
            player.clearAliases();
            player.clearAggregators();
        },

        update(gamepad: Gamepad) {
            state.parsedGamepad = parseGamepad(gamepad, state.parsedGamepad, threshold, clampThreshold);
            state.buttons = updateButtons(state.buttonBindings, state.parsedGamepad);
            state.sticks = updateStick(state, threshold, clampThreshold);
            state.buttonAliases = updateButtonAliases(state, threshold);
            state.stickAliases = updateStickAliases(state, threshold);
            updateAggregators(gamepad); // REVIEW: Shouldn't this use parsedGamepad too?

            listenOptions = updateListenOptions(listenOptions, state.parsedGamepad, threshold);
        }
    };

    return player;
}
