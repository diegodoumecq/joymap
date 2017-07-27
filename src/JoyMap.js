import {
    noop, map, isFunction, find, filter,
    difference, forEach, includes
} from 'lodash/fp';

import { getRawGamepads, gamepadIsValid } from './common/utils';

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

        setOnPoll: onPoll => { state.onPoll = onPoll; },

        setAutoConnect: autoConnect => { state.autoConnect = autoConnect; },

        getGamepads: () => state.gamepads,

        getModules: () => state.modules,

        getUnusedPadIds: () => difference(map('id', state.gamepads), map(module => module.getPadId(), state.modules)),

        getUnusedPadId: () => {
            const usedIds = map(module => module.getPadId(), state.modules);
            const gamepadIds = map('id', state.gamepads);

            return find(id => !includes(id, usedIds), gamepadIds);
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
            state.modules = filter(m => m !== module, state.modules);
            module.destroy();
        },

        clearModules: () => forEach(module => joyMap.removeModule(module), state.modules),

        poll: () => {
            state.gamepads = filter(gamepadIsValid, getRawGamepads());

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
