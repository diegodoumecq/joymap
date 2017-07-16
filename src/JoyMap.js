
import {
    noop, map, isFunction, find,
    difference, forEach, includes, indexOf
} from 'lodash/fp';
import { getRawGamepads } from './common/utils';

export default function createJoyMap(params = {}) {
    let animationFrameRequestId = null;
    const isSupported = navigator && isFunction(navigator.getGamepads);

    const state = {
        onPoll: params.onPoll || noop,
        autoConnect: params.autoConnect !== false,
        gamepads: [],
        modules: []
    };

    const joyMap = {
        isSupported: () => isSupported,

        start: () => {
            if (isSupported && animationFrameRequestId === null) {
                joyMap.poll();
                if (state.autoConnect) {
                    forEach(module => {
                        if (!module.isConnected()) {
                            const padId = joyMap.getUnusedPadId();
                            if (padId) {
                                module.connect(padId);
                            }
                        }
                    }, state.modules);
                }
                const step = () => {
                    joyMap.poll();
                    animationFrameRequestId = window.requestAnimationFrame(step);
                };
                animationFrameRequestId = window.requestAnimationFrame(step);
            }
        },

        stop: () => {
            if (animationFrameRequestId !== null) {
                window.cancelAnimationFrame(animationFrameRequestId);
                animationFrameRequestId = null;
            }
        },

        setOnPoll: onPoll => {
            state.onPoll = onPoll;
        },

        setAutoConnect: autoConnect => {
            state.autoConnect = autoConnect;
        },

        getGamepads: () => state.gamepads,
        getModules: () => state.modules,

        getUnusedPadIds: () => difference(map('id', state.gamepads), map(module => module.getPadId(), state.modules)),

        getUnusedPadId: () => {
            const usedIds = map(module => module.getPadId(), state.modules);
            const gamepadIds = map('id', state.gamepads);

            const length = gamepadIds.length;
            let i = 0;
            while (i < length) {
                if (!includes(gamepadIds[i], usedIds)) {
                    return gamepadIds[i];
                }
                i += 1;
            }

            return null;
        },

        addModule: module => {
            state.modules.push(module);

            if (state.autoConnect && !module.getPadId()) {
                const padId = joyMap.getUnusedPadId();
                if (padId) {
                    module.connect(padId);
                }
            }
        },

        removeModule: module => {
            // TODO refactor with other lodash/fp functions
            const index = indexOf(module, state.modules);
            if (index !== -1) {
                state.modules.splice(index, 1);
                module.destroy();
            } else {
                throw new Error('removeModule(module), could not find such module');
            }
        },

        clearModules: () => {
            forEach(module => joyMap.removeModule(module), state.modules);
        },

        poll: () => {
            state.gamepads = getRawGamepads().filter(rawGamepad =>
                rawGamepad
                && rawGamepad.connected
                && rawGamepad.buttons.length
                && rawGamepad.axes.length
                && rawGamepad.timestamp !== 0
                && (!!rawGamepad.id || rawGamepad.id === 0)
            );

            // TODO review gamepad connection because gamepad doesnt autoconnect even if the flag is true the first time

            forEach(module => {
                if (state.autoConnect && !module.getPadId()) {
                    const padId = joyMap.getUnusedPadId();
                    if (padId) {
                        module.connect(padId);
                        module.update(find({ id: module.getPadId() }, state.gamepads));
                    }
                } else {
                    const gamepad = find({ id: module.getPadId() }, state.gamepads);

                    if (gamepad) {
                        if (!module.isConnected()) {
                            module.connect();
                        }
                        module.update(gamepad);
                    } else if (module.isConnected()) {
                        module.disconnect();
                    }
                }
            }, state.modules);

            state.onPoll();
        }
    };

    return joyMap;
}
