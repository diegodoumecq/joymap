/* @flow */
import {
    buttonBindings, stickBindings,
    addButtonAlias, addStickAlias,
    makeButtonBinding, makeStickBinding
} from './lib/utils';

import {
    includes, mapValues, findKey,
    omit, difference, findIndexes,
    isConsecutive, noop, unique
} from './lib/tools';

import type {
    IStickValue, IParsedGamepad, IStick, IButton,
    IStickAlias, IButtonAlias, IAggregator,
    IStickBinding, IButtonBinding
} from './types';

type IParams = { name: string, threshold: number, clampThreshold: boolean };

export default class Player {
    name: string;
    threshold: number;
    clampThreshold: boolean;

    parsedGamepad: IParsedGamepad = {
        buttons: [],
        axes: []
    };

    sticks: { [key: string]: IStick };
    buttons: { [key: string]: IButton };
    buttonBindings: { [key: string]: IButtonBinding };
    stickBindings: { [key: string]: IStickBinding };

    gamepadId: ?string = null;
    connected: boolean = false;
    buttonAliases: { [key: string]: IButtonAlias } = {};
    stickAliases: { [key: string]: IStickAlias } = {};
    aggregators: { [key: string]: IAggregator } = {};

    listenOptions: null | {
        callback: Function,
        quantity: number,
        type: 'buttons' | 'axes',
        currentValue: number,
        useTimeStamp: boolean,
        threshold: number,
        consecutive: boolean,
        allowOffset: boolean
    } = null;

    constructor({ name, threshold = 0.3, clampThreshold = true }: IParams = {}) {
        this.name = name;
        this.threshold = threshold;
        this.clampThreshold = clampThreshold;

        this.cleanInputs();
    }

    cleanInputs() {
        this.buttonBindings = buttonBindings;
        this.stickBindings = stickBindings;

        this.buttons = mapValues(() => ({
            value: 0,
            pressed: false,
            justChanged: false
        }), this.buttonBindings);

        this.sticks = mapValues(() => ({
            value: [0, 0],
            pressed: false,
            justChanged: false,
            inverts: [false, false]
        }), this.stickBindings);
    }

    disconnect() {
        this.connected = false;
    }

    reconnect() {
        this.connected = true;
    }

    connect(gamepadId: string) {
        this.connected = true;
        this.gamepadId = gamepadId;
    }

    clearButtonBindings() {
        this.buttonBindings = {};
    }

    clearStickBindings() {
        this.stickBindings = {};
    }

    buttonRebind(inputName: string, binding: IButtonBinding) {
        this.buttonBindings[inputName] = binding;
    }

    stickRebind(inputName: string, binding: IStickBinding) {
        this.stickBindings[inputName] = binding;
    }

    cancelListen() {
        this.listenOptions = null;
    }

    listenButton(
        callback: Function,
        quantity: number = 1,
        { waitFor = [1, 'polls'], consecutive = false, allowOffset = true }: Object = {}
    ) {
        this.listenOptions = {
            callback,
            quantity,
            type: 'buttons',
            currentValue: 0,
            useTimeStamp: waitFor[1] === 'ms',
            threshold: waitFor[0],
            consecutive,
            allowOffset
        };
    }

    listenAxis(
        callback: Function,
        quantity: number = 2,
        { waitFor = [100, 'polls'], consecutive = true, allowOffset = true }: Object = {}
    ) {
        this.listenOptions = {
            callback,
            quantity,
            type: 'axes',
            currentValue: 0,
            useTimeStamp: waitFor[1] === 'ms',
            threshold: waitFor[0],
            consecutive,
            allowOffset
        };
    }

    buttonRebindOnPress(inputName: string, callback: Function = noop, allowDuplication: boolean = false) {
        this.listenButton(index => {
            const bindingIndex = findKey({ index }, this.buttonBindings);

            if (bindingIndex) {
                if (inputName !== bindingIndex) {
                    if (allowDuplication) {
                        this.buttonBindings[inputName] = makeButtonBinding(index);
                    } else {
                        const binding = this.buttonBindings[bindingIndex];
                        this.buttonBindings[bindingIndex] = this.buttonBindings[inputName];
                        this.buttonBindings[inputName] = binding;
                    }
                }
            } else {
                this.buttonBindings[inputName] = makeButtonBinding(index);
            }

            callback(bindingIndex);
        });
    }

