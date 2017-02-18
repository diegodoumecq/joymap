/* @flow */
import {
    getRawGamepads, noop, map, isFunction, find, difference
} from './tools';

import type { IModule, IJoyMap, IJoyMapState } from './types';

export default function createJoyMap(params?: {
    onPoll?: () => void,
    autoConnect?: boolean
} = {}) {
    let animationFrameRequestId: number | null = null;
    const isSupported = navigator && isFunction(navigator.getGamepads);

    const state: IJoyMapState = {
        onPoll: params.onPoll || noop,
        autoConnect: params.autoConnect !== false,
        gamepads: [],
        modules: []
    };

    const joyMap: IJoyMap = {
        isSupported: () => isSupported,

        start() {
            if (isSupported && animationFrameRequestId === null) {
                joyMap.poll();
                if (state.autoConnect) {
                    state.modules.forEach(module => {
                        if (!module.isConnected()) {
                            const padId = joyMap.getUnusedPadId();
                            if (padId) {
                                module.connect(padId);
                            }
                        }
                    });
                }
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

        setOnPoll(onPoll: Function) {
            state.onPoll = onPoll;
        },

        setAutoConnect(autoConnect: boolean) {
            state.autoConnect = autoConnect;
        },

        getGamepads: () => state.gamepads,
        getModules: () => state.modules,

        getUnusedPadIds(): string[] {
            return difference(map('id', state.gamepads), state.modules.map(m => m.getPadId()));
        },

        getUnusedPadId(): string | null {
            const usedIds = state.modules.map(module => module.getPadId());
            const gamepadIds = map('id', state.gamepads);

            const length = gamepadIds.length;
            let i = 0;
            while (i < length) {
                if (!usedIds.includes(gamepadIds[i])) {
                    return gamepadIds[i];
                }
                i += 1;
            }

            return null;
        },

        addModule(module: IModule) {
            state.modules.push(module);

            if (state.autoConnect && !module.getPadId()) {
                const padId = joyMap.getUnusedPadId();
                if (padId) {
                    module.connect(padId);
                }
            }
        },

        removeModule(module: IModule) {
            const index = state.modules.indexOf(module);
            if (index !== -1) {
                state.modules.splice(index, 1);
                module.destroy();
            } else {
                throw new Error('removeModule(module), could not find such module');
            }
        },

        clearModules() {
            state.modules.forEach(module => joyMap.removeModule(module));
        },

        poll() {
            state.gamepads = getRawGamepads().filter((rawGamepad: ?Gamepad) =>
                rawGamepad
                && rawGamepad.connected
                && rawGamepad.buttons.length
                && rawGamepad.axes.length
                && rawGamepad.timestamp !== 0
                && (!!rawGamepad.id || rawGamepad.id === 0));

            // TODO review gamepad connection because gamepad doesnt autoconnect even if the flag is true the first time

            state.modules.forEach((module: IModule) => {
                const gamepad: ?Gamepad = find({ id: module.getPadId() }, state.gamepads);

                if (gamepad) {
                    if (!module.isConnected()) {
                        module.connect();
                    }
                    module.update(gamepad);
                } else if (module.isConnected()) {
                    module.disconnect();
                }
            });

            state.onPoll();
        }
    };

    return joyMap;
}
