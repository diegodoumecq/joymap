import { forEach, reject } from 'lodash/fp';

export function simpleUpdate(newRawGamepad) {
    const newValues = {};

    // Parse through all inputs
    forEach((name) => {
        const currentValue = this._getValue(this.inputMap[name](newRawGamepad));
        newValues[name] = {
            value: currentValue,
            state: !this.isSignificant(currentValue) ? 'released' : 'pressed'
        };
    }, Object.keys(this.inputMap));

    // Parse through input aliases
    forEach((name) => {
        const currentValue = this.aliases[name](newValues);
        newValues[name] = {
            value: currentValue,
            state: !this.isSignificant(currentValue) ? 'released' : 'pressed'
        };
    }, Object.keys(this.aliases));

    return newValues;
}

export function normalUpdate(newRawGamepad, prevMappedValues) {
    const newValues = {};

    // Parse through all inputs
    forEach((name) => {
        const previous = prevMappedValues[name];
        const currentValue = this._getValue(this.inputMap[name](newRawGamepad));
        const suddenChange = !previous || (this.isSignificant(currentValue) !== this.isSignificant(previous.value));

        newValues[name] = !this.isSignificant(currentValue) ? {
            value: currentValue,
            state: suddenChange && !!previous ? 'justReleased' : 'released'
        } : {
            value: currentValue,
            state: suddenChange ? 'justPressed' : 'pressed'
        };
    }, Object.keys(this.inputMap));

    // Parse through input aliases
    forEach((name) => {
        const previous = prevMappedValues[name];
        const currentValue = this.aliases[name](newValues);
        const suddenChange = !previous || (this.isSignificant(currentValue) !== this.isSignificant(previous.value));

        newValues[name] = !this.isSignificant(currentValue) ? {
            value: currentValue,
            state: suddenChange && !!previous ? 'justReleased' : 'released'
        } : {
            value: currentValue,
            state: suddenChange ? 'justPressed' : 'pressed'
        };
    }, Object.keys(this.aliases));

    return newValues;
}

export function eventUpdate(newRawGamepad, prevMappedValues) {
    const newValues = {};

    // Parse through all inputs
    forEach((name) => {
        const previous = prevMappedValues[name];
        const currentValue = this._getValue(this.inputMap[name](newRawGamepad));
        const suddenChange = !previous || (this.isSignificant(currentValue) !== this.isSignificant(previous.value));

        const result = !this.isSignificant(currentValue) ? {
            value: currentValue,
            state: suddenChange && !!previous ? 'justReleased' : 'released'
        } : {
            value: currentValue,
            state: suddenChange ? 'justPressed' : 'pressed'
        };

        forEach((handler) => handler(result), this.events[name]);
        forEach((handler) => handler(result), this.events[`${name}.${result.state}`]);

        newValues[name] = result;
    }, Object.keys(this.inputMap));

    // Parse through input aliases
    forEach((name) => {
        const previous = prevMappedValues[name];
        const currentValue = this.aliases[name](newValues);
        const suddenChange = !previous || (this.isSignificant(currentValue) !== this.isSignificant(previous.value));

        const result = !this.isSignificant(currentValue) ? {
            value: currentValue,
            state: suddenChange && !!previous ? 'justReleased' : 'released'
        } : {
            value: currentValue,
            state: suddenChange ? 'justPressed' : 'pressed'
        };

        forEach((handler) => handler(result), this.events[name]);
        forEach((handler) => handler(result), this.events[`${name}.${result.state}`]);

        newValues[name] = result;
    }, Object.keys(this.aliases));

    return newValues;
}

export default class Gamepad {

    connected = true;
    mappedValues = {};

    constructor({ rawGamepad, inputMap,  aliases, events, type, threshold, clampThreshold, update }) {
        this.events = events;
        this.inputMap = inputMap;
        this.aliases = aliases;
        this.type = type;
        this.threshold = threshold;
        this.clampThreshold = clampThreshold;

        this.setUpdate(update);
        this.update(rawGamepad);
    }

    getState(type) {
        if (this.connected) {
            return this.mappedValues[type];
        }

        return {};
    }

    _getValue(value) {
        if (!this.clampThreshold) {
            return value;
        } else {
            return Math.abs(value) < this.threshold ? 0 : value;
        }
    }

    isSignificant(number) {
        return !!number && Math.abs(number) > this.threshold;
    }

    setUpdate(update) {
        switch(update) {
            case 'simple': this.onUpdate = simpleUpdate; break;
            case 'normal': this.onUpdate = normalUpdate; break;
            case 'event': this.onUpdate = eventUpdate; break;
            
            default: this.onUpdate = update || normalUpdate; break;
        }
    }

    update(rawGamepad) {
        this.rawGamepad = rawGamepad;
        this.mappedValues = this.onUpdate(rawGamepad, this.mappedValues);
    }

    get id() {
        return this.rawGamepad.id;
    }
}
