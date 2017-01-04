/* @flow */
import {
    omit, includes, difference, forEach, findIndex
} from 'lodash/fp';
import { mapValues } from 'lodash';

import {
    buttonsMap, sticksMap,
    makeButtonMapper, addButtonAlias,
    addStickAlias
} from './utils';

import type {
    IPoint, IStick, IButton, IStickAlias,
    IButtonAlias, IAggregator,
    IStickMapper, IButtonMapper,
    IStickBinding, IButtonBinding
} from './types';

type IParams = { name: string, threshold: number, clampThreshold: boolean };

export default class Player {
    name: string;
    threshold: number;
    clampThreshold: boolean;
    sticks: { [key: string]: IStick };
    buttons: { [key: string]: IButton };
    buttonBindings: ({ [key: string]: IButtonBinding });
    stickBindings: ({ [key: string]: IStickBinding });

    listenOnPress: ?(index: number) => void = null;

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

        this.buttons = mapValues(this.buttonBindings, () => ({
            value: 0,
            pressed: false,
            justChanged: false
        }));

        this.sticks = mapValues(this.stickBindings, () => ({
            value: { x: 0, y: 0 },
            pressed: false,
            justChanged: false,
            invertX: false,
            invertY: false
        }));
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

    buttonRebind(inputName: string, mapper: IButtonMapper) {
        this.buttonBindings[inputName] = mapper;
    }

    stickRebind(inputName: string, mapper: IStickMapper) {
        this.stickBindings[inputName] = mapper;
    }

    buttonRebindOnPress(inputName: string, callback: Function, allowDuplication: false = false) {
        this.listenOnPress = index => {
            const bindingIndex = findIndex({ index }, this.buttonBindings);

            callback(bindingIndex);

            // TODO clean up this.buttons so that it corresponds to these bindings?

            if (bindingIndex !== -1) {
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

    update(gamepad: Gamepad) {
        this.updateButtons(gamepad);
        this.updateStick(gamepad);
        this.updateAliases();
        this.updateAggregators(gamepad);

        // TODO: parse through the whole gamepad to store flags of pressed, value and justChanged

        if (this.listenOnPress !== null) {
            const index = findIndex(button => this.getButtonValue(button.value), gamepad.buttons);

            if (index !== -1) {
                this.listenOnPress(index);
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

    updateButtons(gamepad: Gamepad) {
        const prevButtons = this.buttons;

        this.buttons = mapValues(this.buttonBindings, (binding: IButtonBinding, inputName) => {
            const previous: IButton = prevButtons[inputName];
            const value: number = binding.mapper(gamepad);
            const pressed = this.isButtonSignificant(value);

            return {
                pressed,
                justChanged: pressed !== this.isButtonSignificant(previous.value),
                value: this.getButtonValue(value)
            };
        });
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

    updateStick(gamepad: Gamepad) {
        const prevStick = this.sticks;

        this.sticks = mapValues(this.stickBindings, (binding: IStickBinding, inputName: string) => {
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
        });
    }

    updateAliases() {
        // When an alias has more than 1 button assigned to it, use for reference the one that's pressed the most
        this.buttonAliases = mapValues(this.buttonAliases, (alias: IButtonAlias) => {
            let value = 0;

            forEach(name => {
                if (this.buttons[name].value > value) {
                    value = this.buttons[name].value;
                }
            }, alias.inputs);

            value = this.getButtonValue(value);
            const pressed = this.isButtonSignificant(value);

            return {
                pressed,
                justChanged: pressed !== this.isButtonSignificant(alias.value),
                value,
                inputs: alias.inputs
            };
        });

        // When an alias has more than 1 stick assigned to it, do an average
        this.stickAliases = mapValues(this.stickAliases, (alias: IStickAlias) => {
            let xCount = 0;
            let yCount = 0;
            let count = 0;

            forEach(name => {
                if (this.sticks[name].pressed) {
                    const { x, y } = this.sticks[name].value;
                    xCount += x;
                    yCount += y;
                    count += 1;
                }
            }, alias.inputs);

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
        });
    }

    updateAggregators(gamepad: Gamepad) {
        this.aggregators = mapValues(this.aggregators, ({ callback, value }: IAggregator) => ({
            callback,
            value: callback(this, value, gamepad)
        }));
    }
}
