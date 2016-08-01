import {
    isFunction, find, remove, map,
    filter, difference, forEach, includes
} from 'lodash/fp';

import Gamepad from './Gamepad';

export default class JoyMap {

    isSupported = isFunction(navigator.getGamepads);
    gamepads = [];
    aliases = {};
    mainGamepad = null;
    animationFrameRequestId = null;
    connectCallbacks = [];
    disconnectCallbacks = [];

    inputMaps = {
        xbox: {
            leftAnalogX: function () { return this.rawGamepad.axes[0]; },
            leftAnalogY: function () { return this.rawGamepad.axes[1]; },
            rightAnalogX: function () { return this.rawGamepad.axes[2]; },
            rightAnalogY: function () { return this.rawGamepad.axes[3]; },
            dpadUp: function () { return this.rawGamepad.buttons[12].value; },
            dpadDown: function () { return this.rawGamepad.buttons[13].value; },
            dpadLeft: function () { return this.rawGamepad.buttons[14].value; },
            dpadRight: function () { return this.rawGamepad.buttons[15].value; },
            L1: function () { return this.rawGamepad.buttons[4].value; },
            L2: function () { return this.rawGamepad.buttons[6].value; },
            L3: function () { return this.rawGamepad.buttons[10].value; },
            R1: function () { return this.rawGamepad.buttons[5].value; },
            R2: function () { return this.rawGamepad.buttons[7].value; },
            R3: function () { return this.rawGamepad.buttons[11].value; },
            A: function () { return this.rawGamepad.buttons[0].value; },
            B: function () { return this.rawGamepad.buttons[1].value; },
            X: function () { return this.rawGamepad.buttons[2].value; },
            Y: function () { return this.rawGamepad.buttons[3].value; },
            start: function () { return this.rawGamepad.buttons[9].value; },
            select: function () { return this.rawGamepad.buttons[8].value; },
            home: function () { return false; }
        }
    };

    constructor(threshold) {
        this.threshold = (threshold !== undefined) ? threshold : 0.1;
    }

    start() {
        if (this.isSupported && this.animationFrameRequestId === null) {
            this.animationFrameRequestId = window.requestAnimationFrame(this.step);
        }
    }

    stop() {
        if (this.animationFrameRequestId !== null) {
            window.cancelAnimationFrame(this.animationFrameRequestId);
            this.animationFrameRequestId = null;
        }
    }

    step = () => {
        this.poll();
        this.animationFrameRequestId = window.requestAnimationFrame(this.step);
    };

    getGamepadType(rawPad) {
        return 'xbox';
    }

    getGamepad(id) {
        return find({ id }, this.gamepads);
    }

    addOnConnect(callback) {
        this.connectCallbacks.push(callback);
    }

    removeOnConnect(callback) {
        remove(callback, this.connectCallbacks);
    }

    addOnDisconnect(callback) {
        this.disconnectCallbacks.push(callback);
    }

    removeOnDisconnect(callback) {
        remove(callback, this.disconnectCallbacks);
    }

    connectGamepad(gamepad) {
        gamepad.connected = true;
        forEach(callback => callback.call(this, gamepad), this.connectCallbacks);
    }

    disconnectGamepad(gamepad) {
        gamepad.connected = false;
        forEach(callback => callback.call(this, gamepad), this.disconnectCallbacks);
    }

    poll() {
        const rawGamepads = filter((rawGamepad) => {
            return rawGamepad && rawGamepad.connected && rawGamepad.buttons.length && rawGamepad.axes.length;
        }, navigator.getGamepads());
        const newIds = filter((id) => !!id || id === 0, map('id', rawGamepads));
        const oldIds = filter((id) => !!id || id === 0, map('id', this.gamepads));
        const disconnected = difference(oldIds, newIds);

        // Disconnect gamepads
        if (disconnected.length > 0) {
            forEach((pad) => {
                if (includes(pad.id, disconnected) && pad.connected === true) {
                    this.disconnectGamepad(pad);
                }
            }, this.gamepads);
        }

        forEach((rawGamepad) => {
            const gamepad = find({ id: rawGamepad.id }, this.gamepads);

            if (gamepad === undefined) {
                const type = this.getGamepadType(rawGamepad);
                const newPad = new Gamepad({
                    rawGamepad,
                    type,
                    threshold : this.threshold,
                    aliases: this.aliases,
                    inputMap: this.inputMaps[type]
                });

                this.gamepads.push(newPad);
                this.connectGamepad(newPad);
            } else {
                if (!gamepad.connected) {
                    this.connectGamepad(gamepad);
                }
                gamepad.update(rawGamepad);
            }
        }, rawGamepads);
        
        // Update who is the main gamepad
        if (!this.mainGamepad || !this.mainGamepad.connected) {
            this.mainGamepad = find({ connected: true }, this.gamepads);
        }
    }

    setMainGamepad(id) {
        this.mainGamepad = find({ id }, this.gamepads) || this.gamepads[0];

        return this.mainGamepad;
    }

    getState() {
        return (!this.mainGamepad) ? {} : this.mainGamepad.getState(...arguments);
    }

    setAlias(alias, property) {
        if (_.isFunction(property)) {
            this.aliases[alias] = function () {
                return property(this.mappedValues);
            };
        } else {
            this.aliases[alias] = function () {
                return this.mappedValues[property].value;
            };
        }
    }

    isSignificant(number) {
        return !!number && Math.abs(number) > this.threshold;
    }

    getAliasNameList() {
        return Object.keys(this.aliases);
    }

    cleanAliases() {
        this.aliases = {};
    }

    getSupportedInputs(includeAliases) {
        const inputs = Object.keys(this.inputMaps.xbox);
        
        if (includeAliases) {
            inputs.push(...this.getAliasNameList());
        }

        return inputs;
    }
}
