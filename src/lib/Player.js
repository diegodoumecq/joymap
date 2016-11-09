import { omit, includes } from 'lodash/fp';
import { mapValues } from 'lodash';

type IPoint = { x: number, y: number };
type IAxis = {
    value: IPoint,
    pressed: boolean,
    justChanged: boolean,
    invertX: boolean,
    invertY: boolean
};
type IButton = { value: number, pressed: boolean, justChanged: boolean };
type IAlias = { name: string, isButton: boolean };

export const axisMap = {
    L: (pad: Gamepad, invertX: boolean = false, invertY: boolean = false) => ({
        x: !invertX ? pad.axes[0] : -1 * pad.axes[0],
        y: !invertY ? pad.axes[1] : -1 * pad.axes[1],
    }),
    R: (pad: Gamepad, invertX: boolean = false, invertY: boolean = false) => ({
        x: !invertX ? pad.axes[2] : -1 * pad.axes[2],
        y: !invertY ? pad.axes[3] : -1 * pad.axes[3],
    })
};

export const buttonsMap = {
    dpadUp: (pad: Gamepad) => pad.buttons[12].value,
    dpadDown: (pad: Gamepad) => pad.buttons[13].value,
    dpadLeft: (pad: Gamepad) => pad.buttons[14].value,
    dpadRight: (pad: Gamepad) => pad.buttons[15].value,
    L1: (pad: Gamepad) => pad.buttons[4].value,
    L2: (pad: Gamepad) => pad.buttons[6].value,
    L3: (pad: Gamepad) => pad.buttons[10].value,
    R1: (pad: Gamepad) => pad.buttons[5].value,
    R2: (pad: Gamepad) => pad.buttons[7].value,
    R3: (pad: Gamepad) => pad.buttons[11].value,
    A: (pad: Gamepad) => pad.buttons[0].value,
    B: (pad: Gamepad) => pad.buttons[1].value,
    X: (pad: Gamepad) => pad.buttons[2].value,
    Y: (pad: Gamepad) => pad.buttons[3].value,
    start: (pad: Gamepad) => pad.buttons[9].value,
    select: (pad: Gamepad) => pad.buttons[8].value,
    home: () => 0
};

export default class Player {
    name: string;
    threshold: number;
    clampThreshold: boolean;
    sticks: { [key: string]: IAxis };
    buttons: { [key: string]: IButton };

    gamepadId: ?string = null;
    connected: boolean = false;
    aliases: { [key: string]: IAlias } = {};

    aggregators: { [key: string]: any } = {};
    aggregatorCallbacks: { [key: string]: Function } = {};

    constructor({ name, threshold = 0.3, clampThreshold = true } = {}): void {
        this.name = name;
        this.threshold = threshold;
        this.clampThreshold = clampThreshold;

        this.cleanInputs();
    }

    cleanInputs(): void {
        this.buttons = mapValues(buttonsMap, () => ({
            value: 0,
            pressed: false,
            justChanged: false
        }));

        this.sticks = mapValues(axisMap, () => ({
            value: { x: 0, y: 0 },
            pressed: false,
            justChanged: false,
            invertX: false,
            invertY: false
        }));
    }

    disconnect(): void {
        this.connected = false;
    }

    reconnect(): void {
        this.connected = true;
    }

    connect(gamepadId: string): void {
        this.connected = true;
        this.gamepadId = gamepadId;
    }

    listen(aliasName: string, finishedCallback: Function, allowDuplication = true): void {
        // TODO listen for the next input to be pressed && justChanged and set that as the buttonName of aliasName
    }

    setAggregator(aggregatorName: string, callback: Function): void {
        this.aggregatorCallbacks[aggregatorName] = callback;
        this.aggregators[aggregatorName] = null;
    }

    removeAggregator(aggregatorName: string): void {
        this.aggregatorCallbacks = omit([aggregatorName], this.aggregatorCallbacks);
        this.aggregators = omit([aggregatorName], this.aggregators);
    }

