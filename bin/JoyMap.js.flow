/* @flow */
import { getRawGamepads, nameIsValid } from './lib/utils';
import {
    noop, map, isFunction, find, omit, difference, findKey
} from './lib/tools';

import createPlayer from './Player';
import type { IPlayer } from './Player';

export type IJoyMap = {
    isSupported: boolean,

    gamepads: Gamepad[],
    players: { [key: string]: IPlayer },

    start: () => void,
    stop: () => void,
    getUnusedGamepadIds: () => string[],
    setPlayers: (jsonString: string) => void,
    addPlayer: (name: string) => IPlayer,
    removePlayer: (player: IPlayer) => void,
    cleanPlayers: () => void,
    poll: () => void
};

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
    const isSupported = navigator && isFunction(navigator.getGamepads);
    let animationFrameRequestId: number | null = null;

    const joyMap: IJoyMap = {
        isSupported,
        gamepads: [],
        players: {},

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
            return difference(map('id', joyMap.gamepads), map('gamepadId', joyMap.players));
        },

        setPlayers(jsonString: string = '{}') {
            joyMap.cleanPlayers();
            joyMap.players = JSON.parse(jsonString);
        },

        addPlayer(name: string): IPlayer {
            if (!nameIsValid(name)) {
                throw new Error(`On addPlayer('${name}'): argument contains invalid characters`);
            }

            const player: IPlayer = createPlayer({ name, threshold, clampThreshold });

            const gamepadIds: string[] = map('id', joyMap.gamepads);
            const unusedId: ?string = gamepadIds.find((gamepadId: string) => !findKey({ gamepadId }, joyMap.players));

            if (unusedId) {
                player.connect(unusedId);
            }

            joyMap.players[name] = player;

            return player;
        },

        removePlayer(player: IPlayer) {
            joyMap.players = omit([player.name], joyMap.players);
            player.destroy();
        },

        cleanPlayers() {
            // REVIEW: Had to use "any" type because flow thinks Object.values return mixed
            // and fails to notice that joyMap.players is { [key: string]: IPlayer }
            Object.values(joyMap.players).forEach((player: any) => joyMap.removePlayer(player));
        },

        poll() {
            joyMap.gamepads = getRawGamepads().filter((rawGamepad: ?Gamepad) =>
                rawGamepad
                && rawGamepad.connected
                && rawGamepad.buttons.length
                && rawGamepad.axes.length
                && (!!rawGamepad.id || rawGamepad.id === 0));

            Object.keys(joyMap.players).forEach((name: string) => {
                const player: IPlayer = joyMap.players[name];
                const unusedGamepadIds = joyMap.getUnusedGamepadIds();

                // Given unassigned players and unusued gamepads, automatically assign them
                if (playerHandling === 'auto'
                && player.gamepadId === null
                && unusedGamepadIds.length > 0) {
                    player.connect(unusedGamepadIds[0]);
                }

                const gamepad: ?Gamepad = find({ id: player.gamepadId }, joyMap.gamepads);

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

            onPoll();
        }
    };

    return joyMap;
}
