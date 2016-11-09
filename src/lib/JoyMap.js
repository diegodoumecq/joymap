import {
    isFunction, find, map, noop, omit,
    filter, difference, forEach, tail, flow
} from 'lodash/fp';

import Player from './Player';

export default class JoyMap {

    threshold: number;
    clampThreshold: boolean;
    onPoll: Function;
    animationFrameRequestId: ?number = null;
    isSupported: boolean = isFunction(navigator.getGamepads);

    gamepads: Gamepad[] = [];
    players: { [key: string]: Player } = {};
    
    constructor({ threshold = 0.2, clampThreshold = true, onPoll = noop }): void {
        this.threshold = threshold;
        this.clampThreshold = clampThreshold;
        this.onPoll = onPoll;

        this.poll();
    }

    start(): void {
        if (this.isSupported && this.animationFrameRequestId === null) {
            this.animationFrameRequestId = window.requestAnimationFrame(this.step);
        }
    }

    stop(): void {
        if (this.animationFrameRequestId !== null) {
            window.cancelAnimationFrame(this.animationFrameRequestId);
            this.animationFrameRequestId = null;
        }
    }

    step = (): void => {
        this.poll();
        this.onPoll();

        this.animationFrameRequestId = window.requestAnimationFrame(this.step);
    };

    getUnusedGamepadIds(): string[] {
        return difference(map('id', this.gamepads), map('gamepadId', this.players));
    }

    setPlayers(players: string = '{}'): void {
        this.cleanPlayers();
        this.players = JSON.parse(players);
    }

    addPlayer(name: string): Player {
        const { threshold, clampThreshold } = this;

        const player: Player = new Player({ name, threshold, clampThreshold });

        const unusedId: ?string = flow(
            map('id'),
            find((gamepadId: string) => !find({ gamepadId }, this.players))
        )(this.gamepads);

        if (unusedId) {
            player.connect(unusedId);
        }

        this.players[name] = player;

        return player;
    }

    removePlayer(name: string): void {
        const player: Player = this.players[name];
        this.players = omit([name], this.players);
        player.destroy();
    }

    cleanPlayers(): void {
        forEach(({ name }) => this.removePlayer(name), this.players);
    }

    poll(): void {
        this.gamepads = filter((rawGamepad: ?Gamepad) =>
            rawGamepad
            && rawGamepad.connected
            && rawGamepad.buttons.length
            && rawGamepad.axes.length
            && (!!rawGamepad.id || rawGamepad.id === 0), navigator.getGamepads());

        forEach((player: Player) => {
            const unusedGamepadIds: string[] = this.getUnusedGamepadIds();

            // Given unassigned players and unusued gamepads, automatically assign them
            if (player.gamepadId === null && unusedGamepadIds.length > 0) {
                player.connect(unusedGamepadIds[0]);
            }

            const gamepad: ?Gamepad = find({ id: player.gamepadId }, this.gamepads);

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
