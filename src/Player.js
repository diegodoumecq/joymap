/* @flow */
import {
    omit, includes, assign, difference, forEach
} from 'lodash/fp';
import { mapValues } from 'lodash';

type IPoint = { x: number, y: number };
type IStick = {
    value: IPoint,
    pressed: boolean,
    justChanged: boolean,
    invertX: boolean,
    invertY: boolean
};
type IButton = { value: number, pressed: boolean, justChanged: boolean };

type IButtonAlias = { inputs: string[], value: number, pressed: boolean, justChanged: boolean };
type IStickAlias = { inputs: string[], value: IPoint, pressed: boolean, justChanged: boolean };
type IAggregator = { callback: Function, value: any };

type IStickMapper = (pad: Gamepad, invertX: boolean, invertY: boolean) => IPoint;
export const sticksMap: { [key: string]: IStickMapper } = {
    L: (pad, invertX = false, invertY = false) => ({
        x: !invertX ? pad.axes[0] : -1 * pad.axes[0],
        y: !invertY ? pad.axes[1] : -1 * pad.axes[1]
    }),
    R: (pad, invertX = false, invertY = false) => ({
        x: !invertX ? pad.axes[2] : -1 * pad.axes[2],
        y: !invertY ? pad.axes[3] : -1 * pad.axes[3]
    })
};

type IButtonMapper = (pad: Gamepad) => number;
export const buttonsMap: { [key: string]: IButtonMapper } = {
    dpadUp: pad => pad.buttons[12].value,
    dpadDown: pad => pad.buttons[13].value,
    dpadLeft: pad => pad.buttons[14].value,
    dpadRight: pad => pad.buttons[15].value,
    L1: pad => pad.buttons[4].value,
    L2: pad => pad.buttons[6].value,
    L3: pad => pad.buttons[10].value,
    R1: pad => pad.buttons[5].value,
    R2: pad => pad.buttons[7].value,
    R3: pad => pad.buttons[11].value,
    A: pad => pad.buttons[0].value,
    B: pad => pad.buttons[1].value,
    X: pad => pad.buttons[2].value,
    Y: pad => pad.buttons[3].value,
    start: pad => pad.buttons[9].value,
    select: pad => pad.buttons[8].value,
    home: () => 0
};

function addButtonAlias(alias: IButtonAlias | void, inputs: string[]) {
    if (!alias) {
        return {
            inputs,
            value: 0,
            pressed: false,
            justChanged: false
        };
    }

    return assign(alias, {
        inputs: [...alias.inputs, ...inputs]
    });
}

function addStickAlias(alias: IStickAlias | void, inputs: string[]) {
    if (!alias) {
        return {
            inputs,
            value: { x: 0, y: 0 },
            pressed: false,
            justChanged: false
        };
    }

    return assign(alias, {
        inputs: [...alias.inputs, ...inputs]
    });
}

type IParams = { name: string, threshold: number, clampThreshold: boolean };

export default class Player {
    name: string;
    threshold: number;
    clampThreshold: boolean;
    sticks: { [key: string]: IStick };
    buttons: { [key: string]: IButton };
    buttonBindings: { [key: string]: IButtonMapper };
    stickBindings: { [key: string]: IStickMapper };

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

    buttonRebindOnPress(inputName: string/* , allowDuplication = false*/) {
        return Promise((resolve, reject) => {

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

        this.buttons = mapValues(this.buttonBindings, (mapper: Function, inputName) => {
            const previous: IButton = prevButtons[inputName];
            const value: number = mapper(gamepad);
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

        this.sticks = mapValues(this.stickBindings, (mapper: Function, inputName: string) => {
            const previous: IStick = prevStick[inputName];
            const { invertX, invertY } = previous;
            const value: IPoint = mapper(gamepad, invertX, invertY);
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