    stickRebindOnPress(inputName: string, callback: Function = noop, allowDuplication: boolean = false) {
        this.listenAxis((index1, index2) => {
            // TODO Fix typing issue with mixed argument for findKey
            const bindingIndex: string | null = findKey(({ indexes }) => (
                indexes.includes(index1) && indexes.includes(index2)
            ), this.stickBindings);

            if (bindingIndex) {
                if (inputName !== bindingIndex) {
                    if (allowDuplication) {
                        this.stickBindings[inputName] = makeStickBinding(index1, index2);
                    } else {
                        const binding = this.stickBindings[bindingIndex];
                        this.stickBindings[bindingIndex] = this.stickBindings[inputName];
                        this.stickBindings[inputName] = binding;
                    }
                }
            } else {
                this.stickBindings[inputName] = makeStickBinding(index1, index2);
            }

            callback(bindingIndex);
        });
    }

    setAggregator(aggregatorName: string, callback: Function) {
        this.aggregators[aggregatorName] = { callback, value: null };
    }

    removeAggregator(aggregatorName: string) {
        this.aggregators = omit([aggregatorName], this.aggregators);
    }

    cleanAggregators() {
        this.aggregators = {};
    }

    setAlias(aliasName: string, inputs: string | string[]) {
        const inputList: string[] = typeof inputs === 'string' ? [inputs] : inputs;

        if (difference(inputList, Object.keys(this.buttons)).length === 0) {
            this.buttonAliases[aliasName] = addButtonAlias(this.buttonAliases[aliasName], inputList);
        } else if (difference(inputList, Object.keys(this.sticks)).length === 0) {
            const lengths: IStickValue = inputList.map(name => this.sticks[name].value.length);

            if (unique(lengths).length === 1) {
                this.stickAliases[aliasName] = addStickAlias(this.stickAliases[aliasName], inputList);
            } else {
                throw new Error(
                    `joymap.players.${this.name}.setAlias(${aliasName}),
                    all sticks specified did not have the same number of axes`
                );
            }
        } else {
            throw new Error(
                `joymap.players.${this.name}.setAlias(${aliasName}),
                either on of the inputs is void or it wasn't all a collection of just buttons or just sticks`
            );
        }
    }

    removeAlias(aliasName: string) {
        if (includes(aliasName, Object.keys(this.buttonAliases))) {
            this.buttonAliases = omit([aliasName], this.buttonAliases);
        } else if (includes(aliasName, Object.keys(this.stickAliases))) {
            this.stickAliases = omit([aliasName], this.stickAliases);
        } else {
            throw new Error(
                `joymap.players.${this.name}.removeAlias(${aliasName}) couldn't find the alias '${aliasName}'`
            );
        }
    }

    cleanAliases() {
        this.buttonAliases = {};
        this.stickAliases = {};
    }

    destroy() {
        this.disconnect();
        this.cleanInputs();
        this.cleanAliases();
        this.cleanAggregators();
    }

    parseGamepad(gamepad: Gamepad): IParsedGamepad {
        const prevGamepad = this.parsedGamepad;

        return {
            buttons: gamepad.buttons.map(({ value }: { value: number }, index: number) => {
                const previous: IButton = prevGamepad.buttons[index];
                const pressed = this.isButtonSignificant(value);

                return {
                    pressed,
                    justChanged: pressed !== (previous ? this.isButtonSignificant(previous.value) : false),
                    value
                };
            }),
            axes: gamepad.axes
        };
    }

