/* @flow */
import { getRawGamepads, nameIsValid } from './lib/utils';
import {
    noop, map, isFunction, find, difference
} from './lib/tools';

import createPlayer from './Player';
import type { IPlayer, IJoyMap } from './types';

type IParams = {
    threshold: number,
    clampThreshold: boolean,
    onPoll: () => void,
    playerHandling: 'manual' | 'auto'
};

export default function createJoyMap({
    threshold = 0.2,
    clampThreshold = true,
    onPoll = noop,
    playerHandling = 'auto'
}: IParams = {}) {
    const isSupported: boolean = navigator && isFunction(navigator.getGamepads);

    let animationFrameRequestId: number | null = null;
    let gamepads: Gamepad[] = [];
    let players: IPlayer[] = [];

    const joyMap: IJoyMap = {
        isSupported: () => isSupported,
        getGamepads: () => gamepads,
        getPlayers: () => players,

        start() {
            if (isSupported && animationFrameRequestId === null) {
                const step = () => {
                    joyMap.poll();
                    animationFrameRequestId = window.requestAnimationFrame(step);
                };
                animationFrameRequestId = window.requestAnimationFrame(step);
            }
        },

        stop() {
            if (animationFrameRequestId !== null) {
                window.cancelAnimationFrame(animationFrameRequestId);
                animationFrameRequestId = null;
            }
        },

        getUnusedGamepadIds(): string[] {
            return difference(map('id', gamepads), map('gamepadId', players));
        },

        setPlayers(jsonString: string = '[]') {
            joyMap.cleanPlayers();
            players = JSON.parse(jsonString);
        },

        addPlayer(name: string): IPlayer {
            if (!nameIsValid(name)) {
                throw new Error(`On addPlayer('${name}'): argument contains invalid characters`);
            }

            const player: IPlayer = createPlayer({ name, threshold, clampThreshold });

            const gamepadIds: string[] = map('id', gamepads);
            const unusedId: ?string = gamepadIds.find((gamepadId: string) => !find({ gamepadId }, players));

            if (unusedId) {
                player.connect(unusedId);
            }

            players.push(player);

            return player;
        },

        removePlayer(player: IPlayer) {
            const index = players.indexOf(player);
            if (index !== -1) {
                players.splice(index, 1);
                player.destroy();
            } else {
                throw new Error(`removePlayer(player.name: ${player.getName()}), could not find such player`);
            }
        },

        cleanPlayers() {
            players.forEach(player => joyMap.removePlayer(player));
        },

        poll() {
            gamepads = getRawGamepads().filter((rawGamepad: ?Gamepad) =>
                rawGamepad
                && rawGamepad.connected
                && rawGamepad.buttons.length
                && rawGamepad.axes.length
                && (!!rawGamepad.id || rawGamepad.id === 0));

            players.forEach((player: IPlayer) => {
                // Given unassigned players and unused gamepads, automatically assign them
                if (playerHandling === 'auto'
                && player.getGamepadId() === null) {
                    const unusedGamepadIds = joyMap.getUnusedGamepadIds();

                    if (unusedGamepadIds.length > 0) {
                        player.connect(unusedGamepadIds[0]);
                    }
                }

                const gamepad: ?Gamepad = find({ id: player.getGamepadId() }, gamepads);

                if (gamepad) {
                    if (!player.isConnected()) {
                        player.reconnect();
                    }
                    player.update(gamepad);
                } else if (player.isConnected()) {
                    player.disconnect();
                }
            });

            onPoll();
        }
    };

    return joyMap;
}
