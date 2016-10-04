import {
    isFunction, find, map, noop, omit,
    filter, difference, forEach, tail
} from 'lodash/fp';

import Player from './Player';

export default class JoyMap {

    isSupported = isFunction(navigator.getGamepads);

    unusedGamepadIds = [];
    players = {};
    animationFrameRequestId = null;

    constructor({ threshold = 0.2, clampThreshold = true, onPoll = noop }) {
        this.threshold = threshold;
        this.clampThreshold = clampThreshold;
        this.onPoll = onPoll;

        this.poll();
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

    //players arg: JSON.stringified string of players, used for saving most of the config of joyMap
    setPlayers(players = '{}') {
        this.cleanPlayers();
        this.players = JSON.parse(players);
    }

    addPlayer(name) {
        const { threshold, clampThreshold } = this;

        this.players[name] = new Player({ name, threshold, clampThreshold });
        if (this.unusedGamepadIds.length > 0) {
            this.players[name].connect(this.unusedGamepadIds[0]);
            this.unusedGamepadIds = tail(this.unusedGamepadIds);
        }

        return this.players[name];
    }

    removePlayer(name) {
        const player = this.players[name];
        this.players = omit([name], this.players);

        this.unusedGamepadIds = [...this.unusedGamepadIds, player.gamepadId];

        player.destroy();
    }

    cleanPlayers() {
        forEach(({ name }) => this.removePlayer(name), this.players);
    }

    poll() {
        const gamepads = filter((rawGamepad) =>
            rawGamepad
            && rawGamepad.connected
            && rawGamepad.buttons.length
            && rawGamepad.axes.length
            && (!!rawGamepad.id || rawGamepad.id === 0), navigator.getGamepads());

        this.unusedGamepadIds = difference(map('id', gamepads), map('gamepadId', this.players));

        forEach((player) => {
            // Given unassigned players and unusued gamepads, automatically assign them
            if (player.gamepadId === null && this.unusedGamepadIds.length > 0) {
                player.connect(this.unusedGamepadIds[0]);
                this.unusedGamepadIds = tail(this.unusedGamepadIds);
            }

            const gamepad = find({ id: player.gamepadId }, gamepads);

            if (!player.connected) {
                if (gamepad) {
                    player.reconnect();
                    player.update(gamepad);
                }
            } else {
                if (gamepad) {
                    player.update(gamepad);
                } else {
                    player.disconnect();
                }
            }
        }, this.players);
    }
}
