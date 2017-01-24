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
    autoConnect?: boolean
} = {}) {
    let animationFrameRequestId: number | null = null;
    const isSupported = navigator && isFunction(navigator.getGamepads);

    const state: IJoyMapState = {
        threshold: params.threshold || 0.2,
        clampThreshold: params.clampThreshold !== false,
        onPoll: params.onPoll || noop,
        autoConnect: params.autoConnect || true,
        gamepads: [],
        players: []
    };

    const joyMap: IJoyMap = {
        isSupported: () => isSupported,

        getPlayerConfigs(): string {
            return `[${state.players.map(player => player.getConfig).join(',')}]`;
        },

        setPlayerConfigs(jsonString: string = '[]') {
            joyMap.clearPlayers();
            const parsedList = JSON.parse(jsonString);
            parsedList.forEach(playerConfig => joyMap.addPlayer().setConfig(playerConfig));
        },

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

        setThreshold(threshold: number) {
            state.threshold = threshold;
        },

        setClampThreshold(clampThreshold: boolean) {
            state.clampThreshold = clampThreshold;
        },

        setOnPoll(onPoll: Function) {
            state.onPoll = onPoll;
        },

        setAutoConnect(autoConnect: boolean) {
            state.autoConnect = autoConnect;
        },

        getGamepads: () => state.gamepads,
        getPlayers: () => state.players,

        getUnusedPadIds(): string[] {
            return difference(map('id', state.gamepads), state.players.map(p => p.getPadId()));
        },

        getUnusedPadId(): string | null {
            const playerIds = state.players.map(p => p.getPadId());
            const gamepadIds = map('id', state.gamepads);

            const length = gamepadIds.length;
            let i = 0;
            while (i < length) {
                if (!playerIds.includes(gamepadIds[i])) {
                    return gamepadIds[i];
                }
                i += 1;
            }

            return null;
        },

        addPlayer(name?: string, padId?: ?string): IPlayer {
            if (!!name && !nameIsValid(name)) {
                throw new Error(`On addPlayer('${name}'): argument contains invalid characters`);
            }

            // Given unassigned players and unused gamepads, automatically assign them
            if (state.autoConnect === 'auto' && !padId) {
                padId = joyMap.getUnusedPadId();
            }

            const player: IPlayer = createPlayer({
                name,
                threshold: state.threshold,
                clampThreshold: state.clampThreshold,
                padId
            });

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
                const gamepad: ?Gamepad = find({ id: player.getPadId() }, state.gamepads);

                if (gamepad) {
                    if (!player.isConnected()) {
                        player.connect();
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
