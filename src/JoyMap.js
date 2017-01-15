/* @flow */
import { getRawGamepads, nameIsValid } from './lib/utils';
import {
    noop, map, isFunction, find, omit, difference, findKey
} from './lib/tools';

import Player from './Player';

type IParams = {
    threshold: number,
    clampThreshold: boolean,
    onPoll: () => void,
    playerHandling: 'manual' | 'auto'
};

export default class JoyMap {

    threshold: number;
    clampThreshold: boolean;
    onPoll: () => void;
    playerHandling: 'manual' | 'auto';
    animationFrameRequestId: number | null = null;
    isSupported: boolean = navigator && isFunction(navigator.getGamepads);

    gamepads: Gamepad[] = [];
    players: { [key: string]: Player } = {};

    constructor({ threshold = 0.2, clampThreshold = true, onPoll = noop, playerHandling = 'auto' }: IParams = {}) {
        this.threshold = threshold;
        this.clampThreshold = clampThreshold;
        this.onPoll = onPoll;
        this.playerHandling = playerHandling;

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
        this.animationFrameRequestId = window.requestAnimationFrame(this.step);
    };

    getUnusedGamepadIds(): string[] {
        return difference(map('id', this.gamepads), map('gamepadId', this.players));
    }

    setPlayers(jsonString: string = '{}') {
        this.cleanPlayers();
        this.players = JSON.parse(jsonString);
    }

    addPlayer(name: string): Player {
        if (!nameIsValid(name)) {
            throw new Error(`On addPlayer('${name}'): argument contains invalid characters`);
        }

        const { threshold, clampThreshold } = this;

        const player: Player = new Player({ name, threshold, clampThreshold });

        const gamepadIds: string[] = map('id', this.gamepads);
        const unusedId: ?string = gamepadIds.find((gamepadId: string) => !findKey({ gamepadId }, this.players));

        if (unusedId) {
            player.connect(unusedId);
        }

        this.players[name] = player;

        return player;
    }

    removePlayer(player: Player) {
        this.players = omit([player.name], this.players);
        player.destroy();
    }

    cleanPlayers() {
        // REVIEW: Had to use "any" type because flow thinks Object.values return mixed
        // and fails to notice that this.players is { [key: string]: Player }
        Object.values(this.players).forEach((player: any) => this.removePlayer(player));
    }

    poll() {
        this.gamepads = getRawGamepads().filter((rawGamepad: ?Gamepad) =>
            rawGamepad
            && rawGamepad.connected
            && rawGamepad.buttons.length
            && rawGamepad.axes.length
            && (!!rawGamepad.id || rawGamepad.id === 0));

        Object.keys(this.players).forEach((name: string) => {
            const player: Player = this.players[name];
            const unusedGamepadIds = this.getUnusedGamepadIds();

            // Given unassigned players and unusued gamepads, automatically assign them
            if (this.playerHandling === 'auto'
            && player.gamepadId === null
            && unusedGamepadIds.length > 0) {
                player.connect(unusedGamepadIds[0]);
            }

            const gamepad: ?Gamepad = find({ id: player.gamepadId }, this.gamepads);

            if (!player.connected) {
                if (gamepad) {
                    player.reconnect();
                    player.update(gamepad);
                }
            } else if (gamepad) {
                player.update(gamepad);
            } else {
                player.disconnect();
            }
        });

        this.onPoll();
    }
}