    cleanAggregators(): void {
        this.aggregatorCallbacks = {};
        this.aggregators = {};
    }

    setAlias(aliasName: string, buttonName: string): void {
        const isButton = includes(buttonName, Object.keys(this.buttons));
        const isAxis = includes(buttonName, Object.keys(this.sticks));

        if (isButton || isAxis) {
            this.aliases[aliasName] = {
                isButton,
                name: buttonName
            };
        } else {
            console.error(`joymap.players.${this.name}.setAlias didn't find '${buttonName}' in any of the availale inputs for alias ${aliasName}`);
        }
    }

    removeAlias(aliasName: string): void {
        this.aliases = omit([aliasName], this.aliases);
    }

    cleanAliases(): void {
        this.aliases = {};
    }

    destroy(): void {
        this.disconnect();
        this.cleanInputs();
        this.cleanAliases();
        this.cleanAggregators();
    }

    update(gamepad: Gamepad): void {
        this.updateButtons(gamepad);
        this.updateAxis(gamepad);
        this.updateAliases();
        this.updateAggregators(gamepad);
    }

    getButtonValue(value: number = 0): number {
        if (!this.clampThreshold) {
            return value;
        } else {
            return Math.abs(value) < this.threshold ? 0 : value;
        }
    }

    isButtonSignificant(value: number = 0): boolean {
        return !!value && Math.abs(value) > this.threshold;
    }

    updateButtons(gamepad: Gamepad): void {
        const prevButtons = this.buttons;

        this.buttons = mapValues(buttonsMap, (mapper: Function, inputName) => {
            const previous: IButton = prevButtons[inputName];
            const value: number = mapper(gamepad);
            const justChanged: boolean = this.isButtonSignificant(value) !== this.isButtonSignificant(previous.value);

            return {
                value: this.getButtonValue(value),
                pressed: this.isButtonSignificant(value),
                justChanged
            };
        });
    }

    getAxisValue(sticks: IPoint = { x: 0, y: 0 }): IPoint {
        if (this.clampThreshold
        && Math.abs(sticks.x) < this.threshold && Math.abs(sticks.y) < this.threshold) {
            return { x: 0, y: 0 };
        }
        return sticks;
    }

    isAxisSignificant(sticks: IPoint = { x: 0, y: 0 }): boolean {
        return !!sticks && (!!sticks.x || !!sticks.y) && (Math.abs(sticks.x) > this.threshold || Math.abs(sticks.y) > this.threshold);
    }

    updateAxis(gamepad: Gamepad): void {
        const prevAxis = this.sticks;

        this.sticks = mapValues(axisMap, (mapper: Function, inputName: string) => {
            const previous: IAxis = prevAxis[inputName];
            const { invertX, invertY } = previous;
            const value: IPoint = mapper(gamepad, invertX, invertY);
            const justChanged: boolean = this.isAxisSignificant(value) !== this.isAxisSignificant(previous.value);

            return {
                value: this.getAxisValue(value),
                pressed: this.isAxisSignificant(value),
                justChanged, invertX, invertY
            };
        });
    }

    // REVIEW: change into buttonAliases and AxisAliases? removes the necessity of isButton
    updateAliases(): void {
        this.aliases = mapValues(this.aliases, (alias: IAlias) => {
            const { name, isButton } = alias;

            if (!isButton) {
                return {
                    ...this.sticks[name],
                    name, isButton
                };
            } else {
                return {
                    ...this.buttons[name],
                    name, isButton
                };
            }
        });
    }

    // IDEA: Change aggregators and aggregatorCallbacks into a single object
    updateAggregators(gamepad: Gamepad): void {
        this.aggregators = mapValues(this.aggregators, (prevValue: any, aggregatorName: string) => {
            return this.aggregatorCallbacks[aggregatorName](this, prevValue, gamepad);
        });
    }
}
