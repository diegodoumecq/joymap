/* @flow */
import {
    buttonBindings, stickBindings,
    addButtonAlias, addStickAlias,
    makeButtonBinding, makeStickBinding,
    updateListenOptions, nameIsValid
} from './lib/utils';

import {
    includes, mapValues, findKey,
    omit, difference, noop, unique
} from './lib/tools';

import type {
    IStickValue, IButtonValue, IParsedGamepad, IStick, IButton,
    IStickAlias, IButtonAlias, IAggregator,
    IStickBinding, IButtonBinding, IListenOptions, IListenParams
} from './types';

export type IPlayer = {
    name: string,
    parsedGamepad: IParsedGamepad,

    sticks: { [key: string]: IStick },
    buttons: { [key: string]: IButton },
    buttonBindings: { [key: string]: IButtonBinding },
    stickBindings: { [key: string]: IStickBinding },

    gamepadId: ?string,
    connected: boolean,
    buttonAliases: { [key: string]: IButtonAlias },
    stickAliases: { [key: string]: IStickAlias },
    aggregators: { [key: string]: IAggregator },

    cleanBindings: () => void,
    disconnect: () => void,
    reconnect: () => void,
    connect: (gamepadId: string) => void,
    clearButtonBindings: () => void,
    clearStickBindings: () => void,

    buttonRebind: (inputName: string, binding: IButtonBinding) => void,
    stickRebind: (inputName: string, binding: IStickBinding) => void,
    cancelListen: () => void,
    listenButton: (callback: Function, quantity?: number, params?: IListenParams) => void,
    listenAxis: (callback: Function, quantity?: number, params?: IListenParams) => void,
    buttonRebindOnPress: (inputName: string, callback: Function, allowDuplication: boolean) => void,
    stickRebindOnPress: (inputName: string, callback: Function, allowDuplication: boolean) => void,
    setAggregator: (aggregatorName: string, callback: Function) => void,
    removeAggregator: (aggregatorName: string) => void,
    cleanAggregators: () => void,
    setAlias: (aliasName: string, inputs: string | string[]) => void,
    removeAlias: (aliasName: string) => void,
    cleanAliases: () => void,
    destroy: () => void,
    parseGamepad: (gamepad: Gamepad) => IParsedGamepad,
    update: (gamepad: Gamepad) => void,
    getButtonValue: (value: IButtonValue) => IButtonValue,
    isButtonSignificant: (value: IButtonValue) => boolean,
    updateButtons: (gamepad: IParsedGamepad) => void,
    getStickValue: (stickValues: IStickValue) => IStickValue,
    isStickSignificant: (stickValues: IStickValue) => boolean,
    updateStick: (gamepad: IParsedGamepad) => void,
    updateAliases: () => void,
    updateAggregators: (gamepad: Gamepad) => void
};

function cleanBindings() {
    return {
        buttonBindings,
        stickBindings,
        buttons: mapValues(() => ({
            value: 0,
            pressed: false,
            justChanged: false
        }), buttonBindings),
        sticks: mapValues(() => ({
            value: [0, 0],
            pressed: false,
            justChanged: false,
            inverts: [false, false]
        }), stickBindings)
    };
}

