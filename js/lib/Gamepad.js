export default class Gamepad {

    constructor({ rawGamepad, inputMap, aliases, type, threshold }) {
        this.inputMap = inputMap;
        this.aliases = aliases;
        this.type = type;
        this.mappedValues = {};
        this.threshold = threshold;
        this.connected = true;

        this.update(rawGamepad);
    }

    getState(type) {
        if (this.connected) {
            return this.mappedValues[type];
        }

        return undefined;
    }

    isSignificant(number) {
        return !!number && Math.abs(number) > this.threshold;
    }

    update(rawGamepad) {
        let newValues = {};
        const oldValues = this.mappedValues;
        this.mappedValues = newValues;
        this.rawGamepad = rawGamepad;

        // Parse through all inputs
        Object.keys(this.inputMap).forEach((name) => {
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
        });

        // Parse through input aliases
        Object.keys(this.aliases).forEach((name) => {
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
        });
    }

    get index() {
        return this.rawGamepad.index;
    }
}
