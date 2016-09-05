import {
    isFunction, find, remove, map, noop,
    filter, difference, forEach, includes
} from 'lodash/fp';

import Gamepad from './Gamepad';

export default class JoyMap {

    isSupported = isFunction(navigator.getGamepads);
    gamepads = [];
    aliases = {};
    events = {};
    mainGamepad = null;
    animationFrameRequestId = null;
    connectCallbacks = [];
    disconnectCallbacks = [];
    onPoll = noop;

    inputMaps = {
        xbox: {
            leftAnalogX: (pad) => pad.axes[0],
            leftAnalogY: (pad) => pad.axes[1],
            rightAnalogX: (pad) => pad.axes[2],
            rightAnalogY: (pad) => pad.axes[3],
            dpadUp: (pad) => pad.buttons[12].value,
            dpadDown: (pad) => pad.buttons[13].value,
            dpadLeft: (pad) => pad.buttons[14].value,
            dpadRight: (pad) => pad.buttons[15].value,
            L1: (pad) => pad.buttons[4].value,
            L2: (pad) => pad.buttons[6].value,
            L3: (pad) => pad.buttons[10].value,
            R1: (pad) => pad.buttons[5].value,
            R2: (pad) => pad.buttons[7].value,
            R3: (pad) => pad.buttons[11].value,
            A: (pad) => pad.buttons[0].value,
            B: (pad) => pad.buttons[1].value,
            X: (pad) => pad.buttons[2].value,
            Y: (pad) => pad.buttons[3].value,
            start: (pad) => pad.buttons[9].value,
            select: (pad) => pad.buttons[8].value,
            home: () => false
        }
    };

    constructor({ threshold, onGamepadUpdate, clampThreshold }) {
        this.threshold = threshold !== undefined ? threshold : 0.1;
        this.onGamepadUpdate = onGamepadUpdate;
        this.clampThreshold = clampThreshold !== undefined ? clampThreshold : true;
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
        this.onPoll();

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
                    clampThreshold: this.clampThreshold,
                    events: this.events,
                    threshold : this.threshold,
                    aliases: this.aliases,
                    inputMap: this.inputMaps[type],
                    update: this.onGamepadUpdate
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
        if (isFunction(property)) {
            this.aliases[alias] = function (mappedValues) {
                return property(mappedValues);
            };
        } else {
            this.aliases[alias] = function (mappedValues) {
                return mappedValues[property].value;
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

    // Possible values for update: 'simple', 'normal, 'event' or a custom function
    setUpdate(update) {
        forEach((pad) => pad.setUpdate(update), this.gamepads);
    }

    // TODO consider if events are actually useful and deserve the overhead when handling multiple gamepads
    addEvent(inputName, handler) {
        this.events[inputName] = this.events[inputName] || [];
        this.events[inputName].push(handler);
    }

    removeEvent(inputName, handler) {
        this.events[inputName] = reject(handler, this.events[inputName] || []);
    }
}
