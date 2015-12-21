import _ from 'lodash';
import Gamepad from './Gamepad'

export default class JoyMap {

    constructor(threshold) {
        this.isSupported = _.isFunction(navigator.getGamepads);
        this.gamepads = [];
        this.aliases = {};
        this.threshold = (threshold !== undefined) ? threshold : 0.1;
        this.mainGamepad = null;
        this.animationFrameRequestId = null;

        this.connectCallbacks = [];
        this.disconnectCallbacks = [];

        this.inputMaps = {
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
                select: function () { return this.rawGamepad.buttons[8].value; }
            }
        };

        this._step = this._step.bind(this);
    }

    init() {
        if (this.isSupported && this.animationFrameRequestId === null) {
            this.animationFrameRequestId = window.requestAnimationFrame(this._step);
        }
    }

    stop() {
        if (this.animationFrameRequestId !== null) {
            window.cancelAnimationFrame(this.animationFrameRequestId);
            this.animationFrameRequestId = null;
        }
    }

    _step() {
        this.poll();
        this.animationFrameRequestId = window.requestAnimationFrame(this._step);
    }

    getGamepadType(rawPad) {
        return 'xbox';
    }

    getGamepad(index) {
        return _.find(this.gamepads, 'index', index);
    }

    onConnect(callback) {
        this.connectCallbacks.push(callback);
    }

    removeOnConnect(callback) {
        _.remove(this.connectCallbacks, callback);
    }

    onDisconnect(callback) {
        this.disconnectCallbacks.push(callback);
    }

    removeOnDisconnect(callback) {
        _.remove(this.disconnectCallbacks, callback);
    }

    connectGamepad(gamepad) {
        this.connectCallbacks.forEach((callback) => {
            callback.call(this, gamepad);
        });
    }

    disconnectGamepad(gamepad) {
        this.disconnectCallbacks.forEach((callback) => {
            callback.call(this, gamepad);
        });
    }

    poll() {
        const rawGamepads = _.filter(navigator.getGamepads(), (rawGamepad) => {
            return rawGamepad && rawGamepad.connected && rawGamepad.buttons.length && rawGamepad.axes.length;
        });
        const newIds = _.pluck(rawGamepads, 'index');
        const oldIds = _.pluck(this.gamepads, 'index');
        const disconnected = _.difference(oldIds, newIds);

        // Disconnect gamepads
        if (disconnected.length > 0) {
            this.gamepads.forEach((pad) => {
                if (disconnected.indexOf(pad.index) !== -1) {
                    gamepad.connected = false;
                    this.disconnectGamepad(pad);
                }
            });
        }

        rawGamepads.forEach((rawPad) => {
            const gamepad = this.gamepads[rawPad.index];

            if (gamepad === undefined) {
                const type = this.getGamepadType(rawPad);
                const newPad = new Gamepad({
                    gamepad: rawPad,
                    type,
                    threshold : this.threshold,
                    aliases: this.aliases,
                    inputMap: this.inputMaps[type]
                });

                this.gamepads[rawPad.index] = newPad;
                this.connectGamepad(newPad);
            } else {
                gamepad.update(rawPad);

                if (gamepad.connected === false) {
                    this.connectGamepad(gamepad);
                }
            }
        });
        
        // Update who is the main gamepad
        if (!this.mainGamepad || !this.mainGamepad.connected) {
            this.mainGamepad =  _.find(this.gamepads, 'connected', true);
        }
    }

    setMainGamepad(id) {
        this.mainGamepad = _.find(this.gamepads, (pad) => (id === pad.index)) || this.gamepads[0];

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
