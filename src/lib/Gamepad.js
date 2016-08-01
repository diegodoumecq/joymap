import { forEach } from 'lodash/fp';

export default class Gamepad {

    connected = true;
    mappedValues = {};

    constructor({ rawGamepad, inputMap, aliases, type, threshold }) {
        this.inputMap = inputMap;
        this.aliases = aliases;
        this.type = type;
        this.threshold = threshold;

        this.update(rawGamepad);
    }

    getState(type) {
        if (this.connected) {
            return this.mappedValues[type];
        }

        return {};
    }

    isSignificant(number) {
        return !!number && Math.abs(number) > this.threshold;
    }

    update(rawGamepad) {
        this.rawGamepad = rawGamepad;

        const newValues = {};
        const oldValues = this.mappedValues;

        this.mappedValues = newValues;

        // Parse through all inputs
        forEach((name) => {
            const previous = oldValues[name];
            const currentValue = this.inputMap[name].call(this);
            const suddenChange = !previous || (this.isSignificant(currentValue) !== this.isSignificant(previous.value));

            if (!this.isSignificant(currentValue)) {
                newValues[name] = {
                    value: currentValue,
                    state: suddenChange && !!previous ? 'justReleased' : 'released'
                };
            } else {
                newValues[name] = {
                    value: currentValue,
                    state: suddenChange ? 'justPressed' : 'pressed'
                };
            }
        }, Object.keys(this.inputMap));

        // Parse through input aliases
        forEach((name) => {
            const previous = oldValues[name];
            const currentValue = this.aliases[name].call(this);
            const suddenChange = !previous || (this.isSignificant(currentValue) !== this.isSignificant(previous.value));

            if (!this.isSignificant(currentValue)) {
                newValues[name] = {
                    value: currentValue,
                    state: suddenChange && !!previous ? 'justReleased' : 'released'
                };
            } else {
                newValues[name] = {
                    value: currentValue,
                    state: suddenChange ? 'justPressed' : 'pressed'
                };
            }
        }, Object.keys(this.aliases));
    }

    get id() {
        return this.rawGamepad.id;
    }
}