    updateListenOptions() {
        if (this.listenOptions) {
            const {
                callback, quantity, type,
                currentValue, useTimeStamp, threshold,
                consecutive, allowOffset
            } = this.listenOptions;

            let result;

            if (type === 'axes') {
                result = findIndexes(value => Math.abs(value) > this.threshold, this.parsedGamepad.axes);
            } else {
                result = findIndexes(
                    ({ pressed, justChanged }) => pressed && (currentValue !== 0 || justChanged),
                    this.parsedGamepad.buttons
                );
            }

            if (result.length === quantity
            && (!consecutive || isConsecutive(result.slice(0, quantity)))
            && (allowOffset || result[0] % quantity === 0)) {
                if (useTimeStamp && currentValue === 0) {
                    this.listenOptions = Object.assign({}, this.listenOptions, { currentValue: Date.now() });
                } else {
                    const comparison = useTimeStamp ? Date.now() - currentValue : currentValue + 1;

                    if (threshold <= comparison) {
                        callback(...result.slice(0, quantity));
                        this.listenOptions = null;
                    } else if (!useTimeStamp) {
                        this.listenOptions = Object.assign({}, this.listenOptions, { currentValue: comparison });
                    }
                }
            } else {
                this.listenOptions = Object.assign({}, this.listenOptions, { currentValue: 0 });
            }
        }
    }

    update(gamepad: Gamepad) {
        this.parsedGamepad = this.parseGamepad(gamepad);
        this.updateButtons(this.parsedGamepad);
        this.updateStick(this.parsedGamepad);
        this.updateAliases();
        this.updateAggregators(gamepad); // REVIEW: Shouldn't this use parsedGamepad too?

        this.updateListenOptions();
    }

    getButtonValue(value: number = 0): number {
        if (!this.clampThreshold) {
            return value;
        }

        return Math.abs(value) < this.threshold ? 0 : value;
    }

    isButtonSignificant(value: number = 0): boolean {
        return !!value && Math.abs(value) > this.threshold;
    }

    updateButtons(gamepad: IParsedGamepad) {
        this.buttons = mapValues((binding: IButtonBinding) => binding.mapper(gamepad), this.buttonBindings);
    }

    getStickValue(stickValues: IStickValue): IStickValue {
        if (this.clampThreshold && !this.isStickSignificant(stickValues)) {
            return stickValues.map(() => 0);
        }

        return stickValues;
    }

    isStickSignificant(stickValues: IStickValue): boolean {
        return stickValues.findIndex(value => Math.abs(value) >= this.threshold) !== -1;
    }

    updateStick(gamepad: IParsedGamepad) {
        const prevStick = this.sticks;

        this.sticks = mapValues((binding: IStickBinding, inputName: string) => {
            const previous: IStick = prevStick[inputName];
            const value: IStickValue = binding.mapper(gamepad, previous.inverts);
            const pressed = this.isStickSignificant(value);

            return {
                pressed,
                justChanged: pressed !== this.isStickSignificant(previous.value),
                value: this.getStickValue(value),
                inverts: previous.inverts
            };
        }, this.stickBindings);
    }

    updateAliases() {
        // When an alias has more than 1 button assigned to it, use for reference the one that's pressed the most
        this.buttonAliases = mapValues((alias: IButtonAlias) => {
            let value = 0;

            alias.inputs.forEach(name => {
                if (this.buttons[name].value > value) {
                    value = this.buttons[name].value;
                }
            });

            value = this.getButtonValue(value);
            const pressed = this.isButtonSignificant(value);

            return {
                pressed,
                justChanged: pressed !== this.isButtonSignificant(alias.value),
                value,
                inputs: alias.inputs
            };
        }, this.buttonAliases);

        // When an alias has more than 1 stick assigned to it, do an average
        this.stickAliases = mapValues((alias: IStickAlias) => {
            const length = this.sticks[alias.inputs[0]].value.map(() => 0);
            let counts = [];
            let count = 0;

            alias.inputs.forEach(name => {
                if (this.sticks[name].pressed) {
                    counts = this.sticks[name].value.map((v, i) => v + (counts[i] || 0));
                    count += 1;
                }
            });

            const value = count === 0 ? [...Array(length)].map(() => 0) : counts.map(v => v / count);
            const pressed = this.isStickSignificant(value);

            return {
                pressed,
                justChanged: pressed !== this.isStickSignificant(alias.value),
                value,
                inputs: alias.inputs
            };
        }, this.stickAliases);
    }

    updateAggregators(gamepad: Gamepad) {
        this.aggregators = mapValues(({ callback, value }: IAggregator) => ({
            callback,
            value: callback(this, value, gamepad)
        }), this.aggregators);
    }
}