export default function createPlayer({
    name,
    threshold = 0.3,
    clampThreshold = true
}: { name: string, threshold: number, clampThreshold: boolean } = {}): IPlayer {
    let listenOptions: null | IListenOptions = null;

    const player: IPlayer = {
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
        ...cleanBindings(),

        cleanBindings() {
            Object.assign(player, cleanBindings());
        },

        disconnect() {
            player.connected = false;
        },

        reconnect() {
            player.connected = true;
        },

        connect(gamepadId: string) {
            player.connected = true;
            player.gamepadId = gamepadId;
        },

        clearButtonBindings() {
            player.buttonBindings = {};
        },

        clearStickBindings() {
            player.stickBindings = {};
        },

        buttonRebind(inputName: string, binding: IButtonBinding) {
            if (!nameIsValid(inputName)) {
                throw new Error(`On buttonRebind('${inputName}'): argument contains invalid characters`);
            }
            player.buttonBindings[inputName] = binding;
        },

        stickRebind(inputName: string, binding: IStickBinding) {
            if (!nameIsValid(inputName)) {
                throw new Error(`On stickRebind('${inputName}'): argument contains invalid characters`);
            }
            player.stickBindings[inputName] = binding;
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
                const bindingIndex = findKey({ index }, player.buttonBindings);

                if (bindingIndex) {
                    if (inputName !== bindingIndex) {
                        if (allowDuplication) {
                            player.buttonBindings[inputName] = makeButtonBinding(index);
                        } else {
                            const binding = player.buttonBindings[bindingIndex];
                            player.buttonBindings[bindingIndex] = player.buttonBindings[inputName];
                            player.buttonBindings[inputName] = binding;
                        }
                    }
                } else {
                    player.buttonBindings[inputName] = makeButtonBinding(index);
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

                const bindingIndex: string | null = findKey(findCallback, player.stickBindings);

                if (bindingIndex) {
                    if (inputName !== bindingIndex) {
                        if (allowDuplication) {
                            player.stickBindings[inputName] = makeStickBinding(index1, index2);
                        } else {
                            const binding = player.stickBindings[bindingIndex];
                            player.stickBindings[bindingIndex] = player.stickBindings[inputName];
                            player.stickBindings[inputName] = binding;
                        }
                    }
                } else {
                    player.stickBindings[inputName] = makeStickBinding(index1, index2);
                }

                callback(bindingIndex);
            });
        },

        setAggregator(aggregatorName: string, callback: Function) {
            if (!nameIsValid(aggregatorName)) {
                throw new Error(`On setAggregator('${aggregatorName}', ...):
                first argument contains invalid characters`);
            }
            player.aggregators[aggregatorName] = { callback, value: null };
        },

        removeAggregator(aggregatorName: string) {
            player.aggregators = omit([aggregatorName], player.aggregators);
        },

        cleanAggregators() {
            player.aggregators = {};
        },

        setAlias(aliasName: string, inputs: string | string[]) {
            if (!nameIsValid(aliasName)) {
                throw new Error(`On setAlias('${aliasName}', ...): first argument contains invalid characters`);
            }
            const inputList: string[] = typeof inputs === 'string' ? [inputs] : inputs;

            if (difference(inputList, Object.keys(player.buttons)).length === 0) {
                player.buttonAliases[aliasName] = addButtonAlias(player.buttonAliases[aliasName], inputList);
            } else if (difference(inputList, Object.keys(player.sticks)).length === 0) {
                const lengths: number[] = inputList.map(inputName => player.sticks[inputName].value.length);

                if (unique(lengths).length === 1) {
                    player.stickAliases[aliasName] = addStickAlias(player.stickAliases[aliasName], inputList);
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
            if (includes(aliasName, Object.keys(player.buttonAliases))) {
                player.buttonAliases = omit([aliasName], player.buttonAliases);
            } else if (includes(aliasName, Object.keys(player.stickAliases))) {
                player.stickAliases = omit([aliasName], player.stickAliases);
            } else {
                throw new Error(`On removeAlias('${aliasName}'): Specified alias does not exist`);
            }
        },

        cleanAliases() {
            player.buttonAliases = {};
            player.stickAliases = {};
        },

        destroy() {
            player.disconnect();
            player.cleanBindings();
            player.cleanAliases();
            player.cleanAggregators();
        },

        parseGamepad(gamepad: Gamepad): IParsedGamepad {
            const prevGamepad = player.parsedGamepad;

            return {
                buttons: gamepad.buttons.map(({ value }: { value: number }, index: number) => {
                    const previous: IButton = prevGamepad.buttons[index];
                    const pressed = player.isButtonSignificant(value);

                    return {
                        pressed,
                        justChanged: pressed !== (previous ? player.isButtonSignificant(previous.value) : false),
                        value
                    };
                }),
                axes: gamepad.axes
            };
        },

        update(gamepad: Gamepad) {
            player.parsedGamepad = player.parseGamepad(gamepad);
            player.updateButtons(player.parsedGamepad);
            player.updateStick(player.parsedGamepad);
            player.updateAliases();
            player.updateAggregators(gamepad); // REVIEW: Shouldn't this use parsedGamepad too?

            listenOptions = updateListenOptions(listenOptions, player.parsedGamepad, threshold);
        },

        getButtonValue(value: IButtonValue = 0): IButtonValue {
            if (!clampThreshold) {
                return value;
            }

            return !player.isButtonSignificant(value) ? 0 : value;
        },

        isButtonSignificant(value: IButtonValue = 0): boolean {
            return Math.abs(value) > threshold;
        },

        updateButtons(gamepad: IParsedGamepad) {
            player.buttons = mapValues((binding: IButtonBinding) => binding.mapper(gamepad), player.buttonBindings);
        },

        getStickValue(stickValues: IStickValue): IStickValue {
            if (clampThreshold && !player.isStickSignificant(stickValues)) {
                return stickValues.map(() => 0);
            }

            return stickValues;
        },

        isStickSignificant(stickValues: IStickValue): boolean {
            return stickValues.findIndex(value => Math.abs(value) >= threshold) !== -1;
        },

        updateStick(gamepad: IParsedGamepad) {
            const prevStick = player.sticks;

            player.sticks = mapValues((binding: IStickBinding, inputName: string) => {
                const previous: IStick = prevStick[inputName];
                const value: IStickValue = binding.mapper(gamepad, previous.inverts);
                const pressed = player.isStickSignificant(value);

                return {
                    pressed,
                    justChanged: pressed !== player.isStickSignificant(previous.value),
                    value: player.getStickValue(value),
                    inverts: previous.inverts
                };
            }, player.stickBindings);
        },

        updateAliases() {
            // When an alias has more than 1 button assigned to it, use for reference the one that's pressed the most
            player.buttonAliases = mapValues((alias: IButtonAlias) => {
                let value = 0;

                alias.inputs.forEach(aliasName => {
                    if (player.buttons[aliasName].value > value) {
                        value = player.buttons[aliasName].value;
                    }
                });

                value = player.getButtonValue(value);
                const pressed = player.isButtonSignificant(value);

                return {
                    pressed,
                    justChanged: pressed !== player.isButtonSignificant(alias.value),
                    value,
                    inputs: alias.inputs
                };
            }, player.buttonAliases);

            // When an alias has more than 1 stick assigned to it, do an average
            player.stickAliases = mapValues((alias: IStickAlias) => {
                let counts = [];
                let count = 0;

                alias.inputs.forEach(aliasName => {
                    if (player.sticks[aliasName].pressed) {
                        counts = player.sticks[aliasName].value.map((v, i) => v + (counts[i] || 0));
                        count += 1;
                    }
                });

                const value = count === 0 ?
                    player.sticks[alias.inputs[0]].value.map(() => 0) :
                    counts.map(v => v / count);
                const pressed = player.isStickSignificant(value);

                return {
                    pressed,
                    justChanged: pressed !== player.isStickSignificant(alias.value),
                    value,
                    inputs: alias.inputs
                };
            }, player.stickAliases);
        },

        updateAggregators(gamepad: Gamepad) {
            player.aggregators = mapValues(({ callback, value }: IAggregator) => ({
                callback,
                value: callback(this, value, gamepad)
            }), player.aggregators);
        }
    };

    return player;
}
