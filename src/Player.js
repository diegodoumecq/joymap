/* @flow */
import {
    buttonsMap, sticksMap,
    makeButtonMapper, addButtonAlias,
    addStickAlias
} from './lib/utils';

import {
    noop, includes, mapValues, findKey, omit, difference
} from './lib/tools';

import type {
    IPoint, IParsedGamepad, IStick, IButton,
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
    buttonBindings: { [key: string]: IButtonBinding } = buttonsMap;
    stickBindings: { [key: string]: IStickBinding } = sticksMap;

    listenOnPress: null | Function = null;

    gamepadId: ?string = null;
    connected: boolean = false;
    buttonAliases: { [key: string]: IButtonAlias } = {};
    stickAliases: { [key: string]: IStickAlias } = {};
    aggregators: { [key: string]: IAggregator } = {};

    constructor({ name, threshold = 0.3, clampThreshold = true }: IParams = {}) {
        this.name = name;
        this.threshold = threshold;
        this.clampThreshold = clampThreshold;

        this.cleanInputs();
    }

    cleanInputs() {
        this.buttonBindings = buttonsMap;
        this.stickBindings = sticksMap;

        this.buttons = mapValues(() => ({
            value: 0,
            pressed: false,
            justChanged: false
        }), this.buttonBindings);

        this.sticks = mapValues(() => ({
            value: { x: 0, y: 0 },
            pressed: false,
            justChanged: false,
            invertX: false,
            invertY: false
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

    cancelButtonRebindOnPress() {
        this.listenOnPress = null;
    }

    buttonRebindOnPress(inputName: string, callback: Function = noop, allowDuplication: boolean = false) {
        this.listenOnPress = index => {
            const bindingIndex = findKey({ index }, this.buttonBindings);

            if (bindingIndex) {
                if (inputName !== bindingIndex) {
                    if (allowDuplication) {
                        this.buttonBindings[inputName] = makeButtonMapper(index);
                    } else {
                        const binding = this.buttonBindings[bindingIndex];
                        this.buttonBindings[bindingIndex] = this.buttonBindings[inputName];
                        this.buttonBindings[inputName] = binding;
                    }
                }
            } else {
                this.buttonBindings[inputName] = makeButtonMapper(index);
            }

            callback(bindingIndex);
        };
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
        let inputList: string[];

        if (typeof inputs === 'string') {
            inputList = [inputs];
        } else {
            inputList = inputs;
        }

        if (difference(inputList, Object.keys(this.buttons)).length === 0) {
            this.buttonAliases[aliasName] = addButtonAlias(this.buttonAliases[aliasName], inputList);
        } else if (difference(inputList, Object.keys(this.sticks)).length === 0) {
            this.stickAliases[aliasName] = addStickAlias(this.stickAliases[aliasName], inputList);
        } else {
            throw new Error(
                `joymap.players.${this.name}.setAlias(${aliasName},
                couldn't every single input ('${inputList.join(', ')}') in buttons or sticks exclusively`
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

    update(gamepad: Gamepad) {
        this.parsedGamepad = this.parseGamepad(gamepad);
        this.updateButtons(this.parsedGamepad);
        this.updateStick(this.parsedGamepad);
        this.updateAliases();
        this.updateAggregators(gamepad);

        const callback = this.listenOnPress;
        if (callback) {
            const index = this.parsedGamepad.buttons.findIndex(({ pressed, justChanged }) => pressed && justChanged);

            if (index !== -1) {
                callback(index);
                this.listenOnPress = null;
            }
        }
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

    getStickValue(sticks: IPoint = { x: 0, y: 0 }): IPoint {
        if (this.clampThreshold
        && Math.abs(sticks.x) < this.threshold
        && Math.abs(sticks.y) < this.threshold) {
            return { x: 0, y: 0 };
        }
        return sticks;
    }

    isStickSignificant(sticks: IPoint = { x: 0, y: 0 }): boolean {
        return !!sticks
            && (!!sticks.x || !!sticks.y)
            && (Math.abs(sticks.x) > this.threshold || Math.abs(sticks.y) > this.threshold);
    }

    updateStick(gamepad: IParsedGamepad) {
        const prevStick = this.sticks;

        this.sticks = mapValues((binding: IStickBinding, inputName: string) => {
            const previous: IStick = prevStick[inputName];
            const { invertX, invertY } = previous;
            const value: IPoint = binding.mapper(gamepad, invertX, invertY);
            const pressed = this.isStickSignificant(value);

            return {
                pressed,
                justChanged: pressed !== this.isStickSignificant(previous.value),
                value: this.getStickValue(value),
                invertX,
                invertY
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
            let xCount = 0;
            let yCount = 0;
            let count = 0;

            alias.inputs.forEach(name => {
                if (this.sticks[name].pressed) {
                    const { x, y } = this.sticks[name].value;
                    xCount += x;
                    yCount += y;
                    count += 1;
                }
            });

            const value = this.getStickValue({
                x: count === 0 ? 0 : xCount / count,
                y: count === 0 ? 0 : yCount / count
            });
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
