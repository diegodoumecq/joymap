/* @flow */
import { getRawGamepads, nameIsValid } from './lib/utils';
import {
    noop, map, isFunction, find, difference
} from './lib/tools';

import createPlayer from './Player';
import type { IPlayer, IJoyMap, IJoyMapState } from './types';

export default function createJoyMap(params?: {
    threshold?: number,
    clampThreshold?: boolean,
    onPoll?: () => void,
    autoConnect?: 'manual' | 'auto'
} = {}) {
    let animationFrameRequestId: number | null = null;

    const state: IJoyMapState = {
        threshold: params.threshold || 0.2,
        clampThreshold: params.clampThreshold !== false,
        onPoll: params.onPoll || noop,
        autoConnect: params.autoConnect || 'auto',
        isSupported: navigator && isFunction(navigator.getGamepads),
        gamepads: [],
        players: []
    };

    const joyMap: IJoyMap = {
        isSupported: () => state.isSupported,

        start() {
            if (state.isSupported && animationFrameRequestId === null) {
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

        setThreshold(threshold: number) {
            state.threshold = threshold;
        },

        setClampThreshold(clampThreshold: boolean) {
            state.clampThreshold = clampThreshold;
        },

        setOnPoll(onPoll: Function) {
            state.onPoll = onPoll;
        },

        setAutoConnect(autoConnect: 'auto' | 'manual') {
            state.autoConnect = autoConnect;
        },

        getGamepads: () => state.gamepads,
        getPlayers: () => state.players,

        getUnusedPadIds(): string[] {
            return difference(map('id', state.gamepads), state.players.map(p => p.getPadId()));
        },

        getUnusedPadId(): string | null {
            const playerIds = state.players.map(p => p.getPadId());
            const length = state.gamepads.length;
            let i = 0;
            while (i < length) {
                if (!playerIds.includes(state.gamepads[i].id)) {
                    return state.gamepads[i].id;
                }
                i += 1;
            }

            return null;
        },

        setPlayers(jsonString: string = '[]') {
            joyMap.clearPlayers();
            state.players = JSON.parse(jsonString);
        },

        addPlayer(name: string): IPlayer {
            if (!nameIsValid(name)) {
                throw new Error(`On addPlayer('${name}'): argument contains invalid characters`);
            }

            const player: IPlayer = createPlayer({
                name,
                threshold: state.threshold,
                clampThreshold: state.clampThreshold
            });

            const gamepadIds: string[] = map('id', state.gamepads);
            const unusedId: ?string = gamepadIds.find((gamepadId: string) => !find({ gamepadId }, state.players));

            if (unusedId) {
                player.connect(unusedId);
            }

            state.players.push(player);

            return player;
        },

        removePlayer(player: IPlayer) {
            const index = state.players.indexOf(player);
            if (index !== -1) {
                state.players.splice(index, 1);
                player.destroy();
            } else {
                throw new Error(`removePlayer(player.name: ${player.getName()}), could not find such player`);
            }
        },

        clearPlayers() {
            state.players.forEach(player => joyMap.removePlayer(player));
        },

        poll() {
            state.gamepads = getRawGamepads().filter((rawGamepad: ?Gamepad) =>
                rawGamepad
                && rawGamepad.connected
                && rawGamepad.buttons.length
                && rawGamepad.axes.length
                && (!!rawGamepad.id || rawGamepad.id === 0));

            state.players.forEach((player: IPlayer) => {
                // Given unassigned players and unused gamepads, automatically assign them
                if (state.autoConnect === 'auto'
                && player.getPadId() === null) {
                    const unusedGamepadId = joyMap.getUnusedPadId();

                    if (unusedGamepadId) {
                        player.connect(unusedGamepadId);
                    }
                }

                const gamepad: ?Gamepad = find({ id: player.getPadId() }, state.gamepads);

                if (gamepad) {
                    if (!player.isConnected()) {
                        player.reconnect();
                    }
                    player.update(gamepad);
                } else if (player.isConnected()) {
                    player.disconnect();
                }
            });

            state.onPoll();
        }
    };

    return joyMap;
}
