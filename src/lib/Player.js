import { omit, includes } from 'lodash/fp';
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
// TODO check why flow complains when I remove the "{ name: string } | ..."
type IButtonAlias = { name: string } | { name: string, value: number, pressed: boolean, justChanged: boolean };
type IStickAlias = { name: string } | { name: string, value: IPoint, pressed: boolean, justChanged: boolean, invertX: boolean, invertY: boolean };
type IAggregator = { callback: Function, value: any };

export const sticksMap = {
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
    sticks: { [key: string]: IStick };
    buttons: { [key: string]: IButton };

    gamepadId: ?string = null;
    connected: boolean = false;
    buttonAliases: { [key: string]: IButtonAlias } = {};
    stickAliases: { [key: string]: IStickAlias } = {};
    aggregators: { [key: string]: IAggregator } = {};

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

        this.sticks = mapValues(sticksMap, () => ({
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
        this.aggregators[aggregatorName] = { callback, value: null };
    }

    removeAggregator(aggregatorName: string): void {
        this.aggregators = omit([aggregatorName], this.aggregators);
    }

    cleanAggregators(): void {
        this.aggregators = {};
    }

    // TODO Let one alias trigger by more than one input
    setAlias(aliasName: string, buttonName: string): void {
        if (includes(buttonName, Object.keys(this.buttons))) {
            this.buttonAliases[aliasName] = { name: buttonName };
        } else if (includes(buttonName, Object.keys(this.sticks))) {
            this.stickAliases[aliasName] = { name: buttonName };
        } else {
            console.error(`joymap.players.${this.name}.setAlias(${aliasName}, ${buttonName}) couldn't find '${buttonName}' in any of the available inputs`);
        }
    }

    removeAlias(aliasName: string): void {
        if (includes(aliasName, Object.keys(this.buttonAliases))) {
            this.buttonAliases = omit([aliasName], this.buttonAliases);
        } else if (includes(aliasName, Object.keys(this.stickAliases))) {
            this.stickAliases = omit([aliasName], this.stickAliases);
        } else {
            console.error(`joymap.players.${this.name}.removeAlias(${aliasName}) couldn't find the alias '${aliasName}'`);
        }
    }

    cleanAliases(): void {
        this.buttonAliases = {};
        this.stickAliases = {};
    }

    destroy(): void {
        this.disconnect();
        this.cleanInputs();
        this.cleanAliases();
        this.cleanAggregators();
    }

    update(gamepad: Gamepad): void {
        this.updateButtons(gamepad);
        this.updateStick(gamepad);
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

    getStickValue(sticks: IPoint = { x: 0, y: 0 }): IPoint {
        if (this.clampThreshold
        && Math.abs(sticks.x) < this.threshold && Math.abs(sticks.y) < this.threshold) {
            return { x: 0, y: 0 };
        }
        return sticks;
    }

    isStickSignificant(sticks: IPoint = { x: 0, y: 0 }): boolean {
        return !!sticks && (!!sticks.x || !!sticks.y) && (Math.abs(sticks.x) > this.threshold || Math.abs(sticks.y) > this.threshold);
    }

    updateStick(gamepad: Gamepad): void {
        const prevStick = this.sticks;

        this.sticks = mapValues(sticksMap, (mapper: Function, inputName: string) => {
            const previous: IStick = prevStick[inputName];
            const { invertX, invertY } = previous;
            const value: IPoint = mapper(gamepad, invertX, invertY);
            const justChanged = this.isStickSignificant(value) !== this.isStickSignificant(previous.value);

            return {
                value: this.getStickValue(value),
                pressed: this.isStickSignificant(value),
                justChanged, invertX, invertY
            };
        });
    }

    updateAliases(): void {
        this.buttonAliases = mapValues(this.buttonAliases, (alias: IButtonAlias) => ({ ...alias, ...this.buttons[alias.name] }));
        this.stickAliases = mapValues(this.stickAliases, (alias: IStickAlias) => ({ ...alias, ...this.sticks[alias.name] }));
    }

    updateAggregators(gamepad: Gamepad): void {
        this.aggregators = mapValues(this.aggregators, (aggregator: IAggregator) => {
            const { callback, value } = aggregator;
            return {
                value: aggregator.callback(this, value, gamepad),
                callback
            };
        });
    }
}
