import { omit, includes } from 'lodash/fp';
import { mapValues } from 'lodash';

export const axisMap = {
    L: (pad, invertX = false, invertY = false) => ({
        x: !invertX ? pad.axes[0] : -1 * pad.axes[0],
        y: !invertY ? pad.axes[1] : -1 * pad.axes[1],
    }),
    R: (pad, invertX = false, invertY = false) => ({
        x: !invertX ? pad.axes[2] : -1 * pad.axes[2],
        y: !invertY ? pad.axes[3] : -1 * pad.axes[3],
    })
};

export const buttonsMap = {
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

export default class Player {
    name: string;
    threshold: number;
    clampThreshold: boolean;
    buttons: Object;
    sticks: Object;
    gamepadId: ?string = null;

    connected = false;
    aliases = {};
    aggregators = {};
    aggregatorCallbacks = {};

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
                value: 0,
                pressed: false,
                justChanged: false,
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

    update(gamepad: Object): void {
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

    updateButtons(gamepad: Object): void {
        const prevButtons = this.buttons;

        this.buttons = mapValues(buttonsMap, (mapper: Function, inputName) => {
            const previous = prevButtons[inputName];
            const value = mapper(gamepad);
            const justChanged = this.isButtonSignificant(value) !== this.isButtonSignificant(previous.value);

            return {
                value: this.getButtonValue(value),
                pressed: this.isButtonSignificant(value),
                justChanged
            };
        });
    }

    getAxisValue(sticks = { x: 0, y: 0 }): Object {
        if (this.clampThreshold
        && Math.abs(sticks.x) < this.threshold && Math.abs(sticks.y) < this.threshold) {
            return { x: 0, y: 0 };
        }
        return sticks;
    }

    isAxisSignificant(sticks = { x: 0, y: 0 }): boolean {
        return !!sticks && (!!sticks.x || !!sticks.y) && (Math.abs(sticks.x) > this.threshold || Math.abs(sticks.y) > this.threshold);
    }

    updateAxis(gamepad: Object): void {
        const prevAxis = this.sticks;

        this.sticks = mapValues(axisMap, (mapper: Function, inputName) => {
            const previous = prevAxis[inputName];
            const invertX = previous.invertX;
            const invertY = previous.invertY;
            const value = mapper(gamepad, invertX, invertY);
            const justChanged = this.isAxisSignificant(value) !== this.isAxisSignificant(previous.value);

            return {
                value: this.getAxisValue(value),
                pressed: this.isAxisSignificant(value),
                justChanged, invertX, invertY
            };
        });
    }

    updateAliases(): void {
        this.aliases = mapValues(this.aliases, (alias: Object) => {
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

    updateAggregators(gamepad: Object): void {
        this.aggregators = mapValues(this.aggregators, (prevValue: any, aggregatorName) => {
            return this.aggregatorCallbacks[aggregatorName](this, prevValue, gamepad);
        });
    }
}
